import { format } from "date-fns";
import {
  IntentType,
  PromptResult,
  PromptSettings,
  PromptStyle,
  TargetMode,
  TaskExtraction,
} from "@/types/prompt";

const intentRules: { intent: IntentType; keywords: string[] }[] = [
  { intent: "scheduling", keywords: ["schedule", "task", "tomorrow", "remind"] },
  { intent: "coding", keywords: ["code", "bug", "debug", "next.js", "api"] },
  { intent: "email-messaging", keywords: ["email", "message", "reply", "outreach"] },
  { intent: "social-media", keywords: ["linkedin", "instagram", "post", "tweet"] },
  { intent: "startup-business", keywords: ["startup", "pitch", "deck", "investor"] },
  { intent: "summarization", keywords: ["summarize", "summary", "notes", "pdf"] },
  { intent: "research", keywords: ["research", "analyze", "compare", "study"] },
  { intent: "content-writing", keywords: ["write", "article", "blog", "script"] },
  { intent: "prompt-enhancement", keywords: ["improve prompt", "refine", "enhance"] },
];

export function classifyIntent(input: string): IntentType {
  const normalized = input.toLowerCase();
  const found = intentRules.find(({ keywords }) =>
    keywords.some((keyword) => normalized.includes(keyword)),
  );
  return found?.intent ?? "general-assistant";
}

export function extractRequirements(input: string, intent: IntentType): string[] {
  const base = [
    `Intent category: ${intent}`,
    "Extract user goal and desired output",
    "Preserve constraints from original wording",
    "Improve clarity and execution quality",
  ];
  if (intent === "coding") {
    return [...base, "Add implementation steps", "Include architecture suggestions"];
  }
  if (intent === "scheduling") {
    return [...base, "Identify date/time", "Create actionable task summary"];
  }
  if (intent === "social-media" || intent === "content-writing") {
    return [...base, "Specify tone and audience", "Add formatting guidance"];
  }
  return base;
}

function styleInstruction(style: PromptStyle): string {
  const map: Record<PromptStyle, string> = {
    concise: "Keep output concise and direct.",
    detailed: "Provide structured and thorough output.",
    expert: "Include advanced best-practice depth and trade-offs.",
    creative: "Use imaginative but practical phrasing.",
    business: "Use professional, decision-ready language.",
  };
  return map[style];
}

function targetInstruction(targetMode: TargetMode): string {
  const map: Record<TargetMode, string> = {
    generic: "Optimize for any modern LLM.",
    chatgpt: "Format for ChatGPT with crisp sectioned output.",
    claude: "Format for Claude with clear intent and nuanced context.",
    gemini: "Format for Gemini with explicit objectives and examples.",
    cursor:
      "Format as an implementation brief for Cursor with architecture, file plan, and acceptance criteria.",
  };
  return map[targetMode];
}

export function extractTaskDetails(input: string): TaskExtraction {
  const lower = input.toLowerCase();
  const tomorrow = lower.includes("tomorrow");
  const hasTime = lower.includes("pm") || lower.includes("am");
  const dueDate = tomorrow
    ? format(new Date(Date.now() + 24 * 60 * 60 * 1000), "yyyy-MM-dd")
    : undefined;

  return {
    title: input.slice(0, 80),
    dueDate,
    reminderTime: hasTime ? input.match(/\d{1,2}\s?(am|pm)/i)?.[0] : undefined,
    actionSummary: `Planned action: ${input}`,
    planningPrompt: `Break this task into practical checklist steps: ${input}`,
  };
}

export function buildPromptResult(
  rawCommand: string,
  settings: PromptSettings,
  styleOverride?: PromptStyle,
): PromptResult {
  const interpretedIntent = classifyIntent(rawCommand);
  const requirements = extractRequirements(rawCommand, interpretedIntent);
  const style = styleOverride ?? settings.defaultStyle;

  const finalPrompt = [
    "You are an expert AI assistant.",
    `Primary objective: ${rawCommand}`,
    `Intent type: ${interpretedIntent}.`,
    "Extract and preserve context, constraints, audience, and desired format.",
    "Respond with: role, plan, execution output, edge cases, and final polished deliverable.",
    styleInstruction(style),
    targetInstruction(settings.targetMode),
  ].join(" ");

  const variants = {
    standard: `${finalPrompt} Keep response practical.`,
    advanced: `${finalPrompt} Include assumptions, alternatives, and a validation checklist.`,
    expert: `${finalPrompt} Add trade-offs, quality rubric, and senior-level recommendations.`,
    copyReady: `Task: ${rawCommand}\nIntent: ${interpretedIntent}\nOutput requirement: polished final result.\n${targetInstruction(settings.targetMode)}`,
  };

  const taskExtraction =
    interpretedIntent === "scheduling" ? extractTaskDetails(rawCommand) : undefined;

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    rawCommand,
    interpretedIntent,
    extractedRequirements: requirements,
    finalPrompt,
    variants,
    wordCount: finalPrompt.split(/\s+/).filter(Boolean).length,
    targetMode: settings.targetMode,
    taskExtraction,
  };
}
