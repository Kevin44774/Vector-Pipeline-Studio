import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const APINode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="api"
      color="bg-cyan-500"
      icon="🌐"
      title="API Call"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Method</label>
        <Select value={data.method || 'GET'}>
          <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
        <label className="text-xs text-slate-400">URL</label>
        <Input
          type="text"
          value={data.url || 'https://api.example.com'}
          readOnly
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
        />
      </div>
    </BaseNode>
  );
});

APINode.displayName = 'APINode';
