# Code Overview — Kanpasut Portfolio

Every source file in the project, grouped by role and shown in the order you'd actually want to read them. Generated from the current state of the codebase.

## Contents

- **⚙️ Config**
  - [`vite.config.ts`](#viteconfigts)
  - [`tailwind.config.js`](#tailwindconfigjs)
  - [`postcss.config.js`](#postcssconfigjs)
- **🚪 Entry point**
  - [`index.html`](#indexhtml)
  - [`src/main.tsx`](#srcmaintsx)
  - [`src/App.tsx`](#srcapptsx)
- **🎨 Global styles**
  - [`src/index.css`](#srcindexcss)
- **🌐 Data & language**
  - [`src/data/content.ts`](#srcdatacontentts)
  - [`src/context/LanguageContext.tsx`](#srccontextlanguagecontexttsx)
- **🪝 Hooks**
  - [`src/hooks/useScrollDirection.ts`](#srchooksusescrolldirectionts)
- **🧩 Shared decorative pieces**
  - [`src/components/Blob.tsx`](#srccomponentsblobtsx)
  - [`src/components/Particles.tsx`](#srccomponentsparticlestsx)
  - [`src/components/ProjectMedia.tsx`](#srccomponentsprojectmediatsx)
  - [`src/components/CatRunner.tsx`](#srccomponentscatrunnertsx)
  - [`src/components/CatRunnerCanvas.tsx`](#srccomponentscatrunnercanvastsx)
- **🧱 Sections (in page order)**
  - [`src/components/Loader.tsx`](#srccomponentsloadertsx)
  - [`src/components/Header.tsx`](#srccomponentsheadertsx)
  - [`src/components/Hero.tsx`](#srccomponentsherotsx)
  - [`src/components/PortraitReveal.tsx`](#srccomponentsportraitrevealtsx)
  - [`src/components/FloatingContact.tsx`](#srccomponentsfloatingcontacttsx)
  - [`src/components/Marquee.tsx`](#srccomponentsmarqueetsx)
  - [`src/components/About.tsx`](#srccomponentsabouttsx)
  - [`src/components/Skills.tsx`](#srccomponentsskillstsx)
  - [`src/components/Experience.tsx`](#srccomponentsexperiencetsx)
  - [`src/components/Projects.tsx`](#srccomponentsprojectstsx)
  - [`src/components/Footer.tsx`](#srccomponentsfootertsx)


## ⚙️ Config

### `vite.config.ts` {#viteconfigts}

Vite build config — sets base: './' so the build works from any relative path.

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
})
```

### `tailwind.config.js` {#tailwindconfigjs}

Tailwind theme: brand colors, fonts, border radii, and every custom @keyframes/animation used across the site.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        panel: '#141414',
        paper: '#EDE7DD',
        fog: '#D7E2EA',
        steel: '#646973',
        mist: '#BBCCD7',
        glow: {
          violet: '#8B7CF6',
          blue: '#5B8DEF',
          rose: '#F2748C',
          amber: '#F2A25C',
        },
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      borderRadius: {
        xl2: '40px',
        xl3: '60px',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-18px,0)' },
        },
        driftSlow: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-28px,0) scale(1.04)' },
        },
        runLegFront: {
          '0%, 100%': { transform: 'rotate(-32deg)' },
          '50%': { transform: 'rotate(34deg)' },
        },
        runLegBack: {
          '0%, 100%': { transform: 'rotate(34deg)' },
          '50%': { transform: 'rotate(-32deg)' },
        },
        bodyBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        paperFlap: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(12deg)' },
        },
        tailWag: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        swoosh: {
          '0%': { transform: 'translateX(6px)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '100%': { transform: 'translateX(-26px)', opacity: '0' },
        },
        loaderBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'marquee-left': 'marqueeLeft 38s linear infinite',
        'marquee-right': 'marqueeRight 42s linear infinite',
        drift: 'drift 7s ease-in-out infinite',
        'drift-slow': 'driftSlow 11s ease-in-out infinite',
        'run-leg-front': 'runLegFront 0.42s ease-in-out infinite',
        'run-leg-back': 'runLegBack 0.42s ease-in-out infinite',
        'body-bounce': 'bodyBounce 0.42s ease-in-out infinite',
        'paper-flap': 'paperFlap 0.3s ease-in-out infinite',
        'tail-wag': 'tailWag 0.5s ease-in-out infinite',
        swoosh: 'swoosh 0.7s ease-out infinite',
        'loader-bar': 'loaderBar 4.8s linear forwards',
      },
    },
  },
  plugins: [],
}
```

### `postcss.config.js` {#postcssconfigjs}

PostCSS pipeline that wires Tailwind + autoprefixer into the build.

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```


## 🚪 Entry point

### `index.html` {#indexhtml}

The one real HTML file. Has the <title>, meta tags for SEO/OG, and the <script type="module"> that boots React.

```html
<!doctype html>
<html lang="th">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kanpasut Sangthong — Frontend Developer</title>
    <meta name="description" content="Kanpasut Sangthong (Ne) — Frontend Developer portfolio. Building interfaces that work cleanly and feel alive." />
    <meta property="og:title" content="Kanpasut Sangthong — Frontend Developer" />
    <meta property="og:description" content="Frontend developer portfolio — projects, skills and experience." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.png" />
    <meta name="theme-color" content="#0C0C0C" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `src/main.tsx` {#srcmaintsx}

Mounts <App /> into #root. Standard Vite/React boilerplate.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### `src/App.tsx` {#srcapptsx}

Assembles the whole page: wraps everything in LanguageProvider, then stacks Loader → Header → FloatingContact → each section in order.

```tsx
import { LanguageProvider } from './context/LanguageContext'
import Loader from './components/Loader'
import Header from './components/Header'
import Hero from './components/Hero'
import FloatingContact from './components/FloatingContact'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <Loader />
      <Header />
      <FloatingContact />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
```


## 🎨 Global styles

### `src/index.css` {#srcindexcss}

Tailwind entry + everything that isn't a utility class: Kanit font import, film-grain texture (.grain), perspective grid, glassmorphism (.glass), gradient-text helper, and the site-wide prefers-reduced-motion override.

```css
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #0C0C0C;
  color: #D7E2EA;
  font-family: 'Kanit', sans-serif;
  overflow-x: hidden;
}

::selection {
  background: #8B7CF6;
  color: #0C0C0C;
}

/* film grain overlay, shared by dark sections */
.grain::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.perspective-grid {
  background-image:
    linear-gradient(rgba(215, 226, 234, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(215, 226, 234, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
  transform: perspective(600px) rotateX(55deg);
  transform-origin: top;
}

.glass {
  background: rgba(12, 12, 12, 0.55);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(215, 226, 234, 0.08);
}

.gradient-text {
  background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```


## 🌐 Data & language

### `src/data/content.ts` {#srcdatacontentts}

The single source of truth for every string, link, and content list on the site — including each project's 3 media slots (photo or video, auto-detected by extension).

```ts
export type Lang = 'th' | 'en'

export interface MediaSlot {
  // path to a file in /public — e.g. '/projects/hayday-1.jpg' or
  // '/projects/hayday-1.mp4'. Used by both the Projects cards and the
  // Marquee (same 3 files, reused in both places).
  src: string
  // shown instead if the file at `src` doesn't exist yet / fails to load
  fallbackColor: string
}

export interface Project {
  id: string
  order: string
  type: { th: string; en: string }
  title: { th: string; en: string }
  description: { th: string; en: string }
  role: { th: string; en: string }
  technologies: string[]
  challenge: { th: string; en: string }
  result: { th: string; en: string }
  liveUrl: string
  githubUrl: string
  // 4 media slots, arranged as a 2x2 grid — each can be a photo OR a video,
  // just point `src` at whichever file you actually have (.jpg/.png/.webp
  // for photos, .mp4/.webm/.mov for video). Until a real file exists at
  // that path, fallbackColor is shown instead — nothing breaks.
  media: [MediaSlot, MediaSlot, MediaSlot, MediaSlot]
}

export interface ExperienceItem {
  role: { th: string; en: string }
  org: { th: string; en: string }
  period: { th: string; en: string }
  summary: { th: string; en: string }
  outcome: { th: string; en: string }
}

export interface EducationItem {
  school: { th: string; en: string }
  field: { th: string; en: string }
  period: { th: string; en: string }
}

// ---- shared / bilingual data ---------------------------------------------

export const projects: Project[] = [
  // liveUrl / githubUrl are left as '#' on purpose — fill in your real
  // deployed link and repo link for each project once you have them.
  {
    id: 'hayday',
    order: '01',
    type: { th: 'ส่วนตัว', en: 'Personal' },
    title: { th: 'ระบบสั่งซื้อไอเทม Hay Day', en: 'Hay Day Item Ordering System' },
    description: {
      th: 'เว็บแอปสำหรับสั่งซื้อไอเทมในเกม Hay Day มีระบบแอดมินจัดการออเดอร์และสต๊อก พร้อมระบบชำระเงิน ทำขึ้นเพื่อแก้ปัญหาการจดออเดอร์ผ่านแชทที่จัดการยากและตกหล่นบ่อย',
      en: 'A web app for ordering in-game Hay Day items, with an admin panel for order/stock management and a payment flow — built to replace error-prone chat-based ordering.',
    },
    role: { th: 'ออกแบบและพัฒนาเว็บทั้งฝั่งหน้าบ้านและระบบแอดมิน', en: 'Designed and built both the customer-facing site and the admin system' },
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    challenge: {
      th: 'ต้องออกแบบ flow การสั่งซื้อและสถานะออเดอร์ให้ผู้ดูแลติดตามได้ง่าย ในขณะที่ลูกค้าใช้งานสะดวกบนมือถือ',
      en: 'Needed an order/status flow simple enough for an admin to track, while staying mobile-friendly for customers.',
    },
    result: {
      th: 'ลดเวลาที่ใช้จัดการออเดอร์ผ่านแชทลงอย่างชัดเจน และลดออเดอร์ตกหล่น',
      en: 'Cut time spent managing orders via chat and reduced missed/lost orders.',
    },
    liveUrl: '#',
    githubUrl: '#',
    media: [
      { src: '/projects/hayday-1.jpg', fallbackColor: '#8B7CF6' },
      { src: '/projects/hayday-2.jpg', fallbackColor: '#5B8DEF' },
      { src: '/projects/hayday-3.jpg', fallbackColor: '#F2748C' },
      { src: '/projects/hayday-4.jpg', fallbackColor: '#141414' },
    ],
  },
  {
    id: 'portfolio',
    order: '02',
    type: { th: 'ส่วนตัว', en: 'Personal' },
    title: { th: 'Portfolio เวอร์ชันแรก', en: 'First Portfolio Site' },
    description: {
      th: 'เว็บพอร์ตโฟลิโอเวอร์ชันแรกที่สร้างด้วยมือ ใช้ scroll-snap แบ่งเป็นหลาย section มีเมนูแบบ fixed, ปุ่มติดต่อแบบลอย และระบบ modal',
      en: 'An earlier hand-coded portfolio: a scroll-snap multi-section layout with fixed navigation, a floating contact button, and a modal system.',
    },
    role: { th: 'ออกแบบและเขียนโค้ดคนเดียวทั้งหมด', en: 'Designed and coded solo, end to end' },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    challenge: {
      th: 'เรียนรู้ scroll-snap, position: fixed และการทำ modal ที่ copy ลิงก์ได้ ไปพร้อมกับการสร้างจริง',
      en: 'Learned scroll-snap layouts, fixed positioning, and a copy-to-clipboard modal system while building for real.',
    },
    result: {
      th: 'ได้พื้นฐาน CSS ที่แน่นขึ้นมาก และกลายเป็นจุดเริ่มต้นของเว็บเวอร์ชันนี้',
      en: 'Built a much stronger CSS foundation — and became the starting point for this current site.',
    },
    liveUrl: '#',
    githubUrl: '#',
    media: [
      { src: '/projects/portfolio-1.jpg', fallbackColor: '#F2748C' },
      { src: '/projects/portfolio-2.jpg', fallbackColor: '#F2A25C' },
      { src: '/projects/portfolio-3.jpg', fallbackColor: '#8B7CF6' },
      { src: '/projects/portfolio-4.jpg', fallbackColor: '#141414' },
    ],
  },
  {
    id: 'uiux-freelance',
    order: '03',
    type: { th: 'ฟรีแลนซ์', en: 'Freelance' },
    title: { th: 'งานออกแบบ UI/UX ฟรีแลนซ์', en: 'Freelance UI/UX Design Work' },
    description: {
      th: 'รับออกแบบ UI/UX ให้ลูกค้าผ่านแพลตฟอร์ม Fastwork โดยออกแบบใน Figma ตั้งแต่ wireframe จนถึง high-fidelity mockup',
      en: 'Freelance UI/UX design work for clients via the Fastwork platform — Figma work from wireframes through to high-fidelity mockups.',
    },
    role: { th: 'นักออกแบบ UI/UX (ออกแบบอย่างเดียว ไม่รวมพัฒนา)', en: 'UI/UX designer (design-only scope, no development)' },
    technologies: ['Figma'],
    challenge: {
      th: 'ตีความความต้องการของลูกค้าที่หลากหลายให้ออกมาเป็นดีไซน์ที่ใช้งานได้จริงภายในเวลาจำกัด',
      en: 'Translating varied client briefs into usable designs within tight turnarounds.',
    },
    result: {
      th: 'ส่งมอบงานออกแบบให้ลูกค้าหลายรายบนแพลตฟอร์ม',
      en: 'Delivered design work to multiple clients on the platform.',
    },
    liveUrl: '#',
    githubUrl: '#',
    media: [
      { src: '/projects/uiux-freelance-1.jpg', fallbackColor: '#5B8DEF' },
      { src: '/projects/uiux-freelance-2.jpg', fallbackColor: '#8B7CF6' },
      { src: '/projects/uiux-freelance-3.jpg', fallbackColor: '#F2A25C' },
      { src: '/projects/uiux-freelance-4.jpg', fallbackColor: '#141414' },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    role: { th: 'ผู้ช่วยวิศวกรฝ่ายผลิต (ฝึกงาน)', en: 'Production Engineer Assistant (Internship)' },
    org: { th: 'SEWT-E, นครราชสีมา', en: 'SEWT-E, Nakhon Ratchasima' },
    period: { th: '4 เดือน', en: '4 months' },
    summary: {
      th: 'ร่วมพัฒนาโครงการปรับปรุงคุณภาพเครื่อง Airleak โดยใช้ PLC พร้อมดูแล ซ่อมบำรุง และสร้างเครื่องจักรในโรงงาน',
      en: 'Worked on an Airleak-machine quality-improvement project using PLC, plus maintaining, repairing, and building factory machinery.',
    },
    outcome: {
      th: 'ได้ประสบการณ์ตรงด้านระบบอัตโนมัติในโรงงานและการแก้ปัญหาหน้างานจริง',
      en: 'Gained hands-on experience with factory automation systems and real on-the-floor problem solving.',
    },
  },
]

export const education: EducationItem[] = [
  {
    school: { th: 'มหาวิทยาลัยเทคโนโลยีสุรนารี', en: 'Suranaree University of Technology' },
    field: { th: 'วิศวกรรมอิเล็กทรอนิกส์', en: 'Electronics Engineering' },
    period: { th: '', en: '' },
  },
]

export const skillGroups = [
  {
    number: '01',
    title: { th: 'Frontend Development', en: 'Frontend Development' },
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
  },
  {
    number: '02',
    title: { th: 'UI Styling', en: 'UI Styling' },
    items: ['Tailwind CSS', 'CSS Animation', 'Responsive Design', 'Framer Motion'],
  },
  {
    number: '03',
    title: { th: 'Tools & Design', en: 'Tools & Design' },
    items: ['Figma', 'Git', 'GitHub'],
  },
]

// ---- contact / links -------------------------------------------------------
// edit these directly — they're used across the header, hero and footer.
export const links = {
  email: 'ne0002545@gmail.com',
  phone: '062-234-5413',
  line: 'nezama111',
  github: 'https://github.com/NEBRO00/Resume-Web',
  // Drop your resume PDF into /public as "resume.pdf" and the Download
  // Resume button will pick it up automatically — no code change needed.
  resumeUrl: '/resume.pdf',
}

// ---- hero portrait photos ---------------------------------------------------
// Drop your two photos straight into /public with these exact filenames and
// they'll show up automatically — no other code changes needed.
// - base: the photo shown normally (rendered with a pixel-mosaic overlay)
// - reveal: the photo that appears inside the cursor/touch circle
export const portrait = {
  base: '/portrait-1.jpg',
  reveal: '/portrait-2.jpg',
}

// ---- page copy, per language ----------------------------------------------

export interface PageCopy {
  nav: {
    about: string
    skills: string
    projects: string
    experience: string
    contact: string
  }
  hero: {
    greeting: string
    name: string
    role: string
    tagline: string
    status: string
    workPreference: string
    viewProjects: string
    downloadResume: string
    contactMe: string
  }
  about: {
    heading: string
    body: string
    workStatusLabel: string
    locationLabel: string
    workPrefLabel: string
    thaiLabel: string
    englishLabel: string
    location: string
    thaiLevel: string
    englishLevel: string
  }
  skills: {
    heading: string
  }
  experience: {
    heading: string
    educationHeading: string
    noExperienceNote: string
  }
  projects: {
    heading: string
    liveProject: string
    viewCode: string
  }
  contact: {
    heading: string
    subheading: string
    formName: string
    formEmail: string
    formMessage: string
    formSubmit: string
    formNotConnected: string
  }
  footer: {
    rights: string
  }
  langToggleLabel: string
}

export const content: Record<Lang, PageCopy> = {
  th: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "HI, I'M",
      name: 'KANPASUT',
      role: 'Frontend Developer',
      tagline: 'สร้างเว็บที่ทั้งใช้งานง่ายและรู้สึกมีชีวิต ด้วยรายละเอียดเล็ก ๆ ที่ตั้งใจ',
      status: 'Open to Work',
      workPreference: 'Hybrid',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
      contactMe: 'Contact Me',
    },
    about: {
      heading: 'About Me',
      body: 'ผมเน หรือ กัญจน์ภาสัตย์ นักพัฒนาเว็บฝั่ง Frontend ที่มีพื้นฐานวิศวกรรมอิเล็กทรอนิกส์ เริ่มต้นจากงานออกแบบ UI/UX ในฐานะฟรีแลนซ์ ก่อนจะลงลึกด้านการเขียนโค้ดอย่างจริงจัง ผมชอบงานที่ต้องคิดทั้งภาพรวมและรายละเอียดเล็ก ๆ ไปพร้อมกัน และเรียนรู้จากการลงมือทำโปรเจกต์จริงเสมอ',
      workStatusLabel: 'สถานะการทำงาน',
      locationLabel: 'Location',
      workPrefLabel: 'Work Preference',
      thaiLabel: 'ภาษาไทย',
      englishLabel: 'ภาษาอังกฤษ',
      location: 'นครราชสีมา, ประเทศไทย',
      thaiLevel: 'เจ้าของภาษา',
      englishLevel: 'อ่าน-เขียนพอได้ พูดคุยยังไม่คล่องนัก',
    },
    skills: {
      heading: 'Skills',
    },
    experience: {
      heading: 'Experience',
      educationHeading: 'Education',
      noExperienceNote: 'ยังไม่มีประสบการณ์ทำงานสายตรง — ด้านล่างคือการฝึกงานและงานฟรีแลนซ์',
    },
    projects: {
      heading: 'Projects',
      liveProject: 'Live Project',
      viewCode: 'GitHub',
    },
    contact: {
      heading: 'Contact',
      subheading: 'มีโปรเจกต์ในใจ หรืออยากคุยเรื่องงาน ทักมาได้เลยครับ',
      formName: 'ชื่อ',
      formEmail: 'อีเมล',
      formMessage: 'ข้อความ',
      formSubmit: 'ส่งข้อความ',
      formNotConnected: 'ฟอร์มนี้ยังไม่ได้เชื่อมต่อระบบส่งข้อความ — เพิ่ม Formspree หรือ EmailJS ได้ใน src/components/Contact.tsx',
    },
    footer: {
      rights: 'สงวนลิขสิทธิ์',
    },
    langToggleLabel: 'เปลี่ยนภาษา',
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      greeting: "HI, I'M",
      name: 'KANPASUT',
      role: 'Frontend Developer',
      tagline: 'Building interfaces that work cleanly and feel alive — one deliberate detail at a time.',
      status: 'Open to Work',
      workPreference: 'Hybrid',
      viewProjects: 'View Projects',
      downloadResume: 'Download Resume',
      contactMe: 'Contact Me',
    },
    about: {
      heading: 'About Me',
      body: "I'm Ne (Kanpasut) — a frontend developer with an electronics engineering background. I started out doing freelance UI/UX design before moving deeper into building things myself. I like work that asks for both the big picture and the small details, and I learn best by shipping real projects.",
      workStatusLabel: 'Work Status',
      locationLabel: 'Location',
      workPrefLabel: 'Work Preference',
      thaiLabel: 'Thai',
      englishLabel: 'English',
      location: 'Nakhon Ratchasima, Thailand',
      thaiLevel: 'Native',
      englishLevel: "Reading & writing okay, speaking is still a work in progress",
    },
    skills: {
      heading: 'Skills',
    },
    experience: {
      heading: 'Experience',
      educationHeading: 'Education',
      noExperienceNote: "No full-time frontend role yet — here's the internship and freelance work instead.",
    },
    projects: {
      heading: 'Projects',
      liveProject: 'Live Project',
      viewCode: 'GitHub',
    },
    contact: {
      heading: 'Contact',
      subheading: "Got a project in mind, or just want to talk shop? Reach out.",
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Message',
      formSubmit: 'Send Message',
      formNotConnected: 'This form is not wired up to a backend yet — add Formspree or EmailJS in src/components/Contact.tsx',
    },
    footer: {
      rights: 'All rights reserved',
    },
    langToggleLabel: 'Switch language',
  },
}
```

### `src/context/LanguageContext.tsx` {#srccontextlanguagecontexttsx}

React context providing { lang, toggleLang, setLang, t } to the whole tree. Defaults to Thai.

```tsx
import { createContext, useContext, useState, useMemo, type ReactNode } from 'react'
import { content, type Lang } from '../data/content'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  setLang: (l: Lang) => void
  t: typeof content['th']
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('th')

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      toggleLang: () => setLang((prev) => (prev === 'th' ? 'en' : 'th')),
      setLang,
      t: content[lang],
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
```


## 🪝 Hooks

### `src/hooks/useScrollDirection.ts` {#srchooksusescrolldirectionts}

Tracks scroll position to tell the header whether to hide (scrolling down) or reappear (scrolling up).

```ts
import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(threshold = 8) {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const diff = y - lastY.current

      setScrolled(y > 40)

      if (y < 80) {
        setHidden(false)
      } else if (Math.abs(diff) > threshold) {
        setHidden(diff > 0)
        lastY.current = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return { hidden, scrolled }
}
```


## 🧩 Shared decorative pieces

### `src/components/Blob.tsx` {#srccomponentsblobtsx}

One soft blurred glow circle, reusable anywhere.

```tsx
import { motion } from 'framer-motion'

interface BlobProps {
  color: string
  size: number
  className?: string
  parallax?: { x: number; y: number }
  delay?: number
}

export default function Blob({ color, size, className = '', parallax, delay = 0 }: BlobProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full motion-safe:animate-drift-slow ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(80px)',
        opacity: 0.35,
        transform: parallax ? `translate3d(${parallax.x}px, ${parallax.y}px, 0)` : undefined,
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.35, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
```

### `src/components/Particles.tsx` {#srccomponentsparticlestsx}

Scatters small floating dots (light dust) — used behind the Hero.

```tsx
import { useMemo } from 'react'

export default function Particles({ count = 24 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 10 + Math.random() * 14,
        delay: -Math.random() * 20,
      })),
    [count]
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-fog/40 motion-safe:animate-drift"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
```

### `src/components/ProjectMedia.tsx` {#srccomponentsprojectmediatsx}

Renders one project media slot as an <img> or <video> (auto-detected by file extension), falling back to a solid color block if the file doesn't exist yet. Shared by Projects and Marquee so each project's 3 files only need to be added once.

```tsx
import { useState } from 'react'

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov']

export interface MediaSlot {
  // path to a file in /public — e.g. '/projects/hayday-1.jpg' or
  // '/projects/hayday-1.mp4'. Detected as image or video by its extension.
  src: string
  // shown instead if the file at `src` doesn't exist yet / fails to load
  fallbackColor: string
}

export default function ProjectMedia({ src, fallbackColor, className = '' }: MediaSlot & { className?: string }) {
  const [failed, setFailed] = useState(false)
  const isVideo = VIDEO_EXTENSIONS.some((ext) => src.toLowerCase().endsWith(ext))

  if (failed) {
    return <div className={className} style={{ background: fallbackColor }} />
  }

  if (isVideo) {
    return (
      <video
        className={`block h-full w-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      >
        <source src={src} />
      </video>
    )
  }

  return (
    <img
      src={src}
      alt=""
      className={`block h-full w-full object-cover ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
```

### `src/components/CatRunner.tsx` {#srccomponentscatrunnertsx}

Unused by default (Loader uses the video instead) but kept as a fallback: a hand-built SVG cat, no background-removal needed at all since it's vector art.

```tsx
// A hand-built SVG "cat courier" — cute, cat-eared, wearing a tiny vest and tie,
// mid-run, holding a document. Every moving part (legs, arms, tail, paper) is
// its own <g> that rotates around an explicit pivot point set via inline
// transform-origin, so limbs stay visually attached to the body instead of
// floating off on their own.

const FOG = '#D7E2EA'
const MIST = '#BBCCD7'
const INK = '#0C0C0C'
const PAPER = '#EDE7DD'
const TIE = '#F2748C'

export default function CatRunner({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 150"
      width="96"
      height="144"
      className={`motion-safe:animate-body-bounce ${className}`}
      aria-hidden="true"
    >
      {/* tail */}
      <g style={{ transformOrigin: '63px 82px' }} className="motion-safe:animate-tail-wag">
        <path
          d="M63,82 Q82,80 84,60 Q85,49 77,44"
          stroke={FOG}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* back leg */}
      <g style={{ transformOrigin: '42px 84px' }} className="motion-safe:animate-run-leg-back">
        <rect x="38" y="84" width="8" height="32" rx="4" fill={MIST} />
        <ellipse cx="42" cy="118" rx="6" ry="4" fill={INK} opacity="0.55" />
      </g>

      {/* back arm */}
      <g style={{ transformOrigin: '37px 50px' }} className="motion-safe:animate-run-leg-front">
        <rect x="33" y="48" width="7" height="24" rx="3.5" fill={MIST} />
        <circle cx="36.5" cy="74" r="4" fill={MIST} />
      </g>

      {/* body, wearing a little vest + tie */}
      <rect x="36" y="40" width="28" height="46" rx="14" fill={FOG} />
      <path d="M40,44 L50,50 L46,60 Z" fill={INK} opacity="0.85" />
      <path d="M60,44 L50,50 L54,60 Z" fill={INK} opacity="0.85" />
      <path d="M48,50 L52,50 L53,68 L50,74 L47,68 Z" fill={TIE} />

      {/* front leg */}
      <g style={{ transformOrigin: '58px 84px' }} className="motion-safe:animate-run-leg-front">
        <rect x="54" y="84" width="8" height="32" rx="4" fill={FOG} />
        <ellipse cx="58" cy="118" rx="6" ry="4" fill={INK} opacity="0.6" />
      </g>

      {/* front arm, holding the document */}
      <g style={{ transformOrigin: '63px 50px' }} className="motion-safe:animate-run-leg-back">
        <rect x="59.5" y="48" width="7" height="24" rx="3.5" fill={FOG} />
        <circle cx="63" cy="74" r="4" fill={FOG} />
        <g style={{ transformOrigin: '65px 72px' }} className="motion-safe:animate-paper-flap">
          <rect x="63" y="64" width="12" height="16" rx="1.5" fill={PAPER} stroke={INK} strokeWidth="0.6" />
          <line x1="65.5" y1="69" x2="72.5" y2="69" stroke={INK} strokeWidth="1" opacity="0.45" />
          <line x1="65.5" y1="73" x2="72.5" y2="73" stroke={INK} strokeWidth="1" opacity="0.45" />
        </g>
      </g>

      {/* head */}
      <path d="M37,15 L44,28 L29,25 Z" fill={FOG} />
      <path d="M39,19 L43,26 L34,24 Z" fill={MIST} />
      <path d="M63,15 L56,28 L71,25 Z" fill={FOG} />
      <path d="M61,19 L57,26 L66,24 Z" fill={MIST} />
      <circle cx="50" cy="27" r="15" fill={FOG} />
      <ellipse cx="50" cy="32" rx="8" ry="5" fill={PAPER} opacity="0.9" />
      <circle cx="44" cy="26" r="1.6" fill={INK} />
      <circle cx="56" cy="26" r="1.6" fill={INK} />
      <path d="M48,32 L52,32 L50,34 Z" fill={INK} />
      <g stroke={FOG} strokeWidth="1" opacity="0.8">
        <line x1="34" y1="30" x2="22" y2="28" />
        <line x1="34" y1="33" x2="22" y2="34" />
        <line x1="66" y1="30" x2="78" y2="28" />
        <line x1="66" y1="33" x2="78" y2="34" />
      </g>
    </svg>
  )
}
```

### `src/components/CatRunnerCanvas.tsx` {#srccomponentscatrunnercanvastsx}

Renders the loader video onto a <canvas>, removing the light gray backdrop frame-by-frame with a flood-fill: only background-colored pixels connected to the frame's edges get keyed out, so isolated bright spots inside the character (e.g. a highlight on the nose) don't get punched into holes.

```tsx
import { useEffect, useRef } from 'react'

// The source video's backdrop is a light, near-neutral gray/white (brightness
// ~210+, very low saturation). Rather than keying every pixel that merely
// *looks* like that color, we flood-fill from the frame's outer edges
// through connected background-colored pixels only. That's what keeps a
// bright highlight on the cat's nose (which matches the same brightness/
// saturation test but is surrounded by fur, not connected to the border)
// from getting punched into a hole — plain per-pixel thresholding did
// exactly that.
const BRIGHTNESS_THRESHOLD = 210
const MAX_SATURATION_FOR_KEY = 24

const WIDTH = 240
const HEIGHT = 427 // matches the source video's ~9:16 aspect ratio

export default function CatRunnerCanvas({ className = '' }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    let cancelled = false
    const pixelCount = WIDTH * HEIGHT
    const isBg = new Uint8Array(pixelCount)
    const visited = new Uint8Array(pixelCount)
    const stack = new Int32Array(pixelCount)

    const drawFrame = () => {
      if (cancelled) return
      if (video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, WIDTH, HEIGHT)
        const frame = ctx.getImageData(0, 0, WIDTH, HEIGHT)
        const data = frame.data

        // classify every pixel as "background-colored" or not
        for (let idx = 0; idx < pixelCount; idx++) {
          const i = idx * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const brightness = (r + g + b) / 3
          const sat = Math.max(r, g, b) - Math.min(r, g, b)
          isBg[idx] = sat <= MAX_SATURATION_FOR_KEY && brightness >= BRIGHTNESS_THRESHOLD ? 1 : 0
          visited[idx] = 0
        }

        // flood-fill from the border, through background-colored pixels only
        let sp = 0
        const seed = (idx: number) => {
          if (isBg[idx] && !visited[idx]) {
            visited[idx] = 1
            stack[sp++] = idx
          }
        }
        for (let x = 0; x < WIDTH; x++) {
          seed(x)
          seed((HEIGHT - 1) * WIDTH + x)
        }
        for (let y = 0; y < HEIGHT; y++) {
          seed(y * WIDTH)
          seed(y * WIDTH + WIDTH - 1)
        }
        while (sp > 0) {
          const idx = stack[--sp]
          const x = idx % WIDTH
          const y = (idx / WIDTH) | 0
          if (x > 0 && isBg[idx - 1] && !visited[idx - 1]) {
            visited[idx - 1] = 1
            stack[sp++] = idx - 1
          }
          if (x < WIDTH - 1 && isBg[idx + 1] && !visited[idx + 1]) {
            visited[idx + 1] = 1
            stack[sp++] = idx + 1
          }
          if (y > 0 && isBg[idx - WIDTH] && !visited[idx - WIDTH]) {
            visited[idx - WIDTH] = 1
            stack[sp++] = idx - WIDTH
          }
          if (y < HEIGHT - 1 && isBg[idx + WIDTH] && !visited[idx + WIDTH]) {
            visited[idx + WIDTH] = 1
            stack[sp++] = idx + WIDTH
          }
        }

        for (let idx = 0; idx < pixelCount; idx++) {
          if (visited[idx]) data[idx * 4 + 3] = 0
        }

        ctx.putImageData(frame, 0, 0)
      }
      rafRef.current = requestAnimationFrame(drawFrame)
    }

    rafRef.current = requestAnimationFrame(drawFrame)
    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={`relative z-10 ${className}`}>
      <video ref={videoRef} className="hidden" autoPlay muted loop playsInline preload="auto">
        <source src="/loader-cat.webm" type="video/webm" />
        <source src="/loader-cat.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="h-56 w-auto sm:h-64" />
    </div>
  )
}
```


## 🧱 Sections (in page order)

### `src/components/Loader.tsx` {#srccomponentsloadertsx}

Splash screen shown for ~4.8s on first load: welcome text + <CatRunnerCanvas /> + a progress bar, then fades out.

```tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatRunnerCanvas from './CatRunnerCanvas'

const DURATION = 4800 // ms — how long the splash stays up before fading out

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, DURATION)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-9 overflow-hidden bg-ink"
        >
          <div className="grain absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 42%, rgba(139,124,246,0.18), transparent 55%)',
            }}
          />

          <p className="gradient-text relative z-10 max-w-xs text-balance text-center font-kanit text-2xl font-bold leading-snug sm:text-3xl">
            ยินดีต้อนรับเข้าสู่ Resume ของ Kanpasut
          </p>

          {/* running character — the source video's light background is keyed
              out to transparent, frame by frame, on a canvas (see
              CatRunnerCanvas.tsx). It's an approximation, not a perfect
              matte — very bright highlights on the character can thin out
              slightly — but no box/edge/backdrop shows anymore. */}
          <CatRunnerCanvas />

          <div className="relative z-10 h-1 w-40 overflow-hidden rounded-full bg-fog/10">
            <div className="h-full rounded-full bg-gradient-to-r from-glow-violet via-glow-blue to-glow-rose animate-loader-bar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### `src/components/Header.tsx` {#srccomponentsheadertsx}

Fixed top nav. Hides on scroll-down / reappears on scroll-up, turns to frosted glass once scrolled, has the TH/EN toggle and a mobile hamburger menu.

```tsx
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollDirection } from '../hooks/useScrollDirection'

const sections = [
  { id: 'about', key: 'about' as const },
  { id: 'skills', key: 'skills' as const },
  { id: 'projects', key: 'projects' as const },
  { id: 'experience', key: 'experience' as const },
]

export default function Header() {
  const { t, lang, toggleLang } = useLanguage()
  const { hidden, scrolled } = useScrollDirection()
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      animate={{ y: hidden && !open ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`mx-3 mt-3 flex items-center justify-between rounded-2xl border px-5 py-3 transition-colors duration-500 sm:mx-6 sm:mt-4 sm:px-8 ${
          scrolled ? 'glass border-fog/10' : 'border-transparent bg-transparent'
        }`}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="font-kanit text-sm font-semibold tracking-wide text-fog"
        >
          KANPASUT<span className="text-steel">.</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="group relative font-kanit text-sm text-fog/80 transition-opacity hover:opacity-100"
            >
              {t.nav[s.key]}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-fog transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLang}
            aria-label={t.langToggleLabel}
            className="flex items-center gap-1 font-kanit text-xs font-medium tracking-wider"
          >
            <span className={lang === 'th' ? 'text-fog' : 'text-steel transition-colors hover:text-fog'}>TH</span>
            <span className="text-steel">|</span>
            <span className={lang === 'en' ? 'text-fog' : 'text-steel transition-colors hover:text-fog'}>EN</span>
          </button>

          <button
            className="text-fog md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-3 mt-2 overflow-hidden rounded-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="rounded-xl px-3 py-3 text-left font-kanit text-base text-fog/90 transition-colors hover:bg-white/5"
                >
                  {t.nav[s.key]}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
```

### `src/components/Hero.tsx` {#srccomponentsherotsx}

The big name/role/tagline/CTA block, plus mouse-parallax background blobs and the portrait (via PortraitReveal).

```tsx
import { useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/content'
import Blob from './Blob'
import Particles from './Particles'
import PortraitReveal from './PortraitReveal'

export default function Hero() {
  const { t } = useLanguage()
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const handleSceneMove = (e: MouseEvent<HTMLDivElement>) => {
    const { innerWidth, innerHeight } = window
    const relX = (e.clientX / innerWidth - 0.5) * 2
    const relY = (e.clientY / innerHeight - 0.5) * 2
    setParallax({ x: relX * 18, y: relY * 18 })
  }

  return (
    <section
      id="hero"
      onMouseMove={handleSceneMove}
      className="relative flex min-h-screen w-full flex-col bg-ink"
    >
      {/* background depth — contained to this wrapper so it never clips the text content above */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="grain absolute inset-0" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(139,124,246,0.16), transparent 45%), radial-gradient(circle at 80% 30%, rgba(91,141,239,0.14), transparent 45%), radial-gradient(circle at 50% 90%, rgba(242,116,140,0.10), transparent 50%)',
          }}
        />
        <Blob color="#8B7CF6" size={420} className="-left-32 top-10" parallax={parallax} />
        <Blob color="#5B8DEF" size={360} className="right-[-8rem] top-1/3" parallax={{ x: -parallax.x, y: parallax.y }} delay={0.2} />
        <Blob color="#F2A25C" size={280} className="bottom-[-6rem] left-1/3" parallax={{ x: parallax.x * 0.6, y: -parallax.y * 0.6 }} delay={0.4} />
        <Particles count={26} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-5 pt-24 sm:px-8 lg:px-14">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* portrait — shown above text on mobile, beside it on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[220px] sm:max-w-xs lg:order-2 lg:max-w-sm"
          >
            <PortraitReveal />
          </motion.div>

          <div className="lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-kanit text-sm font-medium tracking-[0.2em] text-mist"
            >
              {t.hero.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-text font-kanit font-black uppercase leading-[0.88] tracking-tight"
              style={{ fontSize: 'clamp(3.2rem, 14vw, 11rem)' }}
            >
              {t.hero.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <span className="font-kanit text-xl font-medium text-fog sm:text-2xl">{t.hero.role}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-fog/15 bg-white/5 px-3 py-1 font-kanit text-xs text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-glow-amber" />
                {t.hero.status} · {t.hero.workPreference}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-balance font-kanit text-base leading-relaxed text-fog/70 sm:text-lg"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full bg-fog px-7 py-3 font-kanit text-sm font-medium text-ink transition-transform hover:scale-105 active:scale-95"
              >
                {t.hero.viewProjects}
              </button>
              <a
                href={links.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-fog/25 px-7 py-3 font-kanit text-sm font-medium text-fog transition-colors hover:border-fog/60"
              >
                <Download size={15} />
                {t.hero.downloadResume}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 mx-auto mb-8 flex items-center gap-2 text-mist motion-safe:animate-drift"
      >
        <ArrowDown size={16} />
      </motion.div>
    </section>
  )
}
```

### `src/components/PortraitReveal.tsx` {#srccomponentsportraitrevealtsx}

The hero photo effect: pixel-mosaic overlay, feathered circular reveal on mouse/touch, auto-sweep on mobile load.

```tsx
import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react'
import { portrait } from '../data/content'

const FEATHER = 60 // px — softness of the reveal edge
const RADIUS = 130 // px — reveal circle radius on desktop
const RADIUS_TOUCH = 100 // px — slightly smaller on touch screens

function maskFor(x: number, y: number, radius: number, active: boolean) {
  const r = active ? radius : 0
  const inner = Math.max(r - FEATHER, 0)
  return `radial-gradient(circle at ${x}% ${y}%, black 0, black ${inner}px, transparent ${r}px)`
}

export default function PortraitReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [reveal, setReveal] = useState({ x: 50, y: 42, active: false })
  const [magnet, setMagnet] = useState({ x: 0, y: 0 })
  const [isCoarse, setIsCoarse] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsCoarse(coarse)

    if (!coarse || reducedMotion) return

    // mobile / touch: gently auto-sweep the reveal circle once on load so the
    // effect is visible without requiring the user to know to touch it
    const start = performance.now()
    const duration = 3400

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const angle = t * Math.PI * 2.2
      const x = 50 + Math.cos(angle) * 26
      const y = 42 + Math.sin(angle) * 20
      setReveal({ x, y, active: true })
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setReveal((r) => ({ ...r, active: false }))
      }
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const updateFromPoint = (clientX: number, clientY: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = ((clientX - rect.left) / rect.width) * 100
    const py = ((clientY - rect.top) / rect.height) * 100
    setReveal({ x: px, y: py, active: true })

    const cx = (clientX - rect.left - rect.width / 2) / rect.width
    const cy = (clientY - rect.top - rect.height / 2) / rect.height
    setMagnet({ x: cx * 14, y: cy * 14 })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => updateFromPoint(e.clientX, e.clientY)
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    if (touch) updateFromPoint(touch.clientX, touch.clientY)
  }

  const reset = () => {
    setMagnet({ x: 0, y: 0 })
    setReveal((r) => ({ ...r, active: false }))
  }

  const radius = isCoarse ? RADIUS_TOUCH : RADIUS
  const mask = maskFor(reveal.x, reveal.y, radius, reveal.active)

  // pixel grid sits on top of the real photo as a subtle mosaic texture.
  // The photo is layered as the FIRST background-image — if the file at
  // portrait.base / portrait.reveal doesn't exist yet, the browser just
  // skips that layer and the gradient + grid underneath show through, so
  // nothing looks broken before you add real photos.
  const pixelGrid = 'conic-gradient(from 90deg at 1px 1px, transparent 90deg, rgba(215,226,234,0.09) 0)'

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={reset}
      className="relative h-full w-full touch-none overflow-hidden rounded-xl3 border border-fog/10"
      style={{
        transform: `translate3d(${magnet.x}px, ${magnet.y}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* base photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `${pixelGrid}, url(${portrait.base}), radial-gradient(ellipse 70% 60% at 50% 38%, #2c2c31 0%, #1a1a1d 60%, #101011 100%)`,
          backgroundSize: '9px 9px, cover, auto',
          backgroundPosition: 'center, center, center',
        }}
      />

      {/* reveal photo — swaps in through a feathered circular mask */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `${pixelGrid}, url(${portrait.reveal}), radial-gradient(ellipse 70% 60% at 50% 38%, #4a3a6e 0%, #253552 60%, #12161c 100%)`,
          backgroundSize: '9px 9px, cover, auto',
          backgroundPosition: 'center, center, center',
          WebkitMaskImage: mask,
          maskImage: mask,
          transition: reveal.active ? 'none' : 'mask-image 0.35s ease-out, -webkit-mask-image 0.35s ease-out',
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-xl3 ring-1 ring-inset ring-white/5" />
    </div>
  )
}
```

### `src/components/FloatingContact.tsx` {#srccomponentsfloatingcontacttsx}

The pill button fixed to the bottom-right at all times, with real mailto: / tel: / Line / GitHub links.

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MessageCircle, Code2, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/content'

export default function FloatingContact() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  const items = [
    { icon: Mail, label: links.email, href: `mailto:${links.email}` },
    { icon: Phone, label: links.phone, href: `tel:${links.phone.replace(/-/g, '')}` },
    { icon: MessageCircle, label: `Line: ${links.line}`, href: `https://line.me/ti/p/~${links.line}` },
    { icon: Code2, label: 'GitHub', href: links.github },
  ]

  return (
    <div className="fixed bottom-6 right-4 z-40 sm:bottom-8 sm:right-8">
      <div className="relative flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="glass w-64 rounded-2xl p-4"
            >
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3 text-sm text-fog/90 transition-colors hover:text-fog"
                    >
                      <item.icon size={16} className="shrink-0 text-mist" />
                      <span className="truncate">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-br from-glow-violet via-glow-blue to-glow-rose px-6 py-3 font-kanit text-sm font-medium text-ink shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_24px_-8px_rgba(139,124,246,0.6)] transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X size={16} /> : <Mail size={16} />}
          {t.hero.contactMe}
        </button>
      </div>
    </div>
  )
}
```

### `src/components/Marquee.tsx` {#srccomponentsmarqueetsx}

Two rows of project media tiles (via ProjectMedia) scrolling in opposite directions, each with its title overlaid.

```tsx
import { projects } from '../data/content'
import ProjectMedia from './ProjectMedia'

const tiles = [...projects, ...projects, ...projects]

function Row({ direction, offset = 0 }: { direction: 'left' | 'right'; offset?: number }) {
  return (
    <div className="scrollbar-none flex w-max gap-4 overflow-hidden">
      <div
        className={`flex gap-4 ${direction === 'left' ? 'motion-safe:animate-marquee-left' : 'motion-safe:animate-marquee-right'}`}
        style={{ animationDelay: `${offset}s` }}
      >
        {tiles.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="relative flex h-32 w-56 shrink-0 items-end overflow-hidden rounded-2xl border border-fog/10 sm:h-40 sm:w-72"
          >
            <ProjectMedia
              src={p.media[0].src}
              fallbackColor={p.media[0].fallbackColor}
              className="absolute inset-0"
            />
            <span className="relative z-10 w-full truncate bg-gradient-to-t from-black/60 to-transparent px-4 py-3 font-kanit text-xs text-white/90">
              {p.title.th}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative overflow-hidden bg-ink py-10 sm:py-14">
      <div className="grain absolute inset-0" />
      <div className="relative z-10 flex flex-col gap-4">
        <Row direction="right" />
        <Row direction="left" offset={-6} />
      </div>
    </section>
  )
}
```

### `src/components/About.tsx` {#srccomponentsabouttsx}

Bio text with four corner glow blobs animating in on scroll, plus a small info grid.

```tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const corners = [
  { className: 'left-6 top-16 sm:left-16', color: '#8B7CF6', from: { x: -40, y: -40 } },
  { className: 'right-6 top-24 sm:right-20', color: '#5B8DEF', from: { x: 40, y: -40 } },
  { className: 'bottom-24 left-10 sm:left-24', color: '#F2A25C', from: { x: -40, y: 40 } },
  { className: 'bottom-16 right-8 sm:right-16', color: '#F2748C', from: { x: 40, y: 40 } },
]

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-ink py-28">
      <div className="grain absolute inset-0" />

      {corners.map((c, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={`pointer-events-none absolute h-40 w-40 rounded-full sm:h-56 sm:w-56 ${c.className}`}
          style={{ background: c.color, filter: 'blur(70px)', opacity: 0.28 }}
          initial={{ opacity: 0, x: c.from.x, y: c.from.y }}
          whileInView={{ opacity: 0.28, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text mb-10 font-kanit font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          {t.about.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-balance font-kanit text-lg leading-relaxed text-fog/80 sm:text-xl"
        >
          {t.about.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
        >
          {[
            { label: t.about.workStatusLabel, value: t.hero.status },
            { label: t.about.locationLabel, value: t.about.location },
            { label: t.about.workPrefLabel, value: t.hero.workPreference },
            { label: `${t.about.thaiLabel} / ${t.about.englishLabel}`, value: `${t.about.thaiLevel} · ${t.about.englishLevel}` },
          ].map((item) => (
            <div key={item.label} className="border-t border-fog/10 pt-3">
              <p className="font-kanit text-xs text-steel">{item.label}</p>
              <p className="mt-1 font-kanit text-sm text-fog">{item.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

### `src/components/Skills.tsx` {#srccomponentsskillstsx}

Light-background section with the three skill groups as an editorial numbered list.

```tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { skillGroups } from '../data/content'

export default function Skills() {
  const { t, lang } = useLanguage()

  return (
    <section id="skills" className="relative -mt-10 rounded-t-xl3 bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 font-kanit font-black uppercase leading-none text-ink"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          {t.skills.heading}
        </motion.h2>

        <div className="flex flex-col">
          {skillGroups.map((group, gi) => (
            <div key={group.number} className="border-t border-ink/10 py-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="font-kanit text-sm text-ink/40">{group.number}</span>
                <h3 className="w-full max-w-[220px] shrink-0 font-kanit text-xl font-semibold sm:text-2xl">
                  {group.title[lang]}
                </h3>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {group.items.map((item, ii) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.4, delay: gi * 0.05 + ii * 0.05 }}
                      className="font-kanit text-base text-ink/70"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  )
}
```

### `src/components/Experience.tsx` {#srccomponentsexperiencetsx}

Timeline-style list for work experience and education.

```tsx
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { experience, education } from '../data/content'

export default function Experience() {
  const { t, lang } = useLanguage()

  return (
    <section id="experience" className="relative bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 font-kanit font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 4.5rem)' }}
        >
          {t.experience.heading}
        </motion.h2>
        <p className="mb-12 font-kanit text-sm text-ink/50">{t.experience.noExperienceNote}</p>

        <div className="flex flex-col">
          {experience.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-8 sm:gap-10"
            >
              <span className="font-kanit text-4xl font-black text-ink/10 sm:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-kanit text-xl font-semibold sm:text-2xl">{item.role[lang]}</h3>
                  <span className="font-kanit text-sm text-ink/50">{item.period[lang]}</span>
                </div>
                <p className="mt-1 font-kanit text-sm text-ink/60">{item.org[lang]}</p>
                <p className="mt-4 max-w-xl font-kanit text-base leading-relaxed text-ink/75">{item.summary[lang]}</p>
                <p className="mt-2 max-w-xl font-kanit text-sm leading-relaxed text-ink/55">{item.outcome[lang]}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-ink/10" />
        </div>

        <h3 className="mb-8 mt-16 font-kanit text-2xl font-black uppercase sm:text-3xl">
          {t.experience.educationHeading}
        </h3>
        <div className="flex flex-col">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-6 sm:gap-10"
            >
              <span className="font-kanit text-3xl font-black text-ink/10 sm:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h4 className="font-kanit text-lg font-semibold sm:text-xl">{item.school[lang]}</h4>
                <p className="mt-1 font-kanit text-sm text-ink/60">{item.field[lang]}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-ink/10" />
        </div>
      </div>
    </section>
  )
}
```

### `src/components/Projects.tsx` {#srccomponentsprojectstsx}

Dark section with a perspective-grid background; sticky-stacking project cards, each showing 3 ProjectMedia slots.

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { projects, type Project } from '../data/content'
import ProjectMedia from './ProjectMedia'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.6])

  return (
    <div ref={ref} className="sticky top-20 sm:top-24" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{ scale, opacity }}
        className="mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-xl3 border border-fog/15 bg-panel"
      >
        <div className="grid gap-0 sm:grid-cols-[1fr_1.1fr]">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 p-3 sm:gap-3 sm:p-4">
            {project.media.map((m, i) => (
              <ProjectMedia key={i} src={m.src} fallbackColor={m.fallbackColor} className="aspect-square rounded-2xl" />
            ))}
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9">
            <div className="flex items-center gap-3 font-kanit text-xs text-steel">
              <span>{project.order}</span>
              <span className="h-px w-6 bg-steel/40" />
              <span className="uppercase tracking-wide">{project.type[lang]}</span>
            </div>
            <h3 className="mt-3 font-kanit text-2xl font-bold text-fog sm:text-3xl">{project.title[lang]}</h3>
            <p className="mt-3 font-kanit text-sm leading-relaxed text-fog/70 sm:text-base">
              {project.description[lang]}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-fog/15 px-3 py-1 font-kanit text-xs text-fog/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-kanit text-xs uppercase tracking-wide text-steel">Role</dt>
                <dd className="mt-1 font-kanit text-sm text-fog/80">{project.role[lang]}</dd>
              </div>
              <div>
                <dt className="font-kanit text-xs uppercase tracking-wide text-steel">Result</dt>
                <dd className="mt-1 font-kanit text-sm text-fog/80">{project.result[lang]}</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-fog/25 px-5 py-2.5 font-kanit text-sm text-fog transition-colors hover:border-fog/60"
              >
                {t.projects.liveProject}
                <ArrowUpRight size={14} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-fog/25 px-5 py-2.5 font-kanit text-sm text-fog transition-colors hover:border-fog/60"
              >
                <Code2 size={14} />
                {t.projects.viewCode}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="projects" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="grain absolute inset-0" />
      <div className="perspective-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(91,141,239,0.12), transparent 55%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-text mb-16 font-kanit font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          {t.projects.heading}
        </motion.h2>

        <div className="flex flex-col gap-24 sm:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

### `src/components/Footer.tsx` {#srccomponentsfootertsx}

Copyright line + GitHub link.

```tsx
import { useLanguage } from '../context/LanguageContext'
import { links } from '../data/content'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-fog/10 bg-ink px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 font-kanit text-xs text-fog/50 sm:flex-row">
        <p>
          © {year} Kanpasut Sangthong — {t.footer.rights}
        </p>
        <div className="flex items-center gap-5">
          <a href={links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-fog">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
```
