"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Reset state when text changes
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      setDisplayedText("");
      setI(0);
    }

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (i < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayedText((prevState) => {
          const newText = prevState + text.charAt(i);
          return newText;
        });
        setI((prevI) => prevI + 1);
      }, duration);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration, i, text]);

  // Reset when text prop changes
  useEffect(() => {
    setDisplayedText("");
    setI(0);
    hasStartedRef.current = false;
  }, [text]);

  return (
    <h1
      className={cn(
        "text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]",
        className
      )}
    >
      {displayedText ? displayedText : text}
    </h1>
  );
}
