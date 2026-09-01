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

⚠️ **Bunny documenteert dat niet met zoveel woorden. Ga er niet van uit — meet het in Fase 1:** upload een film, vervang hem, en controleer of de embed-URL dezelfde blijft én het nieuwe beeld toont.

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

### Fase 1 — één film, end-to-end
`kredietdossiers-basis` in NL en FR. Montage mag met de hand, alles daarvóór niet.
**Klaar wanneer:** twee mp4's bestaan met identiek beeldmateriaal, correcte UI-taal, zichtbare cursor, en beeld en geluid synchroon zonder bijsturing. **En:** de vervangproef uit §7.4 is uitgevoerd en het antwoord staat in dit document. Dominique heeft de films goedgekeurd.

**Stand op 01/09/2026 — alles behalve de vervangproef:**

| Eis | Stand |
|---|---|
| Twee mp4's, identiek beeldmateriaal, juiste UI-taal | ✅ NL 97 s · FR 104 s, elk 11 scènes |
| Zichtbare cursor | ✅ nagemeten op een filmbeeld, niet aangenomen |
| Beeld en geluid synchroon zónder montagestap | ✅ en met ritme, zie §3.1 |
| Goedgekeurd | ✅ "klinkt héél goed", "overtuigend" |
| Vervangproef §7.4 | ⛔ **wacht op een Bunny-account** |

**De stemmen** (ElevenLabs, Creator-abonnement, `eleven_multilingual_v2` gepind):
`Christian Brison` voor het Nederlands — Vlaams, en na vergelijking met `Luc` de beste van de twee.
`Christophe Géradon` voor het Frans — Belgisch, gekozen boven `Samuel` op een langer proefstuk.
Beide voice-id's staan in user-secrets, niet in deze repo.

⚠️ **Vergelijk een stem op een REEKS, niet op één zin.** De eerste vergelijking gebeurde op twee zinnen en
gaf geen uitsluitsel; op vijf zinnen achter elkaar — mét een opsomming en een zin vol datums — was het
verschil meteen hoorbaar. Een handleidingfilm is een reeks van elf zinnen, geen zin.

### Fase 2 — generaliseren
Cursor, tijdsturing en montage naar de AppKit. De resterende films schrijven en opnemen.
**Klaar wanneer:** één commando alle films in beide talen rendert, met een verslag dat élke film in precies één uitslaglijst plaatst — dezelfde eis als bij de beelden.

### Fase 3 — inbedden en hernemen
Bunny-upload, hoofdstukken, ondertitels, de hook, het uitslagbestand, de hashcontrole.
**Klaar wanneer:** een gerichte wijziging in één scherm precies de films markeert die dat scherm tonen en enkel die herneemt, en de handleidingpagina daarna de nieuwe film toont **zonder handmatige tussenkomst** — mét hoofdstukken en ondertitels.

---

## 10. Buiten scope

Commerciële video's (3 à 5, kortere montage, muziek — later te knippen uit ditzelfde beeldmateriaal) en YouTube in elke vorm.

⚠️ **De stem valt hier niet volledig buiten.** Het *aanschaffen* van het account en het kiezen van de stem is werk voor Dominique (§11.1); het *inbouwen* is werk voor de pijplijn en is één functie van zes regels — `spreek()` roept vandaag macOS `say` aan en morgen een API. Hier stond tot 31/08/2026 "het ElevenLabs-account en de stemmen" zonder dat onderscheid, wat §11.1 tegensprak.

---

## 11. Wat Dominique nog moet doen

1. ~~**De stem kiezen.**~~ ✅ afgehandeld op 01/09/2026 — zie de stand bij fase 1.
   Oorspronkelijk: Standaard Nederlandse TTS klinkt Hollands; voor Vlaamse makelaars valt dat op. Eigen stem klonen (ElevenLabs, vanaf ± $6/maand mét commerciële licentie) of een gekochte stem. Idem voor Belgisch-Frans. Let op twee dingen: dat het plan een **commerciële licentie** draagt, en dat je Vlaams en Belgisch-Frans krijgt — een gekochte standaardstem geeft dat laatste meestal niet.
   ⚠️ **Doe dit ná het ritme, niet ervoor.** Het ritme is nu op de plaatshouder-stemmen afgeregeld en goedgekeurd (31/08/2026). Wie beide tegelijk wijzigt, weet achteraf niet welke van de twee hielp.
2. **Bunny-account en video library aanmaken**, en de API-sleutel doorgeven. Opslag vanaf $0,01/GB, streaming vanaf $0,005/GB, geen minimum — bij deze aantallen een paar euro per maand.
3. **De selectie maken.** Welke vijftien films, volgens de regel uit §1: geen referentiepagina's.
