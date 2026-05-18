import { useContext } from 'react';
import { ToastContext, type ToastState } from '../contexts/ToastContext';

/**
 * 自定义 hook：获取 Toast 的当前状态（message, visible）
 * 供 Toast 组件使用以渲染 Toast UI
 * 必须在 ToastProvider 内部使用
 */
export function useToastState(): ToastState {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToastState must be used within a ToastProvider');
  }
  return context.toastState;
}
