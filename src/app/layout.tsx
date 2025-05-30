import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import Navigation from "@/components/Navigation";
import Social from "@/components/Social";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import DotPattern from "@/components/magicUi/dot-pattern";
import PageTransition from "@/components/animations/PageTransition";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Portfolio: Mohammed khairi bouzid",
  description:
    "Mohammed khairi bouzid is a software developer based on tunisia",
  keywords: "khairi, bouzid,software developer, portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="smooth-scroll">
      <body
        className={cn(
          inter.className,
          poppins.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider attribute="class">
          <TooltipProvider delayDuration={0}>
            <div className="relative overflow-hidden min-h-screen bg-background">
              {/* Enhanced background effects */}
              <div className="fixed inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10 pointer-events-none -z-20" />

              {/* Animated background blobs */}
              <div className="fixed top-10 left-1/3 w-[500px] h-[500px] bg-blue-200/20 dark:bg-blue-800/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob -z-10" />
              <div className="hidden md:block fixed top-0 right-4 w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-800/10 mix-blend-multiply rounded-full filter blur-3xl opacity-70 animate-blob animation-delay-2000 -z-10" />
              <div className="fixed bottom-20 left-20 w-[500px] h-[500px] bg-pink-200/20 dark:bg-pink-800/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 -z-10" />
              <div className="hidden md:block fixed -bottom-8 right-1/4 w-[500px] h-[500px] bg-green-200/20 dark:bg-green-800/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 -z-10" />

              {/* Page content with transitions */}
              <PageTransition>{children}</PageTransition>

              {/* Analytics and tracking */}
              <Analytics />
              <SpeedInsights />

              {/* Navigation and social components */}
              <Navigation />
              <Social />

              {/* Toast notifications */}
              <Toaster position="top-center" />
            </div>

            {/* Enhanced dot pattern */}
            <DotPattern
              className={cn(
                "fixed inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] opacity-50 dark:opacity-30 -z-30"
              )}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
