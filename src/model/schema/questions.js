var mongoose = require("mongoose");

var questions = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    required: true
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "answers"
    }
  ],
  correctAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers"
  }
  
});

module.exports = questions;
