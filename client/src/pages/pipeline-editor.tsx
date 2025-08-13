import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { NodePalette } from '@/components/pipeline/NodePalette';
import { PropertiesPanel } from '@/components/pipeline/PropertiesPanel';
import { SubmissionModal } from '@/components/pipeline/SubmissionModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { InputNode } from '@/components/nodes/InputNode';
import { OutputNode } from '@/components/nodes/OutputNode';
import { TextNode } from '@/components/nodes/TextNode';
import { LLMNode } from '@/components/nodes/LLMNode';
import { DatabaseNode } from '@/components/nodes/DatabaseNode';
import { FilterNode } from '@/components/nodes/FilterNode';
import { TransformNode } from '@/components/nodes/TransformNode';
import { APINode } from '@/components/nodes/APINode';
import { ConditionalNode } from '@/components/nodes/ConditionalNode';
import { EmailNode } from '@/components/nodes/EmailNode';
import { ImageProcessorNode } from '@/components/nodes/ImageProcessorNode';
import { TimerNode } from '@/components/nodes/TimerNode';
import { ValidationNode } from '@/components/nodes/ValidationNode';
import { WebhookNode } from '@/components/nodes/WebhookNode';

import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Memoize nodeTypes to prevent React Flow warnings
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
  email: EmailNode,
  'image-processor': ImageProcessorNode,
  timer: TimerNode,
  validation: ValidationNode,
  webhook: WebhookNode,
};

