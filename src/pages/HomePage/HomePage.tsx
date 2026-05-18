import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { novels } from '../../data/novels';
import { IconHot, IconSearch, IconRefresh, IconTabbarHome, IconTabbarProfile } from '../../components/Icons';
import styles from './HomePage.module.css';
import topBg from '../../assets/images/pic-top-bg.png';

export function HomePage() {
  const navigate = useNavigate();

  const handleBookClick = useCallback(
    (novelId: string) => {
      navigate(`/reader/${novelId}`);
    },
    [navigate]
  );

  const handleProfileClick = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  // Featured novels (first 6)
  const [featuredNovels, setFeaturedNovels] = useState(() => novels.slice(0, 6));
  // Feed novels (remaining after first 6)
  const feedNovels = novels.slice(6);

  const handleRefreshFeatured = useCallback(() => {
    setFeaturedNovels((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }, []);

  const formatReaders = (count?: number) => {
    if (!count) return '';
    if (count >= 10000) {
      return `${(count / 10000).toFixed(1)}万人在读`;
    }
    return `${count}人在读`;
  };

  return (
    <div className={styles.page}>
      {/* 顶部固定区域 */}
      <div className={styles.fixedTop}>
        <div className={styles.header}>
          <img src={topBg} alt="" className={styles.headerBg} aria-hidden="true" />
          <div className={styles.searchBar}>
            <div className={styles.searchLeft}>
              <IconHot width={16} height={16} className={styles.hotIconSearch} aria-hidden />
              <span className={styles.searchPlaceholder}>他说爱情已迟暮</span>
            </div>
            <IconSearch width={20} height={20} className={styles.searchIcon} aria-hidden />
          </div>
        </div>
      </div>

      {/* 中间滚动内容区 */}
      <main className={styles.content}>
        {/* 精选专区 */}
        <section className={styles.featuredSection}>
          <div className={styles.featuredHeader}>
            <div className={styles.featuredTitleGroup}>
              <h2 className={styles.featuredTitle}>精选专区</h2>
              <p className={styles.featuredSubtitle}>百万编辑力荐</p>
            </div>
            <button
              className={styles.refreshBtn}
              onClick={handleRefreshFeatured}
              type="button"
              aria-label="换一换"
            >
              <span className={styles.refreshText}>换一换</span>
              <IconRefresh width={12} height={12} className={styles.refreshIcon} />
            </button>
          </div>
          <div className={styles.featuredGrid}>
            {featuredNovels.map((novel) => (
              <div
                key={novel.id}
                className={styles.featuredItem}
                onClick={() => handleBookClick(novel.id)}
                role="button"
                tabIndex={0}
                aria-label={`${novel.title} - ${novel.author}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBookClick(novel.id);
                  }
                }}
              >
                <img
                  src={novel.coverUrl}
                  alt={`${novel.title} 封面`}
                  className={styles.featuredCover}
                />
                <div className={styles.featuredInfo}>
                  <h3 className={styles.featuredBookTitle}>{novel.title}</h3>
                  {novel.tag && <span className={styles.featuredTag}>{novel.tag}</span>}
                  <span className={styles.featuredReaders}>{formatReaders(novel.readers)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 推荐feed流 */}
        <section className={styles.feedSection}>
          <div className={styles.feedGrid}>
            {feedNovels.map((novel) => (
              <div
                key={novel.id}
                className={styles.feedCard}
                onClick={() => handleBookClick(novel.id)}
                role="button"
                tabIndex={0}
                aria-label={`${novel.title} - ${novel.author}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBookClick(novel.id);
                  }
                }}
              >
                <div className={styles.feedCoverWrapper}>
                  <img
                    src={novel.coverUrl}
                    alt={`${novel.title} 封面`}
                    className={styles.feedCover}
                  />
                  {novel.rating && (
                    <div className={styles.feedRating}>
                      <span className={styles.ratingScore}>{novel.rating}</span>
                      <span className={styles.ratingLabel}>分</span>
                    </div>
                  )}
                </div>
                <div className={styles.feedInfo}>
                  <h3 className={styles.feedBookTitle}>{novel.title}</h3>
                  {novel.description && (
                    <p className={styles.feedDescription}>{novel.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Tabbar */}
      <nav className={styles.tabbar} aria-label="主导航">
        <button className={`${styles.tabItem} ${styles.tabActive}`} type="button" aria-current="page">
          <IconTabbarHome width={24} height={24} className={styles.tabIcon} />
          <span className={styles.tabLabel}>首页</span>
        </button>
        <button className={styles.tabItem} type="button" onClick={handleProfileClick}>
          <IconTabbarProfile width={24} height={24} className={styles.tabIconInactive} />
          <span className={styles.tabLabelInactive}>我的</span>
        </button>
      </nav>
    </div>
  );
}

export default HomePage;
