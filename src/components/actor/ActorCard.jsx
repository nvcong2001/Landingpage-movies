import React from "react";
import Button from "../button/Button";
import { API } from "../../configAPI/configAPI";

const ActorCard = ({ item }) => {
  return (
    <>
      <div className="flex flex-col p-3 rounded-lg movie-card bg-[rgb(47,48,50)]">
        {item.profile_path ? (
          <img
            src={API.getImage(item.profile_path)}
            className="h-[250px] flex-shrink-0 object-cover w-full rounded-lg mb-5"
            alt=""
          />
        ) : (
          <div className="h-[250px] w-full flex-shrink-0 rounded-lg mb-5 bg-gray-950"></div>
        )}
        <div className="flex flex-col h-full">
          <h3 className="mb-3 text-[16px] font-bold text-white line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center justify-between text-[#8d939c] text-[13px] mb-auto">
            <span>{item.original_name}</span>
            <div className="flex items-center gap-1">
              <span>{Number(item.popularity).toFixed(1)}</span>
              <i className="text-red-500 bx bxs-heart"></i>
            </div>
          </div>
          <Button to={`/actors/detail/${item.id}`}>Watch Now</Button>
        </div>
      </div>
    </>
  );
};

export default ActorCard;
