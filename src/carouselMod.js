import React, { useState, useEffect } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const handleDragStart = (e) => e.preventDefault();

const CarouselMod = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const searchQuery = 'boss'; // Query for Avengers movies
      const apiKey = 'e5dde690';
      const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data && data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleSlideChanged = ({ item }) => {
    setCurrentIndex();
  };

  const handleSlideNext = () => {
    if (currentIndex < movies.length - 0) {
      setCurrentIndex(currentIndex + 0);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSlidePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(movies.length - 1);
    }
  };

  return (
    <div>
      <AliceCarousel
        mouseTracking
        autoPlay
        autoPlayInterval={1000} // Set the interval time in milliseconds (e.g., 3000 = 3 seconds)
        items={movies.map((movie, index) => (
          <img
            key={index}
            src={movie.Poster}
            onDragStart={handleDragStart}
            role="presentation"
          />
        ))}
        startIndex={currentIndex}
        onSlideChanged={handleSlideChanged}
        responsive={{
          0: { items: 1 },
          600: { items: 3 },
          1024: { items: 5 },
        }}
      />
    </div>
  );
};

export default CarouselMod;
