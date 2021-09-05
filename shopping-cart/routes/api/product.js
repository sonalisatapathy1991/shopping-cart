import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import shortid from 'shortid';

const ProductSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
})
const Product = mongoose.model('products', ProductSchema);

router.get("/", async (req, res) => {
    // alert('In Server');
    // console.log('request',req)
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.log(err);
    }

});

// router.post("/", async (req, res) => {
//     const newProduct = new Product(req.body);
//     const savedProduct = await newProduct.save();
//     res.send(savedProduct);
// });

// router.delete("/:id", async (req, res) => {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     res.send(deletedProduct);
// })
export default router;