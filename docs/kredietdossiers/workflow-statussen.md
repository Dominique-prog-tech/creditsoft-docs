# Workflow en statussen

Een kredietdossier doorloopt verschillende statussen van aanmaak tot uitbetaling en opvolging. Deze pagina geeft een overzicht van alle statussen en welke acties op welk moment mogelijk zijn.

## Overzicht van de workflow

```
Aangemaakt
   ↓
In afwerking
   ↓
In te dienen
   ↓
Ingediend bij financiële instelling
   ↓
Goedgekeurd / geweigerd
   ↓ (bij goedkeuring)
Contract opgemaakt
   ↓
Akte verleden
   ↓
Opvolging na akte
   ↓
Afgesloten
```

!!! info "TODO"
    Verifieer en verfijn deze flow op basis van:

    - Status-enums in `ProjectConstants.pas`
    - Velden zoals `Status` in `Modules\CreditManagement\`-tabellen
    - Statusovergangen in code (zoek naar `Status :=` toewijzingen)

## Per status

### Aangemaakt

!!! info "TODO"
    - Wat triggert deze status?
    - Welke acties zijn beschikbaar?
    - Welke velden zijn al verplicht?

### In afwerking

Het dossier is aangemaakt, documenten worden verzameld, gegevens worden aangevuld.

Zie [In afwerking](in-afwerking.md) voor het overzichtsscherm.

### In te dienen

Het dossier is volledig en klaar om naar de financiële instelling te sturen.

Zie [In te dienen dossiers](in-te-dienen.md).

### Ingediend / In behandeling

Het dossier is bij de financiële instelling. De makelaar wacht op een beslissing.

### Goedgekeurd

De financiële instelling heeft het krediet goedgekeurd.

### Contract / Akte

[TODO: beschrijf]

### Opvolging na akte

Na het verlijden van de akte volgt een post-akte fase met uitbetalingen en commissies.

Zie [Opvolging na akte](opvolging-na-akte.md).

### Afgesloten

[TODO: wanneer wordt een dossier definitief afgesloten?]

## Statussen wijzigen

!!! info "TODO"
    Hoe wijzigt de gebruiker een status?

    - Manueel via een dropdown?
    - Automatisch op basis van acties (bv. document toevoegen → status wijzigt)?
    - Welke validaties gebeuren bij statuswijziging?

## Audit-trail

!!! info "TODO"
    Wordt elke statuswijziging gelogd? Door wie? Wanneer? Is dit zichtbaar
    in een historiek-tabblad?
