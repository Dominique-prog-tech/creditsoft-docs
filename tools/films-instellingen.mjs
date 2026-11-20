// De instellingen van CreditSoft voor de gedeelde filmmotor (adm-appkit/tools/filmgenerator, LEESMIJ.md).
//
// Overgestapt op 20/11/2026: films.mjs, bunny.mjs en stemmen.mjs zijn starters. Aanleiding: de gedeelde motor zet de
// omschrijving als metatag bij Bunny (Google leest de speler mee, Search Console meldde "Ontbrekend veld 'description'"),
// en onze kopie stuurde het veld dat Bunny negeert. Twee herstellingen uit onze kopie zaten nog niet in de gedeelde motor
// en zijn er door adm-platform in gezet: de telling op unieke guid in `bunny.mjs check` (01/11/2026) en de statusstrook
// hieronder (21/10/2026).

// Playwright uit de bouwuitvoer van de host in de hoofdkloon, zoals onze films.mjs het altijd importeerde.
export { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';
export { BASIS, gebruiker, wachtwoord, meldAan, stemGeheim, bunnyGeheim, appToestand } from './aansturing.mjs';
export { FILMS } from './draaiboek.mjs';
export const MAP = new URL('./', import.meta.url).pathname;

// ⚠️ DE STATUSSTROOK ("Opstartomgeving") hoort niet in de films: beslissing van Dominique van 12/10/2026 voor de beelden,
// sinds 21/10/2026 ook voor de films, nadat de adviesdossierfilm hem bovenaan elk beeld droeg. Enkel de film over het
// aan-de-slag-paneel toont hem, zoals het beeld daarvan (MET_STROOK in beelden.mjs). In de gedeelde motor is dit opt-in.
// Bewezen 20/11/2026 met een proefopname (dev/beeldronde/reserve/strookproef in adm-creditsoft): aan-de-slag 149 van 149 s
// mét strook; de websitefilm kredietdossiers-basis zonder, en in de tegenproef zonder deze twee regels 34 van 34 s mét.
// Bij een volledige paginalading flitst de strook 1 à 3 beeldjes (40 ms) op, net als met onze vroegere kopie.
export const VERBERG_STROOK = true;
export const FILMS_MET_STROOK = ['aan-de-slag'];

// Voor bunny.mjs: de metadata bij elke video, zoals onze kopie ze vast meegaf.
export const PRODUCT = 'CreditSoft';
export const BRON = 'creditsoft-docs/tools/films.mjs';
// Voor `bunny.mjs naar-website`: rechtstreeks in creditsoft-website, zoals altijd. Content-hub draait dat commando
// vanuit deze repo (content-hub/merken/creditsoft/openstaand.md); bij Nimble staat het doel in de docs-repo zelf.
export const WEBSITE_FILMS = '/Users/dominique/projects/creditsoft-website/src/data/films.json';
// Voor `bunny.mjs vervangproef`: twee films van verschillende lengte, de twee die onze kopie vast gebruikte.
export const VERVANGPROEF = ['kredietdossiers-basis-nl', 'kredietdossiers-basis-fr'];
