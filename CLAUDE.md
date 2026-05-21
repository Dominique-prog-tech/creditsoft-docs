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
- **Alt-text altijd beschrijvend** (niet alleen "screenshot")

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
- Naar afbeeldingen: absoluut vanaf docs-root
  (bv. `![Login](/images/login.png)`)

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

## Pagina-template

```markdown
# [Naam van het scherm]

[Eén alinea: wanneer en waarom gebruikt een makelaar dit scherm.]

## Het scherm openen

[Hoe navigeer je hier in CreditSoft — via welke menu-actie.]

## Velden en functies

[Per veld of sectie een korte uitleg.]

## Veelgemaakte fouten

!!! warning
    [Wat gaat vaak fout, en hoe vermijd je dat.]

## Zie ook

- [Gerelateerde pagina](relatief-pad.md)
```

## Wat NIET doen

- Geen functionaliteit verzinnen die niet in de source staat.
- Geen tone-of-voice imiteren van Amerikaanse SaaS-docs ("Awesome!", "You're
  all set!"). Belgisch-professioneel, ingetogen.
- Geen Engels mixen met Nederlands behalve voor vaktermen die in het
  vakgebied courant Engels zijn.
- Geen "the system will…" formuleringen. Actief: "U klikt op X, en Y verschijnt."
- Geen lange paragrafen — splits in stappen of lijsten.

## Bij twijfel

- **Twijfel over functionaliteit**: lees de source, of markeer met
  `[TODO: bevestigen]`.
- **Twijfel over schrijfstijl**: kijk naar bestaande afgewerkte pagina's
  in de repo voor referentie.
- **Twijfel over structuur**: blijf bij de hoofdstuk-indeling die hier
  beschreven staat, voeg geen ad-hoc secties toe.
