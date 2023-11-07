import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import useData from './hooks/useData';
import { Loader } from './Loader';
import { LoadingError } from './LoadingError';
import { WatchedData, KEY } from './App';

type MovieDetailsData = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: number;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
  imdbID: string;
};
export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatchedMovies,
  havingRating,
}: {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatchedMovies: (movie: WatchedData) => void;
  havingRating: number | undefined;
}) {
  // const [movie, setMovie] = useState<MovieDetailsData>({} as MovieDetailsData);
  const {
    data: movie,
    error,
    isLoading,
  } = useData(
    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
    {} as MovieDetailsData,
    200
  );
  const [userRating, setUserRating] = useState(0);

  // console.log(movie);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
  } = movie;

  useEffect(
    function () {
      const prevTitle = document.title;
      document.title = `Movie - ${title}`;

      return function () {
        document.title = prevTitle;
      };
    },
    [title]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
      console.log('CLOSE Movie Details');
    }

    document.addEventListener('keydown', handleKeyDown);

    return function () {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseMovie]);

  function handleAddMovies() {
    if (!userRating) return;
    onAddWatchedMovies({
      imdbID,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: parseInt(runtime),
      imdbRating: +imdbRating,
      userRating,
    });
    onCloseMovie();
  }

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');
  /*   useEffect(
    function () {
      let isIgnore = false;
      (async function () {
        setIsLoading(true);
        setError('');
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          const data = await res.json();
          if (!isIgnore) {
            setMovie(data);
          }
          console.log(data);
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
      })();
 
      return () => {
        isIgnore = true;
      };
    },
    [selectedId]
  ); */
  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} loading="lazy" alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!havingRating ? (
                <>
                  <Rating
                    key={imdbID}
                    maxRating={10}
                    size="24px"
                    color="yellow"
                    defaultRating={imdbRating}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAddMovies} className="btn-add">
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have rated this movie {havingRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {error && <LoadingError message={error} />}
    </div>
  );
}
