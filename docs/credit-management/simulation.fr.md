# Simulation

Avec la simulation, vous calculez un crédit sans dossier : la mensualité, le tableau d'amortissement, le TAEG et les frais d'un achat.
Pratique lors d'un premier entretien, quand il n'y a pas encore de dossier. CreditSoft n'enregistre rien : votre saisie reste
uniquement dans votre navigateur, jusqu'à ce que vous cliquiez sur **Effacer**.

## Ouvrir l'écran

Dans le menu de gauche, cliquez sur **Simulation**, sous *Crédit*. Toute personne qui peut consulter les dossiers de crédit
peut calculer.

![La page Simulation. À gauche, la saisie : le crédit avec le montant, la durée en mois, le taux annuel et le mode de remboursement, ensuite les frais du crédit avec les frais de dossier, les frais d'expertise et les assurances par mois, et en bas l'achat avec le prix d'achat, l'objet de l'estimation, la région, la seule habitation propre, la date du compromis et trois cases pour le bien. À droite, la mensualité avec la première échéance, le total des intérêts et le total remboursé, et le bouton Tableau d'amortissement. En dessous, le TAEG (illustratif) avec le pourcentage et les frais compris, avec leur montant. Puis les frais de l'achat, par champ avec les postes et leur origine, le total, et une phrase avec l'investissement total et l'apport propre.](../images/simulatie-fr.png "Calculer un crédit sans dossier"){ .volle-breedte }

## Le crédit

Saisissez à gauche :

- le **montant** du crédit ;
- la **durée** en mois ;
- le **taux** annuel, en pour cent ;
- le **mode de remboursement** : mensualité constante, remboursement in fine, mensualités croissantes ou amortissement
  fixe du capital.

Si vous choisissez des **mensualités croissantes**, le champ **Augmentation annuelle (%)** apparaît : le pourcentage
dont la mensualité augmente chaque année, entre 0 et 20. CreditSoft répartit cette augmentation sur les mois : la
mensualité augmente un peu chaque mois, de sorte qu'après un an elle a augmenté de ce pourcentage.

À droite apparaissent la **première échéance**, le **total des intérêts** et le **total remboursé**, avec le mode de calcul
en dessous. **Tableau d'amortissement…** ouvre le tableau complet, comme pour un
[contrat](credit-files.md#le-tableau-damortissement). Vous pouvez aussi le télécharger en pdf.

S'il manque quelque chose, la page le dit. Si, pour des mensualités croissantes, vous laissez l'augmentation annuelle
vide, CreditSoft ne calcule pas de tableau.

## L'achat

Si vous remplissez aussi l'achat, CreditSoft estime les **droits d'enregistrement**, les **frais de notaire** et
l'**inscription hypothécaire**, comme dans la [fiche d'investissement](credit-files.md#estimer-les-frais-dachat) :

- le **prix d'achat** ;
- l'**objet de l'estimation** : un achat, un crédit seul, un refinancement, une construction neuve ou un autre objet ;
- la **région** du bien ;
- **seule habitation propre** : oui ou non. La différence de droits d'enregistrement est importante ;
- la **date du compromis**, si vous la connaissez déjà. Sinon, CreditSoft calcule avec les tarifs d'aujourd'hui ;
- trois cases pour un bien particulier : un terrain, un bien mixte, un bien à l'étranger.

Le montant du crédit ci-dessus compte pour les frais de l'acte de crédit. Si l'estimation est complète, la page affiche
aussi l'**investissement total** (prix d'achat plus frais) et l'**apport propre** nécessaire.

## Le TAEG

Sous la mensualité, la page affiche le **TAEG**, le taux annuel effectif global : le taux et les frais du crédit ensemble, en
un seul pourcentage par an. Saisissez pour cela sous *Les frais du crédit* :

- les **frais de dossier** de la banque ;
- les **frais d'expertise** ;
- les **assurances par mois** que la banque demande, comme l'assurance solde restant dû et une assurance incendie
  obligatoire.

Si l'achat est rempli, CreditSoft compte aussi les frais de l'**acte de crédit** de l'estimation : les honoraires, les frais
administratifs et la TVA du notaire pour le crédit, le droit d'enregistrement et d'hypothèque et la rétribution hypothécaire.
Les frais de l'achat lui-même, comme les droits d'enregistrement, ne comptent jamais dans le TAEG.

Sous le pourcentage figure ce qui est compris, avec le montant. Ce qui manque figure sous **Non compris** : un frais que
vous laissez vide ne compte pas en silence pour zéro. S'il n'y a vraiment pas de frais, saisissez 0. Sans aucun frais, le
TAEG est égal au taux.

Le TAEG calcule avec un taux qui reste fixe sur toute la durée.

## Continuer avec un lead

Un prospect appelle et vous voulez assurer son suivi ? Cliquez en haut sur **Nouveau lead avec ces chiffres**. Le formulaire
d'un [nouveau lead](../crm/leads.md) s'ouvre, avec le **montant** rempli et dans **Demande** un résumé de la simulation : la
durée, le taux, le mode de remboursement, la première échéance, le TAEG et l'achat, dans la mesure où vous les avez saisis.

Vous complétez le nom et les coordonnées du prospect et enregistrez. Si vous quittez la page sans enregistrer, CreditSoft vous
demande d'abord si vous voulez la quitter : les chiffres sont alors perdus.

Le bouton n'apparaît que si vous pouvez modifier les leads, et fonctionne dès qu'un montant ou un prix d'achat est saisi.

## Votre saisie est conservée

Si vous quittez la simulation, votre saisie s'y retrouve la fois suivante, dans le même navigateur. Elle reste sur votre
ordinateur et pas dans CreditSoft, et un collègue qui se connecte sur le même ordinateur ne la voit pas. **Effacer** vide tous
les champs.

## Erreurs fréquentes

!!! warning "Une simulation n'est pas une offre"
    Les montants sont un calcul de CreditSoft. L'offre de la banque et le décompte du notaire font foi, de même que le
    TAEG de la banque : ne reprenez pas le TAEG de la simulation dans une offre. La simulation n'enregistre rien dans
    CreditSoft : si vous voulez continuer, créez un [lead](#continuer-avec-un-lead) ou un [dossier de crédit](credit-files.md).

## Voir aussi

- [Leads](../crm/leads.md)
- [Dossiers de crédit : le tableau d'amortissement](credit-files.md#le-tableau-damortissement)
- [Dossiers de crédit : estimer les frais d'achat](credit-files.md#estimer-les-frais-dachat)
- [Listes de choix : le mode de remboursement et l'objet pour l'estimation](../beheer/keuzelijsten.md#lobjet-pour-lestimation-dun-but-du-credit)
