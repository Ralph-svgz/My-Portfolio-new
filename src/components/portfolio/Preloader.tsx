import { useEffect, useLayoutEffect, useState } from "react";
import { person } from "@/data/site";

// Full-screen loader shown until fonts and the hero portrait are ready.
// It counts up on a text progress bar, then slides away.

const GLYPHS = "01<>/\\[]{}#%&*+=-:";
const BAR = 22;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [tick, setTick] = useState(0);

  // Remove the static cover from index.html once this one is on screen.
  useLayoutEffect(() => {
    document.getElementById("boot")?.remove();
  }, []);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ready = false;
    const img = new Image();
    img.src = "/images/portrait.jpg";
    const assets = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      img.decode ? img.decode().catch(() => undefined) : Promise.resolve(),
    ]);
    const cap = new Promise((r) => setTimeout(r, 4000));
    Promise.race([assets, cap]).then(() => {
      ready = true;
    });

    const began = performance.now();
    const minTime = still ? 0 : 1300;
    let timers: number[] = [];
    const id = window.setInterval(() => {
      const t = performance.now() - began;
      // Ease towards 90% while waiting, finish once everything has loaded.
      const eased = 90 * (1 - Math.exp(-t / 450));
      setTick((n) => n + 1);
      if (ready && t >= minTime) {
        window.clearInterval(id);
        setPct(100);
        timers = [
          window.setTimeout(() => {
            setLeaving(true);
            onDone();
          }, still ? 0 : 280),
          window.setTimeout(() => setGone(true), still ? 0 : 1000),
        ];
      } else {
        setPct(Math.floor(eased));
      }
    }, 60);
    return () => {
      window.clearInterval(id);
      timers.forEach(clearTimeout);
    };
    // onDone is stable for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  const name = person.name.toUpperCase();
  const settled = Math.floor((pct / 100) * name.length);
  const shown = name
    .split("")
    .map((ch, i) => (i < settled || ch === " " ? ch : GLYPHS[(i * 7 + tick * 3) % GLYPHS.length]))
    .join("");
  const filled = Math.round((pct / 100) * BAR);

  return (
    <div className={`preloader${leaving ? " is-leaving" : ""}`} role="status" aria-label="Loading portfolio">
      <div className="preloader-inner" aria-hidden="true">
        <p className="preloader-name">{shown}</p>
        <p className="preloader-bar">
          [<span>{"#".repeat(filled)}</span>
          {".".repeat(BAR - filled)}] {String(pct).padStart(3, " ")}%
        </p>
        <p className="preloader-note">
          loading portfolio <span className="kana">ロード中</span>
        </p>
      </div>
    </div>
  );
}
