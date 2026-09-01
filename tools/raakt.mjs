// ── WAT RAAKT DIT SCHERM? ─────────────────────────────────────────────────────────────────────────────────
//
//     node tools/raakt.mjs /credit-files          — wat toont dit scherm
//     node tools/raakt.mjs --gewijzigd [ref]      — wat is verouderd door de wijzigingen sinds <ref>
//
// ⚠️ WAAROM DIT BESTAAT. Een wijziging aan één scherm maakt stil drie andere dingen verouderd: de beelden in
// de documentatie, de films die dat scherm tonen, en de tekst van de pagina zelf. Niets meldde dat. Op
// 31/08 en 01/09/2026 gebeurde het drie keer — het versienummer in de zijbalk, een Frans label dat over zijn
// kolom liep en pas ná het hernemen van de film juist stond, en een demo die het randgeval niet droeg.
//
// ⚠️ HIJ LEIDT AF, HIJ ONDERHOUDT NIETS. De drie bronnen bestaan al: SCHOTEN in beelden.mjs kent per beeld
// zijn route, de scènes in films.mjs dragen hun `goto`, en de hulpladeprovider koppelt een app-route aan een
// documentatiepagina. Een handgeschreven vierde lijst zou uit elkaar lopen met alle drie.
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HIER = new URL('.', import.meta.url).pathname;
const APP = '/Users/dominique/projects/adm-creditsoft';
const HELP = `${APP}/src/Host/CreditSoft.Host.Web/Help/CreditSoftHelpProvider.cs`;

// ⚠️ EEN PARAMETERROUTE TELT OP HAAR STATISCHE DEEL. `@page "/credit-files/{Id:guid}"` is hetzelfde scherm
// als het beeld dat `/credit-files/${ID.dossier}` fotografeert. Zonder dit afkappen matcht een fiche-pagina
// niets, en dat is nu net het soort scherm dat in de meeste films staat — gemeten op 01/09/2026: het
// dossierdetail viel erbuiten terwijl we die dag nog een film erom hernomen hadden.
const norm = (r) => {
  const kaal = String(r ?? '').split('?')[0].split('{')[0];
  return '/' + kaal.replace(/^\/+/, '').replace(/\/+$/, '');
};

