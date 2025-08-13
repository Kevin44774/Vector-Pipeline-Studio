import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const EmailNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  const [toEmail, setToEmail] = useState(data.to || '');
  const [subject, setSubject] = useState(data.subject || '');
  const [template, setTemplate] = useState(data.template || '');

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, to: toEmail, subject, template } }
          : node
      )
    );
  }, [toEmail, subject, template, id, setNodes]);

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
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Subject</label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Notification"
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400">Template</label>
          <Textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            placeholder="Hello Kevin, your order is ready!"
            className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 resize-none"
            rows={2}
          />
        </div>
      </div>
    </BaseNode>
  );
});

EmailNode.displayName = 'EmailNode';
