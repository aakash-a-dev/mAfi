import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Home: ({ className }: { className?: string }) => <svg className={className} data-testid="home-icon" />,
  Star: ({ className }: { className?: string }) => <svg className={className} data-testid="star-icon" />,
  Github: ({ className }: { className?: string }) => <svg className={className} data-testid="github-icon" />,
  Code2: ({ className }: { className?: string }) => <svg className={className} data-testid="code2-icon" />,
}));

describe('Sidebar', () => {
  const renderWithRouter = (initialPath: string = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/favorites" element={<Sidebar />} />
          <Route path="/gsoc" element={<Sidebar />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders without crashing', () => {
    renderWithRouter();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /favorites/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gsoc & outreachy/i })).toBeInTheDocument();
  });

  it('displays the logo and title correctly', () => {
    renderWithRouter();
    
    // Check for the GitHub icon
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    // Check for the title
    expect(screen.getByText(/mAfi/i)).toBeInTheDocument();
  });

  it('shows active link styles when on home route', () => {
    renderWithRouter('/');
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    
    expect(homeLink).toHaveClass('bg-[#282828]');
    expect(homeLink).toHaveClass('text-white');
    expect(favoritesLink).not.toHaveClass('bg-[#282828]');
    expect(favoritesLink).toHaveClass('text-gray-400');
  });

  it('shows active link styles when on favorites route', () => {
    renderWithRouter('/favorites');
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    
    expect(favoritesLink).toHaveClass('bg-[#282828]');
    expect(favoritesLink).toHaveClass('text-white');
    expect(homeLink).not.toHaveClass('bg-[#282828]');
    expect(homeLink).toHaveClass('text-gray-400');
  });

  it('shows active link styles when on gsoc route', () => {
    renderWithRouter('/gsoc');
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc & outreachy/i });
    
    expect(gsocLink).toHaveClass('bg-[#282828]');
    expect(gsocLink).toHaveClass('text-white');
    expect(homeLink).not.toHaveClass('bg-[#282828]');
    expect(homeLink).toHaveClass('text-gray-400');
  });

  it('has correct navigation links with proper href attributes', () => {
    renderWithRouter();
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc & outreachy/i });
    
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(favoritesLink.closest('a')).toHaveAttribute('href', '/favorites');
    expect(gsocLink.closest('a')).toHaveAttribute('href', '/gsoc');
  });

  it('includes all required icons', () => {
    renderWithRouter();
    
    // Check that all icons are present
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('code2-icon')).toBeInTheDocument();
  });

  it('applies hover classes when not active', () => {
    renderWithRouter('/');  // On home route
    
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc & outreachy/i });
    
    // Both should have hover classes since they're not active
    expect(favoritesLink).toHaveClass('hover:text-white');
    expect(favoritesLink).toHaveClass('hover:bg-[#1a1a1a]');
    expect(gsocLink).toHaveClass('hover:text-white');
    expect(gsocLink).toHaveClass('hover:bg-[#1a1a1a]');
  });

  it('renders sidebar with correct container classes', () => {
    renderWithRouter();

    // Find the main sidebar container div by selecting the div that contains the nav element
    const navElement = screen.getByRole('navigation');
    const sidebarContainer = navElement.parentElement;

    expect(sidebarContainer).toHaveClass('hidden');
    expect(sidebarContainer).toHaveClass('md:block');
    expect(sidebarContainer).toHaveClass('w-64');
    expect(sidebarContainer).toHaveClass('bg-black');
    expect(sidebarContainer).toHaveClass('h-screen');
  });
});