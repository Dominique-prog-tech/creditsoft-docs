# Digitaal ondertekenen (OKSign)

Met OKSign laat u een klant een document digitaal ondertekenen, zonder papier. CreditSoft maakt het document,
stuurt elke ondertekenaar een eigen link en bewaart het getekende document daarna als bijlage. U gebruikt het
voor:

- het **opdrachtdocument**, op de fiche van een [kredietdossier](credit-files.md#ondertekenen): de aanvragers tekenen;
- de **privacyverklaring**, op de fiche van een [persoon](../crm/relations.md#tabblad-ondertekenen): die persoon tekent;
- de **precontractuele documenten** (de voorstelling van het kantoor, de bemiddelingsfiche en de analyse schuldsaldoverzekering): u kiest het
  bij het maken, op het tabblad *Advies* van het dossier. Zie [Maken en laten ondertekenen](../administration/precontractual-documents.md#ondertekenen).
  Ook dan komt het document uit uw sjabloon.

## Wat u vooraf nodig hebt

- **Een contract met OKSign.** Zonder contract staat op het tabblad *Ondertekenen*: "Uw kantoor heeft nog geen
  OKSign-contract." Neem daarvoor contact op met ADM-Concept.
- **De tekst van het document.** Uw kantoor schrijft die zelf, in het sjabloon van het opdrachtdocument of de
  privacyverklaring onder [Documenten voor de klant](../administration/precontractual-documents.md#opdracht-privacy),
  in het Nederlands en in het Frans. CreditSoft zet bij het versturen een handtekeningkader per ondertekenaar in het document.
- **Het land van uw kantoor** op de Bedrijfsfiche. CreditSoft heeft dat nodig om een gsm-nummer juist te lezen.
- **Per ondertekenaar een e-mailadres en een gsm-nummer.** De link komt per mail. Bij het tekenen stuurt OKSign
  een code per sms, dus een vast nummer werkt niet.

## Een document laten ondertekenen

1. Open het kredietdossier of de fiche van de persoon, en klik op het tabblad **Ondertekenen**.
2. Onder *Wie tekent* staan de ondertekenaars. Ontbreekt er iets bij iemand, dan staat dat naast zijn naam.
3. Klik op **Laten ondertekenen**. CreditSoft toont de namen en vraagt een bevestiging.
4. Bevestig met **Laten ondertekenen**. Elke ondertekenaar krijgt een mail met zijn eigen link.

Het document staat in de taal van de eerste ondertekenaar: de *documenttaal* op zijn fiche. Is die niet ingevuld,
dan geldt de taal van uw kantoor. Is de tekst in die taal niet ingevuld, dan kunt u niet versturen.

De tekenpagina van OKSign opent voor elke ondertekenaar in **zijn eigen documenttaal**. Zo tekent een Franstalige
partner op een Franse pagina, ook in een Nederlands dossier. Heeft iemand geen documenttaal, dan krijgt hij de taal van
het document.

Enkel wie de fiche mag bewerken, ziet de knop **Laten ondertekenen**. De privacyverklaring bestaat enkel voor een
persoon, niet voor een bedrijf, en pas nadat de fiche bewaard is.

## De stand van een verzoek

Onder de knop staat elk verzoek, met wanneer en door wie het verstuurd is:

- **Wacht op ondertekening**: nog niet iedereen tekende. Bij meer dan één ondertekenaar ziet u hoeveel er al
  tekenden.
- **Ondertekend**: het getekende document staat bij de [bijlagen](../journaal/bijlagen.md) van het dossier of van
  de relatie. Kort daarvoor kan er *Ondertekend, het document wordt opgehaald* staan.
- **Ingetrokken**: u trok het verzoek in. Niemand kan nog tekenen. U ziet wanneer en door wie.
- **Mislukt bij OKSign**.

CreditSoft vraagt de stand elk kwartier op, en telkens u het tabblad opent. Bij de privacyverklaring staat
bovenaan ook de datum waarop de persoon ze ondertekende.

Tekent iedereen, of weigert iemand te tekenen, dan krijgt wie het verzoek verstuurde een [taak](../journaal/taken.md)
voor die dag, op het dossier of de relatie. Ze telt mee bij wat u vandaag te doen hebt.

Bij een verzoek dat wacht, staan bij elke ondertekenaar twee knoppen:

- **Link kopiëren**: de persoonlijke link, om hem zelf door te geven. Geef hem enkel aan die ondertekenaar.
- **Opnieuw mailen**: dezelfde mail nog eens.

Staat er *(mail niet vertrokken)* naast een naam, dan kreeg die persoon geen mail. Kopieer dan de link.

## Een verzoek intrekken

Mag een verzoek dat wacht niet meer, bijvoorbeeld omdat het verkeerde document vertrok of de klant ervan afziet, dan
trekt u het in.

1. Klik naast het verzoek op **Intrekken…**.
2. CreditSoft toont wie er moest tekenen en vraagt een bevestiging. Bevestig met **Intrekken**.

Daarna kan niemand dit document nog tekenen, en het verzoek staat op *Ingetrokken*. Dat is niet terug te draaien: wilt
u toch laten tekenen, verstuur dan een nieuw verzoek.

- Is het document intussen **al getekend**, dan kan intrekken niet meer. CreditSoft toont dan de handtekening.
- Zegt CreditSoft dat **OKSign het verzoek nog verwerkt**, probeer het dan binnen een minuut opnieuw.
- Een ondertekenaar kan in OKSign **niet weigeren**: hij kan de pagina enkel sluiten. Laat uw klant weten dat hij niet
  wil tekenen, trek het verzoek dan in.

## Alle ondertekeningen op één plek { #overzicht }

Klik in de zijbalk onder **Krediet** op **Ondertekeningen**. Het getal ernaast zegt hoeveel verzoeken nog wachten. U ziet daar alles wat uw kantoor liet ondertekenen, over alle dossiers en relaties heen: het opdrachtdocument, de privacyverklaring en de precontractuele documenten.

- Per verzoek staan het document, voor welk dossier of welke relatie het is, wie tekent, de stand (bij meer ondertekenaars bijvoorbeeld *Wacht · 1 van 2 getekend*), wanneer en door wie het verstuurd werd, en hoeveel dagen het al wacht.
- Standaard ziet u enkel wat **wacht**, het oudste eerst. Vanaf **7 dagen** staat het aantal dagen in het rood.
- Kies **Alle verzoeken** om ook te zien wat getekend, geweigerd, mislukt of ingetrokken is.
- Filter op wie het verstuurde, om het werk van een afwezige collega over te nemen.
- Dubbelklik een rij: het dossier opent op het tabblad waar het verzoek staat, of de relatiefiche. Daar mailt u opnieuw of trekt u het verzoek in; in de lijst zelf kan dat niet.

Enkel wie dossiers mag bewerken, ziet dit scherm.

## Veelgemaakte fouten

!!! warning "Opnieuw versturen trekt het eerste verzoek niet in"
    Verstuurt u opnieuw, dan komt er een tweede verzoek bij, en het eerste blijft bestaan. Het bevestigingsvenster
    waarschuwt u daarvoor. Mag het eerste niet meer, [trek het dan in](#een-verzoek-intrekken).

!!! warning "Geen gsm-nummer"
    Zonder gsm-nummer, of met een vast nummer, kan die persoon niet tekenen. Vul het nummer in op zijn fiche en
    open het tabblad opnieuw.

!!! note "Een kantoor met een beperkt account"
    Is het account van uw kantoor beperkt, dan kunt u niets nieuws laten ondertekenen. Een document dat al
    verstuurd was en getekend terugkomt, komt wel binnen. Een verzoek intrekken kan ook, behalve als het account enkel
    nog lezen toelaat.

## Zie ook

- [Kredietdossiers](credit-files.md)
- [Relaties](../crm/relations.md)
- [Bedrijfsfiche](../administration/company-profile.md)
- [Bijlagen](../journaal/bijlagen.md)
