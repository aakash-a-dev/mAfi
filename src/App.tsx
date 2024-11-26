import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import IssuesList from './components/IssuesList';
import Favorites from './components/Favorites';
import AnnouncementBar from './components/AnnouncementBar';
import MobileNav from './components/MobileNav';
import './index.css';

// Google Analytics
import { initializeGA, logPageView } from "./analytics";
import FilterBar, { Filters } from './components/FilterBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  const [filters, setFilters] = useState<Filters>({
    languages: [],
    difficulty: [],
    labels: [],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-[#121212] text-white">
          <AnnouncementBar />
          <div className="flex flex-1">
            <Sidebar />
          <div className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <FilterBar onFiltersChange={setFilters} />
              <div className="pb-16 md:pb-8">
                <Routes>
                  <Route path="/" element={<IssuesList filters={filters} />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </div>
            </div>
          </div>
          </div>
          <MobileNav />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Don't touch this part it is for google analytics
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return null;
};

export default App;