from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI(title="VectorShift Pipeline API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get("/")
async def root():
    return {"message": "VectorShift Pipeline API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "python-fastapi", "port": 8000}

@app.post("/api/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineData):
    """
    Analyze a pipeline to count nodes/edges and check if it forms a DAG.
    """
    try:
        num_nodes = len(pipeline.nodes)
        num_edges = len(pipeline.edges)
        
        # Create a directed graph
        G = nx.DiGraph()
        
        # Add nodes
        for node in pipeline.nodes:
            G.add_node(node.id)
        
        # Add edges
        for edge in pipeline.edges:
            G.add_edge(edge.source, edge.target)
        
        # Check if it's a DAG (Directed Acyclic Graph)
        is_dag = nx.is_directed_acyclic_graph(G)
        
        return PipelineResponse(
            num_nodes=num_nodes,
            num_edges=num_edges,
            is_dag=is_dag
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error analyzing pipeline: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)