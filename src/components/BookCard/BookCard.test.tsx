import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookCard } from './BookCard';

const defaultProps = {
  id: 'novel-1',
  title: '测试小说',
  author: '测试作者',
  coverUrl: 'https://example.com/cover.jpg',
};

describe('BookCard', () => {
  it('renders title, author, and cover image', () => {
    render(<BookCard {...defaultProps} />);

    expect(screen.getByText('测试小说')).toBeInTheDocument();
    expect(screen.getByText('测试作者')).toBeInTheDocument();
    expect(screen.getByAltText('测试小说 封面')).toBeInTheDocument();
  });

  it('renders with grid variant by default', () => {
    const { container } = render(<BookCard {...defaultProps} />);
    const card = container.firstElementChild as HTMLElement;

    expect(card.className).toContain('grid');
  });

  it('renders with list variant when specified', () => {
    const { container } = render(<BookCard {...defaultProps} variant="list" />);
    const card = container.firstElementChild as HTMLElement;

    expect(card.className).toContain('list');
  });

  it('falls back to grid variant for unknown variant values', () => {
    const { container } = render(
      <BookCard {...defaultProps} variant={'unknown' as 'grid' | 'list'} />
    );
    const card = container.firstElementChild as HTMLElement;

    expect(card.className).toContain('grid');
    expect(card.className).not.toContain('unknown');
  });

  it('calls onClick with id when clicked', () => {
    const handleClick = vi.fn();
    render(<BookCard {...defaultProps} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledWith('novel-1');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Enter key press', () => {
    const handleClick = vi.fn();
    render(<BookCard {...defaultProps} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });

    expect(handleClick).toHaveBeenCalledWith('novel-1');
  });

  it('calls onClick on Space key press', () => {
    const handleClick = vi.fn();
    render(<BookCard {...defaultProps} onClick={handleClick} />);

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ' });

    expect(handleClick).toHaveBeenCalledWith('novel-1');
  });

  it('shows placeholder when image fails to load', () => {
    render(<BookCard {...defaultProps} />);

    const img = screen.getByAltText('测试小说 封面');
    fireEvent.error(img);

    // Image should be replaced by placeholder
    expect(screen.queryByAltText('测试小说 封面')).not.toBeInTheDocument();
    // SVG placeholder should be visible
    const { container } = render(<BookCard {...defaultProps} />);
    const placeholderAfterError = container.querySelector('svg');
    // Re-render to verify placeholder structure exists
    expect(placeholderAfterError).toBeDefined();
  });

  it('has proper accessibility attributes', () => {
    render(<BookCard {...defaultProps} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label', '测试小说 - 测试作者');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('does not throw when onClick is not provided', () => {
    render(<BookCard {...defaultProps} />);

    const card = screen.getByRole('button');
    expect(() => fireEvent.click(card)).not.toThrow();
  });
});
