interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label htmlFor="search" style={{ marginRight: "8px" }}>
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search users..."
        style={{
          padding: "6px 8px",
          width: "220px",
        }}
      />
    </div>
  );
}
