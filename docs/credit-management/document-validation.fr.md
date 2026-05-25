# Valider les documents

Cet écran vous permet de vérifier si tous les documents entrants sont corrects et complets avant leur finalisation dans un dossier.

## Ouvrir l'écran

Cliquez dans la sidebar sous **Crédits** sur **Doc. à valider**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/documenten-valideren.png`.

![Te valideren documenten](/images/documenten-valideren.png)

## Ce que l'écran affiche

!!! info "TODO"
    Bron: form gekoppeld aan `documents-validate` action.

    Fonctions typiques :

    - Liste des documents qui doivent encore être validés
    - Par document : dossier, type, date de chargement, chargé par
    - Aperçu du document
    - Actions de validation (approuver, refuser, renvoyer)

## Valider un document

1. Ouvrez le document via un double-clic ou le bouton **Consulter**.
2. Vérifiez si le document est correct (bonne personne, lisible, récent, complet).
3. Choisissez l'action appropriée :
    - **Approuver** — le document est marqué comme validé.
    - **Refuser** — indiquez le motif, le document est renvoyé au demandeur.
    - **Demander des informations complémentaires** — [TODO: indien beschikbaar]

## Critères de validation par type de document

!!! info "TODO"
    Documenteer de typische controlepunten per documenttype:

    - **Carte d'identité** : encore valide, photo lisible
    - **Fiche de salaire** : récente (< 3 mois), bonne personne
    - **Avertissement-extrait de rôle** : exercice d'imposition le plus récent
    - **Acte de propriété** : lisible, acte complet
    - **Rapport d'estimation** : récent, signé par un estimateur agréé

## Piste d'audit

!!! info "TODO"
    Enregistre-t-on qui a validé un document et quand ?
