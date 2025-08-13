import { Background, BackgroundVariant } from '@reactflow/background';
import { useRef } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
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
  onInit,
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
          className="bg-slate-100" // Lighter canvas background
          data-testid="canvas-pipeline"
          fitView
          attributionPosition="bottom-left"
        >
          {/* Light dotted background */}
          <Background
            gap={24}
            size={2}
            color="#cbd5e1" // slate-300 for subtle dots
            variant={BackgroundVariant.Dots}
          />

          {/* Controls - floating panel style */}
          <Controls className="bg-white/90 border border-slate-300 text-slate-800 rounded-md shadow" />

          {/* MiniMap - light floating panel */}
          <MiniMap
            className="bg-white/90 border border-slate-300 rounded-md shadow"
            nodeColor="#0f172a" // dark blue-gray for visibility
            maskColor="rgba(255, 255, 255, 0.4)"
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
