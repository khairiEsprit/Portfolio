import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About | Mohamed Khairi Bouzid",
  description:
    "Learn more about Mohamed Khairi Bouzid, a passionate full-stack developer and computer engineering student at ESPRIT with expertise in modern web technologies.",
  keywords: [
    "About Mohamed Khairi",
    "ESPRIT",
    "Computer Engineering",
    "Full Stack Developer",
    "Biography",
  ],
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/about",
  },
  openGraph: {
    title: "About Mohamed Khairi Bouzid",
    description:
      "Learn more about Mohamed Khairi Bouzid, a passionate full-stack developer and computer engineering student.",
    url: "https://www.mohamedkhairibouzid.engineer/about",
    type: "profile",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Force static generation at build time
export const dynamic = "force-static";
export const revalidate = false;

export default function About() {
  return <AboutClient />;
}
