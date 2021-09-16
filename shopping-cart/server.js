import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import shortid from 'shortid';
import dotenv from "dotenv";
dotenv.config();
import product from './routes/api/product.js';
import sizes from './routes/api/sizes.js';
import path from 'path';

const app = express();
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
// if (process.env.NODE_ENV !== 'production') {
//   import dotenv from 'dotenv';
//   dotenv.config();
// }

//if (process.env.NODE_ENV === 'production') {
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  // console.log('Testing----', __dirname)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
//}

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build'))
// })

const port = parseInt(process.env.PORT) || 5000;

app.listen(port, () => console.log(`serve running at :${port}`));