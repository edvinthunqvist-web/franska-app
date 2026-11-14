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
//   gap     – grammatik: skriv ordet eller orden som saknas
//   speak   – tala in: säg meningen högt i mikrofonen

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

/* ---------- Grammatikövningar ---------- */

// "Yo ___ español. (hablar)" blir texten och ledtråden i parentesen
function splitHint(q) {
  const m = q.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
  return m ? { text: m[1], hint: m[2] } : { text: q, hint: '' };
}

// Delar upp ett facit på luckorna: "ne pas" med två luckor blir ["ne", "pas"]
function gapPieces(alt, blanks) {
  const words = alt.trim().split(/\s+/);
  if (blanks === 1) return [alt.trim()];
  return [...words.slice(0, blanks - 1), words.slice(blanks - 1).join(' ')];
}

// Stor bokstav om luckan står först i meningen
function capIfStart(before, word) {
  return /^[¿¡]?$/.test(before.trim()) ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

function fillGaps(parts, pieces) {
  return parts.reduce((acc, part, i) => acc + part + (i < pieces.length ? (i === 0 ? capIfStart(part, pieces[i]) : pieces[i]) : ''), '')
    .replace(/' /g, "'");
}

function gapItem(q) {
  const [question, answer, sv] = q;
  const { text, hint } = splitHint(question);
  const parts = text.split('___');
  const blanks = parts.length - 1;
  const alts = answer.split(' / ').map((a) => gapPieces(a, blanks));
  return { type: 'gap', parts, blanks, alts, hint, sv, say: fillGaps(parts, alts[0]) };
}

// Välj-variant av en grammatikfråga (bara med en lucka)
function grammarCloze(q, others) {
  const [question, answer, sv] = q;
  const { text, hint } = splitHint(question);
  const parts = text.split('___');
  if (parts.length !== 2) return null;
  const right = answer.split(' / ')[0].trim();
  const used = new Set([stripAccents(right)]);
  const wrong = [];
  shuffle(others).forEach((o) => {
    const a = o.split(' / ')[0].trim();
    if (!used.has(stripAccents(a)) && wrong.length < 3) { used.add(stripAccents(a)); wrong.push(a); }
  });
  if (wrong.length < 3) return null;
  const cap = (w) => capIfStart(parts[0], w);
  return {
    type: 'cloze', before: parts[0], after: parts[1], answer: cap(right), sv, hint,
    say: fillGaps(parts, [right]), options: shuffle([right, ...wrong]).map(cap), optionsAreTarget: true,
  };
}

// Rätta en lucka: accenter ger "nästan", apostrof får saknas
function gapCheck(item, typed) {
  const clean = (t) => normalize(t).replace(/'/g, '').replace(/\s+/g, ' ').trim();
  const bare = (t) => stripAccents(t).replace(/'/g, '').replace(/\s+/g, ' ').trim();
  let almost = false;
  for (const pieces of item.alts) {
    const exact = pieces.every((p, i) => clean(typed[i] || '') === clean(p));
    if (exact) return { ok: true, almost: false };
    if (pieces.every((p, i) => bare(typed[i] || '') === bare(p))) almost = true;
  }
  return { ok: almost, almost };
}

function grammarSession(topic) {
  const answers = topic.q.filter((q) => q[0].split('___').length === 2).map((q) => q[1]);
  return shuffle(topic.q).map((q, i) => {
    if (i % 3 === 1) {
      const c = grammarCloze(q, answers.filter((a) => a !== q[1]));
      if (c) return c;
    }
    return gapItem(q);
  });
}

/* ---------- Tala in ---------- */

function speakItem(sentence) {
  return { type: 'speak', say: sentence.t, sv: sentence.sv };
}

// Meningar att säga högt från de valda enheterna
function speakPool(c) {
  const units = practice.weakOnly
    ? [...new Set(weakWords(c).map((w) => w.unitIdx))]
    : (practice.units || []);
  return c.lessons.filter((l) => units.includes(l.unitIdx)).flatMap((l) => l.sentences.concat(l.dialog.map((d) => ({ t: d.t, sv: d.sv }))))
    .filter((s) => s.t.split(' ').length <= 12);
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
  if (canListen() && (sents[3] || sents[0])) items.push(speakItem(sents[3] || sents[0]));

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
    skipped: 0,
    noMic: false,
    retried: new Set(),
    ui: null,
  };
  resetUi();
}

function current() { return session.items[session.i]; }

function resetUi() {
  const item = current();
  session.ui = { picked: null, typed: '', built: [], checked: false, result: null, flipped: false, match: null,
    gaps: item && item.type === 'gap' ? new Array(item.blanks).fill('') : [], lastGap: 0,
    mic: { state: 'idle', heard: '', interim: '', error: null, tries: 0, best: null, scored: false } };
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
        ${item.hint ? `<span class="gap-hint">${esc(item.hint)}</span>` : ''}
        <span class="hint">${esc(item.sv)}</span>
      </div>
      ${optionsHtml(item)}`;
  }

  if (item.type === 'gap') {
    const r = ui.result;
    const inputs = item.parts.map((part, i) => {
      if (i === item.blanks) return esc(part);
      const len = Math.max(...item.alts.map((a) => a[i].length));
      const cls = ui.checked ? (r.ok ? 'right' : 'wrong') : '';
      return `${esc(part)}<input class="gap-input ${cls}" id="gap${i}" data-gap="${i}" size="${Math.max(4, len + 1)}" autocomplete="off" autocapitalize="off" spellcheck="false"
        value="${esc(ui.gaps[i])}" aria-label="Lucka ${i + 1}" ${ui.checked ? 'disabled' : ''}>`;
    }).join('');
    return `
      <p class="ex-label">${item.blanks > 1 ? 'Fyll i orden som saknas' : 'Fyll i det som saknas'}</p>
      <div class="prompt-card sentence gap-card">
        <span class="prompt-sentence" lang="${lang}">${inputs}</span>
        ${item.hint ? `<span class="gap-hint">${esc(item.hint)}</span>` : ''}
        <span class="hint">${esc(item.sv)}</span>
      </div>
      ${accentBar(lang)}`;
  }

  if (item.type === 'speak') {
    const m = ui.mic;
    const words = item.say.split(' ');
    let sentence = targetText(item.say, lang);
    if (m.best && m.state === 'done') {
      // Färga orden: grönt = hördes, rött = hördes inte
      let k = 0;
      sentence = `<span lang="${lang}">${words.map((w) => {
        const n = speechWords(w).length;
        const ok = n === 0 || m.best.hit.slice(k, k + n).every(Boolean);
        k += n;
        return `<span class="sw ${ok ? 'ok' : 'miss'}">${esc(w)}</span>`;
      }).join(' ')}</span>`;
    }
    const status = {
      idle: 'Lyssna först om du vill. Tryck sedan på mikrofonen och läs meningen högt.',
      listening: m.interim ? `Jag hör: ${m.interim}` : 'Lyssnar… läs meningen nu.',
      done: m.heard ? `Jag hörde: ”${m.heard}”` : 'Jag hörde inget.',
      error: MIC_ERRORS[m.error] || 'Något gick fel med mikrofonen. Försök igen.',
    }[m.state];
    return `
      <p class="ex-label">Säg meningen högt</p>
      <div class="prompt-card sentence">
        ${speakBtn(item.say)}
        <span class="prompt-sentence">${sentence}</span>
        <span class="hint">${esc(item.sv)}</span>
      </div>
      <div class="mic-area">
        <button class="mic-btn ${m.state === 'listening' ? 'on' : ''}" data-act="mic" aria-label="${m.state === 'listening' ? 'Sluta lyssna' : 'Tala in'}" ${ui.checked && ui.result.ok ? 'disabled' : ''}>${icon('mic')}</button>
        <p class="mic-status" aria-live="polite">${esc(status)}</p>
      </div>`;
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

const MIC_ERRORS = {
  'not-allowed': 'Mikrofonen är blockerad. Tillåt mikrofonen via ikonen i adressfältet och försök igen.',
  'service-not-allowed': 'Webbläsaren tillåter inte taligenkänning här. Prova Chrome eller Safari.',
  'no-speech': 'Jag hörde inget. Försök igen och prata lite högre.',
  'audio-capture': 'Ingen mikrofon hittades.',
  network: 'Taligenkänningen behöver internet. Kontrollera uppkopplingen.',
  start: 'Mikrofonen kunde inte starta. Försök igen.',
};

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

  if (item.type === 'speak') {
    const m = ui.mic;
    if (!ui.checked) {
      return `<div class="session-foot"><div class="foot-inner">
        <button class="btn ghost" data-act="no-mic">Kan inte prata nu</button>
        <button class="btn primary" data-act="mic">${icon('mic')} ${m.state === 'listening' ? 'Lyssnar…' : m.tries ? 'Försök igen' : 'Tala'}</button></div></div>`;
    }
    const pct = Math.round(m.best.score * 100);
    const hits = m.best.hit.filter(Boolean).length;
    if (ui.result.ok) {
      return `<div class="session-foot ok"><div class="foot-inner">
        <div class="verdict">${icon('check')}<div><strong>${pct >= 95 ? 'Perfekt uttal!' : 'Bra uttalat!'}</strong><span>${hits} av ${m.best.words.length} ord hördes rätt</span></div></div>
        <button class="btn primary" data-act="next">Fortsätt</button></div></div>`;
    }
    return `<div class="session-foot bad"><div class="foot-inner">
      <div class="verdict">${icon('x')}<div><strong>${pct >= 50 ? 'Nästan där' : 'Försök igen'}</strong><span>${hits} av ${m.best.words.length} ord hördes. Lyssna och försök igen.</span></div></div>
      <div class="foot-btns"><button class="btn ghost" data-act="next">Fortsätt</button><button class="btn primary" data-act="mic">${icon('mic')} Igen</button></div></div></div>`;
  }

  if (!ui.checked) {
    const ready = canCheck(item);
    return `<div class="session-foot"><div class="foot-inner">
      <button class="btn ghost" data-act="skip">Hoppa över</button>
      <button class="btn primary" data-act="check" ${ready ? '' : 'disabled'}>Kontrollera</button></div></div>`;
  }

  const r = ui.result;
  const showAnswer = item.type === 'write' && !item.promptIsTarget || item.type === 'build' && item.intoTarget || item.type === 'cloze' || item.type === 'gap';
  const answerText = item.type === 'cloze' || item.type === 'gap' ? item.say : item.answer;
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
  if (item.type === 'gap') return ui.gaps.every((g) => g.trim().length > 0);
  if (item.type === 'speak') return false;
  return ui.picked !== null;
}

function check() {
  const item = current();
  const ui = session.ui;
  if (ui.checked || !canCheck(item)) return;
  let result;
  if (item.type === 'write') result = checkAnswer(ui.typed, item.answer);
  else if (item.type === 'build') result = checkAnswer(ui.built.map((id) => item.tiles[id].text).join(' '), item.answer);
  else if (item.type === 'gap') result = gapCheck(item, ui.gaps);
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
    if (!isRetry && item.type !== 'card' && item.type !== 'speak') {
      s.items.push(item);
      s.retried.add(s.items.length - 1);
    } else {
      s.finished++;
    }
  }
  save();
}

function nextItem() {
  const item = current();
  // En taluppgift som inte blev rätt räknas som klar, men inte som rätt
  if (item && item.type === 'speak' && !session.ui.mic.scored) {
    session.ui.mic.scored = true;
    if (session.ui.mic.tries) { session.finished++; session.answeredWrong++; }
    else { session.finished++; session.skipped++; }
  }
  stopListening();
  session.i++;
  // Har du sagt att du inte kan prata hoppar vi över resten av taluppgifterna
  while (session.noMic && session.i < session.items.length && current().type === 'speak') {
    session.finished++; session.skipped++; session.i++;
  }
  if (session.i >= session.items.length) return finishSession();
  resetUi();
  renderSession();
}

function finishSession() {
  const s = session;
  const scored = s.total - s.skipped;
  const pct = Math.round((s.firstTry / Math.max(1, scored)) * 100);
  let xp = s.kind === 'practice' ? s.points : 10 + s.firstTry;
  if (s.kind === 'lesson') {
    const p = progress(s.course.id);
    const prev = p.lessons[s.lessonId] || {};
    p.lessons[s.lessonId] = { done: true, best: Math.max(prev.best || 0, pct), count: (prev.count || 0) + 1 };
    if (prev.done) xp = Math.round(xp / 2) + 2;
  }
  if (s.kind === 'grammar') {
    const p = progress(s.course.id);
    p.grammar = p.grammar || {};
    const prev = p.grammar[s.topicSlug] || {};
    p.grammar[s.topicSlug] = { done: true, best: Math.max(prev.best || 0, pct), count: (prev.count || 0) + 1 };
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
  const gap = document.getElementById(`gap${session.ui.lastGap}`);
  const input = document.getElementById('answer') || (gap && !gap.disabled ? gap : null);
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
    const id = item.type === 'gap' ? `gap${ui.lastGap}` : 'answer';
    const input = document.getElementById(id);
    const value = item.type === 'gap' ? ui.gaps[ui.lastGap] : ui.typed;
    const pos = input.selectionStart ?? value.length;
    const next = value.slice(0, pos) + el.dataset.char + value.slice(input.selectionEnd ?? pos);
    if (item.type === 'gap') ui.gaps[ui.lastGap] = next; else ui.typed = next;
    renderSession();
    const again = document.getElementById(id);
    again.focus();
    again.setSelectionRange(pos + 1, pos + 1);
    return;
  }
  if (act === 'mic') { toggleMic(); return; }
  if (act === 'no-mic') {
    session.noMic = true;
    stopListening();
    ui.mic.scored = true;
    session.finished++; session.skipped++;
    toast('Okej! Taluppgifterna hoppas över resten av omgången.');
    nextItem();
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

// Starta eller stoppa mikrofonen i en taluppgift
function toggleMic() {
  const ui = session.ui;
  const item = current();
  const m = ui.mic;
  if (m.state === 'listening') { stopListening(); return; }
  if (ui.checked && ui.result.ok) return;
  if (!canListen()) { m.state = 'error'; m.error = 'service-not-allowed'; renderSession(); return; }
  window.speechSynthesis?.cancel();
  ui.checked = false;
  ui.result = null;
  m.state = 'listening'; m.interim = ''; m.error = null;
  renderSession();
  const mine = ui;
  listen(session.course.tts, {
    onInterim: (text) => {
      if (session?.ui !== mine) return;
      m.interim = text;
      const el = document.querySelector('.mic-status');
      if (el) el.textContent = `Jag hör: ${text}`;
    },
    onDone: (alts) => {
      if (session?.ui !== mine) return;
      if (!alts.length) { m.state = 'error'; m.error = m.error || 'no-speech'; renderSession(); return; }
      m.tries++;
      m.best = bestHeard(item.say, alts);
      m.heard = m.best.text;
      m.state = 'done';
      const ok = m.best.score >= 0.75;
      ui.checked = true;
      ui.result = { ok, almost: false };
      if (ok && !m.scored) {
        m.scored = true;
        const s = session;
        s.finished++;
        if (m.tries === 1) { s.firstTry++; s.points++; }
        save();
      }
      renderSession();
    },
    onError: (err) => {
      if (session?.ui !== mine) return;
      if (err === 'aborted') { m.state = m.best ? 'done' : 'idle'; renderSession(); return; }
      m.state = 'error'; m.error = err; renderSession();
    },
  });
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
  if (e.target.dataset.gap !== undefined && session) {
    session.ui.gaps[Number(e.target.dataset.gap)] = e.target.value;
    session.ui.lastGap = Number(e.target.dataset.gap);
    const btn = document.querySelector('[data-act="check"]');
    if (btn) btn.disabled = !canCheck(current());
  }
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
    // Med två luckor: Enter i första luckan hoppar till nästa
    if (item.type === 'gap' && !ui.checked && e.target.dataset?.gap !== undefined) {
      const i = Number(e.target.dataset.gap);
      const empty = ui.gaps.findIndex((g, k) => k > i && !g.trim());
      if (empty > 0) { document.getElementById(`gap${empty}`)?.focus(); return; }
    }
    if (item.type === 'speak') {
      if (ui.checked && ui.result.ok) nextItem(); else toggleMic();
      return;
    }
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
      stopListening();
      const back = session.kind === 'lesson' ? '#/kurs' : session.kind === 'grammar' ? `#/grammatik/${session.topicSlug}` : '#/ova';
      session = null;
      location.hash = back;
    },
  });
}
