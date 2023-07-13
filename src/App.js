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
  const [watchLaterList, setWatchLaterList] = useState([]); //watch later list
  const [showFavorites, setShowFavorites] = useState(false); // showing/hiding favorite movies
  const [showWatchLater, setShowWatchLater] = useState(false); //showing/hiding watch later list
  const [selectedGenre, setSelectedGenre] = useState(null); // selected genre
  const [selectedDecade, setSelectedDecade] = useState(null); //  decade

  useEffect(() => {
    setMovies(dbData.movies); // Fetching movie from JSON setting it in the movies state
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Updating the search term state based on user input
  };
//Repeat 
  const filteredMovies = movies.filter((movie) => {
    const includesSearchTerm = movie.title.toLowerCase().includes(searchTerm.toLowerCase()); //Checking if the movie title includes the search term
    const matchesGenre = selectedGenre ? movie.genres.includes(selectedGenre) : true; // Checking if the movie belongs to the selected genre
    const matchesDecade = selectedDecade ? (
      parseInt(movie.year) >= selectedDecade &&
      parseInt(movie.year) < selectedDecade + 10
    ) : true; 
    return includesSearchTerm && matchesGenre && matchesDecade; // Returning movies that satisfy all the filter conditions
  });


  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]); // Adding a movie to the favorites state
  };//By using spread operator & creates an array with all the existing movies in the fav state
  const addToWatchLaterList = (movie) => {
    setWatchLaterList([...watchLaterList, movie]); //Movie is an object that represents a movies
    // The funtion addToFavorites take the object and adds it to the favorites state
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites); // Toggling the showFavorites state to show or hide the favorite movies
  };//this will update teh use state of teh fav movies and show the ifnroamtion in the screen

  const toggleWatchLater = () => {
    setShowWatchLater(!showWatchLater); // Toggling the showWatchLater state to show or hide the watch later list
  };//this will update teh use state of teh WTL movies and show the ifnroamtion in the screen


  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre); // Updating the selected genre state based on user selection
  };//genre is an object that has data, the function gets the data, adn will add it to the genre state

  const handleDecadeSelect = (decade) => {
    setSelectedDecade(decade);//object data from the funtion to state
   };
//Repeat & Learn
  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter((fav) => fav !== movie); // Removing a movie from the favorites state
    setFavorites(updatedFavorites);
  };

  const removeFromWatchLaterList = (movie) => {
    const updatedWatchLaterList = watchLaterList.filter((m) => m !== movie); // Removing a movie from the watch later list state
    setWatchLaterList(updatedWatchLaterList);
  };

  return (
    <div className='body'>
      <SideMenu genres={dbData.genres} onSelectGenre={handleGenreSelect} onSelectDecade={handleDecadeSelect} /> {/* Rendering the SideMenu component with genres and event handlers */}
      <div className='search-box'>
        <input
          type="text"
          placeholder="Search movies"
          value={searchTerm}
          onChange={handleSearchChange}
        /> {/* Rendering the search input box */}
      </div>

      <div className="top-button">
        <button
          type="button"
          className="fav-button"
          onClick={toggleFavorites}
        >
          Favorites List
        </button> {/* Button to toggle showing/hiding favorite movies */}
        <button
          className="later-button"
          onClick={toggleWatchLater}
          type="button"
        >
          WatchLater List
        </button> {/* Button to toggle showing/hiding watch later list */}
      </div>

      <div>
        <Caro /> {/* Rendering the Caro component */}
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
