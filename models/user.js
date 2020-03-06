'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  question1: Number,
  question2: Number,
  question3: Number,
  question4: Number,
  question5: Number,
  sum: Number
});

module.exports = mongoose.model('User', schema);
