import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { FaHeart, FaClock } from 'react-icons/fa'; // Import react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import Genres from './genres';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [showWatchLater, setShowWatchLater] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // Make the API request
    fetch(`http://www.omdbapi.com/?apikey=e5dde690&s=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the movies state with the fetched data
        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav !== movie);
    setFavorites(updatedFavorites);
  };

  const addToWatchLaterList = (movie) => {
    setWatchLaterList([...watchLaterList, movie]);
  };

  const removeFromWatchLaterList = (movie) => {
    const updatedWatchLaterList = watchLaterList.filter((m) => m !== movie);
    setWatchLaterList(updatedWatchLaterList);
  };

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    const reachedBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (reachedBottom && !loading) {
      // Remove the following line or implement the fetchMovies function
      // fetchMovies();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="search-box-container">
        <div className="col-lg-12 text-center"></div>
        <div className="col-md-4 offset-md-4 mt-5 pt-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search ....."
              aria-label="Recipient's username"
              value={searchQuery}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <span className="input-group-text" onClick={handleSubmit}>
                <i className="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="buttons-nav">
          <button
            type="button"
            className="header-button"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
          </button>
          <button
            type="button"
            className="header-button"
            onClick={() => setShowWatchLater(!showWatchLater)}
          >
            {showWatchLater ? 'Hide Watch Later' : 'Show Watch Later'}
          </button>
        </div>

        <Genres />

        {showFavorites && (
          <div>
            <h2 className="fav-later-btn">Favorites</h2>
            <div className="favorites-list">
              {favorites.length > 0 ? (
                favorites.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <figure>
                      <img src={movie.Poster} alt={movie.Title} />
                      <figcaption>
                        <h2 className="movie__title">{movie.Title}</h2>
                        <p className="movie__Year">Year: {movie.Year}</p>
                        <button
                          type="button"
                          className="custom-btn6 btn-6"
                          onClick={() => removeFromFavorites(movie)}
                        >
                          Remove
                        </button>
                      </figcaption>
                    </figure>
                  </div>
                ))
              ) : (
                <p>No favorite movies.</p>
              )}
            </div>
          </div>
        )}

        {showWatchLater && (
          <div>
            <h2 className="fav-later-btn">Watching later</h2>
            <div className="watch-later-list">
              {watchLaterList.length > 0 ? (
                watchLaterList.map((movie) => (
                  <div className="movie" key={movie.imdbID}>
                    <figure>
                      <img src={movie.Poster} alt={movie.Title} />
                      <figcaption>
                        <h2 className="movie__title">{movie.Title}</h2>
                        <p className="movie__Year">Year: {movie.Year}</p>
                        <button
                          type="button"
                          className="custom-btn6 btn-6"
                          onClick={() => removeFromWatchLaterList(movie)}
                        >
                          Remove
                        </button>
                      </figcaption>
                    </figure>
                  </div>
                ))
              ) : (
                <p>No movies in watch later list.</p>
              )}
            </div>
          </div>
        )}

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
    </div>
  );
};

export default App;
