
#!/usr/bin/env python3
import sys
import os
import subprocess
import time
import signal
import threading

def cleanup(signum=None, frame=None):
    """Cleanup function to terminate all processes"""
    print("\nStopping all services...")
    try:
        # Kill processes on specific ports
        subprocess.run(["pkill", "-f", "uvicorn.*main:app"], check=False)
        subprocess.run(["pkill", "-f", "python.*8000"], check=False)
        subprocess.run(["pkill", "-f", "tsx.*server"], check=False)
        subprocess.run(["pkill", "-f", "node.*5000"], check=False)
    except:
        pass
    sys.exit(0)

def start_python_backend():
    """Start Python FastAPI backend"""
    print("🐍 Starting Python FastAPI backend on port 8000...")
    
    # Change to backend directory and start uvicorn
    backend_process = subprocess.Popen([
        sys.executable, "-m", "uvicorn", "main:app", 
        "--host", "0.0.0.0", "--port", "8000", "--reload"
    ], cwd="backend")
    
    return backend_process

def start_node_frontend():
    """Start Node.js frontend after Python backend is ready"""
    print("🚀 Starting Node.js frontend on port 5000...")
    
    # Start the Node.js development server
    frontend_process = subprocess.Popen([
        "npm", "run", "dev"
    ])
    
    return frontend_process

def check_backend_health():
    """Check if Python backend is healthy"""
    import requests
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        return response.status_code == 200
    except:
        return False

def main():
    # Set up signal handlers for graceful shutdown
    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)
    
    # Kill any existing processes first
    cleanup()
    
    # Start Python backend
    python_process = start_python_backend()
    
    # Wait for Python backend to be ready
    print("⏳ Waiting for Python backend to be ready...")
    max_attempts = 30
    for attempt in range(max_attempts):
        if check_backend_health():
            print("✅ Python backend is healthy!")
            break
        time.sleep(1)
        if attempt == max_attempts - 1:
            print("❌ Python backend failed to start properly")
            cleanup()
            return
    
    # Start Node.js frontend
    node_process = start_node_frontend()
    
    print("\n🎉 Both services are running!")
    print("📊 Python FastAPI backend: http://localhost:8000")
    print("🌐 Node.js frontend: http://localhost:5000")
    print("\nPress Ctrl+C to stop all services")
    
    try:
        # Wait for processes to complete
        python_process.wait()
        node_process.wait()
    except KeyboardInterrupt:
        cleanup()

if __name__ == "__main__":
    main()
