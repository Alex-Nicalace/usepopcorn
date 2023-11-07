import React from 'react';
import { MovieData } from './App';

export function Movie({
  movie: { imdbID, Title, Year, Poster },
  onSelectMovie,
}: {
  movie: MovieData;
  onSelectMovie: (id: string) => void;
}): JSX.Element {
  return (
    <li onClick={() => onSelectMovie(imdbID)} key={imdbID}>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  );
}
