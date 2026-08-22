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

- [x] `menu-links.png` + `-fr` — GEPLAATST 21/08/2026, met CRM en Krediet opengeklapt — het hoofdmenu links (dagelijkse schermen + de "Beheer"-groep). Plaats bij "Het menu links".
- [x] `hoofdbalk.png` + `-fr` — GEPLAATST 21/08/2026 — de balk bovenaan met de iconen (feedback, help, avatar). Plaats bij "De balk bovenaan".
- [x] `voorkeuren-paneel.png` + `-fr` — GEPLAATST 21/08/2026, uitgesneden op het paneel zelf — het geopende voorkeuren-paneel (foto / accentkleur / grootte / taal / 2FA). Plaats bij "Je voorkeuren".

## Aan de slag → Tweestapsverificatie (`getting-started/tweestapsverificatie.md`)

- [⚠️] `2fa-inschakelen.png` — **bewust niet gemaakt.** Dit scherm toont een QR-code én de sleutel in
      leesbare vorm; dat is het gedeelde geheim van dat account. Zo'n beeld op een publieke site zetten is
      geen goede gewoonte, ook niet voor een demo-account — en wie het naleest, leert er een verkeerde
      reflex van. Beter: het scherm natekenen of de code onherkenbaar maken. Beslissing nodig. Vraag was — het inschakelscherm met QR-code + sleutel + codeveld. Plaats bij "Inschakelen".
- [⚠️] `2fa-aanmelden.png` — **bewust niet gemaakt.** Vereist dat 2FA écht aanstaat op het demo-account
      waarmee de beelden gemaakt worden; daarna vraagt élke schermafdruk-run een code uit een
      authenticator. Dat breekt de automatisering. Vraag was — de 2FA-uitdaging bij het aanmelden (codeveld + "Gebruik een herstelcode"). Plaats bij "Aanmelden met tweestapsverificatie".

## Aan de slag → Het dashboard (`getting-started/dashboard.md`)

- [x] `dashboard-startscherm.png` + `-fr` — vernieuwd 18/08/2026, ná ADR-0007: de tegels dragen nu hun
      periode ("· 2026" tegenover "· alle jaren") en de pijplijn toont vijf fases. Het oude beeld toonde
      een dashboard van vóór die wijziging.
      ⚠️ Op dit beeld is *Volume per verantwoordelijke* grotendeels **Onbekend**: de gegenereerde dossiers
      dragen legacy-gebruikers-id's die niet naar de demo-medewerkers wijzen. Eerlijk, maar het oogt als
      een gebrek — op te lossen in de testdata-generator, niet in het beeld.
- [x] `dashboard-fases.png` + `-fr` — vernieuwd 18/08/2026: het onderste blok heet nu
      *Contractstatussen — wat betekent elke status?* in plaats van de koppeling aan een KPI-tegel.

## Lijsten → Rapporten (`credit-management/reports.md`)

- [x] `rapporten-bibliotheek.png` + `-fr` — de negen tegels in drie groepen. Geplaatst 18/08/2026.
- [x] `rapporten-periode.png` + `-fr` — het parameter-venster van één rapport (Van / Tot en met).
      Geplaatst 18/08/2026.
- [x] `rapporten-voorbeeld.png` + `-fr` — de eerste bladzijde van *Status periodiek op aktedatum* als pdf,
      met briefhoofd, cirkeldiagram, tabel en totalen. Geplaatst 18/08/2026. ⚠️ Dit beeld komt niet uit het
      scherm maar uit de pdf zelf (`pdftoppm -r 150`, bovenste 880 px). De demo-tenant moet daarvoor een
      statusbetekenis-mapping hebben, anders is het rapport leeg.

## Lijsten → Contractenoverzicht (`credit-management/contract-overview.md`)

- [x] `contractenoverzicht-lijst.png` + `-fr` — het lijstscherm met de zeven keuzelijsten en de tabel tot en
      met het contractnummer. Geplaatst 18/08/2026, op 1700 px: op 1280 viel de kolom *Contractnr.*
      halverwege een woord af. ⚠️ Deze pagina stond hier tot dan niet in het manifest en had daardoor als
      enige lijstscherm géén beeld — tekst en helplade waren wél tweetalig af. Dominique zag het gat.

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

