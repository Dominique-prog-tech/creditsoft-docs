# De machinerie: een gedeelde BROWSERLAAG, geen filmtooling

⚠️⚠️ **De naam van dit mapje is misleidend, en dat is gemeten (07/09/2026 door de AppKit-sessie).** Dit
bestand heette *"de machinerie van de filmtooling"* en dat klopt niet: `browser.mjs` bestuurt de AppKit-schil
en DevExpress, `aansturing.mjs` leest geheimen en meldt aan. **Geen van beide weet wat een film is.**

Dat verschil bepaalt waar dit hoort te landen. Zou het als `filmgenerator/` verhuizen, dan zoekt de volgende
die schermafdrukken automatiseert daar niet, vindt niets, en **kopieert** — precies de fout waar dit bestand
zelf voor waarschuwt met het playbook (224 regels tegen 478). En die tweede consument bestaat al:
`adm-nimble/docs/tools/gen-screenshots.mjs`, 63 KB.

📋 **Er is al precedent:** `adm-appkit/tools/beeldgenerator/` (`kern.mjs`, 277 regels, met test en README),
en onze eigen `beelden.mjs` roept die al aan. ADM One's voorstel aan Dominique is `tools/schermmachinerie/`
ernaast — op de naam van wat het **doet**, niet van wie het als eerste nodig had. De beslissing is van
Dominique; dit bestand vooruitloopt daar niet op.



*Geknipt op 06/09/2026, in opdracht van Dominique. Waarom, staat in
`adm-creditsoft/docs/uniformiteit-drie-platformen.md` §"Video's".*

CreditSoft is vandaag het enige pakket met films: 34 video's, veertien handleidingfilms in NL en FR plus
twee website-teasers. Nimble en CleanOps hebben er nul. Zodra daar de eerste film gemaakt wordt, is de
vraag: kopiëren we deze map, of delen we ze?

**Kopiëren is de fout die deze vloot al gemaakt heeft** — het playbook liep uiteen tot 224 regels tegen
478. Deze knip zorgt dat delen later een *verplaatsing* is en geen ontleding.

## Wat waar hoort

| bestand | wat | verhuist mee? |
|---|---|---|
| `machinerie/browser.mjs` | de browser besturen: bewegen, klikken, tabblad, zijlade, afspraakblok | **ja** |
| `machinerie/aansturing.mjs` | geheimen lezen, aanmelden, de toestand van de app | **ja** |
| `../app.mjs` | **wat CreditSoft is**: poort, klant, proefgegevens, paden | nee — elk pakket het zijne |
| `../draaiboek.mjs` | **wat er verteld wordt**: 15 films, 142 scènes, NL/FR/EN | nee — idem |
| `../aansturing.mjs` | de koppellaag tussen die twee | nee, maar wel bijna leeg |
| `../films.mjs` | de motor: geluid, opname, montage, verslag | ja, op termijn |

De regel: **`machinerie/` bevat geen enkele keer het woord CreditSoft.** Dat is te meten, en de meting
staat hieronder.

## Het contract tussen draaiboek en motor

Het draaiboek roept precies **zes** dingen aan uit de machinerie. Alle zes hangen aan de **AppKit-schil**
en aan DevExpress — niet aan kredietdossiers — en werken dus meteen bij Nimble en CleanOps:

```
beweegNaar   klik   kopbalkKnop   tabblad   sluitLade   zichtbareAfspraak
```

⚠️ **Groeit die lijst, dan groeit het contract.** Elke nieuwe naam erin is een reden om te vragen of het
ding werkelijk gedeeld is, of dat het in het draaiboek van één pakket thuishoort.

## Hoe je bewijst dat een verbouwing niets veranderd heeft

```bash
node tools/films.mjs --inhoud > /tmp/voor.json    # vóór
# … verbouwen …
node tools/films.mjs --inhoud | diff /tmp/voor.json -
```

`--inhoud` drukt het hele draaiboek af — namen, talen, koppen, teksten, merktekens **en de broncode van
elke `doe`-functie**. Identiek = het draaiboek is onaangeroerd.

⚠️ **Het bewijst niet dat een opname nog lukt.** Daarvoor is er maar één controle, en dat is een film
draaien. Bij de knip van 06/09 ging dat één keer mis: `raakt.mjs` las de scènes uit `films.mjs` als
tekst, en die stonden er niet meer. De A/B-vergelijking zag het niet — beide versies lazen hetzelfde lege
bestand. Wat het wél ving, was dat `raakt.mjs` zijn eigen oogst natelt en bij 0 films **weigert te
antwoorden** in plaats van "niets geraakt" te melden.

## Wat nog niet geknipt is

- **`../bunny.mjs`** (698 regels) is gemengd: de Bunny Stream-API is generiek, maar het commando
  `naar-website` schrijft naar `creditsoft-website` en zet `product: 'CreditSoft'`. Die knip is niet
  gedaan omdat het commando pakketeigen is en er geen tweede pakket is om tegen te toetsen.
- **`../beelden.mjs`** (1174 regels) is beeldtooling, geen film. Eigen ronde.
- De bestanden staan nog in `tools/` in plaats van in `machinerie/`, omdat verplaatsen 22 opgeschreven
  commando's raakt (waaronder `FILMS-SPEC.md` en `hooks/films.py`) voor nul winst vandaag.

## Twee dingen die al beslist zijn (06/09/2026)

- **Dezelfde stemmen voor alle drie de pakketten.** De voice-id's zijn dus overal dezelfde waarde; elke
  repo leest ze uit zijn eigen user-secrets.
- **Eén Bunny-account, een aparte video library per pakket.** `LibraryId` verschilt dus per repo, en de
  API-sleutel hoort bij díé library.
