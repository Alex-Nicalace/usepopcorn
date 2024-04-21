import { useEffect, useRef, useState } from 'react';
import Rating from './Rating';
import useData from '../hooks/useData';
import { Loader } from './Loader';
import { LoadingError } from './LoadingError';
import { WatchedData, KEY } from './App';
import { useKey } from '../hooks/useKey';

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
  const {
    data: movie,
    error,
    isLoading,
  } = useData(
    `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
    {} as MovieDetailsData,
    200
  );
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

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
      document.title = `Фильм - ${title}`;

      return function () {
        document.title = prevTitle;
      };
    },
    [title]
  );

  useKey('Escape', onCloseMovie);

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
      countRatingDecisions: countRef.current,
    });
    onCloseMovie();
  }

  function handleSetRating(rating: number) {
    setUserRating(rating);
    countRef.current += 1;
  }

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
                {imdbRating} IMDb рейтинг
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
                    onSetRating={handleSetRating}
                  />
                  {userRating > 0 && (
                    <button onClick={handleAddMovies} className="btn-add">
                      + В избранное
                    </button>
                  )}
                </>
              ) : (
                <p>Вы оценили этот фильм {havingRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>В главных ролях: {actors}</p>
            <p>Режиссер: {director}</p>
          </section>
        </>
      )}
      {error && <LoadingError message={error} />}
    </div>
  );
}
