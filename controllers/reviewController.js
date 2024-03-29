const { response } = require('express');
const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    count: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.setTourUserIds= (req,res,next)=>{
  // allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
}

exports.createReview = factory.createOne(Review);

exports.getReviewById = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.params.id);

  response.status(201).json({
    status: 'success',
    data: review,
  });
});

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
