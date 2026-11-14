import { motion } from "framer-motion";
import { certifications, education, workshops } from "../data";
import { Icon, Reveal, SectionHeading, ease } from "./ui";

export function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <SectionHeading index="06" kicker="Education & more" title="Learning," accent="then teaching." />
        <div className="edu-grid">
          <Reveal className="edu-card degree">
            <span className="edu-icon">
              <Icon.Cap size={26} />
            </span>
            <span className="mono edu-period">{education.period}</span>
            <h3>{education.degree}</h3>
            <p>{education.school}</p>
            <span className="edu-score">{education.score}</span>
          </Reveal>

          <div className="edu-card certs">
            <Reveal className="edu-head">
              <span className="edu-icon">
                <Icon.Badge size={24} />
              </span>
              <h3>Certifications</h3>
            </Reveal>
            <ul>
              {certifications.map((c, i) => (
                <motion.li
                  key={c.name}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  data-hover
                >
                  <span className="cert-name">{c.name}</span>
                  <span className="cert-by mono">{c.by}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <Reveal className="edu-card talks" delay={0.1}>
            <span className="edu-icon">
              <Icon.Mic size={24} />
            </span>
            <h3>Workshops & talks</h3>
            <p>{workshops}</p>
            <div className="chips sm">
              <span className="chip">Django</span>
              <span className="chip">React</span>
              <span className="chip">Embedded systems</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
