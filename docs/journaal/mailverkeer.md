# Mailverkeer

Onder **Mailverkeer** staat de correspondentie over deze fiche: wat er vanuit CreditSoft vertrokken is (wie wat
wanneer gekregen heeft, en of het aangekomen is) en de mails die u zelf uit Outlook toevoegt. U kunt er ook meteen
een nieuw bericht opstellen.

![Het onderdeel Mailverkeer met twee uitgaande berichten, elk met het label Uitgaand, de afleverstatus, de afzender, de bestemmeling en het begin van de tekst.](../images/journaal-mailverkeer.png "Mailverkeer bij een relatie")

## Een bericht versturen

Klik **Nieuwe mail**. In het venster dat opent:

- **Aan** — het e-mailadres van de bestemmeling. Verplicht.
- **Cc** — wie een kopie krijgt. Meerdere adressen scheidt u met een komma.
- **Verzendadres** — vanaf welk adres het vertrekt. Laat u dit leeg, dan gebruikt CreditSoft het standaard
  adres. Welke adressen hier in de keuzelijst staan, beheert u bij
  [Verzendadressen](../administration/sender-addresses.md).
- **Onderwerp** — verplicht.
- **Bericht** — de tekst zelf.
- **Bijlagen** — u kiest met een vinkje uit de [bijlagen](bijlagen.md) van deze fiche, en u kunt daarnaast nog
  losse bestanden toevoegen die niet in het dossier hoeven te blijven.

CreditSoft vraagt een bevestiging vóór het bericht vertrekt, met het adres erbij. Daarna is het weg — een mail
komt niet terug.

## Een groepsmail