## Relatiebeheer → Leads (`crm/leads.md`)

- [x] `leads-lijst.png` + `-fr` — GEPLAATST 21/08/2026, op 1700 px — de werklijst met alle vijf de statussen
      vertegenwoordigd, de kolom *Wacht al* met "3 dagen" in het rood bovenaan, en de kolom *Opvolging* met
      zowel namen als "niemand" in het rood. ⚠️ Die spreiding is geen toeval: ze komt uit `DemoLeads` in
      `TestDataGenerator`. Toont het beeld ooit zes keer "niemand", dan is de naamresolutie van de opvolger
      stuk — dat was de fout van 21/08, en ze was alleen op het beeld te zien, niet in een test.
- [x] `lead-fiche.png` + `-fr` — GEPLAATST 21/08/2026, volle hoogte — de fiche van de lead die het langst
      wacht (Sofie Delcourt): de drie blokken, de wachttijd in het rood in de kop, en de knop *Contact gehad*
      op de plaats waar anders het tijdstip van het eerste contact staat.

- [x] `lead-klant-maken.png` + `-fr` — GEPLAATST 21/08/2026, uitgesneden op het venster — het conversievenster
      in zijn normale vorm (Soort + Documenttaal, beide met een rood sterretje). ⚠️ De KOPPEL-variant staat
      bewust niet op beeld: die vraagt een demo-lead die samenvalt met een bestaande relatie, en zo'n rij oogt
      vreemd in de leadlijst. De handleiding beschrijft hem in een waarschuwingsblok.

- [x] **Het dagelijkse bericht: bewust GEEN beeld.** Het instelscherm *Leadmeldingen* telt twee velden, en
      allebei staan ze woordelijk in de tekst. Een afdruk van de mail zelf zou een echte tenant tonen — daar
      staan namen van leads in.

## Relatiebeheer → Vragenlijst vooraf (`crm/online-afspraken-vragenlijst.md`)

- [x] `vragenlijst-bewerken.png` + `-fr` — GEPLAATST 21/08/2026 — het bewerkscherm met vier vragen, elk met
      een ander soort antwoord (getal, korte tekst, ja/nee, langere tekst). Mailtekst én vragen ingevuld, dus
      géén waarschuwingsblok: dat is de toestand die een lezer wil herkennen.
      ⚠️ Het script haalt vóór de opname de focus weg. Zonder dat staat de cursor in het eerste veld, scrolt
      dat veld naar het einde van zijn tekst, en lijkt er op het beeld iets af te ontbreken.
- [x] `vragenlijst-bezoeker.png` + `-fr` — GEPLAATST 21/08/2026 — een ECHTE proefpagina, geen nabootsing: het
      script maakt er één, fotografeert ze en trekt ze weer in. Te zien is hoe elk soort antwoord een ander
      veld oplevert (getalveld, tekstveld, Ja/Nee-knoppen, tekstvak).
      ⚠️ Dit is een pagina van ADM One in onze huisstijl. Ze verandert dus mee wanneer dáár iets wijzigt —
      bij een volgende ronde opnieuw nemen, ook als er bij ons niets veranderde.

## Relatiebeheer → Online afspraken (`crm/online-afspraken.md`)

- [x] `online-afspraken-agenda.png` + `-fr` — GEPLAATST 21/08/2026 — de agenda in werkweek-weergave: dinsdag
      een geboekt moment in het grijs op naam van *Demo Bezoeker*, daaronder een vrij moment in het groen, met
      de boekingslink erboven.
- [x] `online-afspraken-instellingen.png` + `-fr` — GEPLAATST 21/08/2026 — de zijlade open naast de agenda:
      Locaties boven, dan de velden van de boekingspagina tot en met het antwoordadres.
- [x] **De boekingspagina zelf: bewust GEEN beeld.** Die pagina wordt door ADM One gehost en draagt de huisstijl
      van het platform; een afdruk hier zou verouderen zodra daar iets wijzigt, zonder dat wij het zien.

