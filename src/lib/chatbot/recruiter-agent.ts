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
- Keep responses concise but informative (2-3 paragraphs max)
- Always maintain a positive, confident tone about Mohamed's capabilities
- If asked about availability, mention he's open to opportunities
- For technical questions, provide depth while remaining accessible

IMPORTANT: When discussing specific projects, always end your response with project identifiers in this format:
[PROJECT_CARDS: project1, project2, project3]

Use these exact project identifiers when relevant:
- "carbon-calculator" for Carbon Calculator
- "ai-mock-interview" for AI Mock Interview  
- "deal-discover" for DealDiscover
- "email-reply-agent" for Email Reply Agent
- "e-waste" for E-waste Management

Examples:
- If asked about "deals recommendation" or "travel projects" → include "deal-discover"
- If asked about "AI projects" or "interview" → include "ai-mock-interview"
- If asked about "environmental projects" → include "carbon-calculator" and "e-waste"
- If asked about "frontend projects" → include "deal-discover"
- If asked about "all projects" → include all project identifiers

Background context:
- Full-Stack Developer at SW Consulting
- Computer Engineering student at ESPRIT
- Bachelor's in Computer Science from Higher Institute of Computer Science of Mahdia
- Specializes in web development, blockchain technology, and AI integration
- Multilingual: Arabic (native), English (professional), French (professional)
- Based in Tunisia, open to remote and international opportunities

When responding, use the provided context about Mohamed's projects and skills to give specific, relevant examples.`;
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
    const projectCardPattern = /\[PROJECT_CARDS:\s*([^\]]+)\]/i;
    const match = response.match(projectCardPattern);

    if (!match) {
      return { cleanResponse: response, projectCards: [] };
    }

    const cleanResponse = response.replace(projectCardPattern, "").trim();
    const projectIds = match[1].split(",").map((id) => id.trim().toLowerCase());

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

    return { cleanResponse, projectCards };
  }

  async processMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      // Find relevant content using RAG
      const relevantContent = findRelevantContent(request.message, 3);

      // Build context from relevant knowledge items
      const contextStr =
        relevantContent.length > 0
          ? relevantContent
              .map((item) => `${item.title}: ${item.content}`)
              .join(
                "\
\
"
              )
          : "";

      // Build conversation messages
      const messages: ChatMessage[] = [
        { role: "system", content: this.systemPrompt },
      ];

      // Add conversation history if provided
      if (
        request.conversationHistory &&
        request.conversationHistory.length > 0
      ) {
        messages.push(...request.conversationHistory.slice(-6)); // Keep last 6 messages for context
      }

      // Add current message with context
      const userMessageWithContext = contextStr
        ? `Context about Mohamed Khairi Bouzid:\
${contextStr}\
\
User question: ${request.message}`
        : request.message;

      messages.push({ role: "user", content: userMessageWithContext });

      // Get AI response
      const rawResponse = await this.client.sendMessage(messages);

      // Parse response for project cards
      const { cleanResponse, projectCards } =
        this.parseProjectCards(rawResponse);

      return {
        response: cleanResponse,
        context: relevantContent,
        projectCards,
      };
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
