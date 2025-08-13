import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { InputNode } from '@/components/nodes/InputNode';
import { OutputNode } from '@/components/nodes/OutputNode';
import { TextNode } from '@/components/nodes/TextNode';
import { LLMNode } from '@/components/nodes/LLMNode';
import { DatabaseNode } from '@/components/nodes/DatabaseNode';
import { FilterNode } from '@/components/nodes/FilterNode';
import { TransformNode } from '@/components/nodes/TransformNode';
import { APINode } from '@/components/nodes/APINode';
import { ConditionalNode } from '@/components/nodes/ConditionalNode';

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  database: DatabaseNode,
  filter: FilterNode,
  transform: TransformNode,
  api: APINode,
  conditional: ConditionalNode,
};

interface PipelineCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: any[]) => void;
  onEdgesChange: (changes: any[]) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick?: (event: React.MouseEvent, node: Node) => void;
  onDrop?: (event: React.DragEvent) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onInit?: (instance: any) => void;
}

export function PipelineCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDrop,
  onDragOver,
  onInit
}: PipelineCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  return (
    <div className="flex-1" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={onInit}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          className="bg-slate-950"
          data-testid="canvas-pipeline"
          fitView
          attributionPosition="bottom-left"
        >
          <Background 
            gap={20} 
            size={1} 
            color="#374151"
          />
          <Controls className="bg-slate-800 border-slate-600 text-slate-100" />
          <MiniMap 
            className="bg-slate-800 border-slate-600"
            nodeColor="#475569"
            maskColor="rgba(0, 0, 0, 0.2)"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
