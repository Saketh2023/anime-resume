import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export type ExportFormat = 'pdf' | 'png' | 'jpg' | 'link';

export interface ExportOptions {
  element?: HTMLElement;
  elementId?: string;
  scale?: number;
  backgroundColor?: string | null;
  filename?: string;
  quality?: number;
}

export interface ExportProgress {
  stage: string;
  progress: number;
}

export type ProgressCallback = (progress: ExportProgress) => void;

// Default export configurations
const DEFAULT_OPTIONS: Record<ExportFormat, Partial<ExportOptions>> = {
  png: {
    scale: 2,
    backgroundColor: null,
    quality: 1,
  },
  jpg: {
    scale: 2,
    backgroundColor: '#0a0a0a',
    quality: 0.95,
  },
  pdf: {
    scale: 1.5,
    backgroundColor: '#ffffff',
    quality: 1,
  },
  link: {
    scale: 1,
    backgroundColor: null,
    quality: 1,
  },
};

// Social media optimized configurations
export const SOCIAL_MEDIA_CONFIG = {
  twitter: { width: 1200, height: 630 }, // 1.91:1 aspect ratio
  linkedin: { width: 1200, height: 627 }, // Recommended size
  facebook: { width: 1200, height: 630 }, // Open Graph standard
  instagram: { width: 1080, height: 1080 }, // Square format
  general: { width: 1200, height: 630 } // Default OG image size
};

export async function exportResume(
  format: ExportFormat, 
  options: ExportOptions = {},
  onProgress?: ProgressCallback
): Promise<string | Blob> {
  const config = { ...DEFAULT_OPTIONS[format], ...options };
  
  // Get target element
  let element: HTMLElement;
  if (config.element) {
    element = config.element;
  } else if (config.elementId) {
    const found = document.getElementById(config.elementId);
    if (!found) throw new Error(`Element with ID "${config.elementId}" not found`);
    element = found;
  } else {
    // Try common IDs in order of preference for export
    const commonIds = ['share-card', 'hero-section', 'anime-resume'];
    const found = commonIds.map(id => document.getElementById(id)).find(el => el !== null);
    if (!found) throw new Error('No target element found. Specify elementId or element.');
    element = found;
  }

  onProgress?.({ stage: 'Initializing export...', progress: 0 });

  switch (format) {
    case 'png':
      return await exportAsImage(element, 'png', config, onProgress);
    case 'jpg':
      return await exportAsImage(element, 'jpg', config, onProgress);
    case 'pdf':
      return await exportAsPDF(element, config, onProgress);
    case 'link':
      return generateShareableLink(onProgress);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

async function exportAsImage(
  element: HTMLElement, 
  format: 'png' | 'jpg',
  config: ExportOptions,
  onProgress?: ProgressCallback
): Promise<Blob> {
  onProgress?.({ stage: 'Preparing canvas capture...', progress: 20 });
  
  // Optimize element for capture
  const originalOverflow = element.style.overflow;
  element.style.overflow = 'visible';
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: config.backgroundColor || (format === 'jpg' ? '#0a0a0a' : null),
      scale: config.scale || 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 15000,
      // Improved element filtering
      ignoreElements: (element) => {
        const classList = element.classList;
        return classList.contains('no-export') ||
               classList.contains('export-ignore') ||
               classList.contains('no-print') ||
               element.tagName === 'SCRIPT' ||
               element.tagName === 'NOSCRIPT' ||
               element.getAttribute('data-no-export') === 'true';
      },
      onclone: (clonedDoc) => {
        onProgress?.({ stage: 'Optimizing document clone...', progress: 50 });
        
        // Enhance cloned document for better rendering
        const clonedElement = clonedDoc.querySelector('[id]') as HTMLElement;
        if (clonedElement) {
          // Ensure consistent fonts
          clonedElement.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
          
          // Optimize visual quality for different formats
          if (format === 'png') {
            clonedElement.style.filter = 'contrast(1.05) brightness(1.02) saturate(1.1)';
          } else if (format === 'jpg') {
            // For JPG, ensure better contrast since no transparency
            clonedElement.style.filter = 'contrast(1.08) brightness(1.03) saturate(1.05)';
          }
          
          // Remove any fixed positioning that might cause issues
          const fixedElements = clonedDoc.querySelectorAll('[style*="position: fixed"], .fixed');
          fixedElements.forEach(el => {
            (el as HTMLElement).style.position = 'absolute';
          });
          
          // Ensure animations are paused for consistent capture
          const animatedElements = clonedDoc.querySelectorAll('*');
          animatedElements.forEach(el => {
            (el as HTMLElement).style.animationPlayState = 'paused';
            (el as HTMLElement).style.animationDelay = '0s';
          });
        }
      }
    });

    onProgress?.({ stage: `Creating ${format.toUpperCase()} blob...`, progress: 80 });
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error(`Failed to create ${format.toUpperCase()} blob`));
          return;
        }
        
        // Validate blob size (minimum 10KB for reasonable quality)
        if (blob.size < 10000) {
          console.warn('Export blob is smaller than expected - possible quality issues');
        }
        
        onProgress?.({ stage: 'Export complete!', progress: 100 });
        resolve(blob);
      }, `image/${format}`, config.quality || 1);
    });
    
  } finally {
    // Restore original styles
    element.style.overflow = originalOverflow;
  }
}

