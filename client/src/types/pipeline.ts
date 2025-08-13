export interface PipelineNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface Pipeline {
  id?: string;
  name: string;
  nodes: PipelineNode[];
  edges: PipelineEdge[];
}

export interface PipelineAnalysisResult {
  num_nodes: number;
  num_edges: number;
  is_dag: boolean;
}

export type NodeType = 
  | 'input' 
  | 'output' 
  | 'text' 
  | 'llm' 
  | 'database' 
  | 'filter' 
  | 'transform' 
  | 'api' 
  | 'conditional';
