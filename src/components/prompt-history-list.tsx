import { PromptResult } from "@/types/prompt";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface PromptHistoryListProps {
  items: PromptResult[];
  onSelect?: (item: PromptResult) => void;
}

export function PromptHistoryList({ items, onSelect }: PromptHistoryListProps) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
        No prompts yet.
      </div>
    );
  }

  return (
    <ScrollArea className="h-[70vh] rounded-xl border border-white/10 bg-white/5 p-2">
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            className="w-full rounded-xl border border-white/10 bg-zinc-950/50 p-3 text-left hover:border-white/30"
            onClick={() => onSelect?.(item)}
            type="button"
          >
            <p className="line-clamp-1 text-sm text-zinc-100">{item.rawCommand}</p>
            <p className="mt-1 text-xs text-zinc-400">{new Date(item.createdAt).toLocaleString()}</p>
            <div className="mt-2">
              <Button size="sm" variant="outline" className="h-7" type="button">
                Reuse
              </Button>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
