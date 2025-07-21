import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./seatSelection.css";

const SeatSelection = () => {
  const { id: showtimeId } = useParams();
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Fetch seat data for the showtime
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/showtimes/${showtimeId}`);
        setSeats(res.data.seats);
      } catch (error) {
        console.error("Failed to fetch seat data", error);
      }
    };

    fetchSeats();
  }, [showtimeId]);

  // Handle seat selection/deselection
  const handleSeatClick = (seatNumber, isBooked) => {
    if (isBooked) return; // Ignore clicks on booked seats

    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  // Book selected seats
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat to book.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/showtimes/${showtimeId}/book`, {
        seats: selectedSeats,
      });

      alert("Seats booked successfully!");
      setSelectedSeats([]);
      // Refresh seats to reflect booked status
      const res = await axios.get(`http://localhost:5000/api/showtimes/${showtimeId}`);
      setSeats(res.data.seats);
    } catch (error) {
      console.error("Error booking seats", error);
      alert("Failed to book seats");
    }
  };

  return (
    <div className="seat-selection-container">
      <h2>Select Your Seats</h2>
      <div className="seat-grid">
        {seats.map(({ seatNumber, isBooked }) => (
          <div
            key={seatNumber}
            className={`seat 
              ${isBooked ? "booked" : ""} 
              ${selectedSeats.includes(seatNumber) ? "selected" : ""}`}
            onClick={() => handleSeatClick(seatNumber, isBooked)}
          >
            {seatNumber}
          </div>
        ))}
      </div>
      <button className="book-button" onClick={handleBooking}>
        Book Selected Seats
      </button>
    </div>
  );
};

export default SeatSelection;
