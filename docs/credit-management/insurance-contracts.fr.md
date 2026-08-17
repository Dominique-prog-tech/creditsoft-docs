# Assurances

Cet écran vous montre toutes les **assurances solde restant dû** de votre bureau au même endroit : qui est assuré, auprès de quelle compagnie, pour quel montant et où en est la police.

![L'écran Assurances : en haut les listes de choix pour le produit, le statut et le responsable, avec à côté le nombre de polices affichées et le bouton Imprimer la liste ; en dessous le tableau indiquant par police les demandeurs, la compagnie, le produit, la date, le montant, la durée, le statut, le numéro de contrat, son caractère provisoire, les assurés et le responsable.](../images/verzekeringen-lijst-fr.png "Toutes les assurances solde restant dû du bureau"){ .volle-breedte }

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Listes**, puis sur **Assurances**.

## Choisir ce que vous voulez voir

En haut figurent trois listes de choix. Chacune est réglée par défaut sur « tous » et, ensemble, elles agissent comme un seul filtre.

- **Produit** — les produits d'assurance que vous proposez. Si vous n'en avez qu'un, la liste n'en propose qu'un.
- **Statut** — où en est la police : offre, acceptation médicale, police disponible, police signée, etc. En bas de cette liste figure **Aucun statut renseigné** : les polices qui n'ont pas encore de statut. Ce choix vous permet de les appeler de manière ciblée pour les mettre à jour.
- **Responsable** — le collaborateur qui suit le dossier.

À droite des listes de choix figure le nombre de lignes affichées sur le total, par exemple `2690 / 2990`.

## Les colonnes

| Colonne | Ce qu'elle affiche |
|---|---|
| **Demandeurs** | Les demandeurs du dossier de crédit auquel la police se rattache |
| **Compagnie** | L'assureur |
| **Produit** | Le produit d'assurance |
| **Date** | La date de début du contrat |
| **Montant** | Le capital assuré |
| **Durée** | En mois |
| **Statut** | Où en est la police ; vide lorsqu'aucun statut n'a jamais été renseigné |
| **N° de contrat** | Le numéro de police |
| **Provisoire** | Oui tant qu'il n'y a pas encore de numéro de police |
| **Assurés** | Qui est assuré — il ne s'agit pas nécessairement du demandeur |
| **Responsable** | Le collaborateur qui suit le dossier |
| **Lien** | Si le lien de demande a été envoyé au client |

Via le **sélecteur de colonnes**, vous en ajoutez deux : le **taux** du contrat et le **statut du dossier**.

!!! tip "Statut de la police ou statut du dossier ?"
    Ce sont deux choses différentes, volontairement placées côte à côte. **Statut** concerne la police — offre, acceptation médicale, signée. **Statut du dossier** concerne le dossier de crédit auquel cette police se rattache. Une police peut déjà être signée alors que le dossier est toujours en cours, et inversement. Si *Statut* est souvent vide, c'est qu'aucun statut de police n'a jamais été renseigné dans vos données ; *Statut du dossier* est toujours présent.

## Travailler avec la liste

- **Ouvrir le dossier** — double-cliquez sur la ligne ; vous arrivez sur le dossier de crédit auquel la police se rattache.
- **Rechercher** — le champ de recherche en haut à droite porte sur tout ce que vous voyez, y compris les noms.
- **Trier et filtrer** — cliquez sur un en-tête de colonne pour trier. Survolez un en-tête pour faire apparaître l'entonnoir : il filtre sur cette colonne. Pour les fourchettes et les combinaisons, voir [Filtrer et rechercher dans les listes](filteren-in-lijsten.md).
- **Choisir les colonnes** — le bouton à côté d'Exporter permet d'activer ou de désactiver des colonnes. Votre choix est conservé.
- **Exporter** — vers Excel ou CSV, avec les filtres actifs à ce moment-là.
- **Imprimer** — avec **Imprimer la liste**, voir ci-dessous.

## Imprimer ou transmettre la liste

**Imprimer la liste** génère un pdf des polices que vous voyez à cet instant. L'impression suit donc vos filtres : ce que vous avez écarté n'y figure pas. L'en-tête du document indique la sélection utilisée et le nombre de polices ; le bas de chaque page reprend la date de génération et la pagination.

L'impression n'est pas identique au tableau affiché à l'écran. Elle reprend le nom, la compagnie, la date, le montant, la durée, le taux, le statut de la police, le statut du dossier, son caractère provisoire, le numéro de contrat, les assurés, le lien et le produit. Le taux et le statut du dossier y figurent donc toujours, même si ces colonnes ne sont pas activées à l'écran.

Dès que l'impression est prête, elle s'affiche dans une fenêtre d'aperçu offrant deux possibilités :

- **Envoyer par courriel** — une fenêtre de rédaction s'ouvre avec le pdf déjà en pièce jointe, sur la base de votre modèle général. Vous complétez vous-même les destinataires et adaptez le texte si nécessaire.
- **Télécharger** — vous conservez le pdf sur votre ordinateur.

!!! note "Quels contrats apparaissent ici"
    Cet écran affiche les contrats des produits configurés comme **assurance solde restant dû**. Ces produits, c'est vous qui les déterminez : sous **Administration → Listes de choix**, chaque produit indique de quelle sorte il relève. Si vous y ajoutez un nouveau produit d'assurance, il apparaît ici automatiquement. Les prêts et les crédits hypothécaires n'ont pas leur place dans cette liste ; vous les retrouvez sur le dossier de crédit lui-même.
