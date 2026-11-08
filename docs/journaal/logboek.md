# Logboek

Het **Logboek** toont wat er met deze fiche gebeurd is: wie welk veld wijzigde, wanneer, en van welke waarde
naar welke. Het is de vraag *"wie heeft dat aangepast?"* — beantwoord zonder dat iemand het zich moet
herinneren.

![Het onderdeel Logboek met de wijzigingen van een relatie, jongste bovenaan: per regel het label, het tijdstip, de gebruiker en per veld de oude waarde doorstreept met de nieuwe erachter.](../images/journaal-logboek.png "Het logboek van een relatie")

## Wat u ziet

De regels staan **van jong naar oud**, de recentste bovenaan. Elke regel begint met een label dat zegt wat er
gebeurde:

| Label | Betekenis |
|---|---|
| **Aangemaakt** | De fiche werd toegevoegd. Eronder staan de waarden waarmee ze begon. |
| **Gewijzigd** | Er veranderde iets. Per veld staat de oude waarde doorstreept, dan een pijl, dan de nieuwe. |
| **Verwijderd** | De fiche ging naar de [Prullenbak](../administration/recycle-bin.md). |

Naast het label staan het **tijdstip** en de **gebruiker**. Een veld dat leeg was of leeg werd, toont een
streepje. Bij **Aangemaakt** staan enkel de velden die een waarde kregen.

De waarden staan er zoals op het scherm: een keuze uit een lijst met haar naam, een instelling met haar naam,
een bedrag in euro, een datum als dag/maand/jaar. Staat er toch een nummer of een code, dan bestaat die waarde
nergens meer, bijvoorbeeld een verwijderd item. Het logboek toont dan wat er die dag werkelijk in het veld stond.

Werd er in één keer veel gewijzigd, dan toont het logboek de eerste vier velden en daaronder een knop
**+ zoveel andere velden**. Klik erop om alles te zien.

!!! note "Enkel de recentste tweehonderd"
    Van een fiche met een lange geschiedenis toont het logboek de tweehonderd jongste wijzigingen. Staat de
    lijst vol, dan meldt hij dat onderaan.

## Op een kredietdossier: ook de contracten

Het logboek van een kredietdossier toont ook de wijzigingen aan zijn **contracten**, door elkaar met die van
het dossier zelf en op tijd gerangschikt. Zo ziet u op één plek wie de rentevoet, het bedrag of de eerste
herziening van een contract aanpaste.

Een regel over een contract draagt onder het tijdstip een tweede regel die zegt **welk contract** het is: het
contractnummer (of anders het voorlopige nummer), het product, de instelling en het bedrag, en bij een
schuldsaldoverzekering de verzekerde. Dat zijn de gegevens van het contract zoals het nu is, dus zoals u het in
de lijst **Contracten** terugvindt.

- Op de dossierfiche **opent een klik** op die regel het contract.
- Een verwijderd contract krijgt *(verwijderd)* achter zijn naam. Zijn wijzigingen blijven in het logboek staan.

## Wat er niet in staat

- **Technische stempels.** Velden die de toepassing zelf bijhoudt — wanneer er laatst bewaard werd, en door wie
  — staan niet als wijziging in de lijst. Dat tijdstip staat immers al rechts naast elke regel. Zonder die
  filter zou elke regel ermee beginnen en zou de échte wijziging eronder verdwijnen.
- **Onderliggende regels.** Het logboek gaat over de fiche zelf, en bij een kredietdossier ook over zijn
  contracten. Wijzigt u bij een relatie een **adres**, of bij een dossier een **aanvrager**, dan is dat een eigen
  record en verschijnt het hier niet.

## U kunt er niets aan veranderen

Het logboek is **alleen-lezen**. Er is geen knop om een regel te wijzigen of te verwijderen, ook niet voor een
beheerder. Dat is geen tekortkoming maar de bedoeling: een geschiedenis waarin u kunt schrappen, is geen
geschiedenis.

## Wie het mag zien

Het Logboek vraagt hetzelfde recht als het [Actielogboek](../administration/activity-log.md). Heeft u dat niet,
dan verschijnt het onderdeel niet — niet in de lade en niet als tabblad op de fiche. U regelt dat bij [Rollen](../administration/roles.md).

## Verschil met het Actielogboek

Ze lijken op elkaar en beantwoorden een andere vraag:

- Het **Logboek** hier gaat over **één fiche** en toont **veld per veld** wat er veranderde.
- Het [Actielogboek](../administration/activity-log.md) in het Platformbeheer gaat over **de hele toepassing**
  en toont **handelingen**: wie wanneer aanmeldde, wie iets exporteerde, wie een gebruiker deactiveerde.

Zoekt u wat er met een dossier gebeurd is, kijk dan hier. Zoekt u wat een gebruiker die dag allemaal gedaan
heeft, kijk dan in het Actielogboek.

## Op welke fiches

Het Logboek staat op de zes hoofdfiches: kredietdossiers, relaties, professionals, aanbrengers,
kredietinstellingen en verzekeraars. Op een fiche zonder geschiedenis verschijnt het onderdeel niet.

Ook een item van een [keuzelijst](../beheer/keuzelijsten.md) heeft een logboek. U vindt het in zijn
bewerkvenster, onder **Historiek van dit item tonen**.
