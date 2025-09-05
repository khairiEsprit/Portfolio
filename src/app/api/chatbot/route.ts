// API route for handling chatbot requests
import { NextRequest, NextResponse } from 'next/server';
import { RecruiterAgent } from '@/lib/chatbot/recruiter-agent';

// Initialize the recruiter agent
const getRecruiterAgent = () => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'x-ai/grok-code-fast-1';
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }
  
  return new RecruiterAgent(apiKey, model);
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const agent = getRecruiterAgent();
    const result = await agent.processMessage({
      message,
      conversationHistory: conversationHistory || []
    });

    return NextResponse.json({
      response: result.response,
      context: result.context,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        details: error instanceof Error ? error.message : 'Unknown error'
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
      status: 'Chatbot is ready'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Chatbot configuration error' },
      { status: 500 }
    );
  }
}