// LandingPage.js
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Perhatikan path ini
import MovieCard from './MovieCard';
import './LandingPage.css';
import movieData from './database/tes'; // Import movie data
import Footer from './Footer';
const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState(10);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    setMovies(movieData);
    setTotalMovies(movieData.length);
  }, []);

  const loadMoreMovies = () => {
    setDisplayedMovies((prevCount) => prevCount + 10);
  };

  return (
    <div>
      <Navbar />
       {/* Panggil Navbar di sini */}
      <div className="landing-page">
        
        <div className="movie-list">
          {movies.slice(0, displayedMovies).map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
        {displayedMovies < totalMovies && (
          <button onClick={loadMoreMovies}>More Movies</button>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
