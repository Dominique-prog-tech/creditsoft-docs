# Créer un nouveau dossier de crédit

Cette page décrit étape par étape comment créer un nouveau dossier de crédit dans CreditSoft.

## Quand créer un nouveau dossier

Vous créez un nouveau dossier dès que vous avez un premier rendez-vous avec un emprunteur potentiel, ou dès que vous décidez de prendre en charge une demande.

## Ouvrir l'écran

Il existe plusieurs façons de démarrer un nouveau dossier :

1. Depuis le tableau de bord : bouton **Nouveau dossier**.
2. Depuis la vue d'ensemble : dans **Crédits → Dossiers**, cliquez sur **Nouveau**.
3. [TODO: andere ingangen, zoals vanuit een contact in CRM]

!!! info "TODO"
    Screenshot van het scherm voor nieuw dossier.
    Bron in source: `Modules\CreditManagement\CreditFilesAdd.dfm`.
    Plaatsen in `docs/images/nieuw-dossier.png`.

![Nieuw kredietdossier](/images/nieuw-dossier.png)

## Champs à compléter lors de la création

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
    - Pand (indien hypothecair) — link naar [Panden](../crm/properties.md)
    - Toegewezen makelaar
    - Tussenpersoon (indien van toepassing)

## Étape par étape

1. Ouvrez l'écran **Nouveau dossier** (voir ci-dessus).
2. Sélectionnez ou créez l'**emprunteur**.
3. Complétez les **données de base** (date de demande, type, montant demandé).
4. [TODO: verdere stappen]
5. Cliquez sur **Enregistrer**.

## Validations et champs obligatoires

!!! warning "TODO"
    Inventariseer welke velden verplicht zijn en welke validaties
    automatisch gebeuren.

    Bron: zoek in `CreditFilesAdd.pas` naar `if`-checks vóór de save,
    en `ShowMessage` foutmeldingen.

## Après la création

Après l'enregistrement, le dossier se trouve dans le statut **[TODO: statut de départ par défaut]**.
Vous pouvez maintenant :

- [Ajouter des documents](documents.md)
- Compléter le dossier — voir [Modifier un dossier](edit-file.md)
- Planifier une [tâche](../tasks/management.md) pour le suivi
