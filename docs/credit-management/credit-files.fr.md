# Dossiers de crédit

Le dossier de crédit est le cœur de CreditSoft. Tout ce qui se rapporte à une demande de crédit — les demandeurs, le bien, les contrats, les parties concernées et les documents demandés — figure au même endroit, sur une seule page.

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Crédit**, puis sur **Dossiers de crédit**.

## La liste

![La liste des dossiers de crédit : en haut les filtres par statut et par apporteur avec le nombre de dossiers trouvés, en dessous le tableau indiquant par dossier la référence de l'apporteur, le statut, le montant du crédit, le demandeur, l'apporteur, l'institution, la date de dépôt et la date d'effet.](../images/kredietdossiers-lijst-fr.png "Tous les dossiers de crédit du bureau"){ .volle-breedte }

Par dossier, vous voyez qui en fait la demande, par qui il passe et où il en est :

| Colonne | Ce qu'elle affiche |
|---|---|
| **N° de dossier** | Le numéro interne du dossier |
| **Statut** | Où en est le dossier |
| **Montant du crédit** | Le montant effectivement accordé |
| **Demandeur** | Tous les demandeurs du dossier, à la suite |
| **Apporteur** | L'apporteur par lequel le dossier est arrivé |
| **Institution** | L'institution de crédit |
| **Date de dépôt** | Quand le dossier a été introduit |
| **Date d'effet** | Quand le crédit prend effet |

Via le **sélecteur de colonnes**, vous en ajoutez cinq autres : *Crédit demandé*, *Investissement total*, *Fonds propres*, *Quotité* et *Bien*. Elles sont masquées par défaut, car tous les bureaux ne les remplissent pas. Votre choix est mémorisé pour la fois suivante.

### Créer un dossier

Avec **Nouveau dossier** en haut de la liste, vous créez un dossier vide. Le statut de départ varie d'un bureau à l'autre : CreditSoft le demande donc une fois plutôt que de le deviner. La liste ne propose que les statuts **en usage** ; ceux que vous avez retirés n'y figurent pas.

!!! tip "Configurez-le une fois et la question disparaît"
    Si vous fixez le statut de départ sous **Administration → Phases du tableau de bord**, il n'est plus demandé et un nouveau dossier s'ouvre directement comme fiche.

!!! note "Configurez d'abord vos statuts"
    Si vous n'avez pas encore configuré de statuts de dossier, CreditSoft le signale et ne crée pas de dossier. Configurez-les d'abord dans **Listes de choix**.

### Rechercher et filtrer

- **Rechercher** — le champ de recherche porte sur toutes les colonnes **visibles**. Si vous activez une colonne via le sélecteur, la recherche s'y applique aussitôt.
- **Statut** et **Apporteur** — les deux listes de choix du haut. Elles n'affichent que ce qui figure dans vos dossiers, donc aucun statut sans dossier.
- **Par date** — les colonnes **Date de dépôt** et **Date d'effet** se filtrent via l'entonnoir sur l'en-tête de colonne, ou via le constructeur de filtres pour une plage telle que « entre le 1er janvier et le 30 juin ». Voir [Filtrer et rechercher dans les listes](filteren-in-lijsten.md).
- **Depuis le tableau de bord** — si vous arrivez depuis une phase du tableau de bord, la liste est déjà filtrée. Le filtre actif s'affiche en haut, avec un bouton **Effacer le filtre** à côté.
- **Exporter** — vers Excel ou CSV, avec les filtres actifs à ce moment-là. L'export suit la langue de votre écran.

**[Journal](../journaal/overzicht.md)** — cliquez à droite sur le rail **Journal** pour consulter les [tâches](../journaal/taken.md), [notes](../journaal/notities.md), les appels, [pièces jointes](../journaal/bijlagen.md), le [courrier](../journaal/mailverkeer.md), les schémas de commission et l'[historique](../journaal/logboek.md) du dossier sélectionné sans l'ouvrir.

**Double-cliquez** une ligne pour ouvrir le dossier.

## Le dossier

![Un dossier de crédit ouvert : en haut le bloc principal avec le statut, le numéro interne, le propriétaire et le responsable commercial sous forme de listes déroulantes, l'institution financière, l'apporteur, le montant du crédit avec la case Retenir à côté et la date d'acte, et à droite les boutons Enregistrer, Annuler, Aperçu d'impression et Supprimer. En dessous, à gauche les dates, le type de dossier, la valeur estimée et la quotité avec les cases Afficher dans le tableau de bord et Offre signée envoyée ainsi que le champ Remarques internes ; à droite les contrats et en bas les onglets Parties, Remarques et Documents demandés avec le compteur 4/4.](../images/kredietdossier-fiche-fr.png "Le dossier de crédit : tout sur une seule page"){ .volle-breedte }

