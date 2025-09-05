import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import ChatWidget from "@/components/chatbot/ChatWidget";
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

// Optimized font loading with display swap for better performance
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default:
      "Mohamed Khairi Bouzid - Full Stack Developer & Computer Engineering Student",
    template: "%s | Mohamed Khairi Bouzid Portfolio",
  },
  description:
    "Mohamed Khairi Bouzid is a passionate full-stack developer and computer engineering student at ESPRIT, specializing in web development, blockchain technology, and modern JavaScript frameworks. Explore my portfolio showcasing innovative projects and technical expertise.",
  keywords: [
    "Mohamed Khairi Bouzid",
    "Full Stack Developer",
    "Computer Engineering",
    "ESPRIT",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Tunisia Developer",
    "Portfolio",
    "Computer Science",
    "Vue.js Developer",
    "MongoDB Developer",
    "Express.js Developer",
    "Tailwind CSS",
    "Software Development",
    "Programming",
    "Tech Portfolio",
  ],
  authors: [
    { name: "Mohamed Khairi Bouzid", url: "https://github.com/khairibzd" },
  ],
  creator: "Mohamed Khairi Bouzid",
  publisher: "Mohamed Khairi Bouzid",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mohamedkhairibouzid.engineer/",
    siteName: "Mohamed Khairi Bouzid Portfolio",
    title:
      "Mohamed Khairi Bouzid - Full Stack Developer & Computer Engineering Student",
    description:
      "Passionate full-stack developer and computer engineering student at ESPRIT, specializing in web development, blockchain technology, and modern JavaScript frameworks.",
    images: [
      {
        url: "https://www.mohamedkhairibouzid.engineer/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohamed Khairi Bouzid - Full Stack Developer Portfolio",
        type: "image/jpeg",
      },
      {
        url: "https://www.mohamedkhairibouzid.engineer/pk.webp",
        width: 1000,
        height: 1000,
        alt: "Mohamed Khairi Bouzid Profile Picture",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mohamed Khairi Bouzid - Full Stack Developer & Computer Engineering Student",
    description:
      "Passionate full-stack developer and computer engineering student at ESPRIT, specializing in web development, blockchain technology, and modern JavaScript frameworks.",
    images: ["https://www.mohamedkhairibouzid.engineer/og-image.jpg"],
    creator: "@khairibzd",
  },
  verification: {
    google: "kMmXVdoojaLfpzTztLAeVusW3OXs4JXcTam",
  },
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/",
  },
  category: "technology",
  classification: "Portfolio Website",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
    apple: [{ url: "/pk.webp", sizes: "180x180", type: "image/webp" }],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.ico",
        color: "#3b82f6",
      },
    ],
  },
  metadataBase: new URL("https://www.mohamedkhairibouzid.engineer/"),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.mohamedkhairibouzid.engineer/#person",
      name: "Mohamed Khairi Bouzid",
      alternateName: ["Khairi Bouzid", "Mohamed Khairi"],
      description:
        "Full Stack Developer and Computer Engineering Student at ESPRIT",
      url: "https://www.mohamedkhairibouzid.engineer/",
      image: {
        "@type": "ImageObject",
        url: "https://www.mohamedkhairibouzid.engineer/pk.webp",
        width: 1000,
        height: 1000,
      },
      sameAs: [
        "https://github.com/khairiEsprit",
        "https://www.linkedin.com/in/mohamed-khairi-bouzid-a32753231/",
        "mailto:khairibouzid95@gmail.com",
      ],
      jobTitle: "Full Stack Developer",
      worksFor: {
        "@type": "Organization",
        name: "SW Consulting",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Higher Institute of Computer Science of Mahdia",
          description: "Bachelor's degree in Computer Science",
        },
        {
          "@type": "EducationalOrganization",
          name: "ESPRIT",
          description: "Computer and Information Engineering",
        },
      ],
      knowsAbout: [
        "Web Development",
        "Blockchain Technology",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Vue.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Web3",
        "Software Engineering",
      ],
      nationality: {
        "@type": "Country",
        name: "Tunisia",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mohamedkhairibouzid.engineer/#website",
      url: "https://www.mohamedkhairibouzid.engineer/",
      name: "Mohamed Khairi Bouzid Portfolio",
      description:
        "Portfolio website showcasing projects and skills of Mohamed Khairi Bouzid, a full-stack developer and computer engineering student.",
      publisher: {
        "@id": "https://www.mohamedkhairibouzid.engineer/#person",
      },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target:
          "https://www.mohamedkhairibouzid.engineer/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.mohamedkhairibouzid.engineer/#organization",
      name: "Mohamed Khairi Bouzid Portfolio",
      alternateName: "Khairi Bouzid Portfolio",
      url: "https://www.mohamedkhairibouzid.engineer/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mohamedkhairibouzid.engineer/logo.png",
        width: 600,
        height: 600,
        caption: "Mohamed Khairi Bouzid Logo",
      },
      image: {
        "@type": "ImageObject",
        url: "https://www.mohamedkhairibouzid.engineer/og-image.jpg",
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://github.com/khairiEsprit",
        "https://www.linkedin.com/in/mohamed-khairi-bouzid-a32753231/",
      ],
      founder: {
        "@id": "https://www.mohamedkhairibouzid.engineer/#person",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "khairibouzid95@gmail.com",
        contactType: "professional inquiries",
      },
      description:
        "Professional portfolio website of Mohamed Khairi Bouzid, showcasing full-stack development projects and technical expertise.",
      foundingDate: "2024-01-01",
      keywords:
        "Full Stack Developer, Web Development, React, Next.js, Portfolio",
    },
    {
      "@type": "WebPage",
      "@id": "https://www.mohamedkhairibouzid.engineer/#webpage",
      url: "https://www.mohamedkhairibouzid.engineer/",
      name: "Home - Mohamed Khairi Bouzid Portfolio",
      description:
        "Welcome to Mohamed Khairi Bouzid's portfolio - showcasing innovative web development projects and technical expertise.",
      isPartOf: {
        "@id": "https://www.mohamedkhairibouzid.engineer/#website",
      },
      about: {
        "@id": "https://www.mohamedkhairibouzid.engineer/#person",
      },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="smooth-scroll">
      <head>
        {/* Favicon - Multiple formats for maximum compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />

        {/* Critical resource preloading for faster page loads */}
        <link rel="preload" href="/pk.webp" as="image" type="image/webp" />
        <link rel="preload" href="/assets/CV.pdf" as="document" />
        
        {/* Mobile-specific optimizations */}
        <link rel="preload" href="/pk.webp" as="image" type="image/webp" media="(max-width: 768px)" imageSizes="(max-width: 768px) 256px" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />

        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Resource hints for better performance */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />

        {/* Mobile-specific performance optimizations */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Reduce layout shift and optimize for mobile */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent FOUC and layout shift */
            html { font-display: swap; }
            body { font-display: swap; }
            img { content-visibility: auto; }
            
            /* Mobile-specific optimizations */
            @media (max-width: 768px) {
              * { 
                scroll-behavior: auto !important;
                animation-duration: 0.2s !important;
                transition-duration: 0.2s !important;
              }
              
              /* Reduce motion for mobile performance */
              @media (prefers-reduced-motion: reduce) {
                *, *::before, *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }
            }
          `
        }} />
        <meta name="color-scheme" content="light dark" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Additional SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      </head>
      <body
        className={cn(
          inter.className,
          poppins.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <div className="relative overflow-hidden min-h-screen bg-background">
              {/* Optimized background effects - reduced complexity */}
              <div className="fixed inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/5 dark:to-purple-950/5 pointer-events-none -z-20" />

              {/* Reduced animated background blobs - disabled on mobile for better performance */}
              <div className="hidden md:block fixed top-10 left-1/3 w-[400px] h-[400px] bg-blue-200/10 dark:bg-blue-800/5 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob -z-10" />
              <div className="hidden lg:block fixed top-0 right-4 w-[400px] h-[400px] bg-purple-200/10 dark:bg-purple-800/5 mix-blend-multiply rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000 -z-10" />

              {/* Page content with transitions */}
              <PageTransition>{children}</PageTransition>

              {/* Navigation and social components */}
              <Navigation />
              <Social />

              {/* Toast notifications */}
              <Toaster position="top-center" />
              <ChatWidget />

              {/* Analytics and tracking - only in production */}
              {process.env.NODE_ENV === "production" && (
                <>
                  <Analytics />
                  <SpeedInsights />
                </>
              )}
            </div>

            {/* Optimized dot pattern */}
            <DotPattern
              className={cn(
                "fixed inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] opacity-30 dark:opacity-20 -z-30"
              )}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
