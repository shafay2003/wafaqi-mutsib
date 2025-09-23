// File compression utilities to help reduce file sizes before storage

export async function compressImage(file: File, maxSizeInMB: number = 2, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions to reduce file size
      let { width, height } = img;
      const maxDimension = 1200; // Max width or height
      
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        } else {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            
            const fileSizeInMB = blob.size / (1024 * 1024);
            console.log(`Compressed ${file.name}: ${(file.size / (1024 * 1024)).toFixed(2)}MB → ${fileSizeInMB.toFixed(2)}MB`);
            
            if (fileSizeInMB <= maxSizeInMB) {
              resolve(compressedFile);
            } else if (quality > 0.3) {
              // Try with lower quality
              compressImage(file, maxSizeInMB, quality - 0.2).then(resolve).catch(reject);
            } else {
              reject(new Error(`Unable to compress file below ${maxSizeInMB}MB`));
            }
          } else {
            reject(new Error('Compression failed'));
          }
        },
        file.type,
        quality
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export function getFileSizeInfo(file: File) {
  const sizeInMB = file.size / (1024 * 1024);
  const isVideo = file.type.startsWith('video/');
  const maxAllowedSize = isVideo ? 100 : 5; // 100MB for videos, 5MB for images
  
  return {
    sizeInMB: sizeInMB,
    sizeFormatted: `${sizeInMB.toFixed(2)} MB`,
    isLarge: sizeInMB > maxAllowedSize,
    needsCompression: sizeInMB > maxAllowedSize,
    fileType: isVideo ? 'video' : 'image',
    maxAllowedSize: maxAllowedSize
  };
}

export async function handleLargeFile(file: File): Promise<File> {
  const sizeInfo = getFileSizeInfo(file);
  
  // Updated size limits: 5MB for images, 100MB for videos
  const isVideo = file.type.startsWith('video/');
  const maxSizeInMB = isVideo ? 100 : 5;
  
  if (sizeInfo.sizeInMB <= maxSizeInMB) {
    return file; // File is within acceptable size limits
  }
  
  if (file.type.startsWith('image/')) {
    try {
      return await compressImage(file, 4); // Compress to under 4MB for images
    } catch (error) {
      console.warn('Image compression failed:', error);
      throw new Error(`Image is too large (${sizeInfo.sizeFormatted}). Please use a smaller image or compress it manually. Maximum allowed: 5MB.`);
    }
  } else if (file.type.startsWith('video/')) {
    throw new Error(`Video is too large (${sizeInfo.sizeFormatted}). Please compress the video to under 100MB before uploading.`);
  }
  
  throw new Error(`File is too large (${sizeInfo.sizeFormatted}). Maximum size allowed: ${maxSizeInMB}MB.`);
}