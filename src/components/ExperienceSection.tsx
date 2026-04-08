import SectionBlock from "./SectionBlock";

const experiences = [
  {
    role: "Frontend Engineer",
    company: "IBBUL-Years",
    period: "2023 – Present",
    description: [
      "Engineered a highly interactive Next.js web application utilizing Framer Motion for complex scroll-based animations.",
      "Implemented robust media handling components with Intersection Observers for lazy-loading performance optimization.",
      "Integrated @react-three/fiber for immersive 3D graphics rendering, elevating visual storytelling."
    ],
  },
  {
    role: "Software Engineer (Python)",
    company: "Independent Projects",
    period: "2022 – 2023",
    description: [
      "Developed an interactive 2D Snake game in Python using Pygame, demonstrating a solid grasp of object-oriented programming.",
      "Implemented core application logic including state management, grid-based rendering, and real-time collision detection.",
      "Designed an efficient game loop to optimize rendering performance and ensure smooth user input handling."
    ],
  },
  {
    role: "Frontend Developer / Engineer",
    company: "BrickMeme",
    period: "2023 – Present",
    description: [
      "Architected and built an AI-powered web application integrating DALL-E 3 and FLUX.1 APIs for automated image generation.",
      "Developed production-grade, highly responsive user interfaces using modern React, Next.js, and TypeScript.",
      "Experienced with seamless REST API integration, advanced frontend state management, and debugging client-side build systems."
    ],
  },
];

const ExperienceSection = () => (
  <SectionBlock id="experience" title="Experience">
    <div className="space-y-12">
      {experiences.map((exp) => (
        <div
          key={exp.role}
          className="relative pl-8 md:pl-0 border-l md:border-l-0 border-black/20 md:grid md:grid-cols-[1fr_2fr] md:gap-8 pb-12 last:pb-0"
        >
          {/* Mobile timeline dot */}
          <div className="md:hidden absolute top-1.5 -left-[5px] w-[9px] h-[9px] rounded-full bg-black"></div>

          <div className="md:text-right md:pr-8 md:border-r border-black/20 relative">
            {/* Desktop timeline dot */}
            <div className="hidden md:block absolute top-1.5 -right-[5px] w-[9px] h-[9px] rounded-full bg-black"></div>

            <h4 className="font-mono text-sm tracking-widest text-foreground/60 uppercase mb-1">
              {exp.period}
            </h4>
            <h3 className="font-bold text-lg md:text-xl">{exp.company}</h3>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="text-lg font-bold text-foreground md:hidden mb-2">
              {exp.role}
            </h3>
            <h3 className="text-xl font-bold text-foreground hidden md:block mb-3">
              {exp.role}
            </h3>
            <ul className="space-y-2 mt-3">
              {exp.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary text-sm shrink-0 mt-[2px]">▸</span>
                  <span className="body-text text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </SectionBlock>
);

export default ExperienceSection;
