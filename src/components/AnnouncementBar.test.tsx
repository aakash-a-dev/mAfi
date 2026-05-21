import { render, screen } from '@testing-library/react';
import AnnouncementBar from './AnnouncementBar';

describe('AnnouncementBar', () => {
  it('renders without crashing', () => {
    render(<AnnouncementBar />);
    expect(screen.getByText(/We're building/)).toBeInTheDocument();
  });

  it('displays the rocket emoji', () => {
    render(<AnnouncementBar />);
    const rocketEmoji = screen.getByLabelText('rocket');
    expect(rocketEmoji).toBeInTheDocument();
    expect(rocketEmoji).toHaveTextContent('🚀');
  });

  it('has correct text content', () => {
    render(<AnnouncementBar />);
    const textElement = screen.getByText("We're building");
    expect(textElement).toBeInTheDocument();
    // The text itself doesn't have font-medium class, but its parent div does
    const parentDiv = textElement.closest('div');
    expect(parentDiv).toHaveClass('font-medium');
  });

  it('has proper background styling', () => {
    render(<AnnouncementBar />);
    // Get the outer container div by its unique class combination
    const container = screen.getByText(/We're building/).closest('div.bg-gradient-to-r');
    expect(container).toHaveClass('bg-gradient-to-r', 'from-[#1a1a1a]', 'to-[#282828]');
  });

  it('has proper text styling', () => {
    render(<AnnouncementBar />);
    const container = screen.getByText(/We're building/).closest('div.bg-gradient-to-r');
    expect(container).toHaveClass('text-white');
  });

  it('renders with correct layout structure', () => {
    render(<AnnouncementBar />);

    // Check that the main container has the correct classes
    const container = screen.getByText(/We're building/).closest('div.bg-gradient-to-r');
    expect(container).toHaveClass('bg-gradient-to-r', 'w-screen', 'from-[#1a1a1a]', 'to-[#282828]');

    // Check that the inner container is centered
    const innerContainer = screen.getByText(/We're building/).closest('div');
    expect(innerContainer).toHaveClass('text-center');
  });

  it('has proper accessibility attributes', () => {
    render(<AnnouncementBar />);
    const rocketElement = screen.getByLabelText('rocket');
    expect(rocketElement).toHaveAttribute('role', 'img');
    expect(rocketElement).toHaveAttribute('aria-label', 'rocket');
  });

  it('contains the span with inline-flex items-center gap-1.5', () => {
    render(<AnnouncementBar />);
    // Find the span that contains both the emoji and text
    const announcementSpan = screen.getByText((content, element) => {
      return content.includes("We're building") &&
             element?.tagName.toLowerCase() === 'span' &&
             element?.className.includes('inline-flex');
    }) as HTMLElement;

    expect(announcementSpan).toBeInTheDocument();
    expect(announcementSpan).toHaveClass('inline-flex', 'items-center', 'gap-1.5');
  });
});