import { Link, useLocation } from 'react-router-dom';
import { Home, Star, Github } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 min-w-64 bg-black p-6 h-screen sticky top-0 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-8">
        <Github className="w-8 h-8 text-white" />
        <h1 className="text-xl font-bold">mAfi</h1>
      </div>

      <nav className="space-y-4">
        <Link
          to="/"
          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            location.pathname === '/'
              ? 'bg-[#282828] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          to="/favorites"
          className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
            location.pathname === '/favorites'
              ? 'bg-[#282828] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Star className="w-5 h-5" />
          <span>Favorites</span>
        </Link>
      </nav>
    </div>
  );
}