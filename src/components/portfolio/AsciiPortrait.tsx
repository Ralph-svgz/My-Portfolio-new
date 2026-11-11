import { useEffect, useRef } from "react";

// The hero portrait, drawn in text characters. It resolves out of noise on load,
// then the coloured parts of the picture (the eyes) keep a slow glow.
// To change the picture, replace public/images/portrait.jpg.

const SRC = "/images/portrait.jpg";
const RAMP = " .,:;-~=+*xo%#&@";
const NOISE = "01<>/\\[]{}#%&*+=-:.";

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

export default function AsciiPortrait({ play = true }: { play?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const playRef = useRef(play);
  const startRef = useRef(performance.now());

  // The reveal starts when the preloader hands over.
  useEffect(() => {
    playRef.current = play;
    if (play) startRef.current = performance.now();
  }, [play]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const img = new Image();
    img.src = SRC;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let cw = 0;
    let chh = 0;
    let level = new Float32Array(0); // 0..1 brightness per cell
    let tint: string[] = []; // colour per cell, taken from the picture
    let glow = new Uint8Array(0); // 1 where the cell is strongly coloured (the eyes)
    let under: HTMLCanvasElement | null = null; // brightened picture drawn beneath the characters
    let raf = 0;
    let last = 0;
    const elapsed = (now: number) => (playRef.current ? (now - startRef.current) / 1000 : 0);

    const read = () => {
      if (!img.complete || !img.naturalWidth || !w) return;
      // Cover the frame, keeping the face centred.
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sw = w / scale;
      const sh = h / scale;
      const sx = (img.naturalWidth - sw) / 2;
      const sy = (img.naturalHeight - sh) / 2;

      const small = document.createElement("canvas");
      small.width = cols;
      small.height = rows;
      const sctx = small.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      sctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const px = sctx.getImageData(0, 0, cols, rows).data;
      const n = cols * rows;
      const lum = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        lum[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
      }
      // The picture is very dark, so stretch what little range it has.
      const sorted = Float32Array.from(lum).sort();
      const lo = sorted[Math.floor(n * 0.02)];
      const span = Math.max(0.05, sorted[Math.floor(n * 0.995)] - lo);
      level = new Float32Array(n);
      glow = new Uint8Array(n);
      tint = new Array(n);
      for (let i = 0; i < n; i++) {
        const v = Math.pow(Math.min(1, Math.max(0, (lum[i] - lo) / span)), 0.55);
        level[i] = v;
        const r = px[i * 4];
        const g = px[i * 4 + 1];
        const b = px[i * 4 + 2];
        const max = Math.max(r, g, b, 1);
        const k = (255 / max) * (0.35 + 0.65 * v);
        tint[i] = `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`;
        glow[i] = max > 110 && (max - Math.min(r, g, b)) / max > 0.2 ? 1 : 0;
      }

      // Underlay: the same picture, lifted with the same curve and kept dim.
      const dpr = canvas.width / w;
      under = document.createElement("canvas");
      under.width = canvas.width;
      under.height = canvas.height;
      const uctx = under.getContext("2d", { willReadFrequently: true });
      if (!uctx) return;
      uctx.drawImage(img, sx, sy, sw, sh, 0, 0, w * dpr, h * dpr);
      const data = uctx.getImageData(0, 0, under.width, under.height);
      const lut = new Uint8ClampedArray(256);
      for (let i = 0; i < 256; i++) {
        lut[i] = Math.pow(Math.min(1, Math.max(0, (i / 255 - lo) / span)), 0.6) * 255 * 0.26;
      }
      const d = data.data;
      for (let i = 0; i < d.length; i += 4) {
        d[i] = lut[d[i]];
        d[i + 1] = lut[d[i + 1]];
        d[i + 2] = lut[d[i + 2]];
      }
      uctx.putImageData(data, 0, 0);
    };

    const draw = (now: number) => {
      const t = elapsed(now);
      const reveal = still ? 1 : Math.min(1, t / 1.7);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#0b0a10";
      ctx.fillRect(0, 0, w, h);
      if (!level.length) return;
      if (under) {
        ctx.globalAlpha = reveal * reveal;
        ctx.drawImage(under, 0, 0, w, h);
        ctx.globalAlpha = 1;
      }
      ctx.font = `700 ${Math.round(cw * 1.5)}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      const pulse = still ? 1 : 0.72 + 0.28 * Math.sin(t * 1.6);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          const gate = hash(x * 1.3, y * 2.1) * 0.7 + (y / rows) * 0.3;
          if (reveal < 1 && gate > reveal) {
            if (hash(x + Math.floor(now / 70), y) > 0.5) continue;
            ctx.fillStyle = "#4a4741";
            ctx.fillText(NOISE[Math.floor(hash(x, y + Math.floor(now / 70)) * NOISE.length)], x * cw, y * chh);
            continue;
          }
          const c = RAMP[Math.min(RAMP.length - 1, Math.floor(level[i] * RAMP.length))];
          if (c === " ") continue;
          ctx.globalAlpha = glow[i] ? pulse : 1;
          ctx.fillStyle = tint[i];
          ctx.fillText(c, x * cw, y * chh);
        }
      }
      ctx.globalAlpha = 1;
    };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Keep characters big enough to read as text, especially on phones.
      cols = Math.max(36, Math.round(w / (w < 340 ? 6.4 : 5.8)));
      cw = w / cols;
      chh = cw * 1.72;
      rows = Math.ceil(h / chh);
      read();
      draw(performance.now());
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const settling = elapsed(now) < 1.8;
      if (now - last < (settling ? 40 : 90)) return;
      last = now;
      draw(now);
    };

    img.onload = () => {
      read();
      draw(performance.now());
    };
    const ro = new ResizeObserver(size);
    ro.observe(canvas);
    size();
    document.fonts?.ready.then(() => draw(performance.now()));

    // Only animate while the portrait is on screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting && !still) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="ascii-scene"
      role="img"
      aria-label="Portrait drawn in text characters: a dark-haired figure in a scarf with glowing violet eyes."
    />
  );
}
