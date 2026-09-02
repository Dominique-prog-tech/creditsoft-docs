// ── De beeldgenerator voor de handleiding ────────────────────────────────────────────────────────────────
//
// ⚠️ WAAROM DIT BESTAND ER IS. Tot 28/08/2026 stonden er losse scripts per onderwerp
// (beelden-agenda.mjs, beelden-online-afspraken.mjs) en was er GEEN manier om alles te hernemen. De regel
// zegt nochtans: herneem ze ALLEMAAL, want de zijbalk staat op elk beeld — verandert daar iets, dan is elk
// beeld verouderd. Op 28/08 verdween het menu-item "Home" en waren alle 175 in één klap achterhaald.
//
// ⚠️ HIJ MELDT WAT HIJ NIET KON SCHIETEN. Een generator die stilletjes overslaat, laat een halve ronde
// lezen als een volledige — en dat is precies de fout die deze hele doorlichting steeds weer opleverde.
//
// Gebruik:
//   node tools/beelden.mjs              alles, NL en FR
//   node tools/beelden.mjs relaties     enkel de namen die "relaties" bevatten
//
// Beelden komen ALTIJD uit tenant_demo — kredietunie en hypotheekwereld dragen echte klantnamen en deze
// handleiding staat publiek.
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';
// ⚠️ DE GEDEELDE KERN. De beslissingen die niets met een browser te maken hebben — de alt-controle, de
// vormgrendel, de schermbesluiten en de verantwoording — wonen sinds 29/08/2026 in adm-appkit, zodat
// CleanOps en Nimble ze niet opnieuw moeten leren. De aansturing (SCHOTEN, VERWACHT, de recepten) blijft
// hier, want die hangt aan onze eigen routes.
import { NIET_SCHERMTEKST_BASIS, ontbrekendeTermen, pngMaat, vormBesluit, schermBesluit, verantwoording }
  from '/Users/dominique/projects/adm-appkit/tools/beeldgenerator/kern.mjs';

import { BASIS, ID, SECRETS, gebruiker, wachtwoord, meldAan, appToestand } from './aansturing.mjs';
const UIT = '/Users/dominique/projects/creditsoft-docs/docs/images';
const BREED = 1700, HOOG = 900;

// ⚠️ DE VORM PER BEELD. De bestaande beelden zijn NIET één formaat: ze dragen elf vensterbreedtes, elf hoogtes
// en acht ELEMENTschoten (een dialoogvenster, het linkermenu, de bovenbalk). Dat is
// gekozen werk — 2000 breed waar de kolommen anders niet passen, 560×246 omdat dat precies één venster is.
// Op 29/08/2026 heeft een versie zonder deze tabel 162 beelden vervangen door volledige schermafdrukken op
// één formaat. Die tabel is AFGELEID uit de bestaande bestanden (tools/beeldvorm.json), niet verzonnen.
const VORM = JSON.parse(readFileSync(new URL('./beeldvorm.json', import.meta.url), 'utf8'));

// ⏭️ MEENEMEN BIJ DE VOLGENDE BEELDRONDE (afgesproken 29/08/2026). De Nimble-sessie doet dit beter en
// het is de moeite: zij houden GEEN afgeleide tabel bij maar lezen de bestaande PNG-header rechtstreeks
// op het moment dat ze het venster zetten.
//
// Waarom dat beter is: dan lezen het venster én de vormgrendel HETZELFDE bestand, en kunnen ze per
// definitie niet van mening verschillen. Onze tabel kan dat wel — en heeft dat gedaan. Ik leidde hem af
// uit de Nederlandse bestanden en liet Frans meeliften; vier Franse pagina's staan op een andere hoogte
// ("Institutions de crédit" is langer dan "Kredietinstellingen") en werden dus verkeerd geschreven. De
// grendel ving het, maar dat is reparatie en geen preventie. Eén bron minder die kan verouderen.
//
// ⚠️ Wat NIET afleidbaar is en dus een tabel blijft: de acht ELEMENTschoten. Een selector als
// `header.topbar` of `aside.sidebar` valt uit geen enkele PNG te lezen. Na de verbouwing draagt
// beeldvorm.json dus alleen nog die acht, en niet meer 88 maten.
//
// ⏭️ EN METEEN DIT ERBIJ, want het is bijna gratis: MELDEN WELK BEELD NERGENS GEBRUIKT WORDT. Onze
// verantwoording kijkt van de schijf naar de uitslaglijsten; wat ze niet ziet, is een beeld dat keurig
// geschoten wordt maar in GEEN ENKELE handleidingpagina staat. De Nimble-sessie vond er zo één (een
// scherm dat nog achter de beta-gate zit) en bij ons zou dat even onzichtbaar zijn.
//
// De gegevens liggen er al: ALT wordt opgebouwd door de markdown af te zoeken op
// ![alt](../images/naam.png). Een bestand op schijf zonder ALT-entry staat dus nergens. Dat is een
// vergelijking en een rapportregel, geen nieuw mechanisme.

// ⚠️ WELK ACCOUNT. Vier portaalbeelden zijn op 29/08/2026 vervangen door een "Geen toegang"-scherm omdat de
// generator als `admin` was aangemeld — en dat account is geen aanbrenger. Het weigerscherm werd netjes
// afgedrukt en over het echte beeld gezet. Een schot verklaart nu welk account het nodig heeft; wie er geen
// opgeeft, krijgt de beheerder.
const AANBRENGER_PORTAAL = ['portaal-overzicht', 'portaal-dossiers', 'portaal-commissies',
                            'portaal-documenten', 'portaal-dossier-detail'];

// ⚠️ MET DE HAND UITGESNEDEN. Deze twee beelden tonen een stuk scherm dat geen enkel element is:
// rapporten-voorbeeld is één blad uit een gerenderd rapport, kantoorprofiel-vragenlijst een uitsnede
// dwars door de editor en het voorbeeldpaneel heen. Er ís geen recept. De generator laat ze staan en
// ZEGT dat — een beeld dat niemand kan hernemen, hoort geen stille faler te zijn.
const HANDWERK = { 'rapporten-voorbeeld': 'één blad uit een gerenderd rapport, met de hand uitgesneden',
                   'kantoorprofiel-vragenlijst': 'uitsnede dwars door editor én voorbeeldpaneel' };

// Vaste proefgegevens uit tenant_demo. ⚠️ Kies op INHOUD, niet op aantal: een fiche met een leeg journaal
// ⚠️ Vaste proefgegevens uit tenant_demo — zie tools/aansturing.mjs (ID).

