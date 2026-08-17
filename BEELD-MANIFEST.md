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
>
> ⚠️ **Brede lijstschermen schiet je op 1700 px** (`vensterBreedte` in het script), niet op de standaard 1280.
> Gemeten 17/08/2026 op het beeld zelf: bij 1280 brak de werkbalk van Kredietdossiers over twee rijen en viel
> de laatste kolom buiten beeld. Een beeld dat een gebroken werkbalk toont, leert de lezer een lay-out die
> hij zelf nooit ziet.

## Aan de slag → Navigeren in CreditSoft (`getting-started/navigatie.md`)

- [ ] `menu-links.png` — het hoofdmenu links (dagelijkse schermen + de "Beheer"-groep). Plaats bij "Het menu links".
- [ ] `hoofdbalk.png` — de balk bovenaan met de iconen (feedback, help, avatar). Plaats bij "De balk bovenaan".
- [ ] `voorkeuren-paneel.png` — het geopende voorkeuren-paneel (foto / accentkleur / grootte / taal / 2FA). Plaats bij "Je voorkeuren".

## Aan de slag → Tweestapsverificatie (`getting-started/tweestapsverificatie.md`)

- [ ] `2fa-inschakelen.png` — het inschakelscherm met QR-code + sleutel + codeveld. Plaats bij "Inschakelen".
- [ ] `2fa-aanmelden.png` — de 2FA-uitdaging bij het aanmelden (codeveld + "Gebruik een herstelcode"). Plaats bij "Aanmelden met tweestapsverificatie".

## Kredieten → Kredietinstellingen (`credit-management/financial-institutions.md`)

- [x] `kredietinstellingen-lijst.png` + `-fr` — het lijstscherm (grid + zoekveld + "Nieuw"). Geplaatst 15/08/2026.
- [x] `kredietinstellingen-fiche.png` + `-fr` — de volledige fiche op één pagina (algemene informatie,
      commissionering met het groene totaal, opmerkingen, knoppenbalk). Geplaatst 15/08/2026,
      nadat de `AdmOne:ApiKey` in de dev-secrets stond: daarvóór toonde het land `BE` in plaats van "België",
      omdat de referentiedienst `401` gaf en de keuzelijst terugviel op een gewoon tekstveld.
      *Vervangt de twee oude tabbeelden* (`-algemeen`, `-commissionering`) — de fiche is sinds 15/08/2026 een
      pagina in plaats van een pop-up met tabbladen.

## Kredieten → Verzekeraars (`credit-management/insurance-companies.md`)

- [x] `verzekeraars-lijst.png` + `-fr` — het lijstscherm. Geplaatst 15/08/2026.
- [x] `verzekeraars-fiche.png` + `-fr` — de volledige fiche op één pagina (algemene informatie met het
      instellingsnummer en de documenttaal, opmerkingen, knoppenbalk). Geplaatst 15/08/2026.
      *Vervangt* `verzekeraars-bewerken` — de fiche is een pagina in plaats van een pop-up. Het
      screenshot-script knipte daar nog `.dxbl-popup` uit; die clip is weg, anders faalt de opname.

## Relatiebeheer → Professionals (`crm/professionals.md`)

- [x] `professionals-lijst.png` + `-fr` — het lijstscherm met de typefilter bovenaan. Geplaatst 15/08/2026.
- [x] `professionals-fiche.png` + `-fr` — de volledige fiche op één pagina (Algemeen met het verplichte type en
      de knop **Ophalen** naast het btw-veld, Facturatie, Opmerkingen, knoppenbalk). Geplaatst 15/08/2026.
      ⚠️ Het gekozen demo-record heeft géén btw-nummer, dus de knop **Ophalen** staat uitgegrijsd op het beeld.
      Bij een volgende opname beter een record met btw kiezen.

## Relatiebeheer → Groepen (`crm/groups.md`)

- [ ] `groepen-lijst.png` — het lijstscherm + de "Nieuw"-knop. Plaats bij "De lijst".

## Beheer → Bedrijfsfiche (`administration/company-profile.md`)

- [x] `bedrijfsfiche.png` + `-fr` — het scherm met de vijf blokken (Identiteit met de **Ophalen**-knop naast
      het btw-nummer, Contact, Adres, Bank, Documenten & huisstijl met het logo-sleepvak) en de **Opslaan**-knop
      rechtsboven. Geplaatst 16/08/2026.
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

