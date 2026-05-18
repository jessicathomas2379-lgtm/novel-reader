import { useContext } from 'react';
import { ReadingHistoryContext } from '../contexts/ReadingHistoryContext';
import type { ReadingHistoryContextValue } from '../contexts/ReadingHistoryContext';

export function useReadingHistory(): ReadingHistoryContextValue {
  const context = useContext(ReadingHistoryContext);
  if (context === undefined) {
    throw new Error('useReadingHistory must be used within a ReadingHistoryProvider');
  }
  return context;
}
