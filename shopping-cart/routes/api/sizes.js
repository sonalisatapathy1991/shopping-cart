import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import shortid from 'shortid';

const ProductSizesSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    size: String,
    title: String
});

const ProductSizes = mongoose.model('Product_sizes', ProductSizesSchema);
router.get("/", async (req, res) => {
    try {
        const sizes = await ProductSizes.find();
        res.send(sizes);
    } catch (err) {
        console.log(err);
    }

});
router.post("/", async (req, res) => {
    const newSize = new ProductSizes(req.body);
    const saveSize = await newSize.save();
    res.send(saveSize);
})
export default router;