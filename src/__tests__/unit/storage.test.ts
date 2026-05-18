import { describe, it, expect, beforeEach, vi } from 'vitest';
import { safeGetItem, safeSetItem } from '../../utils/storage';

describe('storage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('safeGetItem', () => {
    it('returns stored value for existing key', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(safeGetItem('test-key')).toBe('test-value');
    });

    it('returns null for non-existing key', () => {
      expect(safeGetItem('non-existing')).toBeNull();
    });

    it('returns null when localStorage throws', () => {
      const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage unavailable');
      });
      expect(safeGetItem('any-key')).toBeNull();
      spy.mockRestore();
    });
  });

  describe('safeSetItem', () => {
    it('stores value and returns true on success', () => {
      const result = safeSetItem('test-key', 'test-value');
      expect(result).toBe(true);
      expect(localStorage.getItem('test-key')).toBe('test-value');
    });

    it('returns false when localStorage throws', () => {
      const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });
      const result = safeSetItem('test-key', 'test-value');
      expect(result).toBe(false);
      spy.mockRestore();
    });
  });
});
