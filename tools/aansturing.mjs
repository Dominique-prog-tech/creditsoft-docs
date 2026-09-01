// ── Gedeelde aansturing: waar de app staat, wie er aanmeldt, en welke proefgegevens ─────────────────────
//
// ⚠️ WAAROM DIT BESTAND ER IS (30/08/2026). FILMS-SPEC §0 zegt: films.mjs importeert de hulpjes uit
// beelden.mjs, "en dat exporteren is de enige wijziging aan het bestaande bestand". Dat kán niet.
// beelden.mjs start op regel 576 een browser en draait de héle beeldronde IN de module — een `import`
// eruit schiet dus 184 beelden voor het eerste regeltje van films.mjs draait. Exporteren alleen lost dat
// niet op; er is geen manier om een naam uit een module te halen zonder haar body uit te voeren.
//
// Dus: de stukken die GEEN neveneffect hebben, wonen hier, en beide generatoren halen ze op. Dat is
// dezelfde afweging als bij kern.mjs op 29/08 — één bron, en de kopie kan niet uiteenlopen omdat er geen
// kopie is. beelden.mjs verliest 61 regels en wint een import; verder blijft alles wat het deed hetzelfde.

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

export const BASIS = 'http://localhost:5345';

// levert beelden op die "Nog geen taken" tonen waar er eerst iets stond.
export const ID = {
  dossier:  '00038c40-df6b-4992-83e4-13847c7a0a59',
  // dossier dát een commissieschema draagt — het vorige had er geen, en dan is er niets te tonen.
  // ⚠️ Een dossier met een ACTIEF schema. Hier stond ooit een dossier waarvan het schema op "Nog niet
  // actief" staat, en dan verschijnen de knoppen Herberekenen en Stopzetten niet — terwijl het bijschrift ze
  // wél belooft. Een schema in de verkeerde toestand toont niet de helft van het scherm.
  // ⚠️ DEMO-1089 en niet meer DEMO-1654 (31/08/2026). Reden: de generator vult sinds vandaag het JOURNAAL
  // van de eerste dossiers mét een actief commissieschema, en DEMO-1654 valt daarbuiten. Op DEMO-1654 stond
  // "Nog geen taken" terwijl beeld en film beloven dat een dossier zijn taken, notities, gesprekken en
  // mailverkeer bij elkaar draagt. De documentatie wijst dus naar data die de generator GARANDEERT, niet
  // omgekeerd. DEMO-1089 draagt: actief schema, 2 taken, 1 notitie, 2 gesprekken, 2 mails, 2 aanvragers, én
  // gevraagde documenten in ALLE DRIE de toestanden (Gevraagd / Ontvangen / In orde). Dat laatste is de
  // reden dat het DEMO-1001 niet werd: daar stond niets op "Ontvangen", en de filmscène die belooft dat je
  // "per stuk volgt of het aangeleverd is en of het al beoordeeld werd" viel op haar eigen controle.
  //
  // ⚠️ En de oude opmerking hier — "het enige met een ACTIEF schema" — was gewoon onwaar: 1832 dossiers
  // dragen er een, honderden daarvan een actief. Gemeten, niet aangenomen.
  dossierMetSchema: '903a2553-1e1d-4a9d-baab-f456bd96145c',
  schema:   'a9b48983-8066-4209-a315-8f950e6983dd',   // het actieve schema van DEMO-1089
  // ⚠️ Een aanbrenger die AL portaaltoegang heeft. Met een aanbrenger zónder toegang toont het venster
  // "Deze aanbrenger heeft nog geen portaaltoegang" — en dan mist het beeld precies de knoppen waar de
  // handleiding naar verwijst (Nieuw tijdelijk wachtwoord, Deactiveren).
  aanbrengerMetPortaal: '05b820be-792d-4ecb-b41e-c8b00619b872',
  relatie:  '09ee4eb1-5c32-4e3d-ade5-a0fe4fd9ded2',   // draagt bijlagen én journaal-items
  // ⚠️ Een BORDEREL-DOCUMENT, geen batch. De route /commissie/borderel/{Id} verwacht een rij uit
  // `commission.documents` (één per aanbrenger, 5.349 stuks), niet uit `commission.document_batches`
  // (de maandelijkse ronde, 24 stuks). Met een batch-id toont het scherm "Dit borderel bestaat niet (meer)"
  // — een correcte melding op een verkeerde vraag, en die kostte mij een halve meting.
  //
  // Gekozen: openstaand (niet betaald) en met commissielijnen erop, zodat het scherm alles toont wat het
  // belooft. Overleeft een her-seed niet; opnieuw kiezen met:
  //   select id from commission.documents where archived_on_utc is null and not paid
  //   order by document_date desc limit 1;
  borderel: 'c61fccbc-4d3d-45c7-a039-60a068ab9e1a',   // 2026-1554 · Horizon Makelaars Leuven 212 · € 249,62
  aanbrenger:'0447a42c-66a4-4afd-9939-80050a0b3279',
  lead:     'd87a24fd-a6aa-4d42-a412-25dbd99b45ba',
  // ⚠️ Baken Immo Aalst — de fiche die de handleiding letterlijk beschrijft (Beukenlaan 50, 1000 Brussel,
  // documenttaal Frans; nagemeten in tenant_demo). Hier stond een notariskantoor, en het beeld toonde dus
  // een ander bedrijf dan het bijschrift. Geen enkele controle merkte dat: één merkteken volstond.
  prof:     '7ebc3535-636b-4ca2-94b7-97faad46e34c',
  // ⚠️ Demetris — de enige kredietinstelling in tenant_demo die het blok Standaard commissionering ECHT
  // toont: 50 % direct en vijf geplande betalingen die samen 100 % vormen. Hier stond Credimo, dat er geen
  // heeft, terwijl het bijschrift die betalingen beschrijft. Een fiche zonder het geval leert niets.
  fin:      '5427b583-7b10-460f-83b3-c4719f4aaad9',
  // ⚠️ AXA — de verzekeraar die het bijschrift beschrijft (Zuidlaan 47, 2800 Mechelen, VZ8278). Hier stond
  // Patronale, en dat is een fiche met louter een naam: elke verzekeraar in tenant_demo stond op adres,
  // telefoon en instellingsnummer LEEG na een her-seed. Het beeld toonde dus een leeg formulier onder een
  // bijschrift vol gegevens. De gegevens staan terug op dit record; verdwijnen ze weer, dan meldt de
  // alt-controle het.
  verz:     '631dcec1-ee1d-4ae7-a5f1-797b57ca73b8',
  borderel: '000245d0-80b0-4ba8-8354-cdcb377fc5bd',
};

