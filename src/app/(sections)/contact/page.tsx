import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact | Mohamed Khairi Bouzid",
  description:
    "Contact Mohamed Khairi Bouzid, full stack developer and computer engineering student.",
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/contact",
  },
};

export default function Contact() {
  return <ContactClient />;
}
