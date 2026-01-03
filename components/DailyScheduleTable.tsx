import React from 'react';
import { TIME_SLOTS, KEY_MAPPING } from '../constants';
import { RawTimetableEntry } from '../types';

interface DailyScheduleTableProps {
  data: RawTimetableEntry[];
  dayIndex: number;
  onRoomClick: (roomData: RawTimetableEntry) => void;
}

// Color schemes for each day of the week
const DAY_COLORS = [
  { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800', header: 'bg-blue-600' },      // Monday
  { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-800', header: 'bg-purple-600' }, // Tuesday
  { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-800', header: 'bg-emerald-600' }, // Wednesday
  { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800', header: 'bg-orange-600' }, // Thursday
  { bg: 'bg-pink-50', border: 'border-pink-400', text: 'text-pink-800', header: 'bg-pink-600' },      // Friday
  { bg: 'bg-cyan-50', border: 'border-cyan-400', text: 'text-cyan-800', header: 'bg-cyan-600' },      // Saturday
  { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-800', header: 'bg-amber-600' },  // Sunday
];

// Time slot intensity variations (morning to evening gradient)
const TIME_SLOT_OPACITY = [
  'opacity-100', // 08:00 - 10:00 (Morning - Full intensity)
  'opacity-95',  // 10:00 - 12:00 
  'opacity-85',  // 12:00 - 14:00 (Midday)
  'opacity-90',  // 14:00 - 16:00
  'opacity-80',  // 16:00 - 18:00 (Evening - Slightly faded)
];

const DailyScheduleTable: React.FC<DailyScheduleTableProps> = ({ data, dayIndex, onRoomClick }) => {
  // Get the keys for the selected day from the mapping
  const currentDayKeys = KEY_MAPPING[dayIndex];
  const dayColor = DAY_COLORS[dayIndex];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className={`${dayColor.header}`}>
            {/* Room Column Header */}
            <th scope="col" className={`px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider w-32 sticky left-0 ${dayColor.header} border-r border-white/30 z-30 shadow-md`}>
              Room
            </th>
            {/* Time Slot Headers with color indicators */}
            {TIME_SLOTS.map((slot, index) => (
              <th key={index} scope="col" className={`px-6 py-4 text-center text-xs font-bold text-white uppercase tracking-wider min-w-[200px] ${TIME_SLOT_OPACITY[index]}`}>
                <div className="flex flex-col items-center">
                  <span className="text-white/60 text-[10px] mb-1">Slot {index + 1}</span>
                  <span>{slot.label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((roomData, rowIndex) => {
            const roomName = roomData['DAY'];

            return (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors group">
                <td
                  onClick={() => onRoomClick(roomData)}
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 sticky left-0 ${dayColor.bg} border-r border-gray-200 z-20 cursor-pointer group-hover:brightness-95 transition-all shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]`}
                  title="View full weekly schedule"
                >
                  <div className="flex items-center gap-2">
                    <span>{roomName}</span>
                    <svg className={`w-4 h-4 ${dayColor.text} opacity-0 group-hover:opacity-60 transition-opacity`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </td>
                {currentDayKeys.map((key, slotIndex) => {
                  const content = roomData[key];
                  const hasContent = content && content.trim() !== '' && content !== roomName;

                  return (
                    <td key={key} className={`px-2 py-3 align-top h-full ${TIME_SLOT_OPACITY[slotIndex]}`}>
                      {hasContent ? (
                        <div className={`h-full w-full ${dayColor.bg} border-l-4 ${dayColor.border} rounded p-3 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]`}>
                          <p className={`text-xs font-semibold ${dayColor.text} line-clamp-3 leading-snug`}>
                            {content}
                          </p>
                        </div>
                      ) : (
                        <div className="h-full w-full bg-gray-50/50 rounded p-3 border border-dashed border-gray-200">
                          <span className="text-gray-300 text-xs">-</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                No classes found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DailyScheduleTable;