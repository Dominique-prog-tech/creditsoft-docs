# Tussenpersonen

Tussenpersonen zijn kredietbemiddelaars die dossiers aanbrengen of mee in behandeling nemen. CreditSoft beheert uw netwerk van tussenpersonen met hun erkenningen, contactgegevens en commissieschema's.

## Het scherm openen

Klik in de sidebar onder **Kredieten** op **Tussenpersonen**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/tussenpersonen.png`.

![Tussenpersonen-overzicht](/images/tussenpersonen.png)

## Een tussenpersoon toevoegen

!!! info "TODO"
    Bron: `Modules\CreditManagement\ContributorsAdd.dfm`,
    `ContributorsMain.dfm`.

    Typische velden:

    - Naam (persoon of kantoor)
    - FSMA-nummer (verplicht voor erkende kredietbemiddelaars)
    - Type erkenning (kredietbemiddelaar, verzekeringsbemiddelaar)
    - Adres, telefoon, e-mail
    - BTW-nummer / ondernemingsnummer
    - Bankrekeningnummer (voor uitbetaling commissies)
    - Toegewezen commissieschema's

## Commissieschema's toewijzen

Elke tussenpersoon kan één of meerdere [commissieschema's](commission-schemes.md) hebben.

!!! info "TODO"
    Beschrijf hoe een schema aan een tussenpersoon gekoppeld wordt.
    Bron: `ContributorsCommission.dfm`.

## Dossiers van een tussenpersoon

!!! info "TODO"
    Toont het tussenpersonen-detailscherm welke dossiers door hem/haar
    aangebracht zijn? Met welke statistieken?

## Statistieken per tussenpersoon

!!! info "TODO"
    - Aantal aangebrachte dossiers (per periode)
    - Conversiepercentage
    - Gemiddelde dossierwaarde
    - Totaal uitbetaalde commissie
    - Top-tussenpersonen ranking

## Tussenpersoon deactiveren

!!! warning "TODO"
    Procedure om een tussenpersoon te deactiveren (i.p.v. verwijderen).
    Wat gebeurt met lopende dossiers en commissies?
