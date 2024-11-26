import { Link, useLocation } from 'react-router-dom';
import { Home, Star } from 'lucide-react';

export default function MobileNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-[#282828] md:hidden">
      <nav className="flex justify-around items-center max-w-7xl mx-auto px-4 py-3">
        <Link
          to="/"
          className={`flex flex-col items-center space-y-1 transition-colors ${
            location.pathname === '/' ? 'text-green-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          to="/favorites"
          className={`flex flex-col items-center space-y-1 transition-colors ${
            location.pathname === '/favorites' ? 'text-green-500' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Star className="w-6 h-6" />
          <span className="text-xs font-medium">Favorites</span>
        </Link>
      </nav>
    </div>
  );
}