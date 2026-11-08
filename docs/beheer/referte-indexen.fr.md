# Indices de référence

Un crédit à taux variable est révisé à l'aide d'un **indice de référence** : l'un des dix indices que l'Agence fédérale de la Dette publie chaque mois. Cet écran montre ces indices tels que CreditSoft les conserve, mois par mois depuis janvier 2019. Vous pouvez par exemple y comparer l'indice de départ d'une offre de la banque.

![L'écran Indices de référence : en haut, l'état de la liste, avec le mois le plus récent et le nombre de mois, le moment de la dernière récupération et celui de la dernière vérification de la source par CrediMatch, et l'étiquette À jour. En dessous, un tableau avec une ligne par mois, le plus récent en haut, et les colonnes Mois, A à J, Remarque et Source.](../images/referte-indexen-fr.png "Les indices de référence par mois, le plus récent en haut"){ .volle-breedte }

## Ouvrir l'écran

Cliquez en bas à gauche sur **Administration**, puis sur la tuile **Indices de référence**, dans le groupe *Crédit*. Vous voyez la tuile si vous pouvez aussi gérer les [Listes de choix](keuzelijsten.md) : c'est là que vous confirmez l'indice que suit un crédit.

## Ce que montre l'écran

Chaque ligne est un **mois**, le plus récent en haut. Pour chaque mois figurent les dix indices :

- **A** suit les certificats de trésorerie à 1 an ;
- **B** à **J** suivent les obligations linéaires à 2 à 10 ans.

Les valeurs sont **en pour cent, sous la forme annuelle**, comme sur la liste de l'Agence et dans une offre de la banque. De 2019 à 2021, elles étaient négatives.

Le mois est celui de la **liste**. L'Agence publie la liste d'un mois vers le 20 de ce mois. Lors d'une révision, c'est la liste du mois qui précède la révision qui compte : pour une révision au 1er mars, la liste de février.

La colonne **Remarque** signale ce qu'il faut savoir en comparant la liste à une autre source. Pour deux mois, le Moniteur belge contient une erreur d'impression : en mai 2021 pour l'indice J, et en juillet 2022 pour l'indice A. La liste porte la valeur correcte. Si un indice de départ provient du Moniteur, vérifiez-le pour ces deux mois.

La colonne **Source** indique d'où viennent les valeurs de ce mois. Cliquez dessus pour ouvrir le document.

## Comment la liste est mise à jour

CreditSoft récupère la liste **chaque matin à 6 h** auprès de CrediMatch, le service d'ADM qui tient à jour la liste de l'Agence. La liste est la même pour tous les bureaux, et personne ne la modifie ici. Si ADM corrige quelque chose dans CrediMatch, la correction arrive d'elle-même le lendemain matin.

En haut figure l'état de la liste :

- le **mois le plus récent** et le nombre de mois ;
- le moment de la **dernière récupération** par CreditSoft ;
- le moment de la dernière **vérification** de la source par CrediMatch.

Si tout est en ordre, vous voyez l'étiquette **À jour**.

## Erreurs fréquentes

!!! warning "Un message au-dessus de la liste"
    Si la liste est en retard, un message en donne la raison :

    - **La liste n'a plus été mise à jour** : la récupération auprès de CrediMatch échoue depuis trois jours. ADM en reçoit un avertissement ; dès qu'il est envoyé, la date est indiquée.
    - **CrediMatch n'a plus vérifié la source** : il peut manquer un nouveau mois.
    - **Le mois le plus récent est plus ancien que prévu** : après le 25, la liste du mois en cours devrait être là.
    - **La connexion avec CrediMatch n'est pas configurée** : CreditSoft ne récupère alors rien. ADM s'en charge.

    Vous n'avez rien à faire. Si vous calculez entre-temps avec un indice, vérifiez-le sur la liste de l'Agence.

## Voir aussi

- [Listes de choix](keuzelijsten.md#lindice-de-reference) : l'indice que suit une variabilité
- [Dossiers de crédit](../credit-management/credit-files.md) : le cap, le floor et l'indice de départ sur le contrat
