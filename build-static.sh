#!/bin/bash

# Simple production build and serve script (without Docker)

echo "🔨 Building Reddit Outlook Browser for production..."

# Navigate to frontend directory
cd /app/frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    yarn install
fi

# Build the application
echo "🏗️ Building application..."
yarn build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ Build successful!"
    
    # Copy build to a web-accessible directory
    echo "📂 Copying build files..."
    sudo mkdir -p /var/www/reddit-outlook-browser
    sudo cp -r build/* /var/www/reddit-outlook-browser/
    sudo chown -R www-data:www-data /var/www/reddit-outlook-browser
    
    echo "🌐 Build files copied to /var/www/reddit-outlook-browser"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure your web server (Apache/Nginx) to serve from /var/www/reddit-outlook-browser"
    echo "2. Point port 6060 to this directory"
    echo "3. Ensure React Router works with proper fallback to index.html"
    echo ""
    echo "Example Nginx config:"
    echo "server {"
    echo "    listen 6060;"
    echo "    root /var/www/reddit-outlook-browser;"
    echo "    index index.html;"
    echo "    location / {"
    echo "        try_files \$uri \$uri/ /index.html;"
    echo "    }"
    echo "}"
else
    echo "❌ Build failed!"
    exit 1
fi