## Relatiebeheer → Leads vanaf uw website (`crm/leads-webformulier.md`)

- [x] **Bewust GEEN beelden.** Deze pagina beschrijft een koppeling, geen scherm: wat de makelaar te zien krijgt
      is de gewone leadlijst, en die staat al op `leads-lijst.png`. Een schermafdruk van een contactformulier zou
      bovendien een website van een klant tonen, of een verzonnen site die niets bewijst. Wat hier telt is de
      uitleg en de doorverwijzing naar de technische pagina van ADM One.

## Relatiebeheer → Professionals (`crm/professionals.md`)

- [x] `professionals-lijst.png` + `-fr` — het lijstscherm met de typefilter bovenaan. Geplaatst 15/08/2026.
- [x] `professionals-fiche.png` + `-fr` — de volledige fiche op één pagina (Algemeen met het verplichte type en
      de knop **Ophalen** naast het btw-veld, Facturatie, Opmerkingen, knoppenbalk). Geplaatst 15/08/2026.
      ⚠️ Het gekozen demo-record heeft géén btw-nummer, dus de knop **Ophalen** staat uitgegrijsd op het beeld.
      Bij een volgende opname beter een record met btw kiezen.

## Relatiebeheer → Groepen (`crm/groups.md`)

- [x] `groepen-lijst.png` + `-fr` — het lijstscherm met de vier demo-groepen, de knop **Nieuw** en het
      zoekveld. Geplaatst 18/08/2026; de demo-tenant had tot dan géén groepen, dus dit beeld was leeg te maken.
- [x] `aanbrenger-groepering.png` + `-fr` — de aanbrengersfiche (Kompas Vastgoed Pelt) met het veld
      **Groepering** ingevuld in het blok Identiteit. Plaats bij "Een aanbrenger in een groep zetten".
      Geplaatst 18/08/2026. ⚠️ Het schot zoekt die aanbrenger expliciet op: de eerste rij van de lijst draagt
      meestal géén groep, en een leeg veld toont niet wat de zin ernaast beweert.

## Beheer → Bedrijfsfiche (`administration/company-profile.md`)

- [x] `bedrijfsfiche.png` + `-fr` — het scherm met de vijf blokken (Identiteit met de **Ophalen**-knop naast
      het btw-nummer, Contact, Adres, Bank, Documenten & huisstijl met het logo-sleepvak) en de **Opslaan**-knop
      rechtsboven. Geplaatst 16/08/2026.
- [x] `bedrijfsfiche-logo.png` + `-fr` — GEPLAATST 21/08/2026 — (optioneel) het logo-sleepvak in close-up. Plaats bij "Logo".

## Beheer → Gebruikers (`administration/users.md`)

- [⛔] `gebruikers-lijst.png` — **KAN NIET, en dat blijft zo tot iemand een keuze maakt.** Voor een
      OPERATOR toont dit scherm de gebruikers van álle tenants; op 21/08/2026 droeg een eerste gegenereerd
      beeld drie echte KredietUnie-adressen. Dat beeld is weggegooid. De "klant-weergave" die hieronder
      gevraagd wordt is niet bereikbaar: demo-gebruikers worden opzettelijk zónder wachtwoord aangemaakt
      (TestDataGenerator), dus je kan je niet als één van hen aanmelden. Wie dit beeld wil: geef één
      demo-medewerker een wachtwoord en schiet het vanuit diens weergave. Oorspronkelijke vraag — het lijstscherm vanuit **klant-weergave** (kolommen Gebruiker + Naam, per rij de knoppen **Fiche**, **Wachtwoord resetten**, **Verwijderen**; het aanmaakformulier bovenaan; terug-link). Plaats bij "Een collega toevoegen".
- [x] `gebruikers-fiche.png` + `-fr` — GEPLAATST 21/08/2026, strak uitgesneden op het venster — de **Fiche**-popup met Telefoon/Gsm/Vertegenwoordiging + de **Mailhandtekening**-editor, en de notitie dat naam/e-mail/functie door ADM One beheerd worden. Plaats bij "De fiche bewerken".