// ── 1. Beelden: ['naam', '/route'  — ook de vormen met een `na`-recept erachter.
function beelden() {
  const s = readFileSync(`${HIER}beelden.mjs`, 'utf8');
  const blok = s.slice(s.indexOf('const SCHOTEN = ['));
  const uit = [];
  // ⚠️ Drie vormen, en mijn eerste patroon kende er één. Een schot is `['naam', '/route']`, maar óók
  // `['naam', '/route', async p => {…}]` met een recept, en `['naam', `/credit-files/${ID.x}`]` met een
  // template-literal. Het ijkpunt onderaan ving dat: 22 herkend waar er 80 zijn.
  for (const m of blok.matchAll(/\[\s*'([a-z0-9-]+)'\s*,\s*(['`])([^'`]*)\2/g)) {
    // Een route met een ${…} erin telt op zijn statische deel: /credit-files/${ID.dossier} → /credit-files
    const route = m[3].split('${')[0].replace(/\/+$/, '');
    if (route.startsWith('/')) uit.push({ naam: m[1], route: norm(route) });
  }
  return uit;
}

// ── 2. Films: elke scène draagt haar route in de `doe`-broncode.
function films() {
  const s = readFileSync(`${HIER}films.mjs`, 'utf8');
  const uit = [];
  for (const f of s.matchAll(/\['([a-z0-9-]+)',\s*\{/g)) {
    const start = f.index;
    const eind = s.indexOf("\n  }],", start);
    const blok = s.slice(start, eind === -1 ? undefined : eind);
    for (const sc of blok.matchAll(/naam:\s*'([a-z0-9-]+)'/g)) {
      const scStart = sc.index;
      const scEind = blok.indexOf("naam: '", scStart + 8);
      const scBlok = blok.slice(scStart, scEind === -1 ? undefined : scEind);
      for (const g of scBlok.matchAll(/\$\{BASIS\}(\/[a-z0-9/_-]*)/g))
        uit.push({ film: f[1], scene: sc[1], route: norm(g[1].replace(/\/\$$/, '')) });
    }
  }
  return uit;
}

// ── 3. Documentatiepagina's: de hulpladeprovider koppelt app-route → docs-pad.
function docs() {
  if (!existsSync(HELP)) return [];
  return [...readFileSync(HELP, 'utf8').matchAll(/new\("([a-z0-9/{}:-]+)",\s*"([a-z0-9/-]+)"/g)]
    .map(m => ({ route: norm(m[1]), pagina: m[2] }));
}

const B = beelden(), F = films(), D = docs();

// ⚠️ IJKPUNT. Vinden de drie extracties überhaupt iets? Anders meldt dit gereedschap vrolijk "niets geraakt"
// over een scherm dat op tien plaatsen staat, en dat leest als een vrijbrief.
const ondergrens = { beelden: 50, films: 5, docs: 30 };
for (const [wat, lijst, min] of [['beelden', B, ondergrens.beelden], ['films', F, ondergrens.films], ['docs', D, ondergrens.docs]]) {
  if (lijst.length < min) {
    console.log(`⛔ Slechts ${lijst.length} ${wat} herkend (verwacht ≥ ${min}). De extractie klopt niet meer —`);
    console.log('   repareer eerst dit gereedschap. "Niets geraakt" zou nu een verkeerd antwoord zijn.');
    process.exit(1);
  }
}

function toon(route) {
  const r = norm(route);
  const b = B.filter(x => x.route === r);
  const f = F.filter(x => x.route === r);
  const d = D.filter(x => x.route === r);
  if (!b.length && !f.length && !d.length) return false;
  console.log(`\n▸ ${r}`);
  if (d.length) console.log(`   documentatie : ${[...new Set(d.map(x => x.pagina))].join(', ')}`);
  if (b.length) console.log(`   beelden (${b.length})  : ${b.map(x => x.naam).join(', ')}`);
  if (f.length) console.log(`   films (${new Set(f.map(x => x.film)).size})    : `
    + [...new Set(f.map(x => `${x.film}·${x.scene}`))].join(', '));
  return true;
}

const arg = process.argv[2];

if (!arg) {
  console.log(`Gebruik:\n  node tools/raakt.mjs /credit-files\n  node tools/raakt.mjs --gewijzigd [git-ref]`);
  console.log(`\nHerkend: ${B.length} beelden · ${F.length} filmscènes · ${D.length} documentatiekoppelingen`);
  process.exit(0);
}

if (arg !== '--gewijzigd') {
  if (!toon(arg)) console.log(`\n▸ ${norm(arg)}\n   niets — geen beeld, film of documentatiepagina toont dit scherm.`);
  process.exit(0);
}

// ── De gewijzigde schermen sinds een git-ref, en wat daardoor nazicht vraagt.
const ref = process.argv[3] ?? 'HEAD~1';
const gewijzigd = execFileSync('git', ['-C', APP, 'diff', '--name-only', `${ref}...HEAD`], { encoding: 'utf8' })
  .split('\n').filter(x => x.endsWith('.razor'));

console.log(`Gewijzigd sinds ${ref}: ${gewijzigd.length} .razor-bestand(en)\n${'─'.repeat(74)}`);
const zonderRoute = [], leeg = [];
let geraakt = 0;
for (const pad of gewijzigd) {
  const vol = `${APP}/${pad}`;
  if (!existsSync(vol)) continue;
  const routes = [...readFileSync(vol, 'utf8').matchAll(/@page\s+"(\/[^"]*)"/g)].map(m => norm(m[1]));
  if (!routes.length) { zonderRoute.push(pad.split('/').pop()); continue; }
  for (const r of routes) if (toon(r)) geraakt++; else leeg.push(r);
}

// ⚠️ Zeg ook wat je bekeken hebt en NIET geraakt was. "Niets gevonden" is geen "in orde": zonder deze
// regel weet je niet of het scherm nergens getoond wordt, of dat de kaart het gewoon niet zag.
if (leeg.length) {
  console.log(`\n✓ ${leeg.length} gewijzigd(e) scherm(en) worden nergens getoond — niets te hernemen:`);
  console.log('   ' + [...new Set(leeg)].join(', '));
}
if (!geraakt) console.log('\nGeen enkel gewijzigd scherm wordt getoond in een beeld, film of documentatiepagina.');

// ⚠️ EEN COMPONENT HEEFT GEEN @page EN IS DAAROM NIET HET MINST BELANGRIJK. Hij verschijnt óp schermen, en
// welke, dat is uit de code niet af te leiden zonder de hele componentboom te volgen. Stil overslaan zou
// hier het gevaarlijkst zijn: juist een gedeeld component raakt véél beelden tegelijk.
if (zonderRoute.length) {
  console.log(`\n⚠️ ${zonderRoute.length} gewijzigd(e) COMPONENT(en) zonder eigen route — niet automatisch te herleiden:`);
  console.log('   ' + zonderRoute.join(', '));
  console.log('   Zij verschijnen óp schermen. Kijk zelf na welke, of herneem de volledige beeld- en filmronde.');
}
