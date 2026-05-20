import { render, screen, fireEvent } from '@testing-library/react';
import { LabelSelector } from './LabelSelector';

describe('LabelSelector', () => {
  const mockSelectedLabel = 'bug';
  const mockSetSelectedLabel = jest.fn();

  beforeEach(() => {
    mockSetSelectedLabel.mockClear();
  });

  it('renders the select element with correct options', () => {
    render(
      <LabelSelector 
        selectedLabel={mockSelectedLabel} 
        setSelectedLabel={mockSetSelectedLabel} 
      />
    );

    // Check if the select element is rendered
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Check if all the label options are present
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(9); // 9 predefined labels

    // Check if specific options exist
    expect(screen.getByRole('option', { name: 'Good First Issue' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Bug' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Documentation' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Duplicate' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Enhancement' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Help Wanted' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Invalid' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Question' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Wontfix' })).toBeInTheDocument();
  });

  it('displays the correct selected option initially', () => {
    render(
      <LabelSelector 
        selectedLabel={mockSelectedLabel} 
        setSelectedLabel={mockSetSelectedLabel} 
      />
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue(mockSelectedLabel);
  });

  it('calls setSelectedLabel with the correct value when selection changes', () => {
    render(
      <LabelSelector 
        selectedLabel={mockSelectedLabel} 
        setSelectedLabel={mockSetSelectedLabel} 
      />
    );

    const selectElement = screen.getByRole('combobox');
    
    // Change selection to 'enhancement'
    fireEvent.change(selectElement, { target: { value: 'enhancement' } });
    
    // Verify that setSelectedLabel was called with the correct value
    expect(mockSetSelectedLabel).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedLabel).toHaveBeenCalledWith('enhancement');

    // Change selection to 'invalid'
    fireEvent.change(selectElement, { target: { value: 'invalid' } });
    
    // Verify that setSelectedLabel was called again with the correct value
    expect(mockSetSelectedLabel).toHaveBeenCalledTimes(2);
    expect(mockSetSelectedLabel).toHaveBeenCalledWith('invalid');
  });

  it('maintains the correct selected value after updates', () => {
    const { rerender } = render(
      <LabelSelector 
        selectedLabel={mockSelectedLabel} 
        setSelectedLabel={mockSetSelectedLabel} 
      />
    );

    // Initially selected value should be 'bug'
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('bug');

    // Rerender with a different selected value
    rerender(<LabelSelector selectedLabel="documentation" setSelectedLabel={mockSetSelectedLabel} />);
    
    // Selected value should now be 'documentation'
    expect(selectElement).toHaveValue('documentation');
  });

  it('applies correct CSS classes to the select element', () => {
    render(
      <LabelSelector 
        selectedLabel={mockSelectedLabel} 
        setSelectedLabel={mockSetSelectedLabel} 
      />
    );

    const selectElement = screen.getByRole('combobox');
    
    // Check for some of the applied CSS classes
    expect(selectElement).toHaveClass('appearance-none');
    expect(selectElement).toHaveClass('bg-[#282828]');
    expect(selectElement).toHaveClass('text-white');
    expect(selectElement).toHaveClass('rounded-lg');
    expect(selectElement).toHaveClass('pl-4');
    expect(selectElement).toHaveClass('pr-10');
    expect(selectElement).toHaveClass('py-2.5');
    expect(selectElement).toHaveClass('text-sm');
    expect(selectElement).toHaveClass('focus:outline-none');
    expect(selectElement).toHaveClass('focus:ring-2');
    expect(selectElement).toHaveClass('focus:ring-green-500');
    expect(selectElement).toHaveClass('cursor-pointer');
  });

  it('renders the ChevronDown icon', () => {
    const { container } = render(
      <LabelSelector
        selectedLabel={mockSelectedLabel}
        setSelectedLabel={mockSetSelectedLabel}
      />
    );

    // Find the SVG with the distinctive ChevronDown class
    const chevronSvg = container.querySelector('svg.lucide-chevron-down');
    expect(chevronSvg).toBeInTheDocument();
  });
});