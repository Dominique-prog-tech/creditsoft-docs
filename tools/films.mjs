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
import { BASIS, ID, gebruiker, wachtwoord, meldAan, stemGeheim, appToestand } from './aansturing.mjs';

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

// ── Een knop in de kopbalk, in BEIDE talen ───────────────────────────────────────────────────────────────
// ⚠️ Niet op `button[title="Zoeken (⌘K)"]`. Die titel is VERTAALD — in het Frans staat er "Rechercher (⌘K)",
// en dan draait de Nederlandse film goed en de Franse in een time-out. Elke film hierna gebruikt deze.
// De knoppen dragen geen stabiele klasse, dus de titel is wat er is; één regex dekt de twee talen samen.
const kopbalkKnop = (page, patroon) => page.getByTitle(patroon).first();

// Een tabblad op een fiche, in beide talen. Tabbladen dragen `role=tab`; op naam is stabieler dan op index,
// want de tabreeks verschilt per soort relatie (een bedrijf heeft geen "Bijkomend" met geboortedatum).
const tabblad = (page, patroon) => page.getByRole('tab').filter({ hasText: patroon }).first();

// ── De hoofdstuktitel van een scène, per taal ────────────────────────────────────────────────────────────
// Zie de noot bij `hoofdstukken:` verderop. Ontbreekt `kop`, dan valt dit terug op de interne scènenaam en
// wordt dat GETELD — de ronde meldt het op het eind, zodat het niet opnieuw jaren onopgemerkt blijft.
const zonderKop = new Set();
const zonderTaal = new Set();
function kop(scene, taal) {
  if (scene.kop?.[taal]) return scene.kop[taal];
  // ⚠️ EEN TERUGVAL DIE NIET FAALT, LIEGT. Zonder deze telling kreeg de Engelse uitvoering stilzwijgend
  // Nederlandse hoofdstukken ("Kredietdossiers · Klanten en relaties") — een aannemelijk antwoord op de
  // verkeerde vraag, en niets dat uitnodigde tot twijfel. Gemerkt op 01/09/2026, ná het doorduwen.
  if (scene.kop?.nl) { zonderTaal.add(`${scene.naam} (${taal})`); return scene.kop.nl; }
  zonderKop.add(scene.naam);
  return scene.naam;
}

