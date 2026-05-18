import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useReadingHistory } from '../../hooks/useReadingHistory';
import { useToast } from '../../hooks/useToast';
import { StatusBar } from '../../components/StatusBar';
import Toggle from '../../components/Toggle';
import ConfirmDialog from '../../components/ConfirmDialog';
import { IconTabbarHome, IconTabbarProfile } from '../../components/Icons';
import { safeGetItem, safeSetItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';
import topBg from '../../assets/images/pic-top-bg.png';
import avatar from '../../assets/images/pic-avatar.png';
import emptyReading from '../../assets/images/pic-empty-reading.svg';
import styles from './ProfilePage.module.css';

function getInitialNotification(): boolean {
  const stored = safeGetItem(STORAGE_KEYS.NOTIFICATION);
  return stored === 'on';
}

function getInitialAdRecommendation(): boolean {
  const stored = safeGetItem('ad_recommendation');
  return stored === 'on';
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { records } = useReadingHistory();
  const { showToast } = useToast();

  const [notificationEnabled, setNotificationEnabled] = useState<boolean>(getInitialNotification);
  const [adRecommendationEnabled, setAdRecommendationEnabled] = useState<boolean>(getInitialAdRecommendation);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleDarkModeToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleAdRecommendationToggle = useCallback(
    (checked: boolean) => {
      setAdRecommendationEnabled(checked);
      safeSetItem('ad_recommendation', checked ? 'on' : 'off');
    },
    []
  );

  const handleNotificationToggle = useCallback(
    (checked: boolean) => {
      if (checked) {
        setShowConfirmDialog(true);
      } else {
        setNotificationEnabled(false);
        safeSetItem(STORAGE_KEYS.NOTIFICATION, 'off');
      }
    },
    []
  );

  const handleConfirmNotification = useCallback(() => {
    setNotificationEnabled(true);
    safeSetItem(STORAGE_KEYS.NOTIFICATION, 'on');
    setShowConfirmDialog(false);
    showToast('通知提醒已开启');
  }, [showToast]);

  const handleCancelNotification = useCallback(() => {
    setShowConfirmDialog(false);
  }, []);

  const handleBookClick = useCallback(
    (id: string) => {
      navigate(`/reader/${id}`);
    },
    [navigate]
  );

  // Get records sorted by time descending, max 20
  const recentRecords = records.slice(0, 20);

  const formatProgress = (record: { novelId: string }) => {
    // Simple progress display
    void record;
    return '已读30%';
  };

  return (
    <div className={styles.page}>
      {/* 状态栏 */}
      <StatusBar />

      {/* 顶部背景 */}
      <div className={styles.headerBg}>
        <img src={topBg} alt="" className={styles.bgImage} aria-hidden="true" />
      </div>

      {/* 用户信息 */}
      <div className={styles.userSection}>
        <img src={avatar} alt="用户头像" className={styles.avatar} />
        <h2 className={styles.username}>读者小明</h2>
      </div>

      {/* 最近阅读模块 */}
      <section className={styles.recentSection}>
        <h3 className={styles.sectionTitle}>最近阅读</h3>
        {recentRecords.length === 0 ? (
          <div className={styles.emptyState}>
            <img src={emptyReading} alt="" className={styles.emptyIcon} aria-hidden="true" />
            <p className={styles.emptyText}>暂无内容</p>
            <button
              className={styles.goReadButton}
              onClick={handleHomeClick}
              type="button"
            >
              去看书
            </button>
          </div>
        ) : (
          <div className={styles.recentList}>
            {recentRecords.map((record) => (
              <div
                key={record.novelId}
                className={styles.recentItem}
                onClick={() => handleBookClick(record.novelId)}
                role="button"
                tabIndex={0}
                aria-label={record.title}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBookClick(record.novelId);
                  }
                }}
              >
                <img
                  src={record.coverUrl}
                  alt={`${record.title} 封面`}
                  className={styles.recentCover}
                />
                <span className={styles.recentBookTitle}>{record.title}</span>
                <span className={styles.recentProgress}>{formatProgress(record)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 其他功能 */}
      <section className={styles.settingsSection}>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>个性化广告推荐</span>
          <Toggle checked={adRecommendationEnabled} onChange={handleAdRecommendationToggle} />
        </div>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>通知提醒</span>
          <Toggle checked={notificationEnabled} onChange={handleNotificationToggle} />
        </div>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>夜间模式</span>
          <Toggle checked={isDarkMode} onChange={handleDarkModeToggle} />
        </div>
        <div className={styles.settingRow}>
          <span className={styles.settingLabel}>当前版本</span>
          <span className={styles.settingValue}>v1.0.0</span>
        </div>
      </section>

      {/* Tabbar */}
      <nav className={styles.tabbar} aria-label="主导航">
        <button className={styles.tabItem} type="button" onClick={handleHomeClick}>
          <IconTabbarHome width={24} height={24} className={styles.tabIconInactive} />
          <span className={styles.tabLabelInactive}>首页</span>
        </button>
        <button className={`${styles.tabItem} ${styles.tabActive}`} type="button" aria-current="page">
          <IconTabbarProfile width={24} height={24} className={styles.tabIcon} />
          <span className={styles.tabLabel}>我的</span>
        </button>
      </nav>

      {/* Confirm dialog for notification toggle */}
      <ConfirmDialog
        visible={showConfirmDialog}
        title="通知提醒"
        content="确定要开启通知提醒吗？开启后将接收最新章节更新通知。"
        onConfirm={handleConfirmNotification}
        onCancel={handleCancelNotification}
        onOverlayClick={handleCancelNotification}
      />
    </div>
  );
}

export default ProfilePage;
