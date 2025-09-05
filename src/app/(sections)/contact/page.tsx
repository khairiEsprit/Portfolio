import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact | Mohamed Khairi Bouzid",
  description:
    "Get in touch with Mohamed Khairi Bouzid for collaboration opportunities, project inquiries, or professional networking.",
  keywords: [
    "Contact",
    "Get in Touch",
    "Collaboration",
    "Project Inquiry",
    "Professional Network",
    "Email",
  ],
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/contact",
  },
  openGraph: {
    title: "Contact - Mohamed Khairi Bouzid",
    description:
      "Get in touch for collaboration opportunities and project inquiries.",
    url: "https://www.mohamedkhairibouzid.engineer/contact",
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

export default function Contact() {
  return <ContactClient />;
}
