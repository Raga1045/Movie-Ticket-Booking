import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./seatSelection.css";

const SeatSelection = () => {
  const { id: showtimeId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsPerRow, setSeatsPerRow] = useState(10); // default
  const [loading, setLoading] = useState(true); // optional loading state

  // ✅ Helper to group seats row-wise
  const getGroupedSeats = (allSeats, perRow) => {
    const rows = [];
    for (let i = 0; i < allSeats.length; i += perRow) {
      rows.push(allSeats.slice(i, i + perRow));
    }
    return rows;
  };

  // ✅ Fetch seat data and capacity
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/showtimes/${showtimeId}`);
        const { seats: fetchedSeats, capacity } = res.data;

        setSeats(fetchedSeats);

        // Dynamically set seats per row
        if (capacity >= 150) {
          setSeatsPerRow(15);
        } else if (capacity >= 120) {
          setSeatsPerRow(12);
        } else {
          setSeatsPerRow(10);
        }

        setLoading(false);
        console.log("Fetched capacity:", capacity);
      } catch (error) {
        console.error("Failed to fetch seat data", error);
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showtimeId]);

  // ✅ Handle seat click
  const handleSeatClick = (seatNumber, isBooked) => {
    if (isBooked) return;

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats(prev => [...prev, seatNumber]);
    }
  };

  // ✅ Handle booking
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }

    try {
      const totalPrice = selectedSeats.length * 500 + 66.08;

      const res = await axios.post(`http://localhost:5000/api/bookings`, {
        showTimeId: showtimeId,
        seats: selectedSeats,
        totalPrice
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const bookingId = res.data.booking._id;
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      console.error("Error booking seats", error);
      alert("Failed to book seats");
    }
  };

  if (loading) return <div>Loading seat layout...</div>;

  return (
    
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <br></br>

      <div className="seat-legend">
  <div className="legend-item">
    <div className="seat available"></div>
    <span>available</span>
  </div>
  <div className="legend-item">
    <div className="seat selected"></div>
    <span>selected</span>
  </div>
  <div className="legend-item">
    <div className="seat booked"></div>
    <span>booked</span>
  </div>
</div>

<br></br>
<br></br>

      <div className="seats-grid">
        {getGroupedSeats(seats, seatsPerRow).map((row, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {row.map(({ seatNumber, isBooked }) => (
              <div
                key={seatNumber}
                className={`seat ${isBooked ? "booked" : ""} ${selectedSeats.includes(seatNumber) ? "selected" : ""}`}
                onClick={() => handleSeatClick(seatNumber, isBooked)}
              >
                {seatNumber}
              </div>
            ))}
          </div>
        ))}
      </div>

      <br></br>
      <br></br>

       <center><div className="screen">
          <br></br><div>
            screen this way
          </div>
      </div></center>

      <br></br>
      <br></br>
      <br></br>

      <button className="book-button" onClick={handleBooking}>
        <b>BOOK SEATS</b>
      </button>

      
    </div>
  );
};

export default SeatSelection;
