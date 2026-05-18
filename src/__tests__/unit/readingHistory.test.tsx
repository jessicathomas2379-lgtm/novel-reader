import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ReadingHistoryProvider } from '../../contexts/ReadingHistoryContext';
import { useReadingHistory } from '../../hooks/useReadingHistory';
import type { ReactNode } from 'react';

function wrapper({ children }: { children: ReactNode }) {
  return <ReadingHistoryProvider>{children}</ReadingHistoryProvider>;
}

describe('ReadingHistoryContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should start with empty records when no localStorage data', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });
    expect(result.current.records).toEqual([]);
  });

  it('should add a reading record', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Test Novel',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    expect(result.current.records).toHaveLength(1);
    expect(result.current.records[0].novelId).toBe('novel-1');
    expect(result.current.records[0].title).toBe('Test Novel');
    expect(result.current.records[0].lastReadAt).toBeGreaterThan(0);
  });

  it('should update lastReadAt when adding existing novelId', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Test Novel',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    const firstReadAt = result.current.records[0].lastReadAt;

    // Wait a bit to ensure different timestamp
    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Test Novel',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    expect(result.current.records).toHaveLength(1);
    expect(result.current.records[0].lastReadAt).toBeGreaterThanOrEqual(firstReadAt);
  });

  it('should sort records by lastReadAt descending', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Novel 1',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-2',
        title: 'Novel 2',
        author: 'Author B',
        coverUrl: '/cover2.png',
      });
    });

    // Most recent should be first
    expect(result.current.records[0].novelId).toBe('novel-2');
    expect(result.current.records[1].novelId).toBe('novel-1');
  });

  it('should truncate records to max 20', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    // Add 25 records
    for (let i = 0; i < 25; i++) {
      act(() => {
        result.current.addRecord({
          novelId: `novel-${i}`,
          title: `Novel ${i}`,
          author: `Author ${i}`,
          coverUrl: `/cover${i}.png`,
        });
      });
    }

    expect(result.current.records).toHaveLength(20);
    // Most recent (novel-24) should be first
    expect(result.current.records[0].novelId).toBe('novel-24');
  });

  it('should clear all records', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Test Novel',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    expect(result.current.records).toHaveLength(1);

    act(() => {
      result.current.clearRecords();
    });

    expect(result.current.records).toEqual([]);
  });

  it('should persist records to localStorage', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Test Novel',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    const stored = localStorage.getItem('novel-reader-history');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].novelId).toBe('novel-1');
  });

  it('should load records from localStorage on init', () => {
    const existingRecords = [
      {
        novelId: 'novel-1',
        title: 'Stored Novel',
        author: 'Author A',
        coverUrl: '/cover1.png',
        lastReadAt: 1000000,
      },
    ];
    localStorage.setItem('novel-reader-history', JSON.stringify(existingRecords));

    const { result } = renderHook(() => useReadingHistory(), { wrapper });
    expect(result.current.records).toHaveLength(1);
    expect(result.current.records[0].novelId).toBe('novel-1');
    expect(result.current.records[0].title).toBe('Stored Novel');
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useReadingHistory());
    }).toThrow('useReadingHistory must be used within a ReadingHistoryProvider');
  });

  it('should not have duplicate novelIds', () => {
    const { result } = renderHook(() => useReadingHistory(), { wrapper });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Novel 1',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    act(() => {
      result.current.addRecord({
        novelId: 'novel-1',
        title: 'Novel 1 Updated',
        author: 'Author A',
        coverUrl: '/cover1.png',
      });
    });

    const novelIds = result.current.records.map((r) => r.novelId);
    const uniqueIds = new Set(novelIds);
    expect(uniqueIds.size).toBe(novelIds.length);
  });
});
