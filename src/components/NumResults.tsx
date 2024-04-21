import React from 'react';
import { MovieData } from './App';

export function NumResults({ movies }: { movies: MovieData[] }): JSX.Element {
  return (
    <p className="num-results">
      Найдено <strong>{movies.length}</strong> позиций
    </p>
  );
}
