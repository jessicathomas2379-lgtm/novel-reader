import { createContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { safeGetItem, safeSetItem } from '../utils/storage';

/**
 * 主题 Context 值接口
 */
export interface ThemeContextValue {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

// Reducer action types
type ThemeAction =
  | { type: 'TOGGLE' }
  | { type: 'SET'; payload: boolean };

// Reducer state
interface ThemeState {
  isDarkMode: boolean;
}

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE':
      return { isDarkMode: !state.isDarkMode };
    case 'SET':
      return { isDarkMode: action.payload };
    default:
      return state;
  }
}

/**
 * 从 localStorage 读取初始主题偏好
 * 默认为亮色模式
 */
function getInitialTheme(): ThemeState {
  const stored = safeGetItem(STORAGE_KEYS.THEME);
  return { isDarkMode: stored === 'dark' };
}

/**
 * 同步主题到 DOM 和 localStorage
 */
function applyTheme(isDarkMode: boolean): void {
  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  safeSetItem(STORAGE_KEYS.THEME, isDarkMode ? 'dark' : 'light');
}

// 创建 Context，默认值为 undefined（通过 useTheme hook 检查）
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 主题 Provider 组件
 * 管理亮色/暗色模式状态，同步 localStorage 和 DOM
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, undefined, getInitialTheme);

  // 主题变化时同步 DOM 和 localStorage
  useEffect(() => {
    applyTheme(state.isDarkMode);
  }, [state.isDarkMode]);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE' });
  }, []);

  const setTheme = useCallback((dark: boolean) => {
    dispatch({ type: 'SET', payload: dark });
  }, []);

  const value: ThemeContextValue = {
    isDarkMode: state.isDarkMode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
