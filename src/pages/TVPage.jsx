import { useEffect, useState } from "react";
import { API, fetcher } from "../configAPI/configAPI";
import MovieCard from "../components/movie/MovieCard";
import Button from "../components/button/Button";
import useDebounceQuery from "../hooks/useDebounceQuery";
import useSWRInfinite from "swr/infinite";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { v4 } from "uuid";
const itemPerPage = 20;
const TVPage = () => {
  const [query, setQuery] = useState("");
  const [pageDefault, setPageDefault] = useState(1);
  const [url, setUrl] = useState(API.getTVList(pageDefault));
  const debounceValue = useDebounceQuery(query, 500);
  const { data, error, size, setSize } = useSWRInfinite((index) => {
    return url.replace("page=1", `page=${index + 1}`);
  }, fetcher);

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  let movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  let loading = !data && !error;
  let lastPage = data && data[data.length - 1].results.length;
  let isReachingEnd = lastPage < itemPerPage;
  const handleSearch = () => {
    if (query) {
      setUrl(API.getSearchTV(query, pageDefault));
    }
  };

  useEffect(() => {
    if (debounceValue == "") {
      setUrl(API.getTVList(pageDefault));
    }
  }, [pageDefault, debounceValue]);

  return (
    <>
      <div className="container pb-9">
        <div className="flex items-center mt-10 mb-10 ">
          <div className="w-full p-4 bg-[#2f3032]">
            <input
              type="text"
              className="w-full outline-none bg-transparent placeholder:text-[15px]"
              placeholder="Type here to search..."
              value={query}
              onChange={handleChangeQuery}
            />
          </div>
          <button
            className="px-5 py-4 transition-all bg-primary hover:opacity-80"
            onClick={handleSearch}
          >
            <i className="text-[16px] bx bx-search"></i>
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-4 gap-5">
            {new Array(itemPerPage).fill(0).map(() => (
              <LoadingSkeleton key={v4()}></LoadingSkeleton>
            ))}
          </div>
        )}
        {!loading && (
          <div className="grid grid-cols-4 gap-5">
            {movies?.length > 0 &&
              movies.map((item) => (
                <div key={item.id}>
                  <MovieCard item={item} check="tv"></MovieCard>
                </div>
              ))}
          </div>
        )}
        <Button
          className="max-w-[150px] mx-auto mt-10"
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd}
        >
          Load more
        </Button>
      </div>
    </>
  );
};

export default TVPage;
