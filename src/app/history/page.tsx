"use client";

import { PromptHistoryList } from "@/components/prompt-history-list";
import { usePromptStore } from "@/store/prompt-store";

export default function HistoryPage() {
  const { history, setCurrentPrompt } = usePromptStore();
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-zinc-100">
      <h1 className="mb-4 text-2xl font-semibold">Prompt history</h1>
      <PromptHistoryList items={history} onSelect={setCurrentPrompt} />
    </main>
  );
}
