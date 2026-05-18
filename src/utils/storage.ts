/**
 * localStorage 工具函数
 * 包含 try-catch 降级处理，在隐私模式或存储不可用时静默降级
 */

/**
 * 安全读取 localStorage
 * @param key 存储键名
 * @returns 存储的值，或在不可用时返回 null
 */
export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * 安全写入 localStorage
 * @param key 存储键名
 * @param value 要存储的值
 * @returns 写入是否成功
 */
export function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
