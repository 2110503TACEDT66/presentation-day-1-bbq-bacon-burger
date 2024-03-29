const express = require('express');
const {getHotels, getHotel, createHotel, updateHotel, deleteHotel} = require('../controllers/hotels');

const bookingRouter = require('./bookings');
const reviewRouter = require('./reviews');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');
const {upload} = require('../middleware/upload');
 
// Re-route into other resource routers
router.use('/:hotelId/bookings', bookingRouter);
router.use('/:hotelId/reviews', reviewRouter);

router.route('/').get(getHotels).post(protect, authorize('admin'), upload ,createHotel);
router.route('/:id').get(getHotel).put(protect, authorize('admin'), updateHotel).delete(protect, authorize('admin'), deleteHotel);
module.exports = router;