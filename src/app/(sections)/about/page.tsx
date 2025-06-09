import AboutClient from "./AboutClient";

export const metadata = {
  title: "About | Mohamed Khairi Bouzid",
  description:
    "About Mohamed Khairi Bouzid, full stack developer and computer engineering student.",
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/about",
  },
};

export default function About() {
  return <AboutClient />;
}
