import { useCallback, useState } from 'react';
import { Loader } from './Loader';
import { LoadingError } from './LoadingError';
import { NavBar } from './NavBar';
import { Search } from './Search';
import { Logo } from './Logo';
import { NumResults } from './NumResults';
import { Main } from './Main';
import { Box } from './Box';
import { MovieList } from './MovieList';
import { MovieDetails } from './MovieDetails';
import { WatchedSummary } from './WatchedSummary';
import { WatchedMoviesList } from './WatchedMoviesList';
import useData from '../hooks/useData';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export type MovieData = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export interface WatchedData extends MovieData {
  runtime: number;
  imdbRating: number;
  userRating: number;
  countRatingDecisions: number;
}

export const KEY = 'ccefd89c';

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);

export default function App() {
  const [watched, setWatched] = useLocalStorageState<WatchedData[]>(
    'watched',
    []
  );
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const {
    data: movies,
    error,
    isLoading,
  } = useData<MovieData[]>(
    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
    [],
    500,
    'Search',
    query.length < 3
  );

  const userRatingSelectedMovie = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAddWatchedMovies(movie: WatchedData) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteWatchedMovies(id: string) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  function handleSelectMovie(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleChangeQuery = useCallback(function (query: string) {
    setQuery(query);
    handleCloseMovie();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onChangeQuery={handleChangeQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <LoadingError message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              havingRating={userRatingSelectedMovie}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovies={handleAddWatchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemove={handleDeleteWatchedMovies}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
