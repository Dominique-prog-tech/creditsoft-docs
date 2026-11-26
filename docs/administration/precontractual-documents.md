# Precontractuele documenten

Vóór u een krediet bemiddelt, geeft u de klant een aantal documenten. CreditSoft maakt er drie voor u, telkens vertrekkend van het standaardmodel van FVF, in het Nederlands en het Frans:

- de **voorstelling van het kantoor**: de identiteit van uw kantoor, uw inschrijving bij de FSMA, de klachtenbehandeling, de commissie en de uitsluiting van buitencontractuele aansprakelijkheid;
- de **bemiddelingsfiche hypothecair krediet**: de gegevens van de aanvragers, de analyse van hun situatie (Deel I), uw aanbeveling (Deel II) en de bijlagen (Deel III);
- de **analyse schuldsaldoverzekering**: de verlangens en behoeften van de klant voor een levensverzekering (Deel I), uw advies (Deel II) en de informatie die de klant kreeg (Deel III). Die is er enkel voor een kantoor dat als verzekeringsmakelaar ingeschreven is.

CreditSoft vult de gegevens van uw kantoor in vanuit de [Bedrijfsfiche](company-profile.md), en die van het dossier wanneer u het document maakt. Op deze pagina leest u hoe u de documenten aanpast aan uw kantoor, en hoe u ze maakt voor een dossier.

## Het scherm openen

Klik in de zijbalk op **Platformbeheer** en daarna op de tegel **Precontractuele documenten** (onder *Bedrijf*). Enkel wie de Bedrijfsfiche mag wijzigen, ziet de tegel en kan de documenten aanpassen.

## De lijst

<!-- AFBEELDING: de lijst Precontractuele documenten in tenant_demo, met de regel Voorstelling van het kantoor, de kolom Documenten (NL v1 · FR v1) en Laatst gewijzigd -->

Per document ziet u de naam, welke versies er zijn per taal (bijvoorbeeld *NL v2 · FR v1*) en wanneer het laatst gewijzigd werd. Dubbelklik een rij om het document te openen.

Elk document staat er precies één keer. U kunt er geen tweede bij maken en het niet verwijderen: CreditSoft heeft het nodig om het document voor een dossier te maken.

## De versies van een document

Het document heeft een tabblad per taal: **Nederlands** en **Frans**. Elk tabblad toont de huidige versie en de lijst van alle versies, met de datum, wie ze bewaarde en de opmerking die erbij hoort.

<!-- AFBEELDING: het tabblad Nederlands van Voorstelling van het kantoor in tenant_demo, met Versie 2 door een medewerker en Versie 1 Meegeleverd door de app, de knoppen Document bewerken, Terugzetten en Voorbeeld als PDF -->

- **Versie 1** draagt de opmerking *Meegeleverd door de app*. Dat is het standaardmodel van FVF.
- **Voorbeeld als PDF** toont een versie met de gegevens van uw kantoor en de datum van vandaag. Zo ziet u het document zoals de klant het krijgt.
- **Terugzetten** maakt van een vorige versie opnieuw de huidige. Er komt een nieuwe versie bij met dezelfde inhoud; niets wordt gewist. Wilt u terug naar het model van FVF, zet dan versie 1 terug.

## Een document aanpassen

Klik op het tabblad van de taal op **Document bewerken**. Het document opent in een editor die werkt zoals Word.

<!-- AFBEELDING: de editor met de Nederlandse voorstelling van het kantoor in tenant_demo, met de velden «KantoorNaam» tot «KantoorWebsite» onder Identiteit, en bovenaan Opmerking bij deze versie, Controleren en Voorbeeld als PDF -->

De woorden tussen « » zijn **velden**. Die vult CreditSoft in wanneer het document gemaakt wordt:

| Veld | Wat er komt |
|---|---|
| «KantoorNaam» | De naam van uw kantoor |
| «KantoorAdres» | Straat, nummer en bus, postcode en gemeente, op één regel |
| «KantoorTelefoon» | Het telefoonnummer |
| «KantoorEmail» | Het e-mailadres |
| «KantoorWebsite» | De website |
| «KantoorOndernemingsnummer» | Het ondernemingsnummer, zonder *BE* ervoor |
| «KantoorFsmaNummer» | Het FSMA-nummer |
| «Datum» | De dag waarop het document gemaakt wordt |
| «KlantNaam» | De aanvragers van het dossier |
| «DossierNummer» | Het dossiernummer |

