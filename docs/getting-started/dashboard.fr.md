# Le tableau de bord

Le tableau de bord est votre écran d'accueil. D'un coup d'œil, vous voyez combien de dossiers se trouvent dans quelle phase et ce que font les indicateurs.

![Le tableau de bord : en haut les quatre indicateurs — Actes avec l'année, À introduire, Introduits et LOA avec la mention « toutes les années » — en dessous le graphique en barres du volume réalisé par mois et deux graphiques en anneau répartissant le volume par institution et par responsable, et en bas le pipeline Dossiers par phase avec En traitement, Introduit, Finalisé, Sans suite et Refusé.](../images/dashboard-startscherm-fr.png "Le tableau de bord : indicateurs, graphiques et pipeline par phase"){ .volle-breedte }

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
    Des flèches au-dessus des tuiles permettent de changer d'année. Seule la tuile **Actes** suit cette année : elle compte sur la date de l'acte, et cette date est connue. Les trois autres comptent tout ce qui a jamais été encodé, car les dates des contrats doivent encore être reprises de l'ancien programme. Le libellé sous chaque tuile indique lui-même la période concernée — *2026* ou *toutes les années* — pour que vous ne lisiez pas quatre chiffres comme quatre chiffres annuels.

!!! tip "Des tirets au lieu de chiffres ?"
    C'est qu'aucun statut de contrat ne porte encore de signification. Vous voyez un tiret et non un zéro, car zéro signifierait qu'il n'y a réellement rien à compter. Sous les tuiles, une phrase vous mène au réglage.

## Le pipeline : les dossiers par phase

Sous les tuiles, vos dossiers sont regroupés par **phase**. Une phase est un groupe de statuts que vous composez vous-même — par exemple *En traitement*, *Introduit*, *Finalisé*.

- Cliquez sur une phase pour voir les dossiers concernés.
- Les dossiers dont le statut n'a pas été classé sont regroupés sous **non classés**.

!!! tip "Quelque chose figure dans la mauvaise colonne ?"
    Cela tient alors à la répartition et non au dossier. Un dossier suit la phase de son statut ; si vous déplacez un statut vers une autre phase, tous les dossiers portant ce statut suivent. Vous ajustez cela sous **Administration → Phases du tableau de bord**.

## Pourquoi votre tableau de bord diffère de celui d'un collègue

Le tableau de bord affiche ce que vous êtes autorisé à voir. Si vous n'avez pas accès à certains dossiers, ceux-ci ne sont pas comptés dans vos chiffres non plus. Deux collègues peuvent donc voir des nombres différents, et c'est normal.
