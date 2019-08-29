var mongoose = require("mongoose");

var examResponses = new mongoose.Schema({
  ward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wards"
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exams"
  },
  numberCorrect: {
    type: Number,
    default: 0
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions"
      },
      answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "answers"
      }
    }
  ]
});

module.exports = examResponses;
