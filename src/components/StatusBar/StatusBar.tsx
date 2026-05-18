import { useState, useEffect } from 'react';
import styles from './StatusBar.module.css';

/**
 * 模拟手机状态栏组件
 * 左侧显示当前时间（HH:MM），右侧显示信号+WiFi+电量图标
 */
export function StatusBar() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.statusBar} aria-hidden="true">
      <span className={styles.time}>{time}</span>
      <div className={styles.icons}>
        {/* 信号图标 */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="9" width="3" height="3" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" fill="currentColor" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
        </svg>
        {/* WiFi图标 */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" fill="currentColor" />
          <path d="M5.17 8.17a4 4 0 0 1 5.66 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2.93 5.93a7.07 7.07 0 0 1 10.14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M0.7 3.7a10.14 10.14 0 0 1 14.6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* 电量图标 */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.35" />
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
          <path d="M23 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export default StatusBar;
