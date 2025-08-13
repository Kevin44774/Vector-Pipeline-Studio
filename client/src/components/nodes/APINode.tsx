import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const APINode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  const [url, setUrl] = useState(data.url || '');
  const [method, setMethod] = useState(data.method || '');

  // Push changes back to React Flow's node data
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, url, method } } : node
      )
    );
  }, [url, method, id, setNodes]);

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
        <label className="text-xs text-slate-400">URL</label>
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
        />
        <label className="text-xs text-slate-400">Method</label>
        <Select value={method} onValueChange={(value) => setMethod(value)}>
          <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="POST">POST</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
            <SelectItem value="DELETE">DELETE</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </BaseNode>
  );
});

APINode.displayName = 'APINode';
