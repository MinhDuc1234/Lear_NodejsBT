var mongoose = require("mongoose");

var activities = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description:{
    type:String,
    default:'Không có mô tả nào'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  updatedDate: {
    type: Date
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  activitiesJoined: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'activitiesJoined'
  }
});

module.exports = activities;
