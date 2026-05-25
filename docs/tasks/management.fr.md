# Gestion des tâches

La gestion des tâches dans CreditSoft vous aide à structurer votre journée de travail : actions en attente, échéances, points de suivi.

## Ouvrir l'écran

Cliquez en haut de la sidebar sur **Tâches**. Le nombre de tâches en attente est affiché en badge à côté de l'élément de menu.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/taken.png`.

![Takenbeheer](/images/taken.png)

## Créer une nouvelle tâche

!!! info "TODO"
    Bron: zoek naar `TasksAdd.dfm`, `TaskListMain.pas` in `Modules\Crm\`.

    Champs typiques :

    - Titre
    - Description
    - Date d'échéance
    - Priorité (faible, normale, élevée, urgente)
    - Assigné à (collaborateur)
    - Lié à (dossier, contact, entreprise)
    - Configurer un rappel

## Filtrer et trier les tâches

!!! info "TODO"
    Quels filtres :

    - Ouvert / terminé
    - Par collaborateur
    - Par priorité
    - Par période (aujourd'hui, cette semaine, en retard)
    - Par lien (dossiers, contacts)

## Traiter une tâche

1. Ouvrez la tâche.
2. Ajoutez éventuellement une note de traitement.
3. Cliquez sur **Marquer comme terminé**.

## Déléguer des tâches

!!! info "TODO"
    Une tâche peut-elle être transférée à un autre collaborateur ?

## Rappels

!!! info "TODO"
    Comment fonctionnent les rappels ?

    - Pop-up dans CreditSoft ?
    - Notification par e-mail ?
    - Notification sur le tableau de bord ?

## Tâches depuis d'autres écrans

Les tâches peuvent également être créées directement depuis d'autres écrans :

- Depuis un [dossier de crédit](../credit-files/edit-file.md)
- Depuis un [contact](../crm/contacts.md)
- Depuis un [enregistrement d'appel téléphonique](../work/phone-calls.md)
