# Films — instructievideo's uit de handleiding

**Voor:** de sessie die deze repo en `adm-creditsoft` onderhoudt
**Datum:** 30/08/2026
**Status:** ontwerp, klaar voor Fase 1

---

## 0. Waarom deze spec kort is

Omdat `tools/beelden.mjs` het moeilijke deel al doet. Wat een videopijplijn nodig heeft, staat er grotendeels al:

| Nodig voor film | Waar het al staat |
|---|---|
| Aanmelden + tenant kiezen | `meldAan()`, user-secrets, `tr:has-text("demo")` |
| Taalwissel zonder route-wijziging | `GET /culture/set?c=nl-BE\|fr-BE` |
| Deterministische proefgegevens | `tenant_demo`, vaste `ID`-tabel, gekozen op inhoud |
| Handelingen ná het laden | de `na`-recepten in `SCHOTEN` |
| Tweetalige selectors | `alt()`, `tab()`, `knop()`, `rechterTab()`, `avatar()` |
| Controle dat het juiste scherm in beeld staat | `VERWACHT` + `merkUitAlt()` + `schermBesluit()` |
| Verantwoording: geen stille overslagen | `verantwoording()` uit de AppKit-kern |

Film erbij is dus **geen nieuwe pijplijn maar een tweede uitvoer van dezelfde motor**. Vier dingen ontbreken: tijd, geluid, een zichtbare cursor en montage. Die staan in §3.

⚠️ Bouw dit **niet** in `beelden.mjs`. De beeldronde werkt; er een tweede opdracht in schuiven is de snelste manier om 175 werkende beelden te breken. Nieuw bestand `tools/films.mjs`, dat de hulpjes uit `beelden.mjs` importeert (die moeten daarvoor geëxporteerd worden — dat is de enige wijziging aan het bestaande bestand).

---

## 1. Wat een film is

Een **schot** is één beeld. Een **film** is een geordende reeks **scènes**, en een scène is precies één handeling plus precies één gesproken zin. Een film is dus géén aaneenschakeling van bestaande schoten — de schoten tonen eindtoestanden, een film toont de weg ertussen.

- 15 à 20 films, niet 61. Doelduur **60–180 seconden**.
- Bij 140 gesproken woorden per minuut is een film van 150 s ongeveer **350 woorden**. `credit-files.md` telt er 3.500. Een film is dus een **curatie van 10%**, niet een samenvatting van alles.
- Referentiepagina's (veldenlijsten, `keuzelijsten`, `documenttypes`, `rollen`) zijn slechte filmkandidaten. Die lees je, die kijk je niet.

---

## 2. Waar de films staan

⚠️ **Niet in frontmatter.** De pagina's in `docs/` dragen er geen — ze beginnen met `# Titel`. Er 122 bestanden voor openbreken is een verbouwing zonder opbrengst.

De films staan als `FILMS` in `tools/films.mjs`, in dezelfde vorm als `SCHOTEN`: een naam, een route, en per scène een handeling. Eén lijst, één plaats, dezelfde leesbaarheid.

```js
const FILMS = [
  ['kredietdossiers-basis', {
    duur: 150,                          // richtduur in seconden
    dossier: ID.dossierMetSchema,       // ⚠️ zie de noot bij scène 10
    scenes: [ /* … */ ],
  }],
];
```

---

## 3. De vier dingen die nog niet bestaan

### 3.1 Geluid stuurt beeld, niet omgekeerd

Dit is de kern van het geheel. **Eerst** de voice-over genereren, per scène één audiofragment, de duur meten. **Dan** opnemen, waarbij de scène haar fragment volgt. Synchronisatie wordt zo een eigenschap van de pijplijn en geen montagestap — en daarom is er geen montagestap.

⚠️ **Maar "exact zolang als haar fragment" was fout, en dat hoorde je.** Zo stond het hier tot 31/08/2026, en zo was het gebouwd: elke scène duurde precies de lengte van haar zin, en het geluidsspoor plakte de fragmenten aan elkaar. Er zat dus **per constructie geen enkele stilte** tussen twee zinnen — de enige die voorkwam was toevallig, wanneer een handeling langer duurde dan haar zin. Dominique hoorde het meteen aan de eerste twee films: *"weinig stilte tussen de verschillende zinnen waardoor het allemaal artificieel overkwam."* Een betere stem lost dat **niet** op; dit is tijdlijn, geen timbre.

Een scène heeft daarom **drie fasen**, en de constanten staan bovenaan `films.mjs`:

| Fase | Wat | Standaard |
|---|---|---|
| handeling | klikken, navigeren, wachten op het merkteken | zolang als nodig |
| **aanloop** | stilte tussen "het scherm staat er" en de eerste lettergreep | `AANLOOP` 0,6 s · `1,3 s` op een scène die naar een ánder scherm springt · `AANLOOP_START` 1,2 s vóór de allereerste zin |
| zin | het audiofragment | gemeten |
| **adem** | stilte ná de zin, vóór de volgende handeling | `ADEM` 0,9 s |

