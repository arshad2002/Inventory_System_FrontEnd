"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Category({ params }: { params: { id: string } }) {
  const [categoryData, setCategoryData] = useState<any>(null);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [updatedCategoryData, setUpdatedCategoryData] = useState<any>({
    name: "",
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/admin/getcategory/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleUpdate = () => {
    setUpdateMode(true);
    setUpdatedCategoryData({
      name: categoryData.name,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCategoryData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelUpdate = () => {
    setUpdateMode(false);
  };

  const handleSaveUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:4000/admin/updatecategory/${params.id}`,
        updatedCategoryData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategoryData(updatedCategoryData);
      setUpdateMode(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (!categoryData) {
    return (
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        Loading...
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="container mx-auto flex px-10 py-24 md:flex-row flex-col items-center">
        <div className="card card-side bg-base-300 shadow-xl w-full md:w-1/2">
          <div className="card-body">
            <h2 className="card-title">Category Details</h2>
            <hr />
            <div>
              <label>Name: </label>
              {updateMode ? (
                <input
                  type="text"
                  name="name"
                  value={updatedCategoryData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{categoryData.name}</span>
              )}
            </div>
            <div className="card-actions">
              {updateMode ? (
                <>
                  <button
                    className="btn btn-sm btn-primary mt-4"
                    onClick={handleSaveUpdate}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-outline btn-error mt-4"
                    onClick={handleCancelUpdate}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="btn btn-sm btn-primary mt-4"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
