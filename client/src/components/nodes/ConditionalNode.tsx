import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Textarea } from '@/components/ui/textarea';

export const ConditionalNode = memo(({ id, data, selected }: NodeProps) => {
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
          value={data.condition || 'if value > 0'}
          readOnly
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 resize-none cursor-default"
          rows={2}
        />
      </div>
    </BaseNode>
  );
});

ConditionalNode.displayName = 'ConditionalNode';
