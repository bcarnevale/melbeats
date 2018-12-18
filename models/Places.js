const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    id: Number,
    name: String,
    suburb: String,
    style: String,
    price: String
})

module.exports = mongoose.model('Places', placesSchema);