async function exportAsPDF(
  element: HTMLElement,
  config: ExportOptions,
  onProgress?: ProgressCallback
): Promise<Blob> {
  onProgress?.({ stage: 'Converting to PDF format...', progress: 20 });
  
  // First, create a high-quality PNG for the PDF
  const imageBlob = await exportAsImage(element, 'png', {
    ...config,
    backgroundColor: '#ffffff',
    scale: config.scale || 2,
  }, (progress) => {
    onProgress?.({
      stage: `PDF Step 1/2: ${progress.stage}`,
      progress: progress.progress * 0.6
    });
  });
  
  onProgress?.({ stage: 'Creating PDF document...', progress: 70 });
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      try {
        onProgress?.({ stage: 'Formatting PDF layout...', progress: 80 });
        
        // Create jsPDF instance
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });
        
        // Get PDF dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10; // mm
        
        onProgress?.({ stage: 'Processing image for PDF...', progress: 85 });
        
        // Calculate image dimensions to fit PDF page
        const availableWidth = pdfWidth - (margin * 2);
        const availableHeight = pdfHeight - (margin * 2);
        
        const imageAspect = img.height / img.width;
        let finalWidth = availableWidth;
        let finalHeight = finalWidth * imageAspect;
        
        if (finalHeight > availableHeight) {
          finalHeight = availableHeight;
          finalWidth = finalHeight / imageAspect;
        }
        
        const x = (pdfWidth - finalWidth) / 2;
        const y = margin;
        
        onProgress?.({ stage: 'Adding image to PDF...', progress: 90 });
        
        // Add image to PDF
        pdf.addImage(img, 'PNG', x, y, finalWidth, finalHeight, '', 'FAST');
        
        onProgress?.({ stage: 'Adding metadata and footer...', progress: 95 });
        
        // Add metadata
        pdf.setProperties({
          title: 'Phantom Thief Resume',
          subject: 'Developer Resume',
          author: 'Phantom Thief System',
          creator: 'Anime Resume Generator',
          keywords: 'resume, developer, phantom thief'
        });
        
        // Add footer
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        const footerText = `Generated on ${new Date().toLocaleDateString()} • Phantom Thief Resume System`;
        const textWidth = pdf.getStringUnitWidth(footerText) * 8 / pdf.internal.scaleFactor;
        pdf.text(footerText, (pdfWidth - textWidth) / 2, pdfHeight - 5);
        
        onProgress?.({ stage: 'Finalizing PDF...', progress: 98 });
        
        // Convert to blob
        const pdfBlob = pdf.output('blob');
        onProgress?.({ stage: 'PDF export complete!', progress: 100 });
        resolve(pdfBlob);
        
      } catch (error) {
        reject(new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image for PDF'));
    img.src = URL.createObjectURL(imageBlob);
  });
}

function generateShareableLink(onProgress?: ProgressCallback): string {
  onProgress?.({ stage: 'Building share data...', progress: 30 });
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
  const currentTheme = typeof window !== 'undefined' 
    ? localStorage.getItem('anime-resume-theme') || 'phantom'
    : 'phantom';
  
  onProgress?.({ stage: 'Encoding share parameters...', progress: 60 });
  
  const shareData = {
    theme: currentTheme,
    timestamp: Date.now(),
    version: '1.0',
    source: 'phantom-thief-resume'
  };
  
  const encoded = btoa(JSON.stringify(shareData));
  const shareUrl = `${baseUrl}?theme=${currentTheme}&share=${encoded}`;
  
  onProgress?.({ stage: 'Share link ready!', progress: 100 });
  
  return shareUrl;
}

export function parseSharedData(encodedData: string) {
  try {
    const decoded = atob(encodedData);
    const data = JSON.parse(decoded);
    
    // Validate shared data structure
    if (typeof data !== 'object' || !data.theme || !data.timestamp) {
      throw new Error('Invalid share data structure');
    }
    
    // Check if data is not too old (optional, 30 days)
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
    if (Date.now() - data.timestamp > maxAge) {
      console.warn('Shared data is older than 30 days');
    }
    
    return data;
  } catch (error) {
    console.error('Failed to parse shared data:', error);
    return null;
  }
}

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  // Clean up
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Generate optimized filename based on export type and date
export function generateExportFilename(
  type: 'social' | 'resume' | 'card' | 'hero' = 'resume',
  format: 'png' | 'jpg' | 'pdf' = 'png'
): string {
  const date = new Date().toISOString().split('T')[0];
  const timestamp = new Date().getTime().toString().slice(-6);
  return `phantom-thief-${type}-${date}-${timestamp}.${format}`;
}