Le dossier tient sur une seule page. En haut, le bloc principal reprend les données dont vous avez le plus souvent besoin ; en dessous, les dates et le bien à gauche, les contrats à droite. En bas à droite, **Parties**, **Remarques** et **Documents demandés** figurent côte à côte sous forme d'onglets — trois listes qui partagent le même emplacement, pour que vous puissiez les atteindre toutes les trois sans faire défiler la page.

### Données du dossier

Le bloc d'en-tête porte ce dont vous avez le plus souvent besoin : numéro interne, **propriétaire**, **sales**, **statut**, institution financière, apporteur, le montant du crédit avec la case *Retenir*, et la date de l'acte.

Dans la carte en dessous à gauche figurent le but, le type de dossier, la quotité et les dates clés : introduction, approbation, signature de l'offre et date limite des conditions suspensives.

!!! tip "Un montant vide reste vide"
    Si vous laissez un montant non renseigné, il reste vide — il ne devient pas 0 €. La distinction compte : pour un dossier sans montant de crédit, vous voyez qu'il n'est pas encore connu, et non qu'il serait nul.

**Propriétaire** et **Sales** sont des listes déroulantes de vos collaborateurs. Vous pouvez y taper pour rechercher, et la croix vide à nouveau le champ.

Trois cases méritent votre attention :

- **Retenir** — à côté du montant de commission : détermine si la commission de ce dossier est retenue.
- **Afficher dans le tableau de bord** — fait entrer ce dossier dans le comptage des phases du tableau de bord.
- **Offre signée envoyée** — vous avez transmis l'offre signée.

En bas du bloc figure **Remarques internes** : un champ de texte libre pour vos propres notes sur ce dossier. C'est autre chose que l'onglet *Remarques*, où chaque ligne porte l'auteur et la date.

### Bien

Sur la fiche elle-même figure la **valeur estimée**, avec la quotité à côté.

Le reste du bien se trouve derrière le bouton **Fiche d'investissement & bien…** : l'adresse du bien, le type de bien, la date de validité du PEB et la case **Libre choix de l'assurance incendie**. Dans cette même fenêtre, vous établissez le calcul d'investissement complet — achat, construction neuve, rénovation, frais de notaire, inscription hypothécaire et tous les autres postes, avec en bas l'**investissement total** et l'**apport propre**.

### Demandeurs de crédit

Qui demande le crédit. Rattachez une relation existante avec **+ Rattacher un demandeur**, puis complétez pour chacun l'employeur et le revenu mensuel net.

### Contrats

Les contrats de crédit rattachés à ce dossier. La liste affiche le numéro, le produit, le statut, le montant, la durée, le taux d'intérêt et l'institution ; la charge mensuelle et la date de début se trouvent sur le contrat lui-même.

La fenêtre du contrat s'adapte au **type de produit** : pour un crédit ordinaire elle demande le type de produit, le taux, la variabilité et la charge mensuelle ; pour une assurance solde restant dû s'y ajoutent la prime, le type et la périodicité, ainsi que la désignation des personnes assurées.

### Parties

Les professionnels concernés — agence immobilière, notaire, expert ou comptable. Pour chaque partie, vous suivez si elle est **désignée** et si le **rapport a été reçu**, avec les dates et coordonnées correspondantes.

### Garants, ASRD & réductions

