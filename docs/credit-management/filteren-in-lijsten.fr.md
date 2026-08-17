# Filtrer et rechercher dans les listes

Toutes les listes de CreditSoft fonctionnent de la même manière. Ce que vous lisez ici vaut donc aussi bien pour les dossiers de crédit que pour les assurances, les contrats, les relations ou les apporteurs.

Il existe quatre façons de restreindre une liste, de la plus rapide à la plus puissante. Elles se combinent : ce que vous écartez avec l'une reste écarté lorsque vous utilisez l'autre.

## 1. Le champ de recherche

En haut à droite se trouve un champ de recherche. Ce que vous y tapez est recherché dans **tout ce que vous voyez** — toutes les colonnes affichées à la fois. C'est le chemin le plus court vers un client ou un numéro de dossier.

## 2. Les listes de choix en haut

La plupart des listes comportent en haut une rangée de listes de choix : statut, organisme, responsable, produit. Elles diffèrent d'un écran à l'autre et sont décrites sur la page de cet écran. Elles ne proposent que les valeurs présentes dans vos données : pas de choix qui ne donnent rien.

## 3. L'entonnoir sur un en-tête de colonne

Survolez un en-tête de colonne : un petit **entonnoir** apparaît. Cliquez dessus et vous obtenez les valeurs présentes dans cette colonne, avec une case à cocher par valeur. Pratique pour filtrer rapidement sur une ou quelques valeurs.

## 4. Le générateur de filtres — pour les fourchettes et les combinaisons

Dès qu'un filtre est actif, une **barre indiquant le filtre en cours** apparaît sous la liste, par exemple :

> ☑ `[Montant] >= '200.000'`

Cette barre fait trois choses :

- elle **montre** ce qui est filtré, pour que vous ne regardiez jamais une liste raccourcie sans savoir pourquoi ;
- la **case à cocher** à gauche désactive temporairement le filtre sans le perdre ;
- la **corbeille** à droite l'efface.

**Cliquez sur le texte du filtre** et le **générateur de filtres** s'ouvre. Vous y composez vos propres conditions :

- choisissez un **champ** (par exemple *Montant*),
- choisissez un **opérateur** (*est égal à*, *est supérieur ou égal à*, *contient*, …),
- indiquez une **valeur**.

**Ajouter une condition** en ajoute une deuxième, et le choix **Et / Ou** en haut détermine si toutes les conditions doivent être remplies ou une seule. **Ajouter un groupe** permet d'imbriquer des conditions, par exemple *(montant supérieur à 200.000) et (organisme A ou organisme B)*.

!!! tip "Comment rechercher sur une fourchette"
    Une fourchette telle que « entre 200.000 et 250.000 » se compose de **deux conditions dans un même groupe Et** : *Montant est supérieur ou égal à 200.000* et *Montant est inférieur ou égal à 250.000*. Le même principe vaut pour la durée, le taux et les dates — par exemple tous les actes de cette année.

## Ce qui est conservé

Vos filtres, l'ordre de vos colonnes, leurs largeurs et les colonnes que vous avez affichées ou masquées sont conservés par liste dans votre navigateur. Si vous revenez demain sur le même écran, vous le retrouvez tel que vous l'avez laissé — et la barre de filtre en bas vous indique aussitôt ce qui est encore actif.

## L'exportation et l'impression suivent vos filtres

Ce que vous exportez vers Excel ou CSV, et ce qui figure sur une impression, correspond à **ce que vous voyez à cet instant**. Si vous filtrez d'abord et exportez ensuite, seule cette sélection se retrouve dans le fichier.
