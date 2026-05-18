import { useContext } from 'react';
import { ThemeContext, type ThemeContextValue } from '../contexts/ThemeContext';

/**
 * 自定义 hook：获取主题 Context
 * 必须在 ThemeProvider 内部使用
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
