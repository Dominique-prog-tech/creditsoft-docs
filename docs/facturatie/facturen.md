# Facturen

Op dit scherm maakt u de facturen en creditnota's van uw kantoor. U stelt een factuur op als klad, maakt ze definitief, opent ze als pdf en mailt ze naar uw klant. Een factuur die niet klopt, zet u recht met een creditnota.

## Het scherm openen

Klik in het menu links op **Facturen**, onder *Facturatie*.

De facturen van één klant of één dossier vindt u ook op hun fiche:

- op een **kredietdossier**, op het tabblad *Facturen* — zie [Kredietdossiers](../credit-management/credit-files.md#facturen);
- op een **relatie**, op het tabblad *Facturen* van het [journaal](../journaal/overzicht.md).

Drie rechten bepalen wat u hier kan:

| Recht | Wat u ermee kan |
|---|---|
| **Facturen bekijken** | De lijst en de fiches openen, en de pdf |
| **Facturen opmaken** | Een klad opstellen, wijzigen en verwijderen |
| **Facturen definitief maken en versturen** | Definitief maken, mailen en een creditnota maken |

Een gewone gebruiker kan facturen bekijken en opmaken. Wie ze definitief mag maken en versturen, krijgt van uw beheerder een rol met dat recht — zie [Rollen](../administration/roles.md).

## De lijst

![De lijst Facturen met bovenaan het jaar 2026, de knoppen Nieuwe factuur en Exporteren, en per rij het nummer, de datum, de klant, het dossier, de soort Factuur of Creditnota, het totaal incl. btw en het openstaande bedrag; bovenaan een klad zonder nummer met het label Klad.](../images/facturen-lijst.png "Uw facturen en creditnota's van dit jaar"){ .volle-breedte }

Per factuur ziet u het **nummer**, de **datum**, de **klant**, het **dossier**, de **soort** — factuur of creditnota —, het **totaal incl. btw** en wat er nog **open** staat. Een klad heeft nog geen nummer: daar staat het label *Klad*.

- Bovenaan kiest u het **jaar**, of *Alle jaren*.
- **Nieuwe factuur** opent een lege factuur.
- **Exporteren** zet de lijst in Excel of CSV — zie [Werken met lijsten](../getting-started/lijsten.md).
- Staan er creditnota's klaar om aan hun factuur gekoppeld te worden, dan verschijnt de knop **Creditnota's koppelen** met het aantal erbij — zie [Creditnota's koppelen](creditnotas-koppelen.md).

Dubbelklik een rij om de factuur te openen.

## Een factuur opstellen

Klik op **Nieuwe factuur**. De factuur begint als **klad**: u kan ze nog wijzigen, en ze heeft nog geen nummer.

![Een factuur in klad: bovenaan het label Klad, daaronder de kaart Klant met de klant, Ter attentie van, het dossier, de omschrijving en het veld Uw referentie met de grijze hint Leeg: het dossiernummer; dan de kaart Datums met factuurdatum, vervaldag en datum van de prestatie, en de kaart Lijnen met één lijn en de totalen per btw-tarief.](../images/factuur-fiche-klad.png "Een factuur in klad"){ .volle-breedte }

### Klant

- **Klant** — een persoon of een bedrijf uit uw relaties. Verplicht.
- **Ter attentie van** — vrije tekst, bijvoorbeeld de contactpersoon bij een bedrijf.
- **Dossier** — het kredietdossier waar deze factuur bij hoort. U kiest uit de dossiers waarin deze klant **aanvrager** is. Niet verplicht.
- **Omschrijving** — komt als *Betreft* op de factuur.
- **Uw referentie** — de referentie die uw klant opgaf, bijvoorbeeld het nummer van zijn bestelbon. Zie [Uw referentie](#uw-referentie) hieronder.

### Datums

- **Factuurdatum** — standaard vandaag.
- **Vervaldag** — de factuurdatum plus de betalingstermijn uit de [Factuurinstellingen](../beheer/factuurinstellingen.md). Wijzigt u de factuurdatum, dan schuift de vervaldag mee, tenzij u ze zelf aanpaste.
- **Datum van de prestatie** — niet verplicht.

### Lijnen

Klik op **Lijn toevoegen**. In het venster vult u in:

- **Artikel** — kiest u een artikel, dan vult CreditSoft de omschrijving, de prijs en de btw-code voor u in. Met *Geen — vrije lijn* typt u alles zelf.
- **Btw-code** — verplicht. De standaardcode staat al voorgesteld.
- **Omschrijving**, **Aantal**, **Prijs excl. btw** en **Korting (%)**.

Klik op **Toepassen**. Onder de lijnen staan de totalen: de **btw per tarief**, het totaal excl. btw, de btw en het totaal incl. btw. Dubbelklik een lijn om ze te wijzigen of te verwijderen.

Klik op **Bewaren** om het klad te bewaren. Een klad dat u niet meer nodig hebt, verwijdert u met **Klad verwijderen**.

!!! tip "Een factuur vanuit een dossier"
    Op het tabblad *Facturen* van een kredietdossier staat de knop **Factuur maken**. De nieuwe factuur heeft dan al de eerste aanvrager als klant en het dossier ingevuld. Heeft het dossier een charter, dan staat het charterbedrag er ook al als lijn. Welke charterdossiers nog op hun factuur wachten, ziet u op [Te factureren](te-factureren.md).

### Uw referentie

Bij elke definitieve factuur hoort een **referentie** voor uw klant: daarmee boekt hij de factuur in. Laat u het veld leeg, dan neemt CreditSoft bij *Definitief maken* het **dossiernummer**. Het veld zegt zelf wat er zal gebeuren: *Leeg: het dossiernummer (DEMO-1003)*, of *Verplicht zonder dossier*.

Heeft de factuur geen dossier en geen referentie, dan wordt ze niet definitief.

## Definitief maken

Is het klad in orde, klik dan op **Definitief maken** en bevestig. Op dat moment:

- krijgt de factuur het **volgende nummer** van het jaar: *F-2026-0001*, *F-2026-0002*, enzovoort, zonder gaten. Een creditnota volgt haar eigen reeks: *CN-2026-0001*;
- krijgt ze een **gestructureerde mededeling** (*+++…+++*) voor de betaling;
- worden de **gegevens van de klant vastgelegd** zoals ze op dat moment zijn: naam, adres, btw-nummer en taal. Wijzigt u later de relatiefiche, dan blijft de factuur zoals ze was;
- wordt de **pdf bewaard**.

Daarna kan de factuur niet meer gewijzigd of verwijderd worden. Een fout zet u recht met een [creditnota](#een-factuur-rechtzetten-de-creditnota).

![Een definitieve factuur F-2026-0002 met het label Definitief: de klant, het dossier en de lijnen zijn alleen te lezen; onderaan het blok Betaling en rechtzetting met de gestructureerde mededeling, het betaalde bedrag, het gecrediteerde bedrag met de link naar creditnota CN-2026-0001 en het openstaande bedrag, en de knoppen Pdf, Mailen en Creditnota maken.](../images/factuur-fiche.png "Een definitieve factuur, deels rechtgezet"){ .volle-breedte }

!!! warning "Wat Definitief maken tegenhoudt"
    CreditSoft weigert, en zegt waarom, wanneer:

    - de factuur **geen lijnen** heeft, of een lijn **zonder btw-code**;
    - een btw-code een **wettelijke vermelding** vraagt die leeg is — vul ze in bij [Btw-codes en artikelen](../beheer/btw-codes-en-artikelen.md);
    - de **vervaldag vóór de factuurdatum** ligt;
    - op uw [Bedrijfsfiche](../administration/company-profile.md) **geen geldige IBAN** staat — zonder rekeningnummer kan uw klant niet betalen;
    - het **adres van de klant** onvolledig is: straat, postcode, gemeente en land moeten ingevuld zijn op het hoofdadres van zijn relatiefiche;
    - er **geen referentie en geen dossier** is — zie [Uw referentie](#uw-referentie).

### Betaling en rechtzetting

Onderaan een definitieve factuur staat:

- de **gestructureerde mededeling**;
- **Betaald** — wat er al betaald is;
- **Gecrediteerd** — wat creditnota's van deze factuur rechtzetten, met een link naar elke creditnota;
- **Open** — wat er nog te betalen is.

## De pdf

Klik op **Pdf**. De factuur opent in een nieuw tabblad, zoals uw klant ze krijgt.

![De pdf van factuur F-2026-0001: bovenaan het briefhoofd van het kantoor, daaronder de titel FACTUUR met nummer, datum, vervaldag, mededeling en uw referentie, rechts de naam en het adres van de klant; dan de lijnen, de btw per tarief en het totaal te betalen, en onderaan de betaalzin met rekeningnummer en mededeling, de betaal-QR-code en de voettekst.](../images/factuur-pdf.png "De factuur zoals uw klant ze krijgt"){ .volle-breedte }

Op de pdf staan:

- uw **briefhoofd** — logo, adres en contactgegevens uit uw [Bedrijfsfiche](../administration/company-profile.md);
- de **naam en het adres van uw klant**, met zijn btw-nummer;
- het **nummer**, de **datum**, de **vervaldag**, de **mededeling** en **uw referentie**;
- de **lijnen**, de **btw per tarief** en het **totaal te betalen**;
- de **wettelijke vermelding** van een vrijgestelde of verlegde btw-code;
- de **betaalzin** met uw rekeningnummer en de mededeling, en een **betaal-QR-code**: uw klant scant ze met zijn bankapp, en bedrag, rekening en mededeling staan meteen juist;
- de **voettekst** uit de [Factuurinstellingen](../beheer/factuurinstellingen.md).

De pdf is in de **taal van de klant** — de documenttaal op zijn relatiefiche — en niet in uw eigen taal. Een Franstalige klant krijgt dus een Franse factuur.

!!! info "De bewaarde kopie"
    Bij *Definitief maken* bewaart CreditSoft de pdf. Daarna opent **Pdf** altijd die kopie. Wijzigt u later uw logo of uw rekeningnummer, dan blijft de factuur die uw klant kreeg, de factuur die u bewaart.

Een **creditnota** heeft geen vervaldag, geen betaalzin en geen QR-code: er valt niets te betalen. Ze vermeldt de factuur die ze rechtzet.

## Mailen

Klik op **Mailen**. Het venster *Nieuwe mail* opent, al ingevuld:

- **Aan** — het **facturatie-adres** van de klant: een extra e-mailadres van de soort *Facturatie* op zijn relatiefiche. Heeft hij er geen, dan zijn gewone e-mailadres;
- het **onderwerp** en de **tekst** uit het mailsjabloon *Factuur of creditnota*, in de taal van de klant;
- de **pdf** als bijlage.

![Het venster Nieuwe mail voor factuur F-2026-0001: de ontvanger en de afzender ingevuld, het onderwerp Factuur F-2026-0001 met de naam van het kantoor, de tekst met de aanhef, het nummer, de datum en het bedrag van de factuur, en onderaan de pdf van de factuur als bijlage met de knoppen Versturen en Annuleren.](../images/factuur-mailen.png "De factuur mailen naar uw klant"){ .volle-breedte }

Lees na, pas aan wat u wil, en klik op **Versturen**. De mail komt in het mailverkeer van de klant, en de factuur draagt voortaan het label **Gemaild op** met de datum. U kan een factuur opnieuw mailen.

De tekst van de mail past u aan bij de [Mailsjablonen](../administration/mail-templates.md).

## Een factuur rechtzetten: de creditnota

Klopt een definitieve factuur niet, dan maakt u een **creditnota**. Een factuur verwijdert u niet.

1. Open de factuur en klik op **Creditnota maken**.
2. Er opent een **klad** voor een creditnota, met dezelfde klant, hetzelfde dossier, dezelfde referentie en dezelfde lijnen. Ze is al aan de factuur gekoppeld.
3. Zet u maar een deel recht, pas dan de lijnen aan: verlaag de bedragen of verwijder een lijn.
4. Klik op **Definitief maken**.

Op de factuur staat de creditnota daarna bij **Gecrediteerd**, en het openstaande bedrag daalt. Samen kunnen de creditnota's van een factuur niet meer bedragen dan de factuur zelf. Is de factuur volledig rechtgezet, dan verdwijnt de knop.

Op de fiche van een creditnota staat het blok **Rechtzetting**: welke factuur ze rechtzet. Een creditnota die aan geen factuur hangt, telt als openstaand; met **Koppelen aan een factuur…** kiest u de factuur van dezelfde klant die ze rechtzet, en met **Koppeling ongedaan maken** maakt u dat terug los.

## Facturen met het label "Uit het vorige programma"

Facturen met dit label kunt u enkel lezen. Ze krijgen geen pdf: het origineel bestaat al. **Creditnota maken** kan wel — zo annuleert u een factuur die nog openstaat.

## Veelgemaakte fouten

!!! warning
    - **Een factuur met een fout verwijderen.** Dat kan niet, en dat is de bedoeling: een definitieve factuur heeft een nummer dat nooit meer weggaat. Maak een creditnota.
    - **Definitief maken voor een klant zonder volledig adres.** Vul eerst het hoofdadres aan op zijn relatiefiche — met het land erbij.
    - **Een Franstalige klant een Nederlandse factuur sturen.** De taal van de factuur komt uit de documenttaal van de klant. Staat die verkeerd, verbeter ze dan vóór u de factuur definitief maakt.

## Zie ook

- [Te factureren](te-factureren.md)
- [Creditnota's koppelen](creditnotas-koppelen.md)
- [Btw-codes en artikelen](../beheer/btw-codes-en-artikelen.md)
- [Factuurinstellingen](../beheer/factuurinstellingen.md)
- [Mailsjablonen](../administration/mail-templates.md)
- [Relaties](../crm/relations.md)
