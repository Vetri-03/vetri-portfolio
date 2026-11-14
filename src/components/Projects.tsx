import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { filters, projects, type Project } from "../data";
import { ProjectVisual } from "./ProjectVisual";
import { Icon, SectionHeading, ease } from "./ui";

export const skillAlias: Record<string, string> = {
  "JavaScript (ES6+)": "JavaScript",
};

export function projectsUsing(skill: string) {
  const s = (skillAlias[skill] ?? skill).toLowerCase();
  return projects.filter((p) => p.stack.some((l) => l.items.some((it) => it.toLowerCase() === s)));
}

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const glowX = useTransform(sry, [-8, 8], ["20%", "80%"]);
  const glowY = useTransform(srx, [8, -8], ["20%", "80%"]);
  const all = p.stack.flatMap((l) => l.items);

  return (
    <motion.article
      layout
      className="pcard"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.55, ease, delay: Math.min(i, 5) * 0.05 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <button className="pcard-hit" onClick={onOpen} aria-label={`Open ${p.full}`} />
      <div className="pcard-visual">
        <motion.span className="pcard-glow" style={{ left: glowX, top: glowY }} aria-hidden />
        <ProjectVisual kind={p.visual} />
        {p.featured && <span className="pcard-flag mono">featured</span>}
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <span className="pcard-n mono">{String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
          <span className="pcard-open">
            <Icon.ArrowUpRight size={20} />
          </span>
        </div>
        <h3>{p.title}</h3>
        <p className="pcard-full">{p.full}</p>
        <p className="pcard-tag">{p.tagline}</p>
        <div className="chips sm">
          {all.slice(0, 5).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
          {all.length > 5 && <span className="chip more">+{all.length - 5}</span>}
        </div>
      </div>
    </motion.article>
  );
}

function Modal({ p, onClose, onStep }: { p: Project; onClose: () => void; onStep: (d: number) => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.full}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.45, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <Icon.Close size={20} />
        </button>
        <AnimatePresence mode="wait">
          <motion.div key={p.id} className="modal-inner" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3, ease }}>
            <div className="modal-visual">
              <ProjectVisual kind={p.visual} />
            </div>
            <div className="modal-body">
              <span className="mono red">case · {String(projects.indexOf(p) + 1).padStart(2, "0")}</span>
              <h3>{p.title}</h3>
              <p className="modal-full">{p.full}</p>
              <p className="modal-sum">{p.summary}</p>
              <h4>What I built</h4>
              <ul className="built">
                {p.built.map((b, i) => (
                  <motion.li key={b} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                    <Icon.Check size={16} /> {b}
                  </motion.li>
                ))}
              </ul>
              <h4>Stack</h4>
              <div className="stack-table">
                {p.stack.map((l) => (
                  <div key={l.layer} className="stack-row">
                    <span className="mono">{l.layer}</span>
                    <span className="chips sm">
                      {l.items.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="modal-nav">
          <button onClick={() => onStep(-1)} aria-label="Previous project">
            <span className="flip">
              <Icon.Arrow size={18} />
            </span>{" "}
            Prev
          </button>
          <span className="mono">← → to browse</span>
          <button onClick={() => onStep(1)} aria-label="Next project">
            Next <Icon.Arrow size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const isSkill = filter.startsWith("skill:");
  const skill = filter.slice(6);

  const list = useMemo(() => {
    if (filter === "all") return projects;
    if (isSkill) return projectsUsing(skill);
    return projects.filter((p) => p.tags.includes(filter));
  }, [filter, isSkill, skill]);

  const open = projects.find((p) => p.id === openId) ?? null;
  const step = (d: number) => {
    const pool = list.length ? list : projects;
    const i = pool.findIndex((p) => p.id === openId);
    setOpenId(pool[(i + d + pool.length) % pool.length].id);
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading index="04" kicker="Projects" title="Things I’ve" accent="built." />
        <div className="filters" role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button key={f.key} role="tab" aria-selected={filter === f.key} className={filter === f.key ? "is-on" : ""} onClick={() => setFilter(f.key)}>
              {filter === f.key && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span>{f.label}</span>
            </button>
          ))}
          {isSkill && (
            <button className="is-on skill-filter" onClick={() => setFilter("all")}>
              <motion.span layoutId="filter-pill" className="filter-pill" />
              <span>
                uses {skill} <Icon.Close size={13} />
              </span>
            </button>
          )}
        </div>
        <p className="filter-count mono">
          showing {list.length} of {projects.length}
        </p>

        <motion.div layout className="pgrid">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <Card key={p.id} p={p} i={i} onOpen={() => setOpenId(p.id)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>{open && <Modal p={open} onClose={() => setOpenId(null)} onStep={step} />}</AnimatePresence>
    </section>
  );
}
