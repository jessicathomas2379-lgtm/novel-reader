import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { useTheme } from '../../hooks/useTheme';
import { STORAGE_KEYS } from '../../utils/constants';

function wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light mode when no stored preference', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('initializes from localStorage dark preference', () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDarkMode).toBe(true);
  });

  it('initializes from localStorage light preference', () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('toggleTheme switches from light to dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.isDarkMode).toBe(true);
  });

  it('toggleTheme switches from dark to light', () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('setTheme sets dark mode directly', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setTheme(true);
    });
    expect(result.current.isDarkMode).toBe(true);
  });

  it('setTheme sets light mode directly', () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setTheme(false);
    });
    expect(result.current.isDarkMode).toBe(false);
  });

  it('syncs data-theme attribute on toggle', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });

  it('syncs localStorage on theme change', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => {
      result.current.setTheme(true);
    });
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe('dark');
    act(() => {
      result.current.setTheme(false);
    });
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe('light');
  });

  it('throws error when useTheme is used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow('useTheme must be used within a ThemeProvider');
  });
});
