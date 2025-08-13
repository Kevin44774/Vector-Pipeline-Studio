import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Textarea } from '@/components/ui/textarea';

export const ConditionalNode = memo(({ id, data, selected }: NodeProps) => {
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
      type="conditional"
      color="bg-orange-500"
      icon="🔀"
      title="Conditional"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Condition</label>
        <Textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="if value > 0"
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 resize-none"
          rows={2}
        />
      </div>
    </BaseNode>
  );
});

ConditionalNode.displayName = 'ConditionalNode';
