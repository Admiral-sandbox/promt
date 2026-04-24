"use client";

import { SettingsForm } from "@/components/settings-form";
import { usePromptStore } from "@/store/prompt-store";

export default function SettingsPage() {
  const { settings, updateSettings } = usePromptStore();

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-zinc-100">
      <h1 className="mb-4 text-2xl font-semibold">Settings</h1>
      <SettingsForm settings={settings} onUpdate={updateSettings} />
    </main>
  );
}
