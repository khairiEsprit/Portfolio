// Recruiter-focused AI agent with RAG capabilities
import { OpenRouterClient, ChatMessage } from "./openRouter-client";
import { findRelevantContent, KnowledgeItem } from "./Knowlege-base";

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  response: string;
  context: KnowledgeItem[];
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

Background context:
- Full-Stack Developer at SW Consulting
- Computer Engineering student at ESPRIT
- Bachelor's in Computer Science from Higher Institute of Computer Science of Mahdia
- Specializes in web development, blockchain technology, and AI integration
- Multilingual: Arabic (native), English (professional), French (professional)
- Based in Tunisia, open to remote and international opportunities

When responding, use the provided context about Mohamed's projects and skills to give specific, relevant examples.`;
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
      const response = await this.client.sendMessage(messages);

      return {
        response,
        context: relevantContent,
      };
    } catch (error) {
      console.error("RecruiterAgent Error:", error);
      return {
        response:
          "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, or feel free to reach out to Mohamed directly at khairibouzid95@gmail.com.",
        context: [],
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