De eerste zeven komen uit de Bedrijfsfiche. Staat daar een gegeven niet ingevuld, dan komt er een stippellijn, die de klant of u met de hand invult. Een veld voegt u in via het tabblad **Mailingen** van de editor.

De bemiddelingsfiche kent veel meer velden: die van de aanvragers beginnen met *A1* (de eerste aanvrager, de linkse kolom) of *A2* (de tweede, de rechtse kolom), zoals «A1Naam» of «A2NettoInkomen». De editor toont ze allemaal in het tabblad **Mailingen**.

De analyse schuldsaldoverzekering heeft haar eigen velden. Daar is «KlantNaam» de naam van de eerste aanvrager en «KlantVoornaam» zijn voornaam; de vakjes heten «Vink…», zoals «VinkAdvies». Ook die toont de editor in het tabblad **Mailingen**.

Vul bovenaan bij **Opmerking bij deze versie** kort in wat u veranderde, en klik op **Bewaren als nieuwe versie**. Vanaf dan gebruikt CreditSoft die versie voor elk nieuw document in die taal.

!!! info "Verantwoordelijk voor de tekst"
    Het model van FVF is een standaardtekst voor kredietmakelaars. Past u de tekst aan, dan blijft die tekst die van uw kantoor: CreditSoft kijkt niet na of hij aan de wet voldoet.

## Wat CreditSoft invult in de bemiddelingsfiche { #fiche }

| Deel van de fiche | Wat CreditSoft invult |
|---|---|
| Koptekst | De naam, het adres, het e-mailadres, het telefoonnummer, de website en het ondernemingsnummer van uw kantoor |
| Gegevens van de cliënt(en) | Per aanvrager: naam, voornaam, geslacht, adres, telefoon, gsm, geboorteplaats en -datum, e-mailadres |
| 1. Persoonlijke situatie | Het aantal kinderen ten laste en de burgerlijke staat |
| 2.1 Maandelijkse inkomsten | De begindatum van het statuut, de werkgever, het netto maandinkomen, de kinderbijslag, de huidige huurinkomsten en de overige inkomsten; voor een zelfstandige het ondernemingsnummer, de begindatum en de aard van de activiteit |
| 2.2 Maandlasten | De huidige huur, de alimentatie, en een rij per lopende lening van beide aanvragers |
| 4 en 5 | De voorkeuren en de behoeften van het tabblad *Advies* |
| Deel II | Het vakje *Wij bevelen u … aan*, met de aanbevolen aanbiedingen en hun kredietinstelling, of het vakje *Wij kunnen u geen kredietproduct aanbevelen* |
| Ondertekening | De gemeente van uw kantoor en de datum |

- **Bedragen** zijn per maand. Een inkomen dat per jaar ingevuld is, telt voor een twaalfde.
- **Een lening** is *terug te betalen* (Ja) als ze door het nieuwe krediet overgenomen wordt. Zonder leningen blijven er lege rijen om met de hand in te vullen.
- **Deel II**: het eerste vakje staat aangekruist zodra het advies minstens één aanbevolen aanbieding heeft. Het tweede staat aangekruist bij een advies zonder aanbevolen aanbieding. Zonder advies blijven beide leeg.
- **De andere vakjes** (beroep, voordelen, doel, roker, elektronische informatie) blijven leeg: die kruist de klant of u met de hand aan.
- **De fiche heeft twee kolommen.** De eerste kolom is de eerste aanvrager van het dossier, de tweede kolom de tweede. Heeft het dossier drie of vier aanvragers, dan maakt CreditSoft een tweede fiche voor aanvragers 3 en 4. Is een aanvrager een bedrijf, dan vult CreditSoft enkel zijn identiteit in.

## Wat CreditSoft invult in de analyse schuldsaldoverzekering { #ssv }

