const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
  
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
  
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(authController.protect,authController.restrictTo('admin','lead-guide'),tourController.deleteTour);

module.exports = router;
