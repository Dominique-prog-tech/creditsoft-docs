# Documents précontractuels

Avant d'intervenir dans un crédit, vous remettez au client plusieurs documents. CreditSoft crée pour vous la **présentation du bureau** : le document qui reprend l'identité de votre bureau, votre inscription auprès de la FSMA, le traitement des plaintes, la commission et l'exclusion de la responsabilité extracontractuelle. Il part du modèle standard de la FVF, en néerlandais et en français, et complète les données de votre bureau à partir de la [fiche d'entreprise](company-profile.md).

Cette page explique comment adapter le document à votre bureau, et comment le créer pour un dossier.

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

Indiquez en haut, dans **Remarque pour cette version**, ce que vous avez modifié, puis cliquez sur **Enregistrer comme nouvelle version**. À partir de ce moment, CreditSoft utilise cette version pour chaque nouveau document dans cette langue.

!!! info "Responsable du texte"
    Le modèle de la FVF est un texte standard pour les courtiers en crédit. Si vous adaptez le texte, il reste celui de votre bureau : CreditSoft ne vérifie pas s'il est conforme à la loi.

## Créer le document pour un dossier { #maken }

Ouvrez le dossier et cliquez sur l'onglet **Conseil**. Sous le résumé du conseil se trouve le bloc **Documents précontractuels**.

<!-- AFBEELDING: l'onglet Conseil d'un dossier dans tenant_demo, avec en bas le bloc Documents précontractuels, le bouton Créer la présentation du bureau et un document créé dans la liste -->

1. Cliquez sur **Créer la présentation du bureau**.
2. CreditSoft crée le document dans la langue du **premier demandeur** du dossier, avec la version actuelle de votre modèle.
3. Le document apparaît dans la liste avec la date et la personne qui l'a créé. Cliquez sur **Ouvrir** pour le consulter.

Le document est conservé dans les pièces jointes du dossier, dans la catégorie *Precontractueel*. Vous le retrouvez aussi dans le journal du dossier, sous *Pièces jointes*.

Un document créé ne change plus. Si vous adaptez ensuite la fiche d'entreprise ou le modèle, créez le document à nouveau. Un deuxième document s'ajoute ; le premier reste, de sorte que vous pouvez toujours montrer ce que le client a reçu.

Vous avez besoin du droit de modifier le dossier. Le bloc ne figure pas dans le portail des apporteurs.

## Erreurs fréquentes

!!! warning "Une ligne pointillée à la place d'une donnée"
    S'il y a une ligne pointillée au lieu de votre numéro de téléphone, de votre site internet ou de votre numéro d'entreprise, cette donnée manque dans la [fiche d'entreprise](company-profile.md). Complétez-la et créez le document à nouveau.

!!! warning "Le document dans la mauvaise langue"
    La langue suit la langue des documents du **premier demandeur**. Si elle est erronée, modifiez-la sur la fiche de cette relation et créez le document à nouveau.

## Voir aussi

- [Fiche d'entreprise](company-profile.md)
- [Dossiers de crédit](../credit-management/credit-files.md)
- [Conseil](../credit-management/advice.md)
