# Beheersignalen

Een krediet dat geakteerd is, vraagt later nog aandacht: een renteherziening die eraan komt, de verjaardag van de akte, een dossier dat u wou herbekijken. Op dit scherm bepaalt u voor welke van die gelegenheden CreditSoft **zelf een taak maakt** voor de eigenaar van het dossier. Dat gebeurt elke ochtend om 6 uur, één keer per gelegenheid.

![Het scherm Beheersignalen: bovenaan de kaart Wat de ronde vandaag zou doen met drie regels, het aantal nieuwe taken voor een renteherziening, de jaarlijkse checks van vandaag en de akten die de komende 30 dagen verjaren, en het aantal dossiers om te herbekijken. Daaronder een kaart per signaal met een vinkje Aan en de stand: Renteherziening nadert met het veld Hoeveel dagen vooraf, Jaarlijkse check en Herbekijken op. Onderaan de keuze van de verantwoordelijke bij een dossier zonder eigenaar.](../images/beheersignalen.png "Welke signalen een taak worden, en wat dat vandaag zou geven"){ .volle-breedte }

## Het scherm openen

Klik links onderaan op **Platformbeheer** en dan op de tegel **Beheersignalen**, in de groep *Dashboard*. U ziet de tegel als u ook de [Dashboard-fases](dashboard-fases.md) mag beheren.

## Wat de ronde vandaag zou doen

De kaart bovenaan rekent uit wat de ronde van vandaag zou opleveren:

- hoeveel **nieuwe taken voor een renteherziening**;
- hoeveel **jaarlijkse checks** er vandaag zijn, en hoeveel akten de komende 30 dagen verjaren;
- hoeveel dossiers er **te herbekijken** zijn.

Het is een berekening: er wordt niets aangemaakt. Ook een signaal dat uit staat, telt mee, zodat u ziet wat het zou geven voor u het aanzet.

Staat er een gele melding onder, dan zijn er signalen zonder eigenaar met een account en zonder standaardverantwoordelijke. Die worden geen taak. Hoe u dat oplost, leest u bij [Wie de taak krijgt](#wie-de-taak-krijgt).

## De drie signalen

Elk signaal heeft een vinkje **Aan**. Daaronder staat de stand:

- *Aan vanaf de eerste ronde (standaard)*: u raakte het vinkje nooit aan, en het signaal staat standaard aan.
- *Aan sinds* een datum: vanaf die dag. Wat vóór die dag viel, krijgt geen taak.
- *Uit*.

Zet u een signaal aan, dan geldt het **vanaf vandaag**. Een renteherziening of een verjaardag die al voorbij is, krijgt achteraf geen taak.

### Renteherziening nadert

Een taak een aantal dagen vóór de volgende **renteherziening** van een contract met een variabele rentevoet. Het is dezelfde herziening die het blok [Opvolging van lopende kredieten](../getting-started/dashboard.md#opvolging-van-lopende-kredieten) op het dashboard toont, dus enkel voor dossiers waarvan de akte verleden is.

In het veld **Hoeveel dagen vooraf** kiest u hoe ver op voorhand de taak verschijnt: van 1 tot 366 dagen, standaard 90. Klik daarna op **Bewaren**. De vervaldatum van de taak is de dag van de herziening.

Dit signaal staat standaard **aan**.

### Jaarlijkse check

Een taak op de **verjaardag van de akte**, zolang het krediet loopt. Het is het moment om met de klant de rentevoet, de schuldsaldoverzekering en de brandverzekering te bekijken.

Dit signaal staat standaard **uit**: het maakt elke maand taken, voor elk geakteerd dossier. Zet u het aan, dan vraagt CreditSoft eerst een bevestiging en zegt het hoeveel akten de komende 30 dagen verjaren.

Staat de jaarlijkse check aan, dan toont het dashboard er een eigen kaart voor, naast *Herbekijken* en *Renteherziening*.

### Herbekijken op

Een taak op de datum **Herbekijken op** die iemand op een [kredietdossier](../credit-management/credit-files.md#dossiergegevens) zette. De reden staat op de dossierfiche.

Dit signaal staat standaard **aan**.

## Wie de taak krijgt

Een taak gaat naar de **eigenaar van het dossier**, als die bij CreditSoft kan aanmelden. Heeft de eigenaar geen account, of heeft het dossier geen eigenaar, dan gaat de taak naar de medewerker die u kiest onder **Verantwoordelijke bij een dossier zonder eigenaar**. Klik daarna op **Bewaren**.

Kiest u daar niemand, dan komt er voor zo'n dossier geen taak. Het signaal blijft wel zichtbaar op het dashboard.

## De taken zelf

Een taak van een beheersignaal hangt aan het kredietdossier. U vindt ze in het journaal van het dossier en in de lijst [Taken](../credit-management/tasks.md). De titel zegt waarover het gaat, met het dossiernummer erachter:

- *Renteherziening op* een datum;
- *Jaarlijkse check*;
- *Herbekijken*.

De beschrijving zegt wat er te doen is. Als maker staat er *CreditSoft (beheersignalen)*.

Elke gelegenheid geeft **één taak**. Werkt u ze af of verwijdert u ze, dan komt ze niet terug. De volgende herziening of de volgende verjaardag geeft wel opnieuw een taak.

## Contracten zonder volgende herziening

Soms verschijnt onderaan nog een kaart: **Contracten zonder volgende herziening**. Ze telt de contracten van een lopend krediet die hun eerste herziening al hadden, maar waarvan de variabiliteit niet zegt om de hoeveel jaar de rente daarna opnieuw herzien wordt. Die contracten krijgen nooit meer een signaal.

Bij een vaste rente klopt dat. Bij een variabele rente vult u de jaren in onder [Keuzelijsten → Variabiliteit](keuzelijsten.md#de-variabiliteit-wanneer-de-rente-herzien-wordt). De link **Naar Keuzelijsten** brengt u er.

## Veelgemaakte fouten

!!! warning "Geen taak voor een dossier zonder eigenaar"
    Staat er geen standaardverantwoordelijke ingesteld, dan wordt een signaal op een dossier zonder eigenaar geen taak. Kijk naar de gele melding in de kaart bovenaan: als die er staat, kiest u een verantwoordelijke.

!!! warning "Een contract zonder eerste herziening"
    CreditSoft kent een renteherziening enkel als het contract een datum **Eerste herziening** draagt. Het [contract](../credit-management/credit-files.md#contracten) stelt die voor uit de jaren van de variabiliteit. Staan die jaren niet bij [Keuzelijsten](keuzelijsten.md#de-variabiliteit-wanneer-de-rente-herzien-wordt), dan blijft dit signaal voor zo'n contract stil.

## Zie ook

- [Dashboard: opvolging van lopende kredieten](../getting-started/dashboard.md#opvolging-van-lopende-kredieten)
- [Dashboard-fases](dashboard-fases.md)
- [Taken](../credit-management/tasks.md)
- [Keuzelijsten](keuzelijsten.md)
