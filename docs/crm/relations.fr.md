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

À droite de l'écran se trouve le tiroir **Journal**. Sélectionnez une relation et ouvrez-le : vous y tenez, par
relation, vos **tâches, notes, pièces jointes et courriers**, ainsi que le **journal** des modifications.

## Fusionner deux fiches

Si la même personne ou la même entreprise figure deux fois dans la liste, fusionnez les fiches avec le bouton
**Fusionner** en haut. Sélectionnez d'abord la fiche que vous voulez **conserver**, cliquez sur le bouton,
puis choisissez dans la fenêtre celle qui doit y être absorbée.

Avant que vous confirmiez, CreditSoft montre **ce que porte la fiche appelée à disparaître** : ses dossiers de
crédit, adresses, rendez-vous, tâches, notes, pièces jointes et courriers. Tout cela est repris par la fiche
conservée.

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

**Nouveau** et un double-clic ouvrent tous deux la **fiche sur une page entière**. En haut figure un lien de
retour vers la liste, suivi du type et du nom.

![La fiche du particulier Alain Adriaenssens sur toute la page : l'onglet Informations générales avec le type, le nom, le prénom, le téléphone, le GSM, la langue des documents et l'adresse principale à gauche, et à droite le numéro interne, la formule d'appel, l'e-mail et le site web, en dessous le large bloc Remarques et une barre avec les boutons Enregistrer, Annuler et Supprimer.](../images/relaties-fiche-fr.png "La fiche complète d'une relation, avec les données générales et les remarques"){ .volle-breedte }

La fiche comporte **deux onglets**, puis un bloc **Remarques** et une barre de boutons qui reste visible.

### Onglet « Informations générales » (particulier)

- **Nom** (obligatoire) et **prénom**
- **Langue des documents** (obligatoire) — voir ci-dessous
- **Contact** — téléphone, GSM, e-mail, site web
- **E-mail invalide** — une case à cocher pour signaler qu'une adresse ne fonctionne plus, sans la supprimer
- **Formule d'appel** et **numéro interne**
- **Adresse principale** — rue, numéro, boîte, code postal, commune, pays

### Onglet « Informations complémentaires » (particulier)

Tout ce dont vous avez besoin pour un dossier de crédit : **date, lieu et pays de naissance**, **numéro de
registre national**, **nationalité**, sexe, langue, **carte d'identité** avec ses dates de validité, **état
civil**, régime et date de mariage, **partenaire**, enfants et personnes à charge, **profession**, employeur,
en service depuis, type de contrat et fonction. Ainsi que le **type de contact**, la **source de contact** et
la date du premier contact.

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

## Enregistrer

La barre de boutons du bas reste visible pendant que vous faites défiler la fiche : **Enregistrer**,
**Annuler** et, à droite, **Supprimer**.

À l'enregistrement, les **champs obligatoires manquants** et une **adresse e-mail invalide** sont signalés.
L'adresse e-mail est contrôlée dès qu'il y a quelque chose dans le champ, même si vous ne l'avez pas modifiée
vous-même. Les **numéros de téléphone sont mis en forme** dans la notation officielle : si vous tapez
`09/3724829`, vous lirez `09 372 48 29` après l'enregistrement.

!!! warning "Cette relation existe peut-être déjà"
    S'il existe déjà une relation portant **le même nom ou la même adresse e-mail**, CreditSoft vous montre
    laquelle et vous demande si vous voulez tout de même enregistrer. C'est un avertissement, pas un blocage —
    les homonymes existent. Cela évite de créer une deuxième fois ce qui existe déjà.
