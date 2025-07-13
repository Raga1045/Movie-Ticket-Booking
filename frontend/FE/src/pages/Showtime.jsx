import { useLocation } from "react-router-dom";

function Showtime() {
  const location = useLocation();
  const movie = location.state?.movie;

  const dates = ['Jul 11', 'Jul 12', 'Jul 13', 'Jul 14'];

  const theatreData = {
    Kannappa: [
      { name: 'PVR Cinemas', times: ['10:00 AM', '1:00 PM', '4:00 PM'] },
      { name: 'Asian Cinemas', times: ['11:00 AM', '2:00 PM', '5:00 PM'] }
    ],
    Kubera: [
      { name: 'INOX Banjara Hills', times: ['9:00 AM', '12:00 PM', '6:00 PM'] },
      { name: 'GVK One Mall', times: ['10:30 AM', '1:30 PM', '4:30 PM'] }
    ],
    Sitaare: [
      { name: 'INOX Banjara Hills', times: ['9:00 AM', '12:00 PM', '6:00 PM'] },
      { name: 'GVK One Mall', times: ['10:30 AM', '1:30 PM', '4:30 PM'] }
    ],
    Jurassic: [
      { name: 'INOX Banjara Hills', times: ['9:00 AM', '12:00 PM', '6:00 PM'] },
      { name: 'GVK One Mall', times: ['10:30 AM', '1:30 PM', '4:30 PM'] }
    ],
    Devara: [
      { name: 'INOX Banjara Hills', times: ['9:00 AM', '12:00 PM', '6:00 PM'] },
      { name: 'GVK One Mall', times: ['10:30 AM', '1:30 PM', '4:30 PM'] }
    ],
    Sankranthi: [
      { name: 'INOX Banjara Hills', times: ['9:00 AM', '12:00 PM', '6:00 PM'] },
      { name: 'GVK One Mall', times: ['10:30 AM', '1:30 PM', '4:30 PM'] }
    ]
    // Add more as needed
  };

  const theatres = theatreData[movie?.title] || [];

  if (!movie) {
    return <p>Movie not found!</p>;
  }

  return (
    <div className="showtime-container" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>
        Movie Name: <span style={{ fontWeight: 'normal',color:"#eeeeee" }}>{movie.title}</span>
      </h2>

      
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
        {dates.map((date, index) => (
          <button key={index} className="date-btn">{date}</button>
        ))}
      </div>

      
      <div style={{ marginTop: '30px' }}>
        {theatres.map((theatre, index) => (
          <div key={index} className="theatre-block" style={{ marginBottom: '25px' }}>
            <h3 style={{ marginBottom: '10px',color:"#eeeeee" }}>{theatre.name}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {theatre.times.map((time, i) => (
                <button key={i} className="time-btn">{time}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showtime;
