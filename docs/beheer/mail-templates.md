# Mail templates

Mail templates zijn standaardteksten die u hergebruikt voor terugkerende communicatie: bevestigingsmails, documentopvragingen, status-updates.

## Het scherm openen

Klik in de sidebar onder **Beheer** op **Mail templates**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/mail-templates.png`.

![Mail templates](/images/mail-templates.png)

## Een nieuwe template aanmaken

!!! info "TODO"
    Typische velden:

    - Naam van de template
    - Onderwerp (met merge-velden)
    - Body (HTML, met merge-velden)
    - Taal (NL/FR/EN)
    - Categorie (dossier, contact, intern)
    - Standaard bijlagen

## Merge-velden

Merge-velden voegen automatisch gegevens in uit een dossier of contact:

!!! info "TODO"
    Lijst van beschikbare merge-velden:

    - `{voornaam}`, `{achternaam}`
    - `{bedrijf}`
    - `{dossiernummer}`
    - `{kredietbedrag}`
    - `{makelaar}`
    - `{datum}`
    - ...

## Templates gebruiken

Templates worden gebruikt:

- Bij het versturen van een e-mail vanuit een dossier of contact.
- Bij [groepsmails](../werk/groepsmail.md).
- Bij automatische e-mails (bevestigingen, herinneringen).

## Best practices

!!! tip
    - Houd templates beknopt en duidelijk.
    - Vermijd te veel merge-velden — minder is meer.
    - Maak één template per gebruiksdoel, niet alles-in-één.
    - Voorzie versies in NL/FR/EN waar nodig.
