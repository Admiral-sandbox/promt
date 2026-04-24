"use client";

import { PromptResult } from "@/types/prompt";
import { Button } from "@/components/ui/button";

interface SmartActionButtonsProps {
  prompt: PromptResult;
  onRewrite: (mode: "shorten" | "expand" | "professional" | "creative") => void;
}

export function SmartActionButtons({ prompt, onRewrite }: SmartActionButtonsProps) {
  const isTask = prompt.interpretedIntent === "scheduling";
  const isWriting = ["content-writing", "email-messaging", "social-media"].includes(
    prompt.interpretedIntent,
  );
  const isCoding = prompt.interpretedIntent === "coding";

  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
      <p className="text-xs uppercase tracking-widest text-zinc-400">Smart actions</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => onRewrite("shorten")}>
          Shorten
        </Button>
        <Button size="sm" variant="outline" onClick={() => onRewrite("expand")}>
          Expand
        </Button>
        <Button size="sm" variant="outline" onClick={() => onRewrite("professional")}>
          Make professional
        </Button>
        <Button size="sm" variant="outline" onClick={() => onRewrite("creative")}>
          Make creative
        </Button>
        {isTask && <Button size="sm" variant="outline">Schedule task</Button>}
        {isTask && <Button size="sm" variant="outline">Create reminder</Button>}
        {isWriting && <Button size="sm" variant="outline">Audience adjust</Button>}
        {isCoding && <Button size="sm" variant="outline">Architecture prompt</Button>}
      </div>
      {prompt.taskExtraction && (
        <div className="rounded-xl border border-white/10 bg-zinc-950/50 p-2 text-xs text-zinc-300">
          <p>Task: {prompt.taskExtraction.title}</p>
          <p>Due date: {prompt.taskExtraction.dueDate ?? "Not detected"}</p>
          <p>Reminder: {prompt.taskExtraction.reminderTime ?? "Not detected"}</p>
        </div>
      )}
    </div>
  );
}
