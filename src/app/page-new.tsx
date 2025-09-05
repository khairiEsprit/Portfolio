import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title:
    "Mohamed Khairi Bouzid - Full Stack Developer & Computer Engineering Student",
  description:
    "Mohamed Khairi Bouzid is a passionate full-stack developer and computer engineering student at ESPRIT, specializing in web development, blockchain technology, and modern JavaScript frameworks.",
  keywords: [
    "Mohamed Khairi Bouzid",
    "Full Stack Developer",
    "Computer Engineering",
    "ESPRIT",
    "Web Developer",
    "React Developer",
  ],
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer",
  },
  openGraph: {
    title: "Mohamed Khairi Bouzid - Full Stack Developer",
    description:
      "Passionate full-stack developer and computer engineering student creating innovative digital solutions.",
    url: "https://www.mohamedkhairibouzid.engineer",
    siteName: "Mohamed Khairi Bouzid Portfolio",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  return <HomeClient />;
}
