/* Badges and their unlock criteria.
   The check function receives the live state and returns true if earned. */

window.BADGES = [
  {
    id: "first_step",
    name: "First Step",
    desc: "Finish your first lesson",
    ico: "🌱",
    check: (s) => s.completedLessons.length >= 1
  },
  {
    id: "week_one",
    name: "Foundations",
    desc: "Finish all of Week 1",
    ico: "🏗️",
    check: (s) => (window.LESSONS || []).filter(l => l.week === 1).every(l => s.completedLessons.includes(l.id))
  },
  {
    id: "week_two",
    name: "Data Smith",
    desc: "Finish all of Week 2",
    ico: "🧱",
    check: (s) => (window.LESSONS || []).filter(l => l.week === 2).every(l => s.completedLessons.includes(l.id))
  },
  {
    id: "week_three",
    name: "OOP Adept",
    desc: "Finish all of Week 3",
    ico: "🛠️",
    check: (s) => (window.LESSONS || []).filter(l => l.week === 3).every(l => s.completedLessons.includes(l.id))
  },
  {
    id: "week_four",
    name: "Pythonista",
    desc: "Finish all of Week 4",
    ico: "🐍",
    check: (s) => (window.LESSONS || []).filter(l => l.week === 4).every(l => s.completedLessons.includes(l.id))
  },
  {
    id: "first_solve",
    name: "First Solve",
    desc: "Mark your first problem solved",
    ico: "✅",
    check: (s) => s.solvedProblems.length >= 1
  },
  {
    id: "ten_solves",
    name: "Problem Crusher",
    desc: "Solve 10 problems",
    ico: "💪",
    check: (s) => s.solvedProblems.length >= 10
  },
  {
    id: "twenty_solves",
    name: "Interview Ready",
    desc: "Solve 20 problems",
    ico: "🎯",
    check: (s) => s.solvedProblems.length >= 20
  },
  {
    id: "all_easy",
    name: "Easy Sweep",
    desc: "Solve every easy problem",
    ico: "🟢",
    check: (s) => (window.PROBLEMS || []).filter(p => p.difficulty === "easy").every(p => s.solvedProblems.includes(p.id))
  },
  {
    id: "all_hard",
    name: "Boss Slayer",
    desc: "Solve every hard problem",
    ico: "🔥",
    check: (s) => (window.PROBLEMS || []).filter(p => p.difficulty === "hard").every(p => s.solvedProblems.includes(p.id))
  },
  {
    id: "streak_3",
    name: "On a Roll",
    desc: "Reach a 3 day streak",
    ico: "⚡",
    check: (s) => s.streak >= 3
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    desc: "Reach a 7 day streak",
    ico: "🌟",
    check: (s) => s.streak >= 7
  },
  {
    id: "streak_14",
    name: "Two Week Titan",
    desc: "Reach a 14 day streak",
    ico: "🏔️",
    check: (s) => s.streak >= 14
  },
  {
    id: "streak_30",
    name: "Month Master",
    desc: "Reach a 30 day streak",
    ico: "👑",
    check: (s) => s.streak >= 30
  },
  {
    id: "level_5",
    name: "Level 5",
    desc: "Hit level 5",
    ico: "✨",
    check: (s) => s.level >= 5
  },
  {
    id: "level_10",
    name: "Level 10",
    desc: "Hit level 10",
    ico: "💎",
    check: (s) => s.level >= 10
  },
  {
    id: "all_lessons",
    name: "Graduate",
    desc: "Finish every lesson",
    ico: "🎓",
    check: (s) => (window.LESSONS || []).every(l => s.completedLessons.includes(l.id))
  }
];
