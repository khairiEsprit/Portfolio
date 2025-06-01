export interface ProjectType {
  title: string;
  description: string;
  techstack: string[];
  live: string;
  github: string;
  image: string;
  category?: string;
  featured?: boolean;
}

export const ProjectData: ProjectType[] = [
  {
    title: "Carbon Calculator",
    description:
      "An application where users can calculate their carbon footprint.",
    techstack: ["React", "Node", "Express", "MongoDB", "TypeScript"],
    live: "https://carbonee-calculator.vercel.app/",
    github: "https://github.com/khairibzd/Carbon-Calculator",
    image: "/projects/carbon-calculator.jpg",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "AI Mock Interview",
    description:
      "A website where users can practice their job interview with questions generated from AI additionally it provides feedback upon interview completion",
    techstack: [
      "React",
      "Next.js",
      "Prompt Engineering",
      "Prisma",
      "PostgreSQL",
    ],
    live: "https://totaltech-ai-mock-interview.vercel.app/",
    github: "https://github.com/khairibzd",
    image: "/projects/ai-mock-interview.jpg",
    category: "AI/ML",
    featured: true,
  },
  {
    title: "DealDiscover",
    description:
      "A recommendation platform with a chatbot that helps users find their specific destination.",
    techstack: [
      "Vue.js",
      "Pinia",
      "Rasa Platform",
      "Python",
      "TypeScript",
      "MongoDB",
    ],
    live: "https://deal-discover-vue.vercel.app/",
    github: "https://github.com/medkira/DealDiscover_vue",
    image: "/projects/deal-discover.jpg",
    category: "Frontend",
  },
  {
    title: "Email Reply Agent",
    description:
      "An intelligent email assistant that analyzes incoming messages and generates contextually appropriate responses.",
    techstack: [
      "HTML",
      "CSS",
      "Python",
      "Flask",
      "Prompt Engineering",
      "SQLite",
    ],
    live: "https://emailagentreplay.me/",
    github: "#",
    image: "/projects/email-reply-agent.jpg",
    category: "AI/ML",
  },
  {
    title: "E-waste Management",
    description:
      "E-Waste Management Platform that transforms electronic waste management through AI, blockchain, and face recognition.",
    techstack: ["Symfony", "Python", "JavaScript", "Solidity", "IoT", "MySQL"],
    live: "https://ewaste-symfony.azurewebsites.net",
    github: "https://github.com/khairiEsprit/e-waste_symfony",
    image: "/projects/e-waste.jpg",
    category: "Blockchain",
  },
];
