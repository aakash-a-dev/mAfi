export interface GitHubIssue {
    id: number;
    html_url: string;
    title: string;
    state: string;
    created_at: string;
    body: string;
    repository_url: string;
    labels: Array<{
      name: string;
      color: string;
    }>;
    user: {
      login: string;
      avatar_url: string;
    };
  }
  
  export interface Repository {
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
  }