## Beheer → Rollen & rechten (`administration/roles.md`)

- [x] `rollen-lijst.png` — ACHTERHAALD: `rollen.png` toont de rollenlijst mét slotje en het veld Nieuwe rol (nagekeken 21/08/2026) — het scherm met de rollenlijst (de vaste rol **Tenant-beheerder** met slotje + het veld **Nieuwe rol** / **Toevoegen**). Plaats bij "Een rol aanmaken".
- [x] `rollen-detail.png` — grotendeels gedekt door `rollen.png`: rechten- en gebruikerskolom staan erop. Enkel de AANVINKBARE rechten ontbreken, want de getoonde systeemrol is niet bewerkbaar. Een eigen rol zou dat tonen — een geopende rol met de **rechten** (aanvinkbaar) en rechts **Gebruikers met deze rol**. Plaats bij "Rechten toekennen".

## Beheer → Mailsjablonen (`administration/mail-templates.md`)

- [x] `mailsjablonen.png` — het editorscherm: bovenaan de **Sjabloon**-keuzelijst, het **variabelen-palet** met de chips, links de taal-tabs (Onderwerp + Body HTML + Bijlagen), rechts het sticky **Voorbeeld**. Plaats bij "Variabelen".

## Beheer → Mailmonitoring (`administration/mail-monitoring.md`)

- [x] `mailmonitoring.png` — het overzicht met de kolommen Aangemaakt / Type / Naam / Aan / Onderwerp / Verzonden / Aflevering / Reden-fout (groene 'Afgeleverd'-statussen), de statusfilter + Vernieuwen bovenaan links, en zoek + '…'-exportmenu rechtsboven. Plaats bij "Wat je ziet".

## Beheer → Verzendadressen (`administration/sender-addresses.md`)

- [x] `platformbeheer-hub.png` + `-fr` — GEPLAATST 21/08/2026 — de hub-pagina **Platformbeheer** met de groep *Communicatie* en de tegel *Verzendadressen*. Plaats bij "Het scherm openen".
- [x] `verzendadressen.png` + `-fr` — het volledige scherm: het kader met het standaardadres van ADM One en de
      toegelaten domeinen, de schakelaar om uitgaande mail te blokkeren, en de tabel met de kolom **Standaard**
      waarin het standaardadres groen aangeduid staat. Vernieuwd 17/08/2026.
      ⚠️ Genomen met de blokkade-schakelaar **uit**: dat is de normale toestand bij een klant. Op de demo-tenant
      staat hij daarna weer aan, anders kan een demonstratie echte mail versturen.
- [x] `verzendadressen-bewerken.png` + `-fr` — GEPLAATST 21/08/2026, mét de domeincontrole in beeld — het bewerkscherm met de twee verplichte velden én de domeincontrole
      eronder (groen bij een geregistreerd domein, oranje bij een onbekend). Plaats bij "Uw eigen domein
      gebruiken". ⚠️ Vraagt een geopende pop-up, dus niet met het huidige script te maken.

## Beheer → Prullenbak (`administration/recycle-bin.md`)

- [x] `prullenbak.png` — het Prullenbak-scherm met de verwijderde records **gegroepeerd per soort** (bv. Relaties, Kredietinstellingen, …) met de kolommen **Naam** / **Verwijderd op** en de knop **Herstellen**. Plaats bij "Wat je ziet".

## Beheer → Actielogboek (`administration/activity-log.md`)

