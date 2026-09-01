// ── De filmgenerator voor de handleiding ─────────────────────────────────────────────────────────────────
//
// Fase 1 van tools/FILMS-SPEC.md: één film, end-to-end, in NL en FR.
//
// ⚠️ GELUID STUURT BEELD (§3.1). Eerst wordt per scène een audiofragment gemaakt en de duur ervan GEMETEN;
// pas daarna wordt opgenomen, en dan duurt elke scène minstens zolang als haar fragment. Synchronisatie is
// zo een eigenschap van de pijplijn en geen montagestap. Draai het niet om: geluid achteraf onderleggen
// betekent dat élke tekstwijziging een handmatige hermontage vraagt.
//
// ⚠️ DE STEM IS EEN PLAATSHOUDER. macOS `say` met Ellen (nl_BE — Vlaams) en Thomas (fr_FR). Dat is NIET de
// beslissing uit §11.1; die ligt bij Dominique (eigen stem klonen of kopen). Het punt is dat de pijplijn nu
// met ECHTE audio en ECHTE duren werkt — de stem verwisselen is één functie hieronder (`spreek`).
//
// ⚠️ EEN SCÈNE DIE HAAR MERKTEKEN MIST, LAAT DE HELE FILM VALLEN (§5). Harder dan bij beelden, met reden:
// een fout beeld tussen 184 is een fout beeld; een foute scène zit middenin een verhaal dat gewoon
// doorloopt, en dat merkt niemand bij het nakijken.
//
// Gebruik:
//   node tools/films.mjs                 alle films, NL en FR
//   node tools/films.mjs kredietdossier  enkel de films waarvan de naam dat bevat
//   node tools/films.mjs --droog         geen opname: enkel de audio maken en de duren tonen
//
// Uitvoer: tools/.films-uit/ — NIET in git (§7: geen mp4 in git).

import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync, readdirSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';
import { BASIS, ID, gebruiker, wachtwoord, meldAan, stemGeheim } from './aansturing.mjs';

const UIT = new URL('./.films-uit/', import.meta.url).pathname;

// ── DE UITSLAGTABEL (§6 en §7.4) ─────────────────────────────────────────────────────────────────────────
//
// ⚠️ DIT BESTAND IS DE SPIL VAN DE PUBLICATIE, en dat is het pas sinds de vervangproef van 01/09/2026: een
// film KAN bij Bunny niet vervangen worden (400 "The video has already been uploaded"), dus elke herneming
// levert een NIEUWE guid. De handleiding mag daarom nooit naar een guid verwijzen maar altijd naar een
// FILMNAAM; deze tabel vertaalt naam+taal → guid, en de MkDocs-hook leest haar bij het bouwen.
//
// Ze draagt ook de SCÈNETIJDEN — daar maakt de generator de hoofdstukken uit — en een HASH over
// {route, narratie} per taal, waarmee §6 kan zeggen of een film verouderd is.
//
// ⚠️ Bij het schrijven wordt de bestaande inhoud SAMENGEVOEGD, niet overschreven. Draai je één film, dan
// mogen de guids van de veertien andere niet verdampen — dat zou de hele handleiding stilzwijgend leeg
// maken, en niets zou het melden tot iemand een pagina opent.
// ⚠️ NAAST .films-uit/ en niet erin: die map staat in .gitignore (mp4's horen niet in git) en deze tabel
// MOET er juist wél in. De MkDocs-hook leest haar bij het bouwen van de site; staat ze er niet, dan bouwt
// de handleiding zonder films en meldt niets. Enkel het beeldmateriaal blijft buiten git, de VERWIJZING
// hoort erbij.
const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
const uitslag = existsSync(UITSLAG) ? JSON.parse(readFileSync(UITSLAG, 'utf8')) : {};
const bewaarUitslag = () => writeFileSync(UITSLAG, JSON.stringify(uitslag, null, 2) + '\n');
const BREED = 1920, HOOG = 1080;                  // §3.3 — gemeten: de dossierlijst past hierop, ruimer dan op 1700
const STEM = { 'nl-BE': 'Ellen', 'fr-BE': 'Thomas' };
const TEMPO = { 'nl-BE': 175, 'fr-BE': 175 };     // woorden/minuut voor `say`; ± 140 gesproken tempo

// ── RITME ────────────────────────────────────────────────────────────────────────────────────────────────
// ⚠️ Tot 31/08/2026 zat hier NIETS. Elke scène duurde precies zolang als haar audiofragment, en het
// geluidsspoor plakte de fragmenten aan elkaar: het einde van zin 1 raakte het begin van zin 2. Er was dus
// per constructie geen enkele stilte — de enige die voorkwam was toevallig, wanneer een handeling langer
// duurde dan haar zin. Dominique hoorde dat meteen: "weinig stilte tussen de zinnen waardoor het allemaal
// artificieel overkwam." Een betere stem lost dat NIET op; dit is tijdlijn, geen timbre.
//
// ⚠️ En een tweede, even structureel: de zin begon op het moment dat de HANDELING begon, niet wanneer het
// scherm klaar stond. De kijker hoorde dus de uitleg van een scherm dat hij nog niet zag.
const AANLOOP = 0.6;          // stilte tussen "het scherm staat er" en de eerste lettergreep
const ADEM = 0.9;             // stilte ná de zin, vóór de volgende handeling begint
const AANLOOP_START = 1.2;    // vóór de allereerste zin — anders val je midden in een gesprek binnen
const NASLEEP = 1.6;          // laten uitademen op het slotbeeld — mét de slot-adem samen ± 2 s
const filter = process.argv.slice(2).find(a => !a.startsWith('--'));
const DROOG = process.argv.includes('--droog');

