import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { ReadingRecord } from '../types';
import { STORAGE_KEYS } from '../utils/constants';
import { safeGetItem, safeSetItem } from '../utils/storage';

const MAX_RECORDS = 20;

export interface ReadingHistoryContextValue {
  records: ReadingRecord[];
  addRecord: (record: Omit<ReadingRecord, 'lastReadAt'>) => void;
  clearRecords: () => void;
}

type Action =
  | { type: 'ADD_RECORD'; payload: Omit<ReadingRecord, 'lastReadAt'> }
  | { type: 'CLEAR_RECORDS' };

function readingHistoryReducer(state: ReadingRecord[], action: Action): ReadingRecord[] {
  switch (action.type) {
    case 'ADD_RECORD': {
      const { novelId, title, author, coverUrl } = action.payload;
      const now = Date.now();

      // Remove existing record with same novelId if present
      const filtered = state.filter((r) => r.novelId !== novelId);

      // Add new/updated record at the beginning
      const updated: ReadingRecord[] = [
        { novelId, title, author, coverUrl, lastReadAt: now },
        ...filtered,
      ];

      // Sort by lastReadAt descending (new record is already first, but ensure correctness)
      updated.sort((a, b) => b.lastReadAt - a.lastReadAt);

      // Truncate to max 20 records
      return updated.slice(0, MAX_RECORDS);
    }
    case 'CLEAR_RECORDS':
      return [];
    default:
      return state;
  }
}

function loadInitialRecords(): ReadingRecord[] {
  const stored = safeGetItem(STORAGE_KEYS.READING_HISTORY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Invalid JSON, return empty
    }
  }
  return [];
}

export const ReadingHistoryContext = createContext<ReadingHistoryContextValue | undefined>(
  undefined
);

export function ReadingHistoryProvider({ children }: { children: ReactNode }) {
  const [records, dispatch] = useReducer(readingHistoryReducer, undefined, loadInitialRecords);

  // Sync to localStorage on every state change
  useEffect(() => {
    safeSetItem(STORAGE_KEYS.READING_HISTORY, JSON.stringify(records));
  }, [records]);

  const addRecord = (record: Omit<ReadingRecord, 'lastReadAt'>) => {
    dispatch({ type: 'ADD_RECORD', payload: record });
  };

  const clearRecords = () => {
    dispatch({ type: 'CLEAR_RECORDS' });
  };

  return (
    <ReadingHistoryContext.Provider value={{ records, addRecord, clearRecords }}>
      {children}
    </ReadingHistoryContext.Provider>
  );
}
