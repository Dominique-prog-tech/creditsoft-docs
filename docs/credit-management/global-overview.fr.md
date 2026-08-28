# Aperçu global

Le suivi des dossiers est votre liste de travail : **tous les dossiers de crédit sur un seul écran**, avec leur statut, leur ancienneté et ce qui reste en suspens. Là où la liste des dossiers de crédit vous montre un dossier à la fois, vous voyez ici l'ensemble — et vous filtrez sur ce qui demande votre attention aujourd'hui.

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Listes**, puis sur **Aperçu global**.

![L'aperçu global : en haut les listes de choix pour la présélection, le statut, l'institution, le responsable et le sales, avec à côté le nombre de dossiers affichés, le total du montant du crédit et le bouton Imprimer la liste ; en dessous le tableau indiquant par dossier le numéro interne, les demandeurs, le statut, la phase, l'institution, l'apporteur, le montant du crédit, le délai, les remarques et les dates.](../images/globaal-overzicht-lijst-fr.png "Tous les dossiers sur un écran, avec leur phase et leur délai"){ .volle-breedte }

## Choisir ce que vous voulez voir

Cinq listes de choix figurent en haut. La première détermine quelle partie de vos dossiers s'affiche :

![L'aperçu global avec la première liste de choix dépliée : Tous les dossiers, En cours — surligné en bleu comme choix actuel — et Suivi après acte. À côté, les quatre autres listes, le compteur « 2246 sur 4000 » et le bouton Imprimer la liste ; en dessous, le tableau des dossiers.](../images/globaal-overzicht-voorinstelling-fr.png "La première liste de choix : quelle partie de vos dossiers s'affiche"){ .volle-breedte }

- **En cours** — tout ce qui n'est pas encore clôturé. C'est l'affichage par défaut à l'ouverture de l'écran.
- **Suivi après acte** — les dossiers qui, selon votre répartition en phases, demandent un suivi *et* pour lesquels des remarques restent ouvertes. C'est votre liste des « il reste quelque chose à faire ici ».
- **Tous les dossiers** — sans restriction.

Vous filtrez ensuite par **statut**, **institution**, **responsable** et **sales**. Ces deux derniers ne sont pas identiques : le responsable assure le suivi du dossier, le sales l'a apporté — et il s'agit souvent d'une autre personne. À droite des listes de choix figure le nombre de dossiers affichés sur le total, par exemple `128 / 3988`, et à côté le **total du montant du crédit** pour ces dossiers. Ce total suit vos filtres : si vous sélectionnez un seul responsable, vous lisez immédiatement le volume de crédit dont cette personne a la charge.

!!! tip "C'est vous qui déterminez quels dossiers relèvent de quel choix"
    Les choix **En cours** et **Suivi après acte** suivent la répartition en phases de votre bureau. Vous la configurez sous **Administration → Phases du tableau de bord** : vous y rattachez chaque statut de dossier à une phase et indiquez quelle phase est une phase finale et laquelle demande un suivi. Tant qu'un statut n'est pas réparti, il relève de « En cours ».

## Les colonnes

| Colonne | Ce qu'elle affiche |
|---|---|
| **N° interne** | Le numéro de dossier |
| **Demandeurs** | Tous les demandeurs du dossier, à la suite |
| **Statut** | Le statut du dossier, dans la couleur que vous lui avez donnée |
| **Phase** | La phase dont relève ce statut |
| **Institution** | L'organisme de crédit |
| **Apporteur** | L'apporteur |
| **Montant du crédit** | Le montant total du crédit |
| **Délai de traitement** | Nombre de jours entre l'introduction et l'acte |
| **Remarques** | Les remarques ouvertes sur le dossier |
| **Introduction** et **Acte** | Les deux dates clés |
| **Responsable** | Le collaborateur qui suit le dossier |

Le **délai de traitement** continue de courir jusqu'à aujourd'hui tant qu'il n'y a pas d'acte. Si un dossier se trouve dans une phase finale sans acte — refusé ou sans suite — la cellule reste vide : le compteur ne continue alors pas inutilement.

Via **Choisir les colonnes** (l'icône à côté d'Exporter), vous ajoutez neuf colonnes supplémentaires : quotité, investissement, fonds propres, crédit demandé, la date limite des conditions suspensives, la date limite de signature de l'acte, la **validité** de l'offre, la désignation éventuelle d'un expert, et le responsable commercial.

## Travailler avec la liste

- **Ouvrir un dossier** — double-cliquez sur la ligne.
- **Rechercher** — le champ de recherche en haut à droite porte sur tout ce que vous voyez.
- **Trier et filtrer** — cliquez sur un en-tête pour trier ; l'entonnoir sur l'en-tête filtre sur cette colonne. Pour les fourchettes et les combinaisons, voir [Filtrer et rechercher dans les listes](filteren-in-lijsten.md).
- **Exporter** — vers Excel ou CSV, filtres compris.
- **Imprimer** — avec **Imprimer la liste**, voir ci-dessous.

## Imprimer ou transmettre la liste

**Imprimer la liste** génère un pdf des dossiers que vous voyez à cet instant. L'impression suit donc vos filtres : ce que vous avez écarté n'y figure pas. L'en-tête du document indique la sélection utilisée et le nombre de dossiers ; le bas de chaque page reprend la date de génération et la pagination. Ainsi, la personne qui retrouve le pdf plus tard sait de quoi il s'agit.

L'impression n'est pas identique au tableau affiché à l'écran. Elle reprend les demandeurs, l'apporteur, la quotité, le statut, le montant du crédit, les remarques, l'introduction, la présence d'un expert désigné, la date d'effet et la date limite des conditions suspensives.

Dès que l'impression est prête, elle s'affiche dans une fenêtre d'aperçu offrant deux possibilités :

- **Envoyer par courriel** — une fenêtre de rédaction s'ouvre avec le pdf déjà en pièce jointe, sur la base de votre modèle général. Vous complétez vous-même les destinataires et adaptez le texte si nécessaire.
- **Télécharger** — vous conservez le pdf sur votre ordinateur.

!!! tip "Avec *Suivi après acte*, vous obtenez un autre aperçu"
    Lorsque la première liste de choix est sur **Suivi après acte**, le bouton **Imprimer la liste** génère l'aperçu propre à cette liste. Ce document est axé sur le suivi et reprend, par dossier, le numéro interne, le demandeur, l'investissement total, les fonds propres, le crédit demandé, le montant du crédit, l'introduction, la date d'effet, l'apporteur, le responsable, les remarques et l'institution.

## Des statuts qui apparaissent deux fois

Vous voyez un statut deux fois dans la liste de choix, dont un suivi de **(supprimé)** ? C'est qu'il existe dans vos données deux statuts portant le même nom : un ancien marqué comme supprimé, et un nouveau. Les deux portent encore des dossiers, ils restent donc tous deux sélectionnables — sinon vous ne retrouveriez plus une partie de vos dossiers. La mention indique clairement lequel des deux vous choisissez.
