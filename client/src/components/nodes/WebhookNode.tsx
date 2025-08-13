import { memo, useEffect, useState } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const WebhookNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  // Local states so fields are editable
  const [method, setMethod] = useState<string>(data.method ?? '');
  const [url, setUrl] = useState<string>(data.url ?? '');
  const [auth, setAuth] = useState<string>(data.auth ?? 'none');
  const [retries, setRetries] = useState<number>(data.retries ?? 3);

  // Push updates to React Flow
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                method,
                url,
                auth,
                retries,
              },
            }
          : node
      )
    );
  }, [method, url, auth, retries, id, setNodes]);

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="webhook"
      color="bg-indigo-500"
      icon="🔗"
      title="Webhook Trigger"
      handles={{ input: true, output: true }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400">HTTP Method</label>
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-400">Webhook URL</label>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/webhook"
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
          />
        </div>

        <div>
          <label className="text-xs text-slate-400">Authentication</label>
          <Select value={auth} onValueChange={setAuth}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue placeholder="Select auth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="bearer">Bearer Token</SelectItem>
              <SelectItem value="api-key">API Key</SelectItem>
              <SelectItem value="basic">Basic Auth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-slate-400">Retry Count</label>
          <Input
            type="number"
            value={retries}
            onChange={(e) => setRetries(Number(e.target.value))}
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
          />
        </div>
      </div>
    </BaseNode>
  );
});

WebhookNode.displayName = 'WebhookNode';
