"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MiniCollapsedLauncherProps {
  onOpen: () => void;
}

export function MiniCollapsedLauncher({ onOpen }: MiniCollapsedLauncherProps) {
  return (
    <motion.div
      initial={{ x: 60 }}
      animate={{ x: 0 }}
      className="fixed right-0 top-1/2 z-50 -translate-y-1/2"
    >
      <Button
        onClick={onOpen}
        className="rounded-l-2xl rounded-r-none border border-white/20 bg-zinc-900/75 px-4 py-5 text-white backdrop-blur-lg hover:bg-zinc-800/80"
      >
        <Sparkles className="size-4" />
        PromptPilot
      </Button>
    </motion.div>
  );
}
