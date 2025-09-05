import { Metadata } from "next";
import React from "react";
import { Frontend, Backend, Tools, AIML, Languages } from "./constant";
import SkillsClient from "./SkillsClient";

interface SkillComponents {
  [key: string]: () => JSX.Element;
}

const skillComponents: SkillComponents = {
  Frontend: Frontend,
  Backend: Backend,
  Tools: Tools,
  "AI/ML": AIML,
  Languages: Languages,
};

const data = [
  {
    label: "Frontend",
  },
  {
    label: "Backend",
  },
  {
    label: "Tools",
  },
  {
    label: "AI/ML",
  },
  {
    label: "Languages",
  },
];

export const metadata: Metadata = {
  title: "Skills | Mohamed Khairi Bouzid",
  description:
    "Technical skills and expertise of Mohamed Khairi Bouzid in frontend, backend, AI/ML, and modern development tools and languages.",
  keywords: [
    "Technical Skills",
    "Frontend Development",
    "Backend Development",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
  ],
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/skills",
  },
  openGraph: {
    title: "Skills - Mohamed Khairi Bouzid",
    description:
      "Technical expertise in full-stack development, AI/ML, and modern technologies.",
    url: "https://www.mohamedkhairibouzid.engineer/skills",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Force static generation at build time
export const dynamic = "force-static";
export const revalidate = false;

export default function Skills() {
  return <SkillsClient />;
}
