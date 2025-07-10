import Header from '../Components/header';
import Navbar from '../Components/navbar';

// src/pages/MovieReview.jsx

import '../App.css';
import { useLocation } from 'react-router-dom';
// import './MovieReview.css'; // Optional: for styling

function MovieReview() {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  return (

    <div>
      <Header/>
      <Navbar/>
    <div className="movie-review">
      <div className="movie-details">
        <img src={movie.poster} alt={movie.title} className="review-poster" />
        
        <div className="details-text">
          <h1 style={{fontSize:"50px",color:"#00adb5"}}>{movie.title}</h1>
          <p style={{fontSize:"28px"}}><strong>Genre:</strong> {movie.genre}</p>
          <p style={{fontSize:"28px"}}><strong>Language:</strong> {movie.lang}</p>
          <p style={{fontSize:"28px"}}><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p style={{fontSize:"28px"}}><strong>Duration:</strong> {movie.duration}</p>
          <p style={{fontSize:"28px"}}><strong>About Movie:</strong> {movie.description}</p>
          <button className="book-now-btn">BOOK NOW</button>
        </div>
      </div>

      <br></br>
       <br></br>

      <div className="movie-cast">
        <h3 style={{fontSize:"28px"}}>Cast:</h3>
        <div className="cast-list">
          {movie.cast?.map((member, index) => (
            <div key={index} className="cast-item">
              <img src={member.image} alt={member.name} />
              <p>{member.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="movie-reviews">
        <h3 style={{fontSize:"28px"}}>Reviews:</h3>
        {movie.reviews?.map((review, index) => (
          <div key={index} className="review-box">
            {review}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default MovieReview;