// ── De cursor (§3.2) ─────────────────────────────────────────────────────────────────────────────────────
// Playwright tekent de muisaanwijzer niet in de video. Zonder dit drukken knoppen zichzelf in, en dat leest
// als een storing. Twintig regels, en meteen herbruikbaar voor CleanOps en Nimble.
// ⚠️ HET VERSIENUMMER GAAT OOK UIT DE FILMS. Linksonder in de zijbalk staat "v1.72.0 nieuw", en de zijbalk
// staat in élke film. Een film wordt hernomen wanneer het SCENARIO of het scherm wijzigt — niet bij elke
// release. Zonder deze filter zou elke versiebump vijftien films in twee talen verouderd maken, precies de
// reden waarom hij op 31/08/2026 in beelden.mjs kwam. Zelfde vorm: `visibility: hidden`, niet `display:none`,
// zodat de zijbalk niet inschuift en het beeldformaat gelijk blijft.
const VERBERG_VERSIE = '.nav-version { visibility: hidden !important; }';

// ── DE TEKSTBALK VOOR EEN GELUIDLOZE FILM ────────────────────────────────────────────────────────────────
//
// ⚠️ IN DE PAGINA EN NIET MET FFMPEG. Dezelfde weg als de cursor: een element dat de opname gewoon meeneemt.
// Met `drawtext` van ffmpeg zou de tekst niet afbreken, geen webfont dragen en niet meeschalen — en elke
// wijziging zou een hercodering vragen in plaats van een nieuwe opname.
//
// Onderaan, want daar dekt ze de minste schermtekst af. Ruim, met een donkere band eronder: een websitefilm
// speelt op een telefoon net zo goed als op een scherm, en dunne witte tekst op een licht scherm leest daar
// niet.
const TEKSTBALK = `
  (() => {
    const zet = () => {
      // ⚠️ Op een ontbrekende body letten. Een addInitScript draait VÓÓR de body bestaat; de eerste versie
      // riep hier meteen appendChild aan, gooide, en dan werd window.admFilmTekst hieronder nooit meer
      // gedefinieerd. De film kwam er zonder tekst uit en niets meldde het.
      if (!document.body) return;
      if (document.getElementById('adm-film-tekst')) return;
      const el = document.createElement('div');
      el.id = 'adm-film-tekst';
      el.style.cssText = [
        'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:2147483646',
        'padding:28px 64px 34px', 'box-sizing:border-box',
        'background:linear-gradient(to top, rgba(15,23,42,.96) 0%, rgba(15,23,42,.88) 62%, rgba(15,23,42,0) 100%)',
        'color:#fff', 'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
        'font-size:30px', 'line-height:1.35', 'font-weight:600', 'letter-spacing:-.01em',
        'text-align:center', 'pointer-events:none',
        'opacity:0', 'transition:opacity .35s ease',
      ].join(';');
      document.body.appendChild(el);
    };
    zet();
    document.addEventListener('DOMContentLoaded', zet);
    window.admFilmTekst = (t) => {
      zet();
      const el = document.getElementById('adm-film-tekst');
      if (!el) return;
      el.textContent = t ?? '';
      el.style.opacity = t ? '1' : '0';
    };
  })();
`;

const CURSOR = `
  (() => {
    const maak = () => {
      if (document.getElementById('adm-film-cursor')) return;
      const c = document.createElement('div');
      c.id = 'adm-film-cursor';
      c.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:22px;border-radius:50%;' +
        'background:rgba(20,20,20,.28);border:2px solid rgba(255,255,255,.95);box-shadow:0 1px 6px rgba(0,0,0,.45);' +
        'pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%);transition:width .12s,height .12s;';
      document.documentElement.appendChild(c);
      const ring = document.createElement('div');
      ring.id = 'adm-film-klik';
      ring.style.cssText = 'position:fixed;left:0;top:0;width:20px;height:20px;border-radius:50%;' +
        'border:2px solid rgba(13,110,253,.9);pointer-events:none;z-index:2147483646;opacity:0;' +
        'transform:translate(-50%,-50%) scale(1);';
      document.documentElement.appendChild(ring);
      addEventListener('mousemove', e => {
        c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
      }, true);
      addEventListener('mousedown', () => {
        ring.style.transition = 'none'; ring.style.opacity = '1'; ring.style.transform = 'translate(-50%,-50%) scale(1)';
        requestAnimationFrame(() => {
          ring.style.transition = 'transform .45s ease-out, opacity .45s ease-out';
          ring.style.transform = 'translate(-50%,-50%) scale(2.6)'; ring.style.opacity = '0';
        });
      }, true);
    };
    if (document.readyState === 'loading') addEventListener('DOMContentLoaded', maak); else maak();
    new MutationObserver(maak).observe(document.documentElement, { childList: true });
  })();
`;

// ── Bewegen, niet springen (§3.2) ────────────────────────────────────────────────────────────────────────
async function beweegNaar(page, loc) {
  const doos = await loc.boundingBox();
  if (!doos) throw new Error('element heeft geen plaats op het scherm');
  await page.mouse.move(doos.x + doos.width / 2, doos.y + doos.height / 2, { steps: 25 });
  await page.waitForTimeout(180);
}
async function klik(page, loc) { await beweegNaar(page, loc); await loc.click(); }

