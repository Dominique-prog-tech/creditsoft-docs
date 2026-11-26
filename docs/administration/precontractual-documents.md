# Precontractuele documenten

Vóór u een krediet bemiddelt, geeft u de klant een aantal documenten. CreditSoft maakt de **voorstelling van het kantoor** voor u: het document met de identiteit van uw kantoor, uw inschrijving bij de FSMA, de klachtenbehandeling, de commissie en de uitsluiting van buitencontractuele aansprakelijkheid. Het vertrekt van het standaardmodel van FVF, in het Nederlands en het Frans, en vult de gegevens van uw kantoor in vanuit de [Bedrijfsfiche](company-profile.md).

Op deze pagina leest u hoe u het document aanpast aan uw kantoor, en hoe u het maakt voor een dossier.

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

Vul bovenaan bij **Opmerking bij deze versie** kort in wat u veranderde, en klik op **Bewaren als nieuwe versie**. Vanaf dan gebruikt CreditSoft die versie voor elk nieuw document in die taal.

!!! info "Verantwoordelijk voor de tekst"
    Het model van FVF is een standaardtekst voor kredietmakelaars. Past u de tekst aan, dan blijft die tekst die van uw kantoor: CreditSoft kijkt niet na of hij aan de wet voldoet.

## Het document maken voor een dossier { #maken }

Open het dossier en klik op het tabblad **Advies**. Onder de samenvatting van het advies staat het blok **Precontractuele documenten**.

<!-- AFBEELDING: het tabblad Advies van een dossier in tenant_demo, met onderaan het blok Precontractuele documenten, de knop Voorstelling van het kantoor maken en één gemaakt document in de lijst -->

1. Klik op **Voorstelling van het kantoor maken**.
2. CreditSoft maakt het document in de taal van de **eerste aanvrager** van het dossier, met de huidige versie van uw sjabloon.
3. Het document verschijnt in de lijst met de datum en wie het maakte. Klik op **Openen** om het te bekijken.

Het document wordt bewaard bij de bijlagen van het dossier, in de categorie *Precontractueel*. U vindt het ook terug in het journaal van het dossier, onder *Bijlagen*.

Een gemaakt document verandert niet meer. Past u daarna de Bedrijfsfiche of het sjabloon aan, dan maakt u het document opnieuw. Er komt dan een tweede document bij; het eerste blijft staan, zodat u altijd kunt tonen wat de klant kreeg.

U hebt het recht nodig om het dossier te wijzigen. Het blok staat niet in het portaal van de aanbrengers.

## Veelgemaakte fouten

!!! warning "Een stippellijn waar een gegeven hoort"
    Staat er een stippellijn in plaats van uw telefoonnummer, website of ondernemingsnummer, dan ontbreekt dat gegeven in de [Bedrijfsfiche](company-profile.md). Vul het daar in en maak het document opnieuw.

!!! warning "Het document in de verkeerde taal"
    De taal volgt de documenttaal van de **eerste aanvrager**. Staat die verkeerd, pas ze dan aan op de fiche van die relatie en maak het document opnieuw.

## Zie ook

- [Bedrijfsfiche](company-profile.md)
- [Kredietdossiers](../credit-management/credit-files.md)
- [Advies](../credit-management/advice.md)
