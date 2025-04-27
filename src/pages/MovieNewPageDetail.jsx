import { useParams } from "react-router-dom";
// import useSWR from "swr";
// import { API, fetcher } from "../configAPI/configAPI";
// import MovieCardTVSM from "../components/movie/MovieCardTVSM";
import { useEffect, useState } from "react";
import { movieAPI } from "../configAPI/movie";
import Button from "../components/button/Button";

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
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    <>
      {isLoading && <p>No data</p>}
      {!isLoading && (
        <div className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-start">
              <h1 className="mb-2 text-2xl font-bold text-titleMovie">
                {movie.origin_name}
              </h1>
              <h4 className="mb-3 text-lg">{movie.name}</h4>
              <div className="flex items-center gap-2">
                {movie?.tmdb?.vote_average ||
                  (movie?.tmdb?.vote_average === 0 && (
                    <div className="flex items-center gap-1 text-contentSecond">
                      <i className="text-yellow-500 bx bxs-star"></i>
                      <span>{movie?.tmdb?.vote_average}</span>
                    </div>
                  ))}
                <div className="flex items-center gap-2 text-contentSecond">
                  <span>{movie.year}</span>
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
              {/* )} */}

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
                    src={`${movie.thumb_url}`}
                    className="object-cover w-full h-full rounded-lg"
                    alt=""
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
          </div>
          {/* <div className="h-[400px] max-w-[800px] mx-auto rounded-xl overflow-hidden -mt-[200px] z-10 relative">
            {movie.poster_url === null || movie.poster_url === "" ? (
              <div className="w-full h-full bg-black"></div>
            ) : (
              <img
                src={`${movie.poster_url}`}
                className="object-cover w-full h-full "
                alt=""
              />
            )}
          </div> */}

          {/* <MovieMeta type="credits"></MovieMeta> */}
          {/* <MovieMeta type="videos"></MovieMeta> */}
          {/* <MovieMeta type="similar"></MovieMeta> */}
        </div>
      )}
    </>
  );
};

// function MovieMeta({ type }) {
//   const { id } = useParams();
//   const { data, error } = useSWR(API.getMovieMeta(id, type), fetcher);
//   if (!data) return null;
//   if (type === "credits") {
//     const { cast } = data;
//     return (
//       <div className="py-10">
//         <h1 className="mb-10 text-3xl text-center">Casts</h1>
//         <div className="grid grid-cols-4 gap-5">
//           {cast.length > 0 &&
//             cast.slice(0, 4).map((item) => (
//               <div className="cast-item" key={item.id}>
//                 <img
//                   src={API.getImage(item.profile_path)}
//                   className="w-full h-[350px] object-cover rounded-lg mb-3"
//                   alt=""
//                 />
//                 <h3 className="text-xl font-medium">{item.name}</h3>
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   } else {
//     if (type === "videos") {
//       const { results } = data;
//       console.log(results);
//       return (
//         <div className="py-10">
//           {results.length > 0 &&
//             results.slice(0, 2).map((item) => (
//               <div key={item.id} className="mb-10">
//                 <h3 className="inline-block p-3 mb-5 text-xl font-medium rounded-lg bg-primary">
//                   {item.name}
//                 </h3>
//                 <div className="aspect-video">
//                   <iframe
//                     width="775"
//                     height="436"
//                     src={`https://www.youtube.com/embed/${item.key}`}
//                     title="Youtube video player"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     referrerPolicy="strict-origin-when-cross-origin"
//                     allowFullScreen
//                     className="object-fill w-full h-full"
//                   ></iframe>
//                 </div>
//               </div>
//             ))}
//         </div>
//       );
//     }

//     if (type === "similar") {
//       const { results } = data;
//       return (
//         <div className="w-full">
//           <div className="flex py-4 overflow-y-auto gap-x-5">
//             {results.length > 0 &&
//               results.map((item) => (
//                 <MovieCardTVSM
//                   item={item}
//                   key={item.id}
//                   check="movies"
//                 ></MovieCardTVSM>
//               ))}
//           </div>
//         </div>
//       );
//     }
//   }
// }

export default MovieNewPageDetail;
