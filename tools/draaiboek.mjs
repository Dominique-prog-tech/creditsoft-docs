// ── HET DRAAIBOEK VAN CREDITSOFT ─────────────────────────────────────────────────────────────────────────
//
// Wat er verteld wordt, scène per scène, in NL en FR (en voor de websitefilms ook EN). Dit is CREDITSOFT —
// het verhuist niet mee naar een gedeelde plek. Nimble en CleanOps krijgen hun eigen draaiboek naast
// dezelfde motor.
//
// Geknipt uit films.mjs op 06/09/2026, ongewijzigd. Wat een film hier mag dragen, staat in FILMS-SPEC.md.
//
// ⚠️ ALLES WAT HIERONDER AANGEROEPEN WORDT, KOMT UIT DE MACHINERIE. Groeit die lijst, dan groeit het
// contract tussen draaiboek en motor — en dan hoort er een reden bij. Vandaag zijn het er zes.

import { BASIS, ID } from './aansturing.mjs';
import { beweegNaar, klik, kopbalkKnop, tabblad, sluitLade, zichtbareAfspraak } from '/Users/dominique/projects/adm-appkit/tools/schermmachinerie/browser.mjs';

export const FILMS = [
  // ── DE OVERZICHTSFILM VOOR DE HOMEPAGE ───────────────────────────────────────────────────────────────
  //
  // ⚠️ EEN ANDER SOORT FILM, GEEN KORTERE. `kredietdossiers-basis` LEERT iets: hoe je een dossier opent,
  // waar het tabblad Gevraagd zit. Dat is het verkeerde gesprek met iemand die nog niet weet wát CreditSoft
  // is. Deze film POSITIONEERT: één scène per module, landen en één zin, geen doorklikken.
  //
  // Dominique zag dat zelf toen hij naar de eerste websitefilm keek — die was de handleidingfilm met zes
  // scènes eruit, en hij was nog steeds aan het uitleggen.
  //
  // De acht modules zijn die van creditsoft-website zelf (`feat.*.title` in src/i18n/ui.ts), in de volgorde
  // waarin een makelaar erover denkt: eerst het dossier, dan de mensen eromheen, dan het papierwerk, dan wat
  // hij eraan verdient. De teksten zijn VERKOOPTEKST en komen dus niet uit de handleiding — dat is geen
  // tweede bron voor dezelfde zin, het is andere tekst voor een ander publiek.
  //
  // ⚠️ Elk merkteken bewijst DATA, niet enkel het scherm. Een paginatitel verschijnt ook boven een lege
  // lijst, en een marketingfilm van een leeg scherm is erger dan geen film.
  ['creditsoft-overzicht', {
    pagina: null,                                  // hoort op de website, niet op een handleidingpagina
    titel: {
      nl: 'CreditSoft in het kort — een overzicht van de modules',
      fr: 'CreditSoft en bref — les modules en un coup d\u2019\u0153il',
      en: 'CreditSoft at a glance — the modules in brief',
    },
    omschrijving: {
      nl: 'Een kort overzicht van CreditSoft voor kredietmakelaars: kredietdossiers, klanten, documenten, '
        + 'de portalen voor klant en aanbrenger, de commissieberekening, borderellen en fiche 281.50, het '
        + 'vooruitzicht en het beheer van uw kredietverstrekkers.',
      fr: 'Un bref aper\u00e7u de CreditSoft pour les courtiers en cr\u00e9dit : dossiers de cr\u00e9dit, '
        + 'clients, documents, les portails client et apporteur, le calcul des commissions, les bordereaux '
        + 'et la fiche 281.50, la perspective et la gestion de vos pr\u00eateurs.',
      en: 'A short overview of CreditSoft for credit brokers: credit files, clients, documents, the client '
        + 'and intermediary portals, commission calculation, statements and the 281.50 form, the forecast, '
        + 'and managing your lenders.',
    },
    uitvoeringen: {
      // ⚠️ SCHERMTAAL ≠ TEKSTTAAL. De site draagt drie talen, de app maar twee — Program.cs zet
      // AdmLocalisatie.Opties("nl-BE", "fr-BE"). Voor het Engels tonen we dus een Nederlands scherm met
      // ENGELSE tekst in de balk: die tekst komt uit dit scenario en niet uit de app. Bij een geluidloze
      // film is dat de enige weg — ondertitels helpen niet, want de tekst staat ín het beeld.
      website: {
        stem: false,
        talen: [
          { ui: 'nl-BE', tekst: 'nl' },
          { ui: 'fr-BE', tekst: 'fr' },
          { ui: 'nl-BE', tekst: 'en' },
        ],
      },
    },
    scenes: [
      { naam: 'dossiers', kop: { nl: 'Kredietdossiers', fr: "Dossiers de crédit", en: "Credit files" },
        doe: async (p) => { await p.goto(`${BASIS}/credit-files`); await p.waitForLoadState('networkidle'); },
        merk: /DEMO-\d+/,
        nl: 'Alles van \u00e9\u00e9n kredietaanvraag op \u00e9\u00e9n pagina.',
        en: 'Everything about one credit application on a single page.',
        fr: "Tout d'une demande de cr\u00e9dit sur une seule page." },

      { naam: 'klanten', kop: { nl: 'Klanten en relaties', fr: "Clients et relations", en: "Clients and relations" },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); },
        merk: /Adriaenssens|Aerts|Peeters/,
        nl: 'Uw klant, zijn gezin en zijn geschiedenis: \u00e9\u00e9n fiche.',
        en: 'Your client, their family and their history: one record.',
        fr: "Votre client, sa famille et son historique : une fiche." },

      { naam: 'documenten', kop: { nl: 'Documenten', fr: "Documents", en: "Documents" },
        doe: async (p) => { await p.goto(`${BASIS}/krediet/documenten-valideren`); await p.waitForLoadState('networkidle'); },
        merk: /DEMO-\d+/,
        nl: 'Documenten opvragen, ontvangen en beoordelen.',
        en: 'Request, receive and review documents.',
        fr: "Demander, recevoir et \u00e9valuer les documents." },

      { naam: 'portalen', kop: { nl: 'De portalen', fr: "Les portails", en: "The portals" },
        // ⚠️ Het OPMAAKSCHERM en niet het echte portaal. Dat laatste vraagt een aparte aanmelding, en in een
        // doorlopende opname zou het aanmeldscherm in beeld komen. Het voorbeeldpaneel rechts toont het
        // portaal in de huisstijl, mét de voortgang en de documentstatussen — dat is wat de zin belooft.
        doe: async (p) => { await p.goto(`${BASIS}/beheer/klantportaal`); await p.waitForLoadState('networkidle'); },
        merk: /Welkom bij uw dossier|Bienvenue dans votre dossier/,
        nl: 'Uw klanten en aanbrengers leveren zelf aan.',
        en: 'Your clients and brokers upload it themselves.',
        fr: "Vos clients et apporteurs d\u00e9posent eux-m\u00eames." },

      { naam: 'commissies', kop: { nl: 'Commissie', fr: "Commissions", en: "Commissions" },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/schemas`); await p.waitForLoadState('networkidle'); },
        merk: /Sandbox|Baken|Meridiaan|Horizon/,
        nl: 'Commissie berekend zoals u ze afsprak.',
        en: 'Commission calculated exactly as you agreed it.',
        fr: "La commission calcul\u00e9e comme vous l'avez convenue." },

      { naam: 'borderellen', kop: { nl: 'Borderellen', fr: "Bordereaux", en: "Statements" },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/borderel`); await p.waitForLoadState('networkidle'); },
        merk: /Voorbeeld|Demo Krediet|Hypotheek/,
        nl: 'Van berekening tot borderel en fiche 281.50, zonder \u00e9\u00e9n cel Excel.',
        en: 'From calculation to statement and tax form, without a single Excel cell.',
        fr: "Du calcul au bordereau et \u00e0 la fiche 281.50, sans une seule cellule Excel." },

      { naam: 'vooruitzicht', kop: { nl: 'Vooruitzicht', fr: "Prévisions", en: "Forecast" },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/vooruitzicht`); await p.waitForLoadState('networkidle'); },
        merk: /Baken|Meridiaan|Horizon|Proefmakelaars/,
        nl: 'En u ziet vooruit wat er nog binnenkomt.',
        en: 'And you see ahead what is still coming in.',
        fr: "Et vous voyez \u00e0 l'avance ce qui va rentrer." },

      { naam: 'instellingen', kop: { nl: 'Instellingen', fr: "Paramètres", en: "Settings" },
        doe: async (p) => { await p.goto(`${BASIS}/credit/financial-institutions`); await p.waitForLoadState('networkidle'); },
        merk: /AG Insurance|Allianz|Axa/,
        nl: "Uw kredietverstrekkers, met hun eigen schema's.",
        en: 'Your lenders, each with their own commission schemes.',
        fr: "Vos pr\u00eateurs, avec leurs propres sch\u00e9mas." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 1 van de reeks (§14). De film die iederéén als eerste ziet: hoe je je weg vindt.
  //
  // ⚠️ GEEN SCÈNE MET HET BELLETJE, en dat is met opzet. Het belletje toont taken die aan JOU toegewezen
  // zijn (`AchterstalligeTakenMelder.MijnIdsAsync`), en de demo-operator heeft er geen — het paneel zegt
  // "Geen meldingen". Een scène die belooft "hier ziet u uw achterstallige taken" boven een leeg paneel is
  // erger dan geen scène. Het staat wél in navigatie.md; zodra de generator de operator taken toewijst,
  // hoort deze film een scène `belletje` te krijgen. Zie het geheugen: demo-mist-stelselmatig-randgevallen.
  ['aan-de-slag', {
    pagina: 'getting-started/navigatie',
    titel: {
      nl: 'Uw weg vinden in CreditSoft — het scherm, het zoeken en uw voorkeuren',
      fr: 'Se repérer dans CreditSoft — l’écran, la recherche et vos préférences',
    },
    omschrijving: {
      nl: 'De eerste rondleiding: het startscherm met het blok Aan de slag, het menu links, zoeken over uw '
        + 'hele omgeving met ⌘K, de hulp bij elk scherm en de twee assistenten, werken in een lijst '
        + '(sorteren, filteren, exporteren) en uw eigen voorkeuren — grootte, thema en taal.',
      fr: 'La première visite guidée : l’écran d’accueil avec le bloc Pour commencer, '
        + 'le menu de gauche, la recherche dans tout votre environnement avec ⌘K, l’aide sur chaque '
        + 'écran et les deux assistants, le travail dans une liste (trier, filtrer, exporter) et vos '
        + 'préférences — taille, thème et langue.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'start', kop: { nl: 'Het startscherm', fr: "L'écran d'accueil" },
        doe: async (p) => { await p.goto(`${BASIS}/dashboard`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1200); },
        merk: /Aan de slag|Pour commencer/i,
        nl: 'Dit is uw startscherm. Zolang uw omgeving voorbeeldgegevens draagt, staat bovenaan het blok Aan de slag met de drie dingen die u het eerst instelt.',
        fr: "Voici votre écran d’accueil. Tant que votre environnement contient des données d’exemple, le bloc Pour commencer affiche en haut les trois choses à configurer en premier." },

      { naam: 'menu', kop: { nl: 'Het menu links', fr: "Le menu de gauche" },
        doe: async (p) => { await beweegNaar(p, p.locator('nav a, .adm-nav a').first()); await p.waitForTimeout(900); },
        // ⚠️ Dit merkteken matcht óók op de menutekst, en de grendel meldt dat terecht. Hier is het menu
        // het ONDERWERP van de scène, dus er bestaat geen merkteken dat wél iets onderscheidt — het menu
        // staat altijd op het scherm. Bewust laten staan; de melding hoort bij deze scène te blijven.
        merk: /KREDIET|CRÉDIT/i,
        nl: 'Links staat het menu, gegroepeerd zoals u werkt: CRM, Krediet, Lijsten en Beheer. De getallen ernaast zijn wat op u wacht.',
        fr: "À gauche, le menu, groupé comme vous travaillez : CRM, Crédit, Listes et Gestion. Les chiffres à côté indiquent ce qui vous attend." },

      { naam: 'zoeken', kop: { nl: 'Zoeken vanaf elk scherm', fr: "Rechercher depuis tout écran" },
        doe: async (p) => {
          await klik(p, kopbalkKnop(p, /Zoeken|Rechercher/i));
          await p.waitForTimeout(900);
          await p.keyboard.type('Cuypers', { delay: 95 });
          await p.waitForTimeout(2600);
        },
        merk: /Kredietdossiers|Dossiers de crédit/i,
        nl: 'Zoeken doet u overal vandaan, met de knop bovenaan of met Command K. U typt een naam, en CreditSoft zoekt in uw relaties, dossiers, aanbrengers en taken tegelijk.',
        fr: "La recherche est accessible partout, via le bouton en haut ou avec Commande K. Vous tapez un nom et CreditSoft cherche simultanément dans vos relations, dossiers, apporteurs et tâches." },

      { naam: 'hulp', kop: { nl: 'Hulp bij dit scherm', fr: "Aide sur cet écran" },
        doe: async (p) => {
          await sluitLade(p);
          await klik(p, kopbalkKnop(p, /Hulp bij dit scherm|Aide pour cet écran/i));
          await p.waitForTimeout(1800);
        },
        // ⚠️ GEEN APOSTROF IN EEN MERKTEKEN. Hier stond `d’accueil` met een typografische apostrof en de
        // app schrijft `d'accueil` met een rechte — de Franse film viel op zijn eigen beloftecontrole
        // terwijl het scherm perfect klopte. Kies een stuk zin zonder leesteken; dat kan altijd.
        merk: /in welke fase zitten|dans quelle phase/i,
        nl: 'Op elk scherm zit rechtsboven een vraagteken. Dat opent de hulp voor precies dit scherm, niet een algemene handleiding.',
        fr: "Sur chaque écran, un point d’interrogation en haut à droite ouvre l’aide de cet écran précis, et non un manuel général." },

      { naam: 'assistenten', kop: { nl: 'De twee assistenten', fr: "Les deux assistants" },
        doe: async (p) => {
          await sluitLade(p);
          await klik(p, kopbalkKnop(p, /Vraag het de handleiding|Demander au manuel/i));
          await p.waitForTimeout(1800);
        },
        merk: /Hulp-assistent|Assistant d.aide/i,
        nl: 'Komt u er niet uit, dan zijn er twee assistenten: één die de handleiding leest, en één die uw eigen cijfers opzoekt en het antwoord als tabel geeft.',
        fr: "Si vous bloquez, deux assistants existent : l’un lit le manuel, l’autre interroge vos propres chiffres et répond sous forme de tableau." },

      { naam: 'lijst', kop: { nl: 'Werken met lijsten', fr: "Travailler avec les listes" },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1600);
        },
        merk: /Nieuwe relatie|Nouvelle relation/i,
        nl: 'Elke lijst in CreditSoft werkt hetzelfde. Wat u hier leert, geldt ook voor uw dossiers, uw aanbrengers en uw taken.',
        fr: "Toutes les listes de CreditSoft fonctionnent de la même manière. Ce que vous apprenez ici vaut aussi pour vos dossiers, vos apporteurs et vos tâches." },

      { naam: 'sorteren', kop: { nl: 'Sorteren', fr: "Trier" },
        doe: async (p) => { await klik(p, p.locator('th').nth(1)); await p.waitForTimeout(1800); },
        merk: /Naam|Nom/i,
        nl: 'U sorteert door op een kolomkop te klikken. Klikt u nog eens, dan draait de volgorde om.',
        fr: "Vous triez en cliquant sur un en-tête de colonne. Un second clic inverse l’ordre." },

      { naam: 'filteren', kop: { nl: 'Filteren', fr: "Filtrer" },
        doe: async (p) => {
          const z = p.locator('input[type="search"]:visible, input[placeholder*="oek" i]:visible, input[placeholder*="echerch" i]:visible').first();
          await klik(p, z); await z.type('Cuypers', { delay: 90 }); await p.waitForTimeout(2400);
        },
        merk: /Cuypers/i,
        nl: 'Boven de lijst filtert u. Wat u typt, zoekt in alle kolommen tegelijk, en de lijst krimpt terwijl u typt.',
        fr: "Au-dessus de la liste, vous filtrez. Ce que vous tapez cherche dans toutes les colonnes à la fois, et la liste se réduit pendant que vous tapez." },

      { naam: 'werkbalk', kop: { nl: 'Exporteren', fr: "Exporter" },
        doe: async (p) => { await beweegNaar(p, p.getByText('Exporteren', { exact: true }).or(p.getByText('Exporter', { exact: true })).first()); await p.waitForTimeout(1200); },
        merk: /Exporteren|Exporter/i,
        nl: 'Wat u ziet, kunt u meenemen: exporteren geeft u precies uw huidige selectie in Excel, met uw filter en uw kolommen erin.',
        fr: "Ce que vous voyez, vous pouvez l’emporter : l’export vous donne exactement votre sélection actuelle dans Excel, avec votre filtre et vos colonnes." },

      { naam: 'voorkeuren', kop: { nl: 'Uw voorkeuren', fr: "Vos préférences" },
        doe: async (p) => {
          await klik(p, kopbalkKnop(p, /Voorkeuren|Préférences/i));
          await p.waitForTimeout(2000);
        },
        merk: /OMGEVINGSGROOTTE|TAILLE DE L.INTERFACE/i,
        nl: 'Rechtsboven staan uw eigen voorkeuren: de grootte van het scherm, een licht of donker thema, en uw taal. Die keuzes zijn van u, niet van uw kantoor.',
        fr: "En haut à droite, vos préférences : la taille de l’écran, un thème clair ou sombre, et votre langue. Ces choix sont les vôtres, pas ceux de votre bureau." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: "Pour conclure" },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/dashboard`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1400);
        },
        merk: /Aan de slag|Pour commencer/i,
        nl: 'Dat is de weg. De rest van deze reeks gaat over wat u er onderweg mee doet.',
        fr: "Voilà pour l’orientation. Le reste de cette série porte sur ce que vous en faites en chemin." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 2 van de reeks (§14). De relatie is de spil: elk dossier hangt eraan, elk document, elk gesprek.
  //
  // ⚠️ DEZE FILM KOSTTE DEMO-WERK, precies zoals §14 voorspelde. Het tabblad "Gevraagd" was op élke relatie
  // leeg: van 6.742 relaties droeg er ÉÉN een gevraagd document, en dat was er precies één (dossiers hadden
  // er 17.929). De generator vult ze nu, in alle drie de toestanden. En bij het meten bleek de teller in de
  // tabkop "Gevraagd (0)" te tonen boven drie documenten — die werd pas berekend als je het tabblad opende.
  ['relaties', {
    pagina: 'crm/relations',
    titel: {
      nl: 'Relaties in CreditSoft — de fiche waar alles aan hangt',
      fr: 'Les relations dans CreditSoft — la fiche à laquelle tout se rattache',
    },
    omschrijving: {
      nl: 'De relatiefiche van dichtbij: de lijst doorzoeken, een fiche openen, de algemene en bijkomende '
        + 'gegevens, de documenttaal die bepaalt in welke taal uw klant post krijgt, de gevraagde documenten '
        + 'met hun drie toestanden, de kredietdossiers van die klant, en het journaal met notities en '
        + 'gesprekken. Plus het samenvoegen van twee fiches die dezelfde persoon blijken te zijn.',
      fr: 'La fiche de relation de près : parcourir la liste, ouvrir une fiche, les données générales et '
        + 'complémentaires, la langue des documents qui détermine dans quelle langue votre client reçoit son '
        + 'courrier, les documents demandés avec leurs trois statuts, les dossiers de crédit de ce client, et '
        + 'le journal avec les notes et les appels. Ainsi que la fusion de deux fiches.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De relatielijst', fr: 'La liste des relations' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1500); },
        merk: /Nieuwe relatie|Nouvelle relation/i,
        nl: 'Een relatie is iedereen met wie u zakendoet: uw klanten, hun partners, en de bedrijven achter een aanvraag. Alles hangt hieraan vast.',
        fr: "Une relation, c’est toute personne avec qui vous travaillez : vos clients, leurs partenaires et les sociétés derrière une demande. Tout s’y rattache." },

      { naam: 'zoeken', kop: { nl: 'Zoeken in de lijst', fr: 'Rechercher dans la liste' },
        doe: async (p) => {
          const z = p.locator('input[type="search"]:visible, input[placeholder*="oek" i]:visible, input[placeholder*="echerch" i]:visible').first();
          await klik(p, z); await z.type('Cuypers', { delay: 90 }); await p.waitForTimeout(2400);
        },
        merk: /Cuypers/i,
        nl: 'U zoekt op naam, en de lijst krimpt terwijl u typt. Particulieren en bedrijven staan door elkaar; de kolom Type zegt welke u voor u heeft.',
        fr: "Vous cherchez par nom et la liste se réduit pendant que vous tapez. Particuliers et sociétés sont mélangés ; la colonne Type indique ce que vous avez devant vous." },

      { naam: 'openen', kop: { nl: 'Een fiche openen', fr: 'Ouvrir une fiche' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties/${ID.relatie}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200); },
        merk: /Adriaenssens/i,
        nl: 'Een fiche opent als een volledige pagina, niet als een venster. Bovenaan staat wie het is, daaronder alles wat bij die persoon hoort.',
        fr: "Une fiche s’ouvre comme une page entière, pas comme une fenêtre. En haut, de qui il s’agit ; en dessous, tout ce qui s’y rapporte." },

      { naam: 'algemeen', kop: { nl: 'De algemene gegevens', fr: 'Les données générales' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Hoofdadres|Adresse principale/i).first()); await p.waitForTimeout(1200); },
        merk: /Hoofdadres|Adresse principale/i,
        nl: 'Op het eerste tabblad staan naam, contactgegevens en het hoofdadres. Het adres is gesplitst in straat, nummer, bus, postcode en gemeente, zodat het overal net staat.',
        fr: "Le premier onglet contient le nom, les coordonnées et l’adresse principale. L’adresse est découpée en rue, numéro, boîte, code postal et commune, pour un rendu propre partout." },

      { naam: 'documenttaal', kop: { nl: 'De documenttaal', fr: 'La langue des documents' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Documenttaal|Langue des documents/i).first()); await p.waitForTimeout(1400); },
        merk: /Documenttaal|Langue des documents/i,
        nl: 'Eén veld verdient uw aandacht: de documenttaal. Die bepaalt in welke taal deze klant zijn brieven en mails krijgt — los van de taal waarin u zelf werkt.',
        fr: "Un champ mérite votre attention : la langue des documents. Elle détermine dans quelle langue ce client reçoit ses courriers et e-mails, indépendamment de la langue dans laquelle vous travaillez." },

      { naam: 'bijkomend', kop: { nl: 'Bijkomende gegevens', fr: 'Données complémentaires' },
        doe: async (p) => { await klik(p, tabblad(p, /^Bijkomend|^Complémentaire/i)); await p.waitForTimeout(1800); },
        merk: /Rijksregisternr|registre national/i,
        nl: 'Het tweede tabblad draagt wat u voor een dossier nodig heeft: geboortedatum, rijksregisternummer, burgerlijke staat en beroep.',
        fr: "Le deuxième onglet porte ce dont vous avez besoin pour un dossier : date de naissance, numéro de registre national, état civil et profession." },

      { naam: 'gevraagd', kop: { nl: 'De gevraagde documenten', fr: 'Les documents demandés' },
        doe: async (p) => { await klik(p, tabblad(p, /^Gevraagd|^Demandés/i)); await p.waitForTimeout(2200); },
        merk: /Ontvangen|Reçu/i,
        nl: 'Bij Gevraagd houdt u bij welke stukken u van deze klant nodig heeft. Elk stuk doorloopt drie toestanden: gevraagd, ontvangen, en in orde. De teller in de tabkop toont hoeveel er al in orde zijn.',
        fr: "Sous Demandés, vous suivez les pièces dont vous avez besoin de ce client. Chaque pièce passe par trois statuts : demandé, reçu, et en ordre. Le compteur dans l’onglet indique combien sont déjà en ordre." },

      { naam: 'dossiers', kop: { nl: 'De kredietdossiers', fr: 'Les dossiers de crédit' },
        doe: async (p) => { await klik(p, tabblad(p, /^Kredietdossiers|^Dossiers de crédit/i)); await p.waitForTimeout(2000); },
        merk: /DEMO-3699/i,
        nl: 'Het tabblad Kredietdossiers toont elke aanvraag van deze klant, met het bedrag en de fase waarin ze zit. Van hieruit opent u het dossier zelf.',
        fr: "L’onglet Dossiers de crédit affiche chaque demande de ce client, avec le montant et la phase où elle se trouve. De là, vous ouvrez le dossier lui-même." },

      { naam: 'journaal', kop: { nl: 'Het journaal', fr: 'Le journal' },
        doe: async (p) => { await klik(p, tabblad(p, /^Gesprekken|^Appels/i)); await p.waitForTimeout(2000); },
        merk: /Loonbriefje opgevraagd/i,
        nl: 'De laatste tabbladen zijn het journaal: taken, notities, gesprekken, bijlagen en mailverkeer. Wat u met deze klant afsprak, staat hier — en niet in uw hoofd.',
        fr: "Les derniers onglets forment le journal : tâches, notes, appels, pièces jointes et courrier. Ce que vous avez convenu avec ce client est ici, et pas dans votre tête." },

      { naam: 'samenvoegen', kop: { nl: 'Twee fiches samenvoegen', fr: 'Fusionner deux fiches' },
        doe: async (p) => {
          await p.goto(`${BASIS}/crm/relaties`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1600);
          await beweegNaar(p, p.getByText('Samenvoegen', { exact: true }).or(p.getByText('Fusionner', { exact: true })).first()); await p.waitForTimeout(1200);
        },
        merk: /Samenvoegen|Fusionner/i,
        nl: 'Blijkt dezelfde persoon twee keer in uw lijst te staan, dan voegt u de fiches samen. De dossiers, documenten en het journaal van beide blijven behouden.',
        fr: "Si la même personne figure deux fois dans votre liste, vous fusionnez les fiches. Les dossiers, documents et journaux des deux sont conservés." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Samenvoegen|Fusionner/i,
        nl: 'De relatie is uw vertrekpunt. In de volgende film maken we er een kredietdossier bij.',
        fr: "La relation est votre point de départ. Dans le film suivant, nous y ajoutons un dossier de crédit." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 3 van de reeks (§14). De instroom: wie klopt er aan, en wat gebeurt ermee.
  //
  // ⚠️ DERDE FILM, DERDE DEMO-GAT. De leadlijst droeg VIER van de vijf statussen: "Gewonnen" ontbrak, en
  // daarmee was de hele sectie "Van lead naar klant" uit crm/leads.md nergens te tonen — precies de stap
  // waar het om draait. De generator zaait er nu één, mét de verwijzing naar de relatie die eruit voortkwam.
  //
  // ⚠️ GEEN SCÈNE OVER DE WEBSITESLEUTEL. crm/leads-webformulier.md beschrijft ze, maar er is geen scherm
  // voor: een sleutel vraag je aan bij ADM One. Een scène erover zou een knop moeten tonen die niet bestaat.
  // De film toont de zichtbare helft — de BRON die uit die sleutel komt en per lead in de lijst staat.
  //
  // ⚠️ EN GEEN GETAL IN EEN ZIN. De lijst toont "wacht al 14 dagen" waar de seed 3 dagen zegt: het
  // ontvangstmoment wordt bij het zaaien vastgeklikt en drijft daarna mee met de kalender. Een zin die een
  // aantal dagen noemt, klopt dus volgende maand niet meer.
  ['leads', {
    pagina: 'crm/leads',
    titel: {
      nl: 'Leads in CreditSoft — van aanvraag tot klant',
      fr: 'Les leads dans CreditSoft — de la demande au client',      en: 'Leads in CreditSoft — from enquiry to client',

    },
    omschrijving: {
      nl: 'De werklijst van uw instroom: wie er wacht en hoe lang, uit welk kanaal hij kwam, en wie hem '
        + 'opvolgt. Daarna de fiche van een lead — wie hij is, wat hij vraagt, en waar hij staat — de vijf '
        + 'statussen, en tot slot een lead die klant geworden is, met de doorverwijzing naar zijn relatiefiche.',
      fr: 'La liste de travail de vos demandes entrantes : qui attend et depuis combien de temps, de quel '
        + 'canal il provient, et qui le suit. Ensuite la fiche d’un lead — qui il est, ce qu’il demande et où '
        + 'il en est — les cinq statuts, et pour finir un lead devenu client, avec le renvoi vers sa fiche.',      en: 'Everyone who gets in touch on one worklist, with how long they have waited and where they came from.',

    },
    uitvoeringen: {
      handleiding: { stem: true },
      // ⚠️ Een ANDER soort film, geen kortere. 30-45 s, geluidloos te begrijpen, en met EIGEN
      //    teksten (`scene.website`) — niet de handleidingzinnen met scènes eruit. Zie films.mjs.
      website: {
        stem: false,
        scenes: ['lijst', 'bron', 'openen', 'statussen', 'gewonnen'],
        talen: [{ ui: 'nl-BE', tekst: 'nl' }, { ui: 'fr-BE', tekst: 'fr' }, { ui: 'nl-BE', tekst: 'en' }],
      },
    },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De werklijst', fr: 'La liste de travail' , en: 'The worklist' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/leads`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1800); },
        merk: /Nieuwe lead|Nouveau lead/i,
        nl: 'Een lead is iemand die zich meldt maar nog geen klant is. Dit scherm is geen archief maar een werklijst: het toont wat er ligt te wachten.',
        fr: "Un lead, c’est quelqu’un qui se manifeste sans être encore client. Cet écran n’est pas une archive mais une liste de travail : il montre ce qui attend." ,
        website: { nl: 'Iedereen die zich meldt, op één werklijst.', fr: 'Toute demande entrante, sur une seule liste.', en: 'Everyone who gets in touch, on one worklist.' } },

      { naam: 'wachttijd', kop: { nl: 'Hoe lang iemand wacht', fr: 'Depuis combien de temps on attend' , en: 'How long they wait' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Wacht al|En attente depuis/i).first()); await p.waitForTimeout(1400); },
        merk: /Wacht al|En attente depuis/i,
        nl: 'Twee kolommen doen het werk. Wacht al zegt hoe lang er nog niemand gereageerd heeft, en die klok stopt pas bij het eerste contact.',
        fr: "Deux colonnes font le travail. En attente depuis indique depuis combien de temps personne n’a réagi, et cette horloge ne s’arrête qu’au premier contact." ,
        website: { nl: 'Met hoe lang iemand al wacht.', fr: 'Avec le temps d’attente de chacun.', en: 'With how long each one has been waiting.' } },

      { naam: 'opvolger', kop: { nl: 'Wie volgt hem op', fr: 'Qui assure le suivi' },
        doe: async (p) => { await beweegNaar(p, p.getByText('niemand', { exact: true }).or(p.getByText('personne', { exact: true })).first()); await p.waitForTimeout(1400); },
        merk: /niemand|personne/i,
        nl: 'De tweede is Opvolging. Staat daar niemand, dan is deze aanvraag van niemand — en dat is precies de lead die wegglipt.',
        fr: "La seconde est Suivi. S’il n’y a personne, cette demande n’appartient à personne — et c’est précisément le lead qui s’échappe." },

      { naam: 'bron', kop: { nl: 'Waar hij vandaan komt', fr: 'D’où il provient' , en: 'Where they came from' },
        doe: async (p) => { await beweegNaar(p, p.getByText('doorverwijzing', { exact: true }).first()); await p.waitForTimeout(1400); },
        merk: /doorverwijzing/i,
        nl: 'De kolom Bron zegt via welk kanaal iemand binnenkwam: uw contactformulier, een telefoon, of een doorverwijzing. Zo ziet u welk kanaal u klanten oplevert.',
        fr: "La colonne Source indique par quel canal la personne est arrivée : votre formulaire de contact, un appel, ou une recommandation. Vous voyez ainsi quel canal vous apporte des clients." ,
        website: { nl: 'En via welk kanaal hij binnenkwam.', fr: 'Et par quel canal il est arrivé.', en: 'And which channel they came in through.' } },

      { naam: 'openen', kop: { nl: 'De fiche van een lead', fr: 'La fiche d’un lead' , en: 'The lead’s record' },
        doe: async (p) => {
          await klik(p, p.getByText('Tom Claes').first());
          await p.getByText('Tom Claes').first().dblclick();
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200);
        },
        merk: /Vul minstens een van deze velden|Complétez au moins un de ces champs/i,
        nl: 'De fiche valt in drie blokken uiteen. Wie hij is: naam, bedrijf en hoe u hem bereikt. Eén van die velden volstaat — zonder herkenning is een lead niet op te volgen.',
        fr: "La fiche se divise en trois blocs. Qui il est : nom, société et comment le joindre. Un seul de ces champs suffit — sans identification, un lead ne peut pas être suivi." ,
        website: { nl: 'Wie hij is, wat hij vraagt, wie hem opvolgt.', fr: 'Qui il est, ce qu’il demande, qui le suit.', en: 'Who they are, what they want, who follows up.' } },

      { naam: 'vraag', kop: { nl: 'Wat hij vraagt', fr: 'Ce qu’il demande' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Herkomst|Provenance/i).first()); await p.waitForTimeout(1600); },
        merk: /Herkomst|Provenance/i,
        nl: 'Het tweede blok is de vraag zelf: het bedrag, de bron, en wat hij letterlijk schreef. De herkomst zegt uit welk formulier hij kwam.',
        fr: "Le deuxième bloc est la demande elle-même : le montant, la source, et ce qu’il a écrit littéralement. La provenance indique de quel formulaire il vient." },

      { naam: 'opvolging', kop: { nl: 'De opvolging', fr: 'Le suivi' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Eerste contact|Premier contact/i).first()); await p.waitForTimeout(1600); },
        merk: /Eerste contact|Premier contact/i,
        nl: 'Het derde blok is de opvolging: zijn status, wie hem opvolgt, en wanneer er voor het eerst contact geweest is.',
        fr: "Le troisième bloc est le suivi : son statut, qui s’en occupe, et quand le premier contact a eu lieu." },

      { naam: 'statussen', kop: { nl: 'De vijf statussen', fr: 'Les cinq statuts' , en: 'The five statuses' },
        doe: async (p) => {
          await p.goto(`${BASIS}/crm/leads`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(1600);
          await klik(p, p.getByText(/Alle statussen|Tous les statuts/i).first()); await p.waitForTimeout(1800);
        },
        merk: /Gekwalificeerd|Qualifié/i,
        nl: 'Er zijn er vijf, en bewust niet meer: nieuw, gecontacteerd, gekwalificeerd, gewonnen en verloren. Een kantoor van vijf mensen heeft geen trechter van acht fasen nodig.',
        fr: "Il y en a cinq, et volontairement pas plus : nouveau, contacté, qualifié, gagné et perdu. Un bureau de cinq personnes n’a pas besoin d’un entonnoir à huit phases." ,
        website: { nl: 'Vijf statussen. U ziet meteen waar elke lead staat.', fr: 'Cinq statuts. Vous voyez d’un coup où en est chaque demande.', en: 'Five statuses. You see at a glance where each lead stands.' } },

      { naam: 'gewonnen', kop: { nl: 'Van lead naar klant', fr: 'Du lead au client' , en: 'From lead to client' },
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(700);
          await p.getByText('Brigitte De Rycke').first().dblclick();
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
        },
        merk: /bekijk de klant|voir le client/i,
        nl: 'Wordt hij klant, dan zet u hem om. De lead blijft staan als geschiedenis van hoe die klant binnenkwam, en draagt voortaan een link naar zijn relatiefiche.',
        fr: "S’il devient client, vous le convertissez. Le lead subsiste comme historique de la façon dont ce client est arrivé, et porte désormais un lien vers sa fiche de relation." ,
        website: { nl: 'Van een vraag op uw website tot een klant.', fr: 'D’une demande sur votre site à un client.', en: 'From a question on your site to a client.' } },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' , en: 'In closing' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /bekijk de klant|voir le client/i,
        nl: 'Zo sluit de cirkel: van een vraag op uw website tot een klant met een dossier. In de volgende film gaan we naar de documenten.',
        fr: "La boucle est ainsi bouclée : d’une question sur votre site à un client avec un dossier. Dans le film suivant, nous passons aux documents." ,
        website: { nl: 'Van een vraag op uw website tot een klant.', fr: 'D’une demande sur votre site à un client.', en: 'From a question on your site to a client.' } },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 4 van de reeks (§14). De documentketen, en bewust ÉÉN RICHTING: wat er binnenkomt.
  //
  // ⚠️ §14 zette klantportaal + validatie + bibliotheek in één film. Bij het uitschrijven bleek dat twee
  // verhalen: stukken die je VRAAGT en binnenkrijgt, tegenover stukken die je UITDEELT. De handleiding maakt
  // datzelfde onderscheid zelf ("Het verschil met Bijlagen"). De bibliotheek krijgt hier één slotscène als
  // wegwijzer naar de andere richting, niet de helft van de film.
  //
  // ⚠️ DE AFKEUR-SCÈNE KEURT NIETS AF. De knop opent een dialoog; die tonen we, en dan Escape. Wél iets
  // afkeuren zou een demo-document op "geweigerd" zetten én een mail proberen te sturen — en een film hoort
  // geen sporen achter te laten in de omgeving die hij filmt.
  ['documentketen', {
    pagina: 'credit-management/document-validation',
    titel: {
      nl: 'De documentketen — van vragen tot beoordelen',
      fr: 'La chaîne des documents — de la demande à la validation',
    },
    omschrijving: {
      nl: 'Hoe u stukken opvraagt bij uw klant en ze weer binnenkrijgt: de gevraagde documenten op een '
        + 'dossier met hun drie toestanden, de uitnodiging naar het klantenportaal, het portaal zoals uw '
        + 'klant het ziet, en het centrale scherm waar alles wat op beoordeling wacht bij elkaar staat — '
        + 'gesorteerd op wie het langst wacht. Plus de andere richting: de documentbibliotheek.',
      fr: 'Comment vous demandez des pièces à votre client et les recevez : les documents demandés sur un '
        + 'dossier avec leurs trois statuts, l’invitation au portail client, le portail tel que votre client '
        + 'le voit, et l’écran central où tout ce qui attend une validation est rassemblé — trié par ordre '
        + 'd’attente. Ainsi que l’autre sens : la bibliothèque de documents.',
    },
    dossier: ID.dossierMetSchema,
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'gevraagd', kop: { nl: 'De gevraagde stukken', fr: 'Les pièces demandées' },
        doe: async (p) => {
          await p.goto(`${BASIS}/credit-files/${ID.dossierMetSchema}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200);
          await klik(p, tabblad(p, /^Gevraagd|^Demandés/i)); await p.waitForTimeout(2000);
        },
        merk: /Ontvangen|Reçu/i,
        nl: 'Elk dossier draagt een lijst van de stukken die u nodig heeft. Elk stuk doorloopt drie toestanden: gevraagd, ontvangen, en in orde. De teller in de tabkop zegt hoeveel er al rond zijn.',
        fr: "Chaque dossier porte la liste des pièces dont vous avez besoin. Chaque pièce passe par trois statuts : demandé, reçu, et en ordre. Le compteur dans l’onglet indique combien sont déjà réglées." },

      { naam: 'uitnodigen', kop: { nl: 'De klant uitnodigen', fr: 'Inviter le client' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Klant uitnodigen|Inviter le client/i).first()); await p.waitForTimeout(1600); },
        merk: /Klant uitnodigen|Inviter le client/i,
        nl: 'U nodigt uw klant uit met één knop. Hij krijgt een persoonlijke link naar zijn portaal — geen account, geen wachtwoord, en de link geldt voor dit ene dossier.',
        fr: "Vous invitez votre client d’un seul bouton. Il reçoit un lien personnel vers son portail — pas de compte, pas de mot de passe, et le lien ne vaut que pour ce dossier." },

      { naam: 'klantblik', kop: { nl: 'Wat uw klant ziet', fr: 'Ce que voit votre client' },
        doe: async (p) => {
          await p.goto(`${BASIS}/klantportaal/voorbeeld/${ID.dossierMetSchema}`);
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
        },
        merk: /Welkom bij uw dossier|Bienvenue dans votre dossier/i,
        nl: 'Met Bekijk als klant ziet u zijn portaal precies zoals hij het krijgt: uw naam, uw kleuren, en de lijst van wat u nog nodig heeft.',
        fr: "Avec Voir comme le client, vous voyez son portail exactement tel qu’il le reçoit : votre nom, vos couleurs, et la liste de ce dont vous avez encore besoin." },

      { naam: 'opladen', kop: { nl: 'De klant levert aan', fr: 'Le client dépose ses pièces' },
        doe: async (p) => { await p.mouse.wheel(0, 400); await p.waitForTimeout(1800); },
        merk: /Estimation|Kostenraming|documenten|document/i,
        nl: 'Uw klant laadt zijn stukken hier op, per gevraagd document. Hij ziet meteen wat al in orde is en wat nog niet — en u hoeft er niet achter te bellen.',
        fr: "Votre client dépose ses pièces ici, document demandé par document demandé. Il voit immédiatement ce qui est réglé et ce qui ne l’est pas — et vous n’avez pas à le relancer." },

      { naam: 'valideren', kop: { nl: 'Alles wat wacht, op één scherm', fr: 'Tout ce qui attend, sur un écran' },
        doe: async (p) => { await p.goto(`${BASIS}/krediet/documenten-valideren`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Te valideren|À valider/i,
        nl: 'Wat binnenkomt, komt hier samen: Te valideren documenten toont alles wat op beoordeling wacht, over al uw dossiers heen. Het getal in het menu zegt hoeveel het er zijn.',
        fr: "Ce qui arrive se rassemble ici : Documents à valider affiche tout ce qui attend une validation, tous dossiers confondus. Le chiffre dans le menu indique combien il y en a." },

      { naam: 'wachttijd', kop: { nl: 'Wie het langst wacht', fr: 'Qui attend le plus longtemps' },
        doe: async (p) => { await beweegNaar(p, p.locator('th').nth(3)); await p.waitForTimeout(1600); },
        // ⚠️ De Franse kolom heet "Fourni le", niet "Déposé" — dat had ik geraden en het viel op de
        // beloftecontrole. `dagen`/`jours` staat in beide talen in de wachttijd-kolom.
        merk: /dagen|jours/i,
        nl: 'De lijst staat gesorteerd op wie het langst wacht. Een klant die zijn stukken vorige week opstuurde, staat dus boven wie het vanmorgen deed.',
        fr: "La liste est triée sur celui qui attend le plus longtemps. Un client qui a envoyé ses pièces la semaine dernière figure donc au-dessus de celui qui l’a fait ce matin." },

      { naam: 'openen', kop: { nl: 'Een stuk bekijken', fr: 'Consulter une pièce' },
        doe: async (p) => { await klik(p, p.locator('td').nth(2)); await p.waitForTimeout(2200); },
        merk: /Goedkeuren|Approuver/i,
        nl: 'U opent een regel om te zien wat er binnengekomen is. Het bestand staat ernaast, met wie het stuurde en wanneer.',
        fr: "Vous ouvrez une ligne pour voir ce qui est arrivé. Le fichier se trouve à côté, avec qui l’a envoyé et quand." },

      { naam: 'afkeuren', kop: { nl: 'Goedkeuren of afkeuren', fr: 'Approuver ou refuser' },
        doe: async (p) => {
          const vak = p.locator('td input[type=checkbox]').nth(1);
          await vak.check().catch(() => {}); await p.waitForTimeout(1000);
          // ⚠️ NIET `getByText(/^Afkeuren$/)`. Met een REGEX eist Playwright de hele tekstinhoud van het
          // element, en die draagt hier witruimte — de locator vond niets en de film viel op een time-out
          // van 30 s in `boundingBox`, met een melding die naar de muis wees in plaats van naar de selector.
          // Met een tekenreeks + `exact` matcht Playwright op de GETRIMDE tekst, en dan klopt het wel.
          await klik(p, p.getByText('Afkeuren', { exact: true }).or(p.getByText('Refuser', { exact: true })).first());
          await p.waitForTimeout(2200);
        },
        merk: /Ongeldige documenten|Documents non valides/i,
        nl: 'Klopt het, dan keurt u goed. Klopt het niet, dan geeft u een reden — en uw klant krijgt automatisch een bericht met die reden en een nieuwe link naar zijn portaal.',
        fr: "Si c’est correct, vous approuvez. Sinon, vous indiquez un motif — et votre client reçoit automatiquement un message avec ce motif et un nouveau lien vers son portail." },

      { naam: 'bibliotheek', kop: { nl: 'De andere richting', fr: 'L’autre sens' },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/document-library`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200);
        },
        merk: /Bedoeld voor|Destiné à/i,
        nl: 'Documenten gaan ook de andere kant op. In de documentbibliotheek zet u uw eigen stukken klaar, en per map bepaalt u voor wie ze zijn: intern, uw aanbrengers, of uw klanten.',
        fr: "Les documents circulent aussi dans l’autre sens. Dans la bibliothèque, vous mettez vos propres pièces à disposition, et par dossier vous décidez à qui elles sont destinées : en interne, à vos apporteurs, ou à vos clients." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Documentbibliotheek|Bibliothèque/i,
        nl: 'Zo loopt de hele keten: u vraagt, uw klant levert, u beoordeelt — en niets blijft liggen omdat het op één scherm staat.',
        fr: "Voilà toute la chaîne : vous demandez, votre client dépose, vous validez — et rien ne traîne, parce que tout figure sur un seul écran." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 5 van de reeks (§14). Het journaal — het blok dat aan zes schermen hangt en overal hetzelfde werkt.
  //
  // ⚠️ ÉÉN FICHE, ZES TABBLADEN. De verleiding is om per tabblad een ander scherm te tonen; dat maakt de
  // film langer en het punt zwakker. Het punt IS juist dat het overal hetzelfde is — daarom blijven we op
  // één relatie en tonen we pas op het eind dat exact hetzelfde blok op een dossier staat.
  //
  // ⚠️ Gekozen fiche: ID.relatie, gemeten als de rijkste (2 taken, 1 notitie, 2 gesprekken, 4 mails,
  // 3 bijlagen). Datzelfde record draagt de handleiding en de beeldronde — één bron, één demo-afhankelijkheid.
  ['journaal', {
    pagina: 'journaal/overzicht',
    titel: {
      nl: 'Het journaal — alles wat er met een klant gebeurde, op één plaats',
      fr: 'Le journal — tout ce qui s’est passé avec un client, au même endroit',
    },
    omschrijving: {
      nl: 'Het journaal hangt aan elke fiche en werkt overal hetzelfde: taken met hun vervaldag en wie ze '
        + 'opvolgt, notities, gesprekken, bijlagen, het mailverkeer met de status van elke verzending, en '
        + 'het logboek dat elke veldwijziging bewaart. Plus de takenlijst die over alle fiches heen kijkt.',
      fr: 'Le journal est rattaché à chaque fiche et fonctionne partout de la même manière : tâches avec '
        + 'leur échéance et leur responsable, notes, appels, pièces jointes, le courrier avec le statut de '
        + 'chaque envoi, et l’historique qui conserve chaque modification. Ainsi que la liste des tâches '
        + 'qui regarde par-dessus toutes les fiches.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'waar', kop: { nl: 'Waar het journaal staat', fr: 'Où se trouve le journal' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/relaties/${ID.relatie}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Mailverkeer|Courrier/i,
        nl: 'Onderaan elke fiche staat het journaal: taken, notities, gesprekken, bijlagen, mailverkeer en het logboek. Het hangt aan zes schermen en werkt overal precies hetzelfde.',
        fr: "Au bas de chaque fiche se trouve le journal : tâches, notes, appels, pièces jointes, courrier et historique. Il est rattaché à six écrans et fonctionne partout exactement de la même manière." },

      { naam: 'taken', kop: { nl: 'Taken', fr: 'Tâches' },
        doe: async (p) => { await klik(p, tabblad(p, /^Taken|^Tâches/i)); await p.waitForTimeout(2000); },
        merk: /Vervalt|Échéance/i,
        nl: 'Een taak draagt een vervaldag, een prioriteit en iemand die haar opvolgt. U kan er een herinnering aan hangen, en u vinkt ze af zonder de fiche te verlaten.',
        fr: "Une tâche porte une échéance, une priorité et une personne qui la suit. Vous pouvez y attacher un rappel, et vous la cochez sans quitter la fiche." },

      { naam: 'notities', kop: { nl: 'Notities', fr: 'Notes' },
        doe: async (p) => { await klik(p, tabblad(p, /^Notities|^Notes/i)); await p.waitForTimeout(2000); },
        merk: /Afspraak over de aanpak/i,
        nl: 'Een notitie is wat u wil onthouden maar niemand moet doen. Wat u met deze klant afsprak staat hier — en niet in uw hoofd of in een los bestand.',
        fr: "Une note, c’est ce que vous voulez retenir sans que personne doive agir. Ce que vous avez convenu avec ce client est ici, et pas dans votre tête ou dans un fichier isolé." },

      { naam: 'gesprekken', kop: { nl: 'Gesprekken', fr: 'Appels' },
        doe: async (p) => { await klik(p, tabblad(p, /^Gesprekken|^Appels/i)); await p.waitForTimeout(2000); },
        merk: /Loonbriefje opgevraagd/i,
        nl: 'Een gesprek noteert u met de richting erbij: inkomend of uitgaand, en wat eruit kwam. Zo ziet uw collega morgen wie er al gebeld heeft.',
        fr: "Un appel se note avec son sens : entrant ou sortant, et ce qui en est ressorti. Votre collègue voit ainsi demain qui a déjà téléphoné." },

      { naam: 'bijlagen', kop: { nl: 'Bijlagen', fr: 'Pièces jointes' },
        doe: async (p) => { await klik(p, tabblad(p, /^Bijlagen|^Pièces jointes/i)); await p.waitForTimeout(2000); },
        merk: /compromis.pdf/i,
        nl: 'Bijlagen zijn de bestanden die bij deze fiche horen, met een omschrijving erbij. Dat is iets anders dan de gevraagde documenten: die volgen een status, deze staan er gewoon.',
        fr: "Les pièces jointes sont les fichiers liés à cette fiche, avec une description. C’est autre chose que les documents demandés : ceux-là suivent un statut, celles-ci sont simplement là." },

      { naam: 'mailverkeer', kop: { nl: 'Mailverkeer', fr: 'Courrier' },
        doe: async (p) => { await klik(p, tabblad(p, /^Mailverkeer|^Courrier/i)); await p.waitForTimeout(2200); },
        merk: /ontvangstbevestiging/i,
        nl: 'Elke mail die naar deze klant vertrok, staat hier — met de tekst zoals hij hem kreeg, en of hij afgeleverd is.',
        fr: "Chaque e-mail parti vers ce client figure ici — avec le texte tel qu’il l’a reçu, et s’il a bien été distribué." },

      { naam: 'logboek', kop: { nl: 'Het logboek', fr: 'L’historique' },
        doe: async (p) => { await klik(p, tabblad(p, /^Logboek|^Historique/i)); await p.waitForTimeout(2200); },
        merk: /andere velden|autres champs/i,
        nl: 'Het logboek houdt elke veldwijziging bij: wie wat wanneer veranderde, en van welke waarde naar welke. Daar hoeft u niets voor te doen — het gebeurt vanzelf.',
        fr: "L’historique conserve chaque modification de champ : qui a changé quoi et quand, et de quelle valeur vers quelle autre. Vous n’avez rien à faire pour cela — c’est automatique." },

      { naam: 'overal', kop: { nl: 'Hetzelfde op een dossier', fr: 'Identique sur un dossier' },
        doe: async (p) => {
          await p.goto(`${BASIS}/credit-files/${ID.dossierMetSchema}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
        },
        // ⚠️ HET DOSSIERNUMMER, niet "Taken". Dat woord staat in het MENU van élke pagina, dus die controle
        // zou groen staan waar je ook bent — een merkteken dat het verkeerde geval niet uitsluit.
        merk: /DEMO-1089/i,
        nl: 'Ditzelfde blok vindt u op een kredietdossier, een lead, een aanbrenger. Wat u hier leert, geldt overal — en wat u noteert, hangt aan het juiste record.',
        fr: "Vous retrouvez ce même bloc sur un dossier de crédit, un lead, un apporteur. Ce que vous apprenez ici vaut partout — et ce que vous notez reste attaché au bon enregistrement." },

      { naam: 'takenlijst', kop: { nl: 'Al uw taken samen', fr: 'Toutes vos tâches ensemble' },
        doe: async (p) => { await p.goto(`${BASIS}/taken`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        // ⚠️ "Hangt aan" bestaat ALLEEN op deze lijst — juist omdat ze over alle soorten fiches heen kijkt.
        // Op "Taken" zou de controle op elke pagina slagen; hierop enkel op de goede.
        merk: /Hangt aan|rattache/i,
        nl: 'En omdat een taak op een fiche staat maar niet op een fiche mag blijven liggen, is er één lijst die over alles heen kijkt: al uw taken, met wat het langst wacht bovenaan.',
        fr: "Et parce qu’une tâche vit sur une fiche sans devoir y rester coincée, une liste unique regarde par-dessus tout : toutes vos tâches, avec en haut ce qui attend le plus longtemps." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Hangt aan|rattache/i,
        nl: 'Het journaal is het geheugen van uw kantoor. Wie een klant overneemt, leest hier wat er gebeurd is — zonder het aan iemand te moeten vragen.',
        fr: "Le journal est la mémoire de votre bureau. Qui reprend un client y lit ce qui s’est passé — sans devoir le demander à quelqu’un." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 6 van de reeks (§14). De agenda, en de andere kant ervan: klanten die zelf een moment kiezen.
  //
  // ⚠️ GEEN SCÈNE OP DE ECHTE BOEKINGSPAGINA. De knop "Bekijken" opent
  // platform.digitalcloud.be/afspraak/<token> — een LIVE pagina op productie-ADM One. Een film die daarheen
  // navigeert, hangt af van een andere site en toont een werkende boekingslink. Het instellingenscherm legt
  // uit wat er gebeurt; dat volstaat.
  //
  // ⚠️ De boekingslink zelf gaat GEMASKEERD in beeld (zie MASKEER_BOEKINGSLINK). Zonder dat kan elke kijker
  // in de agenda van het demokantoor boeken.
  //
  // ⚠️ DE AFSPRAAK WORDT NIET BEWAARD. We openen het bewerkvenster en sluiten met Escape. Bewaren zou een
  // demo-afspraak wijzigen én mogelijk een bevestigingsmail sturen.
  ['afspraken', {
    pagina: 'crm/meetings',
    titel: {
      nl: 'De agenda — afspraken maken en laten maken',
      fr: 'L’agenda — prendre et faire prendre des rendez-vous',
    },
    omschrijving: {
      nl: 'De agenda van uw kantoor: de kleuren die zeggen wie afwezig is en wanneer u gesloten bent, de '
        + 'weergave per medewerker of samengevoegd, een afspraak met haar verantwoordelijken en de '
        + 'bevestiging naar uw klant. En de andere kant: uren openzetten zodat mensen zelf een moment kiezen.',
      fr: 'L’agenda de votre bureau : les couleurs qui indiquent qui est absent et quand vous êtes fermé, '
        + 'l’affichage par collaborateur ou fusionné, un rendez-vous avec ses responsables et la confirmation '
        + 'au client. Et l’autre côté : ouvrir des plages pour que les gens choisissent eux-mêmes un moment.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'agenda', kop: { nl: 'De agenda', fr: 'L’agenda' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/afspraken`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(3200); },
        merk: /Feestdag of kantoor gesloten|Jour férié ou bureau fermé/i,
        nl: 'De agenda toont de afspraken van uw hele kantoor. U kiest bovenaan wie u wil zien — één collega, een selectie, of iedereen samen.',
        fr: "L’agenda affiche les rendez-vous de tout votre bureau. Vous choisissez en haut qui vous voulez voir — un collègue, une sélection, ou tout le monde ensemble." },

      { naam: 'kleuren', kop: { nl: 'Wat de kleuren zeggen', fr: 'Ce que disent les couleurs' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Feestdag of kantoor gesloten|Jour férié ou bureau fermé/i).first()); await p.waitForTimeout(1600); },
        merk: /Afwezig|Absent/i,
        nl: 'De achtergrond doet mee: een dag waarop het kantoor gesloten is, en de uren dat een collega afwezig is, kleuren anders. Zo plant u geen afspraak op een moment dat niet kan.',
        fr: "L’arrière-plan participe : un jour de fermeture du bureau et les heures d’absence d’un collègue se colorent différemment. Vous ne planifiez donc pas un rendez-vous à un moment impossible." },

      { naam: 'weergave', kop: { nl: 'Samen of per medewerker', fr: 'Ensemble ou par collaborateur' },
        doe: async (p) => { await beweegNaar(p, p.getByText('Per medewerker', { exact: true }).or(p.getByText('Par collaborateur', { exact: true })).first()); await p.waitForTimeout(1600); },
        merk: /Samengevoegd|Fusionné/i,
        nl: 'Samengevoegd zet iedereen in één rooster; per medewerker geeft elke collega zijn eigen kolom. Het eerste is handig om te zoeken, het tweede om te plannen.',
        fr: "Fusionné place tout le monde dans une seule grille ; par collaborateur donne à chacun sa propre colonne. Le premier sert à chercher, le second à planifier." },

      { naam: 'afspraak', kop: { nl: 'Een afspraak openen', fr: 'Ouvrir un rendez-vous' },
        doe: async (p) => {
          const apt = await zichtbareAfspraak(p);
          await beweegNaar(p, apt); await apt.dblclick({ force: true }); await p.waitForTimeout(2600);
        },
        merk: /Afspraak bewerken|Modifier le rendez-vous/i,
        nl: 'U opent een afspraak met een dubbelklik. Naast titel, datum en uur legt u vast waar ze doorgaat en met wie: een contact, een aanbrenger, of een lead.',
        fr: "Vous ouvrez un rendez-vous par un double-clic. Outre le titre, la date et l’heure, vous fixez où il a lieu et avec qui : un contact, un apporteur, ou un lead." },

      { naam: 'verantwoordelijken', kop: { nl: 'Wie erbij is', fr: 'Qui y participe' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Bijkomende verantwoordelijken|Responsables supplémentaires/i).first()); await p.waitForTimeout(1800); },
        merk: /Bijkomende verantwoordelijken|Responsables supplémentaires/i,
        nl: 'Er is één hoofdverantwoordelijke en er kunnen collega’s bij. De afspraak verschijnt dan in ieders agenda, zonder dat u ze moet kopiëren.',
        fr: "Il y a un responsable principal et des collègues peuvent s’y ajouter. Le rendez-vous apparaît alors dans l’agenda de chacun, sans que vous deviez le copier." },

      { naam: 'bevestiging', kop: { nl: 'De bevestiging', fr: 'La confirmation' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Bevestiging naar het contact|Confirmation au contact/i).first()); await p.waitForTimeout(1800); },
        merk: /Bevestiging naar het contact|Confirmation au contact/i,
        nl: 'Onderaan zet u een bevestiging klaar naar uw contact, naar de aanbrenger, of naar allebei. Die vertrekt met de datum, het uur en de plaats erin.',
        fr: "En bas, vous préparez une confirmation vers votre contact, vers l’apporteur, ou vers les deux. Elle part avec la date, l’heure et le lieu." },

      { naam: 'online', kop: { nl: 'Online afspraken', fr: 'Rendez-vous en ligne' },
        doe: async (p) => {
          await sluitLade(p);
          await p.goto(`${BASIS}/crm/online-afspraken`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600);
        },
        merk: /Boekingslink|Lien de réservation/i,
        nl: 'De agenda werkt ook de andere kant op. Zet u online afspraken aan, dan krijgt uw kantoor een boekingslink die u op uw website of in uw handtekening zet.',
        fr: "L’agenda fonctionne aussi dans l’autre sens. Si vous activez les rendez-vous en ligne, votre bureau reçoit un lien de réservation à placer sur votre site ou dans votre signature." },

      { naam: 'uren', kop: { nl: 'Uren openzetten', fr: 'Ouvrir des plages' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/open te zetten|Faites glisser/i).first()); await p.waitForTimeout(1800); },
        merk: /open te zetten|Faites glisser/i,
        nl: 'U sleept in de agenda om uren open te zetten. Alleen die uren zijn boekbaar — de rest van uw agenda blijft van u.',
        fr: "Vous faites glisser dans l’agenda pour ouvrir des plages. Seules ces heures sont réservables — le reste de votre agenda reste à vous." },

      { naam: 'boekt', kop: { nl: 'Wat er gebeurt als iemand boekt', fr: 'Ce qui se passe quand on réserve' },
        doe: async (p) => { await p.goto(`${BASIS}/crm/afspraken`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2800); },
        merk: /Feestdag of kantoor gesloten|Jour férié ou bureau fermé/i,
        nl: 'Boekt iemand een moment, dan komt het meteen als afspraak in uw agenda, met zijn naam en zijn vraag erbij — en dat uur is voor niemand anders meer vrij.',
        fr: "Si quelqu’un réserve un créneau, il arrive aussitôt comme rendez-vous dans votre agenda, avec son nom et sa demande — et cette heure n’est plus libre pour personne d’autre." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Feestdag of kantoor gesloten|Jour férié ou bureau fermé/i,
        nl: 'Zo blijft één agenda genoeg: wat u zelf plant en wat uw klanten boeken, staat op dezelfde plaats.',
        fr: "Un seul agenda suffit ainsi : ce que vous planifiez vous-même et ce que vos clients réservent figurent au même endroit." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 7 van de reeks (§14 nummer 9). Commissie INSTELLEN — het schema, niet de uitbetaling.
  //
  // ⚠️ §14 splitst commissie bewust in twee films. Deze gaat over wat je afspreekt met een aanbrenger en
  // hoe je dat vastlegt; de volgende over wat er daarna uit komt (borderel, vooruitzicht, restanten).
  // Eén film over allebei zou vier minuten duren en twee verhalen door elkaar halen.
  //
  // ⚠️ EEN SCHEMA HANGT AAN EEN DOSSIER, niet aan een aanbrenger: de route is
  // /credit-files/{dossier}/commissieschema/{schema}. Dat is precies het punt van scène 4.
  //
  // ⚠️ NIETS BEWAREN. We openen de schemafiche en tonen de velden; klikken op Bewaren zou een demo-schema
  // wijzigen en de geplande betalingen herrekenen.
  ['commissie-instellen', {
    pagina: 'credit-management/commission-schemes',
    titel: {
      nl: 'Commissie instellen — het schema per dossier',
      fr: 'Configurer la commission — le schéma par dossier',
    },
    omschrijving: {
      nl: 'Wat u met een aanbrenger afspreekt en hoe u het vastlegt: het overzicht van alle schema’s met '
        + 'hun vorm en toestand, de schemafiche op een dossier met de totale commissie, het deel dat direct '
        + 'uitbetaald wordt en de spreiding over de maanden, de geplande betalingen die daaruit volgen, en '
        + 'de twee kantoorinstellingen die bepalen hoe er afgerekend wordt.',
      fr: 'Ce que vous convenez avec un apporteur et comment vous le fixez : l’aperçu de tous les schémas '
        + 'avec leur forme et leur statut, la fiche du schéma sur un dossier avec la commission totale, la '
        + 'part payée immédiatement et l’étalement sur les mois, les paiements planifiés qui en découlent, '
        + 'et les deux paramètres du bureau qui déterminent le mode de décompte.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'overzicht', kop: { nl: 'Alle schema’s samen', fr: 'Tous les schémas ensemble' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/schemas`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Kenmerk aanbrenger|Référence apporteur/i,
        nl: 'Commissie begint bij een schema: wat u met een aanbrenger afspreekt voor één dossier. Dit overzicht toont ze allemaal, met de aanbrenger, de klant en het bedrag.',
        fr: "La commission commence par un schéma : ce que vous convenez avec un apporteur pour un dossier. Cet aperçu les montre tous, avec l’apporteur, le client et le montant." },

      { naam: 'vorm', kop: { nl: 'De vorm van een schema', fr: 'La forme d’un schéma' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Alle vormen|Toutes les formes/i).first()); await p.waitForTimeout(1600); },
        merk: /Alle vormen|Toutes les formes/i,
        nl: 'Een schema heeft een vorm en een toestand. De vorm zegt hoe er betaald wordt; de toestand of het al loopt, nog gepland is, of afgerond.',
        fr: "Un schéma a une forme et un statut. La forme indique comment le paiement se fait ; le statut s’il est en cours, encore planifié, ou terminé." },

      { naam: 'schema', kop: { nl: 'Het schema van een dossier', fr: 'Le schéma d’un dossier' },
        doe: async (p) => {
          await p.goto(`${BASIS}/credit-files/${ID.dossierMetSchema}/commissieschema/${ID.schema}`);
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600);
        },
        merk: /Het deel dat niet direct|La part non payée/i,
        nl: 'Een schema hangt altijd aan één dossier. U opent het vanuit dat dossier, en bovenaan staat het dossiernummer waar het bij hoort.',
        fr: "Un schéma est toujours rattaché à un dossier. Vous l’ouvrez depuis ce dossier, et le numéro du dossier figure en haut." },

      { naam: 'bedrag', kop: { nl: 'De totale commissie', fr: 'La commission totale' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Totale commissie|Commission totale/i).first()); await p.waitForTimeout(1700); },
        merk: /Totale commissie|Commission totale/i,
        nl: 'Bovenaan legt u vast wie de aanbrenger is, hoeveel commissie er in totaal tegenover staat, en vanaf welke datum ze loopt.',
        fr: "En haut, vous fixez qui est l’apporteur, quel montant total de commission y correspond, et à partir de quelle date elle court." },

      { naam: 'spreiding', kop: { nl: 'Direct of gespreid', fr: 'Immédiat ou étalé' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Aantal maanden|Nombre de mois/i).first()); await p.waitForTimeout(1800); },
        merk: /Aantal maanden|Nombre de mois/i,
        nl: 'Daaronder bepaalt u hoe er betaald wordt. Een deel kan direct, de rest wordt gelijk verdeeld over een aantal maanden — u vult het percentage en het aantal in, de rest volgt daaruit.',
        fr: "En dessous, vous déterminez comment le paiement se fait. Une part peut être immédiate, le reste est réparti également sur un nombre de mois — vous saisissez le pourcentage et le nombre, le reste en découle." },

      { naam: 'geplande', kop: { nl: 'De geplande betalingen', fr: 'Les paiements planifiés' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Geplande betalingen|Paiements planifiés/i).first()); await p.waitForTimeout(1800); },
        merk: /Geplande betalingen|Paiements planifiés/i,
        nl: 'Uit die twee getallen rekent CreditSoft de geplande betalingen uit: welk bedrag in welke maand. Die lijst is wat later op een borderel belandt.',
        fr: "À partir de ces deux chiffres, CreditSoft calcule les paiements planifiés : quel montant, quel mois. C’est cette liste qui aboutira plus tard sur un bordereau." },

      { naam: 'instellingen', kop: { nl: 'De twee kantoorkeuzes', fr: 'Les deux choix du bureau' },
        doe: async (p) => { await p.goto(`${BASIS}/beheer/commissie-instellingen`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /kwartaal|trimestre/i,
        nl: 'Twee keuzes gelden voor uw hele kantoor. De eerste: rekent u af per maand of per kwartaal. Dat bepaalt wat er in één borderel valt.',
        fr: "Deux choix valent pour tout votre bureau. Le premier : décomptez-vous par mois ou par trimestre. Cela détermine ce qu’un bordereau regroupe." },

      { naam: 'bestaande', kop: { nl: 'Wat er met bestaande gebeurt', fr: 'Ce qu’il advient des existants' },
        // ⚠️ GEEN LOCATOR MET EEN .catch() ERACHTER. Hier stond `beweegNaar(getByText(/…|restent tels/i))`
        // met een terugval die scrolde als het misliep. In het Nederlands matchte het, in het Frans niet —
        // en dan wachtte Playwright eerst 30 SECONDEN op een element dat er niet kwam vóór de terugval
        // greep. De film slaagde: het merkteken klopte, de scène duurde alleen 33,7 s in plaats van 3,5 s,
        // met dertig seconden dode lucht erin. Een terugval die niet faalt maar wél wacht, is even stil.
        //
        // Deze scène wijst niet naar één element; ze toont een stuk tekst. Scrollen is dan de handeling, en
        // die kan niet mislukken.
        doe: async (p) => { await p.mouse.wheel(0, 320); await p.waitForTimeout(1800); },
        merk: /Borderellen die al bestaan|bordereaux/i,
        nl: 'Wijzigt u die keuze, dan blijven de borderellen die al bestaan zoals ze zijn. Ze geldt vanaf de volgende ronde — een afrekening die al gemaakt is, verandert nooit met terugwerkende kracht.',
        fr: "Si vous modifiez ce choix, les bordereaux existants restent tels quels. Il vaut à partir de la série suivante — un décompte déjà établi ne change jamais rétroactivement." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/schemas`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200); },
        merk: /Kenmerk aanbrenger|Référence apporteur/i,
        nl: 'Staat het schema goed, dan hoeft u er niet meer naar om te kijken. In de volgende film zien we wat er dan uit komt: het borderel, het vooruitzicht en wat blijft liggen.',
        fr: "Si le schéma est correct, vous n’avez plus à vous en occuper. Dans le film suivant, nous verrons ce qui en découle : le bordereau, les prévisions et ce qui reste en souffrance." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 8 van de reeks (§14 nummer 10). Commissie UITBETALEN — wat er uit de schema's komt.
  //
  // ⚠️ EEN BORDEREL IS EEN DOCUMENT, GEEN BATCH. De route verwacht een rij uit `commission.documents`
  // (één per aanbrenger); `commission.document_batches` is de maandelijkse RONDE die ze groepeert. Met een
  // batch-id toont het scherm "Dit borderel bestaat niet (meer)" — een correcte melding op een verkeerde
  // vraag. Zie de noot bij ID.borderel.
  //
  // ⚠️ NIETS VERSTUURD, NIETS BETAALD GEZET. De scènes tonen de knoppen; ze drukken er niet op. Versturen
  // zou een mail naar een demo-aanbrenger sturen, betaald zetten zou een boeking wijzigen in een
  // append-only grootboek — en dat krijg je er niet meer uit.
  ['commissie-uitbetalen', {
    pagina: 'credit-management/commission-statements',
    titel: {
      nl: 'Commissie uitbetalen — borderel, vooruitzicht en restanten',
      fr: 'Payer la commission — bordereau, prévisions et reliquats',      en: 'Paying commission — statements, forecast and remainders',

    },
    omschrijving: {
      nl: 'Wat er uit uw commissieschema’s komt: het borderel per aanbrenger met zijn lijnen, het '
        + 'vooruitzicht dat toont wat er de komende maanden nog uitbetaald moet worden, de restanten die '
        + 'nooit op een borderel belandden en waarom, en de fiche 281.50 voor de fiscus.',
      fr: 'Ce qui découle de vos schémas de commission : le bordereau par apporteur avec ses lignes, les '
        + 'prévisions de ce qu’il reste à payer les mois à venir, les reliquats qui ne sont jamais arrivés '
        + 'sur un bordereau et pourquoi, et la fiche 281.50 pour le fisc.',      en: 'From the commission scheme to the 281.50 tax form, without retyping a single amount.',

    },
    uitvoeringen: {
      handleiding: { stem: true },
      // ⚠️ Een ANDER soort film, geen kortere. 30-45 s, geluidloos te begrijpen, en met EIGEN
      //    teksten (`scene.website`) — niet de handleidingzinnen met scènes eruit. Zie films.mjs.
      website: {
        stem: false,
        scenes: ['lijst', 'borderel', 'lijnen', 'fiche', 'slot'],
        talen: [{ ui: 'nl-BE', tekst: 'nl' }, { ui: 'fr-BE', tekst: 'fr' }, { ui: 'nl-BE', tekst: 'en' }],
      },
    },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De borderellen', fr: 'Les bordereaux' , en: 'The statements' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/borderel`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Boekingen|Écritures/i,
        nl: 'Een borderel is de afrekening van één aanbrenger over één periode. Deze lijst toont ze allemaal, met het aantal boekingen en het totaal.',
        fr: "Un bordereau est le décompte d’un apporteur pour une période. Cette liste les montre tous, avec le nombre d’écritures et le total." ,
        website: { nl: 'De afrekening van elke aanbrenger, per periode.', fr: 'Le décompte de chaque apporteur, par période.', en: 'Each broker’s statement, period by period.' } },

      { naam: 'toestand', kop: { nl: 'Openstaand of betaald', fr: 'En attente ou payé' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/^Openstaand$|^En attente$/).first()); await p.waitForTimeout(1600); },
        merk: /Openstaand|En attente/i,
        nl: 'De toestand zegt waar een borderel staat: openstaand zolang het niet betaald is, en betaald zodra u dat vastlegt. Zo ziet u in één blik wat er nog moet.',
        fr: "Le statut indique où en est un bordereau : en attente tant qu’il n’est pas payé, et payé dès que vous l’enregistrez. Vous voyez ainsi d’un coup d’œil ce qui reste à faire." },

      { naam: 'borderel', kop: { nl: 'Eén borderel', fr: 'Un bordereau' , en: 'One statement' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/borderel/${ID.borderel}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /Documentdatum|Date du document/i,
        nl: 'U opent er één en ziet het nummer, de aanbrenger, het bedrag, en of het al verstuurd en afgedrukt is.',
        fr: "Vous en ouvrez un et voyez le numéro, l’apporteur, le montant, et s’il a déjà été envoyé et imprimé." ,
        website: { nl: 'Eén afrekening, met alles wat erin zit.', fr: 'Un décompte, avec tout ce qu’il contient.', en: 'One statement, with everything in it.' } },

      { naam: 'lijnen', kop: { nl: 'De commissielijnen', fr: 'Les lignes de commission' , en: 'The commission lines' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Commissielijnen|Lignes de commission/i).first()); await p.waitForTimeout(1800); },
        merk: /Commissielijnen|Lignes de commission/i,
        nl: 'Daaronder staat waar het bedrag vandaan komt: per lijn het dossier, de klant, het pand en de kredietverstrekker. Uw aanbrenger kan het dus narekenen.',
        fr: "En dessous figure l’origine du montant : par ligne le dossier, le client, le bien et le prêteur. Votre apporteur peut donc le vérifier." ,
        website: { nl: 'Tot op de lijn: waar elk bedrag vandaan komt.', fr: 'Jusqu’à la ligne : d’où vient chaque montant.', en: 'Down to the line: where every amount comes from.' } },

      { naam: 'vooruitzicht', kop: { nl: 'Het vooruitzicht', fr: 'Les prévisions' , en: 'The forecast' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/vooruitzicht`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /Volgende 12 maanden|12 prochains mois/i,
        nl: 'Het vooruitzicht kijkt vooruit in plaats van terug: wat er nog uitbetaald moet worden, per maand en per aanbrenger. Zo weet u wat eraan komt.',
        fr: "Les prévisions regardent en avant plutôt qu’en arrière : ce qu’il reste à payer, par mois et par apporteur. Vous savez ainsi ce qui vient." ,
        website: { nl: 'En wat er nog binnenkomt, vóór het er is.', fr: 'Et ce qui va rentrer, avant qu’il n’arrive.', en: 'And what is still coming, before it arrives.' } },

      // ⚠️ Een EIGEN scène en geen langere zin bij 'vooruitzicht'. De exportbalk staat onder de grafieken;
      // alleen opnieuw opnemen zou hem stilzwijgend in beeld schuiven zonder dat de verteller hem noemt, en
      // dan blijft de functie even onvindbaar als daarvoor. Het merkteken staat op de balk zelf, dus de
      // beloftecontrole faalt zodra de scène hem niet toont.
      // ⚠️ Deze scène moet het TABBLAD openen. Het scherm kreeg op 02/09/2026 twee tabs (Vooruitblik /
      // Per aanbrenger); de exportkaart en de lijst wonen op de tweede. Zonder de klik filmt de scène het
      // grafiektabblad en valt ze op haar eigen merkteken — wat precies is wat je wil, maar dan pas ná een
      // opname van drie minuten.
      { naam: 'transacties', kop: { nl: 'De transacties van een maand', fr: "Les transactions d'un mois" },
        doe: async (p) => {
          await klik(p, tabblad(p, /Per aanbrenger|Par apporteur/i));
          await p.waitForTimeout(1400);
          await beweegNaar(p, p.getByText(/Openstaande transacties in|Transactions en attente pour/i).first());
          await p.waitForTimeout(1600);
        },
        // ⚠️ HERNOMEN 12/09/2026. Eén woord gewijzigd in de app: "transacties VAN" werd "transacties IN"
        //    (en "en attente DE" → "en attente POUR"). Genoeg om de hele film te laten vallen.
        merk: /Openstaande transacties in|Transactions en attente pour/i,
        nl: 'Op het tabblad Per aanbrenger ziet u wat er in een maand nog niet afgerekend is, en haalt u die lijnen op als Excel of CSV. Dat is de lijst waarmee u fouten terugvindt vóór u uitbetaalt.',
        fr: "Sous l’onglet Par apporteur, vous voyez ce qui n’est pas encore réglé pour un mois et vous récupérez ces lignes en Excel ou en CSV. C’est la liste qui vous permet de repérer les erreurs avant de payer." },

      { naam: 'restanten', kop: { nl: 'Wat is blijven liggen', fr: 'Ce qui est resté en souffrance' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/restanten`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        // ⚠️ De Franse zin is "n'ont jamais figuré sur un bordereau" — ik had "jamais arrivé sur" geraden en
        // de scène viel op haar eigen beloftecontrole. Geen leestekens in het merkteken (de apostrof in
        // `n'ont` is precies waar dat eerder al misging), dus op `figuré` en `borderel`.
        merk: /nooit op een borderel|figuré sur un bordereau/i,
        nl: 'De restanten zijn lijnen uit afgelopen perioden die nooit op een borderel belandden. Ze komen niet meer vanzelf, en de kolom Waarom zegt wat eraan scheelt.',
        fr: "Les reliquats sont des lignes de périodes écoulées qui ne sont jamais arrivées sur un bordereau. Elles ne viendront plus d’elles-mêmes, et la colonne Motif indique ce qui cloche." },

      { naam: 'fiche', kop: { nl: 'De fiche 281.50', fr: 'La fiche 281.50' , en: 'The 281.50 form' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/fiche-28150`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /Boekjaar|Exercice/i,
        // ⚠️ De STEM krijgt het getal voluit, de ONDERTITEL houdt "281.50". Dominique hoorde het in de
        // gepubliceerde film: op de cijfervorm maakt de Nederlandse stem er iets anders van. Frans niet —
        // Nicolas leest "281.50" daar correct (nagemeten 02/09/2026 met spraakherkenning), dus daar staat
        // bewust geen uitspraak.
        uitspraak: { nl: 'Eén keer per jaar maakt u de fiches tweehonderdeenentachtig vijftig op: per begunstigde wat er dat boekjaar werkelijk uitbetaald is. U drukt ze in één keer af.' },
        nl: 'Eén keer per jaar maakt u de fiches 281.50 op: per begunstigde wat er dat boekjaar werkelijk uitbetaald is. U drukt ze in één keer af.',
        fr: "Une fois par an, vous établissez les fiches 281.50 : par bénéficiaire ce qui a réellement été payé cet exercice. Vous les imprimez en une fois." ,
        website: { nl: 'De fiche 281.50 rolt eruit.', fr: 'La fiche 281.50 en sort directement.', en: 'The 281.50 tax form comes straight out.' } },

      { naam: 'ontbreekt', kop: { nl: 'Wat er nog moet gebeuren', fr: 'Ce qui doit encore être fait' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/btw-nummer|numéro de TVA/i).first()); await p.waitForTimeout(1800); },
        merk: /btw-nummer|numéro de TVA/i,
        nl: 'Bovenaan waarschuwt het scherm wanneer begunstigden een btw-nummer of een volledig adres missen. Vul die aan vóór u de documenten opmaakt — achteraf is elk blad opnieuw.',
        fr: "En haut, l’écran avertit lorsque des bénéficiaires n’ont pas de numéro de TVA ou d’adresse complète. Complétez-les avant d’établir les documents — après coup, chaque feuille est à refaire." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' , en: 'In closing' },
        doe: async (p) => { await p.goto(`${BASIS}/commissie/borderel`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200); },
        merk: /Boekingen|Écritures/i,
        nl: 'Van het schema tot de fiche loopt alles door: u spreekt één keer af, en de rest volgt eruit. Wat blijft liggen, blijft zichtbaar.',
        fr: "Du schéma à la fiche, tout s’enchaîne : vous convenez une fois, et le reste en découle. Ce qui reste en souffrance reste visible." ,
        website: { nl: 'Van schema tot fiche, zonder overtypen.', fr: 'Du schéma à la fiche, sans rien recopier.', en: 'From scheme to tax form, without retyping.' } },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 9 van de reeks (§14 nummer 12). Verzekeringen — het overzicht en de verzekeraars.
  //
  // ⚠️ HET VERZEKERINGENSCHERM IS EEN GEFILTERDE WEERGAVE over de kredietcontracten, op productcategorie
  // DebtBalanceInsurance (= 3, níét 1 — dat is LeasingRenting). Op die verwarring liep ik op 01/09/2026:
  // eerst telde ik de verkeerde tabel, daarna de verkeerde categoriewaarde, en beide keren leek er niets te
  // staan terwijl er 1.194 contracten waren.
  //
  // ⚠️ DE TWEE STATUSSEN ZIJN HET PUNT van scène 4. `Status` gaat over de POLIS (offerte, medische
  // acceptatie, getekend), `Status dossier` over het kredietdossier eronder. De handleiding wijdt er een
  // kadertekst aan; een film die dat niet opheldert, laat de kijker met precies die vraag zitten.
  ['verzekeringen', {
    pagina: 'credit-management/insurance-contracts',
    titel: {
      nl: 'Verzekeringen — het overzicht en uw verzekeraars',
      fr: 'Assurances — l’aperçu et vos assureurs',
    },
    omschrijving: {
      nl: 'Alle schuldsaldoverzekeringen bij uw dossiers op één lijst: kiezen wat u wil zien met de drie '
        + 'filters bovenaan, de kolommen die ertoe doen — wie er verzekerd is, of de polis nog voorlopig is '
        + 'en of de aanvraaglink vertrokken is — het verschil tussen de status van de polis en die van het '
        + 'dossier, de lijst afdrukken of exporteren, en de fiches van uw verzekeraars.',
      fr: 'Toutes les assurances solde restant dû de vos dossiers sur une seule liste : choisir ce que vous '
        + 'voulez voir avec les trois filtres du haut, les colonnes qui comptent — qui est assuré, si la '
        + 'police est encore provisoire et si le lien de demande est parti — la différence entre le statut '
        + 'de la police et celui du dossier, imprimer ou exporter la liste, et les fiches de vos assureurs.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'lijst', kop: { nl: 'Alle polissen samen', fr: 'Toutes les polices ensemble' },
        doe: async (p) => { await p.goto(`${BASIS}/insurance-contracts`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /Alle producten|Tous les produits/i,
        nl: 'Bij een kredietdossier hoort vaak een schuldsaldoverzekering. Dit scherm haalt ze allemaal samen, over al uw dossiers heen, zodat u ze niet dossier per dossier hoeft te zoeken.',
        fr: "Un dossier de crédit s’accompagne souvent d’une assurance solde restant dû. Cet écran les rassemble toutes, tous dossiers confondus, pour ne pas devoir les chercher dossier par dossier." },

      { naam: 'kiezen', kop: { nl: 'Kiezen wat u ziet', fr: 'Choisir ce que vous voyez' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Alle verantwoordelijken|Tous les responsables/i).first()); await p.waitForTimeout(1700); },
        merk: /Alle verantwoordelijken|Tous les responsables/i,
        nl: 'Bovenaan staan drie keuzes: het product, de status, en de collega die opvolgt. Zo houdt u over wat u nu nodig heeft.',
        fr: "En haut, trois choix : le produit, le statut, et le collègue qui assure le suivi. Vous ne gardez ainsi que ce dont vous avez besoin maintenant." },

      { naam: 'kolommen', kop: { nl: 'Wie er verzekerd is', fr: 'Qui est assuré' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/^Verzekerden$|^Assurés$/).first()); await p.waitForTimeout(1700); },
        merk: /Verzekerden|Assurés/i,
        nl: 'Eén kolom verdient uw aandacht: Verzekerden. Wie verzekerd is, hoeft niet dezelfde persoon te zijn als wie het krediet aanvraagt — en dat verschil telt bij een uitkering.',
        fr: "Une colonne mérite votre attention : Assurés. La personne assurée n’est pas nécessairement celle qui demande le crédit — et cette différence compte lors d’une intervention." },

      { naam: 'voorlopig', kop: { nl: 'Voorlopig en de link', fr: 'Provisoire et le lien' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/^Voorlopig$|^Provisoire$/).first()); await p.waitForTimeout(1700); },
        merk: /Voorlopig|Provisoire/i,
        nl: 'Voorlopig staat op ja zolang er nog geen polisnummer is. En de laatste kolom zegt of de aanvraaglink al naar uw klant vertrokken is — twee dingen die u wil zien zonder elke polis te openen.',
        fr: "Provisoire reste à oui tant qu’il n’y a pas de numéro de police. Et la dernière colonne indique si le lien de demande est déjà parti chez votre client — deux choses à voir sans ouvrir chaque police." },

      { naam: 'statussen', kop: { nl: 'Twee statussen, twee dingen', fr: 'Deux statuts, deux choses' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/^Status$|^Statut$/).first()); await p.waitForTimeout(1800); },
        merk: /Contractnr|contrat/i,
        nl: 'Let op met de status. Die gaat over de polis — offerte, medische acceptatie, getekend. De status van het dossier is iets anders, en staat er als aparte kolom naast. Een polis kan getekend zijn terwijl het dossier nog loopt.',
        fr: "Attention au statut. Il porte sur la police — offre, acceptation médicale, signée. Le statut du dossier est autre chose et figure dans une colonne distincte. Une police peut être signée alors que le dossier est encore en cours." },

      { naam: 'afdruk', kop: { nl: 'Afdrukken of exporteren', fr: 'Imprimer ou exporter' },
        doe: async (p) => { await beweegNaar(p, p.getByText('Afdruk lijst', { exact: true }).or(p.getByText('Imprimer la liste', { exact: true })).first()); await p.waitForTimeout(1700); },
        merk: /Afdruk lijst|Imprimer la liste/i,
        nl: 'Wat u ziet neemt u mee: exporteren geeft u de lijst met uw filters erin, en Afdruk lijst maakt er een blad van dat u kan doorsturen.',
        fr: "Ce que vous voyez, vous l’emportez : l’export vous donne la liste avec vos filtres, et Imprimer la liste en fait une feuille que vous pouvez transmettre." },

      { naam: 'verzekeraars', kop: { nl: 'Uw verzekeraars', fr: 'Vos assureurs' },
        doe: async (p) => { await p.goto(`${BASIS}/credit/insurance-institutions`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Afi-Esca|AG Insurance/i,
        nl: 'De maatschappijen zelf beheert u apart. Dit is de lijst waaruit u kiest wanneer u een polis aanmaakt.',
        fr: "Les compagnies elles-mêmes se gèrent séparément. C’est la liste dans laquelle vous choisissez lors de la création d’une police." },

      { naam: 'fiche', kop: { nl: 'De fiche van een verzekeraar', fr: 'La fiche d’un assureur' },
        doe: async (p) => {
          const rij = p.getByText('AG Insurance', { exact: true }).first();
          await beweegNaar(p, rij); await rij.dblclick();
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
        },
        merk: /Algemene informatie|Informations générales/i,
        nl: 'Een verzekeraar heeft zijn eigen fiche met adres en contactgegevens — en hetzelfde journaal als elke andere fiche: taken, notities, gesprekken en mailverkeer.',
        fr: "Un assureur a sa propre fiche avec adresse et coordonnées — et le même journal que toute autre fiche : tâches, notes, appels et courrier." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.goto(`${BASIS}/insurance-contracts`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200); },
        merk: /Alle producten|Tous les produits/i,
        nl: 'Zo houdt u de polissen bij zonder ze uit het oog te verliezen: één lijst, drie filters, en de dossiers eronder blijven één klik weg.',
        fr: "Vous suivez ainsi les polices sans les perdre de vue : une liste, trois filtres, et les dossiers en dessous restent à un clic." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 10 van de reeks (§14 nummer 13). Het dashboard — en waarom het van uw eigen instellingen afhangt.
  //
  // ⚠️ GEEN SCÈNE OVER "NIET INGEDEELD". De handleiding legt uit wat er gebeurt met statussen die aan geen
  // enkele fase hangen — maar in de demo is álles ingedeeld, dus dat woord staat nergens op het scherm.
  // Gemeten vóór het schrijven. Een scène erover zou een belofte zijn boven iets dat niet te zien is.
  //
  // ⚠️ De drie grafieken en de vier tegels volgen het JAAR bovenaan. Dat is scène 1, want zonder dat leest
  // de rest van het scherm als een reeks losse getallen.
  // ⚠️ DE FRANSE VERSIE STAAT BEWUST OP ±181 s, net boven de richtduur van 180 uit §1. Twee zinnen zijn al
  // ingekort; verder snijden kost inhoud, en dit is het dichtste scherm van de app — tien scènes die elk
  // een misverstand wegnemen. De grendel meldt het elke ronde, en dat is de bedoeling: een bewuste
  // afwijking hoort zichtbaar te blijven.
  //
  // ⚠️ En verder korten helpt niet betrouwbaar: de lengte is niet tot op de seconde herhaalbaar. Eén zin
  // inkorten gaf 180,4 → 181,2 s — de handelingen in de browser duren per opname net iets anders, en dat
  // verschil is groter dan de winst. Wie hier op een exact getal mikt, jaagt op ruis.
  ['dashboard', {
    pagina: 'getting-started/dashboard',
    titel: {
      nl: 'Het dashboard — uw kantoor in één scherm',
      fr: 'Le tableau de bord — votre bureau en un écran',      en: 'The dashboard — your working screen',

    },
    omschrijving: {
      nl: 'Het startscherm gelezen zoals het bedoeld is: het jaar bovenaan dat alles stuurt, de vier tegels '
        + 'met aantallen en bedragen, de termijnen die vandaag actie vragen, de drie grafieken over het '
        + 'gerealiseerde volume, de pijplijn met uw dossiers per fase, en het scherm waar u die fases zelf '
        + 'samenstelt. Plus waarom uw dashboard er anders uitziet dan dat van een collega.',
      fr: 'L’écran d’accueil lu comme il se doit : l’année en haut qui pilote tout, les quatre tuiles avec '
        + 'les nombres et les montants, les délais qui demandent une action aujourd’hui, les trois graphiques '
        + 'du volume réalisé, le pipeline de vos dossiers par phase, et l’écran où vous composez ces phases. '
        + 'Ainsi que la raison pour laquelle votre tableau de bord diffère de celui d’un collègue.',      en: 'Your files by group, what needs action today, and every file in the phase it is in.',

    },
    uitvoeringen: {
      handleiding: { stem: true },
      // ⚠️ Een ANDER soort film, geen kortere. 30-45 s, geluidloos te begrijpen, en met EIGEN
      //    teksten (`scene.website`) — niet de handleidingzinnen met scènes eruit. Zie films.mjs.
      website: {
        stem: false,
        scenes: ['jaar', 'tegels', 'volume', 'pijplijn', 'slot'],
        talen: [{ ui: 'nl-BE', tekst: 'nl' }, { ui: 'fr-BE', tekst: 'fr' }, { ui: 'nl-BE', tekst: 'en' }],
      },
    },
    scenes: [
      { naam: 'jaar', kop: { nl: 'Het jaar stuurt alles', fr: 'L’année pilote tout' , en: 'Your home screen' },
        doe: async (p) => { await p.goto(`${BASIS}/dashboard`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(3200); },
        merk: /Aktes|Actes/i,
        nl: 'Dit is uw startscherm. Bovenaan staat een jaartal met twee pijltjes, en dat is de belangrijkste knop van dit scherm: de tegels en de grafieken eronder gaan allemaal over dát jaar.',
        fr: "Voici votre écran d’accueil. En haut figure une année avec deux flèches, et c’est le bouton le plus important de cet écran : les tuiles et les graphiques en dessous portent tous sur cette année-là." ,
        website: { nl: 'Alles van uw kantoor op één scherm.', fr: 'Tout votre bureau sur un seul écran.', en: 'Your whole office on one screen.' } },

      { naam: 'tegels', kop: { nl: 'De vier tegels', fr: 'Les quatre tuiles' , en: 'The four tiles' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/In te dienen|À introduire/i).first()); await p.waitForTimeout(1700); },
        merk: /In te dienen|À introduire/i,
        nl: 'De vier tegels tellen uw dossiers per groep, met het bedrag erbij: wat er nog in te dienen is, wat ingediend is, wat er getekend werd, en de aktes.',
        fr: "Les quatre tuiles comptent vos dossiers par groupe, montant compris : ce qui reste à introduire, ce qui est introduit, ce qui a été signé, et les actes." ,
        website: { nl: 'Uw dossiers per groep, met het bedrag erbij.', fr: 'Vos dossiers par groupe, montant compris.', en: 'Your files by group, with the amount.' } },

      { naam: 'termijnen', kop: { nl: 'Wat vandaag actie vraagt', fr: 'Ce qui demande une action' , en: 'What needs action' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Termijn nadert|Délai proche/i).first()); await p.waitForTimeout(1800); },
        merk: /Termijn nadert|Délai proche/i,
        nl: 'Daaronder staan twee blokken die zeggen wat er nu ligt: termijn verstreken en termijn nadert. Ze kijken naar vier datums — de offerte tekenen, de akte verlijden, de opschortende voorwaarden, en het EPC-attest.',
        fr: "En dessous, deux blocs disent ce qui est en jeu : délai dépassé et délai proche. Ils regardent quatre dates — signer l’offre, passer l’acte, les conditions suspensives, et le certificat PEB." ,
        website: { nl: 'Wat vandaag actie vraagt, staat bovenaan.', fr: 'Ce qui demande une action aujourd’hui, en haut.', en: 'What needs action today sits at the top.' } },

      { naam: 'volume', kop: { nl: 'Gerealiseerd volume', fr: 'Volume réalisé' , en: 'Realised volume' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Gerealiseerd volume per maand|Volume réalisé par mois/i).first()); await p.waitForTimeout(1800); },
        merk: /Gerealiseerd volume per maand|Volume réalisé par mois/i,
        nl: 'De eerste grafiek toont uw gerealiseerde volume per maand — dus kredieten die effectief doorgingen. Zo ziet u welke maanden dragen en welke achterblijven.',
        fr: "Le premier graphique montre votre volume réalisé par mois — donc les crédits qui ont effectivement abouti. Vous voyez ainsi quels mois portent et lesquels sont à la traîne." ,
        website: { nl: 'Uw gerealiseerd volume, maand per maand.', fr: 'Votre volume réalisé, mois par mois.', en: 'Your realised volume, month by month.' } },

      { naam: 'verdeling', kop: { nl: 'Per instelling en per collega', fr: 'Par institution et par collègue' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Volume per instelling|Volume par institution/i).first()); await p.waitForTimeout(1800); },
        merk: /Volume per instelling|Volume par institution/i,
        nl: 'Daarnaast staat hetzelfde volume verdeeld: per kredietinstelling, en per verantwoordelijke. Twee ringen die zeggen waar uw werk terechtkomt.',
        fr: "À côté, le même volume réparti : par organisme de crédit, et par responsable. Deux anneaux qui indiquent où votre travail aboutit." },

      { naam: 'eigenaar', kop: { nl: 'Geen eigenaar is werk', fr: 'Sans responsable, c’est du travail' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Geen eigenaar|Sans responsable/i).first()); await p.waitForTimeout(1800); },
        merk: /Geen eigenaar|Sans responsable/i,
        nl: 'Ziet u een groot stuk Geen eigenaar staan, dan is dat geen storing maar werk: er is bij die dossiers nog niemand aangeduid. Hetzelfde geldt voor Onbekend bij de instellingen.',
        fr: "Si vous voyez une grande part Sans responsable, ce n’est pas un dysfonctionnement mais du travail : personne n’a encore été désigné sur ces dossiers. Il en va de même pour Inconnu chez les organismes." },

      { naam: 'pijplijn', kop: { nl: 'De pijplijn', fr: 'Le pipeline' , en: 'The pipeline' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Dossiers per fase|Dossiers par phase/i).first()); await p.waitForTimeout(1800); },
        merk: /Dossiers per fase|Dossiers par phase/i,
        nl: 'Onderaan staan uw dossiers gegroepeerd per fase, met per fase het aantal, het bedrag, en de statussen die eronder vallen. Klik op een fase en u ziet de dossiers erachter.',
        fr: "En bas, vos dossiers sont regroupés par phase, avec par phase le nombre, le montant, et les statuts qui en relèvent. Cliquez sur une phase et vous voyez les dossiers derrière." ,
        website: { nl: 'En elk dossier in de fase waar het staat.', fr: 'Et chaque dossier dans la phase où il se trouve.', en: 'And every file in the phase it is in.' } },

      { naam: 'fases', kop: { nl: 'De fases zijn van u', fr: 'Les phases sont les vôtres' },
        doe: async (p) => { await p.goto(`${BASIS}/beheer/dashboard-fases`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /Beginstatus van een nieuw dossier|Statut de départ/i,
        nl: 'Die fases stelt u zelf samen. Hier bepaalt u welke statussen bij welke fase horen, en met welke status een nieuw dossier begint — CreditSoft kiest dat niet voor u, want het verschilt per kantoor.',
        fr: "Ces phases, vous les composez vous-même : quels statuts relèvent de quelle phase, et avec quel statut commence un nouveau dossier. CreditSoft ne le choisit pas pour vous, car cela varie d’un bureau à l’autre." },

      { naam: 'verschil', kop: { nl: 'Waarom uw scherm anders is', fr: 'Pourquoi votre écran diffère' },
        doe: async (p) => { await p.goto(`${BASIS}/dashboard`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2800); },
        merk: /Aktes|Actes/i,
        nl: 'Nog dit: uw dashboard toont wat u mag zien. Heeft een collega geen toegang tot bepaalde dossiers, dan tellen die ook niet mee in zijn cijfers. Twee mensen kunnen dus verschillende aantallen zien, en dat klopt.',
        fr: "Votre tableau de bord montre ce que vous avez le droit de voir. Si un collègue n’a pas accès à certains dossiers, ceux-ci ne comptent pas dans ses chiffres. Deux personnes peuvent donc voir des nombres différents, et c’est normal." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' , en: 'In closing' },
        doe: async (p) => { await p.waitForTimeout(1200); },
        merk: /Aktes|Actes/i,
        nl: 'Het dashboard is geen rapport maar een werkscherm: het zegt wat er vandaag ligt, en waar u het vindt.',
        fr: "Le tableau de bord n’est pas un rapport mais un écran de travail : il dit ce qui est en jeu aujourd’hui, et où le trouver." ,
        website: { nl: 'Geen rapport. Een werkscherm.', fr: 'Pas un rapport. Un écran de travail.', en: 'Not a report. A working screen.' } },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 11 van de reeks (§14 nummer 14). Lijsten naar je hand zetten, en wat je ermee meeneemt.
  //
  // ⚠️ HET GLOBAAL OVERZICHT als toneel, en niet een willekeurige lijst: het is de grootste (4.000 dossiers,
  // twaalf kolommen) en het draagt als enige de groepeerbalk. Wat je hier ziet, geldt op elke lijst.
  //
  // ⚠️ GEEN SCÈNE DIE EEN RAPPORT ÉCHT OPENT. De tegel opent een venster dat een periode vraagt; dat
  // betrouwbaar aansturen in een film kost meer dan het opbrengt, en een half geopend venster is erger dan
  // geen. De scène toont de bibliotheek en één tegel met haar omschrijving — dat is wat de kijker moet
  // weten om te kiezen.
  ['lijsten-en-rapporten', {
    pagina: 'credit-management/filteren-in-lijsten',
    titel: {
      nl: 'Lijsten en rapporten — zoeken, filteren en meenemen',
      fr: 'Listes et rapports — chercher, filtrer et emporter',
    },
    omschrijving: {
      nl: 'Elke lijst in CreditSoft werkt hetzelfde, en dit is hoe u ze naar uw hand zet: de keuzelijsten '
        + 'bovenaan, het trechtertje op een kolomkop, groeperen door een kolom te verslepen, en wat u '
        + 'meeneemt — afdrukken en exporteren volgen altijd uw filters. Plus de negen rapporten, waar u een '
        + 'periode kiest en een voorbeeld krijgt dat u kan downloaden of doorsturen.',
      fr: 'Toutes les listes de CreditSoft fonctionnent de la même manière, et voici comment les adapter : '
        + 'les listes déroulantes du haut, l’entonnoir sur un en-tête de colonne, le regroupement en '
        + 'déplaçant une colonne, et ce que vous emportez — l’impression et l’export suivent toujours vos '
        + 'filtres. Ainsi que les neuf rapports, où vous choisissez une période et obtenez un aperçu.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'overzicht', kop: { nl: 'Het globaal overzicht', fr: 'L’aperçu global' },
        doe: async (p) => { await p.goto(`${BASIS}/credit-files/overview`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2800); },
        merk: /Sleep een kolomkop|Déplacer l.entête/i,
        nl: 'Dit is de grootste lijst van CreditSoft: al uw dossiers met hun status, fase, instelling en doorlooptijd. Wat u hier leert, werkt op elke lijst in de toepassing.',
        fr: "Voici la plus grande liste de CreditSoft : tous vos dossiers avec leur statut, leur phase, l’organisme et la durée. Ce que vous apprenez ici fonctionne sur toutes les listes." },

      { naam: 'keuzelijsten', kop: { nl: 'De keuzelijsten bovenaan', fr: 'Les listes déroulantes du haut' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Alle sales|Tous les sales/i).first()); await p.waitForTimeout(1700); },
        merk: /Alle sales|Tous les sales/i,
        nl: 'Bovenaan staan de grove keuzes: status, instelling, verantwoordelijke, sales. Ernaast ziet u hoeveel dossiers er overblijven van het totaal — zo weet u altijd hoe hard u aan het filteren bent.',
        fr: "En haut, les choix larges : statut, organisme, responsable, sales. À côté, vous voyez combien de dossiers subsistent sur le total — vous savez donc toujours à quel point vous filtrez." },

      { naam: 'trechter', kop: { nl: 'Het trechtertje', fr: 'L’entonnoir' },
        doe: async (p) => {
          const kop = p.locator('th').nth(2);
          await beweegNaar(p, kop); await p.waitForTimeout(900);
          await kop.locator('button, [role=button], [class*=filter]').first().click({ force: true });
          await p.waitForTimeout(1800);
        },
        merk: /Waarden|Valeurs/i,
        nl: 'Fijner filtert u op de kolom zelf. Beweeg over een kolomkop en er verschijnt een trechtertje: daarmee kiest u precies welke waarden u wil zien.',
        fr: "Pour affiner, filtrez sur la colonne elle-même. Survolez un en-tête et un entonnoir apparaît : vous choisissez ainsi exactement quelles valeurs afficher." },

      { naam: 'toepassen', kop: { nl: 'Toepassen', fr: 'Appliquer' },
        doe: async (p) => { await beweegNaar(p, p.getByText('Toepassen', { exact: true }).or(p.getByText('Appliquer', { exact: true })).first()); await p.waitForTimeout(1600); },
        merk: /Toepassen|Appliquer/i,
        nl: 'U vinkt aan wat u zoekt en klikt op Toepassen. Combineert u meerdere kolommen, dan gelden ze samen — en het aantal bovenaan zakt mee.',
        fr: "Vous cochez ce que vous cherchez et cliquez sur Appliquer. Si vous combinez plusieurs colonnes, elles s’appliquent ensemble — et le nombre en haut diminue en conséquence." },

      { naam: 'groeperen', kop: { nl: 'Groeperen', fr: 'Regrouper' },
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(700);
          await beweegNaar(p, p.getByText(/Sleep een kolomkop|Déplacer l.entête/i).first()); await p.waitForTimeout(1700);
        },
        merk: /Sleep een kolomkop|Déplacer l.entête/i,
        nl: 'Boven de kolommen staat een balk. Sleept u er een kolomkop naartoe, dan groepeert de lijst zich op die kolom — bijvoorbeeld per instelling of per fase.',
        fr: "Au-dessus des colonnes se trouve une barre. En y déplaçant un en-tête, la liste se regroupe sur cette colonne — par organisme ou par phase, par exemple." },

      { naam: 'meenemen', kop: { nl: 'Afdrukken en exporteren', fr: 'Imprimer et exporter' },
        doe: async (p) => { await beweegNaar(p, p.getByText('Afdruk lijst', { exact: true }).or(p.getByText('Imprimer la liste', { exact: true })).first()); await p.waitForTimeout(1700); },
        merk: /Afdruk lijst|Imprimer la liste/i,
        nl: 'En dan het belangrijkste: exporteren en afdrukken volgen uw filters. Wat u op het scherm hebt staan, is wat er in het bestand komt — niet de hele lijst.',
        fr: "Et le plus important : l’export et l’impression suivent vos filtres. Ce que vous avez à l’écran est ce qui se retrouve dans le fichier — pas la liste entière." },

      { naam: 'rapporten', kop: { nl: 'De rapporten', fr: 'Les rapports' },
        doe: async (p) => { await p.goto(`${BASIS}/rapporten`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Kies een rapport|Choisissez un rapport/i,
        nl: 'Wilt u niet zelf filteren maar een vast overzicht, dan zijn er de rapporten: negen stuks, gegroepeerd per onderwerp.',
        fr: "Si vous ne voulez pas filtrer vous-même mais obtenir un aperçu établi, il y a les rapports : neuf au total, groupés par thème." },

      { naam: 'tegel', kop: { nl: 'Kiezen wat u nodig heeft', fr: 'Choisir ce dont vous avez besoin' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Status periodiek op ingavedatum|Statut par période sur la date/i).first()); await p.waitForTimeout(1900); },
        merk: /Status periodiek op ingavedatum|Statut par période sur la date/i,
        nl: 'Elke tegel zegt in één zin wat het rapport telt en waarop het telt — op ingavedatum of op aktedatum, bijvoorbeeld. Dat verschil bepaalt uw cijfer, dus het staat er met opzet bij.',
        fr: "Chaque tuile dit en une phrase ce que le rapport compte et sur quelle date — la date d’encodage ou la date d’acte, par exemple. Cette différence détermine votre chiffre, elle est donc mentionnée à dessein." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.goto(`${BASIS}/credit-files/overview`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /Sleep een kolomkop|Déplacer l.entête/i,
        nl: 'Zoeken, filteren, groeperen, meenemen. Vier handelingen die op elke lijst hetzelfde werken — en die u de rest van CreditSoft cadeau geven.',
        fr: "Chercher, filtrer, regrouper, emporter. Quatre gestes identiques sur toutes les listes — et qui vous donnent le reste de CreditSoft par-dessus le marché." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 12 van de reeks (§14 nummer 15). De mailketen — en de VOLGORDE is hier het onderwerp.
  //
  // ⚠️ VAN BUITEN NAAR BINNEN, zoals de keten ook gebouwd is (projectgeheugen, 30/07/2026): eerst de
  // brongegevens (bedrijfsfiche, verzendadres), dan de bouwstenen (sjabloon, variabelen), dan de kern
  // (versturen), dan het oppervlak (waar het terechtkomt). Een film die met "mail versturen" begint, moet
  // daarna vier keer terug — en dan snapt niemand waaróm die stukken bestaan.
  ['mailketen', {
    pagina: 'administration/sender-addresses',
    titel: {
      nl: 'De mailketen — van uw gegevens tot een verzonden bericht',
      fr: 'La chaîne d’e-mails — de vos données au message envoyé',
    },
    omschrijving: {
      nl: 'Wat er allemaal klopt moet zijn vóór er één mail vertrekt, in de volgorde waarin het samenhangt: '
        + 'uw bedrijfsfiche die de variabelen vult, het verzendadres waar alles vanuit vertrekt, de '
        + 'tweetalige sjablonen met hun variabelenpalet en voorbeeld, en tot slot waar u ziet of een bericht '
        + 'werkelijk afgeleverd is — inclusief de reden wanneer dat niet lukte.',
      fr: 'Tout ce qui doit être en ordre avant qu’un seul e-mail parte, dans l’ordre où cela s’enchaîne : '
        + 'votre fiche d’entreprise qui alimente les variables, l’adresse d’expédition d’où tout part, les '
        + 'modèles bilingues avec leur panneau de variables et leur aperçu, et enfin l’endroit où vous voyez '
        + 'si un message a réellement été distribué — motif compris lorsque cela échoue.',
    },
    uitvoeringen: { handleiding: { stem: true } },
    scenes: [
      { naam: 'bedrijfsfiche', kop: { nl: 'Uw eigen gegevens', fr: 'Vos propres données' },
        doe: async (p) => { await p.goto(`${BASIS}/administration/company-profile`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /FSMA/i,
        nl: 'Een mail begint niet bij het schrijven maar bij uw eigen gegevens. Wat hier staat — uw naam, adres, btw- en FSMA-nummer — vult straks automatisch de brieven en mails die u verstuurt.',
        fr: "Un e-mail ne commence pas à la rédaction mais par vos propres données. Ce qui figure ici — nom, adresse, numéro de TVA et FSMA — remplira automatiquement les courriers et e-mails que vous envoyez." },

      { naam: 'verzendadres', kop: { nl: 'Waar uw mail vandaan komt', fr: 'D’où part votre courrier' },
        doe: async (p) => { await p.goto(`${BASIS}/administration/sender-addresses`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        merk: /softwareleverancier|fournisseur de logiciel/i,
        nl: 'Dan het adres waar uw mail vandaan komt. Eén ervan is de standaard, en daar vertrekt alles vanuit — ook sjablonen zonder eigen afzender. Zo komt uw mail nooit aan op naam van uw softwareleverancier.',
        fr: "Ensuite l’adresse d’où part votre courrier. L’une d’elles est celle par défaut, et tout part de là — y compris les modèles sans expéditeur propre. Vos e-mails n’arrivent ainsi jamais au nom de votre fournisseur de logiciel." },

      { naam: 'domein', kop: { nl: 'Uw eigen domein', fr: 'Votre propre domaine' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/eigen domein|propre domaine/i).first()); await p.waitForTimeout(1700); },
        merk: /eigen domein|propre domaine/i,
        nl: 'Wilt u mailen vanaf uw eigen domein, dan vraagt u dat aan bij ADM. Wij regelen de registratie; u hoeft zelf niets in te stellen.',
        fr: "Si vous souhaitez envoyer depuis votre propre domaine, vous en faites la demande auprès d’ADM. Nous nous chargeons de l’enregistrement ; vous n’avez rien à configurer." },

      { naam: 'sjablonen', kop: { nl: 'De sjablonen', fr: 'Les modèles' },
        doe: async (p) => { await p.goto(`${BASIS}/administration/mail-templates`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /company.name/i,
        nl: 'Met die twee dingen op orde komen de sjablonen. Elk sjabloon bestaat in het Nederlands en het Frans, en u past er het onderwerp, de tekst, de afzender en de bijlagen van aan.',
        fr: "Ces deux éléments en ordre, viennent les modèles. Chaque modèle existe en néerlandais et en français, et vous en adaptez l’objet, le texte, l’expéditeur et les pièces jointes." },

      { naam: 'variabelen', kop: { nl: 'De variabelen', fr: 'Les variables' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/company.name/i).first()); await p.waitForTimeout(1800); },
        merk: /company.name/i,
        nl: 'In de tekst zet u variabelen tussen dubbele accolades. U sleept ze uit het palet, en bij het versturen worden ze vervangen door de echte gegevens — uw kantoornaam, de klant, het dossiernummer.',
        fr: "Dans le texte, vous placez des variables entre doubles accolades. Vous les glissez depuis le panneau, et à l’envoi elles sont remplacées par les données réelles — le nom de votre bureau, le client, le numéro de dossier." },

      { naam: 'verzonden', kop: { nl: 'Wat de klant kreeg', fr: 'Ce que le client a reçu' },
        doe: async (p) => {
          await p.goto(`${BASIS}/crm/relaties/${ID.relatie}`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400);
          await klik(p, tabblad(p, /^Mailverkeer|^Courrier/i)); await p.waitForTimeout(2200);
        },
        merk: /ontvangstbevestiging/i,
        nl: 'Elke verstuurde mail blijft bij de fiche staan, met de tekst zoals uw klant hem kreeg. U hoeft dus niet in uw eigen mailbox te zoeken wat er precies vertrokken is.',
        fr: "Chaque e-mail envoyé reste sur la fiche, avec le texte tel que votre client l’a reçu. Vous ne devez donc pas chercher dans votre propre boîte ce qui est parti." },

      { naam: 'monitoring', kop: { nl: 'Is het aangekomen', fr: 'Est-ce bien arrivé' },
        doe: async (p) => { await p.goto(`${BASIS}/administration/mail-monitoring`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        merk: /Aflevering|Reden|Objet|Distribution/i,
        nl: 'En over alle fiches heen is er de mailmonitoring: elk bericht met zijn afleverstatus. Kwam iets niet aan, dan staat de reden ernaast.',
        fr: "Et par-dessus toutes les fiches, il y a le suivi des e-mails : chaque message avec son statut de distribution. Si quelque chose n’est pas arrivé, le motif figure à côté." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' },
        doe: async (p) => { await p.goto(`${BASIS}/administration/sender-addresses`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2200); },
        merk: /softwareleverancier|fournisseur de logiciel/i,
        nl: 'Vier stukken die samenhangen: uw gegevens, uw adres, uw sjablonen, en het bewijs dat het aankwam. Staat de eerste twee goed, dan hoeft u aan de rest weinig meer te doen.',
        fr: "Quatre éléments qui s’enchaînent : vos données, votre adresse, vos modèles, et la preuve que c’est arrivé. Si les deux premiers sont corrects, le reste ne demande plus grand-chose." },
    ],
  }],

  // ─────────────────────────────────────────────────────────────────────────────────────────────────────
  // FILM 13 van de reeks (§14 nummer 16), maar met een ANDERE SNEDE dan daar stond.
  //
  // ⚠️ §14 zei "klantenportaal — door de ogen van de klant". Dat toont film 5 (documentketen) al: de scène
  // `klantblik` opent het portaal precies zoals de klant het krijgt. Nog een film over datzelfde beeld zou
  // herhaling zijn.
  //
  // Wat er NIET in zat is de andere kant: hoe je het portaal je eigen gezicht geeft. Dat is een echt
  // onderwerp — een klant die een link krijgt, moet ZIJN makelaar herkennen en niet een softwarepakket.
  //
  // ⚠️ EN NIET het AANBRENGERSportaal. `portaal/index` en `portaal/overzicht` gaan daarover, en dat luik is
  // uitgesteld tot het af is (zie de noot bij `aanbrengers` in §14).
  ['klantportaal', {
    pagina: 'beheer/klantportaal',
    titel: {
      nl: 'Het klantenportaal — hoe uw klant u ziet',
      fr: 'Le portail client — comment votre client vous voit',      en: 'The client portal — how your client sees you',

    },
    omschrijving: {
      nl: 'Uw klant krijgt een link en belandt op een portaal. Dit is waar u bepaalt wat hij daar ziet: uw '
        + 'naam, uw kleur, uw logo en een welkomsttekst in beide talen. Elk veld dat u leeg laat, valt terug '
        + 'op uw bedrijfsfiche — u hoeft dus niets in te vullen om te beginnen. En tot slot het resultaat, '
        + 'zoals uw klant het krijgt.',
      fr: 'Votre client reçoit un lien et arrive sur un portail. C’est ici que vous déterminez ce qu’il y '
        + 'voit : votre nom, votre couleur, votre logo et un texte d’accueil dans les deux langues. Chaque '
        + 'champ laissé vide reprend votre fiche d’entreprise — vous n’avez donc rien à remplir pour '
        + 'démarrer. Et pour finir le résultat, tel que votre client le reçoit.',      en: 'Your clients and brokers follow their own file, in your name and your colours.',

    },
    uitvoeringen: {
      handleiding: { stem: true },
      // ⚠️ Een ANDER soort film, geen kortere. 30-45 s, geluidloos te begrijpen, en met EIGEN
      //    teksten (`scene.website`) — niet de handleidingzinnen met scènes eruit. Zie films.mjs.
      website: {
        stem: false,
        scenes: ['scherm', 'gezicht', 'welkomst', 'resultaat', 'slot'],
        talen: [{ ui: 'nl-BE', tekst: 'nl' }, { ui: 'fr-BE', tekst: 'fr' }, { ui: 'nl-BE', tekst: 'en' }],
      },
    },
    scenes: [
      { naam: 'scherm', kop: { nl: 'Uw portaal instellen', fr: 'Configurer votre portail' , en: 'Your portal' },
        doe: async (p) => { await p.goto(`${BASIS}/beheer/klantportaal`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600); },
        // ⚠️ HERNOMEN 12/09/2026. Stond hier: /Naam zoals de klant hem ziet|…le client le voit/i. Dat label
        //    werd "Naam zoals BEZOEKERS hem zien" — het scherm dekt sinds die wijziging twee portalen (klant
        //    én makelaar) en heet nu Portaalvormgeving. De film viel daardoor op zijn EERSTE scène, en dat
        //    is precies zoals het hoort: geen halve film met een verkeerd scherm erin.
        merk: /Naam zoals bezoekers hem zien|Nom tel que les visiteurs le voient/i,
        nl: 'Wanneer u een klant uitnodigt, krijgt hij een link naar zijn portaal. Op dit scherm bepaalt u wat hij daar te zien krijgt.',
        fr: "Lorsque vous invitez un client, il reçoit un lien vers son portail. Sur cet écran, vous déterminez ce qu’il y verra." ,
        website: { nl: 'Uw klanten en aanbrengers volgen hun dossier zelf.', fr: 'Vos clients et apporteurs suivent leur dossier eux-mêmes.', en: 'Your clients and brokers follow their file themselves.' } },

      { naam: 'niets', kop: { nl: 'U hoeft niets in te vullen', fr: 'Rien à remplir' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/bedrijfsfiche over|fiche d.entreprise/i).first()); await p.waitForTimeout(1800); },
        merk: /bedrijfsfiche|fiche d.entreprise/i,
        nl: 'Om te beginnen hoeft u hier niets te doen. Elk veld dat u leeg laat, neemt de gegevens van uw bedrijfsfiche over — naam, logo, contactgegevens.',
        fr: "Pour démarrer, vous n’avez rien à faire ici. Chaque champ laissé vide reprend les données de votre fiche d’entreprise — nom, logo, coordonnées." },

      { naam: 'gezicht', kop: { nl: 'Uw naam en uw kleur', fr: 'Votre nom et votre couleur' , en: 'Your name, your colour' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Hoofdkleur|Couleur principale/i).first()); await p.waitForTimeout(1800); },
        merk: /Hoofdkleur|Couleur principale/i,
        nl: 'Wilt u het wél naar uw hand zetten: de naam zoals uw klant hem ziet, uw hoofdkleur, de kopbalk en uw logo. Uw klant herkent zo zijn makelaar, en niet een softwarepakket.',
        fr: "Si vous souhaitez l’adapter : le nom tel que votre client le voit, votre couleur principale, le bandeau et votre logo. Votre client reconnaît ainsi son courtier, et non un logiciel." ,
        website: { nl: 'In uw naam en uw kleuren, niet in de onze.', fr: 'À votre nom et à vos couleurs, pas aux nôtres.', en: 'In your name and your colours, not ours.' } },

      { naam: 'welkomst', kop: { nl: 'De welkomsttekst', fr: 'Le texte d’accueil' , en: 'The welcome text' },
        doe: async (p) => { await beweegNaar(p, p.getByText(/Welkomsttitel \(FR\)|Titre d.accueil \(FR\)/i).first()); await p.waitForTimeout(1800); },
        merk: /Welkomsttitel|Titre d.accueil/i,
        nl: 'De welkomsttitel en -tekst geeft u in beide talen op. Welke uw klant te zien krijgt, hangt af van zijn documenttaal — die staat op zijn relatiefiche.',
        fr: "Le titre et le texte d’accueil se saisissent dans les deux langues. Celui que verra votre client dépend de sa langue de documents — indiquée sur sa fiche de relation." ,
        website: { nl: 'Met uw eigen welkomsttekst, in beide talen.', fr: 'Avec votre propre texte d’accueil, dans les deux langues.', en: 'With your own welcome text, in both languages.' } },

      { naam: 'resultaat', kop: { nl: 'Wat uw klant krijgt', fr: 'Ce que reçoit votre client' , en: 'What your client gets' },
        doe: async (p) => {
          await p.goto(`${BASIS}/klantportaal/voorbeeld/${ID.dossierMetSchema}`);
          await p.waitForLoadState('networkidle'); await p.waitForTimeout(2600);
        },
        merk: /Welkom bij uw dossier|Bienvenue dans votre dossier/i,
        nl: 'En dit is het resultaat: uw naam bovenaan, uw kleuren, uw welkomsttekst — en daaronder de stukken die u van hem nodig heeft.',
        fr: "Et voici le résultat : votre nom en haut, vos couleurs, votre texte d’accueil — et en dessous les pièces dont vous avez besoin de lui." ,
        website: { nl: 'Dit is wat uw klant te zien krijgt.', fr: 'Voilà ce que votre client reçoit.', en: 'This is what your client sees.' } },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: 'Pour conclure' , en: 'In closing' },
        doe: async (p) => { await p.goto(`${BASIS}/beheer/klantportaal`); await p.waitForLoadState('networkidle'); await p.waitForTimeout(2400); },
        // ⚠️ HERNOMEN 12/09/2026. Stond hier: /Naam zoals de klant hem ziet|…le client le voit/i. Dat label
        //    werd "Naam zoals BEZOEKERS hem zien" — het scherm dekt sinds die wijziging twee portalen (klant
        //    én makelaar) en heet nu Portaalvormgeving. De film viel daardoor op zijn EERSTE scène, en dat
        //    is precies zoals het hoort: geen halve film met een verkeerd scherm erin.
        merk: /Naam zoals bezoekers hem zien|Nom tel que les visiteurs le voient/i,
        nl: 'Eén keer instellen, en elke klant die u daarna uitnodigt komt op úw portaal terecht.',
        fr: "Une seule configuration, et chaque client que vous invitez ensuite arrive sur VOTRE portail." ,
        website: { nl: 'Eén keer instellen. Daarna elke klant.', fr: 'Une seule configuration. Ensuite chaque client.', en: 'Set it up once. Then every client.' } },
    ],
  }],

  ['kredietdossiers-basis', {
    pagina: 'credit-management/credit-files',
    // ⚠️ EEN MENSELIJKE TITEL EN OMSCHRIJVING, per taal. De technische naam ("kredietdossiers-basis-nl") is
    // een sleutel, geen titel: hij stond als videotitel bij Bunny en zou ook in de speler verschijnen.
    // Belangrijker nog: deze twee voeden de schema.org-VideoObject op de handleidingpagina, en dát is wat
    // een zoekmachine leest. Bunny zelf wordt niet geïndexeerd — docs.creditsoft.be wel.
    titel: {
      nl: 'Het kredietdossier in CreditSoft — van lijst tot journaal',
      fr: 'Le dossier de crédit dans CreditSoft — de la liste au journal',
      en: 'The credit file in CreditSoft — from list to journal',
    },
    omschrijving: {
      nl: 'Een rondleiding door het kredietdossier: de lijst filteren en doorzoeken, een dossier openen, '
        + 'de dossiergegevens, de kredietaanvragers, het pand, de gevraagde documenten, en het journaal met '
        + 'de taken, notities, gesprekken en commissieschema\u2019s die bij dat ene dossier horen.',
      fr: 'Une visite guid\u00e9e du dossier de cr\u00e9dit : filtrer et rechercher dans la liste, ouvrir un '
        + 'dossier, les donn\u00e9es du dossier, les demandeurs de cr\u00e9dit, le bien, les documents '
        + 'demand\u00e9s, et le journal avec les t\u00e2ches, notes, appels et sch\u00e9mas de commission '
        + 'li\u00e9s \u00e0 ce dossier.',
      en: 'A guided tour of the credit file: filtering and searching the list, opening a file, the '
        + 'file details, the credit applicants, the property, the requested documents, and the journal '
        + 'with the tasks, notes, calls and commission schemes belonging to that one file.',
    },
    dossier: ID.dossierMetSchema,                 // DEMO-1089 — actief schema, gevuld journaal, alle documentstatussen

    // ── UITVOERINGEN (§12) ───────────────────────────────────────────────────────────────────────────
    // ⚠️ ÉÉN SCENARIO, MEERDERE UITVOERINGEN. De scènes hieronder zijn de enige bron: route, handeling,
    // merkteken én zin. Een uitvoering kiest enkel WELKE scènes ze gebruikt en HOE ze klinkt. Een
    // websitefilm met een eigen scènelijst zou apart verouderen en apart breken; een SELECTIE uit
    // dezelfde lijst erft elke reparatie — vandaag nog gezien met het labelfixje in de pandfiche.
    uitvoeringen: {
      // De handleidingfilm: het volledige verhaal, met stem, ondertitels beschikbaar maar uit.
      handleiding: { stem: true },

      // De websitefilm: korter, en ZONDER STEM. Elke browser start video gedempt, dus wie niet klikt
      // hoort niets — het beeld moet de boodschap dragen. De zinnen komen daarom IN BEELD, en hun
      // leestijd bepaalt de scèneduur in plaats van een audiofragment.
      website: {
        stem: false,
        scenes: ['lijst', 'openen', 'gegevens', 'documenten', 'slot'],
        // ⚠️ Óók Engels, want de site draagt drie talen. Zonder deze regel zou de Engelse
        // functionaliteitspagina een BOUWFOUT geven — het Film-component weigert een ontbrekende taal in
        // plaats van stil niets te tonen. Engelse tekst over een Nederlands scherm; de app spreekt geen Engels.
        talen: [
          { ui: 'nl-BE', tekst: 'nl' },
          { ui: 'fr-BE', tekst: 'fr' },
          { ui: 'nl-BE', tekst: 'en' },
        ],
      },
    },
    scenes: [
      { naam: 'lijst', kop: { nl: 'De dossierlijst', fr: "La liste des dossiers", en: "The file list" },
        doe: async (p) => { await p.goto(`${BASIS}/credit-files`); await p.waitForLoadState('networkidle'); },
        merk: /Kenmerk aanbrenger|Référence apporteur/i,
        nl: 'Het kredietdossier is het hart van CreditSoft. Alles wat bij één aanvraag hoort, staat op één pagina bij elkaar.',
        en: 'The credit file is the heart of CreditSoft. Everything about one application sits together on a single page.',
        fr: "Le dossier de crédit est le cœur de CreditSoft. Tout ce qui concerne une demande est rassemblé sur une seule page." ,
        website: { nl: 'Al uw kredietdossiers op één lijst, met status en bedrag.', fr: 'Tous vos dossiers de crédit sur une liste, statut et montant compris.', en: 'All your credit files on one list, with status and amount.' } },

      { naam: 'kolommen', kop: { nl: 'De kolommen', fr: "Les colonnes", en: "The columns" },
        doe: async (p) => { await beweegNaar(p, p.locator('th').nth(3)); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'In de lijst ziet u per dossier het kenmerk van de aanbrenger, de status, het kredietbedrag en de aanvrager.',
        fr: "Dans la liste, vous voyez par dossier la référence apporteur, le statut, le montant du crédit et le demandeur." },

      { naam: 'zoeken', kop: { nl: 'Zoeken in de lijst', fr: "Rechercher dans la liste", en: "Searching the list" },
        doe: async (p) => {
          const vak = p.locator('input[type="search"], input[placeholder*="oek" i], input[placeholder*="echerch" i]').first();
          await klik(p, vak); await vak.type('Demetris', { delay: 90 });
          await p.waitForTimeout(1800);
        },
        merk: /Demetris/i,
        nl: 'Bovenaan zoekt u door de hele lijst. Het aantal gevonden dossiers loopt mee.',
        fr: "En haut, vous cherchez dans toute la liste. Le nombre de dossiers trouvés suit." },

      { naam: 'openen', kop: { nl: 'Een dossier openen', fr: "Ouvrir un dossier", en: "Opening a file" },
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p, f) => { await p.goto(`${BASIS}/credit-files/${f.dossier}`); await p.waitForLoadState('networkidle'); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'We openen een bestaand dossier.',
        en: 'Let us open an existing file.',
        fr: "Ouvrons un dossier existant." ,
        website: { nl: 'Eén aanvraag, één pagina. Niets meer in mappen of mailboxen.', fr: 'Une demande, une page. Plus rien dans des dossiers ou des mails.', en: 'One application, one page. Nothing left in folders or mailboxes.' } },

      { naam: 'gegevens', kop: { nl: 'De dossiergegevens', fr: "Les données du dossier", en: "The file details" },
        doe: async (p) => { await p.waitForTimeout(400); },
        merk: /Datum indiening|Date de dépôt/i,
        nl: 'Bovenaan staan de dossiergegevens: de status, het kredietbedrag, de instelling en de datums van indiening en ingang.',
        en: 'At the top are the file details: the status, the credit amount, the institution and the submission and start dates.',
        fr: "En haut se trouvent les données du dossier : le statut, le montant du crédit, l'institution et les dates de dépôt et d'effet." ,
        website: { nl: 'De aanvraag, de aanvragers en het pand bij elkaar.', fr: 'La demande, les demandeurs et le bien, rassemblés.', en: 'The application, the applicants and the property, together.' } },

      { naam: 'aanvragers', kop: { nl: 'De kredietaanvragers', fr: "Les demandeurs de crédit", en: "The credit applicants" },
        doe: async (p) => {
          const kop = p.locator('h6', { hasText: /Kredietaanvragers|Demandeurs de crédit/ }).first();
          await kop.scrollIntoViewIfNeeded(); await beweegNaar(p, kop);
        },
        merk: /Kredietaanvragers|Demandeurs de crédit/i,
        nl: 'Onder Kredietaanvragers staan alle aanvragers van dit dossier, met hun gegevens en hun rol.',
        fr: "Sous Demandeurs de crédit figurent tous les demandeurs de ce dossier, avec leurs données et leur rôle." },

      { naam: 'pand', kop: { nl: 'Het pand', fr: "Le bien", en: "The property" },
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p) => {
          await klik(p, p.locator('button', { hasText: /Investeringsfiche & pand|Fiche d'investissement & bien/ }).first());
          await p.waitForTimeout(1400);
        },
        merk: /^(Pand|Bien)$/im,
        nl: 'Achter Investeringsfiche en pand vindt u het adres, de aard en de waarde van het pand — en die waarde bepaalt mee de quotiteit.',
        fr: "Derrière Fiche d'investissement et bien, vous trouvez l'adresse, la nature et la valeur du bien — et cette valeur détermine en partie la quotité." },

      { naam: 'documenten', kop: { nl: 'De gevraagde documenten', fr: "Les documents demandés", en: "The requested documents" },
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(900);
          await klik(p, p.locator('[role="tab"]', { hasText: /^(Gevraagd|Demandés)\s*\(/ }).first());
          await p.waitForTimeout(1200);
        },
        merk: /Ontvangen|Reçu/i,
        nl: 'Bij Gevraagd volgt u per stuk of het aangeleverd is en of het al beoordeeld werd.',
        en: 'Under Requested you track, item by item, what has been supplied and what has already been reviewed.',
        fr: "Dans Demandés, vous suivez pièce par pièce ce qui a été fourni et ce qui a déjà été évalué." ,
        website: { nl: 'Met de gevraagde documenten en hun toestand erbij.', fr: 'Avec les documents demandés et leur statut.', en: 'With the requested documents and their status.' } },

      // ⚠️ TWEE SCÈNES, en dat was eerst één. Drie klikken na elkaar met één zin erover gaf 8,1 seconden
      // stilte vóór die zin — de kijker zat naar drie handelingen te kijken waar niemand iets bij zei.
      //
      { naam: 'journaal', kop: { nl: 'Het journaal', fr: "Le journal", en: "The journal" },
        aanloop: 1.0,
        doe: async (p) => {
          await klik(p, p.locator('button', { hasText: /^(Journaal|Journal)$/ }).first());
          await p.locator('.adm-section-switch-btn').first().waitFor({ timeout: 10000 });
        },
        // ⚠️ Het merkteken is een TAAK, en dat kon tot 31/08/2026 niet. Het journaal opent op Taken, en geen
        // enkel demo-dossier mét een commissieschema had er één — de zin over taken, notities en gesprekken
        // speelde dus boven "Nog geen taken". JournaalTestData vult sinds vandaag het journaal van de
        // RIJKSTE dossiers, en de ID-tabel wijst naar zo'n dossier.
        merk: /Aktedatum bevestigen|Commissieschema nakijken/i,
        nl: 'Elk dossier draagt zijn eigen journaal: taken, notities, gesprekken, bijlagen en mailverkeer.',
        fr: "Chaque dossier porte son propre journal : tâches, notes, appels, pièces jointes et courrier." },

      { naam: 'commissieschemas', kop: { nl: 'Het commissieschema', fr: "Le schéma de commission", en: "The commission scheme" },
        aanloop: 1.0,
        doe: async (p) => {
          await klik(p, p.locator('.adm-section-switch-btn').first());
          await p.locator('.adm-menu-item').first().waitFor({ timeout: 10000 });
          await klik(p, p.locator('.adm-menu-item', { hasText: /Commissieschema|Schémas de commission/ }).first());
        },
        merk: /Herberekenen|Recalculer/i,
        nl: 'En de commissieschema’s: wat er op dit dossier per aanbrenger verdiend wordt.',
        fr: "Et les schémas de commission : ce qui est gagné par apporteur sur ce dossier." },

      { naam: 'slot', kop: { nl: 'Tot slot', fr: "Pour conclure", en: "In closing" },
        // ⚠️ KORTE aanloop, en dat is de regel: de aanloop bestaat om een NIEUW scherm te laten landen.
        // Hier verandert er niets — het journaalpaneel gaat dicht en het dossier staat er weer. Eerst stond
        // hier 1,0 s aanloop en 1,6 s adem, langer dan standaard, en dan duurt een zin van 4 seconden er
        // tien. Dominique hoorde het: "de laatste zin duurde precies wat lang."
        aanloop: 0.2, adem: 0.4,
        doe: async (p) => {
          await p.keyboard.press('Escape');
          // Op een TOESTAND wachten en niet op een timer (§3.4): hier stond waitForTimeout(1200), en dat
          // waren 1,2 seconden dode lucht bovenop de aanloop.
          await p.locator('.adm-section-switch-btn').first().waitFor({ state: 'hidden', timeout: 8000 });
        },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'Eén dossier, één pagina. Wat uitbetaald is, blijft.',
        en: 'One file, one page. What has been paid out, stays.',
        fr: "Un dossier, une page. Ce qui a été payé, reste." ,
        website: { nl: 'Alles wat bij één aanvraag hoort, op één plaats.', fr: 'Tout ce qui concerne une demande, au même endroit.', en: 'Everything about one application, in one place.' } },
    ],
  }],
];
