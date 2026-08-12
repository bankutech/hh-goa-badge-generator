import { toPng, toBlob } from 'html-to-image';
import saveAs from 'file-saver';

export interface ExportOptions {
  filename?: string;
  pixelRatio?: number;
  quality?: number;
}

/**
 * Capture DOM element as high-resolution PNG data URL
 */
export const captureElementToPng = async (
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<string> => {
  const { pixelRatio = 3, quality = 0.98 } = options;

  // Filter out any interactive overlays or helper guides
  const filter = (node: HTMLElement) => {
    if (node.classList && node.classList.contains('export-ignore')) {
      return false;
    }
    return true;
  };

  return await toPng(element, {
    pixelRatio,
    quality,
    cacheBust: true,
    filter,
    style: {
      transform: 'none',
      transformOrigin: 'center center',
      boxShadow: 'none',
      margin: '0',
    },
  });
};

/**
 * Capture DOM element as Blob
 */
export const captureElementToBlob = async (
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<Blob> => {
  const { pixelRatio = 3, quality = 0.98 } = options;

  const filter = (node: HTMLElement) => {
    if (node.classList && node.classList.contains('export-ignore')) {
      return false;
    }
    return true;
  };

  const blob = await toBlob(element, {
    pixelRatio,
    quality,
    cacheBust: true,
    filter,
    style: {
      transform: 'none',
      transformOrigin: 'center center',
      boxShadow: 'none',
      margin: '0',
    },
  });

  if (!blob) {
    // Fallback via data URL conversion if toBlob returned null
    const dataUrl = await captureElementToPng(element, options);
    const res = await fetch(dataUrl);
    return await res.blob();
  }

  return blob;
};

/**
 * Download element directly as a PNG file with multi-browser fallback
 */
export const downloadBadgeImage = async (
  element: HTMLElement,
  filename: string = 'hh-goa-2026-builder-card.png',
  pixelRatio: number = 3
): Promise<void> => {
  try {
    const blob = await captureElementToBlob(element, { pixelRatio });
    try {
      saveAs(blob, filename);
    } catch {
      // Fallback for strict mobile webviews
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  } catch (err) {
    console.error('Failed downloading badge blob, falling back to data URL', err);
    const dataUrl = await captureElementToPng(element, { pixelRatio });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Copy image to user's system clipboard (if browser supports ClipboardItem)
 */
export const copyBadgeToClipboard = async (
  element: HTMLElement,
  pixelRatio: number = 2
): Promise<boolean> => {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) {
      return false;
    }

    const blob = await captureElementToBlob(element, { pixelRatio });
    
    // Some browsers need PNG blob explicitly
    const clipboardItem = new ClipboardItem({
      'image/png': blob,
    });

    await navigator.clipboard.write([clipboardItem]);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
