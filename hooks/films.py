"""Zet de film van een pagina boven de eerste ``##``.

⚠️ **Nooit met de hand per pagina.** De handleiding verwijst naar een FILMNAAM, nooit naar een Bunny-guid —
en dat is geen netheid maar noodzaak. De vervangproef van 01/09/2026 wees uit dat een film bij Bunny niet
te vervangen is (``400 The video has already been uploaded``), dus élke herneming levert een nieuwe guid.
Stond die in de markdown, dan brak elke ronde alle pagina's tegelijk.

De koppeling loopt via ``tools/films-uitslag.json``: die tabel draagt per film en per taal de guid, en de
generator schrijft haar. Deze hook leest ze bij het bouwen.

⚠️ **Een ontbrekende film is stil, een KAPOTTE tabel niet.** Staat er voor deze pagina geen film, dan gebeurt
er gewoon niets — de meeste pagina's hebben er geen. Maar is de tabel onleesbaar of verwijst een film naar
een lege guid, dan hoort dat te knallen: anders bouwt de site zonder films en merkt niemand het tot iemand
een pagina opent.
"""
from __future__ import annotations

import json
import pathlib

TABEL = pathlib.Path(__file__).parent.parent / "tools" / "films-uitslag.json"
LIBRARY = "741183"


def _films() -> dict:
    if not TABEL.exists():
        return {}
    with TABEL.open(encoding="utf-8") as f:
        return json.load(f)          # kapot = bouwfout, en dat is de bedoeling


def _speler(guid: str, taal: str) -> str:
    # ⚠️ Bunny's speler zet GEEN cookies. Dat is geen prettige bijkomstigheid maar een reden op zich: een
    # YouTube-embed zou een toestemmingsbanner over de hele handleiding meeslepen (FILMS-SPEC §7.2).
    bron = (
        f"https://iframe.mediadelivery.net/embed/{LIBRARY}/{guid}"
        f"?autoplay=false&preload=false&captions={taal}&rememberPosition=true&showSpeed=true"
    )
    return (
        '<div class="film">'
        f'<iframe src="{bron}" loading="lazy" allowfullscreen '
        'allow="accelerometer;gyroscope;encrypted-media;picture-in-picture;fullscreen"></iframe>'
        "</div>\n\n"
    )


def on_page_markdown(markdown: str, page, config, files):  # noqa: ARG001
    # De taal komt uit de BESTANDSNAAM, niet uit een instelling: mkdocs-static-i18n bouwt beide talen in
    # dezelfde doorloop, en een globale taalvariabele zou dus voor de helft van de pagina's fout staan.
    pad = page.file.src_uri
    frans = pad.endswith(".fr.md")
    kaal = pad[:-6] if frans else pad[:-3]
    taal = "fr" if frans else "nl"

    for film in _films().values():
        if film.get("pagina") != kaal or film.get("taal", "").split("-")[0] != taal:
            continue
        guid = film.get("guid")
        if not guid:
            raise ValueError(
                f"Film voor {pad} staat in films-uitslag.json maar heeft geen guid. "
                "Draai `node tools/bunny.mjs publiceer`, of haal de regel weg."
            )
        # Boven de eerste ## — de lezer kiest zelf: kijken of lezen (FILMS-SPEC §7.2).
        kop = markdown.find("\n## ")
        if kop == -1:
            return markdown + "\n\n" + _speler(guid, taal)
        return markdown[:kop] + "\n\n" + _speler(guid, taal) + markdown[kop:]

    return markdown
