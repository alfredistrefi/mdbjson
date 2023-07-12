import React from 'react';

const Favo = ({ favorites, showFavorites }) => {
  if (!showFavorites) {
    return null;
  }

  return (
    <div className="favorites-list">
      <h2>Favorites List</h2>
      {favorites.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default Favo;
