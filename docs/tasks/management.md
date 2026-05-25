# Takenbeheer

Het takenbeheer in CreditSoft helpt u uw werkdag te structureren: openstaande acties, deadlines, opvolgpunten.

## Het scherm openen

Klik in de sidebar bovenaan op **Taken**. Het aantal openstaande taken wordt als badge naast het menu-item getoond.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/taken.png`.

![Takenbeheer](/images/taken.png)

## Een nieuwe taak aanmaken

!!! info "TODO"
    Bron: zoek naar `TasksAdd.dfm`, `TaskListMain.pas` in `Modules\Crm\`.

    Typische velden:

    - Titel
    - Beschrijving
    - Vervaldatum
    - Prioriteit (laag, normaal, hoog, urgent)
    - Toegewezen aan (medewerker)
    - Gekoppeld aan (dossier, contact, bedrijf)
    - Herinnering instellen

## Taken filteren en sorteren

!!! info "TODO"
    Welke filters:

    - Open / afgewerkt
    - Per medewerker
    - Per prioriteit
    - Per periode (vandaag, deze week, achterstallig)
    - Per koppeling (dossiers, contacten)

## Een taak afhandelen

1. Open de taak.
2. Voeg eventueel een afhandelingsnotitie toe.
3. Klik op **Markeer als voltooid**.

## Taken delegeren

!!! info "TODO"
    Kan een taak worden overgedragen aan een andere medewerker?

## Herinneringen

!!! info "TODO"
    Hoe werken herinneringen?

    - Pop-up in CreditSoft?
    - E-mailnotificatie?
    - Notificatie op het dashboard?

## Taken vanuit andere schermen

Taken kunnen ook rechtstreeks vanuit andere schermen aangemaakt worden:

- Vanuit een [kredietdossier](../credit-files/edit-file.md)
- Vanuit een [contact](../crm/contacts.md)
- Vanuit een [telefoon-registratie](../work/phone-calls.md)
