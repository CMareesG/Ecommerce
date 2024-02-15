import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import CartPage from './CartPage';
import './App.css';
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const requestData = {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity, // Make sure quantity is correctly taken from the state
    };
  
    console.log('Sending data:', requestData);
  
    fetch('http://localhost:3001/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success or error response from the server
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  
  

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-price">
        <span>₹</span>
        {product.price}
      </div>
      <div className="product-quantity">
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          min={1}
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

const ProductsList = ({ products }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const App = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Shirt',
      description: 'Elevate your style with our Double Pocket Shirt – a modern twist on classic comfort. Featuring dual front pockets, it\'s your go-to for a sleek and versatile look. Perfect for any occasion, this shirt is the epitome of casual sophistication',
      price: 769,
      imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.yeNJpl1f8zaC5ZB8oQC_EgHaHa&pid=Api&P=0&h=180',
    },
    {
      id: 2,
      name: 'Joggers',
      description: 'Step into comfort and style with our Joggers. Effortlessly blending fashion and function, these joggers offer a sleek, modern look with a relaxed fit. Perfect for casual days or active pursuits, elevate your wardrobe with these versatile essentials.',
      price: 799,
      imageUrl: 'https://modone.com/eng_pl_Mens-pants-joggers-P886-grey-14808_1.jpg',
    },
    {
      id: 3,
      name: 'White Sneakers',
      description: 'Step into timeless elegance with our White Sneakers. Effortlessly chic, these sneakers blend comfort and style for a versatile wardrobe staple. Whether it\'s casual outings or urban adventures, these white sneakers add a touch of sophistication to any look.',
      price: 2899,
      imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.7Hfie_uOBGiC3EJ1bib8lQHaHa&pid=Api&P=0&h=180',
    },

    {
      id: 4,
      name: 'Coolers',
      description: 'Stay cool in style with our sleek Coolers. Designed for maximum comfort and a touch of trendiness, these coolers are your go-to for sunny days and outdoor adventures. Elevate your summer wardrobe with this essential accessory that effortlessly combines fashion and functionality.',
      price: 1999,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },

    {
      id: 5,
      name: 'Men\'s Chain',
      description: 'Stay cool in style with our sleek Coolers. Designed for maximum comfort and a touch of trendiness, these coolers are your go-to for sunny days and outdoor adventures. Elevate your summer wardrobe with this essential accessory that effortlessly combines fashion and functionality.',
      price: 1999,
      imageUrl: 'https://images.unsplash.com/photo-1643898191301-827756a7c855?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWVuJTIwbmVja2xhY2V8ZW58MHx8MHx8fDA%3D',
    },

    {
      id: 6,
      name: 'Silver Kada',
      description: 'Define your style with our Silver Kada. A bold and timeless accessory that effortlessly blends tradition with modern flair. Crafted with precision, this silver kada is the perfect addition to elevate your look, whether for casual wear or special occasions.',
      price: 3459,
      imageUrl: 'https://i.pinimg.com/564x/21/2b/a7/212ba73ef67de582c4a2cdda8dc61d77.jpg',
    }
  ]);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update its quantity
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <div className="app">
        <h1>E-commerce App</h1>
        <Link to="/cart">
          <button className="cart-button">Cart ({cartItems.length})</button>
        </Link>
        <Routes>
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/" element={<ProductsList products={products} addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;