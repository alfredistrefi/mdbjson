import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dbData from './db.json';
import './caro.css';

const Caro = () => {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setMovies(dbData.movies);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('db.json');
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSlide = (direction) => {
    const carousel = carouselRef.current;
    const scrollAmount = direction === 'left' ? -carousel.offsetWidth : carousel.offsetWidth;
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  // Filter movies with a runtime larger than 120
  const filteredMovies = movies.filter((movie) => movie.runtime > 130);

  return (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        {filteredMovies.map((movie) => (
          <img
            key={movie.runtime}
            src={movie.posterUrl}
            alt={`Movie Poster: ${movie.runtime} minutes`}
            className="carousel-item"
          />
        ))}
      </div>
      
    </div>
  );
};

export default Caro;
