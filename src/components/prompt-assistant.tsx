"use client";

import { useMemo, useState } from "react";
import { AssistantHeader } from "@/components/assistant-header";
import { DockedSidebar } from "@/components/docked-sidebar";
import { PromptInput } from "@/components/prompt-input";
import { PromptOutputTabs } from "@/components/prompt-output-tabs";
import { SmartActionButtons } from "@/components/smart-action-buttons";
import { VoiceRecorder } from "@/components/voice-recorder";
import { useVoiceRecorder } from "@/hooks/use-voice-recorder";
import { mockPromptResult } from "@/lib/mock-data";
import { usePromptStore } from "@/store/prompt-store";

export function PromptAssistant() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { settings, currentPrompt, setCurrentPrompt, addToHistory, toggleSaved } = usePromptStore();
  const voice = useVoiceRecorder(settings.voiceLanguage);
  const activePrompt = currentPrompt ?? mockPromptResult;

  const mergedInput = useMemo(() => (voice.transcript ? voice.transcript : input), [input, voice.transcript]);

  const onGenerate = async () => {
    if (!mergedInput.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: mergedInput, settings }),
      });
      const data = await res.json();
      setCurrentPrompt(data.result);
      addToHistory(data.result);
    } finally {
      setIsLoading(false);
    }
  };

  const onCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const onRewrite = async (mode: "shorten" | "expand" | "professional" | "creative") => {
    const res = await fetch("/api/rewrite-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: activePrompt.finalPrompt, mode }),
    });
    const data = await res.json();
    setCurrentPrompt({
      ...activePrompt,
      finalPrompt: data.rewritten,
      variants: { ...activePrompt.variants, standard: data.rewritten },
    });
  };

  return (
    <DockedSidebar>
      <div className="flex h-full flex-col gap-3 overflow-auto pr-1">
        <AssistantHeader isListening={voice.isListening} />
        <VoiceRecorder
          isSupported={voice.isSupported}
          isListening={voice.isListening}
          error={voice.error}
          onStart={voice.startListening}
          onStop={voice.stopListening}
        />
        <PromptInput
          value={mergedInput}
          onChange={(value) => {
            setInput(value);
            voice.setTranscript("");
          }}
          onSubmit={onGenerate}
          isLoading={isLoading}
        />
        <PromptOutputTabs
          prompt={activePrompt}
          onCopy={onCopy}
          onSave={() => toggleSaved(activePrompt)}
          onImprove={() => onRewrite("expand")}
        />
        <SmartActionButtons prompt={activePrompt} onRewrite={onRewrite} />
      </div>
    </DockedSidebar>
  );
}
