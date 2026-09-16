# Kanpasut Sangthong — Portfolio

React + TypeScript + Tailwind CSS + Framer Motion + Lucide React.

## Run it

```bash
npm install
npm run dev
```

Build for deploy (Netlify / Vercel / GitHub Pages — drag the `dist` folder or connect the repo):

```bash
npm run build
```

## Where to edit content

Almost everything text-related lives in **`src/data/content.ts`**:

- `links` — email / phone / Line / GitHub / resume PDF path.
- `portrait` — paths to the two hero portrait photos (see below).
- `projects` — 3 projects with placeholder copy (Hay Day ordering system, the earlier
  portfolio build, freelance UI/UX work). `liveUrl` / `githubUrl` are left as `'#'` on
  purpose — fill in your real deployed link and repo link per project once you have them.
- `experience` / `education` — the SEWT-E internship and Suranaree University of
  Technology are pre-filled; add more entries the same shape if needed.
- `skillGroups` — edit the three groups (Frontend Development / UI Styling / Tools &
  Design) to match your real, current skill level.
- The `content` object at the bottom holds every other string, in both `th` and `en`.

## Drop-in placeholders — just add files, no code edits needed

| What | Where to put it | Notes |
|---|---|---|
| Resume PDF | `public/resume.pdf` | The Download Resume button already points here. |
| Hero portrait (main) | `public/portrait-1.jpg` | Shown normally, with a pixel-mosaic overlay. |
| Hero portrait (reveal) | `public/portrait-2.jpg` | Appears inside the cursor/touch circle. |
| Project media (× 4 per project) | `public/projects/<id>-1.jpg` … `-4.jpg` | See below — used in both the Projects cards (2×2 grid) and the Marquee (first slot). |

Already filled in: `public/loader-cat.mp4` / `.webm` — the splash-screen video. Swap either
file (same filename) to change it; `src/components/CatRunner.tsx` is a hand-drawn SVG
fallback character kept in the repo in case you'd rather go back to that instead of a video.

Nothing breaks if these files aren't there yet — the buttons/photo just fall back
gracefully (portrait/project media shows a solid color placeholder, resume link 404s quietly).

## Project media — photos or video, your choice

Each project has 4 media slots, laid out as a 2×2 grid in the Projects cards
(`src/data/content.ts` → `projects[].media`), rendered by
`src/components/ProjectMedia.tsx` and reused in **both** the Projects section cards and the
Marquee tiles (same 3 files, so you only add them once). Each slot independently accepts:

- a **photo**: any path ending `.jpg` / `.png` / `.webp`
- a **video**: any path ending `.mp4` / `.webm` / `.mov` — autoplays muted, loops

Just drop the file at the path already listed in `content.ts` (e.g.
`public/projects/hayday-1.jpg`) — no code change needed. If you'd rather use a video for a
slot, drop e.g. `hayday-1.mp4` instead and change that one `src` in `content.ts` to match
the new extension; `ProjectMedia` picks image vs. video automatically from the file
extension. Until a file exists at that path, `fallbackColor` (also in `content.ts`) is
shown instead — nothing breaks or looks empty.

## Other placeholders to swap eventually

- **Favicon / OG image** — `public/favicon.svg` is a generic placeholder; `og-image.png`
  referenced in `index.html` doesn't exist yet.

## Structure

```
src/
  App.tsx        assembles every section in order
  main.tsx       React entry point
  index.css      global styles: font import, grain texture, gradient-text helper
  context/       LanguageContext — TH/EN toggle, defaults to TH
  data/          content.ts — all copy, links, projects, skills, experience
  hooks/         useScrollDirection — header hide-on-scroll-down / show-on-scroll-up
  components/
    Loader              splash screen: welcome text + /public/loader-cat.mp4|webm, ~4.8s
    Header              fixed nav, glass on scroll, language toggle, mobile menu
    Hero                name/tagline/CTAs + portrait
    PortraitReveal       the pixel-mosaic / cursor-reveal photo effect, on its own
    FloatingContact      always-fixed bottom-right contact dock
    Marquee              two scrolling rows of project preview tiles
    About                bio + 4 corner glow blobs + info grid
    Skills               editorial numbered skill list, light section
    Experience           experience + education timeline
    Projects             perspective-grid background, sticky-stacking project cards
    ProjectMedia          shared img/video renderer used by Projects + Marquee
    Footer               copyright + GitHub link
    Blob / Particles      shared decorative background pieces
```

See `CODE_OVERVIEW.md` for every file's full source, one section per file.
