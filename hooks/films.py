"""Zet de film van een pagina boven de eerste ``##``.

⚠️ **Nooit met de hand per pagina.** De handleiding verwijst naar een FILMNAAM, nooit naar een Bunny-guid —
en dat is geen netheid maar noodzaak. De vervangproef van 01/09/2026 wees uit dat een film bij Bunny niet
te vervangen is (``400 The video has already been uploaded``), dus élke herneming levert een nieuwe guid.
Stond die in de markdown, dan brak elke ronde alle pagina's tegelijk.

De koppeling loopt via ``tools/films-uitslag.json``: die tabel draagt per film en per taal de guid, en de
generator schrijft haar. Deze hook leest ze bij het bouwen.

⚠️ **Drie toestanden, drie antwoorden — en maar één ervan knalt.**

* *Geen film voor deze pagina* → stil niets doen. De meeste pagina's hebben er geen.
* *Wel opgenomen, nog niet gepubliceerd* → de pagina bouwt zónder speler, met een **waarschuwing** in de
  bouwlog. Hier stond tot 01/09/2026 een ``raise``, en die logica was verkeerd om: opnemen is lokaal en
  omkeerbaar, publiceren is extern en onomkeerbaar. Door de fout brak het opnemen alléén al de site.
* *De tabel is onleesbaar* → knallen. Dan bouwt de site zonder ENIGE film en merkt niemand het tot iemand
  een pagina opent. Dát is het geval waarvoor de weigering bedoeld was.
"""
from __future__ import annotations

import json
import logging
import pathlib

TABEL = pathlib.Path(__file__).parent.parent / "tools" / "films-uitslag.json"
LIBRARY = "741183"


log = logging.getLogger("mkdocs.hooks.films")


def meld(tekst):
    """Luid, maar geen mkdocs-WARNING — en dat verschil is het hele punt.

    ⚠️ Onder ``mkdocs build --strict`` IS een warning een fout, en dan houdt "melden, niet tegenhouden"
    alsnog tegen. De CI bouwt vandaag zonder ``--strict``, dus met ``log.warning`` zou het toevallig goed
    gaan — tot iemand die vlag toevoegt en het opnemen van een film opeens de site breekt. Daarom naar
    stdout, met een merkteken dat je kan grijpen: zichtbaar in de bouwlog, nooit fataal.

    Een ECHTE fout (een onleesbare tabel) gaat wél nog via een exception. Zie de kop van dit bestand.
    """
    print(f"[films] {tekst}", flush=True)


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


MERK = "<!-- FILMOVERZICHT -->"


def _navvolgorde(nav, uit=None):
    """De paden uit mkdocs.yml, in de volgorde van het menu.

    ⚠️ Waarom niet gewoon alfabetisch of op opnamedatum: de videopagina hoort de handleiding te SPIEGELEN.
    Een lezer die "Aan de slag" bovenaan het menu ziet, verwacht die film ook bovenaan. Op opnamedatum
    sorteren geeft de volgorde waarin wíj gewerkt hebben, en die zegt hem niets.
    """
    uit = [] if uit is None else uit
    for item in nav or []:
        if isinstance(item, str):
            uit.append(item)
        elif isinstance(item, dict):
            for waarde in item.values():
                if isinstance(waarde, str):
                    uit.append(waarde)
                else:
                    _navvolgorde(waarde, uit)
        elif isinstance(item, list):
            _navvolgorde(item, uit)
    return uit


def _duur(seconden):
    m, sec = divmod(int(round(seconden or 0)), 60)
    return f"{m} min {sec:02d}" if m else f"{sec} s"


