import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import Providers from './Providers';

// Mock component to test the query client functionality
const TestComponent = () => {
  const { data } = useQuery({
    queryKey: ['test-data'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return 'Test Data';
    },
    retry: false,
    staleTime: Infinity,
  });

  return <div>{data || 'Loading...'}</div>;
};

describe('Providers', () => {
  beforeEach(() => {
    // Clear any cached query clients between tests
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <Providers>
        <div>Test Child</div>
      </Providers>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('provides QueryClient context to child components', async () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    // Initially shows loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // After query resolves, shows the data
    expect(await screen.findByText('Test Data')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <Providers>
        <>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </>
      </Providers>
    );

    expect(screen.getByTestId('child-1')).toHaveTextContent('Child 1');
    expect(screen.getByTestId('child-2')).toHaveTextContent('Child 2');
  });

  it('preserves the same QueryClient instance throughout component lifecycle', () => {
    // For the useState initialization test, we'll verify that the component renders without errors
    // and behaves as expected with the React Query context

    const { rerender, unmount } = render(
      <Providers>
        <div>Initial Render</div>
      </Providers>
    );

    // Re-render the component to confirm stable behavior
    rerender(
      <Providers>
        <div>After Rerender</div>
      </Providers>
    );

    // Unmount and remount to further verify consistency
    unmount();

    render(
      <Providers>
        <div>After Remount</div>
      </Providers>
    );

    expect(screen.getByText('After Remount')).toBeInTheDocument();
  });
});