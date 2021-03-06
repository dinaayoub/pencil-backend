'use strict';

const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const topics = mongoose.Schema({
  _id: { type: String, required: true },
  questionsArray: { type: Array }
});

module.exports = mongoose.model('topics', topics);