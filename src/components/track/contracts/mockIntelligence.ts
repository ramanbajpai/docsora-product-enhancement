import type { Contract } from "@/pages/Track";
import type { ContractIntelligence, ContractHealth } from "./types";
import { differenceInDays, addDays } from "date-fns";

const ANNUAL_VALUE_LOOKUP: Record<string, number> = {
  c1: 120000,
  c2: 45000,
  c3: 280000,
  c4: 216000,
  c5: 25000,
  c6: 102000,
};

function healthFor(contract: Contract): ContractHealth {
  const days = differenceInDays(contract.expiryDate, new Date());
  if (contract.status === "expired" || days < 0) return "red";
  if (days <= 45 || (contract.renewalType === "auto" && days <= 60)) return "amber";
  return "green";
}

export function buildIntelligenceFor(contract: Contract): ContractIntelligence {
  const days = differenceInDays(contract.expiryDate, new Date());
  const noticeDays = contract.renewalType === "auto" ? 60 : 30;
  const noticeDeadline = addDays(contract.expiryDate, -noticeDays);
  const health = healthFor(contract);

  const summary =
    contract.renewalType === "auto"
      ? `This is a ${contract.tags.join(" / ").toLowerCase() || "commercial"} agreement with ${contract.company}. It auto-renews unless cancelled ${noticeDays} days before expiry on ${contract.expiryDate.toLocaleDateString()}. ${days > 0 ? `You must act within ${Math.max(days - noticeDays, 0)} days.` : "Notice window has passed."}`
      : `${contract.name} with ${contract.company} runs until ${contract.expiryDate.toLocaleDateString()} and requires a manual renewal decision. ${days > 0 ? `${days} days remaining.` : "Expired — renewal needed."}`;

  return {
    health,
    summary,
    noticePeriodDays: noticeDays,
    noticeDeadline,
    owner: "You",
    valueNumeric: ANNUAL_VALUE_LOOKUP[contract.id],
    paymentTerms: "Net 30",
    governingLaw: "Delaware, USA",
    risks: [
      ...(contract.renewalType === "auto"
        ? [{ id: "r1", level: "high" as const, title: "Auto-renewal clause", detail: `Renews automatically unless cancelled ${noticeDays} days prior.` }]
        : []),
      ...(days <= 30 && days > 0
        ? [{ id: "r2", level: "high" as const, title: "Imminent expiry", detail: `Only ${days} days until expiry.` }]
        : []),
      { id: "r3", level: "medium" as const, title: "No price cap", detail: "Vendor may adjust pricing on renewal without ceiling." },
      { id: "r4", level: "low" as const, title: "Standard liability cap", detail: "Liability limited to fees paid in prior 12 months." },
    ],
    obligations: [
      { id: "o1", title: "Quarterly business review", owner: "You", dueDate: addDays(new Date(), 14), status: "pending" },
      { id: "o2", title: "Submit usage report", owner: "Finance", dueDate: addDays(new Date(), -3), status: "overdue" },
      { id: "o3", title: "Renewal decision", owner: "Legal", dueDate: noticeDeadline, status: days > noticeDays ? "pending" : "in_progress" },
    ],
    versions: [
      { id: "v3", version: "v3.0", date: contract.signedDate || contract.startDate, author: "Legal Team", summary: "Final signed version", current: true },
      { id: "v2", version: "v2.1", date: addDays(contract.startDate, -7), author: contract.company, summary: "Counterparty redlines accepted" },
      { id: "v1", version: "v1.0", date: addDays(contract.startDate, -21), author: "Legal Team", summary: "Initial draft" },
    ],
    activity: [
      { id: "a1", type: "ai", actor: "Docsora AI", date: new Date(), description: "Generated contract summary and risk flags" },
      { id: "a2", type: "reminder", actor: "System", date: addDays(new Date(), -2), description: `${noticeDays}-day notice reminder sent` },
      { id: "a3", type: "viewed", actor: contract.company, date: addDays(new Date(), -5), description: "Counterparty viewed contract" },
      { id: "a4", type: "signed", actor: contract.parties[0]?.name || "Counterparty", date: contract.signedDate || contract.startDate, description: "Contract signed by all parties" },
      { id: "a5", type: "uploaded", actor: "You", date: addDays(contract.startDate, -1), description: "Contract uploaded to Docsora" },
    ],
  };
}
