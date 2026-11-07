# Een loonfiche laten lezen door AI

Een aanvrager stuurt zijn loonfiches, en u neemt de gegevens over in zijn dossier. CreditSoft kan zo'n loonfiche laten lezen door AI: u krijgt een voorstel met de werkgever, de datum van indiensttreding, de functie, het type contract, het netto en de premies. U kijkt elk veld na en kiest zelf wat u overneemt. Zonder uw klik op **Overnemen** wordt er niets bewaard.

## Wat er nodig is

- **Uw kantoor zet het lezen door AI aan in ADM One.** Klik onderaan het menu op **Klantenportaal** en open de tegel **AI-sleutel**. Daar staan drie dingen:
    1. de **sleutel** van het AI-abonnement van uw kantoor. Het lezen gebeurt op dat abonnement;
    2. het vinkje **Documentanalyse**;
    3. het vinkje **Scans, foto's en pdf's**. Dat is nodig voor elke loonfiche, want een loonfiche is altijd een bestand.

    Elk blok heeft zijn eigen knop **Bewaren**. Dit doet wie in ADM One toegang heeft tot het portaal van uw kantoor.
- **U mag het dossier bewerken**, en voor de tewerkstelling ook de relatie. Velden die u niet mag wijzigen, ziet u wel, maar u kan ze niet aanvinken.

Ontbreekt er iets, dan staat er onder de bestanden een grijze regel die zegt wat er ontbreekt, bijvoorbeeld *Lezen door AI: uw kantoor heeft in ADM One nog geen AI-sleutel ingesteld.* De knop verschijnt dan niet.

## Een loonfiche laten lezen

De knop **Lezen als loonfiche** staat naast elk aangeleverd bestand, op drie plaatsen:

- in [Te valideren documenten](document-validation.md), in het paneel van een stuk;
- in een [kredietdossier](credit-files.md), op het tabblad **Gevraagd**: dubbelklik een stuk;
- op de relatiefiche, bij de gevraagde documenten van de relatie.

Klik op **Lezen als loonfiche** naast het bestand dat u wilt laten lezen. Na enkele seconden verschijnt onder de bestanden het blok **Voorstel uit dit bestand**.

<!-- AFBEELDING: het paneel van een stuk "3 Laatste loonfiches" in Te valideren documenten, met naast elk bestand de knop Lezen als loonfiche (een pdf, een scan en een foto). Uit tenant_demo, als beheerder, met de AI-sleutel en beide vinkjes aan in ADM One. -->

Een pdf, een scan of een foto lukt allemaal: JPEG, PNG of WebP. Een bestand mag hoogstens 20 MB groot zijn (pdf) of 7,5 MB (foto).

## Het voorstel nakijken

<!-- AFBEELDING: het blok Voorstel uit dit bestand bij een pdf met drie loonbrieven: Voor wie met de gevonden aanvrager, Maand op de jongste maand, de tewerkstelling met vier aangevinkte velden, en de inkomsten met het netto op "kies" en de maaltijdcheques op "= komt overeen". Uit tenant_demo. -->

### Voor wie

Bij een stuk in een dossier zoekt CreditSoft de aanvrager op wie de loonfiche gaat: eerst op het rijksregisternummer, anders op naam en voornaam. Naast de naam staat hoe hij gevonden werd. Vindt CreditSoft niemand, of meer dan één aanvrager, dan kiest u zelf.

Het rijksregisternummer op de loonfiche dient enkel om de juiste persoon te vinden. Het wordt nooit overgenomen. Wijkt het af van het nummer op de fiche van de aanvrager, dan ziet u een waarschuwing: kijk dan na of het de juiste persoon is.

### Maand

Staan er meerdere loonbrieven in één bestand, dan kiest u bij **Maand** welke maand telt. De jongste staat standaard gekozen. De AI rekent niets uit: geen gemiddelde over de maanden, en geen aantal maaltijdcheques maal hun waarde.

### De velden

Per veld ziet u drie kolommen: **Nu in CreditSoft**, **Gelezen** en **Overnemen**.

| Deel | Velden | Komt terecht op |
|---|---|---|
| **Tewerkstelling (op de relatie)** | Werkgever, In dienst sinds, Functie, Type contract | de relatiefiche van de aanvrager |
| **Inkomsten (van deze aanvrager in dit dossier)** | Netto maandinkomen, Maaltijdcheques (per maand), Vakantiegeld, Eindejaarspremie (per jaar) | de inkomstenregels van de aanvrager in dit dossier |

Standaard staat aangevinkt:

- een veld dat in CreditSoft nog **leeg** is;
- een inkomen waarvan de aanvrager nog **geen regel** heeft.

Een veld met een **andere waarde** dan wat er al staat, is nooit aangevinkt. Dat beslist u.

Staat er **= komt overeen**, dan is er niets te doen.

Staat er **kies**, dan heeft de aanvrager al een inkomstenregel van dat soort, met een ander bedrag. U kiest:

- **Niets doen**: de regel blijft zoals hij is;
- **Nieuwe regel toevoegen**: naast de bestaande regel;
- **Bijwerken**: de gekozen regel krijgt het nieuwe bedrag. Werkgever, periode en opmerkingen van die regel blijven staan.

Het **type contract** wordt enkel ingevuld als de tekst op de loonfiche precies voorkomt in uw keuzelijst van contracttypes. Hoofdletters en accenten tellen daarbij niet. Staat het er niet in, dan ziet u een melding met de tekst van de loonfiche, en blijft het type contract zoals het is.

