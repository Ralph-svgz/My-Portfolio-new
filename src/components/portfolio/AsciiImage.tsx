import { useEffect, useRef, useState } from "react";

// Shows a screenshot as text characters. Hover, focus or press the toggle to see the real image.

const RAMP = " .,:;-~=+*xo%#&@";

type Props = { src: string; alt: string; cols?: number };

export default function AsciiImage({ src, alt, cols = 104 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [real, setReal] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dead = false;
    const img = new Image();
    img.src = src;
    setReady(false);

    const render = () => {
      if (dead || !img.complete || !img.naturalWidth) return;
      const box = canvas.getBoundingClientRect();
      if (!box.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(box.width * dpr);
      canvas.height = Math.round(box.height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.max(48, Math.min(cols, Math.round(box.width / 6)));
      const cw = box.width / n;
      const ch = cw * 1.7;
      const rows = Math.ceil(box.height / ch);

      // Read the picture at one pixel per character.
      const small = document.createElement("canvas");
      small.width = n;
      small.height = rows;
      const sctx = small.getContext("2d", { willReadFrequently: true });
      if (!sctx) return;
      const scale = Math.max(box.width / img.naturalWidth, box.height / img.naturalHeight);
      const sw = box.width / scale;
      const sh = box.height / scale;
      sctx.drawImage(img, (img.naturalWidth - sw) / 2, 0, sw, sh, 0, 0, n, rows);
      const px = sctx.getImageData(0, 0, n, rows).data;

      const lum = new Float32Array(n * rows);
      let mean = 0;
      for (let i = 0; i < lum.length; i++) {
        lum[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
        mean += lum[i];
      }
      mean /= lum.length;
      const darkSite = mean < 0.5;
      // Stretch contrast between the 4th and 99th percentile so dim sites still read.
      const sorted = Float32Array.from(lum).sort();
      const lo = sorted[Math.floor(sorted.length * (darkSite ? 0.3 : 0.01))];
      const hi = sorted[Math.floor(sorted.length * (darkSite ? 0.995 : 0.7))];
      const span = Math.max(0.06, hi - lo);

      ctx.fillStyle = "#efecf3";
      ctx.fillRect(0, 0, box.width, box.height);
      ctx.fillStyle = "#0b0a10";
      ctx.font = `700 ${Math.round(cw * 1.55)}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < n; x++) {
          let v = Math.min(1, Math.max(0, (lum[y * n + x] - lo) / span));
          if (!darkSite) v = 1 - v; // ink always marks the figure, not the background
          const c = RAMP[Math.min(RAMP.length - 1, Math.floor(Math.pow(v, 0.6) * RAMP.length))];
          if (c !== " ") ctx.fillText(c, x * cw, y * ch);
        }
      }
      setReady(true);
    };

    img.onload = render;
    const ro = new ResizeObserver(render);
    ro.observe(canvas);
    document.fonts?.ready.then(render);
    return () => {
      dead = true;
      ro.disconnect();
    };
  }, [src, cols]);

  return (
    <div className={`ascii-img${real ? " is-real" : ""}${ready ? " is-ready" : ""}`}>
      <img src={src} alt={alt} loading="lazy" />
      <canvas ref={canvasRef} aria-hidden="true" />
      <button type="button" className="ascii-toggle" aria-pressed={real} onClick={() => setReal((r) => !r)}>
        {real ? "Show ASCII" : "Show screenshot"}
      </button>
    </div>
  );
}
