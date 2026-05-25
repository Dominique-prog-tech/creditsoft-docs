# Workflow et statuts

Un dossier de crédit passe par différents statuts, de la création jusqu'au paiement et au suivi. Cette page donne un aperçu de tous les statuts et des actions possibles à chaque étape.

## Vue d'ensemble du workflow

```
Créé
   ↓
En finalisation
   ↓
À soumettre
   ↓
Soumis à l'institution financière
   ↓
Approuvé / refusé
   ↓ (en cas d'approbation)
Contrat établi
   ↓
Acte signé
   ↓
Suivi après acte
   ↓
Clôturé
```

!!! info "TODO"
    Verifieer en verfijn deze flow op basis van:

    - Status-enums in `ProjectConstants.pas`
    - Velden zoals `Status` in `Modules\CreditManagement\`-tabellen
    - Statusovergangen in code (zoek naar `Status :=` toewijzingen)

## Par statut

### Créé

!!! info "TODO"
    - Wat triggert deze status?
    - Welke acties zijn beschikbaar?
    - Welke velden zijn al verplicht?

### En finalisation

Le dossier est créé, les documents sont collectés, les données sont complétées.

Voir [En finalisation](finalizing.md) pour l'écran de vue d'ensemble.

### À soumettre

Le dossier est complet et prêt à être envoyé à l'institution financière.

Voir [Dossiers à soumettre](to-submit.md).

### Soumis / En cours de traitement

Le dossier est chez l'institution financière. Le courtier en crédit attend une décision.

### Approuvé

L'institution financière a approuvé le crédit.

### Contrat / Acte

[TODO: beschrijf]

### Suivi après acte

Après la signature de l'acte, une phase post-acte suit avec les paiements et les commissions.

Voir [Suivi après acte](post-deed-followup.md).

### Clôturé

[TODO: wanneer wordt een dossier definitief afgesloten?]

## Modifier les statuts

!!! info "TODO"
    Hoe wijzigt de gebruiker een status?

    - Manueel via een dropdown?
    - Automatisch op basis van acties (bv. document toevoegen → status wijzigt)?
    - Welke validaties gebeuren bij statuswijziging?

## Piste d'audit

!!! info "TODO"
    Wordt elke statuswijziging gelogd? Door wie? Wanneer? Is dit zichtbaar
    in een historiek-tabblad?