// ── Audio (§3.1) ─────────────────────────────────────────────────────────────────────────────────────────
// ── WELKE STEM? Expliciet, en nooit stilzwijgend. ────────────────────────────────────────────────────────
//
// ⚠️ GEEN STILLE TERUGVAL. Ontbreekt de ElevenLabs-sleutel, dan valt dit NIET zwijgend terug op de Mac-stem:
// dan zou een film met de plaatshouder-stem zich voordoen als de echte, en dat merkt niemand bij het
// nakijken. De motor staat in het verslag van élke film, en `--stem=say` is een bewuste keuze die je typt.
// ⚠️ De uitvoering staat NIET in de bestandsnaam van de handleidingfilm. Die heet nog steeds
// `kredietdossiers-basis-nl`, want de uitslagtabel én de MkDocs-hook verwijzen daarnaar. Een andere
// uitvoering krijgt haar naam er wél in: `kredietdossiers-basis-website-nl`.
const UITVOERING = (process.argv.find(a => a.startsWith('--uitvoering=')) ?? '').split('=')[1] ?? 'handleiding';

const SLEUTEL = stemGeheim('ApiKey');
const GEVRAAGD = (process.argv.find(a => a.startsWith('--stem=')) ?? '').split('=')[1];
const MOTOR = GEVRAAGD ?? (SLEUTEL ? 'elevenlabs' : 'say');
if (MOTOR === 'elevenlabs' && !SLEUTEL) {
  console.log('⛔ --stem=elevenlabs gevraagd maar er staat geen sleutel in user-secrets.');
  console.log('   dotnet user-secrets set "ElevenLabs:ApiKey" "<de sleutel>"   (in de Host-map)');
  process.exit(1);
}
const STEM_ID = { 'nl-BE': stemGeheim('StemNl'), 'fr-BE': stemGeheim('StemFr') };

// Het model komt uit user-secrets als het gezet is; anders vraagt hij de API wat er beschikbaar is en kiest
// het eerste dat nl én fr draagt. Niet uit het hoofd invullen: modelnamen wijzigen bij die dienst, en een
// verouderde naam geeft een 400 die als "de tekst deugt niet" leest.
// ⚠️ `undefined` = nog niet bepaald, `null` = bewust géén model_id meesturen. stemGeheim() geeft null
// terug wanneer de sleutel ontbreekt, en die twee liepen door elkaar: kiesModel() zag null, dacht "al
// bepaald" en vroeg de lijst nooit op. De film draaide dan op het standaardmodel van de API terwijl de code
// meende multilingual_v2 te kiezen. Enkel de verslagregel "model: standaard van de API" verried het.
let MODEL = stemGeheim('Model') ?? undefined;
let modelGemeld = false;
async function kiesModel() {
  if (MODEL !== undefined) return MODEL;
  const r = await fetch('https://api.elevenlabs.io/v1/models', { headers: { 'xi-api-key': SLEUTEL } });

  // ⚠️ MAG DE SLEUTEL DE LIJST NIET LEZEN, dan kiest de API zélf haar standaardmodel — een oproep zónder
  // model_id werkt (gemeten 01/09/2026, HTTP 200). Dat is bruikbaar, maar je weet dan niet WAT er sprak, en
  // dat mag nooit stil gebeuren: het staat in het verslag van elke film. Zet models_read op de sleutel, of
  // pin ElevenLabs:Model, en dit verdwijnt.
  if (r.status === 401) {
    console.log('⚠️  De sleutel mag /v1/models niet lezen (recht models_read ontbreekt).');
    console.log('    De API kiest dus zelf haar standaardmodel en wij weten niet welk.');
    console.log('    → geef de sleutel models_read, of zet ElevenLabs:Model op een modelnaam.');
    MODEL = null;              // null = geen model_id meesturen
    return MODEL;
  }
  if (!r.ok) throw new Error(`kon de modellen niet opvragen: HTTP ${r.status}`);

  // ⚠️ NIET "de eerste met nl+fr" — dat was toeval en het viel verkeerd uit. Op 01/09/2026 dragen zes
  // modellen beide talen, en de eerste is `eleven_v3`: "the most expressive model… REQUIRES MORE PROMPT
  // ENGINEERING". Voor een pijplijn waar niemand elke zin natuneert is dat precies het verkeerde. De
  // beschrijving van `eleven_multilingual_v2` zegt letterlijk waar wij mee bezig zijn: "best for VOICE
  // OVERS, audiobooks, post-production". Alle vier de kandidaten hebben token_cost_factor 1, dus prijs is
  // geen argument — enkel geschiktheid.
  const alle = await r.json();
  const draagtBeide = m => {
    const t = (m.languages ?? []).map(l => (l.language_id ?? '').toLowerCase());
    return t.includes('nl') && t.includes('fr');
  };
  const voorkeur = ['eleven_multilingual_v2'];
  const kandidaat = alle.find(m => voorkeur.includes(m.model_id) && draagtBeide(m))
                 ?? alle.find(draagtBeide);
  if (!kandidaat) throw new Error('geen enkel model draagt zowel nl als fr — zet ElevenLabs:Model zelf');
  MODEL = kandidaat.model_id;
  if (!modelGemeld) { console.log(`ℹ️  model gekozen: ${MODEL} (${kandidaat.name ?? '?'}) — pin het met ElevenLabs:Model`); modelGemeld = true; }
  return MODEL;
}

