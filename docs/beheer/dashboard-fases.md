# Dashboard-fases

Op dit scherm bepaalt u zelf hoe uw dossiers op het dashboard **gegroepeerd en geteld** worden, en wat er met een dossier gebeurt zodra het rond is. Het bevat een reeks losse instellingen die weinig met elkaar te maken hebben.

![Het scherm Dashboard-fases in CreditSoft: bovenaan de fases met hun naam in beide talen, hun volgorde en de vinkjes eindfase en opvolging, met rechts de koppeling van elke dossierstatus aan een fase; daaronder de koppeling van elke contractstatus aan een van de vier KPI-tegels.](../images/dashboard-fases.png "Instellen hoe dossiers gegroepeerd en geteld worden op het dashboard"){ .volle-breedte }

!!! info "Let op waar wél en niet een bewaarknop staat"
    De **fases**, de **koppelingen** en de **vinkjes** onderaan worden meteen bewaard: past u iets aan, dan staat het er. Wilt u een koppeling ongedaan maken, klik dan op het kruisje in de keuzelijst.

    De twee instellingen **bovenaan** — de beginstatus en het signaalblok — hebben elk hun eigen knop **Bewaren**. Klikt u die niet, dan is uw wijziging niet opgeslagen.

## De beginstatus van een nieuw dossier

Met welke status begint een dossier dat u in CreditSoft aanmaakt? Dat verschilt per kantoor, dus het programma kiest het niet voor u.

Zolang u hier niets instelt, **vraagt CreditSoft de status bij elk nieuw dossier**. Dat is bewust: een verkeerde standaard zet een nieuw dossier meteen in de verkeerde fase, en dat merkt u pas op het dashboard.

Stelt u er wel een in, dan verdwijnt die vraag en start elk dossier in die status. U kan de keuze altijd weer wissen; dan komt de vraag terug.

## Het signaalblok — hoever kijkt het dashboard vooruit?

Op het dashboard staat een blok met termijnen die aflopen: offertes, aktes, opschortende voorwaarden en EPC-attesten. Hier bepaalt u **hoeveel dagen vooruit** het kijkt.

Alleen dossiers die nog lopen tellen mee. En termijnen die al verstreken zijn, blijft u altijd zien — hoe lang geleden ook — zolang het dossier niet in een eindfase staat. Zo verdwijnt er nooit iets uit beeld omdat het te lang blijft liggen.

## De fases

Een **fase** is een kolom in de pijplijn op het dashboard: een groep dossierstatussen die u samen wil zien staan.

| Kolom | Wat u invult |
|---|---|
| **Naam (NL)** en **Naam (FR)** | De naam zoals uw medewerkers hem zien, in beide talen |
| **Volgorde** | Bepaalt van links naar rechts waar de fase in de pijplijn staat |
| **Eindfase** | De doorlooptijd van een dossier stopt hier met tellen |
| **Opvolging** | Het dossier komt in de lijst met openstaande punten ná de akte |

**Eindfase** is belangrijker dan het lijkt. Een dossier dat zonder gevolg is afgesloten, blijft anders eindeloos "lopen" in uw statistieken. Zet u de fase waarin dat dossier terechtkomt op eindfase, dan stopt de klok.

**Opvolging** gebruikt u voor fases waar het krediet rond is maar er nog stukken ontbreken — de akte is gepasseerd en er wacht nog een attest. Die dossiers verschijnen dan in het overzicht [Globaal overzicht](../credit-management/global-overview.md) onder *Opvolging na akte*.

Onderaan de tabel staat een lege regel: vul daar een naam in om een fase toe te voegen.

## Dossierstatussen aan een fase koppelen

Rechts staan al uw dossierstatussen. Kies per status in welke fase hij thuishoort.

- Een status hoort bij **hoogstens één** fase.
- Koppelt u een status niet, dan komen die dossiers op het dashboard onder **niet ingedeeld**.
- Statussen die u niet meer gebruikt maar die nog aan oude dossiers hangen, blijven in deze lijst staan. Dat is bewust: die dossiers moeten ergens terechtkunnen.

## Wat betekent elke contractstatus?

Onderaan geeft u per **contractstatus** aan wat hij betekent: *gerealiseerd*, *in te dienen* of *ingediend*. Daarmee vullen de vier gekleurde tegels bovenaan het dashboard zich vanzelf. Dit staat helemaal los van de fases: fases gaan over dossiers, dit gaat over contracten.

U kiest dus **niet** rechtstreeks een tegel. Dat kan ook niet: *Aktes* en *LOA* tellen allebei **gerealiseerde** contracten en verschillen alleen in productsoort — hypothecair krediet tegenover lening op afbetaling. Welk product bij welke tegel hoort, ligt vast in uw productenlijst.

Statussen zonder betekenis tellen nergens mee. Staat een tegel op nul terwijl u weet dat er contracten zijn, dan draagt de betrokken status waarschijnlijk nog geen betekenis.

!!! info "De lijst is gegroepeerd per herkomst"
    Contractstatussen komen uit drie verschillende lijsten: die van de **kredietcontracten**, een **historische** lijst van vóór het contractmodel, en die van de **schuldsaldoverzekeringen**. Verzekeringsstatussen kan u geen betekenis geven — de kerncijfers zijn kredietcijfers. Ze staan er wel bij, met de vermelding *niet van toepassing*, zodat u niet zoekt naar een status die u meent te missen.

!!! warning "Waarom staan sommige statussen er dubbel?"
    In de overgezette gegevens komt het voor dat twee statussen dezelfde naam dragen — bijvoorbeeld tweemaal *Zonder gevolg*. Dat is geen fout: het zijn twee verschillende statussen uit het vorige programma, elk met hun eigen dossiers. Geef ze allebei dezelfde betekenis, dan zien uw medewerkers er niets van.

## Wat mag er niet meer wijzigen aan een afgerond contract?

Onderaan vinkt u aan welke velden op slot gaan zodra een contract de betekenis **Gerealiseerd** draagt: contractnummer, product, kredietsoort, bedrag, looptijd, rentevoet, begindatum en kredietinstelling.

Dat beschermt uw cijfers. Een bedrag dat na de akte nog wijzigt, verandert met terugwerkende kracht wat er op het dashboard en op uw commissieoverzichten staat.

!!! warning "Zonder betekenis vergrendelt er niets"
    Het slot hangt aan de betekenis *Gerealiseerd* uit het deel hierboven. Is er nog geen enkele contractstatus die die betekenis draagt, dan doen deze vinkjes niets — stel dan eerst de betekenissen in.

Wie het recht draagt om een afgerond contract toch te bewerken, kan het slot openen wanneer er echt iets rechtgezet moet worden.
