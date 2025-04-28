import { useParams } from "react-router-dom";
// import MovieCardTVSM from "../components/movie/MovieCardTVSM";
import { useEffect, useState } from "react";
import { movieAPI } from "../configAPI/movie";
import Button from "../components/button/Button";
import { newUpdatev1API } from "../configAPI/newUpdate";
import MovieCardFilm from "../components/movie/MovieCardFilm";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { v4 } from "uuid";
import LoadingSquareSkeleton from "../components/loading/LoadingSquareSkeleton";

const itemPerPage = 6;
const MovieNewPageDetail = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [episodess, setEpisodess] = useState([]);
  const fetchMovieDetail = async () => {
    setIsLoading(true);

    try {
      const response = await movieAPI(params.id);
      setMovie(response.data.movie);
      setEpisodess(response.data.episodes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [params.id]);

  return (
    <>
      {isLoading && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3 mb-40">
            <div className="flex flex-col items-start gap-3">
              <LoadingSquareSkeleton className="h-[35px] rounded-lg w-full" />
              <LoadingSquareSkeleton className="h-[15px] rounded-lg w-full" />
              <LoadingSquareSkeleton className="h-[15px] mt-2 rounded-lg w-full" />
              <LoadingSquareSkeleton className="h-[150px] rounded-lg w-full" />
              <LoadingSquareSkeleton className="h-[50px] mt-4 rounded-lg w-[100px]" />
              <LoadingSquareSkeleton className="h-[50px]  rounded-lg w-[100px]" />
              <LoadingSquareSkeleton className="h-[70px] rounded-lg w-full mt-auto" />
            </div>
            <LoadingSquareSkeleton className="h-[550px] rounded-lg w-full" />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3 mb-40">
            <div className="flex flex-col items-start">
              <h1 className="mb-2 text-2xl font-bold text-titleMovie">
                {movie.origin_name}
              </h1>
              <h4 className="mb-3 text-lg">{movie.name}</h4>
              <div className="flex items-center gap-2">
                {Number(movie?.tmdb?.vote_average) > 0 && (
                  <div className="flex items-center gap-1 text-contentSecond">
                    <i className="text-yellow-500 bx bxs-star" />
                    <span>{Number(movie?.tmdb?.vote_average).toFixed(2)} </span>
                  </div>
                )}

                {Number(movie?.tmdb?.vote_average) === 0 && (
                  <div className="flex items-center gap-1 text-contentSecond">
                    <i className="text-yellow-500 bx bxs-star" />
                    <span>0</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-contentSecond">
                  <span>{movie.time}</span>
                  <span>{movie.year}</span>
                  <span className="px-2 text-sm  rounded-[4px] font-bold  text-white bg-red-700">
                    {movie.quality}
                  </span>
                </div>
              </div>
              <div className="text-[16px]  leading-relaxed ">
                <p className="mb-5 text-left text-contentSecond text-fiveLine">
                  {movie.content}
                </p>
              </div>
              {movie?.category && movie.category.length > 0 && (
                <div className="mb-2">
                  <span className="text-contentSecond">Thể loại: </span>
                  {movie.category.map((item, index) => (
                    <span key={item.id}>
                      {item.name}
                      {index !== movie.category.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 mb-5">
                <span className="flex items-center justify-center p-3 border rounded-full cursor-pointer border-contentSecond hover:bg-primary ">
                  <i className="bx bx-plus"></i>
                </span>
                <span className="font-bold">YÊU THÍCH</span>
              </div>

              <div className="mb-2">
                <Button
                  to={`${
                    episodess[0]?.server_data.length > 0 &&
                    episodess[0]?.server_data[0].slug
                  }`}
                  className="flex items-center gap-2 w-max"
                >
                  <i className="text-xl bx bx-play-circle"></i>
                  <span>Xem Phim</span>
                </Button>
              </div>

              <div className="mt-auto text-twoLine">
                {movie?.country && movie.country.length > 0 && (
                  <div>
                    <span className="text-contentSecond">Quốc gia: </span>
                    {movie.country.length > 0 &&
                      movie.country.map((item) => (
                        <span key={item.id}>{item.name}</span>
                      ))}
                  </div>
                )}

                {movie?.actor && movie.actor.length > 0 && (
                  <div className="text-twoLine">
                    <span className="text-contentSecond">Diễn viên: </span>
                    {movie.actor.length > 0 &&
                      movie.actor.map((item, index) => (
                        <span key={item}>
                          {item}
                          {index !== movie.actor.length - 1 && ", "}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="h-[550px] relative w-full">
              {movie.thumb_url !== null && (
                <div className="absolute inset-0 bg-center bg-no-repeat bg-cover">
                  <img
                    src={`${movie.thumb_url || movie.poster_url}`}
                    className="object-cover w-full h-full rounded-lg"
                    alt=""
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white capitalize">
            Phim Tương tự
          </h2>
          <MovieMeta></MovieMeta>
        </div>
      )}
    </>
  );
};

function MovieMeta() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const fetchMovieUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await newUpdatev1API();
      setMovies(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieUpdate();
  }, []);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex py-4 overflow-x-scroll scroll-box-x gap-x-5">
          {new Array(itemPerPage).fill(0).map(() => (
            <LoadingSkeleton
              className="w-[250px] flex-shrink-0"
              key={v4()}
            ></LoadingSkeleton>
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="flex py-4 overflow-x-scroll scroll-box-x gap-x-5">
          {movies.length > 0 &&
            movies.map((item) => (
              <MovieCardFilm item={item} key={item.id}></MovieCardFilm>
            ))}
        </div>
      )}
    </div>
  );
}

export default MovieNewPageDetail;
