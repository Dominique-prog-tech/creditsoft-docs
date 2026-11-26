# Precontractuele documenten

Vóór u een krediet bemiddelt, geeft u de klant een aantal documenten. CreditSoft maakt er twee voor u, telkens vertrekkend van het standaardmodel van FVF, in het Nederlands en het Frans:

- de **voorstelling van het kantoor**: de identiteit van uw kantoor, uw inschrijving bij de FSMA, de klachtenbehandeling, de commissie en de uitsluiting van buitencontractuele aansprakelijkheid;
- de **bemiddelingsfiche hypothecair krediet**: de gegevens van de aanvragers, de analyse van hun situatie (Deel I), uw aanbeveling (Deel II) en de bijlagen (Deel III).

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

## Het document maken voor een dossier { #maken }

Open het dossier en klik op het tabblad **Advies**. Onder de samenvatting van het advies staat het blok **Precontractuele documenten**.

<!-- AFBEELDING: het tabblad Advies van een dossier in tenant_demo, met onderaan het blok Precontractuele documenten, de knoppen Voorstelling van het kantoor maken en Bemiddelingsfiche maken, en twee gemaakte documenten in de lijst -->

1. Klik op **Voorstelling van het kantoor maken** of **Bemiddelingsfiche maken**.
2. CreditSoft maakt het document in de taal van de **eerste aanvrager** van het dossier, met de huidige versie van uw sjabloon.
3. Het document verschijnt in de lijst met de datum en wie het maakte. Klik op **Openen** om het te bekijken.

Het document wordt bewaard bij de bijlagen van het dossier, in de categorie *Precontractueel*. U vindt het ook terug in het journaal van het dossier, onder *Bijlagen*.

Een gemaakt document verandert niet meer. Past u daarna de Bedrijfsfiche, het dossier of het sjabloon aan, dan maakt u het document opnieuw. Er komt dan een tweede document bij; het eerste blijft staan, zodat u altijd kunt tonen wat de klant kreeg.

U hebt het recht nodig om het dossier te wijzigen. Het blok staat niet in het portaal van de aanbrengers.

## Veelgemaakte fouten

!!! warning "Een stippellijn waar een gegeven hoort"
    Staat er een stippellijn in plaats van uw telefoonnummer, website of ondernemingsnummer, dan ontbreekt dat gegeven in de [Bedrijfsfiche](company-profile.md). Gaat het om een gegeven van de klant, zoals het geslacht of de burgerlijke staat, dan ontbreekt het op de fiche van die relatie. Vul het in en maak het document opnieuw.

!!! warning "Het document in de verkeerde taal"
    De taal volgt de documenttaal van de **eerste aanvrager**. Staat die verkeerd, pas ze dan aan op de fiche van die relatie en maak het document opnieuw.

## Zie ook

- [Bedrijfsfiche](company-profile.md)
- [Kredietdossiers](../credit-management/credit-files.md)
- [Advies](../credit-management/advice.md)
