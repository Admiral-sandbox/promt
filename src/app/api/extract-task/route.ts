import { NextResponse } from "next/server";
import { llmProvider } from "@/services/llm-provider";

export async function POST(request: Request) {
  const body = (await request.json()) as { input?: string };
  if (!body.input) {
    return NextResponse.json({ error: "Missing input" }, { status: 400 });
  }
  const task = await llmProvider.extractTask(body.input);
  return NextResponse.json({ task });
}