> ⛔ **GEBLOKKEERD, 16/08/2026 — het scherm is stuk, niet het schot.** `/beheer/audit` toont de foutkaart
> "Er ging iets mis". De oorzaak zit in de **fundering**: `AuditLog.razor` geeft `Fill="true"` door aan
> `AdmGrid`, waar `Fill` een private berekende property is en geen parameter. Sinds AppKit **0.168.0**, en
> dus ook op productie. Gemeld aan ADM One (`adm-creditsoft/docs/berichten/2026-08-16-admone-auditlog-fill.md`);
> de fix is één woord (`FullHeight="true"`).
>
> Het is een **runtime**-fout, dus de build en de tests bleven groen — het schermafbeeldingen-script vond
> hem, niet het oog. Zodra de fix binnen is: `node docs/tools/gen-screenshots.mjs actielogboek`.

> Best genomen vanuit een **tester-weergave** (niet het volledige operator-menu), zodat de schermen tonen
> wat een tester ziet.

## Krediet → Kredietdossiers (`credit-management/credit-files.md`)

- [x] `kredietdossiers-lijst.png` + `-fr` — de lijst met de drie filters (status, tussenpersoon, datumbereik)
      en de acht standaardkolommen. Geplaatst 17/08/2026.
- [ ] `kredietdossier-fiche.png` — het geopende dossier met de blokken Dossiergegevens en Pand. **Wacht op de
      aftoets van het dossierscherm zelf** (het kredietgedeelte); de plaatshouder staat nog in de pagina.

## Lijsten → Globaal overzicht (`credit-management/global-overview.md`)

- [x] `globaal-overzicht-lijst.png` + `-fr` — het volledige scherm met de **vijf** keuzelijsten (sales kwam
      erbij op 17/08), de teller en een tiental rijen. Geplaatst 17/08/2026.
- [ ] `globaal-overzicht-voorinstelling.png` — de eerste keuzelijst opengeklapt met **Lopend**,
      **Opvolging na akte** en **Alle dossiers**. Plaats bij "Kiezen wat u wil zien".
- [ ] `dashboard-fases.png` — het scherm **Platformbeheer → Dashboard-fases**, met links de fases
      (eindfase/opvolging aangevinkt) en rechts de statuskoppelingen. Plaats bij het tip-kader over de
      fase-indeling. Dezelfde afbeelding ook onder de FR-pagina.

## Lijsten → Schattingen (`credit-management/appraisals.md`)

- [x] `schattingen-lijst.png` + `-fr` — het scherm met de drie keuzelijsten, zichtbare vinkjes in
      **Aangesteld** en gevulde aanstellingsdatums. Geplaatst 17/08/2026.

- [x] `verzekeringen-lijst.png` + `-fr` — het Verzekeringen-scherm met de drie keuzelijsten en een tiental
      rijen. Geplaatst 17/08/2026.

- [ ] `dashboard.png` — het volledige dashboard met de vier tegels bovenaan en de fasepijplijn eronder.
      Kies een moment waarop er in meerdere fases dossiers staan. Plaats bovenaan de pagina.
- [ ] `dashboard-fases.png` — het beheerscherm met links de fasetabel (enkele fases ingevuld, één met
      Eindfase aangevinkt) en rechts de statustoewijzing. Plaats bovenaan de pagina.
- [x] `relaties-lijst.png` + `-fr` — de relatielijst met het filter op soort bovenaan. Geplaatst 15/08/2026.
- [x] `relaties-fiche.png` + `-fr` — de volledige fiche op één pagina, tabblad *Algemene informatie* van een
      particulier, met Opmerkingen en de knoppenbalk. Geplaatst 15/08/2026.
- [ ] `aanbrengers-boom.png` — de boom met één hoofdaanbrenger uitgeklapt zodat de kantoren eronder zichtbaar
      zijn.
- [ ] `afspraken-week.png` — de werkweekweergave met de gekleurde legende bovenaan en afspraken van
      meerdere medewerkers.
- [ ] `keuzelijsten.png` — het keuzelijsten-scherm met bovenaan de lijstkiezer en eronder de items van één
      lijst. Kies bij voorkeur een lijst waar een item met "(verwijderd)" in staat.
- [ ] `referentielijsten.png` — de lijstkiezer met het nummer en enkele items.
- [ ] `documenttypes.png` — het scherm met de categorieën en enkele types, met een ingevulde hint zichtbaar.
- [x] `taken-overzicht.png` + `-fr` — het takenscherm met de drie filters en een gevulde kolom
      Verantwoordelijke. Geplaatst 16/08/2026.
      ⚠️ Die kolom is niet vanzelf gevuld: de eerste versie van de journaal-testdata wees niemand aan, en dan
      staat ze leeg in beeld én blijft het belletje op nul. De actie *Journaal vullen* geeft nu elke taak een
      verantwoordelijke en elke medewerker één achterstallige taak.

## Journaal (`journaal/*.md`) — ✅ AFGEWERKT 16/08/2026

