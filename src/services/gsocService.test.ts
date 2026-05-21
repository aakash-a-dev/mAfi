import {
  TECH_STACKS,
  PROJECT_TYPES,
  YEARS,
  getFavoriteOrganizations,
  toggleFavorite,
  fetchOrganizations,
  fetchDeadlines,
  fetchOrganizationsByYear,
  searchOrganizations
} from './gsocService';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string): string | null {
      return store[key] || null;
    },

    setItem(key: string, value: string): void {
      store[key] = value.toString();
    },

    removeItem(key: string): void {
      delete store[key];
    },

    clear(): void {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('GSoC Service', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Constants', () => {
    it('should have TECH_STACKS defined', () => {
      expect(TECH_STACKS).toBeDefined();
      expect(Array.isArray(TECH_STACKS)).toBe(true);
      expect(TECH_STACKS.length).toBeGreaterThan(0);
    });

    it('should have PROJECT_TYPES defined', () => {
      expect(PROJECT_TYPES).toBeDefined();
      expect(Array.isArray(PROJECT_TYPES)).toBe(true);
      expect(PROJECT_TYPES.length).toBeGreaterThan(0);
    });

    it('should have YEARS defined', () => {
      expect(YEARS).toBeDefined();
      expect(Array.isArray(YEARS)).toBe(true);
      expect(YEARS.length).toBeGreaterThan(0);
    });
  });

  describe('getFavoriteOrganizations', () => {
    it('should return an empty array when no favorites are stored', () => {
      const favorites = getFavoriteOrganizations();
      expect(favorites).toEqual([]);
    });

    it('should return stored favorites', () => {
      localStorage.setItem('gsoc_favorite_organizations', JSON.stringify(['Org1', 'Org2']));
      const favorites = getFavoriteOrganizations();
      expect(favorites).toEqual(['Org1', 'Org2']);
    });

    it('should throw an error when JSON is malformed', () => {
      localStorage.setItem('gsoc_favorite_organizations', 'invalid json');
      expect(() => getFavoriteOrganizations()).toThrow(SyntaxError);
    });
  });

  describe('toggleFavorite', () => {
    it('should add organization to favorites if not present', () => {
      toggleFavorite('Test Org');
      const favorites = getFavoriteOrganizations();
      expect(favorites).toEqual(['Test Org']);
    });

    it('should remove organization from favorites if already present', () => {
      // Add to favorites first
      localStorage.setItem('gsoc_favorite_organizations', JSON.stringify(['Test Org']));
      expect(getFavoriteOrganizations()).toEqual(['Test Org']);

      // Remove from favorites
      toggleFavorite('Test Org');
      const favorites = getFavoriteOrganizations();
      expect(favorites).toEqual([]);
    });

    it('should handle multiple organizations correctly', () => {
      toggleFavorite('Org1');
      toggleFavorite('Org2');
      toggleFavorite('Org3');

      let favorites = getFavoriteOrganizations();
      expect(favorites).toEqual(['Org1', 'Org2', 'Org3']);

      // Remove middle one
      toggleFavorite('Org2');
      favorites = getFavoriteOrganizations();
      expect(favorites).toEqual(['Org1', 'Org3']);
    });
  });

  describe('fetchOrganizations', () => {
    it('should return organizations with correct structure', async () => {
      const organizations = await fetchOrganizations();
      
      expect(Array.isArray(organizations)).toBe(true);
      expect(organizations.length).toBeGreaterThan(0);
      
      const firstOrg = organizations[0];
      expect(firstOrg).toHaveProperty('name');
      expect(firstOrg).toHaveProperty('techStack');
      expect(firstOrg).toHaveProperty('projectType');
      expect(firstOrg).toHaveProperty('year');
      expect(firstOrg).toHaveProperty('description');
      expect(firstOrg).toHaveProperty('websiteUrl');
      expect(firstOrg).toHaveProperty('githubUrl');
      expect(firstOrg).toHaveProperty('isFavorite');
    });

    it('should mark favorite organizations correctly', async () => {
      localStorage.setItem('gsoc_favorite_organizations', JSON.stringify(['Wireshark', 'OWASP']));
      
      const organizations = await fetchOrganizations();
      const wireshark = organizations.find(org => org.name === 'Wireshark');
      const owasp = organizations.find(org => org.name === 'OWASP');
      const pandas = organizations.find(org => org.name === 'Pandas');
      
      expect(wireshark?.isFavorite).toBe(true);
      expect(owasp?.isFavorite).toBe(true);
      expect(pandas?.isFavorite).toBe(false);
    });

    it('should not mark organizations as favorite if not in storage', async () => {
      const organizations = await fetchOrganizations();
      const wireshark = organizations.find(org => org.name === 'Wireshark');
      
      expect(wireshark?.isFavorite).toBe(false);
    });
  });

  describe('fetchDeadlines', () => {
    it('should return deadlines with correct structure', async () => {
      const deadlines = await fetchDeadlines();
      
      expect(Array.isArray(deadlines)).toBe(true);
      expect(deadlines.length).toBeGreaterThan(0);
      
      const firstDeadline = deadlines[0];
      expect(firstDeadline).toHaveProperty('program');
      expect(firstDeadline).toHaveProperty('phase');
      expect(firstDeadline).toHaveProperty('date');
      expect(firstDeadline).toHaveProperty('description');
      expect(firstDeadline).toHaveProperty('url');
    });

    it('should return all defined deadlines', async () => {
      const deadlines = await fetchDeadlines();
      expect(deadlines.length).toBeGreaterThanOrEqual(6); // There are at least 6 sample deadlines
    });

    it('should have correct property values for deadlines', async () => {
      const deadlines = await fetchDeadlines();
      const gsoPhase = deadlines.find(d => d.phase === 'Organization Applications');
      
      expect(gsoPhase?.program).toBe('GSoC');
      expect(gsoPhase?.phase).toBe('Organization Applications');
      expect(gsoPhase?.date).toBe('2024-02-01');
      expect(gsoPhase?.description).toBe('Organizations can begin submitting applications to participate in GSoC 2024');
      expect(gsoPhase?.url).toBe('https://summerofcode.withgoogle.com/get-started');
    });
  });

  describe('fetchOrganizationsByYear', () => {
    it('should return organizations filtered by year', async () => {
      const organizations2024 = await fetchOrganizationsByYear(2024);
      const organizations2023 = await fetchOrganizationsByYear(2023);
      
      expect(organizations2024.every(org => org.year === 2024)).toBe(true);
      expect(organizations2023.every(org => org.year === 2023)).toBe(true);
      
      // Check that 2024 has more organizations than 2023
      expect(organizations2024.length).toBeGreaterThan(organizations2023.length);
    });

    it('should return empty array for non-existent year', async () => {
      const organizations = await fetchOrganizationsByYear(2000);
      expect(organizations).toEqual([]);
    });

    it('should preserve organization structure when filtering by year', async () => {
      const organizations2024 = await fetchOrganizationsByYear(2024);
      const firstOrg = organizations2024[0];
      
      expect(firstOrg).toHaveProperty('name');
      expect(firstOrg).toHaveProperty('techStack');
      expect(firstOrg).toHaveProperty('projectType');
      expect(firstOrg).toHaveProperty('year');
      expect(firstOrg).toHaveProperty('description');
      expect(firstOrg).toHaveProperty('websiteUrl');
      expect(firstOrg).toHaveProperty('githubUrl');
    });
  });

  describe('searchOrganizations', () => {
    it('should return all organizations when search query is empty', async () => {
      const allOrganizations = await fetchOrganizations();
      const searchResults = await searchOrganizations('');
      
      expect(searchResults.length).toBe(allOrganizations.length);
    });

    it('should find organizations by name', async () => {
      const results = await searchOrganizations('Pandas');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(org => org.name.includes('Pandas'))).toBe(true);
    });

    it('should find organizations by description', async () => {
      const results = await searchOrganizations('machine learning');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(org => org.description.toLowerCase().includes('machine learning'))).toBe(true);
    });

    it('should find organizations by tech stack', async () => {
      const results = await searchOrganizations('Python');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(org => org.techStack.includes('Python'))).toBe(true);
    });

    it('should find organizations by project type', async () => {
      const results = await searchOrganizations('Data Science');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(org => org.projectType === 'Data Science')).toBe(true);
    });

    it('should perform case-insensitive search', async () => {
      const uppercaseResults = await searchOrganizations('PANDAS');
      const lowercaseResults = await searchOrganizations('pandas');
      
      expect(uppercaseResults.length).toBeGreaterThanOrEqual(0);
      expect(lowercaseResults.length).toBeGreaterThanOrEqual(0);
      expect(uppercaseResults.length).toBe(lowercaseResults.length);
    });

    it('should handle partial matches', async () => {
      const results = await searchOrganizations('learn'); // Should match "learning" in "machine learning"
      expect(results.length).toBeGreaterThanOrEqual(0);
      expect(results.some(org => 
        org.description.toLowerCase().includes('learn') || 
        org.name.toLowerCase().includes('learn')
      )).toBe(true);
    });

    it('should return empty array for non-matching queries', async () => {
      const results = await searchOrganizations('nonexistentorganization');
      expect(results).toEqual([]);
    });
  });
});