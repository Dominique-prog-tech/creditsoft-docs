// De instellingen van CreditSoft voor de gedeelde filmmotor (adm-appkit/tools/filmgenerator, LEESMIJ.md).
//
// ⚠️ OVERGESTAPT OP 20/11/2026 voor bunny.mjs en stemmen.mjs, NIET voor films.mjs. De gedeelde motor publiceert de
// omschrijving als metatag (Google leest de speler van Bunny mee, Search Console meldde "Ontbrekend veld 'description'"),
// en onze kopie van bunny.mjs deed dat niet. films.mjs blijft onze eigen kopie tot de gedeelde motor de statusstrook
// kan verbergen met een uitzondering per film (onze kopie: VERBERG_STROOK en FILMS_MET_STROOK, 21/10/2026). Met de
// gedeelde motor zou de volgende opname "Opstartomgeving" bovenaan elk beeld dragen. Gemeld aan adm-platform.
// De namen die enkel films.mjs gebruikt (chromium, BASIS, …, FILMS) staan er al, zodat die overstap één regel wordt.

// Playwright uit de bouwuitvoer van de host in de hoofdkloon, zoals onze films.mjs het altijd importeerde.
export { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';
export { BASIS, gebruiker, wachtwoord, meldAan, stemGeheim, bunnyGeheim, appToestand } from './aansturing.mjs';
export { FILMS } from './draaiboek.mjs';
export const MAP = new URL('./', import.meta.url).pathname;

// Voor bunny.mjs: de metadata bij elke video, zoals onze kopie ze vast meegaf.
export const PRODUCT = 'CreditSoft';
export const BRON = 'creditsoft-docs/tools/films.mjs';
// Voor `bunny.mjs naar-website`: rechtstreeks in creditsoft-website, zoals altijd. Content-hub draait dat commando
// vanuit deze repo (content-hub/merken/creditsoft/openstaand.md); bij Nimble staat het doel in de docs-repo zelf.
export const WEBSITE_FILMS = '/Users/dominique/projects/creditsoft-website/src/data/films.json';
// Voor `bunny.mjs vervangproef`: twee films van verschillende lengte, de twee die onze kopie vast gebruikte.
export const VERVANGPROEF = ['kredietdossiers-basis-nl', 'kredietdossiers-basis-fr'];
