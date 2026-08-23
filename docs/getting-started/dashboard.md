# Het dashboard

Het dashboard is uw startscherm. In één oogopslag ziet u hoeveel dossiers er in welke fase zitten en wat de kerncijfers doen.

![Het dashboard: bovenaan de vier kerncijfers — Aktes met het jaartal erbij, In te dienen, Ingediend en LOA met de vermelding "alle jaren" — daaronder de staafgrafiek van het gerealiseerde volume per maand en twee ringgrafieken met de verdeling per instelling en per verantwoordelijke, en onderaan de pijplijn Dossiers per fase met In behandeling, Ingediend, Afgewerkt, Zonder gevolg en Geweigerd.](../images/dashboard-startscherm.png "Het dashboard: kerncijfers, grafieken en de pijplijn per fase"){ .volle-breedte }

## De vier tegels bovenaan

De gekleurde tegels tellen **contracten**, niet dossiers. Elke tegel is een combinatie van twee dingen: wat een contractstatus **betekent**, en om welke **productsoort** het gaat.

| Tegel | Wat erin geteld wordt | Periode |
|---|---|---|
| **Aktes** | Gerealiseerde **hypothecaire** kredieten | het gekozen jaar |
| **In te dienen** | Contracten die nog ingediend moeten worden, ongeacht het product | alle jaren |
| **Ingediend** | Ingediende **hypothecaire** kredieten | alle jaren |
| **LOA** | Gerealiseerde **leningen op afbetaling** | alle jaren |

**LOA staat voor Lening Op Afbetaling.** Die tegel telt dus hetzelfde als *Aktes* — gerealiseerde contracten — maar voor een andere productsoort. Dat onderscheid komt uit uw productenlijst en ligt vast; u hoeft het niet in te stellen.

U geeft alleen aan **wat een contractstatus betekent**: *gerealiseerd*, *in te dienen* of *ingediend*. Dat doet u onder [Platformbeheer → Dashboard-fases](../beheer/dashboard-fases.md), onderaan bij *Contractstatussen*. Statussen zonder betekenis tellen nergens mee.

!!! info "Waarom telt maar één tegel per jaar?"
    Boven de tegels staan pijltjes om van jaar te wisselen. Alleen **Aktes** volgt dat jaar: die telt op de datum van de akte, en die datum is bekend. De drie andere tegels tellen alles wat er ooit is ingegeven, omdat de datums van die contracten nog niet allemaal ingevuld zijn. Het label onder elke tegel zegt zelf over welke periode ze gaat — *2026* of *alle jaren* — zodat u vier cijfers niet per ongeluk als vier jaarcijfers leest.

!!! tip "Staan er streepjes in plaats van cijfers?"
    Dan draagt nog geen enkele contractstatus een betekenis. U ziet een streepje en geen nul, want nul zou betekenen dat er echt niets te tellen valt. Onder de tegels staat een zin die u naar de instelling brengt.

## Wat er afloopt

Onder de vier tegels staan twee blokken die zeggen wat er **vandaag actie vraagt**: *Termijn verstreken* en
*Termijn nadert*. Ze kijken naar vier datums op een kredietdossier — de uiterste datum om de **offerte** te
tekenen, om de **akte** te verlijden, de vervaldag van de **opschortende voorwaarden**, en tot wanneer het
**EPC-attest** geldig is.

Per regel ziet u de klant, over welke termijn het gaat en wanneer die valt. Klik erop en u staat op het dossier.

Alleen dossiers die **nog lopen** tellen mee: staat de status van een dossier in een eindfase, dan verdwijnt het
uit deze blokken. Een dossier waarvan de status nergens is ingedeeld blijft er wél in staan — niet-ingedeeld is
geen bewijs dat een dossier af is.

!!! tip "Hoever het vooruitkijkt, kiest u zelf"
    Standaard veertien dagen. U verzet dat bij **Beheer &rarr; Dashboard-fases**.

**Verstreken termijnen blijven altijd staan**, ook oudere. Dat is met opzet: een termijn die maanden geleden
verliep op een dossier dat nog loopt, is geen ruis maar een vondst — ofwel klopt de status niet, ofwel ligt het
dossier stil. Elk blok toont de acht meest recente en zegt hoeveel er nog achter zitten.

Staat er niets? Dan zegt het blok dat, in plaats van leeg te blijven.

## De pijplijn: dossiers per fase

Onder de tegels staan uw dossiers gegroepeerd per **fase**. Een fase is een groep statussen die u zelf samenstelt — bijvoorbeeld *In behandeling*, *Ingediend*, *Afgewerkt*.

- Klik op een fase om de dossiers erachter te zien.
- Dossiers met een status die u niet hebt ingedeeld, komen samen onder **niet ingedeeld**.

!!! tip "Staat er iets in de verkeerde kolom?"
    Dan ligt dat aan de indeling en niet aan het dossier. Een dossier volgt de fase van zijn status; verhuist u een status naar een andere fase, dan verhuizen alle dossiers met die status mee. U past dat aan onder **Platformbeheer → Dashboard-fases**.

## Waarom uw dashboard er anders uitziet dan dat van een collega

Het dashboard toont wat u mag zien. Hebt u geen toegang tot bepaalde dossiers, dan tellen die ook niet mee in uw cijfers. Twee collega's kunnen dus verschillende aantallen zien, en dat is correct.
