# Faire lire une fiche de paie par l'IA

Un demandeur envoie ses fiches de paie, et vous reprenez les données dans son dossier. CreditSoft peut faire lire une telle fiche de paie par l'IA : vous recevez une proposition avec l'employeur, la date d'entrée en service, la fonction, le type de contrat, le net et les primes. Vous vérifiez chaque champ et choisissez vous-même ce que vous reprenez. Sans votre clic sur **Reprendre**, rien n'est enregistré.

## Ce qu'il faut

- **Votre bureau active la lecture par l'IA dans ADM One.** Cliquez en bas du menu sur **Portail client** et ouvrez la tuile **Clé IA**. Vous y trouvez trois choses :
    1. la **clé** de l'abonnement IA de votre bureau. La lecture se fait sur cet abonnement ;
    2. la case **Analyse de documents** ;
    3. la case **Scans, photos et PDF**. Elle est nécessaire pour chaque fiche de paie, car une fiche de paie est toujours un fichier.

    Chaque bloc a son propre bouton **Enregistrer**. C'est la personne qui a accès au portail de votre bureau dans ADM One qui s'en charge.
- **Vous pouvez modifier le dossier**, et pour l'emploi aussi la relation. Les champs que vous ne pouvez pas modifier restent visibles, mais vous ne pouvez pas les cocher.

S'il manque quelque chose, une ligne grise sous les fichiers indique ce qui manque, par exemple *Lecture par l'IA : votre bureau n'a pas encore configuré de clé IA dans ADM One.* Le bouton n'apparaît alors pas.

## Faire lire une fiche de paie

Le bouton **Lire comme fiche de paie** se trouve à côté de chaque fichier fourni, à trois endroits :

- dans [Documents à valider](document-validation.md), dans le panneau d'une pièce ;
- dans un [dossier de crédit](credit-files.md), dans l'onglet **Demandés** : double-cliquez une pièce ;
- sur la fiche relation, parmi les documents demandés à la relation.

Cliquez sur **Lire comme fiche de paie** à côté du fichier à lire. Après quelques secondes, le bloc **Proposition tirée de ce fichier** apparaît sous les fichiers.

<!-- AFBEELDING: le panneau d'une pièce « 3 dernières fiches de paie » dans Documents à valider, avec à côté de chaque fichier le bouton Lire comme fiche de paie (un pdf, un scan et une photo). Depuis tenant_demo, en tant qu'administrateur, avec la clé IA et les deux cases cochées dans ADM One. Beeld in het Frans (-fr). -->

Un PDF, un scan ou une photo, tout fonctionne : JPEG, PNG ou WebP. Un fichier peut faire au maximum 20 Mo (PDF) ou 7,5 Mo (photo).

## Vérifier la proposition

<!-- AFBEELDING: le bloc Proposition tirée de ce fichier pour un PDF avec trois fiches de paie : Pour qui avec le demandeur trouvé, Mois sur le mois le plus récent, l'emploi avec quatre champs cochés, et les revenus avec le net sur « à choisir » et les chèques-repas sur « = correspond ». Depuis tenant_demo. Beeld in het Frans (-fr). -->

### Pour qui

Pour une pièce d'un dossier, CreditSoft cherche le demandeur concerné par la fiche de paie : d'abord par le numéro de registre national, sinon par le nom et le prénom. À côté du nom, vous voyez comment il a été trouvé. Si CreditSoft ne trouve personne, ou plus d'un demandeur, vous choisissez vous-même.

Le numéro de registre national sur la fiche de paie sert uniquement à trouver la bonne personne. Il n'est jamais repris. S'il diffère du numéro sur la fiche du demandeur, vous voyez un avertissement : vérifiez alors qu'il s'agit de la bonne personne.

### Mois

Si un fichier contient plusieurs fiches de paie, vous choisissez sous **Mois** le mois qui compte. Le plus récent est choisi par défaut. L'IA ne calcule rien : pas de moyenne sur les mois, et pas de nombre de chèques-repas multiplié par leur valeur.

### Les champs

Pour chaque champ, vous voyez trois colonnes : **Actuellement dans CreditSoft**, **Lu** et **Reprendre**.

| Partie | Champs | Arrive sur |
|---|---|---|
| **Emploi (sur la relation)** | Employeur, En service depuis, Fonction, Type de contrat | la fiche relation du demandeur |
| **Revenus (de ce demandeur dans ce dossier)** | Revenu mensuel net, Chèques-repas (par mois), Pécule de vacances, Prime de fin d'année (par an) | les lignes de revenus du demandeur dans ce dossier |

Sont cochés par défaut :

- un champ encore **vide** dans CreditSoft ;
- un revenu pour lequel le demandeur n'a **pas encore de ligne**.

Un champ avec une **autre valeur** que celle déjà présente n'est jamais coché. C'est à vous de décider.

Si vous voyez **= correspond**, il n'y a rien à faire.

Si vous voyez **à choisir**, le demandeur a déjà une ligne de revenu de ce type, avec un autre montant. Vous choisissez :

