// Sidorna i appen. Varje funktion returnerar HTML för en sida.

/* ---------- Ramen runt sidorna ---------- */

const NAV = [
  { hash: '#/kurs', label: 'Lär', icon: 'book' },
  { hash: '#/ova', label: 'Öva', icon: 'cards' },
  { hash: '#/ordlista', label: 'Ordlista', icon: 'list' },
  { hash: '#/skriv', label: 'Skriv', icon: 'feather' },
  { hash: '#/profil', label: 'Profil', icon: 'user' },
];

function shell(content, active) {
  const course = activeCourse();
  const today = xpToday();
  const goal = dailyGoal();
  const st = streak();
  return `
  <header class="top">
    <div class="top-inner">
      <a class="logo" href="#/kurs" aria-label="Mon Français, till startsidan"><span class="logo-mark">${esc(course.code)}</span><span class="logo-text">Mon ${course.id === 'es' ? 'Español' : 'Français'}</span></a>
      <nav class="nav" aria-label="Huvudmeny">
        ${NAV.map((n) => `<a class="nav-btn ${active === n.hash ? 'active' : ''}" href="${n.hash}" ${active === n.hash ? 'aria-current="page"' : ''}>${icon(n.icon)}<span>${n.label}</span></a>`).join('')}
      </nav>
      <div class="top-stats">
        <a class="chip course-chip" href="#/kurser" title="Byt eller lägg till kurs">${icon('globe')}<span>${esc(course.name)}</span>${icon('down', 'small')}</a>
        <span class="chip ${st ? 'hot' : ''}" title="Dagar i rad">${icon('flame')}<span>${st}</span></span>
        <span class="chip" title="XP idag av ditt dagliga mål">${icon('bolt')}<span>${today}/${goal}</span></span>
      </div>
    </div>
  </header>
  <main class="page" id="main">${content}</main>`;
}

/* ---------- Kursval ---------- */

function coursePickerView() {
  const mine = Object.keys(state.courses).filter((id) => state.courses[id].plan && COURSE_DATA[id]);
  const others = Object.values(COURSE_DATA).filter((c) => !mine.includes(c.id));
  const first = mine.length === 0;
  const card = (c, owned) => {
    const pr = owned ? courseProgress(c) : null;
    return `
    <button class="lang-card ${owned && c.id === state.active ? 'current' : ''}" data-act="${owned ? 'switch' : 'add'}" data-id="${c.id}">
      <span class="lang-stamp">${esc(c.code)}</span>
      <span class="lang-name">${esc(c.name)}</span>
      <span class="lang-native" lang="${c.tts}">${esc(c.native)}</span>
      ${owned
        ? `<span class="lang-meta">${pr.done} av ${pr.total} lektioner</span><span class="progress"><span class="bar" style="width:${Math.round(pr.done / pr.total * 100)}%"></span></span>`
        : `<span class="lang-meta">${c.units.length} enheter · ${c.lessons.length} lektioner · ${c.words.length} ord</span>`}
      <span class="lang-cta">${owned ? (c.id === state.active ? 'Fortsätt' : 'Byt till') : 'Starta kurs'} ${icon('arrow')}</span>
    </button>`;
  };
  return `
  <div class="picker">
    <div class="picker-head">
      ${first ? '' : `<a class="back-link" href="#/kurs">${icon('back')} Tillbaka</a>`}
      <span class="eyebrow">${first ? 'Välkommen' : 'Dina kurser'}</span>
      <h1>${first ? 'Vilket språk vill du lära dig?' : 'Byt kurs eller lägg till en ny'}</h1>
      <p class="lead">${first ? 'Välj ett språk så gör vi en plan som passar dig. Du kan lägga till fler språk när som helst.' : 'Allt sparas separat för varje kurs, så du kan växla fritt.'}</p>
    </div>
    ${mine.length ? `<h2 class="section-title">Pågående</h2><div class="lang-grid">${mine.map((id) => card(COURSE_DATA[id], true)).join('')}</div>` : ''}
    ${others.length ? `${mine.length ? '<h2 class="section-title">Lägg till</h2>' : ''}<div class="lang-grid">${others.map((c) => card(c, false)).join('')}</div>` : ''}
    <p class="muted center small">Fler språk kommer.</p>
  </div>`;
}

/* ---------- Introduktion och plan ---------- */

let onboard = null;