def _overzicht(taal, config):
    """De lijst van alle films, gegenereerd — nooit met de hand bijgehouden.

    ⚠️ Enkel films MET een guid. Een opgenomen maar nog niet gepubliceerde film heeft geen speler, en een
    regel in een overzicht die nergens heen gaat is erger dan een ontbrekende regel. Het aantal
    overgeslagen films gaat wél naar de bouwlog — niets gevonden is geen "in orde".

    ⚠️ En enkel de handleiding-uitvoeringen. De website-uitvoeringen van dezelfde film staan óók in de
    tabel (kortere selectie, zonder stem, mét Engels); die horen op creditsoft.be en niet hier.
    """
    volgorde = _navvolgorde(config.get("nav") if hasattr(config, "get") else getattr(config, "nav", None))
    plaats = {pad[:-3]: i for i, pad in enumerate(volgorde) if pad.endswith(".md")}

    gekozen, zonder_guid = [], []
    for sleutel, film in _films().items():
        if film.get("taal", "").split("-")[0] != taal:
            continue
        if "-website-" in sleutel or sleutel.endswith("-website"):
            continue
        if not film.get("pagina"):
            continue
        (gekozen if film.get("guid") else zonder_guid).append(film)

    if zonder_guid:
        meld(f"videopagina ({taal}): {len(zonder_guid)} film(s) opgenomen maar nog niet gepubliceerd, "
             f"dus niet in het overzicht — {', '.join(sorted(f.get('film', '?') for f in zonder_guid))}")
    if not gekozen:
        return ("!!! info \"" + ("Nog geen films gepubliceerd" if taal == "nl"
                else "Aucun film publié pour l'instant") + "\"\n\n"
                + ("    Zodra de eerste film gepubliceerd is, verschijnt hij hier vanzelf."
                   if taal == "nl" else
                   "    Dès que le premier film sera publié, il apparaîtra ici automatiquement.") + "\n")

    gekozen.sort(key=lambda f: plaats.get(f["pagina"], 10_000))
    regels = []
    for film in gekozen:
        titel = film.get("titel") or film.get("film", "")
        regels.append(f"### [{titel}]({film['pagina']}.md)\n")
        regels.append(("**Duur:** " if taal == "nl" else "**Durée :** ") + _duur(film.get("lengte")) + "\n")
        if film.get("omschrijving"):
            regels.append(film["omschrijving"] + "\n")
        regels.append("")
    return "\n".join(regels)


def on_page_markdown(markdown: str, page, config, files):  # noqa: ARG001
    # De taal komt uit de BESTANDSNAAM, niet uit een instelling: mkdocs-static-i18n bouwt beide talen in
    # dezelfde doorloop, en een globale taalvariabele zou dus voor de helft van de pagina's fout staan.
    pad = page.file.src_uri
    frans = pad.endswith(".fr.md")
    kaal = pad[:-6] if frans else pad[:-3]
    taal = "fr" if frans else "nl"

    if MERK in markdown:
        return markdown.replace(MERK, _overzicht(taal, config))

    for film in _films().values():
        if film.get("pagina") != kaal or film.get("taal", "").split("-")[0] != taal:
            continue
        guid = film.get("guid")
        if not guid:
            # ⚠️ MELDEN, NIET TEGENHOUDEN. Hier stond een `raise`, en die logica was verkeerd om: opnemen is
            # lokaal en omkeerbaar, publiceren is extern en onomkeerbaar (een film is bij Bunny niet te
            # vervangen). Door de fout brak het OPNEMEN alleen al de documentatiesite, tot er gepubliceerd
            # was — en dan staat er druk op een stap die je juist rustig wil kunnen nemen. Gebeurd op
            # 01/09/2026 met `aan-de-slag`: build rood, deploy overgeslagen, en er was niets kapot.
            #
            # De pagina bouwt dus gewoon, zónder speler, en de bouwlog zegt luid waarom. De film verschijnt
            # vanzelf zodra hij gepubliceerd is; er hoeft niets teruggedraaid of aangepast te worden.
            meld(f"'{film.get('film', kaal)}' is OPGENOMEN maar nog niet GEPUBLICEERD — {pad} bouwt "
                 f"zonder speler. Draai `node tools/bunny.mjs publiceer` zodra hij goedgekeurd is.")
            return markdown
        # Boven de eerste ## — de lezer kiest zelf: kijken of lezen (FILMS-SPEC §7.2).
        blok = _gegevens(film, guid, taal) + _speler(guid, taal)
        kop = markdown.find("\n## ")
        if kop == -1:
            return markdown + "\n\n" + blok
        return markdown[:kop] + "\n\n" + blok + markdown[kop:]

    return markdown
