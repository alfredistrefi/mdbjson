import React, { useState } from 'react';
import './sidemenu.css';

const SideMenu = ({ genres, onSelectGenre, onSelectDecade }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleGenreSelect = (genre) => {
    onSelectGenre(genre);
  };

  const handleDecadeSelect = (decade) => {
    onSelectDecade(decade);
  };

  return (
    <div className={`sideMenu ${isActive ? 'active' : ''}`}>
      <div className={`menuIcon ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
      </div>
      <ul>
        <li><a href="#" className='boldo' onClick={() => handleGenreSelect(null)}>Home</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Action')}>Action</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Comedy')}>Comedy</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Drama')}>Drama</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Romance')}>Romance</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Horror')}>Horror</a></li>
        <li><a href="#" className='boldo'>All Decades</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(1990)}>1990s</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(2000)}>2000s</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(2010)}>2010s</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(2020)}>2020s</a></li>
      </ul>
    </div>
  );
};

export default SideMenu;
