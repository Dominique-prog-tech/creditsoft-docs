# Adresses d'envoi

Les adresses d'envoi sont les **adresses e-mail utilisées comme expéditeur** lorsque CreditSoft envoie des e-mails. Vous en constituez ici une courte liste et vous en désignez une comme **adresse par défaut**. L'envoi lui-même passe par la connexion e-mail sécurisée avec ADM One.

![L'écran Adresses d'envoi dans CreditSoft : en haut un encadré indiquant l'adresse standard d'ADM One et les domaines autorisés, en dessous un interrupteur pour bloquer les e-mails sortants, puis un tableau avec les colonnes Nom de l'expéditeur, Adresse e-mail et Par défaut.](../images/verzendadressen-fr.png "Les adresses avec lesquelles CreditSoft envoie vos e-mails")

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Administration**, puis sur la tuile **Adresses d'envoi** (sous *Communication*). En haut de l'écran, le lien **← Retour à l'administration** vous ramène à l'aperçu.

## Pourquoi c'est important

Tant que vous ne désignez pas d'adresse d'envoi, CreditSoft ne peut envoyer aucun e-mail. C'est voulu : sans votre propre adresse, vos e-mails partiraient de l'adresse de votre fournisseur de logiciel, et un aperçu de dossier arriverait chez un notaire au nom de quelqu'un d'autre que votre bureau.

Désignez donc **une adresse comme adresse par défaut**. Tous vos e-mails partiront alors de celle-ci — y compris depuis des modèles où aucun expéditeur n'est renseigné.

## La liste

Le tableau indique, par adresse d'envoi, le **nom de l'expéditeur**, l'**adresse e-mail** et s'il s'agit de l'adresse **par défaut**.

- **Définir par défaut** — cliquez sur ce bouton dans la colonne *Par défaut*. Il n'y a jamais plus d'une adresse par défaut ; la précédente perd automatiquement cette mention.
- **Rechercher** — utilisez le champ de recherche.
- **Exporter** — exportez la liste vers Excel ou CSV.
- **Nouveau / modifier** — cliquez sur **Nouveau**, ou **double-cliquez** une ligne pour la modifier.
- **Supprimer** — une adresse d'envoi est **archivée**, et non définitivement effacée.

## Ajouter ou modifier une adresse d'envoi

Une adresse d'envoi comporte deux champs, tous deux **obligatoires** (signalés par un astérisque rouge) :

- **Adresse e-mail** — l'adresse qui apparaît comme expéditeur, par exemple `info@votrebureau.be`.
- **Nom de l'expéditeur** — le nom que le destinataire verra comme expéditeur, par exemple *Bureau de courtage Exemple*.

Complétez les champs et cliquez sur **Enregistrer**. La suppression se fait dans ce même écran de modification.

## Utiliser votre propre domaine

En haut de l'écran, deux informations apparaissent : l'**adresse standard d'ADM One** et les **domaines autorisés** pour votre plateforme.

Pendant que vous saisissez une adresse, CreditSoft vérifie le domaine par rapport à cette liste :

- **Vert** — le domaine est enregistré. Les e-mails de cette adresse partiront au nom de votre bureau.
- **Orange** — le domaine n'est pas encore enregistré. Vous pouvez enregistrer et utiliser l'adresse, mais la distribution pourrait s'interrompre plus tard.

Pour envoyer depuis votre propre domaine, **adressez-en la demande à votre personne de contact chez ADM**. Nous nous chargeons de l'enregistrement ; vous n'avez rien à configurer vous-même. Dès que le domaine est enregistré, il apparaît ici parmi les domaines autorisés et le contrôle passe au vert.

## Bloquer les e-mails sortants

L'interrupteur **Bloquer les e-mails sortants pour cet environnement** retient tous les e-mails sortants. Utilisez-le sur les environnements de **démonstration et de formation** : rien ne peut alors partir par erreur vers un destinataire réel. Toute tentative d'envoi affiche un message clair et l'e-mail n'est pas envoyé.

Sur votre propre environnement de travail, laissez cet interrupteur désactivé.

## Erreurs fréquentes

!!! warning
    **Compléter une adresse n'équivaut pas à la désigner par défaut.** Si une adresse figure dans la liste sans qu'aucune ne soit désignée par défaut, et que votre modèle d'e-mail ne renvoie pas non plus à un expéditeur, l'envoi reste impossible. Vérifiez dans la colonne *Par défaut* qu'une adresse y est bien signalée en vert.

    **Un avertissement orange n'est pas un blocage, mais ne l'ignorez pas.** Votre e-mail part encore aujourd'hui, mais tant que le domaine n'est pas enregistré, la distribution peut s'interrompre plus tard. Demandez l'enregistrement dès que vous mettez l'adresse en service.

## Voir aussi

- [Modèles d'e-mail](mail-templates.md) — vous y choisissez un expéditeur par modèle ; celui-ci prime sur l'adresse par défaut.
- [Suivi des e-mails](mail-monitoring.md) — vous y suivez si vos e-mails ont effectivement été distribués.
