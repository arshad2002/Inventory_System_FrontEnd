'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  myfile: File | null;
}

export default function AddCustomer() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    myfile: null,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("password", formData.password);
        if (formData.myfile) {
          formDataToSend.append("myfile", formData.myfile);
        }
        const token = localStorage.getItem('token');
        const response = await axios.post(
          "http://localhost:4000/admin/addcustomer",
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        toast.success("Customer Registration Successful !");
        router.push("./");
      } catch (error) {
        console.error("Error:", error);
        toast.error("Customer Registration Failed !!!");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "myfile") {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setError("");
    } else {
      setFormData({ ...formData, [name]: value });
      setError("");
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const error: Partial<FormData> = {};
    if (!formData.name) {
      error.name = "Name is required";
    }
    if (!formData.email) {
      error.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      error.email = "Invalid Email !!!";
    }
    if (!formData.password) {
      error.password = "Password is required";
    }
    if (!formData.phone) {
      error.phone = "Phone is required";
    }
    return error;
  };

  return (
    <section className="text-gray-600 body-font relative">
      <title>Customer Registration</title>
      <div className="container content-evenly px-5 py-20 mx-auto flex sm:flex-nowrap flex-wrap">
        <Toaster />
        <div className="lg:w-1/2 md:w-2/3 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-black text-bold text-lg mb-1 font-medium title-font">
            Customer Registration
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
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="file"
                id="image"
                name="myfile"
                onChange={handleInputChange}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
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
