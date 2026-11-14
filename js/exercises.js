// Övningarna: skapar en omgång frågor och visar dem en i taget.
//
// Typer av övningar:
//   mc      – välj rätt översättning bland fyra
//   listen  – lyssna och välj ordet du hör
//   write   – skriv översättningen själv
//   match   – para ihop fem ord med sina översättningar
//   build   – bygg en mening av ordbrickor
//   cloze   – välj ordet som saknas i en mening
//   card    – flashcard: vänd kortet och säg om du kunde

/* ---------- Skapa övningar ---------- */

// Hitta tre felaktiga svarsalternativ som inte är samma som rätt svar
function distractors(course, word, field, count = 3) {
  const right = normalize(word[field]);
  const used = new Set([right]);
  const near = allWords(course).filter((w) => w.unitIdx === word.unitIdx);
  const pool = shuffle(near).concat(shuffle(allWords(course)));
  const out = [];
  for (const w of pool) {
    const n = normalize(w[field]);
    if (!used.has(n)) { used.add(n); out.push(w[field]); }
    if (out.length === count) break;
  }
  return out;
}

function mcItem(course, word, dir) {
  // dir 't' = visa målspråket och svara på svenska, 'sv' = tvärtom
  const from = dir === 't' ? 't' : 'sv';
  const to = dir === 't' ? 'sv' : 't';
  return {
    type: 'mc', wordId: word.id, dir,
    prompt: word[from], promptIsTarget: from === 't',
    answer: word[to],
    options: shuffle([word[to], ...distractors(course, word, to)]),
    optionsAreTarget: to === 't',
  };
}

function listenItem(course, word) {
  return {
    type: 'listen', wordId: word.id,
    say: word.t, answer: word.t, sv: word.sv,
    options: shuffle([word.t, ...distractors(course, word, 't')]),
    optionsAreTarget: true,
  };
}

function writeItem(word, dir = 'sv') {
  return dir === 't'
    ? { type: 'write', wordId: word.id, dir, prompt: word.t, promptIsTarget: true, answer: word.sv }
    : { type: 'write', wordId: word.id, dir, prompt: word.sv, promptIsTarget: false, answer: word.t };
}

function matchItem(words) {
  return { type: 'match', pairs: words.slice(0, 5).map((w) => ({ id: w.id, t: w.t, sv: w.sv })) };
}

