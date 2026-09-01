// ── Bunny Stream: verbinden, uploaden, en de VERVANGPROEF ────────────────────────────────────────────────
//
//     node tools/bunny.mjs check       — leest de library uit; bewijst enkel dat de gegevens kloppen
//     node tools/bunny.mjs vervangproef — de proef uit §7.4 van FILMS-SPEC.md
//     node tools/bunny.mjs publiceer [filter] — uploadt wat gewijzigd is, mét ondertitels en hoofdstukken
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
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

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

if (opdracht === 'publiceer') {
  const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
  if (!existsSync(UITSLAG)) { console.log('⛔ Geen .films-uitslag.json — draai eerst films.mjs'); process.exit(1); }
  const uitslag = JSON.parse(readFileSync(UITSLAG, 'utf8'));
  const bewaar = () => writeFileSync(UITSLAG, JSON.stringify(uitslag, null, 2) + '\n');

  const filter = process.argv[3];
  let gedaan = 0, mislukt = [];

  for (const [sleutel, f] of Object.entries(uitslag)) {
    if (filter && !sleutel.includes(filter)) continue;
    const mp4 = `${UIT}${sleutel}.mp4`;
    if (!existsSync(mp4)) { mislukt.push(`${sleutel}: geen mp4`); continue; }

    // ⚠️ Alleen opnieuw publiceren als er iets GEWIJZIGD is. De hash draagt route + narratie; staat er al
    // een guid bij dezelfde hash, dan is de gepubliceerde film nog de juiste en doen we niets. Zonder deze
    // controle zou elke ronde vijftien nieuwe video's aanmaken en vijftien oude weggooien, voor niets.
    if (f.guid && f.gepubliceerdeHash === f.hash) {
      console.log(`⏭  ${sleutel} — ongewijzigd, blijft op guid ${f.guid}`);
      continue;
    }

    console.log(`\n▸ ${sleutel}`);
    const oudeGuid = f.guid;

    const maak = await api('/videos', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: sleutel }),
    });
    if (!maak.ok) { mislukt.push(`${sleutel}: POST /videos → ${maak.status}`); continue; }
    const guid = maak.json.guid;
    console.log(`   guid: ${guid}`);

    const up = await stuur(guid, mp4);
    console.log(`   upload → HTTP ${up.status}`);
    if (!up.ok) { mislukt.push(`${sleutel}: upload → ${up.status} ${up.tekst}`); continue; }

    // Ondertitels — de tekst bestaat al, dus dat is gratis (§7.3).
    const vtt = `${UIT}${sleutel}.vtt`;
    if (existsSync(vtt)) {
      const taalcode = f.taal?.startsWith('fr') ? 'fr' : 'nl';
      const c = await api(`/videos/${guid}/captions/${taalcode}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ srclang: taalcode, label: taalcode === 'fr' ? 'Français' : 'Nederlands',
                               captionsFile: readFileSync(vtt).toString('base64') }),
      });
      console.log(`   ondertitels → HTTP ${c.status}${c.ok ? '' : ' — ' + c.tekst.slice(0, 120)}`);
      if (!c.ok) mislukt.push(`${sleutel}: ondertitels → ${c.status}`);
    }

    // ⚠️ EERST WACHTEN TOT BUNNY KLAAR IS MET VERWERKEN. Hoofdstukken zetten vlak na de upload geeft
    // "Chapter is out of bounds of the video" (gemeten 01/09/2026): de video heeft dan nog lengte 0, dus
    // élk hoofdstuk valt erbuiten. De ondertitels hebben er geen last van — die worden wél meteen aanvaard.
    const klaar = await verwerkt(guid);
    console.log(`   verwerkt → ${klaar.json?.length ?? '?'}s (status ${klaar.json?.status})`);

    // Hoofdstukken — ook die hebben we al: elke scène heeft een naam en een starttijd (§7.3).
    if (f.hoofdstukken?.length) {
      const h = await api(`/videos/${guid}`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        // ⚠️ Afkappen op de lengte die BUNNY meet, niet die wij berekenden. Die twee schelen een fractie
        // door het hercoderen, en één seconde te ver is genoeg voor een 400.
        body: JSON.stringify({ chapters: f.hoofdstukken.map(x => ({
          title: x.titel,
          start: Math.min(Math.round(x.start), (klaar.json?.length ?? 1) - 1),
          end: Math.min(Math.round(x.eind), klaar.json?.length ?? 1) })) }),
      });
      console.log(`   hoofdstukken (${f.hoofdstukken.length}) → HTTP ${h.status}${h.ok ? '' : ' — ' + h.tekst.slice(0, 120)}`);
      if (!h.ok) mislukt.push(`${sleutel}: hoofdstukken → ${h.status}`);
    }

    f.guid = guid;
    f.gepubliceerdeHash = f.hash;
    f.embed = `https://iframe.mediadelivery.net/embed/${LIB}/${guid}`;
    bewaar();
    gedaan++;

    // ⚠️ PAS NU de oude weggooien, en niet eerder. Faalt de upload halverwege, dan staat de vorige film er
    // nog en toont de handleiding iets ouds in plaats van niets. Een verouderde film is beter dan een lege.
    if (oudeGuid) {
      const d = await api(`/videos/${oudeGuid}`, { method: 'DELETE' });
      console.log(`   oude versie ${oudeGuid} verwijderd → HTTP ${d.status}`);
    }
  }

  console.log(`\n${'─'.repeat(74)}`);
  console.log(gedaan ? `✅ ${gedaan} film(s) gepubliceerd` : 'ℹ️  niets te publiceren');
  if (mislukt.length) { console.log(`⚠️ ${mislukt.length} probleem(en):`); mislukt.forEach(m => console.log('   ' + m)); }
  process.exit(mislukt.length ? 1 : 0);
}

console.log(`Onbekende opdracht "${opdracht}". Gebruik: check | vervangproef`);
process.exit(1);
