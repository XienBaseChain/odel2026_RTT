import React from 'react';
import { TIME_SLOTS, DAYS, KEY_MAPPING } from '../constants';
import { RawTimetableEntry } from '../types';

interface TimetableGridProps {
  data: RawTimetableEntry;
}

// Color schemes for each day of the week
const DAY_COLORS = [
  { bg: 'bg-blue-50', border: 'border-blue-400', text: 'text-blue-800', header: 'bg-blue-100', label: 'bg-blue-600 text-white' },      // Monday
  { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-800', header: 'bg-purple-100', label: 'bg-purple-600 text-white' }, // Tuesday
  { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-800', header: 'bg-emerald-100', label: 'bg-emerald-600 text-white' }, // Wednesday
  { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800', header: 'bg-orange-100', label: 'bg-orange-600 text-white' }, // Thursday
  { bg: 'bg-pink-50', border: 'border-pink-400', text: 'text-pink-800', header: 'bg-pink-100', label: 'bg-pink-600 text-white' },      // Friday
  { bg: 'bg-cyan-50', border: 'border-cyan-400', text: 'text-cyan-800', header: 'bg-cyan-100', label: 'bg-cyan-600 text-white' },      // Saturday
  { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-800', header: 'bg-amber-100', label: 'bg-amber-600 text-white' },  // Sunday
];

// Time slot intensity variations
const TIME_SLOT_OPACITY = [
  'opacity-100', // 08:00 - 10:00
  'opacity-95',  // 10:00 - 12:00 
  'opacity-90',  // 12:00 - 14:00
  'opacity-95',  // 14:00 - 16:00
  'opacity-90',  // 16:00 - 18:00
];

const TimetableGrid: React.FC<TimetableGridProps> = ({ data }) => {
  const roomName = data['DAY'];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 tracking-tight">
          Schedule for <span className="text-[#23a440]">{roomName}</span>
        </h2>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-[#23a440]/10 text-[#23a440]">
          Weekly View
        </span>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-100 z-20 border-r border-gray-200 shadow-sm w-32">
              Day
            </th>
            {TIME_SLOTS.map((slot, index) => (
              <th key={index} scope="col" className={`px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider min-w-[160px] ${TIME_SLOT_OPACITY[index]}`}>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-[10px] mb-1">Slot {index + 1}</span>
                  <span>{slot.start}</span>
                  <span className="text-gray-400 font-normal">to</span>
                  <span>{slot.end}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {DAYS.map((day, dayIndex) => {
            const rowKeys = KEY_MAPPING[dayIndex];
            const dayColor = DAY_COLORS[dayIndex];

            return (
              <tr key={day} className="hover:bg-gray-50 transition-colors duration-150">
                <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold sticky left-0 ${dayColor.header} z-20 border-r border-gray-200`}>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${dayColor.label}`}>
                    {day}
                  </span>
                </td>
                {rowKeys.map((key, slotIndex) => {
                  const content = data[key];
                  const isEmpty = !content || content.trim() === '';
                  const isRoomLabel = content === roomName;

                  return (
                    <td
                      key={key}
                      className={`px-4 py-4 text-center border-l border-gray-100 align-top ${TIME_SLOT_OPACITY[slotIndex]} ${isEmpty ? 'bg-gray-50/50' : ''}`}
                    >
                      {!isEmpty && !isRoomLabel ? (
                        <div
                          className={`p-3 rounded-lg border-l-4 shadow-sm h-full flex items-center justify-center transition-transform hover:scale-[1.02] duration-200 ${dayColor.bg} ${dayColor.border}`}
                        >
                          <span className={`font-medium text-xs sm:text-sm break-words w-full ${dayColor.text}`}>
                            {content}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs italic">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimetableGrid;