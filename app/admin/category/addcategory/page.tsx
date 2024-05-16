"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
}

export default function AddCategory() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = {
          name: formData.name.trim(),
        };

        const token = localStorage.getItem('token');

        const response = await axios.post(
          "http://localhost:4000/admin/addcategory",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        toast.success("Category Added !");
        router.push("./");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError(validationErrors.name || "");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const error: Partial<FormData> = {};
    if (!formData.name.trim()) {
      error.name = "Name is required";
    }
    return error;
  };

  return (
    <section className="text-gray-600 body-font relative">
      <title>Category Adding...</title>
      <div className="container content-evenly px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
        <Toaster />
        <div className="lg:w-1/2 md:w-2/3 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-black text-bold text-lg mb-1 font-medium title-font">
            Category Registration
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
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

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              ADD
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
