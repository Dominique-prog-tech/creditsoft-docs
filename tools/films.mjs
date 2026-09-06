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

import { mkdirSync, rmSync, existsSync, writeFileSync, readFileSync, readdirSync, copyFileSync, renameSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';
import { BASIS, ID, gebruiker, wachtwoord, meldAan, stemGeheim, appToestand } from './aansturing.mjs';
import { FILMS } from './draaiboek.mjs';
import { MEET, zichtbaarheid, zetScene, beweegNaar, klik } from './machinerie/browser.mjs';

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
// ⚠️ SAMENVOEGEN BIJ HET SCHRIJVEN, niet de kopie van bij het opstarten wegschrijven.
//
// Deze functie schreef `uitslag` weg zoals ze bij het STARTEN geladen was. Draait er tegelijk een tweede
// proces op ditzelfde bestand — een publicatie die guids bijschrijft terwijl je een volgende film opneemt —
// dan wint de laatste schrijver en verdwijnt het werk van de andere. Gebeurd op 01/09/2026: de publicatie
// van commissie-instellen wiste de twee verse regels van commissie-uitbetalen volledig uit de tabel. De
// mp4's stonden er nog; alleen wist niets meer dat ze bestonden.
//
// Nu: vlak vóór het schrijven het bestand OPNIEUW lezen, en enkel de sleutels overschrijven die deze ronde
// zelf aangeraakt heeft. Wat een ander proces intussen bijschreef, blijft staan.
const geraakt = new Set();
const bewaarUitslag = () => {
  const opSchijf = existsSync(UITSLAG) ? JSON.parse(readFileSync(UITSLAG, 'utf8')) : {};
  for (const k of geraakt) opSchijf[k] = uitslag[k];
  writeFileSync(UITSLAG, JSON.stringify(opSchijf, null, 2) + '\n');
};
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

// ── DE BOEKINGSLINK GAAT GEMASKEERD IN BEELD ───────────────────────────────────────────────────────────
// ⚠️ Het scherm Online afspraken toont de VOLLEDIGE boekingslink van het kantoor, token en al:
//     https://platform.digitalcloud.be/afspraak/0c8d29adabfe4737a1d4b05696c24ba4
// Dat is geen geheim — zo'n link geef je aan je klanten — maar in een GEPUBLICEERDE handleiding betekent het
// dat iedere lezer in de agenda van het demokantoor kan boeken. Gemerkt op 01/09/2026: het stond al in het
// gepubliceerde beeld `online-afspraken-instellingen.png`, dus dit is een reparatie en geen voorzorg.
//
// ⚠️ EEN WAARNEMER EN NIET ÉÉN VERVANGING. Blazor rendert dit element ná het laden, en een film loopt door —
// een eenmalige vervanging bij het begin van een scène is er dan al of nog niet.
//
// ⚠️ ZELFDE LENGTE. De bolletjes vervangen het token teken voor teken, zodat het veld niet krimpt en de
// vormgrendel van de beeldronde geldig blijft.
const MASKEER_BOEKINGSLINK = () => {
  const maskeer = () => {
    for (const e of document.querySelectorAll('code, input, span')) {
      const t = e.value ?? e.textContent ?? '';
      const m = t.match(/\/afspraak\/([0-9a-f]{16,})/i);
      if (!m) continue;
      const bol = '•'.repeat(m[1].length);
      if (e.value !== undefined && e.value !== '') e.value = t.replace(m[1], bol);
      else e.textContent = t.replace(m[1], bol);
    }
  };
  const start = () => {
    maskeer();
    new MutationObserver(maskeer).observe(document.body, { childList: true, subtree: true, characterData: true });
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
};

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


// ── De hoofdstuktitel van een scène, per taal ────────────────────────────────────────────────────────────
// Zie de noot bij `hoofdstukken:` verderop. Ontbreekt `kop`, dan valt dit terug op de interne scènenaam en
// wordt dat GETELD — de ronde meldt het op het eind, zodat het niet opnieuw jaren onopgemerkt blijft.
// De richtduur uit §1: korter dan een minuut zegt te weinig, boven de drie minuten kijkt niemand hem uit.
// Een RICHTlijn en geen grens — de ronde meldt het en weigert niets.
const DUUR_MIN = 60, DUUR_MAX = 180;
const buitenDuur = [];
const GAT_DREMPEL = 10;   // seconden stilte vóór een zin waarboven de ronde het meldt
const langeGaten = [];
const zwakkeMerken = [];
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
// Beperk de ronde tot één taal: `--taal=fr` of `--taal=nl`. Leeg = alle talen van de uitvoering.
const TAAL = (process.argv.find(a => a.startsWith('--taal=')) ?? '').split('=')[1];

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

// ── Luidheid gelijktrekken ───────────────────────────────────────────────────────────────────────────
// ⚠️ WAAROM DIT BESTAAT. De stemmen leveren niet even luid. Gemeten op de GEPUBLICEERDE films (02/09/2026):
// Nederlands −15,0 en −15,3 LUFS, Frans −19,3 en −20,4. Vier à vijf LUFS verschil tussen twee talen van
// dezelfde handleiding, en niemand die het merkte — je kijkt zelden dezelfde film twee keer in een andere
// taal. De pijplijn zette het geluid wel om naar 48 kHz stereo maar liet de luidheid staan zoals de stem
// ze toevallig gaf.
//
// ⚠️ OP HET HELE SPOOR EN NIET PER FRAGMENT. Elke zin apart naar hetzelfde doel duwen vlakt het verschil
// TUSSEN zinnen uit — een terzijde wordt dan even luid als een kop. Het samengestelde spoor normaliseren
// haalt het doel exact én laat die verhouding staan. De stiltes tellen niet mee: loudnorm meet met een
// relatieve poort.
//
// ⚠️ DE LENGTE MAG NIET WIJZIGEN. De ondertitels en `-shortest` hangen aan de duur van dit spoor; schuift
// die ook maar een halve seconde, dan lopen de ondertitels uit de pas en merkt niemand dat aan een groene
// draai. Vandaar `linear=true` (een vaste versterking, geen dynamiek) én de controle eronder — die faalt
// liever luid dan een film met scheve ondertitels af te leveren.
// ⚠️ DOEL −15 EN NIET −16, en dat is gemeten en niet gekozen. De dertien Nederlandse films die NIET
// heropgenomen worden, staan op −15,0 tot −15,3 LUFS (gemeten op de gepubliceerde bestanden op de CDN).
// Een doel van −16 zou de heropgenomen films een LUFS onder hun buren zetten — klein, maar het is precies
// het soort stap dat je hoort wanneer je twee films na elkaar kijkt. Wat al goed staat, is de maat.
const LUIDHEID = { I: -15, TP: -1.5, LRA: 11 };

function normaliseer(pad) {
  // ⚠️ ffmpeg schrijft die meting naar STDERR, niet naar stdout. Met execFileSync krijg je enkel stdout
  // terug en dan is `meet` leeg — de eerste versie hiervan liep daarop vast. spawnSync geeft beide.
  const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', pad,
    '-af', `loudnorm=I=${LUIDHEID.I}:TP=${LUIDHEID.TP}:LRA=${LUIDHEID.LRA}:print_format=json`,
    '-f', 'null', '-'], { encoding: 'utf8' });
  const meet = `${r.stdout ?? ''}${r.stderr ?? ''}`;
  const json = (meet.match(/\{[\s\S]*?\}/g) ?? []).pop();
  if (!json) throw new Error(`loudnorm gaf geen meting terug voor ${pad}`);
  const m = JSON.parse(json);

  const voor = duurVan(pad);
  const tijdelijk = `${pad}.norm.wav`;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', pad,
    '-af', `loudnorm=I=${LUIDHEID.I}:TP=${LUIDHEID.TP}:LRA=${LUIDHEID.LRA}`
         + `:measured_I=${m.input_i}:measured_TP=${m.input_tp}:measured_LRA=${m.input_lra}`
         + `:measured_thresh=${m.input_thresh}:linear=true`,
    '-ar', '48000', '-ac', '2', tijdelijk]);

  const na = duurVan(tijdelijk);
  if (Math.abs(na - voor) > 0.05)
    throw new Error(`normaliseren verschoof de lengte van het spoor: ${voor.toFixed(3)}s → ${na.toFixed(3)}s `
                  + '— de ondertitels zouden uit de pas lopen. Niet negeren.');
  renameSync(tijdelijk, pad);
  return { van: Number(m.input_i), naar: LUIDHEID.I };
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