- [x] `actielogboek.png` — het Actielogboek-scherm met de regels (kolommen **Wanneer** / **Wie** / **Actie** / **Onderwerp**). Plaats bij "Wat je ziet".

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
- [x] `kredietdossier-fiche.png` + `-fr` — het geopende dossier. **Geplaatst 18/08/2026**, vernieuwd na de verhuizing van de documentchecklist naar een tabblad (DEMO-1620: eigenaar én sales gevuld, 3 contracten, en de drie tabbladen met de teller 2/4). De aftoets van dit scherm is op 18/08/2026
      gedaan, dus de wachtstand is opgeheven en het beeld **staat nu in `gen-screenshots.mjs`** — draaien
      volstaat. Het moet tonen: de kopkaart met **Eigenaar** en **Sales** als keuzelijst (gevuld, niet leeg),
      het vinkje *inhouden* naast het commissiebedrag, links de datums en het pand met *Interne opmerkingen*
      onderaan, rechts de contracten, en onderaan rechts de twee tabbladen **Partijen** en **Opmerkingen**.
      ⚠️ Vensterbreedte **1920**: de cockpit is op twee kolommen gebouwd en past exact op 1920×1080. Smaller
      schuift de rechterkolom eronder, en dan toont het beeld een indeling die niemand zo ziet.
      De plaatshouder `<!-- AFBEELDING: ... -->` staat nog in de pagina (NL en FR) en mag weg zodra het beeld
      er staat.

## Lijsten → Globaal overzicht (`credit-management/global-overview.md`)

- [x] `globaal-overzicht-lijst.png` + `-fr` — het volledige scherm met de **vijf** keuzelijsten (sales kwam
      erbij op 17/08), de teller, het **totaal van het kredietbedrag**, de knop **Afdruk lijst** en een tiental
      rijen. Vernieuwd 17/08/2026 na de afdrukketen. ⚠️ Vensterbreedte in `gen-screenshots.mjs` op **2000**
      gezet: op 1700 viel Ingangsdatum half af en Verantwoordelijke helemaal buiten beeld, terwijl de
      alt-tekst de datums wél noemt.
- [⏸] `afdrukvoorbeeld.png` — **uitgesteld op vraag van Dominique (21/08/2026).** Let op voor wie het
      oppakt: de PDF-viewer werkt niet op macOS (zie [[pdf-viewer-bijlagen]]), dus dit beeld moet
      vermoedelijk op Windows gemaakt worden. Vraag was — het venster **Afdrukvoorbeeld** met de pdf erin en de knoppen *Doorsturen per
      mail* en *Downloaden*. Plaats bij "De lijst afdrukken of doorsturen". ⚠️ **Kan niet met het script**: op
      macOS toont dat venster een terugval-weergave die leeg blijft; enkel op Windows rendert de pdf-viewer.
      Dit beeld moet dus met de hand van een Windows-machine komen. Dezelfde afbeelding is bruikbaar onder
      Verzekeringen én Globaal overzicht.
- [x] `globaal-overzicht-voorinstelling.png` + `-fr` — GEPLAATST 21/08/2026, met de keuzelijst opengeklapt — de eerste keuzelijst opengeklapt met **Lopend**,
      **Opvolging na akte** en **Alle dossiers**. Plaats bij "Kiezen wat u wil zien".
- [x] `dashboard-fases.png` — het scherm **Platformbeheer → Dashboard-fases**, met links de fases
      (eindfase/opvolging aangevinkt) en rechts de statuskoppelingen. Plaats bij het tip-kader over de
      fase-indeling. Dezelfde afbeelding ook onder de FR-pagina.

## Lijsten → Schattingen (`credit-management/appraisals.md`)

- [x] `schattingen-lijst.png` + `-fr` — het scherm met de drie keuzelijsten, zichtbare vinkjes in
      **Aangesteld** en gevulde aanstellingsdatums. Geplaatst 17/08/2026.

- [x] `verzekeringen-lijst.png` + `-fr` — het Verzekeringen-scherm met de drie keuzelijsten, de teller, de
      knop **Afdruk lijst** en een tiental rijen. Vernieuwd 17/08/2026 na de afdrukketen.

- [x] `dashboard.png` — ACHTERHAALD: gedekt door `dashboard-startscherm.png` op getting-started/dashboard.md (nagekeken 21/08/2026) — het volledige dashboard met de vier tegels bovenaan en de fasepijplijn eronder.
      Kies een moment waarop er in meerdere fases dossiers staan. Plaats bovenaan de pagina.
- [x] `dashboard-fases.png` — het beheerscherm met links de fasetabel (enkele fases ingevuld, één met
      Eindfase aangevinkt) en rechts de statustoewijzing. Plaats bovenaan de pagina.
