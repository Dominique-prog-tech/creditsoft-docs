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

const BASIS = 'http://localhost:5345';
const UIT = '/Users/dominique/projects/creditsoft-docs/docs/images';
const BREED = 1700, HOOG = 900;

// ⚠️ WELK ACCOUNT. Vier portaalbeelden zijn op 29/08/2026 vervangen door een "Geen toegang"-scherm omdat de
// generator als `admin` was aangemeld — en dat account is geen aanbrenger. Het weigerscherm werd netjes
// afgedrukt en over het echte beeld gezet. Een schot verklaart nu welk account het nodig heeft; wie er geen
// opgeeft, krijgt de beheerder.
const AANBRENGER_PORTAAL = ['portaal-overzicht', 'portaal-dossiers', 'portaal-commissies',
                            'portaal-documenten', 'portaal-dossier-detail'];

// Vaste proefgegevens uit tenant_demo. ⚠️ Kies op INHOUD, niet op aantal: een fiche met een leeg journaal
// levert beelden op die "Nog geen taken" tonen waar er eerst iets stond.
const ID = {
  dossier:  '00038c40-df6b-4992-83e4-13847c7a0a59',
  // dossier dát een commissieschema draagt — het vorige had er geen, en dan is er niets te tonen.
  dossierMetSchema: '1b174033-5caa-4f1f-981d-b336a78009f4',
  schema:   '2f2a33cc-b4f3-4fd4-aaf3-deb8612256fb',
  // ⚠️ Een aanbrenger die AL portaaltoegang heeft. Met een aanbrenger zónder toegang toont het venster
  // "Deze aanbrenger heeft nog geen portaaltoegang" — en dan mist het beeld precies de knoppen waar de
  // handleiding naar verwijst (Nieuw tijdelijk wachtwoord, Deactiveren).
  aanbrengerMetPortaal: '05b820be-792d-4ecb-b41e-c8b00619b872',
  relatie:  '09ee4eb1-5c32-4e3d-ade5-a0fe4fd9ded2',   // draagt bijlagen én journaal-items
  aanbrenger:'0447a42c-66a4-4afd-9939-80050a0b3279',
  lead:     'd87a24fd-a6aa-4d42-a412-25dbd99b45ba',
  prof:     '0073554f-f710-4170-8ea0-a55c2c512ba6',
  fin:      '0610525c-a434-455b-a42f-3d29468bff48',
  verz:     '176e7f4d-648c-4734-b4cc-01f702aa8c18',
  borderel: '000245d0-80b0-4ba8-8354-cdcb377fc5bd',
};

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
  ['keuzelijsten',                 '/beheer/keuzelijsten'],
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
      await tab(p, "Commissieschema's", "(Schémas|Barèmes) de commission");
      await p.locator('button.adm-menu-item')
             .filter({ hasText: /Commissieschema|Schémas de commission|Barèmes de commission/i })
             .first().click();
      await p.waitForTimeout(3000);
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
  ['afspraken-per-medewerker',  '/crm/afspraken'],
  ['agenda-afwezigheid',        '/beheer/afwezigheden'],
  ['portaal-dossier-detail',    '/portal-intermediary/dossiers',  async p => {
      const r = p.locator('tr').nth(1); if (await r.count()) { await r.dblclick(); await p.waitForTimeout(3500); }
  }],
  ['klantportaal-klant',        '/beheer/klantportaal'],
  ['rapporten-periode',         '/rapporten'],
  ['rapporten-voorbeeld',       '/rapporten'],
  ['gebruikers-fiche',          '/administration/users'],
  // ⚠️ Een EIGEN ROUTE, geen tabblad. Het dossierscherm heeft geen tabblad "Commissieschema's" — die zitten
  // in het journaal, achter de knop rechtsboven. Ik klikte op iets dat er niet is, in beide talen.
  ['commissieschema-fiche',     `/credit-files/${ID.dossierMetSchema}/commissieschema/${ID.schema}`],
  ['afspraak-venster',          '/crm/afspraken', async p => {
      // ⚠️ Stond hier als kaal paginabezoek — dan toont het beeld de agenda en niet het venster dat de
      // handleiding belooft. De beloftecontrole ving dat; met het oog was het niet opgevallen.
      await knop(p, 'Nieuwe afspraak', 'Nouveau rendez-vous').catch(async () => {
        await p.locator('button:has-text("Nieuw"), button:has-text("Nouveau")').first().click();
        await p.waitForTimeout(2500);
      });
  }],
  ['globaal-overzicht-voorinstelling', '/credit-files/overview', async p => {
      // de eerste keuzelijst opengeklapt — ook dit was een kaal paginabezoek
      await p.locator('.dxbl-combobox, select').first().click();
      await p.waitForTimeout(2000);
  }],
  ['hoofdbalk',                 '/dashboard'],
  ['menu-links',                '/dashboard'],
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
  'commissieschemas-journaal':  /schema|barème|schéma/i,
  'online-afspraken-instellingen': /Vragenlijst|Questionnaire|Locaties|Lieux/i,
  'filteren-zoekveld':          /Cuypers/i,
  'gebruikers-fiche':           /Rol|Rôle/i,
  'afspraak-venster':           /Verantwoordelijke|Responsable|Titel|Titre/i,
  'verzendadressen-bewerken':   /Verzendnaam|Nom d'expéditeur|E-mailadres/i,
  'globaal-overzicht-voorinstelling': /Alle dossiers|Tous les dossiers/i,
  'rapporten-periode':          /Periode|Période/i,
  'klantportaal-klant':         /Voorbeeld|Aperçu/i,
  'portaal-dossier-detail':     /Kredietgegevens|Données du crédit|Kredietbedrag/i,
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
// ⚠️ HET WACHTWOORD KOMT UIT USER-SECRETS, NIET UIT appsettings.Development.json. Die twee liepen op
// 28/08/2026 uiteen, en user-secrets WINT bij het draaien van de app. De oudere scripts in deze map
// (beelden-agenda.mjs, beelden-online-afspraken.mjs) lezen nog appsettings en melden zich dan als een
// time-out op "waiting for locator('table')" — dat is geen trage pagina maar een mislukte aanmelding.
// Nooit printen; enkel invullen.
const SECRETS = `${process.env.HOME}/.microsoft/usersecrets/511bd113-63f8-48dc-8980-fa97f73c7fe6/secrets.json`;
const CFG = '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/appsettings.Development.json';

