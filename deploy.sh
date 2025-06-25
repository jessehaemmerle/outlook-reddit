#!/bin/bash

# Reddit Outlook Browser - Docker Deployment Script

echo "🐳 Building and deploying Reddit Outlook Browser..."

# Stop and remove existing container if running
echo "📦 Stopping existing container..."
docker-compose down 2>/dev/null || true

# Build the Docker image
echo "🔨 Building Docker image..."
docker-compose build --no-cache

# Start the container
echo "🚀 Starting container on port 6060..."
docker-compose up -d

# Wait for container to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Check if container is running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Success! Reddit Outlook Browser is running!"
    echo "🌐 Access your app at: http://localhost:6060"
    echo "🔍 Check logs with: docker-compose logs -f"
    echo "🛑 Stop with: docker-compose down"
else
    echo "❌ Failed to start container. Check logs:"
    docker-compose logs
    exit 1
fi