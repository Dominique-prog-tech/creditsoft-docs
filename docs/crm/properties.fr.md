# Biens immobiliers

Les biens immobiliers sont les propriétés servant de garantie pour un crédit hypothécaire. CreditSoft les gère de manière structurée dans un module dédié.

## Ouvrir l'écran

Cliquez dans la sidebar sous **CRM** sur **Biens immobiliers**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/crm-panden.png`.

![Pandenoverzicht](/images/crm-panden.png)

## Ajouter un bien immobilier

!!! info "TODO"
    Bron: `Modules\CreditManagement\PropertiesAdd.dfm` en
    `PropertiesManagementMain.dfm`.

    Champs typiques :

    - Adresse (rue, numéro, code postal, commune)
    - Type de bien (maison, appartement, terrain, commercial, ...)
    - Informations cadastrales (parcelle, sous-commune, division)
    - Année de construction
    - Surface (habitable, totale)
    - Score PEB
    - Prix d'achat
    - Valeur estimée
    - Propriétaires (lien vers contacts/entreprises)

## Propriétaires d'un bien

!!! info "TODO"
    Bron: `Modules\CreditManagement\PropertyOwnersAdd.dfm`.

    Beschrijf hoe meerdere eigenaars (en hun aandeel) worden vastgelegd.

## Lier des estimations

Un bien immobilier peut faire l'objet de plusieurs estimations au fil du temps.

Voir : [Estimations](../credit-management/appraisals.md).

## Garanties et sûretés

!!! info "TODO"
    Bron: `PropertyGuaranteesAdd.dfm`.
    Documenteer welke garanties en zekerheden bij een pand kunnen
    worden vastgelegd (rang hypothécaire, autres sûretés).

## Lier un bien à un dossier

!!! info "TODO"
    Beschrijf de koppeling pand ↔ kredietdossier.
    Un même bien peut-il servir pour plusieurs dossiers (ex. refinancement) ?
