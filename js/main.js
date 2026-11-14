// Startar appen: väljer sida utifrån adressen (#/...) och tar hand om klick.

const root = document.getElementById('app');

// Vilken sida som ska visas. Adressen ser ut som #/lektion/fr-u1-l1
function route() {
  closeModal();
  stopListening();
  const [path, queryString] = location.hash.slice(1).split('?');
  const parts = (path || '/').split('/').filter(Boolean);
  const query = new URLSearchParams(queryString || '');
  const hasCourse = state.active && state.courses[state.active]?.plan;
  const view = parts[0] || '';

  // Ingen kurs än: visa kursvalet först
  if (!hasCourse && !['kurser', 'start'].includes(view)) { location.replace('#/kurser'); return; }

  if (view !== 'spel' || !game?.active) stopGame();
  document.body.className = '';
  let html = '';
  switch (view) {
    case 'kurser': html = coursePickerView(); document.body.className = 'bare'; break;
    case 'start': html = onboardingView(parts[1]); document.body.className = 'bare focus'; break;
    case 'lektion': html = lessonView(parts[1]); break;
    case 'session':
      if (!session) { location.replace('#/kurs'); return; }
      document.body.className = 'bare focus';
      root.innerHTML = sessionHtml();
      renderSession();
      return;
    case 'klart': html = resultView(); document.body.className = 'bare focus'; break;
    case 'ova': html = practiceView(query); break;
    case 'grammatik': html = parts[1] ? grammarTopicView(parts[1]) : grammarListView(); break;
    case 'spel':
      if (game?.active) { document.body.className = 'bare focus game-on'; return; }
      html = gameStartView(); break;
    case 'ordlista': html = dictionaryView(); break;
    case 'skriv': html = writeView(parts[1]); break;
    case 'profil': html = profileView(); break;
    case 'kurs': case '': html = pathView(); break;
    default: html = notFound();
  }
  root.innerHTML = html;
  window.scrollTo(0, 0);
  const course = activeCourse();
  document.title = course ? `Mon ${course.id === 'es' ? 'Español' : 'Français'}` : 'Mon Français';
}

// Rita om samma sida utan att hoppa upp till toppen
function rerender() {
  const y = window.scrollY;
  const focusId = document.activeElement?.id;
  route();
  window.scrollTo(0, y);
  if (focusId) document.getElementById(focusId)?.focus();
}

/* ---------- Klick ---------- */