Plus `NASLEEP` 2,2 s op het slotbeeld — en het geluidsspoor wordt tot dáár met stilte aangevuld, anders knipt `ffmpeg -shortest` de nasleep eraf en eindigt de film op het laatste woord.

⚠️ **De zin begint bij `spraak`, niet bij `start`.** Even structureel als het vorige: het fragment stond op het tijdstip waarop de **handeling** begon, niet waarop het scherm klaar stond. De kijker hoorde de uitleg van een scherm dat hij nog niet zag. De ondertitels hangen aan dezelfde `spraak`-tijden, dus die kloppen mee.

De aanloop en de adem zijn per scène te overschrijven (`aanloop:`, `adem:`), want een slotbeeld mag langer nazinderen dan een tussenstap.

⚠️ Draai het niet om. Opnemen en er achteraf geluid onder leggen betekent dat elke tekstwijziging een handmatige hermontage vraagt, en dan is de film binnen twee releases weer het zwakste punt.

### 3.2 Een Playwright-opname toont géén cursor

Playwright tekent de muisaanwijzer niet in de video. Een film waarin knoppen uit zichzelf indrukken, leest als een storing. Nodig: een **ingespoten cursor** — een absolute `div` die op `mousemove` meebeweegt, met een klikanimatie. Twintig regels in een `addInitScript`, en meteen herbruikbaar voor CleanOps en Nimble.

Meteen daarbij: **bewegen, niet springen**. `page.mouse.move(x, y, { steps: 20 })` vóór elke klik. Een cursor die teleporteert is niet te volgen.

### 3.3 Eén vensterformaat per film

`beelden.mjs` zet `setViewportSize` per schot — elf breedtes, elf hoogtes. In een opname kan dat niet: het formaat ligt vast bij het aanmaken van de context. Films draaien op **1920×1080, `deviceScaleFactor: 1`** (niet 2 — de opname neemt de viewport, niet de schaal, en 2 levert enkel een zwaarder bestand).

⚠️ Controleer wat dat doet met de brede lijstschermen. `kredietdossiers-lijst` staat in `beeldvorm.json` niet op 1700 omdat het mooi is, maar omdat de kolommen anders niet passen. Past het niet op 1920, dan hoort er een `zoom`-scène in de film in plaats van een breder venster.

### 3.4 `waitForTimeout` is dode lucht

De recepten staan vol `waitForTimeout(2500)` en `(3500)`. Voor een schot is dat gratis. In een film zijn dat 3,5 seconden waarin er niets gebeurt en niemand praat. Filmhandelingen wachten op een **toestand** (`waitFor`, `waitForLoadState`), en de resterende tijd van de scène wordt opgevuld door de narratie, niet door een timer.

---

## 4. Pilot: `kredietdossiers-basis`

Elf scènes, ongeveer 150 seconden. Volledig uitgeschreven zodat Fase 1 een doel heeft en geen schema.

⚠️ **Het dossier is `ID.dossierMetSchema` (DEMO-1654), niet `ID.dossier`.** Scène 10 toont de commissieschema's in het journaal, en die bestaan enkel op een dossier mét een actief schema — dezelfde reden waarom `commissieschemas-journaal` dat dossier gebruikt. Halverwege van dossier wisselen mag niet: dan verspringen naam en bedrag midden in de film.

⚠️ **De Franse labels hieronder komen uit `beelden.mjs` en dus uit de broncode.** Waar ik ze niet kon terugvinden, staat `⟨FR?⟩`. Die haal je uit de `Tr`-woordenboeken, je raadt ze niet — "Gesprekken" bleek "Appels" en niet "Conversations", en dat is precies het soort fout dat een Franstalige kijker meteen ziet.

