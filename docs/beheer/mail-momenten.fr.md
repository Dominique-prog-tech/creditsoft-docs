# E-mails par moment

Sur cet écran, vous déterminez quel e-mail votre client reçoit lorsqu'un **contrat** ou le **dossier** reçoit un certain statut — par exemple un message indiquant que sa demande a été introduite, ou que l'offre est disponible.

![L'écran E-mails par moment : une liste avec pour chaque moment les colonnes Quand, Statut, Texte et Comment, avec par exemple Un contrat reçoit le statut Introduit, en mode Proposer.](../images/mail-momenten-fr.png "Les e-mails par moment de votre bureau")

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Administration**, puis sur la tuile **E-mails par moment** (sous *Communication*).

## Configurer un moment

Avec **Nouveau moment** — ou un double-clic sur un moment existant — la fenêtre s'ouvre.

![La fenêtre Modifier le moment : les champs Quand (Un contrat reçoit le statut), Statut (Offre de crédit signée) et Texte, avec le lien Adapter le texte, et en dessous le choix Comment : Proposer ou Automatique.](../images/mail-momenten-venster-fr.png "Quand, quel texte et comment")

| Champ | Utilité |
|---|---|
| **Quand** | *Un contrat reçoit le statut* ou *Le dossier reçoit le statut*. Si votre bureau travaille avec des statuts de contrat, choisissez le premier. |
| **Statut** | Le statut auquel l'e-mail part. |
| **Texte** | L'e-mail lui-même. Avec *Nouveau texte*, vous recevez un texte standard ; avec **Adapter le texte**, vous l'adaptez sous [Modèles d'e-mail](../administration/mail-templates.md). |
| **Comment** | **Proposer** : après *Enregistrer*, l'e-mail s'ouvre, complété, et vous l'envoyez vous-même. **Automatique** : l'e-mail part tout de suite. |

**Proposer** est le choix prudent : vous voyez d'abord l'e-mail. En mode **Automatique**, il part dès l'enregistrement, même si vous avez cliqué le statut par erreur.

## Ce qui se passe à l'enregistrement

Si vous enregistrez un contrat ou un dossier et qu'il reçoit un statut pour lequel un moment existe :

- l'e-mail est envoyé **aux demandeurs ayant une adresse e-mail** ;
- il part **au maximum une fois** par contrat ou dossier — si vous remettez le statut puis le rétablissez, aucun deuxième ne suit ;
- il figure ensuite dans le **courrier** du dossier.

Enregistrer un dossier sans modifier son statut n'envoie rien. En mode *Proposer*, l'e-mail ne compte comme envoyé que lorsque vous l'envoyez réellement : si vous fermez la fenêtre, un changement suivant le proposera à nouveau.

!!! tip "Variables pour ces textes"
    Dans le texte, vous pouvez notamment utiliser `{{client.firstnames}}` (les prénoms des clients), `{{file.institution}}` (l'institution de crédit — pour un moment de contrat, celle du contrat), `{{file.amount}}`, `{{file.number}}` et `{{moment.status}}` (le statut qui a déclenché l'e-mail).
