# Documenten beheren

Elk kredietdossier verzamelt verschillende documenten: identiteitskaarten, loonfiches, eigendomsakten, schattingsverslagen, contracten. Deze pagina beschrijft hoe u documenten aan een dossier toevoegt en beheert.

## Het documentenscherm openen

1. Open het kredietdossier (zie [Dossier bewerken](dossier-bewerken.md)).
2. Klik op het tabblad **Documenten**.

!!! info "TODO"
    Screenshot van het documenten-tabblad.
    Bron in source: `Modules\CreditManagement\CreditDocumentsAdd.dfm`.
    Plaatsen in `docs/images/dossier-documenten.png`.

![Documenten in dossier](/images/dossier-documenten.png)

## Een document toevoegen

!!! info "TODO"
    Beschrijf de procedure:

    1. Klik op **Toevoegen**.
    2. Kies het bestand op uw computer.
    3. Selecteer het **type document** uit een lijst.
    4. Voeg een beschrijving toe (optioneel).
    5. Klik op **Opslaan**.

## Document-types

!!! info "TODO"
    Inventariseer de beschikbare document-types.
    Bron: zoek in `Modules\Settings\` of `database-schema.sql`
    naar een tabel met document-types.

    Veelvoorkomende types:

    - Identiteitskaart
    - Loonfiche
    - Aanslagbiljet
    - Eigendomsakte
    - Schattingsverslag
    - Krediet-offerte
    - Krediet-akte

## Documenten valideren

Documenten kunnen worden gemarkeerd als **gevalideerd** of wachten op validatie.

Zie: [Documenten valideren](../kredieten-beheer/documenten-valideren.md).

## Documenten bekijken en downloaden

!!! info "TODO"
    Hoe opent de gebruiker een document?
    Wordt het in een ingebouwde viewer geopend of in de standaard-applicatie?

## Documenten verwijderen

!!! warning "TODO"
    Welke documenten kunnen verwijderd worden, en welke niet?
    Wat met audit-trail bij verwijdering?
