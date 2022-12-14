const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: String,
    alpha2Code: String,
    alpha3Code: String
});

module.exports = mongoose.model('Country', countrySchema)