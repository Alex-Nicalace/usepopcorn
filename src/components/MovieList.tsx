import React from 'react';
import { MovieData } from './App';
import { Movie } from './Movie';

export function MovieList({
  movies,
  onSelectMovie,
}: {
  movies: MovieData[];
  onSelectMovie: (id: string) => void;
}): JSX.Element {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie onSelectMovie={onSelectMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