| # | Scène | Handeling | Narratie NL | Narratie FR |
|---|---|---|---|---|
| 1 | `lijst` | `goto /credit-files` | "Het kredietdossier is het hart van CreditSoft. Alles wat bij één aanvraag hoort, staat op één pagina bij elkaar." | "Le dossier de crédit est le cœur de CreditSoft. Tout ce qui concerne une demande est rassemblé sur une seule page." |
| 2 | `kolommen` | `hold` | "In de lijst ziet u per dossier het kenmerk van de aanbrenger, de status, het kredietbedrag en de aanvrager." | "Dans la liste, vous voyez par dossier la référence apporteur, le statut, le montant du crédit et le demandeur." |
| 3 | `filteren` | filter op status, `waitFor` op de teller | "Bovenaan filtert u op status en op aanbrenger. Het aantal gevonden dossiers loopt mee." | "En haut, vous filtrez par statut et par apporteur. Le nombre de dossiers trouvés suit." |
| 4 | `nieuw` | knop **Nieuw dossier** / ⟨FR?⟩, daarna annuleren | "Met Nieuw dossier maakt u een leeg dossier aan. Welke status het begin is, verschilt per kantoor — dus vraagt CreditSoft dat één keer, in plaats van te gokken." | "Avec ⟨FR?⟩, vous créez un dossier vide. Le statut de départ varie d'un bureau à l'autre : CreditSoft le demande une fois, plutôt que de le deviner." |
| 5 | `openen` | `goto /credit-files/${dossier}`, `waitFor` dossierkop | "We openen een bestaand dossier." | "Ouvrons un dossier existant." |
| 6 | `gegevens` | `hold` | "Bovenaan staan de dossiergegevens: de status, het kredietbedrag, de instelling en de datums van indiening en ingang." | "En haut se trouvent les données du dossier : le statut, le montant du crédit, l'institution et les dates d'introduction et d'entrée en vigueur." |
| 7 | `aanvragers` | `tab('Kredietaanvragers', ⟨FR?⟩)` | "Onder Kredietaanvragers staan alle aanvragers van dit dossier, met hun gegevens en hun rol." | — |
| 8 | `pand` | `tab('Pand', ⟨FR?⟩)` | "Het pand draagt het adres, de aard en de waarde — en die waarde bepaalt mee de quotiteit." | — |
| 9 | `documenten` | `tab(/Gevraagde documenten/)` ⚠️ niet via `tab()`: dat label draagt een teller | "Bij Gevraagde documenten volgt u per stuk of het aangeleverd is en of het al beoordeeld werd." | "Dans Documents demandés, vous suivez pièce par pièce ce qui a été fourni et ce qui a déjà été évalué." |
| 10 | `journaal` | journaalknop rechtsboven, dan `adm-section-switch-btn` → Commissieschema's | "Elk dossier draagt zijn eigen journaal: taken, notities, gesprekken, mailverkeer — en de commissieschema's." | "Chaque dossier porte son propre journal : tâches, notes, appels, courrier — et les schémas de commission." |
| 11 | `slot` | `hold` op de dossierkop | "Eén dossier, één pagina. Wat uitbetaald is, blijft." | "Un dossier, une page. Ce qui a été payé, reste." |

**Merktekens per scène** (zelfde vorm als `VERWACHT`, zie §5): 3 → `/Kenmerk aanbr|Référence apporteur/i`, 4 → `/Beginstatus|⟨FR?⟩/i`, 9 → `/Ontvangen|Reçu/i`, 10 → `/Herberekenen|Recalculer/i`.

---

## 5. De beloftecontrole geldt óók voor films

De regel uit `beelden.mjs` blijft ongewijzigd gelden: **staat de belofte niet op het scherm, dan wordt er niet geschreven.** Voor een film betekent dat: een scène waarvan het merkteken ontbreekt, laat de **hele film** vallen, met de scènenaam in het verslag.

⚠️ Harder dan bij beelden, en met reden. Een fout beeld tussen 175 is een fout beeld. Een foute scène in een film van elf zit middenin een verhaal dat verder gewoon doorloopt — en dat merkt niemand bij het nakijken.

De alt-teksten zijn hier niet bruikbaar als specificatie, want een scène is geen beeld. Elke scène krijgt dus een **handgeschreven** merkteken. Dat is werk, en het is de reden waarom er vijftien films komen en geen zestig.

---

## 6. Verouderen en hernemen

1. Na elke ronde schrijft de generator `tools/.films-uitslag.json`: per film en per taal de Bunny-GUID, plus een hash over `{route, broncode van de scènehandelingen, narratie}`.
2. Wijkt de hash af, dan is de film **verouderd** en wordt hij hernomen.
3. ⚠️ En de regel die de beeldgenerator op 28/08 geleerd heeft, geldt hier dubbel: **de zijbalk staat in élke film**. Verandert het menu, dan zijn ze allemaal verouderd, ook al wijzigde er aan het scenario niets. De hash moet dus ook de versie van de applicatie dragen — of er moet minstens een `films.mjs --alles` bestaan die alles herneemt.
4. Een film die zijn beloftecontrole niet haalt, wordt niet gepubliceerd en blijft op de vorige versie staan. Een verouderde film is beter dan een foute.

---

## 7. Publicatie — Bunny Stream

**Beslist op 30/08/2026: Bunny Stream is de bestemming van de pijplijn. YouTube valt weg**, ook als etalage — niet in dit traject.

⚠️ **WAAROM NIET YOUTUBE.** Uit hun eigen helppagina: *"You can't replace a video. Any new video you upload to YouTube will get a new URL."* Onze films zijn build-output die bij elke schermwijziging hernomen wordt. Op YouTube betekent elke herneming dus een nieuwe URL: dode links in verstuurde mails, gebookmarkte pagina's die nergens op uitkomen, kijkcijfers die telkens op nul beginnen, en abonnees die bij elke release een melding krijgen. YouTube gaat ervan uit dat een video een blijvend werkstuk is; bij ons is het een artefact van een build. Een etalage, geen bibliotheek — en dit is een bibliotheek.

### 7.1 Opzet

- **Eén video library per product** (nu enkel CreditSoft; CleanOps en Nimble later). Aparte libraries betekenen aparte API-sleutels en aparte toegang — dezelfde scheiding als tussen de repo's.
- Binnen de library **een collection per taal** (`nl-BE`, `fr-BE`), zodat een taalronde in één keer te overzien is.
- Titel van de video = filmnaam + taal. Niet sierlijk maar eenduidig; de sierlijke titel staat in de handleiding, niet in de bibliotheek.

### 7.2 De embed

