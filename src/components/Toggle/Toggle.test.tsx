import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('renders with role="switch"', () => {
    render(<Toggle checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('reflects checked state via aria-checked', () => {
    const { rerender } = render(<Toggle checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(<Toggle checked={true} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with toggled value on click', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when checked and clicked', () => {
    const onChange = vi.fn();
    render(<Toggle checked={true} onChange={onChange} />);

    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled />);

    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-disabled when disabled', () => {
    render(<Toggle checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('is keyboard accessible with Space key', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('is keyboard accessible with Enter key', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);

    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not respond to keyboard when disabled', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} disabled />);

    fireEvent.keyDown(screen.getByRole('switch'), { key: ' ' });
    fireEvent.keyDown(screen.getByRole('switch'), { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('defaults to "default" variant', () => {
    render(<Toggle checked={false} onChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('default');
  });

  it('applies "primary" variant class', () => {
    render(<Toggle checked={false} onChange={() => {}} variant="primary" />);
    const toggle = screen.getByRole('switch');
    expect(toggle.className).toContain('primary');
  });

  it('has tabIndex 0 when enabled and -1 when disabled', () => {
    const { rerender } = render(<Toggle checked={false} onChange={() => {}} />);
    expect(screen.getByRole('switch')).toHaveAttribute('tabindex', '0');

    rerender(<Toggle checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('tabindex', '-1');
  });
});
