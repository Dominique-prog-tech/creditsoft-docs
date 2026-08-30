# Le tableau de bord

Le tableau de bord est votre écran d'accueil. D'un coup d'œil, vous voyez combien de dossiers se trouvent dans quelle phase et ce que font les indicateurs.

![Le tableau de bord : en haut les quatre indicateurs — Actes avec l'année, À introduire, Introduit et LOA avec la mention « toutes les années » — en dessous le graphique en barres du volume réalisé par mois et deux graphiques en anneau répartissant le volume par institution et par responsable, et en bas le pipeline Dossiers par phase avec En traitement, Introduit, Finalisé, Sans suite et Refusé.](../images/dashboard-startscherm-fr.png "Le tableau de bord : indicateurs, graphiques et pipeline par phase"){ .volle-breedte }

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
    Des flèches au-dessus des tuiles permettent de changer d'année. Seule la tuile **Actes** suit cette année : elle compte sur la date de l'acte, et cette date est connue. Les trois autres comptent tout ce qui a jamais été encodé, car les dates de ces contrats ne sont pas toutes renseignées. Le libellé sous chaque tuile indique lui-même la période concernée — *2026* ou *toutes les années* — pour que vous ne lisiez pas quatre chiffres comme quatre chiffres annuels.

!!! tip "Des tirets au lieu de chiffres ?"
    C'est qu'aucun statut de contrat ne porte encore de signification. Vous voyez un tiret et non un zéro, car zéro signifierait qu'il n'y a réellement rien à compter. Sous les tuiles, une phrase vous mène au réglage.

## Ce qui arrive à échéance

Sous les quatre tuiles figurent deux blocs qui indiquent ce qui **demande une action aujourd'hui** : *Délai
dépassé* et *Délai proche*. Ils examinent quatre dates d'un dossier de crédit — la date limite pour signer
l'**offre**, pour passer l'**acte**, l'échéance des **conditions suspensives**, et la validité du **certificat
PEB**.

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
- **Volume par responsable** — la même répartition, mais par collaborateur. Ici aussi, *Inconnu* recueille
  les dossiers sans responsable.

S'il n'y a rien à afficher pour l'année choisie, la mention *« Aucune donnée. »* remplace l'anneau vide. Un
graphique qui reste vide alors que les tuiles affichent des chiffres signifie presque toujours que l'année
en haut n'est pas celle que vous croyez.

## Le pipeline : les dossiers par phase

Sous les tuiles, vos dossiers sont regroupés par **phase**. Une phase est un groupe de statuts que vous composez vous-même — par exemple *En traitement*, *Introduit*, *Finalisé*.

- Cliquez sur une phase pour voir les dossiers concernés.
- Les dossiers dont le statut n'a pas été classé sont regroupés sous **non classés**.

Si **aucun** statut n'est encore lié à une phase, tous vos dossiers figurent sous *non classés* et le
tableau de bord le signale en une phrase, avec un bouton **Configurer les phases**. Rien ne manque alors
à vos dossiers — seule la répartition.

!!! tip "Quelque chose figure dans la mauvaise colonne ?"
    Cela tient alors à la répartition et non au dossier. Un dossier suit la phase de son statut ; si vous déplacez un statut vers une autre phase, tous les dossiers portant ce statut suivent. Vous ajustez cela sous **Administration → Phases du tableau de bord**.

## Pourquoi votre tableau de bord diffère de celui d'un collègue

Le tableau de bord affiche ce que vous êtes autorisé à voir. Si vous n'avez pas accès à certains dossiers, ceux-ci ne sont pas comptés dans vos chiffres non plus. Deux collègues peuvent donc voir des nombres différents, et c'est normal.
