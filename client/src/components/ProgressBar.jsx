import React from 'react';

export default function ProgressBar({ completed = 0, total = 0 }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full bg-surface rounded-card p-4 my-3 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[13px] font-semibold text-text-primary">Weekly Progress</span>
        <span className="text-[13px] font-bold text-primary">{percentage}%</span>
      </div>
      <div className="w-full h-3 bg-track rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-[11px] text-text-secondary">
        <span>{completed} of {total} completed</span>
        <span>{total - completed} remaining</span>
      </div>
    </div>
  );
}
