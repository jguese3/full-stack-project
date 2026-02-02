type GameSearchProps = {
    searchTerm: string;
    onSearchChange: (newTerm: string) => void;
}

export function GameSearch({ searchTerm, onSearchChange }: GameSearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    if (term.length <= 50) {
      onSearchChange(term);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search games..."
      value={searchTerm}
      onChange={handleChange}
      maxLength={50}
    />
  );
}