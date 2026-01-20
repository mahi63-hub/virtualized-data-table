import { render, screen } from "@testing-library/react";
import DataTable from "../../components/DataTable/DataTable";

jest.mock("../../hooks/useDataFetch", () => ({
  useDataFetch: () => ({
    data: [],
    totalCount: 0,
    isLoading: false,
    isError: false
  })
}));

test("DataTable renders empty state safely", async () => {
  render(<DataTable />);

  expect(
    await screen.findByText(/No data available/i)
  ).toBeInTheDocument();
});
