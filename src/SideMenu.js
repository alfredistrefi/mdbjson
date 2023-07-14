import React, { useState } from 'react';
import './sidemenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilm, faLaugh, faTheaterMasks, faHeart, faClock, faCalendar, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

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

  const handleHomeSelect = () => {
    handleGenreSelect(null);
  };

  return (
    <div className={`sideMenu ${isActive ? 'active' : ''}`}>
      <div className={`menuIcon ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
      <span></span>
      </div>
      <ul>
        <li><a href="#" className='boldo' onClick={handleHomeSelect}><FontAwesomeIcon icon={faHome} /> Home</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Action')}><FontAwesomeIcon icon={faFilm} /> Action</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Comedy')}><FontAwesomeIcon icon={faLaugh} /> Comedy</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Drama')}><FontAwesomeIcon icon={faTheaterMasks} /> Drama</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Romance')}><FontAwesomeIcon icon={faHeart} /> Romance</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Horror')}><FontAwesomeIcon icon={faFilm} /> Horror</a></li>
        <li><a href="#" className='boldo' onClick={() => handleGenreSelect(null)}><FontAwesomeIcon icon={faClock} /> All Decades</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(1990)}><FontAwesomeIcon icon={faCalendar} /> 1990s</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(2000)}><FontAwesomeIcon icon={faCalendar} /> 2000s</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(2010)}><FontAwesomeIcon icon={faCalendar} /> 2010s</a></li>
        <li><a href="#" className='compo' onClick={() => handleDecadeSelect(2020)}><FontAwesomeIcon icon={faCalendar} /> 2020s</a></li>
      </ul>
    </div>
  );
};

export default SideMenu;
