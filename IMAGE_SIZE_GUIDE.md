# 📸 **Optimal Image Sizes for Wafaqi Mutsib Website**

## **Main Website Areas:**

### **1. Photo Gallery (Main Page & Media Gallery)**
- **Optimal Size**: `1920x1080px` (16:9 aspect ratio)
- **Min Size**: `1280x720px` 
- **Max Size**: `3840x2160px`
- **CSS Applied**: `aspect-video` (16:9 ratio)
- **Display**: Images automatically fit container maintaining aspect ratio

### **2. News & Events Thumbnails**
- **Optimal Size**: `800x450px` (16:9 aspect ratio)
- **Min Size**: `640x360px`
- **Display**: Grid layout with hover effects

### **3. Leadership Profile Photos**
- **Optimal Size**: `400x400px` (1:1 aspect ratio)
- **Min Size**: `200x200px`
- **CSS Applied**: `aspect-square` + `object-cover`
- **Display**: Circular profile images

### **4. Admin Panel Thumbnails**
- **Size**: `64x64px` (automatically generated)
- **CSS Applied**: `aspect-square` + `object-cover`

## **Video Dimensions:**

### **Main Video Display**
- **Optimal Size**: `1920x1080px` (Full HD)
- **Min Size**: `1280x720px` (HD)
- **Max Size**: `3840x2160px` (4K)
- **Aspect Ratio**: 16:9 (enforced by `aspect-video`)

## **File Size Recommendations:**

### **Photos:**
- **Web Quality**: 200KB - 2MB
- **High Quality**: 2MB - 10MB
- **Maximum**: 20MB (before compression)

### **Videos:**
- **Standard**: 10MB - 50MB
- **High Quality**: 50MB - 97MB (current limit)
- **Format**: MP4, WebM recommended

## **Current CSS Classes Used:**

```css
/* Main gallery photos */
.aspect-video { aspect-ratio: 16/9; }
.object-contain { object-fit: contain; } /* Maintains aspect, shows full image */
.object-cover { object-fit: cover; }     /* Fills container, may crop */

/* Profile photos */
.aspect-square { aspect-ratio: 1/1; }

/* Thumbnails */
.w-16.h-16 { width: 64px; height: 64px; }
```

## **Best Practices:**

### **For Photos:**
1. **Use 16:9 ratio** (1920x1080, 1600x900, 1280x720)
2. **JPEG format** for photos with compression 80-90%
3. **PNG format** for images with transparency
4. **WebP format** for modern browsers (smaller file size)

### **For Videos:**
1. **16:9 aspect ratio** (1920x1080 recommended)
2. **MP4 format** with H.264 codec
3. **30fps or 60fps** frame rate
4. **Bitrate**: 2-8 Mbps for 1080p

## **Upload Guidelines for Users:**

### **✅ Perfect Sizes:**
- **Gallery Photos**: 1920x1080px
- **Thumbnails**: Any size (auto-resized to 64x64px in admin)
- **Profile Photos**: 400x400px
- **Videos**: 1920x1080px, MP4 format

### **⚠️ Acceptable Sizes:**
- **Minimum**: 640x360px (will be upscaled)
- **Maximum**: 4K resolution (may be compressed)

### **❌ Avoid:**
- **Portrait orientation** for gallery (will have black bars)
- **Very small images** under 300px (will appear pixelated)
- **Extremely large files** over 50MB (may cause storage issues)