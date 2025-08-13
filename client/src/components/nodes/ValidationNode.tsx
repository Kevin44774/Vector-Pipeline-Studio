import { memo, useEffect, useState } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ValidationNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  // Start empty so placeholders show; fill only if data already has values
  const [validationType, setValidationType] = useState<string>(data.validationType ?? '');
  const [pattern, setPattern] = useState<string>(data.pattern ?? '');
  const [errorMessage, setErrorMessage] = useState<string>(data.errorMessage ?? '');

  // Push changes back to the React Flow node data
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                validationType,
                pattern,
                errorMessage,
              },
            }
          : node
      )
    );
  }, [validationType, pattern, errorMessage, id, setNodes]);

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="validation"
      color="bg-red-500"
      icon="✅"
      title="Data Validator"
      handles={{ input: true, output: true }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400">Validation Type</label>
          <Select value={validationType} onValueChange={setValidationType}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue placeholder="Select validation type" />
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
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 font-mono resize-none"
            rows={2}
          />
        </div>

        <div>
          <label className="text-xs text-slate-400">Error Message</label>
          <Input
            type="text"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
            placeholder="Invalid format"
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
          />
        </div>
      </div>
    </BaseNode>
  );
});

ValidationNode.displayName = 'ValidationNode';
