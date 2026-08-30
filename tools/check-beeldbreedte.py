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

TWEE KLASSEN, WANT TWEE PROBLEMEN
---------------------------------
Tot 30/08/2026 wees dit script altijd naar `.volle-breedte`, en dat advies was voor een deel van de
meldingen fout. Een beeld dat BEWUST SMAL is — een uitsnede van de menubalk, een zijpaneel — draagt een
eigen `width=` in de markdown. `.volle-breedte` zet `width: 100%` en zou zo'n uitsnede over de hele
tekstkolom uitrekken.

Die beelden worden wél afgekapt (gemeten op de site: `menu-links.png` stond op 171 px terwijl er
`width="240"` staat, en `voorkeuren-paneel.png` op 241 px bij `width="330"` — de `max-height` wint van
het attribuut en het beeld krimpt mee). Ze hebben dus `{ .eigen-breedte }` nodig: die heft enkel de
hoogtegrens op en laat de breedte met rust.

⚠️ De DETECTIE was in alle gevallen juist; enkel het ADVIES was het niet. Een controle die het goede
probleem vindt maar de verkeerde oplossing noemt, wordt genegeerd of verkeerd opgevolgd — allebei
erger dan zwijgen.

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
HEEFT_BREEDTE = re.compile(r'\bwidth\s*=')


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
            attrs = m.group(3) or ""
            eigen = "eigen-breedte" in attrs
            volle = "volle-breedte" in attrs

            # ⚠️ Een `width=`-attribuut op een beeld doet NIETS: een presentatie-attribuut verliest van
            # elke auteursregel, en `extra.css` zet `width: auto` op alle beelden. Zolang `max-height`
            # gold viel dat niet op — die bepaalde de breedte, en het attribuut leek gehoorzaamd te
            # worden. Melden, óók bij een laag beeld: het is een instelling die niet doet wat er staat.
            if HEEFT_BREEDTE.search(attrs):
                fouten.append(
                    f"{md.relative_to(WORTEL)}: {p.name} draagt `width=`, en dat doet niets — CSS wint "
                    f"van een presentatie-attribuut. Gebruik `style=\"width:…px\"`.")
                continue

            # Twee klassen die elkaar tegenspreken: `volle-breedte` wint in de CSS (ze komt later), dus
            # het beeld wordt uitgerekt terwijl de auteur het smal bedoelde. Melden, niet stil kiezen.
            if eigen and volle:
                fouten.append(
                    f"{md.relative_to(WORTEL)}: {p.name} draagt ZOWEL `.volle-breedte` als "
                    f"`.eigen-breedte`. Die spreken elkaar tegen — kies er één.")
                continue

            if h / w > DREMPEL and not (volle or eigen):
                # Het advies volgt uit de BEDOELING van de auteur: staat er een eigen breedte, dan is het
                # beeld bewust smal en mag `.volle-breedte` er niet op.
                fouten.append(
                    f"{md.relative_to(WORTEL)}: {p.name} is {w}×{h} (verhouding {h/w:.2f}) en wordt in de "
                    f"hoogte afgekapt — het beeld staat dan te smal. Zet `{{ .volle-breedte }}` achter de "
                    f"afbeelding: het hoort de tekstkolom te vullen. Is het beeld BEWUST smal (een uitsnede "
                    f'van een menubalk, een zijpaneel), gebruik dan `{{ .eigen-breedte style="width:…px" }}` '
                    f"— die heft enkel de hoogtegrens op.")

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
