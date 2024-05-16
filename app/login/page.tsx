"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import signinimage from "../../public/signin.jpg";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import React from "react";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setFormData((prevState) => ({
       ...prevState,
       [name]: value,
     }));
   };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email & Password are Required !!!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        formData
      );
      console.log(response.data);
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("email", formData.email);
      toast.success("Sign in Successful !");
      router.push("/admin");
    } catch (error) {
      console.error("Error:", error);
      setError("Sign in failed. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <div className="container mx-auto flex flex-col items-center justify-center px-15 py-24 md:flex-row">
        <Toaster />
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <Image
            src={signinimage}
            alt="hero"
            className="object-cover object-center rounded"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h2 className="text-black text-bold text-lg mb-1 font-medium title-font">
            SIGN IN
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-3">
              <label
                htmlFor="email"
                className="nput input-bordered input-success w-full max-w-md" // Adjusted class to max-w-md
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="text-sm text-black text-bold text-right px-2 py-3 mt-5">
              Don't have an account ?
              <a href="../signup" className="link link-error">
                {" "}
                SIGN UP
              </a>
            </div>
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="text-white  bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
