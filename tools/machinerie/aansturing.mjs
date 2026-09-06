// ── MACHINERIE: geheimen lezen, aanmelden, en de toestand van de app ─────────────────────────────────────
//
// Hier staat GEEN CreditSoft in. Elke functie krijgt wat ze over het pakket moet weten als parameter;
// welk pakket dat is, staat in ../app.mjs. Geknipt uit aansturing.mjs op 06/09/2026.

import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// ── Een geheim uit de user-secrets van een .NET-host ─────────────────────────────────────────────────────
// ⚠️ BOM eraf: dotnet schrijft secrets.json met een byte-order-mark en JSON.parse struikelt erover.
// ⚠️ Ontbreekt de sleutel, dan geeft dit `null` — en de aanroeper hoort dat LUID te melden en niet stil
// terug te vallen. Een film met de plaatshouder-stem die zich als de echte voordoet, is precies de soort
// stille terugval waar deze vloot al genoeg last van heeft gehad.
export function geheim(secretsPad, sleutel) {
  if (!existsSync(secretsPad)) return null;
  return JSON.parse(readFileSync(secretsPad, 'utf8').replace(/^\uFEFF/, ''))[sleutel] ?? null;
}

// ── De aanmeldgegevens van de operator ───────────────────────────────────────────────────────────────────
// user-secrets eerst, appsettings.Development.json als terugval — en die terugval MELDT zich, want de twee
// liepen op 28/08/2026 uiteen en user-secrets wint bij het draaien van de app.
export function aanmeldgegevens(secretsPad, cfgPad) {
  let gebruiker = geheim(secretsPad, 'Auth:InitialAdmin:UserName');
  let wachtwoord = geheim(secretsPad, 'Auth:InitialAdmin:Password');
  if (!wachtwoord) {
    const b = readFileSync(cfgPad, 'utf8').match(/"InitialAdmin"\s*:\s*\{(.*?)\}/s)[1];
    gebruiker = b.match(/"UserName"\s*:\s*"([^"]*)"/)[1];
    wachtwoord = b.match(/"Password"\s*:\s*"([^"]*)"/)[1];
    console.log('ℹ️  wachtwoord uit appsettings.Development.json — user-secrets gaf niets');
  }
  return { gebruiker, wachtwoord };
}

//
// ⚠️ EEN SHA EN GEEN VERSIENUMMER. Een versiebump zegt niets over of een SCHERM wijzigde — vandaag ging
// v1.70 naar v1.74 zonder dat de meeste schermen bewogen. Een commit-SHA laat de echte vraag stellen:
// "welke .razor-bestanden zijn sindsdien gewijzigd", en dat is precies wat raakt.mjs beantwoordt.
//
// ⚠️ En hij meldt of de werkmap VUIL was. Een SHA met niet-vastgelegde wijzigingen eromheen beschrijft niet
// wat er werkelijk gefilmd is; dan is het merkteken een benadering en dat hoort zichtbaar te zijn.
export function appToestand(APP) {
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


export async function meldAan(page, basis, user, ww, kiesTenant, tenant) {
  await page.goto(`${basis}/login`);
  await page.locator('input[type="text"], input[name*="ser" i]').first().fill(user);
  await page.locator('input[type="password"]').first().fill(ww);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForLoadState('networkidle');
  if (!kiesTenant) return;
  await page.goto(`${basis}/tenants`);
  // ⚠️ Zeg WAT er misging. Een time-out op "table" leest als een trage pagina; negen van de tien keer is het
  // een mislukte aanmelding, en dan zoek je op de verkeerde plaats.
  try { await page.waitForSelector('table', { timeout: 20000 }); }
  catch { throw new Error('Geen tenant-lijst na het aanmelden — vermoedelijk is de aanmelding mislukt (verkeerd wachtwoord?).'); }
  await page.locator('tr', { hasText: tenant }).first().getByText(/Gebruiken/).click();
  await page.waitForLoadState('networkidle');
}

