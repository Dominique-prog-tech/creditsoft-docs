# Commissiebarema

Het barema is wat de maatschappijen uw kantoor betalen per afgesloten krediet: het percentage, de grenzen, de voorwaarden en het ritme waarin ze uitbetalen. CreditSoft rekent daarmee de commissie van een dossier voor, verdeelt ze over het aanbrengende kantoor en het hoofdkantoor, en berekent wat een maatschappij terugvraagt als een krediet vroeger eindigt.

Werkt uw kantoor niet met een barema, dan laat u dit scherm leeg. U ziet dan nergens een voorstel.

## Het scherm openen

Ga naar **Platformbeheer** onderaan het menu, en klik onder *Krediet* op de tegel **Commissiebarema**. U hebt daarvoor het recht om de commissie-instellingen te beheren.

![Het scherm Commissiebarema met de lijst van versies: per regel de naam Commissiebarema 2026, de datum Geldig vanaf 01/01/2026, het aantal regels en maatschappijen, en het label Geldt nu; bovenaan de knop Nieuwe versie en de link Inlezen uit een bestand.](../images/commissiebarema-versies.png "De versies van het barema van uw kantoor"){ .volle-breedte }

## Versies

Een barema verandert een paar keer per jaar. Elke wijziging is een nieuwe **versie** met een datum **Geldig vanaf**. Een versie geldt voor de dossiers met een **aktedatum** vanaf die datum, tot de volgende versie begint. Heeft een dossier nog geen akte, dan telt de indieningsdatum, en anders vandaag.

Zo rekent een dossier van vorig jaar met het barema van vorig jaar, ook nadat u een nieuwe versie hebt ingevoerd. Het label **Geldt nu** staat bij de versie die vandaag geldt.

### Een nieuwe versie

Klik op **Nieuwe versie**. U geeft een naam en de datum *Geldig vanaf*. Bij **Op basis van** kiest u een vorige versie: alle regels gaan dan mee, ook de trappen van de rentekorting en de terugvordering, en u past enkel aan wat wijzigde. Kiest u **Leeg beginnen**, dan voert u alle regels zelf in.

### Een versie inlezen uit een bestand

Krijgt u het barema als lijst van tientallen regels, dan hoeft u ze niet een voor een in te tikken. Met **Inlezen uit een bestand** bovenaan de lijst leest u een volledige versie in één keer in.

1. Geef de versie een **naam** en een datum **Geldig vanaf**.
2. Klik op **Bestand kiezen** en kies het csv-bestand. CreditSoft toont hoeveel regels, maatschappijen en producten erin staan. Ontbreekt er een kolom, dan staat die er met haar naam bij.
3. **Koppel** elke maatschappij uit het bestand aan een kredietinstelling van uw kantoor. Staat er een product bij een regel, kies dan de producten waarvoor ze geldt, of vink **Elk product** aan. CreditSoft koppelt niets zelf, ook niet als de naam gelijk lijkt.
4. Kijk het **voorbeeld** na: per regel de kredietinstelling, de commissie, de commissieafstand, de terugvordering en wat er niet klopt. Met **Enkel regels met een probleem** ziet u enkel die regels.
5. Klik op **Inlezen**.

Inlezen gebeurt in één keer: lukt één regel niet, dan wordt er niets bewaard. Ontbreekt er nog iets, dan zegt de melding bovenaan wat. Daarna opent de nieuwe versie, en wijzigt u er een regel zoals elke andere.

![De pagina Barema inlezen uit een bestand: bovenaan de naam en de datum Geldig vanaf van de nieuwe versie, daaronder het gekozen bestand met het aantal regels, maatschappijen en producten, het blok Koppelen aan uw kantoor met per maatschappij een kredietinstelling en per product de producten of het vinkje Elk product, en onderaan het voorbeeld met het label klaar om in te lezen.](../images/commissiebarema-inlezen.png "Een versie inlezen uit een bestand"){ .volle-breedte }

#### Het bestand

Een csv-bestand met een **puntkomma** tussen de kolommen en een kopregel met de namen hieronder. Elke kolom moet er staan, ook als ze leeg blijft; andere kolommen (bijvoorbeeld een kolom met opmerkingen) mogen erbij. Eén regel per maatschappij, of per formule.

