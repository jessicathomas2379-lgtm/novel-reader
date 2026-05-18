import React from 'react';
import styles from './PageErrorBoundary.module.css';

interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

interface PageErrorBoundaryState {
  hasError: boolean;
}

class PageErrorBoundary extends React.Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): PageErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('PageErrorBoundary caught an error:', error, errorInfo);
  }

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>页面出现错误</p>
          <button className={styles.homeButton} onClick={this.handleGoHome}>
            返回首页
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
