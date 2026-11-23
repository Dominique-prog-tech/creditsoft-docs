# Factures

Sur cet écran, vous établissez les factures et les notes de crédit de votre bureau. Vous préparez une facture en brouillon, la rendez définitive, l'ouvrez en PDF et l'envoyez par e-mail à votre client. Une facture erronée se corrige par une note de crédit.

## Ouvrir l'écran

Dans le menu de gauche, cliquez sur **Factures**, sous *Facturation*.

Les factures d'un client ou d'un dossier se trouvent aussi sur leur fiche :

- sur un **dossier de crédit**, dans l'onglet *Factures* — voir [Dossiers de crédit](../credit-management/credit-files.md#factures) ;
- sur une **relation**, dans l'onglet *Factures* de la fiche, et dans le [tiroir du journal](../journaal/overzicht.md) à côté de la liste.

Trois droits déterminent ce que vous pouvez faire ici :

| Droit | Ce qu'il permet |
|---|---|
| **Voir les factures** | Ouvrir la liste, les fiches et le PDF |
| **Préparer des factures** | Préparer, modifier et supprimer un brouillon |
| **Rendre définitives et envoyer les factures** | Rendre définitive, envoyer par e-mail, envoyer via Peppol et créer une note de crédit |

Un utilisateur ordinaire peut consulter et préparer des factures. Qui peut les rendre définitives et les envoyer reçoit de votre administrateur un rôle avec ce droit — voir [Rôles](../administration/roles.md).

## La liste

