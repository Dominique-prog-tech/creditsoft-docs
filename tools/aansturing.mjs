// ── Gedeelde aansturing: waar de app staat, wie er aanmeldt, en welke proefgegevens ─────────────────────
//
// ⚠️ WAAROM DIT BESTAND ER IS (30/08/2026). FILMS-SPEC §0 zegt: films.mjs importeert de hulpjes uit
// beelden.mjs, "en dat exporteren is de enige wijziging aan het bestaande bestand". Dat kán niet.
// beelden.mjs start op regel 576 een browser en draait de héle beeldronde IN de module — een `import`
// eruit schiet dus 184 beelden voor het eerste regeltje van films.mjs draait. Exporteren alleen lost dat
// niet op; er is geen manier om een naam uit een module te halen zonder haar body uit te voeren.
//
// ── EN WAT HET SINDS 06/09/2026 IS ──────────────────────────────────────────────────────────────────────
// De KOPPELLAAG tussen twee dingen die nu apart wonen:
//
//     app.mjs                    ← wat CreditSoft is: de poort, de proefgegevens, de klant, de paden
//     machinerie/aansturing.mjs  ← hoe je aanmeldt en geheimen leest — zonder te weten welk pakket
//
// Dit bestand houdt exact dezelfde exports als vóór die knip, zodat beelden.mjs, films.mjs, bunny.mjs,
// stemmen.mjs en het draaiboek ongewijzigd blijven. Wie CreditSoft wil wijzigen, is in app.mjs; wie de
// werking wil wijzigen, in machinerie/. Zie machinerie/LEESMIJ.md.

import { PAKKET, BASIS, ID } from './app.mjs';
import { geheim, aanmeldgegevens, appToestand as _appToestand, meldAan as _meldAan } from './machinerie/aansturing.mjs';

export { BASIS, ID };
export const SECRETS = PAKKET.secrets;

const { gebruiker, wachtwoord } = aanmeldgegevens(PAKKET.secrets, PAKKET.cfg);
export { gebruiker, wachtwoord };

// ── De stem-API ──────────────────────────────────────────────────────────────────────────────────────────
// ⚠️ UIT USER-SECRETS. Nooit in git, nooit in een log, nooit in een commit-tekst. Zetten doe je één keer,
// in de Host-map van adm-creditsoft:
//
//     dotnet user-secrets set "ElevenLabs:ApiKey" "<de sleutel>"
//     dotnet user-secrets set "ElevenLabs:StemNl" "<voice-id>"
//     dotnet user-secrets set "ElevenLabs:StemFr" "<voice-id>"
//
// ⚠️ DEZELFDE STEMMEN VOOR ALLE DRIE DE PAKKETTEN (beslist 06/09/2026). Een sleutel hoort dus bij het
// PAKKET (elke repo leest zijn eigen user-secrets), maar de voice-id's zijn overal dezelfde waarde.
export const stemGeheim = naam => geheim(PAKKET.secrets, `ElevenLabs:${naam}`);

// ── Bunny Stream ─────────────────────────────────────────────────────────────────────────────────────────
// Zelfde plaats, zelfde regel: user-secrets, nooit in git of in een log.
//
//     dotnet user-secrets set "Bunny:ApiKey"    "<de sleutel van de video library>"
//     dotnet user-secrets set "Bunny:LibraryId" "<het nummer van de library>"
//
// ⚠️ ÉÉN ACCOUNT, EEN EIGEN LIBRARY PER PAKKET (beslist 06/09/2026). De LibraryId verschilt dus per repo
// en de sleutel hoort bij díé library — daarom leest dit de user-secrets van dít pakket en niet een
// gedeelde plek.
export const bunnyGeheim = naam => geheim(PAKKET.secrets, `Bunny:${naam}`);

// ── DE TOESTAND VAN DE APP OP HET MOMENT VAN OPNEMEN ─────────────────────────────────────────────────────
//
// ⚠️ EEN SHA EN GEEN VERSIENUMMER. Een versiebump zegt niets over of een SCHERM wijzigde — vandaag ging
// v1.70 naar v1.74 zonder dat de meeste schermen bewogen. Een commit-SHA laat de echte vraag stellen:
// "welke .razor-bestanden zijn sindsdien gewijzigd", en dat is precies wat raakt.mjs beantwoordt.
//
// ⚠️ En hij meldt of de werkmap VUIL was. Een SHA met niet-vastgelegde wijzigingen eromheen beschrijft niet
// wat er werkelijk gefilmd is; dan is het merkteken een benadering en dat hoort zichtbaar te zijn.
export const appToestand = () => _appToestand(PAKKET.repo);

// ── Aanmelden en de klant kiezen ─────────────────────────────────────────────────────────────────────────
export const meldAan = (page, user, ww, kiesTenant) =>
  _meldAan(page, PAKKET.basis, user, ww, kiesTenant, PAKKET.tenant);
