import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IssuesList from './IssuesList';
import { Filters } from './FilterBar';

// Mock the necessary modules
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  Loader: () => <div data-testid="loader-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
}));

// Mock the child components
jest.mock('./IssueCard', () => {
  return {
    __esModule: true,
    default: ({ issue }: any) => <div data-testid={`issue-card-${issue.id}`}>{issue.title}</div>,
  };
});

jest.mock('./Pagination', () => {
  return {
    __esModule: true,
    default: ({ currentPage, totalPages, onPageChange }: any) => (
      <div data-testid="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    ),
  };
});

jest.mock('./LabelSelector', () => {
  return {
    __esModule: true,
    LabelSelector: ({ selectedLabel, setSelectedLabel }: any) => (
      <select
        data-testid="label-selector"
        value={selectedLabel}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        <option value="">All Labels</option>
        <option value="bug">Bug</option>
        <option value="enhancement">Enhancement</option>
      </select>
    ),
  };
});

// Mock the fetch function
const mockFetch = jest.fn();
window.fetch = mockFetch;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockFilters: Filters = {
  languages: [],
  difficulty: [],
  labels: [],
};

const mockIssues = [
  {
    id: 1,
    html_url: 'https://github.com/example/repo/issues/1',
    title: 'Sample Issue 1',
    state: 'open',
    created_at: '2023-01-01T00:00:00Z',
    body: 'This is a sample issue body',
    repository_url: 'https://github.com/example/repo',
    labels: [
      { name: 'bug', color: 'e11d21' },
      { name: 'help wanted', color: '159818' },
    ],
    user: {
      login: 'testuser',
      avatar_url: 'https://example.com/avatar.png',
    },
  },
  {
    id: 2,
    html_url: 'https://github.com/example/repo/issues/2',
    title: 'Sample Issue 2',
    state: 'open',
    created_at: '2023-01-02T00:00:00Z',
    body: 'Another sample issue',
    repository_url: 'https://github.com/example/repo',
    labels: [
      { name: 'enhancement', color: 'c5def5' },
    ],
    user: {
      login: 'anotheruser',
      avatar_url: 'https://example.com/avatar2.png',
    },
  },
];

const setup = (filters: Filters = mockFilters) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <IssuesList filters={filters} />
    </QueryClientProvider>
  );
};

describe('IssuesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockClear();
    queryClient.clear();
  });

  it('renders without crashing', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();
    
    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });
  });

  it('displays loader while fetching data', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockImplementation(
      () => Promise.resolve(mockResponse)
    );

    setup();

    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });
  });

  it('displays issues after fetch', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
      expect(screen.getByText('Sample Issue 2')).toBeInTheDocument();
    });

    expect(screen.getByTestId(`issue-card-${mockIssues[0].id}`)).toBeInTheDocument();
    expect(screen.getByTestId(`issue-card-${mockIssues[1].id}`)).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: jest.fn(),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();

    await waitFor(() => {
      expect(screen.getByText('Error loading issues. Please try again later.')).toBeInTheDocument();
    });
  });

  it('filters issues based on search query', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const { container } = setup();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });

    // Find and change the search input
    const searchInput = container.querySelector('input[placeholder="Search issues..."]') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Sample Issue 2' } });

    // Verify that only the filtered issue is shown
    expect(screen.getByText('Sample Issue 2')).toBeInTheDocument();
    expect(screen.queryByText('Sample Issue 1')).not.toBeInTheDocument();
  });

  it('displays "No issues found" when filtered issues are empty', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: [],
        total_count: 0,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();

    await waitFor(() => {
      expect(screen.getByText('No issues found.')).toBeInTheDocument();
    });
  });

  it('updates search query when input changes', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    const { container } = setup();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });

    const searchInput = container.querySelector('input[placeholder="Search issues..."]') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput).toHaveValue('test search');
  });

  it('changes label filter and triggers re-fetch', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });

    // Change the label selector
    const labelSelect = screen.getByTestId('label-selector');
    expect(labelSelect).toBeInTheDocument();

    fireEvent.change(labelSelect, { target: { value: 'bug' } });

    // Verify the fetch was called with the new label filter
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('label:"bug"'),
      expect.anything()
    );
  });

  it('resets pagination when label filter changes', async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssues,
        total_count: mockIssues.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });

    // Change current page to 2 (simulate)
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    // Change label filter
    const labelSelect = screen.getByTestId('label-selector');
    expect(labelSelect).toBeInTheDocument();

    fireEvent.change(labelSelect, { target: { value: 'bug' } });
  });

  it('applies language filters correctly', async () => {
    const filtersWithLanguage: Filters = {
      languages: ['javascript'],
      difficulty: [],
      labels: [],
    };

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: [
          {
            ...mockIssues[0],
            body: 'This issue is about JavaScript',
          },
        ],
        total_count: 1,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup(filtersWithLanguage);

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });
  });

  it('applies difficulty filters correctly', async () => {
    const filtersWithDifficulty: Filters = {
      languages: [],
      difficulty: ['beginner-friendly'],
      labels: [],
    };

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: [
          {
            ...mockIssues[0],
            labels: [
              ...mockIssues[0].labels,
              { name: 'beginner-friendly', color: '0e8a16' },
            ],
          },
        ],
        total_count: 1,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup(filtersWithDifficulty);

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });
  });

  it('applies tech labels filters correctly', async () => {
    const filtersWithLabels: Filters = {
      languages: [],
      difficulty: [],
      labels: ['react'],
    };

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: [
          {
            ...mockIssues[0],
            labels: [
              ...mockIssues[0].labels,
              { name: 'react', color: 'abcdef' },
            ],
          },
        ],
        total_count: 1,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup(filtersWithLabels);

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });
  });

  it('renders pagination when there are multiple pages', async () => {
    const mockIssuesWithMultiplePages = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      html_url: `https://github.com/example/repo/issues/${i + 1}`,
      title: `Sample Issue ${i + 1}`,
      state: 'open',
      created_at: '2023-01-01T00:00:00Z',
      body: 'This is a sample issue body',
      repository_url: 'https://github.com/example/repo',
      labels: [],
      user: {
        login: `user${i}`,
        avatar_url: `https://example.com/avatar${i}.png`,
      },
    }));

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        items: mockIssuesWithMultiplePages.slice(0, 12), // First page
        total_count: mockIssuesWithMultiplePages.length,
      }),
    };
    mockFetch.mockResolvedValue(mockResponse);

    setup();

    await waitFor(() => {
      expect(screen.getByText('Sample Issue 1')).toBeInTheDocument();
    });

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});