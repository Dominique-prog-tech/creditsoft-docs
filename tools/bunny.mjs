// ── Bunny Stream: verbinden, uploaden, en de VERVANGPROEF ────────────────────────────────────────────────
//
//     node tools/bunny.mjs check       — leest de library uit; bewijst enkel dat de gegevens kloppen
//     node tools/bunny.mjs vervangproef — de proef uit §7.4 van FILMS-SPEC.md
//     node tools/bunny.mjs publiceer [filter] — uploadt wat gewijzigd is, mét ondertitels en hoofdstukken
//     node tools/bunny.mjs hoofdstukken [filter] — werkt ENKEL de hoofdstukken bij van wat al online staat
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
import { statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

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
// ⚠️ WACHTEN TOT BUNNY KLAAR IS, en ZEGGEN wanneer dat niet lukte.
//
// Deze lus gaf op na 180 s en gaf dan stilzwijgend de laatste toestand terug. De aanroeper duwde de
// hoofdstukken vervolgens in een video van lengte 0 en kreeg `400 Chapter is out of bounds` — een melding
// die naar de hoofdstukken wijst terwijl het probleem het WACHTEN was. Gebeurd op 01/09/2026 met
// documentketen-nl (147 s film): status 2, lengte 0, en de ronde meldde verder "✅ gepubliceerd".
//
// Nu: ruimer wachten, en een expliciete vlag `opgegeven` zodat de aanroeper de hoofdstukken OVERSLAAT met
// een leesbare reden in plaats van ze te proberen. De film zelf is dan gewoon goed geüpload; enkel de
// hoofdstukken moeten later met `bunny.mjs hoofdstukken` bijgezet worden.
async function verwerkt(guid, hoelang = 600) {
  for (let i = 0; i < hoelang / 5; i++) {
    const v = await api(`/videos/${guid}`);
    if (!v.ok) return v;
    // status 3+ = klaar bij Bunny; we kijken óók naar de lengte, want die is wat we meten.
    if (v.json?.status >= 3 && (v.json?.length ?? 0) > 0) return v;
    await wacht(5000);
  }
  const laatste = await api(`/videos/${guid}`);
  return { ...laatste, opgegeven: true };
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
  // ⚠️ SAMENVOEGEN, niet de kopie van bij het opstarten wegschrijven — zie dezelfde noot in films.mjs.
  // Een publicatie duurt minuten (Bunny hercodeert), en in die tijd neemt iemand de volgende film op. Wie
  // dan als laatste schrijft, wist het werk van de ander. Op 01/09/2026 verdwenen zo twee verse regels.
  const geraakt = new Set();
  const bewaar = () => {
    const opSchijf = existsSync(UITSLAG) ? JSON.parse(readFileSync(UITSLAG, 'utf8')) : {};
    for (const k of geraakt) opSchijf[k] = uitslag[k];
    writeFileSync(UITSLAG, JSON.stringify(opSchijf, null, 2) + '\n');
  };

  const filter = process.argv[3];
  let gedaan = 0, mislukt = [];
  const collecties = {};

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

    // ⚠️ EEN COLLECTIE PER TAAL (§7.1), zodat een taalronde in één keer te overzien is. Aanmaken als ze nog
    // niet bestaat: de generator hoort geen handmatige voorbereiding in het Bunny-paneel te vragen.
    const collectieNaam = f.taal?.startsWith('fr') ? 'Français' : 'Nederlands';
    if (!collecties[collectieNaam]) {
      const lijst = await api('/collections?page=1&itemsPerPage=100');
      for (const c of lijst.json?.items ?? []) collecties[c.name] = c.guid;
      if (!collecties[collectieNaam]) {
        const c = await api('/collections', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name: collectieNaam }),
        });
        if (c.ok) { collecties[collectieNaam] = c.json.guid; console.log(`   collectie "${collectieNaam}" aangemaakt`); }
      }
    }

    // ⚠️ EEN MENSELIJKE TITEL, geen sleutel. "kredietdossiers-basis-nl" stond als videotitel in het paneel
    // én zou in de speler verschijnen. De omschrijving en de merktekens komen uit hetzelfde scenario, zodat
    // er één bron is voor Bunny én voor de schema.org-gegevens op de handleidingpagina.
    const maak = await api('/videos', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: f.titel ?? sleutel,
        collectionId: collecties[collectieNaam] ?? undefined,
      }),
    });
    if (!maak.ok) { mislukt.push(`${sleutel}: POST /videos → ${maak.status}`); continue; }
    const guid = maak.json.guid;
    console.log(`   guid: ${guid}`);

    const up = await stuur(guid, mp4);
    console.log(`   upload → HTTP ${up.status}`);
    if (!up.ok) { mislukt.push(`${sleutel}: upload → ${up.status} ${up.tekst}`); continue; }

    // ⚠️ HIER STOND EEN CONTROLE DIE HET VERKEERDE MAT, en ze is bewust weggehaald.
    //
    // Ik zag `afspraken-fr` een halfuur na de upload op `storageSize 0` staan en concludeerde dat er niets
    // was aangekomen. Fout: `storageSize` is de opslag ná het HERCODEREN — bij de Nederlandse film 103 MB
    // voor een video van 137 s — en blijft 0 zolang Bunny nog niet klaar is. De upload wás aangekomen; die
    // film stond kort daarna op `status 3, lengte 155`, precies zijn echte duur.
    //
    // Mijn "controle" maakte dus van een trage wachtrij een mislukking, en ik heb er een dubbele lege video
    // mee aangemaakt. Er is in deze API geen veld dat vlak na de PUT zegt of de bytes aankwamen; `length`
    // en `encodeProgress` lopen allebei achter op het hercoderen.
    //
    // Wat er WEL is, staat er al: `verwerkt()` wacht en MELDT wanneer hij opgeeft, en de hoofdstukken
    // worden dan overgeslagen met het commando om ze later bij te zetten. Dat is het eerlijke antwoord —
    // "nog niet klaar" is iets anders dan "mislukt", en dat verschil niet kunnen maken is geen reden om
    // het ergste te beweren.

    // Ondertitels — de tekst bestaat al, dus dat is gratis (§7.3).
    //
    // ⚠️ MAAR NIET BIJ EEN FILM ZONDER GELUID. Daar staat de tekst ÍN het beeld, en Bunny toont zijn
    // ondertitelspoor er dan bovenop: twee keer dezelfde zin over elkaar. Dominique zag het op 01/09/2026
    // op de functionaliteitspagina.
    //
    // Afgeleid uit het BESTAND en niet uit een vlag: het mp4 van een geluidloze film heeft geen audiokanaal,
    // en dat is niet uit de pas te laten lopen met de werkelijkheid. Een aparte `stem: false` in de tabel
    // zou dat wél kunnen.
    const heeftGeluid = (() => {
      try {
        return execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a',
          '-show_entries', 'stream=index', '-of', 'csv=p=0', mp4]).toString().trim().length > 0;
      } catch { return true; }   // bij twijfel: wél ondertitels, dat is de veilige kant
    })();

    const vtt = `${UIT}${sleutel}.vtt`;
    if (!heeftGeluid) {
      console.log('   ondertitels overgeslagen — geluidloze film, de tekst staat in het beeld');
    } else if (existsSync(vtt)) {
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
    console.log(`   verwerkt → ${klaar.json?.length ?? '?'}s (status ${klaar.json?.status})`
      + (klaar.opgegeven ? '  ⏳ NOG NIET KLAAR — na 10 minuten opgegeven' : ''));

    // Hoofdstukken — ook die hebben we al: elke scène heeft een naam en een starttijd (§7.3).
    // ⚠️ Niet proberen op een video die nog verwerkt: elk hoofdstuk valt dan buiten een lengte van 0, en de
    // 400 die je terugkrijgt wijst naar het verkeerde probleem.
    if (klaar.opgegeven) {
      console.log('   hoofdstukken OVERGESLAGEN — de video was nog niet verwerkt.');
      console.log(`   Zet ze later bij met: node tools/bunny.mjs hoofdstukken ${sleutel}`);
      mislukt.push(`${sleutel}: hoofdstukken overgeslagen (video nog niet verwerkt)`);
    } else if (f.hoofdstukken?.length) {
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

    // Omschrijving en merktekens in dezelfde update als de hoofdstukken — één POST, één keer wachten.
    const meta = await api(`/videos/${guid}`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title: f.titel ?? sleutel,
        description: f.omschrijving ?? '',
        metaTags: [
          { property: 'taal', value: f.taal ?? '' },
          { property: 'film', value: f.film ?? '' },
          { property: 'pagina', value: f.pagina ?? '' },
          { property: 'product', value: 'CreditSoft' },
          { property: 'bron', value: 'creditsoft-docs/tools/films.mjs' },
        ],
      }),
    });
    console.log(`   titel + merktekens → HTTP ${meta.status}${meta.ok ? '' : ' — ' + meta.tekst.slice(0, 120)}`);
    if (!meta.ok) mislukt.push(`${sleutel}: metadata → ${meta.status}`);

    // ⚠️ TERUGLEZEN, want een 200 zegt hier niets. Bunny AANVAARDT `description` en doet er niets mee:
    // twee schrijfwijzen geprobeerd op 01/09/2026, allebei HTTP 200, allebei bleef het veld null. Dat is
    // een stille weigering, en zonder deze controle zou de generator "gelukt" melden over iets wat niet
    // gebeurd is. Geen ramp — de omschrijving die telt voor zoekmachines staat in de schema.org-gegevens
    // op de handleidingpagina, en Bunny wordt niet geïndexeerd. Maar meld het, zwijg er niet over.
    const terug = await api(`/videos/${guid}`);
    if (f.omschrijving && !terug.json?.description) {
      console.log('   ⚠️ omschrijving NIET overgenomen door Bunny (bekend: het veld wordt genegeerd via de API).');
      console.log('      De omschrijving staat wél op de handleidingpagina, en dat is wat geïndexeerd wordt.');
    }

    // De miniatuur en de datum bewaren: die voeden de schema.org-VideoObject op de handleidingpagina, en
    // dát is wat een zoekmachine leest — Bunny zelf wordt niet geïndexeerd.
    // ⚠️ ALLEEN OPNEMEN ALS ZE ECHT LAADT. De miniatuur-URL van een privévideo geeft 403, en een
    // schema.org-thumbnailUrl die 403 geeft is ERGER dan geen: een zoekmachine haalt hem op, faalt, en kan
    // de hele VideoObject verwerpen. `isPublic: true` zetten helpt niet — Bunny aanvaardt dat veld en
    // negeert het, net als `description` (allebei geprobeerd op 01/09/2026, allebei HTTP 200, allebei
    // ongewijzigd). Publiek maken is een instelling van de LIBRARY, niet van een video.
    //
    // De controle hoort HIER en niet in de MkDocs-hook: daar zou ze de sitebouw netwerkafhankelijk maken.
    f.thumbnail = null;
    const mini = klaar.json?.thumbnailUrl;
    if (mini) {
      const t = await fetch(mini, { method: 'HEAD' }).catch(() => null);
      if (t?.ok) f.thumbnail = mini;
      else console.log(`   ⚠️ miniatuur niet publiek bereikbaar (HTTP ${t?.status ?? '?'}) — weggelaten uit de `
        + `zoekgegevens. Zet "Direct Play"/publieke toegang aan op de library als je haar in zoekresultaten wil.`);
    }
    f.gepubliceerdOp = klaar.json?.dateUploaded ?? null;
    f.guid = guid;
    f.gepubliceerdeHash = f.hash;
    f.embed = `https://iframe.mediadelivery.net/embed/${LIB}/${guid}`;
    geraakt.add(sleutel);
    bewaar();
    gedaan++;

    // ⚠️ ÉÉN GENERATIE RESPIJT, en dat is geen netheid maar een crawl-kwestie. Dominique wees erop op
    // 01/09/2026: op het moment dat wij vervangen, draagt de cache van een zoekmachine nog de OUDE guid in
    // de zoekgegevens van de pagina. Gooiden we die meteen weg, dan wijst de video-index naar een verwijderde
    // video tot de volgende crawl — en wie de embed-link ooit kopieerde, kijkt naar niets.
    //
    // Daarom: de VORIGE blijft staan, de VÓÓRVORIGE gaat weg. De bibliotheek groeit dan tot hoogstens twee
    // generaties in plaats van eindeloos, en er is altijd één ronde speling. De handleiding zelf wijst
    // altijd naar de nieuwste — die leest de tabel bij het bouwen.
    if (f.vorigeGuid && f.vorigeGuid !== oudeGuid) {
      const d = await api(`/videos/${f.vorigeGuid}`, { method: 'DELETE' });
      console.log(`   voorvorige versie ${f.vorigeGuid} opgeruimd → HTTP ${d.status}`);
    }
    if (oudeGuid) {
      f.vorigeGuid = oudeGuid;
      console.log(`   vorige versie ${oudeGuid} blijft nog één ronde staan (crawl-respijt)`);
    }
    geraakt.add(sleutel);
    bewaar();
  }

  console.log(`\n${'─'.repeat(74)}`);
  console.log(gedaan ? `✅ ${gedaan} film(s) gepubliceerd` : 'ℹ️  niets te publiceren');
  if (mislukt.length) { console.log(`⚠️ ${mislukt.length} probleem(en):`); mislukt.forEach(m => console.log('   ' + m)); }
  process.exit(mislukt.length ? 1 : 0);
}

