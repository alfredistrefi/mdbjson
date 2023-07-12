import React from 'react';
import './wlf.css';
const WatchLaterPage = ({ watchLaterList, removeFromWatchLaterList }) => {
  return (
    <div className="watch-later-movies-page">
      <h2>Watch Later Movies</h2>
      {watchLaterList.length === 0 ? (
        <p>No movies added to the watch later list yet.</p>
      ) : (
        <ul>
          {watchLaterList.map((movie) => (
            <li className="movie-card" key={movie.id}>
              <img src={movie.posterUrl} alt={movie.title} className="movie-image" />
              <div className="movie-details">
                <span className="movie-year">{movie.year}</span>
              </div>
              <button
                type="button"
                className="custom-btn6 btn-6"
                onClick={() => removeFromWatchLaterList(movie)}
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

export default WatchLaterPage;