// ── `--inhoud`: de STRUCTUURAFDRUK van het draaiboek ─────────────────────────────────────────────────────
// 🔨 Bestaat om een verbouwing te kunnen bewijzen. Dumpt alles waaruit een film gemaakt wordt — namen,
// talen, koppen, teksten, merktekens én de BRONCODE van elke `doe`-functie. Wie de bestanden herschikt,
// draait dit vóór en na en vergelijkt met `diff`. Identiek = er is niets aan het draaiboek veranderd.
// ⚠️ Het bewijst NIET dat een opname nog lukt — enkel dat de tabel dezelfde is. Voor het eerste is er maar
// één controle, en dat is een film draaien.
if (process.argv.includes('--inhoud')) {
  const afdruk = JSON.stringify(FILMS, (sleutel, waarde) => {
    if (typeof waarde === 'function') return `fn:${waarde.toString().replace(/\s+/g, ' ')}`;
    if (waarde instanceof RegExp) return `re:${waarde.toString()}`;
    return waarde;
  }, 2);
  console.log(afdruk);
  console.log(`\n── ${FILMS.length} films · ${FILMS.reduce((n, [, f]) => n + f.scenes.length, 0)} scènes`);
  process.exit(0);
}

// ── Draaien ──────────────────────────────────────────────────────────────────────────────────────────────
mkdirSync(UIT, { recursive: true });
// ── ALLEEN DE HOOFDSTUKTITELS BIJWERKEN, zonder opnieuw op te nemen ─────────────────────────────────────
// ⚠️ Waarom dit bestaat: een film is bij Bunny NIET te vervangen (400 The video has already been uploaded),
// dus élke herneming kost een nieuwe guid en dus een nieuwe verwijzing op elke pagina. Een hoofdstuktitel
// verbeteren mag dat niet waard zijn. Hoofdstukken zijn metadata (POST /videos/{guid}), dus ze kunnen
// bijgewerkt worden op een film die al online staat: hier de tabel, en `bunny.mjs hoofdstukken` duwt ze door.
// ── `--teksten`: titel en omschrijving verversen ZONDER op te nemen ────────────────────────────────────
// ⚠️ WAAROM DIT BESTAAT. Titel en omschrijving worden bij het OPNEMEN in de tabel geschreven. Wijzigt
// Dominique een tekst, dan was de enige weg de film opnieuw opnemen — en dat kost bij Bunny een NIEUWE GUID
// voor een film waarvan geen enkel beeld verandert, plus een tabelwijziging, plus een handleidingpagina,
// plus een oude video om op te ruimen. Voor een komma.
//
// Zelfde tweetrapsweg als de hoofdstukken: dit schrijft in de tabel, `bunny.mjs titels` duwt door naar Bunny.
if (process.argv.includes('--teksten')) {
  // ⚠️ GEEN eigen `const uitslag` hier. Die overschaduwt de module-brede (regel ~51), en `bewaarUitslag()`
  // schrijft juist díé weg — dus muteerde dit blok een kopie en bewaarde het een onaangeroerd origineel.
  // Het meldde daarbij vrolijk "2 tekst(en) bijgewerkt". Gevonden doordat de VOLGENDE stap er niets van zag,
  // niet doordat hier iets roodkleurde. Een melding die niet nagerekend wordt, is een bewering.
  let raak = 0, gelijk = 0;
  for (const [sleutel, rij] of Object.entries(uitslag)) {
    if (filter && !sleutel.includes(filter)) continue;
    const film = FILMS.find(([naam]) => naam === rij.film)?.[1];
    if (!film) continue;
    // ⚠️ De TEKSTtaal uit de sleutel, niet rij.taal — dat is de SCHERMtaal. De Engelse website-uitvoering
    // draagt taal 'nl-BE'; wie daarop koppelt, geeft haar Nederlandse teksten. Zelfde val als bij de
    // hoofdstukken, en die is daar al een keer dichtgezet.
    const kort = sleutel.match(/-(nl|fr|en)$/)?.[1] ?? (rij.taal ?? 'nl-BE').split('-')[0];
    const titel = film.titel?.[kort];
    const oms = film.omschrijving?.[kort];
    if (titel === undefined && oms === undefined) continue;
    const voor = `${rij.titel}|${rij.omschrijving}`;
    if (titel !== undefined) rij.titel = titel;
    if (oms !== undefined) rij.omschrijving = oms;
    geraakt.add(sleutel);
    if (`${rij.titel}|${rij.omschrijving}` === voor) { gelijk++; continue; }
    raak++;
    console.log(`   ${sleutel}: ${rij.titel}`);
  }
  bewaarUitslag();

  // 🔨 TERUGLEZEN VAN SCHIJF. Niet "ik heb het gezet" melden maar "het stáát er" — dat is het verschil
  // tussen een bewering en een meting, en precies wat de fout hierboven had gevangen.
  const opSchijf = JSON.parse(readFileSync(UITSLAG, 'utf8'));
  const mis = [...geraakt].filter(k => opSchijf[k]?.titel !== uitslag[k]?.titel
                                    || opSchijf[k]?.omschrijving !== uitslag[k]?.omschrijving);
  if (mis.length) {
    console.log(`\n⛔ ${mis.length} rij(en) staan NIET op schijf zoals bedoeld: ${mis.join(', ')}`);
    process.exit(1);
  }

  // Niets gewijzigd is geen "in orde" — zeg het, anders leest een stille ronde als een geslaagde.
  console.log(raak
    ? `\n✅ ${raak} tekst(en) bijgewerkt in de tabel${gelijk ? `, ${gelijk} stonden al goed` : ''}. Nu: node tools/bunny.mjs titels`
    : `\n◐ Geen enkele tekst gewijzigd (${gelijk} stonden al goed). Staat de nieuwe tekst wel in het scenario?`);
  process.exit(0);
}

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
      geraakt.add(sleutel);
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
  let talen = uitv.talen ?? [{ ui: 'nl-BE', tekst: 'nl' }, { ui: 'fr-BE', tekst: 'fr' }];
  if (TAAL) {
    const voor = talen.length;
    talen = talen.filter(t => t.tekst === TAAL || t.ui.startsWith(TAAL));
    // Niets gevonden is geen "in orde": zwijgen zou lezen als een geslaagde ronde zonder films.
    if (!talen.length) throw new Error(`--taal=${TAAL} laat geen enkele taal over van de ${voor} die deze uitvoering draagt`);
  }
  // ⚠️ `--taal=fr` beperkt de ronde tot één taal. Zonder dit is er geen manier om ALLEEN het Frans opnieuw
  // op te nemen: een ronde deed altijd beide, en elke nieuwe opname vraagt een nieuwe Bunny-upload met een
  // nieuwe guid. Dertien Nederlandse films opnieuw uploaden die niets nodig hadden, is geen kleine ruis —
  // het zijn dertien guids die in de tabel en op de handleidingpagina's moeten, en dertien oude die weg
  // moeten. Gebouwd op 02/09/2026 voor de Franse stemwissel.
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
        ? await spreek(sc.uitspraak?.[kort] ?? sc[kort], taal, `${werk}${String(i).padStart(2, '0')}-${sc.naam}.wav`)
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
      ...(MEET ? {} : { recordVideo: { dir: werk, size: { width: BREED, height: HOOG } } }),
    });
    await ctx.addInitScript(CURSOR);
    if (!metStem) await ctx.addInitScript(TEKSTBALK);
    await ctx.addInitScript((css) => {
      const stijl = document.createElement('style');
      stijl.textContent = css;
      document.addEventListener('DOMContentLoaded', () => document.head.appendChild(stijl));
    }, VERBERG_VERSIE);
    await ctx.addInitScript(MASKEER_BOEKINGSLINK);
    const page = await ctx.newPage();
    const t0 = Date.now();
    const merken = [];       // start-, spraak- en eindtijd per scène, t.o.v. het begin van de opname
    let gevallen = null;

    for (const [i, sc] of film.scenes.entries()) {
      const start = (Date.now() - t0) / 1000;
      try {
        zetScene(`${naam}-${kort} · ${sc.naam}`);
        await sc.doe(page, film);
        // ⚠️ WACHTEN OP EEN TOESTAND, NIET OP EEN TIMER (§3.4). Het merkteken IS de toestand.
        await page.locator('body').filter({ hasText: sc.merk }).first().waitFor({ timeout: 15000 });

        // ⚠️ SLUIT DIT MERKTEKEN HET VERKEERDE GEVAL UIT? De controle hierboven kijkt naar de HELE body, en
        // daar staat ook het MENU in — op élke pagina. Een merkteken als /Taken|Tâches/ slaagt dus overal,
        // ook op een scherm dat niets met taken te maken heeft. Drie scènes van film 5 stonden zo, en ze
        // waren groen. Gevonden bij het nalezen, niet door een controle; vandaar deze.
        //
        // De proef: matcht het merkteken óók op enkel de menutekst, dan bewijst het niets over de INHOUD.
        // Het MELDT en blokkeert niet — soms is een menuwoord het enige eerlijke merkteken van een scherm.
        const menuTekst = await page.evaluate(() =>
          [...document.querySelectorAll('nav, .adm-nav, [class*=sidebar]')].map(e => e.innerText).join(' '));
        if (menuTekst && sc.merk.test(menuTekst)) {
          zwakkeMerken.push(`${naam}-${kort} · ${sc.naam}: ${sc.merk}`);
        }
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
    // ⚠️ In meetstand is er geen video: `page.video()` geeft dan null. Alles hierna gaat over het monteren
    // van een film die we niet maken, dus daar stopt deze taal.
    if (MEET) {
      await ctx.close(); await browser.close();
      console.log(`  🔎 ${stam}-${kort} gemeten${gevallen ? ` (gevallen op ${gevallen})` : ''}`);
      continue;
    }
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
      normaliseer(`${werk}spoor.wav`);
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
      // ⚠️ vorigeGuid MOET hier ook overleven, en dat is met bloed geschreven. Deze toewijzing VERVANGT de
      // hele rij; wat hier niet overgenomen wordt, is weg. Tot 02/09/2026 stond vorigeGuid er niet bij, dus
      // een heropname wiste de administratie van wat bunny.mjs nog moest opruimen. Gevolg: bij de VOLGENDE
      // publicatie zag hij geen vorigeGuid, ruimde niets op, en zette een nieuwe — de oudste guid bleef
      // eeuwig bij Bunny staan zonder dat iets nog zei waar hij bij hoorde. Zo ontstonden drie weesvideo's
      // (dashboard-fr, aan-de-slag-fr, kredietdossiers-basis-fr), pas gevonden door de bibliotheek met de
      // hand tegen deze tabel te leggen. Dezelfde valkuil als met gepubliceerdeHash, één laag dieper.
      vorigeGuid: uitslag[sleutel]?.vorigeGuid ?? undefined,
      // ⚠️ HOE LANG STAAT ER NIETS TE GEBEUREN? Een scène die op een element wacht dat nooit komt, levert
      // dode lucht op — en de ronde meldt gewoon "✅ film gemaakt". Op 01/09/2026 stond er 33,7 s stilte in
      // de Franse commissie-film omdat een locator daar niet matchte en pas ná 30 s terugviel. De film was
      // technisch in orde: het merkteken klopte, de scènes stonden er. Alleen keek niemand naar de TIJD.
      //
      // Het gat = van het einde van de vorige zin tot het begin van de volgende. Normaal is dat het ritme
      // (AANLOOP + ADEM ≈ 1,5 s) plus de handeling; boven de tien seconden is er iets aan het wachten.
      ...(() => {
        let vorig = 0;
        merken.forEach((m, i) => {
          const gat = m.spraak - vorig;
          if (gat > GAT_DREMPEL) langeGaten.push(`${naam}-${kort} · ${film.scenes[i].naam}: ${gat.toFixed(1)}s stilte vóór de zin`);
          vorig = m.spraak + duren[i];
        });
        return {};
      })(),
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
    if (!MEET) { geraakt.add(sleutel); bewaarUitslag(); }

    // ⚠️ §1 geeft een RICHTDUUR van 60–180 s: korter zegt te weinig, langer kijkt niemand uit. De ronde drukte
    // de lengte wel af maar hield ze nergens tegen die richtlijn — en dan glijdt ze weg. `dashboard-fr` kwam
    // op 183 s uit terwijl de Nederlandse op 153 stond: het Frans is stelselmatig langer, en dat is precies
    // de kant waar het overschot ontstaat. Melden, niet weigeren.
    if (lengte < DUUR_MIN || lengte > DUUR_MAX) buitenDuur.push(`${stam}-${kort}: ${lengte.toFixed(1)}s`);
    // ⚠️ Eén decimaal, geen afronding. Met `toFixed(0)` meldde hij "180s buiten de grens van 60–180" —
    // een zin die zichzelf tegenspreekt, want de echte lengte was 180,4. Wie zoiets leest, gelooft de
    // grendel niet meer.

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
// ⚠️ WELKE SCÈNES STONDEN NIET IN BEELD? Tot 01/09/2026 scrolde `beweegNaar` niet: wees een scène naar iets
// onder de vouw, dan toonde ze de bovenkant van de pagina en faalde er niets. Deze lijst zegt welke films
// hernomen zouden moeten worden als je de OUDE opname nog gebruikt.
const buitenBeeld = zichtbaarheid.filter(z => !z.inBeeld);
if (buitenBeeld.length) {
  console.log(`\n◐ ${buitenBeeld.length} scène(s) hadden hun onderwerp NIET in beeld zonder te scrollen:`);
  buitenBeeld.forEach(z => console.log(`   ${z.scene}: y=${z.y} in een venster van ${z.venster}`));
  console.log('   In de NIEUWE opname is dat opgelost (er wordt gescrold). Een film die vóór deze wijziging');
  console.log('   opgenomen én gepubliceerd is, toont daar iets anders dan wat de zin belooft.');
} else if (zichtbaarheid.length) {
  console.log(`\n✅ alle ${zichtbaarheid.length} aangewezen onderwerpen stonden ook zonder scrollen in beeld.`);
}

if (buitenDuur.length) {
  console.log(`\n◐ ${buitenDuur.length} film(s) buiten de richtduur van ${DUUR_MIN}–${DUUR_MAX} s (§1):`);
  buitenDuur.forEach(r => console.log(`   ${r}`));
  console.log('   Een richtlijn, geen grens — maar wél iets om bewust te beslissen in plaats van te laten gebeuren.');
}
if (langeGaten.length) {
  console.log(`\n◐ ${langeGaten.length} scène(s) met meer dan ${GAT_DREMPEL} seconden stilte vóór de zin:`);
  langeGaten.forEach(r => console.log(`   ${r}`));
  console.log('   Meestal wacht daar een locator op iets dat niet komt. De film slaagt, maar hij staat stil.');
}
if (zwakkeMerken.length) {
  console.log(`\n◐ ${zwakkeMerken.length} merkteken(s) matchen ÓÓK op de menutekst — ze bewijzen dus niet dat`);
  console.log('   het juiste scherm getoond werd, want het menu staat op elke pagina:');
  zwakkeMerken.forEach(r => console.log(`   ${r}`));
  console.log('   Kies iets dat enkel op DIT scherm staat (een kolomkop, een dossiernummer, een zin uit de tekst).');
}
if (zonderTaal.size) {
  console.log(`\n◐ ${zonderTaal.size} hoofdstuk(ken) vielen terug op de NEDERLANDSE titel:`);
  console.log('   ' + [...zonderTaal].join(', '));
  console.log('   De kijker van die uitvoering leest dus Nederlands in de hoofdstukkenlijst.');
}
if (DROOG) console.log('🅓 Droge proef — enkel geluid gemaakt, niets opgenomen.');
// ⚠️ In MEETSTAND wordt er niets "gemaakt", dus deze waarschuwing sloeg daar altijd aan — een ronde die 24
// opnames correct doorgemeten had, eindigde met "bedoelde je een andere naam?". Een melding die zich vergist
// over haar eigen uitkomst, maakt de rest van het verslag verdacht.
else if (MEET) console.log(`🔎 Meetstand — ${zichtbaarheid.length} aangewezen onderwerpen nagegaan, niets opgenomen.`);
else if (!verslag.gemaakt.length && !verslag.gevallen.length)
  console.log("⚠️  Geen enkele film geraakt door de filter — bedoelde je een andere naam?");
