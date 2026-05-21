# Interface-overzicht

Deze pagina geeft een rondleiding door de hoofdonderdelen van CreditSoft. U leert hoe het hoofdscherm is opgebouwd en hoe u snel uw weg vindt.

## De hoofdonderdelen

Het CreditSoft-venster bestaat uit drie hoofdzones:

1. **Sidebar (links)** — uw belangrijkste navigatiemiddel.
2. **Hoofdwerkruimte (midden)** — hier opent u dossiers, schermen en rapporten.
3. **Statusbalk / koptekst** — toont de huidige context en sneltoegankelijke acties.

!!! info "TODO"
    Screenshot van het hoofdscherm met genummerde aanduidingen van deze drie zones.
    Plaatsen in `docs/images/interface-overzicht.png`.

![Hoofdscherm CreditSoft](/images/interface-overzicht.png)

## De sidebar

De sidebar groepeert alle functies in logische secties. Bron: `uSidebarStyling.pas`, functie `GetCreditSoftSidebar`.

| Sectie | Inhoud |
|---|---|
| **Bovenaan** | Dashboard, Kredietdossiers, Taken |
| **CRM** | Bedrijven, contacten, accountants, immokantoren, notarissen, schatters, panden |
| **Kredieten** | Dossier-overzichten, commissiebeheer, tussenpersonen, financiële instellingen |
| **Werk** | Telefoons, agenda, archief, groepsmail |
| **Portaal** | Nieuwsbeheer voor tussenpersonen en klanten |
| **Beheer** | Bedrijfsprofiel, instellingen, stamgegevens, personeel |
| **Onderaan** | Mijn profiel, supportticket, info, sessie afsluiten |

## Sidebar inklappen en uitklappen

!!! info "TODO"
    Beschrijf hoe de gebruiker secties in de sidebar opent en sluit
    (groepen klikken om uit te klappen).

## Lichte en donkere modus

CreditSoft ondersteunt een **lichte** en **donkere** themamodus.

1. Klik op het zon-/maan-icoon rechtsboven in de sidebar.
2. Het thema wisselt onmiddellijk en blijft bewaard voor uw volgende sessie.

## Sneltoetsen

!!! info "TODO"
    Inventariseer sneltoetsen uit de Delphi-code (zoek naar `ShortCut`,
    `Action` met `ShortCut` properties in .dfm bestanden).

| Sneltoets | Functie |
|---|---|
| [TODO] | [TODO] |

## Volgende stap

Bekijk het [dashboard](dashboard.md) om te zien welke informatie u meteen na aanmelden te zien krijgt.
