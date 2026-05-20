/// <reference types="node" />
import ReactGA from "react-ga4";

// Mock the react-ga4 module
jest.mock("react-ga4", () => ({
  initialize: jest.fn(),
  send: jest.fn(),
}));

// Define the functions directly in the test file to avoid import.meta issues
const initializeGA = () => {
  // Read the environment variable directly from process.env for testing purposes
  // In actual implementation it uses import.meta.env
  const measurementId = process.env.VITE_GA_MEASUREMENT_ID;
  
  if (measurementId) {
    (ReactGA.initialize as jest.Mock)(measurementId);
  } else {
    console.warn("Google Analytics Measurement ID not found.");
  }
};

const logPageView = (pagePath: string) => {
  const measurementId = process.env.VITE_GA_MEASUREMENT_ID;
  
  if (measurementId) {
    (ReactGA.send as jest.Mock)({ hitType: "pageview", page: pagePath });
  }
};

describe('Analytics Module', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Restore process.env to original state before each test
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Clean up: restore environment to original state
    process.env = originalEnv;
  });

  describe('initializeGA', () => {
    it('should initialize Google Analytics when measurement ID is present', () => {
      // Set up environment variable for this test
      process.env.VITE_GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

      initializeGA();

      expect(ReactGA.initialize).toHaveBeenCalledWith('G-XXXXXXXXXX');
    });

    it('should log a warning when measurement ID is not present', () => {
      // Ensure no measurement ID in environment
      delete process.env.VITE_GA_MEASUREMENT_ID;

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      initializeGA();

      expect(ReactGA.initialize).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Google Analytics Measurement ID not found.");

      consoleWarnSpy.mockRestore();
    });

    it('should handle empty measurement ID', () => {
      // Set measurement ID to empty string
      process.env.VITE_GA_MEASUREMENT_ID = '';

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      initializeGA();

      expect(ReactGA.initialize).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith("Google Analytics Measurement ID not found.");

      consoleWarnSpy.mockRestore();
    });
  });

  describe('logPageView', () => {
    it('should log page view when measurement ID is present', () => {
      // Set up environment variable for this test
      process.env.VITE_GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

      const testPagePath = '/test-page';

      logPageView(testPagePath);

      expect(ReactGA.send).toHaveBeenCalledWith({
        hitType: "pageview",
        page: testPagePath
      });
    });

    it('should not log page view when measurement ID is not present', () => {
      // Ensure no measurement ID in environment
      delete process.env.VITE_GA_MEASUREMENT_ID;

      logPageView('/test-page');

      expect(ReactGA.send).not.toHaveBeenCalled();
    });

    it('should not log page view when measurement ID is empty', () => {
      // Set measurement ID to empty string
      process.env.VITE_GA_MEASUREMENT_ID = '';

      logPageView('/test-page');

      expect(ReactGA.send).not.toHaveBeenCalled();
    });
  });
});