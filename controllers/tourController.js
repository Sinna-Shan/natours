const Tour = require('./../models/tourModel');

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
    console.log(req.query);

    // 1A) FILTERING
    // take a cope of query object
    const objQuery = { ...req.query };
    // create an array of excluded fields
    const excluded = ['sort', 'limit', 'page', 'fields'];
    // loop over the array and delete excluded fields from the object
    excluded.forEach((el) => delete objQuery[el]);

    // 2B) ADVANCED FILTERING
    // { difficulty: 'easy', duration:{$gte: 5}}} // mongoose query
    // { difficulty: 'easy', duration: { gte: '5' } } // req.query

    // BUILD QUERY
    let queryStr = JSON.stringify(objQuery);
    queryStr = queryStr.replace(/\b(lte|lt|gte|gt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    //2) SORTING
    if (req.query.sort) {
      // create sort string
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      //   query = query.sort('-createdAt');
    }

    // FILED LIMITING
    if (req.query.fields) {
      // create limit string
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // excluding mongoose added fields
      query = query.select('-__v');
    }

    // 4) PAGINATION
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const count = await Tour.countDocuments();
      if (skip >= count) throw new Error('That page does not exist!');
    }
    // EXECUTE QUERY
    const tours = await query;

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
