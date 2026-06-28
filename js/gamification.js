/* PyQuest gamification.
   - All state lives in localStorage under 'pyquest:v1'.
   - Streaks update on any meaningful activity (finishing a lesson or solving a problem).
   - XP and badges persist until the user taps Reset or clears site data.
*/

(function () {
  const KEY = "pyquest:v1";

  const defaultState = {
    xp: 0,
    level: 1,
    streak: 0,
    lastActiveDate: null,            // ISO date string yyyy-mm-dd
    activeDays: [],                  // list of yyyy-mm-dd strings the user touched
    completedLessons: [],            // lesson ids
    solvedProblems: [],              // problem ids
    bookmarkedProblems: [],          // problem ids
    notes: {},                       // lessonId -> string
    badges: [],                      // earned badge ids
    theme: "dark"
  };

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch (e) {
      return { ...defaultState };
    }
  }

  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* storage may be full or disabled */ }
  }

  function todayISO() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function daysBetween(a, b) {
    if (!a || !b) return null;
    const ms = 24 * 60 * 60 * 1000;
    return Math.round((new Date(b) - new Date(a)) / ms);
  }

  function xpForNextLevel(level) {
    // gentle curve: 100, 150, 220, 320, 460 ...
    return Math.floor(100 * Math.pow(1.4, level - 1));
  }

  function recalcLevel(state) {
    let needed = xpForNextLevel(state.level);
    while (state.xp >= needed) {
      state.xp -= needed;
      state.level += 1;
      needed = xpForNextLevel(state.level);
    }
    return state;
  }

  function touchStreak(state) {
    const today = todayISO();
    if (state.lastActiveDate === today) return state;
    const gap = daysBetween(state.lastActiveDate, today);
    if (gap === 1 || state.lastActiveDate === null) {
      state.streak = state.lastActiveDate === null ? 1 : state.streak + 1;
    } else if (gap > 1) {
      state.streak = 1;
    }
    state.lastActiveDate = today;
    if (!state.activeDays.includes(today)) state.activeDays.push(today);
    // keep only the last 60 days to stay tiny
    if (state.activeDays.length > 60) state.activeDays = state.activeDays.slice(-60);
    return state;
  }

  function checkBadges(state) {
    const newly = [];
    (window.BADGES || []).forEach(b => {
      if (!state.badges.includes(b.id) && b.check(state)) {
        state.badges.push(b.id);
        newly.push(b);
      }
    });
    return newly;
  }

  // Public API
  window.PyQuest = {
    load,
    save,
    todayISO,
    xpForNextLevel,
    recalcLevel,
    touchStreak,
    checkBadges,

    addXp(amount) {
      const s = load();
      s.xp += amount;
      recalcLevel(s);
      touchStreak(s);
      const newBadges = checkBadges(s);
      save(s);
      return { state: s, newBadges };
    },

    completeLesson(lessonId, xp) {
      const s = load();
      if (s.completedLessons.includes(lessonId)) {
        return { state: s, newBadges: [], alreadyDone: true };
      }
      s.completedLessons.push(lessonId);
      s.xp += xp;
      recalcLevel(s);
      touchStreak(s);
      const newBadges = checkBadges(s);
      save(s);
      return { state: s, newBadges, alreadyDone: false };
    },

    toggleSolved(problemId, xp) {
      const s = load();
      const i = s.solvedProblems.indexOf(problemId);
      if (i >= 0) {
        s.solvedProblems.splice(i, 1);
      } else {
        s.solvedProblems.push(problemId);
        s.xp += xp;
        recalcLevel(s);
        touchStreak(s);
      }
      const newBadges = checkBadges(s);
      save(s);
      return { state: s, newBadges, solved: i < 0 };
    },

    toggleBookmark(problemId) {
      const s = load();
      const i = s.bookmarkedProblems.indexOf(problemId);
      if (i >= 0) s.bookmarkedProblems.splice(i, 1);
      else s.bookmarkedProblems.push(problemId);
      save(s);
      return s;
    },

    setNote(lessonId, text) {
      const s = load();
      if (text && text.trim()) s.notes[lessonId] = text;
      else delete s.notes[lessonId];
      save(s);
    },

    setTheme(theme) {
      const s = load();
      s.theme = theme;
      save(s);
    },

    reset() {
      localStorage.removeItem(KEY);
    }
  };
})();
