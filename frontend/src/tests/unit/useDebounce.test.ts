import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../../hooks/useDebounce";

jest.useFakeTimers();

test("useDebounce updates value after delay", () => {
  const { result, rerender } = renderHook(
    ({ value }) => useDebounce(value, 300),
    { initialProps: { value: "a" } }
  );

  expect(result.current).toBe("a");

  rerender({ value: "ab" });

  act(() => {
    jest.advanceTimersByTime(300);
  });

  expect(result.current).toBe("ab");
});
