import React from "react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { API, apiKey, fetcher } from "../../configAPI/configAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { v4 } from "uuid";
import LoadingSkeleton from "../loading/LoadingSkeleton";
const itemPerPage = 20;
const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(API.getMovieList(type), fetcher);
  const movies = data?.results || [];
  const loading = !data && !error;
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={20} slidesPerView={"auto"}>
        {loading &&
          new Array(itemPerPage).fill(0).map(() => (
            <SwiperSlide key={v4()}>
              <LoadingSkeleton></LoadingSkeleton>
            </SwiperSlide>
          ))}
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
