import React from 'react';
import { WatchedData } from './App';

export function WatchedMovie({
  movie,
  onRemove,
}: {
  movie: WatchedData;
  onRemove: (id: string) => void;
}) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} мин</span>
        </p>
      </div>
      <button onClick={() => onRemove(movie.imdbID)} className="btn-delete">
        X
      </button>
    </li>
  );
}
