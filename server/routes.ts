import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pipelineAnalysisSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Pipeline analysis endpoint - proxy to Python backend for Part 4 assessment
  app.post("/api/pipelines/parse", async (req, res) => {
    try {
      // First try to forward to Python backend (prioritized)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('http://localhost:8000/api/pipelines/parse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          console.log("✅ Using Python FastAPI backend");
          return res.json(data);
        } else {
          console.log(`❌ Python backend returned ${response.status}, falling back to Node.js`);
        }
      } catch (pythonError: any) {
        if (pythonError.name === 'AbortError') {
          console.log("⏱️ Python backend timeout, using Node.js fallback");
        } else {
          console.log("⚠️ Python backend not available, using Node.js fallback");
        }
      }
      
      // Fallback to Node.js implementation if Python backend is unavailable
      const { nodes, edges } = pipelineAnalysisSchema.parse(req.body);
      
      // Calculate basic metrics
      const numNodes = nodes.length;
      const numEdges = edges.length;
      
      // Check if it's a valid DAG
      const isDag = checkIsDAG(nodes, edges);
      
      res.json({
        num_nodes: numNodes,
        num_edges: numEdges,
        is_dag: isDag,
      });
    } catch (error) {
      console.error("Pipeline parse error:", error);
      res.status(400).json({ 
        error: "Invalid pipeline data",
        details: error instanceof z.ZodError ? error.errors : error 
      });
    }
  });

  // Pipeline CRUD endpoints
  app.get("/api/pipelines", async (req, res) => {
    try {
      const pipelines = await storage.listPipelines();
      res.json(pipelines);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pipelines" });
    }
  });

  app.post("/api/pipelines", async (req, res) => {
    try {
      const pipeline = await storage.createPipeline(req.body);
      res.json(pipeline);
    } catch (error) {
      res.status(500).json({ error: "Failed to create pipeline" });
    }
  });

  app.get("/api/pipelines/:id", async (req, res) => {
    try {
      const pipeline = await storage.getPipeline(req.params.id);
      if (!pipeline) {
        return res.status(404).json({ error: "Pipeline not found" });
      }
      res.json(pipeline);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pipeline" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Simple DAG validation using topological sort
function checkIsDAG(nodes: any[], edges: any[]): boolean {
  try {
    const nodeIds = new Set(nodes.map(n => n.id));
    const inDegree = new Map<string, number>();
    const adjList = new Map<string, string[]>();
    
    // Initialize
    for (const nodeId of Array.from(nodeIds)) {
      inDegree.set(nodeId, 0);
      adjList.set(nodeId, []);
    }
    
    // Build graph
    for (const edge of edges) {
      if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
        return false; // Edge references non-existent node
      }
      
      adjList.get(edge.source)?.push(edge.target);
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    }
    
    // Topological sort using Kahn's algorithm
    const queue: string[] = [];
    for (const [nodeId, degree] of Array.from(inDegree.entries())) {
      if (degree === 0) {
        queue.push(nodeId);
      }
    }
    
    let processed = 0;
    while (queue.length > 0) {
      const current = queue.shift()!;
      processed++;
      
      const neighbors = adjList.get(current) || [];
      for (const neighbor of neighbors) {
        const newDegree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) {
          queue.push(neighbor);
        }
      }
    }
    
    return processed === nodeIds.size;
  } catch (error) {
    return false;
  }
}
