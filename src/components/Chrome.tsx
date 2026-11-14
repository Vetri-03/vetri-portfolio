import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { profile, sections } from "../data";
import { Icon, Magnetic, ease, useCopy } from "./ui";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/* Which section is in view. */
export function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ---------- Intro: a red curtain with a boot counter, once per visit ---------- */
export function Intro({ onLeave, onDone }: { onLeave: () => void; onDone: () => void }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setLeaving(true);
          onLeave();
        }, 150);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      className="intro"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => leaving && onDone()}
    >
      <div className="intro-inner">
        <div className="intro-log">
          <span>$ npm run build</span>
          <span className={n > 30 ? "ok" : ""}>{n > 30 ? "✓" : "·"} spring-boot api</span>
          <span className={n > 60 ? "ok" : ""}>{n > 60 ? "✓" : "·"} react + typescript ui</span>
          <span className={n > 90 ? "ok" : ""}>{n > 90 ? "✓" : "·"} deploy → digitalocean</span>
        </div>
        <div className="intro-count">
          {n}
          <small>%</small>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Top nav + scroll progress ---------- */
export function Nav({ onPalette }: { onPalette: () => void }) {
  const active = useActiveSection();
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 40)), [scrollY]);
  const navItems = sections.filter((s) => s.id !== "home" && s.id !== "education");
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <a
          href="#home"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("home");
          }}
          aria-label="Back to top"
        >
          <span className="brand-mark">VX</span>
          <span className="brand-text">
            vetri<span className="red">.</span>dev
          </span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          {navItems.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "is-active" : ""}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(s.id);
              }}
            >
              {active === s.id && <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span>{s.label}</span>
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="kbd-btn" onClick={onPalette} aria-label="Open quick navigation">
            <Icon.Search size={15} />
            <span className="kbd">{isMac ? "⌘" : "Ctrl"} K</span>
          </button>
          <Magnetic>
            <a className="btn btn-red btn-sm" href={`mailto:${profile.email}`}>
              Hire me
            </a>
          </Magnetic>
          <button className={`burger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease }}
          >
            {sections.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05, ease }}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setTimeout(() => scrollToId(s.id), 250);
                }}
              >
                <span className="mm-i">0{i + 1}</span>
                {s.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Side rail (desktop): dots for each section ---------- */
export function Rail() {
  const active = useActiveSection();
  return (
    <nav className="rail" aria-label="Section rail">
      {sections.map((s, i) => (
        <button key={s.id} className={active === s.id ? "is-active" : ""} onClick={() => scrollToId(s.id)} aria-label={s.label}>
          <span className="rail-label">
            <b>0{i + 1}</b> {s.label}
          </span>
          <span className="rail-dot" />
        </button>
      ))}
    </nav>
  );
}

/* ---------- Command palette (⌘K, Ctrl K, / or number keys) ---------- */
type Cmd = { id: string; label: string; hint: string; run: () => void };

export function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const { copy } = useCopy();
  const [toast, setToast] = useState("");

  const cmds: Cmd[] = useMemo(
    () => [
      ...sections.map((s, i) => ({ id: s.id, label: `Go to ${s.label}`, hint: `${i + 1}`, run: () => scrollToId(s.id) })),
      { id: "email", label: "Copy email address", hint: "action", run: () => (copy(profile.email), setToast("Email copied")) },
      { id: "mail", label: "Write an email", hint: "mail", run: () => (location.href = `mailto:${profile.email}`) },
      { id: "gh", label: "Open GitHub", hint: "link", run: () => window.open(profile.github, "_blank", "noopener") },
      { id: "li", label: "Open LinkedIn", hint: "link", run: () => window.open(profile.linkedin, "_blank", "noopener") },
      { id: "cv", label: "Download résumé (PDF)", hint: "file", run: () => window.open(profile.resume, "_blank", "noopener") },
    ],
    [copy],
  );
  const list = cmds.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      } else if (!typing && !open && e.key === "/") {
        e.preventDefault();
        setOpen(true);
      } else if (!typing && !open && /^[1-8]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) {
        scrollToId(sections[Number(e.key) - 1].id);
      } else if (open && e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 1800);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    setTimeout(c.run, 120);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="palette-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div
              className="palette"
              role="dialog"
              aria-label="Quick navigation"
              initial={{ y: -20, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="palette-input">
                <span className="red mono">❯</span>
                <input
                  ref={input}
                  value={q}
                  placeholder="Jump to a section or run an action…"
                  onChange={(e) => {
                    setQ(e.target.value);
                    setSel(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setSel((s) => Math.min(list.length - 1, s + 1));
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setSel((s) => Math.max(0, s - 1));
                    } else if (e.key === "Enter") run(list[sel]);
                  }}
                />
                <span className="kbd">esc</span>
              </div>
              <ul className="palette-list">
                {list.map((c, i) => (
                  <li key={c.id}>
                    <button className={i === sel ? "is-sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                      <span>{c.label}</span>
                      <span className="kbd">{c.hint}</span>
                    </button>
                  </li>
                ))}
                {!list.length && <li className="palette-empty">No match for “{q}”</li>}
              </ul>
              <div className="palette-foot mono">
                <span>↑↓ move</span>
                <span>↵ open</span>
                <span>1–8 jump anywhere</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
            <Icon.Check size={16} /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Custom cursor (mouse only) ---------- */
export function Cursor() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(pointer: fine)");
    setEnabled(mq.matches && !reduce);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-hover], input, textarea"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y, reduce]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className={`cursor-ring ${hover ? "is-hover" : ""}`} style={{ x: sx, y: sy }} />
      <motion.div className="cursor-dot" style={{ x, y }} />
    </>
  );
}
