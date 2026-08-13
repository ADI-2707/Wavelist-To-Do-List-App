import React from 'react';
import { Plus } from 'lucide-react';

export default function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 md:right-[calc(50%-180px)] w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/40 active:scale-95 transition-all duration-200 z-30"
      aria-label="Add new task"
    >
      <Plus className="w-7 h-7 stroke-[2.5]" />
    </button>
  );
}
