import React from 'react';
import { Check, SquareX } from 'lucide-react';

export default function StatCard({ type = 'complete', count = 0 }) {
  const isComplete = type === 'complete';

  return (
    <div className={`flex-1 p-4 min-h-[93px] ${isComplete ? 'bg-[#edf0ff]' : 'bg-[#ffe3e5]'}`}>
      <div className="flex items-center gap-3">
        {isComplete ? (
          <span className="w-7 h-7 flex items-center justify-center bg-[#c7d2ff] text-[#4966e8]">
            <span className="w-5 h-5 border-[1.5px] border-current flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[2]" />
            </span>
          </span>
        ) : (
          <span className="w-7 h-7 flex items-center justify-center bg-[#f7bcc1] text-[#ec5e67]">
            <SquareX className="w-5 h-5 stroke-[1.8]" />
          </span>
        )}
        <span className="text-[12px] font-normal text-[#12172a]">
          {isComplete ? 'Task Complete' : 'Task Pending'}
        </span>
      </div>
      <div className="mt-2 pl-9">
        <span className="text-[21px] font-semibold leading-none text-[#11152a]">{count}</span>
        <span className="text-[10px] text-[#707381] ml-1.5">This Week</span>
      </div>
    </div>
  );
}
