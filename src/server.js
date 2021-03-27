'use strict';

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());

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
