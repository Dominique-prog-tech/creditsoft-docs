# Contacts

Les contacts sont les personnes individuelles dans votre CRM : emprunteurs, représentants d'entreprises et toutes autres personnes physiques avec lesquelles vous êtes en contact professionnel.

## Ouvrir l'écran

Cliquez dans la sidebar sous **CRM** sur **Contacts**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/crm-contacten.png`.

![Contactenoverzicht](/images/crm-contacten.png)

## Ajouter un nouveau contact

!!! info "TODO"
    Bron: zoek naar `ContactsAdd.dfm` of `Contacts*Add.dfm`.

    Champs typiques :

    - Civilité (Monsieur, Madame)
    - Prénom, nom
    - Date de naissance, lieu de naissance
    - Numéro de registre national
    - État civil
    - Profession
    - Adresse
    - Téléphone, mobile, e-mail
    - Entreprise liée (optionnel)
    - Notes

## Relations entre contacts

Les contacts peuvent être liés les uns aux autres : partenaires, parents, enfants, gérants.

!!! info "TODO"
    Bron: `Modules\Crm\ContactRelationsAdd.dfm`.
    Documenteer hoe relaties tussen contacten worden opgevoerd en weergegeven.

## Historique des communications

Sur la page du contact, vous consultez l'historique des interactions :

- Appels téléphoniques (voir [Appels téléphoniques](../work/phone-calls.md))
- E-mails
- Réunions (voir [Agenda](../work/calendar.md))
- Tâches
- Notes

!!! info "TODO"
    Bevestig welke historiek-blokken precies aanwezig zijn op het contactenscherm.

## Vie privée et RGPD

!!! warning "TODO"
    Documenteer GDPR-relevante functies:

    - Droit d'accès : comment exporter toutes les données d'un contact ?
    - Droit à l'oubli : comment supprimer définitivement ?
    - Consentement marketing : où est-il enregistré ?
