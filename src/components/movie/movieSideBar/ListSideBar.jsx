import React from "react";
import useSWR from "swr";
import { API, fetcher } from "../../../configAPI/configAPI";
import Button from "../../button/Button";
import CardSideBar from "./CardSideBar";

let api = "";
const ListSideBar = ({ check = "movie" }) => {
  const { data, error } = useSWR(
    check === "movie"
      ? API.getMovieList("upcoming")
      : API.getActorListPopular(),
    fetcher
  );
  const movies =
    (check === "movie"
      ? data?.results.slice(0, 2)
      : data?.results.slice(0, 3)) || [];
  return (
    <>
      {movies.length > 0 &&
        movies.map((item) => (
          <CardSideBar key={item.id} item={item} check={check}></CardSideBar>
        ))}
      <Button to={check === "movie" ? "/movie" : "/actors"}>See more</Button>
    </>
  );
};

export default ListSideBar;
