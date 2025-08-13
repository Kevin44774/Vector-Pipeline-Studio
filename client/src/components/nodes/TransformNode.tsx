import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TransformNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  const [operation, setOperation] = useState(data.operation || '');

  // Sync local state with React Flow node data
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, operation } } : node
      )
    );
  }, [operation, id, setNodes]);

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="transform"
      color="bg-cyan-500"
      icon="🔄"
      title="Transform"
      handles={{
        input: true,
        output: true
      }}
    >
      {selected && (
        <div className="space-y-2">
          <label className="text-xs text-slate-400">Operation</label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uppercase">Uppercase</SelectItem>
              <SelectItem value="lowercase">Lowercase</SelectItem>
              <SelectItem value="reverse">Reverse</SelectItem>
              <SelectItem value="trim">Trim</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </BaseNode>
  );
});

TransformNode.displayName = 'TransformNode';