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
         console.log('Requested movieId:', movieId);

        const showtimes = await Showtime.find({ movie : movieId}).populate('theatre');
            //gets all the showtimes for a movie with the given id

        if(!showtimes.length) {
            console.log(' No showtimes found for this movie.');
            return res.status(404).json({ message : 'No showtimes found for this movie'})
        }

        const grouped = {};

        showtimes.forEach(st => {
            //for each showtime format the date
            const dateStr = st.startTime.toLocaleDateString('en-US',{
                month : 'short',
                day: '2-digit'
            });

            //find the theatre name
            const theatreName = st.theatre.name;
            //format the time
                 const timeStr = st.startTime.toLocaleTimeString('en-US',{
                hour : 'numeric',
                minute: '2-digit',
            });
            
            //it checks if that date is already there or not if not there then creates an empty object
            if(!grouped[dateStr]){
                grouped[dateStr] = {};
            }

            //it checks for the theatre
            if(!grouped[dateStr][theatreName]){
                grouped[dateStr][theatreName] = [];
            }

            //finally pushes the time to the theatre on the particular date
            grouped[dateStr][theatreName].push(timeStr);
        });

        const dates = Object.keys(grouped); // so dates is just an array of all unique date strings you built keys for

        const showtimesByDate = {}; // this object will hold the final formatted version

        dates.forEach(date => {
            const theatres = [];
            
            for(const[theatreName, times] of Object.entries(grouped[date])){ //Object.entries(someObject) converts an object’s keys and values into an array of [key, value] pairs.
                theatres.push({ name: theatreName, times}); //each theatre is an object with name and times
            }

            
            showtimesByDate[date] = theatres;
        });

        console.log('Final response:', {dates, showtimesByDate});
        res.status(200).json({ dates, showtimesByDate});

    }
    catch(err){
        console.error(err);
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
