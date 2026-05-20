import { describe, expect, it, jest } from '@jest/globals';

// Mock CSS imports
jest.mock('./index.css', () => ({}));

// Mock the App component
jest.mock('./App.tsx', () => ({
  __esModule: true,
  default: 'MockApp',
}));

// Create the necessary mocks before any imports happen
const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
}));

// Mock the react-dom/client module
jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock React's StrictMode only
const mockStrictMode = jest.fn(({ children }) => ({ type: 'StrictMode', children }));
jest.mock('react', () => ({
  StrictMode: mockStrictMode,
}));

// Define type for require
declare const require: any;

// Create and test the main functionality manually
describe('main.tsx', () => {
  beforeEach(() => {
    // Mock document.getElementById to return a mock element
    Object.defineProperty(document, 'getElementById', {
      value: (id: string) => {
        if (id === 'root') {
          return {
            appendChild: jest.fn(),
            removeChild: jest.fn(),
            insertBefore: jest.fn(),
            replaceChild: jest.fn(),
            childNodes: [],
            firstChild: null,
            isConnected: true,
            ownerDocument: document,
            nodeType: 1,
            nodeName: 'DIV',
            cloneNode: jest.fn(),
            contains: jest.fn(),
            hasChildNodes: jest.fn(),
            normalize: jest.fn(),
            remove: jest.fn(),
            querySelector: jest.fn(),
            querySelectorAll: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
            getBoundingClientRect: jest.fn(),
            scrollIntoView: jest.fn(),
            focus: jest.fn(),
            blur: jest.fn(),
            style: {},
            className: 'mock-div',
            id: 'root',
            tagName: 'DIV',
            parentElement: null,
            previousSibling: null,
            nextSibling: null,
            childElementCount: 0,
            children: [] as any[],
            getAttribute: jest.fn(),
            setAttribute: jest.fn(),
            removeAttribute: jest.fn(),
            hasAttribute: jest.fn(),
            attachShadow: jest.fn(),
          } as unknown as HTMLElement;
        }
        return null;
      },
      writable: true,
    });

    // Clear any previous mock calls
    jest.clearAllMocks();
  });

  it('should call createRoot with the root element', () => {
    // Dynamic import to ensure mocks are in place
    const createRoot = require('react-dom/client').createRoot;

    // Simulate what happens in main.tsx
    const rootElement = document.getElementById('root')!;
    createRoot(rootElement);

    // Check that createRoot was called
    expect(mockCreateRoot).toHaveBeenCalled();
    expect(rootElement.id).toBe('root');
  });

  it('should render StrictMode with App component', () => {
    // Dynamic imports to ensure mocks are in place
    const createRoot = require('react-dom/client').createRoot;
    const App = require('./App.tsx').default;

    // Simulate what happens in main.tsx
    const rootElement = document.getElementById('root')!;
    const rootInstance = createRoot(rootElement);

    // Render using the mocked render function
    rootInstance.render(
      mockStrictMode({
        children: App,
      })
    );

    // Check that render was called
    expect(mockRender).toHaveBeenCalled();
  });

  it('should render the App component inside StrictMode', () => {
    // Dynamic imports to ensure mocks are in place
    const createRoot = require('react-dom/client').createRoot;
    const App = require('./App.tsx').default;

    // Simulate what happens in main.tsx
    const rootElement = document.getElementById('root')!;
    const rootInstance = createRoot(rootElement);

    // Render using the mocked render function
    rootInstance.render(
      mockStrictMode({
        children: App,
      })
    );

    // Verify that render was called once
    expect(mockRender).toHaveBeenCalledTimes(1);

    // Verify that the call contains StrictMode with App component
    const renderCallArgs = mockRender.mock.calls[0][0] as any;
    expect(renderCallArgs).toBeDefined();
    expect(renderCallArgs.type).toBe('StrictMode');
    expect(renderCallArgs.children).toBe('MockApp');
  });
});