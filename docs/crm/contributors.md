# Aanbrengers

Uw aanbrengers staan in een **boom**: een hoofdaanbrenger, daaronder zijn kantoren, en daaronder de individuele medewerkers. Zo ziet u meteen wie bij wie hoort.

## Het scherm openen

Klik in de zijbalk op **CRM** en dan op **Aanbrengers**.

## De lijst

![Het scherm Aanbrengers in CreditSoft: een boomlijst met hoofdaanbrengers en de kantoren eronder, met kolommen voor naam, type, hoedanigheid, e-mail, agentnummer, gemeente, gsm en actief, en bovenaan de knoppen Samenvoegen, Nieuw en Exporteren.](../images/aanbrengers-lijst.png "Overzicht van de aanbrengers, geordend als een boom")

De tabel toont per aanbrenger: **naam**, **type**, **hoedanigheid**, **e-mail**, **agentnummer**, **gemeente**, **gsm** en **actief**.

- **Open- en dichtklappen** — klik op het driehoekje voor een rij om een niveau te tonen of te verbergen.
- **Zoeken** — het zoekveld zoekt in alle kolommen tegelijk.
- **Kolommen kiezen** — toon of verberg kolommen; ook de breedtes die u instelt, blijven bewaard voor de volgende keer.
- **Exporteren** — naar Excel of CSV.
- **Samenvoegen** — staan er twee fiches voor dezelfde aanbrenger, dan voegt u ze samen: de gekozen rij blijft, de andere gaat erin op.
- **Nieuw / bewerken** — klik op **Nieuw**, of **dubbelklik** een rij om de fiche te openen.

### Journaal

Rechts op het scherm zit de lade **Journaal**. Selecteer een aanbrenger en klap ze open: daar staat wat er rond
die fiche gebeurt — de **vrije commissieschema's**, [taken](../journaal/taken.md), [notities](../journaal/notities.md),
[bijlagen](../journaal/bijlagen.md), [mailverkeer](../journaal/mailverkeer.md) en het
[logboek](../journaal/logboek.md) van de wijzigingen.

#### Vrije commissieschema's

Dit tabblad toont de commissies van deze aanbrenger die **niet aan een kredietdossier hangen** — bijvoorbeeld een
maandelijkse vergoeding voor dossiers van vóór een aansluiting, of een correctie. U herkent ze aan hun
**omschrijving**; die staat vooraan op elk blokje, met daaronder het bedrag, de uitbetalingsvorm en de startdatum.

Toevoegen, wijzigen, activeren, herberekenen en stopzetten werken hier precies zoals bij de schema's op een
kredietdossier — [Kredietdossiers](../credit-management/credit-files.md) beschrijft ze in detail. Twee verschillen:
u vult zelf een omschrijving in in plaats van een dossier te kiezen, en de aanbrenger ligt vast omdat u op zijn
fiche staat.

!!! note "Een bedrag mag negatief zijn"
    Een commissie die u terugneemt — bijvoorbeeld omdat de aanbrenger ze zelf al ontvangen heeft — voert u in als
    een **negatief** bedrag. Dat geldt zowel hier als bij de schema's op een dossier.

Opent u de fiche, dan staan dezelfde onderdelen bovenaan als **tabbladen** — u hoeft dus niet terug
naar de lijst om ze te raadplegen. Lade en tabbladen tonen hetzelfde en werken op elk scherm gelijk;
[Het journaal](../journaal/overzicht.md) legt uit hoe.

## De fiche van een aanbrenger

**Nieuw** en een dubbelklik openen allebei de **fiche als een volledige pagina**, met vijf blokken — Identiteit, Erkenning en status, Contact en adres, Commissie en Opmerkingen — en onderaan een knoppenbalk die in beeld blijft.

![De fiche van een aanbrenger over de volle pagina, met de vijf blokken Identiteit (inclusief de groepering), Erkenning en status, Contact en adres, Commissie en Opmerkingen, en onderaan de knoppen Bewaren, Annuleren, Portaal en Verwijderen.](../images/aanbrengers-fiche.png "De volledige fiche van een aanbrenger, met identiteit, erkenning, contact en commissie"){ .volle-breedte }

### Identiteit

Wie deze aanbrenger is en welke rol hij speelt: **type aanbrenger** (hoofd, kantoor of sub), **valt onder** — de aanbrenger waaronder hij hangt in de boom —, **rechtsvorm**, **relatie**, **aanspreking**, **hoedanigheid**, de naam of **bedrijfsnaam** met het **bedrijfstype**, het **btw-nummer**, het **aanbrengernummer**, de **documenttaal** (verplicht) en de **groepering** — de groep waartoe deze aanbrenger behoort, uit uw lijst bij [Groepen](groups.md).

