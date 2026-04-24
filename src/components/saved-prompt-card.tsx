import { Copy } from "lucide-react";
import { PromptResult } from "@/types/prompt";
import { Button } from "@/components/ui/button";

export function SavedPromptCard({
  item,
  onCopy,
}: {
  item: PromptResult;
  onCopy: (text: string) => void;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-4">
      <h3 className="line-clamp-1 text-sm font-medium text-zinc-100">{item.rawCommand}</h3>
      <p className="mt-2 line-clamp-3 text-xs text-zinc-300">{item.finalPrompt}</p>
      <div className="mt-3">
        <Button size="sm" variant="secondary" onClick={() => onCopy(item.finalPrompt)}>
          <Copy className="size-4" />
          Copy
        </Button>
      </div>
    </article>
  );
}