Een `iframe` naar `https://player.mediadelivery.net/embed/{libraryId}/{guid}` (de exacte host staat in de bibliotheekinstellingen), in een houder met `padding-top: 56.25%` voor 16:9.

Parameters die we zetten: `captions` op de paginataal, `showSpeed`, `rememberPosition`. De film komt **boven de eerste `##`** van de pagina; de lezer kiest zelf kijken of lezen. Plaatsing via een MkDocs-hook op **filmnaam**, met de taal uit de bestandsnaam (`.md` of `.fr.md`) — nooit met de hand per pagina.

⚠️ Bunny's speler zet **geen cookies**. Dat is geen prettige bijkomstigheid maar een reden op zich: een YouTube-embed sleept een toestemmingsbanner over de hele handleiding mee, en dit niet.

### 7.3 Hoofdstukken en ondertitels — gratis uit de scènelijst

Bunny Stream ondersteunt hoofdstukken. Wij hebben ze al: elke scène heeft een **titel** (de scènenaam) en een **starttijd** (de som van de audioduren ervóór — die kennen we, want geluid stuurt beeld, zie §3.1). De generator zet ze mee via de API. Dat is de navigatie waar een handleidingkijker echt iets aan heeft, en ze kost ons niets.

Idem voor ondertitels: de `.vtt` per taal rolt uit dezelfde narratie. Uploaden via de captions-endpoint, standaard uit.

### 7.4 Vervangen zonder de link te breken

De API scheidt twee stappen: eerst een video-object aanmaken (`POST .../videos`, levert een GUID), dan het bestand ernaartoe sturen (`PUT .../videos/{guid}`). Opnieuw PUT'en naar dezelfde GUID hoort dus het bestand te vervangen met behoud van de embed.

⛔ **GEMETEN OP 01/09/2026, EN HET ANTWOORD IS NEE.** Een tweede `PUT` naar dezelfde GUID wordt geweigerd:

```
400 — {"success":false,"message":"The video has already been uploaded."}
```

De proef: video-object aanmaken, de Nederlandse film (97 s) erheen sturen, wachten tot Bunny klaar was met verwerken, en dan de Franse (104 s) naar diezelfde GUID. De GUID bleef gelijk — **en dat bewijst niets**, want een upload die niets doet laat de GUID óók gelijk. De **lengte** bleef op 96 s staan, en dát is het bewijs dat er niets vervangen is. Hun eigen documentatie noemt die 400 als verwachte foutcode maar legt niet uit wanneer ze optreedt; enkel de proef gaf uitsluitsel.

**Gevolg: de indirectie is geen luxe maar de dragende constructie.** Een hernomen film krijgt onvermijdelijk een NIEUWE GUID. Daarom:

1. Bij een herneming maakt de generator een **nieuw** video-object aan en uploadt daarheen.
2. Hij schrijft de nieuwe GUID in `.films-uitslag.json` onder `filmnaam + taal`.
3. Hij **verwijdert de oude video**. Zonder die stap groeit de library bij elke ronde met vijftien video's per taal, en na een half jaar staat er niemand meer die weet welke de echte is.
4. De MkDocs-hook leest die tabel bij het bouwen, dus de handleiding wijst altijd naar de actuele film.

**Wat daardoor wél veroudert:** een embed-URL die iemand met de hand uit de handleiding kopieerde en in een mail plakte. Dat is de prijs, en ze is te dragen — de handleiding zelf klopt altijd. Wie een blijvende link nodig heeft, verwijst naar de handleidingpagina en niet naar de speler.

En bouw hoe dan ook de **indirectie**, zodat het antwoord er niet toe doet: de handleiding verwijst nooit naar een GUID maar altijd naar een **filmnaam**. `.films-uitslag.json` vertaalt filmnaam + taal → GUID, en de hook leest dat bij het bouwen. Werkt vervangen, dan wijzigt er niets. Werkt het niet, dan krijgt de film een nieuwe GUID en klopt de handleiding nog steeds vanzelf — enkel een extern gedeelde link veroudert. Zo hangt het ontwerp niet aan één onbevestigd detail.

### 7.5 Wat er niet gebeurt

- **Geen eigen speler.** Die van Bunny doet adaptieve kwaliteit, mobiel, ondertitels, snelheid en hoofdstukken. Zelf bouwen levert niets op.
- **Geen mp4 in git.** `docs/images/` draagt 175 PNG's en dat gaat nog; vijftien films in twee talen niet. Enkel de verwijzing in de repo.
- **Geen YouTube-upload in de pijplijn.** Als er later een etalagekanaal komt, is dat een aparte, handmatige stap voor een geselecteerde lijst — nooit een automatische publicatie bij elke herneming.

---

## 8. Wat naar de AppKit gaat

Dezelfde afweging als bij `kern.mjs` op 29/08: het generieke deel hoort in `adm-appkit/tools/filmgenerator/`, zodat CleanOps en Nimble het niet opnieuw moeten leren.

**Naar de AppKit:** de cursor-inspuiting, de audio-eerst-tijdsturing, de montage met ffmpeg, de intro/outro, de Bunny-client (uploaden, vervangen, hoofdstukken, ondertitels), het verslag, het uitslagbestand.
**Blijft hier:** `FILMS`, de routes, de `ID`-tabel, de merktekens, en de library-ID. Dat hangt aan onze eigen schermen.

