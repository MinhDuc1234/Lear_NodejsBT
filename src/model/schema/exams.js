var mongoose = require("mongoose");

var exams = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questions"
    }
  ]
});

module.exports = exams;
