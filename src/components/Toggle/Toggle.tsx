import { useCallback } from 'react';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  variant?: 'default' | 'primary';
}

export function Toggle({
  checked,
  onChange,
  disabled = false,
  variant = 'default',
}: ToggleProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onChange(!checked);
    }
  }, [checked, disabled, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onChange(!checked);
      }
    },
    [checked, disabled, onChange]
  );

  const classNames = [
    styles.toggle,
    checked ? styles.checked : '',
    disabled ? styles.disabled : '',
    styles[variant],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.knob} />
    </div>
  );
}

export default Toggle;
