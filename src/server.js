'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

const log = require('./middleware/log');
app.use(log); //log the method and route/query of every request

const searchRouter = require('./routes/search');
app.use(searchRouter);

app.get('/', (req, res) => {
  res.status(200).send('Pencil Backend API by Dina Ayoub <br/>To get a list of questions by topic, use the GET method on /search?q=<topic name here>');
});
const notFoundError = require('./error-handlers/404');
app.use('*', notFoundError);

function start(port, mongoose_uri) {
  if (port) {
    mongoose.connect(mongoose_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
      .then(() => {
        app.listen(port, () => {
          console.log('Server is up on port', port);
        });
      })
      .catch(err => {
        console.error('Could not start server. ', err);
      });
  } else throw new Error('No port provided');
}

module.exports = {
  server: app,
  start: start
};
