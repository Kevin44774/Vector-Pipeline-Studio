import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export const ImageProcessorNode = memo(({ id, data, selected }: NodeProps) => {
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
          <Select value={data.operation || 'resize'}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue />
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
              value={data.width || 800}
              readOnly
              className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Height</label>
            <Input
              type="number"
              value={data.height || 600}
              readOnly
              className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
            />
          </div>
        </div>
      </div>
    </BaseNode>
  );
});

ImageProcessorNode.displayName = 'ImageProcessorNode';