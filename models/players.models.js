var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  name: String,
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  age: Number,
  playerNo: Number,
  playingType: {type: String, enum: ['batsman', 'baller', 'keeper', 'allrounder'], default: 'allrounder'},
  totalRun: Number,
  wicketTaken: Number,
  runRate: String,
},{
    timestamps: true
});

var player = mongoose.model('Player', playerSchema);

module.exports = player
