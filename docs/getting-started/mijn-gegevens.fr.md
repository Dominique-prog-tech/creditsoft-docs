# Mes données

Sous **Mes données**, vous gérez votre propre fiche de collaborateur : comment vos collègues vous joignent,
quelle couleur vous recevez dans l'agenda et ce qui figure au bas de vos e-mails. Vous n'avez pas besoin d'un
administrateur pour cela.

Vous ouvrez l'écran via votre **avatar** en haut à droite → **Toutes les préférences…**

![L'écran Mes données avec trois blocs : Contact avec téléphone, GSM, représentation et une couleur d'agenda choisie, en dessous Signature d'e-mail avec une barre de mise en forme et une signature remplie, et en bas Sécurité avec les boutons Changer le mot de passe et Vérification en deux étapes.](../images/mijn-gegevens-fr.png "Votre propre fiche de collaborateur"){ .volle-breedte }

## Contact

- **Téléphone** et **GSM** — les numéros auxquels vos collègues vous joignent.
- **Représentation** — qui vous représentez, ou au nom de qui vous agissez.
- **Couleur dans l'agenda** — la couleur sous laquelle vos rendez-vous apparaissent dans
  l'[agenda](../crm/meetings.md). Choisissez-en une dans la liste, ou laissez le champ vide : CreditSoft en
  choisit alors une lui-même.

- **Agenda à partir de** et **Agenda jusqu'à** — les heures d'ouverture de l'[agenda](../crm/meetings.md). Si
  vous les laissez vides, le réglage de votre bureau s'applique. Si un rendez-vous tombe en dehors de ces
  heures, l'agenda élargit l'affichage ce jour-là : vous ne perdez donc rien de vue en resserrant vos heures.

!!! tip "Pourquoi mieux vaut choisir cette couleur vous-même"
    Si vous laissez le champ vide, CreditSoft attribue les couleurs par ordre alphabétique. Qu'un collègue
    arrive et se classe avant vous, et toutes les couleurs se décalent : du jour au lendemain, la vôtre a
    changé. En choisissant vous-même, elle vous reste acquise.

## Signature d'e-mail

Ce que vous saisissez ici apparaît au bas des e-mails que vous envoyez depuis CreditSoft — par exemple depuis
le [Courrier](../journaal/mailverkeer.md) d'un dossier. Vous mettez le texte en forme avec les boutons de
mise en forme situés au-dessus.

## Associer l'agenda { #agenda-koppelen }

Avec le bloc **Associer l'agenda**, vous placez vos rendez-vous CreditSoft dans votre propre agenda Outlook. Vous ne
voyez ce bloc que si votre bureau l'autorise, avec la case de la [fiche d'entreprise](../administration/company-profile.md#agenda-koppelen).

1. Cliquez sur **Associer à Microsoft 365**.
2. Vous arrivez chez Microsoft. Connectez-vous avec le compte de votre agenda et donnez votre accord.
3. Vous revenez sur Mes données, avec le message *Votre agenda est associé*.

Vos rendez-vous apparaissent dans un **agenda distinct nommé CreditSoft**, à côté de votre propre agenda. Il s'agit
des rendez-vous dont vous êtes responsable, du mois écoulé jusqu'à douze mois à l'avance. Pour chaque rendez-vous, le
titre, le nom du client, le lieu et un lien sont transmis. Les numéros de téléphone, les adresses e-mail et les
montants des dossiers ne le sont pas.

Une fois votre agenda associé, le bloc indique avec quel compte, quand a eu lieu la dernière synchronisation et
combien de rendez-vous figurent dans l'agenda. CreditSoft met l'agenda à jour tous les quarts d'heure. Avec
**Synchroniser maintenant**, vous le faites tout de suite. Avec **Dissocier**, la synchronisation s'arrête ; l'agenda
CreditSoft reste dans votre compte jusqu'à ce que vous le supprimiez vous-même.

!!! warning "Modifiez vos rendez-vous dans CreditSoft"
    L'association fonctionne dans un seul sens. Si vous modifiez un rendez-vous dans Outlook, la synchronisation
    suivante le rétablit tel qu'il figure dans CreditSoft.

!!! note "Microsoft demande l'approbation d'un administrateur"
    Si Microsoft indique qu'une approbation de l'administrateur est nécessaire, votre organisation n'autorise ce type
    d'association qu'avec l'accord de son administrateur informatique. Demandez-le d'abord, puis associez à nouveau.

Un message apparaît parfois dans le bloc :

- **Votre liaison ne fonctionne plus.** Votre accord chez Microsoft a expiré ou a été retiré. Cliquez sur
  **Associer à nouveau**.
- **CreditSoft ne trouve soudain plus aucun rendez-vous pour vous.** CreditSoft ne vide alors pas votre agenda
  sans plus. Si vous n'avez effectivement plus de rendez-vous, cliquez sur **Synchroniser quand même**.
- **Votre agenda n'a pas pu être mis à jour.** CreditSoft réessaie automatiquement.
- **Votre compte n'est pas encore prêt pour associer un agenda.** Adressez-vous à votre administrateur ou à
  ADM-Concept.
- **L'exportation est désactivée pour ce bureau.** Plus rien n'est alors envoyé vers votre agenda. Ce qui s'y
  trouvait déjà reste en place, mais n'est plus mis à jour.

Si votre agenda associé n'est plus mis à jour, c'est aussi indiqué en haut de l'[agenda](../crm/meetings.md).

## Ce que vous ne pouvez pas modifier ici

**Vos nom, adresse e-mail et fonction** n'y figurent pas. Ils sont gérés de manière centrale — ils relèvent de
votre compte et du registre des utilisateurs, pas de vos préférences. Si quelque chose ne va pas, demandez-le à
votre administrateur ; il l'ajuste sous [Utilisateurs](../administration/users.md).

La case qui détermine si vous apparaissez dans les listes de choix ne figure pas ici non plus, et c'est
délibéré. C'est une décision de visibilité pour toute l'organisation, et elle revient à l'administrateur.

!!! note "Pas encore de fiche ?"
    Si vous voyez le message indiquant qu'aucune fiche de collaborateur n'est liée à votre compte, c'est que
    votre fiche personnelle n'existe pas encore. Demandez à votre administrateur d'en créer une ; cet écran
    sera ensuite immédiatement à votre disposition.

## Sécurité

En bas de l'écran figurent deux boutons qui mènent aux réglages de votre compte :
**[Changer le mot de passe](wachtwoord.md)** et **[Vérification en deux étapes](tweestapsverificatie.md)**.

Ce bloc reste présent même lorsqu'aucune fiche de collaborateur n'est encore liée à votre compte — votre mot
de passe et votre vérification en deux étapes relèvent en effet de votre compte, et non de votre fiche.

## Enregistrer

En bas à droite figurent **Enregistrer** et **Annuler**. Annuler vous ramène au tableau de bord sans conserver
vos modifications.

Si aucune fiche de collaborateur n'est encore liée à votre compte, seul **Annuler** y figure : il n'y a alors
rien à enregistrer, mais vous pouvez quitter l'écran.

## Voir aussi

- [Vos préférences](voorkeuren.md) — langue, couleurs et taille de l'affichage
