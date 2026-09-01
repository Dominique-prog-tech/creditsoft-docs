// ── Bunny Stream: verbinden, uploaden, en de VERVANGPROEF ────────────────────────────────────────────────
//
//     node tools/bunny.mjs check       — leest de library uit; bewijst enkel dat de gegevens kloppen
//     node tools/bunny.mjs vervangproef — de proef uit §7.4 van FILMS-SPEC.md
//
// ⚠️ WAAROM DIE PROEF BESTAAT. De nota zegt: "Bunny documenteert niet met zoveel woorden dat opnieuw PUT'en
// naar dezelfde GUID het bestand vervangt met behoud van de embed. Ga er niet van uit — MEET het." Het hele
// publicatieontwerp hangt eraan: kan een film vervangen worden zonder zijn link te breken, dan overleven
// verstuurde en gebookmarkte links elke herneming. Kan dat niet, dan valt de handleiding terug op de
// indirectie in .films-uitslag.json en veroudert enkel een extern gedeelde link.
//
// ⚠️ EN DE PROEF MEET DE INHOUD, NIET ENKEL DE URL. Dat de GUID gelijk blijft bewijst niets: als de tweede
// PUT stilzwijgend niets doet, is de GUID óók gelijk. Daarom twee films met een verschillende LENGTE — 97 s
// en 104 s — en achteraf de vraag of de lengte mee veranderd is.
import { bunnyGeheim } from './aansturing.mjs';
import { readFileSync, existsSync } from 'node:fs';

const SLEUTEL = bunnyGeheim('ApiKey');
const LIB = bunnyGeheim('LibraryId');
if (!SLEUTEL || !LIB) {
  console.log('⛔ Geen Bunny-gegevens in user-secrets. Zet ze één keer, in de Host-map van adm-creditsoft:');
  console.log('   dotnet user-secrets set "Bunny:ApiKey"    "<sleutel van de video library>"');
  console.log('   dotnet user-secrets set "Bunny:LibraryId" "<nummer van de library>"');
  process.exit(1);
}

const BASIS = `https://video.bunnycdn.com/library/${LIB}`;
const UIT = new URL('./.films-uit/', import.meta.url).pathname;

async function api(pad, opties = {}) {
  const r = await fetch(`${BASIS}${pad}`, {
    ...opties,
    headers: { AccessKey: SLEUTEL, accept: 'application/json', ...(opties.headers ?? {}) },
  });
  const tekst = await r.text();
  let json = null; try { json = JSON.parse(tekst); } catch { /* geen json */ }
  return { ok: r.ok, status: r.status, json, tekst };
}

const wacht = ms => new Promise(r => setTimeout(r, ms));

// Wacht tot Bunny klaar is met verwerken en geef de video terug. Zonder dit lees je de lengte van een video
// die nog aan het transcoderen is — en dan meet je niets.
async function verwerkt(guid, hoelang = 180) {
  for (let i = 0; i < hoelang / 5; i++) {
    const v = await api(`/videos/${guid}`);
    if (!v.ok) return v;
    // status 4 = klaar bij Bunny; we kijken óók naar de lengte, want die is wat we meten.
    if (v.json?.status >= 3 && (v.json?.length ?? 0) > 0) return v;
    await wacht(5000);
  }
  return await api(`/videos/${guid}`);
}

async function stuur(guid, bestand) {
  const r = await fetch(`${BASIS}/videos/${guid}`, {
    method: 'PUT',
    headers: { AccessKey: SLEUTEL, 'content-type': 'application/octet-stream' },
    body: readFileSync(bestand),
  });
  return { ok: r.ok, status: r.status, tekst: (await r.text()).slice(0, 200) };
}

const opdracht = process.argv[2] ?? 'check';

if (opdracht === 'check') {
  const r = await api('/videos?page=1&itemsPerPage=100');
  console.log(`GET /videos → HTTP ${r.status}`);
  if (!r.ok) { console.log(r.tekst.slice(0, 300)); process.exit(1); }
  const items = r.json?.items ?? [];
  console.log(`✅ verbonden met library ${LIB} — ${items.length} video('s)`);
  for (const v of items) console.log(`   ${v.guid}  ${String(v.length ?? '?').padStart(4)}s  ${v.title}`);
  process.exit(0);
}

if (opdracht === 'vervangproef') {
  const eerste = `${UIT}kredietdossiers-basis-nl.mp4`;
  const tweede = `${UIT}kredietdossiers-basis-fr.mp4`;
  for (const f of [eerste, tweede])
    if (!existsSync(f)) { console.log(`⛔ ${f} bestaat niet — draai eerst films.mjs`); process.exit(1); }

  console.log('① video-object aanmaken…');
  const maak = await api('/videos', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: 'VERVANGPROEF — mag weg' }),
  });
  if (!maak.ok) { console.log(`⛔ POST /videos → HTTP ${maak.status}: ${maak.tekst.slice(0, 250)}`); process.exit(1); }
  const guid = maak.json.guid;
  const embed = `https://iframe.mediadelivery.net/embed/${LIB}/${guid}`;
  console.log(`   guid  : ${guid}`);
  console.log(`   embed : ${embed}`);

  console.log('② de NEDERLANDSE film erheen sturen (97 s)…');
  const a = await stuur(guid, eerste);
  if (!a.ok) { console.log(`⛔ PUT → HTTP ${a.status}: ${a.tekst}`); process.exit(1); }
  const na1 = await verwerkt(guid);
  console.log(`   lengte na de eerste upload: ${na1.json?.length ?? '?'}s  (status ${na1.json?.status})`);

  console.log('③ de FRANSE film naar DEZELFDE guid sturen (104 s)…');
  const b = await stuur(guid, tweede);
  console.log(`   PUT → HTTP ${b.status}${b.ok ? '' : ' — ' + b.tekst}`);
  await wacht(8000);
  const na2 = await verwerkt(guid);

  const guidGelijk = na2.json?.guid === guid;
  const lengteGewijzigd = (na1.json?.length ?? 0) !== (na2.json?.length ?? 0);
  console.log(`   lengte na de tweede upload: ${na2.json?.length ?? '?'}s`);

  console.log('\n── UITSLAG ─────────────────────────────────────────────────────────────────');
  console.log(`guid ongewijzigd : ${guidGelijk ? 'JA' : '⚠️ NEE'}`);
  console.log(`inhoud vervangen : ${lengteGewijzigd ? 'JA' : '⚠️ NEE — de tweede PUT deed niets'}`);
  console.log(guidGelijk && lengteGewijzigd
    ? `\n✅ VERVANGEN WERKT. Dezelfde embed toont de nieuwe film:\n   ${embed}`
    : `\n⛔ VERVANGEN WERKT NIET zoals gehoopt. De indirectie in .films-uitslag.json is dus geen luxe maar\n   noodzaak: de handleiding verwijst naar een FILMNAAM en nooit naar een guid.`);
  console.log('\n⚠️ Ruim de proefvideo daarna op in het Bunny-paneel — ze heet "VERVANGPROEF — mag weg".');
  process.exit(0);
}

console.log(`Onbekende opdracht "${opdracht}". Gebruik: check | vervangproef`);
process.exit(1);
