import { Node } from 'reactflow';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  updateNodeData: (nodeId: string, newData: any) => void;
  deleteSelectedNode: () => void;
}

export function PropertiesPanel({ selectedNode, updateNodeData, deleteSelectedNode }: PropertiesPanelProps) {
  if (!selectedNode) {
    return (
      <aside className="w-80 bg-slate-900/90 backdrop-blur-enhanced border-l border-slate-700/50 flex flex-col shadow-xl animate-container">
        <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-slate-300">Properties</h2>
          </div>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">Select a node</p>
            <p className="text-slate-500 text-xs mt-1">Click any node to view and edit its properties</p>
          </div>
        </div>
      </aside>
    );
  }

  const handleDataChange = (key: string, value: any) => {
    updateNodeData(selectedNode.id, { [key]: value });
  };

  const renderNodeProperties = () => {
    switch (selectedNode.type) {
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Input Name</label>
              <Input
                value={selectedNode.data.inputName || ''}
                onChange={(e) => handleDataChange('inputName', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100"
                data-testid="input-node-name"
              />
            </div>
          </div>
        );

      case 'output':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Output Name</label>
              <Input
                value={selectedNode.data.outputName || ''}
                onChange={(e) => handleDataChange('outputName', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100"
                data-testid="input-output-name"
              />
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Template Text</label>
              <Textarea
                value={selectedNode.data.text || ''}
                onChange={(e) => handleDataChange('text', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100 resize-none"
                rows={4}
                placeholder="Enter text with {{variables}}"
                data-testid="textarea-text-content"
              />
              <p className="text-xs text-slate-500 mt-1">Use {"{{variable}}"} to create input handles</p>
            </div>
            
            {selectedNode.data.variables && selectedNode.data.variables.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Detected Variables</label>
                <div className="space-y-2">
                  {selectedNode.data.variables.map((variable: string, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2">
                      <span className="text-sm text-slate-100 font-mono">{variable}</span>
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'llm':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Model</label>
              <Select value={selectedNode.data.model} onValueChange={(value) => handleDataChange('model', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100" data-testid="select-llm-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5-turbo</SelectItem>
                  <SelectItem value="claude-3">Claude-3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Temperature: {selectedNode.data.temperature}</label>
              <Slider
                value={[selectedNode.data.temperature || 0.7]}
                onValueChange={(value) => handleDataChange('temperature', value[0])}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
                data-testid="slider-llm-temperature"
              />
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Query</label>
              <Textarea
                value={selectedNode.data.query || ''}
                onChange={(e) => handleDataChange('query', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100 resize-none font-mono"
                rows={3}
                data-testid="textarea-database-query"
              />
            </div>
          </div>
        );

      case 'filter':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Filter Condition</label>
              <Input
                value={selectedNode.data.condition || ''}
                onChange={(e) => handleDataChange('condition', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100"
                placeholder="e.g., value > 10"
                data-testid="input-filter-condition"
              />
            </div>
          </div>
        );

      case 'transform':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Operation</label>
              <Select value={selectedNode.data.operation} onValueChange={(value) => handleDataChange('operation', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100" data-testid="select-transform-operation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uppercase">Uppercase</SelectItem>
                  <SelectItem value="lowercase">Lowercase</SelectItem>
                  <SelectItem value="trim">Trim</SelectItem>
                  <SelectItem value="reverse">Reverse</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">URL</label>
              <Input
                value={selectedNode.data.url || ''}
                onChange={(e) => handleDataChange('url', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100"
                placeholder="https://api.example.com"
                data-testid="input-api-url"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Method</label>
              <Select value={selectedNode.data.method} onValueChange={(value) => handleDataChange('method', value)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-100" data-testid="select-api-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'conditional':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Condition</label>
              <Textarea
                value={selectedNode.data.condition || ''}
                onChange={(e) => handleDataChange('condition', e.target.value)}
                className="bg-slate-800 border-slate-600 text-slate-100 resize-none"
                rows={2}
                placeholder="if value > 0"
                data-testid="textarea-conditional-condition"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-slate-500 text-sm">
            No properties available for this node type.
          </div>
        );
    }
  };

  return (
    <aside className="w-80 bg-slate-900/90 backdrop-blur-enhanced border-l border-slate-700/50 flex flex-col shadow-xl animate-container">
      <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-800/50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-slate-300">Properties</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={deleteSelectedNode}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/30 transition-all duration-200 hover:scale-105"
          data-testid="button-delete-node"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-slate-200 mb-3">
              {selectedNode.type ? selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1) : 'Node'} Properties
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Node ID</label>
                <Input
                  value={selectedNode.id}
                  disabled
                  className="bg-slate-800 border-slate-600 text-slate-300 cursor-not-allowed"
                  data-testid="input-node-id"
                />
              </div>
              
              {renderNodeProperties()}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
