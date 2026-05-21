# Nieuw kredietdossier aanmaken

Deze pagina beschrijft stap voor stap hoe u een nieuw kredietdossier aanmaakt in CreditSoft.

## Wanneer een nieuw dossier aanmaken

U maakt een nieuw dossier aan zodra u met een potentiële kredietnemer een eerste afspraak heeft, of zodra u beslist een aanvraag in behandeling te nemen.

## Het scherm openen

Er zijn meerdere manieren om een nieuw dossier te starten:

1. Vanuit het dashboard: knop **Nieuw dossier**.
2. Vanuit het overzicht: in **Kredieten → Dossiers**, klik op **Nieuw**.
3. [TODO: andere ingangen, zoals vanuit een contact in CRM]

!!! info "TODO"
    Screenshot van het scherm voor nieuw dossier.
    Bron in source: `Modules\CreditManagement\CreditFilesAdd.dfm`.
    Plaatsen in `docs/images/nieuw-dossier.png`.

![Nieuw kredietdossier](/images/nieuw-dossier.png)

## Velden bij aanmaak

!!! info "TODO"
    Lees `Modules\CreditManagement\CreditFilesAdd.dfm` en `.pas`
    om de exacte velden en validaties te documenteren.

    Typische velden bij aanmaak van een kredietdossier:

    - Kredietnemer (selecteer bestaand contact of nieuw aanmaken)
    - Mede-kredietnemer (optioneel)
    - Aanvraagdatum
    - Type krediet (hypothecair, consumentenkrediet)
    - Gevraagde som
    - Doel van het krediet
    - Pand (indien hypothecair) — link naar [Panden](../crm/panden.md)
    - Toegewezen makelaar
    - Tussenpersoon (indien van toepassing)

## Stap-voor-stap

1. Open het scherm **Nieuw dossier** (zie hierboven).
2. Selecteer of maak de **kredietnemer** aan.
3. Vul de **basisgegevens** in (aanvraagdatum, type, gevraagde som).
4. [TODO: verdere stappen]
5. Klik op **Opslaan**.

## Validaties en verplichte velden

!!! warning "TODO"
    Inventariseer welke velden verplicht zijn en welke validaties
    automatisch gebeuren.

    Bron: zoek in `CreditFilesAdd.pas` naar `if`-checks vóór de save,
    en `ShowMessage` foutmeldingen.

## Na het aanmaken

Na opslaan bevindt het dossier zich in de status **[TODO: standaard startstatus]**.
U kunt nu:

- [Documenten toevoegen](documenten-beheren.md)
- Het dossier verder vervolledigen — zie [Dossier bewerken](dossier-bewerken.md)
- Een [taak](../taken/takenbeheer.md) plannen voor de opvolging
