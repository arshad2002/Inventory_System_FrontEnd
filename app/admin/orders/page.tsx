"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/ordercard";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrderData();
  }, []);

  const fetchOrderData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/admin/allorders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderList(response.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteOrder = async (orderId: any) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/admin/deleteorder/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchOrderData();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const filteredOrders = orderList.filter((order: any) =>
    order.id.toString().includes(searchTerm)
  );

  return (
    <div className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mr-2 px-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          <button className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none">
            Search
          </button>
        </div>
        <div className="flex flex-wrap -m-4">
          {filteredOrders.map((order: any, index) => (
            <div key={index} className="xl:w-1/5 md:w-1/5 p-4">
              <OrderCard data={order} handleDeleteOrder={handleDeleteOrder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
