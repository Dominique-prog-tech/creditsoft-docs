# Beeld-manifest — nog toe te voegen screenshots

> **Werkafspraak — bijgewerkt 15/08/2026.** Claude onderhoudt de handleiding-tekst (NL/FR), **maakt de
> schermafbeeldingen zelf** en houdt hieronder bij wat er nog ontbreekt. Dominique levert geen beelden
> meer aan; hij beoordeelt bij de moeilijke beelden of de getoonde toestand klopt. Dit bestand staat
> bewust **buiten** `docs/` zodat het niet mee gepubliceerd wordt.
>
> *(Tot 14/08 gold de omgekeerde afspraak — Dominique voegde ze in één batch toe. Dat leverde in twee
> weken nul beelden op, vandaar de omkering.)*
>
> **Maken:** `node docs/tools/gen-screenshots.mjs [naam]` in de app-repo. Vereist een draaiende app op
> poort 5345 en een gevulde demo-tenant. ⚠️ **Altijd uit `tenant_demo`** — nooit uit kredietunie of WAVE:
> die dragen echte klantnamen en deze site is publiek.
>
> **Conventie.** Afbeeldingen komen in `docs/images/`. Vanuit een pagina verwijs je **relatief**, bv.
> vanuit `docs/credit-management/…` → `![alt](../images/bestand.png "title")`.
>
> **Per taal een eigen beeld.** Op een schermafbeelding staat altijd tekst, dus de FR-pagina krijgt het
> FR-beeld. Bestandsnaam blijft Nederlands, met achtervoegsel `-fr`.
>
> **Alt-tekst is verplicht** — een volle beschrijvende zin in de taal van de pagina, plus een `title`.
> Toegankelijkheid én vindbaarheid. De volledige regel staat in `CLAUDE.md`.
>
> Streep af (`[x]`) wat geplaatst is. Claude vult nieuwe rijen aan zodra er schermen wijzigen.

## Aan de slag → Navigeren in CreditSoft (`getting-started/navigatie.md`)

- [ ] `menu-links.png` — het hoofdmenu links (dagelijkse schermen + de "Beheer"-groep). Plaats bij "Het menu links".
- [ ] `hoofdbalk.png` — de balk bovenaan met de iconen (feedback, help, avatar). Plaats bij "De balk bovenaan".
- [ ] `voorkeuren-paneel.png` — het geopende voorkeuren-paneel (foto / accentkleur / grootte / taal / 2FA). Plaats bij "Je voorkeuren".

## Aan de slag → Tweestapsverificatie (`getting-started/tweestapsverificatie.md`)

- [ ] `2fa-inschakelen.png` — het inschakelscherm met QR-code + sleutel + codeveld. Plaats bij "Inschakelen".
- [ ] `2fa-aanmelden.png` — de 2FA-uitdaging bij het aanmelden (codeveld + "Gebruik een herstelcode"). Plaats bij "Aanmelden met tweestapsverificatie".

## Kredieten → Kredietinstellingen (`credit-management/financial-institutions.md`)

- [x] `kredietinstellingen-lijst.png` + `-fr` — het lijstscherm (grid + zoekveld + "Nieuw"). Geplaatst 15/08/2026.
- [ ] `kredietinstellingen-algemeen.png` + `-fr` — bewerkscherm, tab "Algemene informatie". **Geblokkeerd:** het
      beeld toont `BE` in plaats van "België"/"Belgique", omdat de landkeuzelijst lokaal terugvalt op een
      tekstveld — de referentiedienst van ADM One geeft `401 Unauthorized` (geen geldige `AdmOne:ApiKey` in de
      dev-secrets). Zodra die sleutel er staat: `node docs/tools/gen-screenshots.mjs kredietinstellingen-algemeen`.
- [x] `kredietinstellingen-commissionering.png` + `-fr` — tab "Standaard commissionering" met de
      percentage-opmaak en het groene totaal. Geplaatst 15/08/2026.

## Kredieten → Verzekeraars (`credit-management/insurance-companies.md`)

