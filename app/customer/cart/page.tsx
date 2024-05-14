'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

type CartItem = {
  id: number;
  product: {
    product_id: number;
    product_name: string;
    description: string;
    price: number;
  };
};

function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+'/customers/cart', { withCredentials: true });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (productId: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers/cart/${productId}`, { withCredentials: true });
      setCartItems(cartItems.filter(item => item.product.product_id !== productId));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price, 0);
  };
  const handlePlaceOrder = () => {
    // Place your order handling logic here
  };

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <ul className="menu bg-base-200 w-60 rounded-box" key={item.id}>
            <li>
              <div className="card w-40 ">
                <h6 className="card-title">{item.product.product_name}</h6>

                <p>Price: {item.product.price}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary" onClick={() => handleDelete(item.product.product_id)}>Delete</button>
                </div>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      <h2>Total: {calculateTotal()}</h2>
      <button className="btn btn-accent" onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Cart;