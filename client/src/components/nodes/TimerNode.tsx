import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const TimerNode = memo(({ id, data, selected }: NodeProps) => {
  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      type="timer"
      color="bg-emerald-500"
      icon="⏰"
      title="Timer/Scheduler"
      handles={{
        input: true,
        output: true
      }}
    >
      <div className="space-y-2">
        <div>
          <label className="text-xs text-slate-400">Type</label>
          <Select value={data.type || 'delay'}>
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delay">Delay</SelectItem>
              <SelectItem value="interval">Interval</SelectItem>
              <SelectItem value="schedule">Schedule</SelectItem>
              <SelectItem value="cron">Cron Job</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-slate-400">Duration</label>
            <Input
              type="number"
              value={data.duration || 5}
              readOnly
              className="w-full bg-slate-700 border-slate-600 rounded-md px-2 py-1 text-sm text-slate-100 cursor-default"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Unit</label>
            <Select value={data.unit || 'seconds'}>
              <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-sm text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seconds">Seconds</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </BaseNode>
  );
});

TimerNode.displayName = 'TimerNode';