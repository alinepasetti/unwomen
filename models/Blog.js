'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  category: String,
  video: String,
  img: String
});

module.exports = mongoose.model('Blog', schema);
