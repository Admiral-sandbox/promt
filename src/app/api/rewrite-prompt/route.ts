import { NextResponse } from "next/server";
import { llmProvider } from "@/services/llm-provider";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    input?: string;
    mode?: "shorten" | "expand" | "professional" | "creative";
  };
  if (!body.input || !body.mode) {
    return NextResponse.json({ error: "Missing input or mode" }, { status: 400 });
  }
  const rewritten = await llmProvider.rewritePrompt(body.input, body.mode);
  return NextResponse.json({ rewritten });
}
