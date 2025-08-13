import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ValidationNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="validation"
      color="bg-red-500"
      icon="✅"
      title="Data Validator"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400">Validation Type</label>
          <Select value={data.validationType || 'schema'}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schema">JSON Schema</SelectItem>
              <SelectItem value="regex">Regex Pattern</SelectItem>
              <SelectItem value="email">Email Format</SelectItem>
              <SelectItem value="phone">Phone Number</SelectItem>
              <SelectItem value="url">URL Format</SelectItem>
              <SelectItem value="custom">Custom Rules</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs text-slate-400">Rule/Pattern</label>
          <Textarea
            value={data.pattern || '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'}
            readOnly
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 font-mono resize-none cursor-default"
            rows={2}
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Error Message</label>
          <Input
            type="text"
            value={data.errorMessage || 'Invalid format'}
            readOnly
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
          />
        </div>
      </div>
    </BaseNode>
  );
});

ValidationNode.displayName = 'ValidationNode';