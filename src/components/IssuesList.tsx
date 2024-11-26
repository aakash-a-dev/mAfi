import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader } from 'lucide-react';
import { GitHubIssue } from '../types';
import IssueCard from './IssueCard';
import Pagination from './Pagination';
import { Filters } from './FilterBar';

interface GitHubSearchResponse {
  items: GitHubIssue[];
  total_count: number;
}

interface IssuesListProps {
  filters: Filters;
}

const ITEMS_PER_PAGE = 12;

function IssuesList({ filters }: IssuesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<GitHubSearchResponse>({
    queryKey: ['issues', currentPage],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/search/issues?q=label:"good first issue"+is:open&sort=created&order=desc&per_page=${ITEMS_PER_PAGE}&page=${currentPage}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch issues');
      }
      return response.json();
    },
  });

  const filterIssues = (issues: GitHubIssue[]) => {
    return issues.filter((issue) => {
      // Text search
      const matchesSearch = issue.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Language filter
      const matchesLanguage =
        filters.languages.length === 0 ||
        filters.languages.some((lang) =>
          issue.body?.toLowerCase().includes(lang.toLowerCase())
        );

      // Difficulty filter
      const matchesDifficulty =
        filters.difficulty.length === 0 ||
        filters.difficulty.some((diff) =>
          issue.labels.some((label) =>
            label.name.toLowerCase().includes(diff.toLowerCase())
          )
        );

      // Tech stack filter
      const matchesLabels =
        filters.labels.length === 0 ||
        filters.labels.some((tech) =>
          issue.labels.some(
            (label) => label.name.toLowerCase().includes(tech.toLowerCase())
          )
        );

      return matchesSearch && matchesLanguage && matchesDifficulty && matchesLabels;
    });
  };

  const filteredIssues = data?.items ? filterIssues(data.items) : [];
  const totalPages = Math.ceil((data?.total_count ?? 0) / ITEMS_PER_PAGE);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        <p>Error loading issues. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold whitespace-nowrap">Good First Issues</h1>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#282828] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredIssues.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No issues found.</p>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default IssuesList;