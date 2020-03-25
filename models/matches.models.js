var mongoose = require('mongoose');

var matchesSchema = new mongoose.Schema({
    venue: {type: mongoose.SchemaTypes.ObjectId, ref: 'Venue'},
    matchNo: Number,
    matchType: {type: String, enum: ['oneDay', '20-20', 'test'], default: 'oneDay'},
    team1: {
        team : {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'},
        playing:  {type: String, enum: ['notsatrted', '1stIning', '2ndIning'], default: 'notsatrted'},
        score: {type: Number, default: null},
        players:[{
            player : {type: mongoose.SchemaTypes.ObjectId, ref: 'Player'},
            run : Number,
            wickets :Number,
            bowledOver: Number,
            outOn: Number
        }]
    }, 
    team2: {
        team : {type: mongoose.SchemaTypes.ObjectId, ref: 'Team'},
        playing:  {type: String, enum: ['notsatrted', '1stIning', '2ndIning'], default: 'notsatrted'},
        score: {type: Number, default: null},
        players:[{
            player : {type: mongoose.SchemaTypes.ObjectId, ref: 'Player'},
            run : Number,
            wickets :Number,
            bowledOver: Number,
            outOn: Number
        }]
    }, 
    time: Date,
    summary: String,
    isCompleted: {type: Number, enum: [0, 1, 2], default: 0}, //0 : will play, 1: completed, 2: playing
},{
    timestamp: true
})

var match = mongoose.model('Match', matchesSchema);

module.exports = match;