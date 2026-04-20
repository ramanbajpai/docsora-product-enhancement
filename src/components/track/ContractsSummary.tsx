import { motion } from "framer-motion";
import { FileText, AlertTriangle, Clock, XCircle } from "lucide-react";
import { Contract } from "@/pages/Track";
import { differenceInDays } from "date-fns";

export type ContractFilter = "all" | "active" | "expiring30" | "expiring60" | "expiring90" | "expired";

interface ContractsSummaryProps {
  contracts: Contract[];
  activeFilter?: ContractFilter;
  onFilterChange?: (filter: ContractFilter) => void;
}

export function ContractsSummary({ contracts, activeFilter = "all", onFilterChange }: ContractsSummaryProps) {
  const now = new Date();
  
  const activeCount = contracts.filter(c => c.status === "active").length;
  const expiring30 = contracts.filter(c => {
    const days = differenceInDays(c.expiryDate, now);
    return days > 0 && days <= 30;
  }).length;
  const expiring60 = contracts.filter(c => {
    const days = differenceInDays(c.expiryDate, now);
    return days > 0 && days <= 60;
  }).length;
  const expiring90 = contracts.filter(c => {
    const days = differenceInDays(c.expiryDate, now);
    return days > 0 && days <= 90;
  }).length;
  const expiredCount = contracts.filter(c => c.status === "expired").length;

  const stats: Array<{
    key: ContractFilter;
    label: string;
    value: number;
    icon: typeof FileText;
    color: string;
    bg: string;
    border: string;
    activeBorder: string;
    activeRing: string;
    urgent?: boolean;
  }> = [
    {
      key: "active",
      label: "Active Contracts",
      value: activeCount,
      icon: FileText,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      activeBorder: "border-emerald-500/60",
      activeRing: "ring-emerald-500/40",
    },
    {
      key: "expiring30",
      label: "Expiring in 30 days",
      value: expiring30,
      icon: AlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      activeBorder: "border-amber-500/60",
      activeRing: "ring-amber-500/40",
      urgent: expiring30 > 0,
    },
    {
      key: "expiring60",
      label: "Expiring in 60 days",
      value: expiring60,
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      activeBorder: "border-blue-500/60",
      activeRing: "ring-blue-500/40",
    },
    {
      key: "expiring90",
      label: "Expiring in 90 days",
      value: expiring90,
      icon: Clock,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      activeBorder: "border-violet-500/60",
      activeRing: "ring-violet-500/40",
    },
    {
      key: "expired",
      label: "Expired",
      value: expiredCount,
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      activeBorder: "border-destructive/60",
      activeRing: "ring-destructive/40",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {stats.map((stat, index) => {
        const isActive = activeFilter === stat.key;
        return (
          <motion.button
            key={stat.label}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onFilterChange?.(isActive ? "all" : stat.key)}
            aria-pressed={isActive}
            className={`relative text-left p-4 rounded-xl border ${stat.bg} backdrop-blur-sm overflow-hidden transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 ${
              isActive
                ? `${stat.activeBorder} ring-2 ${stat.activeRing} shadow-lg`
                : `${stat.border} hover:border-border`
            }`}
          >
            {stat.urgent && (
              <motion.div
                className="absolute inset-0 bg-amber-500/5 pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
              <p className={`text-2xl font-semibold ${stat.value > 0 ? stat.color : "text-muted-foreground"}`}>
                {stat.value}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
