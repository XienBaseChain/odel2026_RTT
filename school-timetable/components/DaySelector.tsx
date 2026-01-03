import React from 'react';
import { DAYS } from '../constants';

interface DaySelectorProps {
  activeDayIndex: number;
  onSelectDay: (index: number) => void;
}

// Color schemes for each day (matching DailyScheduleTable)
const DAY_BUTTON_COLORS = [
  { active: 'bg-blue-600 text-white shadow-blue-200', inactive: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },      // Monday
  { active: 'bg-purple-600 text-white shadow-purple-200', inactive: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' }, // Tuesday
  { active: 'bg-emerald-600 text-white shadow-emerald-200', inactive: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' }, // Wednesday
  { active: 'bg-orange-600 text-white shadow-orange-200', inactive: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' }, // Thursday
  { active: 'bg-pink-600 text-white shadow-pink-200', inactive: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100' },      // Friday
  { active: 'bg-cyan-600 text-white shadow-cyan-200', inactive: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100' },      // Saturday
  { active: 'bg-amber-600 text-white shadow-amber-200', inactive: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' },  // Sunday
];

const DaySelector: React.FC<DaySelectorProps> = ({ activeDayIndex, onSelectDay }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {DAYS.map((day, index) => {
        const isActive = activeDayIndex === index;
        const colors = DAY_BUTTON_COLORS[index];
        return (
          <button
            key={day}
            onClick={() => onSelectDay(index)}
            className={`
              px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out border
              ${isActive
                ? `${colors.active} shadow-lg transform scale-105`
                : `${colors.inactive}`
              }
            `}
          >
            {day.charAt(0) + day.slice(1).toLowerCase()}
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;