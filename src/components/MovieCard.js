import React from "react";
import { BsStarFill } from "react-icons/bs";
import { extractImgPoster } from "utils/extractImg";
import { Link } from "react-router-dom";
import { PATH } from "constants/paths";

const MovieCard = ({ singlePopularMovie }) => {
  const { id, title, name, poster_path, release_date, first_air_date, vote_average } = singlePopularMovie;
  const formattedTitle = (title || name)?.toLowerCase().replace(/\s+/g, "-");

  const handleMovieClick = () => {
    // Redirect to the new page
    window.location.href = `/landing-page.html`;
  };

  return (
    <Link to={`${PATH.SHOWMOVIE}/${id}/${formattedTitle}`} className="cursor-pointer">
      <div className="space-y-5">
        <div className="relative rounded-md overflow-hidden custom-card-hover">
          {poster_path ? (
            <img
              src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : extractImgPoster(poster_path)}
              className="rounded-md shadow-lg"
              alt={title || name}
            />
          ) : (
            <div className="w-full h-[320px] bg-slate-100"></div>
          )}

          <p className="flex space-x-2 items-center absolute top-0 right-0 bg-red-500 px-1">
            <span className="text-xl text-white-500">
              <BsStarFill />
            </span>
            <span className="pt-1">{vote_average}</span>
          </p>
        </div>
        <div className="space-y-2">
          <h3>{title || name}</h3>
          <p className="text-gray-500">{release_date || first_air_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
