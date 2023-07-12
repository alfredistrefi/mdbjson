import React from 'react';
import './App.css';

const FavoriteMoviesPage = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="movie-container">
      
      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <ul>
          {favorites.map((movie) => (
            <li className="movie-card" key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} className="movie-image" />
              <div className="movie-details">
                <span className="movie-year">{movie.year}</span>
                <button
                  type="button"
                  className="custom-btn6 btn-6"
                  onClick={() => removeFromFavorites(movie)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
