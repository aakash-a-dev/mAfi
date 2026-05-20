import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';
import '@testing-library/jest-dom';

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  Filter: () => <svg data-testid="filter-icon" />,
  X: () => <svg data-testid="x-icon" />,
}));

describe('FilterBar', () => {
  const mockOnFiltersChange = jest.fn();

  beforeEach(() => {
    mockOnFiltersChange.mockClear();
  });

  it('renders correctly with initial state', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
  });

  it('toggles filter panel when clicked', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    // Initially, filter options should not be visible
    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
    expect(screen.queryByText('Difficulty')).not.toBeInTheDocument();
    expect(screen.queryByText('Tech Stack')).not.toBeInTheDocument();

    // Click the filter button to open the panel
    fireEvent.click(screen.getByText('Filters'));
    
    // Now filter options should be visible
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Difficulty')).toBeInTheDocument();
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();

    // Click again to close the panel
    fireEvent.click(screen.getByText('Filters'));
    
    // Filter options should be hidden again
    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
    expect(screen.queryByText('Difficulty')).not.toBeInTheDocument();
    expect(screen.queryByText('Tech Stack')).not.toBeInTheDocument();
  });

  it('toggles language filters', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' })); // Add JavaScript filter

    // Verify the filter is added - look specifically for the active filter tag (span with X button)
    const activeFilterSpans = screen.getAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeFilterSpans.length).toBe(1);
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: ['JavaScript'],
      difficulty: [],
      labels: [],
    });

    // Remove the JavaScript filter - find the X button within the active filter span
    fireEvent.click(screen.getByTestId('x-icon'));
    
    // Verify the active filter is removed (but the filter button still exists)
    const remainingActiveFilterSpans = screen.queryAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(remainingActiveFilterSpans.length).toBe(0);
    expect(screen.getByRole('button', { name: 'JavaScript' })).toBeInTheDocument(); // Button still exists
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: [],
      labels: [],
    });
  });

  it('toggles difficulty filters', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    fireEvent.click(screen.getByRole('button', { name: 'easy' })); // Add easy difficulty filter

    // Verify the filter is added
    const activeFilterSpans = screen.getAllByText('easy').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeFilterSpans.length).toBe(1);
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: ['easy'],
      labels: [],
    });

    // Remove the easy filter
    fireEvent.click(screen.getByTestId('x-icon'));
    
    // Verify the active filter is removed
    const remainingActiveFilterSpans = screen.queryAllByText('easy').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(remainingActiveFilterSpans.length).toBe(0);
    expect(screen.getByRole('button', { name: 'easy' })).toBeInTheDocument(); // Button still exists
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: [],
      labels: [],
    });
  });

  it('toggles tech stack filters', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    fireEvent.click(screen.getByRole('button', { name: 'react' })); // Add react filter

    // Verify the filter is added
    const activeFilterSpans = screen.getAllByText('react').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeFilterSpans.length).toBe(1);
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: [],
      labels: ['react'],
    });

    // Remove the react filter
    fireEvent.click(screen.getByTestId('x-icon'));
    
    // Verify the active filter is removed
    const remainingActiveFilterSpans = screen.queryAllByText('react').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(remainingActiveFilterSpans.length).toBe(0);
    expect(screen.getByRole('button', { name: 'react' })).toBeInTheDocument(); // Button still exists
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: [],
      labels: [],
    });
  });

  it('displays clear all button when filters are active', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' })); // Add a filter

    // Verify clear all button is displayed
    expect(screen.getByText('Clear all')).toBeInTheDocument();

    // Click to clear all filters
    fireEvent.click(screen.getByText('Clear all'));

    // Verify active filters are cleared (but filter buttons remain)
    // Check that there are no active JavaScript filter tags (spans with X icon)
    const activeJavaScriptSpans = screen.queryAllByText('JavaScript').filter(el =>
      el.tagName.toLowerCase() === 'span' &&
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeJavaScriptSpans.length).toBe(0); // No active filter tags with X icon
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: [],
      labels: [],
    });
  });

  it('can add multiple filters from different categories', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    
    // Add filters from different categories
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' })); // Language
    fireEvent.click(screen.getByRole('button', { name: 'easy' })); // Difficulty
    fireEvent.click(screen.getByRole('button', { name: 'react' })); // Label

    // Verify all active filters are displayed (not the filter option buttons)
    const activeJavaScriptFilter = screen.getAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeJavaScriptFilter.length).toBe(1);
    
    const activeEasyFilter = screen.getAllByText('easy').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeEasyFilter.length).toBe(1);
    
    const activeReactFilter = screen.getAllByText('react').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeReactFilter.length).toBe(1);

    // Verify the callback was called with all added filters
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: ['JavaScript'],
      difficulty: ['easy'],
      labels: ['react'],
    });
  });

  it('clears all filters when clear all is clicked', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' })); // Add JavaScript filter
    fireEvent.click(screen.getByRole('button', { name: 'TypeScript' })); // Add TypeScript filter
    fireEvent.click(screen.getByRole('button', { name: 'easy' })); // Add easy difficulty filter

    // Verify filters are added
    const activeJavaScriptFilter = screen.getAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeJavaScriptFilter.length).toBe(1);
    
    const activeTypeScriptFilter = screen.getAllByText('TypeScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeTypeScriptFilter.length).toBe(1);
    
    const activeEasyFilter = screen.getAllByText('easy').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeEasyFilter.length).toBe(1);

    // Clear all filters
    fireEvent.click(screen.getByText('Clear all'));

    // Verify all active filters are removed (but filter buttons remain)
    const remainingJavaScriptActive = screen.queryAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(remainingJavaScriptActive.length).toBe(0);
    
    const remainingTypeScriptActive = screen.queryAllByText('TypeScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(remainingTypeScriptActive.length).toBe(0);
    
    const remainingEasyActive = screen.queryAllByText('easy').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(remainingEasyActive.length).toBe(0);

    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();

    // Verify callback was called with empty filters
    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      languages: [],
      difficulty: [],
      labels: [],
    });
  });

  it('updates filter state when clicked multiple times', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    
    // Add filter
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' }));
    const activeFilterSpans1 = screen.getAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeFilterSpans1.length).toBe(1);
    
    // Remove filter by clicking again
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' }));
    const activeFilterSpans2 = screen.queryAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeFilterSpans2.length).toBe(0);
    
    // Add filter again
    fireEvent.click(screen.getByRole('button', { name: 'JavaScript' }));
    const activeFilterSpans3 = screen.getAllByText('JavaScript').filter(el => 
      el.tagName.toLowerCase() === 'span' && 
      el.closest('span')?.classList.contains('rounded-full') &&
      el.closest('span')?.querySelector('[data-testid="x-icon"]')
    );
    expect(activeFilterSpans3.length).toBe(1);
  });

  it('shows correct visual state for selected filters', () => {
    render(<FilterBar onFiltersChange={mockOnFiltersChange} />);

    fireEvent.click(screen.getByText('Filters')); // Open the filter panel
    
    const javascriptButton = screen.getByRole('button', { name: 'JavaScript' });
    
    // Initially, the button should not have the selected class
    expect(javascriptButton).toHaveClass('bg-[#282828]');
    expect(javascriptButton).not.toHaveClass('bg-green-500');
    
    // Click to select the filter
    fireEvent.click(javascriptButton);
    
    // Now it should have the selected class
    expect(javascriptButton).toHaveClass('bg-green-500');
    expect(javascriptButton).not.toHaveClass('bg-[#282828]');
    
    // Click again to deselect
    fireEvent.click(javascriptButton);
    
    // Now it should have the unselected class again
    expect(javascriptButton).toHaveClass('bg-[#282828]');
    expect(javascriptButton).not.toHaveClass('bg-green-500');
  });
});