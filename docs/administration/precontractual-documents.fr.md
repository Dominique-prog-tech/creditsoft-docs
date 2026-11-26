# Documents précontractuels

Avant d'intervenir dans un crédit, vous remettez au client plusieurs documents. CreditSoft en crée trois pour vous, chaque fois sur la base du modèle standard de la FVF, en néerlandais et en français :

- la **présentation du bureau** : l'identité de votre bureau, votre inscription auprès de la FSMA, le traitement des plaintes, la commission et l'exclusion de la responsabilité extracontractuelle ;
- la **fiche d'intermédiation crédit hypothécaire** : les données des demandeurs, l'analyse de leur situation (Partie I), votre recommandation (Partie II) et les annexes (Partie III) ;
- l'**analyse assurance solde restant dû** : les exigences et besoins du client pour une assurance-vie (Partie I), votre conseil (Partie II) et l'information que le client a reçue (Partie III). Elle n'existe que pour un bureau inscrit comme courtier d'assurance.

CreditSoft complète les données de votre bureau à partir de la [fiche d'entreprise](company-profile.md), et celles du dossier lorsque vous créez le document. Cette page explique comment adapter les documents à votre bureau, et comment les créer pour un dossier.

## Ouvrir l'écran

Cliquez dans la barre latérale sur **Administration**, puis sur la tuile **Documents précontractuels** (sous *Entreprise*). Seules les personnes autorisées à modifier la fiche d'entreprise voient la tuile et peuvent adapter les documents.

## La liste

<!-- AFBEELDING: la liste Documents précontractuels dans tenant_demo, avec la ligne Présentation du bureau, la colonne Documents (NL v1 · FR v1) et Dernière modification -->

Pour chaque document, vous voyez le nom, les versions qui existent par langue (par exemple *NL v2 · FR v1*) et la date de la dernière modification. Double-cliquez sur une ligne pour ouvrir le document.

Chaque document n'existe qu'une fois. Vous ne pouvez pas en ajouter un deuxième ni le supprimer : CreditSoft en a besoin pour créer le document d'un dossier.

## Les versions d'un document

Le document a un onglet par langue : **Néerlandais** et **Français**. Chaque onglet montre la version actuelle et la liste de toutes les versions, avec la date, la personne qui l'a enregistrée et la remarque qui l'accompagne.

<!-- AFBEELDING: l'onglet Français de Présentation du bureau dans tenant_demo, avec Version 2 par un collaborateur et Version 1 Fourni avec l'application, les boutons Modifier le document, Rétablir et Aperçu en PDF -->

- La **version 1** porte la remarque *Fourni avec l'application*. C'est le modèle standard de la FVF.
- **Aperçu en PDF** montre une version avec les données de votre bureau et la date du jour. Vous voyez ainsi le document tel que le client le reçoit.
- **Rétablir** refait d'une version précédente la version actuelle. Une nouvelle version au même contenu est créée ; rien n'est effacé. Pour revenir au modèle de la FVF, rétablissez la version 1.

## Adapter un document

Dans l'onglet de la langue, cliquez sur **Modifier le document**. Le document s'ouvre dans un éditeur qui fonctionne comme Word.

<!-- AFBEELDING: l'éditeur avec la présentation du bureau en français dans tenant_demo, avec les champs «KantoorNaam» à «KantoorWebsite» sous Identité, et en haut Remarque pour cette version, Vérifier et Aperçu en PDF -->

Les mots entre « » sont des **champs**. CreditSoft les complète au moment où le document est créé :

| Champ | Ce qui y figure |
|---|---|
| «KantoorNaam» | Le nom de votre bureau |
| «KantoorAdres» | Rue, numéro et boîte, code postal et localité, sur une ligne |
| «KantoorTelefoon» | Le numéro de téléphone |
| «KantoorEmail» | L'adresse e-mail |
| «KantoorWebsite» | Le site internet |
| «KantoorOndernemingsnummer» | Le numéro d'entreprise, sans *BE* devant |
| «KantoorFsmaNummer» | Le numéro FSMA |
| «Datum» | Le jour où le document est créé |
| «KlantNaam» | Les demandeurs du dossier |
| «DossierNummer» | Le numéro du dossier |

Les sept premiers proviennent de la fiche d'entreprise. Si une donnée n'y est pas remplie, une ligne pointillée apparaît, que le client ou vous complétez à la main. Vous insérez un champ par l'onglet **Publipostage** de l'éditeur.

La fiche d'intermédiation compte beaucoup plus de champs : ceux des demandeurs commencent par *A1* (le premier demandeur, la colonne de gauche) ou *A2* (le deuxième, la colonne de droite), comme «A1Naam» ou «A2NettoInkomen». L'éditeur les montre tous dans l'onglet **Publipostage**.

L'analyse assurance solde restant dû a ses propres champs. «KlantNaam» y est le nom du premier demandeur et «KlantVoornaam» son prénom ; les cases s'appellent «Vink…», comme «VinkAdvies». L'éditeur les montre aussi dans l'onglet **Publipostage**.

Indiquez en haut, dans **Remarque pour cette version**, ce que vous avez modifié, puis cliquez sur **Enregistrer comme nouvelle version**. À partir de ce moment, CreditSoft utilise cette version pour chaque nouveau document dans cette langue.

!!! info "Responsable du texte"
    Le modèle de la FVF est un texte standard pour les courtiers en crédit. Si vous adaptez le texte, il reste celui de votre bureau : CreditSoft ne vérifie pas s'il est conforme à la loi.

## Ce que CreditSoft complète dans la fiche d'intermédiation { #fiche }

| Partie de la fiche | Ce que CreditSoft complète |
|---|---|
| En-tête | Le nom, l'adresse, l'adresse e-mail, le téléphone, le site internet et le numéro d'entreprise de votre bureau |
| Renseignements relatifs au(x) client(s) | Par demandeur : nom, prénom, sexe, adresse, téléphone, GSM, lieu et date de naissance, adresse e-mail |
| 1. Situation personnelle | Le nombre d'enfants à charge et l'état civil |
| 2.1 Revenus mensuels | La date de début du statut, l'employeur, les revenus mensuels nets fixes, les allocations familiales, les revenus locatifs actuels et les autres revenus ; pour un indépendant, le numéro d'entreprise, la date de début et la nature de l'activité |
| 2.2 Charges mensuelles | Le loyer actuel, la pension alimentaire, et une ligne par crédit en cours des deux demandeurs |
| 4 et 5 | Les préférences et les besoins de l'onglet *Conseil* |
| Partie II | La case *Nous vous recommandons …*, avec les offres recommandées et leur établissement de crédit, ou la case *Nous ne pouvons pas vous recommander un produit de crédit* |
| Signature | La localité de votre bureau et la date |

- **Les montants** sont mensuels. Un revenu encodé par an compte pour un douzième.
- **Un crédit** est *à rembourser* (Oui) s'il est repris par le nouveau crédit. L'échéance finale provient de la date de fin du crédit. Sans crédit, des lignes vides restent à compléter à la main.
- **Partie II** : la première case est cochée dès que le conseil compte au moins une offre recommandée. La deuxième est cochée pour un conseil sans offre recommandée. Sans conseil, les deux restent vides.
- **Les autres cases** (statut professionnel, avantages, objectifs, fumeur, information électronique) restent vides : le client ou vous les cochez à la main.
- **La fiche a deux colonnes.** La première colonne est le premier demandeur du dossier, la deuxième colonne le deuxième. Si le dossier compte trois ou quatre demandeurs, CreditSoft crée une deuxième fiche pour les demandeurs 3 et 4. Si un demandeur est une société, CreditSoft ne complète que son identité.

## Ce que CreditSoft complète dans l'analyse assurance solde restant dû { #ssv }

L'analyse n'existe que pour un bureau inscrit auprès de la FSMA comme **courtier d'assurance** ; le document le dit aussi. Vous l'activez avec la case de la [fiche d'entreprise](company-profile.md#verzekeringsmakelaar). Sans cette case, CreditSoft ne crée pas l'analyse.

Le modèle de la FVF est une feuille Excel. CreditSoft en fait un document Word, avec le texte de la FVF tel quel. Vous affinez la mise en page dans l'éditeur, comme pour les autres documents.

| Partie de l'analyse | Ce que CreditSoft complète |
|---|---|
| Présentation de notre bureau | Le nom, l'adresse, l'adresse e-mail, le téléphone, le site internet, le numéro d'entreprise et l'IBAN de votre bureau |
| Vos coordonnées | Du premier demandeur : nom, prénom, adresse, date de naissance et numéro d'entreprise |
| Partie I | Particulier ou personne morale, les assurés, la garantie *Décès*, *dans le cadre d'un crédit : Oui*, la totalité ou une partie du capital, et la déductibilité fiscale |
| Partie II | Conseil ou pas de conseil, le produit, la motivation et si le client suit le conseil : ce que vous choisissez dans la fenêtre |
| Partie III | La case de la fiche client, si vous la cochez dans la fenêtre |
| Signature | La localité de votre bureau et la date |

- **Les assurés** sont les demandeurs assurés sur un contrat d'assurance solde restant dû du dossier (onglet *Contrats*), ou qui figurent sur une ligne de *Cautions, ASRD & réductions*. Le modèle prévoit de la place pour deux.
- **La totalité ou une partie** provient du pourcentage assuré sur les lignes de *Cautions, ASRD & réductions* : 100 % partout donne la totalité, sinon une partie avec le pourcentage. Un pourcentage de 0 ou supérieur à 100 ne compte pas.
- **Déductibilité fiscale** : *Oui* est coché si chaque ligne a la case *fiscal* cochée. CreditSoft ne coche jamais *Non*, car une ligne dont personne n'a touché la case est aussi sur non.
- **Le numéro de registre national et fumeur** ne sont jamais complétés par CreditSoft.
- **Les autres cases** (autres garanties, la prime, la durée, les assureurs avec lesquels votre bureau travaille, la rémunération) restent vides : le client ou vous les cochez à la main.

## Créer le document pour un dossier { #maken }

Ouvrez le dossier et cliquez sur l'onglet **Conseil**. Sous le résumé du conseil se trouve le bloc **Documents précontractuels**.

<!-- AFBEELDING: l'onglet Conseil d'un dossier dans tenant_demo, avec en bas le bloc Documents précontractuels, les boutons Créer la présentation du bureau et Créer la fiche d'intermédiation, et deux documents créés dans la liste -->

1. Cliquez sur **Créer la présentation du bureau**, **Créer la fiche d'intermédiation** ou **Créer l'analyse assurance solde restant dû**.
2. CreditSoft crée le document dans la langue du **premier demandeur** du dossier, avec la version actuelle de votre modèle.
3. Le document apparaît dans la liste avec la date et la personne qui l'a créé. Cliquez sur **Ouvrir** pour le consulter.

Le document est conservé dans les pièces jointes du dossier, dans la catégorie *Precontractueel*. Vous le retrouvez aussi dans le journal du dossier, sous *Pièces jointes*.

Un document créé ne change plus. Si vous adaptez ensuite la fiche d'entreprise, le dossier ou le modèle, créez le document à nouveau. Un deuxième document s'ajoute ; le premier reste, de sorte que vous pouvez toujours montrer ce que le client a reçu.

Vous avez besoin du droit de modifier le dossier. Le bloc ne figure pas dans le portail des apporteurs.

### La fenêtre de l'analyse assurance solde restant dû

Avec **Créer l'analyse assurance solde restant dû**, une fenêtre s'ouvre d'abord avec ce que CreditSoft ne connaît pas.

<!-- AFBEELDING: la fenêtre Analyse assurance solde restant dû dans tenant_demo, avec Notre bureau fournit un conseil sélectionné, Produit proposé et assureur complété, Motivation, Le client suit-il le conseil ? et la case de la fiche client -->

- Choisissez **Notre bureau fournit un conseil** ou **Pas de conseil**.
- **Produit proposé et assureur** (sans conseil : le produit souhaité par le client). CreditSoft complète au préalable le produit et l'assureur du dossier ; vous les adaptez.
- En cas de conseil, vous complétez la **motivation** et indiquez si le client **suit** le conseil : *Oui*, *Non* ou *Pas encore connu*. S'il ne le suit pas, vous complétez le produit qu'il souhaite.
- Cochez **La fiche client a été parcourue avec le client** si c'est le cas.

Cliquez sur **Créer l'analyse**. Ce que vous choisissez dans la fenêtre figure uniquement dans le document créé ; CreditSoft ne le conserve nulle part ailleurs. Si vous créez l'analyse à nouveau, vous complétez à nouveau la fenêtre.

Si votre bureau a un contrat OKSign, le bas de la fenêtre indique aussi qui signe, avec le bouton **Créer et faire signer**. Voir ci-dessous.

### Créer et faire signer { #ondertekenen }

Si votre bureau a un contrat avec OKSign, vous faites [signer électroniquement](../credit-management/ondertekenen.md) un document précontractuel dès sa création. Sans contrat, rien ne change : les boutons créent le document comme décrit ci-dessus.

<!-- AFBEELDING: la fenêtre Créer la présentation du bureau dans tenant_demo, avec l'explication, Qui signe avec le nom du client, et les boutons Créer, Annuler et Créer et faire signer -->

1. Cliquez sur **Créer la présentation du bureau** ou **Créer la fiche d'intermédiation**. Une fenêtre s'ouvre d'abord. Pour l'analyse assurance solde restant dû, c'est le bas de la fenêtre que vous connaissez déjà.
2. Sous *Qui signe* figurent les clients qui signent le document. S'il manque quelque chose chez quelqu'un, comme un numéro de GSM, c'est indiqué à côté de son nom, et vous ne pouvez pas faire signer.
3. Cliquez sur **Créer et faire signer**. Si vous voulez seulement imprimer ou envoyer le document par e-mail, cliquez sur **Créer**.

Qui signe :

- **La présentation du bureau** : tous les demandeurs du dossier.
- **La fiche d'intermédiation** : les demandeurs de cette fiche. Avec plus de deux demandeurs, CreditSoft crée une fiche par deux demandeurs, et chaque fiche part à ses propres demandeurs.
- **L'analyse assurance solde restant dû** : le client du document, c'est-à-dire le premier demandeur.

Vous, le courtier, ne signez pas électroniquement : votre bureau figure comme émetteur sur le document.

Sous le titre *Signature(s)* ou *Signatures* du document, CreditSoft place pour chaque client son nom et un cadre. OKSign y place la signature. Votre modèle ne change pas pour autant. Si vous avez retiré ce titre de votre modèle, les noms et les cadres figurent à la fin du document.

Chaque client reçoit un e-mail avec son propre lien. Le document n'est conservé que si OKSign l'accepte. Si OKSign refuse, ou si le service n'est pas joignable, rien n'est créé ni envoyé, et un message dans le bloc en donne la raison.

La liste des documents créés affiche alors la colonne **Signature** :

- **En attente de signature**, avec plusieurs clients le nombre de ceux qui ont déjà signé ;
- **Signé le** une date, avec **Version signée** pour ouvrir le document signé ;
- **Retirée le** une date.

Sous la liste figure chaque document encore en attente, avec pour chaque client **Copier le lien** et **Renvoyer l'e-mail**, et **Retirer…** pour toute la demande. Le document signé rejoint les pièces jointes du dossier, dans la catégorie *Ondertekend*. La personne qui l'a envoyé reçoit une [tâche](../journaal/taken.md) dès que tout le monde a signé.

## Erreurs fréquentes

!!! warning "Faire signer un document après coup"
    Ce n'est pas possible : vous le choisissez à la création. Si vous voulez quand même faire signer un document déjà créé, créez-le à nouveau avec **Créer et faire signer**. Le premier document reste.

!!! warning "Une ligne pointillée à la place d'une donnée"
    S'il y a une ligne pointillée au lieu de votre numéro de téléphone, de votre site internet ou de votre numéro d'entreprise, cette donnée manque dans la [fiche d'entreprise](company-profile.md). S'il s'agit d'une donnée du client, comme le sexe ou l'état civil, elle manque sur la fiche de cette relation. Complétez-la et créez le document à nouveau.

!!! warning "Le document dans la mauvaise langue"
    La langue suit la langue des documents du **premier demandeur**. Si elle est erronée, modifiez-la sur la fiche de cette relation et créez le document à nouveau.

!!! warning "Le bouton Créer l'analyse assurance solde restant dû manque"
    Ce bouton n'apparaît que si votre bureau figure comme courtier d'assurance sur la [fiche d'entreprise](company-profile.md#verzekeringsmakelaar).

## Voir aussi

- [Fiche d'entreprise](company-profile.md)
- [Dossiers de crédit](../credit-management/credit-files.md)
- [Conseil](../credit-management/advice.md)
- [Signature électronique (OKSign)](../credit-management/ondertekenen.md)