// naam → route. Alles wat een `na` draagt, vraagt een handeling ná het laden.
const SCHOTEN = [
  // ── lijstschermen ──
  ['aanbrengers-lijst',            '/contributors'],
  ['relaties-lijst',               '/crm/relaties'],
  ['leads-lijst',                  '/crm/leads'],
  ['professionals-lijst',          '/crm/professionals'],
  ['groepen-lijst',                '/crm/groepen'],
  ['kredietdossiers-lijst',        '/credit-files'],
  ['kredietinstellingen-lijst',    '/credit/financial-institutions'],
  ['verzekeraars-lijst',           '/credit/insurance-institutions'],
  ['verzekeringen-lijst',          '/insurance-contracts'],
  ['contractenoverzicht-lijst',    '/contracts'],
  ['globaal-overzicht-lijst',      '/credit-files/overview'],
  ['schattingen-lijst',            '/credit-files/appraisals'],
  ['documenten-valideren',         '/krediet/documenten-valideren'],
  ['documentbibliotheek',          '/document-library'],
  ['taken-overzicht',              '/taken'],
  ['afwezigheden',                 '/beheer/afwezigheden'],
  ['keuzelijsten',                 '/beheer/keuzelijsten', async p => {
      // ⚠️ Zonder gekozen lijsttype toont dit scherm "Kies bovenaan een lijsttype" en een tabel met NUL
      // rijen. Het beeld was dus leeg, terwijl het bijschrift de lijst Nationaliteit met gevulde kolommen
      // belooft. Een lege pagina haalt elke controle die naar afwezigheid kijkt — vandaar dat dit
      // maandenlang onopgemerkt bleef.
      await p.getByText(/Kies een lijsttype|Choisissez un type de liste/).first().click();
      await p.waitForTimeout(1200);
      await p.getByText(/^(Nationaliteit|Nationalité)$/).first().click();
      await p.waitForTimeout(2500);
  }],
  ['documenttypes',                '/beheer/documenttypes'],
  ['dashboard-fases',              '/beheer/dashboard-fases'],
  ['commissie-instellingen',       '/beheer/commissie-instellingen'],
  ['klantportaal-vormgeving',      '/beheer/klantportaal'],
  ['mailsjablonen',                '/administration/mail-templates'],
  ['verzendadressen',              '/administration/sender-addresses'],
  ['mailmonitoring',               '/administration/mail-monitoring'],
  ['rollen',                       '/administration/roles'],
  ['actielogboek',                 '/beheer/audit'],
  ['prullenbak',                   '/prullenbak'],
  ['platformbeheer-hub',           '/administration'],
  ['bedrijfsfiche',                '/administration/company-profile'],
  ['kantoorprofiel-vragenlijst',   '/beheer/kantoorprofiel'],
  ['dashboard-startscherm',        '/dashboard'],
  ['rapporten-bibliotheek',        '/rapporten'],
  ['commissie-vooruitzicht',       '/commissie/vooruitzicht'],
  ['commissie-restanten',          '/commissie/restanten'],
  ['commissieschemas',             '/commissie/schemas'],
  ['fiche-281-50',                 '/commissie/fiche-28150'],
  ['borderel-overzicht',           '/commissie/borderel'],
  ['online-afspraken-agenda',      '/crm/online-afspraken'],
  ['afspraken-week',               '/crm/afspraken'],
  ['mijn-gegevens',                '/account/mijn-gegevens'],
  ['wachtwoord',                   '/account/wachtwoord-wijzigen'],
  ['tweestapsverificatie',         '/account/2fa'],
  ['portaal-overzicht',            '/portal-intermediary/overzicht'],
  ['portaal-dossiers',             '/portal-intermediary/dossiers'],
  ['portaal-commissies',           '/portal-intermediary/commissies'],
  // ── fiches ──
  ['aanbrengers-fiche',            `/contributors/${ID.aanbrenger}`],
  ['relaties-fiche',               `/crm/relaties/${ID.relatie}`],
  ['lead-fiche',                   `/crm/leads/${ID.lead}`],
  ['professionals-fiche',          `/crm/professionals/${ID.prof}`],
  ['kredietinstellingen-fiche',    `/credit/financial-institutions/${ID.fin}`],
  ['verzekeraars-fiche',           `/credit/insurance-institutions/${ID.verz}`],
  ['kredietdossier-fiche',         `/credit-files/${ID.dossier}`],
  ['borderel-fiche',               `/commissie/borderel/${ID.borderel}`],
  ['navigatie',                    '/dashboard'],

  // ── recepten: een handeling ná het laden ──────────────────────────────────────────────────────────────
  // journaal-onderdelen: op de FICHE zijn het tabbladen. ⚠️ In de LADE (vanuit een lijst) is het een
  // keuzelijst; dat is een ander beeld — zie 'journaal-lade'.
  ['journaal-taken',            `/crm/relaties/${ID.relatie}`, p => tab(p, 'Taken', 'Tâches')],
  ['journaal-notities',         `/crm/relaties/${ID.relatie}`, p => tab(p, 'Notities', 'Notes')],
  ['journaal-gesprekken',       `/crm/relaties/${ID.relatie}`, p => tab(p, 'Gesprekken', 'Appels')],
  ['journaal-bijlagen',         `/crm/relaties/${ID.relatie}`, p => tab(p, 'Bijlagen', 'Pièces jointes')],
  ['journaal-mailverkeer',      `/crm/relaties/${ID.relatie}`, p => tab(p, 'Mailverkeer', 'Courrier')],
  ['journaal-logboek',          `/crm/relaties/${ID.relatie}`, p => tab(p, 'Logboek', 'Historique')],
  ['journaal-kredietdossiers',  `/crm/relaties/${ID.relatie}`, p => tab(p, 'Kredietdossiers', 'Dossiers de crédit')],
  ['relaties-fiche-journaal',   `/crm/relaties/${ID.relatie}`, p => tab(p, 'Taken', 'Tâches')],
  // ⚠️ Deze relatie is BEWUST Alain Adriaenssens: hij draagt één gevraagd stuk in de toestand
  // "Ontvangen" (aangeleverd, nog niet beoordeeld). Een relatie zonder stukken toont een lege lijst en
  // bewijst niets over de statuskolom die het bijschrift beschrijft. De VERWACHT-regel hieronder valt
  // om zodra dat stuk verdwijnt — bijvoorbeeld na een her-seed.
  ['relaties-gevraagde-documenten', `/crm/relaties/${ID.relatie}`,
     // ⚠️ NIET via tab(): die bouwt een VERANKERDE regex (^…$) en dit tablabel draagt een teller —
     // "Gevraagd (1)". Dan matcht er niets, en .last().click() loopt in een time-out van 30 s.
     // Daarom werkt tab() wél voor "Taken" en niet hier: dat label heeft geen teller.
     // ⚠️ En let op met het zelf naproeven: een losse tekst in hasText is een SUBSTRING en vindt het tabblad
     // wel. Dan test je een andere matcher dan de code gebruikt en denk je dat je selector deugt.
     // ⚠️ HET LABEL IS OP 30/08/2026 HERNOEMD: "Gevraagde documenten" → "Gevraagd" (FR "Demandés"), omdat
     // de tabrij van een relatiefiche niet paste. Dit recept liep daarna in precies die time-out van 30 s
     // waar de opmerking hierboven voor waarschuwt — de generator ving het, twee beelden vielen uit.
     async p => {
       await p.getByRole('tab', { name: /^(Gevraagd|Demandés)\s*\(/i }).first().click();
       await p.waitForTimeout(2500);
     }],

  // vensters en lades
  ['borderel-borderellen',      '/commissie/borderel',            p => tab(p, 'Borderellen', 'Bordereaux')],
  ['borderel-nieuwe-ronde',     '/commissie/borderel',            async p => { await tab(p, 'Borderellen', 'Bordereaux'); await knop(p, 'Nieuwe ronde aanmaken', 'Créer une nouvelle série'); }],
  ['online-afspraken-instellingen', '/crm/online-afspraken',      p => rechterTab(p, ['Instellingen', 'Paramètres'])],
  ['documenttypes-categorieen', '/beheer/documenttypes',          p => knop(p, 'Categorieën beheren', 'Gérer les catégories')],
  ['lead-klant-maken',          `/crm/leads/${ID.lead}`,          p => knop(p, 'Klant van maken', 'En faire un client')],
  ['portaal-toegang',           `/contributors/${ID.aanbrengerMetPortaal}`, p => knop(p, 'Portaal', 'Portail')],
  ['commissieschemas-journaal', `/credit-files/${ID.dossierMetSchema}`, async p => {
      // eerst het journaal openen — de knop staat RECHTSBOVEN, niet in het linkermenu
      await p.evaluate(() => {
        const el = [...document.querySelectorAll('button, a')].find(e => {
          const r = e.getBoundingClientRect();
          return /^(Journaal|Journal)$/i.test((e.textContent || '').trim()) && r.top < 160;
        });
        if (el) el.click();
      });
      await p.waitForTimeout(3500);
      // ⚠️ IN DE LADE IS HET EEN KEUZELIJST, GEEN TABSTROOK. Eén klik opent het menu en laat het OPEN staan —
      // dan bedekt het precies de inhoud die het beeld moet tonen. Het schot lukt, het beeld deugt niet.
      // Dus: openen, het onderdeel kiezen, en het menu laten sluiten.
      // ⚠️ GEEN ESCAPE. Die sloot de HELE lade, niet enkel het keuzemenu — en dan toont het beeld een dossier
      // zónder journaalpaneel, terwijl de alt-tekst juist dat paneel belooft. Het menu sluit vanzelf zodra je
      // een onderdeel kiest; dat is de enige klik die nodig is.
      // ⚠️ HIER STOND `tab(p, "Commissieschema's", …)`, en dat werkte om de VERKEERDE reden: de lade opende
      // toevallig ÓP Commissieschema's, dus die tekst stond op de kiezerknop. Sinds CreditSoft v1.51.0 opent
      // ze op Taken en verdween die tekst — waarna dit recept 30 seconden op niets wachtte. De knop zelf
      // heeft een eigen klasse en die verandert niet mee met wat er toevallig in staat.
      await p.locator('button.adm-section-switch-btn').first().click();
      await p.waitForTimeout(1200);
      await p.locator('button.adm-menu-item')
             .filter({ hasText: /Commissieschema|Schémas de commission|Barèmes de commission/i })
             .first().click();
      await p.waitForTimeout(3000);
  }],
  // ⚠️ De pijplijn staat ONDERAAN het dashboard en valt buiten het schot van dashboard-startscherm — de
  // handleiding beschrijft hem in een eigen sectie en had er geen beeld bij. Dit schot scrolt ernaartoe.
  // Vraagt een INGEVULDE fase-indeling in tenant_demo: zonder koppeling status→fase valt alles onder
  // "Niet ingedeeld" en toont het scherm één kaart plus een melding. Die indeling is er sinds 30/08/2026.
  ['dashboard-pijplijn',        '/dashboard', async p => {
      await p.evaluate(() => {
        const h = [...document.querySelectorAll('h5')].find(e => /Dossiers per fase|Dossiers par phase/i.test(e.textContent||''));
        h?.scrollIntoView({ block: 'start' });
      });
      await p.waitForTimeout(1500);
  }],
  // ⚠️ Het blok "Aan de slag" staat BOVENAAN het dashboard en verschijnt ALLEEN in een omgeving met
  // voorbeeldgegevens. Twee dingen kunnen het stil wegnemen, en dan levert dit schot een beeld van iets
  // anders zonder te melden dat het misging:
  //   · de proefvlag weg (de demo-opruiming haalt hem weg — dan hoort het blok er ook niet meer te staan);
  //   · de voorkeur `creditsoft.aandeslag.weggeklikt` op true voor de gebruiker die het schot maakt.
  // Daarom controleert dit recept dat het blok er ÉCHT staat en faalt het luid als dat niet zo is.
  ['dashboard-aan-de-slag',     '/dashboard', async p => {
      await p.waitForTimeout(1200);
      const blok = p.locator('.adm-aan-de-slag, [class*="aan-de-slag"], [class*="aandeslag"]').first();
      if (await blok.count() === 0) {
        const tekst = await p.locator('body').innerText();
        if (!/Aan de slag|Pour commencer/.test(tekst))
          throw new Error('Het blok "Aan de slag" staat NIET op het dashboard — geen proefvlag, of weggeklikt '
                        + 'door deze gebruiker (wis reference.adm_user_preferences waar key like \'%aandeslag%\').');
      }
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForTimeout(800);
  }],
  ['voorkeuren-paneel',         '/dashboard',                     p => avatar(p)],
  ['voorkeuren',                '/dashboard',                     p => avatar(p)],
  ['filteren-zoekveld',         '/crm/relaties',                  async p => {
      // ⚠️ `:visible` is hier het hele punt. Zonder dat pakte `.first()` de VERBORGEN globale zoekbalk uit de
      // kopbalk, die eerder in de DOM staat — en dan loopt `fill()` in een time-out op een veld dat niemand ziet.
      const z = p.locator('input[type="search"]:visible, input[placeholder*="oek" i]:visible, input[placeholder*="recherch" i]:visible').first();
      if (await z.count()) { await z.fill('Cuypers'); await p.waitForTimeout(2500); }
  }],
  ['aanbrenger-groepering',     `/contributors/${ID.aanbrenger}`],
  ['bedrijfsfiche-logo',        '/administration/company-profile', async p => {
      await p.evaluate(() => { const h = [...document.querySelectorAll('h3,h4')].find(e => /huisstijl|documenten/i.test(e.textContent||'')); h?.scrollIntoView(); });
      await p.waitForTimeout(1200);
  }],
  ['afspraken-per-medewerker',  '/crm/afspraken', async p => {
      // ⚠️ Stond hier als kaal paginabezoek. Dat de kolomweergave in beeld kwam, was TOEVAL: de agenda
      // onthoudt de gekozen weergave per gebruiker. Bij een verse gebruiker of na een reset toont hetzelfde
      // recept de samengevoegde weergave — en dan is het beeld niet wat het bijschrift zegt.
      await p.getByText(/^(Per medewerker|Par collaborateur)$/).first().click();
      await p.waitForTimeout(2500);
      // ⚠️ En de belofte is "een kolom per medewerker". Dat is geen tekst maar een STRUCTUUR, dus tellen we
      // de kolomkoppen. Een merkteken op een medewerkersnaam bewijst niets: die naam staat ook in de legende
      // boven de samengevoegde weergave.
      const kolommen = await p.evaluate(() =>
        new Set([...document.querySelectorAll('.dxbl-sc-resource-hr')]
          .map(e => e.textContent?.trim()).filter(Boolean)).size);
      if (kolommen < 2) throw new Error(`slechts ${kolommen} medewerkerskolom(men) — dit is niet de weergave per medewerker`);
  }],
  // ⚠️ HET BEELD TOONDE HET VERKEERDE SCHERM. Het recept wees naar /beheer/afwezigheden — het beheerscherm
  // "Verlof & sluitingsdagen" — terwijl het in de handleiding onder de kop "Wat u in de agenda ziet" staat
  // en de alt de AGENDA belooft met gearceerde kolommen. Er viel voor dit beeld geen merkteken af te
  // leiden, dus de beloftecontrole zweeg erover: het stond bij "niet gecontroleerd" en niet bij "fout".
  // De arcering hangt bovendien aan de DATUM — het verlof in tenant_demo loopt 18–24/08 — dus één week
  // terugbladeren hoort bij het recept.
  ['agenda-afwezigheid',        '/crm/afspraken', async p => {
      await p.getByText(/^(Per medewerker|Par collaborateur)$/).first().click();
      await p.waitForTimeout(1500);
      // ⚠️ 22/08/2026 is de ENIGE dag waarop twee medewerkers samen afwezig zijn in tenant_demo (Eva Coppens
      // 18–24/08 verlof, Jana Michiels 22/08 opleiding). Terugbladeren tot die dag in beeld staat — tellen
      // hoeveel keer je moet klikken werkt niet, want de weergave (dag/week) onthoudt zichzelf per gebruiker.
      let gevonden = false;
      for (let i = 0; i < 40 && !gevonden; i++) {
        if (/22 (augustus|août) 2026/.test(await p.locator('body').innerText())) { gevonden = true; break; }
        await p.locator('.dxbl-sc-nav-prev, button[title*="vorige" i], button[title*="précédent" i]')
               .first().click().catch(() => {});
        await p.waitForTimeout(400);
      }
      if (!gevonden) throw new Error('22/08/2026 niet bereikt — de agenda staat op een andere weergave');
      await p.waitForTimeout(2000);
      // ⚠️ EN NU HET ENIGE DAT ER ECHT TOE DOET. Een merkteken op "Eva Coppens" bewijst niets: dat is een
      // kolomkop en staat er ook zonder verlof. De ARCERING is de belofte, dus die meten we in de DOM.
      const gearceerd = await p.evaluate(() => document.querySelectorAll('.adm-afwezig').length);
      if (gearceerd < 2) throw new Error(`slechts ${gearceerd} gearceerde cellen — de handleiding belooft twee afwezige medewerkers`);
  }],
  ['portaal-dossier-detail',    '/portal-intermediary/dossiers',  async p => {
      // ⚠️ HET BEELD TOONDE DE LIJST. In dit portaal opent een dossier via de LINK op het kenmerk, niet met een
      // dubbelklik op de rij — die doet niets. En het merkteken stond op "Kredietbedrag", wat óók een kolomkop
      // van de lijst is: de controle bevestigde dus keurig het verkeerde scherm.
      await p.locator('table a, tbody a').first().click();
      await p.waitForTimeout(3500);
  }],
  ['klantportaal-klant',        '/beheer/klantportaal'],
  ['rapporten-periode',         '/rapporten', async p => {
      // ⚠️ Een kaal paginabezoek gaf de rapportenBIBLIOTHEEK, niet het venster met Van/Tot en met en de
      // knoppen Afdrukken en Sluiten. Het rapport moet eerst aangeklikt worden.
      await p.getByText(/Gerealiseerd \+ commissiebedrag|Réalisés \+ montant/).first().click();
      await p.waitForTimeout(2500);
  }],
  ['rapporten-voorbeeld',       '/rapporten'],
  ['gebruikers-fiche',          '/administration/users', async p => {
      // ⚠️ Stond hier als kaal paginabezoek — en dan is er geen fiche te fotograferen. De fiche zit achter
      // de chevron van de rij (vloot-regel: alles in een lijst-werkbalk is de chevron-knop).
      await p.locator('tbody tr').first().locator('button').first().click();
      await p.waitForTimeout(1200);
      await p.locator('[role=dialog]').first().getByText(/^(Fiche)$/).first().click();
      await p.waitForTimeout(2500);
  }],
  // ⚠️ Een EIGEN ROUTE, geen tabblad. Het dossierscherm heeft geen tabblad "Commissieschema's" — die zitten
  // in het journaal, achter de knop rechtsboven. Ik klikte op iets dat er niet is, in beide talen.
  ['commissieschema-fiche',     `/credit-files/${ID.dossierMetSchema}/commissieschema/${ID.schema}`],
  ['afspraak-venster',          '/crm/afspraken', async p => {
      // ⚠️ Stond hier als kaal paginabezoek — dan toont het beeld de agenda en niet het venster dat de
      // handleiding belooft. De beloftecontrole ving dat; met het oog was het niet opgevallen.
      // ⚠️ EN ER IS GEEN KNOP. "Nieuwe afspraak" / "Nouveau rendez-vous" is de TITEL van het venster
      // (Meetings.razor, sleutel new_title), niet het opschrift van een knop. Het venster opent door in
      // een lege cel van de agenda te dubbelklikken. In het Nederlands sloeg de tekstklik toevallig aan
      // op de titel van een reeds open venster; in het Frans liep hij in een time-out van 30 seconden.
      // ⚠️ EN HET WERD HET VERKEERDE VENSTER. De terugval `button:has-text("Nieuw")` pakte "Nieuwe taak" uit
      // de bovenbalk — die staat op ELKE pagina. Het beeld toonde daardoor het TAKENvenster op het
      // takenscherm, terwijl de handleiding een afspraakvenster belooft met Terugkerend, Hele dag, Locatie
      // en Aanbrenger. Het oude merkteken "Verantwoordelijke" liet dat door: dat woord staat in beide.
      // De cel opent enkel met een ECHTE muis-dubbelklik; locator.dblclick loopt op een overlay vast.
      const cel = await p.locator('.dxbl-sc-time-cell:visible').nth(12).boundingBox();
      await p.mouse.dblclick(cel.x + cel.width / 2, cel.y + cel.height / 2);
      await p.waitForTimeout(3000);
  }],
  ['globaal-overzicht-voorinstelling', '/credit-files/overview', async p => {
      // ⚠️ Het is GEEN keuzelijst maar een werkbalkknop met de huidige voorinstelling als opschrift
      // ("Lopend" / "En cours"). Op `.dxbl-combobox, select` mikken liep in beide talen in een time-out.
      // ⚠️ Op de ROL "button" mikken klikt het omhulsel aan en niet het opschrift: de lijst klapt dan niet
      // open, zonder fout. Gemeten: op de exacte tekst klikken werkt wél. Beide talen, want het opschrift
      // is de huidige voorinstelling.
      await p.getByText(/^(Lopend|En cours)$/).first().click();
      await p.waitForTimeout(2000);
  }],
  ['hoofdbalk',                 '/dashboard'],
  ['menu-links',                '/dashboard', async p => {
      // ⚠️ De alt-tekst belooft de OPENGEKLAPTE groepen CRM en Krediet. Dichtgeklapt toont het menu
      // "Kredietinstellingen" niet en is het beeld niet wat de handleiding zegt dat het is.
      for (const [nl, fr] of [['CRM', 'CRM'], ['Krediet', 'Crédit']]) {
        const g = p.locator('aside.sidebar').getByText(new RegExp(`^(${nl}|${fr})$`)).first();
        if (await g.count()) { await g.click().catch(() => {}); await p.waitForTimeout(600); }
      }
      await p.waitForTimeout(800);
  }],
  // ⚠️ Deze twee stonden in GEEN van beide lijsten en werden stil overgeslagen. Gevonden door de
  // zelfcontrole onderaan — die vergelijkt met de MAP, niet met een lijst die ik met de hand bijhoud.
  ['verzendadressen-bewerken',  '/administration/sender-addresses', async p => {
      const r = p.locator('tr').nth(1); if (await r.count()) { await r.dblclick(); await p.waitForTimeout(2500); }
  }],
  ['journaal-lade',             '/crm/relaties', async p => {
      // ⚠️ Een rij AANKLIKKEN volstaat niet: de lade blijft dan dicht en het beeld toont enkel de lijst met
      // een verticaal "Journaal"-labeltje aan de rand — terwijl de alt-tekst een OPEN lade belooft.
      const r = p.locator('tr').nth(1);
      if (await r.count()) { await r.click(); await p.waitForTimeout(2000); }
      await rechterTab(p, ['Journaal', 'Journal']);
      await p.locator('button.adm-menu-item')
             .filter({ hasText: /Kredietdossiers|Dossiers de crédit/i })
             .first().click().catch(() => {});
      await p.waitForTimeout(3000);
  }],
];

// ⚠️ NOG GEEN RECEPT. Deze beelden vragen een handeling (een tabblad openen, een venster, een keuze) en die
// stond nergens opgeschreven. Ze worden NIET geschoten en NIET stilzwijgend overgeslagen: de generator noemt
// ze aan het eind. Wie er een toevoegt, verplaatst hem naar SCHOTEN met een `na`.
// ⚠️ LEEG SINDS 28/08/2026 — alle 33 kregen een recept, uitgeschreven op basis van de alt-teksten in de
// handleiding (dát is waar het recept al die tijd stond, alleen niet als code). Blijft er ooit iets over,
// zet het hier: de generator noemt de namen dan aan het eind in plaats van ze stil over te slaan.
const ZONDER_RECEPT = [];
const _OUD_ZONDER_RECEPT = [
  'aanbrenger-groepering', 'afspraak-venster', 'afspraken-per-medewerker', 'agenda-afwezigheid',
  'bedrijfsfiche-logo', 'borderel-borderellen', 'borderel-nieuwe-ronde', 'commissieschema-fiche',
  'commissieschemas-journaal', 'documenttypes-categorieen', 'filteren-zoekveld', 'gebruikers-fiche',
  'globaal-overzicht-voorinstelling', 'hoofdbalk', 'journaal-bijlagen', 'journaal-gesprekken',
  'journaal-kredietdossiers', 'journaal-lade', 'journaal-logboek', 'journaal-mailverkeer',
  'journaal-notities', 'journaal-taken', 'klantportaal-klant', 'lead-klant-maken', 'menu-links',
  'online-afspraken-instellingen', 'portaal-dossier-detail', 'portaal-toegang', 'rapporten-periode',
  'rapporten-voorbeeld', 'relaties-fiche-journaal', 'voorkeuren', 'voorkeuren-paneel',
];


// ── hulpjes voor de recepten ────────────────────────────────────────────────────────────────────────────
// ⚠️ Klik tabbladen op PLAATS-en-tekst, niet op tekst alleen: "Instellingen" en "Notities" staan ook in het
// linkermenu, en dan navigeert het schot weg zonder dat je het merkt. Kost je een beeld van een ander scherm.
// ⚠️ TWEETALIG, want de FR-ronde faalde anders. Op 28/08 klikten deze hulpjes enkel op de Nederlandse
// tekst; zes Franse beelden liepen daardoor in een time-out. Alle vertalingen zijn uit de broncode gehaald
// (Journaal/*/*.cs en de Tr-woordenboeken), niet geraden — "Gesprekken" is in het Frans "Appels", niet
// "Conversations", en dat had ik fout gegokt.
const alt = (nl, fr) => new RegExp(`^(${nl}|${fr})$`, 'i');
const tab = async (p, nl, fr) => {
  await p.locator('span:visible', { hasText: alt(nl, fr) }).last().click();
  await p.waitForTimeout(2500);
};
const knop = async (p, nl, fr) => {
  await p.getByText(alt(nl, fr)).first().click(); await p.waitForTimeout(2500);
};
const rechterTab = async (p, naam) => {
  await p.evaluate((namen) => {
    const bw = window.innerWidth;
    const el = [...document.querySelectorAll('button, div, span, a')].find(e => {
      const r = e.getBoundingClientRect();
      return namen.includes((e.textContent || '').trim()) && r.left > bw - 120 && r.height > 40;
    });
    if (el) el.click();
  }, naam);
  await p.waitForTimeout(3000);
};
const avatar = async (p) => {
  await p.evaluate(() => {
    const el = [...document.querySelectorAll('button, div, span')].find(e => {
      const r = e.getBoundingClientRect();
      return r.top < 60 && r.left > window.innerWidth - 90 && r.width > 20 && r.width < 60;
    });
    if (el) el.click();
  });
  await p.waitForTimeout(2500);
};


// ── DE BELOFTE CONTROLEREN ──────────────────────────────────────────────────────────────────────────────
//
// ⚠️ WAAROM DIT ER IS. Een generator kan enkel melden dát hij een bestand schreef, niet of er het juiste op
// staat. Op 28/08/2026 werden drie beelden netjes "geschreven" en toonden ze het verkeerde: een keuzelijst
// die openbleef en juist de inhoud bedekte, een Escape die de hele lade sloot, en een venster dat niet open
// was. Vier nagekeken, drie fout — op 175 beelden is steekproeven dan geen controle maar een gok.
//
// DE ALT-TEKST IS DE SPECIFICATIE. "Het venster Nieuwe ronde aanmaken met de velden Jaar, Maand en
// Documentdatum" zegt precies wat er op het beeld hoort te staan. Die tekst staat al in de handleiding, voor
// de blinde lezer — hier wordt ze ook de controle.
//
// Werkwijze: het merkteken komt uit VERWACHT als het er staat, anders wordt het uit de alt-tekst afgeleid.
// Staat het niet op het scherm, dan wordt het beeld NIET geschreven en volgt de naam in het verslag.
const VERWACHT = {
  // Vensters: de titel alléén volstaat niet — die staat vaak ook op de knop eronder. Neem iets dat ENKEL
  // in het geopende venster voorkomt.
  'borderel-nieuwe-ronde':      /Voorbeeld tonen|Afficher l'aperçu/i,
  'portaal-toegang':            /Nieuw tijdelijk wachtwoord|Nouveau mot de passe/i,
  'lead-klant-maken':           /Documenttaal|Langue des documents/i,
  'documenttypes-categorieen':  /Categorie|Catégorie/i,
  'voorkeuren-paneel':          /Kies foto|Choisir une photo|Omgevingsgrootte|Taille/i,
  'voorkeuren':                 /Kies foto|Choisir une photo|Omgevingsgrootte|Taille/i,
  'journaal-lade':              /Kredietdossiers|Dossiers de crédit/i,
  // ⚠️ Niet op "schema" — dat staat al in de paginatitel en bewijst enkel dat je op het juiste TABBLAD zit.
  // Herberekenen verschijnt alleen bij een ACTIEF schema, en dát is wat het bijschrift belooft.
  'commissieschemas-journaal':  /Herberekenen|Recalculer/i,
  'online-afspraken-instellingen': /Vragenlijst|Questionnaire|Locaties|Lieux/i,
  'filteren-zoekveld':          /Cuypers/i,
  'gebruikers-fiche':           /Mailhandtekening|Signature|Toon in keuzelijsten|listes de choix/i,
  // ⚠️ Niet op de kop "Aan de slag": die zegt enkel dat het blok er staat, niet dat de STAPPEN erin staan —
  // en het blok toont ook een klaar-toestand zonder stappen. Deze zin komt alleen voor als eerste stap.
  'dashboard-aan-de-slag':      /Vul uw Bedrijfsfiche in|Complétez votre Fiche d'entreprise/i,
  'hoofdbalk':                  /Nieuwe taak|Nouvelle tâche/i,
  'menu-links':                 /Kredietinstellingen|Institutions de crédit/i,
  'documenten-valideren':       /Te valideren|À valider|Wachttijd|attente/i,
  // Op een FASENAAM en niet op de kop: die staat er ook wanneer alles onder "Niet ingedeeld" valt.
  'dashboard-pijplijn':         /In behandeling|En traitement|Zonder gevolg|Sans suite/i,
  // Niet op het TABBLAD zoeken maar op de INHOUD: het tablabel staat er ook bij een lege lijst.
  'relaties-gevraagde-documenten': /Laatste 3 loonfiches|3 derniers|Ontvangen|Reçu/i,
  'taken-overzicht':            /Vervaldatum|Échéance|Prioriteit|Priorité/i,
  'wachtwoord':                 /Huidig wachtwoord|Mot de passe actuel/i,
  'keuzelijsten':               /Nationaliteit|Nationalité|Volgorde|Ordre/i,
  'rollen':                     /Tenant-beheerder|Administrateur de tenant/i,
  'aanbrenger-groepering':      /Groepering|Groupement/i,
  'afspraken-per-medewerker':   /Samengevoegd|Fusionné/,   // de echte controle telt de kolommen, in het recept
  'afspraak-venster':           /Terugkerend|Récurrent|Hele dag|Journée entière/i,
  'keuzelijsten':               /Nationaliteit|Nationalité/,
  'rapporten-periode':          /Afdrukken|Imprimer/,
  'professionals-fiche':        /Baken Immo Aalst/,
  'kredietdossiers-lijst':      /Kenmerk aanbr|Référence apporteur|Kredietbedrag|Montant du crédit/i,
  // ⚠️ De ARCERING is niet in tekst te vatten. Dit merkteken bewijst enkel dat we op de kolomweergave
  // zitten; dát twee kolommen gearceerd staan, moet een mens zien. Beter een controle die zegt wat ze
  // wél meet dan een beeld dat helemaal ongecontroleerd blijft.
  'agenda-afwezigheid':         /Eva Coppens/,   // zwak merkteken; de ECHTE controle op de arcering zit in het recept
  'verzendadressen-bewerken':   /Verzendnaam|Nom d'expéditeur|E-mailadres/i,
  'globaal-overzicht-voorinstelling': /Alle dossiers|Tous les dossiers/i,
  'rapporten-periode':          /Periode|Période/i,
  'klantportaal-klant':         /Voorbeeld|Aperçu/i,
  'portaal-dossier-detail':     /Aanvragers|Demandeurs/i,   // staat op het DETAIL, niet op de lijst
  'bedrijfsfiche-logo':         /Logo/i,
  'commissieschema-fiche':      /Algemene gegevens|Données générales/i,
};

// Merktekens uit de alt-tekst: hoofdletterwoord + eventuele vervolgwoorden, zonder verbindingswoord op het
// eind. Bewust EEN merkteken en niet vier: hoe meer je eist, hoe meer vals alarm — en een guard die vals
// alarm slaat, wordt uitgezet.
const STOP = new Set(('Het De Een Met Bovenaan Onderaan Links Rechts Daaronder Daarnaast Hier Elke Elk Er Dit '
  + 'Die Dat Op In Aan Van Voor Zo Wat Wie Waar Alle La Le Les Un Une Avec En Sur Dans Pour Ce Cette Vous Il Elle').split(' '));
const STAART = /\s+(met|en|van|een|in|op|de|het|die|dat|voor|bij|tot|als|avec|et|de|du|des|la|le|les|un|une|dans|sur|pour)$/i;

function merkUitAlt(alt) {
  const ruw = alt.match(/\b[A-ZÀ-Ý][\wà-ÿ-]{2,}(?:\s+[a-zà-ÿ][\wà-ÿ-]{1,}){0,3}/g) || [];
  const kand = [];
  for (let r of ruw) {
    let w = r.split(/\s+/);
    while (w.length && STOP.has(w[0])) w = w.slice(1);
    if (!w.length) continue;
    let t = w.join(' ').replace(/[ ,.:;—-]+$/, '');
    while (STAART.test(t)) t = t.replace(STAART, '');
    if (t.length >= 5 && !kand.includes(t)) kand.push(t);
  }
  // het langste is doorgaans het meest kenmerkende
  return kand.sort((a, b) => b.length - a.length)[0] || null;
}

const filter = process.argv[2];
// ⚠️ Aanmeldgegevens: zie tools/aansturing.mjs. Nooit printen; enkel invullen.

// de alt-teksten uit de handleiding: dát is de specificatie waartegen we controleren
const ALT = {};
for (const map of ['', 'getting-started/', 'crm/', 'credit-management/', 'beheer/', 'administration/', 'journaal/', 'portaal/']) {
  try {
    for (const f of readdirSync(`/Users/dominique/projects/creditsoft-docs/docs/${map}`)) {
      if (!f.endsWith('.md')) continue;
      const t = readFileSync(`/Users/dominique/projects/creditsoft-docs/docs/${map}${f}`, 'utf8');
      for (const m of t.matchAll(/!\[([^\]]*)\]\(\.\.\/images\/([^)"\s]+)\.png/g)) {
        if (!ALT[m[2]]) ALT[m[2]] = m[1];
      }
    }
  } catch { /* map bestaat niet */ }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: BREED, height: HOOG }, deviceScaleFactor: 2 });

// ── DE BOEKINGSLINK GAAT GEMASKEERD IN BEELD ───────────────────────────────────────────────────────────
// ⚠️ Het scherm Online afspraken toont de VOLLEDIGE boekingslink van het kantoor, token en al:
//     https://platform.digitalcloud.be/afspraak/0c8d29adabfe4737a1d4b05696c24ba4
// Dat is geen geheim — zo'n link geef je aan je klanten — maar in een GEPUBLICEERDE handleiding betekent het
// dat iedere lezer in de agenda van het demokantoor kan boeken. Gemerkt op 01/09/2026: het stond al in het
// gepubliceerde beeld `online-afspraken-instellingen.png`, dus dit is een reparatie en geen voorzorg.
//
// ⚠️ EEN WAARNEMER EN NIET ÉÉN VERVANGING. Blazor rendert dit element ná het laden, en een film loopt door —
// een eenmalige vervanging bij het begin van een scène is er dan al of nog niet.
//
// ⚠️ ZELFDE LENGTE. De bolletjes vervangen het token teken voor teken, zodat het veld niet krimpt en de
// vormgrendel van de beeldronde geldig blijft.
const MASKEER_BOEKINGSLINK = () => {
  const maskeer = () => {
    for (const e of document.querySelectorAll('code, input, span')) {
      const t = e.value ?? e.textContent ?? '';
      const m = t.match(/\/afspraak\/([0-9a-f]{16,})/i);
      if (!m) continue;
      const bol = '•'.repeat(m[1].length);
      if (e.value !== undefined && e.value !== '') e.value = t.replace(m[1], bol);
      else e.textContent = t.replace(m[1], bol);
    }
  };
  const start = () => {
    maskeer();
    new MutationObserver(maskeer).observe(document.body, { childList: true, subtree: true, characterData: true });
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
};

// ⚠️ TWEE DINGEN GAAN UIT ELK BEELD, en om dezelfde reden: ze wijzigen zonder dat er iets wijzigt.
//   `.nav-version` — het versienummer linksonder (zie de uitleg verderop).
//   de SCHUIFBALK   — gemeten op 01/09/2026: `documenttypes.png` en `fiche-281-50-fr.png` verschilden van
//                     hun vorige ronde in exact 6 pixels breed aan de rechterrand, en verder in niets. De
//                     inhoud was regel voor regel identiek. Het is de overlay-schuifbalk van de grid, die
//                     na een seconde wegvaagt: sta je er nét voor of nét na, dan krijg je een ander beeld.
//                     Daardoor meldde de verouderingscontrole twee schermen als gewijzigd die niet wijzigden.
//
// `background: transparent` en NIET `display: none`. Een overlay-schuifbalk neemt geen ruimte in, maar een
// klassieke wel — en die zou bij `display: none` inschuiven, waarna de vormgrendel élk bestaand beeld als
// "andere vorm" weigert. Transparant maken werkt in beide gevallen en laat de afmetingen met rust.
const VERBERG_VERSIE = '.nav-version { visibility: hidden !important; }'
  + '::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-corner'
  + ' { background: transparent !important; box-shadow: none !important; border-color: transparent !important; }';
let badgeGezien = 0;
const HERHAALPROEF = process.env.CS_HERHAALPROEF || 'documenttypes';
let herhaalProef = null;
const labelBotsingen = [];

// ── DE UITSLAGTABEL VAN DE BEELDRONDE ────────────────────────────────────────────────────────────────────
// ⚠️ Per beeld: tegen welke toestand van de app het geschoten is. Zonder dat kan niets later zeggen of het
// verouderd is — en een beeld dat een gewijzigd scherm toont, ziet er even overtuigend uit als een juist.
// De tabel staat NAAST .films-uit/ en dus IN git: verouderd.mjs leest haar, en zij hoort bij de bron.
const BEELD_UITSLAG = new URL('./beelden-uitslag.json', import.meta.url).pathname;
const beeldUitslag = existsSync(BEELD_UITSLAG) ? JSON.parse(readFileSync(BEELD_UITSLAG, 'utf8')) : {};
const page = await ctx.newPage();

// ⚠️ HET VERSIENUMMER GAAT UIT DE BEELDEN. Linksonder in de zijbalk staat "v1.70.0 nieuw", en de zijbalk
// staat op ELK beeld. Bij elke release verspringt dat nummer, en dan is de hele ronde van 162 beelden
// verouderd — voor nul informatie: het versienummer is geen onderdeel van wat de handleiding uitlegt.
// De regel "herneem ze allemaal" is er voor ECHTE wijzigingen aan de zijbalk, niet voor dit.
//
// `visibility: hidden` en niet `display: none`: de badge houdt zo zijn ruimte, dus de afmetingen van de
// beelden blijven gelijk en de vormgrendel verderop blijft geldig. Met `display: none` zou de zijbalk
// inschuiven en zou elk bestaand beeld als "andere vorm" geweigerd worden.
await ctx.addInitScript(() => {
  const stijl = document.createElement('style');
  stijl.textContent = '.nav-version { visibility: hidden !important; }'
    + '::-webkit-scrollbar, ::-webkit-scrollbar-track, ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-corner'
    + ' { background: transparent !important; box-shadow: none !important; border-color: transparent !important; }';
  document.addEventListener('DOMContentLoaded', () => document.head.appendChild(stijl));
});
await ctx.addInitScript(MASKEER_BOEKINGSLINK);
const fouten = [];
page.on('pageerror', e => fouten.push(e.message.slice(0, 100)));

// ⚠️ HET PORTAAL VRAAGT EEN EIGEN AANMELDING. Het wachtwoord van de proefaanbrenger staat NIET in git en
// NIET in dit bestand; het komt uit een omgevingsvariabele. Ontbreekt die, dan worden de portaalbeelden
// overgeslagen MET een melding — nooit stilzwijgend, en nooit met een weigerscherm als resultaat.
const PORTAAL_GEBRUIKER = process.env.CS_PORTAAL_USER || 'aanbrenger2@demo.example';
// ⚠️ Ook uit USER-SECRETS, net als het beheerderswachtwoord hierboven — niet enkel uit een omgevingsvariabele.
// Zolang het alleen via CS_PORTAAL_PW kon, werden de vier portaalbeelden bij élke ronde overgeslagen: wie de
// variabele niet toevallig gezet had, kreeg een nette melding en vier verouderde beelden. Een melding die je
// elke keer ziet, lees je op den duur niet meer.
const PORTAAL_WW = process.env.CS_PORTAAL_PW
  || (existsSync(SECRETS)
      ? JSON.parse(readFileSync(SECRETS, 'utf8').replace(/^\uFEFF/, ''))['Dev:PortaalPassword']
      : null)
  || null;

// Eén element fotograferen. `bevat` kiest uit meerdere gelijkaardige (welke .adm-card), `minBreed`
// weert het chevron-menu dat óók [role=dialog] draagt maar 161 breed is.
// ── De alt-tekst als SPECIFICATIE, niet als losse zin ────────────────────────────────────────────────
// ⚠️ Tot 29/08/2026 toetste de generator één merkteken per beeld: staat dát woord op het scherm, dan
// geldt het beeld als juist. Een alt die zegt "de groep CRM met Relaties, Professionals, Afspraken,
// Aanbrengers en Groepen" haalde die toets op het woord "Relaties" — terwijl er ondertussen ook Leads en
// Online afspraken in stonden en één opsomming dus niet meer klopte. Dit leest ELKE hoofdletterterm uit
// de alt en meldt wat er níét op het scherm staat. Het is een RAPPORT, geen blokkade: een alt mag namen
// dragen die geen schermtekst zijn ("een blauw teller-bolletje", "Regio Zuid"). Wat hier verschijnt,
// moet een mens beoordelen — maar het verschijnt tenminste.
// ⚠️ De basis staat in de AppKit; dit zijn de CreditSoft-EIGEN woorden die in een alt met een hoofdletter
// staan maar geen schermtekst zijn — de productnaam en de namen van proefkantoren uit tenant_demo.
const NIET_SCHERMTEKST = new Set([...NIET_SCHERMTEKST_BASIS,
  'CreditSoft', 'Kredietkantoor', 'Regio', 'Zuid', 'Noord', 'Testkantoor']);

async function kiesElement(page, el) {
  let loc = page.locator(el.kies);
  if (el.bevat) loc = loc.filter({ hasText: new RegExp(el.bevat, 'i') });
  if (el.minBreed) {
    const n = await loc.count();
    for (let i = 0; i < n; i++) {
      const b = await loc.nth(i).boundingBox();
      if (b && b.width >= el.minBreed) return loc.nth(i);
    }
    throw new Error(`geen element van ${el.kies} breder dan ${el.minBreed}px`);
  }
  return loc.first();
}
async function elementSchot(page, el) {
  return await (await kiesElement(page, el)).screenshot({ timeout: 15000 });
}
// ⚠️ meldAan(): zie tools/aansturing.mjs.

await meldAan(page, gebruiker, wachtwoord, true);

// ── De klok moet vaststaan ────────────────────────────────────────────────────────────────────────────
// ⚠️ WAAROM DIT EEN WEIGERING IS EN GEEN WAARSCHUWING. Bij een dagwissel veranderen er ~30 van de 178
// beelden zonder dat er één regel code gewijzigd is: agenda, dashboard, leads, vooruitzicht, en de
// menuteller die taken telt die vandaag vervallen. De verouderingscontrole meldt dan "30 gewijzigd", en wie
// daarop stuurt gaat achter niets aan. Een waarschuwing die je élke ronde ziet, lees je niet meer — dus
// stopt hij.
//
// Deze generator START de app niet, dus hij kan de klok niet zelf vastzetten: de variabele wordt door
// AdmTijd één keer BIJ HET LADEN gelezen. Wat hij wél kan, is weigeren op een lopende klok te draaien.
//
// De losse klok blijft mogelijk, maar als EXPLICIETE uitzondering (`--losse-klok`), niet als stille
// standaard. Faalrichting boven faalzichtbaarheid.
const LOSSE_KLOK = process.argv.includes('--losse-klok');
{
  const balk = await page.locator('body').innerText();
  const m = balk.match(/Klok vastgezet · ([\d/]+)|Horloge figée · ([\d/]+)/);
  if (m) {
    console.log(`🕐 klok staat vast op ${m[1] ?? m[2]} — de ronde is herhaalbaar.`);
  } else if (LOSSE_KLOK) {
    console.log('⚠️ --losse-klok: de app draait op de ECHTE tijd. Beelden met een datum erin verouderen morgen.');
  } else {
    console.log('⛔ De app draait op de echte klok. Een beeldronde bakt dan de datum van vandaag in ~30 beelden,');
    console.log('   en die melden zich morgen als "gewijzigd" terwijl er niets gewijzigd is.');
    console.log('');
    console.log('   Zet in src/Host/CreditSoft.Host.Web/Properties/launchSettings.json bij het http-profiel:');
    console.log('       "ADM_TIJD_VAST": "2026-09-01"');
    console.log('   herstart de app, en draai deze ronde opnieuw.');
    console.log('');
    console.log('   Bewust op de echte tijd draaien? Voeg --losse-klok toe.');
    await browser.close();
    process.exit(1);
  }
}

let ok = 0; const mislukt = []; const ongecontroleerd = []; const overgeslagenPortaal = []; const zwakGecontroleerd = []; const handwerk = []; const gegroeid = []; const altAfwijkingen = []; const schermteksten = {};
// ⚠️ De KERN eist de NAMEN, niet een telling: hij controleert dat élk bestand op schijf in precies één
// uitslaglijst zit. Onze eigen controle hieronder kijkt of er een RECEPT bestaat — dat is iets anders, en
// allebei zijn ze nodig. Een beeld kan een recept hebben en toch in geen enkele uitslag belanden.
const misluktMet = (regel) => { mislukt.push(regel); verantwoord.mislukt.push(regel.split(' — ')[0]); };
const verantwoord = { geschreven: [], zwak: [], ongecontroleerd: [], portaal: [], handwerk: [], mislukt: [] };
let alsAanbrenger = false;
for (const taal of ['nl-BE', 'fr-BE']) {
  await page.goto(`${BASIS}/culture/set?c=${taal}`); await page.waitForLoadState('networkidle');
  const achtervoegsel = taal.startsWith('fr') ? '-fr' : '';
  for (const [naam, url, na] of SCHOTEN) {
    if (filter && !naam.includes(filter)) continue;

    // ⚠️ Portaalbeelden vragen de aanbrenger-aanmelding. Zonder wachtwoord: overslaan MET melding.
    const portaal = AANBRENGER_PORTAAL.includes(naam);
    if (portaal && !PORTAAL_WW) {
      if (!overgeslagenPortaal.includes(naam)) overgeslagenPortaal.push(naam);
      verantwoord.portaal.push(`${naam}${achtervoegsel}`);
      continue;
    }
    if (portaal !== alsAanbrenger) {
      await meldAan(page, portaal ? PORTAAL_GEBRUIKER : gebruiker,
                          portaal ? PORTAAL_WW : wachtwoord, !portaal);
      await page.goto(`${BASIS}/culture/set?c=${taal}`); await page.waitForLoadState('networkidle');
      alsAanbrenger = portaal;
    }
    if (HANDWERK[naam]) { if (!handwerk.includes(naam)) handwerk.push(naam);
                          verantwoord.handwerk.push(`${naam}${achtervoegsel}`); continue; }
    // ⚠️ Het kantoorprofiel bestaat enkel in het Nederlands (AppKit-scherm, niet vertaald) — geen FR-beeld.
    if (naam === 'kantoorprofiel-vragenlijst' && achtervoegsel) continue;
    try {
      fouten.length = 0;
      // ⚠️ Vensterbreedte VÓÓR het laden: een lijst met veel kolommen rendert anders op 1280 dan op 2000,
      // en dat is precies waarom die beelden elk hun eigen breedte hebben.
      const v = VORM[naam + achtervoegsel] || VORM[naam] || {};
      await page.setViewportSize({ width: v.breedte || BREED, height: v.hoogte || 860 });
      await page.goto(`${BASIS}${url}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3500);
      if (na) await na(page);
      // ⚠️ BIJ EEN ELEMENTSCHOT TOETSEN WE HET ELEMENT. De belofte van `hoofdbalk` is "CreditSoft-logo en
      // rechts…" — dat toetsen tegen de hele pagina zegt niets over de bovenbalk, en tegen het menu evenmin.
      const vormNu = VORM[naam + achtervoegsel] || VORM[naam] || {};
      const tekst = vormNu.element
        ? await (await kiesElement(page, vormNu.element)).innerText().catch(() => '')
        : await page.locator('body').innerText();
      if (/Er ging iets mis|Er is een fout|Une erreur/i.test(tekst)) { misluktMet(`${naam}${achtervoegsel} — foutmelding op het scherm`); continue; }

      // ⚠️ "GEEN TOEGANG" IS NOOIT EEN GELDIG BEELD, en dat moest hard: op 29/08/2026 zijn vier
      // portaalbeelden vervangen door dit scherm. De generator meldt aan als `admin`, en dat account is geen
      // aanbrenger — het portaal weigert hem. Het weigerscherm werd netjes afgedrukt en over het echte beeld
      // gezet. De beloftecontrole liet het door: er viel voor die beelden geen merkteken af te leiden dat
      // hier ontbrak. Een lege pagina haalt nu eenmaal elke controle die naar afwezigheid kijkt.
      // ⚠️ EEN BIJNA-LEEG SCHERM IS NOOIT EEN GELDIG BEELD. De beloftecontrole kijkt of iets AANWEZIG is;
      // een lege of geweigerde pagina haalt elke controle die naar afwezigheid zoekt. Vandaar een ondergrens
      // op de inhoud: een echt scherm draagt tientallen regels tekst, een weigerpagina een handvol.
      // ⚠️ Bij een ELEMENTschot slaat de ondergrens niet op: een dialoogvenster of de bovenbalk draagt
      // weinig tekst, en dat is juist de bedoeling. De grens geldt voor paginaschoten.
      // ⚠️ Eén scherm is ECHT zo kort: wachtwoord-wijzigen draagt drie velden en een knop, punt. Een
      // uitzondering mét reden, geen verlaagde grens voor iedereen — dan vangt hij niets meer.
      const KORT_MAG = { 'wachtwoord': 'drie velden en een knop; korter kan dit scherm niet zijn' };
      // ⚠️ Onze weigertekst is ruimer dan die van de kern: het portaal zegt óók "niet de nodige rechten".
      const besluit = schermBesluit({
        tekst, isElementSchot: !!(VORM[naam + achtervoegsel] || VORM[naam] || {}).element,
        magKortZijn: !!KORT_MAG[naam],
        geenToegang: /Geen toegang|Accès refusé|niet de nodige rechten|droits nécessaires/i });
      if (!besluit.ok) { misluktMet(`${naam}${achtervoegsel} — ${besluit.reden}`); continue; }

      // ⚠️ DE BELOFTE MOET OP HET SCHERM STAAN, anders schrijven we niets.
      const eigen = VERWACHT[naam];
      // ⚠️ DE ALT-TEKST VAN DE JUISTE TAAL. Hier stond `ALT[naam]` — zonder het -fr-achtervoegsel — en dus
      // werd elk Frans beeld getoetst aan de NEDERLANDSE belofte. Gevolg: 28 Franse beelden vielen af op
      // merktekens als "Erkenning en status" en "Betaald markeren", terwijl er niets mis was met het beeld.
      // Alle 28 falers droegen `-fr`; dat die lijst maar uit één taal bestond, was het teken.
      const afgeleid = eigen ? null : merkUitAlt(ALT[naam + achtervoegsel] || ALT[naam] || '');

      if (eigen) {
        // handgeschreven merkteken: dat MOET kloppen, geen inkorting
        if (!eigen.test(tekst)) {
          misluktMet(`${naam}${achtervoegsel} — belofte niet op het scherm: ${String(eigen)}`);
          continue;
        }
      } else if (afgeleid) {
        // ⚠️ AFGELEIDE MERKTEKENS ZIJN VAAK BESCHRIJVENDE ZINNEN, geen labels: "Overzicht van het
        // aanbrengersportaal" staat zo niet op het scherm — daar staat "Overzicht" en "Aanbrengersportaal"
        // apart. Daarom korten we in tot iets matcht, en NOTEREN we welk deel het werd. Vindt zelfs het
        // eerste woord niets, dan kijken we naar het verkeerde scherm en schrijven we niet.
        const w = afgeleid.split(/\s+/);
        let gevonden = null;
        for (let n = w.length; n >= 1; n--) {
          const kandidaat = w.slice(0, n).join(' ');
          if (new RegExp(kandidaat.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(tekst)) { gevonden = kandidaat; break; }
        }
        if (!gevonden) {
          misluktMet(`${naam}${achtervoegsel} — belofte niet op het scherm, zelfs niet "${w[0]}" (uit: "${afgeleid}")`);
          continue;
        }
        if (gevonden.split(/\s+/).length === 1) { zwakGecontroleerd.push(`${naam}${achtervoegsel} → "${gevonden}"`);
                                                    verantwoord.zwak.push(`${naam}${achtervoegsel}`); }
      } else {
        ongecontroleerd.push(`${naam}${achtervoegsel}`);
        verantwoord.ongecontroleerd.push(`${naam}${achtervoegsel}`);
      }

      // ⚠️⚠️ DE VORM MOET KLOPPEN, EN DIT IS DE BELANGRIJKSTE GRENDEL VAN DIT SCRIPT.
      //
      // De bestaande beelden zijn NIET allemaal volledige schermafdrukken op één formaat. Ze dragen meer dan
      // tien verschillende afmetingen, en dat is gekozen werk: 4000 breed waar de kolommen anders niet passen,
      // 2560×2480 voor een lange pagina, 1440×800 voor het portaal — en echte UITSNEDEN, zoals hoofdbalk
      // (2560×104, alleen de bovenbalk) en menu-links (440×1616, alleen het linkermenu).
      //
      // Deze generator maakt van alles één volledige afdruk op één formaat. Op 29/08/2026 heeft hij daarmee
      // 162 beelden VERVANGEN door iets anders — menu-links werd een schermafdruk van het hele dashboard.
      // Niets in de controle merkte dat: ik toetste of de BELOFTE op het scherm stond, nooit of het beeld
      // dezelfde VORM had als wat het verving. De commit is teruggedraaid; er is niets gepubliceerd.
      //
      // Zolang dit script geen vorm per beeld draagt (venstergrootte + optionele uitsnede), mag het een
      // bestaand beeld met een ANDERE afmeting niet overschrijven. Het meldt en laat staan.
      const doel = `${UIT}/${naam}${achtervoegsel}.png`;
      const vorm = VORM[naam + achtervoegsel] || VORM[naam] || {};
      // ⚠️ HIER opnieuw aanbrengen, en niet enkel bij het laden. Gemeten op 31/08/2026: een schot dat KLIKT
      // om te navigeren (rapporten-periode) verliest de ingespoten stijl — Blazor's enhanced navigation
      // vervangt de <head> en gooit hem weg. Vóór de klik stond hij er, erna niet meer. Daarom vlak vóór
      // elk schot opnieuw; addStyleTag is idempotent genoeg voor dit doel.
      await page.addStyleTag({ content: VERBERG_VERSIE }).catch(() => {});

      // Staat de badge écht uit? De klasse `.nav-version` woont in de AppKit-schil, niet in deze repo.
      // Hernoemt ze daar, dan grijpt de CSS niet meer en verschijnt het versienummer weer op alle beelden.
      //
      // ⚠️ ONTBREKEN is GEEN fout: niet elk scherm draagt de zijbalk (de wachtwoordpagina bijvoorbeeld).
      // Een per-beeld-eis dat ze bestaat, weigerde op 31/08 tien geldige beelden. Het hernoemen vangen we
      // op RONDE-niveau: is ze op geen énkel beeld gevonden, dan is de klasse weg.
      const badge = await page.evaluate(() => {
        const el = document.querySelector('.nav-version');
        if (!el) return 'ontbreekt';
        return getComputedStyle(el).visibility === 'hidden' ? 'verborgen' : 'ZICHTBAAR';
      });
      if (badge === 'verborgen') badgeGezien++;
      if (badge === 'ZICHTBAAR') {
        misluktMet(`${naam}${achtervoegsel} — versiebadge ZICHTBAAR: de filter op .nav-version grijpt hier `
          + `niet. Het versienummer zou op dit beeld komen te staan.`);
        continue;
      }

      // ⚠️ BOTSENDE FORMULIERLABELS, en dit is gratis: de ronde staat hier tóch al, met het scherm open, in
      // beide talen. Een DevExpress-formulierlabel staat op `white-space: nowrap`; is de vertaling langer dan
      // haar kolom, dan breekt ze niet af maar loopt ze de buurkolom in. Frans is stelselmatig langer dan
      // Nederlands, dus dit treft in de praktijk vooral de FR-ronde — en het valt op een schermafdruk niet op
      // als je niet weet dat je moet kijken. Dominique zag het op 01/09/2026 zelf, in de pandfiche.
      //
      // Het MELDT en blokkeert niet: een botsing maakt het beeld niet fout, ze maakt het scherm lelijk.
      const botsingen = await page.evaluate(() => {
        const labels = [...document.querySelectorAll('.dxbl-fl-cpt')]
          .filter(e => e.getBoundingClientRect().width > 0);
        const uit = [];
        for (let i = 0; i < labels.length; i++)
          for (let j = i + 1; j < labels.length; j++) {
            const a = labels[i].getBoundingClientRect(), b = labels[j].getBoundingClientRect();
            if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1
             && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1)
              uit.push(labels[i].textContent.trim().slice(0, 34) + ' <> ' + labels[j].textContent.trim().slice(0, 28));
          }
        return uit;
      }).catch(() => []);
      for (const b of botsingen) labelBotsingen.push(`${naam}${achtervoegsel}: ${b}`);

      const nieuw = vorm.element ? await elementSchot(page, vorm.element) : await page.screenshot();
      // ⚠️ IS DEZE RONDE HERHAALBAAR? Eén beeld wordt twee keer na elkaar geschoten, en de twee moeten
      // byte-identiek zijn. Dat is de enige controle die de HELE familie vangt waar de schuifbalk er maar
      // één van was: alles wat tussen twee schoten verandert zonder dat de app verandert — een animatie die
      // nog loopt, een tooltip die vervaagt, een teller die tikt. Een filter per gevonden geval dekt enkel
      // het geval dat je al kent; dit dekt ook de volgende.
      //
      // Het beeld is met opzet `documenttypes`: het draagt geen datum (dus geen ruis van de klok) en het
      // is net het scherm waarop de schuifbalk betrapt werd. Het MELDT en blokkeert niet.
      if (`${naam}${achtervoegsel}` === HERHAALPROEF) {
        const tweede = vorm.element ? await elementSchot(page, vorm.element) : await page.screenshot();
        herhaalProef = Buffer.compare(nieuw, tweede) === 0
          ? { gelijk: true }
          : { gelijk: false, a: nieuw.length, b: tweede.length };
      }
      if (existsSync(doel)) {
        const besluitVorm = vormBesluit({
          bestaandeMaat: pngMaat(readFileSync(doel)), nieuweMaat: pngMaat(nieuw),
          isElementSchot: !!vorm.element });
        if (besluitVorm.besluit === 'weigeren') {
          misluktMet(`${naam}${achtervoegsel} — ${besluitVorm.reden}`); continue;
        }
        if (besluitVorm.besluit === 'gegroeid') gegroeid.push(`${naam}${achtervoegsel}: ${besluitVorm.reden}`);
      }
      // ⚠️ De hele alt als specificatie — een rapport, geen blokkade (zie altTermen).
      const volledigeAlt = ALT[naam + achtervoegsel] || '';
      if (volledigeAlt) {
        // ⚠️ VELDWAARDEN STAAN NIET IN innerText. DevExpress zet ze in `value`, dus een alt die zegt
        // "adres Beukenlaan 50 in 1000 Brussel" leek altijd te liegen, ook op de juiste fiche. Dat is ruis
        // die de echte vondsten begraaft, dus lezen we de waarden erbij.
        const zoek = naam === 'menu-links' || naam === 'hoofdbalk' ? tekst
          : await page.evaluate(() => document.body.innerText + '\n' +
              [...document.querySelectorAll('input, textarea, select')]
                // ⚠️ ALLEEN ZICHTBARE VELDEN. Een verborgen veld staat per definitie niet op het beeld, dus
                // het hoort niet in een beeldcontrole — en er staat er één bij dat er echt niet in mag: het
                // ASP.NET-antiforgery-token (prefix CfDJ8, de handtekening van Data Protection). De
                // Nimble-sessie kreeg dat op 29/08/2026 in haar bewaarde ronde, en dat bestand gaat bij hen
                // in git. Bij ons niet — het staat in .gitignore en wij bewaren de innerText en niet deze
                // samenstelling — maar dat is geluk en geen ontwerp, dus hier het filter.
                .filter(e => e.type !== 'hidden' && e.type !== 'password' && e.offsetParent !== null)
                .map(e => (e.value || '').replace(/[A-Za-z0-9_-]{22,}/g, ''))
                .join('\n'));
        const ontbreekt = ontbrekendeTermen(volledigeAlt, zoek, NIET_SCHERMTEKST);
        if (ontbreekt.length) altAfwijkingen.push(`${naam}${achtervoegsel}: ${ontbreekt.join(', ')}`);
      }
      // ⚠️ De schermtekst bewaren. Een ronde kost 25 minuten; een controle die achteraf bedacht wordt,
      // zou daar telkens opnieuw op moeten wachten. Nu kan ze op deze bestanden draaien.
      schermteksten[`${naam}${achtervoegsel}`] = tekst;
      writeFileSync(doel, nieuw);
      // ⚠️ Ook vastleggen WAARTEGEN dit beeld geschoten is: de route en de toestand van de app. Zonder die
      // twee kan verouderd.mjs later niets zeggen, en een beeld van een gewijzigd scherm ziet er even
      // overtuigend uit als een juist.
      beeldUitslag[`${naam}${achtervoegsel}`] = {
        route: (typeof url === 'string' ? url : String(url ?? '')).split('${')[0].split('?')[0].replace(/\/+$/, ''),
        app: appToestand(),
      };
      ok++;
      verantwoord.geschreven.push(`${naam}${achtervoegsel}`);
    } catch (e) { misluktMet(`${naam}${achtervoegsel} — ${e.message.slice(0, 60)}`); }
  }
}
// ⚠️ De tabel pas NA de ronde wegschrijven, en samengevoegd met wat er stond: draai je één beeld met een
// filter, dan mogen de negentig andere niet verdampen. Zelfde reden als bij de films-uitslag.
writeFileSync(BEELD_UITSLAG, JSON.stringify(beeldUitslag, null, 2) + '\n');

await browser.close();

console.log(`\n✅ ${ok} beelden geschreven — elk mét zijn belofte op het scherm`);

// ⚠️ NIETS GEVONDEN IS GEEN "IN ORDE". Draaide het proefbeeld niet mee (een filter op de opdrachtregel,
// een hernoemd schot), dan is de herhaalbaarheid deze ronde NIET gemeten — en dat moet het zeggen.
if (herhaalProef === null) {
  console.log(`\n◐ herhaalbaarheid NIET gemeten — '${HERHAALPROEF}' zat niet in deze ronde.`);
  console.log('   Zet CS_HERHAALPROEF op een beeld dat wél meedraait, anders bewijst een schone ronde niets.');
} else if (herhaalProef.gelijk) {
  console.log(`\n✅ herhaalbaar: '${HERHAALPROEF}' twee keer na elkaar geschoten, byte-identiek.`);
} else {
  console.log(`\n⚠️  NIET HERHAALBAAR: '${HERHAALPROEF}' gaf twee verschillende beelden na elkaar `
    + `(${herhaalProef.a} vs ${herhaalProef.b} bytes).`);
  console.log('   Er verandert iets tussen twee schoten zonder dat de app verandert. Zolang dat zo is,');
  console.log('   meldt de verouderingscontrole wijzigingen die er niet zijn — zoek het vóór je op de');
  console.log('   uitslag van deze ronde vertrouwt.');
}
if (zwakGecontroleerd.length) {
  console.log(`\n◐ ${zwakGecontroleerd.length} beelden zijn maar ZWAK gecontroleerd — enkel op één woord:`);
  console.log('   ' + zwakGecontroleerd.slice(0, 40).join(', ') + (zwakGecontroleerd.length > 40 ? ' …' : ''));
  console.log('   Eén woord bewijst dat je op het juiste SCHERM zit, niet dat de juiste TOESTAND getoond wordt.');
}
if (altAfwijkingen.length) {
  console.log(`\n🔎 ${altAfwijkingen.length} beelden dragen een alt-tekst met woorden die NIET op het scherm staan:`);
  for (const a of altAfwijkingen) console.log(`   ${a}`);
  console.log('   Een alt mag namen dragen die geen schermtekst zijn. Wat hier staat, vraagt een oordeel —');
  console.log('   maar een opsomming die niet meer klopt, staat hier ook. Loop ze na.');
}
if (handwerk.length) {
  console.log(`\n✋ ${handwerk.length} beelden zijn MET DE HAND uitgesneden en dus NIET hernomen:`);
  for (const n of handwerk) console.log(`   ${n} — ${HANDWERK[n]}`);
  console.log('   Ze staan er nog zoals ze waren. Wijzigt dat scherm, dan moet iemand ze opnieuw uitsnijden.');
}
if (gegroeid.length) {
  console.log(`\n📐 ${gegroeid.length} elementschoten zijn van GROOTTE veranderd (het element zelf groeide):`);
  for (const g of gegroeid) console.log(`   ${g}`);
  console.log('   Ze zijn wél geschreven — bij een elementschot is de grootte het element, geen kaderkeuze.');
}
if (overgeslagenPortaal.length) {
  console.log(`\n⚠️ ${overgeslagenPortaal.length} PORTAALBEELDEN OVERGESLAGEN — geen aanbrenger-wachtwoord:`);
  console.log('   ' + overgeslagenPortaal.join(', '));
  console.log('   Zet CS_PORTAAL_PW en draai opnieuw. De oude beelden blijven staan; ze zijn NIET overschreven.');
}
if (ongecontroleerd.length) {
  console.log(`\n⚠️ ${ongecontroleerd.length} beelden zijn NIET tegen hun belofte gecontroleerd (geen merkteken af te leiden):`);
  console.log('   ' + ongecontroleerd.join(', '));
  console.log('   Die moet iemand met eigen ogen nakijken, of geef ze een regel in VERWACHT.');
}
if (mislukt.length) { console.log(`\n⚠️ ${mislukt.length} MISLUKT:`); mislukt.forEach(m => console.log('   ' + m)); }
if (labelBotsingen.length) {
  console.log(`\n⚠️ ${labelBotsingen.length} BOTSEND FORMULIERLABEL — een vertaling past niet in haar kolom:`);
  labelBotsingen.forEach(b => console.log('   ' + b));
  console.log('   Kort de tekst in, of geef het veld een bredere kolom. Het beeld is niet fout, het scherm wel.');
}
// ⚠️ DE GENERATOR CONTROLEERT ZICHZELF. Op 28/08/2026 stonden `verzendadressen-bewerken` en `journaal-lade`
// in GEEN van beide lijsten — niet bij de schoten, niet bij "zonder recept". Ze werden dus stil overgeslagen,
// precies wat dit script moest voorkomen. Een lijst die je met de hand bijhoudt, raakt onvolledig; de map met
// beelden is de enige bron die niet liegt.
if (!filter) {
  const geschoten = new Set(SCHOTEN.map(x => x[0]));
  const opSchijf = readdirSync(UIT).filter(f => f.endsWith('.png') && !f.endsWith('-fr.png'))
                                   .map(f => f.replace('.png', ''));
  const vergeten = opSchijf.filter(n => !geschoten.has(n) && !ZONDER_RECEPT.includes(n));
  if (vergeten.length) {
    console.log(`\n⚠️ ${vergeten.length} beelden staan op schijf maar in GEEN ENKELE lijst — stil overgeslagen:`);
    console.log('   ' + vergeten.join(', '));
    console.log('   Voeg ze toe aan SCHOTEN, of aan ZONDER_RECEPT met de reden.');
  } else {
    writeFileSync('/Users/dominique/projects/creditsoft-docs/tools/.schermteksten.json',
              JSON.stringify(schermteksten, null, 1));
    // ⚠️ EN DE STRENGERE CONTROLE VAN DE KERN. Die hierboven vraagt "bestaat er een recept?"; deze vraagt
    // "is dit bestand in deze ronde ergens terechtgekomen?" — en dat is niet hetzelfde. Een beeld met een
    // recept dat halverwege wegvalt zonder in een lijst te belanden, leest als geslaagd.
    const opSchijfVolledig = readdirSync(UIT).filter(f => f.endsWith('.png')).map(f => f.replace('.png', ''));
    // ⚠️ DE LIJSTEN MOETEN ELKAAR UITSLUITEN, en dat had ik mis. "Zwak gecontroleerd" is geen uitkomst
    // naast "geschreven" maar een KWALIFICATIE erop: zo'n beeld is wél geschreven. Bij de eerste ronde met
    // deze controle stonden 66 beelden dus in twee lijsten. De controle zei dat meteen — precies waarvoor
    // ze bestaat, en meteen op zichzelf toegepast.
    const zwakOfOngecontroleerd = new Set([...verantwoord.zwak, ...verantwoord.ongecontroleerd]);
    const uitsluitend = { ...verantwoord,
      geschreven: verantwoord.geschreven.filter(n => !zwakOfOngecontroleerd.has(n)) };
    const { nergens, meermaals } = verantwoording(opSchijfVolledig, uitsluitend);
    if (nergens.length || meermaals.length) {
      if (nergens.length) {
        console.log(`\n⚠️ ${nergens.length} beelden zitten in GEEN ENKELE uitslaglijst van deze ronde:`);
        console.log('   ' + nergens.join(', '));
      }
      if (meermaals.length) {
        console.log(`\n⚠️ ${meermaals.length} beelden zitten in MEER DAN ÉÉN uitslaglijst:`);
        console.log('   ' + meermaals.join(', '));
      }
    } else {
      console.log('\n✅ elk beeld op schijf zit in een lijst — niets stil overgeslagen.');
    }
  }
}

if (!filter && ZONDER_RECEPT.length) {
  console.log(`\n⚠️ ${ZONDER_RECEPT.length} beelden hebben NOG GEEN RECEPT en zijn dus NIET hernomen:`);
  console.log('   ' + ZONDER_RECEPT.join(', '));
  console.log('   Ze staan dus nog op de oude toestand. Voeg een recept toe in SCHOTEN met een `na`.');
}

// ⚠️ DE FILTER ZELF, OP RONDE-NIVEAU. Per beeld is "de badge ontbreekt" geen fout — niet elk scherm draagt
// de zijbalk. Maar is ze op GEEN ENKEL beeld gevonden, dan bestaat de klasse `.nav-version` niet meer (ze
// woont in de AppKit-schil, niet hier) en heeft de filter dus niets meer gedaan. Zonder deze controle zou
// het versienummer stil op alle beelden terugkeren en zou de hele ronde bij elke release weer verouderen.
if (!filter) {
  if (badgeGezien === 0) {
    console.log('\n⛔ DE VERSIEFILTER HEEFT NIETS GEDAAN: `.nav-version` is op geen enkel beeld gevonden.');
    console.log('   De klasse is vermoedelijk hernoemd in de AppKit-schil. Zoek de nieuwe naam op en pas');
    console.log('   VERBERG_VERSIE aan — anders staat het versienummer weer op elk beeld.');
    process.exitCode = 1;
  } else {
    console.log(`\n✅ versiebadge verborgen op ${badgeGezien} beelden — een versiebump veroudert de ronde niet.`);
  }
}
