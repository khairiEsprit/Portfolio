"use client";

import { useEffect, useState } from "react";

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  loadTime: number;
  cls: number;
  fid: number;
  lcp: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    loadTime: 0,
    cls: 0,
    fid: 0,
    lcp: 0,
  });

  const [showMonitor, setShowMonitor] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
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
      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
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
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
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

  if (process.env.NODE_ENV !== "development" || !showMonitor) {
    return null;
  }

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return "text-green-500";
    if (fps >= 30) return "text-yellow-500";
    return "text-red-500";
  };

  const getCLSColor = (cls: number) => {
    if (cls <= 0.1) return "text-green-500";
    if (cls <= 0.25) return "text-yellow-500";
    return "text-red-500";
  };

  const getLCPColor = (lcp: number) => {
    if (lcp <= 2500) return "text-green-500";
    if (lcp <= 4000) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg font-mono text-sm backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Performance Monitor</h3>
        <button
          onClick={() => setShowMonitor(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span className={getFPSColor(metrics.fps)}>{metrics.fps}</span>
        </div>
        <div className="flex justify-between">
          <span>Memory:</span>
          <span>{metrics.memoryUsage}MB</span>
        </div>
        <div className="flex justify-between">
          <span>Load:</span>
          <span>{metrics.loadTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span>CLS:</span>
          <span className={getCLSColor(metrics.cls)}>{metrics.cls}</span>
        </div>
        <div className="flex justify-between">
          <span>LCP:</span>
          <span className={getLCPColor(metrics.lcp)}>{metrics.lcp}ms</span>
        </div>
        <div className="flex justify-between">
          <span>FID:</span>
          <span>{metrics.fid}ms</span>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2">
        Ctrl+Shift+P to toggle
      </div>
    </div>
  );
}
