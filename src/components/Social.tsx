import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NextImage from "./NextImage";
import AnimatedTooltip from "./Aceternety/animated-tooltip";

export default function Social() {
  return (
    <section className="md:fixed xl:bottom-40 xl:left-4 2xl:bottom-80 2xl:left-10 hidden lg:flex lg:flex-col gap-3 z-20">
      {Data.map((item, index) => {
        return (
          <Link href={item.link} passHref={true} target="_blank" key={index}>
          <AnimatedTooltip  item={item} />
              </Link>

        );
      })}
    </section>
  );
}

export const PhoneSocial = () => {
  return (
    <div className="flex flex-row justify-center space-x-5 mt-2 sm:hidden">
     {Data.map((item, index) => {
  return (
    <Link href={item.link} passHref={true} target="_blank" key={index}>
    <AnimatedTooltip  item={item} />
        </Link>

  );
})} 
    </div>
  );
};

export const Data = [
  {
    id: 1,
    name: "Khairi bouzid",
    designation: "Connect On linkedIn",
    image:
      "https://www.svgrepo.com/show/475661/linkedin-color.svg",
    link: "https://www.linkedin.com/in/mohamed-khairi-bouzid-a32753231/",
  },
  {
    id: 2,
    name: "Khairi bouzid",
    designation: "Connect On github",
    image:
      "https://www.svgrepo.com/show/475654/github-color.svg",
    link: "https://github.com/khairibzd",
  },
  {
    id: 3,
    name: "Khairi bouzid",
    designation: "Mail Us",
    image:
      "https://www.svgrepo.com/show/19352/email.svg",
    link: "mailto:khairibouzid95@gmail.com",
  },
  // {
  //   link: "https://www.linkedin.com/in/mohamed-khairi-bouzid-a32753231/",
  //   icon: "https://www.svgrepo.com/show/475661/linkedin-color.svg",
  //   tooltip: "Connect On Linkedin",
  // },
  // {
  //   link: "https://github.com/khairibzd",
  //   icon: "https://www.svgrepo.com/show/475654/github-color.svg",
  //   tooltip: "Connect On Github",
  // },

  // {
  //   link: "mailto:khairibouzid95@gmail.com",
  //   icon: "https://www.svgrepo.com/show/19352/email.svg",
  //   tooltip: "Mail Us",
  // },
];
