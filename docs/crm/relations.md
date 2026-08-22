# Relaties

Alle personen en bedrijven waarmee u te maken hebt, staan in één lijst: klanten, borgen, eigenaars en contactpersonen — één scherm met een filter.

## Het scherm openen

Klik in de zijbalk op **CRM** en dan op **Relaties**.

## De lijst

![Het scherm Relaties in CreditSoft: een lijst van particulieren en bedrijven met kolommen voor naam, type, e-mail, telefoon, gemeente, gsm en intern nummer, met bovenaan een filter op soort, de knoppen Samenvoegen, Nieuwe relatie en Exporteren en een zoekveld.](../images/relaties-lijst.png "Overzicht van alle relaties van het kantoor")

De tabel toont per relatie: **naam**, **type**, **e-mail**, **telefoon**, **gemeente**, **gsm** en **intern nummer**.

- **Filter op soort** — bovenaan kiest u alles, enkel de particulieren of enkel de bedrijven.
- **Zoeken** — het zoekveld zoekt in alle kolommen tegelijk.
- **Sorteren en filteren** — klik op een kolomkop om te sorteren; onder elke kop staat een filterveld.
- **Kolommen kiezen** — toon of verberg kolommen; uw keuze wordt onthouden.
- **Exporteren** — naar Excel of CSV, met de filters die op dat moment aan staan.
- **Nieuw / bewerken** — klik op **Nieuw**, of **dubbelklik** een rij om de fiche te openen.
- **Samenvoegen** — twee fiches voor dezelfde partij samenvoegen; zie hieronder.
- **Verwijderen** — een relatie wordt **gearchiveerd** (soft-delete), niet definitief gewist.
- **Groeperen** — met [groepen](groups.md) deelt u relaties in zoals het u past: per regio, per kantoor, per campagne.

### Journaal

Rechts op het scherm zit de lade **Journaal**. Selecteer een relatie en klap ze open: daar staat wat er rond
die fiche gebeurt — de [kredietdossiers](../journaal/kredietdossiers.md) van deze klant,
[taken](../journaal/taken.md), [notities](../journaal/notities.md), [bijlagen](../journaal/bijlagen.md),
[mailverkeer](../journaal/mailverkeer.md) en het [logboek](../journaal/logboek.md) van de wijzigingen.

Het onderdeel **Kredietdossiers** staat alleen bij een relatie: het toont de dossiers waarin die persoon als
aanvrager staat, recentste bovenaan. Belt een klant, dan gaat u van zijn fiche rechtstreeks naar zijn dossier.

Opent u de fiche, dan staan dezelfde onderdelen bovenaan als **tabbladen** — u hoeft dus niet terug
naar de lijst om ze te raadplegen. Lade en tabbladen tonen hetzelfde en werken op elk scherm gelijk;
[Het journaal](../journaal/overzicht.md) legt uit hoe.

## Twee fiches samenvoegen

Staat dezelfde persoon of hetzelfde bedrijf twee keer in de lijst, dan voegt u de fiches samen met de knop
**Samenvoegen** bovenaan. Selecteer eerst de fiche die u wil **behouden**, klik dan op de knop en kies in het
venster welke fiche daarin moet opgaan.

Voor u bevestigt, toont het venster de **gegevens die verloren gaan**: e-mailadres, telefoon, gsm, btw-nummer
en of er opmerkingen op de fiche staan. Zo ziet u meteen of daar iets bij is dat u liever eerst overneemt.

Ná het samenvoegen krijgt u een overzicht van **wat er verhuisd is**, per soort: kredietdossiers, adressen,
afspraken, taken, notities, bijlagen en mailverkeer.

!!! warning "De behouden fiche houdt haar eigen velden"
    Naam, adres, e-mail, geboortedatum: die blijven zoals ze op de **behouden** fiche staan. Wil u iets van de
    andere fiche bewaren — bijvoorbeeld een recenter adres of een rijksregisternummer dat daar wél ingevuld is
    — neem dat dan **eerst** over. Na het samenvoegen is het weg.

    Samenvoegen kan niet ongedaan gemaakt worden.

Na afloop toont het venster hoeveel er precies verhuisd is, per soort. Staat er niets in die lijst, dan hing
er aan de verdwenen fiche ook niets vast.

## Particulier of bedrijf

Een relatie is ofwel een **particulier** ofwel een **bedrijf**. Dat kiest u bovenaan de fiche en het bepaalt welke velden u te zien krijgt: bij een particulier de geboortedatum en de burgerlijke staat, bij een bedrijf de rechtsvorm en het btw-nummer.

!!! tip "Bedrijfsgegevens automatisch ophalen"
    Vult u bij een bedrijf het **btw-nummer** in en klikt u op **Ophalen**, dan haalt CreditSoft de naam, de
    rechtsvorm en het adres rechtstreeks op uit de Kruispuntbank van Ondernemingen. U hoeft ze niet over te
    typen en er sluipen geen tikfouten in.

