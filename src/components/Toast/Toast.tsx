import { useToastState } from '../../hooks/useToastState';
import styles from './Toast.module.css';

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M19.8107 7.18934C20.3964 7.77512 20.3964 8.72487 19.8107 9.31066L13.1517 15.9697C11.6872 17.4341 9.31282 17.4341 7.84835 15.9697L4.18934 12.3107C3.60355 11.7249 3.60355 10.7751 4.18934 10.1893C4.77513 9.60355 5.72487 9.60355 6.31066 10.1893L9.96967 13.8483C10.2626 14.1412 10.7374 14.1412 11.0303 13.8483L17.6893 7.18934C18.2751 6.60355 19.2249 6.60355 19.8107 7.18934Z" fill="currentColor"/>
    </svg>
  );
}

/**
 * Toast 组件 Props 接口
 */
export interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number; // 默认 3000ms（由 ToastContext 控制）
}

/**
 * 纯展示 Toast 组件
 * 精确匹配 Figma 设计稿：
 * - 背景: #666666, 圆角 999px, padding 12px 16px
 * - 图标(勾): 16x16 白色 + 文字 14px/22px 白色, gap 4px
 * - 居中显示
 */
export function Toast({ message, visible }: ToastProps) {
  if (!message) return null;

  const className = [styles.toast, visible ? styles.visible : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} role="alert" aria-live="polite">
      <IconCheck />
      {message}
    </div>
  );
}

/**
 * 连接 ToastContext 的 Toast 组件
 * 自动从 ToastContext 读取状态，无需手动传入 props
 */
export function ConnectedToast() {
  const { message, visible } = useToastState();

  return <Toast message={message} visible={visible} />;
}

export default ConnectedToast;
