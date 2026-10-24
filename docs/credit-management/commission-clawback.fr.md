# Récupérations à confirmer

Quand un crédit se termine plus tôt que prévu — le client le rembourse anticipativement, ou la banque l'exige — la compagnie récupère souvent une partie de la commission. Cette liste reprend les dossiers pour lesquels c'est encore à traiter, avec ce que dit le [barème des commissions](../beheer/commissiebarema.md) et qui rembourse quelle part.

## Ouvrir l'écran

1. Indiquez le remboursement anticipé sur le dossier : sur la fiche, en bas du bloc [Proposition selon le barème](credit-files.md#proposition-selon-le-bareme), avec le lien **Remboursement anticipé ou exigibilité…**.
2. Allez dans le menu vers **Schémas**. Le lien **Récupérations à confirmer** figure alors en haut de la liste, avec le nombre de dossiers en attente. S'il n'y a rien en attente, le lien n'apparaît pas.

![L'écran Récupérations à confirmer avec un dossier : remboursé le 10/07/2026, le type remboursement anticipé, la règle Record, l'explication Dans les 24 mois : 50 % de la partie upfront, avec la mention que la commission étalée s'arrête à partir de 07/2026, le bureau qui rembourse avec son montant, le total et le bouton Récupérer.](../images/terugvordering-te-bevestigen-fr.png "Ce qui reste à récupérer"){ .volle-breedte }

## Ce que vous voyez

| Colonne | Ce que c'est |
|---|---|
| **Remboursé le** et **Type** | La date et s'il s'agit d'un remboursement anticipé ou d'une exigibilité |
| **Règle** | La compagnie (et la formule) du barème qui s'applique |
| **Ce que dit le barème** | Le palier applicable, et si la commission étalée s'arrête |
| **Qui rembourse** | Par schéma de commission du dossier, le montant récupéré |
| **À récupérer** | Le total |

Chaque schéma rembourse **selon ce qu'il a reçu** : le bureau et le bureau principal chacun leur part. Un schéma qu'un bureau paie lui-même à ses collaborateurs ne compte pas ; c'est le bureau qui s'en charge.

## Traiter

Cliquez sur le bouton de la colonne *État*. Vous voyez d'abord ce qui va se passer ; si vous confirmez, tout se fait en une fois :

- la **commission étalée s'arrête** à partir du mois du remboursement, si le barème le prévoit — ce qui figure déjà sur un bordereau reste ;
- le montant récupéré est comptabilisé en **ligne négative** ce mois-là, sur le schéma de commission de celui qui l'a reçu.

Le bouton s'appelle **Récupérer** s'il y a un montant à récupérer, **Arrêter l'étalement** si seul l'étalement s'arrête, et **Clôturer** s'il n'y a rien à comptabiliser. Le dossier quitte ensuite la liste et la fiche indique *récupération traitée le*.

La ligne négative figure sur le prochain [bordereau](commission-statements.md) de ce bureau. Si elle dépasse ce qui s'ajoute ce mois-là, la différence est reportée au bordereau suivant.

!!! warning "Traité, c'est traité"
    Après le traitement, la date du remboursement est figée, et un schéma arrêté ne redémarre pas de lui-même. Vérifiez donc la date avant de confirmer. Tant que le dossier figure sur cette liste, vous pouvez encore modifier ou effacer la date sur la fiche.

## Quand un dossier ne peut pas être traité

La raison figure alors dans la colonne *État* :

- **Aucune règle du barème** — la compagnie ou la date d'acte tombe hors du barème. Traitez la récupération à la main sur le schéma de commission.
- **Récupérations différentes** — les crédits du dossier relèvent de règles avec une récupération différente.
- **Pas de schéma de commission payé par le backoffice** — il n'y a rien à récupérer.
- **Date antérieure à l'acte** — vérifiez la date sur la fiche.

## Voir aussi

- [Barème des commissions — récupération](../beheer/commissiebarema.md#recuperation-en-cas-de-remboursement-anticipe-ou-dexigibilite)
- [Bordereau](commission-statements.md)
- [Commissions à confirmer](commission-to-confirm.md)
