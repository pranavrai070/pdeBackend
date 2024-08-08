const Review = require('../models/Review');

const createReview = async (req, res) => {
  try {
    const { appointmentId, rating, comment } = req.body;
    const review = new Review({ appointment: appointmentId, fromUser: req.user.userId, toUser: req.body.toUserId, rating, comment });
    await review.save();
    res.status(200).json({ success: true, message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports ={ createReview}
