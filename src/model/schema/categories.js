var mongoose = require("mongoose");

var categories = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  news: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "news"
    }
  ]
});

module.exports = categories;
