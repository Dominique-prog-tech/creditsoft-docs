# Barèmes de commission

Les barèmes de commission définissent la manière dont la commission est répartie entre votre cabinet, les intermédiaires et les autres parties impliquées.

## Ouvrir l'écran

Cliquez dans la sidebar sous **Crédits** sur **Barèmes**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/commissieschemas.png`.

![Commissieschema's](/images/commissieschemas.png)

## Qu'est-ce qu'un barème de commission

Un barème définit :

- Quels pourcentages ou montants chaque partie reçoit.
- Les conditions d'application du barème (type de crédit, intermédiaire, institution financière).
- La période de validité.

!!! info "TODO"
    Bron: `Modules\CreditManagement\CommissionSchemasMain.dfm`,
    `CommissionSchemaPanel.pas`.

## Créer un nouveau barème

!!! info "TODO"
    Documenter la procédure étape par étape :

    1. Cliquez sur **Nouveau**.
    2. Donnez un nom et une description au barème.
    3. Définissez les conditions (type de crédit, intermédiaire, etc.).
    4. Ajoutez les règles (qui reçoit quel pourcentage / montant).
    5. Définissez la période de validité.
    6. Activez le barème.

## Types de barèmes

!!! info "TODO"
    Quels types de barèmes existent ?

    - Montant fixe
    - Pourcentage sur le montant du crédit
    - Pourcentage sur la commission de l'institution financière
    - Barème progressif (paliers) — différents pourcentages selon les tranches

## Attribuer des barèmes

!!! info "TODO"
    Comment un barème est-il attribué à un intermédiaire ou à un dossier ?
    Automatiquement selon les conditions, ou manuellement ?

## Modifier des barèmes

!!! warning "TODO"
    Quelles conséquences la modification d'un barème a-t-elle sur les commissions
    déjà calculées ? Les données historiques sont-elles conservées ?

## Voir aussi

- [Gestion des commissions](commissions.md)
- [Intermédiaires](intermediaries.md)
