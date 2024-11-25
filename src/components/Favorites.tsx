import { useState, useEffect } from 'react';
import { GitHubIssue } from '../types';
import IssueCard from './IssueCard';

function Favorites() {
  const [favorites, setFavorites] = useState<GitHubIssue[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Favorite Issues</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorite issues yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;