function onboardingView(courseId) {
  const c = COURSE_DATA[courseId];
  if (!onboard || onboard.courseId !== courseId) onboard = { courseId, step: 0, level: null, reasons: [], goal: 1 };
  const o = onboard;
  const steps = 4;
  let body = '';

  if (o.step === 0) {
    body = `
      <h1>Hur mycket ${esc(c.name.toLowerCase())} kan du?</h1>
      <p class="lead">Då vet vi var du ska börja. Du kan alltid gå tillbaka till tidigare lektioner.</p>
      <div class="choice-list">${LEVELS.map((l, i) => `
        <button class="choice ${o.level === i ? 'picked' : ''}" data-act="ob-level" data-i="${i}">
          <span class="choice-bars">${[0, 1, 2].map((b) => `<i class="${b <= i ? 'on' : ''}"></i>`).join('')}</span>
          <span><strong>${l.label}</strong><small>${l.sub}</small></span>
        </button>`).join('')}</div>`;
  }
  if (o.step === 1) {
    body = `
      <h1>Varför vill du lära dig ${esc(c.name.toLowerCase())}?</h1>
      <p class="lead">Välj så många du vill.</p>
      <div class="choice-grid">${REASONS.map((r) => `
        <button class="choice small ${o.reasons.includes(r) ? 'picked' : ''}" data-act="ob-reason" data-r="${esc(r)}">${icon(o.reasons.includes(r) ? 'check' : 'plus')}<strong>${r}</strong></button>`).join('')}</div>`;
  }
  if (o.step === 2) {
    body = `
      <h1>Hur mycket vill du öva varje dag?</h1>
      <p class="lead">En lektion ger ungefär 20 XP. Du kan ändra målet senare under Profil.</p>
      <div class="choice-list">${GOALS.map((g, i) => `
        <button class="choice ${o.goal === i ? 'picked' : ''}" data-act="ob-goal" data-i="${i}">
          <span class="goal-num">${g.min}<small>min</small></span>
          <span><strong>${g.label}</strong><small>${g.xp} XP om dagen</small></span>
        </button>`).join('')}</div>`;
  }
  if (o.step === 3) {
    const lvl = LEVELS[o.level ?? 0];
    const goal = GOALS[o.goal];
    const remaining = c.lessons.filter((l) => l.unitIdx >= lvl.startUnit).length;
    const perDay = Math.max(1, Math.round(goal.xp / 20));
    const weeks = Math.max(1, Math.ceil(remaining / perDay / 7));
    const startUnit = c.units[lvl.startUnit];
    body = `
      <span class="eyebrow">Din plan</span>
      <h1>Klart! Så här ser din plan ut</h1>
      <div class="plan-card">
        <div class="plan-row">${icon('target')}<div><strong>Start: Enhet ${lvl.startUnit + 1}, ${esc(startUnit.title)}</strong><small>${lvl.startUnit ? 'Tidigare enheter är öppna om du vill repetera.' : 'Vi börjar från grunden.'}</small></div></div>
        <div class="plan-row">${icon('bolt')}<div><strong>${goal.xp} XP om dagen</strong><small>Ungefär ${perDay} ${perDay === 1 ? 'lektion' : 'lektioner'} eller ${goal.min} minuter.</small></div></div>
        <div class="plan-row">${icon('stamp')}<div><strong>Hela kursen på cirka ${weeks} ${weeks === 1 ? 'vecka' : 'veckor'}</strong><small>${remaining} lektioner kvar, från nybörjare till nivå A2.</small></div></div>
        ${o.reasons.length ? `<div class="plan-row">${icon('star')}<div><strong>Fokus: ${esc(o.reasons.join(', ').toLowerCase())}</strong><small>Enheterna om resor, mat och vardag hjälper dig mest.</small></div></div>` : ''}
      </div>`;
  }

  const canNext = o.step === 0 ? o.level !== null : true;
  return `
  <div class="onboard">
    <div class="onboard-top">
      <button class="icon-btn" data-act="ob-back" aria-label="Tillbaka">${icon('back')}</button>
      <div class="progress big"><div class="bar" style="width:${((o.step + 1) / steps) * 100}%"></div></div>
      <span class="lang-stamp small">${esc(c.code)}</span>
    </div>
    <div class="onboard-body">${body}</div>
    <div class="onboard-foot"><button class="btn primary wide" data-act="ob-next" ${canNext ? '' : 'disabled'}>${o.step === 3 ? 'Starta första lektionen' : 'Fortsätt'}</button></div>
  </div>`;
}

function finishOnboarding() {
  const o = onboard;
  const p = progress(o.courseId);
  p.plan = { level: o.level ?? 0, startUnit: LEVELS[o.level ?? 0].startUnit, goal: GOALS[o.goal].xp, reasons: o.reasons, created: dayKey() };
  state.active = o.courseId;
  save();
  onboard = null;
  const first = nextLesson(COURSE_DATA[o.courseId]);
  location.hash = first ? `#/lektion/${first.id}` : '#/kurs';
}

/* ---------- Kursvägen ---------- */

