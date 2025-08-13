import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Textarea } from '@/components/ui/textarea';

export const DatabaseNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="database"
      color="bg-amber-500"
      icon="🗄️"
      title="Database"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <label className="text-xs text-slate-400">Query</label>
        <Textarea
          value={data.query || 'SELECT * FROM table'}
          readOnly
          className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 resize-none font-mono cursor-default"
          rows={2}
        />
      </div>
    </BaseNode>
  );
});

DatabaseNode.displayName = 'DatabaseNode';
