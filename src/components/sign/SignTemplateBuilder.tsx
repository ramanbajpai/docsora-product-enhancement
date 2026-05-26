import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  FileText,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  PenTool,
  Type,
  Calendar,
  User as UserIcon,
  CheckSquare,
  Move,
  Check,
  Sparkles,
  PenLine,
  ShieldCheck,
  Eye,
  AtSign,
  Braces,
  Layers,
  FileStack,
  GripVertical,
  Mail,
  Bell,
  Send,
  Clock,
  Hash,
  DollarSign,
  Phone,
  ChevronDown,
  Upload as UploadIcon,
} from "lucide-react";
import { Wand2, Settings2, Inbox, X } from "lucide-react";
import { Users, Briefcase, Scale, UserCheck, ShoppingCart, Building2, Banknote, Folder } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  SignTemplateField,
  SignFieldType,
  SignTemplate,
  SignTemplateRole,
  SignRoleType,
  SignRolePermission,
  SignTemplateVariable,
  SignVariableType,
  SignTemplateDocument,
  SignDocumentTag,
  SignTemplateDelivery,
  SignTemplateAutomation,
  SIGN_DOC_TAGS,
  applyTemplateVariables,
  detectTemplateVariables,
  useSignTemplates,
  getTemplateDocuments,
} from "@/hooks/useSignTemplates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const uid = () => Math.random().toString(36).slice(2, 9);

interface SignTemplateBuilderProps {
  onBack: () => void;
  onSaved: () => void;
  /** When provided, the builder opens in edit mode pre-populated with this template's data. */
  editingTemplate?: SignTemplate;
}

type StepKey = "upload" | "configure" | "rolesfields" | "review";

const STEPS: { key: StepKey; label: string; sub: string }[] = [
  { key: "upload", label: "Name & Upload", sub: "Start here" },
  { key: "configure", label: "Configure", sub: "Documents & delivery" },
  { key: "rolesfields", label: "People & Fields", sub: "Who does what" },
  { key: "review", label: "Customize", sub: "What changes each time" },
];

const ROLE_COLORS = ["#3b82f6", "#a78bfa", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
const MYSELF_KEY = "_myself";
const MYSELF_COLOR = "#0ea5e9";
const MAX_ROLES = 6;
const MAX_ROLE_NAME = 20;

const isMyself = (key: string) => key === MYSELF_KEY;

const nextRoleColor = (taken: string[]) => {
  const remaining = ROLE_COLORS.filter((c) => !taken.includes(c));
  return remaining[0] ?? ROLE_COLORS[taken.length % ROLE_COLORS.length];
};

const ROLE_TYPES: {
  value: SignRoleType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedFields: SignFieldType[] | "all";
  defaultPermissions: SignRolePermission[];
}[] = [
  {
    value: "signer",
    label: "Signer",
    description: "Signs and fills the document.",
    icon: PenLine,
    allowedFields: "all",
    defaultPermissions: ["sign", "edit_fields", "view"],
  },
  {
    value: "approver",
    label: "Approver",
    description: "Approves before it's finalized.",
    icon: ShieldCheck,
    allowedFields: ["signature", "initials", "date", "name"],
    defaultPermissions: ["approve", "view"],
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Read-only access. No fields.",
    icon: Eye,
    allowedFields: [],
    defaultPermissions: ["view"],
  },
  {
    value: "cc",
    label: "CC",
    description: "Receives a copy. No action needed.",
    icon: AtSign,
    allowedFields: [],
    defaultPermissions: ["view"],
  },
];

const PERMISSION_LABELS: { value: SignRolePermission; label: string }[] = [
  { value: "sign", label: "Can sign" },
  { value: "approve", label: "Can approve" },
  { value: "view", label: "Can view" },
  { value: "upload", label: "Can upload files" },
  { value: "edit_fields", label: "Can edit assigned fields" },
];

const getRoleTypeMeta = (t: SignRoleType = "signer") =>
  ROLE_TYPES.find((r) => r.value === t) ?? ROLE_TYPES[0];

const roleAllows = (t: SignRoleType | undefined, kind: SignFieldType) => {
  const meta = getRoleTypeMeta(t);
  return meta.allowedFields === "all" || meta.allowedFields.includes(kind);
};

const FIELD_TOOLS: {
  kind: SignFieldType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  w: number;
  h: number;
}[] = [
  { kind: "signature", label: "Signature", icon: PenTool, w: 22, h: 6 },
  { kind: "initials", label: "Initials", icon: Type, w: 10, h: 5 },
  { kind: "date", label: "Date", icon: Calendar, w: 14, h: 5 },
  { kind: "name", label: "Name", icon: UserIcon, w: 18, h: 5 },
  { kind: "text", label: "Text", icon: Type, w: 18, h: 5 },
  { kind: "checkbox", label: "Checkbox", icon: CheckSquare, w: 5, h: 5 },
];

const VARIABLE_TYPES: { value: SignVariableType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "text", label: "Text", icon: Type },
  { value: "currency", label: "Currency", icon: DollarSign },
  { value: "date", label: "Date", icon: Calendar },
  { value: "email", label: "Email", icon: AtSign },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "number", label: "Number", icon: Hash },
  { value: "company", label: "Company", icon: FileText },
  { value: "address", label: "Address", icon: FileText },
];

const variableTypeMeta = (t: SignVariableType) =>
  VARIABLE_TYPES.find((v) => v.value === t) ?? VARIABLE_TYPES[0];

const toToken = (label: string) => {
  const base = label.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return base || "FIELD";
};

const CATEGORIES = ["Client", "Legal", "HR", "Sales", "Other"];

type BuilderDoc = {
  id: string;
  file: File | null;
  name: string;
  tag?: SignDocumentTag;
  pageCount: number;
};

const tagFromFilename = (n: string): SignDocumentTag =>
  /nda/i.test(n) ? "nda"
  : /pric/i.test(n) ? "pricing"
  : /scope|sow/i.test(n) ? "scope"
  : /annex/i.test(n) ? "annexure"
  : /onboard/i.test(n) ? "onboarding"
  : "agreement";

const TAG_VARIABLE_SUGGESTIONS: Record<SignDocumentTag, { name: string; label: string; type: SignVariableType }[]> = {
  agreement: [
    { name: "CLIENT_NAME", label: "Client name", type: "text" },
    { name: "COMPANY_NAME", label: "Company name", type: "company" },
    { name: "START_DATE", label: "Start date", type: "date" },
    { name: "DEAL_VALUE", label: "Deal value", type: "currency" },
  ],
  nda: [
    { name: "DISCLOSING_PARTY", label: "Disclosing party", type: "company" },
    { name: "RECEIVING_PARTY", label: "Receiving party", type: "company" },
    { name: "EFFECTIVE_DATE", label: "Effective date", type: "date" },
  ],
  pricing: [
    { name: "TOTAL_AMOUNT", label: "Total amount", type: "currency" },
    { name: "VALID_UNTIL", label: "Valid until", type: "date" },
  ],
  scope: [
    { name: "PROJECT_NAME", label: "Project name", type: "text" },
    { name: "START_DATE", label: "Start date", type: "date" },
    { name: "END_DATE", label: "End date", type: "date" },
  ],
  annexure: [
    { name: "REFERENCE_NUMBER", label: "Reference number", type: "text" },
  ],
  onboarding: [
    { name: "EMPLOYEE_NAME", label: "Employee name", type: "text" },
    { name: "EMPLOYEE_EMAIL", label: "Employee email", type: "email" },
    { name: "DEPARTMENT", label: "Department", type: "text" },
    { name: "START_DATE", label: "Start date", type: "date" },
    { name: "SALARY", label: "Salary", type: "currency" },
  ],
  other: [],
};

/* ──────────────────────────────────────────────────────────
 * Synthetic document bodies for the visual customize step.
 * Tokens in {{TOKEN}} get rendered as clickable highlights.
 * ────────────────────────────────────────────────────────── */
const DOC_BODY_BY_TAG: Record<SignDocumentTag, { title: string; paragraphs: string[] }> = {
  agreement: {
    title: "Service Agreement",
    paragraphs: [
      "This Agreement is entered into between Acme Studio and Northwind Co, effective as of January 1, 2026.",
      "The total contract value is $24,000.00, payable according to the schedule outlined below.",
      "Both parties acknowledge and agree to the terms set forth in this document by signing below.",
    ],
  },
  nda: {
    title: "Mutual Non-Disclosure Agreement",
    paragraphs: [
      "This Non-Disclosure Agreement is made between Acme Studio and Northwind Co, effective January 1, 2026.",
      "Each party agrees to keep all shared information strictly confidential for a period of three years.",
      "The parties confirm their understanding of these terms with their signatures below.",
    ],
  },
  pricing: {
    title: "Pricing Proposal",
    paragraphs: [
      "Prepared for review, the total proposed amount is $24,000.00, valid until March 31, 2026.",
      "This proposal includes the full scope of work as detailed in the attached schedule of services.",
      "Please sign below to accept the pricing and authorize the start of work.",
    ],
  },
  scope: {
    title: "Statement of Work",
    paragraphs: [
      "This Statement of Work covers Project Atlas, beginning January 1, 2026 and ending June 30, 2026.",
      "Deliverables, milestones and acceptance criteria are described in the sections that follow.",
      "Authorization to proceed is granted upon signature of both parties.",
    ],
  },
  annexure: {
    title: "Annexure",
    paragraphs: [
      "This annexure is filed under reference REF-2026-001 and forms part of the parent agreement.",
      "All terms remain governed by the parent agreement unless explicitly amended here.",
    ],
  },
  onboarding: {
    title: "Employee Onboarding Agreement",
    paragraphs: [
      "Welcome Alex Morgan. We are pleased to confirm your role in the Design team, starting January 1, 2026.",
      "Your annual salary will be $96,000.00, paid monthly. Communications will be sent to alex@company.com.",
      "Please sign below to confirm acceptance of the terms of your employment.",
    ],
  },
  other: {
    title: "Document",
    paragraphs: [
      "This document is shared with you for review and signature.",
      "Please review the contents carefully before adding your signature.",
    ],
  },
};

const HUMAN_TYPE_LABELS: Record<SignVariableType, string> = {
  text: "Text",
  currency: "Amount",
  date: "Date",
  email: "Email",
  phone: "Phone",
  number: "Number",
  company: "Company",
  address: "Address",
};

const humanTypeLabel = (t: SignVariableType) => HUMAN_TYPE_LABELS[t] ?? "Text";

const HUMAN_TYPES: { value: SignVariableType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "text", label: "Name or text", icon: Type },
  { value: "company", label: "Company", icon: FileText },
  { value: "date", label: "Date", icon: Calendar },
  { value: "currency", label: "Amount", icon: DollarSign },
  { value: "email", label: "Email", icon: AtSign },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "number", label: "Number", icon: Hash },
  { value: "address", label: "Address", icon: FileText },
];

const launchQuestionFor = (v: SignTemplateVariable): string => {
  const l = v.label;
  switch (v.type) {
    case "company": return `What's the company name?`;
    case "date": return `When does ${l.toLowerCase()}?`;
    case "currency": return `What is the ${l.toLowerCase()}?`;
    case "email": return `What's the email address?`;
    case "phone": return `What's the phone number?`;
    default: return `What is the ${l.toLowerCase()}?`;
  }
};

