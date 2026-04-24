"use client";

import { PromptSettings } from "@/types/prompt";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SettingsFormProps {
  settings: PromptSettings;
  onUpdate: (patch: Partial<PromptSettings>) => void;
}

export function SettingsForm({ settings, onUpdate }: SettingsFormProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <Field label="Default prompt style">
        <Select value={settings.defaultStyle} onValueChange={(v) => onUpdate({ defaultStyle: v as PromptSettings["defaultStyle"] })}>
          <SelectTrigger className="w-full bg-zinc-900/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="concise">Concise</SelectItem>
            <SelectItem value="detailed">Detailed</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Voice language">
        <Input value={settings.voiceLanguage} onChange={(e) => onUpdate({ voiceLanguage: e.target.value })} />
      </Field>
      <Field label="Target AI mode">
        <Select value={settings.targetMode} onValueChange={(v) => onUpdate({ targetMode: v as PromptSettings["targetMode"] })}>
          <SelectTrigger className="w-full bg-zinc-900/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="chatgpt">ChatGPT</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
            <SelectItem value="cursor">Cursor</SelectItem>
            <SelectItem value="generic">Generic AI</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="OpenAI-compatible API key">
        <Input
          type="password"
          value={settings.apiKey}
          onChange={(e) => onUpdate({ apiKey: e.target.value })}
          placeholder="sk-..."
        />
      </Field>
      <Button variant="secondary" className="w-full">Saved automatically</Button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs text-zinc-400">{label}</span>
      {children}
    </label>
  );
}
