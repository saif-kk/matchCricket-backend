var mongoose = require('mongoose');

var resultSchema = new mongoose.Schema({
    matchNo: {type: mongoose.SchemaTypes.ObjectId, ref: 'Match'},
    winingTeam: {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'}, //add +2 in point in Team
    losingTeam: { type: mongoose.SchemaTypes.ObjectId, ref: 'Team'}, // add 0 in point in Team
    winingTeamScore: Number
})

var result = mongoose.model('result', resultSchema);

module.exports = result;