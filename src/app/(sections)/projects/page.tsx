import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Mohamed Khairi Bouzid",
  description:
    "Explore innovative projects by Mohamed Khairi Bouzid, showcasing expertise in full-stack development, web technologies, and modern frameworks.",
  keywords: [
    "Portfolio Projects",
    "Web Development",
    "React Projects",
    "Next.js",
    "Full Stack",
    "JavaScript",
    "TypeScript",
  ],
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/projects",
  },
  openGraph: {
    title: "Projects - Mohamed Khairi Bouzid",
    description:
      "Explore innovative projects showcasing full-stack development expertise.",
    url: "https://www.mohamedkhairibouzid.engineer/projects",
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

export default function ProjectsPage() {
  return <ProjectsClient />;
}
