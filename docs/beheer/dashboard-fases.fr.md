# Phases du tableau de bord

Sur cet écran, vous déterminez vous-même comment vos dossiers sont **regroupés et comptés** sur le tableau de bord. Il contient deux réglages distincts, sans lien l'un avec l'autre.

![L'écran Phases du tableau de bord dans CreditSoft : en haut les phases avec leur nom dans les deux langues, leur ordre et les cases phase finale et suivi, avec à droite le lien entre chaque statut de dossier et une phase ; en dessous le lien entre chaque statut de contrat et l'une des quatre tuiles KPI.](../images/dashboard-fases-fr.png "Configurer comment les dossiers sont groupés et comptés sur le tableau de bord"){ .volle-breedte }

!!! info "Chaque modification est enregistrée immédiatement"
    Il n'y a pas de bouton d'enregistrement. Si vous modifiez un nom ou choisissez une autre phase, c'est aussitôt pris en compte. Pour défaire un rattachement, cliquez sur la croix dans la liste de choix.

## Partie 1 — Les phases

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

## Partie 2 — Rattacher les statuts de dossier à une phase

À droite figurent tous vos statuts de dossier. Choisissez pour chacun la phase à laquelle il appartient.

- Un statut relève d'**une phase au maximum**.
- Si vous ne rattachez pas un statut, ces dossiers apparaissent sur le tableau de bord sous **non classés**.
- Les statuts que vous n'utilisez plus mais qui restent liés à d'anciens dossiers demeurent dans cette liste. C'est voulu : ces dossiers doivent pouvoir aboutir quelque part.

## Partie 3 — Que signifie chaque statut de contrat ?

En bas, vous indiquez pour chaque **statut de contrat** ce qu'il signifie : *réalisé*, *à introduire* ou *introduit*. Les quatre tuiles colorées en haut du tableau de bord se remplissent alors d'elles-mêmes. Cela n'a rien à voir avec les phases : les phases concernent les dossiers, ceci concerne les contrats.

Vous ne choisissez donc **pas** directement une tuile. Ce ne serait d'ailleurs pas possible : *Actes* et *LOA* comptent toutes deux des contrats **réalisés** et ne diffèrent que par la catégorie de produit — crédit hypothécaire d'un côté, prêt à tempérament de l'autre. Quel produit relève de quelle tuile est fixé dans votre liste de produits.

Les statuts sans signification ne comptent nulle part. Si une tuile reste à zéro alors que vous savez qu'il existe des contrats, c'est probablement que le statut concerné ne porte pas encore de signification.

!!! info "La liste est groupée par origine"
    Les statuts de contrat proviennent de trois listes différentes : celle des **contrats de crédit**, une liste **historique** antérieure au modèle de contrat, et celle des **assurances solde restant dû**. Vous ne pouvez pas donner de signification aux statuts d'assurance — les indicateurs sont des chiffres de crédit. Ils figurent tout de même dans la liste, avec la mention *sans objet*, pour que vous ne cherchiez pas un statut que vous croiriez manquant.

!!! warning "Pourquoi certains statuts apparaissent-ils en double ?"
    Dans les données reprises, il arrive que deux statuts portent le même nom — par exemple deux fois *Sans suite*. Ce n'est pas une erreur : ce sont deux statuts distincts de l'ancien programme, chacun avec ses propres dossiers. Donnez-leur la même signification et vos collaborateurs n'y verront que du feu.
