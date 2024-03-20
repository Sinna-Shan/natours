const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) next(new AppError('no document found with the id', 404));

    res.status(204).json({
      message: 'Success',
      data: 'tour deleted successfully',
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) next(new AppError('no document found with the id', 404));

    res.status(200).json({
      message: 'Success',
      data: doc,
    });
  });