- **Ne rien faire** : la ligne reste telle quelle ;
- **Ajouter une nouvelle ligne** : à côté de la ligne existante ;
- **Mettre à jour** : la ligne choisie reçoit le nouveau montant. L'employeur, la période et les remarques de cette ligne restent inchangés.

Le **type de contrat** n'est rempli que si le texte de la fiche de paie figure exactement dans votre liste de types de contrat. Les majuscules et les accents ne comptent pas. S'il n'y figure pas, vous voyez un message avec le texte de la fiche de paie, et le type de contrat reste tel quel.

Les chèques-repas ne figurent dans la proposition que si un **montant** figure sur la fiche de paie.

Si vous ouvrez la pièce depuis la **fiche relation**, le bloc ne propose que l'emploi. Les revenus sont propres à chaque dossier : ouvrez la pièce depuis le dossier pour les voir proposés.

## Reprendre

Cliquez sur **Reprendre**. CreditSoft enregistre les champs cochés, et la fiche en dessous les affiche aussitôt. Le bloc indique ensuite ce qui a été repris, et tous les champs passent à **= correspond**.

Si rien n'est coché, le bouton est grisé et le bloc affiche *Cochez ce que vous voulez reprendre.*

Si quelqu'un d'autre a modifié un champ après la lecture du fichier, ce champ n'est **pas** écrasé. Vous voyez par exemple *Employeur : modifié entre-temps sur la fiche ; pas repris.* Relisez le fichier si vous voulez quand même le reprendre.

<!-- AFBEELDING: le même bloc après Reprendre : tous les champs sur « = correspond » et la ligne verte « Repris : Employeur, En service depuis, Fonction, Type de contrat, Revenu mensuel net (mis à jour). » Depuis tenant_demo. Beeld in het Frans (-fr). -->

## Ce que le bloc peut signaler

| Message | Ce qu'il signifie | Ce que vous faites |
|---|---|---|
| *Ceci ne semble pas être une fiche de paie : rien n'y a été lu.* | L'IA n'a pas reconnu de fiche de paie dans le fichier, par exemple un extrait de compte | Rien : rien n'a été modifié |
| *Rien n'a été reconnu dans ce fichier.* | Le fichier a été lu, mais rien d'utilisable n'y figurait | Vérifiez le fichier vous-même |
| *La fiche de paie de … contient aussi un pécule de vacances ou une prime de fin d'année.* | Le net de ce mois contient cette prime et dépasse un salaire mensuel habituel. Le net n'est donc pas coché | Choisissez de préférence un autre mois |
| *Ce type de fichier ne peut pas être lu.* | Le fichier n'est pas un PDF, JPEG, PNG ou WebP. Une photo d'iPhone en HEIC en fait partie | Enregistrez la photo en JPEG et fournissez-la à nouveau |
| *Ce fichier ne peut pas être ouvert.* | Par exemple un PDF protégé par un mot de passe, ou un fichier vide | Demandez un fichier sans mot de passe |
| *Ce fichier est trop volumineux pour être lu.* | Plus de 20 Mo (PDF) ou 7,5 Mo (photo), ou un document de très nombreuses pages | Demandez un fichier plus petit, par exemple par mois |
| *Trop de demandes en peu de temps, ou le plafond journalier de votre bureau est (presque) atteint.* | Votre bureau a fixé une limite journalière dans ADM One, ou beaucoup de fichiers ont été lus à la suite | Réessayez plus tard |
| *Le service d'IA est momentanément indisponible, ou n'a pas lu le document.* | Une panne du service d'IA | Cliquez sur **Réessayer** |

## Ce qu'il advient des données

- Le fichier passe par ADM One vers le fournisseur d'IA de la clé de votre bureau, pour être lu. ADM One ne conserve pas le contenu.
- La proposition n'est pas enregistrée. Si vous fermez le bloc, ou ouvrez une autre pièce, elle disparaît.
- Le **journal des actions** indique qu'un fichier a été lu, et quels champs vous avez repris. Les valeurs elles-mêmes n'y figurent jamais.
- La lecture se fait sur l'abonnement IA de votre bureau, par fichier lu. Dans ADM One, sous **Clé IA**, vous fixez une limite journalière.

## Erreurs fréquentes

!!! warning "Le net d'un mois avec pécule de vacances ou prime de fin d'année"
    Le net à payer d'un tel mois contient la prime. Ne le reprenez pas comme revenu mensuel : choisissez un autre mois, ou saisissez le net vous-même.

!!! warning "Mettre à jour avec un autre employeur"
    **Mettre à jour** ne modifie que le montant de la ligne choisie. L'employeur de cette ligne reste inchangé. Si le demandeur travaille entre-temps ailleurs, choisissez **Ajouter une nouvelle ligne**.

!!! tip "Une photo d'iPhone"
    Un iPhone enregistre parfois ses photos en HEIC. Elles ne sont pas lues. Demandez à votre client d'envoyer la photo en JPEG, ou de régler l'appareil photo de l'iPhone sur *Le plus compatible*.

## Voir aussi

- [Documents à valider](document-validation.md)
- [Dossiers de crédit](credit-files.md)
