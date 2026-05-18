import { useContext } from 'react';
import { ToastContext, type ToastContextValue } from '../contexts/ToastContext';

/**
 * 自定义 hook：获取 Toast Context 的 showToast 方法
 * 必须在 ToastProvider 内部使用
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return { showToast: context.showToast };
}
