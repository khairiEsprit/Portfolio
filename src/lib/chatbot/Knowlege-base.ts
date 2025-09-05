// Knowledge base for RAG system - Static approach
export interface KnowledgeItem {
  id: string;
  type: 'project' | 'skill' | 'about' | 'experience';
  title: string;
  content: string;
  keywords: string[];
  category?: string;
}

// Projects knowledge base
export const projectsKnowledge: KnowledgeItem[] = [
  {
    id: 'carbon-calculator',
    type: 'project',
    title: 'Carbon Calculator',
    content: `The Carbon Calculator is a full-stack web application that helps users calculate and track their carbon footprint. Built with React, Node.js, Express, and MongoDB, this environmental application provides users with insights into their environmental impact. The project demonstrates my ability to work with modern web technologies and create meaningful applications that address real-world environmental concerns. The application features user authentication, data visualization, and comprehensive carbon tracking capabilities.`,
    keywords: ['carbon', 'calculator', 'environment', 'react', 'node', 'express', 'mongodb', 'typescript', 'full-stack', 'web development'],
    category: 'Full Stack'
  },
  {
    id: 'ai-mock-interview',
    type: 'project', 
    title: 'AI Mock Interview Platform',
    content: `The AI Mock Interview Platform is an innovative educational tool that helps job seekers practice their interview skills. Built with React, Next.js, and powered by AI prompt engineering, this application generates realistic interview questions and provides detailed feedback upon completion. The platform uses Prisma ORM with PostgreSQL for data management and demonstrates my expertise in AI integration, database design, and creating user-centric educational tools. This project showcases my ability to combine AI technologies with practical career development solutions.`,
    keywords: ['ai', 'interview', 'practice', 'react', 'nextjs', 'prompt engineering', 'prisma', 'postgresql', 'education', 'career', 'feedback'],
    category: 'AI/ML'
  },
  {
    id: 'deal-discover',
    type: 'project',
    title: 'DealDiscover - Travel Recommendation Platform',
    content: `DealDiscover is a sophisticated travel recommendation platform featuring an intelligent chatbot built with Vue.js, Pinia for state management, and the Rasa Platform for natural language processing. The application helps users find their ideal travel destinations through conversational AI. Built with Python backend integration, TypeScript, and MongoDB, this project demonstrates my versatility across different frontend frameworks and my ability to integrate complex AI systems. The platform showcases advanced chatbot development and travel industry domain expertise.`,
    keywords: ['travel', 'recommendations', 'chatbot', 'vuejs', 'pinia', 'rasa', 'python', 'typescript', 'mongodb', 'nlp', 'conversational ai'],
    category: 'Frontend'
  },
  {
    id: 'email-reply-agent', 
    type: 'project',
    title: 'Email Reply Agent - Intelligent Email Assistant',
    content: `The Email Reply Agent is an intelligent email automation tool that analyzes incoming messages and generates contextually appropriate responses. Built with Python Flask, HTML/CSS frontend, and powered by advanced prompt engineering techniques, this productivity application demonstrates my ability to create practical AI-powered solutions. The system uses SQLite for data storage and showcases my skills in natural language processing, email automation, and creating tools that enhance workplace productivity and communication efficiency.`,
    keywords: ['email', 'automation', 'ai', 'agent', 'python', 'flask', 'prompt engineering', 'sqlite', 'productivity', 'communication', 'nlp'],
    category: 'AI/ML'
  },
  {
    id: 'e-waste-management',
    type: 'project', 
    title: 'E-Waste Management Platform - Blockchain & AI Solution',
    content: `The E-Waste Management Platform is a comprehensive solution that transforms electronic waste management through cutting-edge technologies including AI, blockchain, and face recognition. Built with Symfony framework, Python for AI components, JavaScript for frontend interactions, and Solidity for smart contracts, this platform also integrates IoT devices and uses MySQL for data management. This project demonstrates my expertise in blockchain development, smart contracts, IoT integration, and creating complex systems that address environmental challenges through technology innovation.`,
    keywords: ['e-waste', 'blockchain', 'ai', 'face recognition', 'symfony', 'python', 'javascript', 'solidity', 'iot', 'mysql', 'environmental', 'smart contracts'],
    category: 'Blockchain'
  }
];

