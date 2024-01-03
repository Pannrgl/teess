import React, { useState, useEffect } from 'react';
import './MovieCard.css';

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleMovieClick = (id) => {
    // Lakukan apa pun yang Anda inginkan ketika film diklik
    console.log(`Movie clicked: ${id}`);
    // Contoh: Redirect ke halaman detail film
    // history.push(`/movies/${id}`);
  };

  const handleWatchNowClick = (id, title) => {
    const lowercaseTitle = title.toLowerCase();
    window.location.href = `/komenan/shortlink/${id}?title=${encodeURIComponent(lowercaseTitle)}`;
  };

  return (
    <div className="movie-card-container">
      <h1>Popular Movies</h1>
      <div className="movies-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <button className="watch-now-button" onClick={() => handleWatchNowClick(movie.id, movie.title)}>
              Generate Link
            </button>
          </div>
        ))}
      </div>
      <button className="more-button" onClick={loadMoreMovies}>
        More Movies
      </button>
    </div>
  );
};

export default MovieCard;
