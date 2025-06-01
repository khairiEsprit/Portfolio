"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  lcp: number; // Largest Contentful Paint
  cls: number; // Cumulative Layout Shift
  fid: number; // First Input Delay
  isMobile: boolean;
  devicePixelRatio: number;
  connectionType: string;
}

export default function MobilePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    lcp: 0,
    cls: 0,
    fid: 0,
    isMobile: false,
    devicePixelRatio: 1,
    connectionType: 'unknown',
  });
  const [showMonitor, setShowMonitor] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    // Detect mobile device
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Detect connection type
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection ? connection.effectiveType || connection.type : 'unknown';

    setMetrics(prev => ({ 
      ...prev, 
      isMobile, 
      devicePixelRatio, 
      connectionType 
    }));

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        
        // Check for low performance on mobile
        if (isMobile && fps < 30) {
          setIsLowPerformance(true);
        } else if (fps >= 45) {
          setIsLowPerformance(false);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Start FPS monitoring
    measureFPS();

    // Memory usage monitoring
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        setMetrics(prev => ({ ...prev, memoryUsage }));
      }
    };

    // Core Web Vitals monitoring
    const measureWebVitals = () => {
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            setMetrics(prev => ({ ...prev, lcp: Math.round(lastEntry.startTime) }));
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            setMetrics(prev => ({ ...prev, cls: Math.round(clsValue * 1000) / 1000 }));
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              setMetrics(prev => ({ ...prev, fid: Math.round((entry as any).processingStart - entry.startTime) }));
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (error) {
          console.warn('Performance monitoring not fully supported:', error);
        }
      }
    };

    // Load time
    const loadTime = Math.round(performance.now());
    setMetrics(prev => ({ ...prev, loadTime }));

    measureMemory();
    measureWebVitals();

    const memoryInterval = setInterval(measureMemory, 2000);

    // Keyboard shortcut to toggle monitor
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setShowMonitor(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Auto-show monitor if performance is poor on mobile
  useEffect(() => {
    if (metrics.isMobile && isLowPerformance && !showMonitor) {
      setShowMonitor(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowMonitor(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isLowPerformance, metrics.isMobile, showMonitor]);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return "text-green-500";
    if (value <= thresholds[1]) return "text-yellow-500";
    return "text-red-500";
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return "text-green-500";
    if (fps >= 30) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <AnimatePresence>
      {showMonitor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-3 rounded-lg text-xs font-mono shadow-lg backdrop-blur-sm"
          style={{ minWidth: '200px' }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">
              {metrics.isMobile ? "📱 Mobile" : "🖥️ Desktop"} Performance
            </span>
            <button
              onClick={() => setShowMonitor(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>FPS:</span>
              <span className={getFPSColor(metrics.fps)}>
                {metrics.fps}
                {isLowPerformance && " ⚠️"}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Memory:</span>
              <span className={getPerformanceColor(metrics.memoryUsage, [50, 100])}>
                {metrics.memoryUsage}MB
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Load:</span>
              <span className={getPerformanceColor(metrics.loadTime, [1000, 3000])}>
                {metrics.loadTime}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={getPerformanceColor(metrics.lcp, [2500, 4000])}>
                {metrics.lcp}ms
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>CLS:</span>
              <span className={getPerformanceColor(metrics.cls * 1000, [100, 250])}>
                {metrics.cls.toFixed(3)}
              </span>
            </div>
            
            {metrics.fid > 0 && (
              <div className="flex justify-between">
                <span>FID:</span>
                <span className={getPerformanceColor(metrics.fid, [100, 300])}>
                  {metrics.fid}ms
                </span>
              </div>
            )}
            
            <div className="border-t border-gray-600 pt-1 mt-2 text-gray-400">
              <div className="flex justify-between">
                <span>DPR:</span>
                <span>{metrics.devicePixelRatio}x</span>
              </div>
              <div className="flex justify-between">
                <span>Connection:</span>
                <span>{metrics.connectionType}</span>
              </div>
            </div>
          </div>
          
          <div className="text-gray-500 text-xs mt-2">
            Ctrl+Shift+M to toggle
          </div>
          
          {isLowPerformance && (
            <div className="mt-2 p-2 bg-red-900/50 rounded text-yellow-200 text-xs">
              ⚠️ Low performance detected. Consider reducing animations.
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Performance optimization suggestions component
export function PerformanceOptimizationSuggestions() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const checkPerformance = () => {
      const suggestions: string[] = [];
      
      // Check if mobile
      const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      
      if (isMobile) {
        suggestions.push("Mobile device detected - animations optimized");
        
        // Check connection
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType === 'slow-2g') {
          suggestions.push("Slow connection detected - consider reducing animations");
        }
        
        // Check memory
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          const memoryUsage = memory.usedJSHeapSize / 1024 / 1024;
          if (memoryUsage > 100) {
            suggestions.push("High memory usage - consider lazy loading");
          }
        }
      }
      
      setSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    };

    checkPerformance();
    const interval = setInterval(checkPerformance, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== "development" || !showSuggestions) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 right-4 z-50 bg-blue-900/90 text-white p-3 rounded-lg text-xs max-w-xs"
    >
      <div className="font-semibold mb-2">💡 Performance Tips</div>
      <ul className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-1">•</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowSuggestions(false)}
        className="mt-2 text-blue-300 hover:text-white text-xs"
      >
        Dismiss
      </button>
    </motion.div>
  );
}
