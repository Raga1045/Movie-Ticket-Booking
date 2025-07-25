const Movie = require('../models/movies');
const Theatre = require('../models/theatres');
const Showtime = require('../models/showtimes');


exports.getAllMovies = async (req, res) => {
  try {
    const { genre, language, location , title} = req.query;

    const filter = {};
    if (genre) filter.genre = genre;
    if (language) filter.language = language;
    if (title) {
      filter.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive search
    }

    let movies;

    if (location) {
      // Step 1: Find theatres in that location
      const theatres = await Theatre.find({ location });

      const theatreIds = theatres.map(t => t._id);

      // Step 2: Find showtimes for those theatres
      const showtimes = await Showtime.find({ theatre: { $in: theatreIds } });

      const movieIds = showtimes.map(s => s.movie);

      // Step 3: Filter movies by those IDs + other filters
      movies = await Movie.find({ 
        _id: { $in: movieIds },
        ...filter
      });

    } else {
      movies = await Movie.find(filter);
    }

    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).json({message : 'Movie not found'});

        res.status(200).json(movie);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};

exports.getTheatresForMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const showtimes = await Showtime.find({movie : movieId}).populate('theatre');
        const theatres = showtimes.map(s => s.theatre);

        const uniqueTheatres = [];
        const theatreIds = new Set();

        for(const theatre of theatres){
            const id = theatre._id.toString();
            if(!theatreIds.has(id)){
                theatreIds.add(id);
                uniqueTheatres.push(theatre);
            }
        }

        res.status(200).json(uniqueTheatres);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};





