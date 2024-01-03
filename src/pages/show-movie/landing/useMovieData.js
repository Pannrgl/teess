import { useEffect, useState } from 'react';
import movieData from './database/tes'; // Ganti dengan lokasi yang sesuai dengan file database Anda

const useMovieData = (poster) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const foundMovie = movieData.find((movieItem) => movieItem.poster === poster);
        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          throw new Error('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [poster]);

  return movie;
};

export default useMovieData;
