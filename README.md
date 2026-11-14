# Vetri Xavier · Portfolio

Interactive portfolio for Vetri Xavier S, Full-Stack Developer at Quantanics Techserv (Java, Spring Boot, React, TypeScript, DevOps & Cloud). Built with **React 19, TypeScript, Vite and Framer Motion**.

Theme: red and white. Fonts: Archivo (wide display headings), Geist (body), Geist Mono (labels and code).

## Commands

```bash
npm install      # first time only
npm run dev      # local preview at http://localhost:5173
npm run build    # production build in dist/ (this is what you upload)
npm run preview  # check the production build locally
```

## What's on the page

| # | Section | What it is |
|---|---------|-----------|
| – | Home | Letter-by-letter name reveal, typewriter roles, background-removed photo standing in a red arch (head rises out of it), rotating badge, mouse parallax, then the tech marquee |
| 01 | About | Summary, count-up stats, five "what I do" cards that fill red on hover |
| 02 | How I build | A request travels Client → Nginx/TLS → Gunicorn/Systemd → API → MySQL with a live `request.log`; click any layer, or **Send request** to replay |
| 03 | Experience | Timeline that fills as you scroll; current role split into Backend / Frontend / Mobile / CV / DevOps |
| 04 | Projects | 8 cards with animated drawings, filters, 3D tilt; click for a case study (← → to browse) |
| 05 | Skills | Six groups; a red number = projects using that skill; click it to filter Projects |
| 06 | Education | B.Tech, certifications, workshops |
| 07 | Contact | Copyable email/phone, links, and a message box that opens email or WhatsApp pre-filled |

Ways to move around: scroll, top nav, dot rail on the right (desktop), **⌘K / Ctrl K** or **/** palette, number keys **1–8**. A short red "build" intro plays once per visit (skipped for reduced motion and deep links).

## Where things live

```
src/data.ts                     all text, taken from the résumé
src/components/Hero.tsx         hero + marquee
src/components/Pipeline.tsx     the request-lifecycle section
src/components/ProjectVisual.tsx  the 8 animated project drawings
public/assets/vetri-cutout.*    photo with the background removed (webp + png fallback)
public/assets/Vetri_Xavier_Resume.pdf   the "Résumé" button
```

After hosting, update the `og:image` URL in `index.html` to the full address.
