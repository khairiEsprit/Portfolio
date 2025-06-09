import ProjectsClient from "./ProjectsClient";

export const metadata = {
  title: "Projects | Mohamed Khairi Bouzid",
  description:
    "Projects by Mohamed Khairi Bouzid, full stack developer and computer engineering student.",
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