![La liste Factures avec en haut l'année 2026, le filtre Tous les documents avec le nombre, les boutons Nouvelle facture et Exporter, et par ligne le numéro, la date, l'échéance, le client, le dossier, le type Facture ou Note de crédit, le total TVA comprise, le montant payé et le montant ouvert et la colonne Envoyée ; sur F-2026-0002, 400,00 est payé ; en haut, un brouillon sans numéro avec l'étiquette Brouillon.](../images/facturen-lijst-fr.png "Vos factures et notes de crédit de l'année"){ .volle-breedte }

Pour chaque facture, vous voyez le **numéro**, la **date**, l'**échéance**, le **client**, le **dossier**, le **total TVA comprise**, ce qui reste **ouvert**, et si elle a été **envoyée** : *Envoyée par e-mail*, et pour une facture partie via Peppol *Peppol:* avec le statut, par exemple *Peppol: livrée*. Si l'échéance est dépassée et qu'un montant reste ouvert, ce montant apparaît en **rouge**. Un brouillon n'a pas encore de numéro : il porte l'étiquette *Brouillon*. Via **Choisir les colonnes**, vous en ajoutez deux : le **type** (facture ou note de crédit) et ce qui est déjà **payé**.

- En haut, vous choisissez l'**année**, ou *Toutes les années*.
- À côté, vous n'affichez que ce qui est **Ouvert**, ou ce qui est **Échu** : ouvert, et l'échéance est dépassée. Une note de crédit non liée que vous devez encore rembourser compte aussi.
- **Nouvelle facture** ouvre une facture vide.
- **Exporter** place la liste dans Excel ou en CSV — voir [Travailler avec les listes](../getting-started/lijsten.md).
- Si des notes de crédit attendent d'être liées à leur facture, le bouton **Lier les notes de crédit** apparaît, avec leur nombre — voir [Lier les notes de crédit](creditnotas-koppelen.md).

Double-cliquez une ligne pour ouvrir la facture.

## Préparer une facture

Cliquez sur **Nouvelle facture**. La facture commence comme **brouillon** : vous pouvez encore la modifier, et elle n'a pas encore de numéro.

![Une facture en brouillon : en haut l'étiquette Brouillon, puis la carte Client avec le client, À l'attention de, le dossier, le libellé et le champ Votre référence avec l'indication grise Vide : le numéro de dossier ; ensuite la carte Dates avec la date de facture, l'échéance et la date de la prestation, et la carte Lignes avec une ligne et les totaux par taux de TVA.](../images/factuur-fiche-klad-fr.png "Une facture en brouillon"){ .volle-breedte }

### Client

- **Client** — une personne ou une entreprise parmi vos relations. Obligatoire.
- **À l'attention de** — texte libre, par exemple la personne de contact dans une entreprise.
- **Dossier** — le dossier de crédit auquel cette facture se rapporte. Vous choisissez parmi les dossiers où ce client est **demandeur**. Facultatif.
- **Libellé** — figure comme *Concerne* sur la facture.
- **Votre référence** — la référence donnée par votre client, par exemple le numéro de son bon de commande. Voir [Votre référence](#votre-reference) ci-dessous.

### Dates

- **Date de facture** — aujourd'hui par défaut.
- **Échéance** — la date de facture plus le délai de paiement des [Paramètres de facturation](../beheer/factuurinstellingen.md). Si vous modifiez la date de facture, l'échéance suit, sauf si vous l'avez adaptée vous-même.
- **Date de la prestation** — facultative.

### Lignes

Cliquez sur **Ajouter une ligne**. Dans la fenêtre, vous complétez :

- **Article** — si vous choisissez un article, CreditSoft remplit pour vous le libellé, le prix et le code TVA. Avec *Aucun — ligne libre*, vous saisissez tout vous-même.
- **Code TVA** — obligatoire. Le code par défaut est déjà proposé.
- **Libellé**, **Quantité**, **Prix hors TVA** et **Remise (%)**.

Cliquez sur **Appliquer**. Sous les lignes figurent les totaux : la **TVA par taux**, le total hors TVA, la TVA et le total TVA comprise. Double-cliquez une ligne pour la modifier ou la supprimer.

Cliquez sur **Enregistrer** pour conserver le brouillon. Un brouillon dont vous n'avez plus besoin se supprime avec **Supprimer le brouillon**.

!!! tip "Une facture à partir d'un dossier"
    Dans l'onglet *Factures* d'un dossier de crédit se trouve le bouton **Créer une facture**. La nouvelle facture a alors déjà le premier demandeur comme client et le dossier rempli. Si le dossier a une charte, le montant de la charte y figure déjà comme ligne. Les dossiers avec charte qui attendent encore leur facture apparaissent dans [À facturer](te-factureren.md).

### Votre référence

Chaque facture définitive porte une **référence** pour votre client : c'est avec elle qu'il comptabilise la facture. Si vous laissez le champ vide, CreditSoft reprend le **numéro de dossier** au moment de *Rendre définitive*. Le champ indique lui-même ce qui se passera : *Vide : le numéro de dossier (DEMO-1003)*, ou *Obligatoire sans dossier*.

Une facture sans dossier et sans référence ne devient pas définitive.

## Rendre définitive

Quand le brouillon est en ordre, cliquez sur **Rendre définitive** et confirmez. À ce moment :

- la facture reçoit le **numéro suivant** de l'année : *F-2026-0001*, *F-2026-0002*, et ainsi de suite, sans trou. Une note de crédit suit sa propre série : *CN-2026-0001* ;
- elle reçoit une **communication structurée** (*+++…+++*) pour le paiement ;
- les **données du client sont figées** telles qu'elles sont à ce moment : nom, adresse, numéro de TVA et langue. Si vous modifiez ensuite la fiche de la relation, la facture reste telle qu'elle était ;
- le **PDF est conservé**.

La facture ne peut ensuite plus être modifiée ni supprimée. Une erreur se corrige par une [note de crédit](#corriger-une-facture-la-note-de-credit).

![Une facture définitive F-2026-0002 avec l'étiquette Définitive : le client, le dossier et les lignes sont en lecture seule ; en dessous, le bloc Paiement et correction avec la communication structurée, 400,00 payé, 90,75 crédité avec le lien vers la note de crédit CN-2026-0001 et 295,75 ouvert ; puis le bloc Paiements avec l'étiquette Partiellement payée, les boutons Payée intégralement et Saisir un paiement… et un paiement de 400,00 par virement avec les boutons Modifier et Supprimer ; en bas, les boutons PDF, Envoyer par e-mail et Créer une note de crédit.](../images/factuur-fiche-fr.png "Une facture définitive, partiellement payée et partiellement corrigée"){ .volle-breedte }

!!! warning "Ce qui empêche de rendre une facture définitive"
    CreditSoft refuse, et dit pourquoi, quand :

    - la facture n'a **pas de lignes**, ou une ligne **sans code TVA** ;
    - un code TVA demande une **mention légale** qui est vide — complétez-la dans [Codes TVA et articles](../beheer/btw-codes-en-artikelen.md) ;
    - l'**échéance précède la date de facture** ;
    - votre [Fiche d'entreprise](../administration/company-profile.md) ne contient **pas d'IBAN valide** — sans numéro de compte, votre client ne peut pas payer ;
    - l'**adresse du client** est incomplète : la rue, le code postal, la commune et le pays doivent figurer dans l'adresse principale de sa fiche de relation ;
    - il n'y a **ni référence ni dossier** — voir [Votre référence](#votre-reference).

### Paiement et correction

En bas d'une facture définitive figurent :

- la **communication structurée** ;
- **Payé** — ce qui a déjà été payé ;
- **Crédité** — ce que les notes de crédit de cette facture corrigent, avec un lien vers chaque note de crédit ;
- **Ouvert** — ce qui reste à payer.

### Paiements

En dessous figure le bloc **Paiements**, avec le statut de paiement : *Ouverte*, *Partiellement payée*, *Payée* ou *Compensée*.

- **Payée intégralement** enregistre en un clic ce qui reste ouvert, à la date du jour, par virement.
- **Saisir un paiement…** ouvre une fenêtre avec la **date** (par défaut aujourd'hui), le **montant** (par défaut ce qui reste ouvert), le **mode de paiement** et éventuellement une **référence** et une **remarque**.
- **Modifier** et **Supprimer** adaptent un paiement. Un paiement supprimé reste conservé : dans l'historique de la facture et dans le journal des actions.

Sur une **note de crédit** liée à aucune facture, le bloc s'appelle **Remboursements**, avec les boutons **Remboursée intégralement** et **Saisir un remboursement…** : vous y enregistrez ce que vous avez remboursé au client. Une note de crédit liée à sa facture y est compensée ; il n'y a rien à payer.

!!! info "Ce qui n'est pas possible"
    - **Saisir plus que le montant ouvert.** La fenêtre indique combien il reste ouvert.
    - **Une date dans le futur.** Un paiement est un fait accompli. Une date antérieure à la date de facture est permise, pour un acompte.
    - **Payer un brouillon.** Un brouillon n'a pas encore de numéro ni de communication.

## Le PDF

Cliquez sur **PDF**. La facture s'ouvre dans un nouvel onglet, telle que votre client la reçoit.

![Le PDF de la facture F-2026-0003 : en haut l'en-tête du bureau, puis le titre FACTURE avec le numéro, la date, l'échéance, la communication et votre référence, à droite le nom et l'adresse du client ; ensuite les lignes, la TVA par taux et le total à payer, et en bas la phrase de paiement avec le numéro de compte et la communication, le QR code de paiement et le pied de page.](../images/factuur-pdf-fr.png "La facture telle que votre client la reçoit"){ .volle-breedte }

Le PDF contient :

- votre **en-tête** — logo, adresse et coordonnées de votre [Fiche d'entreprise](../administration/company-profile.md) ;
- le **nom et l'adresse de votre client**, avec son numéro de TVA ;
- le **numéro**, la **date**, l'**échéance**, la **communication** et **votre référence** ;
- les **lignes**, la **TVA par taux** et le **total à payer** ;
- la **mention légale** d'un code TVA exonéré ou en autoliquidation ;
- la **phrase de paiement** avec votre numéro de compte et la communication, et un **QR code de paiement** : votre client le scanne avec son application bancaire, et le montant, le compte et la communication sont aussitôt corrects ;
- le **pied de page** des [Paramètres de facturation](../beheer/factuurinstellingen.md).

Le PDF est dans la **langue du client** — la langue des documents sur sa fiche de relation — et non dans votre propre langue. Un client néerlandophone reçoit donc une facture en néerlandais.

!!! info "La copie conservée"
    Au moment de *Rendre définitive*, CreditSoft conserve le PDF. Ensuite, **PDF** ouvre toujours cette copie. Si vous modifiez plus tard votre logo ou votre numéro de compte, la facture que votre client a reçue reste celle que vous conservez.

Une **note de crédit** n'a ni échéance, ni phrase de paiement, ni QR code : il n'y a rien à payer. Elle mentionne la facture qu'elle corrige.

## Envoyer par e-mail

Cliquez sur **Envoyer par e-mail**. La fenêtre *Nouveau courrier* s'ouvre, déjà remplie :

- **À** — l'**adresse de facturation** du client : une adresse e-mail supplémentaire du type *Facturation* sur sa fiche de relation. S'il n'en a pas, son adresse e-mail habituelle ;
- l'**objet** et le **texte** du modèle d'e-mail *Facture ou note de crédit*, dans la langue du client ;
- le **PDF** en pièce jointe.

![La fenêtre Nouveau courrier pour la facture F-2026-0001 : le destinataire et l'expéditeur remplis, l'objet Facture F-2026-0001 avec le nom du bureau, le texte avec la formule d'appel, le numéro, la date et le montant de la facture, et en bas le PDF de la facture en pièce jointe avec les boutons Envoyer et Annuler.](../images/factuur-mailen-fr.png "Envoyer la facture à votre client"){ .volle-breedte }

Relisez, adaptez ce que vous voulez, et cliquez sur **Envoyer**. Le courriel apparaît dans le courrier du client, et la facture porte désormais l'étiquette **Envoyée le** avec la date. Vous pouvez envoyer une facture une nouvelle fois.

Le texte du courriel s'adapte dans les [Modèles d'e-mail](../administration/mail-templates.md).

## La facture électronique (UBL)

Pour une facture à une **entreprise belge** — un client avec un numéro de TVA belge — vous trouvez sous le bouton **Plus…** l'action **Facture électronique (UBL)**. Elle télécharge la facture en **facture électronique** : le fichier que lisent un logiciel comptable et le réseau Peppol, selon la norme européenne (Peppol BIS Billing 3.0). Le PDF y est inclus, de sorte que qui ouvre le fichier dispose aussi de l'image de la facture.

- La facture électronique est créée **une seule fois**, la première fois que vous cliquez dessus ou qu'elle part [via Peppol](#envoyer-via-peppol). Ensuite, vous recevez toujours le même fichier, même si votre fiche d'entreprise change entre-temps — comme le PDF.
- Le fichier porte le nom du PDF, avec *.xml* au lieu de *.pdf*.
- Si la facture électronique ne peut pas être créée, un message en donne la raison, et rien n'est enregistré. Par exemple : l'IBAN manque sur votre [Fiche d'entreprise](../administration/company-profile.md), ou la facture n'a pas de *Votre référence* (uniquement pour les factures rendues définitives avant que celle-ci ne soit obligatoire).

Le bouton n'est **pas** présent pour une facture à un particulier — un particulier ne reçoit pas de factures électroniques —, ni pour un client étranger, un brouillon ou une facture du programme précédent.

## Envoyer via Peppol

**Peppol** est le réseau européen par lequel les entreprises échangent des factures électroniques. Via Peppol, votre facture arrive directement dans le logiciel comptable de votre client, sans e-mail et sans que personne doive la retaper. Ce qui part, c'est la facture électronique décrite ci-dessus : le même fichier que celui que vous téléchargez avec **Facture électronique (UBL)**, PDF inclus.

### Quand le bouton apparaît

Sur une facture ou une note de crédit définitive, le bouton **Envoyer via Peppol** apparaît quand :

- **Peppol est activé pour votre bureau.** C'est ADM qui l'active pour vous, bureau par bureau, après avoir enregistré votre bureau comme expéditeur Peppol sous le numéro d'entreprise de votre [Fiche d'entreprise](../administration/company-profile.md). Sans cet enregistrement, le réseau refuserait chaque facture. Vous souhaitez envoyer via Peppol ? Demandez-le à ADM.
- le client a un **numéro de TVA belge** : la même condition que pour la facture électronique. Un particulier et un client étranger ne reçoivent rien via Peppol ;
- vous avez le droit **Rendre définitives et envoyer les factures** ;
- la facture n'est **pas encore partie via Peppol**, ou la tentative précédente a été [refusée](#en-cas-de-refus).

### Envoyer la facture

1. Ouvrez la facture et cliquez sur **Envoyer via Peppol**.
2. La fenêtre crée la facture électronique et recherche votre client sur le réseau. Elle affiche l'**adresse Peppol du client** : *0208:* suivi des dix chiffres de son numéro d'entreprise.
3. En dessous, elle indique si le client peut recevoir la facture.
4. S'il le peut, cliquez sur **Envoyer**. Sinon, seul le bouton **Fermer** apparaît.

| Ce que dit la fenêtre | Ce que vous faites |
|---|---|
| *Le client est sur Peppol et peut recevoir des factures électroniques.* | Cliquez sur **Envoyer**. |
| *Le client n'est pas sur Peppol et ne peut pas (encore) recevoir de factures électroniques.* | Fermez la fenêtre et [envoyez la facture par e-mail](#envoyer-par-e-mail). |
| *Le client est sur Peppol, mais ne peut pas y recevoir de factures.* | Fermez la fenêtre et envoyez la facture par e-mail. |
| *Non vérifié : ADM One n'a pas répondu.* | Réessayez plus tard. CreditSoft ne sait pas alors si le client est sur Peppol, et n'envoie rien. |

Pour une note de crédit, la fenêtre parle de *notes de crédit* au lieu de *factures électroniques*. Si la facture électronique ne peut pas être créée, la raison apparaît en rouge, comme avec **Facture électronique (UBL)**.

Quand vous cliquez sur **Envoyer**, la fenêtre indique comment cela s'est passé :

- *Envoyée via Peppol.* Le réseau a la facture. La livraison chez votre client suit généralement dans la minute.
- *Proposée. Le réseau Peppol est temporairement indisponible.* ADM enverra la facture lui-même dès que possible, pendant 24 heures au maximum. Ne la renvoyez pas.
- *Proposée. Il n'est pas encore certain que le réseau ait reçu la facture.* ADM vérifie. Ne la renvoyez pas.
- *Non envoyée : le réseau Peppol a refusé la facture.* Avec la raison à la suite. Rien n'est parti : voir [En cas de refus](#en-cas-de-refus).
- *Pas de réponse du réseau Peppol : la facture est peut-être partie.* Réessayez sans crainte. Une facture déjà partie ne repart pas une seconde fois ; vous voyez alors son statut.

### Après l'envoi : le statut

Une facture partie via Peppol porte en haut l'étiquette **Via Peppol le** avec la date et le statut :

| Statut | Signification |
|---|---|
| *acceptée par le réseau* | Le réseau a la facture. La confirmation de livraison doit encore suivre. |
| *en file d'attente chez ADM* | Le réseau était momentanément indisponible. ADM envoie la facture lui-même. |
| *incertain — ADM vérifie* | Il n'est pas encore certain que le réseau ait reçu la facture. |
| *livrée* (vert) | La facture est arrivée chez votre client. |
| *échec* ou *refusée par le destinataire* (rouge) | La facture n'est pas arrivée. Voir [En cas de refus](#en-cas-de-refus). |

Si une facture est encore sur *acceptée par le réseau* après une heure, l'étiquette ajoute qu'il n'y a pas encore de confirmation de livraison. Renseignez-vous alors auprès d'ADM.

- CreditSoft récupère **lui-même** le statut quand vous ouvrez la facture, tant qu'il peut encore changer.
- Avec **Plus…** puis **Actualiser le statut Peppol**, vous le demandez immédiatement. Toute personne qui peut consulter la facture peut le faire.
- Dans la liste, le statut figure dans la colonne **Envoyée**.

L'e-mail et Peppol sont indépendants : une facture peut recevoir les deux, et porte alors les deux étiquettes.

### En cas de refus

Vous voyez un refus à deux moments :

- **à l'envoi** : la fenêtre indique *Non envoyée : le réseau Peppol a refusé la facture*, avec la raison. Rien n'est parti ;
- **plus tard** : le statut devient *échec* ou *refusée par le destinataire*. Si vous rouvrez **Envoyer via Peppol**, la fenêtre affiche en haut *Tentative précédente :* avec le statut et la raison.

Dans les deux cas, le bouton **Envoyer via Peppol** réapparaît. Ce que vous faites ensuite dépend de la question de savoir si la facture électronique est déjà figée. La fenêtre indique elle-même de quel cas il s'agit :

- **La facture électronique n'est pas encore figée.** Corrigez ce que la raison indique, par exemple sur votre [Fiche d'entreprise](../administration/company-profile.md), et renvoyez. La facture électronique est alors recréée, avec votre correction. Elle n'est figée que lorsque le réseau l'accepte.
- **La facture électronique est déjà figée**, parce qu'elle a été téléchargée ou déjà envoyée. Renvoyer aide si l'erreur venait du destinataire ou du réseau. Si elle se trouvait dans la facture ou sur votre fiche d'entreprise, établissez une [note de crédit](#corriger-une-facture-la-note-de-credit) et une nouvelle facture.

## Corriger une facture : la note de crédit

Si une facture définitive n'est pas correcte, vous créez une **note de crédit**. Une facture ne se supprime pas.

1. Ouvrez la facture et cliquez sur **Créer une note de crédit**.
2. Un **brouillon** de note de crédit s'ouvre, avec le même client, le même dossier, la même référence et les mêmes lignes. Il est déjà lié à la facture.
3. Si vous ne corrigez qu'une partie, adaptez les lignes : réduisez les montants ou supprimez une ligne.
4. Cliquez sur **Rendre définitive**.

Sur la facture, la note de crédit figure ensuite sous **Crédité**, et le montant ouvert diminue. Ensemble, les notes de crédit d'une facture ne peuvent pas dépasser la facture elle-même. Quand la facture est entièrement corrigée, le bouton disparaît.

Sur la fiche d'une note de crédit figure le bloc **Correction** : la facture qu'elle corrige. Une note de crédit liée à aucune facture compte comme ouverte ; avec **Lier à une facture…**, vous choisissez la facture du même client qu'elle corrige, et avec **Annuler la liaison**, vous la détachez à nouveau.

## Factures avec l'étiquette « Du programme précédent »

Les factures qui portent cette étiquette sont en lecture seule. Elles n'ont pas de PDF : l'original existe déjà. **Créer une note de crédit** reste possible — c'est ainsi que vous annulez une facture encore ouverte.

Vous pouvez aussi y saisir des **paiements**. Un paiement repris de l'ancien programme porte l'étiquette *Repris* : il se modifie ou se supprime là-bas, pas ici. Une prochaine reprise annulerait sinon votre modification.

## Erreurs fréquentes

!!! warning
    - **Supprimer une facture erronée.** Ce n'est pas possible, et c'est voulu : une facture définitive a un numéro qui ne disparaît jamais. Créez une note de crédit.
    - **Rendre définitive une facture pour un client sans adresse complète.** Complétez d'abord l'adresse principale sur sa fiche de relation — pays compris.
    - **Envoyer une facture en français à un client néerlandophone.** La langue de la facture vient de la langue des documents du client. Si elle est erronée, corrigez-la avant de rendre la facture définitive.
    - **Chercher le bouton Facture électronique pour une entreprise sans numéro de TVA.** Ce bouton n'apparaît que si le client a un numéro de TVA belge. Complétez-le sur sa fiche de relation avant de rendre la facture définitive : la facture fige les données du client telles qu'elles sont à ce moment.
    - **Télécharger la facture électronique avant de l'envoyer via Peppol.** Un téléchargement fige la facture électronique. Si le réseau la refuse ensuite à cause d'une erreur sur votre fiche d'entreprise, la renvoyer ne reprend pas votre correction. Envoyez d'abord, téléchargez ensuite.

## Voir aussi

- [À facturer](te-factureren.md)
- [Lier les notes de crédit](creditnotas-koppelen.md)
- [Codes TVA et articles](../beheer/btw-codes-en-artikelen.md)
- [Paramètres de facturation](../beheer/factuurinstellingen.md)
- [Modèles d'e-mail](../administration/mail-templates.md)
- [Relations](../crm/relations.md)
