# Intermédiaires

Les intermédiaires sont des courtiers en crédit qui apportent ou traitent des dossiers. CreditSoft gère votre réseau d'intermédiaires avec leurs agréments, coordonnées et barèmes de commission.

## Ouvrir l'écran

Cliquez dans la sidebar sous **Crédits** sur **Intermédiaires**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/tussenpersonen.png`.

![Tussenpersonen-overzicht](/images/tussenpersonen.png)

## Ajouter un intermédiaire

!!! info "TODO"
    Bron: `Modules\CreditManagement\ContributorsAdd.dfm`,
    `ContributorsMain.dfm`.

    Champs typiques :

    - Nom (personne ou cabinet)
    - Numéro FSMA (obligatoire pour les courtiers en crédit agréés)
    - Type d'agrément (courtier en crédit, courtier en assurances)
    - Adresse, téléphone, e-mail
    - Numéro de TVA / numéro BCE
    - Numéro de compte bancaire (pour le paiement des commissions)
    - Barèmes de commission attribués

## Attribuer des barèmes de commission

Chaque intermédiaire peut avoir un ou plusieurs [barèmes de commission](commission-schemes.md).

!!! info "TODO"
    Beschrijf hoe een schema aan een tussenpersoon gekoppeld wordt.
    Bron: `ContributorsCommission.dfm`.

## Dossiers d'un intermédiaire

!!! info "TODO"
    L'écran de détail de l'intermédiaire affiche-t-il les dossiers qu'il/elle a apportés ?
    Avec quelles statistiques ?

## Statistiques par intermédiaire

!!! info "TODO"
    - Nombre de dossiers apportés (par période)
    - Taux de conversion
    - Valeur moyenne des dossiers
    - Total des commissions payées
    - Classement des meilleurs intermédiaires

## Désactiver un intermédiaire

!!! warning "TODO"
    Procédure pour désactiver un intermédiaire (plutôt que de le supprimer).
    Qu'advient-il des dossiers en cours et des commissions ?
