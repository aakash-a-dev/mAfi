import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import IssuesList from './components/IssuesList';
import Favorites from './components/Favorites';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-screen bg-[#121212] text-white">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<IssuesList />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;