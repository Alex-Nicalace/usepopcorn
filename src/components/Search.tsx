import React from 'react';

export function Search({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}): JSX.Element {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onChangeQuery(e.target.value)}
    />
  );
}
