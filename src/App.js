import React, { useState, useEffect } from 'react';
import './App.css';
import dbData from './db.json';
import Caro from './caro';
import FavoriteMoviesPage from './FavoriteMoviesPage';
import WatchLaterPage from './WatchLaterPage';
import SideMenu from './SideMenu';

const App = () => {
  const [movies, setMovies] = useState([]); // State variable for movies
  const [searchTerm, setSearchTerm] = useState(''); // for search term
  const [favorites, setFavorites] = useState([]); // favorite movies
  const [watchLaterList, setWatchLaterList] = useState([]); // watch later list
  const [showFavorites, setShowFavorites] = useState(false); // showing/hiding favorite movies
  const [showWatchLater, setShowWatchLater] = useState(false); // showing/hiding watch later list
  const [selectedGenre, setSelectedGenre] = useState(null); // selected genre
  const [selectedDecade, setSelectedDecade] = useState(null); // selected decade

  useEffect(() => {
    setMovies(dbData.movies); // Fetching movies from JSON and setting them in the movies state
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Updating the search term state based on user input
  };

  const filteredMovies = movies.filter((movie) => {
    const includesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase()); // Checking if the movie title includes the search term
    const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true; // Checking if the movie belongs to the selected genre
    const matchesDecade = selectedDecade ? parseInt(movie.year) >= selectedDecade && parseInt(movie.year) < selectedDecade + 10 : true; // Checking if the movie belongs to the selected decade
    return includesSearchTerm && matchesGenre && matchesDecade; // Returning movies that satisfy all the filter conditions
  });

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]); // Adding a movie to the favorites state
  };

  const addToWatchLaterList = (movie) => {
    setWatchLaterList((prevList) => [...prevList, movie]); // Adding a movie to the watch later list state
  };

  const toggleFavorites = () => {
    setShowFavorites((prevState) => !prevState); // Toggling the showFavorites state to show or hide the favorite movies
  };

  const toggleWatchLater = () => {
    setShowWatchLater((prevState) => !prevState); // Toggling the showWatchLater state to show or hide the watch later list
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre); // Updating the selected genre state based on user selection
  };

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade); // Updating the selected decade state based on user selection
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav !== movie)); // Removing a movie from the favorites state
  };

  const removeFromWatchLaterList = (movie) => {
    setWatchLaterList((prevList) => prevList.filter((m) => m !== movie)); // Removing a movie from the watch later list state
  };

  return (
    <div className="body">
      <SideMenu genres={dbData.genres} onSelectGenre={handleGenreSelect} onSelectDecade={handleDecadeSelect} />
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="top-button">
        <button type="button" className="fav-button" onClick={toggleFavorites}>
        {showFavorites ? 'Hide Favorites List' : 'Favorites List'}
        </button>
        <button className="later-button" onClick={toggleWatchLater} type="button">
        {showWatchLater ? 'Hide Watch Later List' : 'Watch Later List'}
        </button>
      </div>

      

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
