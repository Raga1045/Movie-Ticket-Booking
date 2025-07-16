import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import Logo from '../assets/cineverse.jpg';
import './Showtime.css';

function Showtime() {
  
const { id } = useParams();
  //const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showtimesByDate, setShowtimesByDate] = useState({});
  const [selectedDate, setSelectedDate] = useState('');

   useEffect(() => {
    fetch(`http://localhost:5000/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [id]);


  useEffect(() => {
    fetch(`http://localhost:5000/api/showtimes/movie/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch showtimes');
        return res.json();
      })
      .then(data => {
        setDates(data.dates || []);
        setShowtimesByDate(data.showtimesByDate || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

   if (!movie) return <p>Loading movie info...</p>;
  if (loading) return <p>Loading showtimes...</p>;
  if (error) return <p>{error}</p>;

  

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>

        <div className="showtime-header">
          <img src={Logo} className="cine-img" alt="Cineverse Logo" />

          <div>
            <span style={{ color: '#00adb5' }}>Movie Name:</span>{' '}
            <span style={{ fontWeight: 'normal', color: '#eeeeee' }}> {movie.title} </span>
          </div>

        </div>
      </h2>

      <div className="showtime-container">

        <div
          style={{ display: 'flex', gap: '15px', marginTop: '0px',justifyContent: 'center',flexWrap: 'wrap' }}>
          {dates.map((date, index) => (
            <button key={index} className={`Sdate-btn ${selectedDate === date ? 'active' : ''}`} onClick={() => setSelectedDate(date)} > {date} </button>
          ))}

          {selectedDate && (
            <button className="Sdate-btn clear-btn" onClick={() => setSelectedDate('')} style={{ backgroundColor: '#393e46', color: '#eeeeee' }} > Clear Filter </button>
          )}
        </div>

        <div className="showtimes" style={{ marginTop: '30px' }}>
          {selectedDate ? (
            showtimesByDate[selectedDate]?.length ? (
              <>
                <h2 style={{ color: '#00adb5', marginBottom: '15px' }}>{selectedDate} </h2>
                {showtimesByDate[selectedDate].map((theatre, index) => (
                  <div key={index} className="theatre-block" style={{ marginBottom: '25px' }} >
                    <h3 style={{ marginBottom: '10px',color: '#00adb5', fontSize: '20px' }} >
                      {theatre.name}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {theatre.times.map((time, i) => (
                        <button key={i} className="time-btn"> {time} </button>
                      ))}
                    </div>

                  </div>
                ))}
              </>
            ) : (
              <p>No showtimes for selected date.</p>
            )
          ) : (
            Object.entries(showtimesByDate).map(([date, theatres]) => (
              <div key={date} style={{ marginBottom: '30px' }}>
                <h2 style={{ color: '#00adb5', marginBottom: '15px' }}>{date}</h2>

                {theatres.map((theatre, index) => (
                  <div key={index} className="theatre-block" style={{ marginBottom: '25px' }}>
                    <h3 style={{marginBottom: '10px', color: '#00adb5',fontSize: '20px' }}> {theatre.name} </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      
                      {theatre.times.map((time, i) => (
                        <button key={i} className="time-btn"> {time} </button>
                      ))}

                    </div>
                  </div>
                ))}

              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Showtime;
