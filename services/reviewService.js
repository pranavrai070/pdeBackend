const Review = require('../models/Review');

const createReview = async (appointmentId, rating, comment, fromUser, toUser) => {
  try {
    const review = new Review({ appointment: appointmentId, rating, comment, fromUser, toUser });
    await review.save();
    return { success: true, message: 'Review added successfully', review };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = createReview;