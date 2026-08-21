// Maakt de schermafdrukken voor de handleiding uit tenant_demo.
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

async function aanmelden() {
  await page.goto(`${BASIS}/`, { waitUntil: 'load' });
  await page.locator('input[type=password]').waitFor({ timeout: 15000 });
  const velden = page.locator('form input:not([type=hidden])');
  await velden.nth(0).fill(gebruiker);
  await page.locator('input[type=password]').fill(wachtwoord);
  await page.locator('button[type=submit]').click();
  await page.waitForLoadState('load');
}

async function taal(c) {
  await page.goto(`${BASIS}/culture/set?c=${c}`, { waitUntil: 'load' });
}

async function naarWeekMetBlokken() {
  // De agenda opent op deze week; de gedemonstreerde momenten staan een week later.
  await page.locator('.boeking-agenda').waitFor({ timeout: 20000 });
  await page.waitForTimeout(1500);
  await page.locator('.boeking-agenda').press('Escape').catch(() => {});
  const volgende = page.locator('.dxbl-scheduler button').nth(2);   // 0=Vandaag, 1=vorige, 2=volgende
  await volgende.click();
  await page.waitForTimeout(1500);
}

async function beeld(naam, opties = {}) {
  await page.screenshot({ path: `${UIT}/${naam}.png`, ...opties });
  console.log('geschreven:', naam + '.png');
}

await aanmelden();
await page.goto(`${BASIS}/tenant/use/demo`, { waitUntil: 'load' });

for (const [cultuur, achtervoegsel] of [['nl-BE', ''], ['fr-BE', '-fr']]) {
  await taal(cultuur);

  // ⚠️ De lade ONTHOUDT of hij openstond (DrawerId → localStorage). Zonder dit staat hij in de tweede ronde
  //    al open en toont het agenda-beeld van de ene taal iets anders dan dat van de andere.
  await page.goto(`${BASIS}/crm/online-afspraken`, { waitUntil: 'load' });
  await page.evaluate(() => localStorage.removeItem('adm-drawer-boeking-instellingen-open'));

  await page.goto(`${BASIS}/crm/online-afspraken`, { waitUntil: 'load' });
  await naarWeekMetBlokken();
  await beeld(`online-afspraken-agenda${achtervoegsel}`);

  // De lade openen: de rail rechts.
  await page.locator('button.adm-detail-drawer__rail').click({ timeout: 8000 });
  await page.waitForTimeout(1500);
  await beeld(`online-afspraken-instellingen${achtervoegsel}`);
}

await browser.close();
