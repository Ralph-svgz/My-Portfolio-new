// All the words and links on the site live here. Edit this file to update content.
// Source of truth for roles, dates and contact details: public/resume.pdf.

export const person = {
  name: "Samuel Raphel",
  intro:
    "I write prompts and grade model output for AI labs, and I build the web apps and multi-agent systems that put those models to work.",
  location: "Nigeria, remote",
  email: "yorinobuarasaka761@gmail.com",
  github: "https://github.com/gojoisretarded",
  linkedin: "https://www.linkedin.com/in/samuelraphel-ab53bb293",
  telegram: "https://t.me/utakatatendo2",
  resumeFile: "/resume.pdf",
  resumeName: "Samuel_Raphel_Resume.pdf",
};

export type Project = {
  name: string;
  kind: string;
  blurb: string;
  stack: string[];
  url: string;
  shot: string;
  status: string;
};

// The four strongest projects, in carousel order.
export const featured: Project[] = [
  {
    name: "AI Nation Wars",
    kind: "Multi-agent AI",
    blurb:
      "An autonomous multi-agent system running AI country parody accounts on X. They find real news, roast each other and remember every feud, posting 100 to 185 times a day. Every post passes deterministic gates, a separate AI judge and a safety model before it goes out.",
    stack: ["Node.js", "Postgres", "X API v2", "xAI Grok", "OpenAI", "Next.js"],
    url: "https://worldorder.tech",
    shot: "/shots/worldorder.jpg",
    status: "Live",
  },
  {
    name: "Hood Lab",
    kind: "Data platform",
    blurb:
      "An intelligence and culture platform tracking retail investing's move to onchain finance. It combines Robinhood Chain data, Stock Token information and verification, market activity and a research archive in one scroll-driven site.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Lenis"],
    url: "https://www.rhoodlab.xyz",
    shot: "/shots/hoodlab.jpg",
    status: "Live, in progress",
  },
  {
    name: "StockDrop",
    kind: "On-chain app",
    blurb:
      "Gift a stock token to someone whose wallet you don't know. The sender locks shares in a non-custodial escrow and shares a redeem code; the recipient claims into their own wallet. Later versions added sign-in, buy and sell.",
    stack: ["Solidity", "Foundry", "React", "viem", "Uniswap v3"],
    url: "https://stockdrop.live",
    shot: "/shots/stockdrop.jpg",
    status: "Live on mainnet",
  },
  {
    name: "DotLabs",
    kind: "AI evaluation",
    blurb:
      "A trading school for AI agents. Agents enroll themselves and trade against live market data, and an LLM teacher grades every decision against a written curriculum, with hard risk limits enforced in code.",
    stack: ["Next.js 16", "Postgres", "LLM grading", "Railway"],
    url: "https://www.dotslab.online",
    shot: "/shots/dotlabs.jpg",
    status: "Live",
  },
];

export const skills: { group: string; jp: string; items: string[] }[] = [
  {
    group: "AI training",
    jp: "トレーニング",
    items: ["Prompt writing", "Reference answers", "Output evaluation", "Rubric scoring", "Data annotation"],
  },
  {
    group: "Review",
    jp: "レビュー",
    items: ["General reasoning", "Instruction checks", "Fact-checking", "Error spotting", "Written rationales"],
  },
  { group: "Frontend", jp: "フロント", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"] },
  { group: "Backend", jp: "バック", items: ["Node.js", "PostgreSQL", "Python", "LLM APIs", "Multi-agent systems"] },
  { group: "Writing", jp: "ライティング", items: ["Technical writing", "Copywriting", "Documentation", "Community"] },
  { group: "Shipping", jp: "デプロイ", items: ["Vercel", "Railway", "Ubuntu VPS", "Docker", "Git"] },
];

export const certifications = [
  { name: "Google AI Essentials", by: "Google" },
  { name: "Prompt Engineering", by: "Course certificate" },
  { name: "Content Marketing", by: "HubSpot Academy" },
  { name: "Responsive Web Design", by: "freeCodeCamp" },
];

export const experience = [
  {
    role: "Generalist AI trainer and data annotator",
    where: "Outlier AI",
    when: "Remote, ongoing",
    text: "Write prompts and reference answers on general-reasoning questions, grade model responses for correctness, instruction-following and completeness, and document confidently wrong or contradictory answers with written justifications.",
  },
  {
    role: "AI trainer and data annotator",
    where: "Luel.ai",
    when: "Remote, January 2026",
    text: "Annotated and reviewed AI training data against detailed project guidelines, and evaluated model outputs for accuracy and relevance with a clear rationale for each rating.",
  },
  {
    role: "Frontend developer and Web3 builder",
    where: "Self-employed",
    when: "Remote, October 2026 to now",
    text: "Building Hood Lab and AI Nation Wars, including its output-quality pipeline of gates, an AI judge, a posting ledger and daily spend caps. Delivered responsive web apps, token dashboards and an e-commerce storefront for clients.",
  },
  {
    role: "Copywriter and community manager",
    where: "Web3 projects, freelance",
    when: "Remote, 2023 to now",
    text: "Wrote launch copy, whitepaper analyses and community messaging for 8+ crypto projects across BNB Chain, Base, Solana and Robinhood Chain, and moderated their communities.",
  },
  {
    role: "Intern",
    where: "Nigerian Capital Market Institute",
    when: "Nigeria, August 2026 to now",
    text: "Draft and manage official correspondence, and moderate virtual training programmes for capital market professionals.",
  },
];

export const education = {
  degree: "BSc Computer Science",
  school: "Ibrahim Badamasi Babangida University, Lapai",
  when: "2020 to 2025",
};
