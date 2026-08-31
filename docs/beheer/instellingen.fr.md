# Paramètres

Les paramètres sont les **commutateurs** de votre bureau. Ils déterminent ce qui est verrouillé dès qu'un contrat est réalisé, quand CreditSoft vous avertit, et qui reçoit un message lors d'un nouveau prospect.

## Ouvrir l'écran

Cliquez dans le menu de gauche sur **Administration**, puis sur **Paramètres**.

Vous voyez une ligne par paramètre, avec trois colonnes : la **clé** (le nom sous lequel CreditSoft retrouve le paramètre), la **valeur**, et **Ce que cela fait**.

## Ce que cela fait

Lisez cette troisième colonne avant de modifier une valeur. Elle indique à quoi sert chaque paramètre — par exemple que *Bloque tout courrier sortant de ce bureau* est activé dans un environnement de démonstration, ou combien de jours à l'avance le tableau de bord regarde les échéances.

Pour un paramètre que vous avez ajouté vous-même, il est indiqué *Paramètre propre à ce bureau*.

## Modifier une valeur

Cliquez sur **Modifier** derrière la ligne. La **clé** ne peut pas être adaptée, la **valeur** oui.

!!! warning "Pourquoi la clé est figée"
    CreditSoft cherche ses paramètres par leur nom. Sous une clé renommée, l'application ne retrouve plus
    son paramètre et revient sans avertissement à son comportement par défaut. Pour désactiver une règle,
    mettez la **valeur** à `false` — ne renommez pas la clé.

## Ajouter ou supprimer un paramètre

**Nouveau paramètre** ajoute une clé qui vous est propre.

La suppression n'est possible que pour les paramètres que vous avez ajoutés vous-même. Ceux que CreditSoft lit lui-même peuvent être modifiés mais pas supprimés : les effacer remettrait la règle correspondante à sa valeur par défaut, ce qui est rarement l'intention. Pour ces paramètres, le bouton **Supprimer** est donc absent.

**Exporter** vous donne la liste complète sous forme de fichier Excel.
