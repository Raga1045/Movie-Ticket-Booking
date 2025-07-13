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

        res.status(200).json(showtime);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};


exports.getShowtimesForMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const showtimes = await Showtime.find({ movie : movieId}).populate('theatre');
        res.status(200).json(showtimes);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
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
            seats
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
