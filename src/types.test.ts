import { GitHubIssue, Repository } from './types';

// Mock data that conforms to the interfaces
const mockGitHubIssue: GitHubIssue = {
  id: 123,
  html_url: 'https://github.com/example/repo/issues/1',
  title: 'Test Issue',
  state: 'open',
  created_at: '2023-01-01T00:00:00Z',
  body: 'This is a test issue',
  repository_url: 'https://github.com/example/repo',
  labels: [
    {
      name: 'bug',
      color: 'ff0000'
    }
  ],
  user: {
    login: 'testuser',
    avatar_url: 'https://avatars.githubusercontent.com/u/123'
  }
};

const mockRepository: Repository = {
  name: 'test-repo',
  full_name: 'owner/test-repo',
  description: 'A test repository',
  html_url: 'https://github.com/owner/test-repo',
  language: 'TypeScript',
  stargazers_count: 42
};

describe('GitHubIssue Type', () => {
  it('should match the expected structure', () => {
    expect(mockGitHubIssue).toHaveProperty('id');
    expect(typeof mockGitHubIssue.id).toBe('number');
    
    expect(mockGitHubIssue).toHaveProperty('html_url');
    expect(typeof mockGitHubIssue.html_url).toBe('string');
    
    expect(mockGitHubIssue).toHaveProperty('title');
    expect(typeof mockGitHubIssue.title).toBe('string');
    
    expect(mockGitHubIssue).toHaveProperty('state');
    expect(typeof mockGitHubIssue.state).toBe('string');
    
    expect(mockGitHubIssue).toHaveProperty('created_at');
    expect(typeof mockGitHubIssue.created_at).toBe('string');
    
    expect(mockGitHubIssue).toHaveProperty('body');
    expect(typeof mockGitHubIssue.body).toBe('string');
    
    expect(mockGitHubIssue).toHaveProperty('repository_url');
    expect(typeof mockGitHubIssue.repository_url).toBe('string');
    
    expect(mockGitHubIssue).toHaveProperty('labels');
    expect(Array.isArray(mockGitHubIssue.labels)).toBe(true);
    
    if (mockGitHubIssue.labels.length > 0) {
      expect(mockGitHubIssue.labels[0]).toHaveProperty('name');
      expect(typeof mockGitHubIssue.labels[0].name).toBe('string');
      
      expect(mockGitHubIssue.labels[0]).toHaveProperty('color');
      expect(typeof mockGitHubIssue.labels[0].color).toBe('string');
    }
    
    expect(mockGitHubIssue).toHaveProperty('user');
    expect(mockGitHubIssue.user).toHaveProperty('login');
    expect(typeof mockGitHubIssue.user.login).toBe('string');
    
    expect(mockGitHubIssue.user).toHaveProperty('avatar_url');
    expect(typeof mockGitHubIssue.user.avatar_url).toBe('string');
  });

  it('should accept valid GitHubIssue object', () => {
    // This test verifies that our type definition accepts valid data
    const validIssue: GitHubIssue = {
      id: 999,
      html_url: 'https://github.com/valid/repo/issues/999',
      title: 'Valid Issue',
      state: 'closed',
      created_at: '2023-02-01T12:00:00Z',
      body: 'Valid issue body',
      repository_url: 'https://github.com/valid/repo',
      labels: [
        { name: 'enhancement', color: '00ff00' },
        { name: 'documentation', color: 'ffff00' }
      ],
      user: {
        login: 'validuser',
        avatar_url: 'https://avatars.githubusercontent.com/u/456'
      }
    };

    expect(validIssue.id).toBe(999);
    expect(validIssue.title).toBe('Valid Issue');
    expect(validIssue.labels.length).toBe(2);
  });
});

describe('Repository Type', () => {
  it('should match the expected structure', () => {
    expect(mockRepository).toHaveProperty('name');
    expect(typeof mockRepository.name).toBe('string');
    
    expect(mockRepository).toHaveProperty('full_name');
    expect(typeof mockRepository.full_name).toBe('string');
    
    expect(mockRepository).toHaveProperty('description');
    expect(typeof mockRepository.description).toBe('string');
    
    expect(mockRepository).toHaveProperty('html_url');
    expect(typeof mockRepository.html_url).toBe('string');
    
    expect(mockRepository).toHaveProperty('language');
    expect(typeof mockRepository.language).toBe('string');
    
    expect(mockRepository).toHaveProperty('stargazers_count');
    expect(typeof mockRepository.stargazers_count).toBe('number');
  });

  it('should accept valid Repository object', () => {
    // This test verifies that our type definition accepts valid data
    const validRepo: Repository = {
      name: 'valid-repo',
      full_name: 'owner/valid-repo',
      description: 'A valid repository',
      html_url: 'https://github.com/owner/valid-repo',
      language: 'JavaScript',
      stargazers_count: 100
    };

    expect(validRepo.name).toBe('valid-repo');
    expect(validRepo.language).toBe('JavaScript');
    expect(validRepo.stargazers_count).toBe(100);
  });
});