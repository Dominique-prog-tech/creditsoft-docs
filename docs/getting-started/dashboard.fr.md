# Le tableau de bord

Le tableau de bord est votre écran d'accueil. D'un coup d'œil, vous voyez combien de dossiers se trouvent dans quelle phase et ce que font les indicateurs.

![Le tableau de bord sur l'onglet Aujourd'hui, à côté de l'onglet Production : en haut les quatre indicateurs — Actes avec l'année, À introduire, Introduit et LOA avec la mention « toutes les années » — en dessous les deux blocs Délai dépassé et Délai proche avec par ligne le client, le type de délai et la date, et au bas de chaque bloc le bouton pour afficher les autres ; plus bas le graphique en barres du volume réalisé par mois et deux graphiques en anneau répartissant le volume par institution et par responsable.](../images/dashboard-startscherm-fr.png "Le tableau de bord : indicateurs, délais qui arrivent à échéance et graphiques"){ .volle-breedte }

## Pour commencer

Si votre environnement contient encore des **données d'exemple**, le bloc *Pour commencer* s'affiche en haut
du tableau de bord. Il vous indique les trois réglages qui déterminent le reste, avec un compteur indiquant
combien vous en avez faits.

![Le bloc Pour commencer en haut du tableau de bord : à gauche le titre avec l'explication que les données sont des exemples, à droite un anneau affichant le compteur 0 sur 3, en dessous trois cartes côte à côte — Complétez votre Fiche d'entreprise, Configurez vos Adresses d'envoi et Ajoutez vos Utilisateurs — chacune avec une courte explication et un bouton Ouvrir, et en bas à droite le lien Masquer. En haut, dans la barre, figure le marqueur jaune Données d'exemple.](../images/dashboard-aan-de-slag-fr.png "Les trois réglages à faire en priorité, avec le compteur qui suit votre travail"){ .volle-breedte }

| Étape | Pourquoi celle-ci d'abord |
|---|---|
| **Complétez votre Fiche d'entreprise** | Votre nom, votre adresse et votre logo apparaissent sur chaque lettre et chaque document que vous envoyez |
| **Configurez vos Adresses d'envoi** | Sans adresse d'envoi, aucun e-mail ne part de votre environnement |
| **Ajoutez vos Utilisateurs** | Ils apparaîtront ensuite comme propriétaire d'un dossier et comme responsable d'une tâche |

Cliquez sur **Ouvrir** à côté d'une étape et vous arrivez sur le bon écran.

**Vous n'avez aucune case à cocher.** Une étape se coche d'elle-même dès que vous y avez modifié quelque
chose. Le compteur regarde ce que *vous* avez fait, pas ce qui est présent : votre environnement arrive avec
un nom d'exemple, une adresse d'envoi d'exemple et une liste de collaborateurs d'exemple, et ceux-là ne
comptent pas.

!!! tip "Vous pouvez vous exercer librement"
    Les dossiers, relations et tâches que vous voyez sont fictifs. Vous pouvez les modifier et les supprimer
    sans rien casser. Aucun e-mail ne part non plus de cet environnement vers l'extérieur tant que les données
    d'exemple sont présentes.

Si vous ne souhaitez pas voir le bloc, cliquez sur **Masquer**. Ce choix ne vaut que pour vous et reste
conservé ; vos collègues continuent de voir le bloc. Une fois les trois étapes faites, il disparaît de
lui-même.

Faites-nous savoir quand les données d'exemple peuvent être supprimées. Ce que vous avez encodé vous-même
sera conservé, et l'envoi d'e-mails est activé à ce moment-là.

## Les quatre tuiles du haut

Les tuiles colorées comptent des **contrats**, pas des dossiers. Chaque tuile combine deux éléments : ce que **signifie** un statut de contrat, et de quelle **catégorie de produit** il s'agit.

| Tuile | Ce qui y est compté | Période |
|---|---|---|
| **Actes** | Les crédits **hypothécaires** réalisés | l'année choisie |
| **À introduire** | Les contrats encore à introduire, quel que soit le produit | toutes les années |
| **Introduits** | Les crédits **hypothécaires** introduits | toutes les années |
| **LOA** | Les **prêts à tempérament** réalisés | toutes les années |

**LOA signifie prêt à tempérament** (*lening op afbetaling*). Cette tuile compte donc la même chose que *Actes* — des contrats réalisés — mais pour une autre catégorie de produit. Cette distinction provient de votre liste de produits et est fixe ; vous n'avez pas à la configurer.

