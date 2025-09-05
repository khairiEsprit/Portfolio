// Recruiter-focused AI agent with RAG capabilities
import { OpenRouterClient, ChatMessage } from "./openRouter-client";
import { findRelevantContent, KnowledgeItem } from "./Knowlege-base";
import { ProjectData, ProjectType } from "@/app/(sections)/projects/constant";
import { ProjectCardData } from "@/components/chatbot/ChatProjectCard";

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  context: KnowledgeItem[];
  projectCards?: ProjectCardData[];
}

export class RecruiterAgent {
  private client: OpenRouterClient;
  private systemPrompt: string;

  constructor(apiKey: string, model: string = "x-ai/grok-code-fast-1") {
    this.client = new OpenRouterClient(apiKey, model);
    this.systemPrompt = `You are an AI assistant representing Mohamed Khairi Bouzid, a talented Full-Stack Developer and Computer Engineering student at ESPRIT. 

Your role is to help recruiters and potential employers learn about Mohamed's background, projects, and skills in a professional yet conversational manner.

Key guidelines:
- Be professional but friendly and conversational
- Focus on Mohamed's technical expertise, projects, and achievements  
- Highlight relevant experience for the recruiter's interests
- Provide specific details about technologies, project outcomes, and skills
- Keep responses SHORT and CONCISE (maximum 5-7 lines per response)
- Always maintain a positive, confident tone about Mohamed's capabilities
- If asked about availability, mention he's open to opportunities
- For technical questions, provide essential details while remaining brief
- ALWAYS respond to follow-up questions about projects, even if no project cards are needed
- When users refer to "these projects", "this project", or "the project", understand they're referring to previously mentioned projects

CRITICAL: When discussing ANY projects, you MUST end your response with project identifiers in this EXACT format:
[PROJECT_CARDS: project1, project2, project3]

Use these exact project identifiers:
- "carbon-calculator" for Carbon Calculator (environmental, React, Node, Express, MongoDB, TypeScript)
- "ai-mock-interview" for AI Mock Interview (AI/ML, interview prep, Next.js, Prisma, PostgreSQL)
- "deal-discover" for DealDiscover (travel, recommendation, Vue.js, Pinia, Rasa Platform, Python, MongoDB)
- "email-reply-agent" for Email Reply Agent (AI, productivity, Python, Flask, HTML, CSS, SQLite)
- "e-waste" for E-waste Management (environmental, blockchain, Symfony, Python, JavaScript, Solidity, IoT, MySQL)

MANDATORY project card inclusion rules:
- ANY question about "projects" → include ALL: [PROJECT_CARDS: carbon-calculator, ai-mock-interview, deal-discover, email-reply-agent, e-waste]
- Questions about "deals", "recommendation", "travel" → [PROJECT_CARDS: deal-discover]
- Questions about "AI", "artificial intelligence", "interview" → [PROJECT_CARDS: ai-mock-interview, email-reply-agent]
- Questions about "environment", "carbon", "sustainability" → [PROJECT_CARDS: carbon-calculator, e-waste]
- Questions about "frontend", "Vue", "React" → [PROJECT_CARDS: deal-discover, carbon-calculator]
- Questions about "blockchain", "Symfony" → [PROJECT_CARDS: e-waste]
- Questions about "Python", "Flask" → [PROJECT_CARDS: email-reply-agent]

FOLLOW-UP QUESTIONS HANDLING:
- When users ask about "technologies used in these/this project(s)", respond with detailed tech stack info
- When users ask about "how did you build this", explain the development process
- When users ask about "challenges faced", discuss technical difficulties and solutions
- Always provide helpful, detailed answers to follow-up questions
- Only include [PROJECT_CARDS: ...] when introducing NEW projects, not for follow-up questions about existing ones

EXAMPLE responses:
Q: "Tell me about your projects"
A: "I've built 5 exciting projects spanning AI, blockchain, and full-stack development. Each showcases different technical skills and problem-solving approaches. [PROJECT_CARDS: carbon-calculator, ai-mock-interview, deal-discover, email-reply-agent, e-waste]"

Q: "What technologies did you use in these projects?" (follow-up)
A: "Each project uses modern tech stacks: Carbon Calculator (React, Node.js, MongoDB, TypeScript), AI Mock Interview (Next.js, Prisma, PostgreSQL), DealDiscover (Vue.js, Python, MongoDB), Email Agent (Python, Flask, SQLite), and E-waste (Symfony, Solidity, IoT)."

Background context:
- Full-Stack Developer at SW Consulting
- Computer Engineering student at ESPRIT
- Bachelor's in Computer Science from Higher Institute of Computer Science of Mahdia
- Specializes in web development, blockchain technology, and AI integration
- Multilingual: Arabic (native), English (professional), French (professional)
- Based in Tunisia, open to remote and international opportunities

Remember: ALWAYS respond helpfully to ALL questions, especially follow-ups about projects!`;
  }

