var mongoose = require('mongoose');
var schema = require('./schema/index');

module.exports = {
  users: mongoose.model('users', schema.users),
  exams: mongoose.model('exams', schema.exams),
  news: mongoose.model('news', schema.news),
  categories: mongoose.model('categories', schema.categories),
  questions: mongoose.model('questions', schema.questions),
  answers: mongoose.model('answers', schema.answers),
  wards: mongoose.model('wards', schema.wards),
  examResponses: mongoose.model('examResponses', schema.examResponses),
  activities: mongoose.model('activities', schema.activities),
  activitiesJoined: mongoose.model('activitiesJoined', schema.activitiesJoined)
}