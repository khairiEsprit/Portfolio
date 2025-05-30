"use client";

import Link from "next/link";
import { File, User, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { PhoneSocial } from "@/components/Social";
import { BorderBeam } from "@/components/magicUi/border-beam";
import AnimatedSection, {
  StaggeredContainer,
} from "@/components/animations/AnimatedSection";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative py-20 min-h-[80vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 -z-10" />

      {/* Floating background elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/30 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-xl"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto px-6 flex items-center flex-col-reverse lg:flex-row gap-12 lg:gap-16">
        {/* Content Section */}
        <StaggeredContainer className="flex flex-col gap-6 text-left lg:w-1/2 2xl:w-1/3">
          {/* Greeting */}
          <AnimatedSection animation="fadeRight" delay={0.1}>
            <motion.p
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Hey there! 👋
            </motion.p>
          </AnimatedSection>

          {/* Name */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              I'm{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent uppercase tracking-wide">
                  Mohamed Khairi Bouzid
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </h1>
          </AnimatedSection>

          {/* Typewriter Role */}
          <AnimatedSection animation="fadeUp" delay={0.3}>
            <div className="text-2xl md:text-3xl font-bold text-slate-600 dark:text-slate-300 min-h-[3rem] flex items-center">
              <Sparkles
                className="mr-2 text-yellow-500 animate-pulse"
                size={24}
              />
              <Typewriter
                options={{
                  strings: [
                    "Engineering Student At Esprit",
                    "Web Developer",
                    "Blockchain Enthusiast",
                    "Creative Problem Solver",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
          </AnimatedSection>

          {/* Description */}
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              I hold a Bachelor's degree in Computer Science and am currently in
              my first year of an engineering program in
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {" "}
                Computer and Information Science at Esprit
              </span>
              . Passionate about{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                web development
              </span>{" "}
              and
              <span className="font-semibold text-green-600 dark:text-green-400">
                {" "}
                Web3—particularly blockchain technology
              </span>
              —I bring creativity, perseverance, and autonomy to everything I
              do.
            </p>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection animation="fadeUp" delay={0.5}>
            <PhoneSocial />
          </AnimatedSection>

          {/* Action Buttons */}
          <AnimatedSection animation="fadeUp" delay={0.6}>
            <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-6 mt-6">
              <Link href="/about">
                <AnimatedButton
                  variant="modern"
                  size="lg"
                  animation="shimmer"
                  icon={<User size={20} />}
                  iconPosition="left"
                  className="group"
                >
                  About Me
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </AnimatedButton>
              </Link>

              <Link
                href="https://drive.google.com/file/d/1gA0E3LeQ5xSQEgTwE99A7IZCHZCZsXIz/view"
                target="_blank"
              >
                <AnimatedButton
                  variant="gradient"
                  size="lg"
                  animation="glow"
                  icon={<File size={20} />}
                  iconPosition="left"
                >
                  Resume
                </AnimatedButton>
              </Link>

              <ThemeSwitcher />
            </div>
          </AnimatedSection>
        </StaggeredContainer>

        {/* Profile Image Section */}
        <AnimatedSection animation="scaleIn" delay={0.7} className="relative">
          <motion.div
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Animated background rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-600 opacity-15"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Profile Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 dark:border-gray-800/20 shadow-2xl">
              <Image
                src="/pk.webp"
                width={1000}
                height={1000}
                alt="Mohamed Khairi Bouzid"
                className="w-full h-full object-cover"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Enhanced Border Beam */}
            <BorderBeam
              size={400}
              duration={8}
              delay={2}
              colorFrom="#3b82f6"
              colorTo="#8b5cf6"
              className="absolute inset-0 rounded-full"
            />

            {/* Floating particles */}
            <motion.div
              className="absolute -top-4 -right-4 w-3 h-3 bg-yellow-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}
