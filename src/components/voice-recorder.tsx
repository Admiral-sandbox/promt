"use client";

import { Mic, MicOff, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceRecorderProps {
  isSupported: boolean;
  isListening: boolean;
  error: string | null;
  onStart: () => void;
  onStop: () => void;
}

export function VoiceRecorder({
  isSupported,
  isListening,
  error,
  onStart,
  onStop,
}: VoiceRecorderProps) {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={isListening ? onStop : onStart}
        disabled={!isSupported}
        className="w-full bg-indigo-500/80 text-white hover:bg-indigo-400"
      >
        {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
        {isListening ? "Stop Listening" : "Start Voice Input"}
      </Button>
      {!isSupported && (
        <p className="text-xs text-amber-300">Voice input unsupported. Continue with text mode.</p>
      )}
      {error && (
        <p className="inline-flex items-center gap-1 text-xs text-rose-300">
          <TriangleAlert className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
}
