import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader } from 'lucide-react';
import { GitHubIssue } from '../types';
import IssueCard from './IssueCard';
import Pagination from './Pagination';

interface GitHubSearchResponse {
  items: GitHubIssue[];
  total_count: number;
}

const ITEMS_PER_PAGE = 12;

function IssuesList() {
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

  const filteredIssues = data?.items?.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

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
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Good First Issues</h1>
        <div className="relative w-full sm:w-96">
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
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
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