document.addEventListener('click', (e) => {
  if (location.hash.startsWith('#/session')) { onSessionClick(e); return; }
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  const c = activeCourse();

  switch (act) {
    case 'say': case 'speak': speak(el.dataset.text, c ? c.tts : undefined); break;

    // Kursval
    case 'add': location.hash = `#/start/${el.dataset.id}`; break;
    case 'switch': state.active = el.dataset.id; save(); location.hash = '#/kurs'; break;

    // Introduktion
    case 'ob-level': onboard.level = Number(el.dataset.i); rerender(); break;
    case 'ob-reason': {
      const r = el.dataset.r;
      onboard.reasons = onboard.reasons.includes(r) ? onboard.reasons.filter((x) => x !== r) : onboard.reasons.concat(r);
      rerender(); break;
    }
    case 'ob-goal': onboard.goal = Number(el.dataset.i); rerender(); break;
    case 'ob-next': if (onboard.step === 3) finishOnboarding(); else { onboard.step++; rerender(); } break;
    case 'ob-back': if (onboard.step === 0) { onboard = null; location.hash = '#/kurser'; } else { onboard.step--; rerender(); } break;

    // Lektion
    case 'start-lesson': {
      const lesson = c.lessonById[el.dataset.id];
      startSession({ course: c, kind: 'lesson', lessonId: lesson.id, title: lesson.title, items: lessonSession(c, lesson) });
      location.hash = '#/session';
      break;
    }
    case 'again': startPractice(); break;

    // Grammatik
    case 'start-grammar': {
      const topic = grammarFor(c).find((g) => g.slug === el.dataset.slug);
      startSession({ course: c, kind: 'grammar', topicSlug: topic.slug, title: topic.title, items: grammarSession(topic) });
      location.hash = '#/session';
      break;
    }

    // Spel
    case 'game-mode': gameOpts.mode = el.dataset.v; rerender(); break;
    case 'game-src': gameOpts.source = el.dataset.v; rerender(); break;
    case 'game-start': case 'game-again': startGame(); break;
    case 'game-pause': togglePause(); break;
    case 'game-resume': togglePause(false); break;
    case 'game-end': gameOver(); break;
    case 'game-quit':
      if (game && !game.over) gameOver();
      else { stopGame(); route(); }
      break;
    case 'game-pick': gamePick(el.dataset.v, el); break;
    case 'game-accent': insertAtCursor(document.getElementById('g-input'), el.dataset.char); break;

    // Öva
    case 'pr-weak': practice.weakOnly = el.dataset.v === '1'; rerender(); break;
    case 'pr-unit': {
      const i = Number(el.dataset.i);
      practice.units = practice.units.includes(i) ? practice.units.filter((x) => x !== i) : practice.units.concat(i);
      rerender(); break;
    }
    case 'pr-custom': practice.custom = !practice.custom; rerender(); break;
    case 'pr-all': practice.units = c.units.map((u) => u.idx); practice.custom = progress().custom.length > 0; rerender(); break;
    case 'pr-none': practice.units = []; practice.custom = false; rerender(); break;
    case 'pr-mode': practice.mode = el.dataset.v; rerender(); break;
    case 'pr-dir': practice.dir = el.dataset.v; rerender(); break;
    case 'pr-count': practice.count = Number(el.dataset.v); rerender(); break;
    case 'pr-start': startPractice(); break;

    // Ordlista
    case 'dict-add': dict.adding = !dict.adding; rerender(); if (dict.adding) document.getElementById('add-t')?.focus(); break;
    case 'dict-del': {
      const p = progress();
      p.custom = p.custom.filter((w) => w.id !== el.dataset.id);
      delete p.words[el.dataset.id];
      save(); rerender(); break;
    }

    // Skriv
    case 'w-tab': writeState.tab = el.dataset.v; rerender(); break;
    case 'w-accent': {
      const ta = el.closest('.task').querySelector('textarea, input');
      insertAtCursor(ta, el.dataset.char);
      break;
    }
    case 'w-check': {
      const u = c.units[writeState.unit];
      const task = u.write[Number(el.dataset.i)];
      const text = writeState.typed[el.dataset.key] || '';
      const used = task.kw.filter((k) => stripAccents(text).includes(stripAccents(k))).length;
      const first = !writeState.checked[el.dataset.key];
      writeState.checked[el.dataset.key] = { used };
      progress().texts.push({ unit: u.idx, q: task.q, text, date: dayKey() });
      if (first) addXp(5);
      save(); rerender(); break;
    }
    case 'q-check': {
      const u = c.units[writeState.unit];
      const task = u.qa[Number(el.dataset.i)];
      const text = writeState.typed[el.dataset.key] || '';
      const ok = task.kw.some((k) => stripAccents(text).includes(stripAccents(k)));
      const first = !writeState.checked[el.dataset.key];
      writeState.checked[el.dataset.key] = { ok };
      if (ok && first) addXp(2);
      save(); rerender(); break;
    }

    // Profil
    case 'set-goal': progress().plan.goal = Number(el.dataset.v); save(); rerender(); break;
    case 'toggle-tts': state.settings.tts = !state.settings.tts; save(); rerender(); break;
    case 'toggle-mic': state.settings.mic = state.settings.mic === false; save(); rerender(); break;
    case 'test-voice': speak(c.id === 'fr' ? 'Bonjour ! Je m\'appelle Léa. Ça va ?' : '¡Hola! Me llamo Lucía. ¿Qué tal?', c.tts); break;
    case 'reset-course':
      showModal({
        title: `Börja om ${c.name.toLowerCase()}?`,
        text: 'Alla lektioner, ordstyrkor och egna texter i kursen raderas. XP och dagar i rad finns kvar. Det går inte att ångra.',
        ok: 'Börja om', cancel: 'Avbryt', danger: true,
        onOk: () => {
          delete state.courses[c.id];
          const other = Object.keys(state.courses).find((id) => state.courses[id].plan);
          state.active = other || null;
          save();
          location.hash = other ? '#/kurs' : '#/kurser';
        },
      });
      break;
  }
});

