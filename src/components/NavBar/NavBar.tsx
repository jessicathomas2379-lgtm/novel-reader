import styles from './NavBar.module.css';

export interface NavBarProps {
  title?: string;
  leftIcon?: 'back' | 'none';
  rightIcon?: 'profile' | 'home' | 'none';
  onLeftClick?: () => void;
  onRightClick?: () => void;
  variant?: 'light' | 'dark';
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

export function NavBar({
  title,
  leftIcon = 'none',
  rightIcon = 'none',
  onLeftClick,
  onRightClick,
  variant: _variant,
}: NavBarProps) {
  // variant prop is accepted for API compatibility but theming
  // is handled automatically via CSS custom properties
  void _variant;

  const renderLeftIcon = () => {
    switch (leftIcon) {
      case 'back':
        return (
          <button
            className={styles.iconButton}
            onClick={onLeftClick}
            aria-label="返回"
            role="button"
          >
            <BackIcon />
          </button>
        );
      case 'none':
      default:
        return null;
    }
  };

  const renderRightIcon = () => {
    switch (rightIcon) {
      case 'profile':
        return (
          <button
            className={styles.iconButton}
            onClick={onRightClick}
            aria-label="个人中心"
            role="button"
          >
            <ProfileIcon />
          </button>
        );
      case 'home':
        return (
          <button
            className={styles.iconButton}
            onClick={onRightClick}
            aria-label="首页"
            role="button"
          >
            <HomeIcon />
          </button>
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>{renderLeftIcon()}</div>
      <div className={styles.center}>
        {title && <h1 className={styles.title}>{title}</h1>}
      </div>
      <div className={styles.right}>{renderRightIcon()}</div>
    </nav>
  );
}

export default NavBar;
