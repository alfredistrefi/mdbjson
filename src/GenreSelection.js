import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faLaugh,
  faTheaterMasks,
  faHeart,
  faClock,
  faCalendar,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';


const GenreSelection = ({ handleGenreSelect }) => {
  return (
    <div className="genre-btn">
      <li>
        <a href="#" className="compo" onClick={() => handleGenreSelect('Action')}>
          <FontAwesomeIcon icon={faFilm} /> Action
        </a>
      </li>
      <li>
        <a href="#" className="compo" onClick={() => handleGenreSelect('Comedy')}>
          <FontAwesomeIcon icon={faLaugh} /> Comedy
        </a>
      </li>
      <li>
        <a href="#" className="compo" onClick={() => handleGenreSelect('Drama')}>
          <FontAwesomeIcon icon={faTheaterMasks} /> Drama
        </a>
      </li>
      <li>
        <a href="#" className="compo" onClick={() => handleGenreSelect('Romance')}>
          <FontAwesomeIcon icon={faHeart} /> Romance
        </a>
      </li>
      <li>
        <a href="#" className="compo" onClick={() => handleGenreSelect('Horror')}>
          <FontAwesomeIcon icon={faFilm} /> Horror
        </a>
      </li>
    </div>
  );
};

export default GenreSelection;
