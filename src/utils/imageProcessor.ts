import imageCompression from 'browser-image-compression';

export interface ProcessedImageResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  format: string;
}

/**
 * Check if the file is HEIC format
 */
export const isHeicFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    name.endsWith('.heic') ||
    name.endsWith('.heif') ||
    type === 'image/heic' ||
    type === 'image/heif'
  );
};

/**
 * Convert HEIC/HEIF file to JPEG Blob using heic2any
 */
export const convertHeicToJpeg = async (file: File): Promise<Blob> => {
  try {
    // Dynamic import to avoid SSR / node issues
    const heic2anyModule = await import('heic2any');
    const heic2any = heic2anyModule.default || heic2anyModule;
    
    const converted = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9,
    });
    
    return Array.isArray(converted) ? converted[0] : converted;
  } catch (error) {
    console.warn('HEIC conversion failed, falling back to original file:', error);
    return file;
  }
};

/**
 * Compress and optimize image for smooth rendering and high speed
 */
export const processAndCompressImage = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<ProcessedImageResult> => {
  let workingFile: File | Blob = file;
  const originalSize = file.size;

  // 1. Check for HEIC and convert
  if (isHeicFile(file)) {
    if (onProgress) onProgress(20);
    const convertedBlob = await convertHeicToJpeg(file);
    workingFile = new File([convertedBlob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
      type: 'image/jpeg',
    });
  }

  if (onProgress) onProgress(40);

  // 2. Compress image for high performance without loss of detail
  const options = {
    maxSizeMB: 1.5,
    maxWidthOrHeight: 1400,
    useWebWorker: true,
    fileType: 'image/jpeg' as const,
    onProgress: (percent: number) => {
      if (onProgress) onProgress(40 + Math.floor(percent * 0.4));
    },
  };

  let compressedFile: File | Blob = workingFile;
  try {
    if (workingFile instanceof File && workingFile.size > 200 * 1024) {
      compressedFile = await imageCompression(workingFile, options);
    }
  } catch (err) {
    console.warn('Image compression skipped due to error, using source file:', err);
    compressedFile = workingFile;
  }

  if (onProgress) onProgress(90);

  // 3. Convert to Data URL
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(compressedFile);
  });

  if (onProgress) onProgress(100);

  return {
    dataUrl,
    originalSize,
    compressedSize: compressedFile.size,
    format: file.type || 'image/jpeg',
  };
};

/**
 * Format bytes to readable size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Safely convert an image URL to Data URL (base64) to prevent CORS taint during export
 */
export const urlToDataUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url, { mode: 'cors' });
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn('Could not convert remote URL to data URL, using direct URL:', err);
    return url;
  }
};