let gebruiker, wachtwoord;
if (existsSync(SECRETS)) {
  // ⚠️ BOM eraf: dotnet schrijft secrets.json met een byte-order-mark en JSON.parse struikelt erover.
  const geheim = JSON.parse(readFileSync(SECRETS, 'utf8').replace(/^\uFEFF/, ''));
  gebruiker = geheim['Auth:InitialAdmin:UserName'];
  wachtwoord = geheim['Auth:InitialAdmin:Password'];
}
if (!wachtwoord) {
  const blok = readFileSync(CFG, 'utf8').match(/"InitialAdmin"\s*:\s*\{(.*?)\}/s)[1];
  gebruiker = blok.match(/"UserName"\s*:\s*"([^"]*)"/)[1];
  wachtwoord = blok.match(/"Password"\s*:\s*"([^"]*)"/)[1];
  console.log('ℹ️  wachtwoord uit appsettings.Development.json — user-secrets gaf niets');
}

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
const page = await ctx.newPage();
const fouten = [];
page.on('pageerror', e => fouten.push(e.message.slice(0, 100)));

// ⚠️ HET PORTAAL VRAAGT EEN EIGEN AANMELDING. Het wachtwoord van de proefaanbrenger staat NIET in git en
// NIET in dit bestand; het komt uit een omgevingsvariabele. Ontbreekt die, dan worden de portaalbeelden
// overgeslagen MET een melding — nooit stilzwijgend, en nooit met een weigerscherm als resultaat.
const PORTAAL_GEBRUIKER = process.env.CS_PORTAAL_USER || 'aanbrenger2@demo.example';
const PORTAAL_WW = process.env.CS_PORTAAL_PW || null;

async function meldAan(page, user, ww, kiesTenant) {
  await page.goto(`${BASIS}/login`);
  await page.locator('input[type="text"], input[name*="ser" i]').first().fill(user);
  await page.locator('input[type="password"]').first().fill(ww);
  await page.locator('button[type="submit"]').first().click();
  await page.waitForLoadState('networkidle');
  if (!kiesTenant) return;
  await page.goto(`${BASIS}/tenants`);
  // ⚠️ Zeg WAT er misging. Een time-out op "table" leest als een trage pagina; negen van de tien keer is het
  // een mislukte aanmelding, en dan zoek je op de verkeerde plaats.
  try { await page.waitForSelector('table', { timeout: 20000 }); }
  catch { throw new Error('Geen tenant-lijst na het aanmelden — vermoedelijk is de aanmelding mislukt (verkeerd wachtwoord?).'); }
  await page.locator('tr', { hasText: 'demo' }).first().getByText(/Gebruiken/).click();
  await page.waitForLoadState('networkidle');
}

await meldAan(page, gebruiker, wachtwoord, true);

