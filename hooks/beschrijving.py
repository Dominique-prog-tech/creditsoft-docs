"""Geeft elke pagina haar eigen omschrijving voor zoekmachines (``<meta name="description">``).

⚠️ **Waarom dit er is (24/09/2026).** Alle 137 pagina's droegen dezelfde omschrijving: de ``site_description``
("Officiële handleiding voor CreditSoft", 37 tekens), per taal één. Google kon zo niet zien waarover een pagina
gaat en toonde overal hetzelfde zinnetje. Gemeten met dezelfde SEO-controle als de website.

**Hoe:** de eerste gewone alinea van de pagina, ingekort tot ±155 tekens op een woordgrens. Die alinea is in deze
handleiding bijna altijd de zin die zegt wat het scherm doet — precies wat een omschrijving hoort te zijn.
Schrijft een pagina zelf ``description:`` in haar kop, dan wint die. Een pagina zonder bruikbare alinea
(enkel een titel, een tabel of HTML) valt terug op de site-omschrijving, en de bouwlog zegt welke.

De omzetting zit in ``omschrijving()`` — een pure functie, los van MkDocs, zodat ze te testen is zonder bouw
(``python3 hooks/beschrijving.py`` draait de zelftest).
"""
from __future__ import annotations

import logging
import re

log = logging.getLogger("mkdocs.hooks.beschrijving")

MAX = 155
MIN = 70  # korter dan dit: plak de volgende alinea erbij

# Blokken die geen lopende tekst zijn: koppen, beelden, lijsten, tabellen, kaders, code, HTML, attribuutlijsten.
_GEEN_TEKST = re.compile(r"^\s*(#|!\[|!!!|\?\?\?|[-*+] |\d+\. |\||<|```|~~~|:::|\{|---|===)")


def _schoon(tekst: str) -> str:
    t = re.sub(r"!\[[^\]]*\]\([^)]*\)(\{[^}]*\})?", "", tekst)       # beelden
    t = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", t)                   # [tekst](link) → tekst
    t = re.sub(r"\[([^\]]+)\]\[[^\]]*\]", r"\1", t)                  # [tekst][ref] → tekst
    t = re.sub(r"\{[^}]*\}", "", t)                                  # { .klasse } attribuutlijsten
    t = re.sub(r"<[^>]+>", "", t)                                    # HTML-tags
    t = re.sub(r"(\*\*|__|\*|`)", "", t)                             # nadruk en code
    t = re.sub(r"(?<!\w)_([^_]+)_(?!\w)", r"\1", t)                  # _cursief_
    return re.sub(r"\s+", " ", t).strip()


def _kort(tekst: str) -> str:
    if len(tekst) <= MAX:
        return tekst
    knip = tekst[: MAX - 1]
    # Liefst op een zinseinde, anders op een woordgrens.
    zin = max(knip.rfind(". "), knip.rfind("? "), knip.rfind("! "))
    if zin >= MIN:
        return knip[: zin + 1]
    return knip[: knip.rfind(" ")].rstrip(" ,;:—–-") + "…"


def omschrijving(markdown: str) -> str | None:
    """Eerste lopende tekst van een pagina als omschrijving, of None als er geen is."""
    blokken = [b.strip() for b in re.split(r"\n\s*\n", markdown) if b.strip()]
    stukken: list[str] = []
    for blok in blokken:
        if _GEEN_TEKST.match(blok):
            continue
        tekst = _schoon(blok)
        if len(tekst) < 20:
            continue
        stukken.append(tekst)
        if len(" ".join(stukken)) >= MIN:
            break
    if not stukken:
        return None
    return _kort(" ".join(stukken))


def on_page_markdown(markdown, page, config, files):
    if page.meta.get("description"):
        return markdown
    tekst = omschrijving(markdown)
    if tekst:
        page.meta["description"] = tekst
    else:
        log.info("geen eigen omschrijving voor %s — de site-omschrijving blijft", page.file.src_uri)
    return markdown


if __name__ == "__main__":
    # Zelftest: drie gevallen die de regels hierboven moeten onderscheiden.
    kop = "# Taken\n\nEen **taak** is iets dat nog moet [gebeuren](x.md), met een naam erop.\n\nTweede alinea hier die er ook bij mag."
    assert omschrijving(kop) == "Een taak is iets dat nog moet gebeuren, met een naam erop. Tweede alinea hier die er ook bij mag.", omschrijving(kop)
    beeld = "# X\n\n![alt](a.png){ .volle-breedte }\n\n| a | b |\n|---|---|\n\n- lijst\n\nDe echte zin staat pas hier, na een beeld, een tabel en een lijst, en is lang genoeg."
    assert omschrijving(beeld).startswith("De echte zin staat pas hier"), omschrijving(beeld)
    leeg = "# Enkel een titel\n\n<div>html</div>\n\n!!! info \"kader\"\n    inhoud"
    assert omschrijving(leeg) is None
    lang = "# L\n\n" + "Dit is een woord. " * 20
    uit = omschrijving(lang)
    assert len(uit) <= MAX and uit.endswith("."), uit
    print("zelftest ok")
