/* The blunt test. State per question is 0 (no), 1 (yes, unprovable), 2 (yes, with
 * an artefact). Only 2 counts as a full point, which is the entire point. */
(() => {
  const $ = (s) => document.querySelector(s);
  const QS = window.QUESTIONS || [];
  const KEY = 'blunt.v1';
  const SECTIONS = [...new Set(QS.map((q) => q.section))];

  let state = JSON.parse(localStorage.getItem(KEY) || '{}');   // idx -> {v, note}
  let filter = 'all', onlyGaps = false;

  const esc = (s) => String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const val = (i) => (state[i] && state[i].v) || 0;
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));

  const BANDS = [
    [0.00, 'Nothing marked yet. Answer honestly — the list is the value, not the score.'],
    [0.15, 'You are competing on vocabulary. Everything on this page is still a claim.'],
    [0.35, 'You can build demos. Interviews will feel fine and offers will not arrive.'],
    [0.55, 'You can ship a small system. This is where most working engineers actually are.'],
    [0.75, 'Senior-hireable: you can show the number, the trace and the failure.'],
    [0.90, 'You could lead an AI system and defend it in a room of sceptics.'],
    [1.01, 'Either you are exceptional or you are marking yourself green without the artefact. Check again.'],
  ];

  function score() {
    const points = QS.reduce((s, _, i) => s + val(i), 0);
    const withEvidence = QS.filter((_, i) => val(i) === 2).length;
    const unanswered = QS.filter((_, i) => val(i) === 0).length;
    return { points, max: QS.length * 2, withEvidence, unanswered };
  }

  function renderScore() {
    const { points, max, withEvidence, unanswered } = score();
    const pct = points / max;
    $('#bar').style.width = (pct * 100).toFixed(1) + '%';
    $('#scoreNow').textContent = points;
    $('#scoreMax').textContent = max;
    $('#evidCount').textContent = withEvidence;
    $('#noCount').textContent = unanswered;
    const band = BANDS.find(([t]) => pct < t) || BANDS[BANDS.length - 1];
    $('#verdict').textContent = band[1];
  }

  function renderPlan() {
    const gaps = QS.map((q, i) => ({ q, i, v: val(i) }))
      .filter((x) => x.v < 2)
      .sort((a, b) => a.v - b.v)
      .slice(0, 5);
    $('#planCount').textContent = gaps.length ? 'next five, in order' : 'nothing left to build';
    $('#planlist').innerHTML = gaps.length
      ? gaps.map(({ q }) => `<li><b>${esc(q.q)}</b><br><em>Build:</em> ${esc(q.build)}</li>`).join('')
      : '<li>Every question has an artefact behind it. Go and get one of them reviewed by somebody who will disagree with you.</li>';
  }

  function renderFilters() {
    const chips = ['all', ...SECTIONS];
    $('#filters').innerHTML = chips.map((c) =>
      `<button class="fchip ${filter === c ? 'on' : ''}" data-f="${esc(c)}">${esc(c === 'all' ? 'all 48' : c)}</button>`).join('');
    $('#filters').querySelectorAll('.fchip').forEach((b) => b.onclick = () => { filter = b.dataset.f; render(); });
  }

  function render() {
    renderScore(); renderFilters(); renderPlan();

    const groups = SECTIONS.filter((s) => filter === 'all' || s === filter);
    $('#sections').innerHTML = groups.map((section) => {
      const items = QS.map((q, i) => ({ q, i })).filter(({ q, i }) => q.section === section && (!onlyGaps || val(i) < 2));
      if (!items.length) return '';
      return `<section class="sect">
        <div class="sect-head"><h2>${esc(section)}</h2>
          <span class="k">${items.filter(({ i }) => val(i) === 2).length} / ${items.length} evidenced</span></div>
        ${items.map(({ q, i }) => `
          <article class="q" data-i="${i}" data-state="${val(i)}">
            <div class="q-top">
              <span class="q-num">${String(i + 1).padStart(2, '0')}</span>
              <div>
                <p class="q-text">${esc(q.q)}</p>
                <p class="q-why">${esc(q.why)}</p>
                <div class="q-build"><b>if not, build this</b>${esc(q.build)}</div>
                <div class="states">
                  <button class="st" data-v="0">no</button>
                  <button class="st" data-v="1">yes, unprovable</button>
                  <button class="st" data-v="2">yes + artefact</button>
                </div>
                <div class="evidence"><span>what would you show?</span>
                  <input type="text" placeholder="a metric, a file, a run, a link…" value="${esc((state[i] && state[i].note) || '')}">
                </div>
              </div>
            </div>
          </article>`).join('')}
      </section>`;
    }).join('') || '<p class="hint">Nothing to show with these filters.</p>';

    $('#sections').querySelectorAll('.q').forEach((el) => {
      const i = +el.dataset.i;
      el.querySelectorAll('.st').forEach((b) => b.onclick = () => {
        state[i] = { v: +b.dataset.v, note: (state[i] && state[i].note) || '' };
        save(); render();
      });
      const input = el.querySelector('.evidence input');
      input.onchange = () => {
        state[i] = { v: (state[i] && state[i].v) || 2, note: input.value.trim() };
        save();
      };
    });
  }

  $('#onlyGaps').onchange = (e) => { onlyGaps = e.target.checked; render(); };

  $('#reset').onclick = () => {
    if (!confirm('Clear every answer in this browser?')) return;
    state = {}; save(); render();
  };

  $('#export').onclick = () => {
    const { points, max, withEvidence, unanswered } = score();
    const lines = [
      '# The blunt test — 48 questions', '',
      `Score: ${points} / ${max} evidence points · ${withEvidence} with an artefact · ${unanswered} unanswered`, '',
      ...SECTIONS.flatMap((section) => [
        `## ${section}`, '',
        ...QS.map((q, i) => ({ q, i })).filter(({ q }) => q.section === section).map(({ q, i }) => {
          const v = val(i);
          const mark = v === 2 ? '[x]' : v === 1 ? '[~]' : '[ ]';
          const note = state[i] && state[i].note ? ` — ${state[i].note}` : '';
          return `- ${mark} ${q.q}${note}
  - if not: ${q.build}`;
        }), '',
      ]),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'blunt-test-plan.md';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  render();
  document.documentElement.dataset.ready = '1';
})();
