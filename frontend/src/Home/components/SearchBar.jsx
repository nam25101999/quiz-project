import React, { useState } from 'react';
import '../styles/SearchBar.css';
import api from '../../axios';;


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isActive, setIsActive] = useState(false);


  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };
  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Vui lòng nhập nội dung tìm kiếm.');
      return;
    }
  
    try {
      const response = await api.get(`/api/search`, { params: { query } });
  
      if (response.data.success) {
        setResults(response.data.data);
        setError('');
      } else {
        setResults([]);
        setError(response.data.message || 'Không tìm thấy kết quả.');
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setError('Đã xảy ra lỗi khi tìm kiếm.');
    }
  };

  return (
    <div className='search'>
      <div
        className={`search-bar ${isActive ? 'active' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        >
        <button className='button_search' onClick={handleSearch}>
          <i class="icon_search fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          className='input_search'
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />        
      </div>
      {error && <p className="error">{error}</p>}
      <div className="search-results">
        {results.map((result) => (
          <div key={result._id}>
            <h3>{result.title}</h3>
            <p>{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;