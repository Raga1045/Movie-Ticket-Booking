import React, { useState } from 'react';
import './Header.css';
import Logo from '../assets/cineverse.jpg';

function Header({ selectedLocation, onLocationChange, searchTerm, onSearchTermChange }) {
  const [locationInput, setLocationInput] = useState(selectedLocation || '');
  const [movieInput, setMovieInput] = useState(searchTerm || '');

  const handleLocationSearch = () => {
    onLocationChange(locationInput);
  };

  const handleMovieSearch = () => {
    onSearchTermChange(movieInput);
  };

  return (
    <div className="head">
      <img src={Logo} className="cine-img" />

      <input
        className="location-input"
        placeholder="location"
        value={locationInput}
        onChange={(e) => setLocationInput(e.target.value)}
        onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  }}
      />
      {/* <button className="h-btn" onClick={handleLocationSearch}>
        Search
      </button> */}

      <input
        className="search-input"
        placeholder="search your movie"
        value={movieInput}
        onChange={(e) => setMovieInput(e.target.value)}
        onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleMovieSearch();
    }
  }}
      />
      {/* <button className="h-btn" onClick={handleMovieSearch}>
        Search
      </button> */}
    </div>
  );
}

export default Header;
