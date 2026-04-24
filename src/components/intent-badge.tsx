import { Badge } from "@/components/ui/badge";
import { IntentType } from "@/types/prompt";

const labels: Record<IntentType, string> = {
  "content-writing": "Content Writing",
  coding: "Coding",
  research: "Research",
  summarization: "Summarization",
  "prompt-enhancement": "Prompt Enhancement",
  scheduling: "Scheduling",
  "email-messaging": "Email/Messaging",
  "startup-business": "Startup/Business",
  "social-media": "Social Media",
  "general-assistant": "General Task",
};

export function IntentBadge({ intent }: { intent: IntentType }) {
  return (
    <Badge className="bg-indigo-500/20 text-indigo-100 border border-indigo-300/30">
      {labels[intent]}
    </Badge>
  );
}
