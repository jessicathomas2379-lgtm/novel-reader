import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PageErrorBoundary } from './index';

// A component that throws an error for testing
function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Normal content</div>;
}

describe('PageErrorBoundary', () => {
  beforeEach(() => {
    // Suppress React error boundary console errors in test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error occurs', () => {
    render(
      <PageErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </PageErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeInTheDocument();
  });

  it('renders error UI when a child component throws', () => {
    render(
      <PageErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </PageErrorBoundary>
    );

    expect(screen.getByText('页面出现错误')).toBeInTheDocument();
    expect(screen.getByText('返回首页')).toBeInTheDocument();
  });

  it('navigates to home when "返回首页" button is clicked', () => {
    // Mock window.location.href
    const locationMock = { href: '/some-page' };
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    });

    render(
      <PageErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </PageErrorBoundary>
    );

    fireEvent.click(screen.getByText('返回首页'));
    expect(window.location.href).toBe('/');
  });

  it('does not show error UI for normal rendering', () => {
    render(
      <PageErrorBoundary>
        <div>Child A</div>
        <div>Child B</div>
      </PageErrorBoundary>
    );

    expect(screen.queryByText('页面出现错误')).not.toBeInTheDocument();
    expect(screen.getByText('Child A')).toBeInTheDocument();
    expect(screen.getByText('Child B')).toBeInTheDocument();
  });
});
