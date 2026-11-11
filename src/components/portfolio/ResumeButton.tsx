import { useEffect, useRef, useState } from "react";
import { person } from "@/data/site";

// Download link with a short confirmation: the arrow drops into the tray,
// a bar fills, and the label says what was saved.

type Phase = "idle" | "saving" | "saved";

export default function ResumeButton({ compact = false }: { compact?: boolean }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const onClick = () => {
    timers.current.forEach(clearTimeout);
    setPhase("saving");
    timers.current = [
      window.setTimeout(() => setPhase("saved"), 1100),
      window.setTimeout(() => setPhase("idle"), 3600),
    ];
  };

  const label =
    phase === "saving" ? "Downloading" : phase === "saved" ? "Saved to downloads" : compact ? "Resume" : "Download resume";

  return (
    <a
      className={`btn resume-btn is-${phase}`}
      href={person.resumeFile}
      download={person.resumeName}
      onClick={onClick}
    >
      <span className="resume-fill" aria-hidden="true" />
      <span className="resume-label" aria-live="polite">
        {label}
      </span>
      <svg className="resume-icon" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <g className="resume-arrow">
          <path d="M10 2v10M5.5 8 10 12.5 14.5 8" />
        </g>
        <path className="resume-check" d="M4.5 9.5 8.5 13.5 15.5 5.5" />
        <path className="resume-tray" d="M3 17h14" />
      </svg>
    </a>
  );
}
