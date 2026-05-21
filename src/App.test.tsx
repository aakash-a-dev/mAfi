// Mock CSS modules before importing anything else
jest.mock('./index.css', () => ({}));

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Mock child components to isolate App component tests
jest.mock('./components/Sidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

jest.mock('./components/IssuesList', () => ({
  __esModule: true,
  default: (_props: { filters: any }) => <div data-testid="issues-list">Issues List</div>,
}));

jest.mock('./components/Favorites', () => ({
  __esModule: true,
  default: () => <div data-testid="favorites">Favorites</div>,
}));

jest.mock('./components/AnnouncementBar', () => ({
  __esModule: true,
  default: () => <div data-testid="announcement-bar">Announcement Bar</div>,
}));

jest.mock('./components/MobileNav', () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-nav">Mobile Nav</div>,
}));

// Correctly mock GSoCSection as a named export
jest.mock('./components/GSoCSection', () => ({
  __esModule: true,
  GSoCSection: () => <div data-testid="gsoc-section">GSoC Section</div>,
}));

jest.mock('./components/FilterBar', () => ({
  __esModule: true,
  default: (_props: { onFiltersChange: () => void }) => (
    <div data-testid="filter-bar">Filter Bar</div>
  ),
}));

// Mock the entire react-router-dom to prevent BrowserRouter from conflicting
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Routes: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Route: ({ element }: { element: React.ReactNode }) => element,
  useLocation: () => ({ pathname: '/' }),
}));

// Mock the analytics module
jest.mock('./analytics', () => ({
  initializeGA: jest.fn(),
  logPageView: jest.fn(),
}));

describe('App Component', () => {
  const createTestQueryClient = () => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  };

  beforeEach(() => {
    // Clear any previous mock calls
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    // Wait for potential async operations
    await waitFor(() => {
      expect(screen.getByTestId('announcement-bar')).toBeInTheDocument();
    });
  });

  it('renders main layout elements', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('announcement-bar')).toBeInTheDocument();
      expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
      expect(screen.getByTestId('filter-bar')).toBeInTheDocument();
    });
  });

  it('renders routes correctly - home page', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('issues-list')).toBeInTheDocument();
    });
  });

  it('renders routes correctly - favorites page', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('favorites')).toBeInTheDocument();
    });
  });

  it('renders routes correctly - gsoc page', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('gsoc-section')).toBeInTheDocument();
    });
  });

  it('initializes Google Analytics on mount', async () => {
    const { initializeGA } = require('./analytics');
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(initializeGA).toHaveBeenCalled();
    });
  });

  it('applies correct CSS classes to main container', async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const mainContainer = document.querySelector('.flex.flex-col.min-h-screen.bg-\\[\\#121212\\].text-white');
      expect(mainContainer).toBeInTheDocument();
    });
  });
});