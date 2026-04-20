import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Link2, Mail, Lock, Calendar, Shield, X, FileText, Plus,
  ArrowLeft, Send, Eye, EyeOff, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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

  return (
    <motion.div
      key="configure-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: appleEasing }}
      className="w-full flex flex-col h-[560px]"
    >
      {/* Header */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span>{files.length} {files.length === 1 ? 'file' : 'files'} · {formatFileSize(totalSize)}</span>
            <Lock className="w-3 h-3" />
          </div>
        </div>

        {/* Delivery Method Toggle */}
        <div className="relative grid grid-cols-2 p-1 rounded-xl bg-secondary/50 border border-border/40">
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-background shadow-sm border border-border/40"
            animate={{ x: deliveryMethod === 'link' ? 0 : 'calc(100% + 4px)' }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          <button
            onClick={() => onDeliveryMethodChange('link')}
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors",
              deliveryMethod === 'link' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            <Link2 className="w-4 h-4" />
            Generate link
          </button>
          <button
            onClick={() => onDeliveryMethodChange('email')}
            className={cn(
              "relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors",
              deliveryMethod === 'email' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80'
            )}
          >
            <Mail className="w-4 h-4" />
            Send via email
          </button>
        </div>
      </div>

      {/* Scrollable content - fixed height so both delivery modes feel consistent */}
      <div className="flex-1 overflow-y-auto min-h-0 space-y-3 pr-1 -mr-1 scrollbar-thin">
        {/* File list */}
        <div className="space-y-1.5">
          {files.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/40 border border-border/30"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-[11px] text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => onRemoveFile(file.id)}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
          <button
            onClick={onAddMore}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-dashed border-border/50 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add more files
          </button>
        </div>

        {/* Email-specific fields with smooth transition */}
        <AnimatePresence mode="wait">
          {deliveryMethod === 'email' && (
            <motion.div
              key="email-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: appleEasing }}
              className="space-y-3 overflow-hidden"
            >
              {/* Your email */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Your email <span className="text-destructive">*</span>
                </label>
                <Input
                  value={settings.senderEmail || ''}
                  onChange={(e) => onSettingsChange({ ...settings, senderEmail: e.target.value })}
                  placeholder="your@email.com"
                  type="email"
                  className="bg-secondary/50 border-border/50 h-9"
                />
              </div>

              {/* Recipients */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Recipients <span className="text-destructive">*</span>
                </label>
                <AnimatePresence>
                  {settings.recipients.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-wrap gap-1.5 mb-1.5"
                    >
                      {settings.recipients.map((email) => (
                        <motion.span
                          key={email}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {email}
                          <button
                            onClick={() => handleRemoveEmail(email)}
                            className="text-primary/70 hover:text-destructive transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <Input
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={handleEmailKeyDown}
                  onBlur={handleAddEmail}
                  placeholder="name@example.com"
                  type="email"
                  className="bg-secondary/50 border-border/50 h-9"
                />
                <p className="text-[10px] text-muted-foreground mt-0.5">Press Enter to add</p>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  Subject <span className="text-destructive">*</span>
                </label>
                <Input
                  value={settings.subject}
                  onChange={(e) => onSettingsChange({ ...settings, subject: e.target.value })}
                  placeholder="File transfer"
                  type="text"
                  className="bg-secondary/50 border-border/50 h-9"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">
                  Message (optional)
                </label>
                <Textarea
                  value={settings.message}
                  onChange={(e) => onSettingsChange({ ...settings, message: e.target.value.slice(0, 500) })}
                  placeholder="Add a note for the recipient"
                  rows={2}
                  className="bg-secondary/50 border-border/50 resize-none min-h-[56px]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expiry */}
        <div className="flex items-center justify-between py-1">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            {deliveryMethod === 'link' ? 'Link expires' : 'Link expires'}
          </label>
          <select
            value={settings.expiryDays}
            onChange={(e) => onSettingsChange({ ...settings, expiryDays: parseInt(e.target.value) })}
            className="bg-secondary/50 border border-border/50 rounded-lg px-2.5 py-1.5 text-sm text-foreground"
          >
            <option value={1}>1 day</option>
            <option value={3}>3 days</option>
            <option value={7}>7 days</option>
            <option value={14}>14 days</option>
            <option value={30}>30 days</option>
          </select>
        </div>

        {/* Security (collapsible) */}
        <details className="group">
          <summary className="flex items-center gap-2 cursor-pointer py-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
            <Shield className="w-4 h-4 text-primary" />
            <span>Security</span>
            <span className="text-xs text-muted-foreground font-normal ml-1">
              · {settings.password ? 'Password protected' : 'No password'}
            </span>
            <ChevronDown className="w-4 h-4 ml-auto transition-transform group-open:rotate-180" />
          </summary>

          <div className="pt-1.5 space-y-1.5">
            <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Password protection</span>
              </div>
              <Switch
                checked={settings.password.length > 0}
                onCheckedChange={(checked) => {
                  if (!checked) setShowPassword(false);
                  onSettingsChange({ ...settings, password: checked ? 'enabled' : '' });
                }}
              />
            </div>

            {settings.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={settings.password === 'enabled' ? '' : settings.password}
                    onChange={(e) => onSettingsChange({ ...settings, password: e.target.value })}
                    placeholder="Enter password"
                    className="bg-secondary/50 border-border/50 h-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </details>
      </div>

      {/* Sticky CTA */}
      <div className="flex-shrink-0 pt-4 mt-2 border-t border-border/20">
        <motion.button
          onClick={onTransfer}
          disabled={!canTransfer}
          whileHover={canTransfer ? { scale: 1.01 } : {}}
          whileTap={canTransfer ? { scale: 0.99 } : {}}
          className={cn(
            "w-full relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-gradient-to-b from-primary via-primary to-primary/85 shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.5)] transition-all duration-300 overflow-hidden group",
            !canTransfer && "opacity-50 cursor-not-allowed",
            canTransfer && "hover:shadow-[0_8px_32px_-4px_hsl(var(--primary)/0.6)]"
          )}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Send className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Transfer</span>
        </motion.button>

        <p className="text-[11px] text-muted-foreground/60 text-center mt-2 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" />
          End-to-end encrypted · Expires in {settings.expiryDays} {settings.expiryDays === 1 ? 'day' : 'days'}
        </p>
      </div>
    </motion.div>
  );
}