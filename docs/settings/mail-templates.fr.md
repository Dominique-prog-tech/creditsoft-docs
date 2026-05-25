# Modèles d'e-mail

Les modèles d'e-mail sont des textes standard que vous réutilisez pour les communications récurrentes : e-mails de confirmation, demandes de documents, mises à jour de statut.

## Ouvrir l'écran

Cliquez dans la sidebar sous **Configuration** sur **Modèles d'e-mail**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/mail-templates.png`.

![Mail templates](/images/mail-templates.png)

## Créer un nouveau modèle

!!! info "TODO"
    Champs typiques :

    - Nom du modèle
    - Sujet (avec champs de fusion)
    - Corps (HTML, avec champs de fusion)
    - Langue (NL/FR/EN)
    - Catégorie (dossier, contact, interne)
    - Pièces jointes par défaut

## Champs de fusion

Les champs de fusion insèrent automatiquement des données d'un dossier ou d'un contact :

!!! info "TODO"
    Liste des champs de fusion disponibles :

    - `{voornaam}`, `{achternaam}`
    - `{bedrijf}`
    - `{dossiernummer}`
    - `{kredietbedrag}`
    - `{makelaar}`
    - `{datum}`
    - ...

## Utiliser les modèles

Les modèles sont utilisés :

- Lors de l'envoi d'un e-mail depuis un dossier ou un contact.
- Pour les [e-mails groupés](../work/group-mail.md).
- Pour les e-mails automatiques (confirmations, rappels).

## Bonnes pratiques

!!! tip
    - Rédigez des modèles concis et clairs.
    - Évitez trop de champs de fusion — moins c'est mieux.
    - Créez un modèle par usage, pas un modèle universel.
    - Prévoyez des versions en NL/FR/EN selon les besoins.
