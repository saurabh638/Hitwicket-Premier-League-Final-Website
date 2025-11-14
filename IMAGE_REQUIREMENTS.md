# Image Requirements for Hitwicket Premier League Website

This document outlines all the images needed for the website to function properly.

## Required Images

### 1. Logo
- **File**: `assets/images/Hitwicket Premier League Logo.png`
- **Dimensions**: 80x80px minimum (will scale)
- **Format**: PNG with transparency
- **Usage**: Header logo, footer logo

### 2. Team Logos (6 required)
- **Location**: `assets/images/teams/`
- **Files**: 
  - `team-1.png` (Thunder Strikers)
  - `team-2.png` (Royal Challengers)
  - `team-3.png` (Super Kings)
  - `team-4.png` (Knight Riders)
  - `team-5.png` (Sun Risers)
  - `team-6.png` (Delhi Capitals)
- **Dimensions**: 240x240px recommended
- **Format**: PNG with transparency
- **Usage**: Team cards, match cards

### 3. Player Photos (4 required)
- **Location**: `assets/images/players/`
- **Files**:
  - `player-1.jpg` (Rohit Sharma)
  - `player-2.jpg` (Virat Kohli)
  - `player-3.jpg` (Jasprit Bumrah)
  - `player-4.jpg` (MS Dhoni)
- **Dimensions**: 560x700px (portrait orientation)
- **Format**: JPG
- **Usage**: Player cards

### 4. News Images (3 required)
- **Location**: `assets/images/news/`
- **Files**:
  - `news-1.jpg` (Featured news)
  - `news-2.jpg`
  - `news-3.jpg`
- **Dimensions**: 1200x800px (landscape orientation)
- **Format**: JPG
- **Usage**: News cards

### 5. About Section Image
- **File**: `assets/images/about.jpg`
- **Dimensions**: 1200x800px
- **Format**: JPG
- **Usage**: About section

## Quick Placeholder Solution

If you need to test the website before adding real images, you can:

1. **Use placeholder services**:
   - Visit https://via.placeholder.com/ to generate placeholder images
   - Or use https://placeholder.com/

2. **Example placeholder URLs** (for testing):
   ```
   Logo: https://via.placeholder.com/80x80/ff6b35/ffffff?text=HPL
   Team: https://via.placeholder.com/240x240/004e89/ffffff?text=Team
   Player: https://via.placeholder.com/560x700/1a659e/ffffff?text=Player
   News: https://via.placeholder.com/1200x800/ff6b35/ffffff?text=News
   ```

3. **Or create simple colored rectangles** using any image editor

## Image Optimization Tips

- **Compress images** before uploading (use tools like TinyPNG, ImageOptim, or Squoosh)
- **Use WebP format** for better compression (with fallback to JPG/PNG)
- **Optimize file sizes** - aim for:
  - Logos: < 50KB
  - Team logos: < 100KB each
  - Player photos: < 200KB each
  - News images: < 300KB each
  - About image: < 300KB

## Notes

- All images should be optimized for web use
- Consider using responsive images with `srcset` for different screen sizes
- Ensure images are properly licensed for use
- Maintain consistent aspect ratios for similar image types
