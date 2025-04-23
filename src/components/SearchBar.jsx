import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(e.target.search.value);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        name="search"
        placeholder="ค้นหาภาพยนต์..."
      />
      <button type="submit">ค้นหา</button>
    </form>
  );
};

export default SearchBar;
