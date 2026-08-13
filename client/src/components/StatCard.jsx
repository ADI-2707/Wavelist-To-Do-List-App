import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

export default function StatCard({ type = 'complete', count = 0, total = 0 }) {
  if (type === 'complete') {
    return (
      <div className="flex-1 bg-primary text-white rounded-card p-4 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-white/90">Task Complete</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="mt-2">
          <span className="text-[28px] font-bold leading-none">{count}</span>
          <span className="text-[12px] font-normal text-white/80 ml-1.5">tasks</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-danger-bg rounded-card p-4 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[110px]">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-text-primary">Task Pending</span>
        <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center">
          <Clock className="w-5 h-5 text-danger-icon" />
        </div>
      </div>
      <div className="mt-2">
        <span className="text-[28px] font-bold leading-none text-text-primary">{count}</span>
        <span className="text-[12px] font-normal text-text-secondary ml-1.5">tasks</span>
      </div>
    </div>
  );
}
