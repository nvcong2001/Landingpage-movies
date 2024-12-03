import React from "react";

const Search = () => {
  return (
    <div className="flex items-center gap-2 p-2 border border-[#565357] rounded-lg ">
      <input
        type="text"
        placeholder="Quick search..."
        className="flex-1 text-white bg-transparent outline-none placeholder:text-sm placeholder:font-semibold placeholder:text-[#565357]"
      />
      <i className="text-2xl bx bx-search"></i>
    </div>
  );
};

export default Search;
