#!/bin/bash

# Start the Python FastAPI backend
echo "Starting Python FastAPI backend on port 8000..."
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
PYTHON_PID=$!
cd ..

# Wait a moment for the backend to start
sleep 3

# Start the Node.js frontend server
echo "Starting Node.js frontend server on port 5000..."
NODE_ENV=development tsx server/index.ts &
NODE_PID=$!

# Function to cleanup on exit
cleanup() {
    echo "Stopping services..."
    kill $PYTHON_PID 2>/dev/null
    kill $NODE_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

echo "Backend started on port 8000 (PID: $PYTHON_PID)"
echo "Frontend started on port 5000 (PID: $NODE_PID)"
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait