import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReaderSettingsPanel } from './ReaderSettingsPanel';

describe('ReaderSettingsPanel', () => {
  const defaultProps = {
    visible: true,
    isDarkMode: false,
    onBack: vi.fn(),
    onToggleDarkMode: vi.fn(),
    onClose: vi.fn(),
  };

  it('renders nothing when visible is false', () => {
    const { container } = render(
      <ReaderSettingsPanel {...defaultProps} visible={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the panel when visible is true', () => {
    render(<ReaderSettingsPanel {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders back button with accessible label', () => {
    render(<ReaderSettingsPanel {...defaultProps} />);
    const backButton = screen.getByRole('button', { name: '返回' });
    expect(backButton).toBeInTheDocument();
  });

  it('renders night mode button with accessible label', () => {
    render(<ReaderSettingsPanel {...defaultProps} />);
    const nightButton = screen.getByRole('button', { name: '开启夜间模式' });
    expect(nightButton).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn();
    render(<ReaderSettingsPanel {...defaultProps} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: '返回' }));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleDarkMode when night mode button is clicked', () => {
    const onToggleDarkMode = vi.fn();
    render(
      <ReaderSettingsPanel {...defaultProps} onToggleDarkMode={onToggleDarkMode} />
    );
    fireEvent.click(screen.getByRole('button', { name: '开启夜间模式' }));
    expect(onToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(<ReaderSettingsPanel {...defaultProps} onClose={onClose} />);
    // Click the overlay (presentation role element)
    const overlay = screen.getByRole('presentation');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when panel content is clicked', () => {
    const onClose = vi.fn();
    render(<ReaderSettingsPanel {...defaultProps} onClose={onClose} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('shows night mode button as active when isDarkMode is true', () => {
    render(<ReaderSettingsPanel {...defaultProps} isDarkMode={true} />);
    const nightButton = screen.getByRole('button', { name: '关闭夜间模式' });
    expect(nightButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows night mode button as inactive when isDarkMode is false', () => {
    render(<ReaderSettingsPanel {...defaultProps} isDarkMode={false} />);
    const nightButton = screen.getByRole('button', { name: '开启夜间模式' });
    expect(nightButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders the title "设置" in the top bar', () => {
    render(<ReaderSettingsPanel {...defaultProps} />);
    expect(screen.getByText('设置')).toBeInTheDocument();
  });

  it('renders the "夜间" label on the night mode button', () => {
    render(<ReaderSettingsPanel {...defaultProps} />);
    expect(screen.getByText('夜间')).toBeInTheDocument();
  });
});
