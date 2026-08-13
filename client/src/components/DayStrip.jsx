import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DayStrip({ selectedDate, onSelectDate, weekOffset = 0, onChangeWeek }) {
  // Generate days for the selected week offset (Monday to Sunday)
  const getDaysOfWeek = (offset = 0) => {
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 is Sun, 1 is Mon
    const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
    
    const monday = new Date(now);
    monday.setDate(now.getDate() + distanceToMonday + offset * 7);

    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push({
        name: dayNames[i],
        dateNum: d.getDate(),
        fullDate: d.toISOString().split('T')[0],
        dateObj: d
      });
    }
    return days;
  };

  const days = getDaysOfWeek(weekOffset);
  const selectedDateStr = selectedDate ? new Date(selectedDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  const getWeekLabel = () => {
    if (weekOffset === 0) return 'This Week';
    if (weekOffset === -1) return 'Last Week';
    if (weekOffset === 1) return 'Next Week';
    const start = days[0].dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const end = days[6].dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${start} - ${end}`;
  };

  return (
    <div className="w-full my-4">
      {/* Week header & Navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[15px] font-semibold text-text-primary">{getWeekLabel()}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChangeWeek && onChangeWeek(weekOffset - 1)}
            className="p-1.5 rounded-full bg-surface border border-border text-text-secondary hover:text-primary transition-colors"
            title="Previous Week"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeWeek && onChangeWeek(weekOffset + 1)}
            className="p-1.5 rounded-full bg-surface border border-border text-text-secondary hover:text-primary transition-colors"
            title="Next Week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Days Horizontal Scroll */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
        {days.map((day) => {
          const isSelected = day.fullDate === selectedDateStr;
          return (
            <button
              key={day.fullDate}
              onClick={() => onSelectDate && onSelectDate(day.dateObj)}
              className={`flex-1 min-w-[44px] flex flex-col items-center justify-center py-2.5 px-1 rounded-full transition-all duration-200 ${
                isSelected
                  ? 'bg-primary text-white shadow-md shadow-primary/30 scale-105'
                  : 'bg-surface border border-border text-text-secondary hover:border-primary/50'
              }`}
            >
              <span className={`text-[11px] font-medium uppercase ${isSelected ? 'text-white/80' : 'text-text-muted'}`}>
                {day.name}
              </span>
              <span className={`text-[15px] font-bold mt-0.5 ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                {day.dateNum}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
