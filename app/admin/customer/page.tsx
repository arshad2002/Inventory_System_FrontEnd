"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerCard from "../components/customercard";

export default function Customer() {
  const [customerList, setCustomerList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/admin/allcustomers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomerList(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

const handleDeleteCustomer = async (customerId: any) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:4000/admin/deletecustomer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await axios.get(
      "http://localhost:4000/admin/allcustomers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setCustomerList(response.data);
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};



  const filteredCustomers = customerList.filter(
    (customer: any) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
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
              <a href="../../admin/customer/addcustomer">
                <button className="px-6 py-2 ml-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                  Add New Customer
                </button>
              </a>
            </div>
            <div className="flex flex-wrap -m-4">
              {filteredCustomers.map((customer, index) => (
                <div key={index} className="xl:w-1/5 md:w-1/5 p-4">
                  <CustomerCard
                    data={customer}
                    handleDeleteCustomer={handleDeleteCustomer}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

 
  );
}
