// Spelet Ordregn: svenska ord regnar ner. Översätt dem innan de når marken.
//
// Två sätt att spela:
//   type – skriv översättningen (accenter behövs inte, artikeln får saknas)
//   pick – välj rätt översättning bland fyra knappar (bra på mobilen)

let game = null;
let gameOpts = { mode: null, source: 'mine' };

const ARTICLE = /^(le |la |les |l'|un |une |des |du |de la |de l'|el |los |las |lo |unos |unas )/;

function gameMode() {
  if (gameOpts.mode) return gameOpts.mode;
  return window.matchMedia && matchMedia('(pointer: coarse)').matches ? 'pick' : 'type';
}

// Orden i spelet: från enheter du har börjat på, eller hela kursen
function gamePool(c, source = gameOpts.source) {
  const started = c.units.filter((u) => u.lessons.some((l) => lessonDone(c.id, l.id))).map((u) => u.idx);
  const units = started.length ? started : [0];
  const words = source === 'all' ? c.words : c.words.filter((w) => units.includes(w.unitIdx));
  return words.filter((w) => w.sv.length <= 26 && w.t.length <= 26);
}

// Alla svar som godkänns för ett ord
function gameKeys(word) {
  const keys = new Set();
  acceptedAnswers(word.t).forEach((a) => {
    const bare = stripAccents(a);
    keys.add(bare);
    keys.add(bare.replace(ARTICLE, ''));
    keys.add(bare.replace(/'/g, ''));
  });
  return keys;
}

function gameBest(courseId) { return progress(courseId).game?.best || 0; }

/* ---------- Startsidan ---------- */

function gameStartView() {
  const c = activeCourse();
  const mine = gamePool(c, 'mine').length;
  const all = gamePool(c, 'all').length;
  const mode = gameMode();
  const best = gameBest(c.id);
  return shell(`
    <div class="page-head">
      <span class="eyebrow">Spel</span>
      <h1>Ordregn</h1>
      <p class="lead">Svenska ord regnar ner. Översätt dem till ${esc(c.name.toLowerCase())} innan de når marken. Det går fortare för varje nivå.</p>
    </div>
    <div class="layout-2 game-start">
      <div class="col-main">
        <section class="panel rain-demo" aria-hidden="true">
          <span class="drop-card d1">huset</span>
          <span class="drop-card d2">att äta</span>
          <span class="drop-card d3">vacker</span>
          <div class="demo-ground"></div>
        </section>
        <section class="panel">
          <h2 class="panel-title">${icon('target')} Så spelar du</h2>
          <ul class="howto">
            <li>${icon('drop')}<span>Ett svenskt ord faller. ${mode === 'type' ? 'Skriv det på ' + esc(c.name.toLowerCase()) + '. Det räknas direkt när det stämmer, du behöver inte trycka Enter.' : 'Tryck på rätt översättning för det ord som är närmast marken.'}</span></li>
            <li>${icon('heart')}<span>Du har tre liv. Ett ord som landar kostar ett liv.</span></li>
            <li>${icon('bolt')}<span>Var tionde rätt ger ny nivå. Ju högre upp du tar ordet, desto fler poäng.</span></li>
            <li>${icon('check')}<span>Accenter behövs inte när du skriver, och artikeln får du hoppa över.</span></li>
          </ul>
        </section>
      </div>
      <aside class="col-side">
        <section class="panel">
          <h2 class="panel-title">${icon('game')} Inställningar</h2>
          <h3 class="mini-title">Spelsätt</h3>
          <div class="seg full">
            <button class="${mode === 'type' ? 'on' : ''}" data-act="game-mode" data-v="type">${icon('pencil')} Skriv</button>
            <button class="${mode === 'pick' ? 'on' : ''}" data-act="game-mode" data-v="pick">${icon('list')} Välj</button>
          </div>
          <h3 class="mini-title">Vilka ord?</h3>
          <div class="seg full">
            <button class="${gameOpts.source === 'mine' ? 'on' : ''}" data-act="game-src" data-v="mine">Mina enheter (${mine})</button>
            <button class="${gameOpts.source === 'all' ? 'on' : ''}" data-act="game-src" data-v="all">Hela kursen (${all})</button>
          </div>
          <div class="best-line">${icon('star')}<span>Ditt rekord</span><strong>${best}</strong></div>
          <button class="btn primary wide start-btn" data-act="game-start">${icon('play')} Starta spelet</button>
        </section>
      </aside>
    </div>`, '#/spel');
}

/* ---------- Själva spelet ---------- */

function startGame() {
  const c = activeCourse();
  const pool = gamePool(c);
  if (pool.length < 4) { toast('Det behövs minst fyra ord för att spela.'); return; }
  stopGame();
  game = {
    course: c, pool, mode: gameMode(), active: true, paused: false, over: false,
    drops: [], nextId: 1, recent: [], score: 0, hits: 0, level: 1, lives: 3, combo: 0,
    missed: [], spawnIn: 600, last: 0, raf: 0, optFor: null, started: Date.now(),
  };
  document.body.className = 'bare focus game-on';
  document.getElementById('app').innerHTML = gameHtml();
  if (game.mode === 'type') document.getElementById('g-input')?.focus();
  game.raf = requestAnimationFrame(gameTick);
}

function stopGame() {
  if (!game) return;
  cancelAnimationFrame(game.raf);
  game.active = false;
  game = null;
}

function gameHtml() {
  const c = game.course;
  const accents = c.id === 'fr' ? ['é', 'è', 'ê', 'à', 'ç', 'ô', 'û'] : ['á', 'é', 'í', 'ó', 'ú', 'ñ'];
  return `
  <div class="game ${game.mode}">
    <div class="game-top">
      <button class="icon-btn" data-act="game-quit" aria-label="Avsluta spelet">${icon('x')}</button>
      <div class="game-stats">
        <span><strong id="g-score">0</strong> poäng</span>
        <span>Nivå <strong id="g-level">1</strong></span>
      </div>
      <div class="g-lives" id="g-lives" aria-label="Liv kvar">${livesHtml()}</div>
      <button class="icon-btn" data-act="game-pause" aria-label="Pausa">${icon('pause')}</button>
    </div>
    <div class="game-field" id="g-field">
      <div class="g-banner" id="g-banner" aria-live="polite"></div>
      <div class="g-ground"><span class="g-miss" id="g-miss"></span></div>
    </div>
    <div class="game-input">
      ${game.mode === 'type' ? `
        <input id="g-input" class="answer-input" autocomplete="off" autocapitalize="off" spellcheck="false" lang="${c.tts}" placeholder="Skriv på ${esc(c.name.toLowerCase())}…" aria-label="Skriv översättningen">
        <div class="accents">${accents.map((a) => `<button class="accent" data-act="game-accent" data-char="${a}" tabindex="-1">${a}</button>`).join('')}</div>`
      : '<div class="g-options" id="g-options"></div>'}
    </div>
    <div class="g-overlay" id="g-overlay" hidden></div>
  </div>`;
}

function livesHtml() {
  return [0, 1, 2].map((i) => `<span class="life ${i < game.lives ? '' : 'lost'}">${icon('heart')}</span>`).join('');
}

// Hur lång tid ett ord tar från toppen till marken, och hur ofta nya ord kommer
function fallTime() { return Math.max(3800, 11000 - 750 * (game.level - 1)); }
function spawnGap() { return Math.max(750, 2700 - 230 * (game.level - 1)) * (0.8 + Math.random() * 0.4); }
function maxDrops() { return game.mode === 'pick' ? 3 : 4 + Math.min(4, Math.floor(game.level / 2)); }

function spawnDrop(field) {
  const onScreen = new Set(game.drops.map((d) => d.word.id));
  const options = game.pool.filter((w) => !onScreen.has(w.id) && !game.recent.includes(w.id));
  const word = pick(options.length ? options : game.pool);
  game.recent.push(word.id);
  if (game.recent.length > Math.min(10, game.pool.length - 4)) game.recent.shift();
  const el = document.createElement('div');
  el.className = 'drop-card';
  el.textContent = word.sv;
  field.append(el);
  const maxX = Math.max(8, field.clientWidth - el.offsetWidth - 8);
  const drop = {
    id: game.nextId++, word, el, keys: gameKeys(word),
    x: 8 + Math.random() * (maxX - 8), y: -el.offsetHeight, h: el.offsetHeight,
    rot: (Math.random() - 0.5) * 6, mult: 0.9 + Math.random() * 0.25,
  };
  el.style.left = `${drop.x}px`;
  game.drops.push(drop);
}

function gameTick(now) {
  if (!game || !game.active) return;
  const dt = game.last ? Math.min(60, now - game.last) : 16;
  game.last = now;
  const field = document.getElementById('g-field');
  if (!field) { stopGame(); return; }
  if (!game.paused && !game.over) {
    const ground = field.clientHeight - 34;
    game.spawnIn -= dt;
    if (game.spawnIn <= 0 && game.drops.length < maxDrops()) {
      spawnDrop(field);
      game.spawnIn = spawnGap();
    }
    const speed = field.clientHeight / fallTime();
    game.drops.slice().forEach((d) => {
      d.y += speed * dt * d.mult;
      d.el.style.transform = `translateY(${d.y}px) rotate(${d.rot}deg)`;
      if (d.y + d.h >= ground) missDrop(d);
    });
    if (game.mode === 'pick') updateOptions();
  }
  if (game && game.active) game.raf = requestAnimationFrame(gameTick);
}

function removeDrop(d, cls) {
  game.drops = game.drops.filter((x) => x !== d);
  d.el.classList.add(cls);
  setTimeout(() => d.el.remove(), 450);
}

function hitDrop(d) {
  const field = document.getElementById('g-field');
  const height = Math.max(0, 1 - d.y / (field.clientHeight || 1));
  game.combo++;
  const points = 10 * game.level + Math.round(10 * height) + Math.min(game.combo, 10);
  game.score += points;
  game.hits++;
  d.el.textContent = d.word.t;
  d.el.setAttribute('lang', game.course.tts);
  removeDrop(d, 'hit');
  recordAnswer(game.course.id, d.word.id, true);
  speak(d.word.t, game.course.tts);
  if (game.hits % 10 === 0) {
    game.level++;
    banner(`Nivå ${game.level}`);
  }
  updateHud();
}

function missDrop(d) {
  game.lives--;
  game.combo = 0;
  game.missed.push(d.word);
  removeDrop(d, 'miss');
  recordAnswer(game.course.id, d.word.id, false);
  const miss = document.getElementById('g-miss');
  if (miss) {
    miss.innerHTML = `${esc(d.word.sv)} = <span lang="${game.course.tts}">${esc(d.word.t)}</span>`;
    miss.classList.remove('show');
    void miss.offsetWidth;
    miss.classList.add('show');
  }
  updateHud();
  if (game.lives <= 0) gameOver();
}

function banner(text) {
  const el = document.getElementById('g-banner');
  if (!el) return;
  el.textContent = text;
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
}

function updateHud() {
  const s = document.getElementById('g-score');
  if (s) s.textContent = game.score;
  const l = document.getElementById('g-level');
  if (l) l.textContent = game.level;
  const lives = document.getElementById('g-lives');
  if (lives) lives.innerHTML = livesHtml();
}

// Välj-läget: knapparna gäller ordet som är närmast marken
function targetDrop() {
  return game.drops.reduce((low, d) => (!low || d.y > low.y ? d : low), null);
}

function updateOptions() {
  const t = targetDrop();
  const box = document.getElementById('g-options');
  if (!box) return;
  if (!t) { if (game.optFor !== null) { box.innerHTML = ''; game.optFor = null; } return; }
  if (game.optFor === t.id) return;
  game.optFor = t.id;
  game.drops.forEach((d) => d.el.classList.toggle('target', d === t));
  const opts = shuffle([t.word.t, ...distractors(game.course, t.word, 't')]);
  box.innerHTML = opts.map((o) => `<button class="option" data-act="game-pick" data-v="${esc(o)}" lang="${game.course.tts}">${esc(o)}</button>`).join('');
}

function gamePick(value, btn) {
  if (!game || game.paused || game.over) return;
  const t = targetDrop();
  if (!t) return;
  if (normalize(value) === normalize(t.word.t)) {
    game.optFor = null;
    hitDrop(t);
    updateOptions();
  } else {
    // Fel svar: ordet faller fortare
    game.combo = 0;
    t.mult *= 1.7;
    btn.classList.add('wrong');
    btn.disabled = true;
  }
}

function gameTyped(input) {
  if (!game || game.paused || game.over) return;
  const val = stripAccents(input.value);
  if (!val) return;
  const d = game.drops.find((x) => x.keys.has(val) || x.keys.has(val.replace(/'/g, '')));
  if (d) {
    hitDrop(d);
    input.value = '';
  }
}

function gameEnter(input) {
  if (!input.value.trim()) return;
  // Inget ord matchade: skaka fältet och börja om
  game.combo = 0;
  input.classList.remove('shake');
  void input.offsetWidth;
  input.classList.add('shake');
  input.select();
}

function togglePause(force) {
  if (!game || game.over) return;
  game.paused = force ?? !game.paused;
  const ov = document.getElementById('g-overlay');
  if (!ov) return;
  if (game.paused) {
    ov.hidden = false;
    ov.innerHTML = `<div class="g-panel">
      <span class="eyebrow">Paus</span><h2>Spelet är pausat</h2>
      <p class="muted">${game.score} poäng · nivå ${game.level}</p>
      <div class="row-btns center"><button class="btn ghost" data-act="game-end">Avsluta</button><button class="btn primary" data-act="game-resume" autofocus>${icon('play')} Fortsätt</button></div></div>`;
    ov.querySelector('[data-act="game-resume"]').focus();
  } else {
    ov.hidden = true;
    game.last = 0;
    document.getElementById('g-input')?.focus();
  }
}

function gameOver() {
  if (!game || game.over) return;
  game.over = true;
  game.drops.forEach((d) => d.el.classList.add('freeze'));
  const c = game.course;
  const p = progress(c.id);
  const prevBest = gameBest(c.id);
  const record = game.score > prevBest;
  p.game = { best: Math.max(prevBest, game.score), plays: (p.game?.plays || 0) + 1 };
  const xp = Math.min(40, game.hits);
  if (xp) addXp(xp);
  save();
  const missed = [...new Map(game.missed.map((w) => [w.id, w])).values()].slice(0, 6);
  const ov = document.getElementById('g-overlay');
  ov.hidden = false;
  ov.innerHTML = `<div class="g-panel">
    ${record && game.score ? '<span class="stamp record">Nytt rekord</span>' : ''}
    <span class="eyebrow">Spelet är slut</span>
    <h2>${game.score} poäng</h2>
    <div class="result-stats">
      <div><strong>${game.hits}</strong><span>ord rätt</span></div>
      <div><strong>${game.level}</strong><span>nivå</span></div>
      <div><strong>+${xp}</strong><span>XP</span></div>
    </div>
    <p class="muted small">Rekord: ${Math.max(prevBest, game.score)}</p>
    ${missed.length ? `<h3 class="mini-title">Ord att öva på</h3>
    <ul class="vocab compact">${missed.map((w) => `<li><button class="speak small" data-act="say" data-text="${esc(w.t)}" aria-label="Lyssna">${icon('speaker')}</button><strong lang="${c.tts}">${esc(w.t)}</strong><span>${esc(w.sv)}</span></li>`).join('')}</ul>` : ''}
    <div class="row-btns center"><button class="btn ghost" data-act="game-quit">Tillbaka</button><button class="btn primary" data-act="game-again">${icon('repeat')} Spela igen</button></div>
  </div>`;
  ov.querySelector('[data-act="game-again"]').focus();
}

// Pausa om du byter flik eller låser telefonen
document.addEventListener('visibilitychange', () => { if (document.hidden && game && !game.over) togglePause(true); });