// ⚠️ EEN CACHE, en die is niet voor de snelheid. Elke ronde genereert alle zinnen opnieuw; op 31/08/2026 heb
// ik deze film zes keer hernomen om het RITME bij te stellen, en de tekst wijzigde daarbij geen letter. Bij
// een betalende dienst is dat zes keer betalen voor hetzelfde. De sleutel is {tekst, stem, model}: wijzigt
// de zin, dan verdwijnt de cache vanzelf.
const CACHE = new URL('./.films-stem/', import.meta.url).pathname;
mkdirSync(CACHE, { recursive: true });
const cacheNaam = (tekst, stem, model) =>
  `${CACHE}${createHash('sha256').update(`${model ?? 'standaard'}|${stem}|${tekst}`).digest('hex').slice(0, 32)}.wav`;

const duurVan = (pad) => Number(execFileSync('ffprobe',
  ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', pad]).toString().trim());

// ⚠️ LEESTIJD, geen spreektijd. Een geluidloze film heeft geen audiofragment om zijn duur aan te ontlenen,
// dus die komt uit de LENGTE van de zin. 14 tekens per seconde is een rustig ondertiteltempo — sneller leest
// een bezoeker niet mee terwijl hij ook naar het scherm kijkt. Met een ondergrens, want een korte zin mag
// niet voorbijflitsen.
const leestijd = (tekst) => Math.max(2.6, tekst.length / 14);

async function spreek(tekst, taal, pad) {
  if (MOTOR === 'say') {
    execFileSync('say', ['-v', STEM[taal], '-r', String(TEMPO[taal]), '-o', pad + '.aiff', tekst]);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', pad + '.aiff', '-ar', '48000', '-ac', '2', pad]);
    rmSync(pad + '.aiff', { force: true });
    return duurVan(pad);
  }

  const stem = STEM_ID[taal];
  if (!stem) throw new Error(`geen stem voor ${taal} — zet ElevenLabs:Stem${taal.startsWith('fr') ? 'Fr' : 'Nl'}`);
  const model = await kiesModel();
  const uitCache = cacheNaam(tekst, stem, model);

  if (!existsSync(uitCache)) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${stem}`, {
      method: 'POST',
      headers: { 'xi-api-key': SLEUTEL, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify(model ? { text: tekst, model_id: model } : { text: tekst }),
    });
    if (!r.ok) throw new Error(`stem-API: HTTP ${r.status} — ${(await r.text()).slice(0, 200)}`);
    writeFileSync(`${uitCache}.mp3`, Buffer.from(await r.arrayBuffer()));
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', `${uitCache}.mp3`, '-ar', '48000', '-ac', '2', uitCache]);
    rmSync(`${uitCache}.mp3`, { force: true });
  }
  copyFileSync(uitCache, pad);
  return duurVan(pad);
}

const tijd = s => {
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = (s % 60).toFixed(3).padStart(6, '0');
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${r}`;
};

// ── De films ─────────────────────────────────────────────────────────────────────────────────────────────
//
// ⚠️ DRIE SCÈNES UIT §4 KLOPPEN NIET MET HET SCHERM, en dat is gemeten, niet vermoed (30/08/2026):
//   • scène 7 "Kredietaanvragers" is GEEN tabblad maar een blokkop <h6> op de pagina zelf;
//   • scène 8 "Pand" is geen tabblad maar staat in de POP-UP achter de knop "Investeringsfiche & pand" —
//     wat een betere scène oplevert, want een klik die iets opent, filmt beter dan een blok;
//   • scène 9 heet sinds v1.68/1.69 "Gevraagd" / "Demandés", niet "Gevraagde documenten". De regex uit de
//     spec zou dus niets vinden en de hele film laten vallen.
// De drie ⟨FR?⟩-labels komen uit de broncode én zijn op het scherm nagemeten:
//   Nieuw dossier → Nouveau dossier · Investeringsfiche & pand → Fiche d'investissement & bien ·
//   Commissieschema's → Schémas de commission (in het JOURNAAL; SamenvoegPopup zegt "Barèmes de commission"
//   voor hetzelfde begrip — twee Franse termen, gemeld aan Dominique).
const FILMS = [
  ['kredietdossiers-basis', {
    pagina: 'credit-management/credit-files',
    // ⚠️ EEN MENSELIJKE TITEL EN OMSCHRIJVING, per taal. De technische naam ("kredietdossiers-basis-nl") is
    // een sleutel, geen titel: hij stond als videotitel bij Bunny en zou ook in de speler verschijnen.
    // Belangrijker nog: deze twee voeden de schema.org-VideoObject op de handleidingpagina, en dát is wat
    // een zoekmachine leest. Bunny zelf wordt niet geïndexeerd — docs.creditsoft.be wel.
    titel: {
      nl: 'Het kredietdossier in CreditSoft — van lijst tot journaal',
      fr: 'Le dossier de crédit dans CreditSoft — de la liste au journal',
    },
    omschrijving: {
      nl: 'Een rondleiding door het kredietdossier: de lijst filteren en doorzoeken, een dossier openen, '
        + 'de dossiergegevens, de kredietaanvragers, het pand, de gevraagde documenten, en het journaal met '
        + 'de taken, notities, gesprekken en commissieschema\u2019s die bij dat ene dossier horen.',
      fr: 'Une visite guid\u00e9e du dossier de cr\u00e9dit : filtrer et rechercher dans la liste, ouvrir un '
        + 'dossier, les donn\u00e9es du dossier, les demandeurs de cr\u00e9dit, le bien, les documents '
        + 'demand\u00e9s, et le journal avec les t\u00e2ches, notes, appels et sch\u00e9mas de commission '
        + 'li\u00e9s \u00e0 ce dossier.',
    },
    dossier: ID.dossierMetSchema,                 // DEMO-1089 — actief schema, gevuld journaal, alle documentstatussen

    // ── UITVOERINGEN (§12) ───────────────────────────────────────────────────────────────────────────
    // ⚠️ ÉÉN SCENARIO, MEERDERE UITVOERINGEN. De scènes hieronder zijn de enige bron: route, handeling,
    // merkteken én zin. Een uitvoering kiest enkel WELKE scènes ze gebruikt en HOE ze klinkt. Een
    // websitefilm met een eigen scènelijst zou apart verouderen en apart breken; een SELECTIE uit
    // dezelfde lijst erft elke reparatie — vandaag nog gezien met het labelfixje in de pandfiche.
    uitvoeringen: {
      // De handleidingfilm: het volledige verhaal, met stem, ondertitels beschikbaar maar uit.
      handleiding: { stem: true },

      // De websitefilm: korter, en ZONDER STEM. Elke browser start video gedempt, dus wie niet klikt
      // hoort niets — het beeld moet de boodschap dragen. De zinnen komen daarom IN BEELD, en hun
      // leestijd bepaalt de scèneduur in plaats van een audiofragment.
      website: {
        stem: false,
        scenes: ['lijst', 'openen', 'gegevens', 'documenten', 'slot'],
      },
    },
    scenes: [
      { naam: 'lijst',
        doe: async (p) => { await p.goto(`${BASIS}/credit-files`); await p.waitForLoadState('networkidle'); },
        merk: /Kenmerk aanbrenger|Référence apporteur/i,
        nl: 'Het kredietdossier is het hart van CreditSoft. Alles wat bij één aanvraag hoort, staat op één pagina bij elkaar.',
        fr: "Le dossier de crédit est le cœur de CreditSoft. Tout ce qui concerne une demande est rassemblé sur une seule page." },

      { naam: 'kolommen',
        doe: async (p) => { await beweegNaar(p, p.locator('th').nth(3)); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'In de lijst ziet u per dossier het kenmerk van de aanbrenger, de status, het kredietbedrag en de aanvrager.',
        fr: "Dans la liste, vous voyez par dossier la référence apporteur, le statut, le montant du crédit et le demandeur." },

      { naam: 'zoeken',
        doe: async (p) => {
          const vak = p.locator('input[type="search"], input[placeholder*="oek" i], input[placeholder*="echerch" i]').first();
          await klik(p, vak); await vak.type('Demetris', { delay: 90 });
          await p.waitForTimeout(1800);
        },
        merk: /Demetris/i,
        nl: 'Bovenaan zoekt u door de hele lijst. Het aantal gevonden dossiers loopt mee.',
        fr: "En haut, vous cherchez dans toute la liste. Le nombre de dossiers trouvés suit." },

      { naam: 'openen',
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p, f) => { await p.goto(`${BASIS}/credit-files/${f.dossier}`); await p.waitForLoadState('networkidle'); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'We openen een bestaand dossier.',
        fr: "Ouvrons un dossier existant." },

      { naam: 'gegevens',
        doe: async (p) => { await p.waitForTimeout(400); },
        merk: /Datum indiening|Date de dépôt/i,
        nl: 'Bovenaan staan de dossiergegevens: de status, het kredietbedrag, de instelling en de datums van indiening en ingang.',
        fr: "En haut se trouvent les données du dossier : le statut, le montant du crédit, l'institution et les dates de dépôt et d'effet." },

      { naam: 'aanvragers',
        doe: async (p) => {
          const kop = p.locator('h6', { hasText: /Kredietaanvragers|Demandeurs de crédit/ }).first();
          await kop.scrollIntoViewIfNeeded(); await beweegNaar(p, kop);
        },
        merk: /Kredietaanvragers|Demandeurs de crédit/i,
        nl: 'Onder Kredietaanvragers staan alle aanvragers van dit dossier, met hun gegevens en hun rol.',
        fr: "Sous Demandeurs de crédit figurent tous les demandeurs de ce dossier, avec leurs données et leur rôle." },

      { naam: 'pand',
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p) => {
          await klik(p, p.locator('button', { hasText: /Investeringsfiche & pand|Fiche d'investissement & bien/ }).first());
          await p.waitForTimeout(1400);
        },
        merk: /^(Pand|Bien)$/im,
        nl: 'Achter Investeringsfiche en pand vindt u het adres, de aard en de waarde van het pand — en die waarde bepaalt mee de quotiteit.',
        fr: "Derrière Fiche d'investissement et bien, vous trouvez l'adresse, la nature et la valeur du bien — et cette valeur détermine en partie la quotité." },

      { naam: 'documenten',
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(900);
          await klik(p, p.locator('[role="tab"]', { hasText: /^(Gevraagd|Demandés)\s*\(/ }).first());
          await p.waitForTimeout(1200);
        },
        merk: /Ontvangen|Reçu/i,
        nl: 'Bij Gevraagd volgt u per stuk of het aangeleverd is en of het al beoordeeld werd.',
        fr: "Dans Demandés, vous suivez pièce par pièce ce qui a été fourni et ce qui a déjà été évalué." },

      // ⚠️ TWEE SCÈNES, en dat was eerst één. Drie klikken na elkaar met één zin erover gaf 8,1 seconden
      // stilte vóór die zin — de kijker zat naar drie handelingen te kijken waar niemand iets bij zei.
      //
      { naam: 'journaal',
        aanloop: 1.0,
        doe: async (p) => {
          await klik(p, p.locator('button', { hasText: /^(Journaal|Journal)$/ }).first());
          await p.locator('.adm-section-switch-btn').first().waitFor({ timeout: 10000 });
        },
        // ⚠️ Het merkteken is een TAAK, en dat kon tot 31/08/2026 niet. Het journaal opent op Taken, en geen
        // enkel demo-dossier mét een commissieschema had er één — de zin over taken, notities en gesprekken
        // speelde dus boven "Nog geen taken". JournaalTestData vult sinds vandaag het journaal van de
        // RIJKSTE dossiers, en de ID-tabel wijst naar zo'n dossier.
        merk: /Aktedatum bevestigen|Commissieschema nakijken/i,
        nl: 'Elk dossier draagt zijn eigen journaal: taken, notities, gesprekken, bijlagen en mailverkeer.',
        fr: "Chaque dossier porte son propre journal : tâches, notes, appels, pièces jointes et courrier." },

      { naam: 'commissieschemas',
        aanloop: 1.0,
        doe: async (p) => {
          await klik(p, p.locator('.adm-section-switch-btn').first());
          await p.locator('.adm-menu-item').first().waitFor({ timeout: 10000 });
          await klik(p, p.locator('.adm-menu-item', { hasText: /Commissieschema|Schémas de commission/ }).first());
        },
        merk: /Herberekenen|Recalculer/i,
        nl: 'En de commissieschema’s: wat er op dit dossier per aanbrenger verdiend wordt.',
        fr: "Et les schémas de commission : ce qui est gagné par apporteur sur ce dossier." },

      { naam: 'slot',
        // ⚠️ KORTE aanloop, en dat is de regel: de aanloop bestaat om een NIEUW scherm te laten landen.
        // Hier verandert er niets — het journaalpaneel gaat dicht en het dossier staat er weer. Eerst stond
        // hier 1,0 s aanloop en 1,6 s adem, langer dan standaard, en dan duurt een zin van 4 seconden er
        // tien. Dominique hoorde het: "de laatste zin duurde precies wat lang."
        aanloop: 0.2, adem: 0.4,
        doe: async (p) => {
          await p.keyboard.press('Escape');
          // Op een TOESTAND wachten en niet op een timer (§3.4): hier stond waitForTimeout(1200), en dat
          // waren 1,2 seconden dode lucht bovenop de aanloop.
          await p.locator('.adm-section-switch-btn').first().waitFor({ state: 'hidden', timeout: 8000 });
        },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'Eén dossier, één pagina. Wat uitbetaald is, blijft.',
        fr: "Un dossier, une page. Ce qui a été payé, reste." },
    ],
  }],
];

// ── Draaien ──────────────────────────────────────────────────────────────────────────────────────────────
mkdirSync(UIT, { recursive: true });
const verslag = { gemaakt: [], gevallen: [] , overgeslagen: [] };

for (const [naam, filmVol] of FILMS) {
  if (filter && !naam.includes(filter)) continue;

  const uitv = filmVol.uitvoeringen?.[UITVOERING];
  if (!uitv) {
    console.log(`⏭  ${naam} — geen uitvoering "${UITVOERING}"`);
    continue;
  }
  // ⚠️ Een SELECTIE uit dezelfde scènelijst, niet een eigen lijst. Zo erft elke uitvoering de reparaties
  // van het scenario. Een naam die niet bestaat is een fout en geen stille overslag: dan mist de film een
  // scène en niemand ziet het.
  const gekozen = uitv.scenes
    ? uitv.scenes.map(n => {
        const sc = filmVol.scenes.find(x => x.naam === n);
        if (!sc) throw new Error(`uitvoering "${UITVOERING}" van ${naam} noemt scène "${n}" die niet bestaat`);
        return sc;
      })
    : filmVol.scenes;
  const film = { ...filmVol, scenes: gekozen };
  const metStem = uitv.stem !== false;
  // De handleiding houdt haar bestaande naam (de uitslagtabel en de hook verwijzen ernaar).
  const stam = UITVOERING === 'handleiding' ? naam : `${naam}-${UITVOERING}`;
  console.log(`\n▶ ${naam} · uitvoering ${UITVOERING} — ${gekozen.length} van ${filmVol.scenes.length} scènes, `
    + `${metStem ? 'met stem' : 'ZONDER stem (tekst in beeld)'}`);

  for (const taal of ['nl-BE', 'fr-BE']) {
    // ⚠️ Een taal zonder stem wordt OVERGESLAGEN, niet gekraakt — maar wel luidop. Zo kan je het Nederlands
    // al opnemen terwijl de Franse stem nog gekozen moet worden, zonder dat er ooit twijfel bestaat over
    // welke talen er in deze ronde gemaakt zijn. Stil overslaan is wat een halve ronde als een hele laat
    // lezen, en dat is precies de fout die de beeldgenerator ooit maakte.
    if (metStem && MOTOR === 'elevenlabs' && !STEM_ID[taal]) {
      console.log(`\n⏭  ${taal} OVERGESLAGEN — geen stem gezet.`);
      console.log(`    dotnet user-secrets set "ElevenLabs:Stem${taal.startsWith('fr') ? 'Fr' : 'Nl'}" "<voice-id>"`);
      verslag.overgeslagen.push(`${taal}: geen stem in user-secrets`);
      continue;
    }
    const kort = taal.startsWith('fr') ? 'fr' : 'nl';
    const werk = `${UIT}${stam}-${kort}/`;
    rmSync(werk, { recursive: true, force: true }); mkdirSync(werk, { recursive: true });

    // 1 ─ GELUID EERST. Zonder dit weet niets hoelang een scène moet duren.
    console.log(`\n🎙  ${naam} · ${taal} — ${film.scenes.length} ${metStem ? 'fragmenten' : 'schermteksten'}`);
    const duren = [];
    for (const [i, sc] of film.scenes.entries()) {
      const d = metStem
        ? await spreek(sc[kort], taal, `${werk}${String(i).padStart(2, '0')}-${sc.naam}.wav`)
        : leestijd(sc[kort]);
      duren.push(d);
      console.log(`     ${String(i + 1).padStart(2)} ${sc.naam.padEnd(12)} ${d.toFixed(1)}s  ${sc[kort].slice(0, 58)}…`);
    }
    const totaal = duren.reduce((a, b) => a + b, 0);
    console.log(`     ── samen ${totaal.toFixed(0)}s ${metStem ? `gesproken met ${MOTOR}` : 'leestijd'}`);
    if (DROOG) continue;

    // 2 ─ AANMELDEN BUITEN DE OPNAME. Anders staat het inlogscherm in de film.
    const browser = await chromium.launch();
    const voorbereiding = await browser.newContext({ viewport: { width: BREED, height: HOOG } });
    const vp = await voorbereiding.newPage();
    await meldAan(vp, gebruiker, wachtwoord, true);
    await vp.goto(`${BASIS}/culture/set?c=${taal}`); await vp.waitForLoadState('networkidle');
    const staat = await voorbereiding.storageState();
    await voorbereiding.close();

    // 3 ─ OPNEMEN. Elke scène duurt minstens zolang als haar fragment.
    const ctx = await browser.newContext({
      viewport: { width: BREED, height: HOOG }, deviceScaleFactor: 1, storageState: staat,
      recordVideo: { dir: werk, size: { width: BREED, height: HOOG } },
    });
    await ctx.addInitScript(CURSOR);
    if (!metStem) await ctx.addInitScript(TEKSTBALK);
    await ctx.addInitScript((css) => {
      const stijl = document.createElement('style');
      stijl.textContent = css;
      document.addEventListener('DOMContentLoaded', () => document.head.appendChild(stijl));
    }, VERBERG_VERSIE);
    const page = await ctx.newPage();
    const t0 = Date.now();
    const merken = [];       // start-, spraak- en eindtijd per scène, t.o.v. het begin van de opname
    let gevallen = null;

    for (const [i, sc] of film.scenes.entries()) {
      const start = (Date.now() - t0) / 1000;
      try {
        await sc.doe(page, film);
        // ⚠️ WACHTEN OP EEN TOESTAND, NIET OP EEN TIMER (§3.4). Het merkteken IS de toestand.
        await page.locator('body').filter({ hasText: sc.merk }).first().waitFor({ timeout: 15000 });
      } catch (e) {
        gevallen = `${sc.naam} — ${String(e).split('\n')[0].slice(0, 120)}`;
        break;
      }
      // ⚠️ De versiefilter opnieuw aanbrengen: Blazor's enhanced navigation vervangt de <head> bij een
      // klik-navigatie en gooit de ingespoten stijl weg. Gemeten bij de beeldgenerator op 31/08/2026.
      await page.addStyleTag({ content: VERBERG_VERSIE }).catch(() => {});

      // Het scherm staat er (het merkteken is gevonden). Eerst laten LANDEN, dan pas praten — de kijker
      // moet kunnen zien wát er veranderd is vóór iemand het uitlegt.
      await page.waitForTimeout((sc.aanloop ?? (i === 0 ? AANLOOP_START : AANLOOP)) * 1000);
      const spraak = (Date.now() - t0) / 1000;
      // ⚠️ De tekst verschijnt PAS NA de aanloop, samen met waar de stem zou beginnen. Zo leest de kijker
      // niet over een scherm dat nog aan het laden is, en houdt de geluidloze film hetzelfde ritme als de
      // gesproken versie — dezelfde tijdlijn, alleen een ander medium.
      // ⚠️ NIET .catch(() => {}). Dat slikte de eerste keer op dat window.admFilmTekst niet bestond, en de
      // film kwam er zonder tekst uit terwijl het verslag "gelukt" zei. Een geluidloze film ZONDER tekst is
      // een lege film — dat moet de scène laten vallen, net als een ontbrekend merkteken.
      if (!metStem) {
        const gezet = await page.evaluate(t => {
          if (typeof window.admFilmTekst !== 'function') return false;
          window.admFilmTekst(t);
          const el = document.getElementById('adm-film-tekst');
          return !!el && el.textContent === t;
        }, sc[kort]);
        if (!gezet) { gevallen = `${sc.naam} — de tekstbalk kwam niet in beeld`; break; }
      }
      // De zin, en daarna de adem. Die adem is geen opvulling: hij is het verschil tussen een voorlezende
      // machine en iemand die iets uitlegt.
      await page.waitForTimeout(duren[i] * 1000);
      // Tekst weg vóór de adem, zodat de volgende handeling niet onder een blijvende zin gebeurt.
      if (!metStem) await page.evaluate(() => window.admFilmTekst?.(''));
      await page.waitForTimeout((sc.adem ?? ADEM) * 1000);
      merken.push({ naam: sc.naam, start, spraak, eind: (Date.now() - t0) / 1000 });
    }
    await page.waitForTimeout(NASLEEP * 1000);
    const videoPad = await page.video().path();
    await ctx.close(); await browser.close();

    // 4 ─ EEN SCÈNE DIE VIEL, LAAT DE HELE FILM VALLEN (§5)
    if (gevallen) {
      console.log(`  ❌ ${stam}-${kort} GEVALLEN op scène ${gevallen}`);
      verslag.gevallen.push(`${stam}-${kort}: ${gevallen}`);
      continue;
    }

    // 5 ─ GELUID ONDER HET BEELD, op de GEMETEN scènetijden — niet op de geplande.
    //
    // ⚠️ Een film ZONDER stem krijgt ook geen STIL geluidsspoor. Een leeg spoor meesturen zou een
    // audiokanaal opleveren dat nergens toe dient, en sommige spelers tonen dan een volumeknop die niets
    // doet — dat leest als een defect. Geen kanaal is duidelijker dan een doof kanaal.
    const lijst = [];
    let cursor = 0;
    const stilte = (lengte, merk) => {
      const pad = `${werk}stil-${merk}.wav`;
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi',
        '-i', 'anullsrc=r=48000:cl=stereo', '-t', String(lengte), pad]);
      return pad;
    };
    // ⚠️ Op m.spraak en niet op m.start: de zin hoort te beginnen wanneer het scherm klaar staat, niet
    // wanneer de handeling begint. De stilte ertussen is de aanloop + de adem van de vorige scène.
    for (const [i, m] of merken.entries()) {
      if (!metStem) break;
      if (m.spraak > cursor + 0.02) lijst.push(stilte(m.spraak - cursor, i));
      lijst.push(`${werk}${String(i).padStart(2, '0')}-${m.naam}.wav`);
      cursor = m.spraak + duren[i];
    }
    // ⚠️ En stilte tot het einde van het BEELD. Zonder dit knipt `-shortest` hieronder de nasleep eraf:
    // het spoor is dan korter dan de opname, en de film eindigt op het laatste woord.
    if (metStem) {
      const beeldEind = merken[merken.length - 1].eind + NASLEEP;
      if (beeldEind > cursor + 0.02) lijst.push(stilte(beeldEind - cursor, 'slot'));
      writeFileSync(`${werk}spoor.txt`, lijst.map(f => `file '${f}'`).join('\n'));
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0',
        '-i', `${werk}spoor.txt`, '-c', 'copy', `${werk}spoor.wav`]);
    }

    const mp4 = `${UIT}${stam}-${kort}.mp4`;
    execFileSync('ffmpeg', metStem
      ? ['-y', '-loglevel', 'error', '-i', videoPad, '-i', `${werk}spoor.wav`,
         '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p',
         '-c:a', 'aac', '-b:a', '128k', '-shortest', mp4]
      : ['-y', '-loglevel', 'error', '-i', videoPad,
         '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-an', mp4]);

    // 6 ─ Ondertitels: de tekst bestaat al, dus dat is gratis (§7)
    const vtt = ['WEBVTT', ''];
    for (const [i, m] of merken.entries())
      vtt.push(`${tijd(m.spraak)} --> ${tijd(m.spraak + duren[i])}`, film.scenes[i][kort], '');
    writeFileSync(`${UIT}${stam}-${kort}.vtt`, vtt.join('\n'));

    const lengte = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'csv=p=0', mp4]).toString().trim());
    console.log(`  ✅ ${stam}-${kort}.mp4 — ${lengte.toFixed(0)}s, ${film.scenes.length} scènes`
      + `${metStem ? ', ondertitels erbij' : ', zonder geluid (tekst in beeld)'}`);
    // 7 ─ De uitslag: scènetijden voor de hoofdstukken, en een hash om veroudering te kunnen zien.
    //     De guid komt er later bij, bij het uploaden — die kent de generator hier nog niet.
    const sleutel = `${stam}-${kort}`;
    uitslag[sleutel] = {
      film: naam, taal, pagina: film.pagina, lengte: Number(lengte.toFixed(2)),
      titel: film.titel?.[kort] ?? naam,
      omschrijving: film.omschrijving?.[kort] ?? '',
      // ⚠️ De hash draagt de NARRATIE én de route, want dat zijn de twee dingen die een film inhoudelijk
      // verouderd maken. Niet de scènetijden: die verschillen per opname met een paar honderdsten, en dan
      // zou elke ronde alles als "gewijzigd" melden.
      hash: createHash('sha256').update(JSON.stringify({
        pagina: film.pagina,
        scenes: film.scenes.map(sc => [sc.naam, sc[kort], String(sc.doe)]),
      })).digest('hex').slice(0, 16),
      guid: uitslag[sleutel]?.guid ?? null,     // blijft staan tot bunny.mjs hem vervangt
      hoofdstukken: merken.map((m, i) => ({
        titel: film.scenes[i].naam, start: Number(m.spraak.toFixed(2)),
        eind: Number((m.spraak + duren[i]).toFixed(2)),
      })),
    };
    bewaarUitslag();

    verslag.gemaakt.push(`${stam}-${kort} (${lengte.toFixed(0)}s, `
      + `${metStem ? `stem: ${MOTOR}, model: ${MODEL ?? 'standaard van de API'}` : 'geen stem'})`);
  }
}

console.log(`\n${'─'.repeat(88)}`);
if (verslag.gemaakt.length) console.log(`✅ ${verslag.gemaakt.length} film(s): ${verslag.gemaakt.join(', ')}`);
if (verslag.overgeslagen.length) {
  console.log(`\n⏭  ${verslag.overgeslagen.length} overgeslagen:`);
  verslag.overgeslagen.forEach(r => console.log(`   ${r}`));
}
if (verslag.gevallen.length) { console.log(`❌ ${verslag.gevallen.length} gevallen:`); verslag.gevallen.forEach(r => console.log(`   ${r}`)); }
if (DROOG) console.log('🅓 Droge proef — enkel geluid gemaakt, niets opgenomen.');
else if (!verslag.gemaakt.length && !verslag.gevallen.length)
  console.log("⚠️  Geen enkele film geraakt door de filter — bedoelde je een andere naam?");