let ok = 0; const mislukt = []; const ongecontroleerd = []; const overgeslagenPortaal = []; const zwakGecontroleerd = [];
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
      continue;
    }
    if (portaal !== alsAanbrenger) {
      await meldAan(page, portaal ? PORTAAL_GEBRUIKER : gebruiker,
                          portaal ? PORTAAL_WW : wachtwoord, !portaal);
      await page.goto(`${BASIS}/culture/set?c=${taal}`); await page.waitForLoadState('networkidle');
      alsAanbrenger = portaal;
    }
    // ⚠️ Het kantoorprofiel bestaat enkel in het Nederlands (AppKit-scherm, niet vertaald) — geen FR-beeld.
    if (naam === 'kantoorprofiel-vragenlijst' && achtervoegsel) continue;
    try {
      fouten.length = 0;
      await page.goto(`${BASIS}${url}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3500);
      if (na) await na(page);
      const tekst = await page.locator('body').innerText();
      if (/Er ging iets mis|Er is een fout|Une erreur/i.test(tekst)) { mislukt.push(`${naam}${achtervoegsel} — foutmelding op het scherm`); continue; }

      // ⚠️ "GEEN TOEGANG" IS NOOIT EEN GELDIG BEELD, en dat moest hard: op 29/08/2026 zijn vier
      // portaalbeelden vervangen door dit scherm. De generator meldt aan als `admin`, en dat account is geen
      // aanbrenger — het portaal weigert hem. Het weigerscherm werd netjes afgedrukt en over het echte beeld
      // gezet. De beloftecontrole liet het door: er viel voor die beelden geen merkteken af te leiden dat
      // hier ontbrak. Een lege pagina haalt nu eenmaal elke controle die naar afwezigheid kijkt.
      // ⚠️ EEN BIJNA-LEEG SCHERM IS NOOIT EEN GELDIG BEELD. De beloftecontrole kijkt of iets AANWEZIG is;
      // een lege of geweigerde pagina haalt elke controle die naar afwezigheid zoekt. Vandaar een ondergrens
      // op de inhoud: een echt scherm draagt tientallen regels tekst, een weigerpagina een handvol.
      const regels = tekst.split('\n').map(r => r.trim()).filter(Boolean);
      if (regels.length < 18) {
        mislukt.push(`${naam}${achtervoegsel} — scherm draagt maar ${regels.length} regels tekst; te leeg om een beeld te zijn`);
        continue;
      }
      if (/Geen toegang|Accès refusé|niet de nodige rechten|droits nécessaires/i.test(tekst)) {
        mislukt.push(`${naam}${achtervoegsel} — GEEN TOEGANG met dit account; het beeld is NIET overschreven`);
        continue;
      }

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
          mislukt.push(`${naam}${achtervoegsel} — belofte niet op het scherm: ${String(eigen)}`);
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
          mislukt.push(`${naam}${achtervoegsel} — belofte niet op het scherm, zelfs niet "${w[0]}" (uit: "${afgeleid}")`);
          continue;
        }
        if (gevonden.split(/\s+/).length === 1) zwakGecontroleerd.push(`${naam}${achtervoegsel} → "${gevonden}"`);
      } else {
        ongecontroleerd.push(`${naam}${achtervoegsel}`);
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
      const nieuw = await page.screenshot();
      if (existsSync(doel)) {
        const oud = readFileSync(doel);
        const maat = (b) => `${b.readUInt32BE(16)}×${b.readUInt32BE(20)}`;
        if (maat(oud) !== maat(nieuw)) {
          mislukt.push(`${naam}${achtervoegsel} — VORM WIJKT AF: bestaand ${maat(oud)}, nieuw ${maat(nieuw)}. `
                     + `Niet overschreven; dit beeld heeft een eigen venster of uitsnede.`);
          continue;
        }
      }
      writeFileSync(doel, nieuw);
      ok++;
    } catch (e) { mislukt.push(`${naam}${achtervoegsel} — ${e.message.slice(0, 60)}`); }
  }
}
await browser.close();

console.log(`\n✅ ${ok} beelden geschreven — elk mét zijn belofte op het scherm`);
if (zwakGecontroleerd.length) {
  console.log(`\n◐ ${zwakGecontroleerd.length} beelden zijn maar ZWAK gecontroleerd — enkel op één woord:`);
  console.log('   ' + zwakGecontroleerd.slice(0, 40).join(', ') + (zwakGecontroleerd.length > 40 ? ' …' : ''));
  console.log('   Eén woord bewijst dat je op het juiste SCHERM zit, niet dat de juiste TOESTAND getoond wordt.');
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
    console.log('\n✅ elk beeld op schijf zit in een lijst — niets stil overgeslagen.');
  }
}

if (!filter && ZONDER_RECEPT.length) {
  console.log(`\n⚠️ ${ZONDER_RECEPT.length} beelden hebben NOG GEEN RECEPT en zijn dus NIET hernomen:`);
  console.log('   ' + ZONDER_RECEPT.join(', '));
  console.log('   Ze staan dus nog op de oude toestand. Voeg een recept toe in SCHOTEN met een `na`.');
}