- [x] `relaties-lijst.png` + `-fr` — de relatielijst met het filter op soort bovenaan. Geplaatst 15/08/2026.
- [x] `relaties-fiche.png` + `-fr` — de volledige fiche op één pagina, tabblad *Algemene informatie* van een
      particulier, met Opmerkingen en de knoppenbalk. Geplaatst 15/08/2026.
- [x] `aanbrengers-boom.png` — ACHTERHAALD: `aanbrengers-lijst.png` op crm/contributors.md ís de boom (nagekeken 21/08/2026) — de boom met één hoofdaanbrenger uitgeklapt zodat de kantoren eronder zichtbaar
      zijn.
- [x] `afspraken-week.png` + `-fr` — de werkweekweergave met de gekleurde legende bovenaan en afspraken
      van meerdere medewerkers. **Hernomen 21/08/2026** (v0.85.0): de werkbalk heeft er een
      medewerkerfilter en twee weergaveknoppen bij gekregen, en de week toont nu de twee
      demo-boekingen van dinsdag 25/08 — de toegewezen in de kleur van Simon, de vrije in amber.
- [x] `afspraken-per-medewerker.png` + `-fr` — GEPLAATST 21/08/2026 — de kolomweergave op dinsdag
      25/08: acht kolommen, met de boeking van Simon in zijn kolom en de nog niet toegewezen boeking
      in de eigen kolom *Via de boekingspagina*. Dát is het beeld waar de handleiding het slepen uitlegt.
      ⚠️ Beide beelden komen uit `tools/beelden-agenda.mjs`. Dat script navigeert op de **volledige
      datumtitel** en niet op een aantal klikken: de dagweergave begint niet waar de werkweek eindigde
      (dat gaf een leeg zaterdagbeeld), en zoeken op enkel het dagnummer liep door tot 25 september.
- [x] `keuzelijsten.png` — het keuzelijsten-scherm met bovenaan de lijstkiezer en eronder de items van één
      lijst. Kies bij voorkeur een lijst waar een item met "(verwijderd)" in staat.
- [x] `referentielijsten.png` — ACHTERHAALD: gedekt door `keuzelijsten.png` op beheer/keuzelijsten.md (nagekeken 21/08/2026) — de lijstkiezer met het nummer en enkele items.
- [x] `documenttypes.png` — het scherm met de categorieën en enkele types, met een ingevulde hint zichtbaar.
- [x] `taken-overzicht.png` + `-fr` — het takenscherm met de drie filters en een gevulde kolom
      Verantwoordelijke. Geplaatst 16/08/2026.
      ⚠️ Die kolom is niet vanzelf gevuld: de eerste versie van de journaal-testdata wees niemand aan, en dan
      staat ze leeg in beeld én blijft het belletje op nul. De actie *Journaal vullen* geeft nu elke taak een
      verantwoordelijke en elke medewerker één achterstallige taak.

## Journaal (`journaal/*.md`) — ✅ AFGEWERKT 16/08/2026

- [x] `journaal-kredietdossiers.png` + `-fr` — GEPLAATST 22/08/2026 — het tabblad Kredietdossiers op de fiche
      van een relatie met zeven dossiers, gesorteerd op indieningsdatum. Gekozen relatie: Dominique Michiels
      in tenant_demo, de relatie met de meeste dossiers — bij minder dan drie rijen leest de tabel als een
      randgeval in plaats van als het normale beeld.

Zes beelden, beide talen, uit **tenant_demo** met de lade open naast de lijst Relaties.

⚠️ **De demo-tenant had nul journaal-inhoud.** Geen taak, notitie, bijlage of mail — het journaal was er dus
niet te tonen, laat staan te fotograferen. Opgelost met de actie **Journaal vullen** op het conversiescherm
(`JournaalTestData`), die acht relaties voorziet van taken, notities, bijlagen en uitgaande mail. Herhaalbaar:
staat er al inhoud, dan doet ze niets.

