"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/showProduct.css';
import toast from 'react-hot-toast';

const ShowProduct = () => {
  const [products, setProducts] = useState([]);

  const handleAddToCart = async (productId: number) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers/cart/${productId}`, { withCredentials: true });
      console.log(response.data);
      toast.success('Added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/customers/viewProduct`,
        {
          withCredentials: true,
        }
      );
      setProducts(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="product-grid">
      {products.map((product: any) => (
        <div key={product.product_id} className="card w-96 glass">
          <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Product"/>
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.product_name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <div className="card-actions justify-end">
                <button className="btn btn-primary"  onClick={() => handleAddToCart(product.product_id)}>Add To Cart</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowProduct;