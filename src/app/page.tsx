import Link from "next/link";
import { PromptAssistant } from "@/components/prompt-assistant";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,#312e81,transparent_30%),radial-gradient(circle_at_80%_80%,#0f172a,transparent_35%),#030712] text-zinc-100">
      <main className="p-8 pr-[38vw]">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-indigo-300/80">Overlay assistant</p>
        <h2 className="max-w-2xl text-4xl font-semibold leading-tight">Prompt engineering for voice and text commands</h2>
        <p className="mt-4 max-w-2xl text-zinc-300">
          PromptPilot stays docked to your right. Use <code>Ctrl+Shift+P</code> to show/hide.
        </p>
        <div className="mt-6 flex gap-3 text-sm">
          <Link href="/history" className="rounded-full border border-white/15 px-4 py-2 hover:border-white/40">History</Link>
          <Link href="/saved" className="rounded-full border border-white/15 px-4 py-2 hover:border-white/40">Saved</Link>
          <Link href="/settings" className="rounded-full border border-white/15 px-4 py-2 hover:border-white/40">Settings</Link>
          <Link href="/demo" className="rounded-full border border-white/15 px-4 py-2 hover:border-white/40">Demo</Link>
        </div>
      </main>
      <PromptAssistant />
    </div>
  );
}
