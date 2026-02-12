import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FolderUp, X, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StorageUploadZoneProps {
  onUpload: (files: File[]) => void;
  onClose: () => void;
}

const StorageUploadZone = ({ onUpload, onClose }: StorageUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleConfirmUpload = () => {
    if (uploadedFiles.length > 0) {
      onUpload(uploadedFiles);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card-elevated rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Upload Files</h3>
      </div>

      {/* Upload zone */}
      <div className="p-5">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-xl p-12 transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border/50 hover:border-primary/50 hover:bg-surface-2/50"
          )}
        >
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
            >
              <Upload className="w-8 h-8 text-primary" />
            </motion.div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              Drag & Drop Files or Folders
            </h4>
            <p className="text-sm text-muted-foreground mb-6">
              or
            </p>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Files
              </Button>
              <Button
                variant="outline"
                onClick={() => folderInputRef.current?.click()}
                className="gap-2"
              >
                <FolderUp className="w-4 h-4" />
                Upload Folder
              </Button>
            </div>
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
              multiple
              // @ts-ignore - webkitdirectory is a non-standard attribute
              webkitdirectory=""
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        {/* Uploaded files list */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              <p className="text-sm font-medium text-foreground">
                {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} selected
              </p>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-3 bg-surface-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground truncate max-w-[300px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 rounded hover:bg-surface-3 text-muted-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {uploadedFiles.length > 0 && (
        <div className="flex items-center justify-end gap-3 p-5 border-t border-border/50">
          <Button variant="outline" onClick={() => setUploadedFiles([])}>
            Clear all
          </Button>
          <Button onClick={handleConfirmUpload} className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Upload {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""}
          </Button>
        </div>
      )}

      {/* Trust indicators */}
      <div className="px-5 pb-5 pt-2 text-center">
        <p className="text-xs text-muted-foreground">
          Secure • Encrypted • Enterprise-grade
        </p>
      </div>
    </motion.div>
  );
};

export default StorageUploadZone;
