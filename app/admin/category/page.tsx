"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/admin/allcategory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchCategoryData();
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteCategory = async (categoryId: any) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/admin/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After deleting the category, fetch the updated category data
      const response = await axios.get(
        "http://localhost:4000/admin/allcategory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryList(response.data);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredCategories = categoryList.filter((category: any) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex justify-center">
          <div className="w-1/2">
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
              <a href="../../admin/category/addcategory">
                <button className="px-6 py-2 ml-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                  Add New Category
                </button>
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto min-w-full border border-black">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50  text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category: any, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                        <Link href={`/admin/category/${category.id}`}>
                          <button className="text-white bg-green-500 border-0 py-1 px-2 mr-2 focus:outline-none hover:bg-blue-600 rounded">
                            Update
                          </button>
                        </Link>
                        <button
                          className="text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
