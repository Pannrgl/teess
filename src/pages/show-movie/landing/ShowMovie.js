import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMovieData from './useMovieData'; // Sesuaikan dengan lokasi file useMovieData.js

const ShowMovie = () => {
  const { poster } = useParams();
  const movie = useMovieData(poster);
  const iframeRef = useRef(null);
  const adURL = "https://jinglehalfbakedparticle.com/edeqktwhm?key=95b465e54053f090f83669cb29989aa8";

  useEffect(() => {
    const toggleFullScreen = () => {
      if (iframeRef.current) {
        if (iframeRef.current.requestFullscreen) {
          iframeRef.current.requestFullscreen();
        } else if (iframeRef.current.mozRequestFullScreen) {
          iframeRef.current.mozRequestFullScreen();
        } else if (iframeRef.current.webkitRequestFullscreen) {
          iframeRef.current.webkitRequestFullscreen();
        } else if (iframeRef.current.msRequestFullscreen) {
          iframeRef.current.msRequestFullscreen();
        }
      }
    };

    toggleFullScreen();
  }, [poster]);

  useEffect(() => {
    const adInterval = setInterval(() => {
      window.location.href = adURL;
    }, 20000); // Redirect ke iklan setiap 20 detik

    return () => clearInterval(adInterval);
  }, [adURL]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <iframe
        ref={iframeRef}
        title="Movie Player"
        width="560"
        height="315"
        src={movie.link}
        frameBorder="0"
        allowFullScreen
        style={{ maxWidth: '100%', maxHeight: '100%', alignSelf: 'center' }}
      ></iframe>
    </div>
  );
};

export default ShowMovie;
