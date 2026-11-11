import { useState } from "react";
import AsciiPortrait from "@/components/portfolio/AsciiPortrait";
import AsciiImage from "@/components/portfolio/AsciiImage";
import Preloader from "@/components/portfolio/Preloader";
import ResumeButton from "@/components/portfolio/ResumeButton";
import {
  certifications,
  education,
  experience,
  featured,
  person,
  skills,
} from "@/data/site";

const Arrow = ({
  dir = "right",
}: {
  dir?: "right" | "up" | "left" | "down";
}) => (
  <svg
    className={`arrow arrow-${dir}`}
    viewBox="0 0 16 16"
    width="13"
    height="13"
    aria-hidden="true"
  >
    <path d="M2 8h11M9 4l4 4-4 4" />
  </svg>
);

const Mark = () => (
  <a className="mark" href="#top">
    <span aria-hidden="true">&lt;/&gt;</span> {person.name}
  </a>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.560 9.560 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
const TelegramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinejoin="round"
  >
    <path d="M21 4 3 11l6 2.5M21 4l-3 15-9-5.500M21 4 9 13.500V19l3.200-3.500" />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="17"
    height="17"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M4.5 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM3 8.5h3V21H3V8.5Zm5.5 0h2.900v1.700c.6-1.100 1.900-2 3.800-2 3.400 0 4.300 2.100 4.300 5.300V21h-3v-6.700c0-1.600-.4-2.800-2-2.800-1.700 0-2.500 1.200-2.500 2.800V21h-3.500V8.500Z" />
  </svg>
);
const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="5" width="18" height="14" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

