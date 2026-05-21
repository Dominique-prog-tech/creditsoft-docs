# Commissieschema's

Commissieschema's leggen vast hoe de commissie verdeeld wordt tussen uw kantoor, tussenpersonen en eventuele andere betrokkenen.

## Het scherm openen

Klik in de sidebar onder **Kredieten** op **Schema's**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/commissieschemas.png`.

![Commissieschema's](/images/commissieschemas.png)

## Wat is een commissieschema

Een schema definieert:

- Welke percentages of bedragen welke partij ontvangt.
- Onder welke voorwaarden het schema van toepassing is (type krediet, tussenpersoon, financiële instelling).
- De geldigheidsperiode.

!!! info "TODO"
    Bron: `Modules\CreditManagement\CommissionSchemasMain.dfm`,
    `CommissionSchemaPanel.pas`.

## Een nieuw schema aanmaken

!!! info "TODO"
    Stap voor stap procedure documenteren:

    1. Klik op **Nieuw**.
    2. Geef het schema een naam en beschrijving.
    3. Stel de voorwaarden in (type krediet, tussenpersoon, etc.).
    4. Voeg de regels toe (wie krijgt welk percentage / bedrag).
    5. Stel geldigheidsperiode in.
    6. Activeer het schema.

## Schema-types

!!! info "TODO"
    Welke types schema's bestaan?

    - Vast bedrag
    - Percentage op kredietsom
    - Percentage op commissie van financiële instelling
    - Tiered (staffel) — verschillende percentages voor verschillende ranges

## Schema's toewijzen

!!! info "TODO"
    Hoe wordt een schema toegewezen aan een tussenpersoon of dossier?
    Automatisch op basis van voorwaarden, of manueel?

## Schema's wijzigen

!!! warning "TODO"
    Welke gevolgen heeft het wijzigen van een schema voor reeds berekende
    commissies? Worden historische data bewaard?

## Zie ook

- [Commissiebeheer](commissiebeheer.md)
- [Tussenpersonen](tussenpersonen.md)
