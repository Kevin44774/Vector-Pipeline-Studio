import { memo, ReactNode } from 'react';
import { Handle, Position } from 'reactflow';

interface BaseNodeProps {
  id: string;
  data: any;
  selected: boolean;
  type: string;
  color: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  handles?: {
    input?: boolean;
    output?: boolean;
  };
}

export const BaseNode = memo(({ 
  id, 
  data, 
  selected, 
  type, 
  color, 
  icon, 
  title, 
  children,
  handles 
}: BaseNodeProps) => {
  // Color mapping for borders and handles
  const getColors = (colorClass: string) => {
    const colorMap: Record<string, { border: string; handle: string }> = {
      'bg-blue-500': { border: 'border-blue-500', handle: '#3b82f6' },
      'bg-green-500': { border: 'border-green-500', handle: '#22c55e' },
      'bg-purple-500': { border: 'border-purple-500', handle: '#a855f7' },
      'bg-orange-500': { border: 'border-orange-500', handle: '#f97316' },
      'bg-red-500': { border: 'border-red-500', handle: '#ef4444' },
      'bg-yellow-500': { border: 'border-yellow-500', handle: '#eab308' },
      'bg-indigo-500': { border: 'border-indigo-500', handle: '#6366f1' },
      'bg-pink-500': { border: 'border-pink-500', handle: '#ec4899' },
      'bg-cyan-500': { border: 'border-cyan-500', handle: '#06b6d4' },
      'bg-amber-500': { border: 'border-amber-500', handle: '#f59e0b' },
      'bg-teal-500': { border: 'border-teal-500', handle: '#14b8a6' },
      'bg-rose-500': { border: 'border-rose-500', handle: '#f43f5e' },
      'bg-blue-600': { border: 'border-blue-600', handle: '#2563eb' },
      'bg-violet-500': { border: 'border-violet-500', handle: '#8b5cf6' },
      'bg-emerald-500': { border: 'border-emerald-500', handle: '#10b981' },
    };
    return colorMap[colorClass] || { border: 'border-slate-500', handle: '#64748b' };
  };
  
  const colors = getColors(color);
  const borderColor = selected ? 'border-indigo-400' : colors.border;
  
  return (
    <div 
      className={`bg-slate-800 border-2 ${borderColor} rounded-xl shadow-xl min-w-48 relative group hover:shadow-2xl transition-all duration-200`}
      data-testid={`node-${type}-${id}`}
      style={{ minHeight: '80px' }}
    >
      {/* Input Handle - Data flows IN from the left */}
      {handles?.input && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{ 
            width: '12px',
            height: '12px',
            backgroundColor: colors.handle,
            border: '2px solid #1e293b',
            borderRadius: '50%',
            left: '-6px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          className="hover:scale-110 transition-all duration-200 cursor-pointer"
        />
      )}
      
      {/* Output Handle - Data flows OUT to the right */}
      {handles?.output && (
        <Handle
          type="source"
          position={Position.Right}
          id="output"
          style={{ 
            width: '12px',
            height: '12px',
            backgroundColor: colors.handle,
            border: '2px solid #1e293b',
            borderRadius: '50%',
            right: '-6px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          className="hover:scale-110 transition-all duration-200 cursor-pointer"
        />
      )}
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className={`w-6 h-6 ${color} rounded-md flex items-center justify-center text-white text-xs`}>
            {icon}
          </div>
          <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
});

BaseNode.displayName = 'BaseNode';
