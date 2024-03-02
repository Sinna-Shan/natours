const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures')

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

/*Tour.find()
  .where('duration')
  .equals(5)
  .where('difficulty')
  .equals('easy');*/



exports.getAllTours = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();

    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      message: 'Success',
      results: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(400).json({
      message: 'failed',
      err: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(200).json({
      message: 'Success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: 'failed',
      err: err.message,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      message: 'Success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      message: 'failed',
      err: err.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      message: 'Success',
      data: 'tour updated successfully',
    });
  } catch (err) {
    res.status(400).json({
      message: 'failed',
      err: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Success',
      data: 'tour deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      message: 'failed',
      err: err.message,
    });
  }
};
