
#!/bin/bash

echo "🚀 VectorShift Pipeline Editor - Local Development"
echo "=================================================="

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed"
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed"
    exit 1
fi

# Check if npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install
fi

# Check if Python dependencies are installed
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo "🐍 Installing Python dependencies..."
    pip3 install fastapi uvicorn networkx pydantic python-multipart
fi

echo "🎯 Starting services with Python/FastAPI priority..."
python3 start_python_backend.py