// ── Een zijlade sluiten — en de twee soorten sluiten NIET hetzelfde ──────────────────────────────────────
// ⚠️ Gemeten op 01/09/2026: de ZOEKlade sluit met Escape, de HULPlade niet — daar blijft `.prefs-backdrop`
// staan, en die vangt de volgende klik af. De film viel dan op een time-out van 30 s in de scène erna, en
// de foutmelding wees naar de knop die niet klikbaar was in plaats van naar de lade die open bleef.
// Escape eerst (dat is wat een gebruiker doet), en pas als de backdrop blijft staan erop klikken.
async function sluitLade(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  if (await page.locator('.prefs-backdrop').count()) {
    await page.locator('.prefs-backdrop').first().click({ force: true });
    await page.waitForTimeout(700);
  }
}

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
  // ── DE OVERZICHTSFILM VOOR DE HOMEPAGE ───────────────────────────────────────────────────────────────
  //
  // ⚠️ EEN ANDER SOORT FILM, GEEN KORTERE. `kredietdossiers-basis` LEERT iets: hoe je een dossier opent,
  // waar het tabblad Gevraagd zit. Dat is het verkeerde gesprek met iemand die nog niet weet wát CreditSoft
  // is. Deze film POSITIONEERT: één scène per module, landen en één zin, geen doorklikken.
  //
  // Dominique zag dat zelf toen hij naar de eerste websitefilm keek — die was de handleidingfilm met zes
  // scènes eruit, en hij was nog steeds aan het uitleggen.
  //
  // De acht modules zijn die van creditsoft-website zelf (`feat.*.title` in src/i18n/ui.ts), in de volgorde
  // waarin een makelaar erover denkt: eerst het dossier, dan de mensen eromheen, dan het papierwerk, dan wat
  // hij eraan verdient. De teksten zijn VERKOOPTEKST en komen dus niet uit de handleiding — dat is geen
  // tweede bron voor dezelfde zin, het is andere tekst voor een ander publiek.
  //
  // ⚠️ Elk merkteken bewijst DATA, niet enkel het scherm. Een paginatitel verschijnt ook boven een lege
  // lijst, en een marketingfilm van een leeg scherm is erger dan geen film.
  ['creditsoft-overzicht', {
    pagina: null,                                  // hoort op de website, niet op een handleidingpagina
    titel: {
      nl: 'CreditSoft in drie kwartier minuten — de modules in het kort',
      fr: 'CreditSoft en bref — les modules en un coup d\u2019\u0153il',
    },
    omschrijving: {
      nl: 'Een kort overzicht van CreditSoft voor kredietmakelaars: kredietdossiers, klanten, documenten, '
        + 'de portalen voor klant en aanbrenger, de commissieberekening, borderellen en fiche 281.50, het '
        + 'vooruitzicht en het beheer van uw kredietverstrekkers.',
      fr: 'Un bref aper\u00e7u de CreditSoft pour les courtiers en cr\u00e9dit : dossiers de cr\u00e9dit, '
        + 'clients, documents, les portails client et apporteur, le calcul des commissions, les bordereaux '
        + 'et la fiche 281.50, la perspective et la gestion de vos pr\u00eateurs.',
    },
    uitvoeringen: {
      // ⚠️ SCHERMTAAL ≠ TEKSTTAAL. De site draagt drie talen, de app maar twee — Program.cs zet
      // AdmLocalisatie.Opties("nl-BE", "fr-BE"). Voor het Engels tonen we dus een Nederlands scherm met
      // ENGELSE tekst in de balk: die tekst komt uit dit scenario en niet uit de app. Bij een geluidloze
      // film is dat de enige weg — ondertitels helpen niet, want de tekst staat ín het beeld.
      website: {
        stem: false,
        talen: [
          { ui: 'nl-BE', tekst: 'nl' },
          { ui: 'fr-BE', tekst: 'fr' },
          { ui: 'nl-BE', tekst: 'en' },
        ],
      },
    },
    scenes: [
      { naam: 'dossiers', kop: { nl: 'Kredietdossiers', fr: "Dossiers de crédit", en: "Credit files" },
        doe: async (p) => { await p.goto(`${BASIS}/credit-files`); await p.waitForLoadState('networkidle'); },
        merk: /DEMO-\d+/,
        nl: 'Alles van \u00e9\u00e9n kredietaanvraag op \u00e9\u00e9n pagina.',
        en: 'Everything about one credit application on a single page.',
        fr: "Tout d'une demande de cr\u00e9dit sur une seule page." },

      { naam: 'klanten', kop: { nl: 'Klanten en relaties', fr: "Clients et relations", en: "Clients and relations" },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); },
        merk: /Adriaenssens|Aerts|Peeters/,
        nl: 'Uw klant, zijn gezin en zijn geschiedenis: \u00e9\u00e9n fiche.',
        en: 'Your client, their family and their history: one record.',
        fr: "Votre client, sa famille et son historique : une fiche." },

      { naam: 'documenten', kop: { nl: 'Documenten', fr: "Documents", en: "Documents" },
        doe: async (p) => { await p.goto(`${BASIS}/krediet/documenten-valideren`); await p.waitForLoadState('networkidle'); },
        merk: /DEMO-\d+/,
        nl: 'Documenten opvragen, ontvangen en beoordelen.',
        en: 'Request, receive and review documents.',
        fr: "Demander, recevoir et \u00e9valuer les documents." },

      { naam: 'portalen', kop: { nl: 'De portalen', fr: "Les portails", en: "The portals" },
        // ⚠️ Het OPMAAKSCHERM en niet het echte portaal. Dat laatste vraagt een aparte aanmelding, en in een
        // doorlopende opname zou het aanmeldscherm in beeld komen. Het voorbeeldpaneel rechts toont het
        // portaal in de huisstijl, mét de voortgang en de documentstatussen — dat is wat de zin belooft.
        doe: async (p) => { await p.goto(`${BASIS}/beheer/klantportaal`); await p.waitForLoadState('networkidle'); },
        merk: /Welkom bij uw dossier|Bienvenue dans votre dossier/,
        nl: 'Uw klanten en aanbrengers leveren zelf aan.',
        en: 'Your clients and brokers upload it themselves.',
        fr: "Vos clients et apporteurs d\u00e9posent eux-m\u00eames." },

      { naam: 'commissies', kop: { nl: 'Commissie', fr: "Commissions", en: "Commissions" },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/schemas`); await p.waitForLoadState('networkidle'); },
        merk: /Sandbox|Baken|Meridiaan|Horizon/,
        nl: 'Commissie berekend zoals u ze afsprak.',
        en: 'Commission calculated exactly as you agreed it.',
        fr: "La commission calcul\u00e9e comme vous l'avez convenue." },

      { naam: 'borderellen', kop: { nl: 'Borderellen', fr: "Bordereaux", en: "Statements" },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/borderel`); await p.waitForLoadState('networkidle'); },
        merk: /Voorbeeld|Demo Krediet|Hypotheek/,
        nl: 'Van berekening tot borderel en fiche 281.50, zonder \u00e9\u00e9n cel Excel.',
        en: 'From calculation to statement and tax form, without a single Excel cell.',
        fr: "Du calcul au bordereau et \u00e0 la fiche 281.50, sans une seule cellule Excel." },

      { naam: 'vooruitzicht', kop: { nl: 'Vooruitzicht', fr: "Prévisions", en: "Forecast" },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/vooruitzicht`); await p.waitForLoadState('networkidle'); },
        merk: /Baken|Meridiaan|Horizon|Proefmakelaars/,
        nl: 'En u ziet vooruit wat er nog binnenkomt.',
        en: 'And you see ahead what is still coming in.',
        fr: "Et vous voyez \u00e0 l'avance ce qui va rentrer." },

      { naam: 'instellingen', kop: { nl: 'Instellingen', fr: "Paramètres", en: "Settings" },
        doe: async (p) => { await p.goto(`${BASIS}/credit/financial-institutions`); await p.waitForLoadState('networkidle'); },
        merk: /AG Insurance|Allianz|Axa/,
        nl: "Uw kredietverstrekkers, met hun eigen schema's.",
        en: 'Your lenders, each with their own commission schemes.',
        fr: "Vos pr\u00eateurs, avec leurs propres sch\u00e9mas." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 1 van de reeks (§14). De film die iederéén als eerste ziet: hoe je je weg vindt.
  //
  // ⚠️ GEEN SCÈNE MET HET BELLETJE, en dat is met opzet. Het belletje toont taken die aan JOU toegewezen
  // zijn (`AchterstalligeTakenMelder.MijnIdsAsync`), en de demo-operator heeft er geen — het paneel zegt
  // "Geen meldingen". Een scène die belooft "hier ziet u uw achterstallige taken" boven een leeg paneel is
  // erger dan geen scène. Het staat wél in navigatie.md; zodra de generator de operator taken toewijst,
  // hoort deze film een scène `belletje` te krijgen. Zie het geheugen: demo-mist-stelselmatig-randgevallen.
  ['aan-de-slag', {
    pagina: 'getting-started/navigatie',
    titel: {
      nl: 'Uw weg vinden in CreditSoft — het scherm, het zoeken en uw voorkeuren',
      fr: 'Se repérer dans CreditSoft — l’écran, la recherche et vos préférences',
    },
    omschrijving: {
      nl: 'De eerste rondleiding: het startscherm met het blok Aan de slag, het menu links, zoeken over uw '
        + 'hele omgeving met ⌘K, de hulp bij elk scherm en de twee assistenten, werken in een lijst '
        + '(sorteren, filteren, exporteren) en uw eigen voorkeuren — grootte, thema en taal.',
      fr: 'La première visite guidée : l’écran d’accueil avec le bloc Pour commencer, '
        + 'le menu de gauche, la recherche dans tout votre environnement avec ⌘K, l’aide sur chaque '
        + 'écran et les deux assistants, le travail dans une liste (trier, filtrer, exporter) et vos '
        + 'préférences — taille, thème et langue.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'start', kop: { nl: 'Het startscherm', fr: "L'écran d'accueil" },
        doe: async (p) => { await p.goto(`${BASIS}/dashboard`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1200); },
        merk: /Aan de slag|Pour commencer/i,
        nl: 'Dit is uw startscherm. Zolang uw omgeving voorbeeldgegevens draagt, staat bovenaan het blok Aan de slag met de drie dingen die u het eerst instelt.',
        fr: "Voici votre écran d’accueil. Tant que votre environnement contient des données d’exemple, le bloc Pour commencer affiche en haut les trois choses à configurer en premier." },

      { naam: 'menu', kop: { nl: 'Het menu links', fr: "Le menu de gauche" },
        doe: async (p) => { await beweegNaar(p, p.locator('nav a, .adm-nav a').first()); await p.waitForTimeout(900); },
        merk: /KREDIET|CRÉDIT/i,
        nl: 'Links staat het menu, gegroepeerd zoals u werkt: CRM, Krediet, Lijsten en Beheer. De getallen ernaast zijn wat op u wacht.',
        fr: "À gauche, le menu, groupé comme vous travaillez : CRM, Crédit, Listes et Gestion. Les chiffres à côté indiquent ce qui vous attend." },

      { naam: 'zoeken', kop: { nl: 'Zoeken vanaf elk scherm', fr: "Rechercher depuis tout écran" },
        doe: async (p) => {
          await klik(p, kopbalkKnop(p, /Zoeken|Rechercher/i));
          await p.waitForTimeout(900);
          await p.keyboard.type('Cuypers', { delay: 95 });
          await p.waitForTimeout(2600);
        },
        merk: /Kredietdossiers|Dossiers de crédit/i,
        nl: 'Zoeken doet u overal vandaan, met de knop bovenaan of met Command K. U typt een naam, en CreditSoft zoekt in uw relaties, dossiers, aanbrengers en taken tegelijk.',
        fr: "La recherche est accessible partout, via le bouton en haut ou avec Commande K. Vous tapez un nom et CreditSoft cherche simultanément dans vos relations, dossiers, apporteurs et tâches." },

      { naam: 'hulp', kop: { nl: 'Hulp bij dit scherm', fr: "Aide sur cet écran" },
        doe: async (p) => {
          await sluitLade(p);
          await klik(p, kopbalkKnop(p, /Hulp bij dit scherm|Aide pour cet écran/i));
          await p.waitForTimeout(1800);
        },
        // ⚠️ GEEN APOSTROF IN EEN MERKTEKEN. Hier stond `d’accueil` met een typografische apostrof en de
        // app schrijft `d'accueil` met een rechte — de Franse film viel op zijn eigen beloftecontrole
        // terwijl het scherm perfect klopte. Kies een stuk zin zonder leesteken; dat kan altijd.
        merk: /in welke fase zitten|dans quelle phase/i,
        nl: 'Op elk scherm zit rechtsboven een vraagteken. Dat opent de hulp voor precies dit scherm, niet een algemene handleiding.',
        fr: "Sur chaque écran, un point d’interrogation en haut à droite ouvre l’aide de cet écran précis, et non un manuel général." },

      { naam: 'assistenten', kop: { nl: 'De twee assistenten', fr: "Les deux assistants" },
        doe: async (p) => {
          await sluitLade(p);
          await klik(p, kopbalkKnop(p, /Vraag het de handleiding|Demander au manuel/i));
          await p.waitForTimeout(1800);
        },
        merk: /Hulp-assistent|Assistant d.aide/i,
        nl: 'Komt u er niet uit, dan zijn er twee assistenten: één die de handleiding leest, en één die uw eigen cijfers opzoekt en het antwoord als tabel geeft.',
        fr: "Si vous bloquez, deux assistants existent : l’un lit le manuel, l’autre interroge vos propres chiffres et répond sous forme de tableau." },

      { naam: 'lijst', kop: { nl: 'Werken met lijsten', fr: "Travailler avec les listes" },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1600);
        },
        merk: /Nieuwe relatie|Nouvelle relation/i,
        nl: 'Elke lijst in CreditSoft werkt hetzelfde. Wat u hier leert, geldt ook voor uw dossiers, uw aanbrengers en uw taken.',
        fr: "Toutes les listes de CreditSoft fonctionnent de la même manière. Ce que vous apprenez ici vaut aussi pour vos dossiers, vos apporteurs et vos tâches." },

      { naam: 'sorteren', kop: { nl: 'Sorteren', fr: "Trier" },
        doe: async (p) => { await klik(p, p.locator('th').nth(1)); await p.waitForTimeout(1800); },
        merk: /Naam|Nom/i,
        nl: 'U sorteert door op een kolomkop te klikken. Klikt u nog eens, dan draait de volgorde om.',
        fr: "Vous triez en cliquant sur un en-tête de colonne. Un second clic inverse l’ordre." },

      { naam: 'filteren', kop: { nl: 'Filteren', fr: "Filtrer" },
        doe: async (p) => {
          const z = p.locator('input[type="search"]:visible, input[placeholder*="oek" i]:visible, input[placeholder*="echerch" i]:visible').first();
          await klik(p, z); await z.type('Cuypers', { delay: 90 }); await p.waitForTimeout(2400);
        },
        merk: /Cuypers/i,
        nl: 'Boven de lijst filtert u. Wat u typt, zoekt in alle kolommen tegelijk, en de lijst krimpt terwijl u typt.',
        fr: "Au-dessus de la liste, vous filtrez. Ce que vous tapez cherche dans toutes les colonnes à la fois, et la liste se réduit pendant que vous tapez." },

      { naam: 'werkbalk', kop: { nl: 'Exporteren', fr: "Exporter" },
        doe: async (p) => { await beweegNaar(p, p.getByText('Exporteren', { exact: true }).or(p.getByText('Exporter', { exact: true })).first()); await p.waitForTimeout(1200); },
        merk: /Exporteren|Exporter/i,
        nl: 'Wat u ziet, kunt u meenemen: exporteren geeft u precies uw huidige selectie in Excel, met uw filter en uw kolommen erin.',
        fr: "Ce que vous voyez, vous pouvez l’emporter : l’export vous donne exactement votre sélection actuelle dans Excel, avec votre filtre et vos colonnes." },

      { naam: 'voorkeuren', kop: { nl: 'Uw voorkeuren', fr: "Vos préférences" },
        doe: async (p) => {
          await klik(p, kopbalkKnop(p, /Voorkeuren|Préférences/i));
          await p.waitForTimeout(2000);
        },
        merk: /OMGEVINGSGROOTTE|TAILLE DE L.INTERFACE/i,
        nl: 'Rechtsboven staan uw eigen voorkeuren: de grootte van het scherm, een licht of donker thema, en uw taal. Die keuzes zijn van u, niet van uw kantoor.',
        fr: "En haut à droite, vos préférences : la taille de l’écran, un thème clair ou sombre, et votre langue. Ces choix sont les vôtres, pas ceux de votre bureau." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: "Pour conclure" },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/dashboard`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1400);
        },
        merk: /Dashboard|Tableau de bord/i,
        nl: 'Dat is de weg. De rest van deze reeks gaat over wat u er onderweg mee doet.',
        fr: "Voilà pour l’orientation. Le reste de cette série porte sur ce que vous en faites en chemin." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 2 van de reeks (§14). De relatie is de spil: elk dossier hangt eraan, elk document, elk gesprek.
  //
  // ⚠️ DEZE FILM KOSTTE DEMO-WERK, precies zoals §14 voorspelde. Het tabblad "Gevraagd" was op élke relatie
  // leeg: van 6.742 relaties droeg er ÉÉN een gevraagd document, en dat was er precies één (dossiers hadden
  // er 17.929). De generator vult ze nu, in alle drie de toestanden. En bij het meten bleek de teller in de
  // tabkop "Gevraagd (0)" te tonen boven drie documenten — die werd pas berekend als je het tabblad opende.
  ['relaties', {
    pagina: 'crm/relations',
    titel: {
      nl: 'Relaties in CreditSoft — de fiche waar alles aan hangt',
      fr: 'Les relations dans CreditSoft — la fiche à laquelle tout se rattache',
    },
    omschrijving: {
      nl: 'De relatiefiche van dichtbij: de lijst doorzoeken, een fiche openen, de algemene en bijkomende '
        + 'gegevens, de documenttaal die bepaalt in welke taal uw klant post krijgt, de gevraagde documenten '
        + 'met hun drie toestanden, de kredietdossiers van die klant, en het journaal met notities en '
        + 'gesprekken. Plus het samenvoegen van twee fiches die dezelfde persoon blijken te zijn.',
      fr: 'La fiche de relation de près : parcourir la liste, ouvrir une fiche, les données générales et '
        + 'complémentaires, la langue des documents qui détermine dans quelle langue votre client reçoit son '
        + 'courrier, les documents demandés avec leurs trois statuts, les dossiers de crédit de ce client, et '
        + 'le journal avec les notes et les appels. Ainsi que la fusion de deux fiches.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De relatielijst', fr: 'La liste des relations' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500); },
        merk: /Nieuwe relatie|Nouvelle relation/i,
        nl: 'Een relatie is iedereen met wie u zakendoet: uw klanten, hun partners, en de bedrijven achter een aanvraag. Alles hangt hieraan vast.',
        fr: "Une relation, c’est toute personne avec qui vous travaillez : vos clients, leurs partenaires et les sociétés derrière une demande. Tout s’y rattache." },

      { naam: 'zoeken', kop: { nl: 'Zoeken in de lijst', fr: 'Rechercher dans la liste' },
        doe: async (p) => {
          const z = p.locator('input[type="search"]:visible, input[placeholder*="oek" i]:visible, input[placeholder*="echerch" i]:visible').first();
          await klik(p, z); await z.type('Cuypers', { delay: 90 }); await p.waitForTimeout(2400);
        },
        merk: /Cuypers/i,
        nl: 'U zoekt op naam, en de lijst krimpt terwijl u typt. Particulieren en bedrijven staan door elkaar; de kolom Type zegt welke u voor u heeft.',
        fr: "Vous cherchez par nom et la liste se réduit pendant que vous tapez. Particuliers et sociétés sont mélangés ; la colonne Type indique ce que vous avez devant vous." },

      { naam: 'openen', kop: { nl: 'Een fiche openen', fr: 'Ouvrir une fiche' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties/${ID.relatie}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200); },
        merk: /Adriaenssens/i,
        nl: 'Een fiche opent als een volledige pagina, niet als een venster. Bovenaan staat wie het is, daaronder alles wat bij die persoon hoort.',
        fr: "Une fiche s’ouvre comme une page entière, pas comme une fenêtre. En haut, de qui il s’agit ; en dessous, tout ce qui s’y rapporte." },

      { naam: 'algemeen', kop: { nl: 'De algemene gegevens', fr: 'Les données générales' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Hoofdadres|Adresse principale/i).first()); await p.waitForTimeout(1200); },
        merk: /Hoofdadres|Adresse principale/i,
        nl: 'Op het eerste tabblad staan naam, contactgegevens en het hoofdadres. Het adres is gesplitst in straat, nummer, bus, postcode en gemeente, zodat het overal net staat.',
        fr: "Le premier onglet contient le nom, les coordonnées et l’adresse principale. L’adresse est découpée en rue, numéro, boîte, code postal et commune, pour un rendu propre partout." },

      { naam: 'documenttaal', kop: { nl: 'De documenttaal', fr: 'La langue des documents' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Documenttaal|Langue des documents/i).first()); await p.waitForTimeout(1400); },
        merk: /Documenttaal|Langue des documents/i,
        nl: 'Eén veld verdient uw aandacht: de documenttaal. Die bepaalt in welke taal deze klant zijn brieven en mails krijgt — los van de taal waarin u zelf werkt.',
        fr: "Un champ mérite votre attention : la langue des documents. Elle détermine dans quelle langue ce client reçoit ses courriers et e-mails, indépendamment de la langue dans laquelle vous travaillez." },

      { naam: 'bijkomend', kop: { nl: 'Bijkomende gegevens', fr: 'Données complémentaires' },
        doe: async (p) => { await klik(p, tabblad(p, /^Bijkomend|^Complémentaire/i)); await p.waitForTimeout(1800); },
        merk: /Rijksregisternr|registre national/i,
        nl: 'Het tweede tabblad draagt wat u voor een dossier nodig heeft: geboortedatum, rijksregisternummer, burgerlijke staat en beroep.',
        fr: "Le deuxième onglet porte ce dont vous avez besoin pour un dossier : date de naissance, numéro de registre national, état civil et profession." },

      { naam: 'gevraagd', kop: { nl: 'De gevraagde documenten', fr: 'Les documents demandés' },
        doe: async (p) => { await klik(p, tabblad(p, /^Gevraagd|^Demandés/i)); await p.waitForTimeout(2200); },
        merk: /Ontvangen|Reçu/i,
        nl: 'Bij Gevraagd houdt u bij welke stukken u van deze klant nodig heeft. Elk stuk doorloopt drie toestanden: gevraagd, ontvangen, en in orde. De teller in de tabkop toont hoeveel er al in orde zijn.',
        fr: "Sous Demandés, vous suivez les pièces dont vous avez besoin de ce client. Chaque pièce passe par trois statuts : demandé, reçu, et en ordre. Le compteur dans l’onglet indique combien sont déjà en ordre." },

      { naam: 'dossiers', kop: { nl: 'De kredietdossiers', fr: 'Les dossiers de crédit' },
        doe: async (p) => { await klik(p, tabblad(p, /^Kredietdossiers|^Dossiers de crédit/i)); await p.waitForTimeout(2000); },
        merk: /DEMO-3699/i,
        nl: 'Het tabblad Kredietdossiers toont elke aanvraag van deze klant, met het bedrag en de fase waarin ze zit. Van hieruit opent u het dossier zelf.',
        fr: "L’onglet Dossiers de crédit affiche chaque demande de ce client, avec le montant et la phase où elle se trouve. De là, vous ouvrez le dossier lui-même." },

      { naam: 'journaal', kop: { nl: 'Het journaal', fr: 'Le journal' },
        doe: async (p) => { await klik(p, tabblad(p, /^Gesprekken|^Appels/i)); await p.waitForTimeout(2000); },
        merk: /Loonbriefje opgevraagd/i,
        nl: 'De laatste tabbladen zijn het journaal: taken, notities, gesprekken, bijlagen en mailverkeer. Wat u met deze klant afsprak, staat hier — en niet in uw hoofd.',
        fr: "Les derniers onglets forment le journal : tâches, notes, appels, pièces jointes et courrier. Ce que vous avez convenu avec ce client est ici, et pas dans votre tête." },

      { naam: 'samenvoegen', kop: { nl: 'Twee fiches samenvoegen', fr: 'Fusionner deux fiches' },
        doe: async (p) => {
          await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1600);
          await beweegNaar(p, p.getByText('Samenvoegen', { exact: true }).or(p.getByText('Fusionner', { exact: true })).first()); await p.waitForTimeout(1200);
        },
        merk: /Samenvoegen|Fusionner/i,
        nl: 'Blijkt dezelfde persoon twee keer in uw lijst te staan, dan voegt u de fiches samen. De dossiers, documenten en het journaal van beide blijven behouden.',
        fr: "Si la même personne figure deux fois dans votre liste, vous fusionnez les fiches. Les dossiers, documents et journaux des deux sont conservés." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Relaties|Relations/i,
        nl: 'De relatie is uw vertrekpunt. In de volgende film maken we er een kredietdossier bij.',
        fr: "La relation est votre point de départ. Dans le film suivant, nous y ajoutons un dossier de crédit." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 3 van de reeks (§14). De instroom: wie klopt er aan, en wat gebeurt ermee.
  //
  // ⚠️ DERDE FILM, DERDE DEMO-GAT. De leadlijst droeg VIER van de vijf statussen: "Gewonnen" ontbrak, en
  // daarmee was de hele sectie "Van lead naar klant" uit crm/leads.md nergens te tonen — precies de stap
  // waar het om draait. De generator zaait er nu één, mét de verwijzing naar de relatie die eruit voortkwam.
  //
  // ⚠️ GEEN SCÈNE OVER DE WEBSITESLEUTEL. crm/leads-webformulier.md beschrijft ze, maar er is geen scherm
  // voor: een sleutel vraag je aan bij ADM One. Een scène erover zou een knop moeten tonen die niet bestaat.
  // De film toont de zichtbare helft — de BRON die uit die sleutel komt en per lead in de lijst staat.
  //
  // ⚠️ EN GEEN GETAL IN EEN ZIN. De lijst toont "wacht al 14 dagen" waar de seed 3 dagen zegt: het
  // ontvangstmoment wordt bij het zaaien vastgeklikt en drijft daarna mee met de kalender. Een zin die een
  // aantal dagen noemt, klopt dus volgende maand niet meer.
  ['leads', {
    pagina: 'crm/leads',
    titel: {
      nl: 'Leads in CreditSoft — van aanvraag tot klant',
      fr: 'Les leads dans CreditSoft — de la demande au client',
    },
    omschrijving: {
      nl: 'De werklijst van uw instroom: wie er wacht en hoe lang, uit welk kanaal hij kwam, en wie hem '
        + 'opvolgt. Daarna de fiche van een lead — wie hij is, wat hij vraagt, en waar hij staat — de vijf '
        + 'statussen, en tot slot een lead die klant geworden is, met de doorverwijzing naar zijn relatiefiche.',
      fr: 'La liste de travail de vos demandes entrantes : qui attend et depuis combien de temps, de quel '
        + 'canal il provient, et qui le suit. Ensuite la fiche d’un lead — qui il est, ce qu’il demande et où '
        + 'il en est — les cinq statuts, et pour finir un lead devenu client, avec le renvoi vers sa fiche.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De werklijst', fr: 'La liste de travail' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/leads`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1800); },
        merk: /Nieuwe lead|Nouveau lead/i,
        nl: 'Een lead is iemand die zich meldt maar nog geen klant is. Dit scherm is geen archief maar een werklijst: het toont wat er ligt te wachten.',
        fr: "Un lead, c’est quelqu’un qui se manifeste sans être encore client. Cet écran n’est pas une archive mais une liste de travail : il montre ce qui attend." },

      { naam: 'wachttijd', kop: { nl: 'Hoe lang iemand wacht', fr: 'Depuis combien de temps on attend' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Wacht al|En attente depuis/i).first()); await p.waitForTimeout(1400); },
        merk: /Wacht al|En attente depuis/i,
        nl: 'Twee kolommen doen het werk. Wacht al zegt hoe lang er nog niemand gereageerd heeft, en die klok stopt pas bij het eerste contact.',
        fr: "Deux colonnes font le travail. En attente depuis indique depuis combien de temps personne n’a réagi, et cette horloge ne s’arrête qu’au premier contact." },

      { naam: 'opvolger', kop: { nl: 'Wie volgt hem op', fr: 'Qui assure le suivi' },
        doe: async (p) => { await beweegNaar(p, p.getByText('niemand', { exact: true }).or(p.getByText('personne', { exact: true })).first()); await p.waitForTimeout(1400); },
        merk: /niemand|personne/i,
        nl: 'De tweede is Opvolging. Staat daar niemand, dan is deze aanvraag van niemand — en dat is precies de lead die wegglipt.',
        fr: "La seconde est Suivi. S’il n’y a personne, cette demande n’appartient à personne — et c’est précisément le lead qui s’échappe." },

      { naam: 'bron', kop: { nl: 'Waar hij vandaan komt', fr: 'D’où il provient' },
        doe: async (p) => { await beweegNaar(p, p.getByText('doorverwijzing', { exact: true }).first()); await p.waitForTimeout(1400); },
        merk: /doorverwijzing/i,
        nl: 'De kolom Bron zegt via welk kanaal iemand binnenkwam: uw contactformulier, een telefoon, of een doorverwijzing. Zo ziet u welk kanaal u klanten oplevert.',
        fr: "La colonne Source indique par quel canal la personne est arrivée : votre formulaire de contact, un appel, ou une recommandation. Vous voyez ainsi quel canal vous apporte des clients." },

      { naam: 'openen', kop: { nl: 'De fiche van een lead', fr: 'La fiche d’un lead' },
        doe: async (p) => {
          await klik(p, p.getByText('Tom Claes').first());
          await p.getByText('Tom Claes').first().dblclick();
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200);
        },
        merk: /Vul minstens een van deze velden|Complétez au moins un de ces champs/i,
        nl: 'De fiche valt in drie blokken uiteen. Wie hij is: naam, bedrijf en hoe u hem bereikt. Eén van die velden volstaat — zonder herkenning is een lead niet op te volgen.',
        fr: "La fiche se divise en trois blocs. Qui il est : nom, société et comment le joindre. Un seul de ces champs suffit — sans identification, un lead ne peut pas être suivi." },

      { naam: 'vraag', kop: { nl: 'Wat hij vraagt', fr: 'Ce qu’il demande' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Herkomst|Provenance/i).first()); await p.waitForTimeout(1600); },
        merk: /Herkomst|Provenance/i,
        nl: 'Het tweede blok is de vraag zelf: het bedrag, de bron, en wat hij letterlijk schreef. De herkomst zegt uit welk formulier hij kwam.',
        fr: "Le deuxième bloc est la demande elle-même : le montant, la source, et ce qu’il a écrit littéralement. La provenance indique de quel formulaire il vient." },

      { naam: 'opvolging', kop: { nl: 'De opvolging', fr: 'Le suivi' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Eerste contact|Premier contact/i).first()); await p.waitForTimeout(1600); },
        merk: /Eerste contact|Premier contact/i,
        nl: 'Het derde blok is de opvolging: zijn status, wie hem opvolgt, en wanneer er voor het eerst contact geweest is.',
        fr: "Le troisième bloc est le suivi : son statut, qui s’en occupe, et quand le premier contact a eu lieu." },

      { naam: 'statussen', kop: { nl: 'De vijf statussen', fr: 'Les cinq statuts' },
        doe: async (p) => {
          await p.goto(`${BASIS}/crm/leads`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1600);
          await klik(p, p.getByText(/Alle statussen|Tous les statuts/i).first()); await p.waitForTimeout(1800);
        },
        merk: /Gekwalificeerd|Qualifié/i,
        nl: 'Er zijn er vijf, en bewust niet meer: nieuw, gecontacteerd, gekwalificeerd, gewonnen en verloren. Een kantoor van vijf mensen heeft geen trechter van acht fasen nodig.',
        fr: "Il y en a cinq, et volontairement pas plus : nouveau, contacté, qualifié, gagné et perdu. Un bureau de cinq personnes n’a pas besoin d’un entonnoir à huit phases." },

      { naam: 'gewonnen', kop: { nl: 'Van lead naar klant', fr: 'Du lead au client' },
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(700);
          await p.getByText('Brigitte De Rycke').first().dblclick();
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
        },
        merk: /bekijk de klant|voir le client/i,
        nl: 'Wordt hij klant, dan zet u hem om. De lead blijft staan als geschiedenis van hoe die klant binnenkwam, en draagt voortaan een link naar zijn relatiefiche.',
        fr: "S’il devient client, vous le convertissez. Le lead subsiste comme historique de la façon dont ce client est arrivé, et porte désormais un lien vers sa fiche de relation." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Lead|Gewonnen|Gagné/i,
        nl: 'Zo sluit de cirkel: van een vraag op uw website tot een klant met een dossier. In de volgende film gaan we naar de documenten.',
        fr: "La boucle est ainsi bouclée : d’une question sur votre site à un client avec un dossier. Dans le film suivant, nous passons aux documents." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 4 van de reeks (§14). De documentketen, en bewust ÉÉN RICHTING: wat er binnenkomt.
  //
  // ⚠️ §14 zette klantportaal + validatie + bibliotheek in één film. Bij het uitschrijven bleek dat twee
  // verhalen: stukken die je VRAAGT en binnenkrijgt, tegenover stukken die je UITDEELT. De handleiding maakt
  // datzelfde onderscheid zelf ("Het verschil met Bijlagen"). De bibliotheek krijgt hier één slotscène als
  // wegwijzer naar de andere richting, niet de helft van de film.
  //
  // ⚠️ DE AFKEUR-SCÈNE KEURT NIETS AF. De knop opent een dialoog; die tonen we, en dan Escape. Wél iets
  // afkeuren zou een demo-document op "geweigerd" zetten én een mail proberen te sturen — en een film hoort
  // geen sporen achter te laten in de omgeving die hij filmt.
  ['documentketen', {
    pagina: 'credit-management/document-validation',
    titel: {
      nl: 'De documentketen — van vragen tot beoordelen',
      fr: 'La chaîne des documents — de la demande à la validation',
    },
    omschrijving: {
      nl: 'Hoe u stukken opvraagt bij uw klant en ze weer binnenkrijgt: de gevraagde documenten op een '
        + 'dossier met hun drie toestanden, de uitnodiging naar het klantenportaal, het portaal zoals uw '
        + 'klant het ziet, en het centrale scherm waar alles wat op beoordeling wacht bij elkaar staat — '
        + 'gesorteerd op wie het langst wacht. Plus de andere richting: de documentbibliotheek.',
      fr: 'Comment vous demandez des pièces à votre client et les recevez : les documents demandés sur un '
        + 'dossier avec leurs trois statuts, l’invitation au portail client, le portail tel que votre client '
        + 'le voit, et l’écran central où tout ce qui attend une validation est rassemblé — trié par ordre '
        + 'd’attente. Ainsi que l’autre sens : la bibliothèque de documents.',
    },
    dossier: ID.dossierMetSchema,
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'gevraagd', kop: { nl: 'De gevraagde stukken', fr: 'Les pièces demandées' },
        doe: async (p) => {
          await p.goto(`${BASIS}/credit-files/${ID.dossierMetSchema}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200);
          await klik(p, tabblad(p, /^Gevraagd|^Demandés/i)); await p.waitForTimeout(2000);
        },
        merk: /Ontvangen|Reçu/i,
        nl: 'Elk dossier draagt een lijst van de stukken die u nodig heeft. Elk stuk doorloopt drie toestanden: gevraagd, ontvangen, en in orde. De teller in de tabkop zegt hoeveel er al rond zijn.',
        fr: "Chaque dossier porte la liste des pièces dont vous avez besoin. Chaque pièce passe par trois statuts : demandé, reçu, et en ordre. Le compteur dans l’onglet indique combien sont déjà réglées." },

      { naam: 'uitnodigen', kop: { nl: 'De klant uitnodigen', fr: 'Inviter le client' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Klant uitnodigen|Inviter le client/i).first()); await p.waitForTimeout(1600); },
        merk: /Klant uitnodigen|Inviter le client/i,
        nl: 'U nodigt uw klant uit met één knop. Hij krijgt een persoonlijke link naar zijn portaal — geen account, geen wachtwoord, en de link geldt voor dit ene dossier.',
        fr: "Vous invitez votre client d’un seul bouton. Il reçoit un lien personnel vers son portail — pas de compte, pas de mot de passe, et le lien ne vaut que pour ce dossier." },

      { naam: 'klantblik', kop: { nl: 'Wat uw klant ziet', fr: 'Ce que voit votre client' },
        doe: async (p) => {
          await p.goto(`${BASIS}/klantportaal/voorbeeld/${ID.dossierMetSchema}`);
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
        },
        merk: /Welkom bij uw dossier|Bienvenue dans votre dossier/i,
        nl: 'Met Bekijk als klant ziet u zijn portaal precies zoals hij het krijgt: uw naam, uw kleuren, en de lijst van wat u nog nodig heeft.',
        fr: "Avec Voir comme le client, vous voyez son portail exactement tel qu’il le reçoit : votre nom, vos couleurs, et la liste de ce dont vous avez encore besoin." },

      { naam: 'opladen', kop: { nl: 'De klant levert aan', fr: 'Le client dépose ses pièces' },
        doe: async (p) => { await p.mouse.wheel(0, 400); await p.waitForTimeout(1800); },
        merk: /Estimation|Kostenraming|documenten|document/i,
        nl: 'Uw klant laadt zijn stukken hier op, per gevraagd document. Hij ziet meteen wat al in orde is en wat nog niet — en u hoeft er niet achter te bellen.',
        fr: "Votre client dépose ses pièces ici, document demandé par document demandé. Il voit immédiatement ce qui est réglé et ce qui ne l’est pas — et vous n’avez pas à le relancer." },

      { naam: 'valideren', kop: { nl: 'Alles wat wacht, op één scherm', fr: 'Tout ce qui attend, sur un écran' },
        doe: async (p) => { await p.goto(`${BASIS}/krediet/documenten-valideren`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Te valideren|À valider/i,
        nl: 'Wat binnenkomt, komt hier samen: Te valideren documenten toont alles wat op beoordeling wacht, over al uw dossiers heen. Het getal in het menu zegt hoeveel het er zijn.',
        fr: "Ce qui arrive se rassemble ici : Documents à valider affiche tout ce qui attend une validation, tous dossiers confondus. Le chiffre dans le menu indique combien il y en a." },

      { naam: 'wachttijd', kop: { nl: 'Wie het langst wacht', fr: 'Qui attend le plus longtemps' },
        doe: async (p) => { await beweegNaar(p, p.locator('th').nth(3)); await p.waitForTimeout(1600); },
        // ⚠️ De Franse kolom heet "Fourni le", niet "Déposé" — dat had ik geraden en het viel op de
        // beloftecontrole. `dagen`/`jours` staat in beide talen in de wachttijd-kolom.
        merk: /dagen|jours/i,
        nl: 'De lijst staat gesorteerd op wie het langst wacht. Een klant die zijn stukken vorige week opstuurde, staat dus boven wie het vanmorgen deed.',
        fr: "La liste est triée sur celui qui attend le plus longtemps. Un client qui a envoyé ses pièces la semaine dernière figure donc au-dessus de celui qui l’a fait ce matin." },

      { naam: 'openen', kop: { nl: 'Een stuk bekijken', fr: 'Consulter une pièce' },
        doe: async (p) => { await klik(p, p.locator('td').nth(2)); await p.waitForTimeout(2200); },
        merk: /Goedkeuren|Approuver/i,
        nl: 'U opent een regel om te zien wat er binnengekomen is. Het bestand staat ernaast, met wie het stuurde en wanneer.',
        fr: "Vous ouvrez une ligne pour voir ce qui est arrivé. Le fichier se trouve à côté, avec qui l’a envoyé et quand." },

      { naam: 'afkeuren', kop: { nl: 'Goedkeuren of afkeuren', fr: 'Approuver ou refuser' },
        doe: async (p) => {
          const vak = p.locator('td input[type=checkbox]').nth(1);
          await vak.check().catch(() => {}); await p.waitForTimeout(1000);
          // ⚠️ NIET `getByText(/^Afkeuren$/)`. Met een REGEX eist Playwright de hele tekstinhoud van het
          // element, en die draagt hier witruimte — de locator vond niets en de film viel op een time-out
          // van 30 s in `boundingBox`, met een melding die naar de muis wees in plaats van naar de selector.
          // Met een tekenreeks + `exact` matcht Playwright op de GETRIMDE tekst, en dan klopt het wel.
          await klik(p, p.getByText('Afkeuren', { exact: true }).or(p.getByText('Refuser', { exact: true })).first());
          await p.waitForTimeout(2200);
        },
        merk: /Ongeldige documenten|Documents non valides/i,
        nl: 'Klopt het, dan keurt u goed. Klopt het niet, dan geeft u een reden — en uw klant krijgt automatisch een bericht met die reden en een nieuwe link naar zijn portaal.',
        fr: "Si c’est correct, vous approuvez. Sinon, vous indiquez un motif — et votre client reçoit automatiquement un message avec ce motif et un nouveau lien vers son portail." },

      { naam: 'bibliotheek', kop: { nl: 'De andere richting', fr: 'L’autre sens' },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/document-library`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200);
        },
        merk: /Bedoeld voor|Destiné à/i,
        nl: 'Documenten gaan ook de andere kant op. In de documentbibliotheek zet u uw eigen stukken klaar, en per map bepaalt u voor wie ze zijn: intern, uw aanbrengers, of uw klanten.',
        fr: "Les documents circulent aussi dans l’autre sens. Dans la bibliothèque, vous mettez vos propres pièces à disposition, et par dossier vous décidez à qui elles sont destinées : en interne, à vos apporteurs, ou à vos clients." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Documentbibliotheek|Bibliothèque/i,
        nl: 'Zo loopt de hele keten: u vraagt, uw klant levert, u beoordeelt — en niets blijft liggen omdat het op één scherm staat.',
        fr: "Voilà toute la chaîne : vous demandez, votre client dépose, vous validez — et rien ne traîne, parce que tout figure sur un seul écran." },
    ],
  }],

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
        // ⚠️ Óók Engels, want de site draagt drie talen. Zonder deze regel zou de Engelse
        // functionaliteitspagina een BOUWFOUT geven — het Film-component weigert een ontbrekende taal in
        // plaats van stil niets te tonen. Engelse tekst over een Nederlands scherm; de app spreekt geen Engels.
        talen: [
          { ui: 'nl-BE', tekst: 'nl' },
          { ui: 'fr-BE', tekst: 'fr' },
          { ui: 'nl-BE', tekst: 'en' },
        ],
      },
    },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De dossierlijst', fr: "La liste des dossiers", en: "The file list" },
        doe: async (p) => { await p.goto(`${BASIS}/credit-files`); await p.waitForLoadState('networkidle'); },
        merk: /Kenmerk aanbrenger|Référence apporteur/i,
        nl: 'Het kredietdossier is het hart van CreditSoft. Alles wat bij één aanvraag hoort, staat op één pagina bij elkaar.',
        en: 'The credit file is the heart of CreditSoft. Everything about one application sits together on a single page.',
        fr: "Le dossier de crédit est le cœur de CreditSoft. Tout ce qui concerne une demande est rassemblé sur une seule page." },

      { naam: 'kolommen', kop: { nl: 'De kolommen', fr: "Les colonnes", en: "The columns" },
        doe: async (p) => { await beweegNaar(p, p.locator('th').nth(3)); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'In de lijst ziet u per dossier het kenmerk van de aanbrenger, de status, het kredietbedrag en de aanvrager.',
        fr: "Dans la liste, vous voyez par dossier la référence apporteur, le statut, le montant du crédit et le demandeur." },

      { naam: 'zoeken', kop: { nl: 'Zoeken in de lijst', fr: "Rechercher dans la liste", en: "Searching the list" },
        doe: async (p) => {
          const vak = p.locator('input[type="search"], input[placeholder*="oek" i], input[placeholder*="echerch" i]').first();
          await klik(p, vak); await vak.type('Demetris', { delay: 90 });
          await p.waitForTimeout(1800);
        },
        merk: /Demetris/i,
        nl: 'Bovenaan zoekt u door de hele lijst. Het aantal gevonden dossiers loopt mee.',
        fr: "En haut, vous cherchez dans toute la liste. Le nombre de dossiers trouvés suit." },

      { naam: 'openen', kop: { nl: 'Een dossier openen', fr: "Ouvrir un dossier", en: "Opening a file" },
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p, f) => { await p.goto(`${BASIS}/credit-files/${f.dossier}`); await p.waitForLoadState('networkidle'); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'We openen een bestaand dossier.',
        en: 'Let us open an existing file.',
        fr: "Ouvrons un dossier existant." },

      { naam: 'gegevens', kop: { nl: 'De dossiergegevens', fr: "Les données du dossier", en: "The file details" },
        doe: async (p) => { await p.waitForTimeout(400); },
        merk: /Datum indiening|Date de dépôt/i,
        nl: 'Bovenaan staan de dossiergegevens: de status, het kredietbedrag, de instelling en de datums van indiening en ingang.',
        en: 'At the top are the file details: the status, the credit amount, the institution and the submission and start dates.',
        fr: "En haut se trouvent les données du dossier : le statut, le montant du crédit, l'institution et les dates de dépôt et d'effet." },

      { naam: 'aanvragers', kop: { nl: 'De kredietaanvragers', fr: "Les demandeurs de crédit", en: "The credit applicants" },
        doe: async (p) => {
          const kop = p.locator('h6', { hasText: /Kredietaanvragers|Demandeurs de crédit/ }).first();
          await kop.scrollIntoViewIfNeeded(); await beweegNaar(p, kop);
        },
        merk: /Kredietaanvragers|Demandeurs de crédit/i,
        nl: 'Onder Kredietaanvragers staan alle aanvragers van dit dossier, met hun gegevens en hun rol.',
        fr: "Sous Demandeurs de crédit figurent tous les demandeurs de ce dossier, avec leurs données et leur rôle." },

      { naam: 'pand', kop: { nl: 'Het pand', fr: "Le bien", en: "The property" },
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p) => {
          await klik(p, p.locator('button', { hasText: /Investeringsfiche & pand|Fiche d'investissement & bien/ }).first());
          await p.waitForTimeout(1400);
        },
        merk: /^(Pand|Bien)$/im,
        nl: 'Achter Investeringsfiche en pand vindt u het adres, de aard en de waarde van het pand — en die waarde bepaalt mee de quotiteit.',
        fr: "Derrière Fiche d'investissement et bien, vous trouvez l'adresse, la nature et la valeur du bien — et cette valeur détermine en partie la quotité." },

      { naam: 'documenten', kop: { nl: 'De gevraagde documenten', fr: "Les documents demandés", en: "The requested documents" },
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(900);
          await klik(p, p.locator('[role="tab"]', { hasText: /^(Gevraagd|Demandés)\s*\(/ }).first());
          await p.waitForTimeout(1200);
        },
        merk: /Ontvangen|Reçu/i,
        nl: 'Bij Gevraagd volgt u per stuk of het aangeleverd is en of het al beoordeeld werd.',
        en: 'Under Requested you track, item by item, what has been supplied and what has already been reviewed.',
        fr: "Dans Demandés, vous suivez pièce par pièce ce qui a été fourni et ce qui a déjà été évalué." },

      // ⚠️ TWEE SCÈNES, en dat was eerst één. Drie klikken na elkaar met één zin erover gaf 8,1 seconden
      // stilte vóór die zin — de kijker zat naar drie handelingen te kijken waar niemand iets bij zei.
      //
      { naam: 'journaal', kop: { nl: 'Het journaal', fr: "Le journal", en: "The journal" },
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

      { naam: 'commissieschemas', kop: { nl: 'Het commissieschema', fr: "Le schéma de commission", en: "The commission scheme" },
        aanloop: 1.0,
        doe: async (p) => {
          await klik(p, p.locator('.adm-section-switch-btn').first());
          await p.locator('.adm-menu-item').first().waitFor({ timeout: 10000 });
          await klik(p, p.locator('.adm-menu-item', { hasText: /Commissieschema|Schémas de commission/ }).first());
        },
        merk: /Herberekenen|Recalculer/i,
        nl: 'En de commissieschema’s: wat er op dit dossier per aanbrenger verdiend wordt.',
        fr: "Et les schémas de commission : ce qui est gagné par apporteur sur ce dossier." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: "Pour conclure", en: "In closing" },
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
        en: 'One file, one page. What has been paid out, stays.',
        fr: "Un dossier, une page. Ce qui a été payé, reste." },
    ],
  }],
];

