import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

/* Fade-and-rise when the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </M>
  );
}

/* Word reveal, driven by the parent heading (a clipped child never counts as "in view"). */
export const wordVariants = {
  hide: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

/* Big section heading: each word slides up out of a mask, accent word in red. */
export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  light = false,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  light?: boolean;
}) {
  const words = title.split(" ");
  return (
    <header className={`sec-head ${light ? "is-light" : ""}`}>
      <Reveal className="sec-kicker" y={12}>
        <span className="sec-index">{index}</span>
        <span className="sec-line" />
        <span>{kicker}</span>
      </Reveal>
      <motion.h2
        className="sec-title"
        initial="hide"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: 0.07 }}
      >
        {[...words, ...(accent ? [accent] : [])].map((w, i) => (
          <span className="word-mask" key={i}>
            <motion.span className={`word ${accent && i === words.length ? "accent" : ""}`} variants={wordVariants}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.h2>
    </header>
  );
}

/* Pulls its child gently toward the pointer. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const reduce = useReducedMotion();
  return (
    <motion.span
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* Number that counts up when visible. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* Writes and erases a list of phrases. */
export function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) {
      setText(words[i]);
      const t = setTimeout(() => setI((i + 1) % words.length), 2600);
      return () => clearTimeout(t);
    }
    const full = words[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text === full) t = setTimeout(() => setDel(true), 1700);
    else if (del && text === "") {
      setDel(false);
      setI((i + 1) % words.length);
    } else
      t = setTimeout(
        () => setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        del ? 28 : 58,
      );
    return () => clearTimeout(t);
  }, [text, del, i, words, reduce]);
  return (
    <span className="typewriter">
      {text}
      <span className="caret" aria-hidden />
    </span>
  );
}

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (value: string) => {
    navigator.clipboard?.writeText(value).then(
      () => {
        setCopied(value);
        setTimeout(() => setCopied(null), 1800);
      },
      () => {},
    );
  };
  return { copied, copy };
}

/* ---------- Icons ---------- */
type IP = { size?: number };
const svg = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Icon = {
  Arrow: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  ArrowUpRight: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  Download: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M12 4v11m0 0-5-5m5 5 5-5M5 20h14" />
    </svg>
  ),
  Mail: ({ size }: IP) => (
    <svg {...svg(size)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  Phone: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    </svg>
  ),
  Pin: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Copy: ({ size }: IP) => (
    <svg {...svg(size)}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a1 1 0 0 1 1-1h9" />
    </svg>
  ),
  Check: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="m5 12 5 5 9-10" />
    </svg>
  ),
  Close: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Search: ({ size }: IP) => (
    <svg {...svg(size)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  Send: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
    </svg>
  ),
  Cap: ({ size }: IP) => (
    <svg {...svg(size)}>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11v5c3 2 9 2 12 0v-5" />
    </svg>
  ),
  Badge: ({ size }: IP) => (
    <svg {...svg(size)}>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
    </svg>
  ),
  Mic: ({ size }: IP) => (
    <svg {...svg(size)}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  ),
  GitHub: ({ size = 18 }: IP) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  ),
  LinkedIn: ({ size = 18 }: IP) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  WhatsApp: ({ size = 18 }: IP) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44a9.43 9.43 0 0 1 9.44 9.45c0 5.2-4.24 9.44-9.45 9.44M20.08 3.92A11.3 11.3 0 0 0 12.05.6C5.8.6.7 5.7.7 11.95c0 2 .52 3.95 1.52 5.67L.6 23.4l5.9-1.55a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.35-5.1 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03" />
    </svg>
  ),
};
