'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Product({ params }: { params: { id: string } }) {
  const [productData, setProductData] = useState<any>(null);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updatedProductData, setUpdatedProductData] = useState<any>({
    name: "",
    price: 0,
    description: "",
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/admin/product/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleUpdate = () => {
    setUpdateMode(true);
    setUpdatedProductData({
      name: productData.name,
      purprice: productData.purprice,
      sellprice: productData.sellprice,
      qty: productData.qty,
      ctg: productData.ctg
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProductData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelUpdate = () => {
    setUpdateMode(false);
  };

  const handleSaveUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:4000/admin/updateproduct/${params.id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductData(updatedProductData);
      setUpdateMode(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!productData) {
    return (
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        Loading...
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center">
        <div className="card card-side bg-base-300 shadow-xl w-full md:w-1/2">
          <div className="card-body">
            <h2 className="card-title">Product Details</h2>
            <hr />
            <div>
              <label>Name: </label>
              {updateMode ? (
                <input
                  type="text"
                  name="name"
                  value={updatedProductData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{productData.name}</span>
              )}
            </div>
            <div>
              <label>Buy: </label>
              {updateMode ? (
                <input
                  type="number"
                  name="purprice"
                  value={updatedProductData.purprice}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{productData.purprice}</span>
              )}
            </div>
            <div>
              <label>Sell: </label>
              {updateMode ? (
                <input
                  type="number"
                  name="sellprice"
                  value={updatedProductData.sellprice}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{productData.sellprice}</span>
              )}
            </div>
            <div>
              <label>Quantity: </label>
              {updateMode ? (
                <input
                  type="text"
                  name="qty"
                  value={updatedProductData.qty}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{productData.qty}</span>
              )}
            </div>
            <div>
              <label>Category: </label>
              {updateMode ? (
                <input
                  type="text"
                  name="ctg"
                  value={updatedProductData.ctg}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{productData.ctg}</span>
              )}
            </div>
            <div className="card-actions">
              {updateMode ? (
                <>
                  <button
                    className="btn btn-sm btn-primary mt-4"
                    onClick={handleSaveUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error mt-4"
                    onClick={handleCancelUpdate}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="btn btn-sm btn-primary mt-4"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
