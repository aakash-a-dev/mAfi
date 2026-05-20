import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IssueCard from './IssueCard';
import { GitHubIssue } from '../types';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('IssueCard', () => {
  const mockIssue: GitHubIssue = {
    id: 1,
    html_url: 'https://github.com/example/repo/issues/1',
    title: 'Test Issue Title',
    state: 'open',
    created_at: '2023-09-17T12:30:00Z',
    body: 'This is a test issue description',
    repository_url: 'https://github.com/example/repo',
    labels: [
      { name: 'bug', color: 'e11d21' },
      { name: 'help wanted', color: '159818' },
    ],
    user: {
      login: 'test-user',
      avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset localStorage mock
    mockLocalStorage.clear();
  });

  it('renders issue information correctly', () => {
    render(<IssueCard issue={mockIssue} />);

    // Check that the issue title is displayed
    expect(screen.getByText('Test Issue Title')).toBeInTheDocument();

    // Check that the issue creator is displayed
    expect(screen.getByText('by test-user')).toBeInTheDocument();

    // Check that the issue body is displayed
    expect(screen.getByText('This is a test issue description')).toBeInTheDocument();

    // Check that labels are rendered
    expect(screen.getByText('bug')).toBeInTheDocument();
    expect(screen.getByText('help wanted')).toBeInTheDocument();

    // Check that the GitHub link is present
    expect(screen.getByText('View on GitHub →')).toHaveAttribute(
      'href',
      'https://github.com/example/repo/issues/1'
    );

    // Check that the user avatar is rendered
    expect(screen.getByAltText('test-user')).toBeInTheDocument();
  });

  it('renders truncated body when no body is provided', () => {
    const issueWithoutBody = { ...mockIssue, body: '' };
    render(<IssueCard issue={issueWithoutBody} />);

    expect(screen.getByText('No description provided.')).toBeInTheDocument();
  });

  it('renders labels with correct background colors', () => {
    render(<IssueCard issue={mockIssue} />);

    const bugLabel = screen.getByText('bug');
    const helpWantedLabel = screen.getByText('help wanted');

    expect(bugLabel).toHaveStyle('background-color: #e11d21');
    expect(helpWantedLabel).toHaveStyle('background-color: #159818');
  });

  it('initializes favorite state from localStorage', () => {
    const favorites = [mockIssue];
    mockLocalStorage.setItem('favorites', JSON.stringify(favorites));

    render(<IssueCard issue={mockIssue} />);

    // The star icon should be green since the issue is in favorites
    const starButton = screen.getByRole('button');
    expect(starButton).toHaveClass('text-green-500');
  });

  it('handles favorite toggle correctly when adding to favorites', async () => {
    mockLocalStorage.setItem('favorites', JSON.stringify([])); // Initially not in favorites

    render(<IssueCard issue={mockIssue} />);

    const starButton = screen.getByRole('button');
    
    // Initially not a favorite (gray star)
    expect(starButton).toHaveClass('text-gray-400');

    // Click to add to favorites
    fireEvent.click(starButton);

    await waitFor(() => {
      // The star should now be green (favorited)
      expect(starButton).toHaveClass('text-green-500');
    });

    // Check that localStorage.setItem was called with the correct data
    expect(JSON.parse(mockLocalStorage.getItem('favorites') || '[]')).toContainEqual(mockIssue);
  });

  it('handles favorite toggle correctly when removing from favorites', async () => {
    const otherIssue = { id: 2, title: 'Other issue', html_url: '', state: '', created_at: '', body: '', repository_url: '', labels: [], user: { login: 'other', avatar_url: '' } };
    const favorites = [mockIssue, otherIssue];
    mockLocalStorage.setItem('favorites', JSON.stringify(favorites)); // Initially in favorites
    
    render(<IssueCard issue={mockIssue} />);

    const starButton = screen.getByRole('button');
    
    // Initially a favorite (green star)
    expect(starButton).toHaveClass('text-green-500');

    // Click to remove from favorites
    fireEvent.click(starButton);

    await waitFor(() => {
      // The star should now be gray (not favorited)
      expect(starButton).toHaveClass('text-gray-400');
    });

    // Check that localStorage.setItem was called with the correct data (removed issue)
    const updatedFavorites = JSON.parse(mockLocalStorage.getItem('favorites') || '[]');
    expect(updatedFavorites).toHaveLength(1);
    expect(updatedFavorites).toContainEqual(otherIssue);
    expect(updatedFavorites).not.toContainEqual(mockIssue);
  });

  it('opens GitHub link in a new tab', () => {
    render(<IssueCard issue={mockIssue} />);

    const githubLink = screen.getByText('View on GitHub →');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});