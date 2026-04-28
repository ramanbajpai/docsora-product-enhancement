import { DetectedIntent, IntentType } from "./types";
import { findFiles, findContacts } from "./mockLibrary";

const RULES: { type: IntentType; label: string; patterns: RegExp[] }[] = [
  { type: "sign", label: "Send for Signature", patterns: [/\bsign(ature)?\b/i, /\bcountersign\b/i, /\bget\s+signed\b/i] },
  { type: "send", label: "Secure Transfer", patterns: [/\bsend\b/i, /\bshare\b/i, /\btransfer\b/i, /\bsecure\s+link\b/i] },
  { type: "remind", label: "Send Reminder", patterns: [/\bremind\b/i, /\bnudge\b/i, /\bfollow\s+up\b/i, /\bchase\b/i] },
  { type: "summarize", label: "Summarize Document", patterns: [/\bsummari[sz]e\b/i, /\btl;?dr\b/i, /\bkey\s+points\b/i, /\bbrief\b/i] },
  { type: "track", label: "Track Status", patterns: [/\btrack\b/i, /\bstatus\b/i, /\bwhere\s+is\b/i, /\bblocking\b/i] },
  { type: "automate", label: "Create Automation", patterns: [/\bautomate\b/i, /\bevery\s+time\b/i, /\bwhen(ever)?\b.*\bthen\b/i, /\brule\b/i] },
];

export function detectIntent(input: string): DetectedIntent | null {
  const text = input.trim();
  if (text.length < 2) return null;

  const files = findFiles(text);
  const contacts = findContacts(text);

  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      return {
        type: rule.type,
        label: rule.label,
        confidence: 0.88,
        fileHint: files[0]?.name,
        recipientHint: contacts[0]?.name,
      };
    }
  }

  if (files.length || contacts.length) {
    return {
      type: "search",
      label: "Locate Documents",
      confidence: 0.7,
      fileHint: files[0]?.name,
      recipientHint: contacts[0]?.name,
    };
  }
  return null;
}
