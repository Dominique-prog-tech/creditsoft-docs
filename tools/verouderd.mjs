// ── WELKE BEELDEN EN FILMS ZIJN VEROUDERD? ────────────────────────────────────────────────────────────────
//
//     node tools/verouderd.mjs            — het verslag
//     node tools/verouderd.mjs --kort     — enkel de namen, om aan een generator te voeren
//
// ⚠️ DIT IS DE SCHAKEL DIE ONTBRAK. `raakt.mjs` zegt WAT een scherm toont; deze zegt of dat artefact nog
// ACTUEEL is. Het verschil zit in het merkteken: elk beeld en elke film draagt sinds 01/09/2026 de
// commit-SHA van de app waartegen het gemaakt is. "Verouderd" is dan geen gevoel maar een git-vraag —
// welke .razor-bestanden zijn sinds die SHA gewijzigd, en zit de route van dit artefact daarbij.
//
// ⚠️ EEN ARTEFACT ZONDER MERKTEKEN IS NIET "IN ORDE". Het is van vóór deze meting, en dus ONBEKEND. Dat is
// een andere uitkomst dan actueel, en het verslag zegt het apart — anders leest een oude ronde als een
// gecontroleerde ronde.
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const HIER = new URL('.', import.meta.url).pathname;
const APP = '/Users/dominique/projects/adm-creditsoft';
const KORT = process.argv.includes('--kort');
// ⚠️ MELDEN, NIET TEGENHOUDEN — beslist door Dominique op 01/09/2026. Een verouderd beeld is cosmetisch;
// een deploy daarop blokkeren is irritanter dan nuttig. Wie hem tóch als poort wil gebruiken (in een
// script, een CI-stap), geeft `--streng` mee en krijgt exitcode 1.
const STRENG = process.argv.includes('--streng');

const lees = (naam) => existsSync(`${HIER}${naam}`) ? JSON.parse(readFileSync(`${HIER}${naam}`, 'utf8')) : {};
const norm = (r) => '/' + String(r ?? '').split('?')[0].split('{')[0].replace(/^\/+/, '').replace(/\/+$/, '');

// De routes die sinds een SHA gewijzigd zijn — met een geheugen, want dezelfde SHA komt vaak terug.
const onthouden = new Map();
function gewijzigdeRoutes(sha) {
  if (onthouden.has(sha)) return onthouden.get(sha);
  let bestanden = [];
  try {
    bestanden = execFileSync('git', ['-C', APP, 'diff', '--name-only', `${sha}...HEAD`], { encoding: 'utf8' })
      .split('\n').filter(x => x.endsWith('.razor'));
  } catch {
    onthouden.set(sha, null);          // SHA onbekend in deze repo — dat is géén "niets gewijzigd"
    return null;
  }
  const routes = new Set(), componenten = [];
  for (const pad of bestanden) {
    const vol = `${APP}/${pad}`;
    if (!existsSync(vol)) continue;
    const r = [...readFileSync(vol, 'utf8').matchAll(/@page\s+"(\/[^"]*)"/g)].map(m => norm(m[1]));
    if (r.length) r.forEach(x => routes.add(x)); else componenten.push(pad.split('/').pop());
  }
  const uit = { routes, componenten };
  onthouden.set(sha, uit);
  return uit;
}

const artefacten = [
  ...Object.entries(lees('beelden-uitslag.json')).map(([naam, v]) => ({ soort: 'beeld', naam, ...v })),
  // ⚠️ Een film toont MEERDERE schermen, dus meerdere routes. films.mjs schrijft ze sinds 01/09/2026 mee.
  ...Object.entries(lees('films-uitslag.json')).map(([naam, v]) => ({
    soort: 'film', naam, app: v.app, routes: v.routes ?? [],
  })),
];

if (!artefacten.length) {
  console.log('⛔ Geen enkele uitslagtabel gevonden. Draai eerst beelden.mjs of films.mjs.');
  process.exit(1);
}

const verouderd = [], onbekend = [], actueel = [], onbekendeSha = [];
let componentwaarschuwing = new Set();

for (const a of artefacten) {
  if (!a.app?.sha) { onbekend.push(a); continue; }
  const g = gewijzigdeRoutes(a.app.sha);
  if (g === null) { onbekendeSha.push(a); continue; }
  g.componenten.forEach(c => componentwaarschuwing.add(c));
  const eigen = a.routes ?? (a.route ? [a.route] : []);
  const raak = eigen.map(norm).filter(r => g.routes.has(r));
  if (raak.length) verouderd.push({ ...a, waarom: raak.join(', ') });
  else actueel.push(a);
}

if (KORT) { verouderd.forEach(a => console.log(a.naam)); process.exit(STRENG && verouderd.length ? 1 : 0); }

console.log(`${artefacten.length} artefact(en) nagekeken tegen ${APP.split('/').pop()}\n${'─'.repeat(74)}`);

if (verouderd.length) {
  console.log(`\n⚠️ ${verouderd.length} VEROUDERD — het scherm is gewijzigd sinds de opname:`);
  for (const a of verouderd) console.log(`   ${a.soort.padEnd(5)} ${a.naam.padEnd(34)} ${a.waarom}`);
} else {
  console.log('\n✅ Geen enkel artefact toont een scherm dat sindsdien gewijzigd is.');
}

if (onbekend.length) {
  console.log(`\n❔ ${onbekend.length} ONBEKEND — geen merkteken, dus van vóór deze meting:`);
  console.log('   ' + onbekend.map(a => a.naam).join(', ').slice(0, 300));
  console.log('   Dit is géén "in orde": herneem ze een keer, dan dragen ze hun toestand.');
}
if (onbekendeSha.length) {
  console.log(`\n⚠️ ${onbekendeSha.length} met een SHA die deze repo niet kent (herschreven historie?):`);
  console.log('   ' + onbekendeSha.map(a => a.naam).join(', ').slice(0, 200));
}
if (componentwaarschuwing.size) {
  console.log(`\n⚠️ ${componentwaarschuwing.size} gewijzigd(e) COMPONENT(en) zonder eigen route:`);
  console.log('   ' + [...componentwaarschuwing].join(', '));
  console.log('   Die verschijnen óp schermen; welke is niet af te leiden. Deze controle ziet ze NIET.');
}
console.log(`\n${actueel.length} actueel · ${verouderd.length} verouderd · ${onbekend.length} onbekend`);
if (verouderd.length && !STRENG)
  console.log('\nℹ️  Dit is een MELDING en geen blokkade. Hernemen doe je zelf; `--streng` geeft exitcode 1.');
process.exit(STRENG && verouderd.length ? 1 : 0);
