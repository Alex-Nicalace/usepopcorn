import React from 'react';
import { WatchedData } from './App';
import { WatchedMovie } from './WatchedMovie';

export function WatchedMoviesList({
  watched,
  onRemove,
}: {
  watched: WatchedData[];
  onRemove: (id: string) => void;
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onRemove={onRemove} />
      ))}
    </ul>
  );
}
