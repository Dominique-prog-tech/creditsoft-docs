# Mails per moment

Op dit scherm bepaalt u welke mail uw klant krijgt wanneer een **contract** of het **dossier** een bepaalde status krijgt — bijvoorbeeld een bericht dat zijn aanvraag ingediend is, of dat het aanbod beschikbaar is — of wanneer een **uiterste datum** nadert.

![Het scherm Mails per moment: een lijst met per moment de kolommen Wanneer, Status, Tekst en Hoe, met bijvoorbeeld Een contract krijgt de status Ingediend, op Voorstellen.](../images/mail-momenten.png "De mails per moment van uw kantoor")

## Het scherm openen

Klik in de zijbalk op **Platformbeheer** en daarna op de tegel **Mails per moment** (onder *Communicatie*).

## Een moment instellen

Met **Nieuw moment** — of een dubbelklik op een bestaand moment — opent het venster.

![Het venster Moment wijzigen: de velden Wanneer (Een contract krijgt de status), Status (Aanbod getekend) en Tekst, met de link Tekst aanpassen, en daaronder de keuze Hoe: Voorstellen of Automatisch.](../images/mail-momenten-venster.png "Wanneer, welke tekst en hoe")

| Veld | Waarvoor |
|---|---|
| **Wanneer** | *Een contract krijgt de status* of *Het dossier krijgt de status* — werkt uw kantoor met contractstatussen, dan kiest u de eerste. Of *De uiterste datum van het aanbod nadert* of *… van de akte nadert*: zie [Bij een uiterste datum](#bij-een-uiterste-datum). |
| **Status** | De status waarbij de mail vertrekt. |
| **Tekst** | De mail zelf. Met *Nieuwe tekst* krijgt u een standaardtekst; met **Tekst aanpassen** past u die aan bij [Mailsjablonen](../administration/mail-templates.md). |
| **Hoe** | **Voorstellen**: na *Bewaren* opent de mail, ingevuld, en u verstuurt ze zelf. **Automatisch**: de mail vertrekt meteen. |

**Voorstellen** is de veilige keuze: u ziet de mail eerst. Bij **Automatisch** vertrekt ze bij het bewaren, ook als u de status per vergissing aanklikte.

## Wat er gebeurt bij het bewaren

Bewaart u een contract of dossier en krijgt het daarbij een status waarvoor een moment bestaat, dan:

- gaat de mail naar **de aanvragers met een mailadres**;
- vertrekt ze **hoogstens één keer** per contract of dossier — zet u de status terug en daarna opnieuw, dan volgt er geen tweede;
- staat ze daarna bij het **mailverkeer** van het dossier.

Een dossier bewaren zonder zijn status te wijzigen, stuurt niets. Bij *Voorstellen* telt de mail pas als verstuurd wanneer u ze ook verstuurt: sluit u het venster, dan stelt een volgende wissel ze opnieuw voor.

## Bij een uiterste datum

Kiest u bij **Wanneer** *De uiterste datum van het aanbod nadert* of *De uiterste datum van de akte nadert*, dan vult u in hoeveel **dagen vooraf** de mail vertrekt (standaard 7). Het gaat om de velden *Uiterste datum aanbod* en *Uiterste datum akte* van het dossier.

![Het venster Moment wijzigen voor een uiterste datum: Wanneer staat op De uiterste datum van het aanbod nadert, met daarnaast Dagen vooraf 7; bij Hoe staat dat de mail automatisch vertrekt, elke ochtend om 6 uur.](../images/mail-momenten-termijn.png "Een mail enkele dagen vóór de uiterste datum")

Zo'n mail vertrekt altijd **automatisch**, elke ochtend om 6 uur:

- enkel bij een **lopend** dossier, en zolang de datum niet verstreken is;
- niet meer als de stap al gezet is: bij het aanbod als het getekend is (ondertekeningsdatum, *Getekend aanbod verzonden*, of de akte is verleden), bij de akte als die verleden is;
- **één keer per datum**: wordt de uiterste datum verlengd, dan volgt er voor de nieuwe datum één nieuwe mail.

!!! tip "Variabelen voor deze teksten"
    In de tekst kan u onder meer `{{client.firstnames}}` (de voornamen van de klanten), `{{file.institution}}` (de kredietinstelling — bij een contractmoment die van het contract), `{{file.amount}}`, `{{file.number}}`, `{{moment.status}}` (de status die de mail deed vertrekken) en `{{moment.termijn}}` (de uiterste datum, bij een termijn) gebruiken.