- [ ] `verzekeraars-lijst.png` — het lijstscherm (zelfde lay-out als Kredietinstellingen, met Journaal onderaan). Plaats bij "De lijst".
- [ ] `verzekeraars-bewerken.png` — het bewerkscherm met de postcode-zoeker die de gemeente invult. Plaats bij "Een verzekeraar toevoegen of bewerken".

## Relatiebeheer → Professionals (`crm/professionals.md`)

- [ ] `professionals-lijst.png` — het lijstscherm met de type-filter bovenaan. Plaats bij "De lijst".
- [ ] `professionals-algemeen.png` — bewerkscherm, tab "Algemeen", met de knop **Ophalen** naast het btw-veld. Plaats bij die tab / de tip over de KBO-ophaling.
- [ ] `professionals-social.png` — de tab "Social media" (optioneel). Plaats bij "Onglet Réseaux sociaux".

## Relatiebeheer → Groepen (`crm/groups.md`)

- [ ] `groepen-lijst.png` — het lijstscherm + de "Nieuw"-knop. Plaats bij "De lijst".

## Beheer → Bedrijfsfiche (`administration/company-profile.md`)

- [ ] `bedrijfsfiche.png` — het bewerkscherm met de blokken (Identiteit met **Ophalen**-knop naast BTW, Adres, Contact, Bank, Documenten & huisstijl met het logo-sleepvak) + de **Opslaan**-knop rechtsboven. Plaats bij "De gegevens".
- [ ] `bedrijfsfiche-logo.png` — (optioneel) het logo-sleepvak in close-up. Plaats bij "Logo".

## Beheer → Gebruikers (`administration/users.md`)

- [ ] `gebruikers-lijst.png` — het lijstscherm vanuit **klant-weergave** (kolommen Gebruiker + Naam, per rij de knoppen **Fiche**, **Wachtwoord resetten**, **Verwijderen**; het aanmaakformulier bovenaan; terug-link). Plaats bij "Een collega toevoegen".
- [ ] `gebruikers-fiche.png` — de **Fiche**-popup met Telefoon/Gsm/Vertegenwoordiging + de **Mailhandtekening**-editor, en de notitie dat naam/e-mail/functie door ADM One beheerd worden. Plaats bij "De fiche bewerken".

## Beheer → Rollen & rechten (`administration/roles.md`)

- [ ] `rollen-lijst.png` — het scherm met de rollenlijst (de vaste rol **Tenant-beheerder** met slotje + het veld **Nieuwe rol** / **Toevoegen**). Plaats bij "Een rol aanmaken".
- [ ] `rollen-detail.png` — een geopende rol met de **rechten** (aanvinkbaar) en rechts **Gebruikers met deze rol**. Plaats bij "Rechten toekennen".

## Beheer → Mailsjablonen (`administration/mail-templates.md`)

- [ ] `mailsjablonen.png` — het editorscherm: bovenaan de **Sjabloon**-keuzelijst, het **variabelen-palet** met de chips, links de taal-tabs (Onderwerp + Body HTML + Bijlagen), rechts het sticky **Voorbeeld**. Plaats bij "Variabelen".

## Beheer → Mailmonitoring (`administration/mail-monitoring.md`)

- [ ] `mailmonitoring.png` — het overzicht met de kolommen Aangemaakt / Type / Naam / Aan / Onderwerp / Verzonden / Aflevering / Reden-fout (groene 'Afgeleverd'-statussen), de statusfilter + Vernieuwen bovenaan links, en zoek + '…'-exportmenu rechtsboven. Plaats bij "Wat je ziet".

## Beheer → Verzendadressen (`administration/sender-addresses.md`)

- [ ] `platformbeheer-hub.png` — de hub-pagina **Platformbeheer** met de groep *Communicatie* en de tegel *Verzendadressen*. Plaats bij "Het scherm openen".
- [ ] `verzendadressen-lijst.png` — het lijstscherm (verzendnaam + e-mailadres, "Nieuw"-knop, terug-link bovenaan). Plaats bij "De lijst".
- [ ] `verzendadressen-bewerken.png` — het bewerkscherm met de twee verplichte velden (e-mailadres + verzendnaam, rood sterretje). Plaats bij "Een verzendadres toevoegen of bewerken".

