const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
exports.checkID = (req, res, next, val)=>{
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID provided!',
    });
  }
  next();
};

exports.checkBody=(req, res, next, )=>{
  if(req.body.name === undefined || req.body.price === undefined) {
    return res.status(400).json({
      status: 'bad request',
      message: 'Missing Name or Price ☹️',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
exports.createTour = (req, res) => {
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

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
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

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  tours.pop(id);
  res.status(204).send({
    status: 'success',
    data: null,
  });
};
