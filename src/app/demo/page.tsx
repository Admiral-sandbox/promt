import { demoInputs } from "@/lib/mock-data";

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-zinc-100">
      <h1 className="mb-4 text-2xl font-semibold">Demo showcase</h1>
      <p className="mb-3 text-zinc-400">Try these sample commands in the main panel:</p>
      <ul className="space-y-2">
        {demoInputs.map((item) => (
          <li key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