if (opdracht === 'hoofdstukken') {
  // Duwt ENKEL de hoofdstukken van al gepubliceerde films door — zonder nieuwe upload, dus zonder nieuwe
  // guid en zonder dat één verwijzing op één pagina wijzigt.
  //
  // ⚠️ Waarom dit bestaat: tot 01/09/2026 was de hoofdstuktitel de INTERNE scènenaam. Een klant die de
  // speler opende, las "lijst · kolommen · zoeken" — kleine letters, onze woorden, en op de Franse film
  // óók in het Nederlands. Dat is niet erg genoeg om er een nieuwe upload voor te doen (een film is bij
  // Bunny niet te vervangen), en te zichtbaar om te laten staan. Hoofdstukken zijn metadata, dus dit kan.
  //
  // Werkwijze: eerst `node tools/films.mjs --hoofdstukken` (schrijft de titels in de tabel), dan dit.
  const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
  const uitslag = JSON.parse(readFileSync(UITSLAG, 'utf8'));
  const filter = process.argv[3];
  let raak = 0, over = 0;
  const mislukt = [];
  for (const [sleutel, f] of Object.entries(uitslag)) {
    if (filter && !sleutel.includes(filter)) continue;
    if (!f.guid) { console.log(`⏭  ${sleutel} — nog niet gepubliceerd`); over++; continue; }
    if (!f.hoofdstukken?.length) { console.log(`⏭  ${sleutel} — geen hoofdstukken`); over++; continue; }
    // ⚠️ Afkappen op de lengte die BUNNY meet, net als bij publiceren: onze berekende lengte en de
    // hercodeerde lengte schelen een fractie, en één seconde te ver geeft een 400.
    const v = await api(`/videos/${f.guid}`);
    if (!v.ok) { mislukt.push(`${sleutel}: ophalen → ${v.status}`); continue; }
    const lengte = v.json?.length ?? 1;
    const h = await api(`/videos/${f.guid}`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chapters: f.hoofdstukken.map(x => ({
        title: x.titel,
        start: Math.min(Math.round(x.start), lengte - 1),
        end: Math.min(Math.round(x.eind), lengte) })) }),
    });
    if (h.ok) { raak++; console.log(`✅ ${sleutel} — ${f.hoofdstukken.length} hoofdstukken: ${f.hoofdstukken.map(x => x.titel).join(' · ')}`); }
    else mislukt.push(`${sleutel}: ${h.status} — ${h.tekst.slice(0, 100)}`);
  }
  console.log(`\n${raak} film(s) bijgewerkt, ${over} overgeslagen.`);
  // ⚠️ NIETS GEVONDEN IS GEEN "IN ORDE". Raakte dit geen enkele film, dan is dat een uitkomst om te
  // melden en niet een schone afloop — meestal een filter die niets matcht.
  if (raak === 0) console.log('⚠️  GEEN ENKELE film bijgewerkt. Klopt het filter, en staan er guids in de tabel?');
  if (mislukt.length) { console.log(`\n❌ ${mislukt.length} mislukt:`); mislukt.forEach(m => console.log(`   ${m}`)); process.exit(1); }
  process.exit(0);
}

