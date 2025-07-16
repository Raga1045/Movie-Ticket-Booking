import Header from '../Components/header';
import Navbar from '../Components/navbar';
import Logo from '../assets/cineverse.jpg';

// src/pages/MovieReview.jsx

import '../App.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import './MovieReview.css'; // Optional: for styling

import React, { useState, useEffect } from 'react';

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

function MovieReview() {
const {id} = useParams();
  const navigate = useNavigate();
const [movie,setMovie] = useState(null);

useEffect(() => {
  console.log('Movie ID:', id);
  fetch(`http://localhost:5000/api/movies/${id}`)
  .then(res => {
    if(!res.ok) throw new Error('Failed to fecth movie');
    return res.json();
  })
  .then(data => setMovie(data))
  .catch(err => console.error(err));
}, [id]);

  const handle=()=>{
     navigate( `/showtime/${id}` )
  };

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  console.log(movie)
  return (

    <div>
        <img src={Logo} className="cine-img" style ={{height : '150px', paddingLeft : '100px'}} />
{/*       
      <Header/> */}
      <Navbar/>
    <div className="movie-review">
      <div className="movie-details">
        <img src={movie.poster} alt={movie.title} className="review-poster" />
        
        <div className="details-text">
          <h1 style={{fontSize:"50px",color:"#00adb5"}}>{movie.title}</h1>
          <p style={{fontSize:"24px"}}><strong style={{color:"#00adb5"}}>Genre:</strong> {movie.genre}</p>
          <p style={{fontSize:"24px"}}><strong style={{color:"#00adb5"}}>Language:</strong> {movie.lang}</p>
          <p style={{fontSize:"24px"}}><strong style={{color:"#00adb5"}}>Release Date:</strong> {formatDate(movie.releaseDate)}</p>
          <p style={{fontSize:"24px"}}><strong style={{color:"#00adb5"}}>Duration:</strong> {movie.duration}</p>
          <p style={{fontSize:"24px"}}><strong style={{color:"#00adb5"}}>About Movie:</strong> {movie.description}</p>
          <button className="book-now-btn" onClick={handle}>BOOK NOW</button>
        </div>
      </div>

      <br></br>
       <br></br>

      <div className="movie-cast">
        <h3 style={{fontSize:"28px",color:"#00adb5"}}>Cast:</h3>
        <div className="cast-list">
          {movie.cast?.map((member, index) => (
            <div key={index} className="cast-item">
              <img src={member.image} alt={member.name} />
              <p className="memname">{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <br></br>
       <br></br>
       <br></br>

      <div className="movie-reviews">
        <h3 style={{fontSize:"28px",color:"#00adb5"}}>Reviews:</h3>
        {movie.reviews?.map((review, index) => (
          <div style={{fontSize:"20px"}}key={index} className="review-box">
            {review}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default MovieReview;
