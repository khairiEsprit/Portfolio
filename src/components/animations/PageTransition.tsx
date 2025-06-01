"use client";

import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Optimized variants for mobile performance
const getMobileOptimizedVariants = (isMobile: boolean) => ({
  initial: {
    opacity: 0,
    y: isMobile ? 10 : 20, // Reduced movement on mobile
    // Remove scale on mobile to prevent layout shifts
    ...(isMobile ? {} : { scale: 0.98 }),
  },
  in: {
    opacity: 1,
    y: 0,
    ...(isMobile ? {} : { scale: 1 }),
  },
  out: {
    opacity: 0,
    y: isMobile ? -10 : -20,
    ...(isMobile ? {} : { scale: 1.02 }),
  },
});

const getMobileOptimizedTransition = (isMobile: boolean) => ({
  type: "tween" as const,
  ease: [0.16, 1, 0.3, 1],
  duration: isMobile ? 0.25 : 0.4, // Faster transitions on mobile
});

export default function PageTransition({
  children,
  className,
}: PageTransitionProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const pageVariants = getMobileOptimizedVariants(isMobile);
  const pageTransition = getMobileOptimizedTransition(isMobile);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className={className}
          style={{
            // Force hardware acceleration for smooth animations
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

// Alternative slide transition - optimized for mobile
export function SlidePageTransition({
  children,
  className,
}: PageTransitionProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const slideVariants = {
    initial: {
      x: isMobile ? 100 : 300, // Reduced movement on mobile
      opacity: 0,
    },
    in: {
      x: 0,
      opacity: 1,
    },
    out: {
      x: isMobile ? -100 : -300,
      opacity: 0,
    },
  };

  const transition = getMobileOptimizedTransition(isMobile);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={slideVariants}
          transition={transition}
          className={className}
          style={{
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

// Fade transition with blur effect - disabled blur on mobile for performance
export function BlurPageTransition({
  children,
  className,
}: PageTransitionProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const blurVariants = {
    initial: {
      opacity: 0,
      // Disable blur on mobile for better performance
      ...(isMobile ? {} : { filter: "blur(10px)" }),
      // Remove scale on mobile to prevent layout shifts
      ...(isMobile ? {} : { scale: 1.1 }),
    },
    in: {
      opacity: 1,
      ...(isMobile ? {} : { filter: "blur(0px)" }),
      ...(isMobile ? {} : { scale: 1 }),
    },
    out: {
      opacity: 0,
      ...(isMobile ? {} : { filter: "blur(10px)" }),
      ...(isMobile ? {} : { scale: 0.9 }),
    },
  };

  const transition = {
    ...getMobileOptimizedTransition(isMobile),
    duration: isMobile ? 0.3 : 0.6, // Much faster on mobile
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={blurVariants}
          transition={transition}
          className={className}
          style={{
            willChange: isMobile ? "opacity" : "transform, opacity, filter",
            transform: "translateZ(0)",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

// Loading transition with skeleton
interface LoadingTransitionProps {
  children: ReactNode;
  loading?: boolean;
  className?: string;
}

export function LoadingTransition({
  children,
  loading = false,
  className,
}: LoadingTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={PageTransition}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Staggered reveal transition
export function StaggeredReveal({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  const containerVariants = {
    initial: {},
    in: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    out: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    out: {
      opacity: 0,
      y: -30,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={containerVariants}
        className={className}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={itemVariants}>{children}</motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
