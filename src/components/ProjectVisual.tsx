import type { ReactElement } from "react";
import type { Visual } from "../data";

/* Small animated drawings, one per project. All motion is CSS (see .pv-* in styles.css). */
export function ProjectVisual({ kind }: { kind: Visual }) {
  return (
    <svg className={`pv pv-${kind}`} viewBox="0 0 400 250" role="img" aria-label={`${kind} illustration`}>
      {VIS[kind]}
    </svg>
  );
}

const Window = ({ title }: { title: string }) => (
  <g>
    <rect x="40" y="26" width="320" height="200" rx="12" className="f-white s-line" />
    <path d="M40 38a12 12 0 0 1 12-12h296a12 12 0 0 1 12 12v12H40Z" className="f-soft" />
    <circle cx="56" cy="38" r="4" className="f-red" />
    <circle cx="69" cy="38" r="4" className="f-line" />
    <circle cx="82" cy="38" r="4" className="f-line" />
    <text x="200" y="42" textAnchor="middle" className="t-mono t-mute">
      {title}
    </text>
  </g>
);

const Phone = ({ x = 140 }: { x?: number }) => (
  <g>
    <rect x={x} y="14" width="120" height="224" rx="20" className="f-ink" />
    <rect x={x + 6} y="20" width="108" height="212" rx="15" className="f-white" />
    <rect x={x + 44} y="25" width="32" height="6" rx="3" className="f-ink" />
  </g>
);