| Kolom | Wat | Voorbeeld |
|---|---|---|
| `nr` | Volgnummer; bepaalt de volgorde | `12` |
| `maatschappij`, `formule`, `product` | De naam zoals in het barema; die koppelt u bij het inlezen | `Record` |
| `percentage` of `vast_bedrag` | De commissie | `2,25` · `1000` |
| `min_commissie`, `max_commissie`, `plafond_kredietbedrag` | Grenzen | `10000` |
| `looptijd_vanaf_mnd`, `looptijd_tot_mnd`, `rente_vanaf`, `rente_tot` | Voorwaarden ("vanaf" telt mee, "tot" niet) | `84` |
| `ingediend_van`, `ingediend_tot`, `akte_van`, `akte_tot` | Datums (beide tellen mee) | `15/09/2026` |
| `uitbetaling_direct_pct`, `uitbetaling_spreiding_mnd`, `uitbetaling_spreiding_vanaf_mnd` | Deel direct, rest gespreid | `50` · `24` · `2` |
| `uitbetaling_gepland` | Geplande betalingen: maand en deel | `1:50 | 12:25 | 24:25` |
| `afstand_trappen` | Rentekorting: afstand / korting, eventueel een voorwaarde | `0,25/0,15; 0,50/0,20` |
| `terugvordering_trappen` | Per trap, gescheiden door een verticale streep: binnen hoeveel maanden · percentage of prorata · uitbetaald of upfront · deel · pro rata over hoeveel maanden. Trappen scheidt u met een puntkomma | `24|percentage|upfront|50|` |
| `stop_spreiding` | Vervalt de gespreide commissie? | `ja` of `nee` |
| `terugvordering`, `info` | Toelichting en ter info, als tekst | |

Getallen schrijft u met een **komma** en **zonder** duizendtalpunt (`1250000`, niet `1.250.000`), datums als dd/mm/jjjj.

Klik in de lijst op een versie om haar regels te zien. Daar wijzigt u de naam, de datum en de opmerkingen, en met **Verwijderen** haalt u een versie weg. De dossiers waarvan de akte in die versie viel, rekenen dan met de vorige.

![Een versie van het barema: bovenaan de naam, de datum Geldig vanaf en de opmerkingen, daaronder de regels met per regel de maatschappij, de formule, de commissie, de voorwaarden, de uitbetaling en de commissieafstand — Record met 2,25 % en drie trappen, VSW met Formule A en Formule B, en Allianz.](../images/commissiebarema-versie.png "Eén versie met haar regels"){ .volle-breedte }

## Een regel

Een regel is één maatschappij, of één **formule** van een maatschappij die er meer heeft (bijvoorbeeld *Formule A* en *Formule B*). Met **+ Regel toevoegen** maakt u er een; dubbelklik een regel om ze te wijzigen.

![De pagina van een regel, onderaan: de uitbetaling door de maatschappij met 50 % direct en de rest gespreid over 24 maanden vanaf maand 2, daaronder het blok Rentekorting door commissieafstand met drie trappen en wat de commissie telkens wordt, en het blok Terugvordering bij vervroegde terugbetaling of opeising met het vinkje voor de gespreide commissie en één trap: binnen 24 maanden 50 % van het upfront-deel.](../images/commissiebarema-regel.png "Een regel met commissieafstand en terugvordering")

### Maatschappij en formule

- **Maatschappij** — de kredietinstelling, zoals op het dossier.
- **Formule** — enkel als de maatschappij meer regels heeft. Laat leeg als er maar één is.
- **Producten** — de producten waarvoor deze regel geldt. Een contract met zo'n product kiest deze regel dan zelf. Laat leeg om de regel voor elk product te laten gelden.

### De commissie

Kies **Percentage van het krediet**, **Vast bedrag** of **Ter info**.

- **Percentage** — van het kredietbedrag. Met *Gerekend op hoogstens* begrenst u het bedrag waarop gerekend wordt (bijvoorbeeld 1.000.000).
- **Vast bedrag** — één bedrag per krediet, ongeacht het kredietbedrag.
- **Minimum** en **maximum commissie** — grenzen op het resultaat.
- **Ter info** — de regel rekent niet; ze staat er voor wie het barema naleest. "Geen commissie" is een percentage van 0.

