// Maakt de schermafdrukken van de gedeelde agenda (crm/meetings.md) uit tenant_demo.
//
// ⚠️ Het wachtwoord wordt uit appsettings.Development.json gelezen en nooit geprint. Beelden komen ALTIJD uit
//    tenant_demo — kredietunie en WAVE dragen echte klantnamen en de handleiding staat publiek.
import { readFileSync } from 'node:fs';
import { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';

const BASIS = 'http://localhost:5345';
const UIT = '/Users/dominique/projects/creditsoft-docs/docs/images';

const cfg = readFileSync(
  '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/appsettings.Development.json', 'utf8');
const blok = cfg.match(/"InitialAdmin"\s*:\s*\{(.*?)\}/s)[1];
const gebruiker = blok.match(/"UserName"\s*:\s*"([^"]*)"/)[1];
const wachtwoord = blok.match(/"Password"\s*:\s*"([^"]*)"/)[1];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1700, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

await page.goto(`${BASIS}/`, { waitUntil: 'load' });
await page.locator('input[type=password]').waitFor({ timeout: 15000 });
await page.locator('form input:not([type=hidden])').nth(0).fill(gebruiker);
await page.locator('input[type=password]').fill(wachtwoord);
await page.locator('button[type=submit]').click();
await page.waitForLoadState('load');
await page.goto(`${BASIS}/tenant/use/demo`, { waitUntil: 'load' });

// De twee gedemonstreerde boekingen staan op DINSDAG 25/08/2026.
//
// ⚠️ Navigeer op de DATUMTITEL, niet op een aantal klikken. Twee versies zijn hier al op stukgelopen:
//    "klik één keer vooruit" zette de dagweergave op zaterdag 29 (die begint niet waar de werkweek eindigde),
//    en zoeken op enkel "25 " liep tot 25 SEPTEMBER door omdat de werkweektitel "24 augustus - 28 augustus"
//    het dagnummer 25 helemaal niet bevat. Vandaar: per weergave zijn eigen volledige zoektekst.
async function naarDatum(zoek) {
  await page.locator('.dxbl-scheduler button').nth(0).click();     // Vandaag — altijd vanaf hetzelfde punt
  await page.waitForTimeout(1000);
  for (let i = 0; i < 20; i++) {
    const titel = (await page.locator('.dxbl-scheduler').innerText()).slice(0, 400);
    if (titel.includes(zoek)) return;
    await page.locator('.dxbl-scheduler button').nth(2).click();   // 0=Vandaag, 1=vorige, 2=volgende
    await page.waitForTimeout(1200);
  }
  throw new Error(`"${zoek}" niet bereikt in de datumnavigatie`);
}

for (const [cultuur, achtervoegsel, knop, week, dag] of [
  ['nl-BE', '',    'Per medewerker',   '24 augustus 2026', '25 augustus 2026'],
  ['fr-BE', '-fr', 'Par collaborateur', '24 août 2026',    '25 août 2026'],
]) {
  await page.goto(`${BASIS}/culture/set?c=${cultuur}`, { waitUntil: 'load' });
  await page.goto(`${BASIS}/crm/afspraken`, { waitUntil: 'load' });
  await page.locator('.dxbl-scheduler').waitFor({ timeout: 25000 });
  await page.waitForTimeout(1500);

  await naarDatum(week);
  await page.screenshot({ path: `${UIT}/afspraken-week${achtervoegsel}.png` });
  console.log('geschreven: afspraken-week' + achtervoegsel + '.png');

  // Kolomweergave: die schakelt zelf naar de DAGweergave, en daar begint de datum opnieuw. Dus opnieuw
  // doorklikken tot dinsdag.
  await page.getByRole('button', { name: knop, exact: true }).click();
  await page.waitForTimeout(2000);
  await naarDatum(dag);
  await page.screenshot({ path: `${UIT}/afspraken-per-medewerker${achtervoegsel}.png` });
  console.log('geschreven: afspraken-per-medewerker' + achtervoegsel + '.png');
}

await browser.close();
