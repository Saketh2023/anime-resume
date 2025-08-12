"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Download, Share2, Camera, Twitter, Linkedin, Copy, Check } from "lucide-react";
import html2canvas from "html2canvas";

interface ExportShareButtonProps {
  targetElementId?: string;
  className?: string;
  useShareCard?: boolean; // Use dedicated share card instead of hero section
}

export function ExportShareButton({ 
  targetElementId = "share-card", 
  className = "",
  useShareCard = true 
}: ExportShareButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const exportToPNG = async () => {
    setIsExporting(true);
    setExportComplete(false);
    
    try {
      // Find the target element to capture
      const targetElement = document.getElementById(targetElementId);
      if (!targetElement) {
        throw new Error(`Element with ID "${targetElementId}" not found`);
      }

      // Prepare dimensions for social media optimization
      const isShareCard = useShareCard && targetElementId === 'share-card';
      let exportWidth = targetElement.scrollWidth;
      let exportHeight = targetElement.scrollHeight;
      
      // For share card, optimize for social media (1200x630 aspect ratio)
      if (isShareCard) {
        const aspectRatio = 1200 / 630; // ~1.9:1
        if (exportWidth / exportHeight > aspectRatio) {
          exportHeight = exportWidth / aspectRatio;
        } else {
          exportWidth = exportHeight * aspectRatio;
        }
        
        // Ensure minimum social media dimensions
        if (exportWidth < 1200) {
          exportWidth = 1200;
          exportHeight = 630;
        }
      }

      // Configure html2canvas options for optimal quality
      const canvas = await html2canvas(targetElement, {
        backgroundColor: isShareCard ? null : '#0a0a0a', // Transparent for share card
        scale: 2, // High DPI for crisp social sharing
        useCORS: true,
        allowTaint: false, // Prevent CORS issues
        logging: false,
        width: exportWidth,
        height: exportHeight,
        scrollX: 0,
        scrollY: 0,
        imageTimeout: 15000, // Longer timeout for complex renders
        removeContainer: true,
        // Enhanced element filtering
        ignoreElements: (element) => {
          return element.tagName === 'SCRIPT' || 
                 element.tagName === 'NOSCRIPT' ||
                 element.classList.contains('no-export') ||
                 element.classList.contains('export-ignore') ||
                 element.getAttribute('data-no-export') === 'true';
        },
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(targetElementId);
          if (clonedElement) {
            // Enhanced font loading and styling
            clonedElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
            
            // Optimize for export rendering
            if (isShareCard) {
              clonedElement.style.minHeight = '100vh';
              clonedElement.style.width = exportWidth + 'px';
              clonedElement.style.height = exportHeight + 'px';
              
              // Enhance visual quality for export
              clonedElement.style.filter = 'contrast(1.05) brightness(1.02) saturate(1.1)';
            }
            
            // Pause animations for consistent capture
            const animatedElements = clonedDoc.querySelectorAll('*');
            animatedElements.forEach(el => {
              const element = el as HTMLElement;
              element.style.animationPlayState = 'paused';
              element.style.animationDelay = '0s';
              element.style.transitionDuration = '0s';
            });
            
            // Fix any positioning issues
            const fixedElements = clonedDoc.querySelectorAll('.fixed, [style*="position: fixed"]');
            fixedElements.forEach(el => {
              (el as HTMLElement).style.position = 'absolute';
            });
          }
        }
      });

      // Convert canvas to high-quality PNG and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().split('T')[0];
          const exportType = isShareCard ? 'social' : 'resume';
          link.download = `phantom-thief-${exportType}-${timestamp}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          
          setExportComplete(true);
          setTimeout(() => setExportComplete(false), 3000);
        }
      }, 'image/png', 1.0); // Maximum quality

    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent("Check out my phantom thief resume - a developer with elite stealth skills! 👻💻 #PhantomThief #Developer #Resume #TechResume #AnimeStyle");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=550,height=420');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("Elite Developer Portfolio - Phantom Thief Style");
    const summary = encodeURIComponent("An innovative developer resume with anime-inspired design, showcasing technical expertise through a unique phantom thief narrative. Experience professional projects reimagined as elite missions.");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=550,height=550');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`relative ${className}`} ref={buttonRef}>
      {/* Main Export Button */}
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Export to PNG Button */}
        <motion.button
          onClick={exportToPNG}
          disabled={isExporting}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            exportComplete
              ? "bg-green-600 text-white border-green-500"
              : isExporting
              ? "bg-gray-600 text-gray-300 border-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white border-red-500 hover:shadow-lg hover:shadow-red-500/20"
          }`}
          whileHover={!isExporting && !exportComplete ? { scale: 1.05, y: -2 } : {}}
          whileTap={!isExporting && !exportComplete ? { scale: 0.95 } : {}}
        >
          <motion.div
            animate={isExporting ? { rotate: 360 } : { rotate: 0 }}
            transition={isExporting ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
          >
            {exportComplete ? (
              <Check size={18} className="mr-2" />
            ) : isExporting ? (
              <Camera size={18} className="mr-2" />
            ) : (
              <Download size={18} className="mr-2" />
            )}
          </motion.div>
          {exportComplete ? "Exported!" : isExporting ? "Capturing..." : (useShareCard ? "Export Card" : "Export PNG")}
        </motion.button>

        {/* Share Button */}
        <motion.button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium border border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 size={18} className="mr-2" />
          Share
        </motion.button>
      </motion.div>

      {/* Share Menu */}
      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Options */}
          <motion.div
            className="absolute top-full mt-2 right-0 bg-black/90 backdrop-blur-sm rounded-xl border border-gray-700 p-4 z-50 min-w-[200px]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2">
              {/* Export PNG Option */}
              <motion.button
                onClick={exportToPNG}
                disabled={isExporting}
                className="flex items-center w-full px-3 py-2 text-left text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isExporting ? { x: 4 } : {}}
              >
                <Download size={16} className="mr-3" />
                {isExporting ? 'Exporting...' : 'Download PNG'}
              </motion.button>

              {/* Divider */}
              <div className="border-t border-gray-700 my-2" />

              {/* Twitter Share */}
              <motion.button
                onClick={shareToTwitter}
                className="flex items-center w-full px-3 py-2 text-left text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
                whileHover={{ x: 4 }}
              >
                <Twitter size={16} className="mr-3" />
                Share on Twitter
              </motion.button>

              {/* LinkedIn Share */}
              <motion.button
                onClick={shareToLinkedIn}
                className="flex items-center w-full px-3 py-2 text-left text-gray-300 hover:text-blue-600 hover:bg-blue-900/20 rounded-lg transition-colors"
                whileHover={{ x: 4 }}
              >
                <Linkedin size={16} className="mr-3" />
                Share on LinkedIn
              </motion.button>

              {/* Copy Link */}
              <motion.button
                onClick={copyToClipboard}
                className="flex items-center w-full px-3 py-2 text-left text-gray-300 hover:text-green-400 hover:bg-green-900/20 rounded-lg transition-colors"
                whileHover={{ x: 4 }}
              >
                {copied ? (
                  <>
                    <Check size={16} className="mr-3" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} className="mr-3" />
                    Copy Link
                  </>
                )}
              </motion.button>
            </div>

            {/* Share Tips */}
            <div className="border-t border-gray-700 mt-4 pt-3 text-xs text-gray-500">
              <p className="mb-2">💡 Export Features:</p>
              <ul className="space-y-1 text-[10px]">
                <li>• {useShareCard ? 'Optimized share card (1200x630px)' : 'Full hero section capture'}</li>
                <li>• High-resolution (2x scale) for crisp quality</li>
                <li>• Perfect for social media platforms</li>
                <li>• Professional presentation ready</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}

      {/* Export Success Notification */}
      {exportComplete && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring" }}
        >
          <Check size={20} className="mr-2" />
          <div>
            <div className="font-semibold">Export Complete!</div>
            <div className="text-sm opacity-90">Resume saved to downloads</div>
          </div>
        </motion.div>
      )}

      {/* Loading Overlay for Export */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div
            className="bg-black/90 rounded-xl p-8 text-center border border-red-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              📸
            </motion.div>
            <h3 className="text-xl font-bold text-white mb-2">
              {useShareCard ? 'Capturing Share Card' : 'Capturing Resume'}
            </h3>
            <p className="text-gray-400 mb-4">
              {useShareCard 
                ? 'Creating optimized social media export...'
                : 'Creating high-quality PNG export...'
              }
            </p>
            <div className="w-48 bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {useShareCard 
                ? 'Optimizing for social media dimensions (1200x630px)'
                : 'This may take a few seconds for optimal quality'
              }
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}