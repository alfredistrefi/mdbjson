import React from 'react';
import './wlf.css';

const FavoriteMoviesPage = ({ favorites , removeFromFavorites}) => {
  return (
    
    <div className="favorite-movies-page">
      <h2>Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        
          <ul>
            {favorites.map((movie) => (
              <li className="movie-card" key={movie.id}>
                <img src={movie.posterUrl} alt={movie.title} className="movie-image" />
                <div className="movie-details">
                  <span className="movie-year">{movie.year}</span>
                </div>
                <button
                          type="button"
                          className="custom-btn6 btn-6"
                          onClick={() => removeFromFavorites(movie)}
                        >
                          Remove
                        </button>
              </li>
              
            ))}
          </ul>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
