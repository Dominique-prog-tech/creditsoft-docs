# E-mails par moment

Sur cet écran, vous déterminez quel e-mail votre client, l'**apporteur**, le **notaire**, l'**expert** ou l'**agence immobilière** reçoit lorsqu'un **contrat** ou le **dossier** reçoit un certain statut — par exemple un message indiquant que la demande a été introduite, ou que l'offre est disponible —, lorsque la **date de l'acte** est complétée, lorsqu'une **partie est désignée**, lorsqu'une **date limite** approche, pendant la durée du crédit : avant une **révision du taux** et à l'**anniversaire de l'acte**, ou lorsque vous **arrêtez un schéma de commission** ou **récupérez une commission**.

![L'écran E-mails par moment : une liste avec pour chaque moment les colonnes Quand, Statut, À, Texte et Comment, avec par exemple Un contrat reçoit le statut Introduit, aux demandeurs, en mode Proposer.](../images/mail-momenten-fr.png "Les e-mails par moment de votre bureau")

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Administration**, puis sur la tuile **E-mails par moment** (sous *Communication*).

## Configurer un moment

Avec **Nouveau moment** — ou un double-clic sur un moment existant — la fenêtre s'ouvre.

![La fenêtre Modifier le moment : les champs Quand (Un contrat reçoit le statut), Statut (Offre de crédit signée), À (Les demandeurs) et Texte, avec le lien Adapter le texte, et en dessous le choix Comment : Proposer ou Automatique.](../images/mail-momenten-venster-fr.png "Quand, quel texte et comment")

| Champ | Utilité |
|---|---|
| **Quand** | *Un contrat reçoit le statut* ou *Le dossier reçoit le statut* — si votre bureau travaille avec des statuts de contrat, choisissez le premier. Ou *La date de l'acte est complétée* : voir [La date de l'acte](#la-date-de-lacte). Ou *Une partie est désignée* : voir [Lors d'une désignation](#lors-dune-designation). Ou *La date limite de l'offre approche* ou *… de l'acte approche* : voir [Lors d'une date limite](#lors-dune-date-limite). Ou *La révision du taux d'un contrat approche* ou *L'acte a son anniversaire* : voir [Pendant la durée du crédit](#pendant-la-duree-du-credit). Ou *Un schéma de commission est arrêté* ou *Une commission est récupérée* : voir [Lors d'une commission](#lors-dune-commission). |
| **Statut** | Le statut auquel l'e-mail part. |
| **À** | *Les demandeurs* ou *L'apporteur* du dossier : voir [À l'apporteur](#a-lapporteur). Ou *Le notaire*, *L'expert* ou *L'agence immobilière* : voir [À un notaire, un expert ou une agence immobilière](#a-un-notaire-un-expert-ou-une-agence-immobiliere). |
| **Texte** | L'e-mail lui-même. Avec *Nouveau texte*, vous recevez un texte standard ; avec **Adapter le texte**, vous l'adaptez sous [Modèles d'e-mail](../administration/mail-templates.md). |
| **Comment** | **Proposer** : après *Enregistrer*, l'e-mail s'ouvre, complété, et vous l'envoyez vous-même. **Automatique** : l'e-mail part tout de suite. |

**Proposer** est le choix prudent : vous voyez d'abord l'e-mail. En mode **Automatique**, il part dès l'enregistrement, même si vous avez cliqué le statut par erreur.

## Ce qui se passe à l'enregistrement

Si vous enregistrez un contrat ou un dossier et qu'il reçoit un statut pour lequel un moment existe :

- l'e-mail est envoyé à qui figure sous **À** : **les demandeurs ayant une adresse e-mail**, **l'apporteur**, ou une **partie** du dossier ;
- il part **au maximum une fois** par contrat ou dossier — si vous remettez le statut puis le rétablissez, aucun deuxième ne suit ;
- il figure ensuite dans le **courrier** du dossier.

Enregistrer un dossier sans modifier son statut n'envoie rien. En mode *Proposer*, l'e-mail ne compte comme envoyé que lorsque vous l'envoyez réellement : si vous fermez la fenêtre, un changement suivant le proposera à nouveau.

## À l'apporteur

Choisissez sous **À** *L'apporteur* pour tenir l'apporteur du dossier informé : par exemple lorsque le dossier est introduit,
ou lorsque la date de l'acte est connue.

- L'apporteur ne reçoit l'e-mail **que si *E-mails par moment* est coché sur sa fiche** (bloc *Agrément et statut*, voir
  [Apporteurs](../crm/contributors.fr.md#agrement-et-statut)). Vous choisissez ainsi, apporteur par apporteur, qui reçoit ces
  messages. Si la case n'est pas cochée, rien ne part et aucun message n'apparaît.
- Si la case est cochée mais que l'apporteur n'a pas d'adresse e-mail, l'écran signale après *Enregistrer* que l'e-mail n'a pas pu partir.
- L'e-mail est rédigé dans la **langue des documents** de l'apporteur. Si elle n'est pas remplie, dans la langue de votre bureau.
- Avec *Nouveau texte*, vous recevez un texte standard pour l'apporteur : il mentionne le dossier et le client qu'il a apporté.

Pour envoyer, à un même moment, un e-mail au client et à l'apporteur, créez **deux moments** : l'un aux demandeurs, l'autre à
l'apporteur, chacun avec son propre texte.

## À un notaire, un expert ou une agence immobilière

Choisissez sous **À** *Le notaire*, *L'expert* ou *L'agence immobilière* pour écrire à une partie du dossier, par exemple au notaire
lorsque l'offre est disponible. Il s'agit des parties de l'onglet [Parties](../credit-management/credit-files.fr.md#parties) du
dossier.

- L'e-mail est envoyé à la partie de ce type qui est **désignée**. Si plusieurs sont désignées, elles figurent ensemble sous *À*. Si
  aucune n'est désignée, il est envoyé à toutes les parties de ce type.
- L'adresse est celle de la **personne de contact** sur la partie, sinon celle de la fiche du notaire, de l'expert ou de l'agence
  immobilière.
- L'e-mail est rédigé dans la **langue des documents** de ce professionnel, avec une formule d'appel neutre. Si elle n'est pas
  remplie, dans la langue de votre bureau.
- S'il n'y a aucune partie de ce type sur le dossier, ou si elle n'a d'adresse e-mail nulle part, l'écran signale après
  *Enregistrer* que l'e-mail n'a pas pu partir.
- Avec *Nouveau texte*, vous recevez un texte standard qui mentionne le dossier, le client et le statut.

## Lors d'une désignation

Si vous choisissez sous **Quand** *Une partie est désignée*, vous choisissez à côté **quelle partie** : notaire, expert ou agence
immobilière. L'e-mail part lorsque quelqu'un coche la case **Désigné** dans l'onglet *Parties* du dossier, aussi pour une nouvelle
partie enregistrée directement avec la case cochée.

- Si vous choisissez le même type sous **À**, l'e-mail est envoyé uniquement à la partie qui vient d'être désignée. Vous demandez
  ainsi une expertise dès que vous désignez l'expert : avec *Nouveau texte*, vous recevez un texte standard pour cela, avec
  l'adresse du bien.
- L'e-mail part **au maximum une fois par partie**. Si vous décochez puis cochez à nouveau la case, aucun deuxième ne suit.
- Sous **À**, vous pouvez aussi choisir *Les demandeurs*, pour informer votre client que le notaire ou l'expert est désigné.

## La date de l'acte

Si vous choisissez sous **Quand** *La date de l'acte est complétée*, l'e-mail part lorsque quelqu'un complète le champ *Date de
l'acte* sur le dossier, avec une date d'aujourd'hui ou plus tard. Il n'y a pas de statut à choisir.

- Une date **déplacée** n'envoie pas de nouvel e-mail : le message indiquant que la date est connue est déjà parti.
- Une date **dans le passé** n'envoie rien : c'est un acte déjà passé, pas une nouvelle.

## Lors d'une date limite

Si vous choisissez sous **Quand** *La date limite de l'offre approche* ou *La date limite de l'acte approche*, vous indiquez combien de **jours avant** l'e-mail part (7 par défaut). Il s'agit des champs *Date limite offre* et *Date limite acte* du dossier.

![La fenêtre Modifier le moment pour une date limite : Quand est réglé sur La date limite de l'offre approche, avec à côté Jours avant 7 ; sous Comment, il est indiqué que l'e-mail part automatiquement, chaque matin à 6 h.](../images/mail-momenten-termijn-fr.png "Un e-mail quelques jours avant la date limite")

Un tel e-mail part toujours **automatiquement**, chaque matin à 6 h :

- uniquement pour un dossier **en cours**, et tant que la date n'est pas dépassée ;
- plus du tout si l'étape est franchie : pour l'offre si elle est signée (date de signature, *Offre signée envoyée*, ou l'acte est passé), pour l'acte s'il est passé ;
- **une fois par date** : si la date limite est prolongée, un nouvel e-mail suit pour la nouvelle date.

## Lors d'une commission

Avec *Un schéma de commission est arrêté* et *Une commission est récupérée*, vous prévenez le bureau à qui revient la commission,
sans devoir écrire vous-même un e-mail. Le bureau peut alors adapter ses propres paiements à ses courtiers.

- L'e-mail est envoyé au **bénéficiaire de la commission** : le bureau ou le courtier qui reçoit la commission de ce schéma, même
  si le dossier est au nom de quelqu'un d'autre. La case *E-mails par moment* sur sa fiche n'est pas nécessaire pour cela.
- *Arrêté* part lorsque vous arrêtez un schéma dans l'onglet [Schémas de commission](../credit-management/credit-files.md#schemas-de-commission) d'un dossier.
  *Récupérée* part lorsque vous traitez une récupération dans la liste [Récupérations à confirmer](../credit-management/commission-clawback.md),
  ou lorsque vous activez un schéma au montant négatif.
- Lors de l'arrêt ou de l'activation figure la case **Prévenir le bureau**, avec le nom et l'adresse e-mail du destinataire.
  Si vous remplacez simplement un schéma par un nouveau, décochez-la : rien ne part cette fois-là.
- L'e-mail mentionne le dossier, le client, la date d'arrêt, le motif que vous avez indiqué, ce que le bureau a déjà reçu sur ce
  dossier (selon les bordereaux), pour une récupération le montant, et les courtiers auxquels le bureau reverse encore une
  commission sur ce dossier.
- Il part **au plus une fois par schéma**, et figure ensuite dans les **e-mails** du dossier.

## Pendant la durée du crédit

Deux moments envoient un e-mail à votre client après la passation de l'acte, aux mêmes moments que les [signaux de gestion](beheersignalen.md) qui créent une tâche pour vos collaborateurs :

- **La révision du taux d'un contrat approche** : autant de **jours avant** que vous l'indiquez (60 par défaut), avant la prochaine révision d'un contrat à taux variable. Au maximum un e-mail par révision.
- **L'acte a son anniversaire** : à l'anniversaire de l'acte, chaque année tant que le crédit court. Un moment créé aujourd'hui n'envoie rien pour les anniversaires passés. Si la tournée n'a pas eu lieu un jour, l'e-mail part encore au plus 7 jours plus tard.

![La fenêtre Modifier le moment pour une révision du taux : Quand est réglé sur La révision du taux d'un contrat approche, avec à côté Jours avant 60 ; sous À, il est indiqué que les demandeurs reçoivent chacun un e-mail personnel avec un lien de désinscription, sous Texte qu'il s'agit d'un e-mail commercial, et sous Comment que l'e-mail part automatiquement, chaque matin à 6 h.](../images/mail-momenten-klantsignaal-fr.png "Un e-mail au client, bien avant la révision du taux")

Ce sont des **e-mails commerciaux**, et des règles plus strictes s'appliquent donc que pour les autres moments :

- Ils partent toujours **automatiquement**, chaque matin à 6 h, et uniquement pour un **crédit en cours**.
- Ils vont uniquement aux **demandeurs**, et **chaque demandeur reçoit son propre e-mail**, avec sa formule d'appel et dans sa langue des documents.
- Sous chaque e-mail figure un **lien de désinscription**. Qui clique dessus reçoit sur sa [fiche de relation](../crm/relations.md) la coche *Pas d'e-mail groupé* et ne reçoit plus ces e-mails ni vos e-mails groupés.
- Qui porte déjà cette coche, ou dont l'adresse est marquée comme non valable, ne reçoit rien. Deux demandeurs avec la même adresse reçoivent ensemble un seul e-mail.
- Si votre environnement ne laisse partir aucun e-mail (une démo ou une formation), rien ne part.

Avec *Nouveau texte*, vous obtenez un texte standard qui s'adresse au client avec sa formule d'appel et l'invite à revoir ensemble le prêt et les assurances. Pour la révision, `{{moment.termijn}}` contient la date de la révision ; pour l'anniversaire, l'anniversaire lui-même.

!!! tip "Variables pour ces textes"
    Dans le texte, vous pouvez notamment utiliser `{{client.firstnames}}` (les prénoms des clients), `{{file.applicants}}` (les noms des demandeurs), `{{file.institution}}` (l'institution de crédit — pour un moment de contrat, celle du contrat), `{{file.amount}}`, `{{file.number}}`, `{{file.deeddate}}` (la date de l'acte), `{{moment.status}}` (le statut qui a déclenché l'e-mail) et `{{moment.termijn}}` (la date limite, pour une échéance). Dans un e-mail à l'apporteur ou à une partie, `{{recipient.name}}` désigne son nom et `{{recipient.greeting}}` la formule d'appel. Pour le bien et les parties : `{{property.address}}` (l'adresse du bien), `{{notary.name}}`, `{{notary.email}}` et `{{notary.phone}}`, et de même avec `valuator` pour l'expert et `realestate` pour l'agence immobilière.
