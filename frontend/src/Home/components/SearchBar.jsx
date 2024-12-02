import React, { useState } from 'react';
import '../styles/SearchBar.css';
import api from '../../axios';;


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

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
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
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