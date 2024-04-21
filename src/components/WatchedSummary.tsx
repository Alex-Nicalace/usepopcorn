import React from 'react';
import { WatchedData, average } from './App';

export function WatchedSummary({ watched }: { watched: WatchedData[] }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Фильмы, которые вы смотрели</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} фильма</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} мин</span>
        </p>
      </div>
    </div>
  );
}