function pathView() {
  const c = activeCourse();
  const next = nextLesson(c);
  const pr = courseProgress(c);
  const weak = weakWords(c);
  const today = xpToday();
  const goal = dailyGoal();
  const goalPct = Math.min(100, Math.round(today / goal * 100));
  const learned = allWords(c).filter((w) => isLearned(c.id, w.id)).length;

  const units = c.units.map((u) => {
    const up = unitProgress(c, u);
    const open = u.lessons.some((l) => lessonUnlocked(c, l));
    return `
    <section class="unit ${open ? '' : 'locked'}" id="${u.id}">
      <div class="unit-head">
        <div>
          <span class="eyebrow">Enhet ${u.idx + 1} · ${u.level}</span>
          <h2>${esc(u.title)}</h2>
        </div>
        <span class="stamp">${up.done}/${up.total}</span>
      </div>
      <ol class="trail">
        ${u.lessons.map((l, i) => {
          const done = lessonDone(c.id, l.id);
          const unlocked = lessonUnlocked(c, l);
          const isNext = next && next.id === l.id;
          const cls = done ? 'done' : isNext ? 'next' : unlocked ? 'open' : 'locked';
          return `<li class="stop ${cls} pos-${i % 3}">
            ${unlocked ? `<a class="stop-btn" href="#/lektion/${l.id}" aria-label="Lektion ${i + 1}: ${esc(l.title)}">` : `<span class="stop-btn" aria-label="Låst lektion">`}
              ${icon(done ? 'check' : unlocked ? 'book' : 'lock')}
            ${unlocked ? '</a>' : '</span>'}
            <span class="stop-label"><strong lang="${c.tts}">${esc(l.title)}</strong><small>${esc(l.intro)}</small></span>
            ${isNext ? '<span class="start-tag">Starta här</span>' : ''}
          </li>`;
        }).join('')}
        <li class="stop write ${up.done === up.total ? 'open' : 'locked'} pos-1">
          ${up.done === up.total ? `<a class="stop-btn" href="#/skriv/${u.idx}" aria-label="Skrivuppgift">` : '<span class="stop-btn">'}${icon('feather')}${up.done === up.total ? '</a>' : '</span>'}
          <span class="stop-label"><strong>Skriv och svara</strong><small>Använd det du lärt dig i enheten</small></span>
        </li>
      </ol>
    </section>`;
  }).join('');

  return shell(`
        ${next ? `
    <a class="hero-card" href="#/lektion/${next.id}">
      <div>
        <span class="eyebrow">Fortsätt där du var · Enhet ${next.unitIdx + 1}</span>
        <h1 lang="${c.tts}">${esc(next.title)}</h1>
        <p>${esc(next.intro)}</p>
      </div>
      <span class="btn primary">Starta lektion ${icon('arrow')}</span>
    </a>` : `
    <div class="hero-card done-card"><div><span class="eyebrow">Kursen är klar</span><h1>Félicitations !</h1><p>Du har klarat alla lektioner. Fortsätt repetera under Öva.</p></div><a class="btn primary" href="#/ova">Öva ${icon('arrow')}</a></div>`}
    <div class="layout-2">
      <div class="col-main">
        <div class="units">${units}</div>
      </div>
      <aside class="col-side">
        <div class="panel goal-panel">
          <div class="ring" style="--p:${goalPct}"><span>${today}<small>/${goal} XP</small></span></div>
          <div><h3>Dagens mål</h3><p class="muted">${today >= goal ? 'Målet är klart för idag. Snyggt!' : `${goal - today} XP kvar. Ungefär ${Math.max(1, Math.ceil((goal - today) / 20))} ${Math.ceil((goal - today) / 20) > 1 ? 'lektioner' : 'lektion'}.`}</p></div>
        </div>
        <div class="panel stats-panel">
          <div class="stat"><strong>${streak()}</strong><span>dagar i rad</span></div>
          <div class="stat"><strong>${pr.done}/${pr.total}</strong><span>lektioner</span></div>
          <div class="stat"><strong>${learned}</strong><span>ord du kan</span></div>
        </div>
        <a class="panel link-panel" href="#/ova?svaga=1">
          ${icon('repeat')}
          <div><h3>Repetera svaga ord</h3><p class="muted">${weak.length ? `${weak.length} ord behöver övas` : 'Inga svaga ord just nu'}</p></div>
          ${icon('chevron')}
        </a>
        <a class="panel link-panel" href="#/skriv">
          ${icon('chat')}
          <div><h3>Svara på frågor</h3><p class="muted">Skriv egna svar på ${esc(c.name.toLowerCase())}</p></div>
          ${icon('chevron')}
        </a>
      </aside>
    </div>`, '#/kurs');
}

/* ---------- Lektionssidan ---------- */

