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

// De rij die `bunny.mjs publiceer` wegschrijft: wat er op schijf staat, plus ENKEL de velden die deze
// publicatieronde zelf wijzigde.
//
// ⚠️⚠️ GEEN LIJST VAN VELDEN (01/10/2026). Hier stond een samenvoeging met de hand: guid, vorigeGuid,
//    opTeRuimen, gepubliceerdOp, gepubliceerdeHash en `miniatuur` — een veld dat nergens anders bestaat. Het
//    echte veld heet `thumbnail`, en dat stond er niet bij. Een publicatie schreef de nieuwe miniatuur dus
//    nooit weg: tot vandaag viel ze leeg (films.mjs wiste haar bij elke heropname, `metadata` vulde aan),
//    sinds hernomen() bleef de OUDE staan — en de handleiding gaf de zoekmachine de miniatuur van een video
//    die over één ronde gewist wordt. Ook `embed` ontbrak. Derde keer dezelfde fout na vorigeGuid (02/09) en
//    opTeRuimen (01/10): de lijst vergeet telkens het volgende veld.
//    Nu: wat deze ronde veranderde t.o.v. de rij bij aanvang, gaat mee — welk veld het ook is. Wat ze niet
//    aanraakte, blijft zoals het op schijf staat (een ander proces kan het intussen gewijzigd hebben).
//
// ⚠️ gepubliceerdeHash = de hash die NU op schijf staat, zoals voorheen: neemt films.mjs de film tijdens de
//    publicatie opnieuw op, dan is dat de opname die de rij beschrijft.
export function naPublicatie(opSchijf, bijAanvang, onze) {
  const rij = { ...(opSchijf ?? {}) };
  const begin = bijAanvang ?? {};
  for (const veld of new Set([...Object.keys(begin), ...Object.keys(onze ?? {})])) {
    if (JSON.stringify(onze?.[veld]) === JSON.stringify(begin[veld])) continue;   // niet door deze ronde gewijzigd
    if (onze?.[veld] === undefined) delete rij[veld]; else rij[veld] = onze[veld];
  }
  rij.gepubliceerdeHash = opSchijf?.hash ?? onze?.gepubliceerdeHash;
  return rij;
}
