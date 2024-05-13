"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
type Product = {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
};

function SearchProduct() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (keyword) {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_ENDPOINT + "/customers/searchProduct",
          { params: { keyword } }
        );
        setResults(response.data);
      } else {
        setResults([]);
      }
    };

    fetchResults();
  }, [keyword]);

  const handleSearch = (event: any) => {
    setKeyword(event.target.value);
  };

  return (
    <>  
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
            <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" onChange={handleSearch} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            {results.length > 0 ? (
                results.map((result, index) => (
                    <ul className="menu bg-base-200 w-60 rounded-box">
                        <li>
                            <div key={result.product_id} className="card w-40 ">
                                <h6 className="card-title">{result.product_name}</h6>
                                <p>Price: {result.price}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Add To Cart</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                ))
            ) : (
                <div><p>No products found</p></div>
                
            )}
        </div>
    </>
)
}

export default SearchProduct;
