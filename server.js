const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');

const URL = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(URL)
  .then((con) => console.log(`connected to DB: ${con.connections[0].name}`))
  .catch((err) => console.error(err));

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
  console.log(`listening on ${port}`);
});
