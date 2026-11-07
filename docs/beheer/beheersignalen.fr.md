# Signaux de gestion

Un crédit dont l'acte est passé demande encore de l'attention par la suite : une révision du taux qui approche, l'anniversaire de l'acte, un dossier que vous vouliez revoir. Sur cet écran, vous déterminez pour lesquelles de ces occasions CreditSoft **crée lui-même une tâche** pour le responsable du dossier. Cela se fait chaque matin à 6 h, une seule fois par occasion.

![L'écran Signaux de gestion : en haut la carte Ce que la tournée ferait aujourd'hui avec trois lignes, le nombre de nouvelles tâches pour une révision du taux, les contrôles annuels du jour et les actes qui ont leur anniversaire dans les 30 prochains jours, et le nombre de dossiers à revoir. En dessous une carte par signal avec une case Activé et l'état : Révision du taux à venir avec le champ Combien de jours à l'avance, Contrôle annuel et À revoir le. En bas le choix du responsable pour un dossier sans responsable.](../images/beheersignalen-fr.png "Quels signaux deviennent une tâche, et ce que cela donnerait aujourd'hui"){ .volle-breedte }

## Ouvrir l'écran

En bas à gauche, cliquez sur **Administration**, puis sur la tuile **Signaux de gestion**, dans le groupe *Tableau de bord*. Vous voyez la tuile si vous pouvez aussi gérer les [Phases du tableau de bord](dashboard-fases.md).

## Ce que la tournée ferait aujourd'hui

La carte du haut calcule ce que la tournée du jour donnerait :

- combien de **nouvelles tâches pour une révision du taux** ;
- combien de **contrôles annuels** il y a aujourd'hui, et combien d'actes ont leur anniversaire dans les 30 prochains jours ;
- combien de dossiers sont **à revoir**.

C'est un calcul : rien n'est créé. Un signal désactivé compte aussi, pour que vous voyiez ce qu'il donnerait avant de l'activer.

Si un avertissement jaune figure en dessous, certains signaux n'ont ni responsable avec un compte, ni responsable par défaut. Ils ne deviennent pas une tâche. La solution se trouve sous [Qui reçoit la tâche](#qui-recoit-la-tache).

## Les trois signaux

Chaque signal a une case **Activé**. En dessous figure l'état :

- *Activé dès la première tournée (par défaut)* : vous n'avez jamais touché à la case, et le signal est activé par défaut.
- *Activé depuis le* suivi d'une date : à partir de ce jour. Ce qui tombait avant ce jour ne reçoit pas de tâche.
- *Désactivé*.

Si vous activez un signal, il vaut **à partir d'aujourd'hui**. Une révision ou un anniversaire déjà passé ne reçoit pas de tâche après coup.

### Révision du taux à venir

Une tâche un certain nombre de jours avant la prochaine **révision du taux** d'un contrat à taux variable. C'est la même révision que celle du bloc [Le suivi des crédits en cours](../getting-started/dashboard.md#le-suivi-des-credits-en-cours) sur le tableau de bord, donc uniquement pour les dossiers dont l'acte est passé.

Dans le champ **Combien de jours à l'avance**, vous choisissez combien de temps à l'avance la tâche apparaît : de 1 à 366 jours, 90 par défaut. Cliquez ensuite sur **Enregistrer**. L'échéance de la tâche est le jour de la révision.

Ce signal est **activé** par défaut.

### Contrôle annuel

Une tâche à l'**anniversaire de l'acte**, tant que le crédit court. C'est le moment de revoir avec le client le taux, l'assurance solde restant dû et l'assurance incendie.

Ce signal est **désactivé** par défaut : il crée des tâches chaque mois, pour chaque dossier dont l'acte est passé. Si vous l'activez, CreditSoft demande d'abord une confirmation et indique combien d'actes ont leur anniversaire dans les 30 prochains jours.

Quand le contrôle annuel est activé, le tableau de bord lui consacre sa propre carte, à côté de *À revoir* et *Révision du taux*.

### À revoir le

Une tâche à la date **À revoir le** que quelqu'un a placée sur un [dossier de crédit](../credit-management/credit-files.md#donnees-du-dossier). Le motif figure sur la fiche du dossier.

Ce signal est **activé** par défaut.

## Qui reçoit la tâche

Une tâche va au **responsable du dossier**, s'il peut se connecter à CreditSoft. Si le responsable n'a pas de compte, ou si le dossier n'a pas de responsable, la tâche va au collaborateur que vous choisissez sous **Responsable pour un dossier sans responsable**. Cliquez ensuite sur **Enregistrer**.

Si vous ne choisissez personne, un tel dossier ne reçoit pas de tâche. Le signal reste toutefois visible sur le tableau de bord.

## Les tâches elles-mêmes

Une tâche issue d'un signal de gestion est rattachée au dossier de crédit. Vous la trouvez dans le journal du dossier et dans la liste [Tâches](../credit-management/tasks.md). Le titre dit de quoi il s'agit, suivi du numéro de dossier :

- *Révision du taux le* suivi d'une date ;
- *Contrôle annuel* ;
- *À revoir*.

La description dit ce qu'il y a à faire. Comme auteur figure *CreditSoft (beheersignalen)*.

Chaque occasion donne **une seule tâche**. Si vous la clôturez ou la supprimez, elle ne revient pas. La révision suivante ou l'anniversaire suivant donne bien une nouvelle tâche.

## Contrats sans prochaine révision

Parfois, une carte apparaît encore en bas : **Contrats sans prochaine révision**. Elle compte les contrats d'un crédit en cours qui ont déjà eu leur première révision, mais dont la variabilité ne dit pas tous les combien d'années le taux est ensuite révisé. Ces contrats ne reçoivent plus jamais de signal.

Pour un taux fixe, c'est correct. Pour un taux variable, complétez les années sous [Listes de choix → Variabilité](keuzelijsten.md#la-variabilite-quand-le-taux-est-revise). Le lien **Vers les listes de choix** vous y mène.

## Erreurs fréquentes

!!! warning "Pas de tâche pour un dossier sans responsable"
    S'il n'y a pas de responsable par défaut, un signal sur un dossier sans responsable ne devient pas une tâche. Regardez l'avertissement jaune dans la carte du haut : s'il est affiché, choisissez un responsable.

!!! warning "Un contrat sans première révision"
    CreditSoft ne connaît une révision du taux que si le contrat porte une date de **Première révision**. Le [contrat](../credit-management/credit-files.md#contrats) la propose à partir des années de la variabilité. Si ces années manquent dans les [Listes de choix](keuzelijsten.md#la-variabilite-quand-le-taux-est-revise), ce signal reste muet pour un tel contrat.

## Voir aussi

- [Tableau de bord : le suivi des crédits en cours](../getting-started/dashboard.md#le-suivi-des-credits-en-cours)
- [Phases du tableau de bord](dashboard-fases.md)
- [Tâches](../credit-management/tasks.md)
- [Listes de choix](keuzelijsten.md)
