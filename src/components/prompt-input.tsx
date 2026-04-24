"use client";

import { Loader2, Sparkles } from "lucide-react";
import { demoInputs } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function PromptInput({ value, onChange, onSubmit, isLoading }: PromptInputProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Speak or type what you want done..."
        className="min-h-28 border-white/10 bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-500"
      />
      <Button onClick={onSubmit} disabled={!value.trim() || isLoading} className="w-full">
        {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
        Generate Prompt
      </Button>
      <div className="flex flex-wrap gap-2">
        {demoInputs.map((input) => (
          <button
            key={input}
            type="button"
            onClick={() => onChange(input)}
            className="rounded-full border border-white/15 px-2 py-1 text-xs text-zinc-300 hover:border-white/35"
          >
            {input}
          </button>
        ))}
      </div>
    </div>
  );
}
