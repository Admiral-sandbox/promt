"use client";

import { useState } from "react";
import { Copy, Download, Star } from "lucide-react";
import { PromptResult } from "@/types/prompt";
import { IntentBadge } from "@/components/intent-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptOutputTabsProps {
  prompt: PromptResult;
  onCopy: (text: string) => Promise<void>;
  onSave: () => void;
  onImprove: () => void;
}

export function PromptOutputTabs({ prompt, onCopy, onSave, onImprove }: PromptOutputTabsProps) {
  const [tab, setTab] = useState("standard");
  const selected =
    tab === "advanced"
      ? prompt.variants.advanced
      : tab === "expert"
        ? prompt.variants.expert
        : tab === "copy-ready"
          ? prompt.variants.copyReady
          : prompt.variants.standard;

  return (
    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="flex items-center justify-between">
        <IntentBadge intent={prompt.interpretedIntent} />
        <p className="text-xs text-zinc-400">Word count: {prompt.wordCount}</p>
      </div>
      <p className="text-xs text-zinc-400">Raw command: {prompt.rawCommand}</p>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-4 bg-zinc-950/50">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="expert">Expert</TabsTrigger>
          <TabsTrigger value="copy-ready">Copy-ready</TabsTrigger>
        </TabsList>
        <TabsContent value={tab} className="mt-2">
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-zinc-950/60 p-3 text-sm text-zinc-100">
            {selected}
          </pre>
        </TabsContent>
      </Tabs>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => onCopy(selected)}>
          <Copy className="size-4" />
          Copy
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onCopy(prompt.finalPrompt)}>
          Copy final prompt
        </Button>
        <Button size="sm" variant="secondary" onClick={() => onCopy(Object.values(prompt.variants).join("\n\n"))}>
          Copy all
        </Button>
        <Button size="sm" variant="secondary" onClick={onSave}>
          <Star className="size-4" />
          Save
        </Button>
        <Button size="sm" variant="secondary" onClick={onImprove}>
          Improve further
        </Button>
        <Button size="sm" variant="secondary" onClick={() => exportText(prompt)}>
          <Download className="size-4" />
          Export .txt
        </Button>
        <Button size="sm" variant="secondary" onClick={() => exportMarkdown(prompt)}>
          <Download className="size-4" />
          Export .md
        </Button>
      </div>
    </div>
  );
}

function exportText(prompt: PromptResult) {
  const content = `Raw command: ${prompt.rawCommand}\nIntent: ${prompt.interpretedIntent}\n\nFinal Prompt:\n${prompt.finalPrompt}`;
  downloadBlob(`${prompt.id}.txt`, content, "text/plain");
}

function exportMarkdown(prompt: PromptResult) {
  const content = `# Prompt Export\n\n- Raw command: ${prompt.rawCommand}\n- Intent: ${prompt.interpretedIntent}\n\n## Final Prompt\n\n${prompt.finalPrompt}`;
  downloadBlob(`${prompt.id}.md`, content, "text/markdown");
}

function downloadBlob(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
