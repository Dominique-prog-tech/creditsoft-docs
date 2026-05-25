# Vue d'ensemble du workflow

Cette page donne une image globale de la façon dont un dossier de crédit "circule" dans CreditSoft — du premier contact à la clôture définitive.

## Le workflow complet

```
┌──────────────────────┐
│   Premier contact    │   CRM : créer un contact, intake
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│  Créer un dossier    │   Dossiers de crédit : nouveau dossier
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   En finalisation    │   Collecter les documents,
│                      │   demander une estimation
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│   À soumettre        │   Prêt pour l'institution financière
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Soumis à l'IF        │   Attente de décision
└──────────┬───────────┘
           ↓
       ┌───┴───┐
       ↓       ↓
   ┌───────┐ ┌─────────┐
   │  LOA  │ │ Refusé  │
   └───┬───┘ └─────────┘
       ↓
┌──────────────────────┐
│  Contrat / Acte      │   Acte notarié
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│ Suivi après acte     │   Paiements, commissions
└──────────┬───────────┘
           ↓
┌──────────────────────┐
│    Clôturé           │   Vers les archives
└──────────────────────┘
```

## Le rôle de chaque module

| Module | Rôle dans le workflow |
|---|---|
| [CRM](../crm/overview.md) | Source de contacts, biens immobiliers, partenaires utilisés dans les dossiers |
| [Dossiers de crédit](../credit-files/overview.md) | Cœur : le dossier lui-même de la création à la clôture |
| [Gestion des crédits](../credit-management/dashboard.md) | Aperçus et contrôles opérationnels durant le trajet |
| [Tâches](../tasks/management.md) | Actions à suivre par dossier ou contact |
| [Travail](../work/calendar.md) | Communication et planification (e-mails, appels téléphoniques, rendez-vous) |
| [Configuration](../settings/company-profile.md) | Paramètres et données de base qui alimentent le système |

## Responsabilités par rôle

!!! info "TODO"
    Beschrijf welke rollen binnen het kantoor welk deel van de workflow doen:

    - **Front-office / courtier** : premier contact, création de dossier, contact client
    - **Back-office / gestionnaire de dossiers** : valider les documents, soumettre, suivi
    - **Comptable** : gestion des commissions, contrôle, paiements
    - **Manager** : reporting, statistiques

## Délais typiques

!!! info "TODO"
    Délais typiques par phase, et comment CreditSoft aide à les surveiller :

    - De la création à la soumission : objectif X jours
    - De la soumission à la décision : en moyenne Y jours
    - Du LOA à l'acte : maximum Z jours