Derrière le bouton **Garants, ASRD & réductions…**, trois listes sont réunies : les garants et prêteurs, les assurances solde restant dû (avec l'assureur, le pourcentage de capital assuré, le volet fiscal et fumeur) et les réductions accordées.

### Documents demandés

Le troisième onglet, à côté de *Parties* et *Remarques* : la liste des pièces que vous attendez de ce client.

Le titre porte **deux chiffres** — *Documents demandés (3/6)* signifie trois validés sur les six que vous demandez. Vous voyez ainsi l'état d'avancement du dossier sans ouvrir l'onglet. Le chiffre de gauche indique ce qui est **validé**, pas ce qui est arrivé : une pièce qu'il vous reste à contrôler ne compte pas comme en ordre.

La colonne **Statut** indique en un mot où en est chaque pièce : *Demandé* (rien reçu), *Reçu* (fourni, en attente de votre contrôle), *En ordre* (approuvé) ou *À renvoyer* (refusé, avec le motif à côté).

**Double-cliquez** une ligne pour l'évaluer. Vous voyez les fichiers envoyés par votre client, avec leur taille et l'heure ; la **loupe** ouvre un PDF sans devoir le télécharger. Ensuite, vous choisissez :

- **Approuver** — la pièce est en ordre et compte dans le compteur en haut.
- **Refuser** — vous indiquez un motif. Il est obligatoire : votre client le lit dans son portail et sait ainsi ce qui ne va pas. Par défaut, un e-mail part également avec un **nouveau lien vers le portail**, afin qu'il puisse fournir à nouveau immédiatement. Ce qu'il avait envoyé est conservé.

Si finalement vous ne demandez pas une pièce, **Supprimer** dans cette même fenêtre la retire de la liste. Elle part à la [corbeille](../administration/recycle-bin.md) et n'est donc pas définitivement effacée ; le compteur en haut en décompte une aussitôt.

### Le journal de ce dossier

Le bouton **Journal** en haut à droite, sur la ligne du numéro de dossier, ouvre un panneau à sept onglets : **Tâches**, **Notes**, **Appels**, **Pièces jointes**, **Schémas de commission**, **Courrier** et l'**Historique** — le tout pour ce dossier. Le panneau s'ouvre sur **Tâches** : ce qu'il reste à faire sur ce dossier.

#### Schémas de commission

Cet onglet indique, par apporteur, ce qui a été convenu pour ce dossier : le montant, la forme — étalé, par échéances ou montant fixe — et l'état. Si un dossier porte de nombreux schémas, ils sont regroupés par apporteur avec le total à côté ; cliquez sur un nom pour déplier les schémas en dessous.

![Le panneau Journal d'un dossier de crédit sur l'onglet Schémas de commission : en haut le nombre de schémas, un champ de recherche, le bouton Ajouter et un menu pour exporter ; en dessous le groupe par apporteur avec le nombre de schémas et le montant total, et à l'intérieur un schéma avec son montant, l'état Actif, la forme et la date de début, ainsi que les boutons Modifier, Recalculer et Arrêter.](../images/commissieschemas-journaal-fr.png "Les schémas de commission d'un dossier de crédit"){ .volle-breedte }

Au-dessus de la liste se trouve le bouton **Ajouter**. Il crée un nouveau schéma pour ce dossier : vous choisissez l'apporteur, le montant total de la commission, la date de début et la forme de paiement. Si vous choisissez *Étalé*, vous complétez la part payée immédiatement et le nombre de mois sur lequel le reste est réparti. Si vous choisissez *Paiements planifiés*, vous fixez vous-même les échéances : par échéance, combien de mois après la date de début et quel pourcentage de la commission totale. Un schéma peut porter jusqu'à 24 échéances, et leur somme ne doit pas nécessairement atteindre 100 %.

Un nouveau schéma est d'abord *pas encore actif* : rien n'est encore comptabilisé. Ce n'est qu'à l'activation que CreditSoft prépare les montants mensuels.

![La fiche d'un schéma de commission : en haut la section Données générales avec l'apporteur, la commission totale et la date de début, en dessous le choix du paiement entre étalé, paiements planifiés et montant fixe, ainsi qu'un champ pour une remarque ; en bas la section Échéances avec, par échéance, le mois et le pourcentage, un bouton pour ajouter une échéance et la ligne Total reprenant la somme des pourcentages.](../images/commissieschema-fiche-fr.png "Un schéma de commission avec des paiements planifiés"){ .volle-breedte }

À côté d'**Ajouter** se trouvent un champ de recherche — pratique sur un dossier qui porte de nombreux schémas — et un menu pour **exporter** la liste vers Excel ou CSV.

Ce que vous pouvez faire ensuite dépend de l'état du schéma :

- **Pas encore actif** — vous pouvez le **modifier** ou l'**activer**. CreditSoft prépare alors tous les montants mensuels en une fois, jusqu'à la fin de la durée. Tant que rien n'est payé, vous pouvez aussi le **supprimer**.
- **Actif** — vous pouvez le **modifier**, le **recalculer** ou l'**arrêter**. Si vous modifiez un schéma actif, CreditSoft recalcule immédiatement les mois qui ne sont pas encore payés. Le recalcul montre d'abord ce qui changerait : par mois l'ancien et le nouveau montant, combien de mois déjà payés restent inchangés, et le total après. Cela ne se produit qu'après votre confirmation.
- **Arrêté** — seule la date reste affichée ; la modification n'est plus possible. À l'arrêt, vous indiquez vous-même à partir de quelle date le schéma s'arrête, et pourquoi. À partir de ce mois, les mois non encore payés disparaissent ; ce qui précède ce mois reste.

!!! tip "Un rappel lors de l'enregistrement"
    Si vous enregistrez un dossier dont l'apporteur n'a pas encore de schéma de commission, un message vous
    le rappelle. Le dossier est enregistré normalement — c'est un rappel, pas un blocage. Si vous ne voyez pas ce
    message et souhaitez l'avoir, demandez à votre administrateur de l'activer ; il est désactivé par défaut, car
    tous les bureaux ne travaillent pas avec des schémas de commission.

!!! note "Ce qui est payé reste"
    Un mois qui a figuré sur un bordereau n'est plus modifié par aucune de ces actions — pas même lors d'un recalcul. Le total après un recalcul peut donc différer du montant du schéma. Ce n'est pas une erreur : le passé a été payé et rapporté.

    Pour la même raison, un schéma ne peut plus être supprimé dès qu'un mois a été payé. Si vous voulez malgré tout l'arrêter, utilisez **Arrêter**.

Sous *Courrier*, vous retrouvez l'invitation envoyée à votre client ainsi que l'e-mail concernant les pièces refusées, chacun avec son statut de livraison. Vous pouvez aussi y rédiger un courriel : le destinataire est alors déjà rempli avec le premier demandeur du dossier.

Le panneau flotte au-dessus de la fiche et la masque temporairement. Sur un écran large, cliquez l'**épingle** en haut à droite du panneau : la fiche se décale et les deux s'affichent côte à côte. Ce choix est mémorisé.

### Inviter votre client

Le bouton **Inviter le client**, au-dessus de la liste, envoie à votre client un e-mail contenant un **lien personnel**. Il y voit les pièces que vous demandez et les téléverse — sans mot de passe, sans compte.

Vous choisissez le destinataire parmi les demandeurs du dossier ; leur nom et leur adresse sont indiqués, et vous pouvez aussi saisir une autre adresse. Le courriel provient de votre modèle *Invitation portail client* et est **conservé dans le courrier de ce dossier**, afin que vous puissiez retrouver quand et à qui vous l'avez envoyé.

Si votre client n'a pas d'adresse e-mail, utilisez **Créer uniquement le lien** : le lien s'affiche et vous le transmettez vous-même, par téléphone par exemple.

Avec **Voir comme le client** à côté, vous ouvrez le portail dans un nouvel onglet, exactement tel que votre client le voit. Pratique pour vérifier ce que vous demandez avant d'envoyer l'invitation. Ce que vous y déposez arrive réellement sur le dossier — un bandeau jaune en haut vous le rappelle.

!!! warning "Le lien est nouveau à chaque fois"
    Une invitation n'est pas conservée et ne peut pas être récupérée — seule une empreinte l'est. Si vous en envoyez une deuxième, votre client reçoit un nouveau lien ; l'ancien continue de fonctionner jusqu'à son expiration.

Le bouton **Fichiers** vous permet de gérer les pièces jointes vous-même — pratique lorsqu'un document arrive par courrier ou par e-mail plutôt que via le portail. Le bouton **Ajouter un document** ajoute une pièce demandée à la liste.

!!! tip "Tout sur une seule liste"
    Si vous ne voulez pas vérifier dossier par dossier ce qui est arrivé, utilisez [Documents à valider](document-validation.md) : les mêmes actions, mais tous dossiers confondus, avec un compteur dans le menu.

!!! tip "Les documents que vous pouvez demander, c'est vous qui les déterminez"
    La liste dans laquelle vous choisissez se gère sous [Administration → Types de documents](../beheer/documenttypes.md). Chaque bureau demande d'autres pièces : cette liste est la vôtre.

### Remarques

L'onglet à côté de *Parties*. Vous y notez tout ce qui a été dit ou convenu sur ce dossier — un appel avec le client, un rendez-vous à la banque, une pièce que vous attendez encore. Chaque ligne porte son auteur et sa date.

## Impression

Le bouton **Aperçu d'impression** génère un pdf de ce dossier : les données, les demandeurs, les contrats et les remarques, surmontés de votre propre en-tête. Vous pouvez télécharger ce pdf ou l'envoyer directement par courriel.

Vous cherchez des chiffres portant sur **plusieurs** dossiers — par statut, par prêteur, par apporteur ou par responsable commercial ? Vous les trouverez sous [Rapports](reports.md).
