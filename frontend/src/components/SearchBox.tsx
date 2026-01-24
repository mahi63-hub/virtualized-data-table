import { useState } from "react";

type Props = {
  onSearch?: (value: string) => void;
};

export default function SearchBox({ onSearch }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onSearch === "function") {
      onSearch(e.target.value);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleChange}
      className="search-input"
    />
  );
}
