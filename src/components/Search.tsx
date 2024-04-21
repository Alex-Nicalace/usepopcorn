import React, { useEffect, useRef } from 'react';
import { useKey } from '../hooks/useKey';

export function Search({
  query,
  onChangeQuery,
}: {
  query: string;
  onChangeQuery: (value: string) => void;
}): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);

  useKey('Enter', function () {
    if (document.activeElement === inputRef.current) return;
    inputRef.current?.focus();
    onChangeQuery('');
  });

  useEffect(function () {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Поиск фильмов..."
      value={query}
      onChange={(e) => onChangeQuery(e.target.value)}
    />
  );
}
