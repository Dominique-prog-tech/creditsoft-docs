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

export const BASIS = 'http://localhost:5345';

// levert beelden op die "Nog geen taken" tonen waar er eerst iets stond.
export const ID = {
  dossier:  '00038c40-df6b-4992-83e4-13847c7a0a59',
  // dossier dát een commissieschema draagt — het vorige had er geen, en dan is er niets te tonen.
  // ⚠️ DEMO-1654: een dossier met een ACTIEF schema. Hier stond een dossier waarvan het schema op "Nog niet
  // actief" staat, en dan verschijnen de knoppen Herberekenen en Stopzetten niet — terwijl het bijschrift ze
  // wél belooft. Een schema in de verkeerde toestand toont niet de helft van het scherm.
  dossierMetSchema: 'd2954524-fbed-49e5-972a-7e5c50e926db',
  schema:   '00273359-e86e-4e78-9f09-22cacf71d327',   // het actieve schema van DEMO-1654
  // ⚠️ Een aanbrenger die AL portaaltoegang heeft. Met een aanbrenger zónder toegang toont het venster
  // "Deze aanbrenger heeft nog geen portaaltoegang" — en dan mist het beeld precies de knoppen waar de
  // handleiding naar verwijst (Nieuw tijdelijk wachtwoord, Deactiveren).
  aanbrengerMetPortaal: '05b820be-792d-4ecb-b41e-c8b00619b872',
  relatie:  '09ee4eb1-5c32-4e3d-ade5-a0fe4fd9ded2',   // draagt bijlagen én journaal-items
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
