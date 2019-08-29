var mongoose = require('mongoose');

var users = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String,
  },
  roles: [{
    type: String
  }],
  fullname: {
    required: true,
    type: String
  },
  position: {
    type: String
  }
})

module.exports = users;