# Keuzelijsten

De keuzelijsten zijn de waarden die overal in de fiches in de keuzevelden verschijnen: aanspreking, bedrijfstype, nationaliteit, beroep, burgerlijke staat en nog een reeks andere.

![Het scherm Keuzelijsten in CreditSoft: bovenaan de kiezer waarmee u een lijst selecteert — hier Nationaliteit — en daaronder een tabel met de kolommen Volgorde, Nederlands en Frans, met rechtsboven de knoppen Nieuw item, Kolommen kiezen, Exporteren en een zoekveld.](../images/keuzelijsten.png "Het beheer van de keuzelijsten, met de nationaliteitenlijst geopend")

## Het scherm openen

Klik links onderaan op **Platformbeheer** en dan op de tegel **Keuzelijsten**, in de groep *Gegevens*.

Kies bovenaan **welke lijst** u wil bewerken. Daaronder verschijnen de items van die lijst.

## Een item toevoegen of aanpassen

| Veld | Waarvoor |
|---|---|
| **Naam (NL)** en **Naam (FR)** | De tekst zoals uw medewerkers hem in het keuzeveld zien |
| **Volgorde** | Bepaalt waar het item in de lijst staat |

Vul altijd **beide talen** in. Laat u het Frans leeg, dan ziet een Franstalige collega de Nederlandse tekst.

!!! tip "Wanneer u de volgorde nodig hebt"
    Laat u **Volgorde** op nul staan, dan sorteert de lijst alfabetisch — en wel **in de taal van wie kijkt**.
    Een Franstalige collega ziet dezelfde lijst dus op zijn eigen alfabet gerangschikt.

    Zet de volgorde alleen bij lijsten die een **weg** beschrijven in plaats van een verzameling — waar
    *eerst dit, dan dat* betekenis heeft. Voor lijsten als nationaliteit, beroep of bedrijfstype laat u de
    volgorde gewoon op nul; alfabetisch is daar precies wat u wil.

## Een item verwijderen

Verwijderde items blijven bestaan achter de schermen. Dat moet ook: dossiers die er al naar verwijzen, moeten leesbaar blijven. Wat er gebeurt:

- het item verdwijnt uit de keuzevelden, dus niemand kan het nog kiezen;
- bestaande dossiers blijven hun waarde tonen alsof er niets veranderd is.

!!! warning "Waarom staan sommige items dubbel?"
    In de overgezette gegevens dragen soms twee items dezelfde naam — bijvoorbeeld tweemaal *Zonder gevolg*. Dat zijn twee verschillende waarden uit het vorige programma, elk met hun eigen dossiers, en meestal is er één van geschrapt. CreditSoft zet er dan *(verwijderd)* achter zodat u ze uit elkaar houdt. Verwijder ze niet zomaar: aan de geschrapte hangt vaak het grootste deel van uw historiek.

## De variabiliteit: wanneer de rente herzien wordt

Eén lijst van het programma staat wél in de kiezer: **Variabiliteit (rentevoetformule)**. De namen beheren
wij — u kiest ze op een contract — maar per variabiliteit vult u zelf **twee getallen** in:

| Veld | Waarvoor |
|---|---|
| **Eerste herziening na (jaar)** | Na hoeveel jaar de rente voor het eerst herzien wordt |
| **Daarna om de (jaar)** | Om de hoeveel jaar daarna opnieuw |

![Het scherm Keuzelijsten met bovenaan de lijst Variabiliteit (rentevoetformule) gekozen. De tabel toont per variabiliteit de naam in de kolommen Nederlands en Frans, de twee getallen Eerste herziening na (jaar) en Daarna om de (jaar), bij Variabel 10/5/5 bijvoorbeeld 10 en 5, en de kolom Referte-index met cursief het voorstel, bij Variabel 10/5/5 Voorstel: E. Bij Vast staan beide getallen leeg en staat er Niet bevestigd.](../images/keuzelijsten-variabiliteit.png "De variabiliteiten met hun herzieningsjaren en het voorstel voor de referte-index")

Klik op een variabiliteit om de getallen te wijzigen; naam en volgorde staan grijs. Bij *Variabel 10/5/5* is
dat 10 en 5. Staan de getallen in de naam, dan zijn ze al ingevuld. Bij een productnaam zoals *Record Light
Home* vult u ze zelf in: uit zo'n naam valt niets af te leiden, en een gok zou een herinnering op de verkeerde
dag zetten. Bij een vaste rente laat u ze leeg.

