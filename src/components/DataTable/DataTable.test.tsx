import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataTable from './DataTable';
import { useDataFetch } from '../../hooks/useDataFetch';
import { vi } from 'vitest';

vi.mock('../../hooks/useDataFetch');

const mockUseDataFetch = useDataFetch as unknown as ReturnType<typeof vi.fn>;

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('DataTable Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseDataFetch.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isFetching: true,
    });

    renderWithClient(<DataTable />);
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseDataFetch.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetching: false,
    });

    renderWithClient(<DataTable />);
    expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
  });

  // Simple rendering test; complex tests need full layout mocking for virtualization
  it('renders search input and table headers', () => {
    mockUseDataFetch.mockReturnValue({
      data: { data: [], totalCount: 0 },
      isLoading: false,
      isError: false,
      isFetching: false,
    });

    renderWithClient(<DataTable />);
    expect(screen.getByPlaceholderText(/Search users.../i)).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