  private convertProjectToCardData(project: ProjectType): ProjectCardData {
    return {
      type: "project_card",
      title: project.title,
      description: project.description,
      technologies: project.techstack,
      github: project.github,
      live: project.live,
      status: project.status || "completed",
      completionDate: project.completionDate,
      category: project.category,
    };
  }

  private parseProjectCards(response: string): {
    cleanResponse: string;
    projectCards: ProjectCardData[];
  } {
    console.log("Raw AI response:", response); // Debug log

    const projectCardPattern = /\[PROJECT_CARDS:\s*([^\]]+)\]/i;
    const match = response.match(projectCardPattern);

    if (!match) {
      console.log("No PROJECT_CARDS pattern found in response"); // Debug log
      return { cleanResponse: response, projectCards: [] };
    }

    console.log("Found PROJECT_CARDS pattern:", match[1]); // Debug log

    const cleanResponse = response.replace(projectCardPattern, "").trim();
    const projectIds = match[1].split(",").map((id) => id.trim().toLowerCase());

    console.log("Parsed project IDs:", projectIds); // Debug log

    const projectMap: { [key: string]: ProjectType } = {
      "carbon-calculator": ProjectData.find(
        (p) => p.title === "Carbon Calculator"
      )!,
      "ai-mock-interview": ProjectData.find(
        (p) => p.title === "AI Mock Interview"
      )!,
      "deal-discover": ProjectData.find((p) => p.title === "DealDiscover")!,
      "email-reply-agent": ProjectData.find(
        (p) => p.title === "Email Reply Agent"
      )!,
      "e-waste": ProjectData.find((p) => p.title === "E-waste Management")!,
    };

    const projectCards: ProjectCardData[] = projectIds
      .map((id) => projectMap[id])
      .filter(Boolean)
      .map((project) => this.convertProjectToCardData(project));

    console.log("Generated project cards:", projectCards); // Debug log