Met die getallen stelt een contract zijn **eerste renteherziening** voor, en toont het
[dashboard](../getting-started/dashboard.md#opvolging-van-lopende-kredieten) de herzieningen die eraan komen.
Laat u *Daarna om de* leeg, dan verschijnt enkel de eerste herziening.

### De referte-index

Naast de twee getallen kiest u per variabiliteit de **Referte-index**: welke index van het Federaal Agentschap van de
Schuld een krediet met die variabiliteit volgt. Er zijn er tien. Index **A** volgt de schatkistcertificaten op een jaar,
**B** tot **J** de lineaire obligaties op 2 tot 10 jaar. Welke index een krediet volgt, staat in het aanbod van de bank.

Koos uw kantoor nog geen index, dan toont de kolom een **voorstel** in schuine letters, uit het ritme van de latere
herzieningen: om het jaar geeft *A*, om de 3 jaar *C*, om de 5 jaar *E* en om de 10 jaar *J*. Bij *Variabel 10/5/5* is
dat dus *E*. Klik op de variabiliteit en kies **Overnemen** onder het veld; het voorstel geldt pas na **Bewaren**. Volgt
de bank een andere index, kies dan die. Weet u het niet zeker, laat het veld dan leeg: CreditSoft vult nooit zelf een
index in.

Op het contract zelf vult u daarna de cap, de floor en de begin-index uit het aanbod in: zie
[het contractvenster](../credit-management/credit-files.md#contracten). De waarden van de indexen zelf, maand per maand,
staan op het scherm [Referte-indexen](referte-indexen.md).

## De aflossingswijze van een producttype

Bij de lijsten **Producttype hypothecair** en **Producttype persoonlijke lening** staat een kolom
**Aflossingswijze**: hoe een krediet van dat type afgelost wordt.

| Aflossingswijze | Wat het betekent |
|---|---|
| **Gelijkblijvende maandlast** | Elke maand hetzelfde bedrag, rente en kapitaal samen |
| **Aflossingsvrij (enkel rente)** | De maandlast is enkel de rente; het kapitaal wordt op het einde terugbetaald |
| **Stijgende maandlast** | De maandlast begint lager en stijgt daarna |
| **Vaste kapitaalaflossing (dalende maandlast)** | Elke maand hetzelfde deel van het kapitaal, met de rente erbovenop; de maandlast daalt |

![Het scherm Keuzelijsten met de lijst Producttype hypothecair gekozen. De tabel toont per producttype de naam in het Nederlands en het Frans, en de kolom Aflossingswijze. Bij Mensualiteiten staat de bevestigde wijze Gelijkblijvende maandlast en bij Crescendo Stijgende maandlast; bij Aflossingsvrij staat cursief het voorstel Voorstel: Aflossingsvrij (enkel rente); bij Overbrugging en Light home staat Onbekend.](../images/keuzelijsten-aflossingswijze.png "De aflossingswijze per producttype, met het voorstel uit de naam"){ .volle-breedte }

Koos uw kantoor nog geen aflossingswijze, dan toont de kolom een **voorstel** in schuine letters, bijvoorbeeld
*Voorstel: Gelijkblijvende maandlast*. CreditSoft leidt dat af uit de naam van het producttype: *Mensualiteiten*
wijst op een gelijkblijvende maandlast, *Crescendo* op een stijgende. Zegt de naam niets zeker, zoals bij
*Overbrugging* of een merknaam, dan staat er **Onbekend**.

Klik op een producttype om de aflossingswijze te kiezen. Onder het veld staat het voorstel, met de knop
**Overnemen** ernaast. Het voorstel geldt pas als u op **Bewaren** klikt. Weet u het niet zeker, laat dan
*Onbekend* staan.

Met de bevestigde aflossingswijze rekent CreditSoft de
[aflossingstabel](../credit-management/credit-files.md#de-aflossingstabel) van een contract. Het voorstel alleen
volstaat daarvoor niet.

## Het doel voor de raming van een kredietdoel

Bij de lijst **Kredietdoel** staat een kolom **Doel voor de raming**: waarmee de
[raming van de aankoopkosten](../credit-management/credit-files.md#de-aankoopkosten-ramen) rekent voor een dossier
met dat kredietdoel. De namen van de kredietdoelen beheren wij; u kiest enkel het doel.

| Doel voor de raming | Wat de raming rekent |
|---|---|
| **Aankoop (met of zonder werken)** | De registratierechten, de akte van aankoop en de kredietakte |
| **Enkel een krediet (werken, verbouwing)** | Enkel de kredietakte |
| **Herfinanciering** | Enkel de kredietakte, met de melding dat het ereloon lager kan liggen |
| **Nieuwbouw of bouwen** | Geen raming: bij nieuwbouw geldt deels btw |
| **Ander doel (niet te ramen)** | Geen raming, bijvoorbeeld bij een uitkoop of bij successierechten |

![Het scherm Keuzelijsten met de lijst Kredietdoel gekozen. De tabel toont per kredietdoel de naam in het Nederlands en het Frans, en de kolom Doel voor de raming. Bij Aankoop en Aankoop met verbouwingen staat Aankoop (met of zonder werken), bij Herfinanciering en Herfinanciering met verbouwingen Herfinanciering, bij Nieuwbouw en Aankoop grond en nieuwbouw Nieuwbouw of bouwen, en bij Verbouwingen Enkel een krediet (werken, verbouwing). Bij Aankoop bouwgrond, Centralisatie en Uit onverdeeldheid treden staat Niet bevestigd.](../images/keuzelijsten-kredietdoel.png "Het doel voor de raming per kredietdoel"){ .volle-breedte }

Zolang uw kantoor niets koos, toont de kolom een **voorstel** in schuine letters, of **Niet bevestigd**. CreditSoft
leidt het voorstel af uit de naam: *Aankoop met verbouwingen* is een aankoop, *Herfinanciering met verbouwingen*
een herfinanciering, *Nieuwbouw* nieuwbouw. Een naam met twee doelen, zoals *Aankoop + Herfinanciering*, krijgt geen
voorstel. Een naam die op een ander tarief wijst ook niet: grond, een uitkoop, uit onverdeeldheid treden,
successie- of schenkingsrechten.

Klik op een kredietdoel om het doel te kiezen. Onder het veld staat het voorstel, met **Overnemen** ernaast. Het
geldt pas na **Bewaren**. Laat het leeg als u het niet zeker weet: dan kiest de medewerker het doel in het
rekenvenster.

## De reden van afvallen

Bij **Reden van afvallen** staan de redenen die u op een afgevallen [kredietdossier](../credit-management/credit-files.md#reden-van-afvallen) kiest. Elk kantoor start met elf: zes waarom de bank weigerde, vier waarom de klant afzag, en *Overige*. De naam begint met *Bank:* of *Klant:* — zo houdt de grafiek op het tabblad *Productie* van het [dashboard](../getting-started/dashboard.md#het-tabblad-productie) beide soorten uit elkaar.

Bij elke reden zet u in de kolom **Wie gaf de reden** of ze van de *Bank* of van de *Klant* komt. Daarop telt de kolom *Geweigerd door de bank* in de tabel [per kredietverstrekker](../getting-started/dashboard.md#per-kredietverstrekker). De standaardredenen dragen die keuze al; bij *Overige* blijft ze leeg.

Hernoem, voeg toe of verwijder gerust. Een reden die u verwijdert, blijft staan op de dossiers die ze al dragen en komt niet vanzelf terug.

## De historiek van een item

Onderaan het bewerkvenster van een item staat **Historiek van dit item tonen**. Klik erop en u ziet wie wat aan
dit item wijzigde, wanneer, en van welke waarde naar welke: de naam in beide talen, de volgorde, de
herzieningsjaren, de referte-index, de aflossingswijze, het doel voor de raming, en bij een reden van afvallen of die van de bank of van de
klant kwam. Het werkt zoals het [Logboek](../journaal/logboek.md) van een fiche, en het vraagt hetzelfde recht.

!!! tip "De oude naam van een item"
    Overal waar een item gebruikt wordt, staat de naam van vandaag, ook in het logboek van een dossier. Hernoemt u
    een status, dan leest u alleen hier nog hoe die vroeger heette.

## Welke lijsten kunt u niet aanpassen?

In de kiezer bovenaan staan de lijsten die **van u** zijn: de labels waarmee u uw relaties en contacten
beschrijft. Twee groepen staan er bewust niet tussen.

**De lijsten waar het programma op rekent.** De dossier- en contractstatussen, de soorten kredietdossier, het
doel van de aankoop: daar hangt logica aan. CreditSoft leidt er berekeningen en schermen uit
af, en een statusnaam wijzigen zou meer doen dan een woord veranderen. Wilt u daar iets aan wijzigen, vraag
het dan aan ADM-Concept — dan kijken we samen wat het raakt. Bij de variabiliteit, de producttypes en het
kredietdoel staat de lijst wel in de kiezer, maar beheert u enkel wat erbij hoort: de herzieningsjaren, de
aflossingswijze of het doel voor de raming. De namen beheren wij.

**De lijsten die voor iedereen gelijk zijn.** Landen en postcodes komen centraal uit ADM One en worden daar
onderhouden, zodat ze in elk pakket dezelfde zijn.
