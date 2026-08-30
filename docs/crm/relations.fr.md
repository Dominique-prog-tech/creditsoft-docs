# Relations

Toutes les personnes et entreprises avec lesquelles vous êtes en contact figurent dans une seule liste : clients, garants, propriétaires et personnes de contact — un seul écran avec un filtre.

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **CRM**, puis sur **Relations**.

## La liste

![L'écran Relations dans CreditSoft : une liste de particuliers et d'entreprises avec les colonnes nom, type, e-mail, téléphone, commune, GSM et numéro interne, avec en haut un filtre par type, les boutons Fusionner, Nouvelle relation et Exporter ainsi qu'un champ de recherche.](../images/relaties-lijst-fr.png "Aperçu de toutes les relations du bureau")

Le tableau affiche par relation : **nom**, **type**, **e-mail**, **téléphone**, **commune**, **GSM** et **numéro interne**.

- **Filtrer par type** — en haut, choisissez tout, uniquement les particuliers ou uniquement les entreprises.
- **Rechercher** — le champ de recherche cherche dans toutes les colonnes à la fois.
- **Trier et filtrer** — cliquez sur un en-tête pour trier ; sous chaque en-tête se trouve un champ de filtre.
- **Choisir les colonnes** — affichez ou masquez des colonnes ; votre choix est mémorisé.
- **Exporter** — vers Excel ou CSV, avec les filtres actifs à ce moment-là.
- **Nouveau / modifier** — cliquez sur **Nouveau**, ou **double-cliquez** une ligne pour ouvrir la fiche.
- **Fusionner** — fusionner deux fiches de la même partie ; voir ci-dessous.
- **Supprimer** — une relation est **archivée** (suppression douce), pas définitivement effacée.
- **Grouper** — avec les [groupes](groups.md), vous classez les relations comme il vous convient : par région, par bureau, par campagne.

### Journal

À droite de l'écran se trouve le tiroir **Journal**. Sélectionnez une relation et ouvrez-le : vous y trouvez ce
qui se passe autour de cette fiche — les [dossiers de crédit](../journaal/kredietdossiers.md) de ce client,
les [tâches](../journaal/taken.md), [notes](../journaal/notities.md),
[pièces jointes](../journaal/bijlagen.md), [courrier](../journaal/mailverkeer.md) et l'[historique](../journaal/logboek.md)
des modifications.

La rubrique **Dossiers de crédit** ne figure que sur une relation : elle affiche les dossiers dans lesquels
cette personne est demandeur, le plus récent en haut. Quand un client appelle, vous passez de sa fiche
directement à son dossier.

Lorsque vous ouvrez la fiche, les mêmes parties figurent en haut sous forme d'**onglets** — vous ne devez
donc pas revenir à la liste pour les consulter. Le tiroir et les onglets affichent la même chose et
fonctionnent de manière identique sur chaque écran ; [Le journal](../journaal/overzicht.md) explique comment.

## Fusionner deux fiches

Si la même personne ou la même entreprise figure deux fois dans la liste, fusionnez les fiches avec le bouton
**Fusionner** en haut. Sélectionnez d'abord la fiche que vous voulez **conserver**, cliquez sur le bouton,
puis choisissez dans la fenêtre celle qui doit y être absorbée.

Avant que vous confirmiez, la fenêtre affiche les **données qui seront perdues** : adresse e-mail, téléphone,
GSM, numéro de TVA, et la présence éventuelle de remarques sur la fiche. Vous voyez ainsi d'emblée s'il s'y
trouve quelque chose que vous préférez reprendre au préalable.

**Après** la fusion, vous obtenez un aperçu de **ce qui a été déplacé**, par type : dossiers de crédit,
adresses, rendez-vous, tâches, notes, pièces jointes et courriers.

!!! warning "La fiche conservée garde ses propres champs"
    Nom, adresse, e-mail, date de naissance : ils restent tels quels sur la fiche **conservée**. Si vous voulez
    garder quelque chose de l'autre fiche — une adresse plus récente, ou un numéro de registre national qui n'y
    figure que là — reprenez-le **d'abord**. Après la fusion, il est perdu.

    Une fusion ne peut pas être annulée.

Ensuite, la fenêtre indique précisément ce qui a été déplacé, par catégorie. Si cette liste est vide, c'est que
rien n'était rattaché à la fiche disparue.

## Particulier ou entreprise

Une relation est soit un **particulier**, soit une **entreprise**. Vous le choisissez en haut de la fiche et cela détermine les champs affichés : pour un particulier la date de naissance et l'état civil, pour une entreprise la forme juridique et le numéro de TVA.

!!! tip "Récupérer automatiquement les données d'entreprise"
    Si vous renseignez le **numéro de TVA** d'une entreprise et cliquez sur **Récupérer**, CreditSoft reprend
    le nom, la forme juridique et l'adresse directement depuis la Banque-Carrefour des Entreprises. Vous n'avez
    rien à retaper et aucune faute de frappe ne s'y glisse.

## La fiche d'une relation

**Nouveau** et un double-clic ouvrent tous deux la **fiche sur une page entière**. En haut figure un bouton de
retour vers la liste, suivi du type et du nom.

![La fiche du particulier Alain Adriaenssens sur toute la page : l'onglet Informations générales avec le type, le nom, le prénom, le téléphone, le GSM, la langue des documents et l'adresse principale à gauche, et à droite le numéro interne, la formule d'appel, l'e-mail et le site web, en dessous le large bloc Remarques et une barre avec les boutons Enregistrer, Annuler et Supprimer.](../images/relaties-fiche-fr.png "La fiche complète d'une relation, avec les données générales et les remarques"){ .volle-breedte }

Les données de la relation figurent sur **deux onglets**, à côté desquels se trouvent les onglets du
[journal](../journaal/overzicht.md). Chacun des deux se termine par un bloc **Remarques** — il s'agit chaque
fois du même champ — et la barre de boutons reste visible en bas.

### Onglet « Informations générales » (particulier)

- **Nom** (obligatoire) et **prénom**
- **Langue des documents** (obligatoire) — voir ci-dessous
- **Contact** — téléphone, GSM, e-mail, site web
- **E-mail invalide** — une case à cocher pour signaler qu'une adresse ne fonctionne plus, sans la supprimer
- **Formule d'appel** et **N° interne**
- **Adresse principale** — rue, numéro, boîte, code postal, commune, pays

### Onglet « Informations complémentaires » (particulier)

Tout ce dont vous avez besoin pour un dossier de crédit — mais pas tout à l'écran en même temps.

**Par défaut, vous voyez** la **date** et le **lieu de naissance**, le **numéro de registre national**, la
**nationalité**, l'**état civil**, la **profession**, le **type de contact**, la **source de contact** et la
date du premier contact. S'y ajoute **Source (lead)** : d'où vient ce prospect.

Le bouton **Plus de champs** déploie le reste : pays de naissance, sexe, langue, **carte d'identité** avec ses
dates de validité, régime et date de mariage, **partenaire**, enfants et personnes à charge, employeur, en
service depuis, type de contrat et fonction. **Moins de champs** les replie.

!!! tip "Pourquoi pas tout d'un coup"
    La plupart des fiches n'ont pas besoin de cette seconde série. Elle est bien là, mais hors écran, pour que
    vous n'ayez pas à faire défiler vingt champs vides avant d'atteindre l'onglet suivant.

### Pour une entreprise

Les onglets s'appellent alors **Général** et **Divers**. Le premier porte la raison sociale, la **forme
juridique**, le numéro de TVA avec le bouton **Récupérer**, le numéro interne, la langue des documents et les
coordonnées ; sur le second, vous indiquez si l'entreprise est un **client** et/ou un **fournisseur**.

### La langue des documents

Chaque fiche porte une **langue des documents**. Elle détermine la langue dans laquelle cette relation reçoit ses courriers et e-mails — indépendamment de la langue dans laquelle vous travaillez vous-même. Un client francophone reçoit donc des documents en français, même si votre écran est en néerlandais.

Ce champ est **obligatoire**. Si vous le laissez vide, le programme ne sait pas quelle langue de modèle utiliser.

!!! tip "Code postal et commune"
    Tapez dans le champ **Code postal** : la liste affiche à la fois le code postal et la commune, vous
    pouvez donc chercher sur les deux — également sur *Gent* ou *Liège*. Lorsque vous choisissez un code
    postal, la **commune est toujours complétée**. Si vous videz la commune — avec la croix ou avec **Retour
    arrière** sur le texte sélectionné — le code postal est vidé lui aussi.

## Documents demandés

La fiche comporte l'onglet **Documents demandés** : les pièces que vous attendez de cette personne. Vous
n'avez **pas besoin d'un dossier** pour cela — un prospect peut fournir ses fiches de paie et sa carte
d'identité avant qu'il soit question d'une demande de crédit.

Le titre affiche deux nombres. *Documents demandés (2/5)* signifie deux validés sur les cinq demandés.

![L'onglet Documents demandés sur la fiche d'Alain Adriaenssens : en haut les boutons Ajouter un document, Inviter le client et Voir comme le client, en dessous un tableau avec les colonnes Document, Statut et Motif, avec une seule ligne — Les 3 derniers versements de salaire au statut Reçu.](../images/relaties-gevraagde-documenten-fr.png "Les pièces que vous attendez de cette relation, avec leur statut"){ .volle-breedte }

- **Ajouter un document** — choisissez un type de document dans la liste et il rejoint la checklist. La
  liste est groupée par **catégorie**, avec le nom de la catégorie en en-tête. C'est nécessaire, car une
  même pièce existe pour plusieurs types de dossiers : *Données du notaire* existe séparément pour Achat,
  Succession, Refinancement et cinq autres. Tapez une partie du nom et chaque résultat reste sous sa
  propre catégorie, de sorte que vous voyez laquelle il vous faut.
- **Inviter le client** — envoie un e-mail avec un lien vers le **portail client**,
  où cette personne dépose ses pièces. Si elle n'a pas d'adresse e-mail, vous créez uniquement le lien et le
  transmettez vous-même.
- **Voir comme le client** — ouvre dans un nouvel onglet ce que votre client voit. Votre fiche reste
  ouverte, ce qui vous permet de comparer les deux côte à côte.

**Double-cliquez** une ligne pour l'évaluer : vous voyez les fichiers reçus et les approuvez ou les refusez,
comme [sur un dossier de crédit](../credit-management/credit-files.md). Si finalement
vous ne demandez pas une pièce, **Supprimer** la retire de la liste — elle part à la
[corbeille](../administration/recycle-bin.md) et n'est pas définitivement effacée.

## Enregistrer

La barre de boutons du bas reste visible pendant que vous faites défiler la fiche. Les boutons se trouvent à
droite : **Enregistrer**, **Annuler** et **Nouveau dossier de crédit**, avec **Supprimer** à distance, tout
au bout — il est mis à l'écart, car vous l'utilisez rarement et jamais volontiers par erreur.

À l'enregistrement, les **champs obligatoires manquants** et une **adresse e-mail invalide** sont signalés.
L'adresse e-mail est contrôlée dès qu'il y a quelque chose dans le champ, même si vous ne l'avez pas modifiée
vous-même. Les **numéros de téléphone sont mis en forme** dans la notation officielle : si vous tapez
`09/3724829`, vous lirez `09 372 48 29` après l'enregistrement.

!!! warning "Cette relation existe peut-être déjà"
    S'il existe déjà une relation portant **le même nom ou la même adresse e-mail**, CreditSoft vous montre
    laquelle et vous demande si vous voulez tout de même enregistrer. C'est un avertissement, pas un blocage —
    les homonymes existent. Cela évite de créer une deuxième fois ce qui existe déjà.