## De fiche van een relatie

**Nieuw** en een dubbelklik openen allebei de **fiche als een volledige pagina**. Bovenaan staat een
terugkeerknop naar de lijst, met daarnaast de soort en de naam.

![De fiche van particulier Alain Adriaenssens over de volle pagina: het tabblad Algemene informatie met type, naam, voornaam, telefoon, gsm, documenttaal en het hoofdadres links, en rechts het interne nummer, de aanspreking, e-mail en website, daaronder het brede blok Opmerkingen en een balk met de knoppen Opslaan, Annuleren en Verwijderen.](../images/relaties-fiche.png "De volledige fiche van een relatie, met de algemene gegevens en de opmerkingen"){ .volle-breedte }

De gegevens van de relatie staan op **twee tabbladen**, met daarnaast de tabbladen van het
[journaal](../journaal/overzicht.md). Elk van de twee sluit af met een blok **Opmerkingen** — het is telkens
hetzelfde veld — en onderaan blijft de knoppenbalk in beeld.

### Tabblad "Algemene informatie" (particulier)

- **Naam** (verplicht) en **voornaam**
- **Documenttaal** (verplicht) — zie hieronder
- **Contact** — telefoon, gsm, e-mail, website
- **E-mail ongeldig** — een vinkje om te markeren dat een adres niet meer werkt, zonder het weg te gooien
- **Aanspreking** en **intern nummer**
- **Hoofdadres** — straat, huisnummer, bus, postcode, gemeente, land

### Tabblad "Bijkomende informatie" (particulier)

Alles wat u voor een kredietdossier nodig hebt — maar niet alles tegelijk in beeld.

**Standaard ziet u** de **geboortedatum** en **-plaats**, het **rijksregisternummer**, de **nationaliteit**,
de **burgerlijke staat**, het **beroep**, het **contacttype**, de **contactbron** en de datum van het eerste
contact. Daar staat ook **Bron (lead)** bij: waar deze prospect vandaan kwam.

Met de knop **Meer velden** klapt de rest open: geboorteland, geslacht, taal, **identiteitskaart** met
geldigheidsdata, huwelijksstelsel en -datum, **partner**, kinderen en personen ten laste, werkgever, in dienst
sinds, contracttype en functie. **Minder velden** klapt ze weer dicht.

!!! tip "Waarom niet alles ineens"
    De meeste fiches hebben die tweede reeks niet nodig. Ze staan er wel, maar buiten beeld, zodat u niet door
    twintig lege velden hoeft te scrollen om bij het volgende tabblad te raken.

### Bij een bedrijf

Daar heten de tabbladen **Algemeen** en **Overig**. Op het eerste staan de bedrijfsnaam, de **rechtsvorm**, het
btw-nummer met de knop **Ophalen**, het interne nummer, de documenttaal en de contactgegevens; op het tweede
duidt u aan of het bedrijf een **klant** en/of een **leverancier** is.

### De documenttaal

Op elke fiche staat een **documenttaal**. Die bepaalt in welke taal deze relatie haar brieven en e-mails krijgt — los van de taal waarin u zelf werkt. Een Franstalige klant krijgt dus Franse documenten, ook als uw scherm in het Nederlands staat.

Dit veld is **verplicht**. Laat u het leeg, dan weet het programma niet welke sjabloontaal het moet gebruiken.

!!! tip "Postcode en gemeente"
    Typ in het veld **Postcode**: de keuzelijst toont zowel de postcode als de gemeente, dus u kunt op
    beide zoeken — ook op *Gent* of *Liège*. Kiest u een postcode, dan wordt de **gemeente altijd mee
    ingevuld**. Maakt u de gemeente leeg — met het kruisje, of met **Backspace** op de geselecteerde tekst —
    dan wordt de postcode mee leeggemaakt.

## Opslaan

De knoppenbalk onderaan blijft in beeld terwijl u door de fiche scrolt. De knoppen staan rechts:
**Opslaan**, **Annuleren** en **Verwijderen**.

Bij het opslaan worden **ontbrekende verplichte velden** en een **ongeldig e-mailadres** gemeld. Het
e-mailadres wordt gecontroleerd zolang er iets in het veld staat, ook als u het niet zelf hebt gewijzigd.
**Telefoonnummers worden opgemaakt** in de officiële notatie: typt u `09/3724829`, dan staat er na het bewaren
`09 372 48 29`.

!!! warning "Deze relatie bestaat mogelijk al"
    Bestaat er al een relatie met **dezelfde naam of hetzelfde e-mailadres**, dan toont CreditSoft welke, en
    vraagt of u toch wil bewaren. Dat is een waarschuwing, geen blokkade — naamgenoten bestaan. Ze houdt tegen
    dat u een tweede keer aanmaakt wat er al staat.
