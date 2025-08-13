import { memo, useEffect, useRef, useState, useCallback } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Textarea } from '@/components/ui/textarea';

export const TextNode = memo(({ id, data, selected }: NodeProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(data.text || 'Hello {{input}}! Welcome to {{name}}.');
  const [variables, setVariables] = useState<string[]>([]);
  const { setNodes } = useReactFlow();

  // Extract variables from text using regex for {{variable_name}} pattern
  const extractVariables = useCallback((inputText: string): string[] => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches: string[] = [];
    let match;
    
    while ((match = variableRegex.exec(inputText)) !== null) {
      const variableName = match[1].trim();
      if (!matches.includes(variableName)) {
        matches.push(variableName);
      }
    }
    
    return matches;
  }, []);

  // Auto-resize textarea based on content with min/max constraints
  const autoResize = useCallback(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      
      // Calculate new height with constraints
      const scrollHeight = textarea.scrollHeight;
      const minHeight = 60; // 3 lines minimum
      const maxHeight = 200; // ~10 lines maximum
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      
      textarea.style.height = `${newHeight}px`;
    }
  }, []);

  // Handle text changes and update variables
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    
    // Extract variables and update state
    const newVariables = extractVariables(newText);
    setVariables(newVariables);
    
    // Auto-resize textarea
    setTimeout(autoResize, 0);
  };

  // Update node data in React Flow when text or variables change
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                text,
                variables,
              },
            }
          : node
      )
    );
  }, [text, variables, id, setNodes]);

  // Sync with external updates (from PropertiesPanel)
  useEffect(() => {
    if (data.text !== text) {
      setText(data.text || 'Hello {{input}}! Welcome to {{name}}.');
    }
  }, [data.text, text]);

  // Initialize variables on mount
  useEffect(() => {
    const initialVariables = extractVariables(text);
    setVariables(initialVariables);
    autoResize();
  }, [text, extractVariables, autoResize]);

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="text"
      color="bg-purple-500"
      icon="📝"
      title="Text"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Template Text</label>
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none transition-all duration-200"
          placeholder="Enter text with variables like {{input}} or {{name}}"
          style={{ 
            minHeight: '60px',
            maxHeight: '200px',
            overflow: 'auto'
          }}
        />
        {variables.length > 0 && (
          <div className="mt-2">
            <label className="text-xs text-slate-400 mb-1 block">Detected Variables:</label>
            <div className="flex flex-wrap gap-1">
              {variables.map((variable) => (
                <span
                  key={variable}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-900/30 text-purple-300 border border-purple-700/50"
                >
                  {variable}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
});

TextNode.displayName = 'TextNode';
