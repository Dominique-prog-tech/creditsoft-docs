# Workflow-overzicht

Deze pagina geeft een globaal beeld van hoe een kredietdossier door CreditSoft "stroomt" — van eerste contact tot definitieve afsluiting.

## De volledige workflow

```
┌──────────────────────┐
│   Eerste contact     │   CRM: contact aanmaken, intake
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Dossier aanmaken    │   Kredietdossiers: nieuw dossier
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   In afwerking       │   Documenten verzamelen,
│                      │   schatting aanvragen
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   In te dienen       │   Klaar voor financiële instelling
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Ingediend bij FI     │   Wacht op beslissing
└──────────┬───────────┘
           ↓
       ┌───┴───┐
       ↓       ↓
   ┌───────┐ ┌─────────┐
   │ LOA   │ │Geweigerd│
   └───┬───┘ └─────────┘
       ↓
┌──────────────────────┐
│  Contract / Akte     │   Notariële akte
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Opvolging na akte    │   Uitbetalingen, commissies
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Afgesloten        │   Naar archief
└──────────────────────┘
```

## De rol van elke module

| Module | Rol in de workflow |
|---|---|
| [CRM](../crm/overview.md) | Bron van contacten, panden, partners die in dossiers gebruikt worden |
| [Kredietdossiers](../credit-files/overview.md) | Kern: het dossier zelf van aanmaak tot afsluiting |
| [Kredieten-beheer](../credit-management/dashboard.md) | Overzichten en operationele controles tijdens het traject |
| [Taken](../tasks/management.md) | Acties die per dossier of contact opgevolgd moeten worden |
| [Werk](../work/calendar.md) | Communicatie en planning (mails, telefoons, afspraken) |
| [Beheer](../settings/company-profile.md) | Instellingen en stamdata die het systeem voeden |

## Verantwoordelijkheden per rol

!!! info "TODO"
    Beschrijf welke rollen binnen het kantoor welk deel van de workflow doen:

    - **Front-office / makelaar**: eerste contact, dossier-aanmaak, klantcontact
    - **Back-office / dossierbeheerder**: documenten valideren, indienen, opvolging
    - **Boekhouder**: commissiebeheer, controle, uitbetalingen
    - **Manager**: rapportering, statistieken

## Tijdspatronen

!!! info "TODO"
    Typische doorlooptijden per fase, en hoe CreditSoft helpt om die te
    bewaken:

    - Van aanmaak tot indienen: target X dagen
    - Van indienen tot beslissing: gemiddeld Y dagen
    - Van LOA tot akte: maximaal Z dagen
