/**
 * 小说阅读 PWA 应用 - 类型定义
 */

/** 章节 */
export interface Chapter {
  id: string;
  title: string;
  content: string;
}

/** 小说 */
export interface Novel {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  tag?: string;
  readers?: number;
  rating?: number;
  description?: string;
  chapters: Chapter[];
}

/** 阅读记录 */
export interface ReadingRecord {
  novelId: string;
  title: string;
  author: string;
  coverUrl: string;
  lastReadAt: number; // Unix 时间戳（毫秒）
}