// Delar en mening i ord (utan skiljetecken)
function tokens(sentence) {
  return sentence.replace(/[.!?¿¡,;:«»"…]/g, ' ').split(/\s+/).filter(Boolean);
}

function buildItem(course, sentence, intoTarget) {
  const answer = intoTarget ? sentence.t : sentence.sv;
  const words = tokens(answer);
  const others = course.sentences.filter((s) => s !== sentence).map((s) => intoTarget ? s.t : s.sv);
  const extra = [];
  const seen = new Set(words.map((w) => w.toLowerCase()));
  for (const w of shuffle(others.flatMap(tokens))) {
    if (!seen.has(w.toLowerCase())) { seen.add(w.toLowerCase()); extra.push(w.toLowerCase()); }
    if (extra.length === 3) break;
  }
  return {
    type: 'build', intoTarget,
    prompt: intoTarget ? sentence.sv : sentence.t, promptIsTarget: !intoTarget,
    answer, say: sentence.t,
    tiles: shuffle(words.concat(extra)).map((text, i) => ({ id: i, text })),
  };
}

function clozeItem(course, sentence) {
  const parts = tokens(sentence.t);
  const candidates = parts.map((w, i) => ({ w, i })).filter((x) => normalize(x.w).length >= 3);
  if (!candidates.length) return null;
  const hit = pick(candidates.length > 1 ? candidates.filter((x) => x.i > 0) : candidates);
  const used = new Set([normalize(hit.w)]);
  const wrong = [];
  for (const w of shuffle(course.sentences.flatMap((s) => tokens(s.t)))) {
    const n = normalize(w);
    if (n.length >= 3 && !used.has(n)) { used.add(n); wrong.push(hit.w[0] === hit.w[0].toUpperCase() ? w : w.toLowerCase()); }
    if (wrong.length === 3) break;
  }
  // Visa meningen med en lucka där ordet stod
  const idx = sentence.t.indexOf(hit.w);
  return {
    type: 'cloze',
    before: sentence.t.slice(0, idx), after: sentence.t.slice(idx + hit.w.length),
    answer: hit.w, sv: sentence.sv, say: sentence.t,
    options: shuffle([hit.w, ...wrong]),
    optionsAreTarget: true,
  };
}

// En lektionsomgång: först lära känna orden, sedan använda dem i meningar
function lessonSession(course, lesson) {
  const words = shuffle(lesson.words);
  const sents = shuffle(lesson.sentences);
  const items = [];

  words.slice(0, 4).forEach((w) => items.push(mcItem(course, w, 't')));
  items.push(matchItem(shuffle(lesson.words)));
  words.slice(4, 6).forEach((w) => items.push(listenItem(course, w)));
  if (sents[0]) items.push(buildItem(course, sents[0], false));
  words.slice(6, 8).forEach((w) => items.push(mcItem(course, w, 'sv')));
  if (sents[1]) { const c = clozeItem(course, sents[1]); if (c) items.push(c); }
  words.slice(0, 2).forEach((w) => items.push(writeItem(w, 'sv')));
  if (sents[2]) items.push(buildItem(course, sents[2], true));

  // Repetition: ett par ord från tidigare lektioner
  const i = course.lessons.indexOf(lesson);
  const earlier = course.lessons.slice(Math.max(0, i - 3), i).flatMap((l) => l.words);
  shuffle(earlier).slice(0, 2).forEach((w) => items.push(mcItem(course, w, pick(['t', 'sv']))));

  return items;
}

// En övningsomgång från Öva-sidan
function practiceSession(course, words, mode, dir, count) {
  const pool = shuffle(words);
  const n = Math.min(count, pool.length);
  const chosen = [];
  while (chosen.length < n) chosen.push(...shuffle(pool).slice(0, n - chosen.length));
  const items = [];

  if (mode === 'cards') chosen.forEach((w) => items.push({ type: 'card', wordId: w.id, word: w, dir }));
  if (mode === 'easy') chosen.forEach((w) => items.push(mcItem(course, w, dir)));
  if (mode === 'hard') chosen.forEach((w) => items.push(writeItem(w, dir === 't' ? 't' : 'sv')));
  if (mode === 'medium') {
    for (let i = 0; i < chosen.length; i += 5) {
      const group = chosen.slice(i, i + 5);
      if (group.length >= 3) items.push(matchItem(group));
      else group.forEach((w) => items.push(mcItem(course, w, dir)));
    }
  }
  if (mode === 'mixed') {
    chosen.forEach((w, i) => {
      const r = i % 4;
      if (r === 0) items.push(mcItem(course, w, dir));
      else if (r === 1) items.push(listenItem(course, w));
      else if (r === 2) items.push(writeItem(w, dir === 't' ? 't' : 'sv'));
      else items.push(mcItem(course, w, dir === 't' ? 'sv' : 't'));
    });
  }
  return items;
}

/* ---------- Spela upp en omgång ---------- */

let session = null;

function startSession(opts) {
  session = {
    ...opts,              // course, items, kind ('lesson' eller 'practice'), lessonId, title
    total: opts.items.length,
    i: 0,
    finished: 0,
    firstTry: 0,
    points: 0,
    answeredWrong: 0,
    started: Date.now(),
    retried: new Set(),
    ui: null,
  };
  resetUi();
}

function current() { return session.items[session.i]; }

function resetUi() {
  const item = current();
  session.ui = { picked: null, typed: '', built: [], checked: false, result: null, flipped: false, match: null };
  if (item && item.type === 'match') {
    session.ui.match = {
      left: shuffle(item.pairs.map((p) => p.id)),
      right: shuffle(item.pairs.map((p) => p.id)),
      selL: null, selR: null, done: new Set(), wrongFlash: null, mistakes: 0,
    };
  }
  if (item && (item.type === 'listen')) setTimeout(() => speak(item.say, session.course.tts), 250);
}

function sessionHtml() {
  const s = session;
  const item = current();
  const pct = Math.round((s.finished / s.total) * 100);
  return `
  <div class="session">
    <div class="session-top">
      <button class="icon-btn" data-act="quit" aria-label="Avsluta övningen">${icon('x')}</button>
      <div class="progress big" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="bar" style="width:${pct}%"></div></div>
      <span class="session-count">${Math.min(s.finished + 1, s.total)}/${s.total}</span>
    </div>
    <div class="session-body">
      <div class="ex">${exerciseHtml(item)}</div>
    </div>
    ${footerHtml(item)}
  </div>`;
}

function targetText(text, lang) {
  return `<span lang="${lang}">${esc(text)}</span>`;
}

function speakBtn(text, big = false) {
  return `<button class="speak ${big ? 'big' : ''}" data-act="speak" data-text="${esc(text)}" aria-label="Lyssna">${icon('speaker')}</button>`;
}

function optionsHtml(item) {
  const ui = session.ui;
  const lang = session.course.tts;
  return `<div class="options">${item.options.map((o, i) => {
    let cls = '';
    if (ui.picked === o) cls = 'picked';
    if (ui.checked && o === item.answer) cls = 'right';
    else if (ui.checked && ui.picked === o) cls = 'wrong';
    return `<button class="option ${cls}" data-act="pick" data-val="${esc(o)}" ${ui.checked ? 'disabled' : ''}>
      <span class="key">${i + 1}</span>${item.optionsAreTarget ? targetText(o, lang) : esc(o)}</button>`;
  }).join('')}</div>`;
}

function exerciseHtml(item) {
  const ui = session.ui;
  const lang = session.course.tts;
  const cname = session.course.name.toLowerCase();

  if (item.type === 'mc') {
    return `
      <p class="ex-label">${item.promptIsTarget ? 'Vad betyder det här?' : `Hur säger man det här på ${cname}?`}</p>
      <div class="prompt-card">
        ${item.promptIsTarget ? speakBtn(item.prompt) : ''}
        <span class="prompt-word">${item.promptIsTarget ? targetText(item.prompt, lang) : esc(item.prompt)}</span>
      </div>
      ${optionsHtml(item)}`;
  }

  if (item.type === 'listen') {
    return `
      <p class="ex-label">Lyssna och välj det du hör</p>
      <div class="prompt-card listen">${speakBtn(item.say, true)}<span class="hint">Tryck för att lyssna igen</span></div>
      ${optionsHtml(item)}`;
  }

  if (item.type === 'write') {
    const to = item.promptIsTarget ? 'svenska' : cname;
    return `
      <p class="ex-label">Skriv på ${to}</p>
      <div class="prompt-card">
        ${item.promptIsTarget ? speakBtn(item.prompt) : ''}
        <span class="prompt-word">${item.promptIsTarget ? targetText(item.prompt, lang) : esc(item.prompt)}</span>
      </div>
      <input class="answer-input ${ui.checked ? (ui.result.ok ? 'right' : 'wrong') : ''}" id="answer" autocomplete="off" autocapitalize="off" spellcheck="false"
        placeholder="Skriv ditt svar" value="${esc(ui.typed)}" ${ui.checked ? 'disabled' : ''} lang="${item.promptIsTarget ? 'sv' : lang}">
      ${!item.promptIsTarget ? accentBar(lang) : ''}`;
  }

  if (item.type === 'build') {
    const usedIds = new Set(ui.built);
    return `
      <p class="ex-label">${item.intoTarget ? `Översätt till ${cname}` : 'Översätt till svenska'}</p>
      <div class="prompt-card sentence">
        ${item.promptIsTarget ? speakBtn(item.say) : ''}
        <span class="prompt-sentence">${item.promptIsTarget ? targetText(item.prompt, lang) : esc(item.prompt)}</span>
      </div>
      <div class="build-line ${ui.checked ? (ui.result.ok ? 'right' : 'wrong') : ''}">
        ${ui.built.length ? ui.built.map((id) => `<button class="tile" data-act="unbuild" data-id="${id}" ${ui.checked ? 'disabled' : ''}>${esc(item.tiles[id].text)}</button>`).join('') : '<span class="placeholder">Tryck på orden i rätt ordning</span>'}
      </div>
      <div class="tiles">
        ${item.tiles.map((t) => `<button class="tile ${usedIds.has(t.id) ? 'used' : ''}" data-act="build" data-id="${t.id}" ${usedIds.has(t.id) || ui.checked ? 'disabled' : ''}>${esc(t.text)}</button>`).join('')}
      </div>`;
  }

  if (item.type === 'cloze') {
    const fill = ui.picked ? `<span class="gap filled">${esc(ui.picked)}</span>` : '<span class="gap">&nbsp;</span>';
    return `
      <p class="ex-label">Välj ordet som saknas</p>
      <div class="prompt-card sentence">
        <span class="prompt-sentence" lang="${lang}">${esc(item.before)}${fill}${esc(item.after)}</span>
        <span class="hint">${esc(item.sv)}</span>
      </div>
      ${optionsHtml(item)}`;
  }

  if (item.type === 'match') {
    const m = ui.match;
    const byId = Object.fromEntries(item.pairs.map((p) => [p.id, p]));
    const cell = (side, id) => {
      const p = byId[id];
      let cls = '';
      if (m.done.has(id)) cls = 'done';
      else if ((side === 'L' && m.selL === id) || (side === 'R' && m.selR === id)) cls = 'picked';
      if (m.wrongFlash && m.wrongFlash[side] === id) cls = 'wrong';
      return `<button class="match-cell ${cls}" data-act="match" data-side="${side}" data-id="${id}" ${m.done.has(id) ? 'disabled' : ''}>
        ${side === 'L' ? targetText(p.t, lang) : esc(p.sv)}</button>`;
    };
    return `
      <p class="ex-label">Para ihop orden</p>
      <div class="match-grid">
        <div class="match-col">${m.left.map((id) => cell('L', id)).join('')}</div>
        <div class="match-col">${m.right.map((id) => cell('R', id)).join('')}</div>
      </div>`;
  }

  if (item.type === 'card') {
    const w = item.word;
    const front = item.dir === 't' ? targetText(w.t, lang) : esc(w.sv);
    const back = item.dir === 't' ? esc(w.sv) : targetText(w.t, lang);
    return `
      <p class="ex-label">Flashcard: tänk på svaret och vänd kortet</p>
      <button class="flashcard ${ui.flipped ? 'flipped' : ''}" data-act="flip" aria-label="Vänd kortet">
        <span class="fc-face fc-front"><span class="fc-stamp">${item.dir === 't' ? esc(session.course.code) : 'SV'}</span><span class="fc-word">${front}</span><span class="hint">Tryck för att vända</span></span>
        <span class="fc-face fc-back"><span class="fc-stamp">${item.dir === 't' ? 'SV' : esc(session.course.code)}</span><span class="fc-word">${back}</span></span>
      </button>
      <div class="center">${speakBtn(w.t)}</div>`;
  }
  return '';
}

// Knappar för franska och spanska tecken som är svåra att skriva på svenskt tangentbord
function accentBar(lang) {
  const chars = lang.startsWith('fr') ? ['é', 'è', 'ê', 'à', 'ç', 'ô', 'î', 'ù', 'œ'] : ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
  if (session.ui.checked) return '';
  return `<div class="accents">${chars.map((c) => `<button class="accent" data-act="accent" data-char="${c}" tabindex="-1">${c}</button>`).join('')}</div>`;
}

function footerHtml(item) {
  const ui = session.ui;
  const lang = session.course.tts;

  if (item.type === 'card') {
    if (!ui.flipped) return `<div class="session-foot"><div class="foot-inner"><button class="btn primary wide" data-act="flip">Vänd kortet</button></div></div>`;
    return `<div class="session-foot"><div class="foot-inner two">
      <button class="btn ghost wide" data-act="card-no">${icon('repeat')} Öva mer</button>
      <button class="btn primary wide" data-act="card-yes">${icon('check')} Jag kunde</button></div></div>`;
  }

  if (item.type === 'match') {
    const m = ui.match;
    if (m.done.size < item.pairs.length) return `<div class="session-foot"><div class="foot-inner"><p class="foot-hint">Välj ett ord till vänster och dess översättning till höger.</p></div></div>`;
    return `<div class="session-foot ok"><div class="foot-inner">
      <div class="verdict">${icon('check')}<div><strong>${m.mistakes ? 'Klart!' : 'Perfekt!'}</strong><span>${m.mistakes ? `${m.mistakes} fel på vägen` : 'Alla par rätt på första försöket'}</span></div></div>
      <button class="btn primary" data-act="next" autofocus>Fortsätt</button></div></div>`;
  }

  if (!ui.checked) {
    const ready = canCheck(item);
    return `<div class="session-foot"><div class="foot-inner">
      <button class="btn ghost" data-act="skip">Hoppa över</button>
      <button class="btn primary" data-act="check" ${ready ? '' : 'disabled'}>Kontrollera</button></div></div>`;
  }

  const r = ui.result;
  const showAnswer = item.type === 'write' && !item.promptIsTarget || item.type === 'build' && item.intoTarget || item.type === 'cloze';
  const answerText = item.type === 'cloze' ? item.before + item.answer + item.after : item.answer;
  return `<div class="session-foot ${r.ok ? 'ok' : 'bad'}"><div class="foot-inner">
    <div class="verdict">${icon(r.ok ? 'check' : 'x')}<div>
      <strong>${r.ok ? (r.almost ? 'Nästan perfekt!' : pick(['Rätt!', 'Snyggt!', 'Bra jobbat!', 'Exakt!'])) : 'Inte riktigt'}</strong>
      <span>${r.almost ? 'Tänk på accenten: ' : r.ok ? '' : 'Rätt svar: '}${!r.ok || r.almost ? (showAnswer ? targetText(answerText, lang) : esc(answerText)) : ''}</span>
    </div></div>
    <button class="btn primary" data-act="next">Fortsätt</button></div></div>`;
}

function canCheck(item) {
  const ui = session.ui;
  if (item.type === 'write') return ui.typed.trim().length > 0;
  if (item.type === 'build') return ui.built.length > 0;
  return ui.picked !== null;
}

function check() {
  const item = current();
  const ui = session.ui;
  if (ui.checked || !canCheck(item)) return;
  let result;
  if (item.type === 'write') result = checkAnswer(ui.typed, item.answer);
  else if (item.type === 'build') result = checkAnswer(ui.built.map((id) => item.tiles[id].text).join(' '), item.answer);
  else result = { ok: ui.picked === item.answer, almost: false };
  ui.checked = true;
  ui.result = result;
  scoreItem(item, result.ok);
  if (item.say || item.optionsAreTarget || item.dir === 'sv') {
    const t = item.say || (item.dir === 'sv' || item.type === 'listen' ? item.answer : null);
    if (t && result.ok) speak(t, session.course.tts);
  }
}

// Räkna poäng och lägg tillbaka fel svar sist i omgången
function scoreItem(item, ok) {
  const s = session;
  if (item.wordId) recordAnswer(s.course.id, item.wordId, ok);
  const isRetry = s.retried.has(s.i);
  if (ok) {
    s.finished++;
    if (!isRetry) { s.firstTry++; s.points++; }
  } else {
    s.answeredWrong++;
    if (!isRetry && item.type !== 'card') {
      s.items.push(item);
      s.retried.add(s.items.length - 1);
    } else {
      s.finished++;
    }
  }
  save();
}

function nextItem() {
  session.i++;
  if (session.i >= session.items.length) return finishSession();
  resetUi();
  renderSession();
}

function finishSession() {
  const s = session;
  const scored = s.total;
  const pct = Math.round((s.firstTry / Math.max(1, scored)) * 100);
  let xp = s.kind === 'lesson' ? 10 + s.firstTry : s.points;
  if (s.kind === 'lesson') {
    const p = progress(s.course.id);
    const prev = p.lessons[s.lessonId] || {};
    p.lessons[s.lessonId] = { done: true, best: Math.max(prev.best || 0, pct), count: (prev.count || 0) + 1 };
    if (prev.done) xp = Math.round(xp / 2) + 2;
  }
  addXp(xp);
  save();
  s.result = { xp, pct, secs: Math.round((Date.now() - s.started) / 1000) };
  location.hash = '#/klart';
}

/* ---------- Händelser i en omgång ---------- */

function renderSession() {
  const root = document.getElementById('app');
  root.innerHTML = sessionHtml();
  const input = document.getElementById('answer');
  if (input && !session.ui.checked) {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  } else {
    const btn = root.querySelector('.session-foot .btn.primary:not([disabled])');
    if (btn && (session.ui.checked || current().type === 'match')) btn.focus({ preventScroll: true });
  }
}

function onSessionClick(e) {
  const el = e.target.closest('[data-act]');
  if (!el || !session) return;
  const act = el.dataset.act;
  const item = current();
  const ui = session.ui;

  if (act === 'quit') { confirmQuit(); return; }
  if (act === 'speak') { speak(el.dataset.text, session.course.tts); return; }
  if (act === 'pick' && !ui.checked) { ui.picked = el.dataset.val; if (item.optionsAreTarget) speak(ui.picked, session.course.tts); }
  if (act === 'accent') {
    const input = document.getElementById('answer');
    const pos = input.selectionStart ?? ui.typed.length;
    ui.typed = ui.typed.slice(0, pos) + el.dataset.char + ui.typed.slice(input.selectionEnd ?? pos);
    renderSession();
    const again = document.getElementById('answer');
    again.setSelectionRange(pos + 1, pos + 1);
    return;
  }
  if (act === 'build' && !ui.checked) ui.built.push(Number(el.dataset.id));
  if (act === 'unbuild' && !ui.checked) ui.built = ui.built.filter((id) => id !== Number(el.dataset.id));
  if (act === 'check') check();
  if (act === 'skip') { ui.checked = true; ui.result = { ok: false, almost: false }; scoreItem(item, false); }
  if (act === 'next') { nextItem(); return; }
  if (act === 'flip') { ui.flipped = !ui.flipped; if (ui.flipped && item.dir !== 't') speak(item.word.t, session.course.tts); }
  if (act === 'card-yes' || act === 'card-no') { scoreItem(item, act === 'card-yes'); nextItem(); return; }
  if (act === 'match') handleMatch(el.dataset.side, el.dataset.id);
  renderSession();
}

function handleMatch(side, id) {
  const m = session.ui.match;
  if (m.done.has(id)) return;
  m.wrongFlash = null;
  if (side === 'L') { m.selL = id; speak(current().pairs.find((p) => p.id === id).t, session.course.tts); }
  else m.selR = id;
  if (m.selL && m.selR) {
    if (m.selL === m.selR) {
      m.done.add(m.selL);
      recordAnswer(session.course.id, m.selL, true);
    } else {
      m.mistakes++;
      recordAnswer(session.course.id, m.selL, false);
      m.wrongFlash = { L: m.selL, R: m.selR };
      setTimeout(() => { if (session && session.ui.match === m) { m.wrongFlash = null; renderSession(); } }, 600);
    }
    m.selL = m.selR = null;
    if (m.done.size === current().pairs.length) {
      session.finished++;
      if (m.mistakes === 0) session.firstTry++;
      session.points += Math.max(0, current().pairs.length - m.mistakes);
      save();
    }
  }
}

function onSessionInput(e) {
  if (e.target.id === 'answer' && session) {
    session.ui.typed = e.target.value;
    const btn = document.querySelector('[data-act="check"]');
    if (btn) btn.disabled = !canCheck(current());
  }
}

function onSessionKey(e) {
  if (!session || !location.hash.startsWith('#/session')) return;
  if (document.querySelector('.modal')) return;
  const item = current();
  const ui = session.ui;
  if (e.key === 'Enter') {
    e.preventDefault();
    if (item.type === 'card') { if (!ui.flipped) ui.flipped = true; else { scoreItem(item, true); nextItem(); return; } }
    else if (item.type === 'match') { if (ui.match.done.size === item.pairs.length) { nextItem(); return; } }
    else if (!ui.checked) check();
    else { nextItem(); return; }
    renderSession();
    return;
  }
  if (e.target.tagName === 'INPUT') return;
  if (item.options && !ui.checked && /^[1-4]$/.test(e.key)) {
    ui.picked = item.options[Number(e.key) - 1];
    renderSession();
  }
  if (item.type === 'card' && e.key === ' ') { e.preventDefault(); ui.flipped = !ui.flipped; renderSession(); }
}

function confirmQuit() {
  showModal({
    title: 'Avsluta övningen?',
    text: 'Det du har svarat hittills sparas, men lektionen räknas inte som klar.',
    ok: 'Avsluta', cancel: 'Fortsätt öva',
    onOk: () => {
      const back = session.kind === 'lesson' ? '#/kurs' : '#/ova';
      session = null;
      location.hash = back;
    },
  });
}
