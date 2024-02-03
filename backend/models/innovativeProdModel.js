const mongoose = require("mongoose");

const innovativeProdSchema = mongoose.Schema({
    title: String,
    description: String,
    materialUsed: String,
    price: Number,
    quantity: Number,
    dimensions: String,
    image:String
})

const innovativeProd = mongoose.model("innovativeprods", innovativeProdSchema);

module.exports = innovativeProd;