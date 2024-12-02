import React from 'react';
import '../styles/HeaderHome.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Tìm kiếm..." />
      <button type="button">Tìm kiếm</button>
    </div>
  );
};

export default SearchBar;
