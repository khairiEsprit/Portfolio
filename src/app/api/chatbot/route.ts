// API route for handling chatbot requests
import { NextRequest, NextResponse } from "next/server";
import { RecruiterAgent } from "@/lib/chatbot/recruiter-agent";

// Initialize the recruiter agent
const getRecruiterAgent = () => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "x-ai/grok-code-fast-1";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  return new RecruiterAgent(apiKey, model);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    console.log("API received:", { message, conversationHistory });

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const agent = getRecruiterAgent();
    const result = await agent.processMessage({
      message,
      conversationHistory: conversationHistory || [],
    });

    console.log('API Response:', {
      response: result.response,
      responseLength: result.response?.length || 0,
      projectCardsCount: result.projectCards?.length || 0,
      projectCards: result.projectCards
    });

    // Ensure we always have a response
    if (!result.response || result.response.trim().length === 0) {
      console.error("Empty response from agent, providing fallback");
      return NextResponse.json({
        response: "I'm here to help! Could you please rephrase your question? I'm ready to tell you about Mohamed's projects, skills, and experience.",
        context: result.context,
        projectCards: result.projectCards || [],
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      response: result.response,
      context: result.context,
      projectCards: result.projectCards || [],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to process chat message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const agent = getRecruiterAgent();
    const quickResponses = agent.getQuickResponses();

    return NextResponse.json({
      quickResponses,
      status: "Chatbot is ready",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Chatbot configuration error" },
      { status: 500 }
    );
  }
}
