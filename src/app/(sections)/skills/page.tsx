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

export const metadata = {
  title: "Skills | Mohamed Khairi Bouzid",
  description:
    "Skills of Mohamed Khairi Bouzid, full stack developer and computer engineering student.",
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/skills",
  },
};

export default function Skills() {
  return <SkillsClient />;
}
