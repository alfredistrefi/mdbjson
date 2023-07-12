import React, { useState } from 'react';
import './sidemenu.css';

const SideMenu = ({ genres, onSelectGenre, onSelectYear }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const handleGenreSelect = (genre) => {
    onSelectGenre(genre);
  };

  const handleYearSelect = (year) => {
    onSelectYear(year);
  };



  return (
    <div className={`sideMenu ${isActive ? 'active' : ''}`}>
      <div className={`menuIcon ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
      </div>
      <ul>
        <li><a href="#" className='boldo' onClick={() => handleGenreSelect(null)}>Home</a></li>
        <li><a href="#" className='compo' onClick={() => handleGenreSelect('Action')}>Action</a></li>
        <li><a href="#"  className='compo' onClick={() => handleGenreSelect('Comedy')}>Comedy</a></li>
        <li><a href="#"  className='compo' onClick={() => handleGenreSelect('Drama')}>Drama</a></li>
        <li><a href="#"  className='compo' onClick={() => handleGenreSelect('Romance')}>Romance</a></li>
        <li><a href="#"  className='compo' onClick={() => handleGenreSelect('Horror')}>Horror</a></li>
        <li><a href="#" className='boldo'>All Years</a></li>
        <li><a href="#"  className='compo' onClick={() => handleYearSelect('2000')}>2000</a></li>
        <li><a href="#"  className='compo' onClick={() => handleYearSelect('2005')}>2005</a></li>
        <li><a href="#"  className='compo' onClick={() => handleYearSelect('2010')}>2010</a></li>
        <li><a href="#"  className='compo' onClick={() => handleYearSelect('2015')}>2015</a></li>
        <li><a href="#"  className='compo' onClick={() => handleYearSelect('2018')}>2018</a></li>
      </ul>
    </div>
  );
};

export default SideMenu;
