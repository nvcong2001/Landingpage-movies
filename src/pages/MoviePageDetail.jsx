import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API, fetcher } from "../configAPI/configAPI";
import MovieCardTVSM from "../components/movie/MovieCardTVSM";

const MoviePageDetail = () => {
  const { id } = useParams();
  const { data, error } = useSWR(API.getMovieDetail(id), fetcher);
  if (!data) return null;
  const { title, genres, backdrop_path, poster_path, overview, homepage } =
    data;

  return (
    <div className="my-20">
      <div className="h-[600px] relative w-full">
        {backdrop_path !== null && (
          <div className="absolute inset-0 bg-center bg-no-repeat bg-cover">
            <img
              src={`${API.getImage(backdrop_path)}`}
              className="object-cover w-full h-full"
              alt=""
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-65"></div>
      </div>
      <div className="h-[400px] max-w-[800px] mx-auto rounded-xl overflow-hidden -mt-[200px] z-10 relative">
        {poster_path === null || poster_path === "" ? (
          <div className="w-full h-full bg-black"></div>
        ) : (
          <img
            src={`${API.getImage(poster_path)}`}
            className="object-cover w-full h-full "
            alt=""
          />
        )}
      </div>
      <h1 className="my-10 text-4xl font-bold text-center text-white">
        {title}
      </h1>
      <div className="flex items-center justify-center mb-10 gap-x-5">
        {genres.length > 0 &&
          genres.map((item) => (
            <span
              key={item.id}
              className="px-4 py-2 border rounded border-primary text-primary"
            >
              {item.name}
            </span>
          ))}
      </div>

      <div className="text-[16px] text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        <p className="mb-5">{overview}</p>
      </div>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieMeta({ type }) {
  const { id } = useParams();
  const { data, error } = useSWR(API.getMovieMeta(id, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    return (
      <div className="py-10">
        <h1 className="mb-10 text-3xl text-center">Casts</h1>
        <div className="grid grid-cols-4 gap-5">
          {cast.length > 0 &&
            cast.slice(0, 4).map((item) => (
              <div className="cast-item" key={item.id}>
                <img
                  src={API.getImage(item.profile_path)}
                  className="w-full h-[350px] object-cover rounded-lg mb-3"
                  alt=""
                />
                <h3 className="text-xl font-medium">{item.name}</h3>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    if (type === "videos") {
      const { results } = data;
      console.log(results);
      return (
        <div className="py-10">
          {results.length > 0 &&
            results.slice(0, 2).map((item) => (
              <div key={item.id} className="mb-10">
                <h3 className="inline-block p-3 mb-5 text-xl font-medium rounded-lg bg-primary">
                  {item.name}
                </h3>
                <div className="aspect-video">
                  <iframe
                    width="775"
                    height="436"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="Youtube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="object-fill w-full h-full"
                  ></iframe>
                </div>
              </div>
            ))}
        </div>
      );
    }

    if (type === "similar") {
      const { results } = data;
      return (
        <div className="w-full">
          <div className="flex py-4 overflow-y-auto gap-x-5">
            {results.length > 0 &&
              results.map((item) => (
                <MovieCardTVSM
                  item={item}
                  key={item.id}
                  check="movies"
                ></MovieCardTVSM>
              ))}
          </div>
        </div>
      );
    }
  }
}

export default MoviePageDetail;
