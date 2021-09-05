import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import shortid from 'shortid';
import dotenv from "dotenv";
dotenv.config();
import product from './routes/api/product.js';
import sizes from './routes/api/sizes.js';
// if (process.env.NODE_ENV !== 'production') {
//   import dotenv from 'dotenv';
//   dotenv.config();
// }

const app = express();
//app.use("/", express.static(__dirname + "/public"));
//app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

app.use(bodyParser.json());




const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URL,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log("mongodb connected")
  }
  catch (err) {
    console.log(err)
  }
}
connectDB();


app.use('/api/products', product);
app.use('/api/sizes', sizes);
const port = parseInt(process.env.PORT) || 5000;
app.listen(port, () => console.log(`serve at http://localhost:${port}`));