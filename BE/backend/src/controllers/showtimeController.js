const Showtime = require('../models/showtimes');
const Theatre = require('../models/theatres')

exports.getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await Showtime.find().populate('movie theatre');
        res.status(200).json(showtimes);
    }
    catch(err){
        
        res.status(500).json({message : 'Server error'});
    }
};


exports.getShowtimeById = async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id).populate('movie theatre');
        if(!showtime) return res.status(404).json({message : 'Showtime not found'});

        //res.status(200).json(showtime); old

        res.json({
      seats: showtime.seats,
      capacity: showtime.capacity, // Include this
    });//added
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};


exports.getShowtimesForMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        console.log('Requested movieId:', movieId);

        const showtimes = await Showtime.find({ movie: movieId }).populate('theatre');

        if (!showtimes.length) {
            console.log('No showtimes found for this movie.');
            return res.status(404).json({ message: 'No showtimes found for this movie' });
        }

        const grouped = {};

        showtimes.forEach(st => {
           const dateStr = st.startTime.toISOString().split('T')[0];

            const theatreName = st.theatre.name;

            const timeStr = st.startTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
            });

            if (!grouped[dateStr]) {
                grouped[dateStr] = {};
            }

            if (!grouped[dateStr][theatreName]) {
                grouped[dateStr][theatreName] = [];
            }

            // Push time and showtimeId
            grouped[dateStr][theatreName].push({
                time: timeStr,
                showtimeId: st._id
            });
        });

        const dates = Object.keys(grouped);
        const showtimesByDate = {};

        dates.forEach(date => {
            const theatres = [];

            for (const [theatreName, times] of Object.entries(grouped[date])) {
                theatres.push({ name: theatreName, times }); // now times is array of objects { time, showtimeId }
            }

            showtimesByDate[date] = theatres;
        });

        console.log('Final response:', { dates, showtimesByDate });
        res.status(200).json({ dates, showtimesByDate });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};



exports.createShowtime = async (req, res) => {
    try {
        const {movieId, theatreId, startTime } = req.body;

        const theatre = await Theatre.findById(theatreId);
        if(!theatre) return res.status(404).json({message : 'Theatre not found'})

        const totalSeats = theatre.totalSeats;

        const rows = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const seats = [];
        let seatsPerRow;
        if (totalSeats === 120) {
           seatsPerRow = 12;
        } else if (totalSeats === 150) {
           seatsPerRow = 15;
        } else {
           seatsPerRow = 10; // fallback if needed
        }     
        const numRows = Math.ceil(totalSeats/seatsPerRow);

        let seatCount = 0;

        for(let r = 0; r < numRows; r++){
            const rowLetter = rows[r];
            for(let s = 1; s <= seatsPerRow; s++){
                seatCount++;
                if(seatCount > totalSeats) break;

                seats.push({
                    seatNumber: `${rowLetter}${s}`,
                    isBooked: false
                });
            }
        }

        const showtime = new Showtime({
            movie: movieId,
            theatre: theatreId,
            startTime,
            seats,
            capacity: totalSeats
        });

        await showtime.save();

        res.status(201).json({
            message: 'Showtime created successfully',
            showtime
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
};

// Book selected seats for a specific showtime
exports.bookSeats = async (req, res) => {
  try {
    const showtimeId = req.params.id;
    const { seats } = req.body; // Array of seat numbers like ['A1', 'A2']

    const showtime = await Showtime.findById(showtimeId);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }

    let alreadyBooked = [];

    const updatedSeats = showtime.seats.map(seat => {
      if (seats.includes(seat.seatNumber)) {
        if (seat.isBooked) {
          alreadyBooked.push(seat.seatNumber);
        }
        return { ...seat, isBooked: true };
      }
      return seat;
    });

    if (alreadyBooked.length) {
      return res.status(400).json({
        message: 'Some seats are already booked',
        alreadyBooked
      });
    }

    showtime.seats = updatedSeats;
    await showtime.save();

    res.status(200).json({
      message: 'Seats booked successfully',
      bookedSeats: seats
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

