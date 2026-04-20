import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Upload, FolderUp, Shield, Lock, Globe, ChevronDown, Check, X, Plus, FileText, ArrowRight, Link2, Mail, Calendar, ArrowLeft, Copy, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TransferSuccess } from "./TransferSuccess";
import { TransferConfigure } from "./TransferConfigure";
import { TransferProgress } from "./TransferProgress";
import { TransferFile, TransferSettings as TransferSettingsType } from "@/pages/Transfer";
import TrustFooter from "@/components/shared/TrustFooter";

interface QueuedFile {
  id: string;
  name: string;
  size: number;
  file: File;
  progress?: number;
  status?: 'waiting' | 'uploading' | 'completed';
}

interface TransferSettings {
  password: string;
  expiryDays: number;
  downloadLimit: number | null;
  viewOnly: boolean;
  recipients: string[];
  subject: string;
  message: string;
  senderEmail?: string;
}

type CardStep = 'upload' | 'configure' | 'uploading' | 'success';

// Mask email for privacy display
const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local[0]}${local[1]}***@${domain}`;
};

// Apple-style easing - typed as tuple for framer-motion
const appleEasing: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export function TransferLanding() {
  const [isDragging, setIsDragging] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [queuedFiles, setQueuedFiles] = useState<QueuedFile[]>([]);
  const [currentStep, setCurrentStep] = useState<CardStep>('upload');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'link' | 'email'>('link');
  const [settings, setSettings] = useState<TransferSettings>({
    password: '',
    expiryDays: 7,
    downloadLimit: null,
    viewOnly: false,
    recipients: [],
    subject: '',
    message: '',
    senderEmail: '',
  });
  const [emailInput, setEmailInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transferLink, setTransferLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Derived states
  const hasQueuedFiles = queuedFiles.length > 0;
  const showUploadingState = currentStep === 'uploading';
  const isComplete = currentStep === 'success';

  // Mouse tracking for card tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 300, damping: 30 });

  // Disable tilt during upload or success steps (allow on configure)
  useEffect(() => {
    if (currentStep !== 'upload' && currentStep !== 'configure') {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [currentStep, mouseX, mouseY]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || (currentStep !== 'upload' && currentStep !== 'configure')) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }, [mouseX, mouseY, currentStep]);

  const handleMouseEnter = useCallback(() => {
    if (currentStep === 'upload' || currentStep === 'configure') setIsHovering(true);
  }, [currentStep]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (currentStep === 'upload' || currentStep === 'configure') setIsDragging(true);
  }, [currentStep]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // Add files to queue (don't upload)
  const addFilesToQueue = useCallback((files: File[]) => {
    const newQueuedFiles: QueuedFile[] = files.map(file => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      file,
      progress: 0,
      status: 'waiting' as const,
    }));
    setQueuedFiles(prev => [...prev, ...newQueuedFiles]);
    setCurrentStep('configure');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (currentStep !== 'upload' && currentStep !== 'configure') return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      addFilesToQueue(droppedFiles);
    }
  }, [currentStep, addFilesToQueue]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentStep !== 'upload' && currentStep !== 'configure') return;
    
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    if (selectedFiles.length > 0) {
      addFilesToQueue(selectedFiles);
    }
    e.target.value = '';
  }, [currentStep, addFilesToQueue]);

  const handleRemoveFile = useCallback((fileId: string) => {
    setQueuedFiles(prev => {
      const newFiles = prev.filter(f => f.id !== fileId);
      if (newFiles.length === 0) {
        setCurrentStep('upload');
      }
      return newFiles;
    });
  }, []);

  // Go back to upload step
  const handleBackToUpload = useCallback(() => {
    setCurrentStep('upload');
    setQueuedFiles([]);
  }, []);

  // Email recipient management
  const handleAddEmail = useCallback(() => {
    const email = emailInput.trim();
    if (email && !settings.recipients.includes(email)) {
      setSettings(prev => ({ ...prev, recipients: [...prev.recipients, email] }));
      setEmailInput('');
    }
  }, [emailInput, settings.recipients]);

  const handleRemoveEmail = useCallback((email: string) => {
    setSettings(prev => ({ ...prev, recipients: prev.recipients.filter(e => e !== email) }));
  }, []);

  const handleEmailKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddEmail();
    }
  }, [handleAddEmail]);

  // Track processing phase (after upload completes)
  const [isProcessing, setIsProcessing] = useState(false);

  // Start the actual upload
  const handleStartActualUpload = useCallback(() => {
    setCurrentStep('uploading');
    setUploadProgress(0);
    setIsProcessing(false);

    const totalSize = queuedFiles.reduce((acc, f) => acc + f.size, 0);
    const baseDuration = Math.min(Math.max(totalSize / (50 * 1024 * 1024) * 2000, 2000), 4000);
    let elapsed = 0;
    const progressInterval = 50;

    progressIntervalRef.current = setInterval(() => {
      elapsed += progressInterval;
      const normalizedTime = Math.min(elapsed / baseDuration, 1);
      const easedProgress = 1 - Math.pow(1 - normalizedTime, 3);
      const currentProgress = Math.min(easedProgress * 100, 80); // Cap at 80% during upload phase

      setUploadProgress(currentProgress);

      // Update individual file progress
      setQueuedFiles(prev => prev.map((f, i) => {
        const fileProgress = Math.min((currentProgress + (i * 5)) * 1.25, 100);
        return { 
          ...f, 
          progress: fileProgress,
          status: fileProgress >= 100 ? 'completed' : 'uploading'
        };
      }));

      if (elapsed >= baseDuration) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        
        // Transition to processing phase
        setIsProcessing(true);
        setQueuedFiles(prev => prev.map(f => ({ ...f, progress: 100, status: 'completed' as const })));
        
        // Animate progress from 80 to 100 during processing
        let processingElapsed = 0;
        const processingDuration = 1500;
        const processingInterval = setInterval(() => {
          processingElapsed += 50;
          const processingProgress = 80 + (processingElapsed / processingDuration) * 20;
          setUploadProgress(Math.min(processingProgress, 100));
          
          if (processingElapsed >= processingDuration) {
            clearInterval(processingInterval);
            setUploadProgress(100);
            
            // Phase 1: Hold at 100% for 400ms (ring complete, no checkmark yet)
            setTimeout(() => {
              // Phase 2: Show green checkmark
              setUploadComplete(true);
              
              // Phase 3: Hold checkmark visible for 800ms, then transition
              setTimeout(() => {
                setTransferLink('https://docsora.com/d/' + Math.random().toString(36).substring(2, 12));
                setCurrentStep('success');
              }, 800);
            }, 400);
          }
        }, 50);
      }
    }, progressInterval);
  }, [queuedFiles]);

  // Copy link to clipboard
  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(transferLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [transferLink]);

  // Start over
  const handleStartOver = useCallback(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setQueuedFiles([]);
    setCurrentStep('upload');
    setSelectedDeliveryMethod(null);
    setSettings({
      password: '',
      expiryDays: 7,
      downloadLimit: null,
      viewOnly: false,
      recipients: [],
      subject: '',
      message: '',
      senderEmail: '',
    });
    setEmailInput('');
    setUploadProgress(0);
    setTransferLink('');
    setCopied(false);
    setIsProcessing(false);
    setUploadComplete(false);
  }, []);

  const supportedFormats = ['ZIP', 'RAR', '7Z', 'PDF', 'DOC', 'XLS', 'PPT', 'MP4', 'MOV', 'JPG', 'PNG', 'PSD', 'AI'];

  // Circular progress ring dimensions
  const circleRadius = 52;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (uploadProgress / 100) * circumference;

  const totalSize = queuedFiles.reduce((acc, f) => acc + f.size, 0);

  return (
    <div className={`relative h-full flex flex-col items-center justify-center overflow-hidden px-4 ${currentStep === 'success' ? 'bg-background' : ''}`}>
      {/* Cinematic Background - Hidden on success */}
      {currentStep !== 'success' && <div className="absolute inset-0 bg-background" />}
      
      {/* Ambient Gradient Orbs - Hidden on success */}
      {currentStep !== 'success' && <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[1200px] h-[1200px] rounded-full"
          style={{
            left: '-25%',
            top: '-35%',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 55%)',
            filter: 'blur(100px)',
          }}
          animate={{
            x: [0, 30, 15, 0],
            y: [0, 20, 10, 0],
            opacity: showUploadingState ? 0.8 : 1,
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute w-[1000px] h-[1000px] rounded-full"
          style={{
            right: '-20%',
            bottom: '-25%',
            background: 'radial-gradient(circle, hsl(220 50% 55% / 0.04) 0%, transparent 55%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -20, -10, 0],
            y: [0, -15, -8, 0],
          }}
          transition={{
            duration: 100,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            right: '5%',
            top: '15%',
            background: 'radial-gradient(circle, hsl(260 40% 55% / 0.03) 0%, transparent 50%)',
            filter: 'blur(70px)',
          }}
          animate={{
            x: [0, 15, 0, -15, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>}

      {/* Cinematic Background Ripples - Pulsating effect during upload */}
      <AnimatePresence>
        {showUploadingState && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`ripple-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
                initial={{ 
                  x: '-50%', 
                  y: '-50%',
                  width: 100, 
                  height: 100, 
                  opacity: 0 
                }}
                animate={{ 
                  width: [100, 600, 1000],
                  height: [100, 600, 1000],
                  opacity: isComplete ? [0.25, 0.15, 0] : [0.3, 0.15, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeOut",
                }}
                style={{
                  background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, hsl(var(--primary) / 0.08) 40%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
            ))}
            
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
              animate={{
                width: [300, 400, 300],
                height: [300, 400, 300],
                opacity: [0.25, 0.4, 0.25],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
                filter: 'blur(50px)',
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Subtle vignette - Hidden on success */}
      {currentStep !== 'success' && (
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_100%)]"
          animate={{ opacity: showUploadingState ? 0.7 : 0.5 }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Main Content Container - Hidden on success */}
      {currentStep !== 'success' && currentStep !== 'uploading' && (
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto">
        
        {/* Hero Upload Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
          }}
          transition={{ 
            duration: 0.9, 
            delay: 0.1, 
            ease: appleEasing 
          }}
          style={{ 
            rotateX: showUploadingState || isComplete ? 0 : rotateX, 
            rotateY: showUploadingState || isComplete ? 0 : rotateY, 
            transformPerspective: 1200 
          }}
          className="w-full"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Ambient glow behind card */}
          <motion.div
            className="absolute -inset-16 rounded-[60px] pointer-events-none"
            animate={{
              opacity: showUploadingState ? 0.7 : (isDragging ? 0.6 : isHovering ? 0.35 : 0.2),
              scale: showUploadingState ? 1.08 : (isDragging ? 1.05 : isHovering ? 1.02 : 1),
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, transparent 65%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Card border highlight */}
          <motion.div 
            className="absolute -inset-[1px] rounded-[28px] overflow-hidden"
            animate={{
              opacity: showUploadingState ? 1 : (isDragging ? 1 : isHovering ? 0.6 : 0.35),
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: showUploadingState || isDragging 
                  ? 'linear-gradient(135deg, hsl(var(--primary) / 0.5) 0%, hsl(var(--primary) / 0.2) 50%, hsl(var(--primary) / 0.5) 100%)'
                  : 'linear-gradient(135deg, hsl(var(--border) / 0.7) 0%, transparent 50%, hsl(var(--border) / 0.7) 100%)'
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Glass Card */}
          <motion.div
            className="relative rounded-[28px] overflow-hidden"
            style={{
              background: 'hsl(var(--card) / 0.65)',
              backdropFilter: 'blur(60px)',
              WebkitBackdropFilter: 'blur(60px)',
            }}
            animate={{
              y: isHovering && !showUploadingState ? -4 : 0,
              boxShadow: showUploadingState
                ? '0 60px 120px -30px hsl(var(--primary) / 0.25), 0 40px 80px -20px hsl(var(--foreground) / 0.12), 0 20px 40px -10px hsl(var(--foreground) / 0.08), inset 0 1px 0 0 hsl(0 0% 100% / 0.12)'
                : isDragging
                  ? '0 60px 120px -30px hsl(var(--primary) / 0.25), 0 40px 80px -20px hsl(var(--foreground) / 0.12), 0 20px 40px -10px hsl(var(--foreground) / 0.08), inset 0 1px 0 0 hsl(0 0% 100% / 0.12)'
                  : isHovering 
                    ? '0 50px 100px -25px hsl(var(--foreground) / 0.12), 0 30px 60px -15px hsl(var(--foreground) / 0.08), 0 15px 30px -8px hsl(var(--foreground) / 0.06), inset 0 1px 0 0 hsl(0 0% 100% / 0.1)'
                    : '0 35px 70px -20px hsl(var(--foreground) / 0.08), 0 20px 40px -12px hsl(var(--foreground) / 0.05), 0 10px 20px -6px hsl(var(--foreground) / 0.03), inset 0 1px 0 0 hsl(0 0% 100% / 0.08)',
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Inner subtle highlight */}
            <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-border/30" />

            <div className="flex flex-col items-center justify-center py-16 px-8 md:py-20 md:px-12">
              
              <AnimatePresence mode="wait">
                {/* STEP 1: Upload State */}
                {currentStep === 'upload' && (
                  <motion.div
                    key="upload-step"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: appleEasing }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Icon */}
                    <motion.div
                      className="relative mb-10"
                      animate={{ 
                        y: isDragging ? -12 : 0,
                        scale: isDragging ? 1.1 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      {/* Glow */}
                      <motion.div
                        className="absolute -inset-4 rounded-2xl blur-2xl"
                        animate={{
                          opacity: isDragging ? 1 : 0.35,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{ backgroundColor: 'hsl(var(--primary) / 0.3)' }}
                      />
                      
                      {/* Icon Square */}
                      <motion.div
                        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          isDragging
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary/80 text-muted-foreground'
                        }`}
                      >
                        <Upload className="w-8 h-8" />
                      </motion.div>

                      {/* Pulse Rings */}
                      {isDragging && (
                        <>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 rounded-2xl border-2 border-primary"
                              initial={{ opacity: 0.6, scale: 1 }}
                              animate={{ opacity: 0, scale: 1.5 + i * 0.2 }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeOut",
                              }}
                            />
                          ))}
                        </>
                      )}
                    </motion.div>

                    {/* Title & Subtitle */}
                    <motion.h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3 text-center">
                      Send anything
                    </motion.h2>
                    <motion.p className="text-base text-muted-foreground mb-10 text-center max-w-sm">
                      Files of any size, delivered securely
                    </motion.p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <motion.button
                        onClick={() => fileInputRef.current?.click()}
                        className="group relative h-12 px-7 rounded-xl font-medium text-sm overflow-hidden"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div 
                          className="absolute -inset-2 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
                            filter: 'blur(12px)',
                          }}
                        />
                        <motion.div className="absolute inset-0 bg-primary rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/12 to-transparent rounded-xl" />
                        <span className="relative flex items-center gap-2 text-primary-foreground font-medium">
                          <Upload className="w-4 h-4" />
                          Choose Files
                        </span>
                      </motion.button>

                      <motion.button
                        onClick={() => folderInputRef.current?.click()}
                        className="group relative h-12 px-7 rounded-xl font-medium text-sm overflow-hidden"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div 
                          className="absolute -inset-2 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'radial-gradient(ellipse at center, hsl(var(--foreground) / 0.08) 0%, transparent 70%)',
                            filter: 'blur(10px)',
                          }}
                        />
                        <motion.div className="absolute inset-0 bg-secondary rounded-xl border border-border/60 transition-all duration-300 group-hover:bg-secondary/90 group-hover:border-border/80 group-hover:shadow-md" />
                        <span className="relative flex items-center gap-2 text-foreground/75 group-hover:text-foreground transition-colors duration-200">
                          <FolderUp className="w-4 h-4" />
                          Upload Folder
                        </span>
                      </motion.button>
                    </div>

                    <p className="mt-5 text-xs text-muted-foreground/40">
                      Drag & drop supported
                    </p>

                    {/* Supported Formats */}
                    <div className="mt-8 w-full">
                      <button
                        onClick={() => setShowFormats(!showFormats)}
                        className="flex items-center gap-1.5 mx-auto text-xs text-muted-foreground/50 hover:text-muted-foreground/70 transition-colors duration-200"
                      >
                        <span>All file types supported</span>
                        <motion.div
                          animate={{ rotate: showFormats ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {showFormats && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: appleEasing }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap justify-center gap-1.5 mt-4 max-w-md mx-auto">
                              {supportedFormats.map((format, i) => (
                                <motion.span
                                  key={format}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.02 }}
                                  className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground/60 bg-secondary/40 rounded-md border border-border/30"
                                >
                                  {format}
                                </motion.span>
                              ))}
                              <span className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground/40">+more</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Configure (combined delivery + settings) */}
                {currentStep === 'configure' && (
                  <TransferConfigure
                    files={queuedFiles.map(f => ({ id: f.id, name: f.name, size: f.size }))}
                    totalSize={totalSize}
                    deliveryMethod={selectedDeliveryMethod}
                    onDeliveryMethodChange={setSelectedDeliveryMethod}
                    settings={{
                      password: settings.password,
                      expiryDays: settings.expiryDays,
                      recipients: settings.recipients,
                      subject: settings.subject,
                      message: settings.message,
                      senderEmail: settings.senderEmail,
                    }}
                    onSettingsChange={(s) => setSettings(prev => ({ ...prev, ...s }))}
                    onAddMore={() => addMoreInputRef.current?.click()}
                    onRemoveFile={handleRemoveFile}
                    onBack={handleBackToUpload}
                    onTransfer={handleStartActualUpload}
                  />
                )}


              </AnimatePresence>

              {/* Hidden inputs */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                
              />
              <input
                ref={folderInputRef}
                type="file"
                // @ts-ignore
                webkitdirectory=""
                directory=""
                multiple
                className="hidden"
                onChange={handleFileSelect}
                
              />
              <input
                ref={addMoreInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Footer - Below the card */}
        <AnimatePresence>
          {currentStep === 'upload' && (
            <TrustFooter variant="transfer" />
          )}
        </AnimatePresence>
      </div>
    )}

    {/* FULL PAGE UPLOADING - cinematic TransferProgress */}
    {currentStep === 'uploading' && (
      <div className="relative z-20 w-full">
        <TransferProgress
          files={queuedFiles.map(f => ({
            id: f.id,
            file: f.file,
            name: f.name,
            size: f.size,
            type: f.file.type,
            progress: uploadProgress,
            status: (uploadProgress >= 100 ? 'completed' : 'uploading') as 'completed' | 'uploading',
          }))}
          totalSize={queuedFiles.reduce((acc, f) => acc + f.size, 0)}
        />
      </div>
    )}

    {/* FULL PAGE SUCCESS - TransferSuccess component */}
    {currentStep === 'success' && (
      <div className="relative z-20 w-full">
        <TransferSuccess
        files={queuedFiles.map(f => ({
          id: f.id,
          file: f.file,
          name: f.name,
          size: f.size,
          type: f.file.type,
          progress: f.progress || 100,
          status: 'completed' as const,
        }))}
        settings={{
          deliveryMethod: selectedDeliveryMethod || 'link',
          recipients: settings.recipients,
          subject: settings.subject,
          message: settings.message,
          password: settings.password,
          expiryDays: settings.expiryDays,
          downloadLimit: settings.downloadLimit,
          viewOnly: settings.viewOnly,
        }}
        transferLink={transferLink}
        transferId={Math.random().toString(36).substring(2, 10)}
        onStartOver={handleStartOver}
      />
      </div>
    )}
    </div>
  );
}
