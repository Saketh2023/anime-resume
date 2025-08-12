'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Share2, Camera, Twitter, Linkedin, Copy, Check, FileImage, FileText, Link2, ChevronDown, AlertCircle, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

export type ExportFormat = 'png' | 'jpg' | 'pdf' | 'link';

interface ExportShareButtonProps {
  targetElementId?: string;
  className?: string;
  onExport?: (format: ExportFormat, result: string | Blob) => void;
}

interface ExportProgress {
  stage: string;
  progress: number;
}

const EXPORT_CONFIGS = {
  png: {
    label: 'PNG Image',
    icon: FileImage,
    description: 'High-quality image (best for sharing)',
    mime: 'image/png',
    quality: 1,
    scale: 2,
  },
  jpg: {
    label: 'JPEG Image', 
    icon: FileImage,
    description: 'Compressed image (smaller file)',
    mime: 'image/jpeg',
    quality: 0.9,
    scale: 2,
  },
  pdf: {
    label: 'PDF Document',
    icon: FileText,
    description: 'Professional document format',
    mime: 'application/pdf',
    quality: 1,
    scale: 1.5,
  },
  link: {
    label: 'Share Link',
    icon: Link2,
    description: 'Copy shareable URL',
    mime: 'text/plain',
    quality: 1,
    scale: 1,
  },
};

