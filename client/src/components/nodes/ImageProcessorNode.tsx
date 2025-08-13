import { memo, useState, useEffect } from 'react';
import { NodeProps, useReactFlow } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export const ImageProcessorNode = memo(({ id, data, selected }: NodeProps) => {
  const { setNodes } = useReactFlow();

  const [operation, setOperation] = useState(data.operation || '');
  const [width, setWidth] = useState(data.width || '');
  const [height, setHeight] = useState(data.height || '');

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, operation, width, height } }
          : node
      )
    );
  }, [operation, width, height, id, setNodes]);

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="image-processor"
      color="bg-violet-500"
      icon="🖼️"
      title="Image Processor"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400">Operation</label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue placeholder="Select operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="resize">Resize</SelectItem>
              <SelectItem value="crop">Crop</SelectItem>
              <SelectItem value="rotate">Rotate</SelectItem>
              <SelectItem value="blur">Blur</SelectItem>
              <SelectItem value="sharpen">Sharpen</SelectItem>
              <SelectItem value="grayscale">Grayscale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-slate-400">Width</label>
            <Input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="800"
              className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Height</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="600"
              className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100"
            />
          </div>
        </div>
      </div>
    </BaseNode>
  );
});

ImageProcessorNode.displayName = 'ImageProcessorNode';
