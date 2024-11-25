import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar'; 
import IssuesList from './components/IssuesList';
import Favorites from './components/Favorites';
import './index.css';
import AnnouncementBar from './components/AnnouncementBar';

// Google Analytics
import { initializeGA, logPageView } from "./analytics";
import { useEffect } from 'react';

  
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#121212] text-white">
      <AnnouncementBar />
        <div className="flex min-h-screen bg-[#121212] text-white">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <PageTracker />
                <Route path="/" element={<IssuesList />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </main>
        </div>
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