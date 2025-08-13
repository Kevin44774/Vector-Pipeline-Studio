# VectorShift Pipeline Editor

A modern, visual pipeline editor for creating and managing data processing workflows. Built with React, TypeScript, and FastAPI, featuring a drag-and-drop interface for building complex data pipelines.

## Features

- **Visual Pipeline Builder**: Drag-and-drop interface for creating data processing pipelines
- **Multiple Node Types**: Support for various node types including Input, Output, LLM, Database, API calls, and more
- **Real-time Validation**: Live pipeline validation and DAG (Directed Acyclic Graph) checking
- **Properties Panel**: Configure node properties and parameters
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Full-stack Architecture**: React frontend with Express.js backend and FastAPI Python service

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **ReactFlow** for the visual pipeline editor
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Tanstack Query** for data fetching
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **FastAPI** (Python) for pipeline analysis
- **NetworkX** for graph operations
- **Drizzle ORM** with Neon Database

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── nodes/      # Pipeline node components
│   │   │   ├── pipeline/   # Pipeline-specific components
│   │   │   └── ui/         # Base UI components
│   │   ├── pages/          # Application pages
│   │   └── types/          # TypeScript type definitions
├── server/                 # Express.js backend
├── backend/                # FastAPI Python service
└── shared/                 # Shared schemas and types
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- UV package manager (for Python dependencies)

### Installation

1. **Clone the repository** (if not already in Replit)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Python dependencies**:
   ```bash
   uv sync
   ```

### Running the Application

#### Development Mode

Start both the frontend and backend services:

```bash
npm run dev
```

This will start:
- Frontend development server with Vite
- Express.js backend server
- Hot reloading for both services

#### Starting Python Backend Separately

If you need to run the FastAPI backend separately:

```bash
python backend/main.py
```

The FastAPI service will be available at `http://localhost:8000`

### Building for Production

```bash
npm run build
```

This creates optimized builds for both frontend and backend.

## Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check TypeScript
- `npm run db:push` - Push database schema changes

## Node Types

The pipeline editor supports various node types:

### Basic Nodes
- **Input**: Data input node for pipeline entry points
- **Output**: Data output node for pipeline results
- **Text**: Text processing and manipulation
- **LLM**: Large Language Model integration

### Processing Nodes
- **Database**: Data storage and retrieval operations
- **Filter**: Data filtering and selection
- **Transform**: Data transformation and mapping
- **API Call**: External API integration
- **Conditional**: Logic branching and decision making

### Advanced Nodes
- **Email Sender**: Send email notifications
- **Image Processor**: Image manipulation and processing
- **Timer**: Time-based operations and delays
- **Webhook**: HTTP webhook handling
- **Validation**: Data validation and verification

## API Endpoints

### Pipeline Analysis API

**POST** `/api/pipelines/parse`

Analyzes a pipeline structure and returns:
- Number of nodes and edges
- DAG validation status
- Pipeline structure analysis

```json
{
  "nodes": [...],
  "edges": [...]
}
```

Response:
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## Database

The application uses Drizzle ORM with Neon Database for data persistence. Database schema and migrations are managed through:

```bash
npm run db:push
```

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
DATABASE_URL=your_neon_database_url
NODE_ENV=development
PORT=5000
```

## Deployment

### Replit Deployment

This project is optimized for deployment on Replit:

1. The application automatically detects the environment
2. Uses port 5000 (forwarded to 80/443 in production)
3. Serves both frontend and backend from a single server

### Production Build

The production build:
- Compiles TypeScript to JavaScript
- Bundles the React frontend with Vite
- Creates an optimized Express.js server
- Serves static files efficiently

## Development Guidelines

### Code Structure

- **Components**: Reusable UI components in `client/src/components/`
- **Pages**: Top-level application pages in `client/src/pages/`
- **Types**: TypeScript definitions in `client/src/types/`
- **Server Routes**: API endpoints in `server/routes.ts`

### Styling

- Uses Tailwind CSS for styling
- Custom CSS variables for theming
- Responsive design patterns
- Dark theme optimized

### State Management

- React state for component-level state
- Tanstack Query for server state
- ReactFlow state for pipeline management

## Contributing

1. Create feature branches for new functionality
2. Follow TypeScript best practices
3. Use provided ESLint and Prettier configurations
4. Test thoroughly before merging

## Architecture Notes

- **Full-stack TypeScript**: Shared types between frontend and backend
- **Microservices**: Separate Python service for pipeline analysis
- **Modern Tooling**: Vite for fast development, Drizzle for type-safe database access
- **Component-based**: Modular React components with proper separation of concerns

## License

MIT License - see LICENSE file for details.

---

For more information or support, please refer to the documentation or create an issue in the repository.
