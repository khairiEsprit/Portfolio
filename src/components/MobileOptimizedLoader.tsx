"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileOptimizedLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Skeleton component optimized for mobile
const MobileSkeleton = ({ className }: { className?: string }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className={`h-8 bg-gray-200 dark:bg-gray-700 rounded-lg ${isMobile ? 'w-3/4' : 'w-1/2'}`}></div>
        
        {/* Content skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
        
        {/* Cards skeleton */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3'}`}>
          {Array.from({ length: isMobile ? 3 : 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function MobileOptimizedLoader({ 
  isLoading, 
  children, 
  className 
}: MobileOptimizedLoaderProps) {
  const isMobile = useIsMobile();
  
  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: isMobile ? 0.2 : 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: isMobile ? 0.15 : 0.2 }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 10 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.3 : 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            variants={loaderVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              willChange: 'opacity',
              transform: 'translateZ(0)',
            }}
          >
            <MobileSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Progressive loading component for images
export function ProgressiveImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const isMobile = useIsMobile();

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: isMobile ? 0.3 : 0.5 }
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton placeholder */}
      <AnimatePresence>
        {!isLoaded && !isError && (
          <motion.div
            className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Actual image */}
      <motion.img
        src={src}
        alt={alt}
        variants={imageVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
        loading={priority ? "eager" : "lazy"}
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
        {...props}
      />

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

// Lazy loading wrapper for heavy components
export function LazyWrapper({
  children,
  threshold = 0.1,
  className
}: {
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 15 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div ref={setRef} className={className}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            style={{
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
