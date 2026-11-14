# Mon Français

En språkapp för att lära sig franska och spanska, byggd med bara HTML, CSS och JavaScript (inget ramverk). Allt sparas i webbläsarens localStorage, så ingen inloggning behövs.

## Så öppnar du appen

Dubbelklicka på `index.html` så öppnas appen i webbläsaren. Inget behöver installeras.

## Vad appen kan

- **Kurser:** välj franska eller spanska och lägg till fler när du vill. Varje kurs sparas för sig.
- **Egen plan:** några frågor i början (nivå, varför, dagligt mål) avgör var du börjar och hur mycket du övar.
- **Kursväg:** 12 enheter per språk från nybörjare till A2, med 36 lektioner och drygt 330 ord.
- **Lektioner:** dialog, nya ord, grammatik, exempelmeningar och uttalstips, med uppläsning.
- **Grammatik:** 30 moment i franska och 23 i spanska, ordnade efter gymnasiets steg 1–5. Varje moment har förklaring, böjningstabeller, exempel med uppläsning, vanliga misstag och en övning där du fyller i luckor.
- **Tala in:** uttalsövningar där du säger en mening högt och ser vilka ord som hördes rätt. Ingår i lektionerna och som eget läge under Öva. Fungerar i Chrome, Edge och Safari (inte Firefox).
- **Spelet Ordregn:** svenska ord regnar ner och du översätter dem innan de landar. Skriv eller välj bland fyra, nivåer som går fortare och rekord per kurs.
- **Övningar:** flerval, lyssna, skriva, para ihop, bygga meningar och fylla i luckor. Fel svar kommer tillbaka i slutet.
- **Öva:** välj enheter (eller bara svaga ord), svårighet och riktning. Flashcards, flerval, para ihop, skriv eller blandat.
- **Ordlista:** alla ord med sökning, filter, styrka per ord och egna ord.
- **Skriv:** korta skrivuppgifter och frågor att svara på.
- **Profil:** XP, dagar i rad, veckodiagram, dagligt mål och inställningar.

## Hur koden är uppdelad

| Fil | Vad den gör |
|-----|-------------|
| `index.html` | Laddar typsnitt, stilar och skript |
| `style.css` | Hela utseendet (vykortsstilen). Färgerna står överst |
| `js/data/fr.js`, `js/data/es.js` | Kursinnehållet: enheter, lektioner, ord, meningar, grammatik |
| `js/data/grammar-fr.js`, `js/data/grammar-es.js` | Grammatikmomenten steg 1–5 med övningar |
| `js/core.js` | Hjälpfunktioner, sparning, XP, ordens styrka, uppläsning och ikoner |
| `js/exercises.js` | Skapar och visar övningarna (även grammatik och tala in) |
| `js/game.js` | Spelet Ordregn |
| `js/views.js` | Alla sidor (kursval, kursväg, lektion, grammatik, öva, spel, ordlista, skriv, profil) |
| `js/main.js` | Väljer sida utifrån adressen och tar hand om klick |

## Övrigt

- `designforslag/` – de 20 stilförslagen. Appen använder nummer 18, Vykort.
- `lektioner/` – utförligt lektionsmaterial för franska A1 (fem lektioner som JSON), som underlag för framtida innehåll.

## När du ändrar CSS eller JavaScript

Webbläsare och GitHub Pages sparar gamla versioner av filerna en stund. Öka därför siffran i `?v=4` på alla rader i `index.html` (till `?v=5` osv) när du ändrar `style.css` eller något i `js/`. Då hämtar alla webbläsare de nya filerna direkt.
