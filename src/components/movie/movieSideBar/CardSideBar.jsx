import React from "react";
import { API } from "../../../configAPI/configAPI";

const CardSideBar = ({ item, check }) => {
  return (
    <div className="w-full h-[130px] bg-[rgba(54,52,55,0.5)] rounded-2xl p-3 flex gap-3 mb-3">
      <div className="w-[100px] h-full">
        <img
          src={API.getImage(
            check === "movie" ? item.poster_path : item.profile_path
          )}
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <h3 className="text-[14px] font-bold text-white mb-2">
          {check === "movie" ? item.title : item.name}
        </h3>
        <div className=" mb-4 flex items-center justify-between gap-2 text-[11px] text-[#8d939c]">
          <span>
            {check === "movie"
              ? new Date(item.release_date).getFullYear()
              : item.original_name}
          </span>
          <span className="flex items-center gap-1 ">
            {check === "movie"
              ? Number(item.vote_average).toFixed(1)
              : Number(item.popularity).toFixed(2)}
            {check === "movie" ? (
              <i className="text-yellow-500 bx bxs-star"></i>
            ) : (
              <i className="text-red-500 bx bxs-heart"></i>
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <div className="border border-white text-[12px] rounded-md px-2 py-1">
            Action
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSideBar;
