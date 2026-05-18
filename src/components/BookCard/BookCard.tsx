import { useState, useCallback } from 'react';
import styles from './BookCard.module.css';

export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  variant?: 'grid' | 'list';
  onClick?: (id: string) => void;
}

const VALID_VARIANTS = ['grid', 'list'] as const;
const DEFAULT_VARIANT = 'grid';

function resolveVariant(variant: string | undefined): 'grid' | 'list' {
  if (variant && (VALID_VARIANTS as readonly string[]).includes(variant)) {
    return variant as 'grid' | 'list';
  }
  return DEFAULT_VARIANT;
}

export function BookCard({ id, title, author, coverUrl, variant, onClick }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const resolvedVariant = resolveVariant(variant);

  const handleClick = useCallback(() => {
    onClick?.(id);
  }, [onClick, id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.(id);
      }
    },
    [onClick, id]
  );

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const cardClassName = `${styles.card} ${styles[resolvedVariant]}`;

  return (
    <div
      className={cardClassName}
      role="button"
      tabIndex={0}
      aria-label={`${title} - ${author}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.coverWrapper}>
        {imageError ? (
          <div className={styles.placeholder} aria-hidden="true">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="4" fill="var(--color-bg-secondary)" />
              <path
                d="M14 34V14h20v20H14zm2-2h16V16H16v16zm3-3l4-5 3 4 5-7v8H19z"
                fill="var(--color-text-secondary)"
                opacity="0.5"
              />
            </svg>
          </div>
        ) : (
          <img
            className={styles.cover}
            src={coverUrl}
            alt={`${title} 封面`}
            onError={handleImageError}
          />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
      </div>
    </div>
  );
}

export default BookCard;
