import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';

export const InputNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="input"
      color="bg-blue-500"
      icon="📥"
      title="Input"
      handles={{
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Input Name</label>
        <Input
          type="text"
          value={data.inputName || ''}
          placeholder="input"
          readOnly
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
        />
      </div>
    </BaseNode>
  );
});

InputNode.displayName = 'InputNode';