// Zet het register van betrokken personen klaar op tenant_demo, voor de beelden van de handleiding. Mag opnieuw draaien: het geeft elke keer dezelfde rijen.
// Enkel fictieve gegevens. Draai dit opnieuw nadat de demo opnieuw gegenereerd is; het recept van het beeld controleert op "Kantoorhoofd" en valt zo op als het vergeten is.
import { execFileSync } from 'node:child_process';

const sql = (q, d = 'tenant_demo') => execFileSync('docker', ['exec', 'creditsoft-db', 'psql', '-U', 'postgres', '-d', d, '-At', '-c', q]).toString().trim();

const personen = [
  { mail: 'medewerker1@demo.example', naam: 'Cools', voornaam: 'Lotte', geboorte: '1978-04-12',
    functies: [['Zaakvoerder', '2015-03-01', null]] },
  { mail: 'medewerker2@demo.example', naam: 'Vanhove', voornaam: 'Lore', geboorte: '1986-11-03',
    functies: [['Kredietadviseur', '2018-09-01', null]] },
  { mail: 'medewerker3@demo.example', naam: 'Van Acker', voornaam: 'Simon', geboorte: '1990-06-21',
    functies: [['Bediende', '2016-02-01', '2020-12-31'], ['Kantoorhoofd', '2021-01-01', null]] },
  // Het randgeval: onvolledig, want de geboortedatum ontbreekt.
  { mail: 'medewerker4@demo.example', naam: 'Coppens', voornaam: 'Eva', geboorte: null,
    functies: [['Administratief bediende', '2022-02-01', null]] },
];
// Vertrokken en zonder account: blijft in het register staan.
const vertrokken = {
  id: 'a1a1a1a1-0000-4000-8000-000000000001', naam: 'Dewinter', voornaam: 'Marc', geboorte: '1969-01-30',
  functies: [['Kredietadviseur', '2012-05-01', '2023-06-30']],
};

const q = s => (s === null ? 'null' : `'${s.replace(/'/g, "''")}'`);
sql('delete from reference.employee_functions');

const functies = (id, lijst) => lijst.forEach(([f, begin, einde]) => sql(
  `insert into reference.employee_functions (id, employee_id, function, start_date, end_date, created_at) values (gen_random_uuid(), '${id}', ${q(f)}, ${q(begin)}, ${q(einde)}, now())`));

const ids = {};
for (const p of personen) {
  const account = sql(`select id from control."AspNetUsers" where lower(email)='${p.mail}'`, 'creditsoft_control');
  if (!account) throw new Error(`Geen account ${p.mail}: is de demo gegenereerd?`);
  let id = sql(`select id from reference.employees where user_id='${account}'`);
  if (!id) {
    id = sql(`insert into reference.employees (id, user_id, created_at, show_in_pickers) values (gen_random_uuid(), '${account}', now(), true) returning id`).split('\n')[0];
  }
  sql(`update reference.employees set first_name=${q(p.voornaam)}, last_name=${q(p.naam)}, birth_date=${q(p.geboorte)} where id='${id}'`);
  functies(id, p.functies);
  ids[p.mail] = id;
}

sql(`insert into reference.employees (id, first_name, last_name, birth_date, created_at, show_in_pickers) values ('${vertrokken.id}', ${q(vertrokken.voornaam)}, ${q(vertrokken.naam)}, ${q(vertrokken.geboorte)}, now(), false) on conflict (id) do nothing`);
functies(vertrokken.id, vertrokken.functies);

console.log('register klaar:', sql('select count(*) from reference.employee_functions'), 'functieregels');
console.log('fiche met twee functies:', ids['medewerker3@demo.example']);
