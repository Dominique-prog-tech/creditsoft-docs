// Starter — stemmen.mjs staat sinds 20/11/2026 in adm-appkit/tools/filmgenerator (zie daar LEESMIJ.md; onze instellingen
// in films-instellingen.mjs). Elk opgeschreven commando (node tools/stemmen.mjs …) blijft zo werken.
process.argv.push('--instellingen=' + new URL('./films-instellingen.mjs', import.meta.url).pathname);
await import('/Users/dominique/projects/adm-appkit/tools/filmgenerator/stemmen.mjs');
