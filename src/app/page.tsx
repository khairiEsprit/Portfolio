"use client";

import Link from "next/link";
import { File, User } from "lucide-react";
import NextImage from "@/components/NextImage";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { PhoneSocial } from "@/components/Social";
import { BorderBeam } from "@/components/magicUi/border-beam";
import TypingAnimation from "@/components/magicUi/typing-animation";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="py-20 min-h-[80vh] animate_in  md:min-h-[85vh] flex items-center flex-col-reverse lg:flex-row gap-10 justify-center">
      <div className="flex flex-col gap-4 text-left lg:w-1/2 2xl:w-1/3 mx-6 xl:mx-0 ">
        <p className="text-2xl font-bold text-light-blue-700">Hey,</p>
        <p className="text-3xl md:text-5xl font-bold relative">
          I'm
          <span className="text-blue-500 ml-4 uppercase">
            Mohamed Khairi bouzid
          </span>
        </p>
        {/* <TypingAnimation
          className="text-3xl md:text-4xl font-bold text-light-blue-500"
          text="Software Developer"
        /> */}
        <div className="text-3xl md:text-4xl font-bold text-light-blue-500">
          <Typewriter
            options={{
              strings: ["Software Developer"],
              autoStart: true,
              loop: true,
              delay: 50,
            }}
          />
        </div>
        <p className="text-lg md:text-xl font-medium relative">
          I'm a software developer based in Tunisia with a passion for web
          development and a love for creating web apps. I bring a strong
          understanding of web development technologies and design principles to
          create dynamic and interactive web experiences that exceed client
          expectations.
        </p>

        <PhoneSocial />

        <div className="flex flex-row justify-center md:justify-normal gap-4 md:gap-6 mt-5">
          <Link href={"/about"}>
            <button className="gap-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-opacity-50 px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400">
              <User className="text-lg" />
              About
            </button>
          </Link>

          <Link
            href="https://drive.google.com/file/d/1SGOnwl4H2H8b4o1OE9OSyyERJfPOaTim/view?usp=drive_link"
            target="_blank"
          >
            <button className="gap-2 inline-flex h-12 animate-shimmer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400  focus:border-transparent">
              <File className="text-lg" />
              Resume
            </button>
          </Link>
          <ThemeSwitcher />
        </div>
      </div>

      <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full">
        <NextImage
          src="/pk.webp"
          width={""}
          height={""}
          alt="khairi bouzid"
          className="rounded-full w-full h-full shadow-lg relative"
        />
        <BorderBeam
          size={300}
          duration={5}
          delay={9}
          className="absolute inset-0 rounded-full"
        />
      </div>
    </div>
  );
}

// Button code

// tailwind.config.js code
