# Vos pages publiques

Tout ce qu'un **visiteur** voit de vous sur une page que vous ne tenez pas vous-même : votre logo, vos couleurs,
les textes de la page où il [prend rendez-vous](../crm/online-afspraken.md), et le questionnaire que vous lui soumettez
au préalable.

## L'aperçu à côté des champs

À droite des champs figure un **aperçu en direct**. Si vous choisissez une couleur d'accent, le bouton change
immédiatement avec elle. Ce n'est pas décoratif : sans aperçu, vous ne voyez le résultat que lorsqu'un vrai
visiteur ouvre la page — et il est alors trop tard pour l'ajuster tranquillement.

## Ce que vous pouvez configurer

| | |
|---|---|
| **Logo** | Apparaît en haut de la page publique. |
| **Couleur d'accent et de fond** | La couleur du bouton et l'arrière-plan. Le libellé du bouton passe automatiquement du blanc au noir selon que votre couleur est foncée ou claire. |
| **Textes** | Le message d'accueil et les explications que lit le visiteur. |
| **Téléphone, site web, nom d'expéditeur** | Ce qui figure dans l'e-mail de confirmation et sur la page. |
| **Déclaration de confidentialité** | Voir ci-dessous. |
| **Questionnaire** | Les questions auxquelles un visiteur répond avant de confirmer. |
| **Domaines d'intégration** | Voir ci-dessous. |

## Votre page sur votre propre site

Si vous indiquez sous **domaines d'intégration** l'adresse de votre propre site, celui-ci peut afficher la page
de réservation *dans* ses propres pages. Le visiteur reste alors sur votre site et voit votre identité visuelle
au lieu d'être redirigé.

Une adresse par ligne, et **précédée de `https://`** :

```
https://www.bureaupeeters.be
https://bureaupeeters.be
```

Sans ce schéma, la ligne est refusée — `bureau.be` seul couvrirait aussi bien la version sécurisée que la
version non sécurisée, et ce n'est pas ce que vous voulez dire. Un chemin ou un astérisque n'est pas admis non
plus.

**Si vous laissez le champ vide, personne n'y est autorisé.** C'est l'état de toute page que vous n'avez pas
encore modifiée.

!!! warning "La déclaration de confidentialité n'est pas un champ décoratif"
    Votre page de réservation peut interroger sur les revenus, la propriété et les crédits en cours. Il s'agit
    d'une page **publique**, et celui qui y laisse des données doit pouvoir lire qui les traite et pourquoi.
    Renseignez le lien vers votre déclaration avant de partager cette page avec de vrais clients.

## L'enregistrement est tout ou rien

Si quelque chose ne va pas — un site web sans `https://` par exemple — **rien** n'est enregistré, le message
apparaît en haut et l'erreur est signalée près du champ concerné. Votre logo n'est pas remplacé non plus : sinon
vous auriez un nouveau logo alors même que le formulaire a été refusé.

## Qui peut le faire

Uniquement les personnes disposant du droit **Gérer le profil du bureau**. Il n'existe pas de mode
consultation : qui n'a pas le droit ne voit pas l'écran. Ce qui s'y trouve est de toute façon visible
publiquement sur vos pages ; il s'agit de savoir qui peut le *modifier*.
