const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const filterObj = function (obj, ...allowedFields) {
  const newObj = {};
  allowedFields.forEach((el) => (newObj[el] = obj[el]));
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    message: 'Success',
    count: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = factory.createOne(User);

exports.getUserById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    message: 'Success',
    data: 'got a User',
  });
});

// do not update password with this
exports.updateUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'this route is not for password updates, Please use /updateMyPassword route.',
        400
      )
    );
  }
  //   filtered out unwanted fields not allowed to be updated
  const filteredObj = filterObj(req.body, 'name', 'email');
  //   update user document
  const updated = await User.findByIdAndUpdate(req.user.id, filteredObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updated,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
});
