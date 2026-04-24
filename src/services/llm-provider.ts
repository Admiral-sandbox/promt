import { buildPromptResult, classifyIntent, extractTaskDetails } from "@/services/prompt-engine";
import { PromptResult, PromptSettings } from "@/types/prompt";

interface GeneratePromptPayload {
  input: string;
  settings: PromptSettings;
}

export interface LlmProvider {
  generatePrompt(payload: GeneratePromptPayload): Promise<PromptResult>;
  classifyIntent(input: string): Promise<string>;
  rewritePrompt(input: string, mode: "shorten" | "expand" | "professional" | "creative"): Promise<string>;
  extractTask(input: string): Promise<ReturnType<typeof extractTaskDetails>>;
}

class MockLlmProvider implements LlmProvider {
  async generatePrompt(payload: GeneratePromptPayload): Promise<PromptResult> {
    return buildPromptResult(payload.input, payload.settings);
  }

  async classifyIntent(input: string): Promise<string> {
    return classifyIntent(input);
  }

  async rewritePrompt(
    input: string,
    mode: "shorten" | "expand" | "professional" | "creative",
  ): Promise<string> {
    const prefix: Record<typeof mode, string> = {
      shorten: "Rewrite this in a concise form:",
      expand: "Rewrite this with more detail:",
      professional: "Rewrite this in a professional tone:",
      creative: "Rewrite this in a creative tone:",
    };
    return `${prefix[mode]} ${input}`;
  }

  async extractTask(input: string) {
    return extractTaskDetails(input);
  }
}

export const llmProvider: LlmProvider = new MockLlmProvider();
