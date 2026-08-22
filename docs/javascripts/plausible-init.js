// Init-snippet van Plausible Analytics.
//
// Het externe script wordt via `extra_javascript` in mkdocs.yml geladen; dit
// bestand maakt window.plausible beschikbaar zodat er later eigen
// gebeurtenissen te meten zijn, ook als het externe script nog onderweg is.
//
// Waarom via extra_javascript en niet als tag in een pagina: mkdocs zet alles
// uit extra_javascript in ELKE gegenereerde pagina. Nieuwe handleidingspagina's
// dragen het script dus vanzelf — niemand hoeft er per pagina aan te denken.
//
// Dit bestand is voor de drie docs-sites identiek; alleen de script-URL in
// mkdocs.yml verschilt per site.
window.plausible =
  window.plausible ||
  function () {
    (plausible.q = plausible.q || []).push(arguments);
  };
plausible.init =
  plausible.init ||
  function (i) {
    plausible.o = i || {};
  };
plausible.init();
