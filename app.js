/* PyQuest app.
   Tiny vanilla SPA with hash routing.
*/

(function () {
  const view = document.getElementById("view");
  const toastEl = document.getElementById("toast");

  /* ============ Render helpers ============ */
  function setHash(hash) { history.replaceState(null, "", hash); render(); }
  function getRoute() {
    const h = location.hash.replace(/^#\/?/, "") || "home";
    const [name, ...rest] = h.split("/");
    return { name, params: rest };
  }

  function escape(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove("hidden");
    requestAnimationFrame(() => toastEl.classList.add("show"));
    setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.classList.add("hidden"), 300);
    }, 2200);
  }

  /* ============ Stats bar ============ */
  function refreshStats(state) {
    const need = PyQuest.xpForNextLevel(state.level);
    const pct = Math.min(100, Math.round((state.xp / need) * 100));

    document.getElementById("stat-level").textContent = state.level;
    document.getElementById("stat-streak").textContent = state.streak;
    const ringText = document.getElementById("ring-text");
    if (ringText) ringText.textContent = state.xp;
    const ring = document.getElementById("xp-ring");
    if (ring) ring.style.strokeDashoffset = (100 - pct).toString();

    // mobile
    const lvlM = document.getElementById("stat-level-m");
    const stkM = document.getElementById("stat-streak-m");
    const xpFillM = document.getElementById("m-xp-fill");
    const xpTextM = document.getElementById("m-xp-text");
    if (lvlM) lvlM.textContent = state.level;
    if (stkM) stkM.textContent = state.streak;
    if (xpFillM) xpFillM.style.width = pct + "%";
    if (xpTextM) xpTextM.textContent = `${state.xp}/${need}`;
  }

  /* ============ Confetti (lightweight) ============ */
  function confettiBurst() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#8b7cff", "#4ee0c1", "#ff7eb6", "#ffc36b"];
    const N = 100;
    const parts = [];
    for (let i = 0; i < N; i++) {
      parts.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 6 + 4,
        color: colors[i % colors.length],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 1
      });
    }
    let frames = 0;
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach(p => {
        p.vy += 0.45;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.012;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.4);
        ctx.restore();
      });
      frames++;
      if (frames < 110) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    tick();
  }

  function celebrate(newBadges) {
    confettiBurst();
    if (newBadges && newBadges.length) {
      const b = newBadges[0];
      toast(`${b.ico} Badge unlocked: ${b.name}`);
    } else {
      toast("Nice work, XP added");
    }
  }

  /* ============ Views ============ */
  function renderHome(state) {
    const totalLessons = LESSONS.length;
    const doneLessons = state.completedLessons.length;
    const totalProblems = PROBLEMS.length;
    const doneProblems = state.solvedProblems.length;

    // pick the next lesson to do
    const nextLesson = LESSONS.find(l => !state.completedLessons.includes(l.id));

    // daily challenge: rotate based on day-of-year
    const day = new Date();
    const start = new Date(day.getFullYear(), 0, 0);
    const diff = day - start;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const daily = PROBLEMS[dayOfYear % PROBLEMS.length];

    // last 7 days streak grid
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      days.push({
        iso,
        label: d.toLocaleDateString(undefined, { weekday: "short" })[0],
        date: d.getDate(),
        active: state.activeDays.includes(iso),
        today: iso === PyQuest.todayISO()
      });
    }

    view.innerHTML = `
      <section class="hero">
        <h2>Welcome back, time to learn Python</h2>
        <p class="sub">${nextLesson ? `Up next: <b>${escape(nextLesson.title)}</b>` : "Every lesson finished. You are a Pythonista."}</p>
        <div class="hero-row">
          ${nextLesson ? `<button class="btn primary" data-go="#/lesson/${nextLesson.id}">Continue lesson</button>` : ""}
          <button class="btn" data-go="#/problem/${daily.id}">Daily challenge</button>
        </div>
      </section>

      <div class="daily-card">
        <div class="panel">
          <h3>Daily challenge</h3>
          <div style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
            <div>
              <h4 style="margin:0 0 4px; font-size:16px;">${escape(daily.title)}</h4>
              <p style="margin:0; color:var(--muted); font-size:13px;">${escape(daily.topic)}</p>
            </div>
            <span class="pill ${daily.difficulty}">${daily.difficulty.toUpperCase()}</span>
          </div>
          <div style="margin-top:14px;">
            <button class="btn primary" data-go="#/problem/${daily.id}">Try it now</button>
          </div>
        </div>

        <div class="panel">
          <h3>Streak, last 7 days</h3>
          <div class="streak-cal">
            ${days.map(d => `
              <div class="streak-cell ${d.active ? "active" : ""} ${d.today ? "today" : ""}" title="${d.iso}">
                <span>${d.date}</span>
              </div>
            `).join("")}
          </div>
          <p style="margin: 12px 0 0; color: var(--muted); font-size: 12px;">
            Open the app and finish anything today to keep your streak alive.
          </p>
        </div>
      </div>

      <div class="progress-grid">
        <div class="tile"><div class="num">${doneLessons}/${totalLessons}</div><div class="lbl">Lessons done</div></div>
        <div class="tile"><div class="num">${doneProblems}/${totalProblems}</div><div class="lbl">Problems solved</div></div>
        <div class="tile"><div class="num">${state.badges.length}</div><div class="lbl">Badges</div></div>
        <div class="tile"><div class="num">${state.streak}</div><div class="lbl">Day streak</div></div>
      </div>
    `;
    wireGoButtons();
  }

  function renderLearn(state) {
    const weeks = [1, 2, 3, 4];
    const titles = { 1: "Week 1 - Foundations", 2: "Week 2 - Data structures", 3: "Week 3 - Functions and OOP", 4: "Week 4 - Pythonic patterns" };

    view.innerHTML = `
      <header class="view-header">
        <h2 class="view-title">Learn</h2>
        <p class="view-sub">16 lessons. Each one short, designed to build on the last.</p>
      </header>
      ${weeks.map(w => {
        const weekLessons = LESSONS.filter(l => l.week === w);
        const done = weekLessons.filter(l => state.completedLessons.includes(l.id)).length;
        const pct = Math.round((done / weekLessons.length) * 100);
        // unlock rule: a lesson is unlocked if all prior lessons across all weeks are done OR if it is the first of week 1
        return `
        <section class="week-section">
          <div class="week-header">
            <h2>${titles[w]}</h2>
            <div class="week-progress">
              <div class="mini-bar"><span style="width:${pct}%"></span></div>
              <span>${done}/${weekLessons.length}</span>
            </div>
          </div>
          <div class="card-grid">
            ${weekLessons.map(l => {
              const idx = LESSONS.indexOf(l);
              const prior = LESSONS.slice(0, idx);
              const unlocked = prior.every(p => state.completedLessons.includes(p.id));
              const done = state.completedLessons.includes(l.id);
              return `
                <div class="card ${done ? "done" : ""} ${unlocked ? "" : "locked"}" data-go="${unlocked ? `#/lesson/${l.id}` : ""}">
                  <h3>${escape(l.title)}</h3>
                  <p>${escape(l.blurb)}</p>
                  <div class="card-meta">
                    <span class="pill">${l.minutes} min</span>
                    <span class="pill">+${l.xp} XP</span>
                    ${unlocked ? "" : '<span class="pill">Locked</span>'}
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </section>
      `;
      }).join("")}
    `;
    wireGoButtons();
  }

  function renderLesson(state, id) {
    const lesson = LESSONS.find(l => l.id === id);
    if (!lesson) { view.innerHTML = `<div class="empty"><h3>Lesson not found</h3></div>`; return; }
    const done = state.completedLessons.includes(id);
    const idx = LESSONS.indexOf(lesson);
    const prev = LESSONS[idx - 1];
    const next = LESSONS[idx + 1];
    const noteText = state.notes[id] || "";

    view.innerHTML = `
      <article class="lesson">
        <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
          <span class="pill">Week ${lesson.week}</span>
          <span class="pill">${lesson.minutes} min</span>
          <span class="pill">+${lesson.xp} XP</span>
        </div>
        <h2>${escape(lesson.title)}</h2>
        <p style="color:var(--muted); margin: 0 0 8px;">${escape(lesson.blurb)}</p>
        ${lesson.content}

        <div class="notes">
          <h3>Your notes</h3>
          <textarea id="lesson-note" placeholder="Anything you want to remember about this lesson..."></textarea>
        </div>

        <div class="lesson-actions">
          <button class="btn" ${prev ? `data-go="#/lesson/${prev.id}"` : "disabled"}>← Previous</button>
          <div style="display:flex; gap:10px;">
            <button class="btn primary" id="btn-complete" ${done ? "disabled" : ""}>
              ${done ? "Completed ✓" : `Mark complete (+${lesson.xp} XP)`}
            </button>
            ${next ? `<button class="btn" data-go="#/lesson/${next.id}">Next →</button>` : ""}
          </div>
        </div>
      </article>
    `;
    wireGoButtons();

    const noteEl = document.getElementById("lesson-note");
    noteEl.value = noteText;
    let saveT;
    noteEl.addEventListener("input", () => {
      clearTimeout(saveT);
      saveT = setTimeout(() => PyQuest.setNote(id, noteEl.value), 400);
    });

    const btn = document.getElementById("btn-complete");
    if (btn && !done) {
      btn.addEventListener("click", () => {
        const { state, newBadges } = PyQuest.completeLesson(id, lesson.xp);
        refreshStats(state);
        celebrate(newBadges);
        setTimeout(() => render(), 600);
      });
    }
  }

  function renderPractice(state) {
    const params = new URLSearchParams(location.hash.split("?")[1] || "");
    const filter = params.get("filter") || "all";

    const filters = [
      { key: "all", label: "All" },
      { key: "easy", label: "Easy" },
      { key: "med", label: "Medium" },
      { key: "hard", label: "Hard" },
      { key: "solved", label: "Solved" },
      { key: "unsolved", label: "Unsolved" },
      { key: "bookmarked", label: "Bookmarked" }
    ];

    let list = PROBLEMS.slice();
    if (filter === "easy" || filter === "med" || filter === "hard") {
      list = list.filter(p => p.difficulty === filter);
    } else if (filter === "solved") {
      list = list.filter(p => state.solvedProblems.includes(p.id));
    } else if (filter === "unsolved") {
      list = list.filter(p => !state.solvedProblems.includes(p.id));
    } else if (filter === "bookmarked") {
      list = list.filter(p => state.bookmarkedProblems.includes(p.id));
    }

    view.innerHTML = `
      <header class="view-header">
        <h2 class="view-title">Practice</h2>
        <p class="view-sub">${PROBLEMS.length} curated problems. Hints, full solutions, and explanations.</p>
      </header>
      <div class="filter-bar">
        ${filters.map(f => `
          <button class="filter ${filter === f.key ? "active" : ""}" data-filter="${f.key}">${f.label}</button>
        `).join("")}
      </div>
      ${list.length ? `
        <div class="card-grid">
          ${list.map(p => {
            const solved = state.solvedProblems.includes(p.id);
            const bookmarked = state.bookmarkedProblems.includes(p.id);
            return `
              <div class="card ${solved ? "done" : ""}" data-go="#/problem/${p.id}">
                <h3>${escape(p.title)}</h3>
                <p>${escape(p.topic)}</p>
                <div class="card-meta">
                  <span class="pill ${p.difficulty}">${p.difficulty.toUpperCase()}</span>
                  ${solved ? '<span class="pill solved">Solved</span>' : ""}
                  ${bookmarked ? '<span class="pill book">★</span>' : ""}
                </div>
              </div>
            `;
          }).join("")}
        </div>
      ` : `<div class="empty"><h3>Nothing here yet</h3><p>Try a different filter.</p></div>`}
    `;

    wireGoButtons();
    view.querySelectorAll(".filter").forEach(b => {
      b.addEventListener("click", () => {
        setHash("#/practice?filter=" + b.dataset.filter);
      });
    });
  }

  function renderProblem(state, id) {
    const p = PROBLEMS.find(x => x.id === id);
    if (!p) { view.innerHTML = `<div class="empty"><h3>Problem not found</h3></div>`; return; }
    const solved = state.solvedProblems.includes(id);
    const bookmarked = state.bookmarkedProblems.includes(id);

    view.innerHTML = `
      <article class="problem">
        <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
          <span class="pill ${p.difficulty}">${p.difficulty.toUpperCase()}</span>
          <span class="pill">${escape(p.topic)}</span>
          ${solved ? '<span class="pill solved">Solved ✓</span>' : ""}
        </div>
        <h2>${escape(p.title)}</h2>
        <p class="desc">${escape(p.statement)}</p>

        <div class="examples">
          <h4>Examples</h4>
          ${p.examples.map(ex => `
            <pre><code>Input:  ${escape(ex.input)}\nOutput: ${escape(ex.output)}</code></pre>
          `).join("")}
        </div>

        <details class="toggle-section">
          <summary>Show hints</summary>
          <div class="body">
            <ol>
              ${p.hints.map(h => `<li>${h}</li>`).join("")}
            </ol>
          </div>
        </details>

        <details class="toggle-section">
          <summary>Show solution</summary>
          <div class="body">
            <pre><code>${escape(p.solution)}</code></pre>
          </div>
        </details>

        <details class="toggle-section">
          <summary>Show explanation</summary>
          <div class="body">
            <p>${p.explanation}</p>
          </div>
        </details>

        <div class="problem-actions">
          <div style="display:flex; gap:10px;">
            <button class="icon-toggle ${bookmarked ? "active" : ""}" id="btn-bookmark" title="Bookmark">
              <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 3h12v18l-6-4-6 4z"/></svg>
            </button>
            <button class="btn primary" id="btn-solved">
              ${solved ? "Mark unsolved" : `Mark solved (+${xpFor(p.difficulty)} XP)`}
            </button>
          </div>
          <button class="btn" data-go="#/practice">Back to list</button>
        </div>
      </article>
    `;
    wireGoButtons();

    document.getElementById("btn-bookmark").addEventListener("click", () => {
      const s = PyQuest.toggleBookmark(id);
      refreshStats(s);
      render();
    });
    document.getElementById("btn-solved").addEventListener("click", () => {
      const { state, newBadges, solved } = PyQuest.toggleSolved(id, xpFor(p.difficulty));
      refreshStats(state);
      if (solved) celebrate(newBadges);
      else toast("Marked unsolved");
      setTimeout(() => render(), 500);
    });
  }

  function xpFor(diff) {
    return diff === "easy" ? 15 : diff === "med" ? 30 : 50;
  }

  function renderCheats() {
    view.innerHTML = `
      <header class="view-header">
        <h2 class="view-title">Cheatsheet</h2>
        <p class="view-sub">The syntax you will reach for every day.</p>
      </header>
      <div class="cheat-grid">
        ${CHEATSHEET.map(c => `
          <div class="cheat-card">
            <h3>${escape(c.title)}</h3>
            <pre><code>${escape(c.code)}</code></pre>
          </div>
        `).join("")}
      </div>
    `;
  }

  function renderProgress(state) {
    const totalLessons = LESSONS.length;
    const doneLessons = state.completedLessons.length;
    const totalProblems = PROBLEMS.length;
    const doneProblems = state.solvedProblems.length;
    const totalXp = state.xp + sumAcrossLevels(state.level);

    function sumAcrossLevels(lvl) {
      let total = 0;
      for (let i = 1; i < lvl; i++) total += PyQuest.xpForNextLevel(i);
      return total;
    }

    const easySolved = PROBLEMS.filter(p => p.difficulty === "easy" && state.solvedProblems.includes(p.id)).length;
    const medSolved = PROBLEMS.filter(p => p.difficulty === "med" && state.solvedProblems.includes(p.id)).length;
    const hardSolved = PROBLEMS.filter(p => p.difficulty === "hard" && state.solvedProblems.includes(p.id)).length;
    const easyTotal = PROBLEMS.filter(p => p.difficulty === "easy").length;
    const medTotal = PROBLEMS.filter(p => p.difficulty === "med").length;
    const hardTotal = PROBLEMS.filter(p => p.difficulty === "hard").length;

    view.innerHTML = `
      <header class="view-header">
        <h2 class="view-title">Your progress</h2>
        <p class="view-sub">Everything is saved locally on this device.</p>
      </header>

      <div class="progress-grid">
        <div class="tile"><div class="num">${state.level}</div><div class="lbl">Level</div></div>
        <div class="tile"><div class="num">${totalXp}</div><div class="lbl">Total XP</div></div>
        <div class="tile"><div class="num">${state.streak}</div><div class="lbl">Streak</div></div>
        <div class="tile"><div class="num">${state.badges.length}/${BADGES.length}</div><div class="lbl">Badges</div></div>
      </div>

      <div class="panel" style="margin-bottom:22px;">
        <h3>Lesson progress</h3>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="mini-bar" style="flex:1; height:8px;"><span style="width:${Math.round((doneLessons/totalLessons)*100)}%"></span></div>
          <b>${doneLessons}/${totalLessons}</b>
        </div>
      </div>

      <div class="panel" style="margin-bottom:22px;">
        <h3>Problem progress</h3>
        ${[
          { lbl: "Easy", v: easySolved, t: easyTotal, cls: "easy" },
          { lbl: "Medium", v: medSolved, t: medTotal, cls: "med" },
          { lbl: "Hard", v: hardSolved, t: hardTotal, cls: "hard" }
        ].map(row => `
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
            <span class="pill ${row.cls}" style="width:74px; justify-content:center;">${row.lbl}</span>
            <div class="mini-bar" style="flex:1; height:6px;"><span style="width:${row.t ? Math.round((row.v/row.t)*100) : 0}%"></span></div>
            <b style="min-width:40px; text-align:right;">${row.v}/${row.t}</b>
          </div>
        `).join("")}
      </div>

      <h3 style="margin: 22px 0 12px;">Badges</h3>
      <div class="badges-grid">
        ${BADGES.map(b => {
          const earned = state.badges.includes(b.id);
          return `
            <div class="badge ${earned ? "earned" : ""}" title="${escape(b.desc)}">
              <div class="ico">${b.ico}</div>
              <div class="name">${escape(b.name)}</div>
              <div class="desc">${escape(b.desc)}</div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  /* ============ Search ============ */
  function searchAll(q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    const results = [];
    LESSONS.forEach(l => {
      if (l.title.toLowerCase().includes(q) || l.blurb.toLowerCase().includes(q)) {
        results.push({ kind: "Lesson", title: l.title, sub: `Week ${l.week} · ${l.blurb}`, href: `#/lesson/${l.id}` });
      }
    });
    PROBLEMS.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q)) {
        results.push({ kind: "Problem", title: p.title, sub: `${p.difficulty.toUpperCase()} · ${p.topic}`, href: `#/problem/${p.id}` });
      }
    });
    CHEATSHEET.forEach(c => {
      if (c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)) {
        results.push({ kind: "Cheat", title: c.title, sub: "Cheatsheet section", href: `#/cheats` });
      }
    });
    return results.slice(0, 30);
  }

  function renderSearchResults(q, container) {
    const results = searchAll(q);
    if (!q) { container.innerHTML = ""; return; }
    if (!results.length) {
      container.innerHTML = `<div class="empty"><h3>Nothing matches</h3><p>Try a different keyword.</p></div>`;
      return;
    }
    container.innerHTML = results.map(r => `
      <div class="search-result" data-go="${r.href}">
        <b>${escape(r.title)}</b> <span style="color:var(--muted); font-size:11.5px;">· ${r.kind}</span>
        <small>${escape(r.sub)}</small>
      </div>
    `).join("");
    container.querySelectorAll(".search-result").forEach(el => {
      el.addEventListener("click", () => {
        setHash(el.dataset.go);
        closeSearchSheet();
      });
    });
  }

  function openSearchSheet() {
    const sheet = document.getElementById("search-sheet");
    sheet.hidden = false;
    document.body.style.overflow = "hidden";
    const input = document.getElementById("global-search-m");
    setTimeout(() => input.focus(), 50);
  }
  function closeSearchSheet() {
    const sheet = document.getElementById("search-sheet");
    sheet.hidden = true;
    document.body.style.overflow = "";
  }

  /* ============ Wire-up ============ */
  function wireGoButtons() {
    view.querySelectorAll("[data-go]").forEach(el => {
      const dest = el.getAttribute("data-go");
      if (!dest) return;
      el.addEventListener("click", e => {
        e.preventDefault();
        setHash(dest);
      });
    });
  }

  function highlightTabs() {
    const route = getRoute().name;
    const map = { home: "home", learn: "learn", lesson: "learn", practice: "practice", problem: "practice", cheats: "cheats", progress: "progress" };
    const tab = map[route] || "home";
    document.querySelectorAll(".tab[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === tab));
    document.querySelectorAll(".tabbar-btn[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === tab));
  }

  function render() {
    const state = PyQuest.load();
    document.documentElement.dataset.theme = state.theme || "dark";
    refreshStats(state);
    const { name, params } = getRoute();

    switch (name) {
      case "home": renderHome(state); break;
      case "learn": renderLearn(state); break;
      case "lesson": renderLesson(state, params[0]); break;
      case "practice": renderPractice(state); break;
      case "problem": renderProblem(state, params[0]); break;
      case "cheats": renderCheats(); break;
      case "progress": renderProgress(state); break;
      default: renderHome(state);
    }
    highlightTabs();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  /* ============ Boot ============ */
  function boot() {
    // tabs (desktop and mobile)
    document.querySelectorAll(".tab[data-view], .tabbar-btn[data-view]").forEach(btn => {
      btn.addEventListener("click", () => {
        setHash("#/" + btn.dataset.view);
      });
    });

    // reset
    document.getElementById("btn-reset").addEventListener("click", () => {
      if (confirm("Reset all progress, badges, and notes? This cannot be undone.")) {
        PyQuest.reset();
        location.hash = "#/home";
        render();
        toast("Progress wiped");
      }
    });

    // theme
    document.getElementById("btn-theme").addEventListener("click", () => {
      const cur = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = cur;
      PyQuest.setTheme(cur);
    });

    // desktop search
    const searchInput = document.getElementById("global-search");
    let overlay;
    searchInput.addEventListener("input", e => {
      const q = e.target.value;
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "search-results";
        overlay.style.cssText = "position:fixed; top:64px; left:50%; transform:translateX(-50%); width:min(640px, 92vw); background:var(--bg-1); border:1px solid var(--border); border-radius:14px; padding:10px; backdrop-filter: blur(20px); z-index:100; box-shadow: var(--shadow-lg); max-height:60vh; overflow-y:auto;";
        document.body.appendChild(overlay);
      }
      renderSearchResults(q, overlay);
      overlay.style.display = q ? "flex" : "none";
    });
    document.addEventListener("click", e => {
      if (overlay && !overlay.contains(e.target) && e.target !== searchInput) {
        overlay.style.display = "none";
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === "Escape" && overlay) overlay.style.display = "none";
    });

    // mobile search
    const searchBtn = document.getElementById("btn-search-m");
    if (searchBtn) {
      searchBtn.addEventListener("click", openSearchSheet);
    }
    const searchClose = document.getElementById("search-close");
    if (searchClose) searchClose.addEventListener("click", closeSearchSheet);
    const searchInputM = document.getElementById("global-search-m");
    if (searchInputM) {
      searchInputM.addEventListener("input", e => {
        renderSearchResults(e.target.value, document.getElementById("search-results"));
      });
    }

    window.addEventListener("hashchange", render);
    render();
  }

  // run after DOM ready (script is at end of body, but be safe)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