function lessonView(id) {
  const c = activeCourse();
  const l = c.lessonById[id];
  if (!l) return notFound();
  const u = c.units[l.unitIdx];
  const done = lessonDone(c.id, l.id);
  const best = progress(c.id).lessons[l.id]?.best;
  return shell(`
    <div class="lesson-page">
      <a class="back-link" href="#/kurs">${icon('back')} Kursvägen</a>
      <header class="lesson-head">
        <span class="eyebrow">Enhet ${l.unitIdx + 1} · ${esc(u.title)} · Lektion ${l.idx + 1}</span>
        <h1 lang="${c.tts}">${esc(l.title)}</h1>
        <p class="lead">${esc(l.intro)}</p>
        ${done ? `<span class="stamp">Klar · ${best}%</span>` : ''}
      </header>

      <div class="lesson-grid">
        ${l.dialog.length ? `
        <section class="panel">
          <h2 class="panel-title">${icon('chat')} Dialog</h2>
          <div class="dialog">${l.dialog.map((d, i) => `
            <div class="line ${i % 2 ? 'b' : 'a'}">
              <span class="who">${esc(d.who)}</span>
              <span class="say"><span lang="${c.tts}">${esc(d.t)}</span>${speakBtn(d.t)}</span>
              <span class="tr">${esc(d.sv)}</span>
            </div>`).join('')}</div>
        </section>` : ''}

        <section class="panel ${l.dialog.length ? '' : 'wide'}">
          <h2 class="panel-title">${icon('list')} Nya ord <span class="count">${l.words.length}</span></h2>
          <ul class="vocab">${l.words.map((w) => `
            <li><button class="speak small" data-act="say" data-text="${esc(w.t)}" aria-label="Lyssna">${icon('speaker')}</button>
            <strong lang="${c.tts}">${esc(w.t)}</strong><span>${esc(w.sv)}</span></li>`).join('')}</ul>
        </section>

        ${l.grammar ? `
        <section class="panel">
          <h2 class="panel-title">${icon('grammar')} ${esc(l.grammar.h)}</h2>
          <p>${esc(l.grammar.p)}</p>
          <table class="gtable">${l.grammar.table.map(([a, b]) => `<tr><td lang="${c.tts}">${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</table>
        </section>` : ''}

        <section class="panel">
          <h2 class="panel-title">${icon('book')} Exempelmeningar</h2>
          <ul class="examples">${l.sentences.map((s) => `
            <li><span class="say"><span lang="${c.tts}">${esc(s.t)}</span>${speakBtn(s.t)}</span><span class="tr">${esc(s.sv)}</span></li>`).join('')}</ul>
          ${l.tip ? `<div class="tip">${icon('ear')}<p><strong>Uttal:</strong> ${esc(l.tip)}</p></div>` : ''}
        </section>
      </div>

      <div class="sticky-cta">
        <div class="cta-inner">
          <span class="muted">${l.words.length} ord · cirka 15 övningar · ${done ? 'repetera för extra XP' : '10+ XP'}</span>
          <button class="btn primary" data-act="start-lesson" data-id="${l.id}">${done ? 'Öva igen' : 'Starta övningarna'} ${icon('arrow')}</button>
        </div>
      </div>
    </div>`, '#/kurs');
}

/* ---------- Resultat efter en omgång ---------- */

function resultView() {
  if (!session || !session.result) { location.hash = '#/kurs'; return ''; }
  const s = session;
  const r = s.result;
  const c = s.course;
  const next = s.kind === 'lesson' ? nextLesson(c) : null;
  const goal = dailyGoal();
  const today = xpToday();
  const mins = Math.floor(r.secs / 60);
  const secs = String(r.secs % 60).padStart(2, '0');
  const msg = r.pct >= 90 ? 'Magnifique !' : r.pct >= 70 ? 'Bra jobbat!' : r.pct >= 50 ? 'Bra kämpat!' : 'Det sitter snart!';
  return `
  <div class="result">
    <div class="result-card">
      <span class="result-stamp">${icon('star')}</span>
      <span class="eyebrow">${s.kind === 'lesson' ? 'Lektion klar' : 'Övning klar'}</span>
      <h1>${msg}</h1>
      <p class="lead" lang="${c.tts}">${esc(s.title)}</p>
      <div class="result-stats">
        <div><strong>+${r.xp}</strong><span>XP</span></div>
        <div><strong>${r.pct}%</strong><span>rätt direkt</span></div>
        <div><strong>${mins}:${secs}</strong><span>tid</span></div>
      </div>
      <div class="goal-line">
        <span>Dagens mål</span>
        <div class="progress"><div class="bar" style="width:${Math.min(100, today / goal * 100)}%"></div></div>
        <span>${today}/${goal} XP</span>
      </div>
      <div class="result-actions">
        ${s.kind === 'lesson'
          ? `<a class="btn ghost" href="#/kurs">Till kursvägen</a>${next ? `<a class="btn primary" href="#/lektion/${next.id}">Nästa lektion ${icon('arrow')}</a>` : ''}`
          : `<a class="btn ghost" href="#/ova">Ny övning</a><button class="btn primary" data-act="again">Kör igen ${icon('repeat')}</button>`}
      </div>
    </div>
  </div>`;
}

/* ---------- Öva ---------- */

let practice = { units: null, custom: false, weakOnly: false, mode: 'easy', dir: 't', count: 10 };

const MODES = [
  { id: 'cards', label: 'Flashcards', sub: 'Vänd kort i lugn takt', level: 'Start', icon: 'cards' },
  { id: 'easy', label: 'Flerval', sub: 'Välj rätt av fyra', level: 'Lätt', icon: 'list' },
  { id: 'medium', label: 'Para ihop', sub: 'Matcha ord och översättning', level: 'Medel', icon: 'link' },
  { id: 'hard', label: 'Skriv', sub: 'Skriv svaret själv', level: 'Svår', icon: 'pencil' },
  { id: 'mixed', label: 'Blandat', sub: 'Allt blandat med uppläsning', level: 'Mix', icon: 'repeat' },
];

function practicePool(c) {
  if (practice.weakOnly) return weakWords(c);
  const units = practice.units || [];
  const words = c.words.filter((w) => units.includes(w.unitIdx));
  if (practice.custom) words.push(...progress(c.id).custom.map((x) => ({ ...x, unitIdx: -1, custom: true })));
  return words;
}

function practiceView(query) {
  const c = activeCourse();
  if (query.get('svaga')) { practice.weakOnly = true; history.replaceState(null, '', '#/ova'); }
  if (!practice.units || practice.courseId !== c.id) {
    // Förvalt: enheter du har påbörjat, annars första enheten
    const started = c.units.filter((u) => u.lessons.some((l) => lessonDone(c.id, l.id))).map((u) => u.idx);
    practice = { ...practice, courseId: c.id, units: started.length ? started : [0] };
  }
  const pool = practicePool(c);
  const weak = weakWords(c).length;
  const customCount = progress(c.id).custom.length;
  const counts = [10, 20, 30];

  return shell(`
    <div class="page-head">
      <span class="eyebrow">Öva</span>
      <h1>Träna på det du vill</h1>
      <p class="lead">Välj vilka ord du vill öva på och hur svårt det ska vara. Ord du svarar fel på kommer tillbaka oftare.</p>
    </div>
    <div class="layout-2 practice">
      <div class="col-main">
        <section class="panel">
          <div class="panel-row">
            <h2 class="panel-title">${icon('list')} Vad vill du öva på?</h2>
            <div class="seg">
              <button class="${practice.weakOnly ? '' : 'on'}" data-act="pr-weak" data-v="0">Välj enheter</button>
              <button class="${practice.weakOnly ? 'on' : ''}" data-act="pr-weak" data-v="1">Svaga ord (${weak})</button>
            </div>
          </div>
          ${practice.weakOnly ? `<p class="muted">${weak ? `${weak} ord som du har svarat fel på eller som är dags att repetera.` : 'Du har inga svaga ord just nu. Gör några lektioner eller välj enheter i stället.'}</p>` : `
          <div class="unit-picks">
            ${c.units.map((u) => {
              const on = practice.units.includes(u.idx);
              const up = unitProgress(c, u);
              return `<button class="unit-pick ${on ? 'on' : ''}" data-act="pr-unit" data-i="${u.idx}" aria-pressed="${on}">
                <span class="check">${on ? icon('check') : ''}</span>
                <span class="up-text"><strong>${u.idx + 1}. ${esc(u.title)}</strong><small>${u.level} · ${u.lessons.reduce((a, l) => a + l.words.length, 0)} ord${up.done ? ` · ${up.done}/${up.total} klara` : ''}</small></span>
              </button>`;
            }).join('')}
            <button class="unit-pick ${practice.custom ? 'on' : ''}" data-act="pr-custom" aria-pressed="${practice.custom}" ${customCount ? '' : 'disabled'}>
              <span class="check">${practice.custom ? icon('check') : ''}</span>
              <span class="up-text"><strong>Egna ord</strong><small>${customCount} ord</small></span>
            </button>
          </div>
          <div class="row-btns">
            <button class="btn ghost small" data-act="pr-all">Välj alla</button>
            <button class="btn ghost small" data-act="pr-none">Rensa</button>
          </div>`}
        </section>
      </div>
      <aside class="col-side">
        <section class="panel">
          <h2 class="panel-title">${icon('target')} Svårighet</h2>
          <div class="modes">${MODES.map((m) => `
            <button class="mode ${practice.mode === m.id ? 'on' : ''}" data-act="pr-mode" data-v="${m.id}">
              ${icon(m.icon)}<span><strong>${m.label}</strong><small>${m.sub}</small></span><em>${m.level}</em>
            </button>`).join('')}</div>
          <h3 class="mini-title">Riktning</h3>
          <div class="seg full">
            <button class="${practice.dir === 't' ? 'on' : ''}" data-act="pr-dir" data-v="t">${esc(c.name)} → svenska</button>
            <button class="${practice.dir === 'sv' ? 'on' : ''}" data-act="pr-dir" data-v="sv">Svenska → ${esc(c.name.toLowerCase())}</button>
          </div>
          <h3 class="mini-title">Antal frågor</h3>
          <div class="seg full">${counts.map((n) => `<button class="${practice.count === n ? 'on' : ''}" data-act="pr-count" data-v="${n}">${n}</button>`).join('')}</div>
          <button class="btn primary wide start-btn" data-act="pr-start" ${pool.length >= 4 ? '' : 'disabled'}>Starta · ${pool.length} ord ${icon('arrow')}</button>
          ${pool.length < 4 ? '<p class="muted small center">Välj minst fyra ord för att starta.</p>' : ''}
        </section>
      </aside>
    </div>`, '#/ova');
}

function startPractice() {
  const c = activeCourse();
  const pool = practicePool(c);
  if (pool.length < 4) return;
  const mode = MODES.find((m) => m.id === practice.mode);
  startSession({ course: c, kind: 'practice', title: `${mode.label} · ${pool.length} ord`, items: practiceSession(c, pool, practice.mode, practice.dir, practice.count) });
  location.hash = '#/session';
}

/* ---------- Ordlista ---------- */

let dict = { q: '', unit: 'all', adding: false };

function dictionaryView() {
  const c = activeCourse();
  const words = allWords(c);
  const q = stripAccents(dict.q);
  const shown = words.filter((w) => {
    if (dict.unit === 'custom' && !w.custom) return false;
    if (dict.unit === 'learned' && !isLearned(c.id, w.id)) return false;
    if (/^\d+$/.test(dict.unit) && w.unitIdx !== Number(dict.unit)) return false;
    return !q || stripAccents(w.t).includes(q) || stripAccents(w.sv).includes(q);
  });
  return shell(`
    <div class="page-head row">
      <div>
        <span class="eyebrow">Ordlista</span>
        <h1>${words.length} ord på ${esc(c.name.toLowerCase())}</h1>
      </div>
      <button class="btn primary" data-act="dict-add">${icon('plus')} Lägg till eget ord</button>
    </div>

    ${dict.adding ? `
    <form class="panel add-form" id="add-form">
      <h2 class="panel-title">${icon('plus')} Nytt ord</h2>
      <div class="add-row">
        <label><span>${esc(c.name)}</span><input id="add-t" autocomplete="off" placeholder="${c.id === 'es' ? 'el pan' : 'le pain'}" lang="${c.tts}"></label>
        <label><span>Svenska</span><input id="add-sv" autocomplete="off" placeholder="brödet"></label>
        <button class="btn primary" type="submit">Spara</button>
      </div>
      <p class="form-error" id="add-error" hidden>Fyll i båda fälten.</p>
    </form>` : ''}

    <div class="dict-tools">
      <label class="search">${icon('search')}<input id="dict-q" type="search" placeholder="Sök på ${esc(c.name.toLowerCase())} eller svenska" value="${esc(dict.q)}" autocomplete="off"></label>
      <select id="dict-unit" aria-label="Filtrera">
        <option value="all">Alla enheter</option>
        ${c.units.map((u) => `<option value="${u.idx}" ${dict.unit === String(u.idx) ? 'selected' : ''}>Enhet ${u.idx + 1}: ${esc(u.title)}</option>`).join('')}
        <option value="learned" ${dict.unit === 'learned' ? 'selected' : ''}>Ord jag kan</option>
        <option value="custom" ${dict.unit === 'custom' ? 'selected' : ''}>Egna ord</option>
      </select>
    </div>

    <div class="panel dict">
      <div class="dict-head"><span>${esc(c.name)}</span><span>Svenska</span><span class="hide-sm">Enhet</span><span class="hide-sm">Styrka</span><span></span></div>
      <ul class="dict-list" id="dict-list">${dictRows(c, shown)}</ul>
      ${shown.length ? '' : `<p class="empty">Inga ord matchar. ${dict.unit === 'custom' ? 'Lägg till ett eget ord ovanför.' : ''}</p>`}
    </div>`, '#/ordlista');
}

function dictRows(c, shown) {
  return shown.slice(0, 400).map((w) => {
    const st = wordStat(c.id, w.id);
    return `<li>
      <span class="dt"><button class="speak small" data-act="say" data-text="${esc(w.t)}" aria-label="Lyssna">${icon('speaker')}</button><strong lang="${c.tts}">${esc(w.t)}</strong></span>
      <span class="ds">${esc(w.sv)}</span>
      <span class="du hide-sm">${w.custom ? '<em class="tag">Eget</em>' : `<em class="tag">${w.unitIdx + 1}</em>`}</span>
      <span class="strength hide-sm" title="Styrka ${st.s} av 5">${[1, 2, 3, 4, 5].map((n) => `<i class="${st.s >= n ? 'on' : ''}"></i>`).join('')}</span>
      <span class="da">${w.custom ? `<button class="icon-btn small" data-act="dict-del" data-id="${w.id}" aria-label="Ta bort ${esc(w.t)}">${icon('trash')}</button>` : ''}</span>
    </li>`;
  }).join('');
}

/* ---------- Skriv ---------- */

let writeState = { tab: 'write', unit: null, typed: {}, checked: {} };

function writeView(unitParam) {
  const c = activeCourse();
  if (unitParam !== undefined && unitParam !== '') writeState.unit = Number(unitParam);
  const available = c.units.filter((u) => u.lessons.some((l) => lessonUnlocked(c, l)));
  if (writeState.unit === null || !available.some((u) => u.idx === writeState.unit)) writeState.unit = available.length ? available[available.length - 1].idx : 0;
  const u = c.units[writeState.unit];
  const texts = progress(c.id).texts.filter((t) => t.unit === u.idx).slice(-3).reverse();

  const writeTasks = u.write.map((task, i) => {
    const key = `w-${u.idx}-${i}`;
    const typed = writeState.typed[key] || '';
    const res = writeState.checked[key];
    const words = typed.trim() ? typed.trim().split(/\s+/).length : 0;
    return `
    <section class="panel task">
      <span class="eyebrow">Skrivuppgift</span>
      <h2>${esc(task.q)}</h2>
      <div class="kw">Försök använda: ${task.kw.map((k) => `<span class="tag ${stripAccents(typed).includes(stripAccents(k)) ? 'on' : ''}" lang="${c.tts}">${esc(k)}</span>`).join('')}</div>
      <textarea data-key="${key}" rows="5" placeholder="Skriv på ${esc(c.name.toLowerCase())} här…" lang="${c.tts}">${esc(typed)}</textarea>
      ${accentRow(c)}
      <div class="task-foot"><span class="muted small">${words} ord</span><button class="btn primary" data-act="w-check" data-key="${key}" data-i="${i}" ${words ? '' : 'disabled'}>Klar</button></div>
      ${res ? `<div class="feedback ${res.used === task.kw.length ? 'ok' : 'mid'}">
        <p><strong>${res.used === task.kw.length ? 'Snyggt! Du använde alla orden.' : `Bra! Du använde ${res.used} av ${task.kw.length} ord.`}</strong> +5 XP. Texten är sparad.</p>
        <p class="muted">Exempel på ett svar:</p><p class="example" lang="${c.tts}">${esc(task.ex)} ${speakBtn(task.ex)}</p>
      </div>` : ''}
    </section>`;
  }).join('');

  const qaTasks = u.qa.map((task, i) => {
    const key = `q-${u.idx}-${i}`;
    const typed = writeState.typed[key] || '';
    const res = writeState.checked[key];
    return `
    <section class="panel task qa">
      <div class="qa-q">${speakBtn(task.q)}<div><h2 lang="${c.tts}">${esc(task.q)}</h2><details><summary>Visa översättning</summary>${esc(task.sv)}</details></div></div>
      <div class="qa-row">
        <input data-key="${key}" value="${esc(typed)}" placeholder="Svara på ${esc(c.name.toLowerCase())}" autocomplete="off" lang="${c.tts}">
        <button class="btn primary" data-act="q-check" data-key="${key}" data-i="${i}" ${typed.trim() ? '' : 'disabled'}>Svara</button>
      </div>
      ${res ? `<div class="feedback ${res.ok ? 'ok' : 'mid'}">
        <p><strong>${res.ok ? 'Bra svar!' : 'Nästan. Ett svar här brukar innehålla något av:'}</strong> ${res.ok ? '+2 XP' : task.kw.map((k) => `<span class="tag" lang="${c.tts}">${esc(k)}</span>`).join(' ')}</p>
        <p class="muted">Exempel:</p><p class="example" lang="${c.tts}">${esc(task.ex)} ${speakBtn(task.ex)}</p>
      </div>` : ''}
    </section>`;
  }).join('');

  return shell(`
    <div class="page-head">
      <span class="eyebrow">Skriv</span>
      <h1>Använd språket på riktigt</h1>
      <p class="lead">Skriv korta texter och svara på frågor. Det finns inget exakt rätt svar, så försök använda orden från enheten.</p>
    </div>
    <div class="write-tools">
      <div class="seg">
        <button class="${writeState.tab === 'write' ? 'on' : ''}" data-act="w-tab" data-v="write">${icon('feather')} Skrivuppgifter</button>
        <button class="${writeState.tab === 'qa' ? 'on' : ''}" data-act="w-tab" data-v="qa">${icon('chat')} Svara på frågor</button>
      </div>
      <select id="w-unit" aria-label="Välj enhet">
        ${available.map((x) => `<option value="${x.idx}" ${x.idx === u.idx ? 'selected' : ''}>Enhet ${x.idx + 1}: ${esc(x.title)}</option>`).join('')}
      </select>
    </div>
    <div class="write-grid">
      ${writeState.tab === 'write' ? writeTasks : qaTasks}
      ${writeState.tab === 'write' && texts.length ? `
      <section class="panel saved">
        <h2 class="panel-title">${icon('book')} Dina sparade texter</h2>
        ${texts.map((t) => `<blockquote lang="${c.tts}">${esc(t.text)}<cite>${esc(t.date)}</cite></blockquote>`).join('')}
      </section>` : ''}
    </div>
    <p class="muted small center">Fler uppgifter låses upp när du kommer vidare i kursen.</p>`, '#/skriv');
}

function accentRow(c) {
  const chars = c.id === 'fr' ? ['é', 'è', 'ê', 'à', 'ç', 'ô', 'î', 'ù', 'œ'] : ['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'];
  return `<div class="accents left">${chars.map((ch) => `<button class="accent" data-act="w-accent" data-char="${ch}" tabindex="-1">${ch}</button>`).join('')}</div>`;
}

/* ---------- Profil ---------- */

function profileView() {
  const c = activeCourse();
  const p = progress(c.id);
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ k: dayKey(d), label: ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'][d.getDay()], xp: state.xp[dayKey(d)] || 0 });
  }
  const max = Math.max(dailyGoal(), ...days.map((d) => d.xp));
  const learned = allWords(c).filter((w) => isLearned(c.id, w.id)).length;
  const seen = Object.keys(p.words).length;
  const mine = Object.keys(state.courses).filter((id) => state.courses[id].plan && COURSE_DATA[id]);

  return shell(`
    <div class="page-head">
      <span class="eyebrow">Profil</span>
      <h1>Dina framsteg</h1>
    </div>
    <div class="stat-row">
      <div class="panel big-stat">${icon('flame')}<strong>${streak()}</strong><span>dagar i rad</span></div>
      <div class="panel big-stat">${icon('bolt')}<strong>${xpTotal()}</strong><span>XP totalt</span></div>
      <div class="panel big-stat">${icon('book')}<strong>${courseProgress(c).done}</strong><span>lektioner klara</span></div>
      <div class="panel big-stat">${icon('star')}<strong>${learned}</strong><span>ord du kan av ${seen} sedda</span></div>
    </div>
    <div class="layout-2 even">
      <section class="panel">
        <h2 class="panel-title">${icon('bolt')} XP senaste veckan</h2>
        <div class="chart" role="img" aria-label="XP per dag senaste sju dagarna">
          <div class="goal-mark" style="bottom:${dailyGoal() / max * 100}%"><span>mål ${dailyGoal()}</span></div>
          ${days.map((d) => `<div class="col ${d.k === dayKey() ? 'today' : ''}"><span class="val">${d.xp || ''}</span><div class="barv" style="height:${d.xp / max * 100}%"></div><span class="lbl">${d.label}</span></div>`).join('')}
        </div>
      </section>
      <section class="panel">
        <h2 class="panel-title">${icon('settings')} Inställningar</h2>
        <h3 class="mini-title">Dagligt mål för ${esc(c.name.toLowerCase())}</h3>
        <div class="seg full">${GOALS.map((g) => `<button class="${dailyGoal() === g.xp ? 'on' : ''}" data-act="set-goal" data-v="${g.xp}">${g.xp} XP</button>`).join('')}</div>
        <h3 class="mini-title">Uppläsning</h3>
        <button class="toggle ${state.settings.tts ? 'on' : ''}" data-act="toggle-tts" aria-pressed="${state.settings.tts}"><span class="knob"></span>${state.settings.tts ? 'På: orden läses upp' : 'Av'}</button>
        <h3 class="mini-title">Kursen</h3>
        <div class="row-btns">
          <a class="btn ghost small" href="#/kurser">${icon('globe')} Byt eller lägg till kurs</a>
          <button class="btn ghost small danger" data-act="reset-course">${icon('trash')} Börja om ${esc(c.name.toLowerCase())}</button>
        </div>
      </section>
    </div>
    <section class="panel">
      <h2 class="panel-title">${icon('globe')} Dina kurser</h2>
      <div class="course-rows">${mine.map((id) => {
        const cc = COURSE_DATA[id];
        const pr = courseProgress(cc);
        return `<div class="course-row"><span class="lang-stamp small">${esc(cc.code)}</span><strong>${esc(cc.name)}</strong>
          <div class="progress"><div class="bar" style="width:${pr.done / pr.total * 100}%"></div></div><span class="muted small">${pr.done}/${pr.total}</span>
          ${id === state.active ? '<em class="tag on">Aktiv</em>' : `<button class="btn ghost small" data-act="switch" data-id="${id}">Byt</button>`}</div>`;
      }).join('')}</div>
    </section>`, '#/profil');
}

function notFound() {
  return shell(`<div class="page-head"><h1>Sidan finns inte</h1><p><a href="#/kurs">Till kursvägen</a></p></div>`, '');
}

/* ---------- Dialogruta ---------- */

function showModal({ title, text, ok, cancel, onOk, danger }) {
  closeModal();
  const wrap = document.createElement('div');
  wrap.className = 'modal';
  wrap.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">${esc(title)}</h2><p>${esc(text)}</p>
    <div class="row-btns end"><button class="btn ghost" data-m="cancel">${esc(cancel)}</button><button class="btn primary ${danger ? 'danger-fill' : ''}" data-m="ok">${esc(ok)}</button></div></div>`;
  wrap.addEventListener('click', (e) => {
    const m = e.target.closest('[data-m]')?.dataset.m;
    if (e.target === wrap || m === 'cancel') closeModal();
    if (m === 'ok') { closeModal(); onOk(); }
  });
  document.body.append(wrap);
  wrap.querySelector('[data-m="ok"]').focus();
}

function closeModal() { document.querySelector('.modal')?.remove(); }
