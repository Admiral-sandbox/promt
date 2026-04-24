import { NextResponse } from "next/server";
import { llmProvider } from "@/services/llm-provider";
import { PromptSettings } from "@/types/prompt";

export async function POST(request: Request) {
  const body = (await request.json()) as { input?: string; settings?: PromptSettings };
  if (!body.input || !body.settings) {
    return NextResponse.json({ error: "Missing input or settings" }, { status: 400 });
  }
  const result = await llmProvider.generatePrompt({ input: body.input, settings: body.settings });
  return NextResponse.json({ result });
}
