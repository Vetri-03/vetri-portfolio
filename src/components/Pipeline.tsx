import { useEffect, useRef, useState, type ReactElement } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { layers } from "../data";
import { Icon, SectionHeading, ease } from "./ui";

const glyphs: Record<string, ReactElement> = {
  client: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  edge: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  process: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  ),
  api: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  ),
};

type Line = { id: number; text: string; kind: "req" | "ok" | "res" };

export function Pipeline() {
  const [step, setStep] = useState(-1); // which layer the packet is on
  const [focus, setFocus] = useState(0); // which layer's details are shown
  const [running, setRunning] = useState(false);
  const [returning, setReturning] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const id = useRef(0);
  const logBox = useRef<HTMLDivElement>(null);

  const push = (text: string, kind: Line["kind"]) => setLines((l) => [...l.slice(-7), { id: ++id.current, text, kind }]);

  const run = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setReturning(false);
    setLines([]);
    push("$ curl -X POST https://api.example.app/v1/sessions", "req");
    layers.forEach((l, i) => {
      timers.current.push(
        setTimeout(() => {
          setStep(i);
          setFocus(i);
          push(l.log, "ok");
        }, 500 + i * 850),
      );
    });
    const back = 500 + layers.length * 850;
    timers.current.push(
      setTimeout(() => {
        setReturning(true);
        setStep(0);
      }, back),
    );
    timers.current.push(
      setTimeout(() => {
        push("← 201 Created · JSON delivered to the UI", "res");
        setRunning(false);
        setReturning(false);
      }, back + 900),
    );
  };

  useEffect(() => {
    if (inView) run();
    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    const el = logBox.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const layer = layers[focus];
  const pct = step < 0 ? 0 : (step / (layers.length - 1)) * 80 + 10;

  return (
    <section id="stack" className="section pipeline">
      <div className="container">
        <SectionHeading index="02" kicker="How I build" title="One request," accent="every layer." />
        <p className="section-sub">
          Follow a request from the screen to the database and back. These are the layers I build and run myself. Click any layer to see what I do
          there.
        </p>

        <div className="pipe" ref={ref}>
          <div className="pipe-track" aria-hidden>
            <motion.div className="pipe-fill" animate={{ width: `${step < 0 ? 0 : (step / (layers.length - 1)) * 100}%` }} transition={{ duration: 0.8, ease }} />
            <span className="pipe-flow" />
          </div>
          {step >= 0 && (
            <motion.span
              className={`packet ${returning ? "is-back" : ""}`}
              animate={{ left: `${pct}%` }}
              transition={{ duration: returning ? 0.9 : 0.7, ease }}
              aria-hidden
            />
          )}
          <div className="pipe-nodes">
            {layers.map((l, i) => (
              <button
                key={l.id}
                className={`node ${step >= i ? "is-hit" : ""} ${focus === i ? "is-focus" : ""}`}
                onClick={() => setFocus(i)}
                onMouseEnter={() => !running && setFocus(i)}
                aria-pressed={focus === i}
              >
                <span className="node-ring">
                  {glyphs[l.id]}
                  {step === i && <motion.span className="node-pulse" initial={{ scale: 0.6, opacity: 0.8 }} animate={{ scale: 1.9, opacity: 0 }} transition={{ duration: 0.9 }} />}
                </span>
                <span className="node-name">{l.name}</span>
                <span className="node-short mono">{l.short}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pipe-panels">
          <div className="layer-card">
            <AnimatePresence mode="wait">
              <motion.div key={layer.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease }}>
                <span className="layer-idx mono">
                  layer 0{focus + 1} / 0{layers.length}
                </span>
                <h3>{layer.name}</h3>
                <p>{layer.what}</p>
                <div className="chips">
                  {layer.tools.map((t, i) => (
                    <motion.span key={t} className="chip" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.05 }}>
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="terminal">
            <div className="term-bar">
              <span className="dots">
                <i />
                <i />
                <i />
              </span>
              <span className="mono">request.log</span>
              <button className="term-run" onClick={run} disabled={running}>
                <Icon.Send size={14} /> {running ? "Running…" : "Send request"}
              </button>
            </div>
            <div className="term-body mono" aria-live="polite" ref={logBox}>
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.div key={l.id} className={`term-line ${l.kind}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                    {l.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {!running && <span className="term-caret">▍</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
