// ── De filmgenerator voor de handleiding ─────────────────────────────────────────────────────────────────
//
// Fase 1 van tools/FILMS-SPEC.md: één film, end-to-end, in NL en FR.
//
// ⚠️ GELUID STUURT BEELD (§3.1). Eerst wordt per scène een audiofragment gemaakt en de duur ervan GEMETEN;
// pas daarna wordt opgenomen, en dan duurt elke scène minstens zolang als haar fragment. Synchronisatie is
// zo een eigenschap van de pijplijn en geen montagestap. Draai het niet om: geluid achteraf onderleggen
// betekent dat élke tekstwijziging een handmatige hermontage vraagt.
//
// ⚠️ DE STEM IS EEN PLAATSHOUDER. macOS `say` met Ellen (nl_BE — Vlaams) en Thomas (fr_FR). Dat is NIET de
// beslissing uit §11.1; die ligt bij Dominique (eigen stem klonen of kopen). Het punt is dat de pijplijn nu
// met ECHTE audio en ECHTE duren werkt — de stem verwisselen is één functie hieronder (`spreek`).
//
// ⚠️ EEN SCÈNE DIE HAAR MERKTEKEN MIST, LAAT DE HELE FILM VALLEN (§5). Harder dan bij beelden, met reden:
// een fout beeld tussen 184 is een fout beeld; een foute scène zit middenin een verhaal dat gewoon
// doorloopt, en dat merkt niemand bij het nakijken.
//
// Gebruik:
//   node tools/films.mjs                 alle films, NL en FR
//   node tools/films.mjs kredietdossier  enkel de films waarvan de naam dat bevat
//   node tools/films.mjs --droog         geen opname: enkel de audio maken en de duren tonen
//
// Uitvoer: tools/.films-uit/ — NIET in git (§7: geen mp4 in git).