const VIS: Record<Visual, ReactElement> = {
  dcms: (
    <g>
      <Window title="dcms / records" />
      <rect x="56" y="64" width="90" height="12" rx="6" className="f-soft" />
      <g className="pv-role">
        <rect x="282" y="62" width="62" height="18" rx="9" className="f-red" />
        <text x="313" y="74" textAnchor="middle" className="t-mono t-white">
          ADMIN
        </text>
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} className="pv-row" style={{ animationDelay: `${i * 0.35}s` }}>
          <rect x="56" y={92 + i * 25} width="288" height="19" rx="5" className="f-soft" />
          <rect x="64" y={98 + i * 25} width="14" height="7" rx="3.5" className={i % 2 ? "f-ink" : "f-red"} />
          <rect x="88" y={99 + i * 25} width={90 + ((i * 37) % 60)} height="5" rx="2.5" className="f-line" />
          <rect x="250" y={99 + i * 25} width="40" height="5" rx="2.5" className="f-line" />
          <rect x="304" y={97 + i * 25} width="30" height="9" rx="4.5" className={i === 2 ? "f-red-soft" : "f-white s-line"} />
        </g>
      ))}
    </g>
  ),
  yoga: (
    <g>
      <Phone />
      {/* pose skeleton */}
      <g className="s-red pv-pose" strokeWidth="4" strokeLinecap="round" fill="none">
        <circle cx="200" cy="66" r="9" className="f-red" />
        <path d="M200 76v44M200 120l-16 34M200 120l16 34" />
        <path className="pv-arm-l" d="M200 86l-26-18" />
        <path className="pv-arm-r" d="M200 86l26-18" />
      </g>
      {[
        [200, 76],
        [200, 120],
        [184, 154],
        [216, 154],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" className="f-ink" />
      ))}
      {/* score ring */}
      <circle cx="176" cy="196" r="16" className="s-line" strokeWidth="5" fill="none" />
      <circle cx="176" cy="196" r="16" className="s-red pv-score" strokeWidth="5" fill="none" strokeLinecap="round" transform="rotate(-90 176 196)" />
      <text x="176" y="200" textAnchor="middle" className="t-mono t-ink t-bold">
        92
      </text>
      <rect x="202" y="184" width="44" height="9" rx="4.5" className="f-soft" />
      <rect x="202" y="199" width="30" height="9" rx="4.5" className="f-red-soft" />
      {/* side cards */}
      <g className="pv-float">
        <rect x="282" y="60" width="92" height="44" rx="10" className="f-white s-line" />
        <text x="294" y="78" className="t-mono t-mute">
          streak
        </text>
        <text x="294" y="96" className="t-big t-red">
          ▲ 7d
        </text>
      </g>
      <g className="pv-float d2">
        <rect x="26" y="140" width="92" height="44" rx="10" className="f-white s-line" />
        <text x="38" y="158" className="t-mono t-mute">
          badges
        </text>
        <circle cx="46" cy="171" r="6" className="f-red" />
        <circle cx="62" cy="171" r="6" className="f-ink" />
        <circle cx="78" cy="171" r="6" className="f-line" />
      </g>
    </g>
  ),
  solvent: (
    <g>
      <rect x="20" y="20" width="360" height="210" rx="14" className="f-white s-line" />
      <path className="pv-pipe s-ink" d="M50 52h300" strokeWidth="4" fill="none" />
      <path className="pv-flow s-red" d="M50 52h300" strokeWidth="4" fill="none" strokeDasharray="10 12" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${70 + i * 100} 70)`}>
          <path d="M30 0v14" className="s-ink" strokeWidth="4" />
          <rect x="18" y="-8" width="24" height="12" rx="3" className={i === 1 ? "f-red" : "f-ink"} />
          <rect x="0" y="22" width="60" height="110" rx="10" className="f-soft s-line" />
          <clipPath id={`tank${i}`}>
            <rect x="0" y="22" width="60" height="110" rx="10" />
          </clipPath>
          <g clipPath={`url(#tank${i})`}>
            <rect className="pv-liquid" style={{ animationDelay: `${i * -1.3}s` }} x="0" y="22" width="60" height="110" />
          </g>
          <text x="30" y="148" textAnchor="middle" className="t-mono t-mute">
            {`F-0${i + 1}`}
          </text>
        </g>
      ))}
      <g className="pv-blink">
        <circle cx="42" cy="36" r="4" className="f-red" />
        <text x="52" y="40" className="t-mono t-red">
          FILLING
        </text>
      </g>
    </g>
  ),
  smartories: (
    <g>
      <Window title="smartories / line-a" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect
          key={i}
          className={`pv-bar ${i === 4 ? "f-red" : "f-ink"}`}
          style={{ animationDelay: `${i * 0.12}s` }}
          x={62 + i * 26}
          y={110}
          width="16"
          height="96"
          rx="3"
        />
      ))}
      <path d="M56 206h190" className="s-line" strokeWidth="2" />
      <circle cx="300" cy="140" r="38" className="s-soft" strokeWidth="14" fill="none" />
      <circle cx="300" cy="140" r="38" className="s-red pv-donut" strokeWidth="14" fill="none" transform="rotate(-90 300 140)" />
      <text x="300" y="138" textAnchor="middle" className="t-big t-ink">
        run
      </text>
      <text x="300" y="154" textAnchor="middle" className="t-mono t-mute">
        vs down
      </text>
      <rect x="60" y="66" width="70" height="10" rx="5" className="f-soft" />
      <rect x="140" y="66" width="40" height="10" rx="5" className="f-red-soft" />
    </g>
  ),
  occupancy: (
    <g>
      <rect x="30" y="22" width="340" height="206" rx="14" className="f-white s-line" />
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => {
          const k = r * 3 + c;
          return (
            <g key={k}>
              <rect
                className="pv-room"
                style={{ animationDelay: `${k * 0.6}s` }}
                x={46 + c * 104}
                y={38 + r * 92}
                width="96"
                height="82"
                rx="8"
              />
              <text x={56 + c * 104} y={56 + r * 92} className="t-mono t-mute">
                {`R${k + 1}0${k + 1}`}
              </text>
              {[0, 1, 2].slice(0, (k % 3) + 1).map((p) => (
                <circle
                  key={p}
                  className="pv-person"
                  style={{ animationDelay: `${(k + p) * 0.45}s` }}
                  cx={70 + c * 104 + p * 18}
                  cy={92 + r * 92}
                  r="6"
                />
              ))}
            </g>
          );
        }),
      )}
    </g>
  ),
  driving: (
    <g>
      <rect x="0" y="150" width="400" height="70" className="f-ink" />
      <path className="pv-lane" d="M0 185h400" strokeWidth="4" strokeDasharray="26 18" />
      <g className="pv-car">
        <path d="M150 166h80l18 14v14h-116v-14Z" className="f-red" />
        <path d="M168 166l12-18h40l14 18Z" className="f-red" />
        <path d="M176 164l8-12h14v12ZM204 164v-12h14l10 12Z" className="f-white" />
        <circle cx="160" cy="196" r="9" className="f-ink s-white" strokeWidth="3" />
        <circle cx="226" cy="196" r="9" className="f-ink s-white" strokeWidth="3" />
      </g>
      {["courses", "enquire", "admin"].map((t, i) => (
        <g key={t} className="pv-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <rect x={34 + i * 116} y="34" width="100" height="72" rx="10" className={i === 1 ? "f-red" : "f-white s-line"} />
          <rect x={46 + i * 116} y="48" width="44" height="8" rx="4" className={i === 1 ? "f-white" : "f-soft"} />
          <text x={46 + i * 116} y="84" className={`t-mono ${i === 1 ? "t-white" : "t-ink"}`}>
            {t}
          </text>
        </g>
      ))}
    </g>
  ),
  alumni: (
    <g>
      {[
        [80, 70, 200, 125],
        [80, 180, 200, 125],
        [320, 60, 200, 125],
        [320, 190, 200, 125],
        [80, 70, 320, 60],
        [80, 180, 320, 190],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} className="pv-edge" style={{ animationDelay: `${i * 0.25}s` }} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
      <path className="pv-match" d="M80 70L200 125L320 190" fill="none" />
      {[
        [80, 70, "f-red", "alumni"],
        [80, 180, "f-ink", "student"],
        [320, 60, "f-ink", "student"],
        [320, 190, "f-red", "alumni"],
      ].map(([x, y, c, l], i) => (
        <g key={i} className="pv-node" style={{ animationDelay: `${i * 0.3}s` }}>
          <circle cx={x as number} cy={y as number} r="22" className={c as string} />
          <circle cx={x as number} cy={(y as number) - 5} r="7" className="f-white" />
          <path d={`M${(x as number) - 11} ${(y as number) + 13}a11 9 0 0 1 22 0`} className="f-white" />
          <text x={x as number} y={(y as number) + 40} textAnchor="middle" className="t-mono t-mute">
            {l as string}
          </text>
        </g>
      ))}
      <circle cx="200" cy="125" r="30" className="f-white s-red" strokeWidth="3" />
      <text x="200" y="130" textAnchor="middle" className="t-big t-red">
        match
      </text>
    </g>
  ),
  safety: (
    <g>
      <Phone />
      <g className="s-line" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`h${i}`} d={`M146 ${44 + i * 28}h108`} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`v${i}`} d={`M${162 + i * 26} 34v156`} />
        ))}
      </g>
      <path d="M150 150c30-10 40-60 70-70s30 20 34 10" className="s-ink" strokeWidth="3" fill="none" strokeDasharray="5 6" />
      <circle cx="200" cy="96" r="18" className="f-red pv-ping" />
      <path d="M200 112s-12-10-12-20a12 12 0 0 1 24 0c0 10-12 20-12 20Z" className="f-red" />
      <circle cx="200" cy="92" r="4.5" className="f-white" />
      <circle cx="200" cy="208" r="16" className="f-red" />
      <circle cx="200" cy="208" r="16" className="s-red pv-ripple" fill="none" strokeWidth="2" />
      <circle cx="200" cy="208" r="16" className="s-red pv-ripple d2" fill="none" strokeWidth="2" />
      <text x="200" y="212" textAnchor="middle" className="t-mono t-white t-bold">
        SOS
      </text>
      <g className="pv-float">
        <rect x="270" y="70" width="118" height="46" rx="10" className="f-white s-line" />
        <text x="282" y="89" className="t-mono t-red t-bold">
          ALERT SENT
        </text>
        <text x="282" y="105" className="t-mono t-mute">
          location shared
        </text>
      </g>
    </g>
  ),
};
