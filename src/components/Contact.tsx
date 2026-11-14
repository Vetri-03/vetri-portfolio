import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data";
import { scrollToId } from "./Chrome";
import { Icon, Magnetic, ease, useCopy, wordVariants } from "./ui";

export function Contact() {
  const { copied, copy } = useCopy();
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const body = `Hi Vetri,\n\n${msg}\n\n${name ? `— ${name}` : ""}`.trim();
  const subject = `Hello from ${name || "your portfolio"}`;

  const rows = [
    { icon: <Icon.Mail size={20} />, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
    { icon: <Icon.Phone size={20} />, label: "Phone", value: profile.phone, href: `tel:+${profile.phoneRaw}`, copy: profile.phone },
    { icon: <Icon.LinkedIn size={19} />, label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
    { icon: <Icon.GitHub size={20} />, label: "GitHub", value: profile.githubLabel, href: profile.github },
    { icon: <Icon.Pin size={20} />, label: "Based in", value: profile.location },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="contact-big" aria-hidden>
        <div className="contact-big-track">
          <span>LET’S BUILD ✱ LET’S BUILD ✱ LET’S BUILD ✱ </span>
          <span>LET’S BUILD ✱ LET’S BUILD ✱ LET’S BUILD ✱ </span>
        </div>
      </div>
      <div className="container contact-grid">
        <div>
          <motion.p className="sec-kicker light" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="sec-index">07</span>
            <span className="sec-line" />
            <span>Contact</span>
          </motion.p>
          <motion.h2 className="contact-title" initial="hide" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.07 }}>
            {["Got", "a", "product", "to", "ship?"].map((w, i) => (
              <span className="word-mask" key={i}>
                <motion.span className="word" variants={wordVariants}>
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <p className="contact-sub">I’m happy to talk about full-stack roles, freelance builds or anything Spring Boot, React and DevOps.</p>
          <ul className="contact-rows">
            {rows.map((r, i) => (
              <motion.li key={r.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.06, ease }}>
                <span className="cr-icon">{r.icon}</span>
                <span className="cr-text">
                  <span className="cr-label mono">{r.label}</span>
                  {r.href ? (
                    <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noopener">
                      {r.value}
                    </a>
                  ) : (
                    <span>{r.value}</span>
                  )}
                </span>
                {r.copy && (
                  <button className="cr-copy" onClick={() => copy(r.copy!)} aria-label={`Copy ${r.label}`}>
                    {copied === r.copy ? <Icon.Check size={16} /> : <Icon.Copy size={16} />}
                  </button>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.form
          className="contact-form"
          initial={{ opacity: 0, y: 40, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          onSubmit={(e) => {
            e.preventDefault();
            location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          <div className="term-bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="mono">POST /api/hello</span>
          </div>
          <div className="form-body">
            <label>
              <span className="mono">name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
            </label>
            <label>
              <span className="mono">message</span>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={5} placeholder="Tell me about the role or the project…" required />
            </label>
            <pre className="form-preview mono" aria-hidden>
              {`{ "from": "${name || "…"}", "length": ${msg.length} }`}
            </pre>
            <div className="form-actions">
              <Magnetic>
                <button className="btn btn-red" type="submit">
                  <Icon.Mail size={17} /> Send by email
                </button>
              </Magnetic>
              <a
                className="btn btn-ghost"
                href={`https://wa.me/${profile.phoneRaw}?text=${encodeURIComponent(body)}`}
                target="_blank"
                rel="noopener"
              >
                <Icon.WhatsApp size={17} /> WhatsApp
              </a>
            </div>
          </div>
        </motion.form>
      </div>

      <footer className="footer container">
        <span>© {new Date().getFullYear()} Vetri Xavier S</span>
        <span className="mono">Built with React, TypeScript & Framer Motion</span>
        <button onClick={() => scrollToId("home")} className="to-top">
          Back to top <span className="up">↑</span>
        </button>
      </footer>
      <AnimatePresence>
        {copied && (
          <motion.div className="toast" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
            <Icon.Check size={16} /> Copied {copied}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
