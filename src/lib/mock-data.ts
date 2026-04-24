import { PromptResult } from "@/types/prompt";

export const demoInputs = [
  "Write a cold email for internship application",
  "Make a startup pitch deck prompt",
  "Create a prompt to summarize my notes",
  "Generate a coding prompt for a Next.js dashboard",
  "Schedule revision for tomorrow evening",
];

export const mockPromptResult: PromptResult = {
  id: "mock-1",
  createdAt: new Date().toISOString(),
  rawCommand: "Write a post for my startup being selected for demo day",
  interpretedIntent: "social-media",
  extractedRequirements: [
    "Platform: LinkedIn",
    "Tone: proud but grounded",
    "Goal: announce demo day selection",
    "Include hashtag options",
  ],
  finalPrompt:
    "You are an expert LinkedIn personal branding writer. Write a professional but human-sounding LinkedIn post announcing that my startup has been selected for Grand Demo Day after progressing through a competitive selection process. Keep the tone proud but grounded, avoid exaggeration, highlight growth, resilience, and gratitude, and end with a forward-looking line. Include strong formatting for LinkedIn readability and provide 2 alternate hook options plus relevant hashtags.",
  variants: {
    standard:
      "Write a polished LinkedIn post announcing our startup's demo day selection with a proud yet humble tone and a forward-looking close.",
    advanced:
      "Act as a senior LinkedIn ghostwriter. Draft a structured post about our startup being selected for demo day, emphasizing journey, learning, gratitude, and next steps. Add two hooks and hashtag set.",
    expert:
      "You are a high-performance startup storyteller. Create a conversion-aware LinkedIn post announcing demo day selection. Include: 1) compelling opening, 2) concise context, 3) emotional but credible milestone framing, 4) gratitude section, 5) CTA for connections. Provide A/B hooks, three endings, and 8 strategic hashtags.",
    copyReady:
      "LinkedIn writing task: announce startup demo day selection. Tone: proud, grounded, authentic. Include journey + gratitude + future plan + CTA. Add 2 hooks and hashtags.",
  },
  wordCount: 109,
  targetMode: "chatgpt",
};
