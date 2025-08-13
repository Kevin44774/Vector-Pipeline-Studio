import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';

export const FilterNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  const [condition, setCondition] = useState(data.condition || '');

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, condition } } : node
      )
    );
  }, [condition, id, setNodes]);

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="filter"
      color="bg-teal-500"
      icon="🔍"
      title="Filter"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Condition</label>
        <Input
          type="text"
          value={condition}
          placeholder="e.g., value > 0"
          onChange={(e) => setCondition(e.target.value)}
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
        />
      </div>
    </BaseNode>
  );
});

FilterNode.displayName = 'FilterNode';
