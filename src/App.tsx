import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataTable from './components/DataTable/DataTable';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">User Directory</h1>
          <DataTable />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
