#!/bin/bash

# Reddit Outlook Browser - Container Management Script

case "$1" in
    start)
        echo "🚀 Starting Reddit Outlook Browser..."
        docker-compose up -d
        echo "✅ Container started! Access at http://localhost:6060"
        ;;
    stop)
        echo "🛑 Stopping Reddit Outlook Browser..."
        docker-compose down
        echo "✅ Container stopped!"
        ;;
    restart)
        echo "🔄 Restarting Reddit Outlook Browser..."
        docker-compose down
        docker-compose up -d
        echo "✅ Container restarted! Access at http://localhost:6060"
        ;;
    logs)
        echo "📝 Showing container logs..."
        docker-compose logs -f
        ;;
    status)
        echo "📊 Container status:"
        docker-compose ps
        ;;
    rebuild)
        echo "🔨 Rebuilding and restarting..."
        docker-compose down
        docker-compose build --no-cache
        docker-compose up -d
        echo "✅ Rebuilt and restarted! Access at http://localhost:6060"
        ;;
    clean)
        echo "🧹 Cleaning up..."
        docker-compose down
        docker system prune -f
        echo "✅ Cleanup complete!"
        ;;
    *)
        echo "Reddit Outlook Browser - Container Management"
        echo ""
        echo "Usage: $0 {start|stop|restart|logs|status|rebuild|clean}"
        echo ""
        echo "Commands:"
        echo "  start    - Start the container"
        echo "  stop     - Stop the container"
        echo "  restart  - Restart the container"
        echo "  logs     - Show container logs"
        echo "  status   - Show container status"
        echo "  rebuild  - Rebuild and restart container"
        echo "  clean    - Stop and clean up Docker resources"
        echo ""
        exit 1
        ;;
esac