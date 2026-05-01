export type TemplateRole = {
  key: string;
  label: string;
  description: string;
  required: boolean;
};

export type TemplateField = {
  key: string;
  label: string;
  placeholder?: string;
  type: "text" | "email" | "number" | "date";
  required: boolean;
  example?: string;
};

export type TemplateDocument = {
  id: string;
  name: string;
  type: "contract" | "brief" | "invoice" | "nda" | "proposal" | "delivery" | "feedback";
  signatureFields: string[]; // role keys that must sign
  description: string;
};

export type TemplateFlowStep = {
  id: string;
  label: string;
  type: "contract" | "delivery" | "feedback" | "approval" | "payment" | "kickoff";
  owner: string; // role key
  description: string;
};

export type WorkflowTemplate = {
  id: string;
  name: string;
  category: "Client Project" | "Sales" | "Legal" | "Operations" | "HR";
  icon: string; // emoji for fast visual recognition
  description: string;
  tagline: string;
  estimatedTime: string; // "Setup in <10s"
  popular?: boolean;
  roles: TemplateRole[];
  fields: TemplateField[];
  documents: TemplateDocument[];
  flow: TemplateFlowStep[];
};

export const templates: WorkflowTemplate[] = [
  {
    id: "client-project-standard",
    name: "Client Project",
    category: "Client Project",
    icon: "🚀",
    description: "Contract → Kickoff → Delivery → Feedback → Approval",
    tagline: "The full client journey, ready in seconds.",
    estimatedTime: "Setup in 8s",
    popular: true,
    roles: [
      { key: "sender", label: "You", description: "Project owner", required: true },
      { key: "client", label: "Client", description: "Receives & signs documents", required: true },
      { key: "approver", label: "Approver", description: "Final sign-off (optional)", required: false },
    ],
    fields: [
      { key: "clientName", label: "Client name", placeholder: "Acme Inc.", type: "text", required: true, example: "Acme Inc." },
      { key: "clientEmail", label: "Client email", placeholder: "billing@acme.com", type: "email", required: true },
      { key: "projectValue", label: "Project value (€)", placeholder: "12000", type: "number", required: false },
    ],
    documents: [
      { id: "d1", name: "Service Agreement", type: "contract", signatureFields: ["sender", "client"], description: "Master contract with scope & terms" },
      { id: "d2", name: "Project Brief", type: "brief", signatureFields: ["client"], description: "Confirms scope & deliverables" },
      { id: "d3", name: "Final Delivery", type: "delivery", signatureFields: ["client"], description: "Signed handoff of work" },
    ],
    flow: [
      { id: "s1", label: "Send Contract", type: "contract", owner: "sender", description: "Service agreement out for signature" },
      { id: "s2", label: "Kickoff", type: "kickoff", owner: "sender", description: "Brief shared with client" },
      { id: "s3", label: "Deliver Work", type: "delivery", owner: "sender", description: "Upload final deliverables" },
      { id: "s4", label: "Collect Feedback", type: "feedback", owner: "client", description: "Client review window" },
      { id: "s5", label: "Final Approval", type: "approval", owner: "client", description: "Signed approval to close" },
    ],
  },
  {
    id: "freelance-quick",
    name: "Freelance Engagement",
    category: "Client Project",
    icon: "✍️",
    description: "Quote → Contract → Delivery",
    tagline: "Lightweight flow for solo work.",
    estimatedTime: "Setup in 6s",
    popular: true,
    roles: [
      { key: "sender", label: "You", description: "Freelancer", required: true },
      { key: "client", label: "Client", description: "Pays & approves", required: true },
    ],
    fields: [
      { key: "clientName", label: "Client name", placeholder: "Jane Doe", type: "text", required: true },
      { key: "clientEmail", label: "Client email", placeholder: "jane@company.com", type: "email", required: true },
      { key: "projectValue", label: "Quote (€)", placeholder: "2500", type: "number", required: true },
    ],
    documents: [
      { id: "d1", name: "Quote", type: "proposal", signatureFields: ["client"], description: "Approved quote" },
      { id: "d2", name: "Freelance Agreement", type: "contract", signatureFields: ["sender", "client"], description: "Short-form contract" },
      { id: "d3", name: "Delivery Note", type: "delivery", signatureFields: ["client"], description: "Confirms handoff" },
    ],
    flow: [
      { id: "s1", label: "Send Quote", type: "contract", owner: "sender", description: "Quote awaiting approval" },
      { id: "s2", label: "Sign Agreement", type: "contract", owner: "client", description: "Both parties sign" },
      { id: "s3", label: "Deliver", type: "delivery", owner: "sender", description: "Final files sent" },
    ],
  },
  {
    id: "nda-fast",
    name: "NDA Send",
    category: "Legal",
    icon: "🔒",
    description: "Single-doc NDA out for signature",
    tagline: "One document. One signer. Done.",
    estimatedTime: "Setup in 4s",
    roles: [
      { key: "sender", label: "You", description: "Sender", required: true },
      { key: "client", label: "Recipient", description: "Signs the NDA", required: true },
    ],
    fields: [
      { key: "clientName", label: "Recipient name", placeholder: "John Smith", type: "text", required: true },
      { key: "clientEmail", label: "Recipient email", placeholder: "john@company.com", type: "email", required: true },
    ],
    documents: [
      { id: "d1", name: "Mutual NDA", type: "nda", signatureFields: ["sender", "client"], description: "Standard mutual NDA" },
    ],
    flow: [
      { id: "s1", label: "Send NDA", type: "contract", owner: "sender", description: "Awaiting signature" },
      { id: "s2", label: "Countersign", type: "approval", owner: "sender", description: "Final countersignature" },
    ],
  },
  {
    id: "sales-proposal",
    name: "Sales Proposal",
    category: "Sales",
    icon: "📈",
    description: "Proposal → Contract → Invoice",
    tagline: "Close deals without back-and-forth.",
    estimatedTime: "Setup in 9s",
    roles: [
      { key: "sender", label: "You", description: "Account exec", required: true },
      { key: "client", label: "Buyer", description: "Decision maker", required: true },
      { key: "approver", label: "Procurement", description: "Optional approver", required: false },
    ],
    fields: [
      { key: "clientName", label: "Company", placeholder: "Acme Inc.", type: "text", required: true },
      { key: "clientEmail", label: "Buyer email", placeholder: "buyer@acme.com", type: "email", required: true },
      { key: "projectValue", label: "Deal size (€)", placeholder: "50000", type: "number", required: true },
    ],
    documents: [
      { id: "d1", name: "Proposal", type: "proposal", signatureFields: ["client"], description: "Pricing & scope" },
      { id: "d2", name: "MSA", type: "contract", signatureFields: ["sender", "client"], description: "Master service agreement" },
      { id: "d3", name: "Invoice", type: "invoice", signatureFields: [], description: "Auto-generated on signature" },
    ],
    flow: [
      { id: "s1", label: "Send Proposal", type: "contract", owner: "sender", description: "Proposal awaiting acceptance" },
      { id: "s2", label: "Sign MSA", type: "contract", owner: "client", description: "Contract signature" },
      { id: "s3", label: "Issue Invoice", type: "payment", owner: "sender", description: "Payment requested" },
    ],
  },
  {
    id: "onboarding-hr",
    name: "New Hire Onboarding",
    category: "HR",
    icon: "👋",
    description: "Offer → Contract → Policy ack.",
    tagline: "Get a new teammate signed in minutes.",
    estimatedTime: "Setup in 8s",
    roles: [
      { key: "sender", label: "HR", description: "You", required: true },
      { key: "client", label: "New hire", description: "Receives offer", required: true },
      { key: "approver", label: "Hiring manager", description: "Counter-signs", required: true },
    ],
    fields: [
      { key: "clientName", label: "Candidate name", placeholder: "Sam Lee", type: "text", required: true },
      { key: "clientEmail", label: "Candidate email", placeholder: "sam@personal.com", type: "email", required: true },
      { key: "startDate", label: "Start date", type: "date", required: true },
    ],
    documents: [
      { id: "d1", name: "Offer Letter", type: "contract", signatureFields: ["client", "approver"], description: "Signed offer" },
      { id: "d2", name: "Employment Agreement", type: "contract", signatureFields: ["client", "approver"], description: "Full contract" },
      { id: "d3", name: "Policy Acknowledgment", type: "feedback", signatureFields: ["client"], description: "Code of conduct" },
    ],
    flow: [
      { id: "s1", label: "Send Offer", type: "contract", owner: "sender", description: "Offer letter dispatched" },
      { id: "s2", label: "Sign Contract", type: "contract", owner: "client", description: "Employment agreement" },
      { id: "s3", label: "Acknowledge Policies", type: "approval", owner: "client", description: "Final step" },
    ],
  },
];

export const getTemplateById = (id: string) =>
  templates.find((t) => t.id === id);