if (opdracht === 'metadata') {
  // Ververst de AFGELEIDE velden van al gepubliceerde films — miniatuur en datum — zonder opnieuw te
  // uploaden. Nodig wanneer er aan de LIBRARY iets wijzigt in plaats van aan de film: op 01/09/2026 stond
  // `BlockNoneReferrer` aan, waardoor de miniatuur 403 gaf voor iedereen zonder referer (dus ook voor een
  // zoekmachine) en dus uit de zoekgegevens werd gelaten. Zo'n wijziging hoort geen nieuwe upload te kosten.
  const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
  const uitslag = JSON.parse(readFileSync(UITSLAG, 'utf8'));
  for (const [sleutel, f] of Object.entries(uitslag)) {
    if (!f.guid) { console.log(`⏭  ${sleutel} — nog niet gepubliceerd`); continue; }
    const v = await api(`/videos/${f.guid}`);
    if (!v.ok) { console.log(`⚠️ ${sleutel} → HTTP ${v.status}`); continue; }
    const mini = v.json?.thumbnailUrl;
    let uit = null;
    if (mini) {
      const t = await fetch(mini, { method: 'HEAD' }).catch(() => null);
      uit = t?.ok ? mini : null;
      if (!t?.ok) console.log(`   ${sleutel}: miniatuur HTTP ${t?.status ?? '?'} — weggelaten`);
    }
    f.thumbnail = uit;
    f.gepubliceerdOp = v.json?.dateUploaded ?? f.gepubliceerdOp ?? null;
    console.log(`✅ ${sleutel} — miniatuur ${uit ? 'opgenomen' : 'weggelaten'}, ${v.json?.length ?? '?'}s`);
  }
  writeFileSync(UITSLAG, JSON.stringify(uitslag, null, 2) + '\n');
  process.exit(0);
}

