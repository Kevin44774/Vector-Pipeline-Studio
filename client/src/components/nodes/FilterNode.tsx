import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';

export const FilterNode = memo(({ id, data, selected }: NodeProps) => {
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
          value={data.condition || 'value > 0'}
          readOnly
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
        />
      </div>
    </BaseNode>
  );
});

FilterNode.displayName = 'FilterNode';
