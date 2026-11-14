import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillGroups } from "../data";
import { scrollToId } from "./Chrome";
import { projectsUsing } from "./Projects";
import { SectionHeading, ease } from "./ui";

export function Skills({ setFilter }: { setFilter: (f: string) => void }) {
  const [g, setG] = useState(0);
  const group = skillGroups[g];

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading index="05" kicker="Skills" title="The" accent="toolbox." />
        <p className="section-sub">Pick a group. Skills with a red number are used in my projects: click one to see which.</p>
        <div className="skills-grid">
          <div className="sk-groups" role="tablist" aria-label="Skill groups">
            {skillGroups.map((s, i) => (
              <button
                key={s.name}
                role="tab"
                aria-selected={g === i}
                className={g === i ? "is-on" : ""}
                onClick={() => setG(i)}
                onMouseEnter={() => setG(i)}
              >
                <span className="sk-code mono">{s.code}</span>
                <span className="sk-name">{s.name}</span>
                <span className="sk-count mono">{s.skills.length}</span>
                {g === i && <motion.span className="sk-bar" layoutId="sk-bar" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              </button>
            ))}
          </div>
          <div className="sk-panel" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div key={group.name} className="sk-chips" initial="hide" animate="show" exit="hide">
                <motion.h3 variants={{ hide: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.35 }}>
                  <span className="red mono">{group.code}</span> {group.name}
                </motion.h3>
                <div className="sk-cloud">
                  {group.skills.map((s, i) => {
                    const n = projectsUsing(s).length;
                    return (
                      <motion.button
                        key={s}
                        className={`sk-chip ${n ? "has-proj" : ""}`}
                        variants={{ hide: { opacity: 0, y: 18, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
                        transition={{ duration: 0.4, delay: i * 0.035, ease }}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!n}
                        onClick={() => {
                          setFilter(`skill:${s}`);
                          scrollToId("projects");
                        }}
                        title={n ? `${n} project${n > 1 ? "s" : ""} use ${s}` : undefined}
                      >
                        {s}
                        {n > 0 && <span className="sk-n">{n}</span>}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
