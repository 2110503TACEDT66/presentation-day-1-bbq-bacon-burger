const Review = require('../models/Review');

//@desc Get all reviews
//@route GET /api/v1/reviews
//@access Public
exports.getReviews = async (req, res, next) => {
    let query;
    if (req.user.role != 'admin') {
        query = Review.find({user: req.user.id}).populate({
            path: 'hotel',
            select: 'name address'
        });
    }
    else {
        if (req.params.hotelId) {
            console.log(req.params.hotelId);
            query = Review.find({hotel: req.params.hotelId}).populate({
                path: 'hotel',
                select: 'name address'
            });
        }else {
            query = Review.find().populate({
                path = 'hotel',
                select: 'name address'
            });
        }
    }
    try {
        const reviews = await query;
        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Canot find reviews"
        });
    }
};