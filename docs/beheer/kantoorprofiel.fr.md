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
| **Questionnaire** | En cours de refonte — voir ci-dessous. |
| **Domaines d'intégration** | Voir ci-dessous. |

## Le questionnaire

Vous composez ici les questions auxquelles un visiteur répond **avant** son rendez-vous. S'il y a un
questionnaire, il en reçoit le lien dans son e-mail de confirmation. Si vous laissez vide, il n'y a pas de lien —
ni de phrase qui renvoie vers rien.

![L'éditeur de questionnaire : en haut le titre en néerlandais et en français, en dessous deux questions numérotées avec leur texte dans les deux langues et une liste déroulante pour le type de réponse, avec des flèches et une corbeille à côté ; à droite un aperçu de ce que voit le visiteur.](../images/kantoorprofiel-vragenlijst.png "Composer le questionnaire, avec l'aperçu à côté"){ .volle-breedte }

Pour chaque question, vous saisissez le texte en **néerlandais et en français**, et choisissez le type de réponse
attendu :

| Type | Pour quoi |
|---|---|
| **Réponse courte** | Une ligne — un nom, un montant sous forme de texte |
| **Texte long** | Plusieurs lignes, par exemple « pour quoi souhaitez-vous emprunter ? » |
| **Nombre** · **Date** · **Adresse e-mail** · **Numéro de téléphone** | Le visiteur reçoit le champ de saisie adéquat |
| **Oui / non** | Deux boutons au lieu d'une zone de texte |

Les **flèches** modifient l'ordre, la **corbeille** supprime une question. À droite, vous voyez immédiatement ce
que reçoit le visiteur — inutile d'attendre que quelqu'un ouvre réellement la page.

!!! tip "Réécrire une question ne casse rien"
    Les réponses déjà reçues restent rattachées à leur question, même si vous en modifiez ensuite le texte. Vous
    pouvez donc reformuler une question plus clairement en toute tranquillité.

!!! warning "Vous posez des questions sur des données personnelles ?"
    Renseignez alors votre **déclaration de confidentialité** (plus haut sur ce même écran). Le lien apparaît au
    bas du questionnaire, et c'est justifié : revenus, propriété et crédits en cours ne sont pas des questions
    anodines sur une page publique.

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

!!! warning "Un administrateur ADM ne voit rien ici"
    Cet écran affiche le profil de **votre** bureau, qu'il déduit de votre connexion. Un compte d'administrateur
    ADM n'est rattaché à aucun bureau et reçoit donc le message *« Votre connexion n'est liée à aucun bureau »*.
    Connectez-vous avec votre propre compte pour configurer votre profil.
