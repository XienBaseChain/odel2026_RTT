import { RawTimetableEntry, TimeSlot } from './types';
import timetableData from './data/timetable.json';

export const TIME_SLOTS: TimeSlot[] = [
  { label: '08:00 - 10:00', start: '08:00', end: '10:00' },
  { label: '10:00 - 12:00', start: '10:00', end: '12:00' },
  { label: '12:00 - 14:00', start: '12:00', end: '14:00' },
  { label: '14:00 - 16:00', start: '14:00', end: '16:00' },
  { label: '16:00 - 18:00', start: '16:00', end: '18:00' },
];

export const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

// Mapping raw JSON keys to (DayIndex, SlotIndex)
// Based on analysis: The JSON flattens the week.
// Row 0 of this matrix = Monday's keys for slots 1-5
export const KEY_MAPPING = [
  ['MONDAY', 'Column3', 'Column4', 'Column5', 'TUESDAY'],      // Monday Keys
  ['Column8', 'Column9', 'Column10', 'Column11', 'Column12'],  // Tuesday Keys
  ['Column14', 'Column15', 'Column16', 'Column17', 'Column18'],// Wednesday Keys
  ['Column20', 'Column21', 'Column22', 'Column23', 'Column24'],// Thursday Keys
  ['Column26', 'Column27', 'Column28', 'Column29', 'Column30'],// Friday Keys
  ['Column32', 'Column33', 'Column34', 'Column35', 'Column36'],// Saturday Keys
  ['Column38', 'Column39', 'Column40', 'Column41', 'Column42'],// Sunday Keys
];

// Load timetable data from external JSON file for easier updates
export const RAW_DATA: RawTimetableEntry[] = timetableData as RawTimetableEntry[];