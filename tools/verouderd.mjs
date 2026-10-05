// ── Welke beelden en films tonen een scherm dat sindsdien gewijzigd is? ──────────────────────────────────
//
//     node tools/verouderd.mjs            het verslag
//     node tools/verouderd.mjs --kort     enkel de namen
//     node tools/verouderd.mjs --streng   exitcode 1 bij verouderd
//
// Het werk zit in adm-appkit/tools/schermmachinerie/verouderd.mjs — gedeeld met de vloot. Dit bestand vult
// alleen in wát CreditSoft is: waar onze app-repo staat en waar onze uitslagtabellen staan.
//
// ⚠️ Het gedeelde script EIST die twee paden en heeft er geen standaard voor. Dat is met opzet: een
//    standaardpad zou naar de repo van de vorige gebruiker wijzen, en dan meet het het verkeerde project
//    zonder te klagen.
import { spawnSync } from 'node:child_process';
import { PAKKET } from './app.mjs';

const HIER = new URL('.', import.meta.url).pathname;
const GEDEELD = '/Users/dominique/projects/adm-appkit/tools/schermmachinerie/verouderd.mjs';

// ⚠️ Een eigen --app (bv. een worktree) WINT. Tot 05/10/2026 zette deze wrapper de zijne vooraan, en het gedeelde script
//    neemt de EERSTE --app: `--app=<worktree>` werd stil genegeerd en de controle mat de hoofdmap — "actueel" boven 24
//    beelden van een scherm dat in de worktree gewijzigd was. Gevonden bij de gelinkte contacten (CreditSoft 1.164.0).
// ⚠️⚠️ En `--app <pad>` MET EEN SPATIE (05/10/2026, tweede gedaante): het gedeelde script kent enkel `--app=`, dus de
//    spatievorm viel stil weg — wrapper zette de hoofdmap erbij en de controle meldde 237 actueel · 37 verouderd, terwijl
//    de worktree 215 · 69 gaf (28 relatiebeelden "actueel" boven een gewijzigde fiche). Hier omgezet naar de =-vorm.
const ruw = process.argv.slice(2);
const eigen = [];
for (let i = 0; i < ruw.length; i++) {
  if (ruw[i] === '--app') {
    if (!ruw[i + 1] || ruw[i + 1].startsWith('--')) { console.error('⛔ --app zonder pad'); process.exit(2); }
    eigen.push(`--app=${ruw[++i]}`);
  } else eigen.push(ruw[i]);
}
const app = eigen.some(a => a.startsWith('--app=')) ? [] : [`--app=${PAKKET.repo}`];
const r = spawnSync(process.execPath,
  [GEDEELD, ...app, `--tabellen=${HIER}`, ...eigen],
  { stdio: 'inherit' });
process.exit(r.status ?? 1);
