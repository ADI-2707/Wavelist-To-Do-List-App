import React from 'react';

export default function DayStrip({ selectedDate, onSelectDate, weekOffset = 0, onChangeWeek, activeTaskDates = [] }) {
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
    <div className="w-full mt-3 mb-7">
      <div className="flex items-start justify-between overflow-x-auto no-scrollbar">
        {days.map((day) => {
          const isSelected = day.fullDate === selectedDateStr;
          const hasActiveTask = activeTaskDates.includes(day.fullDate);
          return (
            <button
              key={day.fullDate}
              onClick={() => onSelectDate && onSelectDate(day.dateObj)}
              className={`relative w-[38px] min-w-[38px] h-[61px] flex flex-col items-center justify-center px-1 transition-all ${
                isSelected
                  ? 'bg-[#4966e8] text-white'
                  : 'text-[#a8a8a8] hover:text-primary'
              }`}
            >
              <span className={`text-[10px] font-normal ${isSelected ? 'text-white/80' : 'text-[#b1b1b1]'}`}>
                {day.name}
              </span>
              <span className={`text-[14px] font-medium mt-1 ${isSelected ? 'text-white' : 'text-[#a4a4a4]'}`}>
                {day.dateNum}
              </span>
              {isSelected && hasActiveTask && <span className="absolute bottom-[6px] w-1 h-1 rounded-full bg-white" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
