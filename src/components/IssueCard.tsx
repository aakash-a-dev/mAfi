import { Star } from 'lucide-react';
import { GitHubIssue } from '../types';
import { useState, useEffect } from 'react';

interface IssueCardProps {
  issue: GitHubIssue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some((fav: GitHubIssue) => fav.id === issue.id));
  }, [issue.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: GitHubIssue) => fav.id !== issue.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, issue]));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-[#282828] p-4 rounded-lg hover:bg-[#333333] transition-colors h-full flex flex-col">
      <div className="flex justify-between items-start gap-2 sm:gap-4">
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate">
              {issue.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">by {issue.user.login}</p>
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          className={`p-1.5 sm:p-2 rounded-full hover:bg-[#404040] flex-shrink-0 ${
            isFavorite ? 'text-green-500' : 'text-gray-400'
          }`}
        >
          <Star className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 flex-grow">
        <p className="text-xs sm:text-sm text-gray-300 line-clamp-3">
          {issue.body || 'No description provided.'}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {issue.labels.map((label) => (
            <span
              key={label.name}
              className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full truncate max-w-full"
              style={{ backgroundColor: `#${label.color}` }}
            >
              {label.name}
            </span>
          ))}
        </div>
        <a
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-green-500 hover:text-green-400 text-xs sm:text-sm mt-2"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}