// ⚠️ HET WACHTWOORD KOMT UIT USER-SECRETS, NIET UIT appsettings.Development.json. Die twee liepen op
// 28/08/2026 uiteen, en user-secrets WINT bij het draaien van de app. De oudere scripts in deze map
// (beelden-agenda.mjs, beelden-online-afspraken.mjs) lezen nog appsettings en melden zich dan als een
// time-out op "waiting for locator('table')" — dat is geen trage pagina maar een mislukte aanmelding.
// Nooit printen; enkel invullen.
export const SECRETS = `${process.env.HOME}/.microsoft/usersecrets/511bd113-63f8-48dc-8980-fa97f73c7fe6/secrets.json`;
const CFG = '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/appsettings.Development.json';

let gebruiker, wachtwoord;
if (existsSync(SECRETS)) {
  // ⚠️ BOM eraf: dotnet schrijft secrets.json met een byte-order-mark en JSON.parse struikelt erover.
  const geheim = JSON.parse(readFileSync(SECRETS, 'utf8').replace(/^\uFEFF/, ''));
  gebruiker = geheim['Auth:InitialAdmin:UserName'];
  wachtwoord = geheim['Auth:InitialAdmin:Password'];
}
if (!wachtwoord) {
  const blok = readFileSync(CFG, 'utf8').match(/"InitialAdmin"\s*:\s*\{(.*?)\}/s)[1];
  gebruiker = blok.match(/"UserName"\s*:\s*"([^"]*)"/)[1];
  wachtwoord = blok.match(/"Password"\s*:\s*"([^"]*)"/)[1];
  console.log('ℹ️  wachtwoord uit appsettings.Development.json — user-secrets gaf niets');
}

export { gebruiker, wachtwoord };

