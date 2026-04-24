export type IntentType =
  | "content-writing"
  | "coding"
  | "research"
  | "summarization"
  | "prompt-enhancement"
  | "scheduling"
  | "email-messaging"
  | "startup-business"
  | "social-media"
  | "general-assistant";

export type PromptStyle =
  | "concise"
  | "detailed"
  | "expert"
  | "creative"
  | "business";

export type TargetMode = "generic" | "chatgpt" | "claude" | "gemini" | "cursor";

export type OutputTabMode = "standard" | "advanced" | "expert" | "copy-ready";

export interface TaskExtraction {
  title: string;
  dueDate?: string;
  reminderTime?: string;
  actionSummary: string;
  planningPrompt: string;
}

export interface PromptVariants {
  standard: string;
  advanced: string;
  expert: string;
  copyReady: string;
}

export interface PromptResult {
  id: string;
  createdAt: string;
  rawCommand: string;
  interpretedIntent: IntentType;
  extractedRequirements: string[];
  finalPrompt: string;
  variants: PromptVariants;
  wordCount: number;
  targetMode: TargetMode;
  taskExtraction?: TaskExtraction;
}

export interface PromptSettings {
  defaultStyle: PromptStyle;
  voiceLanguage: string;
  theme: "dark" | "system";
  apiKey: string;
  copyFormat: "plain" | "markdown";
  targetMode: TargetMode;
}
