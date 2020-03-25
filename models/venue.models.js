var mongoose = require('mongoose');

var venueSchema = new mongoose.Schema({
    venueName: String,
    country : {type: mongoose.SchemaTypes.ObjectId, ref: 'Country'},
    venuePlace : String,
    capacity: Number
})

var venue = mongoose.model('Venue', venueSchema);

module.exports = venue;