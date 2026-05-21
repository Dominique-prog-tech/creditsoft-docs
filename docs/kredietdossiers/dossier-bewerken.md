# Dossier bewerken

Eens een kredietdossier is aangemaakt, kunt u op elk moment terugkeren om gegevens aan te vullen, te wijzigen of de status bij te werken.

## Een dossier openen

1. Ga naar **Kredieten → Dossiers**.
2. Zoek het dossier in de lijst (zie [Overzicht](overzicht.md) voor filtering).
3. Dubbelklik op de regel, of selecteer en klik op **Openen**.

!!! info "TODO"
    Screenshot van het dossier-detailscherm.
    Bron in source: `Modules\CreditManagement\CreditFileDetails.dfm`.
    Plaatsen in `docs/images/dossier-detail.png`.

![Dossier-detailscherm](/images/dossier-detail.png)

## Tabbladen in het dossier

Het detailscherm is opgebouwd uit verschillende tabbladen.

!!! info "TODO"
    Inventariseer de tabbladen uit `CreditFileDetails.dfm`.

    Typische tabbladen:

    - **Algemeen** — basisgegevens, kredietnemers, bedragen
    - **Pand** — link naar pand-informatie
    - **Documenten** — alle bijlagen ([Documenten beheren](documenten-beheren.md))
    - **Contributors / Tussenpersonen** — wie werkt mee aan dit dossier
    - **Commissies** — commissieverdeling
    - **Verzekering** — verzekeringen gekoppeld aan dit dossier
    - **Notities** — vrije aantekeningen
    - **Historiek** — wijzigingen en statuswijzigingen

## Status wijzigen

!!! info "TODO"
    Beschrijf hoe de gebruiker de status van een dossier wijzigt
    en welke statussen er bestaan.
    Bron: zoek naar enum-types in `ProjectConstants.pas` of de credit-modules.

Zie ook: [Workflow en statussen](workflow-statussen.md).

## Opslaan en sluiten

!!! info "TODO"
    Beschrijf:

    - Wordt automatisch opgeslagen, of moet de gebruiker expliciet bewaren?
    - Wat gebeurt bij sluiten zonder opslaan?

## Wijzigingen ongedaan maken

!!! info "TODO"
    Is er een mogelijkheid om wijzigingen ongedaan te maken?
    Bestaat er een historiek waarin u oudere versies kunt raadplegen?
