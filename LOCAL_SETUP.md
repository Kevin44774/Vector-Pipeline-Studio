# VectorShift Pipeline Editor - Local Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **Python** (v3.11 or higher) - [Download here](https://python.org/)
3. **VS Code** - [Download here](https://code.visualstudio.com/)
4. **Git** - [Download here](https://git-scm.com/)

## Setup Steps

### 1. Clone/Download the Project
```bash
# If you have git access to this repo:
git clone <your-repo-url>
cd vectorshift-pipeline-editor

# Or download the files and extract to a folder
```

### 2. Install Node.js Dependencies
```bash
# In the project root directory
npm install
```

### 3. Install Python Dependencies
```bash
# Navigate to backend folder
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python packages
pip install fastapi uvicorn pydantic networkx python-multipart

# Return to project root
cd ..
```

### 4. Open in VS Code
```bash
# Open the project in VS Code
code .
```

## Running the Application

### Option 1: Run Both Servers Manually

#### Terminal 1 - Frontend (Node.js)
```bash
npm run dev
```
This starts the frontend on http://localhost:5000

#### Terminal 2 - Backend (Python FastAPI)
```bash
cd backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
This starts the Python backend on http://localhost:8000

### Option 2: Use the Start Script
```bash
# Make script executable (macOS/Linux)
chmod +x start_services.sh

# Run both servers
./start_services.sh
```

## Testing the Application

### 1. Open the Application
- Navigate to http://localhost:5000 in your browser
- You should see the VectorShift pipeline editor interface

### 2. Test Pipeline Creation
1. **Drag nodes** from the left panel onto the canvas
2. **Connect nodes** by dragging from the dots on node edges
3. **Click Submit** to analyze your pipeline

### 3. Test the API Directly
```bash
# Test Python backend health
curl http://localhost:8000/health

# Test pipeline analysis
curl -X POST http://localhost:8000/api/pipelines/parse \
  -H "Content-Type: application/json" \
  -d '{
    "nodes": [
      {"id": "1", "type": "input", "data": {}, "position": {"x": 0, "y": 0}}
    ],
    "edges": []
  }'
```

Expected response: `{"num_nodes":1,"num_edges":0,"is_dag":true}`

## VS Code Extensions (Recommended)

Install these VS Code extensions for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **TypeScript Importer**
3. **Tailwind CSS IntelliSense** 
4. **Python** (by Microsoft)
5. **Prettier - Code formatter**
6. **Auto Rename Tag**

## Project Structure

```
vectorshift-pipeline-editor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── main.tsx        # Entry point
├── server/                 # Node.js server (for frontend)
├── backend/                # Python FastAPI backend
│   ├── main.py            # FastAPI application
│   └── requirements.txt   # Python dependencies
├── shared/                 # Shared TypeScript types
├── package.json           # Node.js dependencies
└── start_services.sh      # Script to run both servers
```

## Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 5000 and 8000
npx kill-port 5000
npx kill-port 8000
```

### Python Virtual Environment Issues
```bash
# Recreate virtual environment
cd backend
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## API Endpoints

- **Frontend**: http://localhost:5000
- **Python API**: http://localhost:8000
  - Health check: `GET /health`
  - Pipeline analysis: `POST /api/pipelines/parse`

## Current Features

- ✅ Visual pipeline editor with drag-and-drop interface
- ✅ 15+ node types (Input, Output, Text, LLM, Database, API, etc.)
- ✅ Connection management between nodes
- ✅ Pipeline analysis (DAG validation, node/edge counting)
- ✅ Dark theme with modern UI components

## Notes

- The current implementation provides pipeline **analysis** only
- Pipeline **execution** functionality is not yet implemented
- Both Node.js and Python backends are available for different use cases
- CORS is configured to allow cross-origin requests between frontend and backend