// Validate export readiness
export function validateExportReadiness(elementId: string): {
  ready: boolean;
  issues: string[];
} {
  const element = document.getElementById(elementId);
  const issues: string[] = [];
  
  if (!element) {
    issues.push(`Element with ID "${elementId}" not found`);
    return { ready: false, issues };
  }
  
  // Check if element is visible
  const styles = getComputedStyle(element);
  if (styles.display === 'none' || styles.visibility === 'hidden') {
    issues.push('Target element is not visible');
  }
  
  // Check if element has reasonable dimensions
  const rect = element.getBoundingClientRect();
  if (rect.width < 100 || rect.height < 100) {
    issues.push('Target element dimensions are too small');
  }
  
  // Check for animations that might interfere
  const animatedElements = element.querySelectorAll('[style*="animation"], .animate-');
  if (animatedElements.length > 10) {
    issues.push('Many animated elements detected - export might capture mid-animation');
  }
  
  return {
    ready: issues.length === 0,
    issues
  };
}

// Utility to get optimal export element
export function getExportElement(preferredId?: string): HTMLElement | null {
  if (preferredId) {
    const element = document.getElementById(preferredId);
    if (element) return element;
  }
  
  // Try common export target IDs in order of preference
  const commonIds = [
    'share-card', // Best for social media
    'hero-section', // Good for general export
    'anime-resume',
    'main-content',
    'app'
  ];
  
  for (const id of commonIds) {
    const element = document.getElementById(id);
    if (element) return element;
  }
  
  // Fallback to body
  return document.body;
}

// Social media specific export function
export async function exportForSocialMedia(
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'general' = 'general',
  elementId: string = 'share-card',
  onProgress?: ProgressCallback
): Promise<Blob> {
  const config = SOCIAL_MEDIA_CONFIG[platform];
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }
  
  onProgress?.({ stage: `Optimizing for ${platform}...`, progress: 10 });
  
  // Temporarily resize element for social media
  const originalStyles = {
    width: element.style.width,
    height: element.style.height,
    minHeight: element.style.minHeight
  };
  
  try {
    element.style.width = `${config.width}px`;
    element.style.height = `${config.height}px`;
    element.style.minHeight = `${config.height}px`;
    
    onProgress?.({ stage: 'Capturing optimized image...', progress: 30 });
    
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2, // High DPI
      useCORS: true,
      allowTaint: false,
      logging: false,
      width: config.width,
      height: config.height,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 15000,
      removeContainer: true,
      ignoreElements: (el) => {
        return el.classList.contains('no-export') ||
               el.classList.contains('export-ignore') ||
               el.getAttribute('data-no-export') === 'true';
      },
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.fontFamily = 'system-ui, -apple-system, sans-serif';
          clonedEl.style.filter = 'contrast(1.05) brightness(1.02) saturate(1.1)';
          
          // Pause animations
          clonedDoc.querySelectorAll('*').forEach(el => {
            const element = el as HTMLElement;
            element.style.animationPlayState = 'paused';
            element.style.transitionDuration = '0s';
          });
        }
      }
    });
    
    onProgress?.({ stage: 'Creating optimized blob...', progress: 80 });
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image blob'));
          return;
        }
        onProgress?.({ stage: 'Social media export complete!', progress: 100 });
        resolve(blob);
      }, 'image/png', 1.0);
    });
    
  } finally {
    // Restore original styles
    element.style.width = originalStyles.width;
    element.style.height = originalStyles.height;
    element.style.minHeight = originalStyles.minHeight;
  }
}

// Utility to prepare element for export
export function prepareElementForExport(element: HTMLElement, socialMedia = false): () => void {
  const originalStyles: { [key: string]: string } = {};
  
  // Store original styles
  originalStyles.overflow = element.style.overflow;
  originalStyles.height = element.style.height;
  originalStyles.maxHeight = element.style.maxHeight;
  originalStyles.position = element.style.position;
  originalStyles.transform = element.style.transform;
  
  // Apply export-friendly styles
  element.style.overflow = 'visible';
  element.style.height = 'auto';
  element.style.maxHeight = 'none';
  
  if (socialMedia) {
    // For social media exports, ensure element is properly positioned
    element.style.position = 'relative';
    element.style.transform = 'none';
  }
  
  // Pause all animations within the element
  const animatedElements = element.querySelectorAll('*');
  const animationStates: Array<{ element: HTMLElement, playState: string, duration: string }> = [];
  
  animatedElements.forEach(el => {
    const htmlEl = el as HTMLElement;
    const computedStyle = getComputedStyle(htmlEl);
    animationStates.push({
      element: htmlEl,
      playState: htmlEl.style.animationPlayState || computedStyle.animationPlayState,
      duration: htmlEl.style.animationDuration || computedStyle.animationDuration
    });
    
    htmlEl.style.animationPlayState = 'paused';
    htmlEl.style.transitionDuration = '0s';
  });
  
  // Return cleanup function
  return () => {
    Object.keys(originalStyles).forEach(key => {
      element.style[key as any] = originalStyles[key];
    });
    
    // Restore animation states
    animationStates.forEach(({ element, playState, duration }) => {
      if (playState !== 'paused') {
        element.style.animationPlayState = playState;
      }
      element.style.transitionDuration = '';
    });
  };
}