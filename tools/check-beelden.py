#!/usr/bin/env python3
"""Staat elk beeld uit de Markdown ook als <img> in de GEBOUWDE site?

WAAROM DIT BESTAAT
------------------
19/10/2026: selectolax 1.0.1 (17/10) — een onderliggend pakket van mkdocs-glightbox dat niet in
requirements.txt stond — maakte bij het bouwen van elk beeld een lege <p></p>. Online misten 140 pagina's
hun schermafdrukken, terwijl `mkdocs build --strict`, de filmcontrole en de beeldbreedtecontrole allemaal
groen bleven: de beeldbreedte meet de bron, en een beeld dat er niet staat, kan geen dode link zijn.
Hersteld met `selectolax==0.4.11` (b5c23ff). Deze controle houdt de volgende keer de uitrol zelf tegen.

WAT ZE MEET
-----------
Per pagina de beelden in de bron (`![…](…)`, en een eventuele `<img>` in de Markdown) tegen de `<img>` in
de gebouwde HTML. De twee logo's van de bovenbalk (`logo.svg`) tellen niet mee.

Ze vergelijkt de BESTANDSNAMEN, niet enkel het aantal: verdwijnt er een schermafdruk terwijl er elders op
de pagina een <img> bijkomt (een filmminiatuur, een derde logo), dan klopt het aantal nog en mist de lezer
toch een beeld.

⚠️ Afwijkingen van de Nimble-versie (nimble-docs/tools/check-beelden.py, commit 0e4b9fd):
- De bronzeef eist daar `.png)` direct achter het pad. Hier draagt elk beeld een titel
  (`![…](../images/x.png "Titel")` — zie CLAUDE.md), dus die zeef vond hier NIETS en de bodem zou dat
  enkel als "te weinig gezien" melden. Hier: elk pad, met of zonder titel, elke extensie.
- Een pagina met beelden zonder gebouwde HTML wordt daar overgeslagen (skeletten). Deze repo verbergt geen
  skeletten; een ontbrekende HTML is hier dus zelf een fout.

Gebruik:  python3 tools/check-beelden.py [site-map]      (standaard: site)
"""
import collections
import pathlib
import re
import sys

BRON = pathlib.Path("docs")
SITE = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "site")

# Een bodem op de SCAN: zo veel pagina's met beelden moet de zeef minstens vinden (19/10/2026: 142).
# Zakt het daaronder, dan is de zeef stuk — of zijn er echt pagina's weg, en dan hoort iemand dat te weten.
MIN_PAGINAS = 120

MD_BEELD = re.compile(r"!\[[^\]]*\]\(\s*<?([^)\s>]+)|<img[^>]+src=\"([^\"]+)\"")
HTML_BEELD = re.compile(r"<img[^>]+src=\"([^\"]+)\"")
LOGO = "logo.svg"


def naam(pad: str) -> str:
    return pad.split("#")[0].split("?")[0].rsplit("/", 1)[-1]


def html_voor(md: pathlib.Path) -> pathlib.Path:
    """docs/crm/relations.fr.md → site/fr/crm/relations/index.html (i18n `suffix`, directory-URL's)."""
    stam = md.relative_to(BRON).with_suffix("")
    taal = ""
    if stam.suffix == ".fr":
        taal, stam = "fr", stam.with_suffix("")
    delen = list(stam.parts)
    if delen[-1] == "index":
        delen = delen[:-1]
    return SITE.joinpath(taal, *delen, "index.html")


def ontbrekend(bron_md: str, html: str) -> list[str]:
    """De beelden uit de bron die niet als <img> in de HTML staan (logo's niet meegeteld). Pure functie."""
    verwacht = collections.Counter(naam(a or b) for a, b in MD_BEELD.findall(bron_md))
    gevonden = collections.Counter(n for n in map(naam, HTML_BEELD.findall(html)) if n != LOGO)
    return sorted((verwacht - gevonden).elements())


def main() -> int:
    if not SITE.is_dir():
        print(f"❌ geen gebouwde site in {SITE}/ — draai eerst mkdocs build")
        return 1
    fouten, paginas, beelden = [], 0, 0
    for md in sorted(BRON.rglob("*.md")):
        tekst = md.read_text(encoding="utf-8")
        verwacht = len(MD_BEELD.findall(tekst))
        if not verwacht:
            continue
        paginas += 1
        beelden += verwacht
        html = html_voor(md)
        if not html.exists():
            fouten.append(f"  {md}: {verwacht} beeld(en), maar geen gebouwde pagina {html}")
            continue
        weg = ontbrekend(tekst, html.read_text(encoding="utf-8"))
        if weg:
            fouten.append(f"  {md}: {len(weg)} van {verwacht} ontbreken in {html} — {', '.join(weg)}")
    if fouten:
        print(f"❌ {len(fouten)} van {paginas} pagina's met beelden verloren beelden bij het bouwen:")
        print("\n".join(fouten))
        return 1
    if paginas < MIN_PAGINAS:
        print(f"❌ slechts {paginas} pagina's met beelden gemeten, verwacht minstens {MIN_PAGINAS}"
              f" — klopt de zeef nog?")
        return 1
    print(f"✅ {beelden} beelden op {paginas} pagina's staan allemaal in de gebouwde site.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
