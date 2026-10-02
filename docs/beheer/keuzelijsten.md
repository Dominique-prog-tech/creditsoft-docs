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

![Het scherm Keuzelijsten met bovenaan de lijst Variabiliteit (rentevoetformule) gekozen. De tabel toont per variabiliteit de naam in de kolommen Nederlands en Frans, en de twee getallen Eerste herziening na (jaar) en Daarna om de (jaar): bij Variabel 10/5/5 bijvoorbeeld 10 en 5. Bij Vast staan beide leeg.](../images/keuzelijsten-variabiliteit.png "De variabiliteiten met hun herzieningsjaren")

Klik op een variabiliteit om de getallen te wijzigen; naam en volgorde staan grijs. Bij *Variabel 10/5/5* is
dat 10 en 5. Staan de getallen in de naam, dan zijn ze al ingevuld. Bij een productnaam zoals *Record Light
Home* vult u ze zelf in: uit zo'n naam valt niets af te leiden, en een gok zou een herinnering op de verkeerde
dag zetten. Bij een vaste rente laat u ze leeg.

Met die getallen stelt een contract zijn **eerste renteherziening** voor, en toont het
[dashboard](../getting-started/dashboard.md#opvolging-van-lopende-kredieten) de herzieningen die eraan komen.
Laat u *Daarna om de* leeg, dan verschijnt enkel de eerste herziening.

## De reden van afvallen

Bij **Reden van afvallen** staan de redenen die u op een afgevallen [kredietdossier](../credit-management/credit-files.md#reden-van-afvallen) kiest. Elk kantoor start met elf: zes waarom de bank weigerde, vier waarom de klant afzag, en *Overige*. De naam begint met *Bank:* of *Klant:* — zo houdt de grafiek op het tabblad *Productie* van het [dashboard](../getting-started/dashboard.md#het-tabblad-productie) beide soorten uit elkaar.

Bij elke reden zet u in de kolom **Wie gaf de reden** of ze van de *Bank* of van de *Klant* komt. Daarop telt de kolom *Geweigerd door de bank* in de tabel [per kredietverstrekker](../getting-started/dashboard.md#per-kredietverstrekker). De standaardredenen dragen die keuze al; bij *Overige* blijft ze leeg.

Hernoem, voeg toe of verwijder gerust. Een reden die u verwijdert, blijft staan op de dossiers die ze al dragen en komt niet vanzelf terug.

## Welke lijsten kunt u niet aanpassen?

In de kiezer bovenaan staan de lijsten die **van u** zijn: de labels waarmee u uw relaties en contacten
beschrijft. Twee groepen staan er bewust niet tussen.

**De lijsten waar het programma op rekent.** De dossier- en contractstatussen, de soorten kredietdossier, het
doel van de aankoop: daar hangt logica aan. CreditSoft leidt er berekeningen en schermen uit
af, en een statusnaam wijzigen zou meer doen dan een woord veranderen. Wilt u daar iets aan wijzigen, vraag
het dan aan ADM-Concept — dan kijken we samen wat het raakt.

**De lijsten die voor iedereen gelijk zijn.** Landen en postcodes komen centraal uit ADM One en worden daar
onderhouden, zodat ze in elk pakket dezelfde zijn.