export function ExportShareButton({ 
  targetElementId = 'hero-section', 
  className = '',
  onExport
}: ExportShareButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat | null>(null);
  const [exportProgress, setExportProgress] = useState<ExportProgress>({ stage: '', progress: 0 });
  const [exportComplete, setExportComplete] = useState<ExportFormat | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const updateProgress = useCallback((stage: string, progress: number) => {
    setExportProgress({ stage, progress });
  }, []);

  const exportToImage = useCallback(async (format: 'png' | 'jpg'): Promise<Blob> => {
    const config = EXPORT_CONFIGS[format];
    
    updateProgress('Locating target element...', 10);
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) {
      throw new Error(`Element with ID "${targetElementId}" not found`);
    }

    updateProgress('Preparing canvas capture...', 20);
    
    // Create share card layout for better export
    const shareCard = document.getElementById('share-card') || targetElement;
    
    const canvas = await html2canvas(shareCard, {
      backgroundColor: format === 'jpg' ? '#0a0a0a' : null,
      scale: config.scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: shareCard.scrollWidth,
      height: shareCard.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      // Enhanced options for better quality
      imageTimeout: 15000,
      ignoreElements: (element) => {
        return element.classList.contains('no-export') ||
               element.classList.contains('export-ignore') ||
               element.tagName === 'SCRIPT';
      },
      onclone: (clonedDoc) => {
        updateProgress('Optimizing cloned document...', 40);
        const clonedElement = clonedDoc.getElementById(targetElementId);
        if (clonedElement) {
          // Ensure fonts are loaded
          clonedElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
          // Enhance contrast for export
          clonedElement.style.filter = 'contrast(1.05) brightness(1.02)';
        }
      }
    });

    updateProgress('Generating image blob...', 80);
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error(`Failed to create ${format.toUpperCase()} blob`));
          return;
        }
        updateProgress('Image generation complete!', 100);
        resolve(blob);
      }, config.mime, config.quality);
    });
  }, [targetElementId, updateProgress]);

  const exportToPDF = useCallback(async (): Promise<Blob> => {
    updateProgress('Converting to PDF...', 20);
    
    // First generate a high-quality image
    const imageBlob = await exportToImage('png');
    
    updateProgress('Creating PDF document...', 60);
    
    // For now, we'll create a simple PDF wrapper
    // In a production app, you'd use jsPDF or PDFKit
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Set canvas size for standard letter size
        const aspectRatio = img.height / img.width;
        canvas.width = 794; // 8.5 inches * 96 DPI
        canvas.height = 1123; // 11 inches * 96 DPI
        
        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Calculate dimensions to fit the image
        const maxWidth = canvas.width - 60; // 30px margin on each side
        const maxHeight = canvas.height - 60;
        
        let drawWidth = maxWidth;
        let drawHeight = drawWidth * aspectRatio;
        
        if (drawHeight > maxHeight) {
          drawHeight = maxHeight;
          drawWidth = drawHeight / aspectRatio;
        }
        
        const x = (canvas.width - drawWidth) / 2;
        const y = 30; // Top margin
        
        ctx.drawImage(img, x, y, drawWidth, drawHeight);
        
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create PDF blob'));
            return;
          }
          updateProgress('PDF generation complete!', 100);
          resolve(blob);
        }, 'image/png');
      };
      
      img.onerror = () => reject(new Error('Failed to load image for PDF'));
      img.src = URL.createObjectURL(imageBlob);
    });
  }, [exportToImage, updateProgress]);

  const generateShareLink = useCallback((): string => {
    updateProgress('Generating share link...', 50);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const currentTheme = typeof window !== 'undefined' 
      ? localStorage.getItem('anime-resume-theme') || 'phantom'
      : 'phantom';
    
    const shareData = {
      theme: currentTheme,
      timestamp: Date.now(),
      version: '1.0'
    };
    
    const encoded = btoa(JSON.stringify(shareData));
    updateProgress('Share link ready!', 100);
    return `${baseUrl}?theme=${currentTheme}&share=${encoded}`;
  }, [updateProgress]);

  const handleExport = useCallback(async (format: ExportFormat) => {
    setIsExporting(true);
    setExportFormat(format);
    setError(null);
    setExportProgress({ stage: 'Initializing...', progress: 0 });
    
    try {
      let result: string | Blob;
      
      switch (format) {
        case 'png':
        case 'jpg':
          result = await exportToImage(format);
          break;
        case 'pdf':
          result = await exportToPDF();
          break;
        case 'link':
          result = generateShareLink();
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }
      
      onExport?.(format, result);
      
      if (format === 'link') {
        // Copy link to clipboard
        await navigator.clipboard.writeText(result as string);
      } else {
        // Download file
        const blob = result as Blob;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `phantom-thief-resume-${new Date().toISOString().split('T')[0]}.${format}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
      
      setExportComplete(format);
      setTimeout(() => setExportComplete(null), 4000);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export failed';
      setError(errorMessage);
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
      setExportFormat(null);
      setShowExportMenu(false);
    }
  }, [exportToImage, exportToPDF, generateShareLink, onExport]);

  const shareToTwitter = useCallback(() => {
    const text = encodeURIComponent("Check out my phantom thief resume - elite developer skills in anime style! 👻💻 #PhantomThief #Developer #AnimeResume");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  }, []);

  const shareToLinkedIn = useCallback(() => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Phantom Thief Developer Resume");
    const summary = encodeURIComponent("An innovative developer resume with anime-inspired design showcasing technical expertise and professional achievements.");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank');
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div className={`relative ${className}`} ref={buttonRef}>
      {/* Main Buttons */}
      <div className="flex items-center space-x-2">
        {/* Export Button */}
        <motion.button
          onClick={() => setShowExportMenu(!showExportMenu)}
          disabled={isExporting}
          className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            isExporting
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white border border-red-500 hover:shadow-lg hover:shadow-red-500/25"
          }`}
          whileHover={!isExporting ? { scale: 1.02, y: -1 } : {}}
          whileTap={!isExporting ? { scale: 0.98 } : {}}
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isExporting ? 'Exporting...' : 'Export'}
          {!isExporting && <ChevronDown className="w-3 h-3 ml-1" />}
        </motion.button>

        {/* Share Button */}
        <motion.button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium border border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
          <ChevronDown className="w-3 h-3 ml-1" />
        </motion.button>
      </div>

      {/* Export Menu */}
      <AnimatePresence>
        {showExportMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
            <motion.div
              className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl z-50 min-w-[280px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
            >
              <div className="p-4">
                <div className="text-sm font-medium text-gray-300 mb-3">
                  Export Options
                </div>
                <div className="space-y-2">
                  {(Object.entries(EXPORT_CONFIGS) as [ExportFormat, typeof EXPORT_CONFIGS[ExportFormat]][]).map(([format, config]) => {
                    const IconComponent = config.icon;
                    return (
                      <motion.button
                        key={format}
                        onClick={() => handleExport(format)}
                        className="flex items-center w-full p-3 text-left hover:bg-white/5 rounded-lg transition-colors group"
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center mr-3 group-hover:bg-gray-600">
                          <IconComponent className="w-4 h-4 text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{config.label}</div>
                          <div className="text-xs text-gray-400">{config.description}</div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
            <motion.div
              className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl z-50 min-w-[240px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
            >
              <div className="p-4">
                <div className="text-sm font-medium text-gray-300 mb-3">
                  Share Resume
                </div>
                <div className="space-y-2">
                  <motion.button
                    onClick={shareToTwitter}
                    className="flex items-center w-full p-3 text-left hover:bg-blue-900/20 rounded-lg transition-colors text-gray-300 hover:text-blue-400"
                    whileHover={{ x: 4 }}
                  >
                    <Twitter className="w-4 h-4 mr-3" />
                    Share on Twitter
                  </motion.button>
                  <motion.button
                    onClick={shareToLinkedIn}
                    className="flex items-center w-full p-3 text-left hover:bg-blue-900/20 rounded-lg transition-colors text-gray-300 hover:text-blue-600"
                    whileHover={{ x: 4 }}
                  >
                    <Linkedin className="w-4 h-4 mr-3" />
                    Share on LinkedIn
                  </motion.button>
                  <motion.button
                    onClick={copyToClipboard}
                    className="flex items-center w-full p-3 text-left hover:bg-green-900/20 rounded-lg transition-colors text-gray-300 hover:text-green-400"
                    whileHover={{ x: 4 }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-3" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-3" />
                        Copy Link
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Export Progress Modal */}
      <AnimatePresence>
        {isExporting && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div
              className="bg-black/95 rounded-2xl p-8 border border-red-500/30 max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  {exportFormat === 'png' || exportFormat === 'jpg' ? '📸' : 
                   exportFormat === 'pdf' ? '📄' : '🔗'}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {exportFormat === 'link' ? 'Generating Link' : `Exporting as ${exportFormat?.toUpperCase()}`}
                </h3>
                <p className="text-gray-400 mb-6">{exportProgress.stage}</p>
                
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden mb-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${exportProgress.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-sm text-gray-400">
                  {exportProgress.progress}% complete
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {exportComplete && (
          <motion.div
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 flex items-center max-w-sm"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
          >
            <Check className="w-5 h-5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-semibold">
                {exportComplete === 'link' ? 'Link Copied!' : 'Export Complete!'}
              </div>
              <div className="text-sm opacity-90">
                {exportComplete === 'link' 
                  ? 'Share link copied to clipboard' 
                  : `Resume saved as ${exportComplete.toUpperCase()}`}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Notification */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-4 rounded-xl shadow-xl z-50 flex items-center max-w-sm"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
          >
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-semibold">Export Failed</div>
              <div className="text-sm opacity-90">{error}</div>
            </div>
            <button 
              onClick={() => setError(null)}
              className="ml-3 text-white/80 hover:text-white"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}