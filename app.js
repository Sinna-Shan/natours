const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

// ROUTEHANDLERS
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID provided!',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID provided!',
    });
  }
  const tour = tours.find((el) => el.id === id);
  tour.name = req.body.name;
  tours.push(tour);
  res.send({
    status: 'success',
    data: {
      tour,
    },
  });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID provided!',
    });
  }

  tours.pop(id);

  res.status(204).send({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    results: 'this route is not implemented yet',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    results: 'this route is not implemented yet',
  });
};
const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    results: 'this route is not implemented yet',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    results: 'this route is not implemented yet',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    results: 'this route is not implemented yet',
  });
};

// ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}...`);
});
