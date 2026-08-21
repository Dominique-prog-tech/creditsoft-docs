# Rendez-vous

L'agenda est **partagé** : chacun voit les rendez-vous de tous les collaborateurs, chacun dans sa propre couleur.

![L'agenda de CreditSoft en affichage semaine de travail : en haut la légende des couleurs avec six collaborateurs, en dessous la grille du lundi au vendredi qui commence à 8 heures, avec les rendez-vous sous forme de blocs colorés à leur heure.](../images/afspraken-week-fr.png "L'agenda partagé, chaque collaborateur dans sa propre couleur"){ .volle-breedte }

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **CRM**, puis sur **Rendez-vous**.

## Les couleurs

En haut figure une légende avec les collaborateurs. Chaque rendez-vous prend la couleur de son **responsable principal**, ce qui vous permet de voir d'un coup d'œil qui se trouve où.

Un collègue n'apparaît pas dans la légende ? C'est que la case **Afficher dans les listes de choix** est désactivée sur sa fiche de collaborateur. Cela se fait délibérément pour les personnes qui ont accès au programme mais ne travaillent pas sur les dossiers — un gérant, par exemple.

La liste déroulante **Tous les collaborateurs** en haut vous permet de n'en garder qu'un. Ce filtre voit plus large que la couleur : il affiche aussi les rendez-vous où cette personne figure comme responsable **supplémentaire**.

La pastille grise **Sans responsable** rassemble les rendez-vous issus de l'ancien programme dont on ne peut plus déterminer à qui ils appartenaient. Vous pouvez les ouvrir et y désigner quelqu'un après coup.

## Créer un rendez-vous

Cliquez sur une plage libre. Dans la fenêtre qui s'ouvre, vous renseignez :

- **Objet et description** — le sujet du rendez-vous.
- **Contact** — la relation que vous rencontrez.
- **Intermédiaire** — si le rendez-vous passe par un intermédiaire.
- **Lieu** — le bureau, chez le client, ou une adresse.
- **Responsables** — un responsable principal (qui détermine la couleur) et éventuellement des collègues supplémentaires.

![La fenêtre pour encoder un rendez-vous : titre, responsables, dates et heures de début et de fin, journée entière, récurrence, lieu, contact, intermédiaire, les deux cases pour la confirmation, et une description.](../images/afspraak-venster-fr.png "Tout ce qui concerne un rendez-vous, sur un seul écran")

## Envoyer une confirmation

Sous **Contact** et **Intermédiaire** figurent deux cases : **Confirmation au contact** et **Confirmation à l'intermédiaire**. Cochez-en une et enregistrez : la fenêtre de courriel s'ouvre avec la confirmation déjà remplie — le destinataire, l'objet avec la date, et un bloc indiquant quand et où le rendez-vous a lieu.

Le courriel ne part **pas tout seul**. Vous le relisez, ajoutez éventuellement une phrase, et l'envoyez vous-même. Si vous cochez les deux, le contact vient d'abord et l'intermédiaire ensuite.

!!! tip "Où retrouver la confirmation envoyée"
    Sur la fiche du contact ou de l'intermédiaire, sous **Journal → Courrier**. Vous y voyez ce qui a été envoyé exactement, avec la date et le destinataire.

Le texte lui-même se modifie dans **Gestion de la plateforme → Modèles d'e-mail**, modèle *Confirmation de rendez-vous*. Les espaces réservés `{{meeting.subject}}`, `{{meeting.date}}`, `{{meeting.from}}`, `{{meeting.to}}` et `{{meeting.location}}` sont remplis par CreditSoft avec les données du rendez-vous. Si vous préférez ne pas composer vous-même, utilisez `{{meeting.details}}` : c'est un bloc prêt à l'emploi indiquant quand et où.

## Modifier un rendez-vous

- **Déplacer** — glissez le rendez-vous vers un autre moment.
- **Modifier la durée** — tirez le bord inférieur ou supérieur.
- **Ouvrir** — double-cliquez sur le rendez-vous.

## Choisir l'affichage

En haut à droite, vous basculez entre jour, semaine de travail, semaine et mois. La semaine de travail affiche du lundi au vendredi et constitue l'affichage le plus pratique pour une semaine de bureau ordinaire.

## Les heures affichées

L'agenda s'ouvre de 8 à 18 heures. Si vous souhaitez d'autres heures, réglez-les vous-même dans [Mes données](../getting-started/mijn-gegevens.md) sous **Agenda à partir de** et **Agenda jusqu'à**. Si vous les laissez vides, le réglage de votre bureau s'applique.

Si un rendez-vous tombe en dehors de ces heures, l'agenda élargit l'affichage ce jour-là. Un rendez-vous matinal ou tardif reste donc visible, même s'il sort de vos propres heures.
