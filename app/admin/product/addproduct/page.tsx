'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/router instead of next/navigation
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  purprice: number;
  sellprice: number;
  qty: number;
  ctg: string;
}

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    purprice: 0,
    sellprice: 0,
    qty: 0,
    ctg: "",
  });

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:4000/admin/addproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Product Added Successfully !");
      router.push("./");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Product Added Failed !!!");
    }
  };

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "qty" ? parseInt(value) : value,
    });
  };

  return (
    <section className="text-gray-600 body-font relative">
      <title>Add Product</title>
      <div className="container content-evenly px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
        <Toaster />
        <div className="lg:w-1/2 md:w-2/3 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-black text-bold text-lg mb-1 font-medium title-font">
            Add Product
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="purprice"
                className="leading-7 text-sm text-gray-600"
              >
                Purchase Price
              </label>
              <input
                type="number"
                id="purprice"
                name="purprice"
                value={formData.purprice}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="sellprice"
                className="leading-7 text-sm text-gray-600"
              >
                Selling Price
              </label>
              <input
                type="number"
                id="sellprice"
                name="sellprice"
                value={formData.sellprice}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="qty" className="leading-7 text-sm text-gray-600">
                Quantity
              </label>
              <input
                type="number"
                id="qty"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label htmlFor="ctg" className="leading-7 text-sm text-gray-600">
                Category
              </label>
              <input
                type="text"
                id="ctg"
                name="ctg"
                value={formData.ctg}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
