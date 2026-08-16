# Historique

L'**Historique** montre ce qui est arrivé à cette fiche : qui a modifié quel champ, quand, et de quelle valeur
vers quelle autre. C'est la question *« qui a changé cela ? »* — répondue sans que personne doive s'en souvenir.

<!-- AFBEELDING: le tiroir du journal sur l'onglet Historique avec une création et deux modifications -->

## Ce que vous voyez

Les lignes vont **du plus récent au plus ancien**, la dernière en haut. Chaque ligne commence par une étiquette
qui dit ce qui s'est passé :

| Étiquette | Signification |
|---|---|
| **Créé** | La fiche a été ajoutée. En dessous figurent les valeurs de départ. |
| **Modifié** | Quelque chose a changé. Par champ, l'ancienne valeur est barrée, puis une flèche, puis la nouvelle. |
| **Supprimé** | La fiche est partie vers la [Corbeille](../administration/recycle-bin.md). |

À côté de l'étiquette figurent le **moment** et l'**utilisateur**. Un champ qui était vide ou qui l'est devenu
affiche un tiret.

Si beaucoup de champs ont changé d'un coup, l'historique affiche les quatre premiers et, en dessous, un bouton
**+ tant d'autres champs**. Cliquez dessus pour tout voir.

!!! note "Uniquement les deux cents plus récentes"
    D'une fiche à la longue histoire, l'historique montre les deux cents modifications les plus récentes. Si la
    liste est pleine, il le signale en bas.

## Ce qui n'y figure pas

- **Les horodatages techniques.** Les champs que l'application tient elle-même à jour — quand le dernier
  enregistrement a eu lieu, et par qui — n'apparaissent pas comme modification dans la liste. Ce moment figure
  d'ailleurs déjà à droite de chaque ligne. Sans ce filtre, chaque ligne commencerait par là et la vraie
  modification disparaîtrait en dessous.
- **Les lignes sous-jacentes.** L'historique porte sur la fiche elle-même. Si vous modifiez une **adresse** sur
  une relation, il s'agit d'un enregistrement distinct qui n'apparaît pas ici.

## Vous ne pouvez rien y changer

L'historique est en **lecture seule**. Aucun bouton ne permet de modifier ou de supprimer une ligne, pas même
pour un administrateur. Ce n'est pas une lacune mais une intention : un historique dans lequel vous pouvez
effacer n'est pas un historique.

## Qui peut le voir

L'Historique demande le même droit que le [Journal d'activité](../administration/activity-log.md). Si vous ne
l'avez pas, la partie n'apparaît pas dans le tiroir. Cela se règle sous [Rôles](../administration/roles.md).

## Différence avec le Journal d'activité

Ils se ressemblent et répondent à deux questions différentes :

- L'**Historique** présent ici porte sur **une seule fiche** et montre **champ par champ** ce qui a changé.
- Le [Journal d'activité](../administration/activity-log.md) dans l'Administration porte sur **toute
  l'application** et montre des **actions** : qui s'est connecté quand, qui a exporté quelque chose, qui a
  désactivé un utilisateur.

Vous cherchez ce qui est arrivé à un dossier ? Regardez ici. Vous cherchez ce qu'un utilisateur a fait ce
jour-là ? Regardez dans le Journal d'activité.

## Sur quelles fiches

L'Historique figure sur les six fiches principales : dossiers de crédit, relations, professionnels, apporteurs,
organismes de crédit et assureurs. Sur une fiche sans historique, la partie n'apparaît pas.
