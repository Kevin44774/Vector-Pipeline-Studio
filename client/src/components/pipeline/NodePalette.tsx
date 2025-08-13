import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const nodeCategories = [
  {
    title: 'Basic Nodes',
    nodes: [
      { type: 'input', name: 'Input', description: 'Data input node', color: 'bg-blue-500', icon: '📥' },
      { type: 'output', name: 'Output', description: 'Data output node', color: 'bg-green-500', icon: '📤' },
      { type: 'text', name: 'Text', description: 'Text processing node', color: 'bg-purple-500', icon: '📝' },
      { type: 'llm', name: 'LLM', description: 'Language model node', color: 'bg-indigo-500', icon: '🤖' },
    ]
  },
  {
    title: 'Custom Nodes',
    nodes: [
      { type: 'database', name: 'Database', description: 'Data storage node', color: 'bg-amber-500', icon: '🗄️' },
      { type: 'filter', name: 'Filter', description: 'Data filtering node', color: 'bg-teal-500', icon: '🔍' },
      { type: 'transform', name: 'Transform', description: 'Data transformation node', color: 'bg-rose-500', icon: '🔄' },
      { type: 'api', name: 'API Call', description: 'External API node', color: 'bg-cyan-500', icon: '🌐' },
      { type: 'conditional', name: 'Conditional', description: 'Logic branching node', color: 'bg-orange-500', icon: '🔀' },
    ]
  },
  {
    title: 'Advanced Nodes',
    nodes: [
      { type: 'email', name: 'Email Sender', description: 'Send email notifications', color: 'bg-blue-600', icon: '📧' },
      { type: 'image-processor', name: 'Image Processor', description: 'Resize, crop, and edit images', color: 'bg-violet-500', icon: '🖼️' },
      { type: 'timer', name: 'Timer/Scheduler', description: 'Schedule delays and intervals', color: 'bg-emerald-500', icon: '⏰' },
      { type: 'validation', name: 'Data Validator', description: 'Validate data formats and rules', color: 'bg-red-500', icon: '✅' },
      { type: 'webhook', name: 'Webhook Trigger', description: 'Call external webhooks', color: 'bg-indigo-500', icon: '🔗' },
    ]
  }
];

export function NodePalette() {
  const [searchTerm, setSearchTerm] = useState('');

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Filter nodes based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return nodeCategories;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return nodeCategories.map(category => ({
      ...category,
      nodes: category.nodes.filter(node => 
        node.name.toLowerCase().includes(lowerSearchTerm) ||
        node.description.toLowerCase().includes(lowerSearchTerm) ||
        node.type.toLowerCase().includes(lowerSearchTerm)
      )
    })).filter(category => category.nodes.length > 0);
  }, [searchTerm]);

  return (
    <aside className="w-64 bg-slate-900/90 backdrop-blur-enhanced border-r border-slate-700/50 flex flex-col shadow-xl animate-container">
      <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-slate-300">Node Library</h2>
        </div>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 pl-10"
            data-testid="input-search-nodes"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {filteredCategories.length === 0 && searchTerm.trim() ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">No nodes found</p>
            <p className="text-slate-500 text-xs mt-1">Try a different search term</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.nodes.map((node) => (
                  <div
                    key={node.type}
                    draggable
                    onDragStart={(event) => onDragStart(event, node.type)}
                    className="group cursor-grab active:cursor-grabbing p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-600/50 hover:border-indigo-500/70 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 backdrop-blur-sm"
                    data-testid={`node-palette-${node.type}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 ${node.color} rounded-lg flex items-center justify-center text-white text-sm shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                        {node.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-100 group-hover:text-white transition-colors">{node.name}</div>
                        <div className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{node.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
