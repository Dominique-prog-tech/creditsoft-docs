# Gérer les documents

Chaque dossier de crédit rassemble différents documents : cartes d'identité, fiches de salaire, actes de propriété, rapports d'estimation, contrats. Cette page décrit comment ajouter et gérer des documents dans un dossier.

## Ouvrir l'écran des documents

1. Ouvrez le dossier de crédit (voir [Modifier un dossier](edit-file.md)).
2. Cliquez sur l'onglet **Documents**.

!!! info "TODO"
    Screenshot van het documenten-tabblad.
    Bron in source: `Modules\CreditManagement\CreditDocumentsAdd.dfm`.
    Plaatsen in `docs/images/dossier-documenten.png`.

![Documenten in dossier](/images/dossier-documenten.png)

## Ajouter un document

!!! info "TODO"
    Beschrijf de procedure:

    1. Klik op **Toevoegen**.
    2. Kies het bestand op uw computer.
    3. Selecteer het **type document** uit een lijst.
    4. Voeg een beschrijving toe (optioneel).
    5. Klik op **Opslaan**.

## Types de documents

!!! info "TODO"
    Inventariseer de beschikbare document-types.
    Bron: zoek in `Modules\Settings\` of `database-schema.sql`
    naar een tabel met document-types.

    Types courants :

    - Carte d'identité
    - Fiche de salaire
    - Avertissement-extrait de rôle
    - Acte de propriété
    - Rapport d'estimation
    - Offre de crédit
    - Acte de crédit

## Valider les documents

Les documents peuvent être marqués comme **validés** ou en attente de validation.

Voir : [Valider les documents](../credit-management/document-validation.md).

## Consulter et télécharger des documents

!!! info "TODO"
    Hoe opent de gebruiker een document?
    Wordt het in een ingebouwde viewer geopend of in de standaard-applicatie?

## Supprimer des documents

!!! warning "TODO"
    Welke documenten kunnen verwijderd worden, en welke niet?
    Wat met audit-trail bij verwijdering?
