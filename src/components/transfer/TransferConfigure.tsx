import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2, Mail, Lock, Calendar, X, FileText, Plus,
  ArrowLeft, Send, Eye, EyeOff, Sparkles, Check, ShieldCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const appleEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface ConfigureSettings {
  password: string;
  expiryDays: number;
  recipients: string[];
  subject: string;
  message: string;
  senderEmail?: string;
}

export interface ConfigureFile {
  id: string;
  name: string;
  size: number;
}

interface TransferConfigureProps {
  files: ConfigureFile[];
  totalSize: number;
  deliveryMethod: 'link' | 'email';
  onDeliveryMethodChange: (method: 'link' | 'email') => void;
  settings: ConfigureSettings;
  onSettingsChange: (settings: ConfigureSettings) => void;
  onAddMore: () => void;
  onRemoveFile: (id: string) => void;
  onBack: () => void;
  onTransfer: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export function TransferConfigure({
  files,
  totalSize,
  deliveryMethod,
  onDeliveryMethodChange,
  settings,
  onSettingsChange,
  onAddMore,
  onRemoveFile,
  onBack,
  onTransfer,
}: TransferConfigureProps) {
  const [emailInput, setEmailInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAddEmail = useCallback(() => {
    const email = emailInput.trim();
    if (email && !settings.recipients.includes(email)) {
      onSettingsChange({ ...settings, recipients: [...settings.recipients, email] });
      setEmailInput('');
    }
  }, [emailInput, settings, onSettingsChange]);

  const handleEmailKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddEmail();
    }
  }, [handleAddEmail]);

  const handleRemoveEmail = useCallback((email: string) => {
    onSettingsChange({ ...settings, recipients: settings.recipients.filter(e => e !== email) });
  }, [settings, onSettingsChange]);

  const canTransfer = deliveryMethod === 'link'
    ? files.length > 0
    : files.length > 0 &&
      settings.recipients.length > 0 &&
      settings.subject.trim().length > 0 &&
      !!settings.senderEmail?.trim();

  // Capacity meter — generous free tier feel (3 GB)
  const CAPACITY_BYTES = 3 * 1024 * 1024 * 1024;
  const usedPct = Math.min((totalSize / CAPACITY_BYTES) * 100, 100);
  const remainingBytes = Math.max(CAPACITY_BYTES - totalSize, 0);

  const expiryOptions = [1, 3, 7, 14, 30];
  const passwordEnabled = settings.password.length > 0;
  const passwordValue = settings.password === 'enabled' ? '' : settings.password;

  return (
    <motion.div
      key="configure-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: appleEasing }}
      className="w-full flex flex-col h-[600px]"
    >
      {/* Header: back + delivery segmented toggle */}
      <div className="flex-shrink-0 mb-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck className="w-3 h-3 text-primary/70" />
            End-to-end encrypted
          </div>
        </div>

        <div className="relative grid grid-cols-2 p-1 rounded-xl bg-secondary/60 border border-border/40">
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-background shadow-sm border border-border/40"
            animate={{ x: deliveryMethod === 'link' ? 0 : 'calc(100% + 4px)' }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          <button
            onClick={() => onDeliveryMethodChange('link')}
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
              deliveryMethod === 'link' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            <Link2 className="w-4 h-4" />
            Get a link
          </button>
          <button
            onClick={() => onDeliveryMethodChange('email')}
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
              deliveryMethod === 'email' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            <Mail className="w-4 h-4" />
            Email transfer
          </button>
        </div>
      </div>

      {/* Compact file row + capacity meter */}
      <div className="flex-shrink-0 mb-3 rounded-xl bg-secondary/40 border border-border/40 overflow-hidden">
        <div className="max-h-[88px] overflow-y-auto divide-y divide-border/30">
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="flex items-center gap-2.5 px-3 py-2"
            >
              <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-3 h-3 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
              </div>
              <span className="text-[10px] text-muted-foreground tabular-nums flex-shrink-0">
                {formatFileSize(file.size)}
              </span>
              <button
                onClick={() => onRemoveFile(file.id)}
                className="p-1 rounded-md text-muted-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Capacity meter footer */}
        <div className="flex items-center justify-between gap-3 px-3 py-2 border-t border-border/40 bg-background/40">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-foreground">
              <Check className="w-3 h-3 text-primary" />
              {files.length} {files.length === 1 ? 'item' : 'items'}
            </div>
            <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden max-w-[100px]">
              <motion.div
                className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${usedPct}%` }}
                transition={{ duration: 0.5, ease: appleEasing }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              {formatFileSize(remainingBytes)} left
            </span>
          </div>
          <button
            onClick={onAddMore}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add more
          </button>
        </div>
      </div>

      {/* Mode-specific content area — fills remaining space so both modes match */}
      <div className="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1">
        <AnimatePresence mode="wait">
          {deliveryMethod === 'email' ? (
            <motion.div
              key="email-fields"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: appleEasing }}
              className="space-y-2.5"
            >
              {/* Sender + Recipients combined card */}
              <div className="rounded-xl border border-border/40 bg-secondary/30 divide-y divide-border/30">
                <div className="flex items-center gap-2 px-3 py-2">
                  <span className="text-[11px] font-medium text-muted-foreground w-14 flex-shrink-0">From</span>
                  <input
                    value={settings.senderEmail || ''}
                    onChange={(e) => onSettingsChange({ ...settings, senderEmail: e.target.value })}
                    placeholder="your@email.com"
                    type="email"
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                  />
                </div>
                <div className="flex items-start gap-2 px-3 py-2">
                  <span className="text-[11px] font-medium text-muted-foreground w-14 flex-shrink-0 mt-1">To</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1 items-center">
                      <AnimatePresence>
                        {settings.recipients.map((email) => (
                          <motion.span
                            key={email}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-primary/10 text-primary rounded-md text-[11px] font-medium"
                          >
                            {email}
                            <button
                              onClick={() => handleRemoveEmail(email)}
                              className="text-primary/60 hover:text-destructive transition-colors"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                      <input
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyDown={handleEmailKeyDown}
                        onBlur={handleAddEmail}
                        placeholder={settings.recipients.length === 0 ? 'name@example.com' : 'Add another'}
                        type="email"
                        className="flex-1 min-w-[120px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none py-0.5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="rounded-xl border border-border/40 bg-secondary/30">
                <input
                  value={settings.subject}
                  onChange={(e) => onSettingsChange({ ...settings, subject: e.target.value })}
                  placeholder="Subject"
                  type="text"
                  className="w-full bg-transparent px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="rounded-xl border border-border/40 bg-secondary/30">
                <Textarea
                  value={settings.message}
                  onChange={(e) => onSettingsChange({ ...settings, message: e.target.value.slice(0, 500) })}
                  placeholder="Add a personal message…"
                  rows={3}
                  className="bg-transparent border-0 resize-none min-h-[72px] text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="link-preview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: appleEasing }}
              className="h-full flex flex-col justify-center"
            >
              <div className="rounded-2xl border border-border/40 bg-gradient-to-b from-secondary/30 to-secondary/10 p-5 text-center">
                <div className="relative w-12 h-12 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-b from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30">
                    <Link2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">A shareable link will be ready instantly</h3>
                <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                  Send it anywhere — chat, docs, anywhere. Recipients can preview and download with one click.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/60 border border-border/40 text-[10px] font-medium text-muted-foreground">
                  <Sparkles className="w-3 h-3 text-primary" />
                  docsora.com/d/<span className="text-foreground/70 tracking-wider">●●●●●●●●</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky footer toolbar: expiry pill + security pill + CTA */}
      <div className="flex-shrink-0 pt-3 mt-3 border-t border-border/30 space-y-2.5">
        {/* Settings toolbar */}
        <div className="flex items-center gap-1.5">
          {/* Expiry popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary/60 border border-border/40 text-xs font-medium text-foreground hover:bg-secondary transition-colors">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                {settings.expiryDays} {settings.expiryDays === 1 ? 'day' : 'days'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-44 p-1" align="start">
              <div className="text-[10px] font-medium text-muted-foreground px-2 py-1 uppercase tracking-wider">Link expires in</div>
              {expiryOptions.map((days) => (
                <button
                  key={days}
                  onClick={() => onSettingsChange({ ...settings, expiryDays: days })}
                  className={cn(
                    "w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors",
                    settings.expiryDays === days
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-secondary'
                  )}
                >
                  {days} {days === 1 ? 'day' : 'days'}
                  {settings.expiryDays === days && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </PopoverContent>
          </Popover>

          {/* Password popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors",
                  passwordEnabled
                    ? 'bg-primary/10 border-primary/30 text-primary hover:bg-primary/15'
                    : 'bg-secondary/60 border-border/40 text-foreground hover:bg-secondary'
                )}
              >
                <Lock className="w-3.5 h-3.5" />
                {passwordEnabled ? 'Protected' : 'Add password'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3" align="start">
              <div className="text-xs font-medium text-foreground mb-2">Password protection</div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={(e) => onSettingsChange({ ...settings, password: e.target.value || 'enabled' })}
                  placeholder="Set a password"
                  className="bg-secondary/50 border-border/50 h-9 pr-9 text-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {passwordEnabled && (
                <button
                  onClick={() => { setShowPassword(false); onSettingsChange({ ...settings, password: '' }); }}
                  className="mt-2 text-[11px] text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove password
                </button>
              )}
            </PopoverContent>
          </Popover>

          <div className="flex-1" />

          <span className="text-[10px] text-muted-foreground/60 hidden sm:inline">
            {formatFileSize(totalSize)} total
          </span>
        </div>

        {/* Primary CTA */}
        <motion.button
          onClick={onTransfer}
          disabled={!canTransfer}
          whileHover={canTransfer ? { scale: 1.005 } : {}}
          whileTap={canTransfer ? { scale: 0.99 } : {}}
          className={cn(
            "w-full relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-gradient-to-b from-primary via-primary to-primary/85 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.5)] transition-all duration-300 overflow-hidden group",
            !canTransfer && "opacity-50 cursor-not-allowed",
            canTransfer && "hover:shadow-[0_8px_32px_-4px_hsl(var(--primary)/0.6)]"
          )}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          {deliveryMethod === 'link' ? (
            <>
              <Link2 className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Get transfer link</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 relative z-10" />
              <span className="relative z-10">
                Send to {settings.recipients.length || 0} {settings.recipients.length === 1 ? 'person' : 'people'}
              </span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}