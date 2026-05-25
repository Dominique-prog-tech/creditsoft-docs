# Vue d'ensemble de l'interface

Cette page vous guide à travers les principaux composants de CreditSoft. Vous apprendrez comment l'écran principal est structuré et comment vous repérer rapidement.

## Les composants principaux

La fenêtre CreditSoft se compose de trois zones principales :

1. **Sidebar (gauche)** — votre principal outil de navigation.
2. **Espace de travail principal (centre)** — c'est ici que vous ouvrez les dossiers, écrans et rapports.
3. **Barre d'état / en-tête** — affiche le contexte actuel et les actions rapidement accessibles.

!!! info "TODO"
    Screenshot van het hoofdscherm met genummerde aanduidingen van deze drie zones.
    Plaatsen in `docs/images/interface-overzicht.png`.

![Hoofdscherm CreditSoft](/images/interface-overzicht.png)

## La sidebar

La sidebar regroupe toutes les fonctions en sections logiques. Source : `uSidebarStyling.pas`, fonction `GetCreditSoftSidebar`.

| Section | Contenu |
|---|---|
| **En haut** | Tableau de bord, Dossiers de crédit, Tâches |
| **CRM** | Entreprises, contacts, comptables, agences immobilières, notaires, estimateurs, biens immobiliers |
| **Crédits** | Aperçus des dossiers, gestion des commissions, intermédiaires, institutions financières |
| **Travail** | Appels téléphoniques, agenda, archives, e-mail groupé |
| **Portail** | Gestion des actualités pour les intermédiaires et les clients |
| **Configuration** | Profil d'entreprise, paramètres, données de base, personnel |
| **En bas** | Mon profil, ticket de support, info, fermer la session |

## Réduire et développer la sidebar

!!! info "TODO"
    Beschrijf hoe de gebruiker secties in de sidebar opent en sluit
    (groepen klikken om uit te klappen).

## Mode clair et mode sombre

CreditSoft prend en charge un thème **clair** et un thème **sombre**.

1. Cliquez sur l'icône soleil/lune en haut à droite de la sidebar.
2. Le thème change immédiatement et est mémorisé pour votre prochaine session.

## Raccourcis clavier

!!! info "TODO"
    Inventariseer sneltoetsen uit de Delphi-code (zoek naar `ShortCut`,
    `Action` met `ShortCut` properties in .dfm bestanden).

| Raccourci | Fonction |
|---|---|
| [TODO] | [TODO] |

## Étape suivante

Consultez le [tableau de bord](dashboard.md) pour découvrir les informations affichées immédiatement après la connexion.
