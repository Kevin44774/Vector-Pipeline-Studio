import { memo } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const LLMNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  const handleModelChange = (value: string) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, model: value } } : node
      )
    );
  };

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="llm"
      color="bg-indigo-500"
      icon="🤖"
      title="LLM"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Model</label>
        <Select value={data.model || ''} onValueChange={handleModelChange}>
          <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5-turbo</SelectItem>
            <SelectItem value="claude-3">Claude-3</SelectItem>
          </SelectContent>
        </Select>
        <div className="mt-2">
          <label className="text-xs text-slate-400">
            Temperature: {data.temperature ?? 0.7}
          </label>
          <div className="mt-1 h-2 bg-slate-700 rounded-full relative">
            <div
              className="h-2 bg-purple-500 rounded-full transition-all duration-200"
              style={{ width: `${((data.temperature ?? 0.7) * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </BaseNode>
  );
});

LLMNode.displayName = 'LLMNode';
