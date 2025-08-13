import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const LLMNode = memo(({ id, data, selected }: NodeProps) => {
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
        <Select value={data.model || 'gpt-4'}>
          <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5-turbo</SelectItem>
            <SelectItem value="claude-3">Claude-3</SelectItem>
          </SelectContent>
        </Select>
        <label className="text-xs text-slate-400">Temperature: {data.temperature || 0.7}</label>
        <div className="text-xs text-slate-500 bg-slate-700 rounded px-2 py-1">
          Temp: {data.temperature || 0.7}
        </div>
      </div>
    </BaseNode>
  );
});

LLMNode.displayName = 'LLMNode';
