# Lektionsmaterial: franska A1

Fem lektioner på nivå A1 (nybörjare) med förklaringar på svenska. Allt innehåll är originalskrivet, inget är kopierat från läroböcker.

| # | Titel | Tema | Grammatik | Uttal |
|---|-------|------|-----------|-------|
| 1 | Bonjour ! | Hälsa och presentera sig | tu eller vous, je m'appelle | Stumma slutkonsonanter |
| 2 | Tu es d'où ? | Nationalitet och ursprung | être, adjektiv man/kvinna | Hörbar skillnad français/française |
| 3 | Tu as quel âge ? | Siffror 0–20, ålder, lånekort | avoir, ålder med avoir, ne ... pas | Franskt r |
| 4 | Ma famille | Familj och husdjur | le/la/les, un/une/des, plural, mon/ma/mes | le eller les, liaison |
| 5 | Au café | Beställa på kafé | -er-verb, je voudrais, j'aime le ... | Nasalvokaler |

## Hur riktiga franskkurser är upplagda (och varför materialet ser ut så här)

Nästan alla moderna franskläromedel för vuxna (som de som används på Alliance Française och i kurser som följer den europeiska referensramen CEFR) bygger på samma idé: man lär sig språket för att *göra något* med det, till exempel hälsa, beställa eller presentera sin familj. Varje enhet har därför ett vardagstema och några "jag kan"-mål, och grammatiken kommer in där den behövs för att klara uppgiften. Svenska skolläromedel följer samma mönster: en text eller dialog först, sedan ordlista, grammatik och övningar.

En typisk lektion går i den här ordningen, och det är den ordning appen bör visa:

1. **Mål** (`mal`): vad du ska kunna efteråt.
2. **Dialog** (`dialog`): en kort vardagsscen. Du läser (och senare lyssnar) först, utan att kunna allt.
3. **Förståelse** (`forstaelse`): några frågor som kollar att du hängde med.
4. **Ordförråd** (`ordforrad`): orden från dialogen och lite till. Substantiv har alltid genus.
5. **Grammatik** (`grammatik`): en till tre korta förklaringar med tabell, exempel och en varning för vanliga svenska misstag.
6. **Uttal** (`uttal`): ett ljud per lektion.
7. **Övningar** (`ovningar`): från lätta (para ihop) till svårare (översätt, skriv fritt).
8. **Kultur** (`kultur`): en kort text om hur det fungerar i Frankrike eller den fransktalande världen.
9. **Kan du?** (`kan_du`): självbedömning i slutet.

Jag valde den här strukturen för att den ger mer än bara ordförhör: du ser orden i ett sammanhang, förstår varför meningen ser ut som den gör och får producera egen franska. Lektionerna bygger på varandra, så ord och grammatik från lektion 1 kommer tillbaka i de senare.

## Filformat (för appen)

- `index.json` listar alla lektioner i ordning. Appen läser den först.
- `lektion-01.json` till `lektion-05.json` innehåller själva lektionerna.

Alla fältnamn är på svenska utan å, ä och ö, så de är lätta att skriva i JavaScript (`lektion.ordforrad`, inte `lektion.ordförråd`).

### Övningstyper

| `typ` | Vad den gör | Hur appen rättar |
|-------|-------------|------------------|
| `flerval` | Välj ett av flera alternativ | `svar` är index (0 = första alternativet) |
| `para_ihop` | Para ihop två listor | Varje par i `par` hör ihop. Appen blandar högra kolumnen. |
| `lucktext` | Fyll i ordet som saknas på `___` | Svaret ska matcha något i listan `svar` |
| `ordning` | Sätt orden i rätt ordning | `ord` står i rätt ordning. Appen blandar dem. |
| `oversatt` | Översätt från svenska | Svaret ska matcha något i listan `svar` |
| `omvandla` | Gör om en mening (t.ex. till nekande eller plural) | Svaret ska matcha något i listan `svar` |
| `skriv_fritt` | Skriv fritt | Rättas inte automatiskt. Visa `exempelsvar` efteråt. |

### Tips när appen rättar fritext

När du jämför det du skriver med facit bör appen vara lite snäll:

- Strunta i stora och små bokstäver.
- Strunta i mellanslag före `?` och `!` (fransmän skriver ett mellanslag där, svenskar brukar inte).
- Behandla `’` och `'` som samma tecken.
- Om svaret bara är fel på en accent (till exempel `etes` i stället för `êtes`), säg "nästan rätt" i stället för fel.

### Uttal

Det finns inga ljudfiler. Webbläsaren har en inbyggd talsyntes (`speechSynthesis` med språk `fr-FR`) som kan läsa upp dialogerna och orden gratis. Det är ett bra nästa steg när lektionsvisningen fungerar.

## Förslag på nästa steg

Bygg en enkel sida som läser `index.json`, visar en lista med lektioner och öppnar en lektion med dialog, ordlista och grammatik. Övningarna kan komma i steget efter. Att bygga alla sju övningstyper på en gång är för mycket i ett steg.
