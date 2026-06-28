# PyQuest

A gamified Python study web app for Java developers who want to feel confident in Python in 30 days. Static site, zero build step, host anywhere.

## What is inside

- 16 lessons across 4 weeks, each with a Java vs Python framing and key takeaways
- 30 curated problems, easy to hard, with hints, full solutions, and explanations
- Daily challenge that rotates each day
- XP, levels, day streak, badges, all saved in your browser
- Bookmarks, per lesson notes, global search across lessons, problems, and the cheatsheet
- Quick reference cheatsheet for the syntax you reach for daily
- Light and dark themes, iPhone first responsive layout, desktop layout with sticky search

## Run locally

This is a pure static site. Open `index.html` in any modern browser. If you want a real local server (recommended so hash routing behaves perfectly):

```
# Python (any version)
python -m http.server 5500

# Node
npx serve .
```

Then visit `http://localhost:5500`.

## Hosting

### GitHub Pages

1. Create a public repo, push these files at the root.
2. In the repo settings, Pages, set the source to `main` branch, `/ (root)`.
3. Your app is live at `https://<username>.github.io/<repo>`.

### Netlify

1. Drag and drop the `pyquest` folder onto the Netlify dashboard.
2. Done.

### Vercel

1. Import the folder as a project.
2. Framework preset: Other. Output directory: leave blank. Deploy.

### Cloudflare Pages

1. Create a project, point it at this folder. No build command needed.

## Project layout

```
pyquest/
  index.html
  css/
    styles.css
  js/
    app.js              main SPA logic
    gamification.js     XP, level, streak, badges, localStorage
    data/
      lessons.js        16 lessons
      problems.js       30 problems
      badges.js         badge definitions
      cheatsheet.js     quick reference
  README.md
```

## Persistence

Everything saves to `localStorage` under the key `pyquest:v1`. That includes XP, level, streak, completed lessons, solved problems, bookmarks, notes, badges, and theme choice. The data sticks around until:

- you tap the Reset button in the top bar
- you clear site data in your browser
- you open the app in a different browser or device (storage is per browser)

Streak rules: any time you finish a lesson or mark a problem solved, today is recorded as an active day. If your previous active day was yesterday, the streak grows. Miss a day and the streak resets to 1 on your next activity.

## Curriculum

**Week 1, Foundations**
1. Hello, Python
2. Variables and types
3. Operators and expressions
4. Control flow

**Week 2, Data structures**
5. Strings, deeply
6. Lists
7. Tuples and sets
8. Dictionaries

**Week 3, Functions and OOP**
9. Functions
10. Lambdas, map, filter
11. Classes and OOP
12. Inheritance and magic methods

**Week 4, Pythonic patterns**
13. Exceptions and file I/O
14. Modules and packages
15. Comprehensions
16. Pythonic patterns

## Extending the content

Adding lessons or problems is a one-file edit.

- Lessons: append to the array in `js/data/lessons.js`. Use the same object shape.
- Problems: append to `js/data/problems.js`.
- Badges: add a new entry to `js/data/badges.js` with a `check(state)` function.
- Cheatsheet: append to `js/data/cheatsheet.js`.

No rebuild needed, just refresh the page.

## Keyboard shortcuts

- `/` focuses the search box on desktop
- `Esc` closes search results

## License

Do whatever you want with it. Have fun.
