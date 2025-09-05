// OpenRouter API client for Grok model integration
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

export class OpenRouterClient {
  private apiKey: string;
  private model: string;
  private baseUrl: string = "https://openrouter.ai/api/v1/chat/completions";

  constructor(apiKey: string, model: string = "x-ai/grok-code-fast-1") {
    this.apiKey = apiKey;
    this.model = model;
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      console.log("OpenRouter: Sending messages:", messages.length, "messages");
      console.log("Last user message:", messages[messages.length - 1]?.content);

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
          "X-Title": "Mohamed Khairi Bouzid Portfolio Chatbot",
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000, // Increased from 500
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      console.log("OpenRouter response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenRouter API error details:", errorText);
        throw new Error(
          `OpenRouter API error: ${response.status} ${response.statusText}`
        );
      }

      const data: OpenRouterResponse = await response.json();
      console.log("OpenRouter response data:", data);

      if (!data.choices || data.choices.length === 0) {
        throw new Error("No response from OpenRouter API");
      }

      const aiResponse = data.choices[0].message.content;
      console.log("AI Response received:", aiResponse.length, "characters");

      return aiResponse;
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      throw new Error("Failed to get response from AI model");
    }
  }
}