Zes beelden, beide talen, uit **tenant_demo** met de lade open naast de lijst Relaties.

⚠️ **De demo-tenant had nul journaal-inhoud.** Geen taak, notitie, bijlage of mail — het journaal was er dus
niet te tonen, laat staan te fotograferen. Opgelost met de actie **Journaal vullen** op het conversiescherm
(`JournaalTestData`), die acht relaties voorziet van taken, notities, bijlagen en uitgaande mail. Herhaalbaar:
staat er al inhoud, dan doet ze niets.

- [x] `journaal-lade` — de lijst mét de lade ernaast, voor `overzicht.md`.
- [x] `journaal-taken` — een openstaande taak met hoge prioriteit en een afgewerkte.
- [x] `journaal-notities` — een notitie met titel, datum en inhoud.
- [x] `journaal-bijlagen` — drie PDF's met naam, omschrijving, grootte en datum.
- [x] `journaal-mailverkeer` — twee uitgaande berichten met hun afleverstatus.
- [x] `journaal-logboek` — de record-historiek. Die was al gevuld: 7688 regels op relaties.
- [x] `relaties-fiche-journaal` — het journaal **als tabbladen op de fiche**, met het tabblad Taken open.
      Bijgekomen 16/08/2026, toen het journaal ook in de fiche verscheen. Bewust een tweede beeld naast
      `journaal-lade`: dat toont de lade naast de lijst, dit toont de tabbladen — twee plaatsen, dezelfde
      inhoud, en de handleiding beschrijft ze allebei.

> ⚠️ **De vijf fiche-beelden zijn op 16/08/2026 allemaal opnieuw genomen**, want de tabstrook maakt elke fiche
> hoger. Bij die ronde bleek het schot van Verzekeraars zijn Opmerkingen-blok kwijt: elke fiche had in het
> script een met de hand gemeten `vensterHoogte`, en die klopte niet meer. Zo'n te krap schot **faalt niet**
> — het toont gewoon minder, en ziet er verder precies uit als een geslaagd beeld.
>
> Daarom meet het script de benodigde hoogte nu zelf (`vulHoogte: true`) in plaats van een getal te dragen.
> Een veld bijzetten of een blok toevoegen kan dat niet meer stilzwijgend afknippen.

⚠️ **Geen beeld van de PDF-weergave** (de actie *Bekijken* op Bijlagen). Die viewer rendert op macOS een zwart
vlak — een beperking van de ontwikkelomgeving, niet van de app. Een beeld daarvan zou een fout tonen die een
gebruiker op Windows niet heeft. De gegenereerde PDF's zijn wél geldig; nagekeken met `file` en Quick Look.

## Aan de slag → het algemene-zaken-blok (`getting-started/*`) — ✅ AFGEWERKT 16/08/2026

Alle veertien pagina's van *Aan de slag* dragen nu een beeld, in beide talen. Gemaakt met
`node docs/tools/gen-screenshots.mjs <naam>`, uit **tenant_demo**.

- [x] `navigatie` — het hoofdvenster met menu, knoppenrij en de onderste snelkoppelingen.
- [x] `dashboard-startscherm` — tegels, grafieken en de fasepijplijn in één beeld.
- [x] `voorkeuren` — het paneel open, met alle vijf de instellingen zichtbaar.
- [x] `mijn-gegevens` — de drie blokken Contact, Mailhandtekening en Beveiliging.
- [x] `wachtwoord` — de drie lege velden. Blijft leeg: nooit een wachtwoord in beeld, ook geen verzonnen.
- [x] `tweestapsverificatie` — de **beginstand**, vóór *Activeren*.

⚠️ **Waarom er geen QR-code op het 2FA-beeld staat.** Die verschijnt pas ná het klikken op *Activeren*, en
een QR-code ís een sleutel: hij bevat het geheim waarmee de codes gemaakt worden. Zo'n beeld hoort niet in
een publieke handleiding, ook niet dat van een wegwerpaccount — "het is toch maar lokaal" is precies de
redenering waarmee je er ooit één publiceert die het niet is. De beginstand toont wat de gebruiker als
eerste ziet en bevat niets geheims; de stap met de QR staat in woorden beschreven.

⚠️ **`mijn-gegevens` vraagt een aangemelde gebruiker mét medewerkersfiche.** De operator `admin` heeft er
standaard geen en ziet dan enkel een waarschuwing. In de **lokale** demo-tenant kreeg hij er daarom één, met
`show_in_pickers = false` zodat hij niet als verantwoordelijke in andere beelden opduikt. De zes
demo-medewerkers zijn bewust zonder wachtwoord aangemaakt en kunnen dus niet aanmelden.
