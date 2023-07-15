import React, { useState, useEffect } from 'react';
import './App.css';
import dbData from './db.json';
import Caro from './caro';
import FavoriteMoviesPage from './FavoriteMoviesPage';
import WatchLaterPage from './WatchLaterPage';
import SideMenu from './SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faFilm,
  faLaugh,
  faTheaterMasks,
  faHeart,
  faClock,
  faCalendar,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import GenreSelection from './GenreSelection';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWatchLater, setShowWatchLater] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDecade, setSelectedDecade] = useState(null);

  useEffect(() => {
    setMovies(dbData.movies);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    const includesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true;
    const matchesDecade = selectedDecade
      ? parseInt(movie.year) >= selectedDecade && parseInt(movie.year) < selectedDecade + 10
      : true;
    return includesSearchTerm && matchesGenre && matchesDecade;
  });

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const addToWatchLaterList = (movie) => {
    setWatchLaterList((prevList) => [...prevList, movie]);
  };

  const toggleFavorites = () => {
    setShowFavorites((prevState) => !prevState);
    setShowWatchLater(false);
  };

  const toggleWatchLater = () => {
    setShowWatchLater((prevState) => !prevState);
    setShowFavorites(false);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade);
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== movie));
  };

  const removeFromWatchLaterList = (movie) => {
    setWatchLaterList((prevList) => prevList.filter((m) => m !== movie));
  };

  const reloadPage = () => {
    // Reload the page
    window.location.reload();
  };

  return (
    <div className="body">
    <div className='Space'>
    <SideMenu genres={dbData.genres} onSelectDecade={handleDecadeSelect} />
    </div>
    <div className="Space2">
    <div className="container-btn">
        <div className="home-button" onClick={reloadPage}>
          <FontAwesomeIcon icon={faHome} />
        </div>
      </div>
    </div>
     
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="top-button">
        {showFavorites ? (
          <button type="button" className="fav-button" onClick={toggleFavorites}>
            Hide Favorites List
          </button>
        ) : (
          <button type="button" className="fav-button" onClick={toggleFavorites}>
            Favorites List
          </button>
        )}
        {showWatchLater ? (
          <button className="later-button" onClick={toggleWatchLater} type="button">
            Hide Watch Later List
          </button>
        ) : (
          <button className="later-button" onClick={toggleWatchLater} type="button">
            Watch Later List
          </button>
        )}
      </div>

      <GenreSelection handleGenreSelect={handleGenreSelect} />

      {showFavorites ? (
        <FavoriteMoviesPage favorites={favorites} removeFromFavorites={removeFromFavorites} />
      ) : showWatchLater ? (
        <WatchLaterPage watchLaterList={watchLaterList} removeFromWatchLaterList={removeFromWatchLaterList} />
      ) : (
        <div className="movie-container">
          <Caro />
          {filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} className="movie-image" />
              <div className="movie-details">
                <span className="movie-year">{movie.year}</span>
                <button className="like-button" type="button" onClick={() => addToFavorites(movie)}>
                  Favorites
                </button>
                <button
                  className="watch-later-button"
                  type="button"
                  onClick={() => addToWatchLaterList(movie)}
                >
                  Watch Later
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