function insertAtCursor(field, text) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? start;
  field.value = field.value.slice(0, start) + text + field.value.slice(end);
  field.setSelectionRange(start + text.length, start + text.length);
  field.focus();
  field.dispatchEvent(new Event('input', { bubbles: true }));
}

/* ---------- Skrivfält och formulär ---------- */

document.addEventListener('input', (e) => {
  if (location.hash.startsWith('#/session')) { onSessionInput(e); return; }
  const t = e.target;
  if (t.id === 'g-input') { gameTyped(t); return; }
  if (t.id === 'dict-q') {
    dict.q = t.value;
    // Uppdatera bara listan så att sökfältet behåller fokus
    const c = activeCourse();
    const q = stripAccents(dict.q);
    const shown = allWords(c).filter((w) => {
      if (dict.unit === 'custom' && !w.custom) return false;
      if (dict.unit === 'learned' && !isLearned(c.id, w.id)) return false;
      if (/^\d+$/.test(dict.unit) && w.unitIdx !== Number(dict.unit)) return false;
      return !q || stripAccents(w.t).includes(q) || stripAccents(w.sv).includes(q);
    });
    document.getElementById('dict-list').innerHTML = dictRows(c, shown);
    const empty = document.querySelector('.dict .empty');
    if (empty) empty.hidden = shown.length > 0;
  }
  if (t.dataset.key) {
    writeState.typed[t.dataset.key] = t.value;
    const task = t.closest('.task');
    const btn = task.querySelector('[data-act="w-check"], [data-act="q-check"]');
    if (btn) btn.disabled = !t.value.trim();
    // Markera nyckelord som används
    task.querySelectorAll('.kw .tag').forEach((tag) => tag.classList.toggle('on', stripAccents(t.value).includes(stripAccents(tag.textContent))));
    const count = task.querySelector('.task-foot .muted');
    if (count) { const n = t.value.trim() ? t.value.trim().split(/\s+/).length : 0; count.textContent = `${n} ord`; }
  }
});

document.addEventListener('change', (e) => {
  if (e.target.id === 'dict-unit') { dict.unit = e.target.value; rerender(); }
  if (e.target.id === 'w-unit') { writeState.unit = Number(e.target.value); rerender(); }
  if (e.target.id === 'voice-select') {
    state.settings.voices[e.target.dataset.lang] = e.target.value;
    save();
    speak(activeCourse().id === 'fr' ? 'Bonjour, ça va ?' : 'Hola, ¿qué tal?', e.target.dataset.lang);
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.id !== 'add-form') return;
  e.preventDefault();
  const t = document.getElementById('add-t').value.trim();
  const sv = document.getElementById('add-sv').value.trim();
  if (!t || !sv) { document.getElementById('add-error').hidden = false; return; }
  const c = activeCourse();
  progress().custom.unshift({ id: `${c.id}-c${Date.now()}`, t, sv });
  save();
  dict.unit = 'custom';
  dict.q = '';
  rerender();
  document.getElementById('add-t')?.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.querySelector('.modal')) { closeModal(); return; }
  if (game?.active) {
    if (e.key === 'Escape') togglePause();
    if (e.key === 'Enter' && e.target.id === 'g-input') { e.preventDefault(); gameEnter(e.target); }
    return;
  }
  onSessionKey(e);
  // Enter i svarsfälten under Skriv skickar svaret
  if (e.key === 'Enter' && e.target.matches?.('.qa input[data-key]')) {
    e.preventDefault();
    e.target.closest('.task').querySelector('[data-act="q-check"]:not([disabled])')?.click();
  }
});

// När rösterna har laddats ritas profilsidan om så att röstlistan syns
if ('speechSynthesis' in window) window.speechSynthesis.addEventListener?.('voiceschanged', () => { if (location.hash.startsWith('#/profil')) rerender(); });

// Kom ihåg vilken lucka du skrev i senast, så att accentknapparna hamnar rätt
document.addEventListener('focusin', (e) => {
  if (session && e.target.dataset?.gap !== undefined) session.ui.lastGap = Number(e.target.dataset.gap);
});

window.addEventListener('hashchange', route);
migrateV1();
route();
