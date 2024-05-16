"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CustomerDetail({ params }: { params: { id: string } }) {
  const [customerData, setCustomerData] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updatedCustomerData, setUpdatedCustomerData] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/admin/customer/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomerData(response.data);
      fetchImage();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchImage = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/admin/cimage/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );
      const imageData = Buffer.from(response.data, "binary").toString("base64"); // Convert binary data to base64 string
      setImageUrl(`data:image/jpeg;base64,${imageData}`); // Set base64 encoded image data
      // setImageUrl(response.data);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };



  const handleUpdate = () => {
    setUpdateMode(true);
    setUpdatedCustomerData({
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCustomerData((prevState: any) => ({
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
        `http://localhost:4000/admin/updatecustomer/${params.id}`,
        updatedCustomerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomerData(updatedCustomerData);
      setUpdateMode(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  if (!customerData) {
    return (
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        Loading...
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center justify-center gap-8">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure style={{ width: "100%", height: "200px" }}>
            {imageUrl ? (
              <img
                src={customerData && imageUrl}
                alt="customer"
                width={200}
                height={200}
                className="image"
              />
            ) : (
              <div>Loading...</div>
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">User Details!</h2>
            <div className="flex flex-col gap-2">
              <div className="flex">
                <label htmlFor="name" className="w-20">
                  Name:
                </label>
                <span>{customerData.name}</span>
              </div>
              <div className="flex">
                <label htmlFor="email" className="w-20">
                  Email:
                </label>
                <span>{customerData.email}</span>
              </div>
              <div className="flex">
                <label htmlFor="phone" className="w-20">
                  Phone:
                </label>
                <span>{customerData.phone}</span>
              </div>
            </div>
            <div className="card-actions">
              <button
                onClick={handleUpdate}
                className="btn btn-sm btn-primary mt-4"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {updateMode && (
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure style={{ width: "100%", height: "200px" }}>
              {imageUrl ? (
                <img
                  src={customerData && imageUrl}
                  alt="customer"
                  width={200}
                  height={200}
                  className="image"
                />
              ) : (
                <div>Loading...</div>
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Customer Details!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <div>
                <label>Name : </label>
                <input
                  className="bg-gray-300 justify-center"
                  type="text"
                  name="name"
                  value={updatedCustomerData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="justify-start">Email : </label>
                <input
                  className="bg-gray-300 justify-center"
                  type="email"
                  name="email"
                  value={updatedCustomerData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="justify-start">Phone : </label>
                <input
                  className="bg-gray-300 justify-center"
                  type="text"
                  name="phone"
                  value={updatedCustomerData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-sm btn-outline btn-success"
                  onClick={handleSaveUpdate}
                >
                  Save
                </button>
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={handleCancelUpdate}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
