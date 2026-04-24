"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PromptResult, PromptSettings } from "@/types/prompt";

type PromptStore = {
  isCollapsed: boolean;
  sidebarWidth: number;
  currentPrompt: PromptResult | null;
  history: PromptResult[];
  saved: PromptResult[];
  settings: PromptSettings;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  setSidebarWidth: (width: number) => void;
  setCurrentPrompt: (prompt: PromptResult | null) => void;
  addToHistory: (prompt: PromptResult) => void;
  toggleSaved: (prompt: PromptResult) => void;
  updateSettings: (patch: Partial<PromptSettings>) => void;
};

const initialSettings: PromptSettings = {
  defaultStyle: "detailed",
  voiceLanguage: "en-US",
  theme: "dark",
  apiKey: "",
  copyFormat: "plain",
  targetMode: "chatgpt",
};

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      isCollapsed: false,
      sidebarWidth: 35,
      currentPrompt: null,
      history: [],
      saved: [],
      settings: initialSettings,
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      toggleCollapsed: () => set({ isCollapsed: !get().isCollapsed }),
      setSidebarWidth: (width) => set({ sidebarWidth: Math.min(40, Math.max(30, width)) }),
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
      addToHistory: (prompt) =>
        set({
          history: [prompt, ...get().history.filter((item) => item.id !== prompt.id)].slice(0, 50),
        }),
      toggleSaved: (prompt) => {
        const exists = get().saved.some((item) => item.id === prompt.id);
        set({
          saved: exists
            ? get().saved.filter((item) => item.id !== prompt.id)
            : [prompt, ...get().saved],
        });
      },
      updateSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
    }),
    { name: "prompt-pilot-store-v1" },
  ),
);
