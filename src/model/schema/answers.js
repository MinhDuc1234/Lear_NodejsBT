var mongoose = require("mongoose");

var answers = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  questionsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions"
  }
});
module.exports = answers;