!!! tip "Bedrijfsgegevens automatisch ophalen"
    Vul het **btw-nummer** in en klik op **Ophalen**: CreditSoft haalt naam, rechtsvorm en adres rechtstreeks
    uit de Kruispuntbank van Ondernemingen.

### Erkenning en status

Mag deze aanbrenger bemiddelen, en loopt de samenwerking nog? Het **FSMA-nr.** met een vinkje of de inschrijving in orde is, en of hij **actief** is — met de datum vanaf wanneer, of **gestopt** met de datum sinds wanneer.

### Contact en adres

Telefoon, gsm, e-mail, website en het adres.

!!! tip "Postcode en gemeente"
    Typ in het veld **Postcode** een postcode of een gemeentenaam; de gemeente wordt mee ingevuld. Maakt u de
    gemeente leeg — met het kruisje of met **Backspace** — dan wordt de postcode mee leeggemaakt.

### Commissie

De **IBAN** waarop zijn commissie betaald wordt, het **standaard percentage** en de **betaalwijze**.

De betaalwijze bepaalt welke velden er daarna bijkomen:

- **Recurrente betaling** — het percentage dat direct uitbetaald wordt, en over hoeveel maanden de rest gespreid wordt.
- **Vast bedrag** — het bedrag zelf.
- **Geplande betaling** — een tabel van 24 regels waarin u per regel de maand en het percentage zet.

## De productie van een aanbrenger

Op het tabblad **Productie** van de fiche ziet u wat deze aanbrenger voor uw kantoor betekent: hoeveel dossiers hij aanbrengt, hoeveel er tot een akte komen, en hoe dat zich verhoudt tot uw kantoor als geheel. Het tabblad verschijnt zodra de aanbrenger bewaard is.

![Het tabblad Productie op de fiche van een aanbrenger: bovenaan de keuze van de periode en de schakelaar voor de onderliggende aanbrengers, daaronder tegels met dossiers, akten, omzetting, afgevallen, gemiddeld krediet, doorlooptijd, lopende dossiers en commissie, elk met het cijfer van het kantoor ernaast, en daaronder grafieken per maand en per jaar van invoer.](../images/aanbrengers-productie.png "Het tabblad Productie van een aanbrenger"){ .volle-breedte }

### Kiezen wat u ziet

- **Periode** — *Alles*, *Dit jaar*, *Vorig jaar* of *Laatste 12 maanden*.
- **Soort** — bijvoorbeeld enkel hypothecair krediet. Deze keuze verschijnt alleen als uw kantoor meer dan één productsoort gebruikt.
- **Met onderliggende aanbrengers** — telt ook de aanbrengers mee die onder deze aanbrenger hangen, over de hele boom. De schakelaar staat er alleen als er aanbrengers onder hangen.

Een andere keuze toont de cijfers meteen; er wordt niets opnieuw geladen.

### De kerncijfers

Elke tegel toont het cijfer van deze aanbrenger. De kleine vermelding ernaast zet het naast uw kantoor.

- **Dossiers** — ingevoerd in de periode, met het aandeel in het kantoor.
- **Akten** — verleden in de periode, met het kredietvolume en het aandeel in het kantoor.
- **Omzetting** — van de dossiers die in de periode ingevoerd werden en intussen afgesloten zijn: hoeveel procent werd een akte.
- **Afgevallen** — hoeveel procent van diezelfde dossiers eindigde zonder akte.
- **Gemiddeld krediet** — het gemiddelde bedrag van de akten.
- **Indiening tot akte** — hoeveel dagen er doorgaans verlopen tussen de indiening en de akte. CreditSoft neemt de mediaan, zodat één dossier dat lang bleef liggen het beeld niet scheeftrekt.
- **Lopend nu** — de dossiers die vandaag nog lopen, en hoeveel akten er gepland staan.
- **Commissie** — wat uw kantoor deze aanbrenger in de periode toekende. Deze tegel ziet u alleen als u commissies mag bekijken, en alleen als uw kantoor commissie boekt.

!!! note "Wanneer telt een dossier als akte, en wanneer als afgevallen?"
    - Een **aktedatum** tot en met vandaag telt als akte. Een aktedatum in de toekomst telt als *gepland*.
    - Een dossier dat gerealiseerd is maar geen aktedatum draagt, telt mee in de omzetting, maar in geen enkele
      periode of maand — het *wanneer* ontbreekt. Het tabblad vermeldt hoeveel zulke dossiers er zijn.
    - Een dossier zonder aktedatum waarvan de status in een **afsluitende fase** staat, telt als afgevallen. De
      naam van die fase is de reden. Uitzondering: een fase die u op [Dashboard-fases](../beheer/dashboard-fases.md)
      als **geslaagd** aanvinkte — een dossier daarin is nooit afgevallen.

### De grafieken en de tabel

