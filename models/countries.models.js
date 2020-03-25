var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
  country: String
});

var country = mongoose.model('Country', countrySchema);

module.exports = country
