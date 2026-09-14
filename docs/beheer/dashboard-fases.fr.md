# Phases du tableau de bord

Sur cet écran, vous déterminez vous-même comment vos dossiers sont **regroupés et comptés** sur le tableau de bord, et ce qu'il advient d'un dossier dès qu'il est bouclé. Il contient une série de réglages distincts, avec peu de lien entre eux.

![L'écran Phases du tableau de bord dans CreditSoft : en haut les phases avec leur nom dans les deux langues, leur ordre et les cases phase finale et suivi, avec à droite le lien entre chaque statut de dossier et une phase ; en dessous le lien entre chaque statut de contrat et l'une des quatre tuiles KPI.](../images/dashboard-fases-fr.png "Configurer comment les dossiers sont groupés et comptés sur le tableau de bord"){ .volle-breedte }

!!! info "Attention à l'endroit où il y a — ou non — un bouton d'enregistrement"
    Les **phases**, les **rattachements** et les **cases** du bas sont enregistrés immédiatement : si vous modifiez quelque chose, c'est aussitôt pris en compte. Pour défaire un rattachement, cliquez sur la croix dans la liste de choix.

    Les deux réglages **du haut** — le statut initial et le bloc de signaux — ont chacun leur propre bouton **Enregistrer**. Si vous ne cliquez pas dessus, votre modification n'est pas enregistrée.

## Le statut initial d'un nouveau dossier

Avec quel statut démarre un dossier que vous créez dans CreditSoft ? Cela varie d'un bureau à l'autre, le programme ne le choisit donc pas à votre place.

Tant que vous ne réglez rien ici, **CreditSoft demande le statut à chaque nouveau dossier**. C'est voulu : une valeur par défaut erronée place immédiatement un nouveau dossier dans la mauvaise phase, et vous ne le remarquez que sur le tableau de bord.

Si vous en définissez un, cette question disparaît et chaque dossier démarre dans ce statut. Vous pouvez toujours effacer ce choix ; la question réapparaît alors.

## Le bloc de signaux — jusqu'où le tableau de bord regarde-t-il en avant ?

Le tableau de bord comporte un bloc reprenant les échéances qui arrivent à terme : offres, actes, conditions suspensives et certificats PEB. Vous déterminez ici **combien de jours à l'avance** il regarde.

Seuls les dossiers encore en cours sont pris en compte. Et les échéances déjà dépassées restent toujours visibles — quelle que soit leur ancienneté — tant que le dossier n'est pas dans une phase finale. Ainsi, rien ne disparaît de l'écran pour être resté trop longtemps en plan.

## Les phases

Une **phase** est une colonne du pipeline sur le tableau de bord : un groupe de statuts de dossier que vous souhaitez voir ensemble.

| Colonne | Ce que vous renseignez |
|---|---|
| **Nom (NL)** et **Nom (FR)** | Le nom tel que vos collaborateurs le voient, dans les deux langues |
| **Ordre** | Détermine la position de la phase dans le pipeline, de gauche à droite |
| **Phase finale** | Le délai de traitement d'un dossier cesse d'y courir |
| **Suivi** | Le dossier apparaît dans la liste des points ouverts après l'acte |

**Phase finale** est plus important qu'il n'y paraît. Un dossier clôturé sans suite continuerait sinon à « courir » indéfiniment dans vos statistiques. Si vous marquez comme finale la phase où ce dossier aboutit, le compteur s'arrête.

**Suivi** s'utilise pour les phases où le crédit est bouclé mais où des pièces manquent encore — l'acte est passé et il reste une attestation à recevoir. Ces dossiers apparaissent alors dans l'aperçu [Aperçu global](../credit-management/global-overview.md) sous *Suivi après acte*.

En bas du tableau figure une ligne vide : saisissez-y un nom pour ajouter une phase.

## Rattacher les statuts de dossier à une phase

À droite figurent tous vos statuts de dossier. Choisissez pour chacun la phase à laquelle il appartient.

- Un statut relève d'**une phase au maximum**.
- Si vous ne rattachez pas un statut, ces dossiers apparaissent sur le tableau de bord sous **non classés**.
- Les statuts que vous n'utilisez plus mais qui restent liés à d'anciens dossiers demeurent dans cette liste. C'est voulu : ces dossiers doivent pouvoir aboutir quelque part.

## Que signifie chaque statut de contrat ?

En bas, vous indiquez pour chaque **statut de contrat** ce qu'il signifie : *réalisé*, *à introduire* ou *introduit*. Les quatre tuiles colorées en haut du tableau de bord se remplissent alors d'elles-mêmes. Cela n'a rien à voir avec les phases : les phases concernent les dossiers, ceci concerne les contrats.

Vous ne choisissez donc **pas** directement une tuile. Ce ne serait d'ailleurs pas possible : *Actes* et *LOA* comptent toutes deux des contrats **réalisés** et ne diffèrent que par la catégorie de produit — crédit hypothécaire d'un côté, prêt à tempérament de l'autre. Quel produit relève de quelle tuile est fixé dans votre liste de produits.

Les statuts sans signification ne comptent nulle part. Si une tuile reste à zéro alors que vous savez qu'il existe des contrats, c'est probablement que le statut concerné ne porte pas encore de signification.

!!! info "La liste est groupée par origine"
    Les statuts de contrat proviennent de trois listes différentes : celle des **contrats de crédit**, une liste **historique** antérieure au modèle de contrat, et celle des **assurances solde restant dû**. Vous ne pouvez pas donner de signification aux statuts d'assurance — les indicateurs sont des chiffres de crédit. Ils figurent tout de même dans la liste, avec la mention *sans objet*, pour que vous ne cherchiez pas un statut que vous croiriez manquant.

!!! warning "Pourquoi certains statuts apparaissent-ils en double ?"
    Dans les données reprises, il arrive que deux statuts portent le même nom — par exemple deux fois *Sans suite*. Ce n'est pas une erreur : ce sont deux statuts distincts de l'ancien programme, chacun avec ses propres dossiers. Donnez-leur la même signification et vos collaborateurs n'y verront que du feu.

## Que ne peut-on plus modifier sur un contrat bouclé ?

En bas, vous cochez les champs qui se verrouillent dès qu'un contrat porte la signification **Réalisé** : numéro de contrat, produit, type de crédit, montant, durée, taux, date de début et établissement de crédit.

Cela protège vos chiffres. Un montant qui change encore après l'acte modifie rétroactivement ce qui figure sur le tableau de bord et sur vos aperçus de commissions.

!!! warning "Sans signification, rien ne se verrouille"
    Le verrou dépend de la signification *Réalisé* de la partie ci-dessus. S'il n'existe encore aucun statut de contrat portant cette signification, ces cases ne font rien — réglez d'abord les significations.

Qui dispose du droit de modifier malgré tout un contrat bouclé peut ouvrir le verrou lorsqu'une correction s'impose réellement.
