"use client";

import Link from "next/link";
import { Mic, MicOff, Settings2 } from "lucide-react";

interface AssistantHeaderProps {
  isListening: boolean;
}

export function AssistantHeader({ isListening }: AssistantHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-400">Prompt</p>
        <h1 className="text-lg font-semibold text-white">PromptPilot</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full border border-white/20 px-2 py-1 text-xs text-zinc-300">
          {isListening ? (
            <span className="inline-flex items-center gap-1 text-emerald-300">
              <Mic className="size-3" /> Listening
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <MicOff className="size-3" /> Mic idle
            </span>
          )}
        </div>
        <Link
          href="/settings"
          aria-label="Settings"
          className="inline-flex size-8 items-center justify-center rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white"
        >
          <Settings2 className="size-4" />
        </Link>
      </div>
    </div>
  );
}
