# Apporteurs

Vos apporteurs figurent dans une **arborescence** : un apporteur principal, en dessous ses bureaux, et en dessous les collaborateurs individuels. Vous voyez ainsi immédiatement qui relève de qui.

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **CRM**, puis sur **Apporteurs**.

## La liste

![L'écran Apporteurs dans CreditSoft : une arborescence avec les apporteurs principaux et les bureaux en dessous, avec les colonnes nom, type, qualité, e-mail, numéro d'agent, commune, GSM et actif, et en haut les boutons Fusionner, Nouveau et Exporter.](../images/aanbrengers-lijst-fr.png "Aperçu des apporteurs, organisés en arborescence")

Le tableau affiche par apporteur : **nom**, **type**, **qualité**, **e-mail**, **numéro d'agent**, **commune**, **GSM** et **actif**.

- **Déplier et replier** — cliquez sur le triangle devant une ligne pour afficher ou masquer un niveau.
- **Rechercher** — le champ de recherche cherche dans toutes les colonnes à la fois.
- **Choisir les colonnes** — affichez ou masquez des colonnes ; les largeurs que vous réglez sont également conservées pour la prochaine fois.
- **Exporter** — vers Excel ou CSV.
- **Fusionner** — si deux fiches existent pour le même apporteur, vous les fusionnez ; voir ci-dessous.
- **Nouveau / modifier** — cliquez sur **Nouveau**, ou **double-cliquez** une ligne pour ouvrir la fiche.

### Journal

À droite de l'écran se trouve le tiroir **Journal**. Sélectionnez un apporteur et ouvrez-le : vous y trouvez ce
qui se passe autour de cette fiche — les **schémas de commission libres**, les [tâches](../journaal/taken.md), les
[notes](../journaal/notities.md), les [pièces jointes](../journaal/bijlagen.md), le [courrier](../journaal/mailverkeer.md)
et l'[historique](../journaal/logboek.md) des modifications.

#### Schémas de commission libres

Cet onglet reprend les commissions de cet apporteur qui ne sont **pas liées à un dossier de crédit** — par exemple une
indemnité mensuelle pour des dossiers antérieurs à une affiliation, ou une correction. Vous les reconnaissez à leur
**description** : elle figure en tête de chaque bloc, avec en dessous le montant, la forme de paiement et la date de début.

Ajouter, modifier, activer, recalculer et arrêter y fonctionnent exactement comme pour les schémas d'un dossier de
crédit — [Dossiers de crédit](../credit-management/credit-files.md) les décrit en détail. Deux différences : vous
saisissez vous-même une description au lieu de choisir un dossier, et l'apporteur est fixé puisque vous êtes sur sa fiche.

!!! note "Un montant peut être négatif"
    Une commission que vous reprenez — parce que l'apporteur l'a déjà perçue lui-même, par exemple — s'encode comme un
    montant **négatif**. Cela vaut ici comme pour les schémas liés à un dossier.

Lorsque vous ouvrez la fiche, les mêmes parties figurent en haut sous forme d'**onglets** — vous ne devez
donc pas revenir à la liste pour les consulter. Le tiroir et les onglets affichent la même chose et
fonctionnent de manière identique sur chaque écran ; [Le journal](../journaal/overzicht.md) explique comment.

## La fiche d'un apporteur

**Nouveau** et un double-clic ouvrent tous deux la **fiche sur une page entière**, avec cinq blocs — Identité, Agrément et statut, Contact et adresse, Commission et Remarques — et, en bas, une barre de boutons qui reste visible.