- **Dossiers en akten per maand** — altijd de laatste 24 maanden, los van de gekozen periode.
- **Omzetting per jaar van invoer** — van de dossiers die dat jaar binnenkwamen: hoeveel werden een akte, voor deze aanbrenger en voor het kantoor. Een jaar met een **\*** heeft nog lopende dossiers; dat cijfer kan nog stijgen.
- **Akten per kredietverstrekker** — de acht grootste; de rest staat samen onder *Overige*.
- **Waarom afgevallen** — de afgevallen dossiers per reden.

Onderaan staat een tabel per jaar met de dossiers, de akten, het kredietvolume en, als u die mag zien, de commissie.

!!! tip "Een aanbrenger die stilvalt"
    Heeft deze aanbrenger drie volle maanden of langer geen nieuw dossier ingevoerd, dan toont het tabblad
    bovenaan een melding met de datum van zijn laatste dossier.

!!! warning "Streepjes bij omzetting, afgevallen en lopend"
    Dan heeft uw kantoor nog geen dossierstatus aan een **afsluitende fase** gekoppeld, en weet CreditSoft niet
    welke dossiers afgevallen zijn. Stel dat in bij **Platformbeheer → Dashboard-fases** — zie [Dashboard-fases](../beheer/dashboard-fases.md). Tot dan toont het
    tabblad een streepje in plaats van een cijfer dat niet klopt.

## Twee fiches samenvoegen

Staat dezelfde aanbrenger twee keer in de lijst, dan voegt u de fiches samen met de knop **Samenvoegen**
bovenaan. Selecteer eerst de fiche die u wil **behouden**, klik dan op de knop en kies in het venster welke
fiche daarin moet opgaan.

Voor u bevestigt, toont het venster de **contactgegevens die verloren gaan**: het e-mailadres, het
telefoonnummer en het btw-nummer van de fiche die verdwijnt. Zo ziet u meteen of daar iets bij staat dat u
liever eerst overneemt.

Ná het samenvoegen krijgt u een overzicht van **wat er verhuisd is**, per soort: dossiers, commissies, taken,
notities, bijlagen en mailverkeer. Ook de onderliggende kantoren en medewerkers uit de boom, de
bankrekeningen, de geplande betalingen en de gevraagde documenten gaan mee.

!!! warning "De behouden fiche houdt haar eigen velden"
    Naam, adres, e-mail, commissie-afspraak: die blijven zoals ze op de **behouden** fiche staan. Wil u iets
    van de andere fiche bewaren — bijvoorbeeld een recenter adres — neem dat dan **eerst** over. Na het
    samenvoegen is het weg.

    Samenvoegen kan niet ongedaan gemaakt worden.

Na afloop toont het venster hoeveel er precies verhuisd is, per soort. Staat er niets in die lijst, dan hing
er aan de verdwenen fiche ook niets vast.

## Toegang tot het portaal geven

Met de knop **Portaal** rechtsonder geeft u een aanbrenger een eigen login. Hij ziet daarmee:

- **Mijn dossiers** — de dossiers die hij heeft aangebracht, met hun status.
- **Mijn commissies** — wat er voor hem geboekt staat.

Per aanbrenger bepaalt u of hij het commissie-tabblad en het documenten-tabblad te zien krijgt. Zo kunt u het portaal openstellen zonder meteen alle cijfers te tonen.

!!! warning "Wat CreditSoft controleert vóór het verlenen"
    Het **e-mailadres is de gebruikersnaam** van het portaal. Daarom:

    - zonder e-mailadres op de fiche kunt u geen toegang verlenen;
    - het adres moet een geldige vorm hebben;
    - **twee aanbrengers kunnen niet hetzelfde adres dragen** — draagt een andere aanbrenger het al, dan
      toont CreditSoft welke en weigert het verlenen.

!!! warning "Een aanbrenger ziet enkel zijn eigen gegevens"
    Het portaal is afgeschermd per aanbrenger. Een kantoor ziet de dossiers van zijn eigen medewerkers, maar nooit die van een ander kantoor.

## Bewaren

De knoppenbalk onderaan blijft in beeld. De knoppen staan rechts: **Bewaren**, **Portaal** en
**Annuleren**, met **Verwijderen** op afstand aan het einde — die staat er los van, want u klikt hem
zelden en per ongeluk nooit graag.

**Bewaren** blijft uitgeschakeld zolang de naam of de documenttaal ontbreekt — u krijgt dus geen melding achteraf, de knop komt gewoon niet vrij. Een **ongeldig e-mailadres** wordt live onder het veld gemeld terwijl u typt. **Telefoonnummers worden opgemaakt** in de officiële notatie: typt u `09/3724829`, dan staat er na het bewaren `09 372 48 29`.

**Verwijderen** vraagt eerst bevestiging, met de naam van de aanbrenger erbij. De fiche verhuist dan naar de prullenbak, waar u ze desnoods terughaalt.