Met een groepsmail schrijft u in één keer een groep klanten aan — het kantoor sluit, er komt een nieuwe werkwijze,
de voorwaarden wijzigen. U vertrekt van een lijst: vink in [Kredietdossiers](../credit-management/credit-files.md#een-groepsmail-sturen)
[Relaties](../crm/relations.md#een-groepsmail-sturen) of [Aanbrengers](../crm/contributors.md#een-groepsmail-sturen) de rijen aan en klik **Groepsmail…** in de band boven de lijst.
Daarvoor hebt u het recht **Groepsmail versturen** nodig.

![Het venster Groepsmail vanaf Relaties met drie aangevinkte relaties: bovenaan 2 ontvangers en 1 overgeslagen met de reden geen groepsmail, daaronder de opengeklapte lijst met per relatie de naam, het mailadres en de reden, dan Tekst op Vrije tekst, de Afzender, het Onderwerp en het Bericht met de variabele voor de aanhef, en onderaan het voorbeeld voor de eerste ontvanger met de aanhef ingevuld en de afmeldlink.](../images/groepsmail-venster.png "Een groepsmail: eerst wie ze krijgt, dan de tekst en het voorbeeld"){ .volle-breedte }

**Elke ontvanger krijgt zijn eigen mail.** Niemand ziet het adres van een ander, en variabelen zoals
`{{recipient.greeting}}` of `{{file.number}}` worden per ontvanger ingevuld. Bij een kredietdossier krijgt elke
aanvrager met een mailadres een mail; staan twee aanvragers op hetzelfde adres, dan gaat er één.

Het venster toont eerst **wie de mail krijgt en wie niet**, met de reden:

- **geen mailadres** of een **ongeldig adres** — ook als op de fiche *E-mail ongeldig* aangevinkt staat;
- **geen groepsmail** — de relatie meldde zich af, of iemand vinkte *Geen groepsmail* aan op haar fiche;
- **dubbel adres** — dat adres krijgt de mail al via een andere rij;
- **verwijderd** — de fiche staat intussen in de prullenbak.

Daarna kiest u de **tekst**:

- een **sjabloon** — het algemene bericht of een eigen tekst uit [Mailsjablonen](../administration/mail-templates.md).
  Elke ontvanger krijgt het in zijn eigen documenttaal, Nederlands of Frans.
- een **vrije tekst** — u typt onderwerp en bericht zelf. Die gaat in uw eigen taal naar iedereen, ook de aanhef.

**Voorbeeld** toont de mail zoals de eerste ontvanger haar krijgt. **Versturen** vraagt een bevestiging met het
aantal mails. Onderaan elke groepsmail staat een **afmeldlink**: wie erop klikt en bevestigt, krijgt geen
groepsmails meer. Gewone mails over het eigen dossier blijven wel komen.

Elke mail staat daarna in het mailverkeer van haar dossier, relatie of aanbrenger. Het venster toont hoeveel er vertrokken,
hoeveel er overgeslagen werden en, als de mailserver er een weigerde, welke en waarom.

## Een mail uit Outlook toevoegen

Een mail die u in Outlook ontving of verstuurde, bewaart u bij de fiche met **Mail toevoegen**. Ze staat daarna in
de lijst zoals elke andere mail: u kunt ze openen, beantwoorden, doorsturen en verwijderen.

<!-- Na de proef op een Windows-pc met Outlook (25/11/2026, beslissing 1 in adm-creditsoft/docs/mail-toevoegen-structuuroverzicht.md):
     lukt rechtstreeks slepen uit Outlook naar het venster, dan wordt stap 1 overbodig en past de tekst in de zone mee aan. -->
1. Bewaar de mail als bestand. In Outlook sleept u ze daarvoor naar uw bureaublad of naar een map. U krijgt een
   bestand met de extensie `.msg`; een ander mailprogramma geeft een `.eml`.
2. Klik **Mail toevoegen**.
3. Sleep een of meer bestanden in het venster, of klik in het vak om ze te kiezen. Tot 20 bestanden tegelijk,
   elk hoogstens 25 MB.

<!-- AFBEELDING: het venster "Een mail uit Outlook toevoegen" na het neerzetten van vier bestanden, met per bestand de uitkomst
     (toegevoegd, stond er al, geen leesbare mail); tenant_demo, een dossier met Mailverkeer, recht Mail versturen aan.
     Bestandsnaam journaal-mail-toevoegen.png / -fr.png. -->

Het venster toont per bestand wat er gebeurde:

- **toegevoegd** — de mail staat in de lijst.
- **stond er al, niet opnieuw toegevoegd** — dezelfde mail (zelfde verzendmoment, afzender en onderwerp) staat al
  bij deze fiche.
- **geen leesbare mail** — het bestand is geen mail of is beschadigd. Een brief in pdf hoort bij
  [Bijlagen](bijlagen.md).
- **te groot** — het bestand is groter dan 25 MB.
- **niet gelukt, probeer het opnieuw**.

CreditSoft haalt de afzender, de ontvangers, de datum, het onderwerp, de tekst en de bijlagen uit de mail zelf.
Komt de mail van een adres van uw kantoor, dan staat ze als **Uitgaand** in de lijst; anders als **Inkomend**. Een
adres van uw kantoor is het adres op de [bedrijfsfiche](../administration/company-profile.md), uw eigen adres, een
[verzendadres](../administration/sender-addresses.md), of een ander adres op het domein van een verzendadres.

De knop staat er voor wie het recht **Mail versturen** heeft. Het [Actielogboek](../administration/activity-log.md)
noteert wie welke mail toevoegde.

## Wat u in de lijst ziet

Elk bericht toont een label **Uitgaand** of **Inkomend**, het onderwerp, en daaronder de **afzender** en de
**bestemmeling**. Berichten zonder onderwerp krijgen een vervangende tekst, zodat er altijd iets aanklikbaars
staat.

!!! note "Binnenkomende mail haalt CreditSoft niet op"
    CreditSoft registreert wat het zelf verstuurt. Binnenkomende mail wordt niet opgehaald uit uw mailbox: die
    blijft staan waar ze staat. Een ontvangen mail bewaart u bij de fiche met
    [Mail toevoegen](#een-mail-uit-outlook-toevoegen).

## Een bericht openen

**Klik het bericht aan** om het volledig te lezen: afzender, bestemmelingen, de status van de aflevering en de
tekst zoals ze verstuurd is. In dat venster staan deze knoppen:

- **Afdrukken** — maakt een PDF van het bericht.
- **Beantwoorden** — opent een nieuw bericht aan de afzender (bij een binnengekomen mail) of aan de bestemmeling (bij een verstuurde mail), met *Re:* voor het onderwerp en de oorspronkelijke tekst als citaat eronder. U schrijft erboven.
- **Doorsturen** — opent een nieuw bericht met *Fwd:* voor het onderwerp en de kop en tekst van de oorspronkelijke mail; u vult zelf de bestemmeling in. De bijlagen gaan enkel mee bij een mail die als bestand bewaard is (zie hieronder): van een mail die CreditSoft verstuurde, worden de bijlagen niet bewaard, en het venster zegt dat.
- **Verwijderen** — haalt het uit de lijst; het gaat naar de [Prullenbak](../administration/recycle-bin.md). Het [Actielogboek](../administration/activity-log.md) noteert wie de mail verwijderde, met haar onderwerp en datum.
- **Sluiten**.

### Een mail die als bestand bewaard is

Sommige mails staan in de lijst met hun afzender, onderwerp en datum, terwijl de mail zelf als bestand in het
archief van uw kantoor bewaard is. Zo staat ook elke mail die u met **Mail toevoegen** bewaarde. Opent u zo'n mail,
dan haalt CreditSoft ze daaruit. Het venster zegt kort dat
de mail geladen wordt, en toont dan de afzender, de ontvangers, de datum, de tekst en de bijlagen, zoals bij een
mail in [Bijlagen](bijlagen.md#een-bijlage-openen). Een bijlage van zo'n mail downloadt u met een klik.

Staat het bestand niet in het archief, of is het geen leesbare mail, dan zegt het venster dat. De mail blijft wel
in de lijst staan, met haar afzender, onderwerp en datum.

## De status van een bericht

Een mail is niet aangekomen omdat hij verstuurd is. Naast een bericht staat daarom een **status**, en een
knopje om die te **vernieuwen** wanneer u wil weten hoe het er nú voor staat.

Drie statussen zeggen dat een bericht **niet vertrokken** is, al staat het wel in de lijst:

- **Proefversie — niet verstuurd** — u werkt in een proefomgeving; daar gaat geen e-mail naar buiten.
- **Nog niet vrijgegeven — niet verstuurd** — de e-mail van uw kantoor is nog niet vrijgegeven. Het bericht staat klaar,
  maar de bestemmeling ontving het niet.
- **Tegengehouden — niet verstuurd** — het verzendplatform hield het bericht tegen.

Het scherm zegt het ook meteen bij het versturen: er staat dan *staat klaar* in plaats van *verstuurd*.

Wilt u het overzicht over alle berichten heen in plaats van per fiche, dan gebruikt u
[Mailmonitoring](../administration/mail-monitoring.md) in het Platformbeheer.

## Zoeken en exporteren

Het **zoekveld** filtert de lijst terwijl u typt. Met de knop ernaast exporteert u naar **Excel** of **CSV**.
