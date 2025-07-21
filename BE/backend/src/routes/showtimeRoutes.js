const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeController');

router.get('/', showtimeController.getAllShowtimes);
router.get('/:id', showtimeController.getShowtimeById);
router.get('/movie/:id', showtimeController.getShowtimesForMovie);
router.post('/', showtimeController.createShowtime);
router.post('/:id/book', showtimeController.bookSeats); // New route for booking

module.exports = router;

