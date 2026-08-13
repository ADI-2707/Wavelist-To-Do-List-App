import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange, onFocus, placeholder = "Search task..." }) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#0d1327]">
        <Search className="w-5 h-5 stroke-[1.8]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full px-5 py-[13px] bg-surface border border-[#e4e4e4] rounded-[5px] text-[12px] text-text-primary placeholder:text-[#929292] focus:outline-none focus:border-primary transition-all"
      />
    </div>
  );
}
