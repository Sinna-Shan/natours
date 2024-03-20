const express = require('express');
const router = express.Router({ mergeParams: true }); // merging routes and getting their params to this router
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
