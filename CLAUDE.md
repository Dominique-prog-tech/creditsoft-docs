# Context voor Claude — CreditSoft Documentatie

Deze file leid je telkens wanneer je in deze repo werkt. Lees hem voor je begint.

## Doel van deze repo

De officiële handleiding van **CreditSoft**, gepubliceerd op
<https://docs.creditsoft.be>.

CreditSoft is een Delphi-platform voor **kredietmakelaars** (mortgage- en
consumentenkrediet) in België. Het ondersteunt het volledige werkproces:
CRM, kredietdossiers, commissie-administratie, agenda, mail, beheer.

## Doelpubliek

**Kredietmakelaars die het platform afnemen** — externe klanten die CreditSoft
gebruiken om hun eigen klanten en kredietdossiers te beheren.

Dit zijn **professionals in financiële dienstverlening**, niet IT-developers.
Ze kennen het vakgebied (LOA, SSV, akte, schatting) maar zijn niet
noodzakelijk technisch onderlegd.

### Implicaties voor schrijfstijl
- **U-vorm**, professioneel maar toegankelijk.
- **Korte zinnen**, één gedachte per zin.
- **Vakjargon mag**, maar leg domein-overstijgende termen kort uit
  (en verwijs naar de begrippenlijst voor diepere uitleg).
- **Geen IT-jargon** (geen "API", "database", "syntax" zonder context).
- **Concreet en actiegericht**: "Klik op X", "Vul Y in", niet "Het systeem
  zal het volgende doen…".

## Bronnen op deze machine

### Delphi-source (read-only)
- **Pad**: `D:\@newProjects\platform-creditsoft-delphi\`
- **Repo**: ADM-Concept/platform-creditsoft-delphi (private)
- **Autoritieve bron** voor: schermen, velden, validaties, foutmeldingen,
  bedrijfsregels, menu-structuur.

**Bij elk docs-onderwerp: lees relevante .pas/.dfm bestanden eerst.**
Verzin nooit functionaliteit — als de source iets niet bevestigt, markeer
het met `[TODO: bevestigen met source of gebruiker]`.

### Belangrijke regel rond Delphi-source
**NOOIT** de Write of Edit tool gebruiken op `.pas` of `.dfm` bestanden.
Deze hebben Windows-1252/ANSI encoding en zouden beschadigen op andere
omgevingen (zoals macOS). Alleen Read is toegestaan in deze repo.

Source-aanpassingen gebeuren door de gebruiker in RAD Studio, niet door
Claude.

## Sleutel-source-bestanden om te raadplegen

| Vraag over... | Lees... |
|---|---|
| Menu-structuur, sidebar | `uSidebarStyling.pas` — functie `GetCreditSoftSidebar` |
| Hoofdvenster, hoofdform | `Main.pas` / `Main.dfm` |
| Login-flow | `Login.pas` / `Login.dfm` |
| Data-laag, database-toegang | `MainModule.pas` / `MainModule.dfm` |
| Specifieke module | `Modules\<ModuleName>\*.pas` en `*.dfm` |
| Database-schema | `database-schema.sql` |
| Globale constants/enums | `ProjectConstants.pas` |

## Modulestructuur (matchend met sidebar van het platform)

De docs-navigatie volgt **één-op-één de sidebar** die de gebruiker ziet:

1. **Aan de slag** — installatie, eerste aanmelding, interface
2. **Kredietdossiers** — kern van het platform (dossier-workflow)
3. **CRM** — bedrijven, contacten, accountants, immokantoren, notarissen,
   schatters, panden
4. **Kredieten-beheer** — commissieschemas, tussenpersonen, fin. instellingen,
   verzekeringsmaatschappijen, schattingen, rapporten
5. **Taken** — takenbeheer
6. **Werk** — telefoons, agenda, archief, groepsmail
7. **Beheer** — bedrijfsprofiel, instellingen, stamgegevens, personeel
8. **Gebruiker** — profiel, supportticket, sessie afsluiten
9. **Concepten** — begrippenlijst, workflow-overzicht

### Wat NIET te documenteren
- **`Modules\Rental\` en `Modules\Inventory\`**: verouderde modules,
  worden verwijderd uit de source. Niet documenteren.
- **Portaal-module**: nog in ontwikkeling. Later toevoegen, niet in v1.

## Vaktermen die uitleg verdienen

Deze termen komen vaak voor en horen in `docs/concepten/begrippenlijst.md`:

- **LOA** (Letter of Acceptance / Toezeggingsbrief)
- **SSV** (waarschijnlijk Sociale Schuldenvergelijking of Schuldsanering — bevestigen)
- **Akte** (notariële akte bij hypothecair krediet)
- **Tussenpersoon** (kredietbemiddelaar, niet hetzelfde als accountant of makelaar)
- **Schatter / schatting** (vastgoedschatter, waarderingsdocument)
- **Pand** (vastgoed dat als zekerheid dient)
- **Kredietdossier** (volledig dossier van aanvraag tot opvolging na akte)
- **Commissieschema** (afspraken over commissie-uitbetaling per tussenpersoon)

## Terminologie — consistent gebruiken

- "klant" (eindklant van de makelaar) — niet "debiteur"
- "kredietnemer" (degene die het krediet aanvraagt)
- "tussenpersoon" — niet "intermediair" of "agent"
- "dossier" / "kredietdossier" — niet "file" of "case"
- "schermen" of "vensters" — niet "forms" of "schermafbeeldingen voor de UI"

## Conventies voor docs

### Bestandsstructuur
- `docs/` — alle markdown-pagina's
- `docs/images/` — alle screenshots (PNG, beschrijvende bestandsnamen)
- Map- en bestandsnamen: **kleine letters, koppeltekens, geen accenten**
  (bv. `kredietdossiers/nieuw-dossier-aanmaken.md`)

### Screenshots
- Formaat: PNG voor UI met tekst, JPG voor foto's
- Resolutie: max 1920px breed
- Compressie: via ImageOptim voor publicatie
- **Claude maakt de beelden zelf** met `docs/tools/gen-screenshots.mjs` in de app-repo, **altijd uit de
  demo-tenant** — nooit uit kredietunie of WAVE, want die dragen echte klantnamen en deze site is publiek.
- **Per taal een eigen beeld** zodra er tekst op staat, en op een schermafbeelding is dat altijd zo.
  Bestandsnamen blijven Nederlands; het Franse beeld krijgt het achtervoegsel `-fr`
  (`kredietinstellingen-lijst.png` / `kredietinstellingen-lijst-fr.png`).

#### Alt-tekst is verplicht — bij élke afbeelding

Geen `![](…)`, geen `![screenshot](…)`. De vorm is altijd:

```markdown
![Beschrijf wat er te zien is, in een volle zin.](../images/bestand.png "Korte titel bij het beeld")
```

Waarom dit niet optioneel is:
- **Toegankelijkheid** — een schermlezer leest de alt-tekst voor; zonder tekst bestaat het beeld niet.
- **Vindbaarheid (SEO)** — zoekmachines lezen de alt-tekst, niet het beeld.
- **Laadt het beeld niet**, dan blijft de alt-tekst staan. Die zin moet op zichzelf iets zeggen.

Regels:
- Schrijf de alt-tekst **in de taal van de pagina** (NL op de NL-pagina, FR op de FR-pagina).
- Beschrijf **wat er te zien is en welke waarden erin staan** — concrete labels en getallen, niet
  "schermafbeelding van het scherm". Wat je opschrijft is precies wat een lezer mist zonder het beeld.
- De **title** (tussen aanhalingstekens) is de korte samenvatting; die verschijnt als tooltip.

### Markdown-conventies
- Eén `# H1` per pagina (de paginatitel).
- Gebruik `## H2` voor hoofdsecties, `### H3` voor subsecties.
- Lijsten: `-` voor bullets, `1.` voor genummerd.
- Code/inline-waarden: backticks zoals `` `Knop Opslaan` ``.

