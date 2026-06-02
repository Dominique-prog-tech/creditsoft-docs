/* ============================================================================
   Embed-modus — context-aware help vanuit het platform.
   ----------------------------------------------------------------------------
   Als de pagina geopend wordt met ?embed (of ?embed=1) in de URL, voegt dit
   script de class "embed" toe aan <body>. stylesheets/embed.css verbergt dan
   de MkDocs-chrome zodat enkel de artikel-inhoud overblijft.
   ============================================================================ */
(function () {
  function isEmbed() {
    try {
      return new URLSearchParams(window.location.search).has('embed');
    } catch (e) {
      return window.location.search.indexOf('embed') !== -1;
    }
  }
  if (isEmbed() && document.body) {
    document.body.classList.add('embed');
  }
})();
