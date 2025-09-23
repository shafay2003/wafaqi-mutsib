/**
 * Video and Image Processing Utilities
 * Handles thumbnail generation, image optimization, and media processing
 */

export interface ProcessedMedia {
  dataUrl: string;
  thumbnail?: string;
  type: 'image' | 'video';
  size: number;
  dimensions?: { width: number; height: number };
}

/**
 * Generate a video thumbnail from the first frame
 */
export function generateVideoThumbnail(
  videoFile: File,
  targetWidth: number = 400,
  targetHeight: number = 300,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.muted = true;

    video.onloadedmetadata = () => {
      // Set canvas dimensions
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Seek to 1 second or 10% of video duration (whichever is smaller)
      const seekTime = Math.min(1, video.duration * 0.1);
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      try {
        // Calculate aspect ratio and positioning
        const videoAspect = video.videoWidth / video.videoHeight;
        const canvasAspect = targetWidth / targetHeight;

        let drawWidth, drawHeight, drawX, drawY;

        if (videoAspect > canvasAspect) {
          // Video is wider - fit by height
          drawHeight = targetHeight;
          drawWidth = drawHeight * videoAspect;
          drawX = (targetWidth - drawWidth) / 2;
          drawY = 0;
        } else {
          // Video is taller - fit by width
          drawWidth = targetWidth;
          drawHeight = drawWidth / videoAspect;
          drawX = 0;
          drawY = (targetHeight - drawHeight) / 2;
        }

        // Clear canvas with black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, targetWidth, targetHeight);

        // Draw video frame
        ctx.drawImage(video, drawX, drawY, drawWidth, drawHeight);

        // Convert to data URL
        const thumbnail = canvas.toDataURL('image/jpeg', quality);
        resolve(thumbnail);
      } catch (error) {
        reject(error);
      } finally {
        // Clean up
        video.removeAttribute('src');
        video.load();
      }
    };

    video.onerror = () => {
      reject(new Error('Failed to load video for thumbnail generation'));
    };

    // Create blob URL from file
    const videoUrl = URL.createObjectURL(videoFile);
    video.src = videoUrl;

    // Clean up blob URL after processing
    video.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(videoUrl);
    }, { once: true });
  });
}

/**
 * Optimize image quality and size
 */
export function optimizeImage(
  imageFile: File,
  maxWidth: number = 1920,
  maxHeight: number = 1080,
  quality: number = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }

    img.onload = () => {
      try {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          
          if (width > height) {
            width = Math.min(width, maxWidth);
            height = width / aspectRatio;
          } else {
            height = Math.min(height, maxHeight);
            width = height * aspectRatio;
          }
        }

        // Set canvas size
        canvas.width = width;
        canvas.height = height;

        // Draw optimized image
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized data URL
        const mimeType = imageFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const optimizedDataUrl = canvas.toDataURL(mimeType, quality);
        
        resolve(optimizedDataUrl);
      } catch (error) {
        reject(error);
      } finally {
        // Clean up
        img.removeAttribute('src');
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for optimization'));
    };

    // Create blob URL from file
    const imageUrl = URL.createObjectURL(imageFile);
    img.src = imageUrl;

    // Clean up blob URL after processing
    img.addEventListener('load', () => {
      URL.revokeObjectURL(imageUrl);
    }, { once: true });
  });
}

/**
 * Process media file (video or image) with thumbnails and optimization
 */
export async function processMediaFile(file: File): Promise<ProcessedMedia> {
  const isVideo = file.type.startsWith('video/');
  const isImage = file.type.startsWith('image/');

  if (!isVideo && !isImage) {
    throw new Error('Unsupported file type');
  }

  try {
    if (isVideo) {
      // Process video file
      const videoDataUrl = await fileToDataUrl(file);
      const thumbnail = await generateVideoThumbnail(file, 400, 300, 0.8);
      
      return {
        dataUrl: videoDataUrl,
        thumbnail,
        type: 'video',
        size: file.size,
        dimensions: await getVideoDimensions(file)
      };
    } else {
      // Process image file
      const optimizedDataUrl = await optimizeImage(file, 1920, 1080, 0.85);
      const thumbnail = await optimizeImage(file, 400, 300, 0.8);
      
      return {
        dataUrl: optimizedDataUrl,
        thumbnail,
        type: 'image',
        size: optimizedDataUrl.length,
        dimensions: await getImageDimensions(file)
      };
    }
  } catch (error) {
    console.error('Error processing media file:', error);
    throw error;
  }
}

/**
 * Convert file to data URL
 */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Get video dimensions
 */
function getVideoDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;

    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight
      });
      video.removeAttribute('src');
      video.load();
    };

    video.onerror = () => {
      reject(new Error('Failed to get video dimensions'));
    };

    const videoUrl = URL.createObjectURL(file);
    video.src = videoUrl;

    // Clean up
    video.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(videoUrl);
    }, { once: true });
  });
}

/**
 * Get image dimensions
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      img.removeAttribute('src');
    };

    img.onerror = () => {
      reject(new Error('Failed to get image dimensions'));
    };

    const imageUrl = URL.createObjectURL(file);
    img.src = imageUrl;

    // Clean up
    img.addEventListener('load', () => {
      URL.revokeObjectURL(imageUrl);
    }, { once: true });
  });
}

/**
 * Create a video poster/thumbnail element for display
 */
export function createVideoThumbnailElement(
  videoSrc: string,
  thumbnailSrc: string,
  className: string = '',
  alt: string = 'Video thumbnail'
): HTMLElement {
  const container = document.createElement('div');
  container.className = `relative ${className}`;
  
  // Create thumbnail image
  const thumbnail = document.createElement('img');
  thumbnail.src = thumbnailSrc;
  thumbnail.alt = alt;
  thumbnail.className = 'w-full h-full object-cover';
  
  // Create play button overlay
  const playButton = document.createElement('div');
  playButton.className = 'absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors';
  playButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white/80 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  `;
  
  container.appendChild(thumbnail);
  container.appendChild(playButton);
  
  return container;
}