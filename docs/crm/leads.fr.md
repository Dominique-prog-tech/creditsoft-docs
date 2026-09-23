# Leads

Quelqu'un remplit votre formulaire de contact, téléphone, ou est recommandé par un client satisfait. C'est un **lead** : une demande émanant de quelqu'un qui n'est pas encore client. L'écran *Leads* retient qui a frappé à la porte, depuis combien de temps il attend, et qui assure le suivi.

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **CRM**, puis sur **Leads**.

## La liste

![L'écran Leads dans CreditSoft : une liste avec les colonnes nom, statut, attend depuis, source, apporteur, e-mail, téléphone, montant et suivi — un lead est arrivé via l'application mobile et porte le nom de son apporteur — avec en haut un filtre par statut et le bouton Nouveau lead.](../images/leads-lijst-fr.png "La liste de travail de vos entrées, celui qui attend le plus longtemps en tête")

La liste s'ouvre sur **celui qui attend le plus longtemps**, et non sur la dernière arrivée. Pour chaque lead, vous voyez : **nom**, **statut**, **attend depuis**, **source**, **apporteur**, **e-mail**, **téléphone**, **montant** et **suivi**.

- **Attend depuis** — le temps écoulé depuis l'arrivée de la demande, tant qu'il n'y a pas eu de contact. À partir de deux jours, la valeur passe au rouge. S'il y a eu contact, un tiret s'affiche : le chronomètre est arrêté.
- **Apporteur** — l'apporteur qui a transmis ce lead depuis l'application mobile. Vide pour un lead arrivé via votre site web ou saisi à la main.
- **Doublon possible** — cette étiquette à côté du nom signifie qu'un lead ouvert existait déjà pour la même personne à son arrivée. Voir [Leads d'un apporteur](#leads-dun-apporteur).
- **Suivi** — le collaborateur qui assure le suivi. Si **personne** apparaît en rouge, ce lead n'appartient à personne et il va rester en plan.
- **Filtre par statut** — en haut, vous choisissez tous les statuts ou un seul.
- **Rechercher** — le champ de recherche parcourt toutes les colonnes à la fois.
- **Choisir les colonnes** — affichez ou masquez des colonnes ; votre choix est mémorisé.
- **Exporter** — vers Excel ou CSV, avec les filtres actifs à ce moment-là.
- **Nouveau / modifier** — cliquez sur **Nouveau lead**, ou **double-cliquez** une ligne pour ouvrir la fiche.
- **Supprimer** — un lead est **archivé**, jamais effacé définitivement.

À côté de *Leads* dans le menu figure un compteur : le nombre de leads qui attendent encore un premier contact.

## Les cinq statuts

| Statut | Ce que cela signifie |
|---|---|
| **Nouveau** | Arrivé, personne n'a encore pris contact. |
| **Contacté** | Il y a eu contact. À partir d'ici, le chronomètre du temps d'attente s'arrête. |
| **Qualifié** | Une vraie demande avec une vraie chance — cela vaut la peine d'y consacrer du temps. |
| **Gagné** | Devenu client. |
| **Perdu** | Cela n'a rien donné. Notez pourquoi ; à la longue, cela se lit comme une tendance. |

Il n'y a délibérément pas davantage d'états. Un bureau de cinq personnes n'a pas besoin d'un entonnoir de vente à huit phases ; il a besoin que rien ne reste en plan.

## La fiche

Double-cliquez un lead pour ouvrir sa fiche. En haut figurent son nom, son statut et depuis combien de temps il attend.

![La fiche d'un lead dans CreditSoft : en haut le nom avec le statut Nouveau et la mention attend depuis 3 jours, en dessous les blocs Qui, La demande et Suivi.](../images/lead-fiche-fr.png "La fiche d'un lead : qui, ce qu'il a demandé, et qui assure le suivi"){ .volle-breedte }

La fiche comporte trois blocs.

### Qui

**Prénom**, **Nom**, **Société**, **E-mail** et **Téléphone**. Aucun de ces champs n'est obligatoire en soi, mais **au moins un** doit être complété — sans identification, un lead ne peut pas être suivi.

### La demande

- **Source** — d'où vient ce lead : *site web*, *téléphone*, *recommandation*, *Facebook*, ce que vous utilisez. Le champ propose ce que vous avez déjà saisi auparavant, afin que l'orthographe reste constante, mais vous pouvez saisir librement. Ainsi, la liste des sources reste celle de **votre** bureau, et non celle que nous aurions imaginée.
- **Montant** — le montant dont il est question, pour autant que vous le sachiez déjà.
- **Provenance** — si ce lead est arrivé via une connexion, celle-ci est indiquée ici. Ce champ n'est pas modifiable : c'est un constat, pas une saisie.
- **Apporté par** — uniquement pour un lead d'un apporteur : qui l'a transmis, avec un lien vers sa fiche. Non modifiable.
- **Consentement du client confirmé** — le moment où l'apporteur a confirmé que le client accepte d'être contacté par vous. Sans cette confirmation, il ne peut pas transmettre de client.
- **Demande** — la demande telle qu'elle est arrivée, en texte libre. Pour un lead d'un apporteur, le type de demande figure en premier (par exemple *Crédit logement*), avec sa remarque en dessous.

### Suivi

- **Statut** — l'un des cinq ci-dessus.
- **Suivi par** — le collaborateur qui appelle. Si vous laissez ce champ vide, la liste affiche **personne** en rouge.
- **Premier contact** — dès qu'il y a eu contact, l'heure s'affiche ici. S'il n'y a pas encore eu de contact, un bouton **Contact établi** apparaît : un clic fixe l'heure *et* met le statut sur *Contacté*, sans devoir passer par une liste de choix.
- **Motif de la perte** — apparaît dès que vous mettez le statut sur *Perdu*.

## Du lead au client

Si cela aboutit, cliquez sur la fiche sur **En faire un client**.

![La fenêtre En faire un client dans CreditSoft : des listes de choix pour Type et Langue des documents, avec le message indiquant que le nom, l'e-mail et le téléphone proviennent du lead.](../images/lead-klant-maken-fr.png "Ce que le lead ignore, CreditSoft le demande ici")

CreditSoft ne demande que ce que le lead ignore :

- **Type** — particulier ou société. Si le lead porte un nom de société, ce champ est déjà sur *Société*.
- **Langue des documents** — obligatoire sur toute fiche client : elle détermine dans quelle langue ce client reçoit ses courriers et ses e-mails.
- **Forme juridique** — uniquement pour une société.

Le nom, l'e-mail et le téléphone proviennent du lead. Vous complétez le reste sur la fiche client, vers laquelle vous êtes dirigé immédiatement.

!!! warning "Cette personne existe-t-elle déjà ?"
    Si CreditSoft reconnaît une relation portant le même nom ou la même adresse e-mail, la fenêtre change : cette relation s'affiche et le bouton devient **Rattacher**. Le lead est alors rattaché au client existant, sans deuxième fiche. Vous pouvez malgré tout en créer un nouveau — mais c'est délibérément le second choix.

**Le lead ne disparaît pas.** Il reste dans la liste en *Gagné*, avec en haut de sa fiche un lien vers son client. Un an plus tard, vous voyez ainsi toujours quel canal a apporté des clients et lequel n'a apporté que du bruit — c'est toute la raison de tenir les leads à part.

Vous démarrez ensuite un dossier de crédit depuis la fiche de ce client, avec le bouton **Nouveau dossier de crédit** : le client y figure immédiatement comme demandeur. Si le lead venait d'un apporteur, celui-ci est aussi déjà rempli — voir ci-dessous.

## Ajouter un lead

Cliquez sur **Nouveau lead**, complétez ce que vous savez, puis cliquez sur **Enregistrer**.

!!! info "La même personne se manifeste deux fois"
    Si quelqu'un remplit deux fois votre formulaire, ou téléphone après avoir écrit, cela devient **un seul lead**. Cela ne vaut pas pour un lead d'un apporteur : voir [Leads d'un apporteur](#leads-dun-apporteur). CreditSoft le reconnaît à son adresse e-mail ou à son numéro de téléphone et rattache la nouvelle demande à celle qui existe, avec sa date. Vous recevez alors le message indiquant que la personne figurait déjà.

    Un lead **gagné ou perdu** n'entre pas dans ce calcul. Celui qui revient un an plus tard représente une nouvelle demande, et non la réouverture d'un dossier clôturé.

!!! tip "Pourquoi le temps d'attente et non la date"
    Une date, il faut la convertir ; un temps d'attente, non. Et pour un lead, c'est le seul chiffre qui compte : celui qui attend deux jours a entre-temps appelé le bureau suivant.

## Leads d'un apporteur

Les apporteurs peuvent transmettre un client depuis l'application mobile CreditSoft. Il arrive ici comme lead avec la source **Mobiele app**, avec l'apporteur dans la colonne **Apporteur** et sur la fiche sous **Apporté par**. L'apporteur suit dans son application où en est la demande : *nouveau*, *en cours*, *devenu client* ou *sans suite*. Il ne voit pas qui assure le suivi ni pourquoi une demande n'a pas abouti.

!!! warning "Deux apporteurs, la même personne"
    Un lead d'un apporteur n'est **jamais fusionné** avec un lead existant. Si deux apporteurs transmettent la même personne — ou si cette personne était déjà arrivée via votre site web — il y a deux leads. Le second porte l'étiquette **doublon possible**, et un lien vers le premier figure en haut de sa fiche. **C'est vous qui décidez qui assure le suivi du client**, et donc à quel apporteur il revient. CreditSoft ne le choisit pas pour vous, car une commission y est liée.

    L'apporteur n'en voit rien. Son application n'indique pas que la personne était déjà connue : sinon, il pourrait découvrir par essais qui est déjà votre client.

Si vous faites d'un tel lead un client, la fiche de ce client indique, dans l'onglet **Général**, **Apporté par** avec le nom de l'apporteur. Cliquez-y sur **Nouveau dossier de crédit** et l'apporteur est déjà rempli sur le dossier. Si le client est arrivé via plusieurs apporteurs, CreditSoft ne remplit rien et vous le choisissez vous-même sur le dossier.

## L'avis quotidien

La colonne **En attente depuis** passe au rouge, mais cela n'aide que tant que quelqu'un ouvre la liste. Qui est débordé ne l'ouvre pas, et ce sont précisément les jours où des leads arrivent. CreditSoft peut donc vous envoyer chaque matin un seul e-mail sur ce qui reste en plan.

Vous l'activez sous **Administration → Communication → Notifications de leads** : indiquez-y après combien de jours un lead doit se signaler. Si vous laissez ce champ vide, aucun message n'est envoyé. Il part vers les mêmes adresses que l'avis d'arrivée d'un lead.

Cet e-mail comporte trois groupes :

| Groupe | Quand un lead s'y trouve |
|---|---|
| **Pas encore contacté** | Il attend depuis plus longtemps que le nombre de jours réglé et aucun premier contact n'a eu lieu. |
| **Sans responsable** | Personne ne figure sous *Suivi*. |
| **Qualifié, mais sans tâche ni rendez-vous** | Il est au statut *Qualifié*, mais rien n'est planifié. |

!!! info "Pourquoi un lead sans responsable est signalé immédiatement"
    Pour le premier groupe, CreditSoft attend le nombre de jours réglé. Pour celui-ci, non : un lead qui n'appartient à personne n'est repris par personne. Attendre n'y change rien.

Le troisième groupe est le plus silencieux des trois. Un tel lead paraît sain dans la liste — contacté, avec un responsable, et jugé prometteur — et c'est justement pour cela qu'on ne remarque pas que plus rien ne s'est passé depuis. Une tâche ou un rendez-vous **à venir** l'en retire. Un rendez-vous du mois dernier, non : c'est précisément quelqu'un qui s'est arrêté en chemin.

Si un groupe compte plus de dix leads, l'e-mail cite les dix qui attendent le plus longtemps et indique en dessous combien il en reste. Soixante lignes dans un e-mail n'aident personne ; le lien vers la liste se trouve juste en dessous.

!!! tip "Pas de message est une bonne nouvelle"
    S'il n'y a rien à signaler, aucun e-mail ne part. Un avis quotidien qui répète chaque matin que *tout va bien* devient une règle de filtrage en une semaine — et vous manquez alors aussi le message qui compte vraiment.

Le contenu de cet e-mail se modifie dans les [modèles d'e-mail](../administration/mail-templates.md), sous le modèle *Aperçu quotidien des leads*.