## Beheer → Prullenbak (`administration/recycle-bin.md`)

- [ ] `prullenbak.png` — het Prullenbak-scherm met de verwijderde records **gegroepeerd per soort** (bv. Relaties, Kredietinstellingen, …) met de kolommen **Naam** / **Verwijderd op** en de knop **Herstellen**. Plaats bij "Wat je ziet".

## Beheer → Actielogboek (`administration/activity-log.md`)

- [ ] `actielogboek.png` — het Actielogboek-scherm met de regels (kolommen **Wanneer** / **Wie** / **Actie** / **Onderwerp**). Plaats bij "Wat je ziet".

> Best genomen vanuit een **tester-weergave** (niet het volledige operator-menu), zodat de schermen tonen
> wat een tester ziet.

## Lijsten → Dossieropvolging (`credit-management/file-follow-up.md`)

- [ ] `dossieropvolging-lijst.png` — het volledige scherm met de vier keuzelijsten bovenaan, de teller
      (bv. `128 / 3988`) en een tiental rijen. Zorg dat de kolom **Status** gekleurde statussen toont en dat er
      in **Ontbrekende stukken / info** enkele rijen gevuld zijn. Plaats bij "De kolommen".
- [ ] `dossieropvolging-voorinstelling.png` — de eerste keuzelijst opengeklapt met **Lopend**,
      **Opvolging na akte** en **Alle dossiers**. Plaats bij "Kiezen wat u wil zien".
- [ ] `dashboard-fases.png` — het scherm **Platformbeheer → Dashboard-fases**, met links de fases
      (eindfase/opvolging aangevinkt) en rechts de statuskoppelingen. Plaats bij het tip-kader over de
      fase-indeling. Dezelfde afbeelding ook onder de FR-pagina.

## Lijsten → Schattingen (`credit-management/appraisals.md`)

- [ ] `schattingen-lijst.png` — het scherm met de drie keuzelijsten en een tiental rijen, met zichtbare
      vinkjes in **Aangesteld** en **Rapport ontvangen** en gevulde aanstellingsdatums. Plaats bij
      "De kolommen". Dezelfde afbeelding ook onder de FR-pagina.

- [ ] `verzekeringen-lijst.png` — het Verzekeringen-scherm met de drie keuzelijsten bovenaan en een tiental
      rijen. Kies bij voorkeur een beeld waar de teller een gefilterd aantal toont (bv. `2690 / 2990`), zodat
      meteen duidelijk is dat de filters samenwerken. Plaats bovenaan de pagina. Dezelfde afbeelding ook
      onder de FR-pagina.

- [ ] `dashboard.png` — het volledige dashboard met de vier tegels bovenaan en de fasepijplijn eronder.
      Kies een moment waarop er in meerdere fases dossiers staan. Plaats bovenaan de pagina.
- [ ] `dashboard-fases.png` — het beheerscherm met links de fasetabel (enkele fases ingevuld, één met
      Eindfase aangevinkt) en rechts de statustoewijzing. Plaats bovenaan de pagina.
- [ ] `relaties-lijst.png` — de relatielijst met het filter op soort bovenaan en een mix van particulieren
      en bedrijven.
- [ ] `aanbrengers-boom.png` — de boom met één hoofdaanbrenger uitgeklapt zodat de kantoren eronder zichtbaar
      zijn.
- [ ] `afspraken-week.png` — de werkweekweergave met de gekleurde legende bovenaan en afspraken van
      meerdere medewerkers.
- [ ] `keuzelijsten.png` — het keuzelijsten-scherm met bovenaan de lijstkiezer en eronder de items van één
      lijst. Kies bij voorkeur een lijst waar een item met "(verwijderd)" in staat.
- [ ] `referentielijsten.png` — de lijstkiezer met het nummer en enkele items.
- [ ] `documenttypes.png` — het scherm met de categorieën en enkele types, met een ingevulde hint zichtbaar.
- [ ] `taken-overzicht.png` — het takenscherm met de drie filters bovenaan en een mix van soorten in de kolom
      "Hangt aan": minstens één dossier, één relatie en één losse taak.
