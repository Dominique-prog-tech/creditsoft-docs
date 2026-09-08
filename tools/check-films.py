#!/usr/bin/env python3
"""Controleert de films op de GEBOUWDE site: staan ze bovenaan, en zijn hun gegevens compleet?

WAAROM DIT BESTAAT
------------------
Google Search Console meldde op 08/09/2026 twee handleidingpagina's als "video staat niet op een
weergavepagina": het oordeel dat de pagina niet OM de video draait. De speler stond onder de inleiding —
op `journaal/overzicht` 82 woorden tekst erboven, op een telefoon een scherm vol. Verplaatst naar direct
onder de titel (`94ddb1b`), maar niets zou melden als dat ooit terugschuift.

Drie dagen eerder, op 05/09, ging het aan dezelfde kant al mis en óók stil: acht van de veertien
Nederlandse films misten `thumbnailUrl` en `uploadDate`, en zes miniatuur-URL's gaven een 404. De pagina
bouwt, de speler verschijnt, alles ziet er goed uit — en een zoekmachine verwerpt de video.

Dat is de rode draad: **fouten die enkel opvallen wanneer een externe partij het je vertelt, weken later.**

WAAROM OP DE GEBOUWDE SITE EN NIET OP DE MARKDOWN
-------------------------------------------------
De speler staat in geen enkel .md-bestand; `hooks/films.py` zet hem er tijdens de bouw in. De markdown
controleren zou dus de vraag ontwijken. Wat Google krijgt is HTML, dus meten we HTML.

⚠️ SCRIPTS EERST WEGSTRIPPEN. De `<script type="application/ld+json">` met de videogegevens staat tússen
de titel en de speler en bevat een omschrijving in gewone zinnen. Wie die meetelt als zichtbare tekst,
meet 70 woorden waar er 2 staan — dat gebeurde bij het eerste meten op 08/09, en het foute getal ging
door naar Dominique voor het rechtgezet werd.
"""
from __future__ import annotations

import json
import pathlib
import re
import sys

WORTEL = pathlib.Path(__file__).resolve().parent.parent
SITE = WORTEL / "site"
UITSLAG = WORTEL / "tools" / "films-uitslag.json"

# Zonder deze velden weigert Google de VideoObject, of hij toont haar zonder miniatuur.
VERPLICHT = ("name", "thumbnailUrl", "uploadDate", "duration", "embedUrl")

# ⚠️ IJKPUNTEN. Zonder deze twee is "geen fouten gevonden" niet te onderscheiden van "niets gekeken" —
# een lege site/ of een hernoemde map zou stil groen geven. Verlaag ze nooit om een melding weg te
# krijgen; ze horen mee te groeien met de handleiding.
MIN_PAGINAS = 24          # 14 films x 2 talen = 28 op 08/09/2026; marge voor een film in de maak
MIN_TALEN = 2


def kern_van(html: str) -> str | None:
    m = re.search(r"<article[^>]*>(.*?)</article>", html, re.S)
    return m.group(1) if m else None


def tekst_tussen_titel_en_speler(kern: str) -> str | None:
    """Zichtbare tekst tussen </h1> en de speler. None = geen h1 of geen speler."""
    h1 = re.search(r"</h1>", kern)
    if not h1:
        return None
    na = kern[h1.end():]
    i = na.find("<iframe")
    if i == -1:
        return None
    stuk = re.sub(r"<script.*?</script>", " ", na[:i], flags=re.S)
    stuk = re.sub(r"<style.*?</style>", " ", stuk, flags=re.S)
    return " ".join(re.sub(r"<[^>]+>", " ", stuk).split())


def videoobjecten(html: str) -> list[dict]:
    uit = []
    for blok in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S):
        try:
            d = json.loads(blok)
        except json.JSONDecodeError:
            continue
        for item in (d if isinstance(d, list) else [d]):
            if isinstance(item, dict) and "VideoObject" in str(item.get("@type", "")):
                uit.append(item)
    return uit


