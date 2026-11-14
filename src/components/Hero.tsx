import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { marquee, profile, roles } from "../data";
import { scrollToId } from "./Chrome";
import { Icon, Magnetic, Typewriter, ease } from "./ui";

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`name-line ${className ?? ""}`} aria-hidden>
      {text.split("").map((c, i) => (
        <span className="char-mask" key={i}>
          <motion.span
            className="char"
            initial={{ y: "105%", rotate: 8 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 1, delay: delay + i * 0.055, ease }}
            whileHover={{ y: -10, transition: { type: "spring", stiffness: 500, damping: 12 } }}
          >
            {c}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 18 });
  const smy = useSpring(my, { stiffness: 90, damping: 18 });
  const photoX = useTransform(smx, (v) => v * 10);
  const archX = useTransform(smx, (v) => v * -16);
  const archY = useTransform(smy, (v) => v * -8);
  const ringX = useTransform(smx, (v) => v * 26);
  const ringY = useTransform(smy, (v) => v * 18);

  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 700], [0, -90]);
  const copyO = useTransform(scrollY, [0, 520], [1, 0.15]);


  return (
    <section
      id="home"
      className="hero"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set((e.clientX / window.innerWidth - 0.5) * 2);
        my.set((e.clientY / window.innerHeight - 0.5) * 2);
      }}
    >
      <div className="hero-grid" aria-hidden />
      <div className="hero-inner">
        <motion.div className="hero-copy" style={reduce ? undefined : { y: copyY, opacity: copyO }}>
          {ready && (
            <>
              <motion.p className="hero-tag" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                <span className="live-dot" />
                Developer at {profile.company}
                <span className="tag-place">· {profile.location.split(",")[0]}</span>
              </motion.p>
              <h1 className="hero-name" aria-label={profile.name}>
                <Letters text={profile.first} delay={0.2} />
                <Letters text={profile.last} delay={0.45} className="red" />
              </h1>
              <motion.p className="hero-role" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.95 }}>
                <span className="role-title">{profile.title}</span>
                <span className="role-line">
                  <span className="mono red">&gt;</span> I build <Typewriter words={roles} />
                </span>
              </motion.p>
              <motion.p className="hero-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.1 }}>
                From the MySQL schema to the React screen to the Nginx config on the server, I take products the whole way to production.
              </motion.p>
              <motion.div className="hero-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.25 }}>
                <Magnetic>
                  <a
                    className="btn btn-red"
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("projects");
                    }}
                  >
                    See my work <Icon.Arrow size={18} />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noopener">
                    <Icon.Download size={17} /> Résumé
                  </a>
                </Magnetic>
                <div className="hero-social">
                  <a href={profile.github} target="_blank" rel="noopener" aria-label="GitHub">
                    <Icon.GitHub size={20} />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                    <Icon.LinkedIn size={19} />
                  </a>
                  <a href={`mailto:${profile.email}`} aria-label="Email">
                    <Icon.Mail size={20} />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>

        <div className="hero-visual" ref={stage}>
          {ready && (
            <div className="stage">
              <motion.div className="arch-outline" style={{ x: archX, y: archY }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, delay: 0.25, ease }} />
              <motion.div className="arch" style={{ x: archX, y: archY }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, delay: 0.1, ease }} />
              <motion.div className="ring" style={{ x: ringX, y: ringY }} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.9, ease }}>
                <svg viewBox="0 0 200 200" className="ring-svg" aria-hidden>
                  <defs>
                    <path id="ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text>
                    <textPath href="#ring-path">FULL-STACK DEVELOPER • JAVA • REACT • DEVOPS • </textPath>
                  </text>
                </svg>
                <span className="ring-core">
                  <Icon.ArrowUpRight size={26} />
                </span>
              </motion.div>
              <motion.picture style={{ x: photoX }} className="photo" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, delay: 0.35, ease }}>
                <source srcSet={profile.photo} type="image/webp" />
                <img src={profile.photoFallback} alt="Vetri Xavier smiling, in sunglasses and a green Champion League T-shirt" width={887} height={852} />
              </motion.picture>
            </div>
          )}
        </div>
      </div>

      <motion.button className="scroll-cue" onClick={() => scrollToId("about")} initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 1.6 }}>
        <span className="mono">scroll</span>
        <span className="scroll-line" />
      </motion.button>
    </section>
  );
}

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-label="Tech stack">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            {t}
            <span className="marquee-star" aria-hidden>
              ✱
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
