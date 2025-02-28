const SearchMovies = () => {
  return (
    <div className="flex items-center mt-10 mb-10 ">
      <div className="w-full p-4 bg-[#2f3032]">
        <input
          type="text"
          className="w-full outline-none bg-transparent placeholder:text-[15px] "
          placeholder="Type here to search..."
        />
      </div>
      <button className="px-5 py-4 bg-primary">
        <i className="text-[16px] bx bx-search"></i>
      </button>
    </div>
  );
};

export default SearchMovies;
