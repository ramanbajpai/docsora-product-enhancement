import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Check,
  ChevronRight,
  PenTool,
  Type,
  Calendar,
  Sparkles,
  Trash2,
  Move,
  User,
  Mail,
  Building2,
  Briefcase,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PlacedField,
  CustomFieldType,
  SignatureFieldSpec,
} from "@/hooks/useCustomTemplates";

const uid = () => Math.random().toString(36).slice(2, 9);

export type PlacementTool = {
  kind: CustomFieldType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  width: number; // %
  height: number; // %
  /** Token bound to this tool (only for personalization mode). */
  token?: string;
};

const SIGNING_TOOLS: PlacementTool[] = [
  { kind: "signature", label: "Signature", icon: PenTool, width: 18, height: 5 },
  { kind: "text", label: "Initials", icon: Type, width: 8, height: 4 },
  { kind: "date", label: "Date", icon: Calendar, width: 12, height: 4 },
];

const PERSONALIZATION_TOOLS: PlacementTool[] = [
  { kind: "text", label: "Recipient name", icon: User, width: 18, height: 4, token: "recipient_name" },
  { kind: "text", label: "Email", icon: Mail, width: 20, height: 4, token: "email" },
  { kind: "text", label: "Company", icon: Building2, width: 18, height: 4, token: "company" },
  { kind: "text", label: "Role / title", icon: Briefcase, width: 16, height: 4, token: "role" },
  { kind: "date", label: "Start date", icon: Calendar, width: 14, height: 4, token: "start_date" },
];

interface FieldPlacementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName?: string;
  documentName?: string;
  pageCount?: number;
  initialFields?: PlacedField[];
  signatureFields?: SignatureFieldSpec[];
  onSave: (fields: PlacedField[]) => void;
  /** "signing" = signature/initials/date toolbox. "personalization" = recipient tokens. */
  mode?: "signing" | "personalization";
}

