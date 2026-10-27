# Commissions à confirmer

Les dossiers dont l'acte tombe dans le [barème des commissions](../beheer/commissiebarema.md) et dont la commission n'est pas encore répartie. Par dossier, vous voyez comment la commission de la banque se répartit entre le bureau qui a apporté le crédit et le bureau principal. Un clic crée les schémas de commission.

## Ouvrir l'écran

Allez dans le menu vers **Schémas**. Si votre bureau a un barème, le lien **Commissions à confirmer** figure en haut de la liste, avec le nombre de dossiers en attente.

![L'écran Commissions à confirmer avec quatre dossiers : par ligne le dossier, l'acte, le bureau, la commission banque, la part du bureau et du siège, le rythme de la banque et l'état — pour trois dossiers le bouton Répartir, pour un le message Pas de pourcentage standard sur la fiche de l'intermédiaire.](../images/commissie-te-bevestigen-fr.png "Ce qui reste à répartir"){ .volle-breedte }

## Comment la répartition se fait

- La **commission banque** est le montant de commission du dossier. Reprenez-y d'abord la proposition du barème, si ce n'est pas encore fait.
- Le **bureau** qui a apporté le dossier reçoit le **pourcentage standard** de sa fiche d'intermédiaire. Si l'apporteur dépend d'un bureau qui [règle lui-même ses apporteurs](../crm/contributors.md#commission), c'est ce bureau.
- Le **bureau principal** reçoit le reste. Vous le choisissez dans les [paramètres de commission](../beheer/commissie-instellingen.md).
- Si le bureau principal apporte lui-même le dossier, il reçoit **100 %**.
- Les deux sont payés au **rythme de la banque** : celui de la règle du barème, sinon celui de l'institution de crédit. Le premier paiement tombe le mois après l'acte.

Les montants sont arrondis au cent ; le bureau principal reçoit la différence, de sorte que les deux parts font toujours la commission banque.

## Répartir

Cliquez sur **Répartir**. Vous voyez d'abord qui reçoit quel montant. Si vous confirmez, CreditSoft crée les schémas de commission et les **active** aussitôt : leurs lignes figurent sur le [bordereau](commission-statements.md). Le dossier quitte ensuite cette liste.

Cliquez sur la **flèche** en début de ligne pour ouvrir le dossier ; avec **Ctrl-clic** (Cmd sur un Mac), il s'ouvre dans un [nouvel onglet](../getting-started/lijsten.md#dans-un-nouvel-onglet).

## Quand un dossier ne peut pas être réparti

La raison figure alors dans la colonne *État*. Les plus fréquentes :

| Raison | Ce que vous faites |
|---|---|
| Pas de montant de commission sur le dossier | Reprenez sur la fiche la proposition du barème et enregistrez |
| Pas de pourcentage standard sur la fiche de l'intermédiaire | Complétez le pourcentage sur la fiche du bureau |
| Pas de siège choisi | Choisissez-le dans les paramètres de commission |
| Plusieurs formules avec un rythme différent | Choisissez sur la fiche la formule du crédit |
| Pas de rythme de paiement | Complétez le rythme sur la règle du barème ou sur l'institution de crédit |

Un dossier qui a déjà un schéma de commission payé par votre bureau ne figure pas sur cette liste : il est déjà réparti.

!!! info "La commission banque diffère de la proposition ?"
    La proposition du barème figure alors en dessous. C'est toujours le montant du dossier qui est réparti.

## Voir aussi

- [Barème des commissions](../beheer/commissiebarema.md)
- [Schémas de commission](commission-schemes.md)
- [Récupérations à confirmer](commission-clawback.md)
