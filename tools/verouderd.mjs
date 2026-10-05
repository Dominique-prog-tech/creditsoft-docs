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
const eigen = process.argv.slice(2);
const app = eigen.some(a => a.startsWith('--app=')) ? [] : [`--app=${PAKKET.repo}`];
const r = spawnSync(process.execPath,
  [GEDEELD, ...app, `--tabellen=${HIER}`, ...eigen],
  { stdio: 'inherit' });
process.exit(r.status ?? 1);