import { mkdirSync, rmSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { chromium } from '/Users/dominique/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web/bin/Debug/net10.0/.playwright/package/index.mjs';
import { BASIS, ID, gebruiker, wachtwoord, meldAan } from './aansturing.mjs';

const UIT = new URL('./.films-uit/', import.meta.url).pathname;
const BREED = 1920, HOOG = 1080;                  // §3.3 — gemeten: de dossierlijst past hierop, ruimer dan op 1700
const STEM = { 'nl-BE': 'Ellen', 'fr-BE': 'Thomas' };
const TEMPO = { 'nl-BE': 175, 'fr-BE': 175 };     // woorden/minuut voor `say`; ± 140 gesproken tempo

// ── RITME ────────────────────────────────────────────────────────────────────────────────────────────────
// ⚠️ Tot 31/08/2026 zat hier NIETS. Elke scène duurde precies zolang als haar audiofragment, en het
// geluidsspoor plakte de fragmenten aan elkaar: het einde van zin 1 raakte het begin van zin 2. Er was dus
// per constructie geen enkele stilte — de enige die voorkwam was toevallig, wanneer een handeling langer
// duurde dan haar zin. Dominique hoorde dat meteen: "weinig stilte tussen de zinnen waardoor het allemaal
// artificieel overkwam." Een betere stem lost dat NIET op; dit is tijdlijn, geen timbre.
//
// ⚠️ En een tweede, even structureel: de zin begon op het moment dat de HANDELING begon, niet wanneer het
// scherm klaar stond. De kijker hoorde dus de uitleg van een scherm dat hij nog niet zag.
const AANLOOP = 0.6;          // stilte tussen "het scherm staat er" en de eerste lettergreep
const ADEM = 0.9;             // stilte ná de zin, vóór de volgende handeling begint
const AANLOOP_START = 1.2;    // vóór de allereerste zin — anders val je midden in een gesprek binnen
const NASLEEP = 1.6;          // laten uitademen op het slotbeeld — mét de slot-adem samen ± 2 s
const filter = process.argv.slice(2).find(a => !a.startsWith('--'));
const DROOG = process.argv.includes('--droog');

// ── De cursor (§3.2) ─────────────────────────────────────────────────────────────────────────────────────
// Playwright tekent de muisaanwijzer niet in de video. Zonder dit drukken knoppen zichzelf in, en dat leest
// als een storing. Twintig regels, en meteen herbruikbaar voor CleanOps en Nimble.
// ⚠️ HET VERSIENUMMER GAAT OOK UIT DE FILMS. Linksonder in de zijbalk staat "v1.72.0 nieuw", en de zijbalk
// staat in élke film. Een film wordt hernomen wanneer het SCENARIO of het scherm wijzigt — niet bij elke
// release. Zonder deze filter zou elke versiebump vijftien films in twee talen verouderd maken, precies de
// reden waarom hij op 31/08/2026 in beelden.mjs kwam. Zelfde vorm: `visibility: hidden`, niet `display:none`,
// zodat de zijbalk niet inschuift en het beeldformaat gelijk blijft.
const VERBERG_VERSIE = '.nav-version { visibility: hidden !important; }';

const CURSOR = `
  (() => {
    const maak = () => {
      if (document.getElementById('adm-film-cursor')) return;
      const c = document.createElement('div');
      c.id = 'adm-film-cursor';
      c.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:22px;border-radius:50%;' +
        'background:rgba(20,20,20,.28);border:2px solid rgba(255,255,255,.95);box-shadow:0 1px 6px rgba(0,0,0,.45);' +
        'pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%);transition:width .12s,height .12s;';
      document.documentElement.appendChild(c);
      const ring = document.createElement('div');
      ring.id = 'adm-film-klik';
      ring.style.cssText = 'position:fixed;left:0;top:0;width:20px;height:20px;border-radius:50%;' +
        'border:2px solid rgba(13,110,253,.9);pointer-events:none;z-index:2147483646;opacity:0;' +
        'transform:translate(-50%,-50%) scale(1);';
      document.documentElement.appendChild(ring);
      addEventListener('mousemove', e => {
        c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
      }, true);
      addEventListener('mousedown', () => {
        ring.style.transition = 'none'; ring.style.opacity = '1'; ring.style.transform = 'translate(-50%,-50%) scale(1)';
        requestAnimationFrame(() => {
          ring.style.transition = 'transform .45s ease-out, opacity .45s ease-out';
          ring.style.transform = 'translate(-50%,-50%) scale(2.6)'; ring.style.opacity = '0';
        });
      }, true);
    };
    if (document.readyState === 'loading') addEventListener('DOMContentLoaded', maak); else maak();
    new MutationObserver(maak).observe(document.documentElement, { childList: true });
  })();
`;

// ── Bewegen, niet springen (§3.2) ────────────────────────────────────────────────────────────────────────
async function beweegNaar(page, loc) {
  const doos = await loc.boundingBox();
  if (!doos) throw new Error('element heeft geen plaats op het scherm');
  await page.mouse.move(doos.x + doos.width / 2, doos.y + doos.height / 2, { steps: 25 });
  await page.waitForTimeout(180);
}
async function klik(page, loc) { await beweegNaar(page, loc); await loc.click(); }

// ── Audio (§3.1) ─────────────────────────────────────────────────────────────────────────────────────────
function spreek(tekst, taal, pad) {
  execFileSync('say', ['-v', STEM[taal], '-r', String(TEMPO[taal]), '-o', pad + '.aiff', tekst]);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', pad + '.aiff', '-ar', '48000', '-ac', '2', pad]);
  rmSync(pad + '.aiff', { force: true });
  return Number(execFileSync('ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', pad]).toString().trim());
}
const tijd = s => {
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), r = (s % 60).toFixed(3).padStart(6, '0');
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${r}`;
};

// ── De films ─────────────────────────────────────────────────────────────────────────────────────────────
//
// ⚠️ DRIE SCÈNES UIT §4 KLOPPEN NIET MET HET SCHERM, en dat is gemeten, niet vermoed (30/08/2026):
//   • scène 7 "Kredietaanvragers" is GEEN tabblad maar een blokkop <h6> op de pagina zelf;
//   • scène 8 "Pand" is geen tabblad maar staat in de POP-UP achter de knop "Investeringsfiche & pand" —
//     wat een betere scène oplevert, want een klik die iets opent, filmt beter dan een blok;
//   • scène 9 heet sinds v1.68/1.69 "Gevraagd" / "Demandés", niet "Gevraagde documenten". De regex uit de
//     spec zou dus niets vinden en de hele film laten vallen.
// De drie ⟨FR?⟩-labels komen uit de broncode én zijn op het scherm nagemeten:
//   Nieuw dossier → Nouveau dossier · Investeringsfiche & pand → Fiche d'investissement & bien ·
//   Commissieschema's → Schémas de commission (in het JOURNAAL; SamenvoegPopup zegt "Barèmes de commission"
//   voor hetzelfde begrip — twee Franse termen, gemeld aan Dominique).
const FILMS = [
  ['kredietdossiers-basis', {
    pagina: 'credit-management/credit-files',
    dossier: ID.dossierMetSchema,                 // DEMO-1089 — actief schema, gevuld journaal, alle documentstatussen
    scenes: [
      { naam: 'lijst',
        doe: async (p) => { await p.goto(`${BASIS}/credit-files`); await p.waitForLoadState('networkidle'); },
        merk: /Kenmerk aanbrenger|Référence apporteur/i,
        nl: 'Het kredietdossier is het hart van CreditSoft. Alles wat bij één aanvraag hoort, staat op één pagina bij elkaar.',
        fr: "Le dossier de crédit est le cœur de CreditSoft. Tout ce qui concerne une demande est rassemblé sur une seule page." },

      { naam: 'kolommen',
        doe: async (p) => { await beweegNaar(p, p.locator('th').nth(3)); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'In de lijst ziet u per dossier het kenmerk van de aanbrenger, de status, het kredietbedrag en de aanvrager.',
        fr: "Dans la liste, vous voyez par dossier la référence apporteur, le statut, le montant du crédit et le demandeur." },

      { naam: 'zoeken',
        doe: async (p) => {
          const vak = p.locator('input[type="search"], input[placeholder*="oek" i], input[placeholder*="echerch" i]').first();
          await klik(p, vak); await vak.type('Demetris', { delay: 90 });
          await p.waitForTimeout(1800);
        },
        merk: /Demetris/i,
        nl: 'Bovenaan zoekt u door de hele lijst. Het aantal gevonden dossiers loopt mee.',
        fr: "En haut, vous cherchez dans toute la liste. Le nombre de dossiers trouvés suit." },

      { naam: 'openen',
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p, f) => { await p.goto(`${BASIS}/credit-files/${f.dossier}`); await p.waitForLoadState('networkidle'); },
        merk: /Kredietbedrag|Montant du crédit/i,
        nl: 'We openen een bestaand dossier.',
        fr: "Ouvrons un dossier existant." },

      { naam: 'gegevens',
        doe: async (p) => { await p.waitForTimeout(400); },
        merk: /Datum indiening|Date de dépôt/i,
        nl: 'Bovenaan staan de dossiergegevens: de status, het kredietbedrag, de instelling en de datums van indiening en ingang.',
        fr: "En haut se trouvent les données du dossier : le statut, le montant du crédit, l'institution et les dates de dépôt et d'effet." },

      { naam: 'aanvragers',
        doe: async (p) => {
          const kop = p.locator('h6', { hasText: /Kredietaanvragers|Demandeurs de crédit/ }).first();
          await kop.scrollIntoViewIfNeeded(); await beweegNaar(p, kop);
        },
        merk: /Kredietaanvragers|Demandeurs de crédit/i,
        nl: 'Onder Kredietaanvragers staan alle aanvragers van dit dossier, met hun gegevens en hun rol.',
        fr: "Sous Demandeurs de crédit figurent tous les demandeurs de ce dossier, avec leurs données et leur rôle." },

      { naam: 'pand',
        aanloop: 1.3,   // springt naar een ANDER scherm — daar valt het meest te zien
        doe: async (p) => {
          await klik(p, p.locator('button', { hasText: /Investeringsfiche & pand|Fiche d'investissement & bien/ }).first());
          await p.waitForTimeout(1400);
        },
        merk: /^(Pand|Bien)$/im,
        nl: 'Achter Investeringsfiche en pand vindt u het adres, de aard en de waarde van het pand — en die waarde bepaalt mee de quotiteit.',
        fr: "Derrière Fiche d'investissement et bien, vous trouvez l'adresse, la nature et la valeur du bien — et cette valeur détermine en partie la quotité." },

      { naam: 'documenten',
        doe: async (p) => {
          await p.keyboard.press('Escape'); await p.waitForTimeout(900);
          await klik(p, p.locator('[role="tab"]', { hasText: /^(Gevraagd|Demandés)\s*\(/ }).first());
          await p.waitForTimeout(1200);
        },
        merk: /Ontvangen|Reçu/i,
        nl: 'Bij Gevraagd volgt u per stuk of het aangeleverd is en of het al beoordeeld werd.',
        fr: "Dans Demandés, vous suivez pièce par pièce ce qui a été fourni et ce qui a déjà été évalué." },

      // ⚠️ TWEE SCÈNES, en dat was eerst één. Drie klikken na elkaar met één zin erover gaf 8,1 seconden
      // stilte vóór die zin — de kijker zat naar drie handelingen te kijken waar niemand iets bij zei.
      //
      { naam: 'journaal',
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

      { naam: 'commissieschemas',
        aanloop: 1.0,
        doe: async (p) => {
          await klik(p, p.locator('.adm-section-switch-btn').first());
          await p.locator('.adm-menu-item').first().waitFor({ timeout: 10000 });
          await klik(p, p.locator('.adm-menu-item', { hasText: /Commissieschema|Schémas de commission/ }).first());
        },
        merk: /Herberekenen|Recalculer/i,
        nl: 'En de commissieschema’s: wat er op dit dossier per aanbrenger verdiend wordt.',
        fr: "Et les schémas de commission : ce qui est gagné par apporteur sur ce dossier." },

      { naam: 'slot',
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
        fr: "Un dossier, une page. Ce qui a été payé, reste." },
    ],
  }],
];

// ── Draaien ──────────────────────────────────────────────────────────────────────────────────────────────
mkdirSync(UIT, { recursive: true });
const verslag = { gemaakt: [], gevallen: [] };

for (const [naam, film] of FILMS) {
  if (filter && !naam.includes(filter)) continue;

  for (const taal of ['nl-BE', 'fr-BE']) {
    const kort = taal.startsWith('fr') ? 'fr' : 'nl';
    const werk = `${UIT}${naam}-${kort}/`;
    rmSync(werk, { recursive: true, force: true }); mkdirSync(werk, { recursive: true });

    // 1 ─ GELUID EERST. Zonder dit weet niets hoelang een scène moet duren.
    console.log(`\n🎙  ${naam} · ${taal} — ${film.scenes.length} fragmenten`);
    const duren = [];
    for (const [i, sc] of film.scenes.entries()) {
      const d = spreek(sc[kort], taal, `${werk}${String(i).padStart(2, '0')}-${sc.naam}.wav`);
      duren.push(d);
      console.log(`     ${String(i + 1).padStart(2)} ${sc.naam.padEnd(12)} ${d.toFixed(1)}s  ${sc[kort].slice(0, 58)}…`);
    }
    const totaal = duren.reduce((a, b) => a + b, 0);
    console.log(`     ── samen ${totaal.toFixed(0)}s gesproken (richtduur ${film.duur ?? 150}s)`);
    if (DROOG) continue;

    // 2 ─ AANMELDEN BUITEN DE OPNAME. Anders staat het inlogscherm in de film.
    const browser = await chromium.launch();
    const voorbereiding = await browser.newContext({ viewport: { width: BREED, height: HOOG } });
    const vp = await voorbereiding.newPage();
    await meldAan(vp, gebruiker, wachtwoord, true);
    await vp.goto(`${BASIS}/culture/set?c=${taal}`); await vp.waitForLoadState('networkidle');
    const staat = await voorbereiding.storageState();
    await voorbereiding.close();

    // 3 ─ OPNEMEN. Elke scène duurt minstens zolang als haar fragment.
    const ctx = await browser.newContext({
      viewport: { width: BREED, height: HOOG }, deviceScaleFactor: 1, storageState: staat,
      recordVideo: { dir: werk, size: { width: BREED, height: HOOG } },
    });
    await ctx.addInitScript(CURSOR);
    await ctx.addInitScript((css) => {
      const stijl = document.createElement('style');
      stijl.textContent = css;
      document.addEventListener('DOMContentLoaded', () => document.head.appendChild(stijl));
    }, VERBERG_VERSIE);
    const page = await ctx.newPage();
    const t0 = Date.now();
    const merken = [];       // start-, spraak- en eindtijd per scène, t.o.v. het begin van de opname
    let gevallen = null;

    for (const [i, sc] of film.scenes.entries()) {
      const start = (Date.now() - t0) / 1000;
      try {
        await sc.doe(page, film);
        // ⚠️ WACHTEN OP EEN TOESTAND, NIET OP EEN TIMER (§3.4). Het merkteken IS de toestand.
        await page.locator('body').filter({ hasText: sc.merk }).first().waitFor({ timeout: 15000 });
      } catch (e) {
        gevallen = `${sc.naam} — ${String(e).split('\n')[0].slice(0, 120)}`;
        break;
      }
      // ⚠️ De versiefilter opnieuw aanbrengen: Blazor's enhanced navigation vervangt de <head> bij een
      // klik-navigatie en gooit de ingespoten stijl weg. Gemeten bij de beeldgenerator op 31/08/2026.
      await page.addStyleTag({ content: VERBERG_VERSIE }).catch(() => {});

      // Het scherm staat er (het merkteken is gevonden). Eerst laten LANDEN, dan pas praten — de kijker
      // moet kunnen zien wát er veranderd is vóór iemand het uitlegt.
      await page.waitForTimeout((sc.aanloop ?? (i === 0 ? AANLOOP_START : AANLOOP)) * 1000);
      const spraak = (Date.now() - t0) / 1000;
      // De zin, en daarna de adem. Die adem is geen opvulling: hij is het verschil tussen een voorlezende
      // machine en iemand die iets uitlegt.
      await page.waitForTimeout((duren[i] + (sc.adem ?? ADEM)) * 1000);
      merken.push({ naam: sc.naam, start, spraak, eind: (Date.now() - t0) / 1000 });
    }
    await page.waitForTimeout(NASLEEP * 1000);
    const videoPad = await page.video().path();
    await ctx.close(); await browser.close();

    // 4 ─ EEN SCÈNE DIE VIEL, LAAT DE HELE FILM VALLEN (§5)
    if (gevallen) {
      console.log(`  ❌ ${naam}-${kort} GEVALLEN op scène ${gevallen}`);
      verslag.gevallen.push(`${naam}-${kort}: ${gevallen}`);
      continue;
    }

    // 5 ─ GELUID ONDER HET BEELD, op de GEMETEN scènetijden — niet op de geplande.
    const lijst = [];
    let cursor = 0;
    const stilte = (lengte, merk) => {
      const pad = `${werk}stil-${merk}.wav`;
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'lavfi',
        '-i', 'anullsrc=r=48000:cl=stereo', '-t', String(lengte), pad]);
      return pad;
    };
    // ⚠️ Op m.spraak en niet op m.start: de zin hoort te beginnen wanneer het scherm klaar staat, niet
    // wanneer de handeling begint. De stilte ertussen is de aanloop + de adem van de vorige scène.
    for (const [i, m] of merken.entries()) {
      if (m.spraak > cursor + 0.02) lijst.push(stilte(m.spraak - cursor, i));
      lijst.push(`${werk}${String(i).padStart(2, '0')}-${m.naam}.wav`);
      cursor = m.spraak + duren[i];
    }
    // ⚠️ En stilte tot het einde van het BEELD. Zonder dit knipt `-shortest` hieronder de nasleep eraf:
    // het spoor is dan korter dan de opname, en de film eindigt op het laatste woord.
    const beeldEind = merken[merken.length - 1].eind + NASLEEP;
    if (beeldEind > cursor + 0.02) lijst.push(stilte(beeldEind - cursor, 'slot'));
    writeFileSync(`${werk}spoor.txt`, lijst.map(f => `file '${f}'`).join('\n'));
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0',
      '-i', `${werk}spoor.txt`, '-c', 'copy', `${werk}spoor.wav`]);

    const mp4 = `${UIT}${naam}-${kort}.mp4`;
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', videoPad, '-i', `${werk}spoor.wav`,
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '128k', '-shortest', mp4]);

    // 6 ─ Ondertitels: de tekst bestaat al, dus dat is gratis (§7)
    const vtt = ['WEBVTT', ''];
    for (const [i, m] of merken.entries())
      vtt.push(`${tijd(m.spraak)} --> ${tijd(m.spraak + duren[i])}`, film.scenes[i][kort], '');
    writeFileSync(`${UIT}${naam}-${kort}.vtt`, vtt.join('\n'));

    const lengte = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration',
      '-of', 'csv=p=0', mp4]).toString().trim());
    console.log(`  ✅ ${naam}-${kort}.mp4 — ${lengte.toFixed(0)}s, ${film.scenes.length} scènes, ondertitels erbij`);
    verslag.gemaakt.push(`${naam}-${kort} (${lengte.toFixed(0)}s)`);
  }
}

console.log(`\n${'─'.repeat(88)}`);
if (verslag.gemaakt.length) console.log(`✅ ${verslag.gemaakt.length} film(s): ${verslag.gemaakt.join(', ')}`);
if (verslag.gevallen.length) { console.log(`❌ ${verslag.gevallen.length} gevallen:`); verslag.gevallen.forEach(r => console.log(`   ${r}`)); }
if (DROOG) console.log('🅓 Droge proef — enkel geluid gemaakt, niets opgenomen.');
else if (!verslag.gemaakt.length && !verslag.gevallen.length)
  console.log("⚠️  Geen enkele film geraakt door de filter — bedoelde je een andere naam?");
