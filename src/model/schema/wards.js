var mongoose = require("mongoose");

var wards = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = wards;
