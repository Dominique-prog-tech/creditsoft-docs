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


def _duur(seconden: float) -> str:
    """ISO 8601, want dat is wat schema.org voor ``duration`` verwacht: PT1M36S."""
    hele = int(round(seconden))
    return f"PT{hele // 60}M{hele % 60}S"


def _gegevens(film: dict, guid: str, taal: str) -> str:
    """De VideoObject die een zoekmachine leest.

    ⚠️ **Dit is wat een video vindbaar maakt, niet de metadata bij Bunny.** Zoekmachines indexeren
    docs.creditsoft.be; de speler zelf staat op een ander domein en wordt niet gelezen. Dominique merkte op
    01/09/2026 terecht op dat de metadata leeg stond — maar de helft die telt ontbrak hier, niet daar.

    ⚠️ En Bunny NEGEERT ``description`` via zijn API (twee schrijfwijzen geprobeerd, allebei 200, allebei
    genegeerd). Dat maakt deze plaats meteen de enige waar de omschrijving echt landt.
    """
    gegevens = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": film.get("titel") or film.get("film", ""),
        "description": film.get("omschrijving", ""),
        "embedUrl": f"https://iframe.mediadelivery.net/embed/{LIBRARY}/{guid}",
        "inLanguage": "fr-BE" if taal == "fr" else "nl-BE",
        "isFamilyFriendly": True,
    }
    if film.get("thumbnail"):
        gegevens["thumbnailUrl"] = film["thumbnail"]
    if film.get("lengte"):
        gegevens["duration"] = _duur(film["lengte"])
    if film.get("gepubliceerdOp"):
        # Bunny geeft de datum zonder tijdzone; schema.org wil er één.
        datum = film["gepubliceerdOp"]
        gegevens["uploadDate"] = datum if datum.endswith("Z") else datum + "Z"
    if film.get("hoofdstukken"):
        # De hoofdstukken zijn ook navigatie voor de zoekmachine: ze kunnen als "key moments" verschijnen.
        gegevens["hasPart"] = [
            {
                "@type": "Clip",
                "name": h["titel"],
                "startOffset": h["start"],
                "endOffset": h["eind"],
            }
            for h in film["hoofdstukken"]
        ]
    return (
        '<script type="application/ld+json">'
        + json.dumps(gegevens, ensure_ascii=False, separators=(",", ":"))
        + "</script>\n\n"
    )


def _speler(guid: str, taal: str) -> str:
    # ⚠️ Bunny's speler zet GEEN cookies. Dat is geen prettige bijkomstigheid maar een reden op zich: een
    # YouTube-embed zou een toestemmingsbanner over de hele handleiding meeslepen (FILMS-SPEC §7.2).
    bron = (
        f"https://iframe.mediadelivery.net/embed/{LIBRARY}/{guid}"
        # ⚠️ GEEN `captions=` PARAMETER. Die zet de ondertitels AAN, en de nota zegt uitdrukkelijk
        # "standaard uit" (§7.2). Met captions=nl liepen er zwarte balken over de helft van het scherm —
        # precies over de schermafdruk die de film wil tonen. De ondertitels blijven wél beschikbaar: ze
        # zijn geüpload en staan in het tandwielmenu van de speler, waar wie ze wil ze aanzet.
        f"?autoplay=false&preload=false&rememberPosition=true&showSpeed=true"
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
        blok = _gegevens(film, guid, taal) + _speler(guid, taal)
        kop = markdown.find("\n## ")
        if kop == -1:
            return markdown + "\n\n" + blok
        return markdown[:kop] + "\n\n" + blok + markdown[kop:]

    return markdown
