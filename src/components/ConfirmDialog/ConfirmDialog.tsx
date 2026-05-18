import styles from './ConfirmDialog.module.css';

/**
 * ConfirmDialog 组件 Props 接口
 */
export interface ConfirmDialogProps {
  /** 是否可见 */
  visible: boolean;
  /** 弹窗标题（可选） */
  title?: string;
  /** 弹窗内容 */
  content: string;
  /** 确认按钮文本，默认 "确认" */
  confirmText?: string;
  /** 取消按钮文本，默认 "取消" */
  cancelText?: string;
  /** 确认回调 */
  onConfirm: () => void;
  /** 取消回调 */
  onCancel: () => void;
  /** 点击蒙层回调（默认行为等同 onCancel） */
  onOverlayClick?: () => void;
}

/**
 * ConfirmDialog 确认弹窗组件
 *
 * 全屏蒙层 + 居中弹窗卡片，包含标题、内容和操作按钮。
 * 精确匹配 Figma 设计稿：
 * - 蒙层: rgba(0,0,0,0.6)
 * - 弹窗: width 291px, 白色, 圆角 16px
 * - 内容区: padding 24px, gap 12px
 * - 操作区: 顶部边框 #EEEEEE 0.5px, 两个按钮等分
 */
export function ConfirmDialog({
  visible,
  title,
  content,
  confirmText = '确认',
  cancelText = '取消',
  onConfirm,
  onCancel,
  onOverlayClick,
}: ConfirmDialogProps) {
  if (!visible) {
    return null;
  }

  const handleOverlayClick = () => {
    if (onOverlayClick) {
      onOverlayClick();
    } else {
      onCancel();
    }
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const titleId = title ? 'confirm-dialog-title' : undefined;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.dialog} onClick={handleDialogClick}>
        <div className={styles.contentArea}>
          {title && (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          )}
          <p className={styles.content}>{content}</p>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={`${styles.button} ${styles.confirmButton}`}
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
