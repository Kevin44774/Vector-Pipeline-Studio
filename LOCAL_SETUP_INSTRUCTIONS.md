# Local Setup Instructions

## Prerequisites
- Node.js 18+ 
- Python 3.11+
- npm or yarn package manager

## Quick Start

### 1. Install Dependencies
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies (optional - Node.js backend handles the API)
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Start the Application
```bash
# Option 1: Start Node.js server only (recommended)
npm run dev

# Option 2: Start both Node.js and Python servers
./start_services.sh
```

### 3. Access the Application
- Frontend: http://localhost:5000
- Node.js API: http://localhost:5000/api
- Python API (if running): http://localhost:8000/api

## Project Structure
```
├── client/                 # React frontend with TypeScript
│   ├── src/
│   │   ├── components/     # UI components (nodes, pipeline editor)
│   │   ├── pages/          # Pipeline editor page
│   │   └── lib/           # Utilities and API client
├── server/                # Node.js Express backend
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes (/api/pipelines/parse)
│   └── storage.ts         # In-memory storage interface
├── backend/               # Python FastAPI backend (alternative)
│   ├── main.py            # FastAPI server with pipeline analysis
│   └── requirements.txt   # Python dependencies
├── shared/                # Shared TypeScript schemas
└── package.json           # Node.js dependencies and scripts
```

## Backend Integration
The pipeline analysis is implemented in both:
- **Node.js backend** (primary): `/api/pipelines/parse` endpoint with DAG validation
- **Python backend** (alternative): FastAPI server with NetworkX for graph analysis

## Features
- Drag-and-drop pipeline editor with ReactFlow
- Multiple node types (Input, Output, Text, LLM, etc.)
- Real-time pipeline validation
- DAG (Directed Acyclic Graph) checking
- Toast notifications for analysis results
- Dark theme UI with Tailwind CSS

## Development
- Frontend: Vite dev server with hot reload
- Backend: Express server with tsx for TypeScript execution
- Styling: Tailwind CSS with shadcn/ui components
- State: React Query for API state management

## Production Build
```bash
npm run build
npm start
```