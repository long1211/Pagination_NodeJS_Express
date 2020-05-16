const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    cover: {type: String, required: true}
})

module.exports =  mongoose.model('product', productSchema)