# Barème des commissions

Le barème, c'est ce que les compagnies paient à votre bureau par crédit conclu : le pourcentage, les limites, les conditions et le rythme de paiement. CreditSoft s'en sert pour proposer la commission d'un dossier, la répartir entre le bureau apporteur et le bureau principal, et calculer ce qu'une compagnie récupère quand un crédit se termine plus tôt.

Si votre bureau ne travaille pas avec un barème, laissez cet écran vide. Aucune proposition n'apparaît alors.

## Ouvrir l'écran

Allez dans **Administration** en bas du menu, et cliquez sous *Crédit* sur la tuile **Barème des commissions**. Il vous faut le droit de gérer les paramètres de commission.

![L'écran Barème des commissions avec la liste des versions : par ligne le nom Commissiebarema 2026, la date Valable à partir du 01/01/2026, le nombre de règles et de compagnies, et l'étiquette En vigueur ; en haut le bouton Nouvelle version et le lien Importer depuis un fichier.](../images/commissiebarema-versies-fr.png "Les versions du barème de votre bureau"){ .volle-breedte }

## Versions

Un barème change quelques fois par an. Chaque changement est une nouvelle **version** avec une date **Valable à partir du**. Une version s'applique aux dossiers dont la **date d'acte** tombe à partir de cette date, jusqu'au début de la version suivante. Si un dossier n'a pas encore d'acte, c'est la date d'introduction qui compte, sinon aujourd'hui.

Un dossier de l'an dernier calcule donc avec le barème de l'an dernier, même après l'introduction d'une nouvelle version. L'étiquette **En vigueur** figure à côté de la version valable aujourd'hui.

### Une nouvelle version

Cliquez sur **Nouvelle version**. Vous indiquez un nom et la date *Valable à partir du*. Sous **Sur la base de**, choisissez une version précédente : toutes ses règles suivent, y compris les paliers de réduction de taux et de récupération, et vous n'adaptez que ce qui a changé. Avec **Commencer vide**, vous introduisez toutes les règles vous-même.

### Importer une version depuis un fichier

Vous recevez le barème sous forme de liste de dizaines de règles ? Vous ne devez pas les introduire une à une. Avec **Importer depuis un fichier** en haut de la liste, vous importez une version complète en une fois.

1. Donnez à la version un **nom** et une date **Valable à partir du**.
2. Cliquez sur **Choisir un fichier** et choisissez le fichier csv. CreditSoft indique combien de règles, de compagnies et de produits il contient. S'il manque une colonne, son nom est indiqué.
3. **Liez** chaque compagnie du fichier à une institution de crédit de votre bureau. Si une règle mentionne un produit, choisissez les produits concernés, ou cochez **Tout produit**. CreditSoft ne lie rien lui-même, même si le nom semble identique.
4. Vérifiez l'**aperçu** : par règle l'institution de crédit, la commission, la renonce à la commission, la récupération et ce qui ne va pas. Avec **Seulement les règles avec un problème**, vous ne voyez que ces règles.
5. Cliquez sur **Importer**.

L'importation se fait en une fois : si une seule règle échoue, rien n'est enregistré. S'il manque encore quelque chose, le message en haut l'indique. La nouvelle version s'ouvre ensuite, et vous y modifiez une règle comme toute autre.

![La page Importer un barème depuis un fichier : en haut le nom et la date Valable à partir du de la nouvelle version, en dessous le fichier choisi avec le nombre de règles, de compagnies et de produits, le bloc Lier à votre bureau avec par compagnie une institution de crédit et par produit les produits ou la case Tout produit, et en bas l'aperçu avec l'étiquette prêt à importer.](../images/commissiebarema-inlezen-fr.png "Importer une version depuis un fichier"){ .volle-breedte }

#### Le fichier

Un fichier csv avec un **point-virgule** entre les colonnes et une ligne d'en-tête avec les noms ci-dessous. Chaque colonne doit être présente, même vide ; d'autres colonnes (par exemple des remarques) peuvent s'y ajouter. Une ligne par compagnie, ou par formule.

