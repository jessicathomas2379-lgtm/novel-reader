import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ToastProvider } from '../../contexts/ToastContext';
import { useToast } from '../../hooks/useToast';
import { useToastState } from '../../hooks/useToastState';

// 测试用消费者组件
function TestConsumer() {
  const { showToast } = useToast();
  const { message, visible } = useToastState();

  return (
    <div>
      <span data-testid="message">{message}</span>
      <span data-testid="visible">{String(visible)}</span>
      <button onClick={() => showToast('Hello')}>Show Toast</button>
      <button onClick={() => showToast('World')}>Show Another</button>
    </div>
  );
}

describe('ToastContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should have initial state with empty message and visible=false', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    expect(screen.getByTestId('message').textContent).toBe('');
    expect(screen.getByTestId('visible').textContent).toBe('false');
  });

  it('should show toast with message when showToast is called', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Toast').click();
    });

    expect(screen.getByTestId('message').textContent).toBe('Hello');
    expect(screen.getByTestId('visible').textContent).toBe('true');
  });

  it('should auto-hide toast after 3 seconds', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Toast').click();
    });

    expect(screen.getByTestId('visible').textContent).toBe('true');

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('visible').textContent).toBe('false');
  });

  it('should replace current toast when a new one is triggered', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Toast').click();
    });

    expect(screen.getByTestId('message').textContent).toBe('Hello');

    act(() => {
      screen.getByText('Show Another').click();
    });

    expect(screen.getByTestId('message').textContent).toBe('World');
    expect(screen.getByTestId('visible').textContent).toBe('true');
  });

  it('should reset timer when a new toast replaces the current one', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Toast').click();
    });

    // Advance 2 seconds (not enough to hide)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId('visible').textContent).toBe('true');

    // Trigger a new toast - this should reset the timer
    act(() => {
      screen.getByText('Show Another').click();
    });

    // Advance another 2 seconds (4 seconds total from first toast, but only 2 from second)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // Should still be visible because the timer was reset
    expect(screen.getByTestId('visible').textContent).toBe('true');
    expect(screen.getByTestId('message').textContent).toBe('World');

    // Advance 1 more second (3 seconds from second toast)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Now it should be hidden
    expect(screen.getByTestId('visible').textContent).toBe('false');
  });

  it('should throw error when useToast is used outside ToastProvider', () => {
    function BadConsumer() {
      useToast();
      return null;
    }

    // Suppress console.error for expected error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<BadConsumer />);
    }).toThrow('useToast must be used within a ToastProvider');

    consoleSpy.mockRestore();
  });

  it('should throw error when useToastState is used outside ToastProvider', () => {
    function BadConsumer() {
      useToastState();
      return null;
    }

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<BadConsumer />);
    }).toThrow('useToastState must be used within a ToastProvider');

    consoleSpy.mockRestore();
  });
});
