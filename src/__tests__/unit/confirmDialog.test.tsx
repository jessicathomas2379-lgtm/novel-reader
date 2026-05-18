import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmDialog } from '../../components/ConfirmDialog';

describe('ConfirmDialog', () => {
  const defaultProps = {
    visible: true,
    content: '确定要执行此操作吗？',
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it('should not render when visible is false', () => {
    render(<ConfirmDialog {...defaultProps} visible={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render dialog when visible is true', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('确定要执行此操作吗？')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(<ConfirmDialog {...defaultProps} title="确认操作" />);

    expect(screen.getByText('确认操作')).toBeInTheDocument();
  });

  it('should not render title element when title is not provided', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should use default button text', () => {
    render(<ConfirmDialog {...defaultProps} />);

    expect(screen.getByText('确认')).toBeInTheDocument();
    expect(screen.getByText('取消')).toBeInTheDocument();
  });

  it('should use custom button text when provided', () => {
    render(
      <ConfirmDialog
        {...defaultProps}
        confirmText="开启"
        cancelText="算了"
      />
    );

    expect(screen.getByText('开启')).toBeInTheDocument();
    expect(screen.getByText('算了')).toBeInTheDocument();
  });

  it('should call onConfirm when confirm button is clicked', () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);

    fireEvent.click(screen.getByText('确认'));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(screen.getByText('取消'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onOverlayClick when overlay is clicked', () => {
    const onOverlayClick = vi.fn();
    render(<ConfirmDialog {...defaultProps} onOverlayClick={onOverlayClick} />);

    fireEvent.click(screen.getByRole('dialog'));

    expect(onOverlayClick).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when overlay is clicked and onOverlayClick is not provided', () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole('dialog'));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should not trigger overlay click when dialog content is clicked', () => {
    const onCancel = vi.fn();
    const onOverlayClick = vi.fn();
    render(
      <ConfirmDialog
        {...defaultProps}
        onCancel={onCancel}
        onOverlayClick={onOverlayClick}
      />
    );

    fireEvent.click(screen.getByText('确定要执行此操作吗？'));

    expect(onOverlayClick).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    render(<ConfirmDialog {...defaultProps} title="确认操作" />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'confirm-dialog-title');
  });

  it('should not have aria-labelledby when title is not provided', () => {
    render(<ConfirmDialog {...defaultProps} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).not.toHaveAttribute('aria-labelledby');
  });
});
