import { useEffect, useRef, useState } from 'react';
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

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export type MovieData = (typeof tempMovieData)[0];
export interface WatchedData extends MovieData {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export const KEY = 'ccefd89c';

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(2);

export default function App() {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [watched, setWatched] = useState<WatchedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef<NodeJS.Timeout>();
  // const tempQuery = 'interstellar';

  // console.log('RENDER');
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

  useEffect(() => {
    const controller = new AbortController();
    let isIgnore = false;
    clearTimeout(ref.current);
    ref.current = setTimeout(async function () {
      if (!query) {
        setMovies([]);
        setError('');
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        console.log('SEARCH');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();

        if (data.Response === 'False') throw new Error('Movie not found!');

        if (!isIgnore) {
          setMovies(data.Search);
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            console.error(error.message);
            setError(error.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => {
      isIgnore = true;
      controller.abort();
    };
  }, [query]);

  function handleChangeQuery(query: string) {
    setQuery(query);
    handleCloseMovie();
    // fetchListMoviesDebounced(query);
  }

  /* async function fetchListMovies(query: string) {
    if (!query) {
      setMovies([]);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      console.log('SEARCH');

      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const data = await res.json();

      if (data.Response === 'False') throw new Error('Movie not found!');

      setMovies(data.Search);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        throw error;
      }
    } finally {
      setIsLoading(false);
    }
  }

  const fetchListMoviesDebounced = useDebounce(fetchListMovies, 500); */

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