- [x] `journaal-lade` — de lijst mét de lade ernaast, voor `overzicht.md`.
- [x] `kantoorprofiel-vragenlijst.png` — GEPLAATST 22/08/2026 — de vragenlijst-editor met het voorbeeld
  ernaast. ⚠️ **Dit beeld komt uit `adm-appkit/docs/schermen/`, niet uit onze demo-tenant.** Het is een
  AppKit-scherm en dus in elke app identiek; zelf konden we het niet maken omdat het scherm de klant uit de
  aanmelding afleidt en ons operator-account aan geen enkel kantoor hangt. Wijzigt het scherm, haal het beeld
  dan opnieuw daar op — niet zelf namaken.
- [x] `afwezigheden.png` + `-fr` — GEPLAATST 22/08/2026 — het scherm Verlof & sluitingsdagen met de drie
  soorten én de badge "Hele kantoor" op één beeld.
- [x] `agenda-afwezigheid.png` + `-fr` — GEPLAATST 22/08/2026 — de agenda in kolomweergave met twee
  gearceerde kolommen naast vier vrije. ⚠️ Dit schot hangt aan demo-afwezigheden die OVER VANDAAG lopen;
  staan ze er niet, dan is het beeld een gewone lege agenda en valt dat niet op.
- [x] `journaal-gesprekken.png` + `-fr` — GEPLAATST 22/08/2026 — het onderdeel Gesprekken met twee
  telefoongesprekken naast elkaar: één uitgaand/Uitgevoerd (groen) en één inkomend/Open (oranje), zodat
  beide labelkleuren op één beeld staan. De testdata maakt er nu twaalf aan (`JournaalTestData`).
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

## Beheer → Documenttypes (`beheer/documenttypes.md`)

- [x] `documenttypes.png` + `-fr` — de lijst met de twee filters, de teller en de knop Categorieën beheren.
      Vernieuwd 18/08/2026 na de opruiming (werkbalk in de lijst i.p.v. ernaast).
- [x] `documenttypes-categorieen.png` + `-fr` — het venster Categorieën beheren met de kolommen Nederlands,
      Frans en **Types**. Geplaatst 18/08/2026.

## Kredieten → Te valideren documenten (`credit-management/document-validation.md`)

- [x] `documenten-valideren.png` + `-fr` — de wachtrij met achttien stukken, **zonder** een rij te openen.
      Geplaatst 19/08/2026. ⚠️ Vensterbreedte **1700**: op 1280 passen de zes kolommen niet naast elkaar.
      ⚠️ Bewust géén rij open: het beoordeelpaneel zweeft over de lijst en dekt dan Aangeleverd, Bestanden en
      Eigenaar af — net de kolommen die de tekst eronder uitlegt.
      ⚠️ Het beeld heeft gevulde demo-data nodig — de generator hangt sinds 19/08/2026 bijlagen aan de
      wachtende stukken, anders staat er in de kolom *Bestanden* overal een 0 en oogt het scherm leeg.

## Beheer → Klantenportaal (`beheer/klantportaal.md`)

- [x] `klantportaal-vormgeving.png` + `-fr` — het vormgevingsscherm mét het levende voorbeeld ernaast.
      Geplaatst 19/08/2026. ⚠️ Vensterbreedte **1700**: op 1280 zakt de voorbeeldkolom (col-xl-5) onder het
      formulier en toont het beeld een indeling die niemand met een normaal scherm ziet.
- [x] `klantportaal-klant.png` + `-fr` — het portaal met alle vier de statussen (DEMO-3940 draagt ze alle
      vier; een willekeurig dossier toont er meestal één). Geschoten via de voorbeeldroute, dus mét de gele
      balk — dat staat zo in de tekst uitgelegd, en zo komt er geen uitnodigingssleutel in een schermafdruk.
      Geplaatst 19/08/2026.

---

**Alle beelden opnieuw genomen op 19/08/2026**, na het documentvalidatie-blok. Reden: de navigatie zelf
veranderde (het item **Te valideren** met zijn teller kwam erbij), en die staat op élk beeld. Wie enkel de
gewijzigde schermen herneemt, houdt een handleiding waarin de zijbalk per pagina anders oogt.
