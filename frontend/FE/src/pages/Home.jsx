import React, { useState, useEffect } from "react";
import Header from '../Components/Header';
import Navbar from '../Components/navbar';
import  MovieList from '../Components/Movielist';
import kanappa from '../assets/kanappa.jpg';
import kubera from '../assets/kubera.jpeg';
import jw from '../assets/jw.jpg';
import devara from '../assets/devara.webp';
import sv from '../assets/sv.avif';
import szp from '../assets/szp.jpg';
import '../App.css';

function Home(){
    
const [selectedLocation, setSelectedLocation] = useState('');
        const [movies, setMovies] = useState([]);

        const posterMap = {
          'Kannappa' : kanappa,
          'Kubera' : kubera,
          'Jurassic World' : jw,
          'Devara' : devara,
          'Sankrantiki Vastunnam' : sv,
          'Sitaare Zameen Par' : szp
        };


useEffect(() => {

   const url = selectedLocation
    ? `http://localhost:5000/api/movies?location=${selectedLocation}`
    : `http://localhost:5000/api/movies`; //no filter → get all movies

  if (url) {
    fetch(`http://localhost:5000/api/movies?location=${selectedLocation}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched movies:", data);
        setMovies(data);})
      .catch(err => console.error(err));
  }
}, [selectedLocation]);

    return(

        <div style={{backgroundColor:"#0f0f00", color: '#eeeeee'}}>
            <Header selectedLocation={selectedLocation} onLocationChange={setSelectedLocation}/>
            <Navbar/>

{movies.length > 0 ? (
        <div className='moviegrid'>
          {movies.map((movie) => (
            <MovieList
              key={movie._id}
              {...movie}
              poster={posterMap[movie.title]}
            />
          ))}
        </div>
      ) : (
        <p style={{ color: "#fff" }}>No movies found for this location.</p>
      )}

        </div>
    );
};

export default Home;