export function FieldPlacementModal({
  open,
  onOpenChange,
  recipientName = "Recipient",
  documentName,
  pageCount = 3,
  initialFields,
  onSave,
  mode = "signing",
}: FieldPlacementModalProps) {
  const TOOLS = mode === "personalization" ? PERSONALIZATION_TOOLS : SIGNING_TOOLS;
  const [fields, setFields] = useState<PlacedField[]>(initialFields ?? []);
  const [activeTool, setActiveTool] = useState<PlacementTool>(TOOLS[0]);
  const [page, setPage] = useState(1);
  const pageRef = useRef<HTMLDivElement>(null);

  const placeField = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = pageRef.current;
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const f: PlacedField = {
      id: uid(),
      type: activeTool.kind,
      roleKey: "client",
      page,
      x: Math.max(0, x - activeTool.width / 2),
      y: Math.max(0, y - activeTool.height / 2),
      width: activeTool.width,
      height: activeTool.height,
      token: activeTool.token,
      label: activeTool.label,
    };
    setFields((prev) => [...prev, f]);
  };

  const removeField = (id: string) =>
    setFields((prev) => prev.filter((f) => f.id !== id));

  const pageFields = useMemo(
    () => fields.filter((f) => f.page === page),
    [fields, page],
  );

  const requiredKinds = new Set(mode === "signing" ? ["signature"] : []);
  const missing = useMemo(() => {
    const placedKinds = new Set(fields.map((f) => f.type));
    return Array.from(requiredKinds).filter((k) => !placedKinds.has(k as CustomFieldType));
  }, [fields]);

  const save = () => {
    onSave(fields);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1100px] w-[95vw] h-[88vh] p-0 overflow-hidden gap-0 bg-background">
        <DialogTitle className="sr-only">Place signature fields</DialogTitle>
        <DialogDescription className="sr-only">
          Click on the document to place fields the recipient must complete.
        </DialogDescription>

        <div className="grid grid-cols-[280px_1fr] h-full">
          {/* Sidebar */}
          <div className="border-r border-border/60 bg-card/40 flex flex-col min-h-0">
            <div className="px-4 py-3 border-b border-border/60">
              <button
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
            </div>

            <div className="px-4 py-3 space-y-3 flex-1 overflow-y-auto">
              <div>
                <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground mb-2">
                  {mode === "personalization"
                    ? "Personalize delivery for"
                    : "Fields required from"}
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/[0.06] px-2.5 py-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-sm font-medium truncate flex-1">
                    {recipientName}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-primary bg-primary/15 px-1.5 py-0.5 rounded">
                    {mode === "personalization" ? "Recipient" : "Signer"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                  {mode === "personalization"
                    ? "Drop tokens onto the document — we'll fill them in for each recipient before sending."
                    : "You're placing fields this recipient must complete."}
                </p>
              </div>

              <div className="border-t border-border/60 pt-3">
                <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                  {mode === "personalization" ? (
                    <>
                      <Wand2 className="w-3 h-3 text-primary" /> Personalization tokens
                    </>
                  ) : (
                    "Signature"
                  )}
                </div>
                <div className="space-y-1">
                  {TOOLS.map((t) => {
                    const Icon = t.icon;
                    const active = activeTool.kind === t.kind && activeTool.label === t.label;
                    return (
                      <button
                        key={t.label}
                        onClick={() => setActiveTool(t)}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md border transition text-left",
                          active
                            ? "border-primary/40 bg-primary/[0.08] text-primary"
                            : "border-transparent hover:bg-accent/40 text-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center",
                            active ? "bg-primary/15" : "bg-muted",
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-sm font-medium">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-border/60 pt-3 space-y-1">
                <button className="w-full flex items-center justify-between px-1 py-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Text fields
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button className="w-full flex items-center justify-between px-1 py-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Controls
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button className="w-full flex items-center justify-between px-1 py-1.5 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Assets
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {missing.length > 0 && (
              <div className="mx-4 mb-3 rounded-lg border border-border/60 bg-muted/40 px-3 py-2.5">
                <div className="text-[11px] font-semibold text-foreground mb-0.5">
                  Missing signature fields:
                </div>
                <div className="text-[11px] text-muted-foreground">{recipientName}</div>
              </div>
            )}

            <div className="p-3 border-t border-border/60">
              <Button onClick={save} className="w-full gap-1.5" size="sm">
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex flex-col bg-muted/20">
            <div className="flex items-center justify-between px-6 py-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md hover:bg-accent disabled:opacity-30"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{page}</span> of {pageCount}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="p-1.5 rounded-md hover:bg-accent disabled:opacity-30"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition font-medium">
                  <Sparkles className="w-3.5 h-3.5" /> AI suggest fields
                </button>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {fields.length} field{fields.length === 1 ? "" : "s"} placed
                </span>
                <Button
                  onClick={save}
                  size="sm"
                  disabled={missing.length > 0}
                  className="gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Save fields
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-8 flex justify-center">
              <div
                ref={pageRef}
                onClick={placeField}
                className="relative bg-background rounded-md shadow-2xl border border-border/40 w-full max-w-[720px] aspect-[1/1.3] cursor-crosshair"
              >
                {/* Skeleton lines mimicking document */}
                <div className="absolute inset-0 p-12 space-y-3 pointer-events-none">
                  <div className="h-3 w-3/4 bg-muted rounded" />
                  <div className="h-2 w-full bg-muted/60 rounded" />
                  <div className="h-2 w-5/6 bg-muted/60 rounded" />
                  <div className="h-2 w-full bg-muted/60 rounded" />
                  <div className="h-2 w-2/3 bg-muted/60 rounded" />
                  <div className="h-6" />
                  <div className="h-2 w-full bg-muted/60 rounded" />
                  <div className="h-2 w-4/5 bg-muted/60 rounded" />
                  <div className="h-2 w-full bg-muted/60 rounded" />
                  <div className="h-2 w-3/5 bg-muted/60 rounded" />
                  <div className="h-6" />
                  <div className="h-2 w-full bg-muted/60 rounded" />
                  <div className="h-2 w-5/6 bg-muted/60 rounded" />
                  <div className="h-2 w-full bg-muted/60 rounded" />
                  <div className="h-2 w-2/3 bg-muted/60 rounded" />
                </div>

                {pageFields.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none">
                    <Move className="w-6 h-6 text-muted-foreground/60 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click anywhere to place a {activeTool.label.toLowerCase()} field
                    </p>
                  </div>
                )}

                {pageFields.map((f) => {
                  const tool = TOOLS.find((t) => t.kind === f.type) ?? TOOLS[0];
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        width: `${f.width}%`,
                        height: `${f.height}%`,
                        minHeight: 28,
                        minWidth: 64,
                      }}
                      className="absolute group rounded-md border-2 border-primary/60 bg-primary/[0.12] flex items-center gap-1.5 px-2 cursor-grab"
                    >
                      <Icon className="w-3 h-3 text-primary shrink-0" />
                      <span className="text-[10px] font-medium text-primary truncate">
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
