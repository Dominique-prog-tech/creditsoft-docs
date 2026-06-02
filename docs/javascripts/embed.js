/* ============================================================================
   Embed-modus — context-aware help vanuit het platform.
   ----------------------------------------------------------------------------
   Als de pagina geopend wordt met ?embed (of ?embed=1) in de URL:
     1. wordt de class "embed" aan <body> toegevoegd zodat stylesheets/embed.css
        de MkDocs-chrome verbergt (enkel de artikel-inhoud blijft over);
     2. blijven INTERNE links binnen de embed-weergave (we voegen ?embed toe aan
        elke interne doc-link, zodat doorklikken niet de volledige help met menu
        heropent);
     3. openen EXTERNE links in een nieuw browser-tabblad.
   ============================================================================ */
(function () {
  function hasEmbed(search) {
    try { return new URLSearchParams(search).has('embed'); }
    catch (e) { return (search || '').indexOf('embed') !== -1; }
  }

  if (!hasEmbed(window.location.search) || !document.body) return;
  document.body.classList.add('embed');

  function rewriteLinks() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var raw = a.getAttribute('href');
      if (!raw || raw.charAt(0) === '#') continue;                 // anker op dezelfde pagina
      if (/^(mailto:|tel:|javascript:)/i.test(raw)) continue;      // geen navigatie-links

      var url;
      try { url = new URL(a.href); } catch (e) { continue; }

      if (url.hostname !== window.location.hostname) {
        // Externe link -> open in een nieuw tabblad i.p.v. in het help-paneel.
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener');
        continue;
      }

      // Interne doc-link -> ?embed behouden zodat de help content-only blijft.
      if (!hasEmbed(url.search)) {
        url.searchParams.set('embed', '1');
        a.setAttribute('href', url.pathname + url.search + url.hash);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', rewriteLinks);
  } else {
    rewriteLinks();
  }
})();
