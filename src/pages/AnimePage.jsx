import { useEffect, useState } from "react";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { movieTotalAPI } from "../configAPI/movieTotal";
import Button from "../components/button/Button";
import GeneralCard from "../components/movie/GeneralCard";

const itemPerPage = 20;

const AnimePage = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchDataMovie = async (currentPage = 1, isReset = false) => {
    setIsloading(true);
    try {
      const response = await movieTotalAPI(location.pathname, currentPage);
      const newItems = response.data.data.items;
      if (isReset) {
        setMovies(newItems);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newItems]);
      }
      if (newItems.length < itemPerPage) {
        setIsReachingEnd(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchDataMovie(nextPage);
  };

  useEffect(() => {
    const resetAndFetch = async () => {
      setPage(1);
      setMovies([]);
      setIsReachingEnd(false);
      await fetchDataMovie(1, true);
    };
    resetAndFetch();
  }, [location.pathname]);

  return (
    <div className="container pb-9">
      {isLoading && (
        <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {new Array(itemPerPage).fill(0).map(() => (
            <LoadingSkeleton key={v4()} />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {movies.length > 0 &&
            movies.map((item) => (
              <div key={item.id}>
                <GeneralCard item={item} check="movie" />
              </div>
            ))}
        </div>
      )}

      {!isLoading && !isReachingEnd && (
        <Button
          className="max-w-[160px] mx-auto mt-10"
          onClick={handleLoadMore}
          disabled={isReachingEnd}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

export default AnimePage;
