# Institutions financières

Les institutions financières sont les **banques et prêteurs** avec lesquels votre bureau collabore — les organismes de crédit auprès desquels vous introduisez vos dossiers. Cet écran permet de gérer leurs données et le **régime de commission par défaut** de chaque institution.

## Ouvrir l'écran

Dans la barre latérale, cliquez sur **Institutions financières**.

!!! info "TODO"
    Capture d'écran de la liste. À placer dans `docs/images/financiele-instellingen.png`.

![Institutions financières](/images/financiele-instellingen.png)

## La liste

Le tableau affiche par institution : **nom**, **commune**, **pays**, **téléphone**, **e-mail** et **site web**.

- **Rechercher** — utilisez le champ de recherche pour chercher dans toutes les colonnes à la fois.
- **Choisir les colonnes** — affichez ou masquez des colonnes ; votre choix est mémorisé.
- **Exporter** — exportez la liste via Excel ou CSV.
- **Nouveau / modifier** — cliquez sur **Ajouter** ou sur une ligne pour ouvrir l'écran d'édition.
- **Supprimer** — une institution est **archivée** (suppression douce), pas définitivement effacée ; elle disparaît de la liste mais reste conservée.

## Ajouter ou modifier une institution

L'écran d'édition est divisé en trois onglets.

### Onglet « Informations générales »

Les données de base de l'institution :

- **Nom** (obligatoire)
- **Adresse** — rue, numéro, boîte, code postal, commune, pays
- **Contact** — téléphone, fax, e-mail, site web
- **Remarques**
- **Logo** — chargez une image ; elle apparaît notamment sur les impressions

### Onglet « Réseaux sociaux »

Liens facultatifs vers les réseaux sociaux de l'institution : Facebook, Twitter, Google+ et Instagram.

### Onglet « Commissionnement par défaut »

Vous y définissez le **régime de commission par défaut** applicable à ce prêteur. Vous choisissez **au maximum un** des deux types (ils sont mutuellement exclusifs) :

- **Pourcentage direct** — le pourcentage versé immédiatement.
- **Paiement échelonné** — la commission est répartie sur un **nombre de mois**.
- **Paiements planifiés** — vous indiquez une liste (jusqu'à 24 lignes) avec, par ligne, un **mois** et un **pourcentage** de la commission totale.

!!! warning "Un seul type à la fois"
    Il n'est possible de choisir que **0 ou 1** type de commissionnement. Si vous choisissez à la fois *Paiement échelonné* et *Paiements planifiés*, CreditSoft affiche un message lors de l'enregistrement.

!!! info "TODO"
    Capture d'écran de l'onglet « Commissionnement par défaut ». À placer dans `docs/images/financiele-instellingen-commissie.png`.

## Enregistrer

Cliquez sur **Enregistrer** pour sauvegarder l'institution. Les champs obligatoires manquants ou un choix de commission invalide sont signalés lors de l'enregistrement.
