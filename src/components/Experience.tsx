import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "../data";
import { Reveal, SectionHeading, ease } from "./ui";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeading index="03" kicker="Experience" title="Where I" accent="ship." />
        <div className="timeline" ref={ref}>
          <div className="tl-line" aria-hidden>
            <motion.div className="tl-fill" style={{ scaleY }} />
          </div>
          {experience.map((e) => (
            <article className={`tl-item ${e.current ? "is-current" : ""}`} key={e.period}>
              <motion.span
                className="tl-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.1 }}
                aria-hidden
              />
              <Reveal className="tl-meta" y={20}>
                <span className="tl-period mono">{e.period}</span>
                {e.current && (
                  <span className="badge-live">
                    <span className="live-dot" /> Current role
                  </span>
                )}
              </Reveal>
              <Reveal className="tl-card" delay={0.08}>
                <h3>
                  {e.role} <span className="tl-at">@ {e.company}</span>
                </h3>
                <p className="tl-place mono">{e.place}</p>
                <p className="tl-intro">{e.intro}</p>
                {e.blocks.length > 0 && (
                  <div className="tl-blocks">
                    {e.blocks.map((b, j) => (
                      <motion.div
                        className="tl-block"
                        key={b.k}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 + j * 0.07, ease }}
                        data-hover
                      >
                        <span className="tl-k mono">
                          {String(j + 1).padStart(2, "0")} · {b.k}
                        </span>
                        <p>{b.t}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
