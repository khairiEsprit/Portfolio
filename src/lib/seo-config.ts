// SEO Configuration for Mohamed Khairi Bouzid Portfolio
// Update the domain and verification codes before deployment

export const seoConfig = {
  // Site Information
  siteName: "Mohamed Khairi Bouzid Portfolio",
  siteDescription:
    "Mohamed Khairi Bouzid is a passionate full-stack developer and computer engineering student at ESPRIT, specializing in web development, blockchain technology, and modern JavaScript frameworks. Explore my portfolio showcasing innovative projects and technical expertise.",
  siteUrl: "https://www.mohamedkhairibouzid.engineer/",

  // Personal Information
  author: {
    name: "Mohamed Khairi Bouzid",
    alternateName: ["Khairi Bouzid", "Mohamed Khairi"],
    email: "khairibouzid95@gmail.com",
    github: "https://github.com/khairiEsprit",
    linkedin: "https://www.linkedin.com/in/mohamed-khairi-bouzid-a32753231/",
    twitter: "@khairibzd", // TODO: Update with actual Twitter handle if available
  },

  // SEO Keywords
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

  // Open Graph Images
  images: {
    ogImage: "/og-image.jpg",
    profileImage: "/pk.webp",
    fallbackImage: "/pk.webp",
  },

  // Verification Codes (Add these after setting up search console accounts)
  verification: {
    google: "kMmXVdoojaLfpzTztLAeVusW3OXs4JXcTam", // TODO: Add Google Search Console verification
    bing: "your-bing-verification-code", // TODO: Add Bing Webmaster verification
    yandex: "your-yandex-verification-code", // TODO: Add if targeting Russian audience
  },

  // Social Media
  social: {
    twitter: "@khairibzd", // TODO: Update with actual handle
    linkedin: "mohamed-khairi-bouzid-a32753231",
    github: "khairibzd",
  },

  // Theme Colors
  themeColors: {
    light: "#3b82f6",
    dark: "#1e40af",
    primary: "#3b82f6",
    secondary: "#8b5cf6",
  },

  // Structured Data
  structuredData: {
    jobTitle: "Full Stack Developer",
    worksFor: "SW Consulting",
    alumniOf: [
      {
        name: "Higher Institute of Computer Science of Mahdia",
        description: "Bachelor's degree in Computer Science",
      },
      {
        name: "ESPRIT",
        description: "Computer and Information Engineering",
      },
    ],
    skills: [
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
    nationality: "Tunisia",
  },

  // Page-specific metadata
  pages: {
    home: {
      title:
        "Mohamed Khairi Bouzid - Full Stack Developer & Computer Engineering Student",
      description:
        "Welcome to Mohamed Khairi Bouzid's portfolio - showcasing innovative web development projects and technical expertise.",
    },
    about: {
      title: "About Mohamed Khairi Bouzid",
      description:
        "Learn about Mohamed Khairi Bouzid's background, education, and passion for web development and blockchain technology.",
    },
    projects: {
      title: "Projects by Mohamed Khairi Bouzid",
      description:
        "Explore innovative web development projects including Carbon Calculator, AI Mock Interview, and more.",
    },
    skills: {
      title: "Technical Skills - Mohamed Khairi Bouzid",
      description:
        "Discover Mohamed Khairi Bouzid's technical expertise in React, Next.js, Node.js, blockchain, and modern web technologies.",
    },
    experience: {
      title: "Professional Experience - Mohamed Khairi Bouzid",
      description:
        "Mohamed Khairi Bouzid's professional journey and internship experience in software development.",
    },
    contact: {
      title: "Contact Mohamed Khairi Bouzid",
      description:
        "Get in touch with Mohamed Khairi Bouzid for collaboration opportunities and professional inquiries.",
    },
  },
};

// Helper function to generate page metadata
export function generatePageMetadata(pageKey: keyof typeof seoConfig.pages) {
  const page = seoConfig.pages[pageKey];
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${seoConfig.siteUrl}/${pageKey === "home" ? "" : pageKey}`,
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}
