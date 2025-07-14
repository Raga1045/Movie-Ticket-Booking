import React, { useState } from 'react'; //useState - you want your input boxes to remember what the user types
import './Header.css';
import Logo from '../assets/cineverse.jpg';

function Header({ selectedLocation, onLocationChange }){ // onLocationChange - a prop - this a callback that the parent app provides
      const [locationInput, setLocationInput] = useState('');

  const handleSearch = () => {
    onLocationChange(locationInput);
  };
    const [search, setSearch] = useState('');

    return (
        <div className="head">
            <img src={Logo} className='cine-img'/> 
            <input className="location-input" placeholder='location' value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <input className="search-input" placeholder='search your movie' value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default Header;