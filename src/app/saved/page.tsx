"use client";

import { SavedPromptCard } from "@/components/saved-prompt-card";
import { usePromptStore } from "@/store/prompt-store";

export default function SavedPage() {
  const { saved } = usePromptStore();
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-zinc-100">
      <h1 className="mb-4 text-2xl font-semibold">Saved prompts</h1>
      {saved.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {saved.map((item) => (
            <SavedPromptCard
              key={item.id}
              item={item}
              onCopy={(text) => void navigator.clipboard.writeText(text)}
            />
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No saved prompts yet.</p>
      )}
    </main>
  );
}
