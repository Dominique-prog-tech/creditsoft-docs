# Leads depuis votre site web

<!-- Volontairement SANS image. Cette page décrit un raccordement, pas un écran : ce que le courtier voit est
     la liste des leads habituelle, déjà illustrée par leads-lijst-fr.png. Une capture d'un formulaire de
     contact montrerait en outre le site d'un client, ou un site inventé qui ne prouve rien. -->

Le formulaire de contact de votre site web peut déposer ses envois directement dans CreditSoft. Celui qui remplit le formulaire figure en moins d'une minute dans votre [liste de leads](leads.md) — sans que personne ne doive éplucher une boîte mail ou recopier quoi que ce soit.

!!! info "Cela s'active bureau par bureau"
    La connexion ne fonctionne pas d'office : elle nécessite une **clé de site web**, que vous demandez à ADM-Concept. Tant qu'elle n'existe pas, rien ne change au fonctionnement actuel de votre formulaire.

## Comment cela fonctionne

1. Un visiteur remplit le formulaire de contact de votre site.
2. Le formulaire transmet cette demande, accompagnée de votre clé de site web.
3. CreditSoft en fait un lead, dans votre propre environnement.

Le lead porte l'heure à laquelle le **visiteur** a introduit le formulaire — et non le moment où CreditSoft l'a récupéré. La colonne *Attend depuis* est donc exacte dès la première seconde.

## La clé de site web

La clé est ce qui rend votre formulaire identifiable. Deux choses à savoir :

**Vous en demandez une par formulaire.** Si vous avez un formulaire de contact sur votre site principal *et* une page de campagne distincte, demandez deux clés. Chaque clé reçoit un nom — par exemple *formulaire de contact site principal* et *campagne automne* — et ce nom devient la **source** de chaque lead qui arrive par cette voie.

**C'est ce qui rend votre rapport par source fiable.** Dans la liste de leads, vous voyez pour chaque lead de quel formulaire il provient, et donc quel canal vous apporte des clients. Cela ne fonctionne que parce que la source provient de la clé et non de ce que le formulaire transmet : une page mal configurée ne peut ainsi pas fausser vos chiffres.

Une clé peut être **révoquée** sans toucher aux autres. Arrêter une campagne laisse donc votre site principal intact.

## Pour le constructeur de votre site

La description technique — vers où le formulaire poste, quels champs peuvent être transmis, comment la clé est jointe — figure à un seul endroit et y est tenue à jour :

**[platform.digitalcloud.be/docs/leads-contactformulier](https://platform.digitalcloud.be/docs/leads-contactformulier){ target=_blank }**

Transmettez ce **lien**, et non une copie du texte. Un document transféré vieillit silencieusement dans une boîte mail ; la page montre toujours ce qui vaut *maintenant*.

La **clé de site web**, vous la communiquez séparément. Elle n'a pas sa place dans un e-mail contenant le reste des explications.

## Qui est averti ?

Par défaut : **personne**. Les leads arrivent simplement dans la liste, et qui l'ouvre chaque matin n'a besoin de rien de plus.

Si vous souhaitez tout de même un e-mail dès que quelqu'un se manifeste, réglez-le sous **Administration → Communication → Notifications de leads**. Indiquez-y une ou plusieurs adresses e-mail, séparées par un point-virgule.

!!! tip "Une boîte partagée vaut souvent mieux qu'une seule personne"
    `info@bureau.be` continue de fonctionner quand quelqu'un est en congé. Un seul nom dans ce champ signifie que personne ne regarde pendant deux semaines.

**Le contenu de ce message** — qui c'est, ce qu'il a demandé, par quel formulaire il est arrivé, et un lien qui ouvre directement le lead — se modifie dans les [modèles d'e-mail](../administration/mail-templates.md). Cherchez-y le modèle *Nouveau lead via le site web*.

Sur ce même écran, vous réglez aussi l'**avis quotidien** sur les leads qui restent en plan — voir [L'avis quotidien](leads.md#lavis-quotidien).

Deux points fonctionnent délibérément ainsi :

- **Si vous ajoutez vous-même un lead** dans l'écran, aucun e-mail ne suit. Vous l'avez déjà sous les yeux, et une notification pour quelque chose que vous venez de faire vous apprend à ignorer les notifications.
- **Si la même personne pose une deuxième question**, vous êtes averti, mais avec la mention qu'elle a été rattachée à un lead existant. Sinon, vous chercheriez une nouvelle ligne qui n'existe pas.

## Ce qui aboutit dans le lead

| Sur la fiche du lead | D'où cela provient |
|---|---|
| **Nom** | le champ nom de votre formulaire, non scindé |
| **Société**, **E-mail**, **Téléphone** | les champs correspondants |
| **Demande** | l'objet, le message, et tous les autres champs de votre formulaire |
| **Source** | le nom de la clé de site web |
| **Provenance** | la page sur laquelle se trouvait le formulaire |

!!! tip "Vos propres champs de formulaire ne se perdent pas"
    Si votre formulaire demande par exemple le nombre de m² ou comment quelqu'un vous a trouvé, ces réponses sont reprises au bas du champ *Demande*. Vous ne devez donc pas adapter votre formulaire à CreditSoft.

## La même personne qui remplit deux fois

Cela reste **un seul lead**. CreditSoft la reconnaît à son adresse e-mail ou à son numéro de téléphone et rattache la nouvelle demande à celle qui existe, avec sa date — exactement comme pour un lead que vous ajoutez vous-même. Voir [Leads](leads.md#ajouter-un-lead).

Un double envoi du formulaire lui-même — quelqu'un qui clique deux fois sur *Envoyer* — ne donne également qu'un seul lead.

## Si rien n'arrive

- **La clé a-t-elle déjà été demandée et configurée ?** Tant qu'elle n'existe pas, rien ne passe.
- **Le formulaire poste-t-il vers la bonne adresse ?** Cela figure sur la page destinée à votre constructeur de site.
- **Regardez la liste de leads sur *Tous les statuts*.** Un lead d'une personne déjà cliente peut avoir été rattaché à un lead existant au lieu d'apparaître comme nouvelle ligne.

Si vous ne vous en sortez pas, contactez ADM-Concept : de notre côté, il est visible si votre formulaire a envoyé quelque chose et ce qu'il en est advenu.
