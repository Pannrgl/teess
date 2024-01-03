import React from 'react';
import { useNavigate } from 'react-router-dom';
import movieData from './database/tes'; // Mengimpor data dari file tes.js
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const checkDataAndRedirect = () => {
    const matchingMovie = movieData.find((data) => {
      return (
        data.title === movie.title &&
        data.poster === movie.poster &&
        data.country === movie.country &&
        data.link === movie.link
      );
    });

    if (matchingMovie) {
      redirectToMoviePage();
    } else {
      alert('Data tidak valid');
    }
  };

  const redirectToMoviePage = () => {
    const movieposter = encodeURIComponent(movie.poster); // Menggunakan judul film untuk URL
    navigate(`/showmovie/${movieposter}`); // Navigasi ke halaman ShowMovie dengan judul film sebagai bagian dari URL
  };

  const ads = () => {
    // Your ads logic goes here
  };

  return (
    <div className="movie-card" data-kategori={movie.country} data-nama={movie.title} data-streaming={movie.link} data-poster={movie.poster}>
      <div className='card' onClick={() => { ads(); checkDataAndRedirect(); }}>
        <img src={`https://telegra.ph/file/${movie.poster}.jpg`} alt={movie.title} width='100%' style={{ aspectRatio: '3/4', objectFit: 'cover' }} className='card-img-top' />
        <div className='card-body'></div>
        <p className='card-title'><b>{movie.title}</b></p>
        <p>Country: {movie.country}</p>
        <button className='watch-now-btn' onClick={redirectToMoviePage}>
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
