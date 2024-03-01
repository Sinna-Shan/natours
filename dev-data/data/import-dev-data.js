const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

const URL = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(URL)
  .then((con) => console.log(`connected to DB: ${con.connections[0].name}`))
  .catch((err) => console.error(err));

const data = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA TO DATA BASE
const importData = async () => {
  try {
    const tours = await Tour.create(data);
    console.log(`created tours`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

// DELETE ALL DATA IN THE DATA BASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log(`deleted all tours`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importData();
}

if (process.argv[2] === '--delete') {
  deleteData();
}
