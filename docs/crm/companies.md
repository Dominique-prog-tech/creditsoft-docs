# Bedrijven

De bedrijven-module bevat alle organisaties waarmee u in contact staat: klantondernemingen, leveranciers, partners.

## Het scherm openen

Klik in de sidebar onder **CRM** op **Bedrijven**.

!!! info "TODO"
    Screenshot van het bedrijven-overzicht.
    Bron in source: `Modules\Crm\AccountsMain.dfm` (of vergelijkbaar — bevestigen).
    Plaatsen in `docs/images/crm-bedrijven.png`.

![Bedrijvenoverzicht](/images/crm-bedrijven.png)

## Een nieuw bedrijf toevoegen

1. Klik op **Nieuw**.
2. Vul de bedrijfsgegevens in (zie veldenlijst hieronder).
3. Klik op **Opslaan**.

!!! info "TODO"
    Bron: `Modules\Crm\AccountsAdd.dfm`.

    Typische velden:

    - Naam
    - Rechtsvorm (BV, NV, vzw, eenmanszaak)
    - BTW-nummer (met automatische VIES-validatie?)
    - Ondernemingsnummer
    - Adres (straat, nummer, postcode, gemeente, land)
    - Telefoon, e-mail, website
    - Contactpersoon
    - Notities

## Bedrijfsgegevens bewerken

!!! info "TODO"
    - Hoe opent u de detailweergave?
    - Welke tabbladen zijn er?
    - Worden wijzigingen gelogd?

## Contacten koppelen aan een bedrijf

Een bedrijf kan meerdere contactpersonen hebben. Beheer de relaties via:

- Het tabblad **Contacten** binnen het bedrijf.
- Of via het [contacten-scherm](contacts.md).

## Bedrijven zoeken en filteren

!!! info "TODO"
    Welke zoek- en filtermogelijkheden zijn er?

## Een bedrijf verwijderen

!!! warning "TODO"
    Welke voorwaarden gelden? Wat als er nog dossiers of contacten gekoppeld zijn?
