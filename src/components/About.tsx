import { motion } from "framer-motion";
import { profile, stats } from "../data";
import { CountUp, Reveal, SectionHeading, ease } from "./ui";

const services = [
  {
    n: "01",
    t: "Backend & APIs",
    d: "REST APIs in Spring Boot, Django, Flask, Express.js and CodeIgniter, with authentication and role-based access control.",
    k: ["Java", "Python", "Node.js"],
  },
  {
    n: "02",
    t: "Frontend & dashboards",
    d: "Responsive React and TypeScript interfaces: live dashboards, reports and user-management modules.",
    k: ["React", "TypeScript"],
  },
  {
    n: "03",
    t: "Mobile apps",
    d: "Cross-platform apps with React Native, and native Android with Kotlin.",
    k: ["React Native", "Kotlin"],
  },
  {
    n: "04",
    t: "DevOps & cloud",
    d: "Linux servers on DigitalOcean with Nginx, Gunicorn, Systemd and SSL, plus uptime monitoring.",
    k: ["DigitalOcean", "Nginx"],
  },
  {
    n: "05",
    t: "Computer vision in products",
    d: "OpenCV, YOLO and MediaPipe models wired into real apps, like live pose scoring.",
    k: ["OpenCV", "YOLO", "MediaPipe"],
  },
];

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeading index="01" kicker="About" title="Schema to server," accent="end to end." />
        <div className="about-grid">
          <div className="about-text">
            <Reveal>
              <p className="lead">
                Hi, I’m <strong>Vetri</strong>. I’m a <mark>full-stack developer</mark> at Quantanics Techserv in Madurai, where I design, build and deploy
                production web apps and REST APIs.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{profile.summary}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>{profile.summary2}</p>
            </Reveal>
          </div>
          <div className="stats">
            {stats.map((s, i) => (
              <motion.div
                className="stat"
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
              >
                <span className="stat-n">
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
                <span className="stat-l">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="services">
          {services.map((s, i) => (
            <motion.article
              className="service"
              key={s.t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.07, ease }}
              data-hover
            >
              <span className="service-n mono">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <div className="service-k">
                {s.k.map((k) => (
                  <span key={k}>{k}</span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
