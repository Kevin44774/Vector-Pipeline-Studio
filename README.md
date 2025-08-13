# VectorShift Pipeline Editor

A powerful visual programming platform that enables users to create complex data pipelines through an intuitive, node-based interface with extensive customization and abstraction capabilities.

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- VS Code (recommended)

### Installation & Setup
```bash
# Install Node.js dependencies
npm install

# Install Python dependencies
cd backend
pip install fastapi uvicorn pydantic networkx python-multipart
cd ..

# Run the application
npm run dev  # Terminal 1 - Frontend
cd backend && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload  # Terminal 2 - Backend
```


## Features

- 🎨 **Visual Pipeline Editor**: Drag-and-drop interface for building workflows
- 🔗 **Node Connections**: Intuitive connection system between pipeline components
- 📊 **Pipeline Analysis**: DAG validation and complexity analysis
- 🎯 **15+ Node Types**: Input, Output, Text, LLM, Database, API, and more
- 🌙 **Modern UI**: Dark theme with shadcn/ui components
- ⚡ **Real-time Updates**: Hot reload during development

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite build tool
- ReactFlow for visual editing
- Tailwind CSS + shadcn/ui
- React Query for state management

**Backend:**
- Python FastAPI
- NetworkX for graph analysis
- Uvicorn ASGI server
- Node.js/Express (alternative backend)

## Project Structure

```
├── client/          # React frontend application
├── server/          # Node.js/Express server
├── backend/         # Python FastAPI backend
├── shared/          # Shared TypeScript schemas
└── components.json  # shadcn/ui configuration
```

## Usage

1. **Create Nodes**: Drag node types from the palette onto the canvas
2. **Connect Nodes**: Click and drag between node handles to create connections
3. **Analyze Pipeline**: Click Submit to validate your pipeline structure
4. **Manage Connections**: Select edges and press Delete to remove connections

## Current Status

- ✅ Visual pipeline creation and editing
- ✅ Pipeline structure analysis and validation
- ⏳ Pipeline execution engine (future enhancement)

## Contributing

This project uses modern development practices with TypeScript, ESLint, and Prettier. See the development guidelines in the codebase for contribution details.

## License

MIT License - see LICENSE file for details.