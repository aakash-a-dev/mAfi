import { render, screen, waitFor } from '@testing-library/react';
import Favorites from './Favorites';
import { GitHubIssue } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    length: 0,
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock IssueCard component to avoid complexity in Favorites tests
jest.mock('./IssueCard', () => {
  return ({ issue }: { issue: GitHubIssue }) => (
    <div data-testid="issue-card" data-issue-id={issue.id}>
      {issue.title}
    </div>
  );
});

describe('Favorites Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Reset localStorage mock after each test
    Object.keys(localStorageMock).forEach(key => {
      if (typeof localStorageMock[key as keyof typeof localStorageMock] === 'function') {
        (localStorageMock[key as keyof typeof localStorageMock] as jest.Mock).mockClear();
      }
    });
  });

  it('renders correctly when no favorites are present', async () => {
    // Mock empty favorites in localStorage
    localStorageMock.getItem.mockReturnValue('[]');

    render(<Favorites />);

    // Wait for useEffect to complete
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Favorite Issues/i })).toBeInTheDocument();
    });

    expect(screen.getByText('No favorite issues yet.')).toBeInTheDocument();
  });

  it('renders favorites when they are present in localStorage', async () => {
    // Create mock favorite issues
    const mockFavorites: GitHubIssue[] = [
      {
        id: 1,
        html_url: 'https://github.com/example/repo/issues/1',
        title: 'Test Issue 1',
        state: 'open',
        created_at: '2023-01-01T00:00:00Z',
        body: 'This is a test issue',
        repository_url: 'https://github.com/example/repo',
        labels: [
          { name: 'bug', color: 'e11d21' },
        ],
        user: {
          login: 'testuser',
          avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        },
      },
      {
        id: 2,
        html_url: 'https://github.com/example/repo/issues/2',
        title: 'Test Issue 2',
        state: 'closed',
        created_at: '2023-01-02T00:00:00Z',
        body: 'This is another test issue',
        repository_url: 'https://github.com/example/repo',
        labels: [
          { name: 'feature', color: '1d7fb0' },
        ],
        user: {
          login: 'anotheruser',
          avatar_url: 'https://avatars.githubusercontent.com/u/67890?v=4',
        },
      },
    ];

    // Mock localStorage to return the favorites
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));

    render(<Favorites />);

    // Wait for useEffect to complete
    await waitFor(() => {
      expect(screen.getByText('Test Issue 1')).toBeInTheDocument();
      expect(screen.getByText('Test Issue 2')).toBeInTheDocument();
    });

    // Check that both issues are rendered as issue cards and verify their IDs
    const issueCards = screen.getAllByTestId('issue-card');
    expect(issueCards).toHaveLength(2);
    expect(issueCards[0]).toHaveAttribute('data-issue-id', '1');
    expect(issueCards[1]).toHaveAttribute('data-issue-id', '2');
  });

  it('handles localStorage with null value', async () => {
    // Mock localStorage to return null
    localStorageMock.getItem.mockReturnValue(null);

    render(<Favorites />);

    // Wait for useEffect to complete
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Favorite Issues/i })).toBeInTheDocument();
    });

    // Since localStorage returns null, the fallback '[]' should be used
    expect(screen.getByText('No favorite issues yet.')).toBeInTheDocument();
  });

  it('displays correct heading', async () => {
    localStorageMock.getItem.mockReturnValue('[]');

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Favorite Issues');
  });

  it('renders grid layout when favorites are present', async () => {
    const mockFavorites: GitHubIssue[] = [{
      id: 1,
      html_url: 'https://github.com/example/repo/issues/1',
      title: 'Test Issue 1',
      state: 'open',
      created_at: '2023-01-01T00:00:00Z',
      body: 'This is a test issue',
      repository_url: 'https://github.com/example/repo',
      labels: [
        { name: 'bug', color: 'e11d21' },
      ],
      user: {
        login: 'testuser',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
      },
    }];

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavorites));

    render(<Favorites />);

    await waitFor(() => {
      expect(screen.getByText('Test Issue 1')).toBeInTheDocument();
    });

    // Check if the grid container is rendered
    const gridContainer = document.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('gap-4', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });
});