if (opdracht === 'naar-website') {
  // ⚠️ EEN GEGENEREERD BESTAND, GEEN TWEEDE BRON. creditsoft-website is een andere repo en kan
  // films-uitslag.json niet lezen. Drie wegen waren mogelijk: met de hand overtypen (loopt uit elkaar),
  // de website laat het bij het bouwen ophalen van docs.creditsoft.be (maakt de sitebouw afhankelijk van
  // een externe site), of dit: één commando dat schrijft, en de uitkomst staat in git.
  //
  // Het bestand draagt ENKEL wat de site nodig heeft — filmnaam, taal, guid, lengte — en zegt bovenaan
  // waar het vandaan komt, zodat niemand het met de hand gaat bewerken.
  const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
  const DOEL = '/Users/dominique/projects/creditsoft-website/src/data/films.json';
  const uitslag = JSON.parse(readFileSync(UITSLAG, 'utf8'));

  const uit = { _bron: 'creditsoft-docs — geschreven door `node tools/bunny.mjs naar-website`, niet met de hand bewerken', films: {} };
  let n = 0;
  for (const [sleutel, f] of Object.entries(uitslag)) {
    if (!f.guid) continue;
    // enkel de website-uitvoeringen; de handleidingfilms horen niet op de site
    const m = sleutel.match(/^(.*)-website-(nl|fr|en)$/);
    if (!m) continue;
    (uit.films[m[1]] ??= {})[m[2]] = { guid: f.guid, lengte: f.lengte, titel: f.titel ?? '' };
    n++;
  }
  if (n === 0) { console.log('⛔ Geen enkele website-film met een guid — publiceer eerst.'); process.exit(1); }
  writeFileSync(DOEL, JSON.stringify(uit, null, 2) + '\n');
  console.log(`✅ ${n} film(s) naar ${DOEL}`);
  for (const [naam, talen] of Object.entries(uit.films))
    console.log(`   ${naam}: ${Object.keys(talen).join(', ')}`);
  process.exit(0);
}

