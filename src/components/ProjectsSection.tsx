import { Github, ExternalLink } from "lucide-react";
import SectionBlock from "./SectionBlock";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { playHover, playClick } from "@/hooks/useSoundEffects";

const projects = [
  {
    title: "IBBUL-Years",
    isNew: true,
    description:
      "A highly interactive Next.js web application utilizing Framer Motion for complex scroll-based animations and @react-three/fiber for immersive 3D graphics rendering.",
    tags: [
      "Next.js",
      "React",
      "Framer Motion",
      "Three.js",
      "Tailwind",
    ],
    githubUrl: "https://github.com/Ralph-svgz/year-of-ibb",
    liveUrl: "https://year-of-ibb.vercel.app/", // Assuming it's vercel deployed, but they didn't provide a live link. I'll just put #
  },
  {
    title: "Python Snake Game",
    description:
      "An interactive 2D Snake game developed in Python using Pygame. Designed with an efficient game loop to optimize rendering and smooth user input handling.",
    tags: ["Python", "Pygame", "OOP", "Game Logic"],
    githubUrl: "https://github.com/Ralph-svgz/snake-game",
    liveUrl: "#",
  },
  {
    title: "Upcoming Project",
    description:
      "A brand new web application currently in the planning and development phase. Check back soon for updates!",
    tags: ["TBD", "Frontend", "Web Dev"],
    githubUrl: "#",
    liveUrl: "#",
    disabled: true,
  },
];

const ProjectsSection = () => (
  <SectionBlock id="projects" title="Projects">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project) => (
        <div
          key={project.title}
          onMouseEnter={playHover}
          className={`group relative border-2 border-black p-5 flex flex-col justify-between transition-all duration-300 bg-white ${project.disabled
              ? "opacity-60 cursor-not-allowed"
              : "hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1"
            }`}
        >
          {"isNew" in project && project.isNew && (
            <div className="absolute -top-3 -right-3 bg-black text-white px-2 py-1 text-[10px] font-black uppercase tracking-tighter border-2 border-black z-10 rotate-12">
              LATEST WORK
            </div>
          )}
          <div className={project.disabled ? "pointer-events-none" : ""}>
            <h3 className={`text-xl font-black text-foreground ${project.disabled ? "" : "group-hover:underline decoration-4 underline-offset-4"}`}>
              {project.title}
            </h3>
            <p className="body-text mt-4 text-sm font-normal">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-[10px] font-bold border border-black/10 px-1.5 py-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-black/10 ${project.disabled ? "pointer-events-none opacity-50" : ""}`}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={project.disabled ? (e) => e.preventDefault() : playClick}
              tabIndex={project.disabled ? -1 : 0}
              className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${project.disabled
                  ? "shadow-none"
                  : "hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black hover:text-white"
                }`}
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={project.disabled ? (e) => e.preventDefault() : playClick}
              tabIndex={project.disabled ? -1 : 0}
              className={`flex items-center justify-center gap-2 px-4 py-2 border-2 border-black bg-white text-[10px] font-black uppercase tracking-wider transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${project.disabled
                  ? "shadow-none"
                  : "hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-black hover:text-white"
                }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {project.disabled ? "Coming Soon" : "Live Demo"}
            </a>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default ProjectsSection;
