import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
