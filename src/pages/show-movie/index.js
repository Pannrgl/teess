
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LandingPage from "./landing/LandingPage";


const ShowMovie = () => {
  const navigate = useNavigate();
  const { id, title } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  // ... (rest of the code)

  const handleMovieClick = () => {
    // Redirect to your landing page
    navigate("/landing-page.html");
  };

  return (
    <div className="show-movie">
      {/* Display the landing page or movie details */}
      {movieDetails ? (
        <>
          <h2 onClick={handleMovieClick}>Movie Details</h2>
          <p>ID Movie: {id}</p>
          <p>Title: {title}</p>
          {/* Display additional movie details here based on the fetched data */}
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default ShowMovie;
