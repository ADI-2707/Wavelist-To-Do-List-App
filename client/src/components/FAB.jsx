import React from 'react';
import { Plus } from 'lucide-react';

export default function FAB({ onClick, inline = false }) {
  return (
    <button
      onClick={onClick}
      className={`${inline ? 'mx-auto mt-6' : 'fixed bottom-8 left-1/2 -translate-x-1/2 z-30'} w-[74px] h-[74px] bg-[#4966e8] hover:bg-primary-dark text-white rounded-full flex items-center justify-center active:scale-95 transition-all`}
      aria-label="Add new task"
    >
      <Plus className="w-7 h-7 stroke-[1.7]" />
    </button>
  );
}
