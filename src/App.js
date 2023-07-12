import React, { useState, useEffect } from 'react';
import './App.css';
import dbData from './db.json';
import Caro from './caro';
import FavoriteMoviesPage from './FavoriteMoviesPage';
import WatchLaterPage from './WatchLaterPage';
import SideMenu from './SideMenu';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWatchLater, setShowWatchLater] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    setMovies(dbData.movies);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    const includesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true;
    const matchesYear = selectedYear ? movie.year.toString() === selectedYear : true;
    return includesSearchTerm && matchesGenre && matchesYear;
  });

  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const addToWatchLaterList = (movie) => {
    setWatchLaterList([...watchLaterList, movie]);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const toggleWatchLater = () => {
    setShowWatchLater(!showWatchLater);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };




  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav !== movie);
    setFavorites(updatedFavorites);
  };

  const removeFromWatchLaterList = (movie) => {
    const updatedWatchLaterList = watchLaterList.filter((m) => m !== movie);
    setWatchLaterList(updatedWatchLaterList);
  };

  return (
    <div className='body'>
      <SideMenu genres={dbData.genres} onSelectGenre={handleGenreSelect} onSelectYear={handleYearSelect} />
      <div className='search-box'>
        <input
          type="text"
          placeholder="Search movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="top-button">
        <button
          type="button"
          className="fav-button"
          onClick={toggleFavorites}
        >
          Favorites List
        </button>
        <button
          className="later-button"
          onClick={toggleWatchLater}
          type="button"
        >
          Watch Later List
        </button>
      </div>

      <div>
        <Caro />
      </div>

      {showFavorites ? (
        <FavoriteMoviesPage favorites={favorites} removeFromFavorites={removeFromFavorites} />
      ) : showWatchLater ? (
        <WatchLaterPage watchLaterList={watchLaterList} removeFromWatchLaterList={removeFromWatchLaterList} />
      ) : (
        <div className="movie-container">
          {filteredMovies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} className="movie-image" />
              <div className="movie-details">
                <span className="movie-year">{movie.year}</span>
                <button
                  className="like-button"
                  type="button"
                  onClick={() => addToFavorites(movie)}
                >
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
