var mongoose = require("mongoose");

var news = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageLink: {
    type: String
    
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  }
});

news.index({title: 'text', shortDescription: 'text' , content: 'text'});

module.exports = news;
