// ── Welke stemmen en modellen zijn er? ────────────────────────────────────────────────────────────────────
//
// Een keuzehulp, geen bouwstap: hij toont wat het account aanbiedt zodat Dominique een stem kan kiezen.
// ⚠️ Hij VRAAGT het aan de API en verzint niets. Modelnamen en stemmen wijzigen bij die dienst, en een
// hardgecodeerde naam uit iemands geheugen breekt stil — dan krijg je een 400 die als "de tekst deugt niet"
// leest terwijl het model gewoon niet meer bestaat.
//
//     node tools/stemmen.mjs
//
import { stemGeheim } from './aansturing.mjs';

const sleutel = stemGeheim('ApiKey');
if (!sleutel) {
  console.log('⛔ Geen ElevenLabs-sleutel in user-secrets.');
  console.log('   Zet hem één keer, in ~/projects/adm-creditsoft/src/Host/CreditSoft.Host.Web:');
  console.log('     dotnet user-secrets set "ElevenLabs:ApiKey" "<de sleutel>"');
  process.exit(1);
}

const haal = async (pad) => {
  const r = await fetch(`https://api.elevenlabs.io/v1/${pad}`, { headers: { 'xi-api-key': sleutel } });
  if (!r.ok) { console.log(`⛔ ${pad} → HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`); return null; }
  return r.json();
};

const modellen = await haal('models');
if (modellen) {
  console.log('\n── MODELLEN ────────────────────────────────────────────────────────────────');
  for (const m of modellen) {
    const talen = (m.languages ?? []).map(l => l.language_id ?? l.name).join(', ');
    const nlfr = /\bnl\b/i.test(talen) && /\bfr\b/i.test(talen) ? '  ✅ nl+fr' : '';
    console.log(`${(m.model_id ?? '?').padEnd(30)} ${(m.name ?? '').slice(0, 34).padEnd(36)}${nlfr}`);
    if (talen) console.log(`   talen: ${talen.slice(0, 150)}`);
  }
}

const stemmen = await haal('voices');
if (stemmen?.voices) {
  console.log('\n── STEMMEN ─────────────────────────────────────────────────────────────────');
  for (const v of stemmen.voices) {
    const l = v.labels ?? {};
    const kenmerk = [l.accent, l.gender, l.age, l.use_case].filter(Boolean).join(' · ');
    console.log(`${(v.voice_id ?? '?').padEnd(24)} ${(v.name ?? '').padEnd(22)} ${kenmerk}`);
  }
  console.log(`\n${stemmen.voices.length} stemmen. Kies er één voor NL en één voor FR en zet ze:`);
  console.log('   dotnet user-secrets set "ElevenLabs:StemNl" "<voice-id>"');
  console.log('   dotnet user-secrets set "ElevenLabs:StemFr" "<voice-id>"');
  console.log('\n⚠️ Let op het ACCENT. Een standaard Nederlandse stem klinkt Hollands en een Franse Parijs\'.');
  console.log('   Voor Vlaamse makelaars valt dat op; je eigen stem klonen is daarvoor de zekerste weg.');
}
