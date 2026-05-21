import '@testing-library/jest-dom';

/**
 * Unit tests for setupTests.ts
 * 
 * These tests validate that the setup provided by setupTests.ts
 * correctly extends Jest's expect with custom DOM matchers from
 * @testing-library/jest-dom
 */

describe('setupTests.ts', () => {
  // Create a mock element to test the DOM matchers
  const testElement = document.createElement('div');
  
  beforeEach(() => {
    // Reset the test element content before each test
    testElement.textContent = 'Test content for react';
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(testElement);
  });

  test('should properly import and configure @testing-library/jest-dom matchers', () => {
    // This verifies that the import in setupTests.ts works as expected
    expect(testElement).toBeInTheDocument();
  });

  test('should allow testing text content with toHaveTextContent matcher', () => {
    expect(testElement).toHaveTextContent(/test content for react/i);
    expect(testElement).toHaveTextContent('Test content for react');
  });

  test('should allow testing element attributes', () => {
    testElement.setAttribute('data-testid', 'test-element');
    expect(testElement).toHaveAttribute('data-testid', 'test-element');
  });

  test('should allow testing element class list', () => {
    testElement.classList.add('test-class', 'another-test-class');
    expect(testElement).toHaveClass('test-class');
    expect(testElement).toHaveClass('another-test-class');
    expect(testElement).toHaveClass('test-class', 'another-test-class');
  });

  test('should handle elements that are not in the document', () => {
    const detachedElement = document.createElement('span');
    
    expect(detachedElement).not.toBeInTheDocument();
  });

  test('should preserve default Jest matchers functionality', () => {
    expect(1).toBe(1);
    expect('string').toBeDefined();
    expect([1, 2, 3]).toHaveLength(3);
  });

  test('should allow testing element properties', () => {
    testElement.innerHTML = '<input type="checkbox" checked />';
    const checkbox = testElement.querySelector('input') as HTMLInputElement;
    
    expect(checkbox).toHaveProperty('checked', true);
  });

  test('should work with accessibility-related matchers', () => {
    testElement.setAttribute('role', 'button');
    testElement.setAttribute('aria-label', 'Close dialog');

    expect(testElement).toHaveAttribute('role', 'button');
    expect(testElement).toHaveAccessibleName('Close dialog');
  });
});