import React from 'react';

export default function ProgressBar({ completed = 0, total = 0 }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full my-8">
      <div className="text-[17px] font-semibold text-[#0b1022] mb-3">Weekly Progress</div>
      <div className="w-full h-6 bg-[#d9dcff] overflow-hidden">
        <div
          className="h-full bg-[#3048a7] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
