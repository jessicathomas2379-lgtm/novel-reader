import { createContext, useState, useCallback, useRef, type ReactNode } from 'react';

/**
 * Toast Context 值接口（对外暴露的 API）
 */
export interface ToastContextValue {
  showToast: (message: string) => void;
}

/**
 * Toast 内部状态接口（供 Toast 组件消费）
 */
export interface ToastState {
  message: string;
  visible: boolean;
}

/**
 * Toast 完整 Context 值（包含状态和操作）
 */
export interface ToastContextFullValue extends ToastContextValue {
  toastState: ToastState;
}

// 创建 Context，默认值为 undefined（通过 hook 检查）
export const ToastContext = createContext<ToastContextFullValue | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

/**
 * Toast Provider 组件
 * 管理 Toast 消息和可见状态
 * 新 Toast 触发时替换当前 Toast，3 秒后自动消失
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toastState, setToastState] = useState<ToastState>({
    message: '',
    visible: false,
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    // 清除已有的定时器
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // 设置新的 Toast 消息并显示
    setToastState({ message, visible: true });

    // 3 秒后自动隐藏
    timerRef.current = setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
      timerRef.current = null;
    }, 3000);
  }, []);

  const value: ToastContextFullValue = {
    showToast,
    toastState,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}
