# Portfolio Features — Integration Guide
# All 10 features, exactly where to paste each line.

## FILES DELIVERED
1. AIChatbot.tsx        — Gemini-powered chat widget
2. DevTerminal.tsx      — backtick-triggered hacker terminal
3. NowSection.tsx       — "what I'm doing now" live section
4. ShelfSection.tsx     — visual bookshelf + music shelf
5. BuildLog.tsx         — weekly devlog / build log
6. LiveDemoSection.tsx  — live project embeds in device frames
7. ScrollStory.tsx      — scroll-driven chapter storytelling
8. SkillConstellation.tsx — interactive skill bubble physics
9. ContextCursor.tsx    — context-aware cursor (replaces CinematicCursor)

---

## STEP 1 — Copy all .tsx files into src/components/
(ScrollStory, NowSection, ShelfSection, BuildLog, LiveDemoSection, SkillConstellation go to src/components/)
(AIChatbot, DevTerminal, ContextCursor also go to src/components/)

---

## STEP 2 — Update App.tsx

```tsx
// REPLACE:
import { CinematicCursor } from './components/CinematicCursor';
// WITH:
import { ContextCursor } from './components/ContextCursor';

// ADD these imports:
import { AIChatbot } from './components/AIChatbot';
import { DevTerminal } from './components/DevTerminal';

// REPLACE <CinematicCursor /> with:
<ContextCursor />

// ADD inside the !isLoading block, before </div>:
<AIChatbot />
<DevTerminal />
```

Final App.tsx structure inside Router:
```tsx
<Router>
  <ScrollToTop />
  <AnimatePresence>{isLoading && <Preloader ... />}</AnimatePresence>
  <div className="relative min-h-screen">
    <GlobalMeshBackground />
    <CinematicOverlay />
    <div className="noise-overlay" />
    <ContextCursor />          {/* ← replaces CinematicCursor */}
    {!isLoading && (
      <>
        <Navbar />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>...</Routes>
          </AnimatePresence>
        </main>
        <footer>...</footer>
        <AIChatbot />           {/* ← floats bottom-right */}
        <DevTerminal />         {/* ← press backtick ` to open */}
      </>
    )}
  </div>
</Router>
```

---

## STEP 3 — Add sections to Home.tsx

Import at top of src/pages/Home.tsx:
```tsx
import { NowSection } from '../components/NowSection';
import { ShelfSection } from '../components/ShelfSection';
import { BuildLog } from '../components/BuildLog';
import { LiveDemoSection } from '../components/LiveDemoSection';
import { ScrollStory } from '../components/ScrollStory';
import { SkillConstellation } from '../components/SkillConstellation';
```

Add sections AFTER the "04 // EXPERIMENT" section and BEFORE "05 // FOUNDATION":
```tsx
{/* SCROLL STORY — replaces or augments 05 */}
<ScrollStory />

{/* NOW SECTION */}
<NowSection />

{/* LIVE DEMOS */}
<LiveDemoSection />

{/* SKILL CONSTELLATION — alternative to SkillsUniverse on Skills page */}
<SkillConstellation />

{/* SHELF */}
<ShelfSection />

{/* BUILD LOG */}
<BuildLog />
```

---

## STEP 4 — Add data-cursor attributes for context cursor

In Projects.tsx on the project cards:
```tsx
<motion.div data-cursor="view" ...>  {/* Shows VIEW cursor */}
```

On CarDash project:
```tsx
<motion.div data-cursor="car" ...>
```

On Skills page:
```tsx
<div data-cursor="flutter" ...>
```

On AI Chatbot trigger / Prism Studio:
```tsx
<button data-cursor="ai" ...>
```

On ShelfSection books:
```tsx
<button data-cursor="book" ...>
```

---

## STEP 5 — Update NowSection data (src/components/NowSection.tsx)

Find the NOW_DATA object at the top of NowSection.tsx and update:
- `building` → what you're currently building
- `learning` → current coursework / topics
- `listening` → current music
- `reading` → current book
Do this every few weeks to keep it fresh.

---

## STEP 6 — Update ShelfSection books/music (src/components/ShelfSection.tsx)

Find BOOKS and MUSIC arrays at top of file. Update with your actual favorites.

---

## STEP 7 — Add devlog entries (src/components/BuildLog.tsx)

Find ENTRIES array at top. Add a new entry each week:
```tsx
{
  week: 'Week 19',
  date: 'May 2026',
  type: 'shipped',       // 'shipped' | 'learned' | 'exploring' | 'fixed' | 'launched'
  title: 'What you did',
  description: 'More detail about what you shipped/learned.',
  tags: ['Flutter', 'Tag2'],
},
```

---

## NOTES

- AIChatbot uses process.env.GEMINI_API_KEY — already in your .env.local from existing setup
- DevTerminal: press backtick ` anywhere on site to open. Press Escape to close.
- SkillConstellation fully replaces SkillsUniverse if you want — both work standalone
- LiveDemoSection iframes Prism Studio — works since it's on Vercel with no X-Frame-Options block
- ScrollStory works best as a tall section (~600vh) — currently set to 80vh per chapter
- All components are self-contained with zero new npm dependencies
- ContextCursor: add data-cursor="car|flutter|ai|book|view|drag" to any element