### Voorwaarden

Laat leeg wat niet telt. Een regel geldt enkel als **alle** ingevulde voorwaarden kloppen; ontbreekt een gegeven op het dossier (bijvoorbeeld de looptijd), dan geldt de regel niet.

- **Looptijd** en **rentevoet** — "vanaf" telt mee, "onder" niet. "Meer dan 7 jaar" is *vanaf 84 maanden*, "minder dan 7 jaar" is *onder 84*.
- **Indieningsdatum** en **aktedatum** — beide datums tellen mee.

### Uitbetaling door de maatschappij

Het ritme waarin de maatschappij uw kantoor betaalt. De commissieschema's van het kantoor en het hoofdkantoor volgen hetzelfde ritme.

- **Volgens de kredietinstelling** — het patroon op de fiche van de kredietinstelling.
- **Deel direct, rest gespreid** — een percentage de maand na de akte, de rest over een aantal maanden.
- **Geplande betalingen** — per betaling de maand na de akte en het deel. Samen 100 %.

### Rentekorting door commissieafstand

Bij sommige maatschappijen krijgt de klant een lagere rente als u een deel van uw commissie laat vallen. Elke **trap** zegt hoeveel punten commissie u afstaat en hoeveel punten rentekorting de klant krijgt. De kolom *Commissie wordt* toont wat er van het percentage overblijft.

- Voer een trap altijd in als **afstand in punten**, ook als de maatschappij een schaal toont. Toont ze *1,75 %* naast een basis van 2,25 %, dan is dat een afstand van 0,50.
- Heeft een trap een voorwaarde die u niet kan aanvinken (bijvoorbeeld *bij een eerste woning*), schrijf ze dan in **Voorwaarde**.
- Een trap bewaart **meteen**, los van de knop *Bewaren* onderaan. Een nieuwe regel bewaart u eerst; daarna voegt u de trappen toe.

Op het dossier kiest u daarna de afstand: zie [Kredietdossiers](../credit-management/credit-files.md#voorstel-volgens-het-barema).

### Terugvordering bij vervroegde terugbetaling of opeising

Wat de maatschappij terugvraagt als een krediet vroeger eindigt.

- **De nog niet betaalde gespreide commissie vervalt** — vink aan als de maatschappij de rest van de spreiding niet meer betaalt.
- **Trappen** — per trap: *binnen hoeveel maanden* na de akte, en hoe er gerekend wordt.
    - **Percentage** van **het uitbetaalde** (alles wat al betaald is) of van **het upfront-deel** (de eerste betaling).
    - **Pro rata** over een aantal maanden: het deel dat nog niet "verdiend" is gaat terug. De maand van de terugbetaling telt als niet verdiend.

"Binnen 12 maanden" telt op de datum: terugbetaald vóór de aktedatum plus 12 maanden. De eerste trap waarbinnen de terugbetaling valt, geldt. Geen trappen en geen vinkje betekent: geen recuperatie.

Wat niet te rekenen valt, zoals een terugvordering bij niet opgenomen kapitaal, schrijft u onderaan in **Terugvordering — toelichting**.

## Veelgemaakte fouten

!!! warning "Een barema met twee regels die allebei passen"
    Passen twee regels op hetzelfde krediet (bijvoorbeeld twee formules zonder product), dan kiest CreditSoft niet zelf. Op het dossier verschijnt dan *kies de formule*. Koppel producten aan de regels als u dat wil vermijden.

!!! warning "Een afstand groter dan het percentage"
    Een trap van 2,50 op een regel van 2,25 % wordt geweigerd. Kijk na of u de afstand of het nieuwe percentage invulde.

!!! warning "Een getal met een duizendtalpunt in het bestand"
    `1.250.000` wordt bij het inlezen geweigerd, met de kolom en de waarde erbij. Schrijf `1250000`. Zo leest CreditSoft nooit stil een ander getal dan u bedoelde.

## Zie ook

- [Kredietdossiers — het voorstel volgens het barema](../credit-management/credit-files.md#voorstel-volgens-het-barema)
- [Te bevestigen commissies](../credit-management/commission-to-confirm.md)
- [Te bevestigen terugvorderingen](../credit-management/commission-clawback.md)
- [Commissie-instellingen](commissie-instellingen.md)
