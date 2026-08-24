# Leads vanaf uw website

<!-- Bewust GEEN afbeelding. Deze pagina beschrijft een koppeling, geen scherm: wat de makelaar ziet is de
     gewone leadlijst, en die staat al op leads-lijst.png. Een schermafdruk van een contactformulier toont
     bovendien de website van een klant, of een verzonnen site die niets bewijst. -->

Het contactformulier van uw website kan zijn inzendingen rechtstreeks in CreditSoft zetten. Wie het formulier invult, staat binnen de minuut in uw [leadlijst](leads.md) — zonder dat iemand een mailbox moet uitpluizen of iets moet overtypen.

!!! info "Dit wordt per kantoor aangezet"
    De koppeling werkt niet vanzelf: er is een **websitesleutel** voor nodig, en die vraagt u aan bij ADM-Concept. Zolang die er niet is, verandert er niets aan hoe uw formulier vandaag werkt.

## Hoe het werkt

1. Een bezoeker vult het contactformulier op uw website in.
2. Het formulier stuurt die vraag door, met uw websitesleutel erbij.
3. CreditSoft maakt er een lead van, in uw eigen omgeving.

De lead draagt het tijdstip waarop de **bezoeker** het formulier indiende — niet het moment waarop CreditSoft hem oppikte. De kolom *Wacht al* klopt dus vanaf de eerste seconde.

## De websitesleutel

De sleutel is wat uw formulier herkenbaar maakt. Twee dingen om te weten:

**U vraagt er één per formulier aan.** Hebt u een contactformulier op uw hoofdsite én een aparte campagnepagina, vraag dan twee sleutels. Elke sleutel krijgt een naam — bijvoorbeeld *contactformulier hoofdsite* en *campagne najaar* — en die naam wordt de **bron** van elke lead die er binnenkomt.

**Daardoor klopt uw bronrapportering.** In de leadlijst ziet u per lead uit welk formulier hij kwam, en dus welk kanaal u klanten oplevert. Dat werkt alleen omdat de bron uit de sleutel komt en niet uit wat het formulier meestuurt: zo kan een verkeerd ingestelde pagina uw cijfers niet vertekenen.

Een sleutel kan **ingetrokken** worden zonder de andere te raken. Een campagne stopzetten laat uw hoofdsite dus met rust.

## Voor de bouwer van uw website

De technische beschrijving — waar het formulier naartoe post, welke velden meekunnen, hoe de sleutel meegegeven wordt — staat op één plaats en wordt daar bijgehouden:

**[platform.digitalcloud.be/docs/leads-contactformulier](https://platform.digitalcloud.be/docs/leads-contactformulier){ target=_blank }**

Stuur die **link** door aan uw webbouwer, en niet een kopie van de tekst. Een doorgestuurd document veroudert stil in een mailbox; de pagina toont altijd wat er nú geldt.

De **websitesleutel** geeft u apart mee. Die hoort niet in een e-mail met de rest van de uitleg te staan.

## Wie krijgt er bericht?

Standaard: **niemand**. De leads komen gewoon in de lijst terecht, en wie die elke ochtend opent, heeft niets meer nodig.

Wilt u wél een mail zodra er iemand aanklopt, dan stelt u dat in bij **Platformbeheer → Communicatie → Leadmeldingen**. Vul daar één of meer e-mailadressen in, gescheiden door een puntkomma.

!!! tip "Een gedeelde bus is vaak beter dan één persoon"
    `info@kantoor.be` blijft werken wanneer iemand met verlof is. Eén naam in dat veld betekent dat er twee weken lang niemand kijkt.

**Wat er in dat bericht staat** — wie het is, wat hij vroeg, via welk formulier hij binnenkwam, en een link die de lead meteen opent — past u aan bij de [mailsjablonen](../administration/mail-templates.md). Zoek daar het sjabloon *Nieuwe lead via de website*.

Op datzelfde scherm stelt u ook het **dagelijkse bericht** in over leads die blijven liggen — zie [Het dagelijkse bericht](leads.md#het-dagelijkse-bericht).

Twee dingen die bewust zo werken:

- **Voegt u zelf een lead toe** in het scherm, dan volgt er géén mail. U staat er op dat moment al naar te kijken, en een melding over iets wat u net zelf deed, leert u meldingen wegklikken.
- **Stelt dezelfde persoon een tweede vraag**, dan krijgt u wél bericht, maar met de vermelding dat ze bij een bestaande lead gezet is. Anders zou u een nieuwe rij zoeken die er niet is.

## Wat er in de lead terechtkomt

| Op de leadfiche | Waar het vandaan komt |
|---|---|
| **Naam** | het naam-veld van uw formulier, ongesplitst |
| **Bedrijf**, **E-mail**, **Telefoon** | de overeenkomstige velden |
| **Vraag** | het onderwerp, het bericht, en alle overige velden van uw formulier |
| **Bron** | de naam van de websitesleutel |
| **Herkomst** | de pagina waarop het formulier stond |

!!! tip "Uw eigen formuliervelden gaan niet verloren"
    Vraagt uw formulier bijvoorbeeld naar het aantal m² of naar hoe iemand u gevonden heeft, dan komen die antwoorden mee onderaan het veld *Vraag*. U hoeft uw formulier dus niet aan te passen aan CreditSoft.

## Dezelfde persoon die twee keer invult

Dat blijft **één lead**. CreditSoft herkent hem aan zijn e-mailadres of telefoonnummer en hangt de nieuwe vraag onder de bestaande, met de datum erbij — precies zoals bij een lead die u zelf toevoegt. Zie [Leads](leads.md#een-lead-toevoegen).

Ook een dubbele verzending van het formulier zelf — iemand die twee keer op *Verzenden* klikt — levert maar één lead op.

## Als er niets binnenkomt

- **Is de sleutel al aangevraagd en ingesteld?** Zolang die er niet is, komt er niets door.
- **Post het formulier naar het juiste adres?** Dat staat op de pagina voor uw webbouwer.
- **Kijk in de leadlijst op *Alle statussen*.** Een lead van iemand die al klant is, kan bij een bestaande lead gezet zijn in plaats van als nieuwe rij te verschijnen.

Komt u er niet uit, neem dan contact op met ADM-Concept: aan onze kant is zichtbaar of uw formulier iets ingestuurd heeft en wat ermee gebeurd is.
