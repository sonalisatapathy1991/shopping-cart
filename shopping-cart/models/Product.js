const mongoose = require('mongoose');
// const Product = mongoose.model(
//     "products",
//     new mongoose.Schema({
//         _id: { type: String, default: shortid.generate },
//         title: String,
//         description: String,
//         image: String,
//         price: Number,
//         availableSizes: [String],
//     })
// );
var ProductSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
})

module.exports = Product = mongoose.model('products', ProductSchema);