---

## 9. Faseplan

⚠️ **HERZIEN OP 01/09/2026, op voorstel van Dominique.** De oude volgorde maakte eerst álle films en
publiceerde pas daarna. Dan ontdek je pas na dertig mp4's dat publicatie iets terugvraagt aan de manier van
maken. Deze dag heeft dat twee keer bewezen: de beloftecontrole en het lege demo-journaal kwamen allebei pas
boven toen het écht draaide. Daarom nu **één keten helemaal aflopen** vóór er wordt vermenigvuldigd.

### Fase 1 — één film, van opname tot op de site ✅ **AF op 01/09/2026**

`kredietdossiers-basis` in NL en FR, opgenomen, gepubliceerd, en zichtbaar op de handleidingpagina.

| Eis | Stand |
|---|---|
| Twee mp4's, identiek beeldmateriaal, juiste UI-taal | ✅ NL 96 s · FR 104 s, elk 11 scènes |
| Zichtbare cursor | ✅ nagemeten op een filmbeeld |
| Beeld en geluid synchroon zónder montagestap | ✅ mét ritme, zie §3.1 |
| Eigen Belgische stemmen | ✅ Christian Brison (nl) · Christophe Géradon (fr) |
| Vervangproef §7.4 | ✅ uitgevoerd — antwoord: **vervangen kan niet** |
| Geüpload mét ondertitels en hoofdstukken | ✅ `bunny.mjs publiceer` |
| Op de handleidingpagina, in beide talen | ✅ hook `hooks/films.py`, gemeten in de browser: hij speelt |

**Wat de keten onderweg leerde** — alle drie dingen die je bij vijftien films vijftien keer zou betalen:

1. **Hoofdstukken kunnen pas ná het verwerken.** Meteen na de upload geeft Bunny
   `400 Chapter is out of bounds of the video`: de video heeft dan nog lengte 0. Ondertitels hebben er geen
   last van, die worden wél meteen aanvaard.
2. **`films-uitslag.json` moet ÍN git.** Ze stond eerst in `.films-uit/`, en die map is genegeerd omdat
   mp4's niet in git horen. De MkDocs-hook leest die tabel bij het bouwen; zonder haar bouwt de site
   zwijgend zonder films.
3. **De tabel wordt samengevoegd, niet overschreven.** Draai je één film, dan mogen de guids van de andere
   veertien niet verdampen. Bewezen met een nepregel die de ronde moest overleven.

### Fase 2 — de veertien andere films
Scenario per film schrijven (NL+FR), demo-data nakijken, opnemen, publiceren. De machinerie ligt er.
**Klaar wanneer:** één commando alle films in beide talen rendert en publiceert, met een verslag dat élke
film in precies één uitslaglijst plaatst — dezelfde eis als bij de beelden.

⚠️ **Reken per film op demo-werk.** Elke film is in werkelijkheid een volledigheidstoets op de demo: film 1
had een dossier nodig met én een journaal én gevraagde documenten in alle drie de toestanden, en dat bestond
niet. Verwacht hetzelfde bij de documentketen, de restanten en het aanbrengersportaal.

### Fase 3 — verouderen en hernemen
De hashcontrole uit §6 aan een commando hangen, zodat een wijziging aan één scherm precies de films
markeert die dat scherm tonen. De hash staat al in de tabel; wat ontbreekt is de vergelijking.

⚠️ **Wat hier NIET meer bij hoort:** het generieke deel naar de AppKit tillen (§8). Die staat sinds
24/08/2026 in de vriezer. Dat is een aparte beslissing van Dominique en geen fase.


## 10. Buiten scope

Commerciële video's (3 à 5, kortere montage, muziek — later te knippen uit ditzelfde beeldmateriaal) en YouTube in elke vorm.

⚠️ **De stem valt hier niet volledig buiten.** Het *aanschaffen* van het account en het kiezen van de stem is werk voor Dominique (§11.1); het *inbouwen* is werk voor de pijplijn en is één functie van zes regels — `spreek()` roept vandaag macOS `say` aan en morgen een API. Hier stond tot 31/08/2026 "het ElevenLabs-account en de stemmen" zonder dat onderscheid, wat §11.1 tegensprak.

---

## 11. Wat Dominique nog moet doen

1. ~~**De stem kiezen.**~~ ✅ afgehandeld op 01/09/2026 — zie de stand bij fase 1.
   Oorspronkelijk: Standaard Nederlandse TTS klinkt Hollands; voor Vlaamse makelaars valt dat op. Eigen stem klonen (ElevenLabs, vanaf ± $6/maand mét commerciële licentie) of een gekochte stem. Idem voor Belgisch-Frans. Let op twee dingen: dat het plan een **commerciële licentie** draagt, en dat je Vlaams en Belgisch-Frans krijgt — een gekochte standaardstem geeft dat laatste meestal niet.
   ⚠️ **Doe dit ná het ritme, niet ervoor.** Het ritme is nu op de plaatshouder-stemmen afgeregeld en goedgekeurd (31/08/2026). Wie beide tegelijk wijzigt, weet achteraf niet welke van de twee hielp.
