"use client";

import { Code, Folder, GraduationCap, Home, Mail, User } from "lucide-react";
import Link from "next/link";
import React, { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "./magicUi/dock";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Data = [
  {
    label: "Home",
    value: "Home",
    icon: Home,
    desc: "Home",
    src: "/",
  },
  {
    label: "About",
    value: "About",
    icon: User,
    desc: "About",
    src: "/about",
  },
  {
    label: "Skills",
    value: "Skills",
    icon: Code,
    desc: "Skills",
    src: "/skills",
  },
  {
    label: "Projects",
    value: "Projects",
    icon: Folder,
    desc: "Projects",
    src: "/projects",
  },
  {
    label: "Experience",
    value: "Experience",
    icon: GraduationCap,
    desc: "Experience",
    src: "/experience",
  },
  {
    label: "Contact",
    value: "Contact",
    icon: Mail,
    desc: "Contact",
    src: "/contact",
  },
];

const Navigation = memo(function Navigation() {
  const pathName = usePathname();

  const navigationItems = useMemo(
    () =>
      Data.map((item) => (
        <DockIcon key={item.src}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={item.src}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full hover:text-blue-500 transition-all",
                  pathName === item.src ? "text-blue-500" : ""
                )}
              >
                <item.icon className="size-4" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      )),
    [pathName]
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        {navigationItems}
      </Dock>
    </div>
  );
});

export default Navigation;
