import React, { useState } from "react";
import './genres.css';
import CarouselMod from "./carouselMod";
import { FaHeart, FaClock } from 'react-icons/fa';

const Genres = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [showMovie, setShowMovie] = useState(false);

  const fetchMoviesByGenre = async (genre) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=e5dde690&s=${genre}`);
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const addToWatchLaterList = (movie) => {
    setWatchLaterList([...watchLaterList, movie]);
  };

  return (
    <div>
      <div className="container">
        <button
          className="btn-genre"
          onClick={() => fetchMoviesByGenre('action')}
        >
          {showMovie ? 'Hide Action' : 'Action'}
        </button>
        <button
          className="btn-genre"
          onClick={() => fetchMoviesByGenre('drama')}
        >
          {showMovie ? 'Hide Drama' : 'Drama'}
        </button>
        <button
          className="btn-genre"
          onClick={() => fetchMoviesByGenre('adventure')}
        >
          {showMovie ? 'Hide Adventure' : 'Adventure'}
        </button>
        <button
          className="btn-genre"
          onClick={() => fetchMoviesByGenre('comedy')}
        >
          {showMovie ? 'Hide Comedy' : 'Comedy'}
        </button>
      </div>

      <CarouselMod />

      <div className="movies">
        {movies.map((movie) => (
          <div className="movie" key={movie.imdbID}>
            <figure>
              <img src={movie.Poster} alt={movie.Title} />
              <figcaption>
                <h2 className="movie__title">{movie.Title}</h2>
                <p className="movie__Year">Year: {movie.Year}</p>
                <button
                  type="button"
                  className="custom-btn6 btn-6"
                  onClick={() => addToFavorites(movie)}
                >
                  <FaHeart />
                </button>
                <button
                  type="button"
                  className="custom-btn6 btn-6"
                  onClick={() => addToWatchLaterList(movie)}
                >
                  <FaClock />
                </button>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
