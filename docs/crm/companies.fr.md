# Entreprises

Le module Entreprises contient toutes les organisations avec lesquelles vous êtes en contact : entreprises clientes, fournisseurs, partenaires.

## Ouvrir l'écran

Cliquez dans la sidebar sous **CRM** sur **Entreprises**.

!!! info "TODO"
    Screenshot van het bedrijven-overzicht.
    Bron in source: `Modules\Crm\AccountsMain.dfm` (of vergelijkbaar — bevestigen).
    Plaatsen in `docs/images/crm-bedrijven.png`.

![Bedrijvenoverzicht](/images/crm-bedrijven.png)

## Ajouter une nouvelle entreprise

1. Cliquez sur **Nouveau**.
2. Complétez les données de l'entreprise (voir la liste des champs ci-dessous).
3. Cliquez sur **Enregistrer**.

!!! info "TODO"
    Bron: `Modules\Crm\AccountsAdd.dfm`.

    Champs typiques :

    - Nom
    - Forme juridique (SRL, SA, ASBL, entreprise individuelle)
    - Numéro de TVA (avec validation VIES automatique ?)
    - Numéro BCE
    - Adresse (rue, numéro, code postal, commune, pays)
    - Téléphone, e-mail, site web
    - Personne de contact
    - Notes

## Modifier les données d'une entreprise

!!! info "TODO"
    - Comment ouvrir la vue détaillée ?
    - Quels onglets y a-t-il ?
    - Les modifications sont-elles journalisées ?

## Lier des contacts à une entreprise

Une entreprise peut avoir plusieurs personnes de contact. Gérez les relations via :

- L'onglet **Contacts** au sein de l'entreprise.
- Ou via l'[écran des contacts](contacts.md).

## Rechercher et filtrer des entreprises

!!! info "TODO"
    Welke zoek- en filtermogelijkheden zijn er?

## Supprimer une entreprise

!!! warning "TODO"
    Quelles conditions s'appliquent ? Que faire si des dossiers ou des contacts y sont encore liés ?
