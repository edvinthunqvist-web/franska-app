// Grunden som resten av appen bygger på:
// hjälpfunktioner, kursinnehåll, sparning, uppläsning och ikoner.

/* ---------- Små hjälpfunktioner ---------- */

// Gör text säker att stoppa in i HTML (så att ingen kod kan smygas in)
function esc(text) {
  return String(text ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Blanda en lista i slumpmässig ordning (returnerar en ny lista)
function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

// Dagens datum som text, t.ex. "2026-11-14"
function dayKey(date = new Date()) {
  const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return d.toISOString().slice(0, 10);
}

/* ---------- Jämföra svar ---------- */

// Gör om ett svar till en enkel form: små bokstäver, utan skiljetecken och parenteser
function normalize(text) {
  return String(text)
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[’`´]/g, "'")
    .replace(/[.!?¿¡,;:«»"…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Samma som normalize, men tar också bort accenter (é blir e)
function stripAccents(text) {
  return normalize(text).normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Alla godkända svar för ett facit. "hej / god dag" ger två svar, "att äta" godkänner även "äta".
function acceptedAnswers(expected) {
  const out = new Set();
  String(expected).split(' / ').forEach((alt) => {
    const n = normalize(alt);
    if (!n) return;
    out.add(n);
    if (n.startsWith('att ')) out.add(n.slice(4));
  });
  out.add(normalize(expected));
  return [...out];
}

// Kontrollera ett skrivet svar.
// ok = rätt, almost = rätt men med fel accent.
function checkAnswer(input, expected) {
  const given = normalize(input);
  if (!given) return { ok: false, almost: false };
  const answers = acceptedAnswers(expected);
  if (answers.includes(given)) return { ok: true, almost: false };
  const bare = stripAccents(input);
  if (answers.some((a) => stripAccents(a) === bare)) return { ok: true, almost: true };
  return { ok: false, almost: false };
}

/* ---------- Kursinnehåll ---------- */

// Delar upp "a=b|c=d" till [["a","b"],["c","d"]]
function parsePairs(text) {
  if (!text) return [];
  return text.split('|').map((part) => {
    const i = part.indexOf('=');
    if (i < 0) return [part.trim(), ''];
    return [part.slice(0, i).trim(), part.slice(i + 1).trim()];
  });
}

// Bygger upp en kurs med id:n och snabba uppslag
function buildCourse(raw) {
  const course = { ...raw, lessons: [], words: [], lessonById: {}, wordById: {} };

  course.units = raw.units.map((u, ui) => {
    const unit = { idx: ui, id: `${raw.id}-u${ui + 1}`, title: u.title, level: u.level, write: u.write || [], qa: u.qa || [] };

    unit.lessons = u.lessons.map((l, li) => {
      const id = `${unit.id}-l${li + 1}`;
      const lesson = {
        id, unitIdx: ui, idx: li, title: l.t, intro: l.i, tip: l.u,
        dialog: parsePairs(l.d).map(([line, sv]) => {
          const c = line.indexOf(': ');
          return { who: line.slice(0, c), t: line.slice(c + 2), sv };
        }),
        words: parsePairs(l.w).map(([t, sv], wi) => ({ id: `${id}-w${wi + 1}`, t, sv, lessonId: id, unitIdx: ui })),
        sentences: parsePairs(l.s).map(([t, sv]) => ({ t, sv })),
        grammar: l.g ? { h: l.g.h, p: l.g.p, table: parsePairs(l.g.t) } : null,
      };
      course.lessons.push(lesson);
      course.lessonById[id] = lesson;
      lesson.words.forEach((w) => { course.words.push(w); course.wordById[w.id] = w; });
      return lesson;
    });
    return unit;
  });

  course.sentences = course.lessons.flatMap((l) => l.sentences);
  return course;
}

const COURSE_DATA = {};
Object.values(window.COURSES).forEach((raw) => { COURSE_DATA[raw.id] = buildCourse(raw); });

/* ---------- Grammatik ---------- */

// Gör om en rubrik till en adress, t.ex. "Être och avoir" blir "etre-och-avoir"
function slugify(text) {
  return stripAccents(text).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const GRAMMAR_DATA = {};
Object.entries(window.GRAMMAR || {}).forEach(([id, topics]) => {
  GRAMMAR_DATA[id] = topics.map((g, idx) => ({
    ...g,
    idx,
    slug: slugify(g.title),
    sections: g.s.map((sec) => ({ h: sec.h, p: sec.p, table: parsePairs(sec.t) })),
    examples: parsePairs(g.ex).map(([t, sv]) => ({ t, sv })),
  }));
});

function grammarFor(course = activeCourse()) { return GRAMMAR_DATA[course.id] || []; }

// Kursvägen: lektioner och grammatikmoment i en och samma ordning.
// Varje moment har unit (enhet) och after (efter vilken lektion) i grammatikfilen.
Object.values(COURSE_DATA).forEach((course) => {
  const topics = GRAMMAR_DATA[course.id] || [];
  topics.forEach((g) => { g.unitIdx = (g.unit || 99) - 1; });
  course.steps = [];
  course.units.forEach((u) => {
    u.steps = [];
    u.grammar = topics.filter((g) => g.unitIdx === u.idx).sort((a, b) => a.after - b.after);
    const add = (step) => {
      Object.assign(step, { unitIdx: u.idx, idx: course.steps.length });
      course.steps.push(step);
      u.steps.push(step);
    };
    u.lessons.forEach((l, li) => {
      add({ kind: 'lesson', id: l.id, lesson: l });
      u.grammar.filter((g) => g.after === li + 1).forEach((g) => add({ kind: 'grammar', id: `g-${g.slug}`, topic: g }));
    });
    u.grammar.filter((g) => g.after > u.lessons.length).forEach((g) => add({ kind: 'grammar', id: `g-${g.slug}`, topic: g }));
  });
  course.stepById = Object.fromEntries(course.steps.map((st) => [st.id, st]));
});
function grammarStat(courseId, slug) { return (progress(courseId).grammar || {})[slug] || null; }

/* ---------- Sparning i localStorage ---------- */

const STORE_KEY = 'monFrancais.v2';

const GOALS = [
  { xp: 20, label: 'Lugnt', min: 5 },
  { xp: 40, label: 'Normalt', min: 10 },
  { xp: 60, label: 'Seriöst', min: 15 },
  { xp: 100, label: 'Intensivt', min: 25 },
];

const LEVELS = [
  { label: 'Jag är helt ny', sub: 'Börja från första lektionen', startUnit: 0 },
  { label: 'Jag kan några ord', sub: 'Hälsningar och siffror känns bekanta', startUnit: 2 },
  { label: 'Jag kan grunderna', sub: 'Jag kan presentera mig och prata om familjen', startUnit: 4 },
];

const REASONS = ['Resa', 'Skola', 'Jobb', 'Familj och vänner', 'För skojs skull', 'Träna hjärnan'];

function emptyState() {
  return { v: 2, active: null, courses: {}, xp: {}, settings: { tts: true, voices: {} } };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      s.settings = s.settings || { tts: true };
      s.settings.voices = s.settings.voices || {};
      s.xp = s.xp || {};
      s.courses = s.courses || {};
      return s;
    }
  } catch (e) { /* trasig data: börja om */ }
  return emptyState();
}

let state = loadState();

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* t.ex. privat läge */ }
}

// Kursens sparade framsteg (skapas om den saknas)
function progress(courseId = state.active) {
  if (!state.courses[courseId]) {
    state.courses[courseId] = { plan: null, lessons: {}, words: {}, custom: [], texts: [] };
  }
  return state.courses[courseId];
}

function activeCourse() { return state.active ? COURSE_DATA[state.active] : null; }

// Alla ord i kursen, inklusive egna ord
function allWords(course = activeCourse()) {
  const p = progress(course.id);
  return course.words.concat(p.custom.map((c) => ({ ...c, lessonId: null, unitIdx: -1, custom: true })));
}

function findWord(course, id) {
  return course.wordById[id] || progress(course.id).custom.map((c) => ({ ...c, unitIdx: -1, custom: true })).find((c) => c.id === id);
}

/* ---------- XP, mål och dagar i rad ---------- */

function addXp(amount) {
  const k = dayKey();
  state.xp[k] = (state.xp[k] || 0) + amount;
  save();
}

function xpToday() { return state.xp[dayKey()] || 0; }
function xpTotal() { return Object.values(state.xp).reduce((a, b) => a + b, 0); }

function dailyGoal() {
  const p = state.active && state.courses[state.active];
  return (p && p.plan && p.plan.goal) || 40;
}

// Antal dagar i rad med minst lite XP. Idag räknas om du redan har övat.
function streak() {
  let n = 0;
  const d = new Date();
  if (!state.xp[dayKey(d)]) d.setDate(d.getDate() - 1);
  while (state.xp[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------- Ordens styrka (enkel spaced repetition) ---------- */

// Hur många dagar det dröjer innan ett ord ska repeteras, beroende på styrka 0–5
const INTERVALS = [0, 1, 2, 4, 7, 14];

function wordStat(courseId, wordId) {
  return progress(courseId).words[wordId] || { s: 0, r: 0, w: 0, due: null };
}

function recordAnswer(courseId, wordId, correct) {
  if (!wordId) return;
  const p = progress(courseId);
  const st = p.words[wordId] || { s: 0, r: 0, w: 0, due: null };
  if (correct) { st.r++; st.s = Math.min(5, st.s + 1); }
  else { st.w++; st.s = Math.max(0, st.s - 2); }
  const due = new Date();
  due.setDate(due.getDate() + INTERVALS[st.s]);
  st.due = dayKey(due);
  p.words[wordId] = st;
}

function isLearned(courseId, wordId) { return wordStat(courseId, wordId).s >= 3; }

// Ord du har sett men som är svaga eller ska repeteras idag
function weakWords(course = activeCourse()) {
  const p = progress(course.id);
  const today = dayKey();
  return allWords(course).filter((w) => {
    const st = p.words[w.id];
    return st && ((st.w > 0 && st.s < 3) || (st.due && st.due <= today));
  });
}

/* ---------- Lektioner och plan ---------- */

function lessonDone(courseId, lessonId) { return !!progress(courseId).lessons[lessonId]?.done; }

// Ett steg på kursvägen är en lektion eller ett grammatikmoment
function stepDone(course, step) {
  return step.kind === 'lesson' ? lessonDone(course.id, step.id) : !!grammarStat(course.id, step.topic.slug)?.done;
}

// Ett steg är öppet om det ligger i en enhet du hoppade till, eller om steget före är klart
function stepUnlocked(course, step) {
  const p = progress(course.id);
  const start = p.plan ? p.plan.startUnit : 0;
  if (step.unitIdx <= start || stepDone(course, step)) return true;
  return step.idx === 0 || stepDone(course, course.steps[step.idx - 1]);
}

function lessonUnlocked(course, lesson) { return stepUnlocked(course, course.stepById[lesson.id]); }

// Nästa steg att göra: det första öppna som inte är klart
function nextStep(course = activeCourse()) {
  const p = progress(course.id);
  const start = p.plan ? p.plan.startUnit : 0;
  const open = (st) => !stepDone(course, st) && stepUnlocked(course, st);
  return course.steps.find((st) => st.unitIdx >= start && open(st)) || course.steps.find(open) || null;
}

function stepHref(step) {
  return step.kind === 'lesson' ? `#/lektion/${step.id}` : `#/grammatik/${step.topic.slug}`;
}

function unitProgress(course, unit) {
  const done = unit.steps.filter((st) => stepDone(course, st)).length;
  return { done, total: unit.steps.length };
}

function courseProgress(course) {
  const done = course.steps.filter((st) => stepDone(course, st)).length;
  const lessons = course.lessons.filter((l) => lessonDone(course.id, l.id)).length;
  return { done, total: course.steps.length, lessons };
}

/* ---------- Gamla ord från version 1 ---------- */

// Flytta in egna ord från steg 1 (om de finns) som egna ord i franskkursen
function migrateV1() {
  try {
    const raw = localStorage.getItem('monFrancais.words');
    if (!raw || localStorage.getItem('monFrancais.migrated')) return;
    const old = JSON.parse(raw);
    const known = new Set(COURSE_DATA.fr.words.map((w) => normalize(w.t)));
    const p = progress('fr');
    old.forEach((w) => {
      if (w && w.fr && !known.has(normalize(w.fr))) p.custom.push({ id: 'fr-c' + Date.now() + Math.random().toString(36).slice(2, 6), t: w.fr, sv: w.sv });
    });
    if (!state.courses.fr.plan && p.custom.length === 0) delete state.courses.fr;
    localStorage.setItem('monFrancais.migrated', '1');
    save();
  } catch (e) { /* inget att flytta */ }
}

/* ---------- Uppläsning ---------- */

// Webbläsaren har inbyggda röster. Vi letar upp en röst för rätt språk,
// annars läser datorn franska och spanska med engelsk röst.

let voices = [];
let voicesReady = false;
const voiceWaiters = [];
let warnedNoVoice = {};

function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  voices = window.speechSynthesis.getVoices();
  if (voices.length) {
    voicesReady = true;
    voiceWaiters.splice(0).forEach((fn) => fn());
  }
}

if ('speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
  // Vissa webbläsare laddar rösterna sent, så vi frågar igen en stund
  let tries = 0;
  const timer = setInterval(() => { loadVoices(); if (voicesReady || ++tries > 20) clearInterval(timer); }, 250);
}

function voiceLang(v) { return (v.lang || '').replace('_', '-').toLowerCase(); }

// Alla röster som pratar ett visst språk, t.ex. 'fr-FR'
function voicesFor(lang) {
  const base = lang.slice(0, 2).toLowerCase();
  return voices.filter((v) => voiceLang(v).startsWith(base));
}

// Kända bra röster på Mac, Windows, Chrome och Android
const GOOD_VOICES = {
  fr: ['amélie', 'amelie', 'thomas', 'audrey', 'aurélie', 'marie', 'google français', 'denise', 'henri', 'julie', 'paul'],
  es: ['mónica', 'monica', 'jorge', 'marisol', 'google español', 'paulina', 'elvira', 'alvaro', 'helena', 'pablo', 'laura'],
};

function bestVoice(lang) {
  const list = voicesFor(lang);
  if (!list.length) return null;
  const chosen = state.settings.voices && state.settings.voices[lang];
  const saved = chosen && list.find((v) => v.voiceURI === chosen);
  if (saved) return saved;
  const base = lang.slice(0, 2).toLowerCase();
  const score = (v) => {
    const name = v.name.toLowerCase();
    let s = 0;
    if (voiceLang(v) === lang.toLowerCase()) s += 4;        // fr-FR före fr-CA, es-ES före es-MX
    if ((GOOD_VOICES[base] || []).some((n) => name.includes(n))) s += 3;
    if (/premium|enhanced|förbättrad|natural|neural|siri/.test(name)) s += 3;
    if (/google/.test(name)) s += 2;
    if (/eloquence|bad news|bells|boing|bubbles|cellos|jester|organ|trinoids|whisper|zarvox|grandma|grandpa|rocko|shelley|flo|eddy|reed|sandy/.test(name)) s -= 6;
    return s;
  };
  return list.slice().sort((a, b) => score(b) - score(a))[0];
}

function speak(text, lang) {
  if (!state.settings.tts || !('speechSynthesis' in window) || !text) return;
  lang = lang || (activeCourse() && activeCourse().tts) || 'fr-FR';
  if (!voicesReady) {
    // Vänta på rösterna (högst en sekund) innan vi läser upp
    let done = false;
    voiceWaiters.push(() => { if (!done) { done = true; speak(text, lang); } });
    setTimeout(() => { if (!done) { done = true; reallySpeak(text, lang); } }, 1000);
    return;
  }
  reallySpeak(text, lang);
}

function reallySpeak(text, lang) {
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.88;
    const voice = bestVoice(lang);
    if (voice) u.voice = voice;
    else warnNoVoice(lang);
    // Liten paus efter cancel, annars tappar Chrome ibland uppläsningen
    setTimeout(() => synth.speak(u), 60);
  } catch (e) { /* uppläsning stöds inte */ }
}

function warnNoVoice(lang) {
  if (warnedNoVoice[lang] || !voicesReady) return;
  warnedNoVoice[lang] = true;
  const name = lang.startsWith('fr') ? 'fransk' : 'spansk';
  toast(`Din enhet har ingen ${name} röst, så uttalet blir fel. Se Profil för hur du lägger till en.`);
}

/* ---------- Taligenkänning (tala in) ---------- */

// Chrome, Edge och Safari kan lyssna på mikrofonen och skriva ut vad du säger.
// Firefox kan inte det än. Chrome skickar ljudet till Google för att tolka det.

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition || null;
let recognizer = null;

function canListen() { return !!SpeechRec && state.settings.mic !== false; }

// Lyssna en gång. onDone(alternativ) får en lista med vad webbläsaren tror att du sa.
function listen(lang, { onInterim, onDone, onError }) {
  stopListening();
  try {
    const r = new SpeechRec();
    r.lang = lang;
    r.interimResults = true;
    r.maxAlternatives = 4;
    r.continuous = false;
    let finals = null;
    r.onresult = (e) => {
      const res = e.results[e.results.length - 1];
      if (res.isFinal) finals = Array.from(res).map((a) => a.transcript);
      else if (onInterim) onInterim(res[0].transcript);
    };
    r.onerror = (e) => { finals = null; recognizer = null; onError && onError(e.error); r.onend = null; };
    r.onend = () => { recognizer = null; onDone && onDone(finals || []); };
    r.start();
    recognizer = r;
  } catch (e) {
    onError && onError('start');
  }
}

function stopListening() {
  if (recognizer) { try { recognizer.stop(); } catch (e) { /* redan stoppad */ } }
}

// Avstånd mellan två ord: hur många bokstäver som måste ändras
function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

function speechWords(text) {
  return stripAccents(text).replace(/'/g, ' ').replace(/-/g, ' ').split(' ').filter(Boolean);
}

// Jämför det du sa med meningen. Ger vilka ord som hördes och en andel 0–1.
function compareSpeech(target, heard) {
  const want = speechWords(target);
  const got = speechWords(heard);
  const same = (a, b) => a === b || (a.length > 3 && editDistance(a, b) <= 1);
  // Längsta gemensamma följd av ord
  const dp = Array.from({ length: want.length + 1 }, () => new Array(got.length + 1).fill(0));
  for (let i = want.length - 1; i >= 0; i--) {
    for (let j = got.length - 1; j >= 0; j--) {
      dp[i][j] = same(want[i], got[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const hit = new Array(want.length).fill(false);
  let i = 0; let j = 0;
  while (i < want.length && j < got.length) {
    if (same(want[i], got[j])) { hit[i] = true; i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const n = hit.filter(Boolean).length;
  const extra = Math.max(0, got.length - n);
  const score = want.length ? Math.max(0, (n - extra * 0.25) / want.length) : 0;
  return { score: Math.min(1, score), hit, words: want };
}

// Bästa tolkningen bland webbläsarens förslag
function bestHeard(target, alternatives) {
  let best = { score: -1, text: '' };
  alternatives.forEach((text) => {
    const r = compareSpeech(target, text);
    if (r.score > best.score) best = { ...r, text };
  });
  return best;
}

/* ---------- Små meddelanden ---------- */

function toast(text) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = text;
  document.body.append(el);
  setTimeout(() => el.classList.add('out'), 5200);
  setTimeout(() => el.remove(), 5600);
}

/* ---------- Streckikoner ---------- */

const ICON_PATHS = {
  book: '<path d="M3 5.5C5.5 4.5 8.5 4.5 12 6.5v13c-3.5-2-6.5-2-9-1z"/><path d="M21 5.5c-2.5-1-5.5-1-9 1v13c3.5-2 6.5-2 9-1z"/>',
  pencil: '<path d="M15.5 4.5l4 4L8 20H4v-4z"/><path d="M13.5 6.5l4 4"/>',
  cards: '<rect x="3" y="7" width="13" height="13" rx="1.5"/><path d="M8 4h11.5A1.5 1.5 0 0 1 21 5.5V17"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/>',
  feather: '<path d="M20 4c-7 0-12 5-13 13l-3 3"/><path d="M7 17c6-1 10-5 11-11"/><path d="M10 14h5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7"/>',
  flame: '<path d="M12 21c-4 0-6.5-2.6-6.5-6 0-3.5 3-5.5 3.5-9 2.5 1.5 4 4 4 6 1-.8 1.6-2 1.8-3.2 2 1.6 3.7 3.8 3.7 6.2 0 3.4-2.5 6-6.5 6z"/>',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  speaker: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  bolt: '<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  repeat: '<path d="M4 11V9a3 3 0 0 1 3-3h12M16 3l3 3-3 3"/><path d="M20 13v2a3 3 0 0 1-3 3H5M8 21l-3-3 3-3"/>',
  ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.5"/><path d="M10 9a2 2 0 0 1 4 0"/>',
  link: '<path d="M8 12h8"/><rect x="2.5" y="8" width="8" height="8" rx="4"/><rect x="13.5" y="8" width="8" height="8" rx="4"/>',
  grammar: '<path d="M5 19L10 5h1l5 14M7 14h7"/><path d="M18 8v8"/>',
  stamp: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 4v-1M12 4v-1M16 4v-1M8 21v-1M12 21v-1M16 21v-1M4 8h-1M4 12h-1M4 16h-1M21 8h-1M21 12h-1M21 16h-1"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
  game: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle cx="15.5" cy="11.5" r=".6"/><circle cx="17.5" cy="13.5" r=".6"/>',
  heart: '<path d="M12 20s-7.5-4.5-7.5-10A4.2 4.2 0 0 1 12 7.5 4.2 4.2 0 0 1 19.5 10c0 5.5-7.5 10-7.5 10z"/>',
  pause: '<path d="M9 5v14M15 5v14"/>',
  play: '<path d="M7 4.5l12 7.5-12 7.5z"/>',
  drop: '<path d="M12 3.5c3 4 6 7.2 6 10.5a6 6 0 0 1-12 0c0-3.3 3-6.5 6-10.5z"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
};

function icon(name, cls = '') {
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
}
