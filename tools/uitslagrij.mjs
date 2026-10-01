// De rij van een HERNOMEN film in films-uitslag.json.
//
// ⚠️⚠️ ALLES VAN DE VORIGE RIJ BLIJFT STAAN, behalve wat de opname zelf opnieuw meet (01/10/2026).
//    films.mjs schreef de rij helemaal opnieuw en nam er met de hand guid en vorigeGuid uit over. Wat
//    bunny.mjs er later bij zette, viel dus weg zodra iemand die lijst vergat bij te werken:
//    - 02/09: vorigeGuid → drie weesvideo's bij Bunny, met de hand gevonden.
//    - 01/10: opTeRuimen → de oude dashboard-nl en -fr (13e7b04e, d150b6b6) zouden voorgoed blijven staan
//      zonder dat iets nog zei waar ze bij hoorden. Ook gepubliceerdOp en thumbnail verdwenen: die
//      beschrijven de video die nog online staat, en de handleiding zet ze in haar zoekgegevens.
//    Een lijst van "wat moet blijven" vergeet de volgende keer opnieuw een veld. Daarom omgekeerd: alles
//    blijft, en enkel wat hieronder staat gaat bewust weg.
//
// ⚠️ gepubliceerdeHash gaat WEL weg. De hash leest narratie en route, niet het beeld: een heropname "om
//    het beeld" heeft dezelfde hash. Bleef gepubliceerdeHash staan, dan sloeg `bunny.mjs publiceer` de
//    nieuwe mp4 over als "ongewijzigd". Zonder dat veld zegt de rij: deze opname staat nog niet online.
export function hernomen(oud, vers) {
  const { gepubliceerdeHash, ...blijft } = oud ?? {};
  return { ...blijft, ...vers };
}
