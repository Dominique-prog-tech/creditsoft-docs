# Instellingen

De instellingen zijn de **schakelaars** van uw kantoor. Ze bepalen wat er vergrendeld wordt zodra een contract gerealiseerd is, wanneer CreditSoft u waarschuwt, en wie er een bericht krijgt bij een nieuwe lead.

## Het scherm openen

Klik in het menu links op **Beheer** en dan op **Instellingen**.

U ziet één regel per instelling, met drie kolommen: de **sleutel** (de naam waaronder CreditSoft de instelling terugvindt), de **waarde**, en **Wat het doet**.

## Wat het doet

Lees die derde kolom vóór u een waarde wijzigt. Ze zegt bij elke instelling waarvoor die dient — bijvoorbeeld dat *Blokkeert alle uitgaande mail van dit kantoor* aanstaat in een demo-omgeving, of hoeveel dagen vooruit het dashboard naar aflopende termijnen kijkt.

Bij een instelling die u zelf hebt toegevoegd staat er *Eigen instelling van dit kantoor*.

## Een waarde wijzigen

Klik op **Bewerken** achter de regel. De **sleutel** kunt u niet aanpassen, de **waarde** wel.

!!! warning "Waarom de sleutel vastligt"
    CreditSoft zoekt zijn instellingen op naam. Onder een hernoemde sleutel vindt de app haar instelling
    niet meer terug en valt ze zonder melding terug op haar standaardgedrag. Wilt u een regel uitzetten,
    zet dan de **waarde** op `false` — hernoem de sleutel niet.

## Een instelling toevoegen of verwijderen

**Nieuwe instelling** voegt een eigen sleutel toe.

Verwijderen kan alleen bij instellingen die u zelf hebt toegevoegd. De instellingen die CreditSoft zelf leest, kunt u wijzigen maar niet verwijderen: ze wissen zou de bijhorende regel terugzetten op haar standaardwaarde, en dat is zelden wat u bedoelt. Bij die instellingen ontbreekt de knop **Verwijderen** dan ook.

**Exporteren** geeft u de volledige lijst als Excel-bestand.
