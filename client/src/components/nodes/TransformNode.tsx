import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TransformNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="transform"
      color="bg-rose-500"
      icon="🔄"
      title="Transform"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Operation</label>
        <Select value={data.operation || 'uppercase'}>
          <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uppercase">Uppercase</SelectItem>
            <SelectItem value="lowercase">Lowercase</SelectItem>
            <SelectItem value="trim">Trim</SelectItem>
            <SelectItem value="reverse">Reverse</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </BaseNode>
  );
});

TransformNode.displayName = 'TransformNode';
