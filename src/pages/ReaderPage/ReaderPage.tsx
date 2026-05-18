import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { novels } from '../../data/novels';
import { useTheme } from '../../hooks/useTheme';
import { useReadingHistory } from '../../hooks/useReadingHistory';
import { ReaderSettingsPanel } from '../../components/ReaderSettingsPanel/ReaderSettingsPanel';
import { StatusBar } from '../../components/StatusBar';
import { IconArrowLeft } from '../../components/Icons';
import styles from './ReaderPage.module.css';

/**
 * ReaderPage 阅读器页面
 *
 * 展示小说全部章节内容，支持上下滚动阅读。
 * 点击屏幕中间 1/3 区域弹出设置面板，上下 1/3 区域不触发。
 * 进入页面时记录阅读历史。
 */
export function ReaderPage() {
  const { novelId } = useParams<{ novelId: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addRecord } = useReadingHistory();

  const [showSettings, setShowSettings] = useState(false);

  // Find the novel by id
  const novel = novels.find((n) => n.id === novelId);

  // Record reading history on mount
  useEffect(() => {
    if (novel) {
      addRecord({
        novelId: novel.id,
        title: novel.title,
        author: novel.author,
        coverUrl: novel.coverUrl,
      });
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Click zone logic:
   * - Middle 1/3 (vertically): show settings panel
   * - Top 1/3 and bottom 1/3: do nothing (allow normal scroll)
   */
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const height = rect.height;
    const relativeY = clickY / height;

    // Middle 1/3 zone: show settings panel
    if (relativeY >= 1 / 3 && relativeY <= 2 / 3) {
      setShowSettings(true);
    }
  }, []);

  const handleCloseSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  const handleBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleToggleDarkMode = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Error state: novel not found
  if (!novel) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>小说内容加载失败</p>
          <button
            className={styles.retryButton}
            onClick={() => navigate('/')}
            type="button"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 顶部固定导航 */}
      <div className={styles.fixedTop}>
        <StatusBar />
        <div className={styles.topNav}>
          <IconArrowLeft
            width={18}
            height={18}
            className={styles.backIcon}
            onClick={handleBack}
            role="button"
            tabIndex={0}
            aria-label="返回"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleBack();
              }
            }}
          />
          <span className={styles.navTitle}>{novel.title}</span>
          <div className={styles.navRight} />
        </div>
      </div>

      {/* 中间滚动阅读区 */}
      <div
        className={styles.content}
        onClick={handleContentClick}
        role="article"
        aria-label={`阅读：${novel.title}`}
      >
        {novel.chapters.map((chapter) => (
          <section key={chapter.id} className={styles.chapterSection}>
            <h2 className={styles.chapterTitle}>{chapter.title}</h2>
            <p className={styles.chapterContent}>{chapter.content}</p>
          </section>
        ))}
      </div>

      {/* 底部固定进度 */}
      <div className={styles.fixedBottom}>
        <span className={styles.progressText}>1%</span>
        <span className={styles.adText}>用心创作，阅读美好</span>
      </div>

      {/* Settings panel overlay */}
      <ReaderSettingsPanel
        visible={showSettings}
        isDarkMode={isDarkMode}
        onBack={handleBack}
        onToggleDarkMode={handleToggleDarkMode}
        onClose={handleCloseSettings}
      />
    </div>
  );
}

export default ReaderPage;