| Colonne | Contenu | Exemple |
|---|---|---|
| `nr` | Numéro d'ordre ; détermine l'ordre | `12` |
| `maatschappij`, `formule`, `product` | Le nom comme dans le barème ; vous le liez lors de l'importation | `Record` |
| `percentage` ou `vast_bedrag` | La commission | `2,25` · `1000` |
| `min_commissie`, `max_commissie`, `plafond_kredietbedrag` | Limites | `10000` |
| `looptijd_vanaf_mnd`, `looptijd_tot_mnd`, `rente_vanaf`, `rente_tot` | Conditions (« à partir de » est inclus, « jusqu'à » non) | `84` |
| `ingediend_van`, `ingediend_tot`, `akte_van`, `akte_tot` | Dates (toutes deux incluses) | `15/09/2026` |
| `uitbetaling_direct_pct`, `uitbetaling_spreiding_mnd`, `uitbetaling_spreiding_vanaf_mnd` | Partie directe, reste étalé | `50` · `24` · `2` |
| `uitbetaling_gepland` | Paiements planifiés : mois et part | `1:50 | 12:25 | 24:25` |
| `afstand_trappen` | Réduction de taux : renonce / réduction, éventuellement une condition | `0,25/0,15; 0,50/0,20` |
| `terugvordering_trappen` | Par palier, séparé par une barre verticale : dans combien de mois · percentage ou prorata · uitbetaald ou upfront · part · prorata sur combien de mois. Séparez les paliers par un point-virgule | `24|percentage|upfront|50|` |
| `stop_spreiding` | La commission étalée est-elle annulée ? | `ja` ou `nee` |
| `terugvordering`, `info` | Explication et pour info, en texte | |

Les noms des colonnes et les mots `ja`, `nee`, `percentage`, `prorata`, `uitbetaald` et `upfront` restent en néerlandais. Écrivez les nombres avec une **virgule** et **sans** point des milliers (`1250000`, pas `1.250.000`), les dates au format jj/mm/aaaa.

Cliquez sur une version dans la liste pour voir ses règles. Vous y modifiez le nom, la date et les remarques, et **Supprimer** retire une version. Les dossiers dont l'acte tombait dans cette version calculent alors avec la précédente.

![Une version du barème : en haut le nom, la date Valable à partir du et les remarques, en dessous les règles avec par règle la compagnie, la formule, la commission, les conditions, le paiement et la renonce à la commission — Record à 2,25 % avec trois paliers, VSW avec Formule A et Formule B, et Allianz.](../images/commissiebarema-versie-fr.png "Une version et ses règles"){ .volle-breedte }

## Une règle

Une règle correspond à une compagnie, ou à une **formule** d'une compagnie qui en a plusieurs (par exemple *Formule A* et *Formule B*). **+ Ajouter une règle** en crée une ; double-cliquez une règle pour la modifier.

![Le bas de la page d'une règle : le paiement par la compagnie avec 50 % direct et le reste étalé sur 24 mois à partir du mois 2, en dessous le bloc Réduction de taux par renonce à la commission avec trois paliers et ce que devient chaque fois la commission, et le bloc Récupération en cas de remboursement anticipé ou d'exigibilité avec la case pour la commission étalée et un palier : dans les 24 mois, 50 % de la partie upfront.](../images/commissiebarema-regel-fr.png "Une règle avec renonce à la commission et récupération")

### Compagnie et formule

- **Compagnie** — l'institution de crédit, comme sur le dossier.
- **Formule** — uniquement si la compagnie a plusieurs règles. Laissez vide s'il n'y en a qu'une.
- **Produits** — les produits concernés par cette règle. Un contrat avec un tel produit choisit alors cette règle lui-même. Laissez vide pour que la règle vaille pour tous les produits.

### La commission

Choisissez **Pourcentage du crédit**, **Montant fixe** ou **Pour info**.

- **Pourcentage** — du montant du crédit. *Calculé sur au plus* limite le montant de calcul (par exemple 1.000.000).
- **Montant fixe** — un seul montant par crédit, quel que soit le montant du crédit.
- **Commission minimale** et **maximale** — des limites sur le résultat.
- **Pour info** — la règle ne calcule pas ; elle figure pour qui relit le barème. « Pas de commission » est un pourcentage de 0.

### Conditions

Laissez vide ce qui ne compte pas. Une règle ne s'applique que si **toutes** les conditions remplies sont vérifiées ; s'il manque une donnée sur le dossier (par exemple la durée), la règle ne s'applique pas.

- **Durée** et **taux** — « à partir de » est inclus, « moins de » ne l'est pas. « Plus de 7 ans » = *à partir de 84 mois*, « moins de 7 ans » = *moins de 84*.
- **Date d'introduction** et **date d'acte** — les deux dates sont incluses.

### Paiement par la compagnie

Le rythme auquel la compagnie paie votre bureau. Les schémas de commission du bureau et du bureau principal suivent le même rythme.

- **Selon l'institution de crédit** — le schéma figurant sur la fiche de l'institution de crédit.
- **Une partie directe, le reste étalé** — un pourcentage le mois après l'acte, le reste sur un nombre de mois.
- **Paiements planifiés** — par paiement, le mois après l'acte et la part. Au total 100 %.

### Réduction de taux par renonce à la commission

Chez certaines compagnies, le client obtient un taux plus bas si vous renoncez à une partie de votre commission. Chaque **palier** indique combien de points de commission vous cédez et combien de points de réduction de taux le client obtient. La colonne *Commission devient* montre ce qui reste du pourcentage.

- Introduisez toujours un palier comme **renonce en points**, même si la compagnie montre une échelle. Si elle indique *1,75 %* pour une base de 2,25 %, c'est une renonce de 0,50.
- Si un palier a une condition que vous ne pouvez pas cocher (par exemple *pour une première habitation*), notez-la dans **Condition**.
- Un palier est enregistré **aussitôt**, indépendamment du bouton *Enregistrer* en bas. Enregistrez d'abord une nouvelle règle ; ajoutez ensuite les paliers.

Vous choisissez ensuite la renonce sur le dossier : voir [Dossiers de crédit](../credit-management/credit-files.md#proposition-selon-le-bareme).

### Récupération en cas de remboursement anticipé ou d'exigibilité

Ce que la compagnie récupère quand un crédit se termine plus tôt.

- **La commission étalée non encore payée est annulée** — cochez si la compagnie ne paie plus le reste de l'étalement.
- **Paliers** — par palier : *dans combien de mois* après l'acte, et comment le calcul se fait.
    - **Pourcentage** du **montant payé** (tout ce qui a déjà été payé) ou de **la partie upfront** (le premier paiement).
    - **Prorata** sur un nombre de mois : la part qui n'est pas encore « acquise » est récupérée. Le mois du remboursement compte comme non acquis.

« Dans les 12 mois » se compte à la date : remboursé avant la date de l'acte plus 12 mois. Le premier palier dans lequel tombe le remboursement s'applique. Aucun palier et aucune case cochée : pas de récupération.

Ce qui ne se calcule pas, comme une récupération sur du capital non prélevé, va en bas dans **Récupération — explication**.

## Erreurs fréquentes

!!! warning "Un barème avec deux règles qui conviennent toutes les deux"
    Si deux règles conviennent au même crédit (par exemple deux formules sans produit), CreditSoft ne choisit pas lui-même. Le dossier affiche alors *choisissez la formule*. Liez des produits aux règles pour l'éviter.

!!! warning "Une renonce supérieure au pourcentage"
    Un palier de 2,50 sur une règle de 2,25 % est refusé. Vérifiez si vous avez introduit la renonce ou le nouveau pourcentage.

!!! warning "Un nombre avec un point des milliers dans le fichier"
    `1.250.000` est refusé lors de l'importation, avec la colonne et la valeur. Écrivez `1250000`. Ainsi CreditSoft ne lit jamais en silence un autre nombre que celui que vous vouliez.

## Voir aussi

- [Dossiers de crédit — la proposition selon le barème](../credit-management/credit-files.md#proposition-selon-le-bareme)
- [Commissions à confirmer](../credit-management/commission-to-confirm.md)
- [Récupérations à confirmer](../credit-management/commission-clawback.md)
- [Paramètres de commission](commissie-instellingen.md)
