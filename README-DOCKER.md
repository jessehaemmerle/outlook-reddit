# Reddit Outlook Browser - Docker Deployment Guide

## 🚀 Quick Setup

### Prerequisites
- Docker and Docker Compose installed on your server
- Port 6060 available

### Deployment Commands

1. **Quick Deploy:**
   ```bash
   ./deploy.sh
   ```

2. **Manual Deploy:**
   ```bash
   # Build and start
   docker-compose up -d --build
   
   # Check status
   docker-compose ps
   
   # View logs
   docker-compose logs -f
   ```

3. **Management Commands:**
   ```bash
   # Start container
   ./manage.sh start
   
   # Stop container
   ./manage.sh stop
   
   # Restart container
   ./manage.sh restart
   
   # View logs
   ./manage.sh logs
   
   # Rebuild container
   ./manage.sh rebuild
   ```

## 📋 Container Details

- **Container Name:** reddit-outlook-browser
- **Exposed Port:** 6060
- **Internal Port:** 80 (Nginx)
- **Base Image:** nginx:alpine
- **Build Stage:** node:18-alpine

## 🌐 Access

Once deployed, access your Reddit Outlook Browser at:
**http://your-server-ip:6060**

## 🔧 Configuration

### Environment Variables (.env)
```
REACT_APP_BACKEND_URL=http://localhost:6060
PORT=3000
GENERATE_SOURCEMAP=false
```

### Docker Compose (docker-compose.yml)
- Maps host port 6060 to container port 80
- Uses bridge networking
- Restart policy: unless-stopped

### Nginx Configuration
- Serves React build files
- Handles React Router routing
- Gzip compression enabled
- Security headers added
- Static asset caching

## 🐛 Troubleshooting

### Container won't start:
```bash
docker-compose logs
```

### Port conflicts:
```bash
# Check what's using port 6060
sudo netstat -tulpn | grep 6060

# Change port in docker-compose.yml if needed
ports:
  - "YOUR_PORT:80"
```

### Rebuild after changes:
```bash
./manage.sh rebuild
```

### Clean up:
```bash
./manage.sh clean
```

## 📁 File Structure

```
/app/
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Container orchestration
├── nginx.conf              # Nginx configuration
├── .dockerignore           # Docker ignore rules
├── deploy.sh               # Quick deployment script
├── manage.sh               # Container management script
├── README-DOCKER.md        # This guide
└── frontend/               # React application
    ├── src/                # Source code
    ├── public/             # Static files
    ├── package.json        # Dependencies
    └── .env                # Environment variables
```

## 🚀 Production Optimizations

The container includes:
- **Multi-stage build** for smaller image size
- **Nginx** for efficient static file serving
- **Gzip compression** for faster loading
- **Security headers** for protection
- **Asset caching** for performance
- **No source maps** in production

## 🔄 Updates

To update the application:
1. Make changes to source code
2. Run: `./manage.sh rebuild`
3. Container will rebuild and restart automatically

## 📊 Monitoring

Check container health:
```bash
# Status
./manage.sh status

# Resource usage
docker stats reddit-outlook-browser

# Logs
./manage.sh logs
```