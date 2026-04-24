"use client";

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { ChevronsRight, PanelRightClose } from "lucide-react";
import { usePromptStore } from "@/store/prompt-store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GlassPanel } from "@/components/glass-panel";
import { MiniCollapsedLauncher } from "@/components/mini-collapsed-launcher";
import { useSidebarShortcut } from "@/hooks/use-sidebar-shortcut";

export function DockedSidebar({ children }: PropsWithChildren) {
  const { isCollapsed, setCollapsed, sidebarWidth, setSidebarWidth, toggleCollapsed } =
    usePromptStore();
  useSidebarShortcut(toggleCollapsed);

  if (isCollapsed) {
    return <MiniCollapsedLauncher onOpen={() => setCollapsed(false)} />;
  }

  return (
    <motion.aside
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed right-0 top-0 z-50 h-screen p-2"
      style={{ width: `${sidebarWidth}vw`, minWidth: 420, maxWidth: 620 }}
    >
      <GlassPanel className="flex h-full flex-col rounded-l-3xl rounded-r-none p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCollapsed(true)}
            className="bg-white/10 text-white hover:bg-white/20"
          >
            <PanelRightClose className="size-4" />
            Hide
          </Button>
          <div className="flex w-44 items-center gap-2">
            <ChevronsRight className="size-4 text-zinc-400" />
            <Slider
              value={[sidebarWidth]}
              min={30}
              max={40}
              step={1}
              onValueChange={(v) => {
                const width = Array.isArray(v) ? v[0] : v;
                setSidebarWidth(width ?? 35);
              }}
            />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </GlassPanel>
    </motion.aside>
  );
}