// Skills knowledge base
export const skillsKnowledge: KnowledgeItem[] = [
  {
    id: 'frontend-skills',
    type: 'skill',
    title: 'Frontend Development Skills',
    content: `I have extensive experience in modern frontend development with expertise in Next.js, React.js, and Vue.js frameworks. My frontend skills include TypeScript and JavaScript for robust application development, HTML5 and CSS3 for semantic markup and styling, and Tailwind CSS for efficient, responsive design systems. I specialize in creating dynamic, user-friendly interfaces with modern development practices, component-based architecture, and responsive design principles. My frontend expertise enables me to build scalable, maintainable, and visually appealing web applications.`,
    keywords: ['frontend', 'nextjs', 'react', 'vuejs', 'typescript', 'javascript', 'html5', 'css3', 'tailwind', 'responsive design', 'components'],
    category: 'Frontend'
  },
  {
    id: 'backend-skills',
    type: 'skill',
    title: 'Backend Development Skills', 
    content: `My backend development expertise spans multiple technologies and languages including Node.js with Express.js for JavaScript-based server applications, Python with Flask for web services, Java for enterprise applications, and Symfony for PHP-based systems. I have strong database skills with both MongoDB (NoSQL) and MySQL (relational databases), enabling me to design efficient data storage solutions. My backend skills focus on building scalable APIs, implementing secure authentication, optimizing database performance, and creating robust server-side logic for complex applications.`,
    keywords: ['backend', 'nodejs', 'express', 'python', 'flask', 'java', 'symfony', 'mongodb', 'mysql', 'api', 'database', 'server'],
    category: 'Backend'
  },
  {
    id: 'tools-skills',
    type: 'skill',
    title: 'Development Tools & Technologies',
    content: `I work with a comprehensive toolkit of development and deployment technologies. My development environment includes VS Code for coding, Git and GitHub for version control and collaboration, and Postman for API testing and documentation. I have experience with cloud platforms including Azure for deployment and scaling, and Linux systems for server management. In the blockchain space, I work with Ethereum development, Solidity for smart contracts, and Hardhat for blockchain development and testing. These tools enable me to maintain efficient development workflows and deliver professional-grade applications.`,
    keywords: ['tools', 'vscode', 'git', 'github', 'postman', 'linux', 'azure', 'ethereum', 'solidity', 'hardhat', 'blockchain', 'development tools'],
    category: 'Tools'
  },
  {
    id: 'ai-ml-skills',
    type: 'skill',
    title: 'AI & Machine Learning Skills',
    content: `I have specialized knowledge in artificial intelligence and machine learning applications, with particular expertise in prompt engineering for large language models (LLMs). My AI skills include working with various machine learning frameworks, designing and optimizing prompts for AI systems, and integrating LLMs into practical applications. I understand natural language processing concepts, conversational AI development, and how to leverage AI technologies to create intelligent, user-focused solutions. This expertise allows me to build innovative applications that harness the power of modern AI technologies.`,
    keywords: ['ai', 'machine learning', 'prompt engineering', 'llm', 'natural language processing', 'conversational ai', 'artificial intelligence'],
    category: 'AI/ML'
  }
];

// About & experience knowledge base
export const aboutKnowledge: KnowledgeItem[] = [
  {
    id: 'about-background',
    type: 'about',
    title: 'Professional Background',
    content: `I am Mohamed Khairi Bouzid, a passionate full-stack developer and computer engineering student at ESPRIT. I hold a Bachelor's degree in Computer Science from the Higher Institute of Computer Science of Mahdia and am currently pursuing my engineering degree in Computer and Information Science. My professional experience includes working as a Full Stack Developer at SW Consulting, where I apply my technical skills to real-world projects. I am passionate about web development, blockchain technology, and creating innovative solutions that make a meaningful impact.`,
    keywords: ['mohamed khairi bouzid', 'full-stack developer', 'esprit', 'computer engineering', 'computer science', 'sw consulting', 'tunisia', 'developer'],
    category: 'Background'
  },
  {
    id: 'languages',
    type: 'about',
    title: 'Language Proficiency',
    content: `I am multilingual with strong communication skills in multiple languages. I have native or bilingual proficiency in Arabic, full professional proficiency in English, and professional working proficiency in French. This linguistic diversity enables me to work effectively with international teams, communicate with global clients, and contribute to diverse project environments. My language skills complement my technical abilities and make me well-suited for collaborative, multicultural development teams.`,
    keywords: ['languages', 'arabic', 'english', 'french', 'multilingual', 'communication', 'international', 'collaboration'],
    category: 'Languages' 
  },
  {
    id: 'expertise-areas',
    type: 'about', 
    title: 'Areas of Expertise',
    content: `My core expertise spans modern web development with React, Next.js, and Vue.js ecosystems, full-stack development combining frontend and backend technologies, blockchain development with Ethereum and Solidity, AI integration and prompt engineering for intelligent applications, and database design with both SQL and NoSQL systems. I bring creativity, perseverance, and autonomy to every project, focusing on building scalable, maintainable, and user-focused solutions. My approach combines technical excellence with practical problem-solving to deliver meaningful results.`,
    keywords: ['expertise', 'web development', 'full-stack', 'blockchain', 'ai integration', 'database design', 'problem-solving', 'scalable solutions'],
    category: 'Expertise'
  }
];

// Combine all knowledge items
export const knowledgeBase: KnowledgeItem[] = [
  ...projectsKnowledge,
  ...skillsKnowledge, 
  ...aboutKnowledge
];

// Simple similarity search function
export function findRelevantContent(query: string, limit: number = 3): KnowledgeItem[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(' ').filter(word => word.length > 2);
  
  const scoredItems = knowledgeBase.map(item => {
    let score = 0;
    
    // Check title match
    if (item.title.toLowerCase().includes(queryLower)) score += 10;
    
    // Check content match  
    const contentLower = item.content.toLowerCase();
    queryWords.forEach(word => {
      if (contentLower.includes(word)) score += 2;
    });
    
    // Check keywords match
    item.keywords.forEach(keyword => {
      if (queryWords.some(word => keyword.includes(word) || word.includes(keyword))) {
        score += 5;
      }
    });
    
    return { item, score };
  });
  
  return scoredItems
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}