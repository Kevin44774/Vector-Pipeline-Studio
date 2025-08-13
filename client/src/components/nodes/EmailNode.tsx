import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const EmailNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="email"
      color="bg-blue-600"
      icon="📧"
      title="Email Sender"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400">To Email</label>
          <Input
            type="email"
            value={data.to || 'user@example.com'}
            readOnly
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Subject</label>
          <Input
            type="text"
            value={data.subject || 'Notification'}
            readOnly
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Template</label>
          <Textarea
            value={data.template || 'Hello {{name}}, your order is ready!'}
            readOnly
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 resize-none cursor-default"
            rows={2}
          />
        </div>
      </div>
    </BaseNode>
  );
});

EmailNode.displayName = 'EmailNode';