// ── Draaien ──────────────────────────────────────────────────────────────────────────────────────────────
mkdirSync(UIT, { recursive: true });
// ── ALLEEN DE HOOFDSTUKTITELS BIJWERKEN, zonder opnieuw op te nemen ─────────────────────────────────────
// ⚠️ Waarom dit bestaat: een film is bij Bunny NIET te vervangen (400 The video has already been uploaded),
// dus élke herneming kost een nieuwe guid en dus een nieuwe verwijzing op elke pagina. Een hoofdstuktitel
// verbeteren mag dat niet waard zijn. Hoofdstukken zijn metadata (POST /videos/{guid}), dus ze kunnen
// bijgewerkt worden op een film die al online staat: hier de tabel, en `bunny.mjs hoofdstukken` duwt ze door.
if (process.argv.includes('--hoofdstukken')) {
  let raak = 0, gemist = 0;
  for (const [naam, film] of FILMS) {
    if (filter && !naam.includes(filter)) continue;
    for (const [sleutel, rij] of Object.entries(uitslag)) {
      if (rij.film !== naam || !rij.hoofdstukken?.length) continue;
      // ⚠️ `rij.taal` is de SCHERMTAAL, niet de taal van de tekst. De Engelse website-uitvoering draagt
      // `taal: 'nl-BE'` — Engelse ondertitels over een Nederlands scherm (§12.3). Wie hierop koppelt, geeft
      // de Engelse kijker Nederlandse hoofdstukken, en de terugvalmelding zwijgt want er ís om 'nl' gevraagd.
      // De taal van de TEKST staat enkel in het achtervoegsel van de sleutel; vandaar deze regel.
      const kort = sleutel.match(/-(nl|fr|en)$/)?.[1] ?? (rij.taal ?? 'nl-BE').split('-')[0];
      // ⚠️ Op INDEX koppelen mag niet: een uitvoering gebruikt een SELECTIE van de scènes (§12), dus de
      // vijfde rij van een websitefilm is niet de vijfde scène. Koppelen op de oude titel is even fout —
      // die is al eens bijgewerkt. Daarom op de scènenaam, en wat niet te vinden is, blijft staan én telt.
      for (const h of rij.hoofdstukken) {
        const sc = film.scenes.find(x => x.naam === h.titel || x.kop?.nl === h.titel || x.kop?.fr === h.titel);
        if (!sc) { gemist++; continue; }
        h.titel = kop(sc, kort); raak++;
      }
      console.log(`   ${sleutel}: ${rij.hoofdstukken.map(h => h.titel).join(' · ')}`);
    }
  }
  bewaarUitslag();
  console.log(`\n✅ ${raak} hoofdstuktitel(s) bijgewerkt in de tabel${gemist ? `, ${gemist} niet herkend` : ''}.`);
  if (gemist) console.log('   ⚠️ Niet-herkende hoofdstukken blijven staan zoals ze waren — kijk ze na.');
  console.log('   Duw ze door met: node tools/bunny.mjs hoofdstukken');
  process.exit(0);
}

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

  // ⚠️ Een uitvoering mag haar eigen talenlijst dragen, met schermtaal (`ui`) en teksttaal (`tekst`) apart.
  // Zonder lijst: de twee talen die de app spreekt, met de tekst in diezelfde taal.
  const talen = uitv.talen ?? [{ ui: 'nl-BE', tekst: 'nl' }, { ui: 'fr-BE', tekst: 'fr' }];
  for (const { ui: taal, tekst: kort } of talen) {
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
      // ⚠️ De ROUTES die deze film toont, uit de scènes zelf. Eerst leidde verouderd.mjs ze af uit de
      // paginanaam, en dat was een gok die toevallig goed uitviel — een overzichtsfilm die acht schermen
      // toont, heeft géén pagina en zou dan nul routes hebben gehad.
      routes: [...new Set(film.scenes.flatMap(sc =>
        [...String(sc.doe).matchAll(/\$\{BASIS\}(\/[a-z0-9\/_-]*)/g)]
          .map(m => '/' + m[1].replace(/^\/+/, '').replace(/\/+$/, ''))))],
      // ⚠️ De toestand van de APP waartegen dit opgenomen is. Daarmee kan verouderd.mjs later vragen: welke
      // schermen zijn sindsdien gewijzigd, en toont deze film er één van?
      app: appToestand(),
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
        // ⚠️ DE HOOFDSTUKTITEL IS WAT DE KIJKER ZIET, geen sleutel. Hier stond `film.scenes[i].naam`, en
        // dus zag een klant in de Bunny-speler "lijst", "kolommen", "zoeken" staan — onze interne namen,
        // kleine letters, in het Nederlands ook op de Franse film. Gemerkt op 01/09/2026 bij het bouwen
        // van de videopagina. Een scène draagt nu `kop: { nl, fr }`; ontbreekt die, dan valt hij terug op
        // de naam MET een melding aan het eind van de ronde — stil terugvallen is precies hoe dit ontstond.
        titel: kop(film.scenes[i], kort),
        start: Number(m.spraak.toFixed(2)),
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
// ⚠️ MELDEN, niet tegenhouden — maar wél melden. Een scène zonder `kop` levert een hoofdstuk dat onze
// interne naam toont aan een klant, in kleine letters en in het Nederlands ook op de Franse film.
if (zonderKop.size) {
  console.log(`\n◐ ${zonderKop.size} scène(s) zonder hoofdstuktitel — de speler toont dan de INTERNE naam:`);
  console.log('   ' + [...zonderKop].join(', '));
  console.log("   Geef die scène een `kop: { nl: '…', fr: '…' }`; dat is wat de kijker in de speler leest.");
}
if (zonderTaal.size) {
  console.log(`\n◐ ${zonderTaal.size} hoofdstuk(ken) vielen terug op de NEDERLANDSE titel:`);
  console.log('   ' + [...zonderTaal].join(', '));
  console.log('   De kijker van die uitvoering leest dus Nederlands in de hoofdstukkenlijst.');
}
if (DROOG) console.log('🅓 Droge proef — enkel geluid gemaakt, niets opgenomen.');
else if (!verslag.gemaakt.length && !verslag.gevallen.length)
  console.log("⚠️  Geen enkele film geraakt door de filter — bedoelde je een andere naam?");
