import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toast } from '../../components/Toast/Toast';
import { ConnectedToast } from '../../components/Toast/Toast';
import { ToastProvider } from '../../contexts/ToastContext';

describe('Toast Component', () => {
  it('should render message when visible', () => {
    render(<Toast message="操作成功" visible={true} />);
    expect(screen.getByRole('alert')).toHaveTextContent('操作成功');
  });

  it('should have role="alert" for accessibility', () => {
    render(<Toast message="提示信息" visible={true} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should apply visible class when visible is true', () => {
    const { container } = render(<Toast message="Hello" visible={true} />);
    const toast = container.querySelector('[role="alert"]');
    expect(toast?.className).toContain('visible');
  });

  it('should not apply visible class when visible is false', () => {
    const { container } = render(<Toast message="Hello" visible={false} />);
    const toast = container.querySelector('[role="alert"]');
    expect(toast?.className).not.toContain('visible');
  });

  it('should return null when message is empty', () => {
    const { container } = render(<Toast message="" visible={true} />);
    expect(container.innerHTML).toBe('');
  });

  it('should render ConnectedToast within ToastProvider', () => {
    render(
      <ToastProvider>
        <ConnectedToast />
      </ToastProvider>
    );
    // Initially no toast visible (empty message returns null)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
