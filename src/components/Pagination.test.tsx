import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn()
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: mockOnPageChange,
  }

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('renders correctly with initial props', () => {
    render(<Pagination {...defaultProps} />)

    expect(screen.getAllByRole('button')[0]).toBeInTheDocument() // Previous button
    expect(screen.getAllByRole('button')[6]).toBeInTheDocument() // Next button

    // Check that page buttons 1-5 are rendered when there are more than 5 total pages
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }
  })

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0] // First button is previous
    expect(prevButton).toBeDisabled()
  })

  it('enables previous button when not on first page', () => {
    render(<Pagination {...defaultProps} currentPage={2} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0] // First button is previous
    expect(prevButton).not.toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={10} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[buttons.length - 1] // Last button is next
    expect(nextButton).toBeDisabled()
  })

  it('enables next button when not on last page', () => {
    render(<Pagination {...defaultProps} currentPage={9} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[buttons.length - 1] // Last button is next
    expect(nextButton).not.toBeDisabled()
  })

  it('calls onPageChange with previous page when previous button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={5} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0] // First button is previous
    fireEvent.click(prevButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(4)
  })

  it('calls onPageChange with next page when next button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={5} />)

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[buttons.length - 1] // Last button is next
    fireEvent.click(nextButton)

    expect(mockOnPageChange).toHaveBeenCalledWith(6)
  })

  it('calls onPageChange with specific page when page button is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />)

    const page3Button = screen.getByText('3')
    fireEvent.click(page3Button)

    expect(mockOnPageChange).toHaveBeenCalledWith(3)
  })

  it('highlights current page button', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('bg-green-500')
  })

  it('does not highlight non-current page buttons', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    const nonCurrentPageButton = screen.getByText('1')
    expect(nonCurrentPageButton).not.toHaveClass('bg-green-500')
    expect(nonCurrentPageButton).toHaveClass('bg-[#282828]')
  })

  it('renders correct page numbers when on first pages (1-3)', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    // Should show pages 1-5 when current page is 1
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.queryByText('6')).not.toBeInTheDocument()
  })

  it('renders correct page numbers when on last pages (total-2 to total)', () => {
    render(<Pagination {...defaultProps} currentPage={10} totalPages={10} />)

    // Should show pages 6-10 when on last page
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders correct page numbers when in middle pages', () => {
    render(<Pagination {...defaultProps} currentPage={5} />)

    // Should show pages 3-7 when current page is 5
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.queryByText('8')).not.toBeInTheDocument()
  })

  it('renders all pages when total pages is less than or equal to 5', () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={4} />)

    // Should show all pages 1-4 when total pages is 4
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.queryByText('5')).not.toBeInTheDocument()
  })

  it('uses min function correctly - shows no more than 5 pages even if total pages > 5', () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={20} />)

    // Should show only 5 pages even if total pages is 20
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.queryByText('6')).not.toBeInTheDocument()
  })

  it('handles edge case where totalPages is 1', () => {
    render(<Pagination {...defaultProps} currentPage={1} totalPages={1} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.queryByText('2')).not.toBeInTheDocument()
  })

  it('applies correct classes for current page button', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('bg-green-500')
    expect(currentPageButton).toHaveClass('text-white')
  })

  it('applies correct classes for non-current page button', () => {
    render(<Pagination {...defaultProps} currentPage={3} />)

    const nonCurrentPageButton = screen.getByText('1')
    expect(nonCurrentPageButton).toHaveClass('bg-[#282828]')
    expect(nonCurrentPageButton).toHaveClass('text-white')
    expect(nonCurrentPageButton).toHaveClass('hover:bg-[#333333]')
  })

  it('applies disabled attribute to disabled buttons', () => {
    render(<Pagination {...defaultProps} currentPage={1} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0] // First button is previous
    expect(prevButton).toHaveAttribute('disabled')
  })

  it('does not apply disabled attribute to enabled buttons', () => {
    render(<Pagination {...defaultProps} currentPage={2} />)

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0] // First button is previous
    expect(prevButton).not.toHaveAttribute('disabled')
  })
})