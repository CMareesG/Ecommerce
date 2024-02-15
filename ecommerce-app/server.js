const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for the Product model
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  quantity: Number, // Add quantity field
});
         
// Create a Product model
const Product = mongoose.model('Product', productSchema);

app.use(cors());
app.use(express.json());

// API Endpoint to Add Product to Cart
app.post('/api/add-to-cart', async (req, res) => {
    try {
      const { name, description, price, imageUrl, quantity } = req.body;
  
      console.log('Received data:', req.body);
  
      const product = new Product({
        name,
        description,
        price,
        imageUrl,
        quantity,
      });
  
      await product.save();
  
      res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