### Admonitions (Material-syntax)
- `!!! tip` — handige hints voor gevorderde gebruikers
- `!!! warning` — waarschuwingen voor de gebruiker
- `!!! info` — algemene context, achtergrond
- `!!! danger` — kritische waarschuwingen (data-verlies, irreversibele acties)
- `!!! note` — neutrale aantekeningen

### Links
- Tussen pagina's: relatieve paden met `.md` extensie
  (bv. `[Zie tussenpersonen](../crm/contacten.md)`)
- Naar afbeeldingen: **relatief** vanaf de pagina (vanuit `docs/credit-management/` →
  `![…](../images/bestand.png)`). Blijft ook werken als de site ooit onder een subpad draait.
  ⚠️ Hier stond tot 15/08/2026 "absoluut vanaf docs-root", terwijl `BEELD-MANIFEST.md` relatief
  voorschreef. Nu op één lijn: **relatief**.

### Vormgeving — vloot-afspraak

De drie docs-sites (CreditSoft, Nimble, CleanOps) delen één opzet. De afspraak én de drie gemeten
valkuilen staan in **`~/projects/adm-appkit/docs/docs-site-vormgeving.md`** — lees dat vóór je iets aan
de vorm wijzigt, en **stem een wijziging af met de andere twee**.

Kort: merkkleur uit `logo.svg`, header wit in licht en zwart in donker, en drie valkuilen die er alle
drie uitzien alsof alles klopt (een `:root`-regel die niet werkt, een palet dat op twee plaatsen staat,
en meten binnen een seconde na een themawissel). **Niet hier overschrijven — verwijs ernaar.**

## TODO-markers — conventie

Skeleton-pagina's bevatten TODO-blokken in deze vorm:

```markdown
!!! info "TODO"
    Beschrijving van wat hier nog ingevuld moet worden.
    Bron in source: `Modules\Crm\NotariesAdd.pas`
```

Dit maakt visueel duidelijk wat nog onaf is. Wanneer een pagina volledig
af is, verwijder je het TODO-blok.

## Schrijfflow voor een nieuwe pagina

1. **Lees de source** — vind de relevante `.pas` en `.dfm` bestanden.
2. **Begrijp het scherm** — welke velden, welke knoppen, welke validaties.
3. **Schrijf de pagina** volgens de pagina-template hieronder.
4. **Maak screenshot** (gebruiker doet dit op Windows, plaatst in
   `docs/images/`).
5. **Verwijs naar de screenshot** in de tekst.
6. **Lokaal previewen**: `mkdocs serve` op de Mac.
7. **Commit + push** — auto-deploy naar docs.creditsoft.be.

## Een pagina schrijven

Gebruik **`/adm-toolkit:handleiding-schrijven <scherm>`**. Die loopt de hele procedure af: de source
lezen, de pagina-template, NL én FR, de `nav` in `mkdocs.yml`, en de entry in de hulplade van de app.

Daar staan ook de stijlregels die vroeger hier stonden — geen verzonnen functionaliteit, geen
Amerikaanse SaaS-toon, actief formuleren, en zelf geen schermafdrukken plaatsen.

> Tot 15/08/2026 stond die template hier uitgeschreven, en identiek in de twee andere docs-repo's:
> 113 regels die drie keer onderhouden moesten worden. De **schrijfflow** hierboven blijft wél
> repo-eigen — die verschilt echt per platform.
