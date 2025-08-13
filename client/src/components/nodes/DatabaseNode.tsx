import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Textarea } from '@/components/ui/textarea';

export const DatabaseNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();
  const [query, setQuery] = useState(data.query || '');

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, query } } : node
      )
    );
  }, [query, id, setNodes]);

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
      {selected && (
        <div className="space-y-2">
          <label className="text-xs text-slate-400">Query</label>
          <Textarea
            value={query}
            placeholder="SELECT * FROM table"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 font-mono resize-none"
            rows={2}
          />
        </div>
      )}
    </BaseNode>
  );
});

DatabaseNode.displayName = 'DatabaseNode';
