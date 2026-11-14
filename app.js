// Mon Français – steg 1: ordlistan

// Namnet som orden sparas under i webbläsarens localStorage
const STORAGE_KEY = 'monFrancais.words';

// De 20 orden som läggs in första gången appen öppnas
const STARTER_WORDS = [
  { fr: 'bonjour', sv: 'hej' },
  { fr: 'merci', sv: 'tack' },
  { fr: 'au revoir', sv: 'hej då' },
  { fr: 'oui', sv: 'ja' },
  { fr: 'non', sv: 'nej' },
  { fr: "s'il vous plaît", sv: 'snälla' },
  { fr: 'le chat', sv: 'katten' },
  { fr: 'le chien', sv: 'hunden' },
  { fr: 'la maison', sv: 'huset' },
  { fr: "l'eau", sv: 'vattnet' },
  { fr: 'le pain', sv: 'brödet' },
  { fr: 'la pomme', sv: 'äpplet' },
  { fr: 'le café', sv: 'kaffet' },
  { fr: "l'ami", sv: 'vännen' },
  { fr: 'la famille', sv: 'familjen' },
  { fr: 'manger', sv: 'att äta' },
  { fr: 'boire', sv: 'att dricka' },
  { fr: 'parler', sv: 'att prata' },
  { fr: 'être', sv: 'att vara' },
  { fr: 'avoir', sv: 'att ha' },
];

// Hämta de delar av sidan vi behöver ändra
const form = document.getElementById('add-form');
const inputFr = document.getElementById('input-fr');
const inputSv = document.getElementById('input-sv');
const formError = document.getElementById('form-error');
const list = document.getElementById('word-list');
const count = document.getElementById('word-count');
const emptyMessage = document.getElementById('empty-message');

// Läs orden från localStorage.
// Finns inget sparat än (första gången) används startorden.
function loadWords() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === null) {
    return STARTER_WORDS.slice();
  }
  try {
    return JSON.parse(saved);
  } catch {
    // Om det sparade är trasigt börjar vi om med startorden
    return STARTER_WORDS.slice();
  }
}

// Spara orden i localStorage. Den kan bara spara text,
// så listan görs om till text med JSON.stringify.
function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

// Alla ord just nu. Varje ord är ett objekt: { fr: 'le chat', sv: 'katten' }
let words = loadWords();
saveWords();

// Rita om listan på sidan utifrån arrayen words
function render() {
  list.innerHTML = '';

  words.forEach((word, index) => {
    const li = document.createElement('li');

    const fr = document.createElement('span');
    fr.className = 'fr';
    fr.textContent = word.fr; // textContent (inte innerHTML) så att ingen kod kan smygas in

    const sv = document.createElement('span');
    sv.className = 'sv';
    sv.textContent = word.sv;

    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = '×';
    del.title = 'Ta bort';
    del.setAttribute('aria-label', 'Ta bort ' + word.fr);
    del.addEventListener('click', () => removeWord(index));

    li.append(fr, sv, del);
    list.append(li);
  });

  count.textContent = words.length + ' ord';
  emptyMessage.hidden = words.length > 0;
}

// Lägg till ett nytt ord när formuläret skickas
form.addEventListener('submit', (event) => {
  event.preventDefault(); // stoppa sidan från att laddas om

  const fr = inputFr.value.trim();
  const sv = inputSv.value.trim();

  if (fr === '' || sv === '') {
    formError.hidden = false;
    return;
  }

  formError.hidden = true;
  words.unshift({ fr, sv }); // nya ord hamnar överst
  saveWords();
  render();

  form.reset();
  inputFr.focus(); // redo för nästa ord direkt
});

// Ta bort ordet på plats nummer index
function removeWord(index) {
  words.splice(index, 1);
  saveWords();
  render();
}

// Menyn: visa vyn som hör till knappen och dölj de andra
document.querySelectorAll('.nav-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const view = button.dataset.view;

    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b === button));
    document.querySelectorAll('.panel').forEach((panel) => {
      panel.hidden = panel.id !== 'view-' + view;
    });
  });
});

render();