De analyse is er enkel voor een kantoor dat bij de FSMA als **verzekeringsmakelaar** ingeschreven is; het document zegt dat ook. U zet dat aan met het vinkje op de [Bedrijfsfiche](company-profile.md#verzekeringsmakelaar). Zonder dat vinkje maakt CreditSoft de analyse niet.

Het model van FVF is een Excel-blad. CreditSoft maakt er een Word-document van, met de tekst van FVF letterlijk. De opmaak verfijnt u in de editor, zoals bij de andere documenten.

| Deel van de analyse | Wat CreditSoft invult |
|---|---|
| Voorstelling van ons kantoor | De naam, het adres, het e-mailadres, het telefoonnummer, de website, het ondernemingsnummer en de IBAN van uw kantoor |
| Uw gegevens | Van de eerste aanvrager: naam, voornaam, adres, geboortedatum en ondernemingsnummer |
| Deel I | Particulier of rechtspersoon, de verzekerden, de waarborg *Overlijden*, *in het kader van een krediet: Ja*, het totaal of een gedeelte van het kapitaal, en de fiscale aftrekbaarheid |
| Deel II | Advies of geen advies, het product, de motivering en of de klant het advies volgt: wat u in het venster kiest |
| Deel III | Het vakje van de klantenfiche, als u het in het venster aanvinkt |
| Ondertekening | De gemeente van uw kantoor en de datum |

- **De verzekerden** zijn de aanvragers die verzekerd zijn op een contract schuldsaldoverzekering van het dossier (tabblad *Contracten*), of die op een regel van *Borgen, SSV & reducties* staan. Het model heeft plaats voor twee.
- **Het totaal of een gedeelte** komt uit het verzekerde percentage op de regels van *Borgen, SSV & reducties*: allemaal 100 % is het totaal, anders een gedeelte met het percentage. Een percentage van 0 of boven 100 telt niet.
- **Fiscale aftrekbaarheid**: *Ja* staat aangekruist als elke regel *fiscaal* aangevinkt heeft. *Nee* kruist CreditSoft nooit aan, want een regel waarop niemand het vakje aanraakte, staat ook op nee.
- **Het rijksregisternummer en roker** vult CreditSoft nooit in.
- **De andere vakjes** (andere waarborgen, de premie, de looptijd, met welke verzekeraars uw kantoor werkt, de vergoeding) blijven leeg: die kruist de klant of u met de hand aan.

## Het document maken voor een dossier { #maken }

Open het dossier en klik op het tabblad **Advies**. Onder de samenvatting van het advies staat het blok **Precontractuele documenten**.

<!-- AFBEELDING: het tabblad Advies van een dossier in tenant_demo, met onderaan het blok Precontractuele documenten, de knoppen Voorstelling van het kantoor maken, Bemiddelingsfiche maken en Analyse schuldsaldoverzekering maken, en drie gemaakte documenten in de lijst -->

1. Klik op **Voorstelling van het kantoor maken**, **Bemiddelingsfiche maken** of **Analyse schuldsaldoverzekering maken**.
2. CreditSoft maakt het document in de taal van de **eerste aanvrager** van het dossier, met de huidige versie van uw sjabloon.
3. Het document verschijnt in de lijst met de datum en wie het maakte. Klik op **Openen** om het te bekijken.

Het document wordt bewaard bij de bijlagen van het dossier, in de categorie *Precontractueel*. U vindt het ook terug in het journaal van het dossier, onder *Bijlagen*.

Een gemaakt document verandert niet meer. Past u daarna de Bedrijfsfiche, het dossier of het sjabloon aan, dan maakt u het document opnieuw. Er komt dan een tweede document bij; het eerste blijft staan, zodat u altijd kunt tonen wat de klant kreeg.

U hebt het recht nodig om het dossier te wijzigen. Het blok staat niet in het portaal van de aanbrengers.

### Het venster van de analyse schuldsaldoverzekering

Bij **Analyse schuldsaldoverzekering maken** opent eerst een venster met wat CreditSoft niet weet.

<!-- AFBEELDING: het venster Analyse schuldsaldoverzekering in tenant_demo, met Ons kantoor verleent een advies aangeduid, Voorgesteld product en verzekeraar ingevuld, Motivering, Volgt de klant het advies? en het vinkje van de klantenfiche -->

- Kies **Ons kantoor verleent een advies** of **Geen advies**.
- **Voorgesteld product en verzekeraar** (zonder advies: het product dat de klant wenst). CreditSoft vult het product en de verzekeraar uit het dossier vooraf in; u past ze aan.
- Bij advies vult u de **motivering** in en kiest u of de klant het advies **volgt**: *Ja*, *Nee* of *Nog niet geweten*. Volgt hij het niet, dan vult u het product in dat hij wel wenst.
- Vink **De klantenfiche is samen met de klant overlopen** aan als dat zo is.

Klik op **Analyse maken**. Wat u in het venster kiest, staat enkel in het gemaakte document; CreditSoft bewaart het nergens anders. Maakt u de analyse opnieuw, dan vult u het venster opnieuw in.

Heeft uw kantoor een OKSign-contract, dan staat onderaan het venster ook wie tekent, en de knop **Maken en laten ondertekenen**. Zie hieronder.

### Maken en laten ondertekenen { #ondertekenen }

Heeft uw kantoor een contract met OKSign, dan laat u een precontractueel document meteen [digitaal ondertekenen](../credit-management/ondertekenen.md). Zonder contract verandert er niets: de knoppen maken het document zoals hierboven.

<!-- AFBEELDING: het venster Voorstelling van het kantoor maken in tenant_demo, met de uitleg, Wie tekent met de naam van de klant, en de knoppen Maken, Annuleren en Maken en laten ondertekenen -->

1. Klik op **Voorstelling van het kantoor maken** of **Bemiddelingsfiche maken**. Er opent eerst een venster. Bij de analyse schuldsaldoverzekering staat dat onderaan het venster dat u al kent.
2. Onder *Wie tekent* staan de klanten die het document tekenen. Ontbreekt er iets bij iemand, zoals een gsm-nummer, dan staat dat naast zijn naam, en kunt u niet laten ondertekenen.
3. Klik op **Maken en laten ondertekenen**. Wilt u het document enkel afdrukken of mailen, klik dan op **Maken**.

Wie tekent:

- **De voorstelling van het kantoor**: alle aanvragers van het dossier.
- **De bemiddelingsfiche**: de aanvragers van die fiche. Bij meer dan twee aanvragers maakt CreditSoft een fiche per twee, en gaat elke fiche naar haar eigen aanvragers.
- **De analyse schuldsaldoverzekering**: de cliënt op het document, dat is de eerste aanvrager.

U, de makelaar, tekent niet digitaal: uw kantoor staat als uitgever op het document.

CreditSoft zet onder de kop *Handtekening* of *Handtekeningen* van het document per klant zijn naam en een kader. Daarin zet OKSign de handtekening. Uw sjabloon verandert daarvoor niet. Haalde u die kop uit uw sjabloon, dan komen de namen en de kaders achteraan in het document.

Elke klant krijgt een mail met zijn eigen link. Het document wordt pas bewaard als OKSign het aanvaardt. Weigert OKSign, of is de dienst niet bereikbaar, dan is er niets gemaakt of verstuurd, en zegt een melding in het blok waarom.

In de lijst van de gemaakte documenten staat dan de kolom **Ondertekening**:

- **Wacht op ondertekening**, bij meer klanten met hoeveel er al tekenden;
- **Ondertekend op** een datum, met **Getekende versie** om het getekende document te openen;
- **Ingetrokken op** een datum.

Onder de lijst staat elk document dat nog wacht, met bij elke klant **Link kopiëren** en **Opnieuw mailen**, en met **Intrekken…** voor het hele verzoek. Het getekende document komt bij de bijlagen van het dossier, in de categorie *Ondertekend*. Wie het verstuurde, krijgt een [taak](../journaal/taken.md) zodra iedereen tekende.

## Veelgemaakte fouten

!!! warning "Een stippellijn waar een gegeven hoort"
    Staat er een stippellijn in plaats van uw telefoonnummer, website of ondernemingsnummer, dan ontbreekt dat gegeven in de [Bedrijfsfiche](company-profile.md). Gaat het om een gegeven van de klant, zoals het geslacht of de burgerlijke staat, dan ontbreekt het op de fiche van die relatie. Vul het in en maak het document opnieuw.

!!! warning "Het document in de verkeerde taal"
    De taal volgt de documenttaal van de **eerste aanvrager**. Staat die verkeerd, pas ze dan aan op de fiche van die relatie en maak het document opnieuw.

!!! warning "Een document achteraf laten ondertekenen"
    Dat kan niet: u kiest het bij het maken. Wilt u een document dat al gemaakt is toch laten ondertekenen, maak het dan opnieuw met **Maken en laten ondertekenen**. Het eerste document blijft staan.

!!! warning "De knop Analyse schuldsaldoverzekering maken ontbreekt"
    Die knop verschijnt enkel als uw kantoor op de [Bedrijfsfiche](company-profile.md#verzekeringsmakelaar) als verzekeringsmakelaar staat.

## Zie ook

- [Bedrijfsfiche](company-profile.md)
- [Kredietdossiers](../credit-management/credit-files.md)
- [Advies](../credit-management/advice.md)
- [Digitaal ondertekenen (OKSign)](../credit-management/ondertekenen.md)