export default function PipelineEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const { toast } = useToast();

  const submitPipelineMutation = useMutation({
    mutationFn: async (pipelineData: { nodes: Node[]; edges: Edge[] }) => {
      const response = await fetch('/api/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });
      if (!response.ok) {
        throw new Error('Failed to analyze pipeline');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setShowSubmissionModal(true);
      toast({
        title: "Pipeline Analysis Complete",
        description: `Found ${data.num_nodes} nodes, ${data.num_edges} edges. DAG valid: ${data.is_dag}`,
      });
    },
    onError: (error) => {
      console.error('Pipeline submission error:', error);
      toast({
        title: "Pipeline Analysis Failed",
        description: "Failed to analyze pipeline. Please check your configuration.",
        variant: "destructive",
      });
    },
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle edge selection
  const onEdgeClick = useCallback((_event: React.MouseEvent, edge: Edge) => {
    setSelectedEdges([edge.id]);
    setSelectedNode(null); // Clear node selection when edge is selected
  }, []);

  // Handle background click to clear selections
  const onPaneClick = useCallback(() => {
    setSelectedEdges([]);
    setSelectedNode(null);
  }, []);

  // Define deleteSelectedNode before useEffect 
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
      setSelectedNode(null);
    }
  }, [selectedNode, setNodes, setEdges]);

  // Handle keyboard events for deletion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only Delete key for edges, not Backspace
      if (event.key === 'Delete') {
        // Delete selected edges only
        if (selectedEdges.length > 0) {
          event.preventDefault();
          setEdges((eds) => eds.filter((edge) => !selectedEdges.includes(edge.id)));
          setSelectedEdges([]);
          toast({
            title: "Connection Deleted",
            description: `Removed ${selectedEdges.length} connection(s)`,
          });
        }
        // Note: Nodes are not deleted via keyboard to prevent accidental deletion
        // Users should use the delete button in the properties panel for nodes
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEdges, setEdges, toast]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${type}_${Date.now()}`,
        type,
        position,
        data: getDefaultNodeData(type),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const getDefaultNodeData = (type: string) => {
    const defaults: Record<string, any> = {
      input: { inputName: 'input_1' },
      output: { outputName: 'output_1' },
      text: { text: '', variables: [] },
      llm: { model: 'gpt-4', temperature: 0.7 },
      database: { query: '' },
      filter: { condition: 'value > 0' },
      transform: { operation: 'uppercase' },
      api: { url: '', method: 'GET' },
      conditional: { condition: 'if value > 0' },
    };
    return defaults[type] || {};
  };

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = { ...node, data: { ...node.data, ...newData } };
          // Update selected node if it's the one being modified
          if (selectedNode?.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      })
    );
  }, [setNodes, selectedNode]);

  const onNodesDelete = useCallback((deleted: Node[]) => {
    const deletedIds = deleted.map(node => node.id);
    setEdges((eds) => eds.filter((edge) => !deletedIds.includes(edge.source) && !deletedIds.includes(edge.target)));
    if (selectedNode && deletedIds.includes(selectedNode.id)) {
      setSelectedNode(null);
    }
  }, [selectedNode, setEdges]);

  const onEdgesDelete = useCallback(() => {
    // React Flow handles edge deletion automatically
  }, []);

  const handleSubmit = () => {
    if (nodes.length === 0) {
      toast({
        title: "Empty Pipeline",
        description: "Please add some nodes before submitting.",
        variant: "destructive",
      });
      return;
    }

    submitPipelineMutation.mutate({ nodes, edges });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col animate-container">
      {/* Header */}
      <header className="h-14 bg-slate-900/90 backdrop-blur-enhanced border-b border-slate-700/50 flex items-center justify-between px-6 relative z-50 shadow-lg">
        <div className="flex items-center space-x-4 animate-container">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg glow-blue transition-all duration-300 hover:scale-105">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                <path d="M2 17L12 22L22 17"/>
                <path d="M2 12L12 17L22 12"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">VectorShift</h1>
              <div className="text-xs text-slate-400 -mt-1">Pipeline Studio</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-1 text-sm text-slate-400">
            <span>Pipeline Editor</span>
            <span className="text-slate-600">•</span>
            <span>Untitled Pipeline</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-400">Status:</span>
              <Badge variant="secondary" className="bg-emerald-900/30 text-emerald-400 border-emerald-400/30 glow-green">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 status-pulse"></div>
                Ready
              </Badge>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitPipelineMutation.isPending}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="button-submit-pipeline"
            >
              {submitPipelineMutation.isPending ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Submit Pipeline</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)]">
        <NodePalette />
        
        <main className="flex-1 flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
          {/* Canvas Toolbar */}
          <div className="h-12 bg-slate-900/60 border-b border-slate-700/30 flex items-center justify-between px-4 backdrop-blur-enhanced shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1 rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <circle cx="11" cy="11" r="3"/>
                  </svg>
                  <span>Zoom: 100%</span>
                </div>
                <Button variant="ghost" size="sm" className="px-3 py-1 text-xs hover:bg-slate-700/50 transition-colors">
                  Reset View
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Nodes: <span className="text-slate-200" data-testid="text-node-count">{nodes.length}</span></span>
              <span>•</span>
              <span>Edges: <span className="text-slate-200" data-testid="text-edge-count">{edges.length}</span></span>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1" ref={reactFlowWrapper}>
            <ReactFlowProvider>
              <ReactFlow
                nodes={nodes}
                edges={edges.map(edge => ({
                  ...edge,
                  style: {
                    ...edge.style,
                    stroke: selectedEdges.includes(edge.id) ? '#6366f1' : '#64748b',
                    strokeWidth: selectedEdges.includes(edge.id) ? 3 : 2,
                  }
                }))}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodesDelete={onNodesDelete}
                onEdgesDelete={onEdgesDelete}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onEdgeClick={onEdgeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                connectionLineType={"smoothstep" as any}
                connectionLineStyle={{ stroke: '#22c55e', strokeWidth: 3 }}
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  style: { stroke: '#22c55e', strokeWidth: 3 },
                  markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' }
                }}
                className="bg-slate-950"
                data-testid="canvas-pipeline"
                proOptions={{ hideAttribution: true }}
              >
                <Background 
                  variant={"dots" as any}
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
        </main>

        <PropertiesPanel 
          selectedNode={selectedNode} 
          updateNodeData={updateNodeData}
          deleteSelectedNode={deleteSelectedNode}
        />
      </div>

      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        analysisResult={analysisResult}
      />
    </div>
  );
}
