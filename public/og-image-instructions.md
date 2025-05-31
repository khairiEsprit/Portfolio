# Open Graph Image Instructions

## Required Images for SEO Optimization

To complete the SEO setup, you need to create the following images and place them in the `public` folder:

### 1. Open Graph Image (og-image.jpg)
- **Size**: 1200x630 pixels
- **Format**: JPG or PNG
- **Content**: Should include:
  - Your name: "Mohamed Khairi Bouzid"
  - Title: "Full Stack Developer"
  - Subtitle: "Computer Engineering Student at ESPRIT"
  - Your profile photo
  - Background with your brand colors (blue/purple gradient)
  - Clean, professional design

### 2. Favicon Set
Create these favicon files:
- `favicon-16x16.png` (16x16 pixels)
- `favicon-32x32.png` (32x32 pixels)
- `apple-touch-icon.png` (180x180 pixels)
- `android-chrome-192x192.png` (192x192 pixels)
- `android-chrome-512x512.png` (512x512 pixels)
- `safari-pinned-tab.svg` (SVG format)

### 3. Microsoft Tiles
- `mstile-70x70.png` (70x70 pixels)
- `mstile-150x150.png` (150x150 pixels)
- `mstile-310x310.png` (310x310 pixels)
- `mstile-310x150.png` (310x150 pixels)

### 4. Screenshots for PWA
- `screenshot-desktop.png` (1280x720 pixels) - Desktop view of your portfolio
- `screenshot-mobile.png` (390x844 pixels) - Mobile view of your portfolio

## Tools for Creating Images

### Online Tools:
1. **Canva** - Easy drag-and-drop design
2. **Figma** - Professional design tool
3. **Adobe Express** - Quick social media graphics
4. **Favicon.io** - Generate favicon sets from text or image

### Design Tips:
- Use your existing brand colors (blue #3b82f6, purple #8b5cf6)
- Keep text readable and not too small
- Ensure good contrast
- Test how it looks when shared on different platforms

## Quick Setup:
1. Use your existing profile image `/pk.webp` as a base
2. Create a 1200x630 canvas
3. Add your profile image on the right side
4. Add text on the left with your name and title
5. Use a gradient background matching your site theme
6. Export as JPG for the og-image

## After Creating Images:
1. Replace the placeholder URLs in `src/app/layout.tsx`
2. Update the domain URLs from "https://your-domain.com" to your actual domain
3. Test the social media previews using:
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - LinkedIn Post Inspector
