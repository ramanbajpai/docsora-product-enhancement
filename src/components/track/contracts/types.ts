export type ContractHealth = "green" | "amber" | "red";
export type ContractRiskLevel = "low" | "medium" | "high";
export type ObligationStatus = "pending" | "in_progress" | "completed" | "overdue";

export interface Obligation {
  id: string;
  title: string;
  owner: string;
  dueDate: Date;
  status: ObligationStatus;
  description?: string;
}

export interface ContractVersion {
  id: string;
  version: string;
  date: Date;
  author: string;
  summary: string;
  current?: boolean;
}

export interface ActivityEvent {
  id: string;
  type: "uploaded" | "signed" | "viewed" | "renewed" | "edited" | "reminder" | "comment" | "ai";
  actor: string;
  date: Date;
  description: string;
}

export interface RiskFlag {
  id: string;
  level: ContractRiskLevel;
  title: string;
  detail: string;
}

export interface ContractIntelligence {
  health: ContractHealth;
  summary: string;
  noticePeriodDays: number;
  noticeDeadline: Date;
  risks: RiskFlag[];
  obligations: Obligation[];
  versions: ContractVersion[];
  activity: ActivityEvent[];
  owner?: string;
  valueNumeric?: number; // annual contract value in USD
  paymentTerms?: string;
  governingLaw?: string;
  linkedContractIds?: string[];
}