if (opdracht === 'miniatuur') {
  // ⚠️ BUNNY KIEST ZELF EEN BEELD UIT HET MIDDEN, en bij ons is dat een dichte tabel. Je ziet die miniatuur
  // alleen wanneer autoplay niet doorgaat — data-besparing, "beperk beweging", een trage verbinding — maar
  // net dan is het de eerste indruk. Een vroeg beeld toont het scherm zoals de film begint.
  //
  // De seconde is instelbaar; standaard 3, want dan staat scène 1 met haar tekst in beeld.
  const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
  const uitslag = JSON.parse(readFileSync(UITSLAG, 'utf8'));
  const filter = process.argv[3];
  const sec = Number(process.argv[4] ?? 3);
  const { execFileSync } = await import('node:child_process');

  for (const [sleutel, f] of Object.entries(uitslag)) {
    if (filter && !sleutel.includes(filter)) continue;
    if (!f.guid) { console.log(`⏭  ${sleutel} — nog niet gepubliceerd`); continue; }
    const mp4 = `${UIT}${sleutel}.mp4`;
    if (!existsSync(mp4)) { console.log(`⏭  ${sleutel} — geen mp4 om een beeld uit te halen`); continue; }

    const beeld = `${UIT}${sleutel}-mini.jpg`;
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(sec), '-i', mp4,
                            '-frames:v', '1', '-q:v', '2', beeld]);
    const r = await fetch(`${BASIS}/videos/${f.guid}/thumbnail`, {
      method: 'POST', headers: { AccessKey: SLEUTEL, 'content-type': 'image/jpeg' },
      body: readFileSync(beeld),
    });
    console.log(`${r.ok ? '✅' : '⚠️'} ${sleutel} — beeld op ${sec}s → HTTP ${r.status}`);
  }
  process.exit(0);
}

