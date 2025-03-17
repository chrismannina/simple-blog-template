#!/bin/bash

# Script to download and set up favicon and OG image assets
echo "Setting up favicon and OG image assets..."

# Create public directory if it doesn't exist
mkdir -p public

# Download favicon assets
echo "Downloading favicon assets..."
# Using simple blog icons instead of React icons
curl -o public/favicon.svg "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/blogger.svg"
curl -o public/favicon-16x16.png "https://www.svgrepo.com/download/506978/blog-16.png"
curl -o public/favicon-32x32.png "https://www.svgrepo.com/download/506982/blog-32.png"
curl -o public/apple-touch-icon.png "https://www.svgrepo.com/download/506981/blog-180.png"

# Create web manifest
echo "Creating web manifest..."
cat > public/site.webmanifest << EOL
{
  "name": "Simple Blog",
  "short_name": "Blog",
  "icons": [
    {
      "src": "/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
EOL

# Create placeholder OG image
echo "Creating OG image placeholder..."
cat > public/og-image.svg << EOL
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="50" y="50" width="1100" height="530" fill="#f8fafc" rx="8"/>
  <text x="600" y="250" font-family="Arial" font-size="60" text-anchor="middle" fill="#0f172a">Simple Blog</text>
  <text x="600" y="350" font-family="Arial" font-size="30" text-anchor="middle" fill="#64748b">A clean, minimal blog built with React, TypeScript, and Tailwind CSS</text>
</svg>
EOL

echo "Converting SVG to PNG..."
if command -v convert >/dev/null 2>&1; then
  convert -background none public/og-image.svg public/og-image.png
  echo "OG image created as PNG"
else
  echo "ImageMagick not found. Install it to convert SVG to PNG, or manually create an OG image."
  echo "For now, you'll need to create public/og-image.png manually."
fi

echo "Asset setup complete!" 