# Modifier un dossier

Une fois un dossier de crédit créé, vous pouvez y revenir à tout moment pour compléter des données, apporter des modifications ou mettre à jour le statut.

## Ouvrir un dossier

1. Accédez à **Crédits → Dossiers**.
2. Recherchez le dossier dans la liste (voir [Vue d'ensemble](overview.md) pour le filtrage).
3. Double-cliquez sur la ligne, ou sélectionnez-la et cliquez sur **Ouvrir**.

!!! info "TODO"
    Screenshot van het dossier-detailscherm.
    Bron in source: `Modules\CreditManagement\CreditFileDetails.dfm`.
    Plaatsen in `docs/images/dossier-detail.png`.

![Dossier-detailscherm](/images/dossier-detail.png)

## Onglets du dossier

L'écran de détail est composé de différents onglets.

!!! info "TODO"
    Inventariseer de tabbladen uit `CreditFileDetails.dfm`.

    Typische tabbladen:

    - **Algemeen** — basisgegevens, kredietnemers, bedragen
    - **Pand** — link naar pand-informatie
    - **Documenten** — alle bijlagen ([Documenten beheren](documents.md))
    - **Contributors / Tussenpersonen** — wie werkt mee aan dit dossier
    - **Commissies** — commissieverdeling
    - **Verzekering** — verzekeringen gekoppeld aan dit dossier
    - **Notities** — vrije aantekeningen
    - **Historiek** — wijzigingen en statuswijzigingen

## Modifier le statut

!!! info "TODO"
    Beschrijf hoe de gebruiker de status van een dossier wijzigt
    en welke statussen er bestaan.
    Bron: zoek naar enum-types in `ProjectConstants.pas` of de credit-modules.

Voir aussi : [Workflow et statuts](workflow-statuses.md).

## Enregistrer et fermer

!!! info "TODO"
    Beschrijf:

    - Wordt automatisch opgeslagen, of moet de gebruiker expliciet bewaren?
    - Wat gebeurt bij sluiten zonder opslaan?

## Annuler des modifications

!!! info "TODO"
    Is er een mogelijkheid om wijzigingen ongedaan te maken?
    Bestaat er een historiek waarin u oudere versies kunt raadplegen?
