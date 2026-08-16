#!/usr/bin/env python3
"""Controleert of hoge schermafbeeldingen de klasse `{ .volle-breedte }` dragen.

WAAROM DIT BESTAAT
------------------
`extra.css` legt een `max-height: 30rem` op elk beeld. Dat is er met reden: zonder die grens duwt één
lange fiche de rest van de pagina uit beeld. De keerzijde is dat een beeld dat tegen die grens botst,
óók in de breedte krimpt — het behoudt immers zijn verhouding. Een schermafbeelding die de volle
kolom hoort te vullen, staat dan een kwart te smal.

Daar is de uitzondering `{ .volle-breedte }` voor. Die stond op vier van de zes hoge beelden; op
`dashboard-fases` en `mailsjablonen` ontbrak ze. Niets meldde dat: de pagina bouwt, de link klopt, het
beeld verschijnt. Dominique zag het met het oog op 16/08/2026, en dat is precies de reden voor dit
script — een fout die enkel opvalt als iemand er toevallig naar kijkt, hoort gemeten te worden.

DE DREMPEL
----------
Gemeten op docs.creditsoft.be, niet geschat: de tekstkolom is 863 px breed en de `max-height` komt op
624 px uit (30rem bij een root van 20,8 px). Een beeld wordt dus in de hoogte afgekapt zodra
hoogte/breedte groter is dan 624/863 ≈ 0,72. Verandert het thema of de kolombreedte, dan hoort deze
verhouding opnieuw gemeten — schatten zet de drempel net verkeerd, en de lijst-beelden (0,67) liggen
er dicht genoeg bij om dat te laten opvallen.

Gebruik:  python3 tools/check-beeldbreedte.py
"""
import pathlib, re, struct, sys

DREMPEL = 624 / 863
WORTEL = pathlib.Path(__file__).resolve().parent.parent
BEELD = re.compile(r'!\[[^\]]*\]\(([^)\s]*?/images/([^)\s]+\.png))[^)]*\)(\{[^}]*\})?')


def png_afmeting(p: pathlib.Path):
    """Breedte en hoogte uit de PNG-header — geen sips, dus het draait ook buiten macOS."""
    with p.open("rb") as f:
        kop = f.read(24)
    if kop[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", kop[16:24])


def main() -> int:
    fouten, gemeten = [], 0
    for md in sorted((WORTEL / "docs").rglob("*.md")):
        for m in BEELD.finditer(md.read_text(encoding="utf-8")):
            p = WORTEL / "docs" / "images" / pathlib.Path(m.group(2)).name
            if not p.exists():
                fouten.append(f"{md.relative_to(WORTEL)}: beeld niet gevonden — {m.group(2)}")
                continue
            afm = png_afmeting(p)
            if afm is None:
                fouten.append(f"{p.name}: geen leesbare PNG-header")
                continue
            w, h = afm
            gemeten += 1
            if h / w > DREMPEL and "volle-breedte" not in (m.group(3) or ""):
                fouten.append(
                    f"{md.relative_to(WORTEL)}: {p.name} is {w}×{h} (verhouding {h/w:.2f}) en wordt in de "
                    f"hoogte afgekapt — het beeld staat dan te smal. Zet `{{ .volle-breedte }}` achter de "
                    f"afbeelding.")

    if not gemeten:
        print("✗ Nul beelden gemeten. Dat is geen 'in orde' — staan de afbeeldingen wel in docs/images/?",
              file=sys.stderr)
        return 1
    if fouten:
        print(f"✗ {len(fouten)} van de {gemeten} beelden:", file=sys.stderr)
        print("\n".join("   " + f for f in fouten), file=sys.stderr)
        return 1
    print(f"✓ {gemeten} beelden nagekeken, alle hoge beelden dragen de klasse.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