Vous indiquez uniquement **ce que signifie un statut de contrat** : *réalisé*, *à introduire* ou *introduit*. Cela se fait sous [Administration → Phases du tableau de bord](../beheer/dashboard-fases.md), en bas, sous *Statuts de contrat*. Les statuts sans signification ne comptent nulle part.

!!! info "Pourquoi une seule tuile suit-elle l'année ?"
    Des flèches au-dessus des tuiles permettent de changer d'année. Seule la tuile **Actes** suit cette année : elle compte sur la date de l'acte, et cette date est connue. Un acte daté plus tard dans l'année ne compte qu'une fois cette date passée — jusque-là, il est prévu et non réalisé. Il en va de même pour les trois graphiques, et c'est aussi ainsi que compte l'onglet *Production* d'un apporteur. Les trois autres comptent tout ce qui a jamais été encodé, car les dates de ces contrats ne sont pas toutes renseignées. Le libellé sous chaque tuile indique lui-même la période concernée — *2026* ou *toutes les années* — pour que vous ne lisiez pas quatre chiffres comme quatre chiffres annuels. Survolez les flèches et l'information s'y trouve aussi : l'année s'applique à *Actes* et aux trois graphiques.

!!! tip "Des tirets au lieu de chiffres ?"
    C'est qu'aucun statut de contrat ne porte encore de signification. Vous voyez un tiret et non un zéro, car zéro signifierait qu'il n'y a réellement rien à compter. Sous les tuiles, une phrase vous mène au réglage.

## Ce qui arrive à échéance

Sous les quatre tuiles figurent deux blocs qui indiquent ce qui **demande une action aujourd'hui** : *Délai
dépassé* et *Délai proche*. Ils examinent quatre dates d'un dossier de crédit — la date limite pour signer
l'**offre**, pour passer l'**acte**, l'échéance des **conditions suspensives**, et la validité du **certificat
PEB**. Vous les encodez dans le dossier de crédit : les trois premières dans la carte des dates, le
certificat PEB avec le bien.

Chaque ligne indique le client, le type de délai et sa date. Un clic vous mène au dossier.

Seuls les dossiers **en cours** sont pris en compte : si le statut d'un dossier relève d'une phase finale, il
disparaît de ces blocs. Un dossier dont le statut n'est classé nulle part y reste — non classé ne prouve pas
qu'un dossier est terminé.

!!! tip "L'horizon, c'est vous qui le choisissez"
    Quatorze jours par défaut. Vous le modifiez sous **Administration &rarr; Phases du tableau de bord**.

**Les délais dépassés restent toujours visibles**, même anciens. C'est voulu : un délai échu depuis des mois sur
un dossier encore en cours n'est pas du bruit mais une trouvaille — soit le statut est erroné, soit le dossier
est à l'arrêt. Chaque bloc affiche les huit plus récents. S'il y en a davantage, cliquez sur
**Afficher les … autres** : la liste complète se déplie dans le bloc même, avec sa propre barre de
défilement, pour que le reste du tableau de bord ne bouge pas. **En afficher moins** la replie.

Rien à signaler ? Le bloc le dit, au lieu de rester vide.

## Les trois graphiques

Sous les tuiles figurent trois graphiques. Ils portent tous les trois sur **la même année** — celle que vous
choisissez avec les flèches en haut — et sur le **volume réalisé**, donc sur les crédits effectivement
aboutis.

- **Volume réalisé par mois** — une barre par mois. Vous voyez ainsi d'emblée quels mois portent le
  résultat et lesquels décrochent.
- **Volume par institution** — un graphique en anneau répartissant le volume entre les institutions de
  crédit. Les dossiers sans institution sont regroupés sous *Inconnu*.
- **Volume par responsable** — la même répartition, mais par collaborateur. Les dossiers sans personne
  attribuée sont regroupés sous *Sans responsable*. Si c'est la plus grande part, ce n'est pas un problème
  technique mais du travail : personne n'a encore été désigné.

S'il n'y a rien à afficher pour l'année choisie, la mention *« Aucune donnée. »* remplace l'anneau vide. Un
graphique qui reste vide alors que les tuiles affichent des chiffres signifie presque toujours que l'année
en haut n'est pas celle que vous croyez.

## Le pipeline : les dossiers par phase

Sous les tuiles, vos dossiers sont regroupés par **phase**. Une phase est un groupe de statuts que vous composez vous-même — par exemple *En traitement*, *Introduit*, *Finalisé*.

