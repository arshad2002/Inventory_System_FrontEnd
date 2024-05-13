import axios from 'axios';
import React from 'react';
import '../style/showProduct.css'

const ShowProduct = async() => {
    const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"/customers/viewProduct", {
      withCredentials: true
    });
    const products = response.data;
    
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
            <button className="btn btn-primary">Add To Cart</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);
}

export default ShowProduct