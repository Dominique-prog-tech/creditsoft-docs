# Première connexion

Lors de votre première connexion à CreditSoft, vous découvrez l'écran de connexion et la navigation de base.

## L'écran de connexion

!!! info "TODO"
    Beschrijf het loginscherm op basis van `Login.pas` en `Login.dfm`:

    - Welke velden zijn er (gebruikersnaam, wachtwoord, server, taal)?
    - Zijn er extra opties (onthouden, taal selecteren)?
    - Voeg een screenshot toe in `docs/images/login-scherm.png`.

![Loginscherm CreditSoft](/images/login-scherm.png)

## Se connecter

1. Saisissez votre **nom d'utilisateur**.
2. Saisissez votre **mot de passe**.
3. [TODO: extra stappen indien nodig — server kiezen, taal, etc.]
4. Cliquez sur `Aanmelden`.

!!! tip "Mot de passe oublié ?"
    [TODO: leg uit hoe een gebruiker zijn wachtwoord kan resetten of contact opnemen.]

## Première connexion

!!! info "TODO"
    Bij de allereerste aanmelding kunnen er bijkomende stappen zijn:

    - Wachtwoord wijzigen verplicht?
    - Profielgegevens aanvullen?
    - Voorkeuren instellen (taal, dashboardweergave)?

## Messages d'erreur possibles

!!! warning "TODO"
    Lijst van foutmeldingen die bij aanmelden kunnen verschijnen:

    - "Onbekende gebruiker"
    - "Onjuist wachtwoord"
    - "Verbinding met server mislukt"
    - "Account inactief"

    Bron: zoek met Grep naar `ShowMessage` of `MessageDlg` in `Login.pas`.

## Étape suivante

Après la connexion, vous accédez à l'écran principal. Consultez la [vue d'ensemble de l'interface](interface.md) pour vous familiariser avec la mise en page.
