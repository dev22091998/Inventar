import React from "react";

function Search({ search, setSearch, placeholder }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || "Search..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