![Le pipeline Dossiers par phase avec quatre cartes : En traitement avec 442 dossiers, Introduit avec 1800, Finalisé avec 430 et Sans suite avec 1328, ces deux dernières portant la mention phase finale. Chaque carte affiche le montant total et, en dessous, les statuts qui en relèvent, avec par statut le nombre de dossiers et le montant.](../images/dashboard-pijplijn-fr.png "Vos dossiers regroupés par phase, avec les statuts en dessous"){ .volle-breedte }

- Cliquez sur une phase pour voir les dossiers concernés.
- Les dossiers dont le statut n'a pas été classé sont regroupés sous **non classés**.

Si **aucun** statut n'est encore lié à une phase, tous vos dossiers figurent sous *non classés* et le
tableau de bord le signale en une phrase, avec un bouton **Configurer les phases**. Rien ne manque alors
à vos dossiers — seule la répartition.

!!! tip "Quelque chose figure dans la mauvaise colonne ?"
    Cela tient alors à la répartition et non au dossier. Un dossier suit la phase de son statut ; si vous déplacez un statut vers une autre phase, tous les dossiers portant ce statut suivent. Vous ajustez cela sous **Administration → Phases du tableau de bord**.

## L'onglet Production

En haut du tableau de bord figurent deux onglets. **Aujourd'hui** est ce qui est décrit ci-dessus : ce qui est en cours et ce qui arrive à échéance. **Production** montre comment tourne votre bureau — les mêmes chiffres que l'onglet *Production* de la fiche d'un [apporteur](../crm/contributors.md), mais pour tous les dossiers ensemble.

![L'onglet Production du tableau de bord : en haut les boutons Tout, Cette année, L'an dernier et 12 derniers mois avec le choix Tous les types, en dessous les tuiles Dossiers, Actes avec le volume, Taux de conversion, Abandonnés, Crédit moyen, Introduction à l'acte et En cours, et les graphiques Dossiers et actes par mois et Conversion par année d'introduction.](../images/dashboard-productie-fr.png "L'onglet Production : les chiffres de l'ensemble du bureau"){ .volle-breedte }

- **Période et catégorie.** Choisissez *Tout*, *Cette année*, *L'an dernier* ou *12 derniers mois*, et éventuellement une seule catégorie de produit. Les flèches d'année d'*Aujourd'hui* ne s'appliquent pas ici ; elles disparaissent dès que vous êtes sur *Production*.
- **Les tuiles** : les dossiers introduits sur la période, les actes avec leur volume, le taux de conversion et la part abandonnée, le crédit moyen, le délai de l'introduction à l'acte, et combien de dossiers sont en cours — avec les actes déjà prévus.
- **Les graphiques** : dossiers et actes par mois, la conversion par année d'introduction, les actes par prêteur et les motifs d'abandon. En bas figure un tableau par année.
- **Apporteurs** : qui a le plus apporté sur la période choisie — d'abord par actes, puis par volume. Cliquez un nom pour ouvrir la fiche.
- **Apporteurs à l'arrêt** : ceux qui ont encore apporté au cours de l'année écoulée, mais plus rien de nouveau depuis trois mois ou plus. Vous voyez la date du dernier dossier et le nombre de dossiers sur les douze derniers mois, pour savoir qui appeler en premier. Cette liste ne suit pas la période choisie.

![Les deux listes en bas de l'onglet Production : à gauche Apporteurs avec par apporteur les dossiers, les actes et le volume de crédit, à droite Apporteurs à l'arrêt avec le dernier dossier, depuis combien de temps et le nombre de dossiers sur les douze derniers mois.](../images/dashboard-aanbrengers-fr.png "Qui a le plus apporté, et qui est à l'arrêt"){ .volle-breedte }

!!! tip "Un tiret pour Taux de conversion et Abandonnés ?"
    Aucun statut de dossier n'est alors encore lié à une phase de clôture, et il est impossible de dire quel dossier est terminé. L'onglet le signale lui-même ; vous le configurez sous **Administration → Phases du tableau de bord**.

## Tout le monde voit le même bureau

Le tableau de bord affiche les chiffres de l'ensemble du bureau. Toute personne autorisée à l'ouvrir voit les mêmes nombres. La répartition du volume entre vos collaborateurs, vous la voyez dans le graphique par responsable. Les deux listes d'apporteurs de l'onglet *Production* ne sont visibles que si vous pouvez aussi consulter les apporteurs.