    return { cleanResponse, projectCards };
  }

  // Fallback method to detect if project cards should be shown
  private shouldShowProjectCards(message: string): ProjectCardData[] {
    const lowerMessage = message.toLowerCase();

    // Keywords that should trigger project cards (only for new project introductions)
    const newProjectKeywords = [
      "show me projects",
      "tell me about projects",
      "what projects",
      "your projects",
      "portfolio",
      "work you've done",
      "built",
      "created",
      "developed projects",
    ];

    // Follow-up question keywords that should NOT trigger new project cards
    const followUpKeywords = [
      "these project",
      "this project",
      "the project",
      "technologies used",
      "how did you",
      "what technologies",
      "tech stack",
      "built with",
      "challenges",
      "difficulties",
      "implementation",
      "approach",
    ];

    // If it's a follow-up question, don't show project cards
    const isFollowUp = followUpKeywords.some((keyword) =>
      lowerMessage.includes(keyword)
    );

    if (isFollowUp) {
      console.log("Detected follow-up question, not showing project cards");
      return [];
    }

    // Only show project cards for new project introductions
    const isNewProjectQuestion =
      newProjectKeywords.some((keyword) => lowerMessage.includes(keyword)) ||
      (lowerMessage.includes("project") && !isFollowUp);

    if (!isNewProjectQuestion) {
      return [];
    }

    // Return relevant projects based on keywords
    const allProjectIds = [
      "carbon-calculator",
      "ai-mock-interview",
      "deal-discover",
      "email-reply-agent",
      "e-waste",
    ];

    const projectMap: { [key: string]: ProjectType } = {
      "carbon-calculator": ProjectData.find(
        (p) => p.title === "Carbon Calculator"
      )!,
      "ai-mock-interview": ProjectData.find(
        (p) => p.title === "AI Mock Interview"
      )!,
      "deal-discover": ProjectData.find((p) => p.title === "DealDiscover")!,
      "email-reply-agent": ProjectData.find(
        (p) => p.title === "Email Reply Agent"
      )!,
      "e-waste": ProjectData.find((p) => p.title === "E-waste Management")!,
    };

    // Specific matching for new project questions
    if (
      lowerMessage.includes("ai") ||
      lowerMessage.includes("artificial") ||
      lowerMessage.includes("interview")
    ) {
      return ["ai-mock-interview", "email-reply-agent"]
        .map((id) => projectMap[id])
        .filter(Boolean)
        .map((project) => this.convertProjectToCardData(project));
    }

    if (
      lowerMessage.includes("deal") ||
      lowerMessage.includes("travel") ||
      lowerMessage.includes("recommendation")
    ) {
      return [projectMap["deal-discover"]]
        .filter(Boolean)
        .map((project) => this.convertProjectToCardData(project));
    }

    if (
      lowerMessage.includes("environment") ||
      lowerMessage.includes("carbon") ||
      lowerMessage.includes("sustainability")
    ) {
      return ["carbon-calculator", "e-waste"]
        .map((id) => projectMap[id])
        .filter(Boolean)
        .map((project) => this.convertProjectToCardData(project));
    }

    // Default: show all projects for general project questions
    return allProjectIds
      .map((id) => projectMap[id])
      .filter(Boolean)
      .map((project) => this.convertProjectToCardData(project));
  }

  async processMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log("Processing message:", request.message);
      console.log("Conversation history:", request.conversationHistory);

      // Find relevant content using RAG
      const relevantContent = findRelevantContent(request.message, 3);

      // Build context from relevant knowledge items
      const contextStr =
        relevantContent.length > 0
          ? relevantContent
              .map((item) => `${item.title}: ${item.content}`)
              .join("\n\n")
          : "";

      // Build conversation messages
      const messages: ChatMessage[] = [
        { role: "system", content: this.systemPrompt },
      ];

      // Add conversation history if provided (keep last 8 messages for better context)
      if (
        request.conversationHistory &&
        request.conversationHistory.length > 0
      ) {
        messages.push(...request.conversationHistory.slice(-8));
      }

      // Add current message with context
      const userMessageWithContext = contextStr
        ? `Context about Mohamed Khairi Bouzid:\n${contextStr}\n\nUser question: ${request.message}`
        : request.message;

      messages.push({ role: "user", content: userMessageWithContext });

      console.log("Messages being sent to AI:", messages);

      // Get AI response
      const rawResponse = await this.client.sendMessage(messages);
      console.log("Raw AI response received:", rawResponse);

      if (!rawResponse || rawResponse.trim().length === 0) {
        throw new Error("Empty response from AI");
      }

      // Parse response for project cards
      const { cleanResponse, projectCards } =
        this.parseProjectCards(rawResponse);

      // If no project cards were found in AI response, use fallback detection
      let finalProjectCards = projectCards;
      if (projectCards.length === 0) {
        console.log("No project cards from AI, trying fallback detection");
        finalProjectCards = this.shouldShowProjectCards(request.message);
        console.log("Fallback project cards:", finalProjectCards);
      }

      const result = {
        response: cleanResponse,
        context: relevantContent,
        projectCards: finalProjectCards,
      };

      console.log("Final response:", result);
      return result;
    } catch (error) {
      console.error("RecruiterAgent Error:", error);
      return {
        response:
          "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, or feel free to reach out to Mohamed directly at khairibouzid95@gmail.com.",
        context: [],
        projectCards: [],
      };
    }
  }

  // Predefined quick responses for common recruiter questions
  getQuickResponses(): Array<{ question: string; category: string }> {
    return [
      { question: "Tell me about your latest projects", category: "projects" },
      { question: "What are your main technical skills?", category: "skills" },
      {
        question: "What's your experience with React/Next.js?",
        category: "frontend",
      },
      {
        question: "Do you have backend development experience?",
        category: "backend",
      },
      {
        question: "Have you worked with AI or blockchain?",
        category: "emerging-tech",
      },
      {
        question: "What's your educational background?",
        category: "education",
      },
      {
        question: "Are you available for new opportunities?",
        category: "availability",
      },
    ];
  }
}
