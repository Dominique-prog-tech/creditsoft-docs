// ── Blijft de machinerie pakket-vrij? ────────────────────────────────────────────────────────────────────
//
//     node tools/machinerie/schoon.mjs
//
// De hele knip van 06/09/2026 hangt aan één belofte: in `machinerie/` staat niets dat CreditSoft weet.
// Een belofte die niemand nameet, is over een half jaar niet waar meer — dus meet dit ze.
//
// ⚠️ COMMENTAAR ERAF VÓÓR HET ZOEKEN. Anders slaat deze controle aan op de zin "hier staat GEEN CreditSoft
// in" die bovenaan elk machinerie-bestand staat, en dan meet ze haar eigen belofte in plaats van de code.
// Die val heeft deze vloot op één dag vijf keer gehad; ze staat in vloot-lessen.md onder "Guard leest eigen
// commentaar".
//
// 🔨 En hij draait een IJKPUNT: verzonnen code waarvan we het antwoord kennen. Vindt hij daarin niets, dan
// is niet de code schoon maar de meting stuk, en dan is elk groen resultaat waardeloos.

import { readdirSync, readFileSync } from 'node:fs';

const HIER = new URL('.', import.meta.url).pathname;
const VERBODEN = [/creditsoft/i, /nimble/i, /cleanops/i, /localhost:\d+/, /\/Users\//];

const striptCommentaar = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .split('\n').map(r => r.replace(/(^|[^:])\/\/.*$/, '$1')).join('\n');

function scan(naam, bron) {
  const kaal = striptCommentaar(bron);
  const raak = [];
  kaal.split('\n').forEach((regel, i) => {
    for (const p of VERBODEN) if (p.test(regel)) raak.push({ nr: i + 1, regel: regel.trim(), p: String(p) });
  });
  return raak;
}

// ── IJKPUNT ──────────────────────────────────────────────────────────────────────────────────────────────
const IJK = `const BASIS = 'http://localhost:5345';\nconst APP = '/Users/iemand/projects/adm-creditsoft';`;
const ijk = scan('(ijkpunt)', IJK);
if (ijk.length < 2) {
  console.log(`⛔ De MEETOPSTELLING deugt niet: het ijkpunt levert ${ijk.length} treffer(s), verwacht ≥ 2.`);
  console.log('   Elke groene uitslag hieronder zou daarmee niets bewijzen. Repareer eerst dit script.');
  process.exit(1);
}
// en het omgekeerde: zwijgt hij over code die deugt?
if (scan('(ijkpunt2)', 'const basis = PAKKET.basis; // uit app.mjs').length) {
  console.log('⛔ De meting slaat aan op correcte code — ze is te grof.');
  process.exit(1);
}

const bestanden = readdirSync(HIER).filter(f => f.endsWith('.mjs') && f !== 'schoon.mjs');
let vuil = 0;
for (const f of bestanden) {
  const raak = scan(f, readFileSync(HIER + f, 'utf8'));
  if (!raak.length) { console.log(`  ✅ ${f}`); continue; }
  vuil += raak.length;
  console.log(`  ⛔ ${f}`);
  for (const r of raak) console.log(`       regel ${r.nr}: ${r.regel.slice(0, 90)}`);
}

console.log();
console.log(vuil
  ? `⛔ ${vuil} regel(s) in machinerie/ weten van een pakket. Zet ze in app.mjs of geef ze als parameter mee.`
  : `✅ ${bestanden.length} bestand(en) in machinerie/ noemen geen pakket, geen poort en geen absoluut pad.`);
console.log(`   (ijkpunt: ${ijk.length} treffers op verzonnen code — de meting kán vinden)`);
process.exit(vuil ? 1 : 0);