2. ~~**Bunny-account en video library aanmaken**~~ ✅ afgehandeld op 01/09/2026: library `creditsoft`
   (id 741183), één regio, geen replicatie. De library-sleutel en het id staan in user-secrets onder
   `Bunny:ApiKey` en `Bunny:LibraryId`.
   ⚠️ De ACCOUNT-sleutel is daarbij overschreven door de library-sleutel. Wil je account-breed beheer
   (een library voor CleanOps of Nimble), zet die dan opnieuw én onder een andere naam.
3. **De selectie maken.** Welke vijftien films, volgens de regel uit §1: geen referentiepagina's.

---

## 12. VOORSTEL — drie luiken, één pijplijn (01/09/2026, nog niet besloten)

Dominique wil het filmwerk uitbreiden van de handleiding naar **drie** bestemmingen: de handleiding, de
website, en later social media. Dit hoofdstuk beschrijft hoe dat kan zonder drie generatoren te krijgen die
uit elkaar lopen. **Het is een voorstel, geen beslissing.**

### 12.1 De kern: één scenario, meerdere uitvoeringen

Wat de drie delen delen is het **scenario** — de route, de handelingen, het merkteken per scène. Dat is ook
het duurste stuk om te maken en te onderhouden: het breekt bij elke schermwijziging.

Wat verschilt is de **uitvoering**: duur, geluid, ondertitels, beeldverhouding, bestemming.

```js
['kredietdossiers-basis', {
  pagina: 'credit-management/credit-files',
  scenes: [ /* … het bestaande scenario, ongewijzigd … */ ],

  uitvoeringen: {
    handleiding: { talen: ['nl-BE','fr-BE'], stem: true,  ondertitels: 'beschikbaar', doel: 'bunny' },
    website:     { talen: ['nl-BE','fr-BE'], stem: false, ondertitels: 'ingebrand',   doel: 'bunny',
                   scenes: ['lijst','openen','gegevens','documenten','slot'] },   // een SELECTIE
  },
}],
```

Een uitvoering kiest **welke scènes** ze gebruikt en **hoe** ze klinkt. De scènes zelf blijven één bron.

⚠️ **Waarom een selectie en geen aparte scènelijst:** een websitefilm die eigen scènes heeft, verouderd
apart en breekt apart. Een selectie uit dezelfde lijst erft elke reparatie.

### 12.2 De website vraagt een ANDER soort film, geen kortere

**Elke browser start video gedempt.** Wie niet klikt, hoort niets. Onze pijplijn is precies andersom
gebouwd — het beeld wácht op de zin (§3.1). Voor de website moet het beeld de boodschap dragen.

| | handleiding | website |
|---|---|---|
| duur | 90–100 s | 30–45 s |
| geluid | draagt het verhaal | mag ontbreken |
| ondertitels | standaard **uit** | **ingebrand** of standaard aan |
| kijker | gebruiker die iets zoekt | bezoeker die twijfelt |

Concreet in de pijplijn: de tijdsturing van §3.1 blijft, maar bij `stem: false` komt de **narratie als tekst
in beeld** en bepaalt een leessnelheid de scèneduur in plaats van een audiofragment. De rest — cursor,
merktekens, montage, upload — verandert niet.

### 12.3 ⚠️ De website heeft DRIE talen, de app TWEE

