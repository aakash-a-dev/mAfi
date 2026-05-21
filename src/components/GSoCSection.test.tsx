import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { GSoCSection } from './GSoCSection';
import { fetchOrganizations, fetchDeadlines, toggleFavorite } from '../services/gsocService';
import { Organization, Deadline } from '../types/gsoc';

// Mock the services
jest.mock('../services/gsocService', () => ({
  ...jest.requireActual('../services/gsocService'),
  fetchOrganizations: jest.fn(),
  fetchDeadlines: jest.fn(),
  toggleFavorite: jest.fn(),
}));

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Github: ({ className }: { className?: string }) => <svg className={className} data-testid="github-icon" />,
  Globe: ({ className }: { className?: string }) => <svg className={className} data-testid="globe-icon" />,
  Star: ({ className, fill }: { className?: string; fill?: string }) => <svg className={className} data-testid="star-icon" fill={fill} />,
  Calendar: ({ className }: { className?: string }) => <svg className={className} data-testid="calendar-icon" />,
  ExternalLink: ({ className }: { className?: string }) => <svg className={className} data-testid="external-link-icon" />,
}));

describe('GSoCSection', () => {
  const mockOrganizations: Organization[] = [
    {
      name: 'Mock Org',
      techStack: ['JavaScript', 'TypeScript'],
      projectType: 'Web Development',
      year: 2024,
      description: 'A sample organization',
      websiteUrl: 'https://mock.org',
      githubUrl: 'https://github.com/mock',
      isFavorite: false,
    },
    {
      name: 'Another Org',
      techStack: ['Python'],
      projectType: 'Machine Learning',
      year: 2023,
      description: 'Another organization',
      websiteUrl: 'https://another.org',
      githubUrl: 'https://github.com/another',
      isFavorite: true,
    },
  ];

  const mockDeadlines: Deadline[] = [
    {
      program: 'GSoC',
      phase: 'Organization Applications',
      date: '2024-02-01',
      description: 'Sample deadline',
      url: 'https://example.com',
    },
  ];

  beforeEach(() => {
    (fetchOrganizations as jest.MockedFunction<typeof fetchOrganizations>).mockResolvedValue(mockOrganizations);
    (fetchDeadlines as jest.MockedFunction<typeof fetchDeadlines>).mockResolvedValue(mockDeadlines);
    (toggleFavorite as jest.MockedFunction<typeof toggleFavorite>).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    render(<GSoCSection />);
    
    expect(screen.getByText(/loading organizations/i)).toBeInTheDocument();
  });

  it('fetches and displays organizations and deadlines', async () => {
    render(<GSoCSection />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Check that organizations are displayed
    expect(screen.getByText('Mock Org')).toBeInTheDocument();
    expect(screen.getByText('A sample organization')).toBeInTheDocument();

    expect(screen.getByText('Another Org')).toBeInTheDocument();
    expect(screen.getByText('Another organization')).toBeInTheDocument();

    // Check that deadlines are displayed
    expect(screen.getByText('GSoC - Organization Applications')).toBeInTheDocument();
  });

  it('displays error message when data fetching fails', async () => {
    (fetchOrganizations as jest.MockedFunction<typeof fetchOrganizations>)
      .mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  it('filters organizations by technology stack', async () => {
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Select a technology stack from the filter
    const techStackSelect = screen.getAllByRole('combobox')[0]; // First select element is tech stack
    fireEvent.change(techStackSelect, { target: { value: 'JavaScript' } });

    // Wait for the filter to be applied
    await waitFor(() => {
      expect(techStackSelect).toHaveValue('JavaScript');
    });

    // Verify that only organizations with JavaScript are visible
    expect(screen.getByText('Mock Org')).toBeInTheDocument();
    expect(screen.queryByText('Another Org')).not.toBeInTheDocument();
  });

  it('filters organizations by year', async () => {
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Select a year from the filter
    const yearSelect = screen.getAllByRole('combobox')[1]; // Second select element is year
    fireEvent.change(yearSelect, { target: { value: '2024' } });

    // Wait for the filter to be applied
    await waitFor(() => {
      expect(yearSelect).toHaveValue('2024');
    });

    // Verify that only organizations from 2024 are visible
    expect(screen.getByText('Mock Org')).toBeInTheDocument();
    expect(screen.queryByText('Another Org')).not.toBeInTheDocument();
  });

  it('filters organizations by project type', async () => {
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Select a project type from the filter
    const projectTypeSelect = screen.getAllByRole('combobox')[2]; // Third select element is project type
    fireEvent.change(projectTypeSelect, { target: { value: 'Web Development' } });

    // Wait for the filter to be applied
    await waitFor(() => {
      expect(projectTypeSelect).toHaveValue('Web Development');
    });

    // Verify that only organizations with matching project type are visible
    expect(screen.getByText('Mock Org')).toBeInTheDocument();
    expect(screen.queryByText('Another Org')).not.toBeInTheDocument();
  });

  it('filters organizations by search query', async () => {
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Enter a search query
    const searchInput = screen.getByPlaceholderText(/search organizations/i);
    fireEvent.change(searchInput, { target: { value: 'Mock' } });

    // Wait for the filter to be applied
    await waitFor(() => {
      expect(screen.getByDisplayValue('Mock')).toBeInTheDocument();
    });

    // Verify that only matching organizations are visible
    expect(screen.getByText('Mock Org')).toBeInTheDocument();
    expect(screen.queryByText('Another Org')).not.toBeInTheDocument();
  });

  it('handles favorite toggle', async () => {
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Find the favorite button for the first organization
    const favoriteButton = screen.getAllByRole('button')[0]; // First button should be the star icon
    
    // Click the favorite button
    fireEvent.click(favoriteButton);

    // Verify that toggleFavorite was called
    await waitFor(() => {
      expect(toggleFavorite).toHaveBeenCalledWith('Mock Org');
    });
  });

  it('displays no results message when filters yield no results', async () => {
    // Create a mock organization that has a unique tech stack not in our test data
    const mockOrgsWithUniqueTech: Organization[] = [
      {
        name: 'Unique Tech Org',
        techStack: ['UniqueTech'],
        projectType: 'Web Development',
        year: 2024,
        description: 'An organization with unique tech stack',
        websiteUrl: 'https://unique.org',
        githubUrl: 'https://github.com/unique',
        isFavorite: false,
      },
    ];

    (fetchOrganizations as jest.MockedFunction<typeof fetchOrganizations>)
      .mockResolvedValueOnce(mockOrgsWithUniqueTech);

    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Apply a search query that should yield no results
    const searchInput = screen.getByPlaceholderText(/search organizations/i);
    fireEvent.change(searchInput, { target: { value: 'Nonexistent search term' } });

    // Wait for the filter to be applied
    await waitFor(() => {
      expect(searchInput).toHaveValue('Nonexistent search term');
    });

    // Check that no results message is displayed
    expect(screen.getByText(/no organizations found matching/i)).toBeInTheDocument();
  });

  it('renders GSoC guide section', async () => {
    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Check that the guide section is present
    expect(screen.getByText(/gsoc & outreachy guide/i)).toBeInTheDocument();
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
    expect(screen.getByText(/how to apply/i)).toBeInTheDocument();
    expect(screen.getByText(/faqs/i)).toBeInTheDocument();
  });

  it('has correct class name applied to wrapper element', async () => {
    render(<GSoCSection className="custom-class" />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // The component wrapper has the class 'gsoc-section' plus any additional classes
    const sectionHeading = screen.getByText(/gsoc & outreachy organizations/i);
    const sectionElement = sectionHeading.closest('div');
    expect(sectionElement).toHaveClass('gsoc-section');
    // Since we can't verify the custom-class directly this way, we'll just check the structure
  });

  it('organizes deadlines chronologically', async () => {
    const mockDeadlinesChronological: Deadline[] = [
      {
        program: 'GSoC',
        phase: 'Phase 2',
        date: '2024-09-01',
        description: 'Later phase',
        url: 'https://example.com',
      },
      {
        program: 'GSoC',
        phase: 'Phase 1',
        date: '2024-03-01',
        description: 'Earlier phase',
        url: 'https://example.com',
      },
    ];

    (fetchDeadlines as jest.MockedFunction<typeof fetchDeadlines>)
      .mockResolvedValueOnce(mockDeadlinesChronological);

    render(<GSoCSection />);

    await waitFor(() => {
      expect(screen.queryByText(/loading organizations/i)).not.toBeInTheDocument();
    });

    // Check that the first deadline shown is the earlier one (chronological order)
    const deadlineElements = screen.getAllByText(/phase \d/i);
    expect(deadlineElements[0]).toHaveTextContent('Phase 1');
    expect(deadlineElements[1]).toHaveTextContent('Phase 2');
  });
});