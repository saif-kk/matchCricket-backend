var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  country: {type: mongoose.SchemaTypes.ObjectId, ref: 'Country'},
  teamRank: Number,
  teamName: String,
  played: Number,
  won: Number,
  lost: Number,
  point: Number,
  isParticipating: {type: Number, enum: [0, 1], default: 1}, //0 : not playing, 1: playing
  matchInPlay: {type: Number, enum: [0, 1], default: 0}, //0 : no match or not playing, 1: playing or match is arranged
});

var team = mongoose.model('Team', teamSchema);

module.exports = team
