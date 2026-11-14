// Startar appen: väljer sida utifrån adressen (#/...) och tar hand om klick.

const root = document.getElementById('app');

// Vilken sida som ska visas. Adressen ser ut som #/lektion/fr-u1-l1
function route() {
  closeModal();
  const [path, queryString] = location.hash.slice(1).split('?');
  const parts = (path || '/').split('/').filter(Boolean);
  const query = new URLSearchParams(queryString || '');
  const hasCourse = state.active && state.courses[state.active]?.plan;
  const view = parts[0] || '';

  // Ingen kurs än: visa kursvalet först
  if (!hasCourse && !['kurser', 'start'].includes(view)) { location.replace('#/kurser'); return; }

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
    case 'again': {
      const pool = practicePool(c);
      startSession({ course: c, kind: 'practice', title: session.title, items: practiceSession(c, pool, practice.mode, practice.dir, practice.count) });
      location.hash = '#/session';
      break;
    }

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
  onSessionKey(e);
  // Enter i svarsfälten under Skriv skickar svaret
  if (e.key === 'Enter' && e.target.matches?.('.qa input[data-key]')) {
    e.preventDefault();
    e.target.closest('.task').querySelector('[data-act="q-check"]:not([disabled])')?.click();
  }
});

// Röster laddas ibland efter sidan. Det här gör att rätt röst hittas.
if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = () => {};

window.addEventListener('hashchange', route);
migrateV1();
route();