export default function SignTemplateBuilder({ onBack, onSaved, editingTemplate }: SignTemplateBuilderProps) {
  const { save, templates: existingTemplates } = useSignTemplates();
  const isEditing = !!editingTemplate;

  // Stable template id — keeps the same id across autosaves and edits.
  const templateIdRef = useRef<string>(editingTemplate?.id ?? `tpl-${uid()}`);
  const createdAtRef = useRef<number>(editingTemplate?.createdAt ?? Date.now());

  const initialDocuments: BuilderDoc[] = editingTemplate
    ? getTemplateDocuments(editingTemplate).map((d) => ({
        id: d.id,
        file: null,
        name: d.name,
        tag: d.tag,
        pageCount: d.pageCount,
      }))
    : [];

  const [step, setStep] = useState<StepKey>(isEditing ? "configure" : "upload");

  // Files & meta
  const [documents, setDocuments] = useState<BuilderDoc[]>(initialDocuments);
  const [activeDocId, setActiveDocId] = useState<string>(initialDocuments[0]?.id ?? "");
  const [name, setName] = useState(editingTemplate?.name ?? "");
  const [description, setDescription] = useState(editingTemplate?.description ?? "");
  const [category, setCategory] = useState<string>(editingTemplate?.category ?? "Client");
  const [packageTitle, setPackageTitle] = useState<string>(editingTemplate?.packageTitle ?? "");

  // Roles
  const [signingMode, setSigningMode] = useState<"sequential" | "parallel">(
    editingTemplate?.signingMode ?? "parallel",
  );
  const [signSelf, setSignSelf] = useState(false);
  const [roles, setRoles] = useState<SignTemplateRole[]>(editingTemplate?.roles ?? [
    {
      key: "client",
      label: "Client",
      color: ROLE_COLORS[0],
      signingOrder: 1,
      type: "signer",
      permissions: ["sign", "edit_fields", "view"],
    },
    {
      key: "sender",
      label: "You",
      color: ROLE_COLORS[1],
      signingOrder: 2,
      type: "signer",
      permissions: ["sign", "edit_fields", "view"],
    },
  ]);

  // Variables
  const [variables, setVariables] = useState<SignTemplateVariable[]>(editingTemplate?.variables ?? []);

  // Fields
  const [fields, setFields] = useState<SignTemplateField[]>(editingTemplate?.fields ?? []);
  const [page, setPage] = useState(1);
  const [activeRoleKey, setActiveRoleKey] = useState<string>(editingTemplate?.roles?.[0]?.key ?? "client");
  const [activeTool, setActiveTool] = useState(FIELD_TOOLS[0]);
  const pageRef = useRef<HTMLDivElement>(null);

  // Delivery & Automation
  const [delivery, setDelivery] = useState<SignTemplateDelivery>(editingTemplate?.delivery ?? {
    emailSubject: "Please sign: {{COMPANY_NAME}} agreement",
    emailMessage: "Hi {{CLIENT_NAME}},\n\nPlease review and sign the attached document at your convenience.\n\nThanks!",
    senderName: "",
    expiryDays: 14,
    ccEmails: [],
    redirectUrl: "",
    allowDownload: true,
  });
  const [automation, setAutomation] = useState<SignTemplateAutomation>(editingTemplate?.automation ?? {
    remindEveryDays: 3,
    expiryWarningDays: 2,
    escalateAfterDays: 7,
    notifyOnOpen: true,
    notifyOnComplete: true,
  });

  // Review
  const [filenamePattern, setFilenamePattern] = useState<string>(
    editingTemplate?.filenamePattern ?? "{{COMPANY_NAME}} - {{TEMPLATE_NAME}} - Signed.pdf",
  );
  const [previewMode, setPreviewMode] = useState<"sender" | "recipient" | "email" | "filename">("sender");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];
  const pageCount = activeDoc?.pageCount ?? 3;

  /* ─────────── documents ─────────── */
  const addDocuments = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      const next: BuilderDoc[] = files.map((f) => ({
        id: `doc-${uid()}`,
        file: f,
        name: f.name,
        tag: tagFromFilename(f.name),
        pageCount: Math.max(1, Math.min(8, Math.ceil(f.size / (60 * 1024)))) || 3,
      }));
      setDocuments((prev) => {
        const merged = [...prev, ...next];
        if (!activeDocId) setActiveDocId(merged[0].id);
        return merged;
      });
      if (!name) setName(files[0].name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
    },
    [activeDocId, name],
  );

  const updateDocument = (id: string, patch: Partial<BuilderDoc>) =>
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const removeDocument = (id: string) => {
    setDocuments((prev) => {
      const next = prev.filter((d) => d.id !== id);
      if (activeDocId === id && next.length > 0) setActiveDocId(next[0].id);
      return next;
    });
    setFields((fs) => fs.filter((f) => f.documentId !== id));
  };

  const moveDocument = (id: string, dir: -1 | 1) => {
    setDocuments((prev) => {
      const i = prev.findIndex((d) => d.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  /* ─────────── roles ─────────── */
  const addRole = () => {
    if (roles.length >= MAX_ROLES) return;
    const idx = roles.length;
    const key = `role-${uid()}`;
    const type: SignRoleType = "signer";
    setRoles((r) => [
      ...r,
      {
        key,
        label: `Signer ${idx + 1}`,
        color: nextRoleColor(r.map((x) => x.color)),
        signingOrder: idx + 1,
        type,
        permissions: getRoleTypeMeta(type).defaultPermissions,
      },
    ]);
  };
  const updateRole = (key: string, patch: Partial<SignTemplateRole>) => {
    if (isMyself(key)) {
      // Myself is locked except for color (cannot rename / change type / reorder)
      const allowed: Partial<SignTemplateRole> = {};
      if (patch.color) allowed.color = patch.color;
      if (Object.keys(allowed).length === 0) return;
      patch = allowed;
    }
    setRoles((rs) =>
      rs.map((r) => {
        if (r.key !== key) return r;
        const next = { ...r, ...patch };
        // If role type changed, reset permissions to that type's defaults
        if (patch.type && patch.type !== r.type) {
          next.permissions = getRoleTypeMeta(patch.type).defaultPermissions;
        }
        return next;
      }),
    );
  };
  const togglePermission = (key: string, perm: SignRolePermission) => {
    if (isMyself(key)) return;
    setRoles((rs) =>
      rs.map((r) => {
        if (r.key !== key) return r;
        const cur = new Set(r.permissions ?? []);
        if (cur.has(perm)) cur.delete(perm);
        else cur.add(perm);
        return { ...r, permissions: Array.from(cur) };
      }),
    );
  };
  const removeRole = (key: string) => {
    if (isMyself(key)) return;
    if (roles.length <= 1) {
      toast.error("At least one role is required to proceed.");
      return;
    }
    const hasFields = fields.some((f) => f.roleKey === key);
    if (hasFields) {
      const ok = window.confirm(
        "Deleting this role will also remove all fields assigned to it. This cannot be undone. Continue?",
      );
      if (!ok) return;
    }
    setRoles((rs) => rs.filter((r) => r.key !== key));
    setFields((fs) => fs.filter((f) => f.roleKey !== key));
    if (activeRoleKey === key) setActiveRoleKey(roles.find((r) => r.key !== key)!.key);
  };
  const moveRole = (key: string, dir: -1 | 1) => {
    if (isMyself(key)) return;
    setRoles((rs) => {
      const i = rs.findIndex((r) => r.key === key);
      const j = i + dir;
      // Cannot swap into the Myself slot (index 0 when present)
      if (i < 0 || j < 0 || j >= rs.length) return rs;
      if (isMyself(rs[j].key)) return rs;
      const next = rs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next.map((r, idx) => ({ ...r, signingOrder: idx + 1 }));
    });
  };

  const toggleSignSelf = (on: boolean) => {
    if (on) {
      if (roles.some((r) => isMyself(r.key))) return;
      const myself: SignTemplateRole = {
        key: MYSELF_KEY,
        label: "Myself",
        color: MYSELF_COLOR,
        signingOrder: 1,
        type: "signer",
        permissions: getRoleTypeMeta("signer").defaultPermissions,
      };
      setRoles((rs) => [myself, ...rs.filter((r) => !isMyself(r.key))].map((r, i) => ({ ...r, signingOrder: i + 1 })));
      setSignSelf(true);
    } else {
      const hasFields = fields.some((f) => f.roleKey === MYSELF_KEY);
      if (hasFields) {
        const ok = window.confirm(
          "Turning this off will remove all fields you've placed for yourself. Continue?",
        );
        if (!ok) return;
      }
      setRoles((rs) => rs.filter((r) => !isMyself(r.key)).map((r, i) => ({ ...r, signingOrder: i + 1 })));
      setFields((fs) => fs.filter((f) => f.roleKey !== MYSELF_KEY));
      if (activeRoleKey === MYSELF_KEY) {
        const fallback = roles.find((r) => !isMyself(r.key));
        if (fallback) setActiveRoleKey(fallback.key);
      }
      setSignSelf(false);
    }
  };

  /* ─────────── variables ─────────── */
  const addVariable = () => {
    const baseLabel = "New variable";
    let token = toToken(baseLabel);
    const taken = new Set(variables.map((v) => v.name));
    let n = 1;
    while (taken.has(token)) {
      n += 1;
      token = `${toToken(baseLabel)}_${n}`;
    }
    setVariables((prev) => [
      ...prev,
      {
        name: token,
        label: baseLabel,
        type: "text",
        required: false,
        pattern: `{{${token}}}`,
        defaultValue: "",
      },
    ]);
  };
  const updateVariable = (name: string, patch: Partial<SignTemplateVariable>) =>
    setVariables((prev) => {
      return prev.map((v) => {
        if (v.name !== name) return v;
        let next = { ...v, ...patch };
        // If label changes, regenerate token to keep them aligned
        if (patch.label !== undefined && patch.label !== v.label) {
          const taken = new Set(prev.filter((x) => x.name !== name).map((x) => x.name));
          let token = toToken(patch.label);
          let n = 1;
          while (taken.has(token)) {
            n += 1;
            token = `${toToken(patch.label)}_${n}`;
          }
          next.name = token;
          next.pattern = `{{${token}}}`;
        }
        return next;
      });
    });
  const removeVariable = (name: string) =>
    setVariables((prev) => prev.filter((v) => v.name !== name));

  const addVariableWith = (
    label: string,
    type: SignVariableType = "text",
    required = true,
  ): string => {
    let token = toToken(label);
    const taken = new Set(variables.map((v) => v.name));
    let n = 1;
    while (taken.has(token)) {
      n += 1;
      token = `${toToken(label)}_${n}`;
    }
    setVariables((prev) => {
      if (prev.some((v) => v.name === token)) return prev;
      return [
        ...prev,
        {
          name: token,
          label,
          type,
          required,
          pattern: `{{${token}}}`,
          defaultValue: "",
        },
      ];
    });
    return token;
  };

  // No auto-detection. Users manually mark editable fields in the document.

  /* ─────────── fields ─────────── */
  const placeField = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = pageRef.current;
    if (!target || !activeDoc) return;
    const activeRole = roles.find((r) => r.key === activeRoleKey);
    if (!activeRole) return;
    if (!roleAllows(activeRole.type, activeTool.kind)) {
      toast.error(
        `${getRoleTypeMeta(activeRole.type).label}s can't have ${activeTool.label.toLowerCase()} fields.`,
      );
      return;
    }
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const f: SignTemplateField = {
      id: uid(),
      type: activeTool.kind,
      roleKey: activeRoleKey,
      page,
      x: Math.max(0, Math.min(100 - activeTool.w, x - activeTool.w / 2)),
      y: Math.max(0, Math.min(100 - activeTool.h, y - activeTool.h / 2)),
      width: activeTool.w,
      height: activeTool.h,
      documentId: activeDoc.id,
    };
    setFields((p) => [...p, f]);
  };
  const removeField = (id: string) => setFields((p) => p.filter((f) => f.id !== id));

  // Keyboard delete for selected field
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedFieldId) {
        // Avoid deleting while typing in inputs
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        removeField(selectedFieldId);
        setSelectedFieldId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedFieldId]);

  const docFields = useMemo(
    () =>
      fields.filter(
        (f) => !activeDoc || (f.documentId ?? activeDoc.id) === activeDoc.id,
      ),
    [fields, activeDoc],
  );
  const pageFields = useMemo(() => docFields.filter((f) => f.page === page), [docFields, page]);

  /* ─────────── validation ─────────── */
  const nameTrimmed = name.trim();
  const nameIsUnique = !existingTemplates.some(
    (t) => t.name.trim().toLowerCase() === nameTrimmed.toLowerCase(),
  );
  const roleLabels = roles.map((r) => r.label.trim().toLowerCase());
  const rolesHaveDuplicates = roleLabels.some(
    (l, i) => l && roleLabels.indexOf(l) !== i,
  );
  const rolesAllNamed = roles.every(
    (r) => r.label.trim().length > 0 && r.label.length <= MAX_ROLE_NAME,
  );
  const stepValid: Record<StepKey, boolean> = {
    upload:
      nameTrimmed.length > 0 &&
      nameTrimmed.length <= 100 &&
      nameIsUnique &&
      documents.length >= 1,
    configure:
      nameTrimmed.length > 0 &&
      nameTrimmed.length <= 100 &&
      nameIsUnique &&
      documents.length >= 1 &&
      documents.every((d) => d.name.trim().length > 0 && d.name.length <= 100),
    rolesfields:
      roles.length >= 1 && rolesAllNamed && !rolesHaveDuplicates,
    review: nameTrimmed.length > 0 && filenamePattern.trim().length > 0,
  };

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (!stepValid[step]) {
      const m: Record<StepKey, string> = {
        upload: !nameTrimmed
          ? "Name your template to continue."
          : !nameIsUnique
            ? "A template with this name already exists."
            : "Add at least one document to continue.",
        configure: !nameTrimmed
          ? "Please enter a name for this template."
          : !nameIsUnique
            ? "A template with this name already exists. Please choose a different name."
            : "Each document needs a name.",
        rolesfields:
          rolesHaveDuplicates
            ? "Two roles share the same name. Please make each role name unique."
            : !rolesAllNamed
              ? "Each role needs a name (max 20 characters)."
              : "Please add at least one role before continuing.",
        review: "Name the template and filename pattern.",
      };
      toast.error(m[step]);
      return;
    }
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
  };
  const goBack = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) setStep(STEPS[idx - 1].key);
  };

  /* ─────────── save ─────────── */
  const canSave = STEPS.every((s) => stepValid[s.key]);

  const buildTemplate = useCallback((): SignTemplate => {
    return {
      id: templateIdRef.current,
      name: name.trim() || editingTemplate?.name || "Untitled template",
      description: description.trim() || undefined,
      category,
      documentName: documents[0]?.name || `${name}.pdf`,
      pageCount: documents[0]?.pageCount ?? 3,
      roles,
      fields,
      signingMode,
      variables: variables.length > 0 ? variables : undefined,
      packageTitle: packageTitle.trim() || undefined,
      documents:
        documents.length > 0
          ? documents.map<SignTemplateDocument>((d) => ({
              id: d.id,
              name: d.name,
              tag: d.tag,
              pageCount: d.pageCount,
            }))
          : undefined,
      delivery,
      automation,
      filenamePattern: filenamePattern.trim() || undefined,
      defaults: {
        expiryDays: delivery.expiryDays,
        remindersEveryDays: automation.remindEveryDays,
        ccEmails: delivery.ccEmails,
      },
      createdAt: createdAtRef.current,
      lastUsedAt: editingTemplate?.lastUsedAt,
      useCount: editingTemplate?.useCount ?? 0,
      favorite: editingTemplate?.favorite,
      pinned: editingTemplate?.pinned,
    };
  }, [
    name, description, category, documents, roles, fields, signingMode,
    variables, packageTitle, delivery, automation, filenamePattern, editingTemplate,
  ]);

  const handleSave = () => {
    if (!canSave) {
      toast.error("Complete every step before saving.");
      return;
    }
    const tpl = buildTemplate();
    save(tpl);
    toast.success(isEditing ? "Template updated" : "Template saved", {
      description: `${tpl.name} is ready to launch.`,
    });
    onSaved();
  };

  /* ─────────── autosave ─────────── */
  const [autosaveState, setAutosaveState] = useState<"idle" | "saving" | "saved">("idle");
  const autosaveSkipFirst = useRef(true);
  useEffect(() => {
    // Only autosave when editing an existing template, and skip the first run
    // (state hydration) to avoid an immediate re-save loop.
    if (!isEditing) return;
    if (autosaveSkipFirst.current) {
      autosaveSkipFirst.current = false;
      return;
    }
    setAutosaveState("saving");
    const t = setTimeout(() => {
      save(buildTemplate());
      setAutosaveState("saved");
      const r = setTimeout(() => setAutosaveState("idle"), 1500);
      return () => clearTimeout(r);
    }, 700);
    return () => clearTimeout(t);
  }, [isEditing, buildTemplate, save]);

  /* ─────────── render ─────────── */
  const currentIdx = STEPS.findIndex((s) => s.key === step);

  const nextHint: Record<StepKey, string> = {
    upload: "Next: documents & delivery",
    configure: "Next: roles & signing fields",
    rolesfields: "Next: customize before sending",
    review: "Save template",
  };

  return (
    <div className="px-6 md:px-10 py-8 pb-32 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => {
              if (isEditing) { onBack(); return; }
              const hasProgress =
                documents.length > 0 || name.trim().length > 0 || fields.length > 0;
              if (
                !hasProgress ||
                window.confirm("Discard this template? Your progress will be lost.")
              ) {
                onBack();
              }
            }}
            className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to templates
          </button>
          {isEditing && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-medium tabular-nums transition-colors",
                autosaveState === "saving" && "text-muted-foreground",
                autosaveState === "saved" && "text-emerald-500",
                autosaveState === "idle" && "text-muted-foreground/70",
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  autosaveState === "saving" && "bg-muted-foreground animate-pulse",
                  autosaveState === "saved" && "bg-emerald-500",
                  autosaveState === "idle" && "bg-muted-foreground/50",
                )}
              />
              {autosaveState === "saving" ? "Saving…" : autosaveState === "saved" ? "Saved" : "Auto-save on"}
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-[32px] leading-[1.1] font-semibold tracking-tight">
          {isEditing ? "Edit your template." : "Configure once. Launch infinitely."}
        </h1>

        {/* Stepper — premium operational */}
        <div className="mt-8 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/50" />
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/60 via-primary to-primary/60"
            initial={false}
            animate={{
              width: `${(currentIdx / (STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative flex items-center justify-between">
            {STEPS.map((s, i) => {
              const active = s.key === step;
              const done = i < currentIdx;
              const reachable = i <= currentIdx || stepValid[STEPS[i - 1]?.key];
              return (
                <button
                  key={s.key}
                  onClick={() => reachable && setStep(s.key)}
                  disabled={!reachable}
                  className={cn(
                    "group flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full transition-all bg-background",
                    active && "ring-1 ring-primary/25 shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.4)]",
                    !active && !done && "opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "relative w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-semibold tabular-nums transition-all",
                      active
                        ? "bg-primary text-primary-foreground"
                        : done
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground border border-border/60",
                    )}
                  >
                    {active && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    {done ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[12.5px] font-medium hidden sm:inline tracking-tight",
                      active ? "text-foreground" : done ? "text-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[420px]"
        >
          {step === "upload" && (
            <StepUpload
              documents={documents}
              addDocuments={addDocuments}
              removeDocument={removeDocument}
              moveDocument={moveDocument}
              updateDocument={updateDocument}
              fileInputRef={fileInputRef}
              addMoreInputRef={addMoreInputRef}
              name={name}
              setName={setName}
              nameIsUnique={nameIsUnique}
              description={description}
              setDescription={setDescription}
              filenamePattern={filenamePattern}
              setFilenamePattern={setFilenamePattern}
            />
          )}

          {step === "configure" && (
            <StepConfigure
              name={name}
              setName={setName}
              nameIsUnique={nameIsUnique}
              documents={documents}
              updateDocument={updateDocument}
              removeDocument={removeDocument}
              moveDocument={moveDocument}
              addDocuments={addDocuments}
              signingMode={signingMode}
              setSigningMode={setSigningMode}
              variables={variables}
              roles={roles}
            />
          )}

          {step === "rolesfields" && (
            <StepRolesFields
              documents={documents}
              activeDocId={activeDocId}
              setActiveDocId={(id) => {
                setActiveDocId(id);
                setPage(1);
              }}
              page={page}
              setPage={setPage}
              pageCount={pageCount}
              roles={roles}
              addRole={addRole}
              updateRole={updateRole}
              removeRole={removeRole}
              moveRole={moveRole}
              togglePermission={togglePermission}
              signingMode={signingMode}
              setSigningMode={setSigningMode}
              signSelf={signSelf}
              toggleSignSelf={toggleSignSelf}
              fields={fields}
              docFields={docFields}
              pageFields={pageFields}
              activeRoleKey={activeRoleKey}
              setActiveRoleKey={setActiveRoleKey}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              placeField={placeField}
              removeField={removeField}
              selectedFieldId={selectedFieldId}
              setSelectedFieldId={setSelectedFieldId}
              pageRef={pageRef}
            />
          )}

          {step === "review" && (
            <StepLaunchExperience
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              category={category}
              setCategory={setCategory}
              documents={documents}
              roles={roles}
              variables={variables}
              addVariable={addVariable}
              updateVariable={updateVariable}
              removeVariable={removeVariable}
              addVariableWith={addVariableWith}
              fields={fields}
              delivery={delivery}
              setDelivery={setDelivery}
              automation={automation}
              setAutomation={setAutomation}
              filenamePattern={filenamePattern}
              setFilenamePattern={setFilenamePattern}
              signingMode={signingMode}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer nav — sticky glass bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="pointer-events-auto border-t border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (currentIdx === 0 ? onBack() : goBack())}
              className="h-9"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              {currentIdx === 0 ? "Cancel" : "Back"}
            </Button>

            <div className="hidden md:flex flex-col items-center text-center">
              <div className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/80 font-medium">
                Step {currentIdx + 1} of {STEPS.length}
              </div>
              <div className="text-[12px] text-foreground/80 tabular-nums mt-0.5">
                {nextHint[step]}
              </div>
            </div>

            {step === "review" ? (
              <Button
                onClick={handleSave}
                disabled={!canSave}
                className="h-10 px-5 gap-1.5 rounded-xl shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_14px_36px_-10px_hsl(var(--primary)/0.7)] hover:-translate-y-px transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                Save template
              </Button>
            ) : (
              <Button
                onClick={goNext}
                disabled={!stepValid[step]}
                className="h-10 px-5 gap-1.5 rounded-xl shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_14px_36px_-10px_hsl(var(--primary)/0.75)] hover:-translate-y-px transition-all"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 1 — UPLOAD
 * ────────────────────────────────────────────────────────── */

function StepUpload({
  documents,
  addDocuments,
  removeDocument,
  moveDocument,
  updateDocument,
  fileInputRef,
  addMoreInputRef,
}: {
  documents: BuilderDoc[];
  addDocuments: (files: File[]) => void;
  removeDocument: (id: string) => void;
  moveDocument: (id: string, dir: -1 | 1) => void;
  updateDocument: (id: string, p: Partial<BuilderDoc>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  addMoreInputRef: React.RefObject<HTMLInputElement>;
}) {
  const handlePicked = (e: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement>) => {
    const fs = Array.from(e.target.files ?? []);
    if (fs.length) addDocuments(fs);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Upload your files"
        sub="PDF, DOCX, DOC, ODT. Drop multiple files — they'll be sent together as one signing session."
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.odt"
        className="hidden"
        onChange={(e) => handlePicked(e, fileInputRef)}
      />
      <input
        ref={addMoreInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.odt"
        className="hidden"
        onChange={(e) => handlePicked(e, addMoreInputRef)}
      />

      {documents.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const fs = Array.from(e.dataTransfer.files ?? []);
            if (fs.length) addDocuments(fs);
          }}
          className="group relative rounded-2xl border border-dashed border-border/60 bg-gradient-to-b from-card/40 to-card/20 hover:from-card/60 hover:to-card/30 hover:border-primary/40 transition-all cursor-pointer px-6 py-20 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />
          <div className="relative w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/15 shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.4)]">
            <UploadIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
          <p className="relative text-[14px] font-medium">Drag &amp; drop your files, or click to browse</p>
          <p className="relative text-[12px] text-muted-foreground mt-1">
            Supports PDF, DOCX, DOC, ODT · up to 20MB per file
          </p>
          <Button size="sm" className="relative mt-5 h-9 rounded-lg" type="button">
            Choose files
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Operational summary bar */}
          <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary/12 flex items-center justify-center">
                <FileStack className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-[12.5px] font-semibold tabular-nums leading-tight">
                  {documents.length} file{documents.length === 1 ? "" : "s"} ready
                </div>
                <div className="text-[10.5px] text-muted-foreground leading-tight mt-0.5">
                  Grouped into one signing flow
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live package
            </div>
          </div>

          {/* File grid + integrated add tile */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const fs = Array.from(e.dataTransfer.files ?? []);
              if (fs.length) addDocuments(fs);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {documents.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -2 }}
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-b from-card/70 to-card/40 hover:border-primary/30 transition-all p-3.5 flex items-center gap-3 shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_8px_24px_-16px_hsl(var(--foreground)/0.18)] hover:shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_16px_36px_-18px_hsl(var(--foreground)/0.25)]"
              >
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-3.5 h-3.5 text-muted-foreground/60" />
                </button>
                <div className="w-11 h-13 rounded-lg bg-gradient-to-b from-background to-muted/50 border border-border/50 shrink-0 flex flex-col items-center justify-center text-[8.5px] font-semibold text-muted-foreground py-1.5 px-1 shadow-inner">
                  <FileText className="w-4 h-4 text-primary/80 mb-1" />
                  {d.name.split(".").pop()?.toUpperCase().slice(0, 4)}
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    value={d.name}
                    onChange={(e) => updateDocument(d.id, { name: e.target.value })}
                    className="h-8 px-2 bg-background/60 text-[12.5px] font-medium border-border/50 focus:border-primary/40"
                  />
                  <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-muted-foreground">
                    <span className="tabular-nums">{d.pageCount} pages</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <Check className="w-2.5 h-2.5" /> Uploaded
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => moveDocument(d.id, -1)}
                    disabled={i === 0}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronDown className="w-3 h-3 rotate-180" />
                  </button>
                  <button
                    onClick={() => moveDocument(d.id, 1)}
                    disabled={i === documents.length - 1}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeDocument(d.id)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition opacity-0 group-hover:opacity-100"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}

            {/* Integrated add-another tile */}
            <button
              onClick={() => addMoreInputRef.current?.click()}
              className="group relative rounded-2xl border border-dashed border-border/60 hover:border-primary/40 bg-card/20 hover:bg-card/40 transition-all p-3.5 flex items-center gap-3 min-h-[76px] text-left overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.07),transparent_60%)]" />
              <div className="relative w-11 h-13 rounded-lg bg-primary/8 border border-dashed border-primary/30 shrink-0 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="text-[12.5px] font-semibold text-foreground/90">Add another file</div>
                <div className="text-[10.5px] text-muted-foreground mt-0.5">
                  Drop here or click to browse
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 2 — CONFIGURE (template name + documents + signing order)
 * ────────────────────────────────────────────────────────── */

function StepConfigure({
  name,
  setName,
  nameIsUnique,
  documents,
  updateDocument,
  removeDocument,
  moveDocument,
  addDocuments,
  signingMode,
  setSigningMode,
  variables,
  roles,
}: {
  name: string;
  setName: (s: string) => void;
  nameIsUnique: boolean;
  documents: BuilderDoc[];
  updateDocument: (id: string, p: Partial<BuilderDoc>) => void;
  removeDocument: (id: string) => void;
  moveDocument: (id: string, dir: -1 | 1) => void;
  addDocuments: (files: File[]) => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
  variables: SignTemplateVariable[];
  roles: SignTemplateRole[];
}) {
  const addInputRef = useRef<HTMLInputElement>(null);
  const [openVarFor, setOpenVarFor] = useState<string | null>(null);

  // Tokens available: built-ins + role names + custom variables
  const availableTokens = useMemo(() => {
    const base = [
      { name: "SIGNER_NAME", label: "Signer name" },
      { name: "COMPANY_NAME", label: "Company name" },
      { name: "DATE", label: "Date" },
    ];
    const roleTokens = roles.map((r) => ({
      name: r.label.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, ""),
      label: `${r.label} (role)`,
    }));
    const customTokens = variables.map((v) => ({ name: v.name, label: v.label }));
    const map = new Map<string, { name: string; label: string }>();
    [...base, ...roleTokens, ...customTokens].forEach((t) => {
      if (t.name && !map.has(t.name)) map.set(t.name, t);
    });
    return Array.from(map.values());
  }, [variables, roles]);

  const insertToken = (docId: string, currentValue: string, token: string) => {
    updateDocument(docId, { name: `${currentValue} {{${token}}}`.trim() });
    setOpenVarFor(null);
  };

  const requestDelete = (d: BuilderDoc) => {
    if (documents.length <= 1) {
      toast.error("At least one document is required.");
      return;
    }
    if (window.confirm(`Are you sure you want to remove ${d.name} from this template?`)) {
      removeDocument(d.id);
    }
  };

  const nameTooLong = name.length > 100;
  const showUniqueError = name.trim().length > 0 && !nameIsUnique;

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Configure your template"
        sub="Name it, manage documents and decide how recipients sign."
      />

      {/* Template name */}
      <section className="space-y-2">
        <FieldLabel text="Template name *">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 100))}
            placeholder="e.g. Agency Client Agreement"
            className={cn(
              "h-11 bg-background/60 text-[14px]",
              (showUniqueError || nameTooLong) && "border-destructive/60 focus-visible:ring-destructive/40",
            )}
            maxLength={100}
          />
        </FieldLabel>
        <div className="flex items-center justify-between text-[11px]">
          <span
            className={cn(
              "text-muted-foreground",
              showUniqueError && "text-destructive",
            )}
          >
            {showUniqueError
              ? "A template with this name already exists. Please choose a different name."
              : "Unique within your template library. Max 100 characters."}
          </span>
          <span className="text-muted-foreground tabular-nums">{name.length}/100</span>
        </div>
      </section>

      {/* Documents */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-[14px] font-semibold tracking-tight">Documents</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Rename, reorder or add more. Use {"{{variables}}"} in filenames — they resolve at send time.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addInputRef.current?.click()}
            className="h-9 gap-1.5 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" /> Add document
          </Button>
          <input
            ref={addInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.odt"
            className="hidden"
            onChange={(e) => {
              const fs = Array.from(e.target.files ?? []);
              if (fs.length) addDocuments(fs);
              e.target.value = "";
            }}
          />
        </div>

        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {documents.map((d, i) => {
              const isLast = documents.length <= 1;
              const hasVar = /\{\{[A-Z0-9_]+\}\}/.test(d.name);
              return (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="group rounded-xl border border-border/50 bg-card/40 hover:bg-card/60 transition-all p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-12 rounded-md bg-gradient-to-b from-background to-muted/40 border border-border/40 shrink-0 flex flex-col items-center justify-center text-[8px] font-semibold text-muted-foreground">
                    <FileText className="w-4 h-4 text-primary/70 mb-0.5" />
                    {d.name.split(".").pop()?.toUpperCase().slice(0, 4)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Input
                        value={d.name}
                        onChange={(e) =>
                          updateDocument(d.id, { name: e.target.value.slice(0, 100) })
                        }
                        maxLength={100}
                        placeholder="Document name"
                        className="h-9 px-2.5 bg-background/60 text-[13px] font-medium"
                      />
                      <Popover
                        open={openVarFor === d.id}
                        onOpenChange={(o) => setOpenVarFor(o ? d.id : null)}
                      >
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 h-9 px-2.5 rounded-md border border-border/50 bg-background/60 text-[11.5px] font-medium text-foreground/80 hover:text-foreground hover:border-primary/40 transition-colors shrink-0"
                            title="Insert variable"
                          >
                            <Braces className="w-3.5 h-3.5 text-primary" /> Variable
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-64 p-1.5">
                          <div className="px-2 py-1.5 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">
                            Insert variable
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {availableTokens.map((t) => (
                              <button
                                key={t.name}
                                onClick={() => insertToken(d.id, d.name, t.name)}
                                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-muted/60 transition-colors flex items-center justify-between gap-2"
                              >
                                <span className="text-[12.5px] font-medium truncate">{t.label}</span>
                                <code className="text-[10.5px] text-muted-foreground font-mono shrink-0">
                                  {`{{${t.name}}}`}
                                </code>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
                      <span className="tabular-nums">{d.pageCount} pages</span>
                      {hasVar && (
                        <>
                          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                          <span className="inline-flex items-center gap-1 text-primary font-medium">
                            <Braces className="w-2.5 h-2.5" /> Resolves at send time
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <button
                      onClick={() => moveDocument(d.id, -1)}
                      disabled={i === 0}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ChevronDown className="w-3 h-3 rotate-180" />
                    </button>
                    <button
                      onClick={() => moveDocument(d.id, 1)}
                      disabled={i === documents.length - 1}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => requestDelete(d)}
                    disabled={isLast}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title={isLast ? "At least one document is required" : "Remove"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Signing order */}
      <section className="space-y-2">
        <FieldLabel text="Signing order">
          <div className="grid grid-cols-2 gap-2.5">
            {([
              {
                value: "parallel" as const,
                title: "Parallel",
                sub: "Everyone signs at the same time.",
              },
              {
                value: "sequential" as const,
                title: "Sequential",
                sub: "Recipients sign one after another.",
              },
            ]).map((opt) => {
              const active = signingMode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSigningMode(opt.value)}
                  className={cn(
                    "text-left rounded-xl border p-3.5 transition-all",
                    active
                      ? "border-primary/50 bg-primary/5 shadow-[0_8px_24px_-14px_hsl(var(--primary)/0.45)]"
                      : "border-border/50 bg-card/30 hover:bg-card/50 hover:border-border",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold">{opt.title}</span>
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center",
                        active ? "border-primary bg-primary" : "border-border",
                      )}
                    >
                      {active && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground mt-1 leading-snug">
                    {opt.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </FieldLabel>
        <p className="text-[11px] text-muted-foreground">
          {signingMode === "sequential"
            ? "Step controls will appear on each role in the next step."
            : "All recipients receive the request at the same time."}
        </p>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 3 — ROLES & FIELDS (unified, cinematic)
 * ────────────────────────────────────────────────────────── */

const REQUIRED_BY_TYPE: Record<SignRoleType, SignFieldType[]> = {
  signer: ["signature"],
  approver: ["signature"],
  viewer: [],
  cc: [],
};
const SUGGESTED_BY_TYPE: Record<SignRoleType, SignFieldType[]> = {
  signer: ["date", "name"],
  approver: ["date"],
  viewer: [],
  cc: [],
};

const PERSON_PRESETS = ["Employee", "Client", "Vendor", "Manager", "HR", "Finance", "Legal"];

const ACTION_OPTIONS: {
  value: SignRoleType;
  label: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "signer",   label: "Sign & fill",  helper: "Signs and completes assigned fields.",      icon: PenLine },
  { value: "approver", label: "Approve",      helper: "Reviews and approves before it's finalized.", icon: ShieldCheck },
  { value: "viewer",   label: "View only",    helper: "Read-only access. No action required.",      icon: Eye },
  { value: "cc",       label: "Receive copy", helper: "Gets a final copy when signing is complete.", icon: AtSign },
];

const ACTION_VERB: Record<SignRoleType, string> = {
  signer: "Needs to sign",
  approver: "Needs to approve",
  viewer: "View only",
  cc: "Receives a copy",
};

/* Premium left sidebar — “editing as”, participant list with role-type badges, and field tools. */
function RolesFieldsSidebar({
  roles,
  activeRoleKey,
  setActiveRoleKey,
  updateRole,
  removeRole,
  moveRole,
  addRole,
  signingMode,
  setSigningMode,
  signSelf,
  toggleSignSelf,
  activeTool,
  setActiveTool,
  activeRole,
  fields,
}: {
  roles: SignTemplateRole[];
  activeRoleKey: string;
  setActiveRoleKey: (k: string) => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  moveRole: (key: string, dir: -1 | 1) => void;
  addRole: () => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
  signSelf: boolean;
  toggleSignSelf: (on: boolean) => void;
  activeTool: (typeof FIELD_TOOLS)[number];
  setActiveTool: (t: (typeof FIELD_TOOLS)[number]) => void;
  activeRole: SignTemplateRole | undefined;
  fields: SignTemplateField[];
}) {
  const activeMeta = getRoleTypeMeta(activeRole?.type);
  const ActiveTypeIcon = activeMeta.icon;

  const signatureTools = FIELD_TOOLS.filter((t) =>
    ["signature", "initials", "date"].includes(t.kind),
  );
  const textTools = FIELD_TOOLS.filter((t) => ["name", "text"].includes(t.kind));
  const controlTools = FIELD_TOOLS.filter((t) => ["checkbox"].includes(t.kind));

  const renderTool = (t: (typeof FIELD_TOOLS)[number]) => {
    const Icon = t.icon;
    const allowed = roleAllows(activeRole?.type, t.kind);
    const active = activeTool.kind === t.kind;
    return (
      <button
        key={t.kind}
        onClick={() => allowed && setActiveTool(t)}
        disabled={!allowed}
        className={cn(
          "w-full flex items-center gap-2.5 px-2.5 h-10 rounded-xl border transition-all text-left",
          active
            ? "border-primary/40 bg-primary/[0.08] text-primary shadow-[0_1px_0_0_hsl(var(--background))_inset]"
            : "border-transparent hover:bg-muted/40 text-foreground",
          !allowed && "opacity-30 cursor-not-allowed hover:bg-transparent",
        )}
      >
        <span
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
            active ? "bg-primary/15" : "bg-muted/60",
          )}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="text-[12.5px] font-medium">{t.label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-3 lg:sticky lg:top-4 h-fit">
      {/* Fields required from */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
            Fields required from
          </span>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            {roles.length}/{MAX_ROLES}
          </span>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/30 p-1.5 space-y-0.5">
          {roles.map((r, i) => {
            const active = r.key === activeRoleKey;
            const meta = getRoleTypeMeta(r.type);
            const RoleTypeIcon = meta.icon;
            const count = fields.filter((f) => f.roleKey === r.key).length;
            const locked = isMyself(r.key);
            return (
              <div
                key={r.key}
                onClick={() => setActiveRoleKey(r.key)}
                className={cn(
                  "group relative rounded-xl px-2 py-1.5 cursor-pointer transition-all flex items-center gap-2",
                  active ? "bg-background shadow-sm ring-1 ring-border/60" : "hover:bg-muted/40",
                )}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white shrink-0 ring-1 ring-black/5 hover:scale-110 transition"
                      style={{ background: r.color }}
                      title="Change colour"
                    >
                      {i + 1}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-2">
                    <div className="grid grid-cols-6 gap-1.5">
                      {ROLE_COLORS.concat(locked ? [MYSELF_COLOR] : []).map((c) => (
                        <button
                          key={c}
                          onClick={() => updateRole(r.key, { color: c })}
                          className={cn(
                            "w-6 h-6 rounded-full border border-border/60 transition hover:scale-110",
                            r.color === c &&
                              "ring-2 ring-offset-2 ring-foreground/70 ring-offset-background",
                          )}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  value={r.label}
                  onChange={(e) =>
                    updateRole(r.key, { label: e.target.value.slice(0, MAX_ROLE_NAME) })
                  }
                  onClick={(e) => e.stopPropagation()}
                  disabled={locked}
                  placeholder="Name"
                  className="h-7 px-1.5 bg-transparent border-0 shadow-none flex-1 min-w-0 text-[12.5px] font-medium focus-visible:ring-1"
                />

                {!locked ? (
                  <Select
                    value={r.type ?? "signer"}
                    onValueChange={(v) => updateRole(r.key, { type: v as SignRoleType })}
                  >
                    <SelectTrigger
                      onClick={(e) => e.stopPropagation()}
                      className="h-6 w-auto gap-1 px-1.5 border-0 bg-muted/50 hover:bg-muted text-[10px] font-semibold uppercase tracking-wider rounded-full focus:ring-0 [&>svg]:opacity-60 [&>svg]:w-2.5 [&>svg]:h-2.5"
                    >
                      <span className="inline-flex items-center gap-1">
                        <RoleTypeIcon className="w-2.5 h-2.5" />
                        {meta.label}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_TYPES.map((rt) => {
                        const Icon = rt.icon;
                        return (
                          <SelectItem key={rt.value} value={rt.value}>
                            <span className="inline-flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" /> {rt.label}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded-full bg-muted/60 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <RoleTypeIcon className="w-2.5 h-2.5" />
                    {meta.label}
                  </span>
                )}

                {count > 0 && (
                  <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                    {count}
                  </span>
                )}

                {signingMode === "sequential" && !locked && active && (
                  <div className="inline-flex items-center rounded-md border border-border/50 bg-background/60">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveRole(r.key, -1);
                      }}
                      disabled={i === 0 || (i === 1 && isMyself(roles[0].key))}
                      className="px-1 h-5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronDown className="w-2.5 h-2.5 rotate-180" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveRole(r.key, 1);
                      }}
                      disabled={i === roles.length - 1}
                      className="px-1 h-5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronDown className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}

                {!locked && roles.length > 1 && active && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRole(r.key);
                    }}
                    className="p-0.5 rounded text-muted-foreground hover:text-destructive transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={addRole}
            disabled={roles.length >= MAX_ROLES}
            className="w-full mt-1 rounded-xl border border-dashed border-border/60 px-2 py-1.5 text-[11.5px] text-muted-foreground hover:text-foreground hover:border-border transition inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <Plus className="w-3 h-3" /> Add participant
          </button>
        </div>

        <label className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/30 px-3 py-2 cursor-pointer select-none">
          <Switch checked={signSelf} onCheckedChange={(c) => toggleSignSelf(!!c)} />
          <span className="text-[12px] font-medium flex-1">I'll sign first</span>
        </label>
      </div>

      {/* Field tools — vertical, premium */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1">
          Signature
        </div>
        <div className="space-y-1">{signatureTools.map(renderTool)}</div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1">
          Text fields
        </div>
        <div className="space-y-1">{textTools.map(renderTool)}</div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1">
          Controls
        </div>
        <div className="space-y-1">{controlTools.map(renderTool)}</div>
      </div>
    </div>
  );
}

function StepRolesFields({
  documents,
  activeDocId,
  setActiveDocId,
  page,
  setPage,
  pageCount,
  roles,
  addRole,
  updateRole,
  removeRole,
  moveRole,
  togglePermission,
  signingMode,
  setSigningMode,
  signSelf,
  toggleSignSelf,
  fields,
  docFields,
  pageFields,
  activeRoleKey,
  setActiveRoleKey,
  activeTool,
  setActiveTool,
  placeField,
  removeField,
  selectedFieldId,
  setSelectedFieldId,
  pageRef,
}: {
  documents: BuilderDoc[];
  activeDocId: string;
  setActiveDocId: (id: string) => void;
  page: number;
  setPage: (n: number | ((p: number) => number)) => void;
  pageCount: number;
  roles: SignTemplateRole[];
  addRole: () => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  moveRole: (key: string, dir: -1 | 1) => void;
  togglePermission: (key: string, perm: SignRolePermission) => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
  signSelf: boolean;
  toggleSignSelf: (on: boolean) => void;
  fields: SignTemplateField[];
  docFields: SignTemplateField[];
  pageFields: SignTemplateField[];
  activeRoleKey: string;
  setActiveRoleKey: (k: string) => void;
  activeTool: (typeof FIELD_TOOLS)[number];
  setActiveTool: (t: (typeof FIELD_TOOLS)[number]) => void;
  placeField: (e: React.MouseEvent<HTMLDivElement>) => void;
  removeField: (id: string) => void;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  pageRef: React.RefObject<HTMLDivElement>;
}) {
  const [subStep, setSubStep] = useState<"people" | "actions" | "place">("people");

  const activeRole = roles.find((r) => r.key === activeRoleKey) ?? roles[0];
  const activeMeta = getRoleTypeMeta(activeRole?.type);
  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  const required = REQUIRED_BY_TYPE[activeRole?.type ?? "signer"];
  const placedKinds = new Set(
    fields.filter((f) => f.roleKey === activeRole?.key).map((f) => f.type),
  );
  const missing = required.filter((k) => !placedKinds.has(k));
  const roleComplete = missing.length === 0;

  const idx = roles.findIndex((r) => r.key === activeRole?.key);
  const nextRole = roles[idx + 1];

  const allRolesNamed = roles.every((r) => r.label.trim().length > 0);

  const SUB_STEPS: { key: "people" | "actions" | "place"; label: string }[] = [
    { key: "people", label: "Add people" },
    { key: "actions", label: "Choose actions" },
    { key: "place", label: "Place fields" },
  ];

  const titles: Record<typeof subStep, { title: string; sub: string }> = {
    people: {
      title: "Who needs to complete this?",
      sub: "Add the people who will sign, approve, view or complete fields. Use role names — templates are reusable.",
    },
    actions: {
      title: "What should each person do?",
      sub: "Pick one action per person. We'll set up sensible permissions automatically.",
    },
    place: {
      title: "Place fields for each person",
      sub: "Pick a person, then click where they need to sign or fill information.",
    },
  };

  return (
    <div className="space-y-6">
      <SectionTitle title={titles[subStep].title} sub={titles[subStep].sub} />

      {/* Sub-stepper */}
      <div className="flex items-center gap-2">
        {SUB_STEPS.map((s, i) => {
          const active = s.key === subStep;
          const done = SUB_STEPS.findIndex((x) => x.key === subStep) > i;
          return (
            <button
              key={s.key}
              onClick={() => setSubStep(s.key)}
              className={cn(
                "inline-flex items-center gap-2 h-8 px-3 rounded-full text-[12px] font-medium border transition-all",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_16px_-6px_hsl(var(--primary)/0.5)]"
                  : done
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-card/40 text-muted-foreground border-border/60 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full inline-flex items-center justify-center text-[10px] font-semibold",
                  active ? "bg-primary-foreground/20" : done ? "bg-primary/20" : "bg-muted",
                )}
              >
                {done ? <Check className="w-2.5 h-2.5" /> : String.fromCharCode(65 + i)}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>

      {subStep === "people" && (
        <SubStepPeople
          roles={roles}
          addRole={addRole}
          updateRole={updateRole}
          removeRole={removeRole}
          signSelf={signSelf}
          toggleSignSelf={toggleSignSelf}
          onNext={() => allRolesNamed && setSubStep("actions")}
          canContinue={allRolesNamed && roles.length > 0}
        />
      )}

      {subStep === "actions" && (
        <SubStepActions
          roles={roles}
          updateRole={updateRole}
          togglePermission={togglePermission}
          onBack={() => setSubStep("people")}
          onNext={() => setSubStep("place")}
        />
      )}

      {subStep === "place" && (
        <PlaceFieldsPanel
          documents={documents}
          activeDocId={activeDocId}
          setActiveDocId={setActiveDocId}
          page={page}
          setPage={setPage}
          pageCount={pageCount}
          roles={roles}
          fields={fields}
          docFields={docFields}
          pageFields={pageFields}
          activeRoleKey={activeRoleKey}
          setActiveRoleKey={setActiveRoleKey}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          placeField={placeField}
          removeField={removeField}
          selectedFieldId={selectedFieldId}
          setSelectedFieldId={setSelectedFieldId}
          pageRef={pageRef}
          activeRole={activeRole}
          activeDoc={activeDoc}
          required={required}
          missing={missing}
          roleComplete={roleComplete}
          nextRole={nextRole}
          activeMeta={activeMeta}
        />
      )}
    </div>
  );
}

/* ── Sub-step A: Add People ───────────────────────────────── */
function SubStepPeople({
  roles,
  addRole,
  updateRole,
  removeRole,
  signSelf,
  toggleSignSelf,
  onNext,
  canContinue,
}: {
  roles: SignTemplateRole[];
  addRole: () => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  signSelf: boolean;
  toggleSignSelf: (on: boolean) => void;
  onNext: () => void;
  canContinue: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-card/30 divide-y divide-border/40">
        {roles.map((r, i) => {
          const locked = isMyself(r.key);
          return (
            <div key={r.key} className="flex items-center gap-3 p-4">
              <span
                className="w-9 h-9 rounded-full inline-flex items-center justify-center text-[13px] font-semibold text-white ring-1 ring-black/5 shrink-0"
                style={{ background: r.color }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <Input
                  value={r.label}
                  disabled={locked}
                  onChange={(e) =>
                    updateRole(r.key, { label: e.target.value.slice(0, MAX_ROLE_NAME) })
                  }
                  placeholder="e.g. Employee, Client, Manager"
                  className="h-10 text-[14px] font-medium border-border/60 bg-background/60"
                />
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Use a role name, not a person's name — templates can be reused for anyone.
                </p>
              </div>
              {!locked && roles.length > 1 && (
                <button
                  onClick={() => removeRole(r.key)}
                  className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition shrink-0"
                  title="Remove person"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}

        <div className="p-3 flex flex-wrap items-center gap-2">
          <button
            onClick={addRole}
            disabled={roles.length >= MAX_ROLES}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-dashed border-border/60 text-[12.5px] font-medium text-foreground hover:bg-muted/40 transition disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> Add another person
          </button>
          <span className="text-[11px] text-muted-foreground ml-1">
            Examples: {PERSON_PRESETS.join(" · ")}
          </span>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 px-4 py-3 cursor-pointer">
        <Switch checked={signSelf} onCheckedChange={(c) => toggleSignSelf(!!c)} />
        <div className="flex-1">
          <div className="text-[13px] font-medium">I also need to sign</div>
          <div className="text-[11.5px] text-muted-foreground">
            Adds you as the first signer on this template.
          </div>
        </div>
      </label>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canContinue} className="gap-1.5">
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ── Sub-step B: Choose Actions ───────────────────────────── */
function SubStepActions({
  roles,
  updateRole,
  togglePermission,
  onBack,
  onNext,
}: {
  roles: SignTemplateRole[];
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  togglePermission: (key: string, perm: SignRolePermission) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {roles.map((r) => {
        const currentType = r.type ?? "signer";
        const isAdvOpen = !!advancedOpen[r.key];
        return (
          <div
            key={r.key}
            className="rounded-2xl border border-border/50 bg-card/30 p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-[12px] font-semibold text-white ring-1 ring-black/5 shrink-0"
                style={{ background: r.color }}
              >
                {r.label.charAt(0).toUpperCase() || "?"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold truncate">{r.label || "Untitled"}</div>
                <div className="text-[11.5px] text-muted-foreground">
                  What should {r.label || "this person"} do?
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ACTION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const selected = currentType === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateRole(r.key, { type: opt.value })}
                    className={cn(
                      "text-left rounded-xl border p-3 transition-all",
                      selected
                        ? "border-primary/50 bg-primary/[0.06] shadow-[0_4px_16px_-6px_hsl(var(--primary)/0.3)]"
                        : "border-border/50 bg-background/40 hover:bg-muted/40 hover:border-border",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-md inline-flex items-center justify-center",
                          selected ? "bg-primary/15 text-primary" : "bg-muted text-foreground/70",
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[12.5px] font-semibold">{opt.label}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">{opt.helper}</p>
                  </button>
                );
              })}
            </div>

            <Collapsible
              open={isAdvOpen}
              onOpenChange={(o) => setAdvancedOpen((s) => ({ ...s, [r.key]: o }))}
            >
              <CollapsibleTrigger className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground hover:text-foreground transition">
                <ChevronDown
                  className={cn("w-3 h-3 transition-transform", isAdvOpen && "rotate-180")}
                />
                Advanced permissions
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {PERMISSION_LABELS.map((p) => {
                    const has = (r.permissions ?? []).includes(p.value);
                    return (
                      <button
                        key={p.value}
                        onClick={() => togglePermission(r.key, p.value)}
                        className={cn(
                          "h-7 px-2.5 rounded-full text-[11px] font-medium border transition",
                          has
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background border-border/60 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        );
      })}

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
        <Button onClick={onNext} className="gap-1.5">
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ── Sub-step C: Place Fields ─────────────────────────────── */
function PlaceFieldsPanel({
  documents,
  activeDocId,
  setActiveDocId,
  page,
  setPage,
  pageCount,
  roles,
  fields,
  docFields,
  pageFields,
  activeRoleKey,
  setActiveRoleKey,
  activeTool,
  setActiveTool,
  placeField,
  removeField,
  selectedFieldId,
  setSelectedFieldId,
  pageRef,
  activeRole,
  activeDoc,
  required,
  missing,
  roleComplete,
  nextRole,
  activeMeta,
}: any) {
  const fieldLabelByKind = (k: SignFieldType) =>
    FIELD_TOOLS.find((t) => t.kind === k)?.label ?? k;

  return (
    <div className="space-y-3">
      {/* Now placing banner */}
      <div className="rounded-2xl border border-border/50 bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-xl px-4 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            Now placing fields for
          </span>
          <span
            className="inline-flex items-center gap-2 px-2.5 h-7 rounded-full border text-[12px] font-medium"
            style={{
              background: `${activeRole?.color}1a`,
              borderColor: `${activeRole?.color}55`,
              color: activeRole?.color,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: activeRole?.color }} />
            {activeRole?.label || "Untitled"}
          </span>
          {required.length > 0 && (
            <span className="text-[11.5px] text-muted-foreground hidden md:inline">
              Required:{" "}
              <span className="text-foreground font-medium">
                {required.map(fieldLabelByKind).join(" · ")}
              </span>
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {roleComplete && nextRole && (
            <button
              onClick={() => setActiveRoleKey(nextRole.key)}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[11.5px] font-medium bg-foreground text-background hover:opacity-90 transition"
            >
              Next: {nextRole.label || "person"} <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 min-h-[640px]">
        {/* Plain-language sidebar */}
        <div className="space-y-4 lg:sticky lg:top-4 h-fit">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1 mb-2">
              People
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/30 p-1.5 space-y-0.5">
              {roles.map((r: SignTemplateRole) => {
                const active = r.key === activeRoleKey;
                const meta = getRoleTypeMeta(r.type);
                const reqForRole = REQUIRED_BY_TYPE[r.type ?? "signer"];
                const placed = new Set(
                  fields.filter((f: SignTemplateField) => f.roleKey === r.key).map((f: SignTemplateField) => f.type),
                );
                const isMissing = reqForRole.some((k) => !placed.has(k));
                const count = fields.filter((f: SignTemplateField) => f.roleKey === r.key).length;
                return (
                  <button
                    key={r.key}
                    onClick={() => setActiveRoleKey(r.key)}
                    className={cn(
                      "w-full text-left rounded-xl px-2.5 py-2 transition-all flex items-center gap-2.5",
                      active ? "bg-background shadow-sm ring-1 ring-border/60" : "hover:bg-muted/40",
                    )}
                  >
                    <span
                      className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white ring-1 ring-black/5 shrink-0"
                      style={{ background: r.color }}
                    >
                      {r.label.charAt(0).toUpperCase() || "?"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-medium truncate">{r.label || "Untitled"}</div>
                      <div className="text-[10.5px] text-muted-foreground truncate">
                        {ACTION_VERB[r.type ?? "signer"]}
                      </div>
                    </div>
                    {reqForRole.length > 0 && isMissing ? (
                      <span className="text-[9.5px] font-semibold text-amber-600 dark:text-amber-400">
                        Needs field
                      </span>
                    ) : count > 0 ? (
                      <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1 mb-2">
              Fields
            </div>
            <div className="space-y-1">
              {FIELD_TOOLS.map((t) => {
                const Icon = t.icon;
                const allowed = roleAllows(activeRole?.type, t.kind);
                const active = activeTool.kind === t.kind;
                return (
                  <button
                    key={t.kind}
                    onClick={() => allowed && setActiveTool(t)}
                    disabled={!allowed}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 h-10 rounded-xl border transition-all text-left",
                      active
                        ? "border-primary/40 bg-primary/[0.08] text-primary"
                        : "border-transparent hover:bg-muted/40 text-foreground",
                      !allowed && "opacity-30 cursor-not-allowed hover:bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                        active ? "bg-primary/15" : "bg-muted/60",
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[12.5px] font-medium">{t.label}</span>
                  </button>
                );
              })}
            </div>
            {activeRole && (
              <p className="text-[11px] text-muted-foreground mt-2 px-1 leading-snug">
                Click on the document where{" "}
                <span className="text-foreground font-medium">{activeRole.label}</span> should{" "}
                {activeTool.kind === "signature" ? "sign" : `fill ${activeTool.label.toLowerCase()}`}.
              </p>
            )}
          </div>
        </div>

        {/* Document canvas */}
        <div className="flex gap-3 min-w-0">
          {documents.length > 1 && (
            <div className="flex flex-col gap-1.5">
              {documents.map((d: BuilderDoc, i: number) => {
                const active = d.id === activeDocId;
                const count = fields.filter(
                  (f: SignTemplateField) => (f.documentId ?? documents[0].id) === d.id,
                ).length;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDocId(d.id)}
                    title={d.name}
                    className={cn(
                      "relative w-10 h-12 rounded-md border flex flex-col items-center justify-center transition-all",
                      active
                        ? "border-primary/50 bg-primary/[0.06] shadow-sm"
                        : "border-border/50 bg-card/30 hover:bg-card/60",
                    )}
                  >
                    <FileText
                      className={cn(
                        "w-3.5 h-3.5",
                        active ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className="text-[9px] font-semibold mt-0.5 tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 rounded-full bg-foreground text-background text-[9px] font-semibold inline-flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2.5">
              <div className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/40 backdrop-blur px-1.5 py-1">
                <button
                  onClick={() =>
                    setPage((p: number) => Math.max(1, (typeof p === "number" ? p : 1) - 1))
                  }
                  disabled={page === 1}
                  className="p-1 rounded-full hover:bg-muted/50 disabled:opacity-30"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <span className="text-[11px] text-muted-foreground px-1.5 tabular-nums">
                  {documents.length > 1 && activeDoc && (
                    <span className="text-foreground/85 font-medium truncate inline-block max-w-[140px] align-bottom mr-1">
                      {activeDoc.name} ·
                    </span>
                  )}
                  Page <span className="text-foreground font-medium">{page}</span> / {pageCount}
                </span>
                <button
                  onClick={() =>
                    setPage((p: number) =>
                      Math.min(pageCount, (typeof p === "number" ? p : 1) + 1),
                    )
                  }
                  disabled={page === pageCount}
                  className="p-1 rounded-full hover:bg-muted/50 disabled:opacity-30"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {documents.length > 1
                  ? `${docFields.length} on doc · ${fields.length} total`
                  : `${fields.length} field${fields.length === 1 ? "" : "s"}`}
              </span>
            </div>

            <div className="relative rounded-2xl border border-border/40 bg-gradient-to-b from-muted/20 to-muted/5 p-6 flex justify-center">
              <div
                ref={pageRef}
                onClick={(e) => {
                  setSelectedFieldId(null);
                  placeField(e);
                }}
                className="relative bg-background rounded-md shadow-2xl border border-border/40 w-full max-w-[720px] aspect-[1/1.3] cursor-crosshair"
              >
                <div className="absolute inset-0 p-12 space-y-3 pointer-events-none">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 bg-muted/60 rounded"
                      style={{ width: `${50 + ((i * 7) % 50)}%` }}
                    />
                  ))}
                </div>

                {pageFields.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="rounded-full border border-border/60 bg-background/80 backdrop-blur px-3 py-1.5 inline-flex items-center gap-1.5 shadow-sm">
                      <Move className="w-3 h-3 text-muted-foreground" />
                      <p className="text-[11.5px] text-muted-foreground">
                        Click to place a{" "}
                        <span className="font-medium text-foreground">
                          {activeTool.label.toLowerCase()}
                        </span>{" "}
                        for {activeRole?.label}
                      </p>
                    </div>
                  </div>
                )}

                {pageFields.map((f: SignTemplateField) => {
                  const role = roles.find((r: SignTemplateRole) => r.key === f.roleKey);
                  const tool = FIELD_TOOLS.find((t) => t.kind === f.type) ?? FIELD_TOOLS[0];
                  const Icon = tool.icon;
                  const selected = selectedFieldId === f.id;
                  const isActiveRole = f.roleKey === activeRoleKey;
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: isActiveRole ? 1 : 0.55, scale: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFieldId(f.id);
                      }}
                      style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        width: `${f.width}%`,
                        height: `${f.height}%`,
                        minHeight: 28,
                        minWidth: 56,
                        borderColor: role?.color,
                        background: `${role?.color}1f`,
                        boxShadow: selected
                          ? `0 0 0 2px ${role?.color}, 0 8px 24px -8px ${role?.color}`
                          : undefined,
                      }}
                      className="absolute group rounded-md border-[1.5px] flex items-center gap-1 px-1.5 cursor-pointer transition-opacity"
                    >
                      <span className="shrink-0" style={{ color: role?.color }}>
                        <Icon className="w-3 h-3" />
                      </span>
                      <span
                        className="text-[10px] font-medium truncate"
                        style={{ color: role?.color }}
                      >
                        {tool.label}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeField(f.id);
                        }}
                        className="ml-auto opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 text-destructive transition"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {activeMeta.allowedFields !== "all" && activeMeta.allowedFields.length === 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-background/90 backdrop-blur px-4 py-2 text-[11.5px] text-muted-foreground shadow-lg">
                  {activeRole?.label} doesn't need any fields — they
                  {activeMeta.value === "viewer" ? " just review the document." : " just receive a copy."}
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11.5px] text-muted-foreground">
              <span>
                {missing.length > 0 ? (
                  <>
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {activeRole?.label} is marked to sign but has no signature field.
                    </span>{" "}
                    Add one above.
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3 inline mr-1 text-emerald-500" />
                    {activeRole?.label} fields complete.
                  </>
                )}
              </span>
              <span className="opacity-70 hidden md:inline">
                Click any field to select · Backspace to remove
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ──────────────────────────────────────────────────────────
 * STEP 5 — DELIVERY & AUTOMATION
 * ────────────────────────────────────────────────────────── */

function StepVariables({
  variables,
  addVariable,
  updateVariable,
  removeVariable,
}: {
  variables: SignTemplateVariable[];
  addVariable: () => void;
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void;
  removeVariable: (name: string) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Personalization variables"
        sub="Values you fill in before sending — like client name, deal value, or start date. These personalize the agreement automatically."
      />

      <div className="rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5 flex items-start gap-2.5">
        <Braces className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="text-[12px] text-foreground/80 leading-relaxed">
          <span className="font-medium text-foreground">Sender-filled, not signer-filled.</span>{" "}
          Variables personalize the document before it goes out. Signing fields are placed on the
          document in the previous step.
        </div>
      </div>

      {variables.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/20 px-6 py-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-muted/40 flex items-center justify-center mb-3">
            <Braces className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-[13px] font-medium">No variables yet</p>
          <p className="text-[11.5px] text-muted-foreground mt-1 max-w-sm mx-auto">
            Add common values like client name, company, deal value, or start date.
          </p>
          <Button size="sm" onClick={addVariable} className="mt-4 h-9 rounded-lg gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add variable
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {variables.map((v) => {
              const meta = variableTypeMeta(v.type);
              const Icon = meta.icon;
              return (
                <div
                  key={v.name}
                  className="group rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <Input
                      value={v.label}
                      onChange={(e) => updateVariable(v.name, { label: e.target.value })}
                      placeholder="Label (e.g. Client name)"
                      className="h-9 bg-background/60 flex-1 min-w-[160px] text-[13px]"
                    />
                    <Select
                      value={v.type}
                      onValueChange={(t) =>
                        updateVariable(v.name, { type: t as SignVariableType })
                      }
                    >
                      <SelectTrigger className="h-9 w-[130px] bg-background/60 text-[12px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VARIABLE_TYPES.map((t) => {
                          const I = t.icon;
                          return (
                            <SelectItem key={t.value} value={t.value}>
                              <span className="inline-flex items-center gap-2">
                                <I className="w-3.5 h-3.5" />
                                {t.label}
                              </span>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Input
                      value={v.defaultValue ?? ""}
                      onChange={(e) =>
                        updateVariable(v.name, { defaultValue: e.target.value })
                      }
                      placeholder="Example value"
                      className="h-9 bg-background/60 w-[160px] text-[12.5px]"
                    />
                    <label className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground select-none cursor-pointer">
                      <Switch
                        checked={!!v.required}
                        onCheckedChange={(c) => updateVariable(v.name, { required: c })}
                      />
                      Required
                    </label>
                    <button
                      onClick={() => removeVariable(v.name)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 pl-10 text-[10.5px] text-muted-foreground font-mono">
                    {v.pattern}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={addVariable}
            className="w-full rounded-2xl border border-dashed border-border/60 px-4 py-3 text-[12.5px] text-muted-foreground hover:text-foreground hover:border-border transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add another variable
          </button>
        </>
      )}
    </div>
  );
}

function StepDelivery({
  delivery,
  setDelivery,
  automation,
  setAutomation,
}: {
  delivery: SignTemplateDelivery;
  setDelivery: React.Dispatch<React.SetStateAction<SignTemplateDelivery>>;
  automation: SignTemplateAutomation;
  setAutomation: React.Dispatch<React.SetStateAction<SignTemplateAutomation>>;
}) {
  const [ccInput, setCcInput] = useState("");
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Delivery & automation"
        sub="How the email looks, when it expires, and how reminders are sent."
      />

      {/* Delivery card */}
      <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <h3 className="text-[13px] font-semibold">Delivery</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldLabel text="Email subject">
            <Input
              value={delivery.emailSubject ?? ""}
              onChange={(e) => setDelivery((d) => ({ ...d, emailSubject: e.target.value }))}
              placeholder="Please sign: {{COMPANY_NAME}}"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
          <FieldLabel text="Branded sender name">
            <Input
              value={delivery.senderName ?? ""}
              onChange={(e) => setDelivery((d) => ({ ...d, senderName: e.target.value }))}
              placeholder="Acme Studio"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
        </div>

        <FieldLabel text="Custom message">
          <Textarea
            value={delivery.emailMessage ?? ""}
            onChange={(e) => setDelivery((d) => ({ ...d, emailMessage: e.target.value }))}
            placeholder="Add a personal note. Variables like {{CLIENT_NAME}} are filled in automatically."
            className="bg-background/60 text-[13px] min-h-[100px]"
          />
        </FieldLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldLabel text="Expires after">
            <div className="relative">
              <Input
                type="number"
                min={1}
                max={365}
                value={delivery.expiryDays ?? 14}
                onChange={(e) =>
                  setDelivery((d) => ({ ...d, expiryDays: Number(e.target.value) || 1 }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days
              </span>
            </div>
          </FieldLabel>
          <FieldLabel text="Redirect after signing">
            <Input
              value={delivery.redirectUrl ?? ""}
              onChange={(e) => setDelivery((d) => ({ ...d, redirectUrl: e.target.value }))}
              placeholder="https://acme.com/thanks"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
        </div>

        <FieldLabel text="CC recipients">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/50 bg-background/60 px-2 py-1.5 min-h-[36px]">
            {(delivery.ccEmails ?? []).map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1 h-6 pl-2 pr-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium"
              >
                {email}
                <button
                  onClick={() =>
                    setDelivery((d) => ({
                      ...d,
                      ccEmails: (d.ccEmails ?? []).filter((e) => e !== email),
                    }))
                  }
                  className="p-0.5 rounded hover:bg-primary/20"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            <input
              value={ccInput}
              onChange={(e) => setCcInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === ",") && ccInput.trim()) {
                  e.preventDefault();
                  const email = ccInput.trim().replace(/,$/, "");
                  if (/.+@.+\..+/.test(email)) {
                    setDelivery((d) => ({
                      ...d,
                      ccEmails: Array.from(new Set([...(d.ccEmails ?? []), email])),
                    }));
                    setCcInput("");
                  } else {
                    toast.error("Enter a valid email address.");
                  }
                }
              }}
              placeholder={
                (delivery.ccEmails ?? []).length === 0 ? "name@company.com" : ""
              }
              className="flex-1 min-w-[140px] bg-transparent outline-none text-[12.5px] py-1"
            />
          </div>
        </FieldLabel>

        <label className="inline-flex items-center gap-2 text-[12px] text-foreground/80 cursor-pointer">
          <Switch
            checked={!!delivery.allowDownload}
            onCheckedChange={(c) => setDelivery((d) => ({ ...d, allowDownload: c }))}
          />
          Allow recipients to download the signed document
        </label>
      </div>

      {/* Automation card */}
      <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="text-[13px] font-semibold">Automation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FieldLabel text="Reminder every">
            <div className="relative">
              <Input
                type="number"
                min={0}
                value={automation.remindEveryDays ?? 0}
                onChange={(e) =>
                  setAutomation((a) => ({ ...a, remindEveryDays: Number(e.target.value) || 0 }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days
              </span>
            </div>
          </FieldLabel>
          <FieldLabel text="Expiry warning">
            <div className="relative">
              <Input
                type="number"
                min={0}
                value={automation.expiryWarningDays ?? 0}
                onChange={(e) =>
                  setAutomation((a) => ({
                    ...a,
                    expiryWarningDays: Number(e.target.value) || 0,
                  }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days before
              </span>
            </div>
          </FieldLabel>
          <FieldLabel text="Escalate after">
            <div className="relative">
              <Input
                type="number"
                min={0}
                value={automation.escalateAfterDays ?? 0}
                onChange={(e) =>
                  setAutomation((a) => ({
                    ...a,
                    escalateAfterDays: Number(e.target.value) || 0,
                  }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days
              </span>
            </div>
          </FieldLabel>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <label className="inline-flex items-center gap-2 text-[12px] text-foreground/80 cursor-pointer">
            <Switch
              checked={!!automation.notifyOnOpen}
              onCheckedChange={(c) => setAutomation((a) => ({ ...a, notifyOnOpen: c }))}
            />
            Notify me when opened
          </label>
          <label className="inline-flex items-center gap-2 text-[12px] text-foreground/80 cursor-pointer">
            <Switch
              checked={!!automation.notifyOnComplete}
              onCheckedChange={(c) => setAutomation((a) => ({ ...a, notifyOnComplete: c }))}
            />
            Notify me when completed
          </label>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 6 — REVIEW & SAVE
 * ────────────────────────────────────────────────────────── */

function StepReview({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  documents,
  roles,
  variables,
  fields,
  delivery,
  automation,
  filenamePattern,
  setFilenamePattern,
  previewMode,
  setPreviewMode,
}: {
  name: string;
  setName: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  documents: BuilderDoc[];
  roles: SignTemplateRole[];
  variables: SignTemplateVariable[];
  fields: SignTemplateField[];
  delivery: SignTemplateDelivery;
  automation: SignTemplateAutomation;
  filenamePattern: string;
  setFilenamePattern: (s: string) => void;
  previewMode: "sender" | "recipient" | "email" | "filename";
  setPreviewMode: (m: "sender" | "recipient" | "email" | "filename") => void;
}) {
  // Synthesize example values from variable defaults / labels
  const sample = useMemo(() => {
    const obj: Record<string, string> = { TEMPLATE_NAME: name || "Template" };
    variables.forEach((v) => {
      obj[v.name] = v.defaultValue || `[${v.label}]`;
    });
    return obj;
  }, [variables, name]);

  const previewSubject = applyTemplateVariables(delivery.emailSubject ?? "", sample);
  const previewMessage = applyTemplateVariables(delivery.emailMessage ?? "", sample);
  const previewFilename = applyTemplateVariables(filenamePattern, sample);

  const tabs: { key: typeof previewMode; label: string }[] = [
    { key: "sender", label: "Sender preview" },
    { key: "recipient", label: "Recipient preview" },
    { key: "email", label: "Email" },
    { key: "filename", label: "Final PDF" },
  ];

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Review & save"
        sub="Name your template, set the output filename, and preview how it'll look."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* Left: meta + filename */}
        <div className="space-y-4">
          <FieldLabel text="Template name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Agency Client Agreement"
              className="h-10 bg-background/60"
            />
          </FieldLabel>

          <FieldLabel text="Description (optional)">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this template is for, who uses it."
              className="bg-background/60 text-[13px] min-h-[70px]"
            />
          </FieldLabel>

          <div className="grid grid-cols-2 gap-3">
            <FieldLabel text="Category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 bg-background/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldLabel>
            <FieldLabel text="Output filename">
              <Input
                value={filenamePattern}
                onChange={(e) => setFilenamePattern(e.target.value)}
                placeholder="{{COMPANY_NAME}} - NDA - Signed.pdf"
                className="h-10 bg-background/60 font-mono text-[12.5px]"
              />
            </FieldLabel>
          </div>

          {variables.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-card/30 px-3 py-2.5">
              <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                Available tokens
              </div>
              <div className="flex flex-wrap gap-1.5">
                {variables.map((v) => (
                  <button
                    key={v.name}
                    onClick={() =>
                      setFilenamePattern((filenamePattern + ` ${v.pattern}`).trim())
                    }
                    className="text-[10.5px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {v.pattern}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <SummaryStat label="Files" value={documents.length} icon={FileStack} />
            <SummaryStat label="Roles" value={roles.length} icon={UserIcon} />
            <SummaryStat label="Variables" value={variables.length} icon={Braces} />
            <SummaryStat label="Fields" value={fields.length} icon={PenTool} />
          </div>
        </div>

        {/* Right: preview */}
        <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
          <div className="flex border-b border-border/40 bg-muted/20">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setPreviewMode(t.key)}
                className={cn(
                  "flex-1 px-2 py-2 text-[11px] font-medium transition-colors",
                  previewMode === t.key
                    ? "text-primary bg-background/60 border-b-2 border-primary -mb-px"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4 min-h-[280px] text-[12.5px] leading-relaxed">
            {previewMode === "sender" && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  What you'll see when launching
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 space-y-2">
                  {variables.length === 0 && (
                    <p className="text-muted-foreground italic">
                      No variables to fill. Recipients can be added and document sent immediately.
                    </p>
                  )}
                  {variables.map((v) => (
                    <div key={v.name} className="flex items-baseline justify-between gap-3">
                      <span className="text-muted-foreground text-[11px]">{v.label}</span>
                      <span className="font-medium truncate">
                        {v.defaultValue || `[${v.label}]`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {previewMode === "recipient" && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  What signers will experience
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 space-y-2">
                  <div className="text-[12px]">
                    <span className="font-medium">{roles[0]?.label ?? "Signer"}</span> signs first
                    {roles.length > 1 && `, then ${roles.slice(1).map((r) => r.label).join(", ")}`}.
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">
                    {fields.filter((f) => f.type === "signature").length} signature
                    {fields.filter((f) => f.type === "signature").length === 1 ? "" : "s"} ·{" "}
                    {fields.length} total field{fields.length === 1 ? "" : "s"} across{" "}
                    {documents.length} document{documents.length === 1 ? "" : "s"}.
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">
                    Expires after {delivery.expiryDays ?? 14} days
                    {automation.remindEveryDays
                      ? `, reminders every ${automation.remindEveryDays} day${automation.remindEveryDays === 1 ? "" : "s"}.`
                      : "."}
                  </div>
                </div>
              </div>
            )}

            {previewMode === "email" && (
              <div className="rounded-lg border border-border/40 bg-background/80 overflow-hidden">
                <div className="border-b border-border/40 px-3 py-2 bg-muted/20 text-[11px] text-muted-foreground space-y-0.5">
                  <div>
                    <span className="font-medium text-foreground/80">From: </span>
                    {delivery.senderName || "You"} via Docsora
                  </div>
                  <div>
                    <span className="font-medium text-foreground/80">Subject: </span>
                    {previewSubject || <span className="italic">No subject</span>}
                  </div>
                </div>
                <div className="p-3 whitespace-pre-wrap text-[12.5px] text-foreground/85">
                  {previewMessage || (
                    <span className="italic text-muted-foreground">No message</span>
                  )}
                  <div className="mt-3 pt-3 border-t border-border/30 inline-flex items-center gap-1.5 text-primary text-[12px] font-medium">
                    <Send className="w-3 h-3" /> Review & sign
                  </div>
                </div>
              </div>
            )}

            {previewMode === "filename" && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Signed PDF will be saved as
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-mono text-[12.5px] truncate">
                    {previewFilename || filenamePattern}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Personalization variables are filled in automatically before sending.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * Small UI primitives
 * ────────────────────────────────────────────────────────── */

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold tracking-tight">{title}</h2>
      <p className="text-[12.5px] text-muted-foreground mt-1 max-w-2xl leading-relaxed">{sub}</p>
    </div>
  );
}

function FieldLabel({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
        {text}
      </span>
      {children}
    </label>
  );
}

function MicroLabel({
  text,
  icon: Icon,
}: {
  text: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="text-[10.5px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 inline-flex items-center gap-1.5">
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </div>
  );
}

function SummaryStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="text-[18px] font-semibold tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 4 — CUSTOMIZE BEFORE SENDING
 * "Click anything in your document that changes each time."
 * ────────────────────────────────────────────────────────── */

function StepLaunchExperience({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  documents,
  roles,
  variables,
  addVariable,
  updateVariable,
  removeVariable,
  addVariableWith,
  fields,
  delivery,
  setDelivery,
  automation,
  setAutomation,
  filenamePattern,
  setFilenamePattern,
  signingMode,
}: {
  name: string;
  setName: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  documents: BuilderDoc[];
  roles: SignTemplateRole[];
  variables: SignTemplateVariable[];
  addVariable: () => void;
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void;
  removeVariable: (name: string) => void;
  addVariableWith: (label: string, type?: SignVariableType, required?: boolean) => string;
  fields: SignTemplateField[];
  delivery: SignTemplateDelivery;
  setDelivery: React.Dispatch<React.SetStateAction<SignTemplateDelivery>>;
  automation: SignTemplateAutomation;
  setAutomation: React.Dispatch<React.SetStateAction<SignTemplateAutomation>>;
  filenamePattern: string;
  setFilenamePattern: (s: string) => void;
  signingMode: "sequential" | "parallel";
}) {
  const [activeDocId, setActiveDocId] = useState<string>(documents[0]?.id ?? "");
  const [openLaunchPreview, setOpenLaunchPreview] = useState(false);

  useEffect(() => {
    if (!documents.find((d) => d.id === activeDocId) && documents[0]) {
      setActiveDocId(documents[0].id);
    }
  }, [documents, activeDocId]);

  const activeDoc = documents.find((d) => d.id === activeDocId) ?? documents[0];
  const activeBody = DOC_BODY_BY_TAG[activeDoc?.tag ?? "agreement"] ?? DOC_BODY_BY_TAG.agreement;

  // A variable belongs to the active document if its example text appears in it.
  const activeDocVars = useMemo(() => {
    const joined = activeBody.paragraphs.join("\n");
    return variables.filter((v) => v.defaultValue && joined.includes(v.defaultValue));
  }, [variables, activeBody]);

  const sample = useMemo(() => {
    const obj: Record<string, string> = { TEMPLATE_NAME: name || "Template" };
    variables.forEach((v) => {
      obj[v.name] = v.defaultValue || `[${v.label}]`;
    });
    return obj;
  }, [variables, name]);

  const previewSubject = applyTemplateVariables(delivery.emailSubject ?? "", sample);
  const previewFilename = applyTemplateVariables(filenamePattern, sample);
  const requiredVars = variables.filter((v) => v.required);
  const signerCount = roles.filter((r) => (r.type ?? "signer") === "signer").length;

  return (
    <div className="space-y-8">
      {/* Hero header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10.5px] font-medium">
          <Sparkles className="w-3 h-3" /> Customize before sending
        </div>
        <h2 className="text-[28px] md:text-[34px] leading-[1.05] font-semibold tracking-tight">
          Select anything that changes each time.
        </h2>
        <p className="text-[13.5px] text-muted-foreground max-w-2xl">
          Highlight text inside your document — like a name, date or amount — and mark it editable.
          You&rsquo;ll fill it in each time you launch this template.
        </p>
      </div>

      {/* Premium document switcher */}
      {documents.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1 snap-x">
          {documents.map((d) => {
            const active = d.id === activeDocId;
            const body = DOC_BODY_BY_TAG[d.tag ?? "agreement"] ?? DOC_BODY_BY_TAG.agreement;
            const joined = body.paragraphs.join("\n");
            const docVarCount = variables.filter(
              (v) => v.defaultValue && joined.includes(v.defaultValue),
            ).length;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDocId(d.id)}
                className={cn(
                  "snap-start shrink-0 text-left rounded-2xl border p-4 w-[240px] transition-all",
                  active
                    ? "border-primary/60 bg-primary/[0.06] shadow-[0_8px_30px_-12px_hsl(var(--primary)/0.25)]"
                    : "border-border/50 bg-card/30 hover:bg-card/50 hover:border-border",
                )}
              >
                <div
                  className={cn(
                    "w-9 h-11 rounded-md mb-3 flex items-center justify-center",
                    active ? "bg-primary/15 text-primary" : "bg-muted/50 text-muted-foreground",
                  )}
                >
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-[13px] font-semibold truncate">{d.name}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {docVarCount} editable {docVarCount === 1 ? "field" : "fields"}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main split: document viewer + What changes summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
        {/* Document paper */}
        <div className="rounded-3xl border border-border/50 bg-gradient-to-b from-card/40 to-card/10 p-4 md:p-6">
          <div className="rounded-2xl bg-background shadow-[0_30px_80px_-20px_hsl(var(--foreground)/0.12)] border border-border/40 overflow-hidden">
            {/* Doc topbar */}
            <div className="px-7 py-3 border-b border-border/40 flex items-center justify-between bg-muted/20">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <div className="text-[12px] font-medium truncate">{activeDoc?.name ?? "Document"}</div>
              </div>
              <div className="text-[10.5px] text-muted-foreground">Page 1</div>
            </div>

            <DocumentCanvas
              title={activeBody.title}
              category={category}
              paragraphs={activeBody.paragraphs}
              variables={variables}
              addVariableWith={addVariableWith}
              updateVariable={updateVariable}
              removeVariable={removeVariable}
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-primary/60" />
            Tip: highlight any text in the document above to make it editable.
          </div>
        </div>

        {/* What changes panel */}
        <aside className="rounded-3xl border border-border/50 bg-card/30 p-5 h-fit lg:sticky lg:top-6 space-y-4">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
              In this document
            </div>
            <div className="text-[15px] font-semibold tracking-tight mt-0.5">
              {activeDocVars.length} {activeDocVars.length === 1 ? "thing" : "things"} change each time
            </div>
          </div>

          <div className="space-y-1.5">
            {activeDocVars.length === 0 ? (
              <p className="text-[12px] text-muted-foreground italic">
                Nothing highlighted yet. Add a highlight from the document.
              </p>
            ) : (
              activeDocVars.map((v) => {
                const meta = variableTypeMeta(v.type);
                const Icon = meta.icon;
                return (
                  <div
                    key={v.name}
                    className="flex items-center gap-2.5 rounded-xl border border-border/40 bg-background/60 px-3 py-2"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12.5px] font-medium truncate">{v.label}</div>
                      <div className="text-[10.5px] text-muted-foreground capitalize">
                        {humanTypeLabel(v.type)}
                        {v.required ? " · required" : ""}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={() => setOpenLaunchPreview((v) => !v)}
            className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-border/50 bg-background/60 px-3 py-2.5 text-[12px] font-medium hover:bg-background transition-colors"
          >
            <span className="inline-flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-primary" /> Preview the launch
            </span>
            <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", openLaunchPreview && "rotate-180")} />
          </button>
          <AnimatePresence initial={false}>
            {openLaunchPreview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-border/40 bg-background/80 p-4 space-y-3">
                  <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Before sending you&rsquo;ll be asked
                  </div>
                  {(requiredVars.length > 0 ? requiredVars : variables).slice(0, 5).map((v) => (
                    <div key={v.name} className="space-y-1">
                      <label className="text-[12px] font-medium">
                        {launchQuestionFor(v)}
                      </label>
                      <div className="h-9 rounded-lg border border-dashed border-border/60 bg-muted/20 flex items-center px-3 text-[11.5px] text-muted-foreground">
                        {v.defaultValue || `Enter ${v.label.toLowerCase()}`}
                      </div>
                    </div>
                  ))}
                  {variables.length === 0 && (
                    <p className="text-[12px] text-muted-foreground italic">
                      No questions — launches immediately.
                    </p>
                  )}
                  <div className="pt-1 flex justify-end">
                    <div className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-primary text-primary-foreground text-[12px] font-medium opacity-80">
                      <Send className="w-3 h-3" /> Send
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <SummaryStat label="Documents" value={documents.length} icon={FileStack} />
            <SummaryStat label="Signers" value={signerCount} icon={PenTool} />
            <SummaryStat label="Fields" value={fields.length} icon={Type} />
            <SummaryStat label="Expires" value={delivery.expiryDays ?? 14} icon={Clock} />
          </div>
        </aside>
      </div>

      {/* Recipient Experience */}
      <RecipientExperience
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        filenamePattern={filenamePattern}
        setFilenamePattern={setFilenamePattern}
        variables={variables}
        delivery={delivery}
        setDelivery={setDelivery}
        automation={automation}
        setAutomation={setAutomation}
        sample={sample}
      />

    </div>
  );
}

function VariableCardList({
  title,
  vars,
  updateVariable,
  removeVariable,
}: {
  title: string;
  vars: SignTemplateVariable[];
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void;
  removeVariable: (name: string) => void;
}) {
  if (vars.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/20 px-5 py-8 text-center">
        <p className="text-[12.5px] text-muted-foreground">
          No questions for this document yet.
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <MicroLabel text={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {vars.map((v) => {
          const meta = variableTypeMeta(v.type);
          const Icon = meta.icon;
          return (
            <div
              key={v.name}
              className="group rounded-2xl border border-border/50 bg-card/40 hover:bg-card/60 transition-colors p-3.5 space-y-2.5"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    value={v.label}
                    onChange={(e) => updateVariable(v.name, { label: e.target.value })}
                    placeholder="Label"
                    className="h-8 bg-background/60 text-[13px] font-medium border-transparent hover:border-border focus:border-border px-2"
                  />
                  <div className="text-[10px] font-mono text-muted-foreground/70 mt-0.5 px-2 truncate">
                    {v.pattern}
                  </div>
                </div>
                <button
                  onClick={() => removeVariable(v.name)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={v.type}
                  onValueChange={(t) => updateVariable(v.name, { type: t as SignVariableType })}
                >
                  <SelectTrigger className="h-8 flex-1 bg-background/60 text-[12px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VARIABLE_TYPES.map((t) => {
                      const I = t.icon;
                      return (
                        <SelectItem key={t.value} value={t.value}>
                          <span className="inline-flex items-center gap-2">
                            <I className="w-3.5 h-3.5" />
                            {t.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <label className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground select-none cursor-pointer shrink-0">
                  <Switch
                    checked={!!v.required}
                    onCheckedChange={(c) => updateVariable(v.name, { required: c })}
                  />
                  Required
                </label>
              </div>
              <Input
                value={v.defaultValue ?? ""}
                onChange={(e) => updateVariable(v.name, { defaultValue: e.target.value })}
                placeholder="Example value (e.g. Acme Inc)"
                className="h-8 bg-background/60 text-[12.5px]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecipientStep({
  n,
  title,
  body,
  icon: Icon,
}: {
  n: number;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/60 p-3.5 space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10.5px] font-semibold tabular-nums">
          {n}
        </div>
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div>
        <div className="text-[12.5px] font-semibold tracking-tight">{title}</div>
        <div className="text-[11.5px] text-muted-foreground mt-0.5 line-clamp-2">{body}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * DocumentCanvas — renders the document and lets the user
 * select any text to mark it editable.
 * ────────────────────────────────────────────────────────── */
function DocumentCanvas({
  title,
  category,
  paragraphs,
  variables,
  addVariableWith,
  updateVariable,
  removeVariable,
}: {
  title: string;
  category: string;
  paragraphs: string[];
  variables: SignTemplateVariable[];
  addVariableWith: (label: string, type?: SignVariableType, required?: boolean) => string;
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void;
  removeVariable: (name: string) => void;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const [selection, setSelection] = useState<{
    text: string;
    rect: { top: number; left: number };
  } | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleMouseUp = useCallback(() => {
    // Defer so selection state is committed
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        if (!pickerOpen) setSelection(null);
        return;
      }
      const text = sel.toString().trim();
      if (!text || text.length > 80) {
        setSelection(null);
        return;
      }
      const node = sel.anchorNode;
      const article = articleRef.current;
      if (!article || !node || !article.contains(node.parentElement)) {
        setSelection(null);
        return;
      }
      // Don't allow selections that overlap existing highlights
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const articleRect = article.getBoundingClientRect();
      setSelection({
        text,
        rect: {
          top: rect.top - articleRect.top - 8,
          left: rect.left - articleRect.left + rect.width / 2,
        },
      });
    }, 10);
  }, [pickerOpen]);

  const confirmHighlight = (label: string, type: SignVariableType) => {
    if (!selection) return;
    // Use selected text as the example value and the source text rendered in the doc.
    addVariableWith(label, type, true);
    // Update the just-added variable's defaultValue to the exact selected text
    // so it gets wrapped in the document.
    // addVariableWith already sets defaultValue=""; patch it below.
    setTimeout(() => {
      const token = toToken(label);
      updateVariable(token, { defaultValue: selection.text });
    }, 0);
    window.getSelection()?.removeAllRanges();
    setSelection(null);
    setPickerOpen(false);
  };

  return (
    <div className="relative">
      <article
        ref={articleRef}
        onMouseUp={handleMouseUp}
        className="relative px-8 md:px-14 py-10 md:py-14 space-y-5 selection:bg-primary/25 selection:text-foreground"
      >
        <header className="space-y-1.5 pb-4 border-b border-border/30">
          <div className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
            {category || "Agreement"}
          </div>
          <h3 className="text-[22px] font-semibold tracking-tight">{title}</h3>
        </header>
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[13.5px] leading-[1.75] text-foreground/85">
            {renderParagraph(p, variables, updateVariable, removeVariable)}
          </p>
        ))}

        {/* Floating selection toolbar */}
        {selection && (
          <SelectionPopover
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            text={selection.text}
            top={selection.rect.top}
            left={selection.rect.left}
            onConfirm={confirmHighlight}
            onDismiss={() => {
              setSelection(null);
              setPickerOpen(false);
              window.getSelection()?.removeAllRanges();
            }}
          />
        )}
      </article>
    </div>
  );
}

/* Render a paragraph, wrapping any occurrence of a variable's
 * defaultValue with a HighlightSpan. Longest values matched first. */
function renderParagraph(
  text: string,
  variables: SignTemplateVariable[],
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void,
  removeVariable: (name: string) => void,
): React.ReactNode {
  const matches: { start: number; end: number; v: SignTemplateVariable }[] = [];
  const candidates = variables
    .filter((v) => v.defaultValue && v.defaultValue.length > 0)
    .sort((a, b) => (b.defaultValue?.length ?? 0) - (a.defaultValue?.length ?? 0));

  for (const v of candidates) {
    const needle = v.defaultValue as string;
    let from = 0;
    while (true) {
      const idx = text.indexOf(needle, from);
      if (idx === -1) break;
      const overlaps = matches.some(
        (m) => !(idx + needle.length <= m.start || idx >= m.end),
      );
      if (!overlaps) matches.push({ start: idx, end: idx + needle.length, v });
      from = idx + needle.length;
    }
  }
  matches.sort((a, b) => a.start - b.start);

  const out: React.ReactNode[] = [];
  let cur = 0;
  matches.forEach((m, i) => {
    if (m.start > cur) out.push(<span key={`t${i}`}>{text.slice(cur, m.start)}</span>);
    out.push(
      <HighlightSpan
        key={`h${i}`}
        variable={m.v}
        updateVariable={updateVariable}
        removeVariable={removeVariable}
      />,
    );
    cur = m.end;
  });
  if (cur < text.length) out.push(<span key="rest">{text.slice(cur)}</span>);
  return out;
}

function SelectionPopover({
  open,
  onOpenChange,
  text,
  top,
  left,
  onConfirm,
  onDismiss,
}: {
  open: boolean;
  onOpenChange: (b: boolean) => void;
  text: string;
  top: number;
  left: number;
  onConfirm: (label: string, type: SignVariableType) => void;
  onDismiss: () => void;
}) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<SignVariableType>("text");

  useEffect(() => {
    setLabel("");
    setType("text");
  }, [text]);

  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-full"
      style={{ top, left }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-foreground text-background text-[12px] font-medium shadow-[0_10px_30px_-8px_hsl(var(--foreground)/0.35)] hover:opacity-95 transition-opacity"
          >
            <Plus className="w-3.5 h-3.5" /> Make editable
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          side="top"
          className="w-80 p-4 space-y-3"
          onInteractOutside={onDismiss}
        >
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
              Selected
            </div>
            <div className="text-[13px] font-semibold mt-0.5 truncate" title={text}>
              &ldquo;{text}&rdquo;
            </div>
          </div>
          <FieldLabel text="Name this field">
            <Input
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!label.trim()) {
                    toast.error("Give this field a name.");
                    return;
                  }
                  onConfirm(label.trim(), type);
                }
              }}
              placeholder="e.g. Client name"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
          <FieldLabel text="What kind of information is this?">
            <Select value={type} onValueChange={(t) => setType(t as SignVariableType)}>
              <SelectTrigger className="h-9 bg-background/60 text-[13px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {HUMAN_TYPES.map((t) => {
                  const I = t.icon;
                  return (
                    <SelectItem key={t.value} value={t.value}>
                      <span className="inline-flex items-center gap-2">
                        <I className="w-3.5 h-3.5" />
                        {t.label}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </FieldLabel>
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={onDismiss} className="h-9">
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (!label.trim()) {
                  toast.error("Give this field a name.");
                  return;
                }
                onConfirm(label.trim(), type);
              }}
              className="h-9"
            >
              Make editable
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function HighlightSpan({
  variable,
  updateVariable,
  removeVariable,
}: {
  variable: SignTemplateVariable;
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void;
  removeVariable: (name: string) => void;
}) {
  const meta = variableTypeMeta(variable.type);
  const Icon = meta.icon;
  const preview = variable.defaultValue || `[${variable.label}]`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group relative inline-flex items-center gap-1 align-baseline px-1.5 mx-0.5 rounded-md border border-primary/30 bg-primary/10 text-foreground hover:bg-primary/15 hover:border-primary/50 transition-colors text-[13px] font-medium leading-snug"
        >
          <Icon className="w-3 h-3 text-primary opacity-80" />
          <span>{preview}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 p-4 space-y-3">
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
            What changes here?
          </div>
          <div className="text-[13px] font-semibold mt-0.5">Describe this highlight</div>
        </div>
        <FieldLabel text="Name this">
          <Input
            value={variable.label}
            onChange={(e) => updateVariable(variable.name, { label: e.target.value })}
            placeholder="e.g. Client name"
            className="h-9 bg-background/60 text-[13px]"
          />
        </FieldLabel>
        <FieldLabel text="What kind of information is this?">
          <Select
            value={variable.type}
            onValueChange={(t) => updateVariable(variable.name, { type: t as SignVariableType })}
          >
            <SelectTrigger className="h-9 bg-background/60 text-[13px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {HUMAN_TYPES.map((t) => {
                const I = t.icon;
                return (
                  <SelectItem key={t.value} value={t.value}>
                    <span className="inline-flex items-center gap-2">
                      <I className="w-3.5 h-3.5" />
                      {t.label}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FieldLabel>
        <FieldLabel text="Example">
          <Input
            value={variable.defaultValue ?? ""}
            onChange={(e) => updateVariable(variable.name, { defaultValue: e.target.value })}
            placeholder="e.g. Acme Inc"
            className="h-9 bg-background/60 text-[13px]"
          />
        </FieldLabel>
        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex items-center gap-2 text-[12px] text-muted-foreground select-none cursor-pointer">
            <Switch
              checked={!!variable.required}
              onCheckedChange={(c) => updateVariable(variable.name, { required: c })}
            />
            Always ask for this
          </label>
          <button
            onClick={() => removeVariable(variable.name)}
            className="text-[11.5px] text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" /> Remove
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}


/* ──────────────────────────────────────────────────────────
 * RecipientExperience — premium live email editor + preview.
 * Replaces the old "Delivery & automation" form.
 * ────────────────────────────────────────────────────────── */

type Tone = "professional" | "friendly" | "minimal" | "luxury" | "corporate";

const TONE_PRESETS: { value: Tone; label: string; hint: string }[] = [
  { value: "professional", label: "Professional", hint: "Polished & clear" },
  { value: "friendly", label: "Friendly", hint: "Warm & human" },
  { value: "minimal", label: "Minimal", hint: "Short & direct" },
  { value: "luxury", label: "Luxury", hint: "Considered & refined" },
  { value: "corporate", label: "Corporate", hint: "Formal & structured" },
];

function pickVarToken(variables: SignTemplateVariable[], hints: string[]): string | null {
  for (const h of hints) {
    const v = variables.find((x) => x.label.toLowerCase().includes(h));
    if (v) return `{{${v.name}}}`;
  }
  return null;
}

function generateAIEmail(
  category: string,
  tone: Tone,
  templateName: string,
  variables: SignTemplateVariable[],
): { subject: string; message: string } {
  const clientToken = pickVarToken(variables, ["client", "recipient", "name"]) ?? "{{CLIENT_NAME}}";
  const companyToken = pickVarToken(variables, ["company", "business", "studio"]) ?? null;
  const senderLine = companyToken ? `the team at ${companyToken}` : "the team";
  const titleish = templateName || category;

  const opener =
    tone === "friendly"
      ? `Hi ${clientToken},`
      : tone === "minimal"
      ? `${clientToken},`
      : tone === "luxury"
      ? `Dear ${clientToken},`
      : tone === "corporate"
      ? `Dear ${clientToken},`
      : `Hello ${clientToken},`;

  const closing =
    tone === "friendly"
      ? "Thanks so much,"
      : tone === "minimal"
      ? "Thanks,"
      : tone === "luxury"
      ? "With appreciation,"
      : tone === "corporate"
      ? "Best regards,"
      : "Kind regards,";

  const body: Record<string, string> = {
    HR:
      tone === "minimal"
        ? `Your onboarding paperwork is ready. Please review and sign.`
        : `Welcome aboard — we’re glad to have you with ${senderLine}. Below you’ll find your onboarding paperwork. It only takes a few minutes to review and sign.`,
    Client:
      tone === "minimal"
        ? `Your agreement is ready. Please review and sign below.`
        : `Thanks for choosing to work with ${senderLine}. Your ${titleish.toLowerCase()} is ready — please take a moment to review and sign below.`,
    Legal:
      tone === "minimal"
        ? `Please review and sign the attached document.`
        : `Please find the attached ${titleish.toLowerCase()} for your review. Once you’ve had a chance to read through it, please sign at your convenience.`,
    Sales:
      tone === "minimal"
        ? `Your proposal is ready. Please review and sign.`
        : `Excited to move forward with you. Your ${titleish.toLowerCase()} is ready below — review and sign whenever you’re ready.`,
    Other:
      tone === "minimal"
        ? `Please review and sign below.`
        : `Please take a moment to review and sign the document below. Let us know if you have any questions.`,
  };

  const message = `${opener}\n\n${body[category] ?? body.Other}\n\n${closing}`;
  const subjectBase =
    category === "HR"
      ? "Your onboarding documents"
      : category === "Sales"
      ? "Your proposal is ready to sign"
      : category === "Legal"
      ? "Please review and sign"
      : `Please sign: ${titleish}`;

  return { subject: subjectBase, message };
}

/** Render text with {{TOKEN}} placeholders replaced by styled inline pills. */
function renderEmailWithPills(
  text: string,
  variables: SignTemplateVariable[],
): React.ReactNode[] {
  if (!text) return [];
  const parts: React.ReactNode[] = [];
  const re = /\{\{([A-Z0-9_]+)\}\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(<span key={`t${i++}`}>{text.slice(last, m.index)}</span>);
    const v = variables.find((x) => x.name === m![1]);
    const label = v?.label ?? m[1].replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    parts.push(
      <span
        key={`p${i++}`}
        className="inline-flex items-center align-baseline rounded-md bg-primary/10 text-primary px-1.5 py-0.5 text-[12.5px] font-medium mx-[1px]"
      >
        {label}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(<span key={`t${i++}`}>{text.slice(last)}</span>);
  return parts;
}

function InsertTokenButton({
  variables,
  onInsert,
  label = "Insert detail",
}: {
  variables: SignTemplateVariable[];
  onInsert: (token: string) => void;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-border/60 bg-background/60 text-[11.5px] font-medium text-foreground/80 hover:bg-background hover:border-border transition-colors"
        >
          <Plus className="w-3 h-3" /> {label}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1.5">
        <div className="px-2 py-1.5 text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
          Personalize with
        </div>
        {variables.length === 0 ? (
          <div className="px-2 py-3 text-[12px] text-muted-foreground">
            Highlight something in your document first to make it personalizable.
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {variables.map((v) => {
              const meta = variableTypeMeta(v.type);
              const Icon = meta.icon;
              return (
                <button
                  key={v.name}
                  onClick={() => {
                    onInsert(`{{${v.name}}}`);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-[12.5px] hover:bg-muted/60"
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  <span className="flex-1 truncate">{v.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

function RecipientExperience({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  filenamePattern,
  setFilenamePattern,
  variables,
  delivery,
  setDelivery,
  automation,
  setAutomation,
  sample,
}: {
  name: string;
  setName: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  filenamePattern: string;
  setFilenamePattern: (s: string) => void;
  variables: SignTemplateVariable[];
  delivery: SignTemplateDelivery;
  setDelivery: React.Dispatch<React.SetStateAction<SignTemplateDelivery>>;
  automation: SignTemplateAutomation;
  setAutomation: React.Dispatch<React.SetStateAction<SignTemplateAutomation>>;
  sample: Record<string, string>;
}) {
  const [tone, setTone] = useState<Tone>("professional");
  const [editing, setEditing] = useState<"subject" | "body" | null>(null);
  const [openRecipient, setOpenRecipient] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);
  const [openSaving, setOpenSaving] = useState(false);
  const [ccInput, setCcInput] = useState("");

  const subjectRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  // Seed with AI-generated copy if both subject and body are empty
  useEffect(() => {
    if (!delivery.emailSubject && !delivery.emailMessage) {
      const ai = generateAIEmail(category, tone, name, variables);
      setDelivery((d) => ({ ...d, emailSubject: ai.subject, emailMessage: ai.message }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const regenerate = (nextTone?: Tone) => {
    const t = nextTone ?? tone;
    const ai = generateAIEmail(category, t, name, variables);
    setDelivery((d) => ({ ...d, emailSubject: ai.subject, emailMessage: ai.message }));
  };

  const insertAtCaret = (
    target: "subject" | "body",
    token: string,
  ) => {
    if (target === "subject") {
      const el = subjectRef.current;
      const current = delivery.emailSubject ?? "";
      const start = el?.selectionStart ?? current.length;
      const end = el?.selectionEnd ?? current.length;
      const next = current.slice(0, start) + token + current.slice(end);
      setDelivery((d) => ({ ...d, emailSubject: next }));
      requestAnimationFrame(() => {
        el?.focus();
        const pos = start + token.length;
        el?.setSelectionRange(pos, pos);
      });
    } else {
      const el = bodyRef.current;
      const current = delivery.emailMessage ?? "";
      const start = el?.selectionStart ?? current.length;
      const end = el?.selectionEnd ?? current.length;
      const next = current.slice(0, start) + token + current.slice(end);
      setDelivery((d) => ({ ...d, emailMessage: next }));
      requestAnimationFrame(() => {
        el?.focus();
        const pos = start + token.length;
        el?.setSelectionRange(pos, pos);
      });
    }
  };

  const senderName = delivery.senderName || "You";
  const subject = delivery.emailSubject ?? "";
  const body = delivery.emailMessage ?? "";

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
            Recipient Experience
          </div>
          <h3 className="text-[20px] font-semibold tracking-tight mt-1">
            What recipients receive
          </h3>
          <p className="text-[12.5px] text-muted-foreground mt-0.5 max-w-xl">
            Edit the email your client sees. Personalized details appear as soft pills — no syntax to learn.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => regenerate()}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-border/60 bg-background/60 text-[12.5px] font-medium hover:bg-background transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-primary" /> Regenerate
          </button>
          <button
            onClick={() => setOpenRecipient(true)}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-primary text-primary-foreground text-[12.5px] font-medium hover:opacity-90 transition-opacity"
          >
            <Eye className="w-3.5 h-3.5" /> Preview recipient experience
          </button>
        </div>
      </div>

      {/* Tone presets */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-muted-foreground mr-1">Tone</span>
        {TONE_PRESETS.map((t) => {
          const active = tone === t.value;
          return (
            <button
              key={t.value}
              onClick={() => {
                setTone(t.value);
                regenerate(t.value);
              }}
              title={t.hint}
              className={cn(
                "h-7 px-3 rounded-full text-[11.5px] font-medium border transition-colors",
                active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background/60 text-foreground/80 border-border/60 hover:bg-background",
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Split: editor left, live preview right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* EDITOR */}
        <div className="rounded-3xl border border-border/50 bg-card/30 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <PenLine className="w-3.5 h-3.5 text-primary" />
            <div className="text-[11.5px] font-semibold uppercase tracking-wider text-muted-foreground">
              Compose
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-muted-foreground">Subject</label>
              <InsertTokenButton
                variables={variables}
                onInsert={(t) => insertAtCaret("subject", t)}
                label="Add detail"
              />
            </div>
            {editing === "subject" ? (
              <Input
                ref={subjectRef}
                autoFocus
                value={subject}
                onChange={(e) => setDelivery((d) => ({ ...d, emailSubject: e.target.value }))}
                onBlur={() => setEditing(null)}
                placeholder="Please review your agreement"
                className="h-10 bg-background/60 text-[14px] font-medium"
              />
            ) : (
              <button
                onClick={() => setEditing("subject")}
                className="w-full text-left rounded-lg border border-transparent hover:border-border/60 hover:bg-background/40 px-3 py-2 text-[14px] font-medium leading-relaxed transition-colors"
              >
                {subject ? (
                  <span className="flex flex-wrap items-center gap-y-1">
                    {renderEmailWithPills(subject, variables)}
                  </span>
                ) : (
                  <span className="text-muted-foreground italic">Click to write a subject…</span>
                )}
              </button>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] text-muted-foreground">Message</label>
              <InsertTokenButton
                variables={variables}
                onInsert={(t) => insertAtCaret("body", t)}
                label="Add detail"
              />
            </div>
            {editing === "body" ? (
              <Textarea
                ref={bodyRef}
                autoFocus
                value={body}
                onChange={(e) => setDelivery((d) => ({ ...d, emailMessage: e.target.value }))}
                onBlur={() => setEditing(null)}
                placeholder="Write a short, warm note to your recipient…"
                className="bg-background/60 text-[13.5px] min-h-[180px] leading-relaxed"
              />
            ) : (
              <button
                onClick={() => setEditing("body")}
                className="w-full text-left rounded-lg border border-transparent hover:border-border/60 hover:bg-background/40 px-3 py-3 text-[13.5px] leading-relaxed min-h-[180px] whitespace-pre-wrap transition-colors"
              >
                {body ? (
                  <span className="block">{renderEmailWithPills(body, variables)}</span>
                ) : (
                  <span className="text-muted-foreground italic">Click to write your message…</span>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">From</label>
              <Input
                value={delivery.senderName ?? ""}
                onChange={(e) => setDelivery((d) => ({ ...d, senderName: e.target.value }))}
                placeholder="Acme Studio"
                className="h-9 bg-background/60 text-[13px]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] text-muted-foreground">Button label</label>
              <Input
                value={(delivery as any).buttonLabel ?? "Review document"}
                onChange={(e) =>
                  setDelivery((d) => ({ ...(d as any), buttonLabel: e.target.value }))
                }
                placeholder="Review document"
                className="h-9 bg-background/60 text-[13px]"
              />
            </div>
          </div>
        </div>

        {/* LIVE EMAIL PREVIEW */}
        <div className="rounded-3xl border border-border/50 bg-gradient-to-b from-muted/30 to-muted/10 p-5">
          <EmailPreviewCard
            senderName={senderName}
            subject={subject}
            body={body}
            variables={variables}
            buttonLabel={(delivery as any).buttonLabel ?? "Review document"}
            sample={sample}
          />
        </div>
      </div>

      {/* Advanced settings */}
      <Collapsible open={openAdvanced} onOpenChange={setOpenAdvanced}>
        <CollapsibleTrigger className="w-full group">
          <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-card/30 px-5 py-3.5 hover:bg-card/50 transition-colors">
            <div className="text-left flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted/60 flex items-center justify-center">
                <Settings2 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <div className="text-[13px] font-semibold">Advanced settings</div>
                <div className="text-[11.5px] text-muted-foreground">
                  Expiry, reminders & CC
                </div>
              </div>
            </div>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", openAdvanced && "rotate-180")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FieldLabel text="Expires after">
                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    max={365}
                    value={delivery.expiryDays ?? 14}
                    onChange={(e) =>
                      setDelivery((d) => ({ ...d, expiryDays: Number(e.target.value) || 1 }))
                    }
                    className="h-9 bg-background/60 text-[13px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                    days
                  </span>
                </div>
              </FieldLabel>
              <FieldLabel text="Reminder every">
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    value={automation.remindEveryDays ?? 0}
                    onChange={(e) =>
                      setAutomation((a) => ({ ...a, remindEveryDays: Number(e.target.value) || 0 }))
                    }
                    className="h-9 bg-background/60 text-[13px] pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                    days
                  </span>
                </div>
              </FieldLabel>
            </div>

            <FieldLabel text="CC recipients">
              <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/50 bg-background/60 px-2 py-1.5 min-h-[36px]">
                {(delivery.ccEmails ?? []).map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1 h-6 pl-2 pr-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium"
                  >
                    {email}
                    <button
                      onClick={() =>
                        setDelivery((d) => ({
                          ...d,
                          ccEmails: (d.ccEmails ?? []).filter((e) => e !== email),
                        }))
                      }
                      className="p-0.5 rounded hover:bg-primary/20"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
                <input
                  value={ccInput}
                  onChange={(e) => setCcInput(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === ",") && ccInput.trim()) {
                      e.preventDefault();
                      const email = ccInput.trim().replace(/,$/, "");
                      if (/.+@.+\..+/.test(email)) {
                        setDelivery((d) => ({
                          ...d,
                          ccEmails: Array.from(new Set([...(d.ccEmails ?? []), email])),
                        }));
                        setCcInput("");
                      } else {
                        toast.error("Enter a valid email address.");
                      }
                    }
                  }}
                  placeholder={
                    (delivery.ccEmails ?? []).length === 0 ? "name@company.com" : ""
                  }
                  className="flex-1 min-w-[140px] bg-transparent outline-none text-[12.5px] py-1"
                />
              </div>
            </FieldLabel>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Recipient preview overlay */}
      <AnimatePresence>
        {openRecipient && (
          <RecipientPreviewModal
            onClose={() => setOpenRecipient(false)}
            senderName={senderName}
            subject={subject}
            body={body}
            buttonLabel={(delivery as any).buttonLabel ?? "Review document"}
            variables={variables}
            sample={sample}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

const CATEGORY_OPTIONS: { value: string; label: string; icon: any }[] = [
  { value: "Client", label: "Client onboarding", icon: UserCheck },
  { value: "HR", label: "HR", icon: Users },
  { value: "Sales", label: "Sales", icon: Briefcase },
  { value: "Legal", label: "Legal", icon: Scale },
  { value: "Procurement", label: "Procurement", icon: ShoppingCart },
  { value: "Vendor", label: "Vendor management", icon: Building2 },
  { value: "Finance", label: "Finance", icon: Banknote },
  { value: "Other", label: "Other", icon: Folder },
];

const FILENAME_TOKENS: { name: string; label: string }[] = [
  { name: "COMPANY_NAME", label: "Company name" },
  { name: "CLIENT_NAME", label: "Client name" },
  { name: "TEMPLATE_NAME", label: "Template name" },
  { name: "DEAL_VALUE", label: "Deal value" },
];

const FILENAME_PRESETS: { label: string; pattern: string }[] = [
  { label: "[Company] – Signed.pdf", pattern: "{{COMPANY_NAME}} - Signed.pdf" },
  { label: "[Client] – Agreement.pdf", pattern: "{{CLIENT_NAME}} - Agreement.pdf" },
  { label: "[Template] – Completed.pdf", pattern: "{{TEMPLATE_NAME}} - Completed.pdf" },
  { label: "[Company] – [Template] – Signed.pdf", pattern: "{{COMPANY_NAME}} - {{TEMPLATE_NAME}} - Signed.pdf" },
];

function tokenLabel(name: string, variables: SignTemplateVariable[]) {
  const fromVar = variables.find((v) => v.name === name);
  if (fromVar) return fromVar.label;
  const fromList = FILENAME_TOKENS.find((t) => t.name === name);
  if (fromList) return fromList.label;
  return name
    .toLowerCase()
    .split("_")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

function parseFilenamePattern(
  pattern: string,
): { type: "text" | "token"; value: string }[] {
  const re = /\{\{([A-Z0-9_]+)\}\}/g;
  const out: { type: "text" | "token"; value: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(pattern)) !== null) {
    if (m.index > last) out.push({ type: "text", value: pattern.slice(last, m.index) });
    out.push({ type: "token", value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < pattern.length) out.push({ type: "text", value: pattern.slice(last) });
  return out;
}

function TemplateDetailsBlock({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  filenamePattern,
  setFilenamePattern,
  variables,
  sample,
}: {
  name: string;
  setName: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  filenamePattern: string;
  setFilenamePattern: (s: string) => void;
  variables: SignTemplateVariable[];
  sample: Record<string, string>;
}) {
  const parts = parseFilenamePattern(filenamePattern);
  const previewFilename =
    applyTemplateVariables(filenamePattern, {
      ...sample,
      COMPANY_NAME: sample.COMPANY_NAME || "Acme Studio",
      CLIENT_NAME: sample.CLIENT_NAME || "Jordan Mills",
      TEMPLATE_NAME: sample.TEMPLATE_NAME || name || "Agreement",
      DEAL_VALUE: sample.DEAL_VALUE || "$12,000",
    }) || "Untitled.pdf";

  const insertToken = (token: string) => {
    const sep = filenamePattern && !/[\s\-_]$/.test(filenamePattern) ? " - " : "";
    setFilenamePattern(`${filenamePattern}${sep}{{${token}}}`);
  };

  const removePart = (index: number) => {
    const next = parts.filter((_, i) => i !== index).map((p) => (p.type === "token" ? `{{${p.value}}}` : p.value)).join("");
    setFilenamePattern(next.replace(/\s+-\s+-\s+/g, " - ").replace(/^\s*-\s*/, "").replace(/\s*-\s*$/, "").trim());
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-5">
      {/* Template name */}
      <FieldLabel text="Template name">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Agency Client Agreement"
          className="h-10 bg-background/60"
        />
      </FieldLabel>

      {/* Category as visual chips */}
      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          Category
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map((c) => {
            const Icon = c.icon;
            const active = category === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 h-8 pl-2.5 pr-3 rounded-full border text-[12px] font-medium transition-all",
                  active
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-background/60 border-border/60 text-foreground/75 hover:bg-background hover:border-border hover:text-foreground",
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <FieldLabel text="Description (optional)">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Example: Used to onboard new employees and collect signed agreements."
          className="bg-background/60 text-[13px] min-h-[64px]"
        />
      </FieldLabel>

      {/* Downloaded file name */}
      <div className="space-y-3 pt-1">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            Downloaded file name
          </div>
          <p className="text-[11.5px] text-muted-foreground mt-1 leading-relaxed">
            When recipients complete and download this document, this is what the file will be called.
          </p>
        </div>

        {/* Visual pill assembly */}
        <div className="rounded-xl border border-border/60 bg-background/60 px-3 py-2.5 flex flex-wrap items-center gap-1.5 min-h-[46px]">
          {parts.length === 0 && (
            <span className="text-[12.5px] text-muted-foreground/70">
              Start by inserting a token or choosing a suggestion below…
            </span>
          )}
          {parts.map((p, i) =>
            p.type === "token" ? (
              <span
                key={i}
                className="inline-flex items-center gap-1 h-6 pl-2 pr-1 rounded-md bg-primary/10 text-primary text-[11.5px] font-medium border border-primary/15"
              >
                {tokenLabel(p.value, variables)}
                <button
                  type="button"
                  onClick={() => removePart(i)}
                  className="p-0.5 rounded hover:bg-primary/20"
                  aria-label="Remove token"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ) : (
              <input
                key={i}
                value={p.value}
                onChange={(e) => {
                  const next = parts
                    .map((q, j) => (j === i ? { ...q, value: e.target.value } : q))
                    .map((q) => (q.type === "token" ? `{{${q.value}}}` : q.value))
                    .join("");
                  setFilenamePattern(next);
                }}
                className="bg-transparent outline-none text-[13px] text-foreground/85 py-0.5 min-w-[20px]"
                style={{ width: `${Math.max(p.value.length, 1) * 7.5}px` }}
              />
            ),
          )}
          {filenamePattern && (
            <button
              type="button"
              onClick={() => setFilenamePattern("")}
              className="ml-auto text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        {/* Insert tokens */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-muted-foreground mr-1">Insert:</span>
          {FILENAME_TOKENS.map((t) => (
            <button
              key={t.name}
              type="button"
              onClick={() => insertToken(t.name)}
              className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md border border-dashed border-border/70 bg-background/50 hover:bg-background hover:border-primary/40 hover:text-primary text-[11.5px] text-foreground/75 transition-colors"
            >
              <Plus className="w-3 h-3" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Quick suggestions */}
        <div>
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Quick suggestions
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILENAME_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setFilenamePattern(p.pattern)}
                className={cn(
                  "h-7 px-2.5 rounded-md text-[11.5px] border transition-colors",
                  filenamePattern === p.pattern
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-muted/40 border-border/50 text-foreground/70 hover:bg-muted hover:text-foreground",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="rounded-xl bg-muted/40 border border-border/40 px-3.5 py-3">
          <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground">
            Example downloaded file
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="w-7 h-8 rounded-md bg-background border border-border/60 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-[13px] font-medium text-foreground truncate">
              {previewFilename}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailPreviewCard({
  senderName,
  subject,
  body,
  buttonLabel,
  variables,
  sample,
  compact,
}: {
  senderName: string;
  subject: string;
  body: string;
  buttonLabel: string;
  variables: SignTemplateVariable[];
  sample: Record<string, string>;
  compact?: boolean;
}) {
  const initials = (senderName || "Y")
    .split(/\s+/)
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "rounded-2xl bg-background border border-border/40 overflow-hidden",
        "shadow-[0_30px_80px_-20px_hsl(var(--foreground)/0.12)]",
      )}
    >
      {/* Mail toolbar */}
      <div className="px-4 py-2.5 border-b border-border/40 bg-muted/30 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center text-[10.5px] text-muted-foreground">Inbox</div>
        <Inbox className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 text-primary flex items-center justify-center text-[12px] font-semibold">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[13px] font-semibold truncate">{senderName || "You"}</div>
          <div className="text-[11px] text-muted-foreground truncate">
            via Docsora · just now
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="px-5">
        <div className="text-[16px] font-semibold tracking-tight leading-snug">
          {subject ? (
            <span className="flex flex-wrap items-center gap-y-1">
              {renderEmailWithPills(subject, variables)}
            </span>
          ) : (
            <span className="text-muted-foreground italic">Your subject preview</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 text-[13.5px] leading-relaxed text-foreground/90 whitespace-pre-wrap">
        {body ? (
          <span>{renderEmailWithPills(body, variables)}</span>
        ) : (
          <span className="text-muted-foreground italic">Your message preview</span>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <div className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-foreground text-background text-[13px] font-semibold">
          <PenLine className="w-3.5 h-3.5" /> {buttonLabel}
        </div>
      </div>

      {!compact && (
        <div className="px-5 pb-5 text-[10.5px] text-muted-foreground">
          Secured by Docsora · This email was sent to you because you’ve been invited to sign a document.
        </div>
      )}
    </div>
  );
}

function RecipientPreviewModal({
  onClose,
  senderName,
  subject,
  body,
  buttonLabel,
  variables,
  sample,
}: {
  onClose: () => void;
  senderName: string;
  subject: string;
  body: string;
  buttonLabel: string;
  variables: SignTemplateVariable[];
  sample: Record<string, string>;
}) {
  const [stage, setStage] = useState<"email" | "portal" | "sign" | "done">("email");
  const stages: { key: typeof stage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "email", label: "Email", icon: Mail },
    { key: "portal", label: "Portal", icon: Eye },
    { key: "sign", label: "Sign", icon: PenLine },
    { key: "done", label: "Done", icon: Check },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 10, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl max-h-[88vh] overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_50px_120px_-20px_hsl(var(--foreground)/0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
              Recipient preview
            </div>
            <div className="text-[15px] font-semibold tracking-tight">What your client will see</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-3 border-b border-border/40 flex items-center gap-1.5 overflow-x-auto">
          {stages.map((s, i) => {
            const active = s.key === stage;
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                onClick={() => setStage(s.key)}
                className={cn(
                  "inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors shrink-0",
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background/60 border-border/60 text-foreground/70 hover:bg-background",
                )}
              >
                <span className="text-[10px] opacity-60">{i + 1}</span>
                <Icon className="w-3 h-3" /> {s.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(88vh-130px)] bg-muted/20">
          {stage === "email" && (
            <EmailPreviewCard
              senderName={senderName}
              subject={subject}
              body={body}
              buttonLabel={buttonLabel}
              variables={variables}
              sample={sample}
            />
          )}
          {stage === "portal" && (
            <div className="rounded-2xl bg-background border border-border/40 p-8 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Eye className="w-5 h-5" />
              </div>
              <div className="text-[16px] font-semibold tracking-tight">Welcome to your signing portal</div>
              <p className="text-[12.5px] text-muted-foreground max-w-md mx-auto">
                A focused, distraction-free workspace with your documents, progress and signing steps clearly laid out.
              </p>
            </div>
          )}
          {stage === "sign" && (
            <div className="rounded-2xl bg-background border border-border/40 p-8 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <PenLine className="w-5 h-5" />
              </div>
              <div className="text-[16px] font-semibold tracking-tight">Sign with confidence</div>
              <p className="text-[12.5px] text-muted-foreground max-w-md mx-auto">
                Guided field-by-field signing. Identity verification, audit trail and a clear signed copy.
              </p>
            </div>
          )}
          {stage === "done" && (
            <div className="rounded-2xl bg-background border border-border/40 p-8 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-[16px] font-semibold tracking-tight">Confirmation & receipt</div>
              <p className="text-[12.5px] text-muted-foreground max-w-md mx-auto">
                A clean confirmation screen and an email receipt with a signed PDF copy.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

