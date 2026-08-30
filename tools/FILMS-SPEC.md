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

Dit is de kern van het geheel. **Eerst** de voice-over genereren, per scène één audiofragment, de duur meten. **Dan** opnemen, waarbij elke scène exact zolang duurt als haar fragment. Synchronisatie wordt zo een eigenschap van de pijplijn en geen montagestap — en daarom is er geen montagestap.

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

1. Na elke ronde schrijft de generator `tools/.films-uitslag.json`: per film en per taal de URL, plus een hash over `{route, broncode van de scènehandelingen, narratie}`.
2. Wijkt de hash af, dan is de film **verouderd** en wordt hij hernomen.
3. ⚠️ En de regel die de beeldgenerator op 28/08 geleerd heeft, geldt hier dubbel: **de zijbalk staat in élke film**. Verandert het menu, dan zijn ze allemaal verouderd, ook al wijzigde er aan het scenario niets. De hash moet dus ook de versie van de applicatie dragen — of er moet minstens een `films.mjs --alles` bestaan die alles herneemt.
4. Een film die zijn beloftecontrole niet haalt, wordt niet gepubliceerd en blijft op de vorige versie staan. Een verouderde film is beter dan een foute.

---

## 7. Publicatie

- De film komt **boven de eerste `##`** van de bijhorende pagina. De lezer kiest: kijken of lezen.
- Via een MkDocs-hook op filmnaam, met taalkeuze uit het bestand (`.md` of `.fr.md`). Niet met de hand per pagina.
- Ondertitels als `.vtt`, per taal — de tekst bestaat al, dus dat is gratis. Standaard uit.
- ⚠️ **Geen mp4 in git.** `docs/images/` draagt 175 PNG's en dat gaat nog; vijftien films van 30 MB in twee talen niet. Object storage of Vimeo, enkel de verwijzing in de repo.

---

## 8. Wat naar de AppKit gaat

Dezelfde afweging als bij `kern.mjs` op 29/08: het generieke deel hoort in `adm-appkit/tools/filmgenerator/`, zodat CleanOps en Nimble het niet opnieuw moeten leren.

**Naar de AppKit:** de cursor-inspuiting, de audio-eerst-tijdsturing, de montage met ffmpeg, de intro/outro, het verslag, het uitslagbestand.
**Blijft hier:** `FILMS`, de routes, de `ID`-tabel, de merktekens. Dat hangt aan onze eigen schermen.

---

## 9. Faseplan

### Fase 1 — één film, end-to-end
`kredietdossiers-basis` in NL en FR. Montage mag met de hand, alles daarvóór niet.
**Klaar wanneer:** twee mp4's bestaan met identiek beeldmateriaal, correcte UI-taal, zichtbare cursor, en beeld en geluid synchroon zonder bijsturing. Dominique heeft ze goedgekeurd.

### Fase 2 — generaliseren
Cursor, tijdsturing en montage naar de AppKit. De resterende films schrijven en opnemen.
**Klaar wanneer:** één commando alle films in beide talen rendert, met een verslag dat élke film in precies één uitslaglijst plaatst — dezelfde eis als bij de beelden.

### Fase 3 — inbedden en hernemen
Hook, uitslagbestand, hashcontrole, koppeling aan de publicatiestroom.
**Klaar wanneer:** een gerichte wijziging in één scherm precies de films markeert die dat scherm tonen, en enkel die herneemt.

---

## 10. Buiten scope

Commerciële video's (3 à 5, kortere montage, muziek — later te knippen uit ditzelfde beeldmateriaal), het ElevenLabs-account en de stemmen, de videohosting.

---

## 11. Wat Dominique nog moet beslissen

1. **De stem.** Standaard Nederlandse TTS klinkt Hollands; voor Vlaamse makelaars valt dat op. Eigen stem klonen (ElevenLabs, vanaf ± $6/maand mét commerciële licentie) of een gekochte stem. Idem voor Belgisch-Frans.
2. **Waar de films staan.** Eigen object storage of Vimeo/YouTube.
3. **Welke vijftien.** De selectie uit §1 is nog niet gemaakt.
