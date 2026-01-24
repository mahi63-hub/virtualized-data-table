import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataTable from "./components/DataTable/DataTable";
import { useDataFetch } from "./hooks/useDataFetch";

const queryClient = new QueryClient();

function TableWrapper() {
  const { data = [], isLoading, isError } = useDataFetch(1, 10);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return <DataTable data={data} />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TableWrapper />
    </QueryClientProvider>
  );
}
