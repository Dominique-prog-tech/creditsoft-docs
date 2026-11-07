# Listes de choix

Les listes de choix sont les valeurs qui apparaissent partout dans les fiches, dans les champs à choisir : civilité, type d'entreprise, nationalité, profession, état civil et toute une série d'autres.

![L'écran Listes de choix dans CreditSoft : en haut le sélecteur qui permet de choisir une liste — ici Nationalité — et en dessous un tableau avec les colonnes Ordre, Néerlandais et Français, avec en haut à droite les boutons Nouvel élément, Choisir les colonnes, Exporter et un champ de recherche.](../images/keuzelijsten-fr.png "La gestion des listes de choix, avec la liste des nationalités ouverte")

## Ouvrir l'écran

En bas à gauche, cliquez sur **Administration**, puis sur la tuile **Listes de choix**, dans le groupe *Données*.

Choisissez en haut **quelle liste** vous voulez modifier. Les éléments de cette liste apparaissent en dessous.

## Ajouter ou modifier un élément

| Champ | À quoi il sert |
|---|---|
| **Nom (NL)** et **Nom (FR)** | Le texte tel que vos collaborateurs le voient dans le champ de choix |
| **Ordre** | Détermine la position de l'élément dans la liste |

Renseignez toujours **les deux langues**. Si vous laissez le français vide, un collègue francophone verra le texte néerlandais.

!!! tip "Quand l'ordre vous est utile"
    Si vous laissez **Ordre** à zéro, la liste est triée par ordre alphabétique — et ce **dans la langue de
    celui qui regarde**. Un collègue francophone voit donc la même liste rangée selon son propre alphabet.

    Ne renseignez l'ordre que pour les listes qui décrivent un **parcours** plutôt qu'un ensemble — là où
    *d'abord ceci, ensuite cela* a du sens. Pour des listes comme la nationalité, la profession ou le type
    d'entreprise, laissez simplement l'ordre à zéro : l'ordre alphabétique est exactement ce que vous voulez.

## Supprimer un élément

Les éléments supprimés continuent d'exister en arrière-plan. C'est nécessaire : les dossiers qui y font déjà référence doivent rester lisibles. Ce qui se passe :

- l'élément disparaît des champs de choix, plus personne ne peut donc le sélectionner ;
- les dossiers existants continuent d'afficher leur valeur comme si de rien n'était.

!!! warning "Pourquoi certains éléments apparaissent-ils en double ?"
    Dans les données reprises, deux éléments portent parfois le même nom — par exemple deux fois *Sans suite*. Ce sont deux valeurs distinctes issues de l'ancien programme, chacune avec ses propres dossiers, et l'une des deux a généralement été supprimée. CreditSoft ajoute alors *(supprimé)* pour vous permettre de les distinguer. Ne les supprimez pas à la légère : c'est souvent à l'élément supprimé qu'est rattachée la majeure partie de votre historique.

## La variabilité : quand le taux est révisé

Une liste du programme figure bel et bien dans le sélecteur : **Variabilité (formule de taux)**. Les noms sont
gérés par nous — vous les choisissez sur un contrat — mais pour chaque variabilité, vous encodez vous-même
**deux chiffres** :

| Champ | À quoi il sert |
|---|---|
| **Première révision après (ans)** | Après combien d'années le taux est révisé pour la première fois |
| **Ensuite tous les (ans)** | Tous les combien d'années ensuite |

![L'écran Listes de choix avec, en haut, la liste Variabilité (formule de taux) sélectionnée. Le tableau affiche pour chaque variabilité le nom néerlandais et français et les deux chiffres Première révision après (ans) et Ensuite tous les (ans) : pour Variable 10/5/5 par exemple 10 et 5. Pour Fixe, les deux sont vides.](../images/keuzelijsten-variabiliteit-fr.png "Les variabilités avec leurs années de révision")

Cliquez sur une variabilité pour modifier les chiffres ; le nom et l'ordre sont grisés. Pour *Variable 10/5/5*,
c'est 10 et 5. Si les chiffres figurent dans le nom, ils sont déjà remplis. Pour un nom de produit comme
*Record Light Home*, vous les encodez vous-même : un tel nom ne permet de rien déduire, et une supposition
placerait un rappel au mauvais jour. Pour un taux fixe, laissez-les vides.

Avec ces chiffres, un contrat propose sa **première révision du taux**, et le
[tableau de bord](../getting-started/dashboard.md#le-suivi-des-credits-en-cours) affiche les révisions à venir.
Si vous laissez *Ensuite tous les* vide, seule la première révision apparaît.

## Le mode de remboursement d'un type de produit

Les listes **Type de produit hypothécaire** et **Type de produit prêt à tempérament** comportent une colonne
**Mode de remboursement** : la manière dont un crédit de ce type est remboursé.

| Mode de remboursement | Ce que cela signifie |
|---|---|
| **Mensualité constante** | Chaque mois le même montant, intérêts et capital ensemble |
| **Remboursement in fine (intérêts seuls)** | La mensualité ne comprend que les intérêts ; le capital est remboursé à la fin |
| **Mensualités croissantes** | La mensualité commence plus bas et augmente ensuite |
| **Amortissement fixe du capital (mensualités dégressives)** | Chaque mois la même part du capital, avec les intérêts en plus ; la mensualité diminue |

![L'écran Listes de choix avec la liste Type de produit hypothécaire sélectionnée. Le tableau affiche pour chaque type de produit le nom en néerlandais et en français, et la colonne Mode de remboursement. Pour Mensualités figure en italique Proposition : Mensualité constante, pour Crescendo Proposition : Mensualités croissantes, pour Sans amortissement Proposition : Remboursement in fine (intérêts seuls) ; pour Crédit-pont et Light home figure Inconnu.](../images/keuzelijsten-aflossingswijze-fr.png "Le mode de remboursement par type de produit, avec la proposition tirée du nom"){ .volle-breedte }

Si votre bureau n'a pas encore choisi de mode de remboursement, la colonne affiche une **proposition** en
italique, par exemple *Proposition : Mensualité constante*. CreditSoft la déduit du nom du type de produit :
*Mensualités* indique une mensualité constante, *Crescendo* une mensualité croissante. Si le nom ne dit rien de
certain, comme pour *Crédit-pont* ou un nom de marque, la colonne indique **Inconnu**.

Cliquez sur un type de produit pour choisir son mode de remboursement. Sous le champ figure la proposition, avec
le bouton **Reprendre** à côté. La proposition ne vaut qu'après un clic sur **Enregistrer**. Si vous n'êtes pas
sûr, laissez *Inconnu*.

## Le motif d'abandon

Sous **Motif d'abandon** figurent les motifs que vous choisissez sur un [dossier de crédit](../credit-management/credit-files.md#motif-dabandon) abandonné. Chaque bureau commence avec onze : six pour lesquels la banque a refusé, quatre pour lesquels le client a renoncé, et *Autre*. Le nom commence par *Banque :* ou *Client :* — ainsi, le graphique de l'onglet *Production* du [tableau de bord](../getting-started/dashboard.md#longlet-production) distingue les deux sortes.

Pour chaque motif, vous indiquez dans la colonne **Qui a donné le motif** s'il vient de la *Banque* ou du *Client*. La colonne *Refusé par la banque* du tableau [par prêteur](../getting-started/dashboard.md#par-preteur) compte sur ce choix. Les motifs standard le portent déjà ; pour *Autre*, il reste vide.

Renommez, ajoutez ou supprimez librement. Un motif que vous supprimez reste sur les dossiers qui le portent déjà et ne revient pas de lui-même.

## Quelles listes ne pouvez-vous pas modifier ?

Le sélecteur en haut reprend les listes qui sont **les vôtres** : les libellés avec lesquels vous décrivez vos
relations et vos contacts. Deux groupes n'y figurent volontairement pas.

**Les listes sur lesquelles le programme s'appuie.** Les statuts de dossier et de contrat, les types de dossier
de crédit, le but de l'achat : une logique y est attachée. CreditSoft en déduit des calculs
et des écrans, et modifier le nom d'un statut ferait plus que changer un mot. Si vous souhaitez y apporter une
modification, demandez-le à ADM-Concept — nous examinerons ensemble ce que cela touche.

**Les listes identiques pour tout le monde.** Les pays et les codes postaux proviennent de manière centralisée
d'ADM One et y sont entretenus, afin d'être les mêmes dans chaque logiciel.
