# Appels téléphoniques

CreditSoft tient un registre de vos appels téléphoniques entrants et sortants, liés aux contacts et aux dossiers.

## Ouvrir l'écran

Cliquez dans la sidebar sous **Travail** sur **Appels téléphoniques**.

!!! info "TODO"
    Screenshot. Plaatsen in `docs/images/telefoons.png`.

![Telefoonregistratie](/images/telefoons.png)

## Ce que l'écran affiche

!!! info "TODO"
    Bron: zoek naar `PhoneListMain.dfm`, `CallsAdd.dfm`,
    `CallsPanel.dfm` in `Modules\Crm\`.

    Colonnes typiques :

    - Date/heure
    - Contact / numéro
    - Sens (entrant / sortant)
    - Durée
    - Sujet / note
    - Dossier lié

## Enregistrer un appel

1. Cliquez sur **Nouveau**.
2. Sélectionnez le contact (ou saisissez un nouveau numéro).
3. Complétez les détails : sens, sujet, note.
4. Liez optionnellement à un dossier.
5. Cliquez sur **Enregistrer**.

## Intégration téléphonique

!!! info "TODO"
    Y a-t-il une intégration avec des systèmes VoIP ou des centraux téléphoniques ?
    Les appels sont-ils enregistrés automatiquement ?

## Tâches de suivi depuis un appel

!!! tip
    Après avoir enregistré un appel, vous pouvez immédiatement créer une [tâche](../tasks/management.md)
    pour le suivi.
