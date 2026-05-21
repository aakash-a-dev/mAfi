import { describe, expect, test } from '@jest/globals';
import { Deadline, Organization, TechStack, ProjectType, Year } from './gsoc';

describe('GSoC Types', () => {
  describe('Deadline interface', () => {
    test('should have correct properties', () => {
      const deadline: Deadline = {
        program: 'GSoC',
        phase: 'Community Bonding',
        date: '2023-04-24',
        description: 'Students get to know their mentors and community',
        url: 'https://example.com/deadline'
      };

      expect(deadline.program).toBeDefined();
      expect(deadline.phase).toBeDefined();
      expect(deadline.date).toBeDefined();
      expect(deadline.description).toBeDefined();
      expect(deadline.url).toBeDefined();
    });

    test('program property should accept only GSoC or Outreachy', () => {
      const gsocDeadline: Deadline = {
        program: 'GSoC',
        phase: 'Phase 1',
        date: '2023-01-01',
        description: 'Test deadline',
        url: 'https://example.com'
      };

      const outreachyDeadline: Deadline = {
        program: 'Outreachy',
        phase: 'Phase 1',
        date: '2023-01-01',
        description: 'Test deadline',
        url: 'https://example.com'
      };

      expect(gsocDeadline.program).toBe('GSoC');
      expect(outreachyDeadline.program).toBe('Outreachy');
    });

    test('should validate required properties', () => {
      const deadline: Deadline = {
        program: 'GSoC',
        phase: 'Community Bonding',
        date: '2023-04-24',
        description: 'Students get to know their mentors and community',
        url: 'https://example.com/deadline'
      };

      expect(typeof deadline.program).toBe('string');
      expect(typeof deadline.phase).toBe('string');
      expect(typeof deadline.date).toBe('string');
      expect(typeof deadline.description).toBe('string');
      expect(typeof deadline.url).toBe('string');
    });
  });

  describe('Organization interface', () => {
    test('should have correct properties', () => {
      const organization: Organization = {
        name: 'Example Org',
        techStack: ['TypeScript', 'React'],
        projectType: 'Web Development',
        year: 2023,
        description: 'An example organization',
        websiteUrl: 'https://example.com',
        githubUrl: 'https://github.com/example',
        isFavorite: true
      };

      expect(organization.name).toBeDefined();
      expect(organization.techStack).toBeDefined();
      expect(organization.projectType).toBeDefined();
      expect(organization.year).toBeDefined();
      expect(organization.description).toBeDefined();
      expect(organization.websiteUrl).toBeDefined();
      expect(organization.githubUrl).toBeDefined();
      // isFavorite is optional, so it may or may not be defined
    });

    test('isFavorite property should be optional', () => {
      const organizationWithoutFavorite: Organization = {
        name: 'Example Org',
        techStack: ['TypeScript', 'React'],
        projectType: 'Web Development',
        year: 2023,
        description: 'An example organization',
        websiteUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
        // isFavorite is intentionally omitted to test optionality
      };

      const organizationWithFavorite: Organization = {
        name: 'Example Org 2',
        techStack: ['Python', 'Django'],
        projectType: 'Backend Development',
        year: 2023,
        description: 'Another example organization',
        websiteUrl: 'https://example2.com',
        githubUrl: 'https://github.com/example2',
        isFavorite: true
      };

      expect(organizationWithoutFavorite.name).toBeDefined();
      expect(organizationWithFavorite.isFavorite).toBeDefined();
    });

    test('should validate required properties', () => {
      const organization: Organization = {
        name: 'Example Org',
        techStack: ['TypeScript', 'React'],
        projectType: 'Web Development',
        year: 2023,
        description: 'An example organization',
        websiteUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      };

      expect(typeof organization.name).toBe('string');
      expect(Array.isArray(organization.techStack)).toBe(true);
      expect(typeof organization.projectType).toBe('string');
      expect(typeof organization.year).toBe('number');
      expect(typeof organization.description).toBe('string');
      expect(typeof organization.websiteUrl).toBe('string');
      expect(typeof organization.githubUrl).toBe('string');
    });

    test('techStack should be an array of strings', () => {
      const organization: Organization = {
        name: 'Example Org',
        techStack: ['JavaScript', 'TypeScript', 'React'],
        projectType: 'Full Stack',
        year: 2023,
        description: 'An example organization',
        websiteUrl: 'https://example.com',
        githubUrl: 'https://github.com/example'
      };

      expect(Array.isArray(organization.techStack)).toBe(true);
      organization.techStack.forEach(tech => {
        expect(typeof tech).toBe('string');
      });
    });
  });

  // Note: These tests for type aliases check that they can be imported correctly
  // Since they are type aliases, runtime validation is limited
  describe('Type Aliases', () => {
    test('should allow using TechStack type', () => {
      // This test verifies that the type is properly exported
      // Actual values depend on the imported constants from gsocService
      // which we can't directly test here without importing the service
      const techStackValue: TechStack | undefined = undefined;
      expect(techStackValue).toBeUndefined(); // Just ensuring the type can be used
    });

    test('should allow using ProjectType type', () => {
      const projectTypeValue: ProjectType | undefined = undefined;
      expect(projectTypeValue).toBeUndefined(); // Just ensuring the type can be used
    });

    test('should allow using Year type', () => {
      const yearValue: Year | undefined = undefined;
      expect(yearValue).toBeUndefined(); // Just ensuring the type can be used
    });
  });
});