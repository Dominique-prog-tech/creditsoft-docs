// ── De browser besturen zoals een mens dat doet ──────────────────────────────────────────────────────────
//
// MACHINERIE — hier staat GEEN CreditSoft in. Alles hieronder hangt aan de AppKit-schil en aan DevExpress,
// en die zijn gedeeld met Nimble en CleanOps: de kopbalk, een tabblad, de zijlade, een afspraakblok.
// Geknipt uit films.mjs op 06/09/2026, ongewijzigd. Zie machinerie/LEESMIJ.md voor waarom.
//
// ⚠️ `MEET`, `zichtbaarheid` en `huidigeScene` zijn GEDEELDE TOESTAND met de motor: die schrijft de scènenaam
// en leest achteraf de lijst uit voor het verslag. In ESM zijn exports live bindings, dus de array werkt
// gedeeld; `huidigeScene` is een scalar en gaat daarom via `zetScene`.

// ── Bewegen, niet springen (§3.2) ────────────────────────────────────────────────────────────────────────
// ⚠️ EERST IN BEELD BRENGEN, DAN PAS DE MUIS. Deze functie mat vroeger meteen de `boundingBox` en bewoog
// erheen. Stond het element ONDER DE VOUW, dan gaf die box een y buiten het venster: de muis ging naar een
// punt dat niemand ziet, de scène toonde de bovenkant van de pagina, en er faalde NIETS. Dominique zag het
// op 01/09/2026 op het dashboard — het blok "Aan de slag" duwt daar alles omlaag, en van de grafieken was
// enkel de titel te zien. Het raakte élke film met een lange pagina, niet enkel deze.
//
// `block: 'center'` en niet `scrollIntoViewIfNeeded()`: dat laatste schuift het element net binnen de rand,
// en dan staat je onderwerp op de onderste pixelrij. Centreren leest als een bewuste camerabeweging.
// ⚠️ MEETSTAND. Zonder deze vlag is de meting hieronder BESMET door haar eigen fix: scène 3 meet een pagina
// die scène 2 al gescrold heeft, en dan staat alles "in beeld". De eerste ronde meldde zo 146 van 146 —
// een sluitend antwoord op een vraag die niet gesteld werd.
//
// Met --meet scrollt `beweegNaar` NIET (het gedrag van vóór 01/09/2026), zodat de uitkomst zegt wat de
// GEPUBLICEERDE films toonden. De ronde neemt dan ook geen video op en raakt de uitslagtabel niet aan.
export const MEET = process.argv.includes('--meet');
export const zichtbaarheid = [];   // per scène: stond het onderwerp in beeld VÓÓR het scrollen?
let huidigeScene = '?';
export const zetScene = s => { huidigeScene = s; };

export async function beweegNaar(page, loc) {
  // ⚠️ EERST METEN, DAN SCROLLEN. Zo weten we of de OUDE versie van deze functie (die niet scrolde) dit
  // onderwerp wel of niet in beeld had — dat is de controle op alles wat vóór 01/09/2026 opgenomen is.
  const voor = await loc.boundingBox().catch(() => null);
  const venster0 = page.viewportSize();
  if (voor && venster0) {
    const inBeeld = voor.y >= 0 && voor.y + voor.height <= venster0.height;
    zichtbaarheid.push({ scene: huidigeScene, inBeeld, y: Math.round(voor.y), venster: venster0.height });
  }

  if (!MEET) {
    await loc.evaluate(el => el.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' }))
      .catch(() => { /* een element zonder eigen scrollcontext: dan gewoon meten */ });
    await page.waitForTimeout(350);
  }

  const doos = await loc.boundingBox();
  if (!doos) throw new Error('element heeft geen plaats op het scherm');

  // ⚠️ EN CONTROLEER DAT HET ER ÉCHT STAAT. Zonder deze regel levert een scène die naar iets buiten beeld
  // wijst gewoon een film op — een geslaagde ronde boven een beeld dat het onderwerp niet toont. Dat is
  // precies de faalvorm die hierboven beschreven staat, en ze hoort te FALEN in plaats van te zwijgen.
  const venster = page.viewportSize();
  if (!MEET && venster && (doos.y + doos.height < 0 || doos.y > venster.height)) {
    throw new Error(`element staat buiten beeld na scrollen (y=${Math.round(doos.y)}, venster ${venster.height}) `
      + '— de scène zou iets tonen wat de kijker niet ziet');
  }

  await page.mouse.move(doos.x + doos.width / 2, doos.y + doos.height / 2, { steps: 25 });
  await page.waitForTimeout(180);
}
export async function klik(page, loc) { await beweegNaar(page, loc); await loc.click(); }

// ── Een knop in de kopbalk, in BEIDE talen ───────────────────────────────────────────────────────────────
// ⚠️ Niet op `button[title="Zoeken (⌘K)"]`. Die titel is VERTAALD — in het Frans staat er "Rechercher (⌘K)",
// en dan draait de Nederlandse film goed en de Franse in een time-out. Elke film hierna gebruikt deze.
// De knoppen dragen geen stabiele klasse, dus de titel is wat er is; één regex dekt de twee talen samen.
export const kopbalkKnop = (page, patroon) => page.getByTitle(patroon).first();

// Een tabblad op een fiche, in beide talen. Tabbladen dragen `role=tab`; op naam is stabieler dan op index,
// want de tabreeks verschilt per soort relatie (een bedrijf heeft geen "Bijkomend" met geboortedatum).
export const tabblad = (page, patroon) => page.getByRole('tab').filter({ hasText: patroon }).first();

// ── Een afspraakblok dat ECHT zichtbaar is ───────────────────────────────────────────────────────────────
// ⚠️ Niet `.first()`. De agenda rendert 36 blokken waarvan de eerste buiten beeld of afgedekt is: dubbelklikken
// liep in een time-out van 30 s. En niet op `[class*=appointment]` — DevExpress noemt ze `dxbl-sc-apt`.
// Deze zoekt het eerste blok met een echte plaats op het scherm.
export async function zichtbareAfspraak(page) {
  const n = await page.locator('.dxbl-sc-apt').count();
  for (let i = 0; i < n; i++) {
    const loc = page.locator('.dxbl-sc-apt').nth(i);
    const bb = await loc.boundingBox().catch(() => null);
    if (bb && bb.width > 40 && bb.height > 18 && bb.y > 100 && bb.y < 900) return loc;
  }
  throw new Error('geen zichtbaar afspraakblok in de agenda — staat er wel iets in deze week?');
}

// ── Een zijlade sluiten — en de twee soorten sluiten NIET hetzelfde ──────────────────────────────────────
// ⚠️ Gemeten op 01/09/2026: de ZOEKlade sluit met Escape, de HULPlade niet — daar blijft `.prefs-backdrop`
// staan, en die vangt de volgende klik af. De film viel dan op een time-out van 30 s in de scène erna, en
// de foutmelding wees naar de knop die niet klikbaar was in plaats van naar de lade die open bleef.
// Escape eerst (dat is wat een gebruiker doet), en pas als de backdrop blijft staan erop klikken.
export async function sluitLade(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  if (await page.locator('.prefs-backdrop').count()) {
    await page.locator('.prefs-backdrop').first().click({ force: true });
    await page.waitForTimeout(700);
  }
}
