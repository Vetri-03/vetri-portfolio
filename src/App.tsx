import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { About } from "./components/About";
import { Nav, Rail, CommandPalette, Cursor, Intro } from "./components/Chrome";
import { Contact } from "./components/Contact";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Hero, Marquee } from "./components/Hero";
import { Pipeline } from "./components/Pipeline";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";

function shouldPlayIntro() {
  try {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (location.hash && location.hash !== "#home") return false;
    if (sessionStorage.getItem("vx-intro")) return false;
    sessionStorage.setItem("vx-intro", "1");
  } catch {
    /* storage blocked: still fine to play */
  }
  return true;
}

// decided once per page load (StrictMode would otherwise run the check twice)
const PLAY_INTRO = shouldPlayIntro();

export default function App() {
  const [intro, setIntro] = useState(PLAY_INTRO);
  const [heroReady, setHeroReady] = useState(!intro);
  const [palette, setPalette] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", intro);
  }, [intro]);

  // honour deep links like #projects once the page has rendered
  useEffect(() => {
    const id = location.hash.slice(1);
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {intro && <Intro onLeave={() => setHeroReady(true)} onDone={() => setIntro(false)} />}
      <Cursor />
      <Nav onPalette={() => setPalette(true)} />
      <Rail />
      <CommandPalette open={palette} setOpen={setPalette} />
      <main>
        <Hero ready={heroReady} />
        <Marquee />
        <About />
        <Pipeline />
        <Experience />
        <Projects filter={filter} setFilter={setFilter} />
        <Skills setFilter={setFilter} />
        <Education />
        <Contact />
      </main>
    </MotionConfig>
  );
}