const Socials = () => (
  <ul className="socials">
    <li>
      <a
        href={person.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>
    </li>
    <li>
      <a
        href={person.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <LinkedinIcon />
      </a>
    </li>
    <li>
      <a
        href={person.telegram}
        target="_blank"
        rel="noreferrer"
        aria-label="Telegram"
      >
        <TelegramIcon />
      </a>
    </li>
    <li>
      <a href={`mailto:${person.email}`} aria-label="Email">
        <MailIcon />
      </a>
    </li>
  </ul>
);

export default function Index() {
  const [slide, setSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const project = featured[slide];
  const go = (d: number) =>
    setSlide((s) => (s + d + featured.length) % featured.length);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <div className="sheet" id="top">
        <header className="nav">
          <Mark />
          <nav aria-label="Sections">
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#certs">Certifications</a>
          </nav>
          <a className="nav-contact" href="#contact">
            Contact me <Arrow />
          </a>
        </header>

        <main>
          <section className="hero">
            <div className="hero-copy grid-paper">
              <p className="chip">Hey, I'm {person.name.split(" ")[0]}</p>
              <h1>
                AI trainer &amp;
                <br />
                frontend
                <br />
                developer
              </h1>
              <p className="lede">{person.intro}</p>
              <div className="actions">
                <a className="btn btn-lime" href="#projects">
                  View my work <Arrow dir="up" />
                </a>
                <ResumeButton />
              </div>
              <p className="tiny-label">Connect with me</p>
              <Socials />
            </div>

            <div className="hero-art halftone">
              <span className="kana kana-side" aria-hidden="true">
                ポートフォリオ
              </span>
              <figure className="frame">
                <AsciiPortrait play={loaded} />
              </figure>
              <pre className="code-card" aria-label="Summary in code form">
                <span className="c-dim">&gt; const</span> samuel = {"{"}
                {"\n"} <span className="c-key">trains</span>:{" "}
                <span className="c-str">'prompts, grading, QA'</span>,{"\n"}{" "}
                <span className="c-key">builds</span>:{" "}
                <span className="c-str">'React, Next.js, agents'</span>,{"\n"}{" "}
                <span className="c-key">based</span>:{" "}
                <span className="c-str">'Nigeria, remote'</span>,{"\n"}{" "}
                <span className="c-key">status</span>:{" "}
                <span className="c-str">'open to contracts'</span>
                {"\n"}
                {"}"}
              </pre>
            </div>
          </section>

          <section className="skills" id="skills" aria-labelledby="skills-h">
            <div className="side-label side-violet">
              <h2 id="skills-h">Skills</h2>
              <span className="kana" aria-hidden="true">
                スキル
              </span>
            </div>
            <div className="skill-grid">
              {skills.map((s) => (
                <div className="skill-col" key={s.group}>
                  <h3>
                    {s.group}
                    <span className="kana" aria-hidden="true">
                      {s.jp}
                    </span>
                  </h3>
                  <ul>
                    {s.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="split">
            <section
              className="featured"
              id="projects"
              aria-labelledby="projects-h"
            >
              <div className="featured-head">
                <div>
                  <h2 id="projects-h">
                    Featured projects
                    <span className="kana" aria-hidden="true">
                      作品
                    </span>
                  </h2>
                  <a
                    className="btn btn-small"
                    href={person.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    More on GitHub <Arrow />
                  </a>
                </div>
                <div className="pager">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                  >
                    <Arrow dir="left" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next project"
                  >
                    <Arrow />
                  </button>
                </div>
              </div>

              <article className="card" key={project.name} aria-live="polite">
                <div className="card-shot">
                  {project.shot && (
                    <AsciiImage
                      src={project.shot}
                      alt={`Screenshot of the ${project.name} home page`}
                    />
                  )}
                </div>
                <div className="card-body">
                  <p className="card-meta">
                    <span>{project.kind}</span>
                    <span>{project.status}</span>
                  </p>
                  <h3>{project.name}</h3>
                  <p className="card-blurb">{project.blurb}</p>
                  <ul className="tags">
                    {project.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  {project.url && (
                    <a
                      className="btn"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit {project.url.replace(/^https?:\/\/(www\.)?/, "")}{" "}
                      <Arrow />
                    </a>
                  )}
                </div>
              </article>

              <div
                className="dots"
                role="tablist"
                aria-label="Choose a project"
              >
                {featured.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    role="tab"
                    aria-selected={i === slide}
                    aria-label={p.name}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
            </section>

            <aside className="certs" id="certs" aria-labelledby="certs-h">
              <h2 id="certs-h">
                Certifications
                <span className="kana" aria-hidden="true">
                  資格
                </span>
              </h2>
              <ul>
                {certifications.map((c) => (
                  <li key={c.name}>
                    <strong>{c.name}</strong>
                    <span>{c.by}</span>
                  </li>
                ))}
                <li className="cert-edu">
                  <strong>{education.degree}</strong>
                  <span>
                    {education.school}, {education.when}
                  </span>
                </li>
              </ul>
            </aside>
          </div>

          <div className="split split-exp">
            <section className="exp" id="experience" aria-labelledby="exp-h">
              <div className="side-label side-pink">
                <h2 id="exp-h">Experience</h2>
                <span className="kana" aria-hidden="true">
                  経歴
                </span>
              </div>
              <div className="exp-body">
                <ol className="timeline">
                  {experience.map((e) => (
                    <li key={e.role + e.where}>
                      <h3>
                        {e.role} <span className="at">at</span> {e.where}
                      </h3>
                      <p className="when">{e.when}</p>
                      <p>{e.text}</p>
                    </li>
                  ))}
                </ol>
                <ResumeButton compact />
              </div>
            </section>

            <section className="cta" id="contact" aria-labelledby="cta-h">
              <span className="speed" aria-hidden="true" />
              <h2 id="cta-h">Let's build something together.</h2>
              <p>
                Need careful model evaluation or a frontend built? I'm available
                for remote contract work.
              </p>
              <a className="btn" href={`mailto:${person.email}`}>
                Email me <Arrow />
              </a>
              <a
                className="btn"
                href={person.telegram}
                target="_blank"
                rel="noreferrer"
              >
                Message on Telegram <Arrow />
              </a>
              <svg className="burst" viewBox="0 0 100 100" aria-hidden="true">
                <polygon points="50,2 60,24 82,12 76,36 98,42 80,56 94,76 70,74 68,98 50,82 32,98 30,74 6,76 20,56 2,42 24,36 18,12 40,24" />
                <text x="50" y="60" textAnchor="middle">
                  ドン
                </text>
              </svg>
            </section>
          </div>
        </main>

        <footer className="foot">
          <Mark />
          <p>
            © {new Date().getFullYear()} {person.name}. Drawn in characters,
            built in React.
          </p>
          <Socials />
        </footer>
      </div>
    </>
  );
}
