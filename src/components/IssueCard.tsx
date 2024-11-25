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
    <div className="bg-[#282828] p-4 md:p-6 rounded-lg hover:bg-[#333333] transition-colors h-full flex flex-col">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center space-x-3 min-w-0">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-semibold truncate">
              {issue.title}
            </h3>
            <p className="text-sm text-gray-400 truncate">by {issue.user.login}</p>
          </div>
        </div>
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full hover:bg-[#404040] flex-shrink-0 ${
            isFavorite ? 'text-green-500' : 'text-gray-400'
          }`}
        >
          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="mt-4 space-y-3 flex-grow">
        <p className="text-sm text-gray-300 line-clamp-3">
          {issue.body || 'No description provided.'}
        </p>
        <div className="flex flex-wrap gap-2">
          {issue.labels.map((label) => (
            <span
              key={label.name}
              className="px-2 py-1 text-xs rounded-full truncate max-w-full"
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
          className="inline-block text-green-500 hover:text-green-400 text-sm mt-2"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}