def main() -> int:
    if not SITE.is_dir():
        print(f"⛔ {SITE} bestaat niet. Draai eerst `mkdocs build` — deze controle meet de GEBOUWDE site,")
        print("   niet de markdown. Zonder bouw meet ze niets, en dat is geen 'in orde'.")
        return 2

    films = json.loads(UITSLAG.read_text(encoding="utf-8"))
    verwacht = [f for f in films.values() if f.get("pagina") and f.get("guid")]
    if not verwacht:
        print("⛔ Geen enkele gepubliceerde film met een pagina in films-uitslag.json — de MEETOPSTELLING")
        print("   deugt niet. Dit is nooit een geldige uitkomst zolang de handleiding films draagt.")
        return 2

    fouten: list[str] = []
    gezien, talen = 0, set()

    for film in verwacht:
        taal = film.get("taal", "").split("-")[0]
        pre = "" if taal == "nl" else f"{taal}/"
        pad = SITE / (pre + film["pagina"]) / "index.html"
        naam = f"{pre}{film['pagina']}"

        if not pad.exists():
            fouten.append(f"{naam}: pagina niet gebouwd, terwijl film '{film.get('film')}' ernaar wijst")
            continue

        html = pad.read_text(encoding="utf-8", errors="replace")
        kern = kern_van(html)
        if kern is None:
            fouten.append(f"{naam}: geen <article> gevonden — het thema is veranderd en deze controle "
                          f"meet niet meer wat ze denkt te meten")
            continue

        gezien += 1
        talen.add(taal)

        tussen = tekst_tussen_titel_en_speler(kern)
        if tussen is None:
            fouten.append(f"{naam}: geen speler onder een <h1> gevonden (film '{film.get('film')}' "
                          f"is gepubliceerd, dus hij hoort er te staan)")
        elif tussen:
            kort = tussen[:60] + ("..." if len(tussen) > 60 else "")
            fouten.append(f"{naam}: {len(tussen.split())} woorden tekst TUSSEN de titel en de speler "
                          f"(\"{kort}\"). De speler hoort er direct onder — zie FILMS-SPEC 7.2.")

        objecten = videoobjecten(html)
        if not objecten:
            fouten.append(f"{naam}: geen VideoObject in de pagina")
        else:
            for veld in VERPLICHT:
                if not objecten[0].get(veld):
                    fouten.append(f"{naam}: VideoObject mist '{veld}' — draai "
                                  f"`node tools/bunny.mjs metadata`")

    # ── de ijkpunten, ná het werk: meldt de controle iets over een lege meting? ──
    if gezien < MIN_PAGINAS:
        fouten.append(f"IJKPUNT: slechts {gezien} filmpagina's gecontroleerd, minstens {MIN_PAGINAS} "
                      f"verwacht. Ofwel is de handleiding gekrompen, ofwel kijkt deze controle op de "
                      f"verkeerde plaats. Beoordeel dat vóór je MIN_PAGINAS verlaagt.")
    if len(talen) < MIN_TALEN:
        fouten.append(f"IJKPUNT: films in {len(talen)} taal/talen gezien ({sorted(talen)}), "
                      f"{MIN_TALEN} verwacht. De handleiding is NL en FR.")

    if fouten:
        print(f"⛔ {len(fouten)} bevinding(en) over {gezien} filmpagina's in {sorted(talen)}:\n")
        for f in fouten:
            print(f"   - {f}")
        print("\n   Een film die wél OPGENOMEN maar nog niet GEPUBLICEERD is, staat niet in deze lijst:")
        print("   die heeft geen guid en de bouwlog meldt hem apart.")
        return 1

    print(f"✅ {gezien} filmpagina's in {sorted(talen)}: speler staat direct onder de titel, "
          f"VideoObject compleet ({', '.join(VERPLICHT)}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
