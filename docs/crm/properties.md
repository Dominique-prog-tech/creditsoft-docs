# Panden

Panden zijn de onroerende goederen die als zekerheid dienen voor een hypothecair krediet. CreditSoft houdt ze gestructureerd bij in een eigen module.

## Het scherm openen

Klik in de sidebar onder **CRM** op **Panden**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/crm-panden.png`.

![Pandenoverzicht](/images/crm-panden.png)

## Een pand toevoegen

!!! info "TODO"
    Bron: `Modules\CreditManagement\PropertiesAdd.dfm` en
    `PropertiesManagementMain.dfm`.

    Typische velden:

    - Adres (straat, nummer, postcode, gemeente)
    - Type pand (woonhuis, appartement, grond, commercieel, ...)
    - Kadastrale informatie (perceel, deelgemeente, afdeling)
    - Bouwjaar
    - Oppervlakte (bewoonbare, totale)
    - EPC-score
    - Aankoopprijs
    - Geschatte waarde
    - Eigenaars (link naar contacten/bedrijven)

## Eigenaars van een pand

!!! info "TODO"
    Bron: `Modules\CreditManagement\PropertyOwnersAdd.dfm`.

    Beschrijf hoe meerdere eigenaars (en hun aandeel) worden vastgelegd.

## Schattingen koppelen

Een pand kan meerdere schattingen hebben over de tijd.

Zie: [Schattingen](../credit-management/appraisals.md).

## Garanties en zekerheden

!!! info "TODO"
    Bron: `PropertyGuaranteesAdd.dfm`.
    Documenteer welke garanties en zekerheden bij een pand kunnen
    worden vastgelegd (hypotheekrang, andere zekerheden).

## Een pand koppelen aan een dossier

!!! info "TODO"
    Beschrijf de koppeling pand ↔ kredietdossier.
    Kan één pand voor meerdere dossiers dienen (bv. herfinanciering)?
