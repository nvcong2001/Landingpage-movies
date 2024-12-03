import React from "react";
import Button from "../button/Button";
import { API } from "../../configAPI/configAPI";

const MovieCard = ({ item, check = "movie" }) => {
  return (
    <div className="flex flex-col p-3 rounded-lg movie-card bg-[rgb(47,48,50)]  ">
      <img
        src={API.getImage(item.poster_path)}
        className="h-[250px] object-cover w-full rounded-lg mb-5"
        alt=""
      />
      <div className="flex flex-col h-full">
        <h3 className="mb-auto text-[16px] font-bold text-white line-clamp-2">
          {check === "movie" ? item.title : item.name}
        </h3>
        <div className="flex items-center justify-between text-[#8d939c] text-[13px] mb-4 mt-2">
          <span>
            {new Date(
              check === "movie" ? item.release_date : item.first_air_date
            ).getFullYear() || new Date().getFullYear()}
          </span>
          <div className="flex items-center gap-1">
            <span>{Number(item.vote_average).toFixed(1) || 0.0}</span>
            <i className="text-yellow-500 bx bxs-star"></i>
          </div>
        </div>
        <Button
          to={`${
            check === "movie"
              ? `/movie/detail/${item.id}`
              : `/tv/detail/${item.id}`
          }`}
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
