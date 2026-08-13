import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onFocus, placeholder = "Search task..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
        <Search className="w-5 h-5 stroke-[2.2]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-input text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-all duration-200 shadow-sm"
      />
    </div>
  );
}
