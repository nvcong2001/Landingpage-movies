import React from "react";
import { useParams } from "react-router-dom";
import { API, fetcher } from "../configAPI/configAPI";
import useSWR from "swr";

const ActorDetail = () => {
  const { id } = useParams();
  const { data, error } = useSWR(API.getActorDetail(id), fetcher);
  if (!data) return null;
  console.log(data);
  const {
    name,
    place_of_birth,
    profile_path,
    known_for_department,
    birthday,
    biography,
    also_known_as,
  } = data;

  return (
    <div className="my-20">
      <div className="h-[600px] relative w-full">
        {profile_path !== null && (
          <div className="absolute inset-0 bg-center bg-no-repeat bg-cover">
            <img
              src={`${API.getImage(profile_path)}`}
              className="object-cover w-full h-full"
              alt=""
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>
      <div className="h-[400px] max-w-[800px] mx-auto rounded-xl overflow-hidden -mt-[200px] z-10 relative">
        {profile_path === null || profile_path === "" ? (
          <div className="w-full h-full bg-black"></div>
        ) : (
          <img
            src={`${API.getImage(profile_path)}`}
            className="object-cover w-full h-full "
            alt=""
          />
        )}
      </div>
      <h1 className="my-10 text-4xl font-bold text-center text-white">
        {name}
      </h1>
      <div className="mb-5 ">
        <div className="text-center">
          <div className="flex justify-center gap-x-5">
            {also_known_as.length > 0 &&
              also_known_as.map((item, index) => (
                <span key={index} className="text-base text-gray-500">
                  {item}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-10 gap-x-5">
        <span className="text-base text-gray-500 ">{birthday}</span>
        {place_of_birth !== null && (
          <span className="text-base text-gray-500 ">{place_of_birth}</span>
        )}
      </div>

      <div className="flex items-center justify-center mb-10 gap-x-5">
        <span className="px-4 py-2 border rounded border-primary text-primary">
          {known_for_department}
        </span>
      </div>

      <div className="text-[16px] text-center leading-relaxed max-w-[700px] mx-auto mb-10">
        <p className="mb-5">{biography}</p>
      </div>
    </div>
  );
};

export default ActorDetail;
