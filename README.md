# Hitwicket Premier League Website

A modern, responsive website for the Hitwicket Premier League, cloned and customized from the MYKD eSports template design.

## Features

- 🎨 Modern, sleek design with dark theme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Optimized for performance and speed
- 🎯 SEO-friendly semantic HTML
- 🎭 Smooth animations and transitions
- ♿ Accessible design practices
- 🚀 Fast loading with lazy loading images
- 💻 Cross-browser compatible

## Project Structure

```
Hitwicket Premier League Final Website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   ├── js/
│   │   └── main.js        # Main JavaScript file
│   └── images/
│       ├── Hitwicket Premier League Logo.png  # Website logo
│       ├── about.jpg       # About section image
│       ├── teams/         # Team logos (6 images)
│       │   ├── team-1.png
│       │   ├── team-2.png
│       │   ├── team-3.png
│       │   ├── team-4.png
│       │   ├── team-5.png
│       │   └── team-6.png
│       ├── players/       # Player photos (4 images)
│       │   ├── player-1.jpg
│       │   ├── player-2.jpg
│       │   ├── player-3.jpg
│       │   └── player-4.jpg
│       └── news/          # News article images (3 images)
│           ├── news-1.jpg
│           ├── news-2.jpg
│           └── news-3.jpg
└── README.md              # This file
```

## Setup Instructions

### 1. Image Assets

You'll need to add the following images to the project:

#### Logo
- **Location**: `assets/images/Hitwicket Premier League Logo.png`
- **Size**: 80x80px (or larger, will be scaled)
- **Format**: PNG with transparency

#### Team Logos (6 images)
- **Location**: `assets/images/teams/`
- **Files**: `team-1.png` through `team-6.png`
- **Size**: 240x240px recommended
- **Format**: PNG with transparency

#### Player Photos (4 images)
- **Location**: `assets/images/players/`
- **Files**: `player-1.jpg` through `player-4.jpg`
- **Size**: 560x700px recommended (portrait orientation)
- **Format**: JPG

#### News Images (3 images)
- **Location**: `assets/images/news/`
- **Files**: `news-1.jpg` through `news-3.jpg`
- **Size**: 1200x800px recommended (landscape orientation)
- **Format**: JPG

#### About Section Image
- **Location**: `assets/images/about.jpg`
- **Size**: 1200x800px recommended
- **Format**: JPG

### 2. Quick Start

1. **Clone or download** this repository
2. **Add images** to the respective folders as listed above
3. **Open** `index.html` in a web browser
4. **Customize** content, colors, and branding as needed

### 3. Local Development

For local development, you can use any simple HTTP server:

#### Using Python 3:
```bash
python -m http.server 8000
```

#### Using Node.js (with http-server):
```bash
npx http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #ff6b35;      /* Main brand color */
    --secondary-color: #004e89;   /* Secondary color */
    --dark-bg: #0a0e27;           /* Background color */
    /* ... more variables */
}
```

### Content

- **Team Names**: Edit in `index.html` within the `.team-name` elements
- **Player Information**: Update in the `.player-card` sections
- **Match Schedule**: Modify in the `.match-card` sections or update JavaScript data
- **News Articles**: Edit in the `.news-card` sections

### Fonts

The website uses Google Fonts:
- **Headings**: Orbitron
- **Body**: Poppins

To change fonts, update the Google Fonts link in `index.html` and the CSS variables.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- **Lazy Loading**: Images load as they enter the viewport
- **Throttled Scroll Events**: Optimized scroll handlers
- **CSS Variables**: Efficient theming system
- **Minified Assets**: Ready for production minification
- **Semantic HTML**: Better SEO and accessibility

## Code Quality

- ✅ Semantic HTML5
- ✅ Modern CSS with Flexbox and Grid
- ✅ Vanilla JavaScript (no dependencies)
- ✅ Responsive design (mobile-first approach)
- ✅ Accessibility considerations (ARIA labels, semantic tags)
- ✅ Performance optimizations
- ✅ Clean, maintainable code structure

## Future Enhancements

Potential features to add:
- [ ] Backend integration for dynamic content
- [ ] Live match updates
- [ ] User authentication
- [ ] Team and player detail pages
- [ ] Match statistics and analytics
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Dark/light theme toggle

## License

This project is created for Hitwicket Premier League. Customize as needed for your use case.

## Support

For questions or issues, please contact the development team.

---

**Note**: This website is a clone of the MYKD eSports template design, customized for Hitwicket Premier League. Make sure you have proper licensing if using the original template design commercially.
