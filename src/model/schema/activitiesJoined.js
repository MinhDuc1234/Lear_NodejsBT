var mongoose = require("mongoose");

var activitiesJoined = new mongoose.Schema({
  activity: {
    type: mongoose.Schema.ObjectId,
    ref: 'activities'
  },
  wardJoined: [
    {
      ward: { type: mongoose.Schema.Types.ObjectId, ref: "wards"},
      numberJoined: { type: Number, default: 0 },
      userJoined: [String]
    }
  ]
});

module.exports = activitiesJoined;
