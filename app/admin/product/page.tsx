"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Session from "../components/session";
import ProductCard from "../components/productcard";

export default function Product() {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/admin/allproducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductList(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteProduct = async (productId: any) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:4000/admin/deleteproduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchProductData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = productList.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ctg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="text-gray-600 body-font">
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
            <a href="../../admin/product/addproduct">
              <button className="px-6 py-2 ml-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                Add New Product
              </button>
            </a>
          </div>

          <div className="flex flex-wrap -m-4">
            {filteredProducts.map((product: any, index: any) => (
              <div key={index} className="xl:w-1/5 md:w-1/2 p-4">
                <ProductCard
                  data={product}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}



// 'use client'
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom"; // Import useHistory for client-side navigation
// import Session from "../components/session";
// import ProductCard from "../components/productcard";

// export default function Product() {
//   const [productList, setProductList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const history = useHistory(); // Initialize useHistory

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   const fetchProductData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:4000/admin/allproducts",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProductList(response.data);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//       // You can display an error message to the user here
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(
//         `http://localhost:4000/admin/deleteproduct/${productId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       fetchProductData();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       // You can display an error message to the user here
//     }
//   };

//   const handleAddProduct = () => {
//     history.push("../../admin/product/addproduct"); // Navigate to the add product page
//   };

//   const filteredProducts = productList.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.ctg.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <section className="text-gray-600 body-font">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="flex justify-center mb-8">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="mr-2 px-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
//             />
//             <button
//               className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none"
//               onClick={fetchProductData} // Refresh products on search
//             >
//               Search
//             </button>
//             <button
//               className="px-6 py-2 ml-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
//               onClick={handleAddProduct} // Navigate to add product page
//             >
//               Add New Product
//             </button>
//           </div>

//           <div className="flex flex-wrap -m-4">
//             {filteredProducts.map((product, index) => (
//               <div key={index} className="xl:w-1/5 md:w-1/2 p-4">
//                 <ProductCard
//                   data={product}
//                   handleDeleteProduct={handleDeleteProduct}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
