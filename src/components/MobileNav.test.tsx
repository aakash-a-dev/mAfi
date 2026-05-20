import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileNav from './MobileNav';
import '@testing-library/jest-dom';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  Home: ({ className }: { className?: string }) => <svg className={className} data-testid="home-icon" />,
  Star: ({ className }: { className?: string }) => <svg className={className} data-testid="star-icon" />,
  Code2: ({ className }: { className?: string }) => <svg className={className} data-testid="code2-icon" />,
}));

describe('MobileNav', () => {
  const renderWithRouter = (initialRoute: string = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <MobileNav />
      </MemoryRouter>
    );
  };

  it('renders the mobile navigation bar', () => {
    renderWithRouter();

    // Check that the main container is present
    const navContainer = screen.getByRole('navigation');
    expect(navContainer).toBeInTheDocument();
    
    // Verify all three navigation items are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('GSoC')).toBeInTheDocument();
    
    // Verify icons are present
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
    expect(screen.getByTestId('code2-icon')).toBeInTheDocument();
  });

  it('highlights the home link when on the home route', () => {
    renderWithRouter('/');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc/i });

    expect(homeLink).toHaveClass('text-green-500');
    expect(favoritesLink).toHaveClass('text-gray-400');
    expect(gsocLink).toHaveClass('text-gray-400');
  });

  it('highlights the favorites link when on the favorites route', () => {
    renderWithRouter('/favorites');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc/i });

    expect(homeLink).toHaveClass('text-gray-400');
    expect(favoritesLink).toHaveClass('text-green-500');
    expect(gsocLink).toHaveClass('text-gray-400');
  });

  it('highlights the gsoc link when on the gsoc route', () => {
    renderWithRouter('/gsoc');

    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc/i });

    expect(homeLink).toHaveClass('text-gray-400');
    expect(favoritesLink).toHaveClass('text-gray-400');
    expect(gsocLink).toHaveClass('text-green-500');
  });

  it('has correct href attributes for navigation links', () => {
    renderWithRouter();

    const homeLink = screen.getByRole('link', { name: /home/i });
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
    expect(gsocLink).toHaveAttribute('href', '/gsoc');
  });

  it('applies hover classes when not on active route', () => {
    renderWithRouter('/');

    // On home route, favorites and gsoc links should have hover:text-white class
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    const gsocLink = screen.getByRole('link', { name: /gsoc/i });

    expect(favoritesLink).toHaveClass('hover:text-white');
    expect(gsocLink).toHaveClass('hover:text-white');
  });

  it('does not apply hover classes when on active route', () => {
    renderWithRouter('/');

    // On home route, home link should not have hover:text-white class
    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).not.toHaveClass('hover:text-white');
  });

  it('has correct icon sizes', () => {
    renderWithRouter();

    const homeIcon = screen.getByTestId('home-icon');
    const starIcon = screen.getByTestId('star-icon');
    const code2Icon = screen.getByTestId('code2-icon');

    expect(homeIcon).toHaveClass('w-6 h-6');
    expect(starIcon).toHaveClass('w-6 h-6');
    expect(code2Icon).toHaveClass('w-6 h-6');
  });

  it('renders with correct text sizes and weights', () => {
    renderWithRouter();

    const homeText = screen.getByText('Home');
    const favoritesText = screen.getByText('Favorites');
    const gsocText = screen.getByText('GSoC');

    expect(homeText).toHaveClass('text-xs');
    expect(homeText).toHaveClass('font-medium');
    expect(favoritesText).toHaveClass('text-xs');
    expect(favoritesText).toHaveClass('font-medium');
    expect(gsocText).toHaveClass('text-xs');
    expect(gsocText).toHaveClass('font-medium');
  });
});