Maaltijdcheques komen enkel in het voorstel als er een **bedrag** op de loonfiche staat.

Opent u het stuk vanuit de **relatiefiche**, dan stelt het blok enkel de tewerkstelling voor. De inkomsten staan per dossier: open het stuk vanuit het dossier om ze voor te stellen.

## Overnemen

Klik op **Overnemen**. CreditSoft bewaart de aangevinkte velden, en de fiche eronder toont ze meteen. In het blok staat daarna wat er overgenomen werd, en alle velden staan op **= komt overeen**.

Is er niets aangevinkt, dan is de knop grijs en staat er *Vink aan wat u wilt overnemen.*

Wijzigde iemand anders een veld nadat u het bestand liet lezen, dan wordt dat veld **niet** overschreven. U ziet bijvoorbeeld *Werkgever: intussen gewijzigd op de fiche; niet overgenomen.* Laat het bestand opnieuw lezen als u het toch wilt overnemen.

<!-- AFBEELDING: hetzelfde blok na Overnemen: alle velden op "= komt overeen" en de groene regel "Overgenomen: Werkgever, In dienst sinds, Functie, Type contract, Netto maandinkomen (bijgewerkt)." Uit tenant_demo. -->

## Wat het blok kan melden

| Melding | Wat het betekent | Wat u doet |
|---|---|---|
| *Dit lijkt geen loonfiche: er werd niets uit gelezen.* | De AI herkende in het bestand geen loonfiche, bijvoorbeeld een rekeninguittreksel | Niets: er werd niets gewijzigd |
| *Er werd niets herkend in dit bestand.* | Het bestand werd gelezen, maar er stond niets bruikbaars in | Kijk het bestand zelf na |
| *Op de loonfiche van … staat ook vakantiegeld of een eindejaarspremie.* | Het netto van die maand bevat die premie en is hoger dan een gewoon maandloon. Het netto staat daarom niet aangevinkt | Kies bij voorkeur een andere maand |
| *Dit soort bestand kan niet gelezen worden.* | Het bestand is geen pdf, JPEG, PNG of WebP. Een iPhone-foto in HEIC hoort hierbij | Bewaar de foto als JPEG en lever ze opnieuw aan |
| *Dit bestand kan niet geopend worden.* | Bijvoorbeeld een pdf met een wachtwoord, of een leeg bestand | Vraag een bestand zonder wachtwoord |
| *Dit bestand is te groot om te laten lezen.* | Groter dan 20 MB (pdf) of 7,5 MB (foto), of een document met heel veel pagina's | Vraag een kleiner bestand, bijvoorbeeld per maand |
| *Te veel aanvragen op korte tijd, of het dagplafond van uw kantoor is (bijna) bereikt.* | Uw kantoor stelde in ADM One een dagelijkse grens in, of er werd veel na elkaar gelezen | Probeer later opnieuw |
| *De AI-dienst is even niet bereikbaar, of las het document niet.* | Een storing bij de AI-dienst | Klik op **Opnieuw proberen** |

## Wat er met de gegevens gebeurt

- CreditSoft en ADM One draaien op servers in de Europese Unie.
- Het bestand gaat via ADM One naar de AI-leverancier van de sleutel van uw kantoor, om het te laten lezen. ADM One bewaart de inhoud niet.
- **Het lezen zelf gebeurt buiten de Europese Unie.** Vandaag is de leverancier Anthropic. Die verwerkt het bestand buiten de EU, onder de standaardcontractbepalingen van de Europese Commissie. Anthropic gebruikt het niet om modellen te trainen en verwijdert het binnen 30 dagen. Een bestand dat als mogelijke overtreding van haar gebruiksbeleid gemarkeerd wordt, kan tot 2 jaar bewaard worden.
- **Uw kantoor kiest zelf** of het dit aanzet. Zonder de vinkjes in ADM One wordt er niets gelezen. Een loonfiche bevat een rijksregisternummer en loongegevens: overweeg als kantoor een gegevensbeschermingseffectbeoordeling (DPIA) vóór u het aanzet.
- Het voorstel wordt niet bewaard. Sluit u het blok, of opent u een ander stuk, dan is het weg.
- In het **actielogboek** staat dat er een bestand gelezen werd, en welke velden u overnam. De waarden zelf staan er nooit in.
- Het lezen gebeurt op het AI-abonnement van uw kantoor, per gelezen bestand. In ADM One stelt u onder **AI-sleutel** een dagelijkse grens in.

## Veelgemaakte fouten

!!! warning "Het netto van een maand met vakantiegeld of een eindejaarspremie"
    Het netto te betalen van zo'n maand bevat de premie. Neem het niet over als maandinkomen: kies een andere maand, of vul het netto zelf in.

!!! warning "Bijwerken bij een andere werkgever"
    **Bijwerken** wijzigt enkel het bedrag van de gekozen regel. De werkgever van die regel blijft staan. Werkt de aanvrager intussen ergens anders, kies dan **Nieuwe regel toevoegen**.

!!! tip "Een foto van een iPhone"
    Een iPhone bewaart foto's soms als HEIC. Die worden niet gelezen. Vraag uw klant de foto als JPEG te sturen, of zet de camera van de iPhone op *Meest compatibel*.

## Zie ook

- [Te valideren documenten](document-validation.md)
- [Kredietdossiers](credit-files.md)