![La fiche d'un apporteur sur toute la page, avec les cinq blocs Identité (y compris le groupement), Agrément et statut, Contact et adresse, Commission et Remarques, et en bas les boutons Enregistrer, Annuler, Portail et Supprimer.](../images/aanbrengers-fiche-fr.png "La fiche complète d'un apporteur, avec l'identité, l'agrément, le contact et la commission"){ .volle-breedte }

### Identité

Qui est cet apporteur et quel rôle il joue : **type d'apporteur** (principal, bureau ou sous-agent), **rattaché à** — l'apporteur sous lequel il se trouve dans l'arborescence —, **forme juridique**, **relation**, **formule d'appel**, **qualité**, le nom ou la **raison sociale** avec le **type d'entreprise**, le **numéro de TVA**, le **numéro d'agent**, la **langue des documents** (obligatoire) et le **groupement** — le groupe auquel appartient cet apporteur, issu de votre liste sous [Groupes](groups.md).

!!! tip "Récupérer automatiquement les données d'entreprise"
    Saisissez le **numéro de TVA** et cliquez sur **Récupérer** : CreditSoft reprend le nom, la forme juridique
    et l'adresse directement depuis la Banque-Carrefour des Entreprises.

### Agrément et statut

Cet apporteur peut-il exercer, et la collaboration est-elle toujours en cours ? Le **numéro FSMA** avec une case indiquant si l'inscription est en ordre, et s'il est **actif** — avec la date depuis laquelle — ou **arrêté**, avec la date correspondante.

### Contact et adresse

Téléphone, GSM, e-mail, site web et l'adresse.

!!! tip "Code postal et commune"
    Dans le champ **Code postal**, tapez un code postal ou un nom de commune ; la commune se complète. Si vous
    videz la commune — avec la croix ou avec **Retour arrière** — le code postal est vidé lui aussi.

### Commission

L'**IBAN** sur lequel sa commission est versée, le **pourcentage standard** et le **mode de paiement**.

Le mode de paiement détermine les champs qui apparaissent ensuite :

- **Paiement récurrent** — le pourcentage versé immédiatement, et sur combien de mois le solde est étalé.
- **Montant fixe** — le montant lui-même.
- **Paiement planifié** — un tableau de 24 lignes où vous indiquez, par ligne, le mois et le pourcentage.

## La production d'un apporteur

L'onglet **Production** de la fiche montre ce que cet apporteur représente pour votre bureau : combien de dossiers il apporte, combien aboutissent à un acte, et comment cela se compare à votre bureau dans son ensemble. L'onglet apparaît dès que l'apporteur est enregistré.

![L'onglet Production sur la fiche d'un apporteur : en haut, le choix de la période et l'interrupteur pour les apporteurs sous-jacents ; en dessous, des tuiles avec les dossiers, les actes, le taux de conversion, les abandons, le crédit moyen, le délai, les dossiers en cours et la commission, chacune avec le chiffre du bureau à côté ; puis des graphiques par mois et par année d'introduction.](../images/aanbrengers-productie-fr.png "L'onglet Production d'un apporteur"){ .volle-breedte }

### Choisir ce que vous voyez

- **Période** — *Tout*, *Cette année*, *L'an dernier* ou *12 derniers mois*.
- **Type** — par exemple uniquement le crédit hypothécaire. Ce choix n'apparaît que si votre bureau utilise plus d'un type de produit.
- **Avec les apporteurs sous-jacents** — inclut aussi les apporteurs rattachés à cet apporteur, sur toute l'arborescence. L'interrupteur n'apparaît que s'il existe des apporteurs sous-jacents.

Un autre choix affiche immédiatement les chiffres ; rien n'est rechargé.

### Les chiffres clés

Chaque tuile affiche le chiffre de cet apporteur. La petite mention à côté le compare à votre bureau.

- **Dossiers** — introduits dans la période, avec la part dans le bureau.
- **Actes** — passés dans la période, avec le volume de crédit et la part dans le bureau.
- **Taux de conversion** — parmi les dossiers introduits dans la période et déjà clôturés : quel pourcentage est devenu un acte.
- **Abandonnés** — quel pourcentage de ces mêmes dossiers s'est terminé sans acte.
- **Crédit moyen** — le montant moyen des actes.
- **Introduction à l'acte** — combien de jours s'écoulent en général entre l'introduction et l'acte. CreditSoft prend la médiane, pour qu'un seul dossier resté longtemps en attente ne fausse pas l'image.
- **En cours** — les dossiers encore en cours aujourd'hui, et le nombre d'actes prévus.
- **Commission** — ce que votre bureau a attribué à cet apporteur dans la période. Vous ne voyez cette tuile que si vous pouvez consulter les commissions, et seulement si votre bureau comptabilise des commissions.

!!! note "Quand un dossier compte-t-il comme acte, et quand comme abandonné ?"
    - Une **date d'acte** jusqu'à aujourd'hui compte comme acte. Une date d'acte dans le futur compte comme *prévue*.
    - Un dossier réalisé mais sans date d'acte compte dans le taux de conversion, mais dans aucune période ni
      aucun mois — le *quand* manque. L'onglet indique combien de dossiers sont dans ce cas.
    - Un dossier sans date d'acte dont le statut se trouve dans une **phase de clôture** compte comme abandonné.
      Le nom de cette phase en est le motif. Exception : une phase cochée comme **réussie** sous
      [Phases du tableau de bord](../beheer/dashboard-fases.md) — un dossier qui s'y trouve n'est jamais abandonné.

### Les graphiques et le tableau

- **Dossiers et actes par mois** — toujours les 24 derniers mois, indépendamment de la période choisie.
- **Conversion par année d'introduction** — parmi les dossiers introduits cette année-là : combien sont devenus un acte, pour cet apporteur et pour le bureau. Une année marquée d'un **\*** a encore des dossiers en cours ; ce chiffre peut encore augmenter.
- **Actes par prêteur** — les huit plus importants ; le reste figure ensemble sous *Autres*.
- **Motifs d'abandon** — les dossiers abandonnés par motif.

En bas, un tableau par année reprend les dossiers, les actes, le volume de crédit et, si vous pouvez la voir, la commission.

!!! tip "Un apporteur qui s'arrête"
    Si cet apporteur n'a introduit aucun nouveau dossier depuis trois mois complets ou plus, l'onglet affiche en
    haut un message avec la date de son dernier dossier.

!!! warning "Des tirets pour la conversion, les abandons et les dossiers en cours"
    Votre bureau n'a alors encore lié aucun statut de dossier à une **phase de clôture**, et CreditSoft ne sait
    pas quels dossiers sont abandonnés. Configurez-le dans **Administration → Phases du tableau de bord** — voir [Phases du tableau de bord](../beheer/dashboard-fases.md).
    En attendant, l'onglet affiche un tiret plutôt qu'un chiffre inexact.

## Fusionner deux fiches

Si le même apporteur figure deux fois dans la liste, fusionnez les fiches avec le bouton **Fusionner** en
haut. Sélectionnez d'abord la fiche que vous voulez **conserver**, cliquez sur le bouton, puis choisissez dans
la fenêtre celle qui doit y être absorbée.

Avant que vous confirmiez, la fenêtre affiche les **coordonnées qui seront perdues** : l'adresse e-mail, le
numéro de téléphone et le numéro de TVA de la fiche appelée à disparaître. Vous voyez ainsi d'emblée s'il s'y
trouve quelque chose que vous préférez reprendre au préalable.

**Après** la fusion, vous obtenez un aperçu de **ce qui a été déplacé**, par type : dossiers, commissions,
tâches, notes, pièces jointes et courriers. Les bureaux et collaborateurs situés en dessous dans
l'arborescence, les comptes bancaires, les paiements planifiés et les documents demandés suivent également.

!!! warning "La fiche conservée garde ses propres champs"
    Nom, adresse, e-mail, accord de commission : ils restent tels quels sur la fiche **conservée**. Si vous
    voulez garder quelque chose de l'autre fiche — une adresse plus récente, par exemple — reprenez-la
    **d'abord**. Après la fusion, elle est perdue.

    Une fusion ne peut pas être annulée.

Ensuite, la fenêtre indique précisément ce qui a été déplacé, par catégorie. Si cette liste est vide, c'est
que rien n'était rattaché à la fiche disparue.

## Donner accès au portail

Avec le bouton **Portail** en bas à droite, vous donnez à un apporteur son propre accès. Il y voit :

- **Mes dossiers** — les dossiers qu'il a apportés, avec leur statut.
- **Mes commissions** — ce qui est comptabilisé pour lui.

Vous déterminez par apporteur s'il voit l'onglet des commissions et celui des documents. Vous pouvez ainsi ouvrir le portail sans montrer d'emblée tous les chiffres.

!!! warning "Ce que CreditSoft contrôle avant d'accorder l'accès"
    L'**adresse e-mail est le nom d'utilisateur** du portail. Par conséquent :

    - sans adresse e-mail sur la fiche, vous ne pouvez pas accorder l'accès ;
    - l'adresse doit avoir une forme valide ;
    - **deux apporteurs ne peuvent pas porter la même adresse** — si un autre apporteur la porte déjà,
      CreditSoft indique lequel et refuse d'accorder l'accès.

!!! warning "Un apporteur ne voit que ses propres données"
    Le portail est cloisonné par apporteur. Un bureau voit les dossiers de ses propres collaborateurs, mais jamais ceux d'un autre bureau.

## Enregistrer

La barre de boutons du bas reste visible. Les boutons se trouvent à droite : **Enregistrer**, **Portail**
et **Annuler**, avec **Supprimer** à distance, tout au bout — il est mis à l'écart, car on le clique
rarement et jamais volontiers par erreur.

**Enregistrer** reste désactivé tant que le nom ou la langue des documents manque — vous ne recevez donc pas de message a posteriori, le bouton ne se libère simplement pas. Une **adresse e-mail invalide** est signalée en direct sous le champ pendant que vous tapez. Les **numéros de téléphone sont mis en forme** dans la notation officielle : si vous tapez `09/3724829`, vous lirez `09 372 48 29` après l'enregistrement.

**Supprimer** demande d'abord confirmation, en rappelant le nom de l'apporteur. La fiche part alors à la corbeille, où vous pouvez au besoin la récupérer.
