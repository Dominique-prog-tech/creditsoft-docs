# Mails per moment

Op dit scherm bepaalt u welke mail uw klant krijgt wanneer een **contract** of het **dossier** een bepaalde status krijgt — bijvoorbeeld een bericht dat zijn aanvraag ingediend is, of dat het aanbod beschikbaar is.

![Het scherm Mails per moment: een lijst met per moment de kolommen Wanneer, Status, Tekst en Hoe, met bijvoorbeeld Een contract krijgt de status Ingediend, op Voorstellen.](../images/mail-momenten.png "De mails per moment van uw kantoor")

## Het scherm openen

Klik in de zijbalk op **Platformbeheer** en daarna op de tegel **Mails per moment** (onder *Communicatie*).

## Een moment instellen

Met **Nieuw moment** — of een dubbelklik op een bestaand moment — opent het venster.

![Het venster Moment wijzigen: de velden Wanneer (Een contract krijgt de status), Status (Aanbod getekend) en Tekst, met de link Tekst aanpassen, en daaronder de keuze Hoe: Voorstellen of Automatisch.](../images/mail-momenten-venster.png "Wanneer, welke tekst en hoe")

| Veld | Waarvoor |
|---|---|
| **Wanneer** | *Een contract krijgt de status* of *Het dossier krijgt de status*. Werkt uw kantoor met contractstatussen, dan kiest u de eerste. |
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

!!! tip "Variabelen voor deze teksten"
    In de tekst kan u onder meer `{{client.firstnames}}` (de voornamen van de klanten), `{{file.institution}}` (de kredietinstelling — bij een contractmoment die van het contract), `{{file.amount}}`, `{{file.number}}` en `{{moment.status}}` (de status die de mail deed vertrekken) gebruiken.
