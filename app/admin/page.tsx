"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { TEChart } from "tw-elements-react";


export default function Admin() {
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [
          customerResponse,
          productResponse,
          categoryResponse,
          orderResponse,
        ] = await Promise.all([
          axios.get("http://localhost:4000/admin/allcustomers", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/admin/allproducts", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/admin/allcategory", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/admin/allorders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        console.log("Customer Response:", customerResponse.data);
        console.log("Product Response:", productResponse.data);
        console.log("Category Response:", categoryResponse.data);
        console.log("Order Response:", orderResponse.data);

        setCustomerCount(customerResponse.data.length);
        setProductCount(productResponse.data.length);
        setCategoryCount(categoryResponse.data.length);
        setOrderCount(orderResponse.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="container mx-auto flex flex-wrap flex-col sm:flex-row items-center border border-black text-center">
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {customerCount}
          </h2>
          <p className="leading-relaxed">Customers</p>
        </div>
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {productCount}
          </h2>
          <p className="leading-relaxed">Products</p>
        </div>
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {categoryCount}
          </h2>
          <p className="leading-relaxed">Categories</p>
        </div>
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
            {orderCount}
          </h2>
          <p className="leading-relaxed">Orders</p>
        </div>
      </div>
      
      {/* <div className="container container-right px-10 py-24 mx-auto flex flex-wrap">
        <div className="w-full md:w-1/2 px-1 mb-5">
          <TEChart
            type="line"
            data={{
              labels: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              datasets: [
                {
                  label: "Customers",
                  data: [2, 2343, 2545, 3423, 2365, 1985, 987],
                },
              ],
            }}
            style={{ width: "100%", height: "100%" }} // Set width and height to 100%
          />
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <TEChart
            type="bar"
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Orders",
                  data: [30, 15, 62, 65, 61, 6],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: "green",
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: "#4285F4",
                  },
                },
                y: {
                  ticks: {
                    color: "#f44242",
                  },
                },
              },
            }}
            style={{ width: "100%", height: "100%" }} // Set width and height to 100%
          />
        </div>
      </div> */}
    </>
  );
}