if (opdracht === 'ondertitels-op-orde') {
  // Haalt ondertitelsporen weg bij films ZONDER geluid, waar de tekst al in het beeld staat. Laat de
  // gesproken films met rust. Nodig omdat de eerste publicaties ze wél kregen — zie de opmerking in
  // `publiceer`.
  const UITSLAG = new URL('./films-uitslag.json', import.meta.url).pathname;
  const uitslag = JSON.parse(readFileSync(UITSLAG, 'utf8'));
  for (const [sleutel, f] of Object.entries(uitslag)) {
    if (!f.guid) continue;
    const mp4 = `${UIT}${sleutel}.mp4`;
    if (!existsSync(mp4)) { console.log(`⏭  ${sleutel} — geen mp4, kan geluid niet vaststellen`); continue; }
    const geluid = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a',
      '-show_entries', 'stream=index', '-of', 'csv=p=0', mp4]).toString().trim().length > 0;
    const v = await api(`/videos/${f.guid}`);
    const sporen = v.json?.captions ?? [];
    if (geluid) { console.log(`✓  ${sleutel} — gesproken, ${sporen.length} spoor/sporen blijven`); continue; }
    if (!sporen.length) { console.log(`✓  ${sleutel} — geluidloos, geen sporen`); continue; }
    for (const c of sporen) {
      const d = await api(`/videos/${f.guid}/captions/${c.srclang}`, { method: 'DELETE' });
      console.log(`🗑  ${sleutel} — spoor "${c.srclang}" weg → HTTP ${d.status}`);
    }
  }
  process.exit(0);
}

console.log(`Onbekende opdracht "${opdracht}". Gebruik: check | publiceer | metadata | naar-website | miniatuur | ondertitels-op-orde | vervangproef`);
process.exit(1);
