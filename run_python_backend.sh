#!/bin/bash
echo "Starting Python FastAPI backend for Part 4..."
cd backend

# Kill any existing processes on port 8000
pkill -f "uvicorn.*main:app" 2>/dev/null || true
pkill -f "python.*8000" 2>/dev/null || true

# Start the Python backend
export PYTHONPATH=/home/runner/workspace/.pythonlibs/lib/python3.11/site-packages:$PYTHONPATH
python3 -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload &

# Wait for server to start
sleep 5

# Test the connection
curl -s http://127.0.0.1:8000/ && echo " - Python backend started successfully!"