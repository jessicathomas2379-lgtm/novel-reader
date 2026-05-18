import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// We need to import after mocking
import { HomePage } from './HomePage';
import { novels } from '../../data/novels';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the search bar', () => {
    renderHomePage();
    expect(screen.getByText('搜索小说')).toBeInTheDocument();
  });

  it('renders the featured section title', () => {
    renderHomePage();
    expect(screen.getByText('精选专区')).toBeInTheDocument();
    expect(screen.getByText('百万编辑力荐')).toBeInTheDocument();
  });

  it('renders the tabbar with home and profile tabs', () => {
    renderHomePage();
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('我的')).toBeInTheDocument();
  });

  it('navigates to /profile when "我的" tab is clicked', () => {
    renderHomePage();
    fireEvent.click(screen.getByText('我的'));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('renders featured novels from data', () => {
    renderHomePage();
    // First 6 novels are in the featured section
    const featuredNovels = novels.slice(0, 6);
    featuredNovels.forEach((novel) => {
      expect(screen.getByText(novel.title)).toBeInTheDocument();
    });
  });

  it('navigates to /reader/:novelId when a book is clicked', () => {
    renderHomePage();
    const firstNovel = novels[0];
    fireEvent.click(screen.getByRole('button', { name: `${firstNovel.title} - ${firstNovel.author}` }));
    expect(mockNavigate).toHaveBeenCalledWith(`/reader/${firstNovel.id}`);
  });
});
