import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Calendar, ChevronDown, Clock, AlertTriangle, Bookmark, Tag, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, subDays, startOfDay, endOfDay, isAfter } from "date-fns";
import { DateRange } from "react-day-picker";
import { CustomDateRangeDialog } from "@/components/track/CustomDateRangeDialog";

interface TrackFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isContracts?: boolean;
  isTransferSent?: boolean;
  isTransferReceived?: boolean;
  isSign?: boolean;
  onDateRangeChange?: (range: { from: Date; to: Date } | null) => void;
  allTags?: string[];
  tagCounts?: Record<string, number>;
  activeTagFilters?: string[];
  onAddTagFilter?: (tag: string) => void;
  onRemoveTagFilter?: (tag: string) => void;
  onClearTagFilters?: () => void;
}

type DatePreset = "all" | "today" | "7days" | "30days" | "90days" | "custom";

export function TrackFilters({
  searchQuery,
  setSearchQuery,
  isContracts = false,
  isTransferSent = false,
  isTransferReceived = false,
  isSign = false,
  onDateRangeChange,
  allTags = [],
  tagCounts = {},
  activeTagFilters = [],
  onAddTagFilter,
  onRemoveTagFilter,
  onClearTagFilters,
}: TrackFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [savedViews] = useState([
    { id: "expiring", label: "Expiring Soon", icon: Clock },
    { id: "attention", label: "Needs Action", icon: AlertTriangle },
    { id: "high", label: "High Priority", icon: Bookmark },
  ]);

  // Date range state
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [customRange, setCustomRange] = useState<DateRange | undefined>(undefined);
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange | undefined>(undefined);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  // Get date range based on preset
  const getDateRangeFromPreset = (preset: DatePreset): { from: Date; to: Date } | null => {
    const now = new Date();
    switch (preset) {
      case "today":
        return { from: startOfDay(now), to: endOfDay(now) };
      case "7days":
        return { from: startOfDay(subDays(now, 7)), to: endOfDay(now) };
      case "30days":
        return { from: startOfDay(subDays(now, 30)), to: endOfDay(now) };
      case "90days":
        return { from: startOfDay(subDays(now, 90)), to: endOfDay(now) };
      case "custom":
        return customRange?.from && customRange?.to
          ? { from: startOfDay(customRange.from), to: endOfDay(customRange.to) }
          : null;
      default:
        return null;
    }
  };

  // Apply date filter when preset or custom range changes
  useEffect(() => {
    const range = getDateRangeFromPreset(datePreset);
    onDateRangeChange?.(range);
  }, [datePreset, customRange]);

  // Get button label
  const getDateButtonLabel = () => {
    switch (datePreset) {
      case "today":
        return "Today";
      case "7days":
        return "Last 7 days";
      case "30days":
        return "Last 30 days";
      case "90days":
        return "Last 90 days";
      case "custom":
        if (customRange?.from && customRange?.to) {
          return `${format(customRange.from, "MMM d")} – ${format(customRange.to, "MMM d")}`;
        }
        return "Custom range";
      default:
        return "Date";
    }
  };

  const handlePresetSelect = (preset: DatePreset) => {
    if (preset === "custom") {
      setTempRange(customRange);
      setIsCustomRangeOpen(true);
    } else {
      setDatePreset(preset);
      setCustomRange(undefined);
    }
  };

  const handleApplyCustomRange = () => {
    if (tempRange?.from && tempRange?.to && !isAfter(tempRange.from, tempRange.to)) {
      setCustomRange(tempRange);
      setDatePreset("custom");
      setIsCustomRangeOpen(false);
    }
  };

  const handleClearDateFilter = () => {
    setDatePreset("all");
    setCustomRange(undefined);
    setTempRange(undefined);
    setIsCustomRangeOpen(false);
  };

  

  return (
    <div className="mb-6 space-y-4">
      {/* Search and Filters Row */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={isContracts ? "Search by contract name or company..." : isSign ? "Search by document name, sender, or recipient..." : isTransferReceived ? "Search by file name, sender, or email..." : "Search by file name, recipient, or email..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/30 border-border/50 focus:bg-background transition-colors"
          />
        </div>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-muted/30 border-border/50 hover:bg-muted hover:text-foreground">
              <Filter className="w-4 h-4" />
              Status
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {isSign ? (
              // Sign-specific statuses
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("action_required")}
                  onCheckedChange={() => toggleFilter("action_required")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F5A524]" />
                    Action Required
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("in_progress")}
                  onCheckedChange={() => toggleFilter("in_progress")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    In Progress
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("waiting_for_others")}
                  onCheckedChange={() => toggleFilter("waiting_for_others")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    Waiting for Others
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("completed")}
                  onCheckedChange={() => toggleFilter("completed")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    Completed
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("declined")}
                  onCheckedChange={() => toggleFilter("declined")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    Declined
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("expired")}
                  onCheckedChange={() => toggleFilter("expired")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                    Expired
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("cancelled")}
                  onCheckedChange={() => toggleFilter("cancelled")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6B7280]" />
                    Cancelled
                  </span>
                </DropdownMenuCheckboxItem>
              </>
            ) : (isTransferSent || isTransferReceived) ? (
              // Only Active and Expired for Transfer Sent and Received
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("active")}
                  onCheckedChange={() => toggleFilter("active")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("expired")}
                  onCheckedChange={() => toggleFilter("expired")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    Expired
                  </span>
                </DropdownMenuCheckboxItem>
              </>
            ) : (
              // Full status list for contracts
              <>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("active")}
                  onCheckedChange={() => toggleFilter("active")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("expiring")}
                  onCheckedChange={() => toggleFilter("expiring")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Expiring Soon
                  </span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={activeFilters.includes("expired")}
                  onCheckedChange={() => toggleFilter("expired")}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-destructive" />
                    Expired
                  </span>
                </DropdownMenuCheckboxItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date Range Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`gap-2 bg-muted/30 border-border/50 hover:bg-muted hover:text-foreground ${
                datePreset !== "all" ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <Calendar className="w-4 h-4" />
              {getDateButtonLabel()}
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuCheckboxItem
              checked={datePreset === "all"}
              onCheckedChange={() => handlePresetSelect("all")}
            >
              All time
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={datePreset === "today"}
              onCheckedChange={() => handlePresetSelect("today")}
            >
              Today
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={datePreset === "7days"}
              onCheckedChange={() => handlePresetSelect("7days")}
            >
              Last 7 days
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={datePreset === "30days"}
              onCheckedChange={() => handlePresetSelect("30days")}
            >
              Last 30 days
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={datePreset === "90days"}
              onCheckedChange={() => handlePresetSelect("90days")}
            >
              Last 90 days
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={datePreset === "custom"}
              onCheckedChange={() => handlePresetSelect("custom")}
            >
              Custom range...
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CustomDateRangeDialog
          open={isCustomRangeOpen}
          onOpenChange={setIsCustomRangeOpen}
          range={tempRange}
          onRangeChange={setTempRange}
          onApply={handleApplyCustomRange}
          onCancel={() => setTempRange(customRange)}
        />

        {/* Tags filter (contracts only) */}
        {isContracts && allTags.length > 0 && (
          <Popover open={tagDropdownOpen} onOpenChange={setTagDropdownOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 h-10 px-3 rounded-md border transition-all duration-200",
                  "bg-muted/30 hover:bg-muted",
                  activeTagFilters.length > 0
                    ? "border-primary/50 bg-primary/5 text-primary"
                    : "border-border/50 text-foreground hover:text-foreground"
                )}
              >
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">Tags</span>
                {activeTagFilters.length > 0 && (
                  <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                    {activeTagFilters.length}
                  </span>
                )}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 opacity-50 transition-transform duration-200",
                    tagDropdownOpen && "rotate-180"
                  )}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-0 bg-card border border-border shadow-xl z-50"
              align="start"
              sideOffset={8}
            >
              {/* Tag search input */}
              <div className="p-3 border-b border-border/50">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={tagSearchQuery}
                    onChange={(e) => setTagSearchQuery(e.target.value)}
                    placeholder="Search tags…"
                    className="h-9 pl-9 text-sm bg-muted/30"
                  />
                </div>
              </div>

              {/* Tags list */}
              <ScrollArea className="max-h-64">
                {(() => {
                  const sorted = [...allTags]
                    .filter((t) => t.toLowerCase().includes(tagSearchQuery.toLowerCase()))
                    .sort((a, b) => {
                      const aSel = activeTagFilters.includes(a);
                      const bSel = activeTagFilters.includes(b);
                      if (aSel && !bSel) return -1;
                      if (!aSel && bSel) return 1;
                      return a.localeCompare(b);
                    });
                  if (sorted.length === 0) {
                    return (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        {tagSearchQuery ? "No matching tags" : "No tags yet"}
                      </div>
                    );
                  }
                  return (
                    <div className="p-2">
                      {sorted.map((tag) => {
                      const isSelected = activeTagFilters.includes(tag);
                      const count = tagCounts[tag] || 0;
                      return (
                        <button
                          key={tag}
                          onClick={() => (isSelected ? onRemoveTagFilter?.(tag) : onAddTagFilter?.(tag))}
                            className={cn(
                              "w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                              isSelected
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={cn(
                                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                  isSelected
                                    ? "bg-primary border-primary"
                                    : "border-border bg-background"
                                )}
                              >
                                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                              </div>
                              <span className="truncate">{tag}</span>
                            </div>
                            {count > 0 && (
                              <span className="text-xs text-muted-foreground shrink-0">
                                ({count})
                              </span>
                            )}
                        </button>
                      );
                      })}
                    </div>
                  );
                })()}
              </ScrollArea>

              {/* Clear selection footer */}
              {activeTagFilters.length > 0 && (
                <div className="p-2 border-t border-border/50">
                  <button
                    onClick={() => {
                      onClearTagFilters?.();
                      setTagDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-center"
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}

        {/* Saved Views - hide for transfer sent and received */}
        {!isTransferSent && !isTransferReceived && (
          <div className="flex items-center gap-2 ml-auto">
            {savedViews.map((view) => (
              <Button
                key={view.id}
                variant="ghost"
                size="sm"
                onClick={() => toggleFilter(view.id)}
                className={`gap-1.5 text-xs ${
                  activeFilters.includes(view.id)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <view.icon className="w-3.5 h-3.5" />
                {view.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Active Filters */}
      <AnimatePresence>
        {(activeFilters.length > 0 || datePreset !== "all" || activeTagFilters.length > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={() => toggleFilter(filter)}
              >
                {filter}
                <span className="ml-1">×</span>
              </Badge>
            ))}
            {activeTagFilters.map((tag) => (
              <Badge
                key={`tag-${tag}`}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20 gap-1 bg-primary/10 text-primary"
                onClick={() => onRemoveTagFilter?.(tag)}
              >
                <Tag className="w-3 h-3" />
                {tag}
                <span className="ml-1">×</span>
              </Badge>
            ))}
            {datePreset !== "all" && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/20"
                onClick={handleClearDateFilter}
              >
                {getDateButtonLabel()}
                <span className="ml-1">×</span>
              </Badge>
            )}
            <Button
              variant="link"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() => {
                setActiveFilters([]);
                handleClearDateFilter();
                onClearTagFilters?.();
              }}
            >
              Clear all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