// ── De stem-API ──────────────────────────────────────────────────────────────────────────────────────────
// ⚠️ UIT USER-SECRETS, zoals het wachtwoord hierboven. Nooit in git, nooit in een log, nooit in een
// commit-tekst. Zetten doe je één keer, in de Host-map van adm-creditsoft:
//
//     dotnet user-secrets set "ElevenLabs:ApiKey" "<de sleutel>"
//     dotnet user-secrets set "ElevenLabs:StemNl" "<voice-id>"
//     dotnet user-secrets set "ElevenLabs:StemFr" "<voice-id>"
//
// Ontbreekt de sleutel, dan geeft dit `null` — en de aanroeper hoort dat LUID te melden en niet stil terug
// te vallen op de Mac-stem. Een film met de plaatshouder-stem die zich als de echte voordoet, is precies de
// soort stille terugval waar deze vloot al genoeg last van heeft gehad.
// ── Bunny Stream ─────────────────────────────────────────────────────────────────────────────────────────
// Zelfde plaats, zelfde regel: user-secrets, nooit in git of in een log.
//
//     dotnet user-secrets set "Bunny:ApiKey"    "<de sleutel van de video library>"
//     dotnet user-secrets set "Bunny:LibraryId" "<het nummer van de library>"
//
// ── DE TOESTAND VAN DE APP OP HET MOMENT VAN OPNEMEN ─────────────────────────────────────────────────────
//
// ⚠️ EEN SHA EN GEEN VERSIENUMMER. Een versiebump zegt niets over of een SCHERM wijzigde — vandaag ging
// v1.70 naar v1.74 zonder dat de meeste schermen bewogen. Een commit-SHA laat de echte vraag stellen:
// "welke .razor-bestanden zijn sindsdien gewijzigd", en dat is precies wat raakt.mjs beantwoordt.
//
// ⚠️ En hij meldt of de werkmap VUIL was. Een SHA met niet-vastgelegde wijzigingen eromheen beschrijft niet
// wat er werkelijk gefilmd is; dan is het merkteken een benadering en dat hoort zichtbaar te zijn.
export function appToestand() {
  const APP = '/Users/dominique/projects/adm-creditsoft';
  try {
    const sha = execFileSync('git', ['-C', APP, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const vuil = execFileSync('git', ['-C', APP, 'status', '--porcelain'], { encoding: 'utf8' }).trim().length > 0;
    return { sha, vuil };
  } catch (e) {
    // ⚠️ NIET STIL. Zonder SHA kan niets later zeggen of dit beeld verouderd is, en een lege waarde ziet er
    // in de tabel uit als "nog niet ingevuld" in plaats van "mislukt". Mijn eerste versie ving dit weg en
    // gaf null terug omdat de import van execFileSync ontbrak — het zag eruit alsof git niet bestond.
    console.log(`⚠️  app-toestand niet af te lezen: ${String(e).split('\n')[0].slice(0, 120)}`);
    return { sha: null, vuil: null };
  }
}

export function bunnyGeheim(naam) {
  if (!existsSync(SECRETS)) return null;
  const geheim = JSON.parse(readFileSync(SECRETS, 'utf8').replace(/^\uFEFF/, ''));
  return geheim[`Bunny:${naam}`] ?? null;
}

export function stemGeheim(naam) {
  if (!existsSync(SECRETS)) return null;
  const geheim = JSON.parse(readFileSync(SECRETS, 'utf8').replace(/^\uFEFF/, ''));
  return geheim[`ElevenLabs:${naam}`] ?? null;
}


export async function meldAan(page, user, ww, kiesTenant) {
  await page.goto(`${BASIS}/login`);
  await page.locator('input[type="text"], input[name*="ser" i]').first().fill(user);
  await page.locator('input[type="password"]').first().fill(ww);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForLoadState('networkidle');
  if (!kiesTenant) return;
  await page.goto(`${BASIS}/tenants`);
  // ⚠️ Zeg WAT er misging. Een time-out op "table" leest als een trage pagina; negen van de tien keer is het
  // een mislukte aanmelding, en dan zoek je op de verkeerde plaats.
  try { await page.waitForSelector('table', { timeout: 20000 }); }
  catch { throw new Error('Geen tenant-lijst na het aanmelden — vermoedelijk is de aanmelding mislukt (verkeerd wachtwoord?).'); }
  await page.locator('tr', { hasText: 'demo' }).first().getByText(/Gebruiken/).click();
  await page.waitForLoadState('networkidle');
}
