"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Something went wrong!
          </h1>
          <p className="text-muted-foreground">
            We apologize for the inconvenience. An unexpected error has occurred.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Details (Development Only):
            </h3>
            <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap break-words">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            className="flex items-center gap-2"
            variant="default"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
          >
            Go to homepage
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          If this problem persists, please contact support.
        </div>
      </div>
    </div>
  );
}
