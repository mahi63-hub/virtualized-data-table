interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label htmlFor="search-input">
        Search users
      </label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type to filter users"
        aria-label="Search users"
        style={{
          marginLeft: "8px",
          padding: "6px 8px",
          width: "240px",
        }}
      />
    </div>
  );
}
