// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const cron = require('node-cron');
const updateProducts = require('./services/cron-jobs');

// DB Setup
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Setup CRON
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  updateProducts();
});

// cron.schedule('30 2 * * *', () => {
//   console.log('Running a cron job at 2:30 AM everyday');
// updateProducts()
// });

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
