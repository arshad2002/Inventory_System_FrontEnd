'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDetail({ params }: { params: { id: string } }) {
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/admin/get/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdminData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!adminData) {
    return (
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center justify-center gap-8">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Admin Details!</h2>
          <div className="flex flex-col gap-2">
            <div className="flex">
              <label htmlFor="name" className="w-20">
                Name:
              </label>
              <span>{adminData.name}</span>
            </div>
            <div className="flex">
              <label htmlFor="email" className="w-20">
                Email:
              </label>
              <span>{adminData.email}</span>
            </div>
            <div className="flex">
              <label htmlFor="phone" className="w-20">
                Phone:
              </label>
              <span>{adminData.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
