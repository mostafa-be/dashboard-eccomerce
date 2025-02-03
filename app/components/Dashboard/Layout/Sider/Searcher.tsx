import { Search } from "lucide-react";
import React from "react";

const Searcher = () => {
  return (
    <div className="hidden md:block relative ">
      <Search
        size={20}
        className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-600/90 dark:text-gray-800/90"
      />
      <input
        type="search"
        name="search"
        id="search"
        title="Search"
        placeholder="Search..."
        className="h-10 w-72 lg:w-96 bg-slate-100/70 dark:bg-white/95 pl-10 outline-none rounded-lg placeholder:text-lg placeholder:text-gray-600/90 dark:placeholder:text-gray-800/90"
      />
    </div>
  );
};

export default Searcher;
