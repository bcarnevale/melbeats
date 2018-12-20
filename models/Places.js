const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    name: String,
    suburb: String,
    style: String,
    price: String
})

module.exports = mongoose.model('Places', placesSchema);