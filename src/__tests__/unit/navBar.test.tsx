import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NavBar } from '../../components/NavBar/NavBar';

describe('NavBar', () => {
  it('renders with title', () => {
    render(<NavBar title="测试标题" />);
    expect(screen.getByText('测试标题')).toBeInTheDocument();
  });

  it('renders without title when not provided', () => {
    const { container } = render(<NavBar />);
    expect(container.querySelector('h1')).toBeNull();
  });

  it('renders back icon when leftIcon is "back"', () => {
    render(<NavBar leftIcon="back" />);
    expect(screen.getByRole('button', { name: '返回' })).toBeInTheDocument();
  });

  it('does not render left icon when leftIcon is "none"', () => {
    render(<NavBar leftIcon="none" />);
    expect(screen.queryByRole('button', { name: '返回' })).not.toBeInTheDocument();
  });

  it('renders profile icon when rightIcon is "profile"', () => {
    render(<NavBar rightIcon="profile" />);
    expect(screen.getByRole('button', { name: '个人中心' })).toBeInTheDocument();
  });

  it('renders home icon when rightIcon is "home"', () => {
    render(<NavBar rightIcon="home" />);
    expect(screen.getByRole('button', { name: '首页' })).toBeInTheDocument();
  });

  it('does not render right icon when rightIcon is "none"', () => {
    render(<NavBar rightIcon="none" />);
    expect(screen.queryByRole('button', { name: '个人中心' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '首页' })).not.toBeInTheDocument();
  });

  it('calls onLeftClick when back icon is clicked', () => {
    const handleClick = vi.fn();
    render(<NavBar leftIcon="back" onLeftClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: '返回' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onRightClick when profile icon is clicked', () => {
    const handleClick = vi.fn();
    render(<NavBar rightIcon="profile" onRightClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: '个人中心' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onRightClick when home icon is clicked', () => {
    const handleClick = vi.fn();
    render(<NavBar rightIcon="home" onRightClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: '首页' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders inline SVG for back icon (not img tag)', () => {
    const { container } = render(<NavBar leftIcon="back" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders inline SVG for profile icon (not img tag)', () => {
    const { container } = render(<NavBar rightIcon="profile" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders inline SVG for home icon (not img tag)', () => {
    const { container } = render(<NavBar rightIcon="home" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
  });

  it('defaults leftIcon to "none" and rightIcon to "none"', () => {
    const { container } = render(<NavBar title="默认" />);
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('icon buttons have proper accessibility attributes', () => {
    render(<NavBar leftIcon="back" rightIcon="profile" />);
    const backBtn = screen.getByRole('button', { name: '返回' });
    const profileBtn = screen.getByRole('button', { name: '个人中心' });
    expect(backBtn).toHaveAttribute('aria-label', '返回');
    expect(profileBtn).toHaveAttribute('aria-label', '个人中心');
  });
});