`creditsoft-website` draagt `nl`, `fr` én `en` (11 pagina's per taal). De app spreekt enkel `nl-BE` en
`fr-BE` — `Program.cs` zet `AdmLocalisatie.Opties("nl-BE", "fr-BE")`. Een Engelse film zou dus een
Nederlandstalig scherm tonen.

Drie eerlijke keuzes: geen Engelse film · Engelse ondertitels over Nederlands beeld · de Engelse pagina de
Nederlandse film geven. **Voorstel: het tweede.** Voor een productdemo ís het scherm het product, en een
Engelstalige bezoeker die een Nederlands scherm ziet weet meteen wat hij koopt.

### 12.4 Waar de film op de website komt

De site is Astro met gedeelde componenten en dunne routes per taal; teksten lopen via
`useTranslations(lang)`. Een film toevoegen is dus **één component plus één regel in de vertaaltabel** —
hetzelfde patroon als de MkDocs-hook, en even goed te onderhouden.

Bunny zet geen cookies, dus geen toestemmingsbanner. Op een verkooppagina weegt dat zwaarder dan op een
handleiding.

⚠️ **Niet enkel de hero.** Op `functionaliteit` en `van-bezoeker-tot-klant` staat iemand die al
geïnteresseerd is; daar overtuigt een film meer dan bij een bezoeker die net binnenkomt.

### 12.5 Social: het lastigste, en niet om een technische reden

Verticaal 9:16 van een **desktoptoepassing** ziet er niet uit: onze opname is 1920×1080 en een verticale
uitsnede toont een reepje. CreditSoft heeft geen mobiele weergave om op terug te vallen.

Werkbare kaders: vierkant met het scherm in een band en tekst erboven · inzoomen op één zone (de
beeldgenerator kan al element-uitsnedes) · het scherm in een laptopkader.

Maar het echte werk is **redactioneel**: social vraagt een haak in de eerste twee seconden. Dat valt niet te
automatiseren, en daarom hoort dit luik laatst.

### 12.6 Voorgestelde volgorde

1. ~~Franse handleidingfilm hernemen~~ ✅ gedaan 01/09/2026
2. **Eén** websitefilm end-to-end — het geluidloze formaat bouwen, op de homepage, in drie talen
3. Pas dan de rest van de website, en de selectie voor de handleiding
4. Social als laatste, met een bewuste keuze van het kader

⚠️ Punt 2 is met opzet één film en geen vijf. Dat werkte bij de handleiding: hoofdstukken-vóór-verwerking,
de uitslagtabel in git, en de audiocache waren alle drie dingen die we bij vijftien films vijftien keer
betaald zouden hebben.

---

## 13. Synchroon houden — de kaart route → artefact

**Dominique's regel (01/09/2026).** Een aanpassing in het product vraagt vijf controles, in deze volgorde:

1. de zijlade + vertalingen · 2. de documentatie + vertalingen · 3. de screenshots · 4. de video's ·
5. de eventuele impact op de website — de website is **het laatst**.

**Wat de deploy-poort al bewaakte** (achttien controles, gemeten op 01/09): punt 1 door `HelpEnVertaling`,
`NlFr` en `SchermVertaling`; punt 2 door `Handleiding`, `HandleidingVers` en `HandleidingRedirects`. Punt 3
maar half — `AfbeeldingMarkeringen` toetst alt-teksten, niets meldde dat een beeld VEROUDERD was. Punten 4
en 5: niets.

**Wat er nu is:** `tools/raakt.mjs`.

```
node tools/raakt.mjs /credit-files          → wat toont dit scherm
node tools/raakt.mjs --gewijzigd HEAD~3     → wat is verouderd door de wijzigingen sinds die ref
```

Hij **leidt af en onderhoudt niets**: `SCHOTEN` in `beelden.mjs` kent per beeld zijn route, de scènes in
`films.mjs` dragen hun `goto`, en `CreditSoftHelpProvider` koppelt een app-route aan een documentatiepagina.
Een handgeschreven vierde lijst zou met alle drie uit de pas lopen.

⚠️ **Drie dingen die het bouwen ervan leerde, alle drie gevonden door een meting:**

- **Een ijkpunt per bron.** De eerste versie herkende 22 beelden waar er 91 zijn — mijn patroon kende alleen
  `['naam', '/route']` en niet de vormen met een recept of met een template-literal. Zonder ondergrens had
  het gereedschap vrolijk "niets geraakt" gemeld over een scherm dat op tien plaatsen staat.
- **Een parameterroute telt op haar statische deel.** `@page "/credit-files/{Id:guid}"` is hetzelfde scherm
  als het beeld dat `/credit-files/${ID.dossier}` fotografeert. Zonder afkappen viel juist het dossierdetail
  erbuiten — het scherm waar de meeste films omheen draaien.
- **"Niets gevonden" is geen "in orde".** Hij meldt óók welke gewijzigde schermen hij bekeek en die nergens
  getoond worden. Zonder die regel weet je niet of het scherm nergens staat, of dat de kaart het niet zag.

⚠️ **Wat hij NIET kan.** Een gewijzigd COMPONENT (`.razor` zonder eigen `@page`) verschijnt óp schermen, en
welke is uit de code niet af te leiden zonder de hele componentboom te volgen. Hij meldt die apart in plaats
van ze stil over te slaan — juist een gedeeld component raakt véél beelden tegelijk.

### 13.1 De verouderingscontrole — `verouderd.mjs` (01/09/2026)

`raakt.mjs` zegt *wat* een scherm toont. `verouderd.mjs` zegt of dat artefact nog **actueel** is.

```
node tools/verouderd.mjs           → het verslag
node tools/verouderd.mjs --kort    → enkel de namen, om aan een generator te voeren; exitcode 1 bij verouderd
```

**Het merkteken is een commit-SHA, geen versienummer.** Een versiebump zegt niets over of een scherm bewoog
— vandaag ging v1.70 naar v1.74 terwijl de meeste schermen stillagen. Met een SHA wordt "verouderd" een
git-vraag: welke `.razor`-bestanden zijn sindsdien gewijzigd, en zit de route van dit artefact daarbij.

Beide generatoren schrijven dat merkteken nu mee: `beelden.mjs` in `tools/beelden-uitslag.json` (route +
SHA per beeld), `films.mjs` in `films-uitslag.json` (de routes uit de scènes zélf + SHA).

⚠️ **Drie dingen die het bouwen leerde:**

- **"Onbekend" is geen "in orde".** Een artefact zonder merkteken is van vóór deze meting. Het verslag telt
  dat apart, want anders leest een oude ronde als een gecontroleerde ronde.
- **De filmroutes moeten uit de SCÈNES komen.** Eerst leidde ik ze af uit de paginanaam; dat viel toevallig
  goed uit voor `kredietdossiers-basis`, maar een overzichtsfilm die acht schermen toont hééft geen pagina en
  zou nul routes gehad hebben.
- **Een `catch` die stil `null` teruggeeft, liegt.** Mijn eerste `appToestand()` gaf `{sha: null}` omdat de
  import van `execFileSync` ontbrak — het zag eruit alsof git niet bestond. Nu meldt hij de reden.

⚠️ **Wat deze controle NIET ziet:** een gewijzigd component zonder eigen `@page`. Dat verschijnt óp schermen,
en welke is uit de code niet af te leiden. Hij meldt ze apart in plaats van ze stil over te slaan.

### 13.2 Melden, niet tegenhouden — en waar de melding landt

**Beslist door Dominique op 01/09/2026:** een verouderd beeld of film **blokkeert geen deploy**. Het is
cosmetisch; erop tegenhouden is irritanter dan nuttig. `verouderd.mjs` geeft daarom exitcode **0**, en enkel
met `--streng` geeft hij 1 — voor wie hem in een script tóch als poort wil gebruiken.

⚠️ **Maar een melding die niemand leest is niets waard**, en dat is het echte risico van deze keuze. Ze hoort
daarom in het deploy-ritueel en niet in een logbestand:

```
node tools/verouderd.mjs        # vóór elke push die een scherm geraakt heeft
```

Dat staat ook in het geheugen van de sessie, zodat het niet van iemands aandacht afhangt. Loopt hij groen,
dan is er niets te doen; meldt hij iets, dan is hernemen één commando per generator.

---

## 14. DE SELECTIE — welke films, en in welke volgorde (01/09/2026)

§9 fase 2 zei "de veertien andere films" zonder te zeggen wélke. Hier staat het, want een keuze die alleen
in een gesprek leeft, is bij de volgende sessie weg.

**De regel uit §1 toegepast:** een film toont een **weg**, geen scherm. Daarom is de indeling hieronder niet
de inhoudstafel van de handleiding — verschillende pagina's zitten in één film omdat ze samen één taak zijn,
en verschillende pagina's zitten in géén enkele film omdat je ze opzoekt in plaats van bekijkt.

**De volgorde is die waarin een nieuwe gebruiker ze tegenkomt**, niet die waarin ze gemaakt worden. Film 4
bestaat al; dat een latere film eerst gemaakt is, verandert niets aan waar hij hoort.

| # | film | dekt | duur |
|---|---|---|---|
| 1 | `aan-de-slag` | navigatie · lijsten · voorkeuren · mijn-gegevens | 120 s |
| 2 | `relaties` | crm/relations | 150 s |
| 3 | `leads` | crm/leads · leads-webformulier | 150 s |
| 4 | `kredietdossiers-basis` ✅ | credit-management/credit-files | 97 s |
| 5 | `documentketen` | klantportaal · document-validation · document-library | 180 s |
| 6 | `journaal` | journaal/overzicht · gesprekken · taken · bijlagen · mailverkeer | 150 s |
| 7 | `afspraken` | crm/meetings · online-afspraken | 150 s |
| 8 | `aanbrengers` | crm/contributors · het aanbrengersportaal | 150 s |
| 9 | `commissie-instellen` | commission-schemes · financial-institutions | 120 s |
| 10 | `commissie-uitbetalen` | commission-statements · commission-forecast · restanten | 180 s |
| 11 | `fiche-281-50` | credit-management/fiche-281-50 | 90 s |
| 12 | `verzekeringen` | insurance-contracts · insurance-companies | 120 s |
| 13 | `dashboard` | getting-started/dashboard · beheer/dashboard-fases | 120 s |
| 14 | `lijsten-en-rapporten` | filteren-in-lijsten · reports · global-overview | 150 s |
| 15 | `mailketen` | kantoorprofiel · sender-addresses · mailverkeer | 120 s |
| 16 | `klantenportaal` | portaal/index · portaal/overzicht — dóór de ogen van de klant | 120 s |

### Wat er BEWUST buiten valt, en waarom
`keuzelijsten` · `documenttypes` · `rollen` · `company-profile` · `professionals` · `appraisals` ·
`afwezigheden` · `contract-overview` · `logboek` — dat zijn referentie- en beheerpagina's. Je opent ze om
één ding op te zoeken en sluit ze weer. §1 noemt ze expliciet slechte filmkandidaten, en een film die een
veldenlijst voorleest is trager dan de lijst zelf lezen.

⚠️ **Buiten de film betekent niet buiten de handleiding.** Die pagina's blijven staan en blijven in de
beeldronde. Wie ze schrapt omdat er geen film bij hoort, haalt de verkeerde conclusie uit deze tabel.

### ⚠️ Reken per film op demo-werk
Dat is geen bijwerking maar de tweede opbrengst: een film is in de praktijk een volledigheidstoets op de
proefgegevens, en die vond op 31/08 drie keer een gat dat de tests niet zagen. Films 5, 8, 10 en 16 zijn de
verdachten — die hangen aan ketens waar de demo dun is (aangeleverde documenten in álle toestanden, een
aanbrenger mét portaaltoegang, restanten die écht restant zijn, een klant met een lopende uitnodiging).

